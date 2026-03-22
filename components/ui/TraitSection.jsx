import React from 'react';
import { DotRating } from './DotRating';

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
                                 suggestions
                             }) => {
    // Guard: if data is undefined/null or not an object, return nothing
    if (!data || typeof data !== 'object') {
        console.warn(`TraitSection: data is ${data} for title ${title}`);
        return null;
    }

    const tColor = theme === 'emerald'
        ? 'text-emerald-500 border-emerald-900 bg-emerald-950/10'
        : theme === 'amber'
            ? 'text-amber-600 border-amber-900 bg-amber-950/10'
            : 'text-purple-500 border-purple-900 bg-purple-950/10';

    const hColor = theme === 'emerald'
        ? 'text-emerald-800 border-emerald-900/20'
        : theme === 'amber'
            ? 'text-amber-800 border-amber-900/20'
            : 'text-purple-800 border-purple-900/20';

    // Handle list (array) display (e.g., Disciplines)
    if (isList && Array.isArray(data)) {
        return (
            <section className="mb-8">
                <h2 className={`text-xl font-bold uppercase tracking-widest text-center border-y py-2 mb-6 ${tColor}`}>{title}</h2>
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
                                <button
                                    onClick={() => onRemove(item.name)}
                                    className="text-red-500 hover:text-red-400 text-xs"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                    {onAdd && suggestions && (
                        <div className="mt-2 flex gap-2">
                            <select
                                onChange={(e) => {
                                    const selected = suggestions.find(s => s === e.target.value);
                                    if (selected) onAdd(selected);
                                    e.target.value = ''; // reset
                                }}
                                value=""
                                className="bg-black/40 border border-emerald-900/50 text-emerald-100 text-sm rounded px-2 py-1 flex-1"
                            >
                                <option value="">Neue {title.slice(0, -1)} hinzufügen…</option>
                                {suggestions.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </section>
        );
    }

    // Handle object with categories (e.g., Attributes, Abilities)
    return (
        <section className="mb-8">
            <h2 className={`text-xl font-bold uppercase tracking-widest text-center border-y py-2 mb-6 ${tColor}`}>{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.entries(data).map(([cat, fields]) => {
                    // Safety: ensure fields is an object
                    if (!fields || typeof fields !== 'object') return null;
                    const stats = groupStats[cat];
                    const statsLabel = stats ? ` (${stats.bonus}/${stats.limit})` : '';
                    return (
                        <div key={cat} className="space-y-2">
                            <h3 className={`text-[11px] font-bold uppercase italic border-b pb-1 ${hColor}`}>
                                {cat}{statsLabel}
                            </h3>
                            {Object.entries(fields).map(([name, val]) => {
                                const isDisabled = disabledFields[cat]?.[name] || false;
                                return (
                                    <div key={name} className="flex justify-between items-center">
                                        <span className="text-xs text-stone-400 hover:text-stone-100">{name.replace('_', ' ')}</span>
                                        <DotRating
                                            theme={theme}
                                            value={val}
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