// components/BaseSheet.jsx
import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { useCharacterManager, useFreebies, useMeritsFlaws, useTraitValidation } from '../hooks';
import {
    SheetControls, TraitSection, StorageModals,
    MeritsFlawsModal, MeritsFlawsSection,
} from './sheetImports';

/**
 * @param {object} config - Systemkonfiguration (s. vampireConfig.js / mageConfig.js)
 *
 * Unterstützte Config-Keys:
 *   systemId, title, subtitle, theme, bgColor
 *   freebieCount, freebieCosts
 *   getEmptyCharacter, meritsList, flawsList
 *   attrCapWithoutFreebies, abilityCapWithoutFreebies
 *   excludeAttrField          — statischer string|null
 *   getExcludeAttrField       — (character) => string|null  [überschreibt excludeAttrField]
 *   getDisabledFields         — (character) => object       [für TraitSection]
 *   extraAbilityValidation
 *   renderInfoField, renderAdvantages, renderStatus, renderRules
 *   onRandomize               — ({ character, setCharacter, freebie, showToast }) => void
 *   useSystemEffects          — ({ character, setCharacter }) => void  [darf Hooks aufrufen]
 */
export const BaseSheet = ({ config }) => {
    const {
        systemId,
        title,
        subtitle,
        theme,
        bgColor,
        freebieCount = 15,
        freebieCosts,
        getEmptyCharacter,
        meritsList,
        flawsList,
        attrCapWithoutFreebies    = null,
        abilityCapWithoutFreebies = null,
        excludeAttrField          = null,
        getExcludeAttrField       = null,   // (character) => string|null
        getDisabledFields         = null,   // (character) => object
        extraAbilityValidation    = null,
        renderInfoField,
        renderAdvantages,
        renderStatus,
        renderRules,
        onRandomize,
        useSystemEffects,
    } = config;

    const mngr = useCharacterManager(getEmptyCharacter(), systemId);
    const { character, setCharacter, updateStat, showToast } = mngr;

    const [showRules, setShowRules]             = useState(false);
    const [showMeritsModal, setShowMeritsModal] = useState(false);
    const [meritsModalType, setMeritsModalType] = useState('merit');

    const freebie = useFreebies(freebieCount, freebieCosts);

    const { handleAddMerit, handleRemoveMerit, handleAddFlaw, handleRemoveFlaw } =
        useMeritsFlaws({ character, setCharacter, freebie, showToast });

    // Dynamisches excludeAttrField: Funktion hat Vorrang vor statischem Wert
    const resolvedExcludeAttrField = getExcludeAttrField
        ? getExcludeAttrField(character)
        : excludeAttrField;

    const { attrGroupStats, abilityGroupStats, validateAndApplyAttributeChange, validateAndApplyAbilityChange } =
        useTraitValidation({
            character, updateStat, freebie, showToast,
            excludeAttrField:          resolvedExcludeAttrField,
            attrCapWithoutFreebies,
            abilityCapWithoutFreebies,
            extraAbilityValidation,
        });

    // Freebie-Reset bei neuem Charakter
    useEffect(() => { freebie.reset(freebieCount); }, [character.info.Name]);

    // Systemspezifische Effects (z. B. Nosferatu-Logik, Generation-Sync)
    // Darf useEffect aufrufen – wird immer bedingungslos aufgerufen
    useSystemEffects?.({ character, setCharacter });

    // Disabled-Felder für TraitSection (z. B. Nosferatu: Erscheinungsbild)
    const disabledFields = getDisabledFields ? getDisabledFields(character) : {};

    const sharedProps = { character, setCharacter, freebie, showToast, theme };

    const getButtonClasses = (isActive) =>
        `px-3 py-1 text-xs uppercase tracking-wider rounded border ${
            isActive
                ? `border-${theme}-700 bg-${theme}-950/50 text-${theme}-300 hover:bg-${theme}-900/50`
                : `border-${theme}-900/30 bg-black/30 text-${theme}-600 cursor-not-allowed`
        }`;

    return (
        <div className={`text-${theme}-300 font-serif`}>
            <SheetControls title={title} subtitle={subtitle} theme={theme} mngr={mngr} freebieState={freebie} />

            <div className={`border-2 border-${theme}-900/50 bg-[${bgColor}]/95 p-8 shadow-2xl relative`}>

                {/* HEADER */}
                <header className={`text-center mb-12 border-b border-${theme}-900/30 pb-6 relative`}>
                    <h1 className={`text-5xl font-bold tracking-[0.2em] text-${theme}-500 uppercase mb-2`}>
                        {title}
                    </h1>
                    <div className="absolute top-0 right-0 flex gap-2">
                        {onRandomize && (
                            <button
                                onClick={() => onRandomize({ character, setCharacter, freebie, showToast })}
                                className={`p-2 text-${theme}-400 hover:text-${theme}-200 transition-colors`}
                                title="Zufälliger Charakter"
                            >
                                🎲
                            </button>
                        )}
                        <button
                            onClick={() => setShowRules(!showRules)}
                            className={`p-2 text-${theme}-400 hover:text-${theme}-200 transition-colors`}
                            title="Regeln anzeigen"
                        >
                            <Info size={20} />
                        </button>
                    </div>
                </header>

                {/* REGELN */}
                {showRules && renderRules && (
                    <div className={`mb-8 p-4 bg-black/60 border border-${theme}-800/50 rounded text-xs space-y-2`}>
                        {renderRules(theme)}
                    </div>
                )}

                {/* INFO-FELDER */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mb-8">
                    {Object.entries(character.info).map(([key, val]) => (
                        <div key={key} className={`flex flex-col border-b border-${theme}-900/30`}>
                            <label className={`text-[9px] uppercase text-${theme}-700 font-bold`}>{key}</label>
                            {renderInfoField(key, val, sharedProps)}
                        </div>
                    ))}
                </div>

                {/* ATTRIBUTE */}
                <TraitSection
                    title="Attribute"
                    data={character.attributes}
                    theme={theme}
                    onChange={validateAndApplyAttributeChange}
                    isAttr
                    disabledFields={disabledFields}
                    groupStats={attrGroupStats}
                />

                {/* FÄHIGKEITEN */}
                <TraitSection
                    title="Fähigkeiten"
                    data={character.abilities}
                    theme={theme}
                    onChange={validateAndApplyAbilityChange}
                    groupStats={abilityGroupStats}
                />

                {/* SYSTEMSPEZIFISCHE VORTEILE */}
                {renderAdvantages(sharedProps)}

                {/* SYSTEMSPEZIFISCHER STATUS */}
                {renderStatus(sharedProps)}

                {/* VORZÜGE & NACHTEILE */}
                <MeritsFlawsSection
                    merits={character.merits}
                    flaws={character.flaws}
                    onRemoveMerit={handleRemoveMerit}
                    onRemoveFlaw={handleRemoveFlaw}
                    freebiesActive={freebie.freebiesActive}
                    theme={theme}
                />
                <br />

                {/* BUTTONS */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                    <button
                        onClick={() => { setShowMeritsModal(true); setMeritsModalType('merit'); }}
                        className={getButtonClasses(freebie?.freebiesActive)}
                    >
                        Vorzüge
                    </button>
                    <button
                        onClick={() => { setShowMeritsModal(true); setMeritsModalType('flaw'); }}
                        className={getButtonClasses(freebie?.freebiesActive)}
                    >
                        Nachteile
                    </button>
                </div>
            </div>

            <StorageModals mngr={mngr} theme={theme} />
            <MeritsFlawsModal
                isOpen={showMeritsModal}
                onClose={() => setShowMeritsModal(false)}
                type={meritsModalType}
                meritsList={meritsList}
                flawsList={flawsList}
                selectedMerits={character.merits}
                selectedFlaws={character.flaws}
                onAddMerit={handleAddMerit}
                onRemoveMerit={handleRemoveMerit}
                onAddFlaw={handleAddFlaw}
                onRemoveFlaw={handleRemoveFlaw}
                freebiePoints={freebie.freebiePoints}
                freebiesActive={freebie.freebiesActive}
                theme={theme}
            />
        </div>
    );
};