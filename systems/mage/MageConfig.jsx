// systems/mage/mageConfig.js
import React from 'react';
import { getEmptyMage } from '../../data/templates';
import { MageData, MageMerits, MageFlaws } from './mageData';
import { MageAdvantages } from './MageAdvantages';
import { MageStatus } from './MageStatus';
import { randomizeCharacter } from './mageRandomizer';

// ─── Mage-spezifische Zusatzprüfung ─────────────────────────────────────────
// Wird an useTraitValidation übergeben (via BaseSheet → mageConfig)
const kampfkunstValidation = (name, newValue) =>
    name === 'Kampfkunst' && newValue > 2
        ? 'Kampfkunst (Do) kann zu Beginn maximal 2 Punkte haben.'
        : null;

// ─── Config-Objekt ───────────────────────────────────────────────────────────
export const mageConfig = {
    systemId:  'mta',
    title:     'Mage',
    subtitle:  'The Ascension',
    theme:     'mage',

    freebieCount: 15,
    freebieCosts: {
        attribute: 5, ability: 2, background: 1,
        sphere: 4, arete: 8, willpower: 1, quintessence: 2,
    },

    getEmptyCharacter: getEmptyMage,
    meritsList: MageMerits,
    flawsList:  MageFlaws,

    extraAbilityValidation:    kampfkunstValidation,

    // ── Render-Funktionen ────────────────────────────────────────────────────

    renderRules: () => (
        <>
            <p><strong>📜 Attribut-Punkteverteilung</strong><br />7 / 5 / 3 Punkte auf die drei Kategorien. Ohne Freebies max. 5 pro Attribut.</p>
            <p><strong>⚙️ Fähigkeiten</strong><br />13 / 9 / 5 Punkte. Ohne Freebies max. 3 pro Fähigkeit.</p>
            <p><strong>✨ Vorteile</strong><br />Sphären: 3 Punkte (max. 3 pro Sphäre). Hintergründe: 5 Punkte.</p>
            <p><strong>⭐ Freebies</strong><br />15 Punkte. Attribut 5, Fähigkeit 2, Sphäre 4, Arete 8, Willenskraft 1, Quintessenz 2.</p>
        </>
    ),

    // key + val kommen aus BaseSheet, sharedProps enthält { character, setCharacter, theme }
    renderInfoField: (key, val, { character, setCharacter, theme }) => {
        const set = (patch) =>
            setCharacter(p => ({ ...p, info: { ...p.info, ...patch } }));

        if (key === 'Zugehörigkeit') return (
            <select
                value={val}
                onChange={(e) => set({ Zugehörigkeit: e.target.value, Gruppierung: '' })}
                className={`bg-transparent text-${theme}-100 outline-none py-1 cursor-pointer`}
            >
                <option value="">Wähle...</option>
                {MageData.affiliations.map(a => (
                    <option key={a.name} value={a.name} className="bg-black">{a.name}</option>
                ))}
            </select>
        );

        if (key === 'Gruppierung') {
            const sects = MageData.affiliations.find(
                a => a.name === character.info.Zugehörigkeit
            )?.sects ?? [];
            return (
                <select
                    value={val}
                    disabled={!character.info.Zugehörigkeit}
                    onChange={(e) => set({ Gruppierung: e.target.value })}
                    className={`bg-transparent outline-none py-1 cursor-pointer ${!character.info.Zugehörigkeit ? 'opacity-50' : `text-${theme}-100`}`}
                >
                    <option value="">Wähle...</option>
                    {sects.map(s => (
                        <option key={s} value={s} className="bg-black">{s}</option>
                    ))}
                </select>
            );
        }

        if (key === 'Essenz') return (
            <select
                value={val}
                onChange={(e) => set({ Essenz: e.target.value })}
                className={`bg-transparent text-${theme}-100 outline-none py-1 cursor-pointer`}
            >
                <option value="">Wähle...</option>
                {MageData.essences.map(e => (
                    <option key={e} value={e} className="bg-black">{e}</option>
                ))}
            </select>
        );

        // Alle anderen Felder: normales Textfeld
        return (
            <input
                type="text"
                value={val}
                onChange={(e) => set({ [key]: e.target.value })}
                className={`bg-transparent outline-none py-1 text-${theme}-100`}
            />
        );
    },

    // sharedProps = { character, setCharacter, freebie, showToast, theme }
    // — wird 1:1 aus BaseSheet weitergereicht
    renderAdvantages: (sharedProps) => <MageAdvantages {...sharedProps} />,
    renderStatus:     (sharedProps) => <MageStatus     {...sharedProps} />,

    // onRandomize wird in BaseSheet so aufgerufen:
    // onRandomize({ character, setCharacter, freebie, showToast })
    onRandomize: randomizeCharacter,
};