import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { SharedData, MageData, MageMerits, MageFlaws, getSectsForAffiliation } from '../../data/sharedData';
import { useCharacterManager } from '../../hooks/useCharacterManager';
import { useFreebies } from '../../hooks/useFreebies';
import { useMeritsFlaws } from '../../hooks/useMeritsFlaws';
import { useTraitValidation } from '../../hooks/useTraitValidation';
import { SheetControls } from '../../components/ui/SheetControls';
import { TraitSection } from '../../components/ui/TraitSection';
import { HealthBox } from '../../components/ui/HealthBox';
import { StorageModals } from '../../components/ui/StorageModals';
import { DotRating } from '../../components/ui/DotRating';
import { MeritsFlawsModal } from '../../components/ui/MeritsFlawsModal';
import { BackgroundListItem } from '../../components/ui/BackgroundSection';
import { MeritsFlawsSection } from '../../components/ui/MeritsFlawsSection';
import { getEmptyMage } from '../../data/templates';
import {
  sumBackgrounds,
  randomChoice,
  randomizeAttributes,
  randomizeAbilities,
  randomizeBackgrounds,
  distributePoints,
} from '../../utils/characterUtils';

// ─── Freebie-Kosten ─────────────────────────────────────────────────────────
const freebieCosts = {
  attribute: 5, ability: 2, background: 1,
  sphere: 4, arete: 8, willpower: 1, quintessence: 2,
};

// ─── Sphären/Hintergründe Helpers ───────────────────────────────────────────
const sumSpheres = (spheres) => Object.values(spheres).reduce((sum, v) => sum + v, 0);
const getPredefinedBackgrounds = () =>
    MageData.backgrounds ? Object.keys(MageData.backgrounds) : [];

// ─── Kampfkunst-Limit ────────────────────────────────────────────────────────
// Mage-spezifische Zusatzprüfung: Do / Kampfkunst max. 2 Punkte
const kampfkunstValidation = (name, newValue) =>
    name === 'Kampfkunst' && newValue > 2
        ? 'Kampfkunst (Do) kann zu Beginn maximal 2 Punkte haben.'
        : null;

// Setzt beim Zufallsgenerator überschüssige Kampfkunst-Punkte um
const enforceKampfkunstLimit = (abilities) => {
  const result = JSON.parse(JSON.stringify(abilities));
  const fk = result.fertigkeiten;
  if (fk.Kampfkunst <= 2) return result;
  let excess = fk.Kampfkunst - 2;
  fk.Kampfkunst = 2;
  const others = Object.keys(fk).filter(n => n !== 'Kampfkunst');
  while (excess > 0) {
    const possible = others.filter(n => fk[n] < 3);
    if (!possible.length) break;
    fk[randomChoice(possible)]++;
    excess--;
  }
  return result;
};

