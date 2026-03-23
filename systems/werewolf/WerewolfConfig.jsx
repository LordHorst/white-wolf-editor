// systems/werewolf/WerewolfConfig.jsx
import React from 'react';
import { getEmptyWerewolf } from '../../data/templates';
import { SharedData } from '../../data/sharedData';
import { WerewolfData, WerewolfMerits, WerewolfFlaws } from './werewolfData';
import { WerewolfAdvantages } from './WerewolfAdvantages';
import { WerewolfStatus } from './WerewolfStatus';
import { themeConfig } from "../../components/ui/themes/themes";

export const werewolfConfig = {
    systemId:  'wta',
    title:     'Werewolf',
    subtitle:  'The Apocalypse',
    theme:     'werewolf',

    freebieCount: 15,
    freebieCosts: {
        attribute: 5, ability: 2, background: 1,
        renown: 2, rage: 2, gnosis: 2, willpower: 1,
    },

    getEmptyCharacter: getEmptyWerewolf,
    meritsList: WerewolfMerits,
    flawsList:  WerewolfFlaws,

    /**
     * Ermittelt Felder, die für bestimmte Abstammungen gesperrt sind.
     * Lupus dürfen zu Beginn keine technischen/menschlichen Wissensgebiete wählen.
     */
    getDisabledFields: (character) => {
        if (character.info.Abstammung === 'Lupus') {
            return {
                kenntnisse: {
                    Computer: true,
                    Naturwissenschaften: true,
                    Gesetzeskenntnis: true,
                },
                fertigkeiten: {
                    Fahren: true,
                },
            };
        }
        return {};
    },

    // ── Render-Funktionen ────────────────────────────────────────────────

    renderRules: () => (
        <div className="space-y-4">
            <div>
                <h4 className="font-bold text-stone-300 mb-1 uppercase text-xs tracking-wider">Abstammungen (Breeds)</h4>
                <div className="grid grid-cols-1 gap-3 text-stone-400 text-[13px]">
                    <p><strong>Homid:</strong> Gnosis 1. Startet in der Menschenwelt.</p>
                    <p><strong>Metis:</strong> Gnosis 3. Deformiert, regeneriert in Crinos.</p>
                    <p><strong>Lupus:</strong> Gnosis 5. Keine technischen Abilities zu Beginn.</p>
                </div>
            </div>
            <p><strong>📜 Attribute:</strong> 7 / 5 / 3 Punkte.</p>
            <p><strong>⚙️ Fähigkeiten:</strong> 13 / 9 / 5 Punkte.</p>
        </div>
    ),

    renderInfoField: (key, val, { character, setCharacter, theme }) => {
        const t = themeConfig[theme] ?? themeConfig.emerald;
        const set = (patch) => setCharacter(p => ({ ...p, info: { ...p.info, ...patch } }));

        // Spezial-Logik für Abstammung (Breed) Auswahl
        if (key === 'Abstammung') {
            const breeds = {
                'Homid': 1,
                'Metis': 3,
                'Lupus': 5
            };

            return (
                <select
                    value={val}
                    onChange={(e) => {
                        const newBreed = e.target.value;
                        const startGnosis = breeds[newBreed] || 1;

                        setCharacter(p => ({
                            ...p,
                            info: { ...p.info, Abstammung: newBreed },
                            status: { ...p.status, gnosis: startGnosis }
                        }));
                    }}
                    className={`bg-transparent ${t.text} outline-none py-1 cursor-pointer`}
                >
                    <option value="" className="bg-stone-900 italic">Wähle...</option>
                    {Object.keys(breeds).map(b => (
                        <option key={b} value={b} className="bg-stone-900">{b}</option>
                    ))}
                </select>
            );
        }

        // Standard-Dropdowns für Stamm und Vorzeichen
        if (key === 'Stamm') {
            return (
                <select
                    value={val}
                    onChange={(e) => set({ Stamm: e.target.value })}
                    className={`bg-transparent ${t.text} outline-none py-1 cursor-pointer`}
                >
                    <option value="" className="bg-stone-900 italic">Wähle...</option>
                    {WerewolfData.tribes.map(tribe => (
                        <option key={tribe} value={tribe} className="bg-stone-900">{tribe}</option>
                    ))}
                </select>
            );
        }

        if (key === 'Vorzeichen') {
            return (
                <select
                    value={val}
                    onChange={(e) => set({ Vorzeichen: e.target.value })}
                    className={`bg-transparent ${t.text} outline-none py-1 cursor-pointer`}
                >
                    <option value="" className="bg-stone-900 italic">Wähle...</option>
                    {WerewolfData.auspices.map(auspice => (
                        <option key={auspice} value={auspice} className="bg-stone-900">{auspice}</option>
                    ))}
                </select>
            );
        }

        // Shared Data Inputs
        if (['Konzept', 'Wesen', 'Verhalten'].includes(key)) {
            const listId = `wta-${key.toLowerCase()}`;
            const dataMap = { 'Konzept': SharedData.concepts, 'Wesen': SharedData.natures, 'Verhalten': SharedData.demeanors };
            return (
                <>
                    <input list={listId} value={val}
                           onChange={(e) => set({ [key]: e.target.value })}
                           className={`bg-transparent ${t.text} outline-none py-1`} />
                    <datalist id={listId}>
                        {dataMap[key]?.map((item, i) => <option key={i} value={item} />)}
                    </datalist>
                </>
            );
        }

        return (
            <input type="text" value={val} onChange={(e) => set({ [key]: e.target.value })}
                   className={`bg-transparent outline-none py-1 ${t.text}`} />
        );
    },

    renderAdvantages: (sharedProps) => <WerewolfAdvantages {...sharedProps} />,
    renderStatus:     (sharedProps) => <WerewolfStatus     {...sharedProps} />,
};