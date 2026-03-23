import React from 'react';
// Korrektur des Pfads: themes.ts liegt laut Struktur in ./themes/themes
import { themeConfig } from './themes/themes';

/**
 * DotRating ist eine wiederverwendbare Komponente zur Anzeige und Bearbeitung
 * von Werten im Storyteller-System (Punkte-System).
 */
export const DotRating = ({
                              value,
                              max = 5,
                              onChange,
                              theme = 'default',
                              disabled = false,
                              min = 0
                          }) => {
    
    const t = themeConfig[theme] ?? themeConfig.default;

    return (
        <div className={`flex gap-1 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
            {[...Array(max)].map((_, i) => {
                const dotValue = i + 1;
                const isActive = dotValue <= value;

                return (
                    <div
                        key={i}
                        onClick={() => {
                            if (!disabled && onChange) {
                                // Wenn man auf den aktuellen Wert klickt, verringert er sich (bis zum Minimum)
                                const newValue = dotValue === value ? Math.max(min, value - 1) : dotValue;
                                onChange(newValue);
                            }
                        }}
                        className={`
                            w-3 h-3 rounded-full border transition-all duration-200
                            ${isActive
                            ? `${t.accentBorder} ${t.checkedBg} shadow-[0_0_8px_rgba(0,0,0,0.5)]`
                            : `border-stone-700 bg-black/20`
                        }
                            ${!disabled && 'hover:scale-125 hover:border-white'}
                        `}
                    />
                );
            })}
        </div>
    );
};