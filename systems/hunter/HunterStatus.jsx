import React from "react";
import { DotRating } from "../../components";
import { healthLevels, minWillpower } from "./hunterHelpers";
import { themeConfig } from "../../components/ui/themes/themes";

export const HunterStatus = ({ character, setCharacter, freebie, showToast, theme }) => {
    const { tugenden } = character.advantages;
    const t = themeConfig[theme] ?? themeConfig.default;

    // --- Willpower ---
    const minWP = minWillpower(tugenden);
    const handleWillpowerChange = (newValue) => {
        const current = character.status.willenskraft;
        if (newValue === current) return;
        if (newValue < minWP) {
            showToast(`Willenskraft kann nicht unter ${minWP} sinken (Mut).`, "error");
            return;
        }
        if (freebie.freebiesActive) {
            const cost = freebie.getCost("willpower", current, newValue);
            if (cost > freebie.freebiePoints) {
                showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, "error");
                return;
            }
            setCharacter((p) => ({ ...p, status: { ...p.status, willenskraft: newValue } }));
            freebie.spend("willpower", current, newValue);
        } else {
            setCharacter((p) => ({ ...p, status: { ...p.status, willenskraft: newValue } }));
        }
    };

    // --- Conviction ---
    const handleConvictionChange = (newValue) => {
        const current = character.status.überzeugung;
        if (newValue === current) return;
        if (newValue < 1) {
            showToast("Überzeugung muss mindestens 1 sein.", "error");
            return;
        }
        if (freebie.freebiesActive) {
            const cost = freebie.getCost("conviction", current, newValue);
            if (cost > freebie.freebiePoints) {
                showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, "error");
                return;
            }
            setCharacter((p) => ({ ...p, status: { ...p.status, überzeugung: newValue } }));
            freebie.spend("conviction", current, newValue);
        } else {
            setCharacter((p) => ({ ...p, status: { ...p.status, überzeugung: newValue } }));
        }
    };

    return (
        <div className="space-y-8">
            {/* Health */}
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

            {/* Willpower */}
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

            {/* Conviction */}
            <div className="text-center">
                <h3 className={`text-xs ${t.emptyText} uppercase font-bold mb-2`}>Überzeugung</h3>
                <div className="flex justify-center">
                    <DotRating
                        theme={theme}
                        value={character.status.überzeugung}
                        max={10}
                        onChange={handleConvictionChange}
                    />
                </div>
                <div className="flex justify-center space-x-1.5 mt-2">
                    {[...Array(character.status.überzeugung)].map((_, i) => (
                        <div key={i} className={`w-4 h-4 border ${t.border} ${t.checkedBg}`} />
                    ))}
                    {[...Array(10 - character.status.überzeugung)].map((_, i) => (
                        <div key={i + character.status.überzeugung} className={`w-4 h-4 border ${t.border}`} />
                    ))}
                </div>
            </div>
        </div>
    );
};