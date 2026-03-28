import React from 'react';
import {DotRating} from './DotRating';
import {themeConfig} from './themes/themes';

export const TraitSection = ({
                                 title,
                                 data,
                                 theme,
                                 onChange,
                                 isAttr = false,
                                 disabledFields = {},
                                 groupStats = {},
                                 isList = false,
                                 onAdd,
                                 onRemove,
                                 suggestions,
                             }) => {
    if (!data || typeof data !== 'object') {
        console.warn(`TraitSection: data is ${data} for title ${title}`);
        return null;
    }

    const t = themeConfig[theme] ?? themeConfig.default;

    // Sektion-Header: Rahmen + Hintergrund + Text
    const sectionClass = `${t.accentText} ${t.border} ${t.bg}`;
    // Gruppen-Unterüberschrift: gedimmte Variante
    const groupHeadClass = `${t.emptyText} ${t.border}`;

    // Hilfsfunktion: Prüft ob ein Trait (z.B. "Computer") gesperrt ist
    const isFieldDisabled = (cat, name) => {
        if (Array.isArray(disabledFields)) {
            return disabledFields.includes(name);
        }
        // Fallback für Objekt-Struktur: disabledFields['Wissen']['Computer']
        return disabledFields?.[cat]?.[name] ?? false;
    };

    // ─── Listen-Variante (z. B. Disziplinen) ──────────────────────────────
    if (isList && Array.isArray(data)) {
        return (
            <section className="mb-8">
                <h2 className={`text-xl font-bold uppercase tracking-widest text-center border-y py-2 mb-6 ${sectionClass}`}>
                    {title}
                </h2>
                <div className="space-y-2">
                    {data.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center gap-2">
                            <span className="text-xs text-stone-400 flex-1">{item.name}</span>
                            <DotRating
                                theme={theme}
                                value={item.value}
                                min={0}
                                onChange={(v) => onChange(item.name, v)}
                            />
                            {onRemove && (
                                <button onClick={() => onRemove(item.name)}
                                        className="text-red-500 hover:text-red-400 text-xs">✕</button>
                            )}
                        </div>
                    ))}
                    {onAdd && suggestions && (
                        <select onChange={(e) => {
                            if (e.target.value) onAdd(e.target.value);
                            e.target.value = '';
                        }}
                                value=""
                                className={`bg-black/40 border text-sm rounded px-2 py-1 flex-1 ${t.border} ${t.text}`}>
                            <option value="">Hinzufügen…</option>
                            {suggestions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    )}
                </div>
            </section>
        );
    }

    // ─── Objekt-Variante (Attribute, Fähigkeiten) ──────────────────────────
    return (
        <section className="mb-8">
            <h2 className={`text-xl font-bold uppercase tracking-widest text-center border-y py-2 mb-6 ${sectionClass}`}>
                {title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.entries(data).map(([cat, fields]) => {
                    // Guard against invalid fields
                    if (!fields || typeof fields !== 'object' || Array.isArray(fields)) return null;

                    // groupStats kann null oder undefined sein – dann wird kein Label angezeigt
                    const stats = groupStats?.[cat];
                    const statsLabel = stats ? ` (${stats.bonus}/${stats.limit})` : '';

                    return (
                        <div key={cat} className="space-y-2">
                            <h3 className={`text-[11px] font-bold uppercase italic border-b pb-1 ${groupHeadClass}`}>
                                {cat}{statsLabel}
                            </h3>
                            {Object.keys(fields).map((name) => {
                                const val = fields[name];
                                const isDisabled = isFieldDisabled(cat, name);
                                const numericValue = typeof val === 'number' ? val : 0;
                                return (
                                    <div key={name}
                                         className={`flex justify-between items-center transition-all ${isDisabled ? 'opacity-25 grayscale' : ''}`}
                                         title={isDisabled ? 'Für diese Abstammung nicht verfügbar.' : ''}>
                                        <span
                                            className={`text-xs ${isDisabled ? 'line-through text-stone-600' : 'text-stone-400 hover:text-stone-100'}`}>
                                            {name.replace(/_/g, ' ')}
                                        </span>
                                        <DotRating
                                            theme={theme}
                                            value={numericValue}
                                            min={isAttr ? 1 : 0}
                                            onChange={(v) => onChange(cat, name, v)}
                                            disabled={isDisabled}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};