// components/BaseSheet.jsx
import React, {useEffect, useState} from 'react';
import {Info} from 'lucide-react';
import {useCharacterManager, useFreebies, useMeritsFlaws, useTraitValidation} from '../hooks';
import {
    HealthBox,
    MeritsFlawsModal,
    MeritsFlawsSection,
    SheetControls,
    StorageModals,
    TraitSection,
} from './sheetImports';
import {themeConfig} from './ui/themes/themes';
import {getButtonClasses} from '../utils/buttonClasses'; // ausgelagerte Hilfsfunktion
import {
    calculateAbilityTotals,
    calculateGroupBonusPoints,
    getAbilityLimits,
    getGroupLimits,
} from '../utils/characterUtils';

export const BaseSheet = ({config}) => {
    const {
        systemId, title, theme,
        freebieCount = 15, freebieCosts,
        getEmptyCharacter, meritsList, flawsList,
        attrCapWithoutFreebies = 5,
        abilityCapWithoutFreebies = 3,
        excludeAttrField = null,
        getExcludeAttrField = null,
        getDisabledFields = null,
        extraAbilityValidation = null,
        renderInfoField, renderAdvantages, renderStatus, renderRules,
        useSystemEffects,
        // Neue Props für V5-Kompatibilität
        disableFreebies = false,
        disableHealthBox = false,
        simpleValidation = false,
    } = config;

    const mngr = useCharacterManager(getEmptyCharacter(), systemId);
    const {character, setCharacter, updateStat, showToast} = mngr;

    const [showRules, setShowRules] = useState(false);
    const [showMeritsModal, setShowMeritsModal] = useState(false);
    const [meritsModalType, setMeritsModalType] = useState('merit');

    // Freebie-Handling: Wenn deaktiviert, wird ein Dummy-Objekt mit freebiesActive = false verwendet
    const freebie = disableFreebies
        ? {
            freebiePoints: 0, freebiesActive: false, reset: () => {
            }, spend: () => {
            }, add: () => {
            }
        }
        : useFreebies(freebieCount, freebieCosts);

    const t = themeConfig[theme] ?? themeConfig.default;

    // Merits/Flaws Handler – je nach Freebie-Modus unterschiedlich
    let handleAddMerit, handleRemoveMerit, handleAddFlaw, handleRemoveFlaw;
    if (disableFreebies) {
        // Einfache Handler ohne Freebie-Logik
        handleAddMerit = (merit) => {
            if (character.merits.some(m => m.name === merit.name)) {
                showToast('Bereits ausgewählt.', 'error');
                return;
            }
            setCharacter(p => ({...p, merits: [...p.merits, {...merit, quantity: 1}]}));
        };
        handleRemoveMerit = (merit) =>
            setCharacter(p => ({...p, merits: p.merits.filter(m => m.name !== merit.name)}));
        handleAddFlaw = (flaw) => {
            if (character.flaws.some(f => f.name === flaw.name)) {
                showToast('Bereits ausgewählt.', 'error');
                return;
            }
            setCharacter(p => ({...p, flaws: [...p.flaws, flaw]}));
        };
        handleRemoveFlaw = (flaw) =>
            setCharacter(p => ({...p, flaws: p.flaws.filter(f => f.name !== flaw.name)}));
    } else {
        // Komplexe Handler mit Freebie-Kosten
        const meritsFlaws = useMeritsFlaws({character, setCharacter, freebie, showToast});
        handleAddMerit = meritsFlaws.handleAddMerit;
        handleRemoveMerit = meritsFlaws.handleRemoveMerit;
        handleAddFlaw = meritsFlaws.handleAddFlaw;
        handleRemoveFlaw = meritsFlaws.handleRemoveFlaw;
    }

    const resolvedExcludeAttrField = getExcludeAttrField
        ? getExcludeAttrField(character)
        : excludeAttrField;

    // Validierung: Bei simpleValidation wird direkt updateStat verwendet, sonst useTraitValidation
    let validateAndApplyAttributeChange, validateAndApplyAbilityChange, attrGroupStats, abilityGroupStats;
    const validation = useTraitValidation({
        character, updateStat, freebie, showToast,
        excludeAttrField: resolvedExcludeAttrField,
        attrCapWithoutFreebies, abilityCapWithoutFreebies, extraAbilityValidation,
    });

    if (simpleValidation) {
        // Einfache Handler ohne Validierung
        validateAndApplyAttributeChange = (cat, name, val) => updateStat('attributes', cat, name, val);
        validateAndApplyAbilityChange = (cat, name, val) => updateStat('abilities', cat, name, val);
        attrGroupStats = null;
        abilityGroupStats = null;
    } else {
        // Volle Validierung mit Limits
        validateAndApplyAttributeChange = validation.validateAndApplyAttributeChange;
        validateAndApplyAbilityChange = validation.validateAndApplyAbilityChange;
        attrGroupStats = validation.attrGroupStats;
        abilityGroupStats = validation.abilityGroupStats;
    }
    
    // Gültigkeit des Charakters bestimmen
    let characterIsValid = false;
    if (!simpleValidation && attrGroupStats && abilityGroupStats) {
        const attrBonus = calculateGroupBonusPoints(character, resolvedExcludeAttrField);
        const attrLimits = getGroupLimits(attrBonus);
        const attrValid = Object.entries(attrGroupStats).every(
            ([group, data]) => data.bonus === attrLimits[group]
        );

        const abilityTotals = calculateAbilityTotals(character);
        const abilityLimits = getAbilityLimits(abilityTotals);
        const abilityValid = Object.entries(abilityGroupStats).every(
            ([group, data]) => data.bonus === abilityLimits[group]
        );

        characterIsValid = attrValid && abilityValid;
        // --- DEBUGGING START ---
        console.log("=== CHARAKTER VALIDIERUNG ===");
        console.log("Attribute Valid:", attrValid, "| Ist:", JSON.stringify(attrGroupStats), "| Soll:", JSON.stringify(attrLimits));
        console.log("Fähigkeiten Valid:", abilityValid, "| Ist:", JSON.stringify(abilityGroupStats), "| Soll:", JSON.stringify(abilityLimits));
        console.log("Ist der Charakter komplett gültig?", characterIsValid);
        // --- DEBUGGING END ---
    } else if (simpleValidation) {
        // Bei einfacher Validierung (z.B. V5) gilt der Charakter als gültig, sobald die Grundwerte verteilt sind
        characterIsValid = true;
    }

    useEffect(() => {
        if (!disableFreebies) freebie.reset(freebieCount);
    }, [character.info.Name, disableFreebies]);

    useSystemEffects?.({character, setCharacter});

    const disabledFields = getDisabledFields ? getDisabledFields(character) : {};
    const sharedProps = {character, setCharacter, freebie, showToast, theme};

    // Button-Aktivität: Bei deaktiviertem Freebie immer true (Buttons sollen klickbar sein)
    const isButtonActive = disableFreebies ? true : freebie?.freebiesActive;

    return (
        <div className={`${t.accentText} font-serif`}>
            <div className={`sticky top-0 z-50 backdrop-blur-md border-b ${t.border} py-4 px-4 mb-4 ${t.bg}/80`}>
                <SheetControls
                    title={config.title}
                    subtitle={config.subtitle}
                    theme={theme}
                    mngr={mngr}
                    freebieState={freebie}
                    onRandomize={config.onRandomize}
                    setCharacter={setCharacter}
                    freebie={freebie}
                    freebieDisabled={!characterIsValid}
                    showToast={showToast}
                />
            </div>

            <div className={`border-2 ${t.bg} ${t.border} p-8 shadow-2xl relative`}>

                {/* HEADER */}
                <header className={`text-center mb-12 border-b ${t.border} pb-6 relative`}>
                    <h1 className="text-5xl font-bold tracking-[0.2em] uppercase mb-2">{title}</h1>
                    <div className="absolute top-0 right-0 flex gap-2">
                        <button
                            onClick={() => setShowRules(!showRules)}
                            className={`p-2 ${t.headerButton} transition-colors`}
                            title="Regeln anzeigen"
                        >
                            <Info size={20}/>
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
                <TraitSection
                    title="Attribute"
                    data={character.attributes}
                    theme={theme}
                    onChange={validateAndApplyAttributeChange}
                    isAttr
                    disabledFields={disabledFields}
                    groupStats={attrGroupStats}
                />
                <TraitSection
                    title="Fähigkeiten"
                    data={character.abilities}
                    theme={theme}
                    onChange={validateAndApplyAbilityChange}
                    disabledFields={disabledFields}
                    groupStats={abilityGroupStats}
                />

                {/* VORTEILE */}
                {renderAdvantages(sharedProps)}

                {/* STATUS (links) + GESUNDHEIT (rechts) – HealthBox wird bei disableHealthBox weggelassen */}
                <section
                    className={`grid grid-cols-1 ${!disableHealthBox ? 'md:grid-cols-2' : ''} gap-12 border-t ${t.border} pt-8 mb-8`}>
                    <div>{renderStatus(sharedProps)}</div>
                    {!disableHealthBox && (
                        <HealthBox character={character} setCharacter={setCharacter} theme={theme}/>
                    )}
                </section>

                {/* VORZÜGE & NACHTEILE */}
                <MeritsFlawsSection
                    merits={character.merits}
                    flaws={character.flaws}
                    onRemoveMerit={handleRemoveMerit}
                    onRemoveFlaw={handleRemoveFlaw}
                    freebiesActive={!disableFreebies && freebie.freebiesActive}
                    theme={theme}
                />
                <br/>

                {/* BUTTONS */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                    <button
                        onClick={() => {
                            setShowMeritsModal(true);
                            setMeritsModalType('merit');
                        }}
                        disabled={!isButtonActive}
                        className={getButtonClasses(t, isButtonActive)}
                    >
                        Vorzüge
                    </button>
                    <button
                        onClick={() => {
                            setShowMeritsModal(true);
                            setMeritsModalType('flaw');
                        }}
                        disabled={!isButtonActive}
                        className={getButtonClasses(t, isButtonActive)}
                    >
                        Nachteile
                    </button>
                </div>
            </div>

            <StorageModals mngr={mngr} theme={theme}/>
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
                freebiePoints={disableFreebies ? 0 : freebie.freebiePoints}
                freebiesActive={!disableFreebies && freebie.freebiesActive}
                theme={theme}
            />
        </div>
    );
};