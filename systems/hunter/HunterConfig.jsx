import React, { useEffect } from "react";
import { SharedData } from "../../data/sharedData";
import {getEmptyHunter, HunterMerits, HunterFlaws, getCreedEdges, HunterCreeds} from "./hunterData";
import { HunterAdvantages } from "./HunterAdvantages";
import { HunterStatus } from "./HunterStatus";
import { randomizeCharacter } from "./hunterRandomizer";
import { minWillpower } from "./hunterHelpers";
import { themeConfig } from "../../components/ui/themes/themes";

export const hunterConfig = {
    systemId: "htr",
    title: "Hunter",
    subtitle: "The Reckoning",
    theme: "hunter",

    freebieCount: 15,
    freebieCosts: {
        attribute: 5,
        ability: 2,
        edge: 7,
        background: 1,
        virtue: 2,
        willpower: 1,
        conviction: 1,
    },

    getEmptyCharacter: getEmptyHunter,
    meritsList: HunterMerits,
    flawsList: HunterFlaws,

    // No special exclusions like Nosferatu
    getExcludeAttrField: () => null,
    getDisabledFields: () => ({}),

    useSystemEffects: ({ character, setCharacter }) => {
        // Ensure Willpower >= Courage
        useEffect(() => {
            const min = minWillpower(character.advantages.tugenden);
            if (character.status.willenskraft < min) {
                setCharacter((p) => ({
                    ...p,
                    status: { ...p.status, willenskraft: min },
                }));
            }
        }, [character.advantages.tugenden.Mut, character.status.willenskraft]);

        // When Creed changes, reset Edges to the new creed's default list (values preserved if possible)
        useEffect(() => {
            const creed = character.info.Creed;
            const allowedEdges = getCreedEdges(creed);
            if (allowedEdges.length === 0) return;

            const currentEdges = character.advantages.edges;
            // Try to keep existing values if the edge names match the new creed
            const newEdges = allowedEdges.map((name) => {
                const existing = currentEdges.find((e) => e.name === name);
                return existing ? { ...existing } : { name, value: 0 };
            });
            // Ensure we have exactly 3 slots (or more if creed has more, but we limit to 3)
            while (newEdges.length < 3) newEdges.push({ name: "", value: 0 });
            setCharacter((p) => ({
                ...p,
                advantages: { ...p.advantages, edges: newEdges.slice(0, 3) },
            }));
        }, [character.info.Creed, character.advantages.edges]);
    },

    renderRules: () => (
        <>
            <p><strong>📜 Attribut-Punkteverteilung</strong><br/>Jeder Charakter beginnt mit 1 Punkt in jedem Attribut.
                Zusätzlich können 7, 5 und 3 Punkte auf die drei Kategorien verteilt werden.</p>
            <p><strong>⚙️ Fähigkeiten-Punkteverteilung</strong><br/>Alle Fähigkeiten starten bei 0. Die drei Gruppen
                erhalten 13, 9 und 5 Punkte.</p>
            <p><strong>✨ Vorteile</strong><br/><strong>Edges:</strong> 3 Punkte. <strong>Hintergründe:</strong> 5
                Punkte. <strong>Tugenden:</strong> 7 Zusatzpunkte (Gesamt max. 10).</p>
            <p><strong>🧛 Keine Clanschwäche</strong><br/>Jäger haben keine Clans, aber ihr Creed prägt ihre Edges.</p>
            <p><strong>💖 Willenskraft & Überzeugung</strong><br/>Willenskraft ≥ Mut. Überzeugung ist unabhängig.</p>
            <p><strong>⭐ Freebies</strong><br/>15 Punkte. Attribut 5, Fähigkeit 2, Edge 7, Hintergrund 1, Tugend 2,
                Willenskraft 1, Überzeugung 1 pro Punkt.</p>
        </>
    ),

    renderInfoField: (key, val, { character, setCharacter, theme }) => {
        const set = (patch) => setCharacter((p) => ({ ...p, info: { ...p.info, ...patch } }));
        const t = themeConfig[theme] ?? themeConfig.default;

        if (key === "Creed") {
            const creeds = Object.keys(HunterCreeds);
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

        if (key === "Nature") {
            return (
                <>
                    <input
                        list="htr-natures"
                        value={val}
                        onChange={(e) => set({ Nature: e.target.value })}
                        className={`bg-transparent ${t.text} outline-none py-1`}
                    />
                    <datalist id="htr-natures">
                        {SharedData.natures?.map((n, i) => <option key={i} value={n} />)}
                    </datalist>
                </>
            );
        }

        if (key === "Demeanor") {
            return (
                <>
                    <input
                        list="htr-demeanors"
                        value={val}
                        onChange={(e) => set({ Demeanor: e.target.value })}
                        className={`bg-transparent ${t.text} outline-none py-1`}
                    />
                    <datalist id="htr-demeanors">
                        {SharedData.demeanors?.map((d, i) => <option key={i} value={d} />)}
                    </datalist>
                </>
            );
        }

        if (key === "Konzept") {
            return (
                <>
                    <input
                        list="htr-concepts"
                        value={val}
                        onChange={(e) => set({ Konzept: e.target.value })}
                        className={`bg-transparent ${t.text} outline-none py-1`}
                    />
                    <datalist id="htr-concepts">
                        {SharedData.concepts?.map((c, i) => <option key={i} value={c} />)}
                    </datalist>
                </>
            );
        }

        return (
            <input
                type="text"
                value={val}
                onChange={(e) => set({ [key]: e.target.value })}
                className={`bg-transparent outline-none py-1 ${t.text}`}
            />
        );
    },

    renderAdvantages: (sharedProps) => <HunterAdvantages {...sharedProps} />,
    renderStatus: (sharedProps) => <HunterStatus {...sharedProps} />,
    onRandomize: randomizeCharacter,
};