import React from 'react';

/**
 * MeritsFlawsSection
 *
 * Zeigt die ausgewählten Vorzüge und Nachteile untereinander an.
 * Ersetzt den identischen JSX-Block, der in allen drei Bögen wiederholt wurde.
 *
 * @param {object}   props
 * @param {Array}    props.merits           - Aktuelle Merits des Charakters
 * @param {Array}    props.flaws            - Aktuelle Flaws des Charakters
 * @param {function} props.onRemoveMerit    - Callback (merit) => void
 * @param {function} props.onRemoveFlaw     - Callback (flaw) => void
 * @param {boolean}  props.freebiesActive   - Zeigt "Entfernen"-Buttons wenn aktiv
 * @param {string}   [props.theme]          
 */
export const MeritsFlawsSection = ({
                                       merits,
                                       flaws,
                                       onRemoveMerit,
                                       onRemoveFlaw,
                                       freebiesActive,
                                       theme = 'default',
                                   }) => (
    <div className={`grid grid-cols-2 gap-8 mt-8 border-t border-${theme}-900/50 pt-6`}>
        {/* Vorzüge */}
        <div>
            <h3 className={`text-sm font-bold uppercase text-${theme}-500 mb-3`}>Vorzüge</h3>
            {merits.length === 0 ? (
                <p className={`text-xs text-${theme}-600 italic`}>Keine Vorzüge ausgewählt.</p>
            ) : (
                <ul className="space-y-1">
                    {[...merits]
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((merit, idx) => (
                            <li
                                key={idx}
                                className={`text-xs text-${theme}-300 flex justify-between items-center border-b border-${theme}-800/30 pb-1`}
                            >
                                <span>
                                  <span className="font-bold">{merit.name}</span>
                                    {(merit.quantity ?? 1) > 1 && (
                                        <span className={`text-${theme}-400 ml-1`}>×{merit.quantity}</span>
                                    )}
                                </span>
                                <span className={`text-${theme}-500 ml-2`}>
                                  ({merit.cost * (merit.quantity ?? 1)})
                                </span>
                                {freebiesActive && (
                                    <button
                                        onClick={() => onRemoveMerit(merit)}
                                        className="text-rose-400 hover:text-rose-300 text-xs ml-2"
                                    >
                                        Entfernen
                                    </button>
                                )}
                            </li>
                        ))}
                </ul>
            )}
        </div>

        {/* Nachteile */}
        <div>
            <h3 className={`text-sm font-bold uppercase text-${theme}-500 mb-3`}>Nachteile</h3>
            {flaws.length === 0 ? (
                <p className={`text-xs text-${theme}-600 italic`}>Keine Nachteile ausgewählt.</p>
            ) : (
                <ul className="space-y-1">
                    {[...flaws]
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((flaw, idx) => (
                            <li
                                key={idx}
                                className={`text-xs text-${theme}-300 flex justify-between items-center border-b border-${theme}-800/30 pb-1`}
                            >
                                <span>
                                  <span className="font-bold">{flaw.name}</span>
                                  <span className={`text-${theme}-500 ml-2`}>({flaw.cost})</span>
                                </span>
                                {freebiesActive && (
                                    <button
                                        onClick={() => onRemoveFlaw(flaw)}
                                        className="text-rose-400 hover:text-rose-300 text-xs ml-2"
                                    >
                                        Entfernen
                                    </button>
                                )}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    </div>
);
