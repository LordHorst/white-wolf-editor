// systems/changeling/changelingConfig.js
import React from 'react';
import {SharedData} from '../../data/sharedData';
import {ChangelingData, ChangelingFlaws, ChangelingMerits, getEmptyChangeling} from './changelingData';
import {ChangelingAdvantages} from './ChangelingAdvantages';
import {ChangelingStatus} from './ChangelingStatus';
import {themeConfig} from "../../components/ui/themes/themes";
import {randomizeCharacter} from "./changelingRandomizer";
// ─── Config ──────────────────────────────────────────────────────────────────
export const changelingConfig = {
    systemId: 'ctd',
    title: 'Changeling',
    subtitle: 'The Dreaming',
    theme: 'changeling',

    freebieCount: 15,
    freebieCosts: {
        attribute: 5, ability: 2, background: 1, willpower: 1,
    },

    getEmptyCharacter: getEmptyChangeling,
    meritsList: ChangelingMerits,
    flawsList: ChangelingFlaws,

    renderRules: () => (
        <>
            <p><strong>📜 Attribute</strong><br/>7 / 5 / 3 Punkte auf die drei Kategorien.</p>
            <p><strong>⚙️ Fähigkeiten</strong><br/>13 / 9 / 5 Punkte.</p>
            <p><strong>⭐ Freebies</strong><br/>15 Punkte.</p>
        </>
    ),

    renderInfoField: (key, val, {setCharacter, theme}) => {
        const t = themeConfig[theme] ?? themeConfig.default;
        const set = (patch) => setCharacter(p => ({...p, info: {...p.info, ...patch}}));

        if (key === 'Kith') return (
            <select value={val} onChange={(e) => set({Kith: e.target.value})}
                    className={`bg-transparent ${t.text} outline-none py-1 cursor-pointer`}>
                <option value="" className="bg-black">Wähle...</option>
                {ChangelingData.kiths.map(k => <option key={k} value={k} className="bg-black">{k}</option>)}
            </select>
        );

        if (key === 'Hof') return (
            <select value={val} onChange={(e) => set({Hof: e.target.value})}
                    className={`bg-transparent ${t.text} outline-none py-1 cursor-pointer`}>
                <option value="" className="bg-black">Wähle...</option>
                {ChangelingData.courts.map(c => <option key={c} value={c} className="bg-black">{c}</option>)}
            </select>
        );

        if (key === 'Konzept') return (
            <>
                <input list="ctd-concepts" value={val}
                       onChange={(e) => set({Konzept: e.target.value})}
                       className={`bg-transparent ${t.text} outline-none py-1`}/>
                <datalist id="ctd-concepts">
                    {SharedData.concepts?.map((c, i) => <option key={i} value={c}/>)}
                </datalist>
            </>
        );

        return (
            <input type="text" value={val} onChange={(e) => set({[key]: e.target.value})}
                   className={`bg-transparent outline-none py-1 ${t.text}`}/>
        );
    },

    renderAdvantages: (sharedProps) => <ChangelingAdvantages {...sharedProps} />,
    renderStatus: (sharedProps) => <ChangelingStatus     {...sharedProps} />,
    onRandomize: randomizeCharacter,
};