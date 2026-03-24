// components/BaseSheet5e.jsx
import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { useCharacterManager } from '../hooks';
import {
    SheetControls, TraitSection, StorageModals,
    MeritsFlawsModal, MeritsFlawsSection,
} from './sheetImports';
import { themeConfig } from './ui/themes/themes';

/**
 * BaseSheet5e
 *
 * Vereinfachtes BaseSheet für V5-Systeme. Unterschiede zu BaseSheet:
 *   - Kein Freebie-System (useFreebies, useMeritsFlaws entfallen)
 *   - Kein 7/5/3 Attribut-Limit / 13/9/5 Fähigkeits-Limit
 *   - Status + Gesundheit werden gemeinsam via renderStatus gerendert
 *     (da Gesundheit in V5 system-spezifisch ist: DualDamageBox)
 *   - Merits/Flaws ohne Freebie-Kosten
 *
 * Config-Keys:
 *   systemId, title, subtitle, theme, bgColor
 *   getEmptyCharacter, meritsList, flawsList
 *   renderInfoField, renderAdvantages, renderStatus, renderRules
 *   onRandomize
 *   useSystemEffects
 */
export const BaseSheet5e = ({ config }) => {
    const {
        systemId,
        title,
        subtitle,
        theme,
        bgColor,
        getEmptyCharacter,
        meritsList  = [],
        flawsList   = [],
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

    const t = themeConfig[theme] ?? themeConfig.vampire5e;

    useSystemEffects?.({ character, setCharacter });

    // Merits/Flaws ohne Freebie-Logik
    const handleAddMerit  = (merit) => {
        if (character.merits.some(m => m.name === merit.name)) {
            showToast('Bereits ausgewählt.', 'error'); return;
        }
        setCharacter(p => ({ ...p, merits: [...p.merits, { ...merit, quantity: 1 }] }));
    };
    const handleRemoveMerit = (merit) =>
        setCharacter(p => ({ ...p, merits: p.merits.filter(m => m.name !== merit.name) }));

    const handleAddFlaw  = (flaw) => {
        if (character.flaws.some(f => f.name === flaw.name)) {
            showToast('Bereits ausgewählt.', 'error'); return;
        }
        setCharacter(p => ({ ...p, flaws: [...p.flaws, flaw] }));
    };
    const handleRemoveFlaw = (flaw) =>
        setCharacter(p => ({ ...p, flaws: p.flaws.filter(f => f.name !== flaw.name) }));

    const sharedProps = { character, setCharacter, showToast, theme };

    const btnClass = `px-3 py-1 text-xs uppercase tracking-wider rounded border ${t.accentText} ${t.border} hover:bg-white/5`;

    return (
        <div className={`${t.accentText} font-serif`}>
            <SheetControls title={title} subtitle={subtitle} theme={theme} mngr={mngr} />

            <div className={`border-2 ${t.border} p-8 shadow-2xl relative`}
                 style={{ backgroundColor: bgColor }}>

                {/* HEADER */}
                <header className={`text-center mb-10 border-b ${t.border} pb-6 relative`}>
                    <h1 className="text-5xl font-bold tracking-[0.2em] uppercase mb-1">{title}</h1>
                    <p className={`text-xs uppercase tracking-widest ${t.emptyText}`}>{subtitle}</p>
                    <div className="absolute top-0 right-0 flex gap-2">
                        {onRandomize && (
                            <button
                                onClick={() => onRandomize({ character, setCharacter, showToast })}
                                className={`p-2 ${t.headerButton} transition-colors`}
                                title="Zufälliger Charakter"
                            >🎲</button>
                        )}
                        <button
                            onClick={() => setShowRules(!showRules)}
                            className={`p-2 ${t.headerButton} transition-colors`}
                            title="Regeln anzeigen"
                        ><Info size={20} /></button>
                    </div>
                </header>

                {/* REGELN */}
                {showRules && renderRules && (
                    <div className={`mb-8 p-4 bg-black/60 border ${t.border} rounded text-xs space-y-2`}>
                        {renderRules()}
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

                {/* ATTRIBUTE & SKILLS — kein Limit-System in V5 */}
                <TraitSection
                    title="Attribute"
                    data={character.attributes}
                    theme={theme}
                    onChange={(cat, name, v) => updateStat('attributes', cat, name, v)}
                    isAttr
                />
                <TraitSection
                    title="Fertigkeiten"
                    data={character.abilities}
                    theme={theme}
                    onChange={(cat, name, v) => updateStat('abilities', cat, name, v)}
                />

                {/* VORTEILE */}
                {renderAdvantages(sharedProps)}

                {/* STATUS — in V5 komplett system-spezifisch (kein generisches HealthBox) */}
                <section className={`border-t ${t.border} pt-8 mb-8`}>
                    {renderStatus(sharedProps)}
                </section>

                {/* VORZÜGE & NACHTEILE */}
                <MeritsFlawsSection
                    merits={character.merits}
                    flaws={character.flaws}
                    onRemoveMerit={handleRemoveMerit}
                    onRemoveFlaw={handleRemoveFlaw}
                    freebiesActive={true}
                    theme={theme}
                />
                <br />

                {/* BUTTONS */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                    <button onClick={() => { setShowMeritsModal(true); setMeritsModalType('merit'); }} className={btnClass}>
                        Vorzüge
                    </button>
                    <button onClick={() => { setShowMeritsModal(true); setMeritsModalType('flaw'); }} className={btnClass}>
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
                freebiePoints={99}
                freebiesActive={true}
                theme={theme}
            />
        </div>
    );
};
