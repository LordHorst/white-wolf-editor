// systems/werewolf/components/WerewolfGifts.jsx
import React from 'react';
import { themeConfig } from "../../../components/ui/themes/themes";
import { GiftSelector } from "./werewolfGiftSelector";

export const WerewolfGifts = ({ gifts, breed, auspice, tribe, theme, onChange }) => {
    const t = themeConfig[theme] ?? themeConfig.default;

    const handleChange = (category, value) => {
        onChange({ ...gifts, [category]: value });
    };

    return (
        <div>
            <h3 className={`text-xs font-bold ${t.text} uppercase mb-4`}>Gaben (Stufe 1)</h3>
            <div className="space-y-3">
                <div>
                    <label className="text-xs text-stone-400 block mb-1">Abstammungsgabe</label>
                    <GiftSelector
                        category="breeds"
                        categoryKey={breed}
                        stufe={1}
                        theme={theme}
                        value={gifts.abstammung}
                        onChange={(val) => handleChange('abstammung', val)}
                    />
                </div>
                <div>
                    <label className="text-xs text-stone-400 block mb-1">Vorzeichengabe</label>
                    <GiftSelector
                        category="auspices"
                        categoryKey={auspice}
                        stufe={1}
                        theme={theme}
                        value={gifts.vorzeichen}
                        onChange={(val) => handleChange('vorzeichen', val)}
                    />
                </div>
                <div>
                    <label className="text-xs text-stone-400 block mb-1">Stammesgabe</label>
                    <GiftSelector
                        category="tribes"
                        categoryKey={tribe}
                        stufe={1}
                        theme={theme}
                        value={gifts.stamm}
                        onChange={(val) => handleChange('stamm', val)}
                    />
                </div>
            </div>
        </div>
    );
};