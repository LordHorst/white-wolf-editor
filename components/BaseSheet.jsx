// components/BaseSheet.jsx
import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { useCharacterManager, useFreebies, useMeritsFlaws, useTraitValidation } from '../hooks';
import {
    SheetControls, TraitSection, StorageModals,
    MeritsFlawsModal, MeritsFlawsSection, HealthBox,
} from './sheetImports';
import { themeConfig } from './ui/themes/themes';

export const BaseSheet = ({ config }) => {
    const {
        systemId, title, subtitle, theme, bgColor,
        freebieCount = 15, freebieCosts,
        getEmptyCharacter, meritsList, flawsList,
        attrCapWithoutFreebies    = null,
        abilityCapWithoutFreebies = null,
        excludeAttrField          = null,
        getExcludeAttrField       = null,
        getDisabledFields         = null,
        extraAbilityValidation    = null,
        renderInfoField, renderAdvantages, renderStatus, renderRules,
        onRandomize, useSystemEffects,
    } = config;

    const mngr = useCharacterManager(getEmptyCharacter(), systemId);
    const { character, setCharacter, updateStat, showToast } = mngr;

    const [showRules, setShowRules]             = useState(false);
    const [showMeritsModal, setShowMeritsModal] = useState(false);
    const [meritsModalType, setMeritsModalType] = useState('merit');

    const freebie = useFreebies(freebieCount, freebieCosts);
    const t = themeConfig[theme] ?? themeConfig.emerald;

    const { handleAddMerit, handleRemoveMerit, handleAddFlaw, handleRemoveFlaw } =
        useMeritsFlaws({ character, setCharacter, freebie, showToast });

    const resolvedExcludeAttrField = getExcludeAttrField
        ? getExcludeAttrField(character)
        : excludeAttrField;

    const { attrGroupStats, abilityGroupStats, validateAndApplyAttributeChange, validateAndApplyAbilityChange } =
        useTraitValidation({
            character, updateStat, freebie, showToast,
            excludeAttrField: resolvedExcludeAttrField,
            attrCapWithoutFreebies, abilityCapWithoutFreebies, extraAbilityValidation,
        });

    useEffect(() => { freebie.reset(freebieCount); }, [character.info.Name]);
    useSystemEffects?.({ character, setCharacter });

    const disabledFields = getDisabledFields ? getDisabledFields(character) : {};
    const sharedProps    = { character, setCharacter, freebie, showToast, theme };

    const getButtonClasses = (isActive) =>
        `px-3 py-1 text-xs uppercase tracking-wider rounded border ${
            isActive
                ? `${t.accentText} ${t.border} hover:bg-white/5`
                : `${t.emptyText} border-transparent bg-black/30 cursor-not-allowed`
        }`;

    return (
        <div className={`${t.accentText} font-serif`}>
            <SheetControls title={title} subtitle={subtitle} theme={theme} mngr={mngr} freebieState={freebie} />

            <div className={`border-2 ${t.border} p-8 shadow-2xl relative`} style={{ backgroundColor: bgColor }}>

                {/* HEADER */}
                <header className={`text-center mb-12 border-b ${t.border} pb-6 relative`}>
                    <h1 className="text-5xl font-bold tracking-[0.2em] uppercase mb-2">{title}</h1>
                    <div className="absolute top-0 right-0 flex gap-2">
                        {onRandomize && (
                            <button onClick={() => onRandomize({ character, setCharacter, freebie, showToast })}
                                    className={`p-2 ${t.headerButton} transition-colors`} title="Zufälliger Charakter">
                                🎲
                            </button>
                        )}
                        <button onClick={() => setShowRules(!showRules)}
                                className={`p-2 ${t.headerButton} transition-colors`} title="Regeln anzeigen">
                            <Info size={20} />
                        </button>
                    </div>
                </header>

                {/* REGELN */}
                {showRules && renderRules && (
                    <div className={`mb-8 p-4 bg-black/60 border ${t.border} rounded text-xs space-y-2`}>
                        {renderRules(theme)}
                    </div>
                )}

                {/* INFO-FELDER */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mb-8">
                    {Object.entries(character.info).map(([key, val]) => (
                        <div key={key} className={`flex flex-col border-b ${t.border} opacity-80`}>
                            <label className={`text-[9px] uppercase ${t.emptyText} font-bold`}>{key}</label>
                            {renderInfoField(key, val, sharedProps)}
                        </div>
                    ))}
                </div>

                {/* ATTRIBUTE & FÄHIGKEITEN */}
                <TraitSection title="Attribute" data={character.attributes} theme={theme}
                              onChange={validateAndApplyAttributeChange} isAttr
                              disabledFields={disabledFields} groupStats={attrGroupStats} />
                <TraitSection title="Fähigkeiten" data={character.abilities} theme={theme}
                              onChange={validateAndApplyAbilityChange} groupStats={abilityGroupStats} />

                {/* VORTEILE */}
                {renderAdvantages(sharedProps)}

                {/* STATUS (links) + GESUNDHEIT (rechts) */}
                <section className={`grid grid-cols-2 gap-12 border-t ${t.border} pt-8 mb-8`}>
                    <div>{renderStatus(sharedProps)}</div>
                    <HealthBox character={character} setCharacter={setCharacter} theme={theme} />
                </section>

                {/* VORZÜGE & NACHTEILE */}
                <MeritsFlawsSection
                    merits={character.merits} flaws={character.flaws}
                    onRemoveMerit={handleRemoveMerit} onRemoveFlaw={handleRemoveFlaw}
                    freebiesActive={freebie.freebiesActive} theme={theme}
                />
                <br />

                {/* BUTTONS */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                    <button onClick={() => { setShowMeritsModal(true); setMeritsModalType('merit'); }}
                            className={getButtonClasses(freebie?.freebiesActive)}>Vorzüge</button>
                    <button onClick={() => { setShowMeritsModal(true); setMeritsModalType('flaw'); }}
                            className={getButtonClasses(freebie?.freebiesActive)}>Nachteile</button>
                </div>
            </div>

            <StorageModals mngr={mngr} theme={theme} />
            <MeritsFlawsModal
                isOpen={showMeritsModal} onClose={() => setShowMeritsModal(false)}
                type={meritsModalType} meritsList={meritsList} flawsList={flawsList}
                selectedMerits={character.merits} selectedFlaws={character.flaws}
                onAddMerit={handleAddMerit} onRemoveMerit={handleRemoveMerit}
                onAddFlaw={handleAddFlaw} onRemoveFlaw={handleRemoveFlaw}
                freebiePoints={freebie.freebiePoints} freebiesActive={freebie.freebiesActive}
                theme={theme}
            />
        </div>
    );
};