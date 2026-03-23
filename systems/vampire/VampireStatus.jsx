// systems/vampire/VampireStatus.jsx
import React from 'react';
import { DotRating } from '../../components/sheetImports';
import { getGenerationInfo } from './vampireHelpers';

/**
 * Zeigt Menschlichkeit, Willenskraft, Blutvorrat und Gesundheit.
 * Empfängt sharedProps aus BaseSheet:
 *   { character, setCharacter, freebie, showToast, theme }
 */
export const VampireStatus = ({ character, setCharacter, freebie, showToast, theme }) => {
    const { tugenden }    = character.advantages;
    const { bloodCapacity } = getGenerationInfo(character.advantages.hintergründe);

    // ─── Menschlichkeit ──────────────────────────────────────────────────
    const minHumanity = tugenden.Gewissen + tugenden.Selbstbeherrschung;

    const handleHumanityChange = (newValue) => {
        const current = character.status.menschlichkeit;
        if (newValue === current) return;
        if (newValue < minHumanity) {
            showToast(`Menschlichkeit kann nicht unter ${minHumanity} sinken (Gewissen + Selbstbeherrschung).`, 'error');
            return;
        }
        if (freebie.freebiesActive) {
            const cost = freebie.getCost('humanity', current, newValue);
            if (cost > freebie.freebiePoints) {
                showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
                return;
            }
            setCharacter(p => ({ ...p, status: { ...p.status, menschlichkeit: newValue } }));
            freebie.spend('humanity', current, newValue);
        } else {
            setCharacter(p => ({ ...p, status: { ...p.status, menschlichkeit: newValue } }));
        }
    };

    // ─── Willenskraft ────────────────────────────────────────────────────
    const minWillpower = tugenden.Mut;

    const handleWillpowerChange = (newValue) => {
        const current = character.status.willenskraft;
        if (newValue === current) return;
        if (newValue < minWillpower) {
            showToast(`Willenskraft kann nicht unter ${minWillpower} sinken (Mut).`, 'error');
            return;
        }
        if (freebie.freebiesActive) {
            const cost = freebie.getCost('willpower', current, newValue);
            if (cost > freebie.freebiePoints) {
                showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
                return;
            }
            setCharacter(p => ({ ...p, status: { ...p.status, willenskraft: newValue } }));
            freebie.spend('willpower', current, newValue);
        } else {
            setCharacter(p => ({ ...p, status: { ...p.status, willenskraft: newValue } }));
        }
    };

    // ─── JSX ─────────────────────────────────────────────────────────────
    return (
            /* Linke Spalte */
            <div className="space-y-8">

                {/* Menschlichkeit */}
                <div className="text-center">
                    <h3 className={`text-xs text-${theme}-700 uppercase font-bold mb-2`}>Menschlichkeit</h3>
                    <div className="flex justify-center">
                        <DotRating
                            theme={theme}
                            value={character.status.menschlichkeit}
                            max={10}
                            onChange={handleHumanityChange}
                        />
                    </div>
                    <div className={`text-[9px] text-${theme}-600 mt-1`}>Min: {minHumanity}</div>
                </div>

                {/* Willenskraft */}
                <div className="text-center">
                    <h3 className={`text-xs text-${theme}-700 uppercase font-bold mb-2`}>Willenskraft</h3>
                    <div className="flex justify-center">
                        <DotRating
                            theme={theme}
                            value={character.status.willenskraft}
                            max={10}
                            onChange={handleWillpowerChange}
                        />
                    </div>
                    <div className={`text-[9px] text-${theme}-600 mt-1`}>Min: {minWillpower}</div>
                    {/* Verbrauchte Willenskraft (Kästchen) */}
                    <div className="flex justify-center space-x-1.5 mt-2">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className={`w-4 h-4 border border-${theme}-900`} />
                        ))}
                    </div>
                </div>

                {/* Blutvorrat */}
                <div className="text-center">
                    <h3 className={`text-xs text-${theme}-700 uppercase font-bold mb-2`}>
                        Blutvorrat (max. {bloodCapacity})
                    </h3>
                    <div className="flex flex-col items-center gap-1">
                        {[0, bloodCapacity].map((offset) => (
                            <div key={offset} className="flex justify-center space-x-1.5">
                                {[...Array(bloodCapacity)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-5 h-5 border border-${theme}-900 cursor-default ${
                                            offset + i < character.status.blutvorrat
                                                ? `bg-${theme}-700`
                                                : ''
                                        }`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    );
};