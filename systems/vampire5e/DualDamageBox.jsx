// systems/vampire5e/DualDamageBox.jsx
import React from 'react';
import { themeConfig } from '../../components/ui/themes/themes';

/**
 * DualDamageBox
 *
 * Zeigt eine Reihe von Boxen, die drei Zustände haben:
 *   '' (leer), 'superficial' (/), 'aggravated' (X)
 *
 * Klick-Logik (wie im V5-Regelwerk):
 *   leer → superficial → aggravated → leer
 *
 * @param {string[]}  boxes        - Array von '' | 'superficial' | 'aggravated'
 * @param {function}  onChange     - (newBoxes: string[]) => void
 * @param {string}    label
 * @param {string}    theme
 */
export const DualDamageBox = ({ boxes, onChange, label, theme = 'emerald' }) => {
    const t = themeConfig[theme] ?? themeConfig.vampire5e;

    const cycle = (current) => {
        if (current === '')            return 'superficial';
        if (current === 'superficial') return 'aggravated';
        return '';
    };

    const handleClick = (index) => {
        const next = [...boxes];
        next[index] = cycle(next[index]);
        onChange(next);
    };

    return (
        <div>
            <h3 className={`text-xs uppercase font-bold ${t.emptyText} mb-2`}>{label}</h3>
            <div className="flex gap-1 flex-wrap">
                {boxes.map((state, i) => (
                    <div
                        key={i}
                        onClick={() => handleClick(i)}
                        title={state === '' ? 'Leer' : state === 'superficial' ? 'Oberflächlich' : 'Aggressiv'}
                        className={`
                            w-6 h-6 border-2 flex items-center justify-center cursor-pointer
                            text-xs font-bold select-none transition-all
                            ${state === 'aggravated'  ? `${t.border} ${t.checkedBg} text-white`       : ''}
                            ${state === 'superficial' ? `${t.border} bg-transparent ${t.accentText}`  : ''}
                            ${state === ''            ? `${t.border} bg-black/30`                     : ''}
                        `}
                    >
                        {state === 'aggravated'  && 'X'}
                        {state === 'superficial' && '/'}
                    </div>
                ))}
            </div>
            <p className={`text-[9px] ${t.emptyText} mt-1`}>
                Klick: Leer → / (Oberflächlich) → X (Aggressiv)
            </p>
        </div>
    );
};
