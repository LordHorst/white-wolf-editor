import React from "react";
import { BackgroundListItem, DotRating, ListTrait } from "../../components";
import { getPredefinedBackgrounds, sumEdges, sumVirtues } from "./hunterHelpers";
import { getCreedEdges, HunterBackgrounds } from "./hunterData";
import {themeConfig} from "../../components/ui/themes/themes";

export const HunterAdvantages = ({ character, setCharacter, freebie, showToast, theme }) => {
    const t = themeConfig[theme] ?? themeConfig.default;
    // --- Edges ---
    const edgesTotal = sumEdges(character.advantages.edges);
    const allowedEdges = getCreedEdges(character.info.Creed);

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
                    showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, "error");
                    return;
                }
                setCharacter((p) => ({ ...p, advantages: { ...p.advantages, edges: newList } }));
                freebie.spend("edge", oldValue, value);
            } else {
                if (newTotal <= 3) {
                    setCharacter((p) => ({ ...p, advantages: { ...p.advantages, edges: newList } }));
                } else {
                    showToast(`Maximal 3 Punkte in Edges erlaubt (aktuell ${newTotal}).`, "error");
                }
            }
        } else {
            setCharacter((p) => ({ ...p, advantages: { ...p.advantages, edges: newList } }));
        }
    };

    // --- Backgrounds ---
    const backgroundsTotal = character.advantages.hintergründe.reduce((sum, bg) => sum + bg.value, 0);

    const handleBackgroundsChange = (index, name, value) => {
        const newList = [...character.advantages.hintergründe];
        if (name !== undefined) newList[index] = { ...newList[index], name };
        if (value !== undefined) {
            const oldValue = newList[index].value;
            newList[index] = { ...newList[index], value };
            const newTotal = newList.reduce((sum, bg) => sum + bg.value, 0);

            if (freebie.freebiesActive) {
                const cost = freebie.getCost("background", oldValue, value);
                if (cost > freebie.freebiePoints) {
                    showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, "error");
                    return;
                }
                setCharacter((p) => ({ ...p, advantages: { ...p.advantages, hintergründe: newList } }));
                freebie.spend("background", oldValue, value);
            } else {
                if (newTotal <= 5) {
                    setCharacter((p) => ({ ...p, advantages: { ...p.advantages, hintergründe: newList } }));
                } else {
                    showToast(`Maximal 5 Punkte in Hintergründen erlaubt (aktuell ${newTotal}).`, "error");
                }
            }
        } else {
            setCharacter((p) => ({ ...p, advantages: { ...p.advantages, hintergründe: newList } }));
        }
    };

    // --- Virtues ---
    const virtuesTotal = sumVirtues(character.advantages.tugenden);
    const extraVirtues = virtuesTotal - 3; // because each starts at 1

    const handleVirtueChange = (name, newValue) => {
        const oldValue = character.advantages.tugenden[name];
        if (newValue === oldValue) return;
        const newVirtues = { ...character.advantages.tugenden, [name]: newValue };
        const newTotal = sumVirtues(newVirtues);

        if (freebie.freebiesActive) {
            const cost = freebie.getCost("virtue", oldValue, newValue);
            if (cost > freebie.freebiePoints) {
                showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, "error");
                return;
            }
            setCharacter((p) => ({ ...p, advantages: { ...p.advantages, tugenden: newVirtues } }));
            freebie.spend("virtue", oldValue, newValue);
        } else {
            if (newTotal <= 10) {
                setCharacter((p) => ({ ...p, advantages: { ...p.advantages, tugenden: newVirtues } }));
            } else {
                showToast("Maximal 10 Punkte in Tugenden (Basis 3 + 7 extra).", "error");
            }
        }
    };

    return (
        <section className="mb-8">
            <h2 className={`text-xl font-bold uppercase tracking-widest ${t.text} text-center py-2 mb-6 ${t.bg}`}>
                Vorteile
            </h2>
            <div className="grid grid-cols-3 gap-8">
                {/* Edges */}
                <ListTrait
                    block={character.advantages.edges}
                    title={`Edges (${edgesTotal}/3)`}
                    theme={theme}
                    onChange={handleEdgesChange}
                    max={5}
                    predefinedOptions={allowedEdges}
                />

                {/* Backgrounds */}
                <div>
                    <h3 className={`text-xs font-bold ${t.text} uppercase mb-4`}>
                        Hintergründe ({backgroundsTotal}/5)
                    </h3>
                    {character.advantages.hintergründe.map((bg, idx) => (
                        <BackgroundListItem
                            key={idx}
                            item={bg}
                            index={idx}
                            onChange={handleBackgroundsChange}
                            predefinedOptions={getPredefinedBackgrounds()}
                            backgroundsData={HunterBackgrounds}
                            theme={theme}
                        />
                    ))}
                </div>

                {/* Virtues */}
                <div>
                    <h3 className={`text-xs font-bold ${t.text} uppercase mb-4`}>
                        Tugenden ({extraVirtues}/7)
                    </h3>
                    {Object.entries(character.advantages.tugenden).map(([name, val]) => (
                        <div key={name} className="flex justify-between items-center mb-3">
                            <span className="text-xs">{name}</span>
                            <DotRating
                                theme={theme}
                                value={val}
                                min={1}
                                max={5}
                                onChange={(v) => handleVirtueChange(name, v)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};