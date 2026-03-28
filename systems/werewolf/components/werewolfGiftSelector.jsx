// systems/werewolf/components/werewolfGiftSelector.jsx
import React from 'react';
import { WerewolfData } from "../werewolfData";
import { themeConfig } from "../../../components/ui/themes/themes";

export function GiftSelector({ category, categoryKey, stufe = 1, theme, value, onChange }) {
    if (!categoryKey) {
        return (
            <div className="text-stone-500 italic text-sm">
                Zuerst entsprechende Eigenschaft wählen
            </div>
        );
    }

    // Gaben für die angegebene Kategorie und Stufe holen
    const giftsForCategory = WerewolfData.gifts[category]?.[categoryKey]?.[stufe] || [];

    const t = themeConfig[theme] ?? themeConfig.default;
    const inputClass = `bg-transparent border-b ${t.border} ${t.text} text-sm py-1 w-48`;

    return (
        <select
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
        >
            <option value="" className="bg-stone-900 italic">Gabe wählen…</option>
            {giftsForCategory.map(gift => (
                <option key={gift.name} value={gift.name} className="bg-stone-900">
                    {gift.name}
                </option>
            ))}
        </select>
    );
}