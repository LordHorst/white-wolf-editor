import React from 'react';
import { getClanDisciplines, VampireFlaws, VampireMerits } from '../../data/sharedData';
import { useCharacterManager } from '../../hooks/useCharacterManager';
import { useFreebies } from '../../hooks/useFreebies';
import { BaseSheetLayout } from '../../components/layouts/BaseSheetLayout'; 
import { MeritFlawSection } from '../../components/ui/MeritFlawSection'; 
import { TraitSection } from '../../components/ui/TraitSection'; 
import { VAMPIRE_COSTS } from '../../data/rulesConfig'; 
import { getEmptyVampire } from '../../data/templates';

/**
 * VampireSheet Komponente
 * Nutzt das BaseSheetLayout für ein konsistentes Design über alle WoD-Systeme hinweg.
 */
const VampireSheet = () => {
  // 1. State Management via Custom Hook
  const mngr = useCharacterManager("vampire_char", getEmptyVampire);

  // Destructuring der benötigten Funktionen und Daten aus dem Manager
  const {
    character,
    updateInfo,
    updateTrait,
    addListItem,
    removeListItem
  } = mngr;

  // 2. Freebie-Logik für die Berechnung der Charakterpunkte
  const freebie = useFreebies(character, VAMPIRE_COSTS, updateTrait);

  // Sicherheits-Check, falls der Charakter noch lädt
  if (!character) return null;

  return (
      <BaseSheetLayout mngr={mngr} theme="emerald">
        <div className="space-y-6 pb-20">

          {/* INFO HEADER SEKTION - Stammdaten des Vampirs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-black/40 p-4 rounded-lg border border-emerald-900/30">
            {character.info && Object.keys(character.info).map((key) => (
                <div key={key} className="flex flex-col">
                  <label className="text-[10px] uppercase text-emerald-500/70 ml-1">{key}</label>
                  <input
                      type="text"
                      value={character.info[key]}
                      onChange={(e) => updateInfo(key, e.target.value)}
                      className="bg-transparent border-b border-emerald-900/50 text-emerald-100 px-1 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
            ))}
          </div>

          {/* ATTRIBUTE - Physisch, Gesellschaftlich, Geistig */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(character.attributes).map(([cat, traits]) => (
                <TraitSection
                    key={cat}
                    title={cat}
                    traits={traits}
                    onUpdate={(name, val) => updateTrait('attributes', cat, name, val)}
                    theme="emerald"
                />
            ))}
          </div>

          {/* FÄHIGKEITEN - Talente, Fertigkeiten, Kenntnisse */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(character.abilities).map(([cat, traits]) => (
                <TraitSection
                    key={cat}
                    title={cat}
                    traits={traits}
                    onUpdate={(name, val) => updateTrait('abilities', cat, name, val)}
                    theme="emerald"
                />
            ))}
          </div>

          {/* VAMPIR-SPEZIFISCH: DISZIPLINEN & TUGENDEN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Disziplinen als dynamische Liste mit Vorschlägen basierend auf dem Clan */}
            <TraitSection
                title="Disziplinen"
                traits={character.disciplines}
                onUpdate={(name, val) => updateTrait('disciplines', null, name, val)}
                isList={true}
                onAdd={(name) => addListItem('disciplines', name, 0)}
                onRemove={(name) => removeListItem('disciplines', name)}
                suggestions={getClanDisciplines(character.info.Clan)}
                theme="emerald"
            />

            {/* Tugenden (Gewissen, Selbstbeherrschung, Mut) */}
            <TraitSection
                title="Tugenden"
                traits={character.virtues}
                onUpdate={(name, val) => updateTrait('virtues', null, name, val)}
                theme="emerald"
            />

            {/* Menschlichkeit und Willenskraft */}
            <div className="space-y-4">
              <TraitSection
                  title="Menschlichkeit"
                  traits={{ "Menschlichkeit": character.humanity }}
                  onUpdate={(name, val) => updateTrait('humanity', null, null, val)}
                  theme="emerald"
              />
              <TraitSection
                  title="Willenskraft"
                  traits={{ "Willenskraft": character.willpower }}
                  onUpdate={(name, val) => updateTrait('willpower', null, null, val)}
                  theme="emerald"
              />
            </div>
          </div>

          {/* VORZÜGE & NACHTEILE - Extrahierte Logik für Modals und Listen */}
          <MeritFlawSection
              character={character}
              meritsList={VampireMerits}
              flawsList={VampireFlaws}
              onAddMerit={(m) => addListItem('merits', m.name, m.cost)}
              onRemoveMerit={(m) => removeListItem('merits', m.name)}
              onAddFlaw={(f) => addListItem('flaws', f.name, f.cost)}
              onRemoveFlaw={(f) => removeListItem('flaws', f.name)}
              freebie={freebie}
              theme="emerald"
          />
        </div>
      </BaseSheetLayout>
  );
};

export default VampireSheet;