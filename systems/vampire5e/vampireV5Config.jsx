// systems/vampire5e/vampireV5Config.js
import React from 'react';
import { getEmptyVampireV5 } from '../../data/vampireV5Template';
import { SharedData } from '../../data/sharedData';
import { VampireV5Data, VampireV5Merits, VampireV5Flaws } from './vampireV5Data';
import { VampireV5Advantages } from './VampireV5Advantages';
import { VampireV5Status } from './VampireV5Status';
import { randomizeCharacter } from './vampireV5Randomizer';
import { themeConfig } from "../../components/ui/themes/themes";

export const vampireV5Config = {
    systemId:  'vtm5',
    title:     'Vampire',
    subtitle:  'The Masquerade 5th Edition',
    theme:     'red',

    getEmptyCharacter: getEmptyVampireV5,
    meritsList: VampireV5Merits,
    flawsList:  VampireV5Flaws,

    renderRules: () => (
        <>
            <p><strong>📜 Attribute</strong><br />
                Primär: 4 Punkte verteilen. Sekundär: 3. Tertiär: 2. Alle starten bei 1.</p>
            <p><strong>⚙️ Fertigkeiten</strong><br />
                Primär: 8 Punkte (max. 3). Sekundär: 5 (max. 3). Tertiär: 2 (max. 3).</p>
            <p><strong>🩸 Hunger</strong><br />
                Hunger ersetzt den Blutvorrat. Bei Hunger 5 wird jeder Wurf gefährlich.</p>
            <p><strong>💔 Schaden</strong><br />
                Oberflächlicher Schaden (/) heilt leichter. Aggressiver Schaden (X) nicht.</p>
        </>
    ),
    
    renderInfoField: (key, val, { character, setCharacter, theme }) => {
        const t = themeConfig[theme] ?? themeConfig.default;
        const set = (patch) => setCharacter(p => ({ ...p, info: { ...p.info, ...patch } }));

        if (key === 'Clan') return (
            <select value={val} onChange={(e) => set({ Clan: e.target.value })}
                className={`bg-transparent ${t.text} outline-none py-1 cursor-pointer`}
            >
                <option value="" className="bg-black">Wähle...</option>
                {VampireV5Data.clans.map(c => (
                    <option key={c} value={c} className="bg-black">{c}</option>
                ))}
            </select>
        );

        if (key === 'Vorzeichen') return (
            <select value={val} onChange={(e) => set({ Vorzeichen: e.target.value })}
                className={`bg-transparent ${t.text} outline-none py-1 cursor-pointer`}
            >
                <option value="" className="bg-black">Wähle...</option>
                {VampireV5Data.predatorTypes.map(p => (
                    <option key={p} value={p} className="bg-black">{p}</option>
                ))}
            </select>
        );

        if (key === 'Konzept') return (
            <input list="v5-concepts" value={val}
                onChange={(e) => set({ Konzept: e.target.value })}
                className={`bg-transparent ${t.text} outline-none py-1`}
            />/
            <datalist id="v5-concepts">
                {SharedData.concepts?.map((c, i) => <option key={i} value={c} />)}
            </datalist>
        );

        return (
            <input type="text" value={val}
                onChange={(e) => set({ [key]: e.target.value })}
                className="bg-transparent outline-none py-1 text-red-100" />
        );
    },

    renderAdvantages: (sharedProps) => <VampireV5Advantages {...sharedProps} />,
    renderStatus:     (sharedProps) => <VampireV5Status     {...sharedProps} />,
    onRandomize:      randomizeCharacter,
};
