import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { SharedData, VampireData, VampireMerits, VampireFlaws, getClanDisciplines } from '../../data/sharedData';
import { useCharacterManager } from '../../hooks/useCharacterManager';
import { useFreebies } from '../../hooks/useFreebies';
import { useMeritsFlaws } from '../../hooks/useMeritsFlaws';
import { useTraitValidation } from '../../hooks/useTraitValidation';
import { SheetControls } from '../../components/ui/SheetControls';
import { TraitSection } from '../../components/ui/TraitSection';
import { ListTrait } from '../../components/ui/ListTrait';
import { HealthBox } from '../../components/ui/HealthBox';
import { StorageModals } from '../../components/ui/StorageModals';
import { DotRating } from '../../components/ui/DotRating';
import { MeritsFlawsModal } from '../../components/ui/MeritsFlawsModal';
import { BackgroundListItem } from '../../components/ui/BackgroundSection';
import { MeritsFlawsSection } from '../../components/ui/MeritsFlawsSection';
import { getEmptyVampire } from '../../data/templates';
import {
  sumBackgrounds,
  randomInt,
  randomChoice,
  randomizeAttributes,
  randomizeAbilities,
  distributePoints,
} from '../../utils/characterUtils';

// ─── Freebie-Kosten ─────────────────────────────────────────────────────────
const freebieCosts = {
  attribute: 5,
  ability: 2,
  discipline: 7,
  background: 1,
  virtue: 2,
  humanity: 2,
  willpower: 1,
};

// ─── Generationsmapping ─────────────────────────────────────────────────────
const generationMap = {
  0: { generation: '13', bloodCapacity: 10 },
  1: { generation: '12', bloodCapacity: 11 },
  2: { generation: '11', bloodCapacity: 12 },
  3: { generation: '10', bloodCapacity: 13 },
  4: { generation: '9',  bloodCapacity: 14 },
  5: { generation: '8',  bloodCapacity: 15 },
};

const getGenerationInfo = (backgrounds) => {
  const genBg = backgrounds.find(bg => bg.name === 'Generation');
  return generationMap[genBg?.value ?? 0] ?? generationMap[0];
};

// ─── Hintergrundliste ───────────────────────────────────────────────────────
const getPredefinedBackgrounds = () =>
    VampireData.backgrounds ? Object.keys(VampireData.backgrounds) : [];

// ─── Vorteils-Hilfsfunktionen ───────────────────────────────────────────────
const sumDisciplines = (disciplines) => disciplines.reduce((sum, d) => sum + d.value, 0);
const sumVirtues     = (virtues)     => Object.values(virtues).reduce((sum, v) => sum + v, 0);

