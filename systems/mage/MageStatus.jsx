// systems/mage/MageStatus.jsx
import React from 'react';
import {DotRating} from '../../components/ui/DotRating';

// ─── Hilfsfunktion ───────────────────────────────────────────────────────────

/**
 * Erstellt einen Handler für Status-Werte, die nur mit Freebies erhöht werden dürfen.
 * Verringern ist immer erlaubt.
 */
const makeFreebieStatusHandler = ({key, freebieKey, character, setCharacter, freebie, showToast}) =>
    (newValue) => {
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

// ─── Quintessenz/Paradox-Tracker ─────────────────────────────────────────────
/**
 * Rendert zwei Reihen à 10 anklickbare Kästchen für Quintessenz oder Paradox.
 */
const PoolTracker = ({value, onChange, color}) => (
    <div>
        {[0, 10].map((offset) => (
            <div key={offset} className={`flex space-x-1 ${offset > 0 ? 'mt-1' : ''} ${offset > 0 ? '' : ''}`}>
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        onClick={() => onChange(offset + i + 1)}
                        className={`w-3 h-3 border cursor-pointer ${
                            offset + i < value
                                ? `bg-${color}-500 border-${color}-500`
                                : `border-${color}-${color === 'red' ? '900' : '500'}`
                        }`}
                    />
                ))}
            </div>
        ))}
    </div>
);

// ─── Komponente ──────────────────────────────────────────────────────────────
/**
 * Zeigt Arete, Willenskraft, Quintessenz, Paradox und Gesundheit.
 * Empfängt sharedProps aus BaseSheet:
 *   { character, setCharacter, freebie, showToast, theme }
 */
export const MageStatus = ({character, setCharacter, freebie, showToast, theme}) => {
    const handlerArgs = {character, setCharacter, freebie, showToast};

    const handleAreteChange = makeFreebieStatusHandler({...handlerArgs, key: 'arete', freebieKey: 'arete'});
    const handleWillpowerChange = makeFreebieStatusHandler({
        ...handlerArgs,
        key: 'willenskraft',
        freebieKey: 'willpower'
    });
    const handleQuintessenceChange = makeFreebieStatusHandler({
        ...handlerArgs,
        key: 'quintessenz',
        freebieKey: 'quintessence'
    });
    const handleParadoxChange = (newValue) =>
        setCharacter(p => ({...p, status: {...p.status, paradox: newValue}}));

    return (
        /* Linke Spalte: Arete, Willenskraft, Quintessenz/Paradox */
        <div className="space-y-6">

            {/* Arete */}
            <div className="text-center">
                <h3 className={`text-xs text-${theme}-700 uppercase font-bold mb-2`}>Arete</h3>
                <div className="flex justify-center">
                    <DotRating
                        theme={theme}
                        value={character.status.arete}
                        min={1}
                        max={10}
                        onChange={handleAreteChange}
                    />
                </div>
            </div>

            {/* Willenskraft */}
            <div className="text-center">
                <h3 className={`text-xs text-${theme}-700 uppercase font-bold mb-2`}>Willenskraft</h3>
                <div className="flex justify-center">
                    <DotRating
                        theme={theme}
                        value={character.status.willenskraft}
                        min={5}
                        max={10}
                        onChange={handleWillpowerChange}
                    />
                </div>
                {/* Verbrauchte Willenskraft (Kästchen) */}
                <div className="flex justify-center space-x-1.5 mt-2">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className={`w-4 h-4 border border-${theme}-900`}/>
                    ))}
                </div>
            </div>

            {/* Quintessenz / Paradox */}
            <div className="text-center">
                <h3 className={`text-xs text-${theme}-700 uppercase font-bold mb-2`}>
                    Quintessenz / Paradox
                </h3>
                <div className="flex justify-center items-center space-x-4">

                    {/* Quintessenz */}
                    <div className="text-right">
                        <span className={`text-[10px] uppercase text-${theme}-400`}>Quintessenz</span>
                        <PoolTracker
                            value={character.status.quintessenz}
                            onChange={handleQuintessenceChange}
                            color={theme}
                        />
                    </div>

                    {/* Trennlinie */}
                    <div className={`w-px h-10 bg-${theme}-900/50`}/>

                    {/* Paradox */}
                    <div className="text-left">
                        <span className="text-[10px] uppercase text-red-500">Paradox</span>
                        <PoolTracker
                            value={character.status.paradox}
                            onChange={handleParadoxChange}
                            color="red"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};