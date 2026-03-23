import React from 'react';
import { Sparkles, Coins } from 'lucide-react';
import { themeConfig } from './themes/themes';

export const FreebiePanel = ({ points, active, onToggle, theme = 'emerald' }) => {
    const t = themeConfig[theme] ?? themeConfig.emerald;

    return (
        <div className={`flex items-center space-x-2 px-3 py-1.5 border rounded text-[10px] font-bold uppercase tracking-widest ${t.border} ${t.accentText}`}>
            <Coins size={14} />
            <span>Freebies: {points}</span>
            <button
                onClick={onToggle}
                className={`ml-2 flex items-center space-x-1 px-2 py-0.5 rounded transition-colors ${
                    active
                        ? `${t.checkedBg} ${t.accentText} opacity-80`
                        : 'bg-stone-800/60 text-stone-400'
                }`}
            >
                <Sparkles size={12} />
                <span>{active ? 'ON' : 'OFF'}</span>
            </button>
        </div>
    );
};