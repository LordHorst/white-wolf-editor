// systems/changeling/changelingConfig.js
import React from 'react';
import { SharedData } from '../../data/sharedData';
import { ChangelingData, ChangelingMerits, ChangelingFlaws } from './changelingData';
import { ChangelingAdvantages } from './ChangelingAdvantages';
import { ChangelingStatus } from './ChangelingStatus';

// ─── Leerer Charakter ────────────────────────────────────────────────────────
const getEmptyChangeling = () => ({
    info: {
        Name: '', Spieler: '', Chronik: '',
        Kith: '', Hof: '', Konzept: '',
        Wesen: '', Verhalten: '',
    },
    attributes: {
        körperlich:      { Körperkraft: 1, Geschick: 1, Widerstandsfähigkeit: 1 },
        gesellschaftlich: { Charisma: 1, Manipulation: 1, Erscheinungsbild: 1 },
        geistig:         { Wahrnehmung: 1, Intelligenz: 1, Geistesschärfe: 1 },
    },
    abilities: {
        talente:     { Aufmerksamkeit: 0, Ausflüchte: 0, Empathie: 0, Führungsqualitäten: 0, Handgemenge: 0, Sportlichkeit: 0 },
        fertigkeiten:{ Etikette: 0, Handwerk: 0, Heimlichkeit: 0, Nahkampf: 0, Überleben: 0 },
        kenntnisse:  { Akademisches_Wissen: 0, Computer: 0, Medizin: 0, Okkultismus: 0 },
    },
    advantages: {
        hintergründe: [
            { name: '', value: 0 }, { name: '', value: 0 }, { name: '', value: 0 },
            { name: '', value: 0 }, { name: '', value: 0 },
        ],
    },
    status: {
        glamour:      1,
        banality:     1,
        willenskraft: 3,
        gesundheit:   JSON.parse(JSON.stringify(SharedData.initialHealth)),
    },
    extra:  { erfahrung: '', vorzügeSchwächen: [] },
    merits: [],
    flaws:  [],
});

// ─── Config ──────────────────────────────────────────────────────────────────
export const changelingConfig = {
    systemId:  'ctd',
    title:     'Changeling',
    subtitle:  'The Dreaming',
    theme:     'sky',
    bgColor:   '#020b14',

    freebieCount: 15,
    freebieCosts: {
        attribute: 5, ability: 2, background: 1, willpower: 1,
    },

    getEmptyCharacter: getEmptyChangeling,
    meritsList: ChangelingMerits,
    flawsList:  ChangelingFlaws,

    renderRules: () => (
        <>
            <p><strong>📜 Attribute</strong><br />7 / 5 / 3 Punkte auf die drei Kategorien.</p>
            <p><strong>⚙️ Fähigkeiten</strong><br />13 / 9 / 5 Punkte.</p>
            <p><strong>⭐ Freebies</strong><br />15 Punkte.</p>
        </>
    ),

    renderInfoField: (key, val, { setCharacter, theme }) => {
        const set = (patch) => setCharacter(p => ({ ...p, info: { ...p.info, ...patch } }));

        if (key === 'Kith') return (
            <select value={val} onChange={(e) => set({ Kith: e.target.value })}
                    className={`bg-transparent text-${theme}-100 outline-none py-1 cursor-pointer`}>
                <option value="" className="bg-black">Wähle...</option>
                {ChangelingData.kiths.map(k => <option key={k} value={k} className="bg-black">{k}</option>)}
            </select>
        );

        if (key === 'Hof') return (
            <select value={val} onChange={(e) => set({ Hof: e.target.value })}
                    className={`bg-transparent text-${theme}-100 outline-none py-1 cursor-pointer`}>
                <option value="" className="bg-black">Wähle...</option>
                {ChangelingData.courts.map(c => <option key={c} value={c} className="bg-black">{c}</option>)}
            </select>
        );

        if (key === 'Konzept') return (
            <>
                <input list="ctd-concepts" value={val}
                       onChange={(e) => set({ Konzept: e.target.value })}
                       className={`bg-transparent text-${theme}-100 outline-none py-1`} />
                <datalist id="ctd-concepts">
                    {SharedData.concepts?.map((c, i) => <option key={i} value={c} />)}
                </datalist>
            </>
        );

        return (
            <input type="text" value={val} onChange={(e) => set({ [key]: e.target.value })}
                   className={`bg-transparent outline-none py-1 text-${theme}-100`} />
        );
    },

    renderAdvantages: (sharedProps) => <ChangelingAdvantages {...sharedProps} />,
    renderStatus:     (sharedProps) => <ChangelingStatus     {...sharedProps} />,
};