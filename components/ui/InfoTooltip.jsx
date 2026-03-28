import React from 'react';
import {Info} from 'lucide-react';
import {themeConfig} from './themes/themes';

export const InfoTooltip = ({text, theme = 'emerald'}) => {
    const t = themeConfig[theme] ?? themeConfig.default;

    return (
        <div className="group relative inline-flex items-center ml-2 cursor-help align-middle">
            <Info size={14} className={`${t.emptyText} hover:${t.accentText} transition-colors`}/>
            <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-black/90 border ${t.border} text-stone-300 text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl text-center font-sans tracking-normal normal-case`}>
                {text}
            </div>
        </div>
    );
};