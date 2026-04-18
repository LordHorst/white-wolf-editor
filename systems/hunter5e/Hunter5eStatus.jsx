import React from "react";
import { DotRating } from "../../components";
import { healthLevels, minWillpower } from "./hunter5eHelpers";
import { themeConfig } from "../../components/ui/themes/themes";

export const Hunter5eStatus = ({ character, setCharacter, freebie, showToast, theme }) => {
    const t = themeConfig[theme] ?? themeConfig.default;
    const minWP = minWillpower(character.attributes);

    // --- Willenskraft ---
    const handleWillpowerChange = (newValue) => {
        const current = character.status.willenskraft;
        if (newValue === current) return;
        if (newValue < minWP) {
            showToast(`Willenskraft kann nicht unter ${minWP} sinken (Entschlossenheit).`, "error");
            return;
        }
        if (freebie.freebiesActive) {
            const cost = freebie.getCost("willpower", current, newValue);
            if (cost > freebie.freebiePoints) {
                showToast(`Nicht genug Freebies (${cost} benötigt).`, "error");
                return;
            }
            setCharacter((p) => ({ ...p, status: { ...p.status, willenskraft: newValue } }));
            freebie.spend("willpower", current, newValue);
        } else {
            setCharacter((p) => ({ ...p, status: { ...p.status, willenskraft: newValue } }));
        }
    };

    // --- Gefahr (0-5) ---
    const handleDangerChange = (newValue) => {
        setCharacter((p) => ({ ...p, status: { ...p.status, gefahr: newValue } }));
    };

    // --- Verzweiflung (0-5) ---
    const handleDesperationChange = (newValue) => {
        setCharacter((p) => ({ ...p, status: { ...p.status, verzweiflung: newValue } }));
    };

    return (
        <div className="space-y-8">
            {/* Gesundheit (V5-Stil: Checkboxen pro Stufe) */}
            <div className="text-center">
                <h3 className={`text-xs ${t.emptyText} uppercase font-bold mb-2`}>Gesundheit</h3>
                <div className="grid grid-cols-2 gap-1">
                    {character.status.gesundheit.map((level, idx) => (
                        <div key={idx} className="flex items-center justify-between text-[10px]">
                            <span>{healthLevels[idx]}</span>
                            <input
                                type="checkbox"
                                checked={level === "x"}
                                onChange={(e) => {
                                    const newHealth = [...character.status.gesundheit];
                                    newHealth[idx] = e.target.checked ? "x" : "";
                                    setCharacter((p) => ({ ...p, status: { ...p.status, gesundheit: newHealth } }));
                                }}
                                className="form-checkbox h-3 w-3"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Willenskraft */}
            <div className="text-center">
                <h3 className={`text-xs ${t.emptyText} uppercase font-bold mb-2`}>Willenskraft</h3>
                <div className="flex justify-center">
                    <DotRating
                        theme={theme}
                        value={character.status.willenskraft}
                        max={10}
                        onChange={handleWillpowerChange}
                    />
                </div>
                <div className={`text-[9px] ${t.descriptionText} mt-1`}>Min: {minWP}</div>
                <div className="flex justify-center space-x-1.5 mt-2">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className={`w-4 h-4 border ${t.border}`} />
                    ))}
                </div>
            </div>

            {/* Gefahr & Verzweiflung */}
            <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                    <h3 className={`text-xs ${t.emptyText} uppercase font-bold mb-2`}>Gefahr</h3>
                    <DotRating theme={theme} value={character.status.gefahr} max={5} onChange={handleDangerChange} />
                </div>
                <div>
                    <h3 className={`text-xs ${t.emptyText} uppercase font-bold mb-2`}>Verzweiflung</h3>
                    <DotRating
                        theme={theme}
                        value={character.status.verzweiflung}
                        max={5}
                        onChange={handleDesperationChange}
                    />
                </div>
            </div>
        </div>
    );
};