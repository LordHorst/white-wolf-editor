import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { SharedData, WerewolfData, WerewolfMerits, WerewolfFlaws } from '../../data/sharedData';
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
import { getEmptyWerewolf } from '../../data/templates';
import {
  sumBackgrounds,
  randomInt,
  randomChoice,
  randomizeAttributes,
  randomizeAbilities,
  randomizeBackgrounds,
  distributePoints,
} from '../../utils/characterUtils';

// ─── Freebie-Kosten ─────────────────────────────────────────────────────────
const freebieCosts = {
  attribute: 5,
  ability: 2,
  background: 1,
  renown: 2,
  rage: 2,
  gnosis: 2,
  willpower: 1,
};

// ─── Hintergrundliste ───────────────────────────────────────────────────────
const getPredefinedBackgrounds = () =>
    WerewolfData.backgrounds
        ? Object.keys(WerewolfData.backgrounds).filter(bg => bg !== 'Generation')
        : [];

// ─── Komponente ─────────────────────────────────────────────────────────────
export const WerewolfSheet = () => {
  const mngr = useCharacterManager(getEmptyWerewolf(), 'wta');
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
  } = useTraitValidation({ character, updateStat, freebie, showToast });

  // ─── Freebie-Reset bei neuem Charakter ──────────────────────────────────
  useEffect(() => { freebie.reset(15); }, [character.info.Name]);

  // ─── Zufallsgenerator ───────────────────────────────────────────────────
  const randomizeCharacter = () => {
    const randomTribe   = randomChoice(WerewolfData.tribes);
    const randomAuspice = randomChoice(WerewolfData.auspices);
    const randomBreed   = randomChoice(WerewolfData.breeds);
    const randomName    = `${randomChoice(SharedData.firstNames)} ${randomChoice(SharedData.lastNames)}`;

    const info = {
      Name:       randomName,
      Spieler:    '', Chronik: '',
      Rasse:      randomBreed,
      Vorzeichen: randomAuspice,
      Stamm:      randomTribe,
      Rudel: '', Totem: '',
      Konzept:    randomChoice(SharedData.concepts ?? ['?']),
      Wesen:      randomChoice(SharedData.demeanors ?? ['?']),
      Verhalten:  randomChoice(SharedData.natures ?? ['?']),
    };

    const newAttributes  = randomizeAttributes(getEmptyWerewolf().attributes);
    const newAbilities   = randomizeAbilities(getEmptyWerewolf().abilities);
    const newBackgrounds = randomizeBackgrounds(getPredefinedBackgrounds());

    // Gaben: je eine pro Rasse, Vorzeichen, Stamm
    const gaben = [
      { name: `${randomBreed}-Gabe`, value: 1 },
      { name: `${randomAuspice}-Gabe`, value: 1 },
      { name: `${randomTribe}-Gabe`, value: 1 },
    ];

    // Renown: 3 Punkte zufällig
    const renownPoints = distributePoints([0, 0, 0], 3, 5);
    const newRenown = { Ruhm: renownPoints[0], Ehre: renownPoints[1], Weisheit: renownPoints[2] };

    setCharacter({
      info,
      attributes: newAttributes,
      abilities:  newAbilities,
      advantages: { gaben, hintergründe: newBackgrounds, renown: newRenown },
      status: {
        zorn:        randomInt(1, 5),
        gnosis:      randomInt(1, 5),
        willenskraft: randomInt(1, 5),
        gesundheit:  JSON.parse(JSON.stringify(SharedData.initialHealth)),
      },
      extra: { erfahrung: '', vorzügeSchwächen: [] },
      merits: [], flaws: [],
    });
    freebie.reset(15);
    freebie.setFreebiesActive(false);
    showToast('Zufälliger Werwolf erstellt!', 'success');
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
          showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
          return;
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
  const makeFreebieStatusHandler = (key, freebieKey, min) => (newValue) => {
    const current = character.status[key];
    if (newValue === current) return;
    if (freebie.freebiesActive) {
      const cost = freebie.getCost(freebieKey, current, newValue);
      if (cost > freebie.freebiePoints) {
        showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
        return;
      }
      setCharacter(p => ({ ...p, status: { ...p.status, [key]: newValue } }));
      freebie.spend(freebieKey, current, newValue);
    } else {
      if (newValue > current) {
        showToast(`${key} kann nur mit Freebies erhöht werden.`, 'error');
      } else {
        setCharacter(p => ({ ...p, status: { ...p.status, [key]: newValue } }));
      }
    }
  };

  const handleZornChange      = makeFreebieStatusHandler('zorn', 'rage', 1);
  const handleGnosisChange    = makeFreebieStatusHandler('gnosis', 'gnosis', 1);
  const handleWillpowerChange = makeFreebieStatusHandler('willenskraft', 'willpower', 1);

  const getButtonClasses = (isActive) =>
      `px-3 py-1 text-xs uppercase tracking-wider rounded border ${
          isActive
              ? 'border-amber-700 bg-amber-950/50 text-amber-300 hover:bg-amber-900/50'
              : 'border-amber-900/30 bg-black/30 text-amber-600 cursor-not-allowed'
      }`;

  // ─── JSX ────────────────────────────────────────────────────────────────
  return (
      <div className="text-amber-300 font-serif">
        <SheetControls title="Werewolf" subtitle="The Apocalypse" theme="amber" mngr={mngr} freebieState={freebie} />

        <div className="border-2 border-amber-900/50 bg-[#080501]/95 p-8 shadow-2xl relative">
          <header className="text-center mb-12 border-b border-amber-900/30 pb-6 relative">
            <h1 className="text-5xl font-bold tracking-[0.2em] text-amber-500 uppercase mb-2">Werewolf</h1>
            <div className="absolute top-0 right-0 flex gap-2">
              <button onClick={randomizeCharacter} className="p-2 text-amber-400 hover:text-amber-200 transition-colors" title="Zufälliger Charakter">🎲</button>
              <button onClick={() => setShowRules(!showRules)} className="p-2 text-amber-400 hover:text-amber-200 transition-colors" title="Regeln anzeigen"><Info size={20} /></button>
            </div>
          </header>

          {showRules && (
              <div className="mb-8 p-4 bg-black/60 border border-amber-800/50 rounded text-xs space-y-2">
                <p><strong>📜 Attribut-Punkteverteilung</strong><br />Jeder Charakter beginnt mit 1 Punkt in jedem Attribut. Zusätzlich werden 7, 5 und 3 Punkte auf die drei Kategorien verteilt.</p>
                <p><strong>⚙️ Fähigkeiten-Punkteverteilung</strong><br />Alle Fähigkeiten starten bei 0. Die drei Gruppen erhalten 13, 9 und 5 Punkte.</p>
                <p><strong>✨ Vorteile</strong><br /><strong>Hintergründe:</strong> 5 Punkte insgesamt. <strong>Gaben:</strong> je eine Gabe aus Rasse, Vorzeichen und Stamm.</p>
                <p><strong>⭐ Freebies</strong><br />15 Punkte. Kosten: Attribut 5, Fähigkeit 2, Hintergrund 1, Renown 2, Zorn 2, Gnosis 2, Willenskraft 1 pro Punkt.</p>
              </div>
          )}

          {/* INFO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mb-8">
            {Object.entries(character.info).map(([key, val]) => (
                <div key={key} className="flex flex-col border-b border-amber-900/30">
                  <label className="text-[9px] uppercase text-amber-700 font-bold">{key}</label>
                  {key === 'Stamm' ? (
                      <select value={val} onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, Stamm: e.target.value } }))} className="bg-transparent text-amber-100 outline-none py-1 cursor-pointer">
                        <option value="" className="bg-black">Wähle...</option>
                        {WerewolfData.tribes.map(t => <option key={t} value={t} className="bg-black">{t}</option>)}
                      </select>
                  ) : key === 'Vorzeichen' ? (
                      <select value={val} onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, Vorzeichen: e.target.value } }))} className="bg-transparent text-amber-100 outline-none py-1 cursor-pointer">
                        <option value="" className="bg-black">Wähle...</option>
                        {WerewolfData.auspices.map(a => <option key={a} value={a} className="bg-black">{a}</option>)}
                      </select>
                  ) : key === 'Rasse' ? (
                      <select value={val} onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, Rasse: e.target.value } }))} className="bg-transparent text-amber-100 outline-none py-1 cursor-pointer">
                        <option value="" className="bg-black">Wähle...</option>
                        {WerewolfData.breeds.map(b => <option key={b} value={b} className="bg-black">{b}</option>)}
                      </select>
                  ) : key === 'Konzept' ? (
                      <>
                        <input list="wta-concepts" value={val} onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, Konzept: e.target.value } }))} className="bg-transparent text-amber-100 outline-none py-1" />
                        <datalist id="wta-concepts">{SharedData.concepts?.map((c, i) => <option key={i} value={c} />)}</datalist>
                      </>
                  ) : key === 'Wesen' ? (
                      <>
                        <input list="wta-natures" value={val} onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, Wesen: e.target.value } }))} className="bg-transparent text-amber-100 outline-none py-1" />
                        <datalist id="wta-natures">{SharedData.natures?.map((n, i) => <option key={i} value={n} />)}</datalist>
                      </>
                  ) : key === 'Verhalten' ? (
                      <>
                        <input list="wta-demeanors" value={val} onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, Verhalten: e.target.value } }))} className="bg-transparent text-amber-100 outline-none py-1" />
                        <datalist id="wta-demeanors">{SharedData.demeanors?.map((d, i) => <option key={i} value={d} />)}</datalist>
                      </>
                  ) : (
                      <input type="text" value={val} onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, [key]: e.target.value } }))} className="bg-transparent outline-none py-1 text-amber-100" />
                  )}
                </div>
            ))}
          </div>

          {/* ATTRIBUTE & FÄHIGKEITEN */}
          <TraitSection title="Attribute" data={character.attributes} theme="amber" onChange={validateAndApplyAttributeChange} isAttr groupStats={attrGroupStats} />
          <TraitSection title="Fähigkeiten" data={character.abilities} theme="amber" onChange={validateAndApplyAbilityChange} groupStats={abilityGroupStats} />

          {/* VORTEILE */}
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase tracking-widest text-amber-500 text-center py-2 mb-6 bg-amber-950/20">Vorteile</h2>
            <div className="grid grid-cols-3 gap-8">
              {/* Gaben */}
              <div>
                <h3 className="text-xs font-bold text-amber-700 uppercase mb-4">Gaben</h3>
                {character.advantages.gaben.map((gift, idx) => (
                    <div key={idx} className="mb-2 flex items-center gap-2">
                      <input
                          type="text"
                          value={gift.name}
                          onChange={(e) => {
                            const newGaben = [...character.advantages.gaben];
                            newGaben[idx] = { ...newGaben[idx], name: e.target.value };
                            setCharacter(p => ({ ...p, advantages: { ...p.advantages, gaben: newGaben } }));
                          }}
                          placeholder="Gabe..."
                          className="bg-transparent border-b border-amber-900 text-amber-100 text-sm py-1 flex-1"
                      />
                    </div>
                ))}
              </div>

              {/* Hintergründe */}
              <div>
                <h3 className="text-xs font-bold text-amber-700 uppercase mb-4">Hintergründe ({backgroundsTotal}/5)</h3>
                {character.advantages.hintergründe.map((bg, idx) => (
                    <BackgroundListItem
                        key={idx}
                        item={bg}
                        index={idx}
                        onChange={handleBackgroundsChange}
                        predefinedOptions={getPredefinedBackgrounds()}
                        backgroundsData={WerewolfData.backgrounds}
                        theme="amber"
                    />
                ))}
              </div>

              {/* Renown */}
              <div>
                <h3 className="text-xs font-bold text-amber-700 uppercase mb-4">Ansehen</h3>
                {Object.entries(character.advantages.renown).map(([name, val]) => (
                    <div key={name} className="flex justify-between items-center mb-2">
                      <span className="text-xs">{name}</span>
                      <DotRating
                          theme="amber"
                          value={val}
                          max={5}
                          onChange={(v) => {
                            if (freebie.freebiesActive) {
                              const cost = freebie.getCost('renown', val, v);
                              if (cost > freebie.freebiePoints) { showToast(`Nicht genug Freebies.`, 'error'); return; }
                              setCharacter(p => ({ ...p, advantages: { ...p.advantages, renown: { ...p.advantages.renown, [name]: v } } }));
                              freebie.spend('renown', val, v);
                            } else {
                              setCharacter(p => ({ ...p, advantages: { ...p.advantages, renown: { ...p.advantages.renown, [name]: v } } }));
                            }
                          }}
                      />
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* STATUS */}
          <section className="grid grid-cols-2 gap-12 border-t border-amber-900/50 pt-8">
            <div className="space-y-4">
              {[
                { label: 'Zorn', key: 'zorn', handler: handleZornChange, min: 1, max: 10 },
                { label: 'Gnosis', key: 'gnosis', handler: handleGnosisChange, min: 1, max: 10 },
                { label: 'Willenskraft', key: 'willenskraft', handler: handleWillpowerChange, min: 1, max: 10 },
              ].map(({ label, key, handler, min, max }) => (
                  <div key={key} className="text-center">
                    <h3 className="text-xs text-amber-700 uppercase font-bold mb-2">{label}</h3>
                    <div className="flex justify-center">
                      <DotRating theme="amber" value={character.status[key]} min={min} max={max} onChange={handler} />
                    </div>
                    <div className="flex justify-center space-x-1.5 mt-2">
                      {[...Array(max)].map((_, i) => <div key={i} className="w-4 h-4 border border-amber-900" />)}
                    </div>
                  </div>
              ))}
            </div>
            <HealthBox health={character.status.gesundheit} theme="amber" setCharacter={setCharacter} />
          </section>

          {/* VORZÜGE & NACHTEILE */}
          <MeritsFlawsSection
              merits={character.merits}
              flaws={character.flaws}
              onRemoveMerit={handleRemoveMerit}
              onRemoveFlaw={handleRemoveFlaw}
              freebiesActive={freebie.freebiesActive}
              theme="amber"
          />
          <br />

          {/* Buttons */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <button onClick={() => { setShowMeritsModal(true); setMeritsModalType('merit'); }} className={getButtonClasses(freebie?.freebiesActive)}>Vorzüge</button>
            <button onClick={() => { setShowMeritsModal(true); setMeritsModalType('flaw'); }} className={getButtonClasses(freebie?.freebiesActive)}>Nachteile</button>
          </div>
        </div>

        <StorageModals mngr={mngr} theme="amber" />
        <MeritsFlawsModal
            isOpen={showMeritsModal}
            onClose={() => setShowMeritsModal(false)}
            type={meritsModalType}
            meritsList={WerewolfMerits}
            flawsList={WerewolfFlaws}
            selectedMerits={character.merits}
            selectedFlaws={character.flaws}
            onAddMerit={handleAddMerit}
            onRemoveMerit={handleRemoveMerit}
            onAddFlaw={handleAddFlaw}
            onRemoveFlaw={handleRemoveFlaw}
            freebiePoints={freebie.freebiePoints}
            freebiesActive={freebie.freebiesActive}
            theme="amber"
        />
      </div>
  );
};
