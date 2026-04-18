import React from "react";
import { BackgroundListItem, DotRating, ListTrait } from "../../components";
import { getPredefinedBackgrounds, sumEdges, sumBackgrounds } from "./hunter5eHelpers";
import { getAllEdges, Hunter5eBackgrounds } from "./hunter5eData";

export const Hunter5eAdvantages = ({ character, setCharacter, freebie, showToast, theme }) => {
    // --- Edges (max. 3 Punkte) ---
    const edgesTotal = sumEdges(character.advantages.edges);
    const allEdges = getAllEdges();

    const handleEdgesChange = (index, name, value) => {
        const newList = [...character.advantages.edges];
        if (name !== undefined) newList[index] = { ...newList[index], name };
        if (value !== undefined) {
            const oldValue = newList[index].value;
            newList[index] = { ...newList[index], value };
            const newTotal = sumEdges(newList);

            if (freebie.freebiesActive) {
                const cost = freebie.getCost("edge", oldValue, value);
                if (cost > freebie.freebiePoints) {
                    showToast(`Nicht genug Freebies (${cost} benötigt).`, "error");
                    return;
                }
                setCharacter((p) => ({ ...p, advantages: { ...p.advantages, edges: newList } }));
                freebie.spend("edge", oldValue, value);
            } else {
                if (newTotal <= 3) {
                    setCharacter((p) => ({ ...p, advantages: { ...p.advantages, edges: newList } }));
                } else {
                    showToast(`Maximal 3 Punkte in Edges erlaubt (${newTotal}).`, "error");
                }
            }
        } else {
            setCharacter((p) => ({ ...p, advantages: { ...p.advantages, edges: newList } }));
        }
    };

    // --- Hintergründe (max. 5 Punkte) ---
    const backgroundsTotal = sumBackgrounds(character.advantages.hintergründe);

    const handleBackgroundsChange = (index, name, value) => {
        const newList = [...character.advantages.hintergründe];
        if (name !== undefined) newList[index] = { ...newList[index], name };
        if (value !== undefined) {
            const oldValue = newList[index].value;
            newList[index] = { ...newList[index], value };
            const newTotal = sumBackgrounds(newList);

            if (freebie.freebiesActive) {
                const cost = freebie.getCost("background", oldValue, value);
                if (cost > freebie.freebiePoints) {
                    showToast(`Nicht genug Freebies (${cost} benötigt).`, "error");
                    return;
                }
                setCharacter((p) => ({ ...p, advantages: { ...p.advantages, hintergründe: newList } }));
                freebie.spend("background", oldValue, value);
            } else {
                if (newTotal <= 5) {
                    setCharacter((p) => ({ ...p, advantages: { ...p.advantages, hintergründe: newList } }));
                } else {
                    showToast(`Maximal 5 Punkte in Hintergründen erlaubt (${newTotal}).`, "error");
                }
            }
        } else {
            setCharacter((p) => ({ ...p, advantages: { ...p.advantages, hintergründe: newList } }));
        }
    };

    // --- Antrieb (Drive) ---
    const handleDriveChange = (e) => {
        setCharacter((p) => ({
            ...p,
            advantages: { ...p.advantages, drive: e.target.value },
        }));
    };

    return (
        <section className="mb-8">
            <h2 className={`text-xl font-bold uppercase tracking-widest text-${theme}-500 text-center py-2 mb-6 bg-${theme}-950/20`}>
                Vorteile
            </h2>
            <div className="grid grid-cols-2 gap-8">
                {/* Edges */}
                <ListTrait
                    block={character.advantages.edges}
                    title={`Edges (${edgesTotal}/3)`}
                    theme={theme}
                    onChange={handleEdgesChange}
                    max={5}
                    predefinedOptions={allEdges}
                />

                {/* Hintergründe */}
                <div>
                    <h3 className={`text-xs font-bold text-${theme}-700 uppercase mb-4`}>
                        Hintergründe ({backgroundsTotal}/5)
                    </h3>
                    {character.advantages.hintergründe.map((bg, idx) => (
                        <BackgroundListItem
                            key={idx}
                            item={bg}
                            index={idx}
                            onChange={handleBackgroundsChange}
                            predefinedOptions={getPredefinedBackgrounds()}
                            backgroundsData={Hunter5eBackgrounds}
                            theme={theme}
                        />
                    ))}
                </div>
            </div>

            {/* Drive (Antrieb) */}
            <div className="mt-6">
                <h3 className={`text-xs font-bold text-${theme}-700 uppercase mb-2`}>Antrieb (Drive)</h3>
                <input
                    type="text"
                    value={character.advantages.drive || ""}
                    onChange={handleDriveChange}
                    className={`w-full bg-${theme}-950/30 border border-${theme}-700/30 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-${theme}-500`}
                    placeholder="z. B. «Räche meinen Bruder»"
                />
            </div>
        </section>
    );
};