// systems/vampire/vampireConfig.js
import React, { useEffect } from 'react';
import { getEmptyVampire } from '../../data/templates';
import { SharedData } from '../../data/sharedData';
import { VampireData, VampireMerits, VampireFlaws, getClanDisciplines } from './vampireData';
import { VampireAdvantages } from './VampireAdvantages';
import { VampireStatus } from './VampireStatus';
import { randomizeCharacter } from './vampireRandomizer';
import { getGenerationInfo } from './vampireHelpers';
import { themeConfig } from '../../components/ui/themes/themes';

// ─── Config-Objekt ───────────────────────────────────────────────────────────
export const vampireConfig = {
    systemId:  'vtm',
    title:     'Vampire',
    subtitle:  'Die Maskerade',
    theme:     'emerald',

    freebieCount: 15,
    freebieCosts: {
        attribute: 5, ability: 2, discipline: 7,
        background: 1, virtue: 2, humanity: 2, willpower: 1,
    },

    getEmptyCharacter: getEmptyVampire,
    meritsList: VampireMerits,
    flawsList:  VampireFlaws,

    // Nosferatu: Erscheinungsbild dynamisch ausschließen
    // BaseSheet ruft dies mit dem aktuellen character auf
    getExcludeAttrField: (character) =>
        character.info.Clan === 'Nosferatu' ? 'Erscheinungsbild' : null,

    // Nosferatu: Erscheinungsbild in TraitSection deaktivieren
    getDisabledFields: (character) =>
        character.info.Clan === 'Nosferatu'
            ? { gesellschaftlich: { Erscheinungsbild: true } }
            : {},

    // ── Systemspezifische Effects ────────────────────────────────────────
    // BaseSheet ruft useSystemEffects?.({ character, setCharacter }) auf
    useSystemEffects: ({ character, setCharacter }) => {
        const isNosferatu = character.info.Clan === 'Nosferatu';

        // Nosferatu: Erscheinungsbild auf 0 erzwingen
        useEffect(() => {
            const val = character.attributes.gesellschaftlich?.Erscheinungsbild;
            if (isNosferatu && val !== 0) {
                setCharacter(p => ({
                    ...p,
                    attributes: {
                        ...p.attributes,
                        gesellschaftlich: { ...p.attributes.gesellschaftlich, Erscheinungsbild: 0 },
                    },
                }));
            } else if (!isNosferatu && val === 0) {
                setCharacter(p => ({
                    ...p,
                    attributes: {
                        ...p.attributes,
                        gesellschaftlich: { ...p.attributes.gesellschaftlich, Erscheinungsbild: 1 },
                    },
                }));
            }
        }, [character.info.Clan, character.attributes.gesellschaftlich?.Erscheinungsbild]);

        // Menschlichkeit: min = Gewissen + Selbstbeherrschung
        useEffect(() => {
            const min = character.advantages.tugenden.Gewissen + character.advantages.tugenden.Selbstbeherrschung;
            if (character.status.menschlichkeit < min) {
                setCharacter(p => ({ ...p, status: { ...p.status, menschlichkeit: min } }));
            }
        }, [
            character.advantages.tugenden.Gewissen,
            character.advantages.tugenden.Selbstbeherrschung,
            character.status.menschlichkeit,
        ]);

        // Willenskraft: min = Mut
        useEffect(() => {
            if (character.status.willenskraft < character.advantages.tugenden.Mut) {
                setCharacter(p => ({ ...p, status: { ...p.status, willenskraft: p.advantages.tugenden.Mut } }));
            }
        }, [character.advantages.tugenden.Mut, character.status.willenskraft]);

        // Generation + Blutvorrat synchron halten
        useEffect(() => {
            const { generation, bloodCapacity } = getGenerationInfo(character.advantages.hintergründe);
            const updates = {};
            if (character.info.Generation !== generation)
                updates.info = { ...character.info, Generation: generation };
            if (character.status.blutvorrat !== bloodCapacity)
                updates.status = { ...character.status, blutvorrat: bloodCapacity };
            if (Object.keys(updates).length)
                setCharacter(p => ({ ...p, ...updates }));
        }, [
            character.advantages.hintergründe,
            character.info.Generation,
            character.status.blutvorrat,
        ]);
    },

    // ── Render-Funktionen ────────────────────────────────────────────────

    renderRules: () => (
        <>
            <p><strong>📜 Attribut-Punkteverteilung</strong><br />Jeder Charakter beginnt mit 1 Punkt in jedem Attribut. Zusätzlich können 7, 5 und 3 Punkte auf die drei Kategorien verteilt werden.</p>
            <p><strong>⚙️ Fähigkeiten-Punkteverteilung</strong><br />Alle Fähigkeiten starten bei 0. Die drei Gruppen erhalten 13, 9 und 5 Punkte.</p>
            <p><strong>✨ Vorteile</strong><br /><strong>Disziplinen:</strong> 3 Punkte. <strong>Hintergründe:</strong> 5 Punkte. <strong>Tugenden:</strong> 7 Zusatzpunkte (Gesamt max. 10).</p>
            <p><strong>🧛 Nosferatu-Schwäche</strong><br />Erscheinungsbild wird auf 0 gesetzt und zählt nicht zu den Punktelimits.</p>
            <p><strong>💖 Menschlichkeit &amp; Willenskraft</strong><br />Menschlichkeit ≥ Gewissen + Selbstbeherrschung. Willenskraft ≥ Mut.</p>
            <p><strong>⭐ Freebies</strong><br />15 Punkte. Attribut 5, Fähigkeit 2, Disziplin 7, Hintergrund 1, Tugend 2, Menschlichkeit 2, Willenskraft 1 pro Punkt.</p>
        </>
    ),

    renderInfoField: (key, val, { character, setCharacter, theme }) => {
        const set = (patch) => setCharacter(p => ({ ...p, info: { ...p.info, ...patch } }));
        // Lade hier die aktuellen Farben aus deiner Theme-Datei!
        const t = themeConfig[theme] ?? themeConfig.emerald;

        if (key === 'Clan') return (
            <select
                value={val}
                onChange={(e) => {
                    const newClan   = e.target.value;
                    const clanDiscs = getClanDisciplines(newClan);
                    setCharacter(p => ({
                        ...p,
                        info: { ...p.info, Clan: newClan },
                        advantages: {
                            ...p.advantages,
                            disziplinen: clanDiscs.length > 0
                                ? clanDiscs.map(d => ({ name: d, value: 0 }))
                                : p.advantages.disziplinen,
                        },
                    }));
                }}
                className={`bg-transparent ${t.text} outline-none py-1 cursor-pointer`}
            >
                <option value="" className="bg-black italic">Wähle...</option>
                {Object.entries(VampireData.clans).map(([category, clans]) => (
                    <optgroup key={category} label={category} className="bg-black font-bold italic">
                        {Object.keys(clans).map(c => (
                            <option key={c} value={c} className="bg-black font-normal not-italic">{c}</option>
                        ))}
                    </optgroup>
                ))}
            </select>
        );

        if (key === 'Generation') {
            const genBg      = character.advantages.hintergründe.find(bg => bg.name === 'Generation');
            const isReadOnly = genBg && genBg.value > 0;
            return (
                <input
                    type="text"
                    value={val}
                    readOnly={isReadOnly}
                    onChange={(e) => set({ Generation: e.target.value })}
                    className={`bg-transparent outline-none py-1 ${t.text} ${isReadOnly ? 'opacity-70 cursor-default' : ''}`}
                />
            );
        }

        if (key === 'Konzept') return (
            <>
                <input list="vtm-concepts" value={val} onChange={(e) => set({ Konzept: e.target.value })}
                       className={`bg-transparent ${t.text} outline-none py-1`} />
                <datalist id="vtm-concepts">
                    {SharedData.concepts?.map((c, i) => <option key={i} value={c} />)}
                </datalist>
            </>
        );

        if (key === 'Wesen') return (
            <>
                <input list="vtm-natures" value={val} onChange={(e) => set({ Wesen: e.target.value })}
                       className={`bg-transparent ${t.text} outline-none py-1`} />
                <datalist id="vtm-natures">
                    {SharedData.natures?.map((n, i) => <option key={i} value={n} />)}
                </datalist>
            </>
        );

        if (key === 'Verhalten') return (
            <>
                <input list="vtm-demeanors" value={val} onChange={(e) => set({ Verhalten: e.target.value })}
                       className={`bg-transparent ${t.text} outline-none py-1`} />
                <datalist id="vtm-demeanors">
                    {SharedData.demeanors?.map((d, i) => <option key={i} value={d} />)}
                </datalist>
            </>
        );

        return (
            <input
                type="text"
                value={val}
                onChange={(e) => set({ [key]: e.target.value })}
                className={`bg-transparent outline-none py-1 ${t.text}`}
            />
        );
    },

    renderAdvantages: (sharedProps) => <VampireAdvantages {...sharedProps} />,
    renderStatus:     (sharedProps) => <VampireStatus     {...sharedProps} />,
    onRandomize:      randomizeCharacter,
};