import React from 'react';
import { themeConfig } from './themes/themes';

export const MeritsFlawsSection = ({
                                       merits,
                                       flaws,
                                       onRemoveMerit,
                                       onRemoveFlaw,
                                       freebiesActive,
                                       theme = 'emerald',
                                   }) => {
    const t = themeConfig[theme] ?? themeConfig.default;

    const renderList = (items, isFlaws) => {
        const label    = isFlaws ? 'Nachteile' : 'Vorzüge';
        const empty    = isFlaws ? 'Keine Nachteile ausgewählt.' : 'Keine Vorzüge ausgewählt.';
        const onRemove = isFlaws ? onRemoveFlaw : onRemoveMerit;

        return (
            <div>
                <h3 className={`text-sm font-bold uppercase ${t.accentText} mb-3`}>{label}</h3>
                {items.length === 0 ? (
                    <p className={`text-xs ${t.emptyText} italic`}>{empty}</p>
                ) : (
                    <ul className="space-y-1">
                        {[...items]
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((item, idx) => (
                                <li key={idx} className={`text-xs ${t.text} flex justify-between items-center border-b ${t.border} pb-1 opacity-80`}>
                                    <span>
                                        <span className="font-bold">{item.name}</span>
                                        {!isFlaws && (item.quantity ?? 1) > 1 && (
                                            <span className={`${t.descriptionText} ml-1`}>×{item.quantity}</span>
                                        )}
                                    </span>
                                    <span className={`${t.emptyText} ml-2`}>
                                        ({isFlaws ? item.cost : item.cost * (item.quantity ?? 1)})
                                    </span>
                                    {freebiesActive && (
                                        <button onClick={() => onRemove(item)} className="text-rose-400 hover:text-rose-300 text-xs ml-2">
                                            Entfernen
                                        </button>
                                    )}
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        );
    };

    return (
        <div className={`grid grid-cols-2 gap-8 mt-8 border-t ${t.border} pt-6`}>
            {renderList(merits, false)}
            {renderList(flaws, true)}
        </div>
    );
};