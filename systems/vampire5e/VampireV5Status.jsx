// systems/vampire5e/VampireV5Status.jsx
import React from 'react';
import { DotRating } from '../../components/sheetImports';
import { DualDamageBox } from './DualDamageBox';

/**
 * V5-Status: Hunger, Menschlichkeit, Blutmacht, Gesundheit, Willenskraft.
 * BaseSheet5e bindet diese Komponente in der linken Spalte ein —
 * Gesundheit und Willenskraft werden hier direkt gerendert, da DualDamageBox
 * V5-spezifisch ist und nicht im generischen BaseSheet liegt.
 */
export const VampireV5Status = ({ character, setCharacter, theme }) => {
    const set = (key, value) =>
        setCharacter(p => ({ ...p, status: { ...p.status, [key]: value } }));

    return (
        <div className="space-y-6">
            {/* Hunger */}
            <div>
                <h3 className="text-xs uppercase font-bold text-red-700 mb-2">
                    Hunger (0–5)
                </h3>
                <div className="flex gap-2">
                    {[0, 1, 2, 3, 4, 5].map(v => (
                        <button
                            key={v}
                            onClick={() => set('hunger', v)}
                            className={`w-8 h-8 border-2 text-xs font-bold transition-all ${
                                character.status.hunger === v
                                    ? 'border-red-500 bg-red-800 text-white'
                                    : 'border-red-900 bg-black/30 text-red-700 hover:border-red-600'
                            }`}
                        >
                            {v}
                        </button>
                    ))}
                </div>
            </div>

            {/* Menschlichkeit */}
            <div>
                <h3 className="text-xs uppercase font-bold text-red-700 mb-2">
                    Menschlichkeit
                </h3>
                <DotRating
                    theme={theme}
                    value={character.status.humanity}
                    max={10}
                    onChange={(v) => set('humanity', v)}
                />
            </div>

            {/* Blutmacht */}
            <div>
                <h3 className="text-xs uppercase font-bold text-red-700 mb-2">
                    Blutmacht
                </h3>
                <DotRating
                    theme={theme}
                    value={character.status.bloodPotency}
                    max={10}
                    min={1}
                    onChange={(v) => set('bloodPotency', v)}
                />
            </div>

            {/* Gesundheit */}
            <DualDamageBox
                boxes={character.status.gesundheit}
                onChange={(v) => set('gesundheit', v)}
                label="Gesundheit"
                theme={theme}
            />

            {/* Willenskraft */}
            <DualDamageBox
                boxes={character.status.willenskraft}
                onChange={(v) => set('willenskraft', v)}
                label="Willenskraft"
                theme={theme}
            />
        </div>
    );
};
