// systems/werewolf/WerewolfStatus.jsx
import React from 'react';
import {DotRating} from '../../components';

// ─── Statuswerte-Konfiguration ────────────────────────────────────────────────
const STATUS_FIELDS = [
    {label: 'Zorn', key: 'zorn', freebieKey: 'rage'},
    {label: 'Gnosis', key: 'gnosis', freebieKey: 'gnosis'},
    {label: 'Willenskraft', key: 'willenskraft', freebieKey: 'willpower'},
];

/**
 * Zeigt Zorn, Gnosis, Willenskraft und Gesundheit.
 * Empfängt sharedProps aus BaseSheet:
 *   { character, setCharacter, freebie, showToast, theme }
 */
export const WerewolfStatus = ({character, setCharacter, freebie, showToast, theme}) => {

    const makeHandler = (key, freebieKey) => (newValue) => {
        const current = character.status[key];
        if (newValue === current) return;

        if (freebie.freebiesActive) {
            const cost = freebie.getCost(freebieKey, current, newValue);
            if (cost > freebie.freebiePoints) {
                showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
                return;
            }
            setCharacter(p => ({...p, status: {...p.status, [key]: newValue}}));
            freebie.spend(freebieKey, current, newValue);
        } else {
            if (newValue > current) {
                showToast(`${key.charAt(0).toUpperCase() + key.slice(1)} kann nur mit Freebies erhöht werden.`, 'error');
            } else {
                setCharacter(p => ({...p, status: {...p.status, [key]: newValue}}));
            }
        }
    };

    return (
        /* Linke Spalte: Zorn, Gnosis, Willenskraft */
        <div className="space-y-4">
            {STATUS_FIELDS.map(({label, key, freebieKey}) => (
                <div key={key} className="text-center">
                    <h3 className={`text-xs text-${theme}-700 uppercase font-bold mb-2`}>{label}</h3>
                    <div className="flex justify-center">
                        <DotRating
                            theme={theme}
                            value={character.status[key]}
                            min={1}
                            max={10}
                            onChange={makeHandler(key, freebieKey)}
                        />
                    </div>
                    {/* Verbrauchte Punkte (Kästchen) */}
                    <div className="flex justify-center space-x-1.5 mt-2">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className={`w-4 h-4 border border-${theme}-900`}/>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