// ─── Komponente ─────────────────────────────────────────────────────────────
export const MageSheet = () => {
  const mngr = useCharacterManager(getEmptyMage(), 'mta');
  const { character, setCharacter, updateStat, showToast } = mngr;
  const [showRules, setShowRules] = useState(false);
  const [showMeritsModal, setShowMeritsModal] = useState(false);
  const [meritsModalType, setMeritsModalType] = useState('merit');
  const freebie = useFreebies(15, freebieCosts);

  // Geteilte Hooks
  const { handleAddMerit, handleRemoveMerit, handleAddFlaw, handleRemoveFlaw } =
      useMeritsFlaws({ character, setCharacter, freebie, showToast });

  const {
    attrGroupStats,
    abilityGroupStats,
    validateAndApplyAttributeChange,
    validateAndApplyAbilityChange,
  } = useTraitValidation({
    character,
    updateStat,
    freebie,
    showToast,
    attrCapWithoutFreebies: 5,
    abilityCapWithoutFreebies: 3,
    extraAbilityValidation: kampfkunstValidation,
  });

  // ─── Effects ────────────────────────────────────────────────────────────
  useEffect(() => { freebie.reset(15); }, [character.info.Name]);

  // Quantity-Migration für geladene Charaktere ohne quantity-Feld
  useEffect(() => {
    if (character.merits?.some(m => !Object.prototype.hasOwnProperty.call(m, 'quantity'))) {
      setCharacter(prev => ({ ...prev, merits: prev.merits.map(m => ({ ...m, quantity: 1 })) }));
    }
  }, [character.merits]);

  // ─── Zufallsgenerator ───────────────────────────────────────────────────
  const randomizeCharacter = () => {
    const randomAffiliation = randomChoice(MageData.affiliations.map(a => a.name));
    const affiliation = MageData.affiliations.find(a => a.name === randomAffiliation);

    const info = {
      Name:         `${randomChoice(SharedData.firstNames)} ${randomChoice(SharedData.lastNames)}`,
      Wesen:        randomChoice(SharedData.demeanors ?? ['?']),
      Zugehörigkeit: randomAffiliation,
      Spieler:      '',
      Verhalten:    randomChoice(SharedData.natures ?? ['?']),
      Gruppierung:  randomChoice(affiliation?.sects ?? []),
      Chronik:      '',
      Essenz:       randomChoice(MageData.essences),
      Konzept:      randomChoice(SharedData.concepts ?? ['?']),
    };

    const rawAbilities  = randomizeAbilities(getEmptyMage().abilities);
    const finalAbilities = enforceKampfkunstLimit(rawAbilities);

    // Sphären: 3 Punkte (max 3 pro Sphäre)
    const sphereDist = distributePoints(MageData.spheres, 3, 3);
    const newSpheres = Object.fromEntries(MageData.spheres.map((s, i) => [s, sphereDist[i]]));

    setCharacter({
      info,
      attributes: randomizeAttributes(getEmptyMage().attributes),
      abilities:  finalAbilities,
      advantages: {
        sphären:     newSpheres,
        hintergründe: randomizeBackgrounds(getPredefinedBackgrounds()),
      },
      status: {
        arete: 1, willenskraft: 5, quintessenz: 1, paradox: 0,
        gesundheit: JSON.parse(JSON.stringify(SharedData.initialHealth)),
      },
      extra: { erfahrung: '', vorzügeSchwächen: [] },
      merits: [], flaws: [],
    });
    freebie.reset(15);
    freebie.setFreebiesActive(false);
    showToast('Zufälliger Magier erstellt!', 'success');
  };

  // ─── Sphären ────────────────────────────────────────────────────────────
  const spheresTotal = sumSpheres(character.advantages.sphären);
  const handleSphereChange = (sphereName, newValue) => {
    const oldValue = character.advantages.sphären[sphereName];
    if (newValue === oldValue) return;
    const newSpheres = { ...character.advantages.sphären, [sphereName]: newValue };
    const newTotal = sumSpheres(newSpheres);

    if (freebie.freebiesActive) {
      const cost = freebie.getCost('sphere', oldValue, newValue);
      if (cost > freebie.freebiePoints) {
        showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error'); return;
      }
      setCharacter(p => ({ ...p, advantages: { ...p.advantages, sphären: newSpheres } }));
      freebie.spend('sphere', oldValue, newValue);
    } else {
      if (newTotal <= 3) {
        setCharacter(p => ({ ...p, advantages: { ...p.advantages, sphären: newSpheres } }));
      } else {
        showToast(`Maximal 3 Punkte in Sphären erlaubt (aktuell ${newTotal}).`, 'error');
      }
    }
  };

  // ─── Hintergründe ───────────────────────────────────────────────────────
  const backgroundsTotal = sumBackgrounds(character.advantages.hintergründe);
  const handleBackgroundsChange = (index, name, value) => {
    const newList = [...character.advantages.hintergründe];
    if (name !== undefined) newList[index] = { ...newList[index], name };
    if (value !== undefined) {
      const oldValue = newList[index].value;
      newList[index] = { ...newList[index], value };
      const newTotal = sumBackgrounds(newList);

      if (freebie.freebiesActive) {
        const cost = freebie.getCost('background', oldValue, value);
        if (cost > freebie.freebiePoints) {
          showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error'); return;
        }
        setCharacter(p => ({ ...p, advantages: { ...p.advantages, hintergründe: newList } }));
        freebie.spend('background', oldValue, value);
      } else {
        if (newTotal <= 5) {
          setCharacter(p => ({ ...p, advantages: { ...p.advantages, hintergründe: newList } }));
        } else {
          showToast(`Maximal 5 Punkte in Hintergründen erlaubt (aktuell ${newTotal}).`, 'error');
        }
      }
    } else {
      setCharacter(p => ({ ...p, advantages: { ...p.advantages, hintergründe: newList } }));
    }
  };

  // ─── Status-Handler ─────────────────────────────────────────────────────
  const makeFreebieStatusHandler = (key, freebieKey, allowDecrease = true) => (newValue) => {
    const current = character.status[key];
    if (newValue === current) return;
    if (freebie.freebiesActive) {
      const cost = freebie.getCost(freebieKey, current, newValue);
      if (cost > freebie.freebiePoints) {
        showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error'); return;
      }
      setCharacter(p => ({ ...p, status: { ...p.status, [key]: newValue } }));
      freebie.spend(freebieKey, current, newValue);
    } else {
      if (newValue > current) {
        showToast(`${key} kann nur mit Freebies erhöht werden.`, 'error');
      } else if (allowDecrease) {
        setCharacter(p => ({ ...p, status: { ...p.status, [key]: newValue } }));
      }
    }
  };

  const handleAreteChange       = makeFreebieStatusHandler('arete', 'arete');
  const handleWillpowerChange   = makeFreebieStatusHandler('willenskraft', 'willpower');
  const handleQuintessenceChange = makeFreebieStatusHandler('quintessenz', 'quintessence');
  const handleParadoxChange     = (v) => setCharacter(p => ({ ...p, status: { ...p.status, paradox: v } }));

  // ─── Helpers ────────────────────────────────────────────────────────────
  const getSectsForCurrentAffiliation = () =>
      MageData.affiliations.find(a => a.name === character.info.Zugehörigkeit)?.sects ?? [];

  const getButtonClasses = (isActive) =>
      `px-3 py-1 text-xs uppercase tracking-wider rounded border ${
          isActive
              ? 'border-purple-700 bg-purple-950/50 text-purple-300 hover:bg-purple-900/50'
              : 'border-purple-900/30 bg-black/30 text-purple-600 cursor-not-allowed'
      }`;

  // ─── JSX ────────────────────────────────────────────────────────────────
  return (
      <div className="text-purple-300 font-serif">
        <SheetControls title="Mage" subtitle="The Ascension" theme="purple" mngr={mngr} freebieState={freebie} />

        <div className="border-2 border-purple-900/50 bg-[#060208]/95 p-8 shadow-2xl relative">
          <header className="text-center mb-12 border-b border-purple-900/30 pb-6 relative">
            <h1 className="text-5xl font-bold tracking-[0.2em] text-purple-500 uppercase mb-2">Mage</h1>
            <div className="absolute top-0 right-0 flex gap-2">
              <button onClick={randomizeCharacter} className="p-2 text-purple-400 hover:text-purple-200 transition-colors" title="Zufälliger Charakter">🎲</button>
              <button onClick={() => setShowRules(!showRules)} className="p-2 text-purple-400 hover:text-purple-200 transition-colors" title="Regeln anzeigen"><Info size={20} /></button>
            </div>
          </header>

          {showRules && (
              <div className="mb-8 p-4 bg-black/60 border border-purple-800/50 rounded text-xs space-y-2">
                <p><strong>📜 Attribut-Punkteverteilung</strong><br />Jeder Charakter beginnt mit 1 Punkt in jedem Attribut. Zusätzlich werden 7, 5 und 3 Punkte auf die drei Kategorien verteilt.<br />Ohne Freebies darf kein Attribut 5 überschreiten.</p>
                <p><strong>⚙️ Fähigkeiten-Punkteverteilung</strong><br />Alle Fähigkeiten starten bei 0. Die drei Gruppen erhalten 13, 9 und 5 Punkte.<br />Ohne Freebies darf keine Fähigkeit 3 überschreiten.</p>
                <p><strong>✨ Vorteile</strong><br /><strong>Hintergründe:</strong> 5 Punkte (max. 5 pro Hintergrund). <strong>Sphären:</strong> 3 Punkte (max. 3 pro Sphäre). <strong>Arete:</strong> Start 1. <strong>Willenskraft:</strong> Start 5. <strong>Quintessenz:</strong> Start = Arete (1).</p>
                <p><strong>⭐ Freebies</strong><br />15 Punkte. Kosten: Attribut 5, Fähigkeit 2, Hintergrund 1, Sphäre 4, Arete 8, Willenskraft 1, Quintessenz 2 pro Punkt.</p>
                <p><strong>➕ Vorzüge &amp; Nachteile</strong><br />Vorzüge kosten Freebies, Nachteile geben zusätzliche Freebies.</p>
              </div>
          )}

          {/* INFO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mb-8">
            {Object.entries(character.info).map(([key, val]) => (
                <div key={key} className="flex flex-col border-b border-purple-900/30">
                  <label className="text-[9px] uppercase text-purple-700 font-bold">{key}</label>
                  {key === 'Zugehörigkeit' ? (
                      <select value={val} onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, Zugehörigkeit: e.target.value, Gruppierung: '' } }))} className="bg-transparent text-purple-100 outline-none py-1 cursor-pointer">
                        <option value="" className="bg-black text-purple-500">Wähle...</option>
                        {MageData.affiliations.map(aff => <option key={aff.name} value={aff.name} className="bg-black text-purple-100">{aff.name}</option>)}
                      </select>
                  ) : key === 'Gruppierung' ? (
                      <select value={val} disabled={!character.info.Zugehörigkeit} onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, Gruppierung: e.target.value } }))} className={`bg-transparent outline-none py-1 cursor-pointer ${!character.info.Zugehörigkeit ? 'opacity-50' : ''}`}>
                        <option value="" className="bg-black text-purple-500">Wähle...</option>
                        {getSectsForCurrentAffiliation().map(sect => <option key={sect} value={sect} className="bg-black text-purple-100">{sect}</option>)}
                      </select>
                  ) : key === 'Essenz' ? (
                      <select value={val} onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, Essenz: e.target.value } }))} className="bg-transparent text-purple-100 outline-none py-1 cursor-pointer">
                        <option value="" className="bg-black text-purple-500">Wähle...</option>
                        {MageData.essences.map(ess => <option key={ess} value={ess} className="bg-black text-purple-100">{ess}</option>)}
                      </select>
                  ) : key === 'Konzept' ? (
                      <><input list="mta-concepts" value={val} onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, Konzept: e.target.value } }))} className="bg-transparent text-purple-100 outline-none py-1" />
                        <datalist id="mta-concepts">{SharedData.concepts?.map((c, i) => <option key={i} value={c} />)}</datalist></>
                  ) : key === 'Wesen' ? (
                      <><input list="mta-natures" value={val} onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, Wesen: e.target.value } }))} className="bg-transparent text-purple-100 outline-none py-1" />
                        <datalist id="mta-natures">{SharedData.natures?.map((n, i) => <option key={i} value={n} />)}</datalist></>
                  ) : key === 'Verhalten' ? (
                      <><input list="mta-demeanors" value={val} onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, Verhalten: e.target.value } }))} className="bg-transparent text-purple-100 outline-none py-1" />
                        <datalist id="mta-demeanors">{SharedData.demeanors?.map((d, i) => <option key={i} value={d} />)}</datalist></>
                  ) : (
                      <input type="text" value={val} onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, [key]: e.target.value } }))} className="bg-transparent outline-none py-1 text-purple-100" />
                  )}
                </div>
            ))}
          </div>

          {/* ATTRIBUTE & FÄHIGKEITEN */}
          <TraitSection title="Attribute" data={character.attributes} theme="purple" onChange={validateAndApplyAttributeChange} isAttr groupStats={attrGroupStats} />
          <TraitSection title="Fähigkeiten" data={character.abilities} theme="purple" onChange={validateAndApplyAbilityChange} groupStats={abilityGroupStats} />

          {/* VORTEILE */}
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase tracking-widest text-purple-500 text-center py-2 mb-6 bg-purple-950/20">Vorteile</h2>
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h3 className="text-xs font-bold text-purple-700 uppercase mb-4 text-center">Sphären ({spheresTotal}/3)</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  {Object.entries(character.advantages.sphären).map(([name, val]) => (
                      <div key={name} className="flex justify-between items-center">
                        <span className="text-xs">{name}</span>
                        <DotRating theme="purple" value={val} max={5} onChange={(v) => handleSphereChange(name, v)} />
                      </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold text-purple-700 uppercase mb-4">Hintergründe ({backgroundsTotal}/5)</h3>
                {character.advantages.hintergründe.map((bg, idx) => (
                    <BackgroundListItem
                        key={idx}
                        item={bg}
                        index={idx}
                        onChange={handleBackgroundsChange}
                        predefinedOptions={getPredefinedBackgrounds()}
                        backgroundsData={MageData.backgrounds}
                        theme="purple"
                    />
                ))}
              </div>
            </div>
          </section>

          {/* STATUS */}
          <section className="grid grid-cols-2 gap-12 border-t border-purple-900/50 pt-8">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xs text-purple-700 uppercase font-bold mb-2">Arete</h3>
                <div className="flex justify-center">
                  <DotRating theme="purple" value={character.status.arete} min={1} max={10} onChange={handleAreteChange} />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xs text-purple-700 uppercase font-bold mb-2">Willenskraft</h3>
                <div className="flex justify-center">
                  <DotRating theme="purple" value={character.status.willenskraft} min={5} max={10} onChange={handleWillpowerChange} />
                </div>
                <div className="flex justify-center space-x-1.5 mt-2">
                  {[...Array(10)].map((_, i) => <div key={i} className="w-4 h-4 border border-purple-900" />)}
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xs text-purple-700 uppercase font-bold mb-2">Quintessenz / Paradox</h3>
                <div className="flex justify-center items-center space-x-4">
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-purple-400">Quintessenz</span>
                    {[0, 10].map(offset => (
                        <div key={offset} className="flex space-x-1 justify-end mt-1">
                          {[...Array(10)].map((_, i) => (
                              <div key={i} onClick={() => handleQuintessenceChange(offset + i + 1)}
                                   className={`w-3 h-3 border border-purple-500 cursor-pointer ${offset + i < character.status.quintessenz ? 'bg-purple-500' : ''}`} />
                          ))}
                        </div>
                    ))}
                  </div>
                  <div className="w-px h-10 bg-purple-900/50" />
                  <div className="text-left">
                    <span className="text-[10px] uppercase text-red-500">Paradox</span>
                    {[0, 10].map(offset => (
                        <div key={offset} className="flex space-x-1 mt-1">
                          {[...Array(10)].map((_, i) => (
                              <div key={i} onClick={() => handleParadoxChange(offset + i + 1)}
                                   className={`w-3 h-3 border border-red-900 cursor-pointer ${offset + i < character.status.paradox ? 'bg-red-500' : ''}`} />
                          ))}
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <HealthBox health={character.status.gesundheit} theme="purple" setCharacter={setCharacter} />
          </section>

          {/* VORZÜGE & NACHTEILE */}
          <MeritsFlawsSection
              merits={character.merits}
              flaws={character.flaws}
              onRemoveMerit={handleRemoveMerit}
              onRemoveFlaw={handleRemoveFlaw}
              freebiesActive={freebie.freebiesActive}
              theme="purple"
          />
          <br />

          <div className="absolute bottom-4 left-4 flex gap-2">
            <button onClick={() => { setShowMeritsModal(true); setMeritsModalType('merit'); }} className={getButtonClasses(freebie?.freebiesActive)}>Vorzüge</button>
            <button onClick={() => { setShowMeritsModal(true); setMeritsModalType('flaw'); }} className={getButtonClasses(freebie?.freebiesActive)}>Nachteile</button>
          </div>
        </div>

        <StorageModals mngr={mngr} theme="purple" />
        <MeritsFlawsModal
            isOpen={showMeritsModal}
            onClose={() => setShowMeritsModal(false)}
            type={meritsModalType}
            meritsList={MageMerits}
            flawsList={MageFlaws}
            selectedMerits={character.merits}
            selectedFlaws={character.flaws}
            onAddMerit={handleAddMerit}
            onRemoveMerit={handleRemoveMerit}
            onAddFlaw={handleAddFlaw}
            onRemoveFlaw={handleRemoveFlaw}
            freebiePoints={freebie.freebiePoints}
            freebiesActive={freebie.freebiesActive}
            theme="purple"
        />
      </div>
  );
};
