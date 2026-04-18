import React, { useEffect } from "react";
import { SharedData } from "../../data/sharedData";
import { getEmptyHunter5e, Hunter5eCreeds, Hunter5eMerits, Hunter5eFlaws } from "./hunter5eData";
import { Hunter5eAdvantages } from "./Hunter5eAdvantages";
import { Hunter5eStatus } from "./Hunter5eStatus";
import { randomizeCharacter } from "./hunter5eRandomizer";
import { minWillpower } from "./hunter5eHelpers";
import { themeConfig } from "../../components/ui/themes/themes";

export const hunter5eConfig = {
    systemId: "h5",
    title: "Hunter",
    subtitle: "The Reckoning (5th Ed.)",
    theme: "hunter5e",

    freebieCount: 15,
    freebieCosts: {
        attribute: 5,
        ability: 2,
        edge: 7,
        background: 1,
        willpower: 1,
    },

    getEmptyCharacter: getEmptyHunter5e,
    meritsList: Hunter5eMerits,
    flawsList: Hunter5eFlaws,

    getExcludeAttrField: () => null,
    getDisabledFields: () => ({}),

    useSystemEffects: ({ character, setCharacter }) => {
        // Willenskraft >= Entschlossenheit
        useEffect(() => {
            const min = minWillpower(character.attributes);
            if (character.status.willenskraft < min) {
                setCharacter((p) => ({
                    ...p,
                    status: { ...p.status, willenskraft: min },
                }));
            }
        }, [character.attributes.geistig.Entschlossenheit, character.status.willenskraft]);
    },

    renderRules: () => (
        <>
            <p><strong>📜 Attribut-Punkteverteilung</strong><br/>Start 1 in jedem Attribut. 7/5/3 Punkte auf die drei Kategorien.</p>
            <p><strong>⚙️ Fähigkeiten</strong><br/>Start 0. 13/9/5 Punkte auf Talente, Fertigkeiten, Kenntnisse.</p>
            <p><strong>✨ Edges</strong><br/>3 Punkte. Hintergründe: 5 Punkte.</p>
            <p><strong>💖 Willenskraft</strong><br/>Start = Entschlossenheit, min = Entschlossenheit.</p>
            <p><strong>⭐ Freebies</strong><br/>15 Punkte. Attribut 5, Fähigkeit 2, Edge 7, Hintergrund 1, Willenskraft 1.</p>
        </>
    ),

    renderInfoField: (key, val, { character, setCharacter, theme }) => {
        const set = (patch) => setCharacter((p) => ({ ...p, info: { ...p.info, ...patch } }));
        const t = themeConfig[theme] ?? themeConfig.default;

        if (key === "Creed") {
            const creeds = Object.keys(Hunter5eCreeds);
            return (
                <select
                    value={val}
                    onChange={(e) => set({ Creed: e.target.value })}
                    className={`bg-transparent ${t.text} outline-none py-1 cursor-pointer`}
                >
                    <option value="" className="bg-black italic">Wähle...</option>
                    {creeds.map((c) => (
                        <option key={c} value={c} className="bg-black font-normal not-italic">{c}</option>
                    ))}
                </select>
            );
        }

        if (key === "Konzept" || key === "Ambition" || key === "Desire" || key === "Drive") {
            return (
                <input
                    type="text"
                    value={val}
                    onChange={(e) => set({ [key]: e.target.value })}
                    className={`bg-transparent outline-none py-1 ${t.text}`}
                />
            );
        }

        // Standard: einfaches Textfeld
        return (
            <input
                type="text"
                value={val}
                onChange={(e) => set({ [key]: e.target.value })}
                className={`bg-transparent outline-none py-1 ${t.text}`}
            />
        );
    },

    renderAdvantages: (sharedProps) => <Hunter5eAdvantages {...sharedProps} />,
    renderStatus: (sharedProps) => <Hunter5eStatus {...sharedProps} />,
    onRandomize: randomizeCharacter,
};