import React from 'react';
import {Coins, Sparkles} from 'lucide-react';
import {themeConfig} from './themes/themes';

// Hier haben wir 'disabled' als Parameter hinzugefügt
export const FreebiePanel = ({points, active, onToggle, theme = 'default', disabled}) => {
    const t = themeConfig[theme] ?? themeConfig.default;

    // WICHTIG: Der Button darf nur gesperrt sein, wenn die Freebies AUS sind und der Charakter noch nicht valide ist.
    // Wenn die Freebies AN sind, muss man sie immer wieder ausschalten können!
    const isLocked = disabled && !active;

    return (
        <div
            className={`flex items-center space-x-2 px-3 py-1.5 border rounded text-[10px] font-bold uppercase tracking-widest ${t.border} ${t.accentText}`}>
            <Coins size={14}/>
            <span>Freebies: {points}</span>
            <button
                // Der neue Status (Gegenteil von active) wird direkt an onToggle übergeben
                onClick={() => onToggle(!active)}
                disabled={isLocked}
                className={`ml-2 flex items-center space-x-1 px-2 py-0.5 rounded transition-colors ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'}`}
            >
                <Sparkles size={12}/>
                <span>{active ? 'ON' : 'OFF'}</span>
            </button>
        </div>
    );
};