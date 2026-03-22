import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { DotRating } from './DotRating';

/**
 * BackgroundTooltip
 *
 * Zeigt beim Hover einen Tooltip mit der Beschreibung des aktuellen Hintergrund-Levels.
 * Ersetzt die nahezu identischen Tooltip-Komponenten in allen drei Bögen.
 *
 * @param {object} props
 * @param {string}      props.backgroundName  - Name des Hintergrunds
 * @param {number}      props.value           - Aktueller Punktwert
 * @param {object|null} props.backgroundsData - Das backgrounds-Objekt aus dem System-DataFile
 *                                              ({ [name]: { levels: string[] } })
 * @param {string}      [props.theme]         - Tailwind-Farbname (z. B. 'emerald', 'purple', 'amber')
 * @param {React.ReactNode} props.children
 */
export const BackgroundTooltip = ({ backgroundName, value, backgroundsData, theme = 'emerald', children }) => {
    const [show, setShow] = useState(false);
    const background = backgroundsData?.[backgroundName];
    if (!background?.levels) return <>{children}</>;

    const levelDesc = background.levels[value - 1] ?? 'Keine Beschreibung verfügbar.';

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            {children}
            {show && (
                <div className={`absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-black border border-${theme}-800 rounded shadow-lg text-xs text-${theme}-100`}>
                    <div className="font-bold mb-1">{backgroundName} (Stufe {value})</div>
                    <div>{levelDesc}</div>
                </div>
            )}
        </div>
    );
};

/**
 * BackgroundListItem
 *
 * Zeile in der Hintergrundliste: Dropdown (vordefiniert oder frei) + DotRating + optionaler Tooltip.
 * Ersetzt die nahezu identischen Komponenten in VampireSheet, WerewolfSheet und MageSheet.
 *
 * @param {object}   props
 * @param {{ name: string, value: number }} props.item
 * @param {number}   props.index
 * @param {function} props.onChange              - (index, name|undefined, value|undefined) => void
 * @param {string[]} [props.predefinedOptions]   - Liste der vordefinierten Hintergrundnamen
 * @param {object|null} [props.backgroundsData]  - Für den Tooltip (s. o.)
 * @param {number}   [props.maxPointsPerBackground]
 * @param {string}   [props.theme]
 */
export const BackgroundListItem = ({
                                       item,
                                       index,
                                       onChange,
                                       predefinedOptions = [],
                                       backgroundsData = null,
                                       maxPointsPerBackground = 5,
                                       theme = 'emerald',
                                   }) => {
    const [isCustom, setIsCustom] = useState(
        !predefinedOptions.includes(item.name) && item.name !== ''
    );
    const [customName, setCustomName] = useState(isCustom ? item.name : '');

    const handleNameChange = (selectedName) => {
        if (selectedName === 'custom') {
            setIsCustom(true);
            onChange(index, customName, undefined);
        } else {
            setIsCustom(false);
            onChange(index, selectedName, undefined);
        }
    };

    return (
        <div className="mb-3 flex items-center gap-2">
            {!isCustom ? (
                <select
                    value={item.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className={`bg-transparent border-b border-${theme}-900 text-${theme}-100 text-sm py-1 w-40`}
                >
                    <option value="" disabled />
                    {predefinedOptions.map(opt => (
                        <option key={opt} value={opt} className="bg-black">{opt}</option>
                    ))}
                    <option value="custom" className="bg-black">✏️ Eigener Hintergrund...</option>
                </select>
            ) : (
                <input
                    type="text"
                    value={customName}
                    onChange={(e) => {
                        const newName = e.target.value;
                        setCustomName(newName);
                        onChange(index, newName, undefined);
                    }}
                    placeholder="Eigener Hintergrund"
                    className={`bg-transparent border-b border-${theme}-900 text-${theme}-100 text-sm py-1 w-40`}
                />
            )}

            <DotRating
                theme={theme}
                value={item.value}
                max={maxPointsPerBackground}
                onChange={(v) => onChange(index, undefined, v)}
            />

            {!isCustom && backgroundsData?.[item.name] && (
                <BackgroundTooltip
                    backgroundName={item.name}
                    value={item.value}
                    backgroundsData={backgroundsData}
                    theme={theme}
                >
                    <Info size={14} className={`text-${theme}-500 cursor-help`} />
                </BackgroundTooltip>
            )}
        </div>
    );
};