// ─── Komponente ─────────────────────────────────────────────────────────────
export const VampireSheet = () => {
  const mngr = useCharacterManager(getEmptyVampire(), 'vtm');
  const { character, setCharacter, updateStat, showToast } = mngr;
  const [showRules, setShowRules]           = useState(false);
  const [showMeritsModal, setShowMeritsModal] = useState(false);
  const [meritsModalType, setMeritsModalType] = useState('merit');
  const freebie = useFreebies(15, freebieCosts);

  // ─── Geteilte Hooks ────────────────────────────────────────────────────
  const { handleAddMerit, handleRemoveMerit, handleAddFlaw, handleRemoveFlaw } =
      useMeritsFlaws({ character, setCharacter, freebie, showToast });

  // Nosferatu: Erscheinungsbild vom Limit ausschließen
  const isNosferatu = character.info.Clan === 'Nosferatu';
  const { attrGroupStats, abilityGroupStats, validateAndApplyAttributeChange, validateAndApplyAbilityChange } =
      useTraitValidation({
        character,
        updateStat,
        freebie,
        showToast,
        excludeAttrField: isNosferatu ? 'Erscheinungsbild' : null,
      });

  // ─── Effects ──────────────────────────────────────────────────────────

  // Freebie-Reset bei neuem Charakter
  useEffect(() => { freebie.reset(15); }, [character.info.Name]);

  // Nosferatu: Erscheinungsbild erzwingen
  useEffect(() => {
    const val = character.attributes.gesellschaftlich?.Erscheinungsbild;
    if (isNosferatu && val !== 0) {
      setCharacter(p => ({ ...p, attributes: { ...p.attributes, gesellschaftlich: { ...p.attributes.gesellschaftlich, Erscheinungsbild: 0 } } }));
    } else if (!isNosferatu && val === 0) {
      setCharacter(p => ({ ...p, attributes: { ...p.attributes, gesellschaftlich: { ...p.attributes.gesellschaftlich, Erscheinungsbild: 1 } } }));
    }
  }, [character.info.Clan, character.attributes.gesellschaftlich?.Erscheinungsbild, setCharacter]);

  // Menschlichkeit: min = Gewissen + Selbstbeherrschung
  useEffect(() => {
    const min = character.advantages.tugenden.Gewissen + character.advantages.tugenden.Selbstbeherrschung;
    if (character.status.menschlichkeit < min) {
      setCharacter(p => ({ ...p, status: { ...p.status, menschlichkeit: min } }));
    }
  }, [character.advantages.tugenden.Gewissen, character.advantages.tugenden.Selbstbeherrschung, character.status.menschlichkeit]);

  // Willenskraft: min = Mut
  useEffect(() => {
    if (character.status.willenskraft < character.advantages.tugenden.Mut) {
      setCharacter(p => ({ ...p, status: { ...p.status, willenskraft: p.advantages.tugenden.Mut } }));
    }
  }, [character.advantages.tugenden.Mut, character.status.willenskraft]);

  // Generation + Blutvorrat synchron halten
  useEffect(() => {
    const { generation, bloodCapacity } = getGenerationInfo(character.advantages.hintergründe);
    const updates = {};
    if (character.info.Generation !== generation)       updates.info   = { ...character.info,   Generation: generation };
    if (character.status.blutvorrat !== bloodCapacity)  updates.status = { ...character.status, blutvorrat: bloodCapacity };
    if (Object.keys(updates).length) setCharacter(p => ({ ...p, ...updates }));
  }, [character.advantages.hintergründe, character.info.Generation, character.status.blutvorrat]);

  // ─── Zufallsgenerator ─────────────────────────────────────────────────
  const randomizeCharacter = () => {
    const allClans = Object.values(VampireData.clans).flatMap(cat => Object.keys(cat));
    const randomClan       = randomChoice(allClans);
    const clanDisciplines  = getClanDisciplines(randomClan);
    const randomName       = `${randomChoice(SharedData.firstNames)} ${randomChoice(SharedData.lastNames)}`;

    const newAttributes = randomizeAttributes(getEmptyVampire().attributes);
    if (randomClan === 'Nosferatu') newAttributes.gesellschaftlich.Erscheinungsbild = 0;

    const newAbilities  = randomizeAbilities(getEmptyVampire().abilities);

    // Disziplinen
    const disciplinesList = clanDisciplines.length > 0
        ? (() => {
          const list = clanDisciplines.map(name => ({ name, value: 0 }));
          const dist = distributePoints(list.map(() => 0), 3, 3);
          list.forEach((d, i) => { d.value = dist[i]; });
          while (list.length < 3) list.push({ name: '', value: 0 });
          return list;
        })()
        : [{ name: '', value: 0 }, { name: '', value: 0 }, { name: '', value: 0 }];

    // Hintergründe
    const predefinedBgs   = getPredefinedBackgrounds();
    const backgroundsList = Array(5).fill(null).map(() => ({ name: '', value: 0 }));
    let remaining = 5;
    const used = [];
    while (remaining > 0 && used.length < 5) {
      const bgName = randomChoice(predefinedBgs);
      if (used.includes(bgName)) continue;
      const pts = randomInt(1, Math.min(5, remaining));
      used.push(bgName);
      backgroundsList[used.length - 1] = { name: bgName, value: pts };
      remaining -= pts;
    }

    // Tugenden
    const extraVirtues = distributePoints([0, 0, 0], 7, 4);
    const newVirtues   = { Gewissen: 1 + extraVirtues[0], Selbstbeherrschung: 1 + extraVirtues[1], Mut: 1 + extraVirtues[2] };

    // Generation / Blut
    const genBg     = backgroundsList.find(bg => bg.name === 'Generation');
    const genInfo   = generationMap[genBg?.value ?? 0] ?? generationMap[0];
    const humanity  = Math.min(10, newVirtues.Gewissen + newVirtues.Selbstbeherrschung + randomInt(0, 3));
    const willpower = Math.min(10, newVirtues.Mut + randomInt(0, 3));

    setCharacter({
      info: {
        Name: randomName, Spieler: '', Chronik: '',
        Wesen:     randomChoice(SharedData.demeanors),
        Verhalten: randomChoice(SharedData.natures),
        Clan:      randomClan,
        Generation: genInfo.generation,
        Zuflucht: '',
        Konzept:   randomChoice(SharedData.concepts),
      },
      attributes: newAttributes,
      abilities:  newAbilities,
      advantages: { disziplinen: disciplinesList, hintergründe: backgroundsList, tugenden: newVirtues },
      status: {
        menschlichkeit: humanity,
        willenskraft:   willpower,
        blutvorrat:     genInfo.bloodCapacity,
        gesundheit:     JSON.parse(JSON.stringify(SharedData.initialHealth)),
      },
      extra:  { erfahrung: '', vorzügeSchwächen: [] },
      merits: [], flaws: [],
    });
    freebie.reset(15);
    freebie.setFreebiesActive(false);
    showToast('Zufälliger Charakter erstellt!', 'success');
  };

  // ─── Disziplinen ──────────────────────────────────────────────────────
  const disciplinesTotal = sumDisciplines(character.advantages.disziplinen);
  const handleDisciplinesChange = (index, name, value) => {
    const newList = [...character.advantages.disziplinen];
    if (name  !== undefined) newList[index] = { ...newList[index], name };
    if (value !== undefined) {
      const oldValue = newList[index].value;
      newList[index] = { ...newList[index], value };
      const newTotal = sumDisciplines(newList);

      if (freebie.freebiesActive) {
        const cost = freebie.getCost('discipline', oldValue, value);
        if (cost > freebie.freebiePoints) {
          showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
          return;
        }
        setCharacter(p => ({ ...p, advantages: { ...p.advantages, disziplinen: newList } }));
        freebie.spend('discipline', oldValue, value);
      } else {
        if (newTotal <= 3) {
          setCharacter(p => ({ ...p, advantages: { ...p.advantages, disziplinen: newList } }));
        } else {
          showToast(`Maximal 3 Punkte in Disziplinen erlaubt (aktuell ${newTotal}).`, 'error');
        }
      }
    } else {
      setCharacter(p => ({ ...p, advantages: { ...p.advantages, disziplinen: newList } }));
    }
  };

  // ─── Hintergründe ─────────────────────────────────────────────────────
  const backgroundsTotal = sumBackgrounds(character.advantages.hintergründe);
  const handleBackgroundsChange = (index, name, value) => {
    const newList = [...character.advantages.hintergründe];
    if (name  !== undefined) newList[index] = { ...newList[index], name };
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

  // ─── Tugenden ─────────────────────────────────────────────────────────
  const virtuesExtra = sumVirtues(character.advantages.tugenden) - 3;
  const handleVirtueChange = (name, newValue) => {
    const oldValue  = character.advantages.tugenden[name];
    if (newValue === oldValue) return;
    const newVirtues = { ...character.advantages.tugenden, [name]: newValue };
    const newTotal   = sumVirtues(newVirtues);

    if (freebie.freebiesActive) {
      const cost = freebie.getCost('virtue', oldValue, newValue);
      if (cost > freebie.freebiePoints) {
        showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
        return;
      }
      setCharacter(p => ({ ...p, advantages: { ...p.advantages, tugenden: newVirtues } }));
      freebie.spend('virtue', oldValue, newValue);
    } else {
      if (newTotal <= 10) {
        setCharacter(p => ({ ...p, advantages: { ...p.advantages, tugenden: newVirtues } }));
      } else {
        showToast('Maximal 7 zusätzliche Punkte für Tugenden (Gesamt max. 10).', 'error');
      }
    }
  };

  // ─── Menschlichkeit & Willenskraft ────────────────────────────────────
  const handleHumanityChange = (newValue) => {
    const current   = character.status.menschlichkeit;
    const minVal    = character.advantages.tugenden.Gewissen + character.advantages.tugenden.Selbstbeherrschung;
    if (newValue === current) return;
    if (newValue < minVal) { showToast(`Menschlichkeit kann nicht unter ${minVal} sinken.`, 'error'); return; }

    if (freebie.freebiesActive) {
      const cost = freebie.getCost('humanity', current, newValue);
      if (cost > freebie.freebiePoints) { showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error'); return; }
      setCharacter(p => ({ ...p, status: { ...p.status, menschlichkeit: newValue } }));
      freebie.spend('humanity', current, newValue);
    } else {
      setCharacter(p => ({ ...p, status: { ...p.status, menschlichkeit: newValue } }));
    }
  };

  const handleWillpowerChange = (newValue) => {
    const current = character.status.willenskraft;
    const minVal  = character.advantages.tugenden.Mut;
    if (newValue === current) return;
    if (newValue < minVal) { showToast(`Willenskraft kann nicht unter ${minVal} sinken (Mut).`, 'error'); return; }

    if (freebie.freebiesActive) {
      const cost = freebie.getCost('willpower', current, newValue);
      if (cost > freebie.freebiePoints) { showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error'); return; }
      setCharacter(p => ({ ...p, status: { ...p.status, willenskraft: newValue } }));
      freebie.spend('willpower', current, newValue);
    } else {
      setCharacter(p => ({ ...p, status: { ...p.status, willenskraft: newValue } }));
    }
  };

  // ─── Blutvorrat ───────────────────────────────────────────────────────
  const { bloodCapacity } = getGenerationInfo(character.advantages.hintergründe);

  // ─── Helpers ──────────────────────────────────────────────────────────
  const disabledFields = isNosferatu ? { gesellschaftlich: { Erscheinungsbild: true } } : {};

  const getButtonClasses = (isActive) =>
      `px-3 py-1 text-xs uppercase tracking-wider rounded border ${
          isActive
              ? 'border-emerald-700 bg-emerald-950/50 text-emerald-300 hover:bg-emerald-900/50'
              : 'border-emerald-900/30 bg-black/30 text-emerald-600 cursor-not-allowed'
      }`;

  // ─── JSX ──────────────────────────────────────────────────────────────
  return (
      <div className="text-emerald-300 font-serif">
        <SheetControls title="Vampire" subtitle="Die Maskerade" theme="emerald" mngr={mngr} freebieState={freebie} />

        <div className="border-2 border-emerald-900/50 bg-[#051a11]/95 p-8 shadow-2xl relative">
          <header className="text-center mb-12 border-b border-emerald-900/30 pb-6 relative">
            <h1 className="text-5xl font-bold tracking-[0.2em] text-emerald-500 uppercase mb-2">Vampire</h1>
            <div className="absolute top-0 right-0 flex gap-2">
              <button onClick={randomizeCharacter} className="p-2 text-emerald-400 hover:text-emerald-200 transition-colors" title="Zufälliger Charakter">🎲</button>
              <button onClick={() => setShowRules(!showRules)} className="p-2 text-emerald-400 hover:text-emerald-200 transition-colors" title="Regeln anzeigen"><Info size={20} /></button>
            </div>
          </header>

          {showRules && (
              <div className="mb-8 p-4 bg-black/60 border border-emerald-800/50 rounded text-xs space-y-2">
                <p><strong>📜 Attribut-Punkteverteilung</strong><br />Jeder Charakter beginnt mit 1 Punkt in jedem Attribut. Zusätzlich können 7, 5 und 3 Punkte auf die drei Kategorien verteilt werden. Die Limits werden automatisch anhand der verteilten Punkte bestimmt.</p>
                <p><strong>⚙️ Fähigkeiten-Punkteverteilung</strong><br />Alle Fähigkeiten starten bei 0. Die drei Gruppen erhalten 13, 9 und 5 Punkte – automatisch nach der Gesamtpunktzahl zugeordnet.</p>
                <p><strong>✨ Vorteile</strong><br /><strong>Disziplinen:</strong> 3 Punkte. <strong>Hintergründe:</strong> 5 Punkte. <strong>Tugenden:</strong> 7 Zusatzpunkte (Gesamt max. 10).</p>
                <p><strong>🧛 Nosferatu-Schwäche</strong><br />Erscheinungsbild wird auf 0 gesetzt und zählt nicht zu den Punktelimits.</p>
                <p><strong>💖 Menschlichkeit &amp; Willenskraft</strong><br />Menschlichkeit ≥ Gewissen + Selbstbeherrschung. Willenskraft ≥ Mut.</p>
                <p><strong>⭐ Freebies</strong><br />15 Punkte. Kosten: Attribut 5, Fähigkeit 2, Disziplin 7, Hintergrund 1, Tugend 2, Menschlichkeit 2, Willenskraft 1 pro Punkt.</p>
              </div>
          )}

          {/* INFO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mb-8">
            {Object.entries(character.info).map(([key, val]) => (
                <div key={key} className="flex flex-col border-b border-emerald-900/30">
                  <label className="text-[9px] uppercase text-emerald-700 font-bold">{key}</label>
                  {key === 'Clan' ? (
                      <select value={val} onChange={(e) => {
                        const newClan = e.target.value;
                        const clanDiscs = getClanDisciplines(newClan);
                        setCharacter(p => ({
                          ...p,
                          info: { ...p.info, Clan: newClan },
                          advantages: {
                            ...p.advantages,
                            disziplinen: clanDiscs.length > 0
                                ? clanDiscs.map(d => ({ name: d, value: 0 }))
                                : p.advantages.disziplinen,
                          },
                        }));
                      }} className="bg-transparent text-emerald-100 outline-none py-1 cursor-pointer">
                        <option value="" className="bg-black text-emerald-500 italic">Wähle...</option>
                        {Object.entries(VampireData.clans).map(([category, clans]) => (
                            <optgroup key={category} label={category} className="bg-black text-emerald-600 font-bold italic">
                              {Object.keys(clans).map(c => (
                                  <option key={c} value={c} className="bg-black text-emerald-100 font-normal not-italic">{c}</option>
                              ))}
                            </optgroup>
                        ))}
                      </select>
                  ) : key === 'Generation' ? (() => {
                        const genBg = character.advantages.hintergründe.find(bg => bg.name === 'Generation');
                        const isReadOnly = genBg && genBg.value > 0;
                        return (
                            <input type="text" value={val} readOnly={isReadOnly}
                                   className={`bg-transparent outline-none py-1 text-emerald-100 ${isReadOnly ? 'opacity-70 cursor-default' : ''}`}
                                   onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, Generation: e.target.value } }))} />
                        );
                      })()
                      : key === 'Konzept' ? (
                          <>
                            <input list="vtm-concepts" value={val} onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, Konzept: e.target.value } }))} className="bg-transparent text-emerald-100 outline-none py-1" />
                            <datalist id="vtm-concepts">{SharedData.concepts?.map((c, i) => <option key={i} value={c} />)}</datalist>
                          </>
                      ) : key === 'Wesen' ? (
                          <>
                            <input list="vtm-natures" value={val} onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, Wesen: e.target.value } }))} className="bg-transparent text-emerald-100 outline-none py-1" />
                            <datalist id="vtm-natures">{SharedData.natures?.map((n, i) => <option key={i} value={n} />)}</datalist>
                          </>
                      ) : key === 'Verhalten' ? (
                          <>
                            <input list="vtm-demeanors" value={val} onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, Verhalten: e.target.value } }))} className="bg-transparent text-emerald-100 outline-none py-1" />
                            <datalist id="vtm-demeanors">{SharedData.demeanors?.map((d, i) => <option key={i} value={d} />)}</datalist>
                          </>
                      ) : (
                          <input type="text" value={val} onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, [key]: e.target.value } }))} className="bg-transparent outline-none py-1 text-emerald-100" />
                      )}
                </div>
            ))}
          </div>

          {/* ATTRIBUTE & FÄHIGKEITEN */}
          <TraitSection title="Attribute" data={character.attributes} theme="emerald" onChange={validateAndApplyAttributeChange} isAttr disabledFields={disabledFields} groupStats={attrGroupStats} />
          <TraitSection title="Fähigkeiten" data={character.abilities} theme="emerald" onChange={validateAndApplyAbilityChange} groupStats={abilityGroupStats} />

          {/* VORTEILE */}
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase tracking-widest text-emerald-500 text-center py-2 mb-6 bg-emerald-950/20">Vorteile</h2>
            <div className="grid grid-cols-3 gap-8">

              {/* Disziplinen */}
              <ListTrait
                  block={character.advantages.disziplinen}
                  title={`Disziplinen (${disciplinesTotal}/3)`}
                  theme="emerald"
                  onChange={handleDisciplinesChange}
                  max={5}
              />

              {/* Hintergründe */}
              <div>
                <h3 className="text-xs font-bold text-emerald-700 uppercase mb-4">Hintergründe ({backgroundsTotal}/5)</h3>
                {character.advantages.hintergründe.map((bg, idx) => (
                    <BackgroundListItem
                        key={idx}
                        item={bg}
                        index={idx}
                        onChange={handleBackgroundsChange}
                        predefinedOptions={getPredefinedBackgrounds()}
                        backgroundsData={VampireData.backgrounds}
                        theme="emerald"
                    />
                ))}
              </div>

              {/* Tugenden */}
              <div>
                <h3 className="text-xs font-bold text-emerald-700 uppercase mb-4">Tugenden ({virtuesExtra}/7)</h3>
                {Object.entries(character.advantages.tugenden).map(([name, val]) => (
                    <div key={name} className="flex justify-between items-center mb-3">
                      <span className="text-xs">{name}</span>
                      <DotRating theme="emerald" value={val} min={1} max={5} onChange={(v) => handleVirtueChange(name, v)} />
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* STATUS */}
          <section className="grid grid-cols-2 gap-12 border-t border-emerald-900/50 pt-8">
            <div className="space-y-8">
              {/* Menschlichkeit */}
              <div className="text-center">
                <h3 className="text-xs text-emerald-700 uppercase font-bold mb-2">Menschlichkeit</h3>
                <div className="flex justify-center">
                  <DotRating theme="emerald" value={character.status.menschlichkeit} max={10} onChange={handleHumanityChange} />
                </div>
                <div className="text-[9px] text-emerald-600 mt-1">
                  Min: {character.advantages.tugenden.Gewissen + character.advantages.tugenden.Selbstbeherrschung}
                </div>
              </div>

              {/* Willenskraft */}
              <div className="text-center">
                <h3 className="text-xs text-emerald-700 uppercase font-bold mb-2">Willenskraft</h3>
                <div className="flex justify-center">
                  <DotRating theme="emerald" value={character.status.willenskraft} max={10} onChange={handleWillpowerChange} />
                </div>
                <div className="text-[9px] text-emerald-600 mt-1">Min: {character.advantages.tugenden.Mut}</div>
                <div className="flex justify-center space-x-1.5 mt-2">
                  {[...Array(10)].map((_, i) => <div key={i} className="w-4 h-4 border border-emerald-900" />)}
                </div>
              </div>

              {/* Blutvorrat */}
              <div className="text-center">
                <h3 className="text-xs text-emerald-700 uppercase font-bold mb-2">Blutvorrat</h3>
                <div className="flex flex-col items-center gap-1">
                  {[0, bloodCapacity].map((offset) => (
                      <div key={offset} className="flex justify-center space-x-1.5">
                        {[...Array(bloodCapacity)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-5 h-5 border border-emerald-900 cursor-default ${offset + i < character.status.blutvorrat ? 'bg-emerald-700' : ''}`}
                            />
                        ))}
                      </div>
                  ))}
                </div>
              </div>
            </div>
            <HealthBox health={character.status.gesundheit} theme="emerald" setCharacter={setCharacter} />
          </section>

          {/* VORZÜGE & NACHTEILE */}
          <MeritsFlawsSection
              merits={character.merits}
              flaws={character.flaws}
              onRemoveMerit={handleRemoveMerit}
              onRemoveFlaw={handleRemoveFlaw}
              freebiesActive={freebie.freebiesActive}
              theme="emerald"
          />
          <br />

          {/* Buttons */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <button onClick={() => { setShowMeritsModal(true); setMeritsModalType('merit'); }} className={getButtonClasses(freebie?.freebiesActive)}>Vorzüge</button>
            <button onClick={() => { setShowMeritsModal(true); setMeritsModalType('flaw'); }} className={getButtonClasses(freebie?.freebiesActive)}>Nachteile</button>
          </div>
        </div>

        <StorageModals mngr={mngr} theme="emerald" />
        <MeritsFlawsModal
            isOpen={showMeritsModal}
            onClose={() => setShowMeritsModal(false)}
            type={meritsModalType}
            meritsList={VampireMerits}
            flawsList={VampireFlaws}
            selectedMerits={character.merits}
            selectedFlaws={character.flaws}
            onAddMerit={handleAddMerit}
            onRemoveMerit={handleRemoveMerit}
            onAddFlaw={handleAddFlaw}
            onRemoveFlaw={handleRemoveFlaw}
            freebiePoints={freebie.freebiePoints}
            freebiesActive={freebie.freebiesActive}
            theme="emerald"
        />
      </div>
  );
};

export default VampireSheet;