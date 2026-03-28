import React, {useState} from 'react';
import {Info} from 'lucide-react';
import {DotRating} from './DotRating';
import {themeConfig} from './themes/themes';

export const BackgroundTooltip = ({backgroundName, value, backgroundsData, theme = 'vampire', children}) => {
    const [show, setShow] = useState(false);
    const t = themeConfig[theme] ?? themeConfig.default;
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
                <div
                    className={`absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-black border ${t.border} rounded shadow-lg text-xs ${t.text}`}>
                    <div className="font-bold mb-1">{backgroundName} (Stufe {value})</div>
                    <div>{levelDesc}</div>
                </div>
            )}
        </div>
    );
};

export const BackgroundListItem = ({
                                       item,
                                       index,
                                       onChange,
                                       predefinedOptions = [],
                                       backgroundsData = null,
                                       maxPointsPerBackground = 5,
                                       theme = 'vampire',
                                   }) => {
    const t = themeConfig[theme] ?? themeConfig.default;
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

    const inputClass = `bg-transparent border-b ${t.border} ${t.text} text-sm py-1 w-40`;

    return (
        <div className="mb-3 flex items-center gap-2">
            {!isCustom ? (
                <select
                    value={item.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className={inputClass}
                >
                    <option value="" disabled/>
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
                    className={inputClass}
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
                    <Info size={14} className={`${t.emptyText} cursor-help`}/>
                </BackgroundTooltip>
            )}
        </div>
    );
};