import React, {useEffect, useState} from 'react';
import {Info} from 'lucide-react';
import {getClanDisciplines, SharedData, VampireData, VampireFlaws, VampireMerits} from '../../data/sharedData';
import {useCharacterManager} from '../../hooks/useCharacterManager';
import {SheetControls} from '../../components/ui/SheetControls';
import {TraitSection} from '../../components/ui/TraitSection';
import {ListTrait} from '../../components/ui/ListTrait';
import {HealthBox} from '../../components/ui/HealthBox';
import {StorageModals} from '../../components/ui/StorageModals';
import {DotRating} from '../../components/ui/DotRating';
import {useFreebies} from '../../hooks/useFreebies';
import {MeritsFlawsModal} from '../../components/ui/MeritsFlawsModal';

// Kosten pro Kategorie (werden später im Hook verwendet)
const freebieCosts = {
  attribute: 5,
  ability: 2,
  discipline: 7,
  background: 1,
  virtue: 2,
  humanity: 2,
  willpower: 1,
};

const getEmptyVampire = () => ({
  info: { Name: "", Spieler: "", Chronik: "", Wesen: "", Verhalten: "", Clan: "", Generation: "", Zuflucht: "", Konzept: "" },
  attributes: {
    körperlich: { Körperkraft: 1, Geschick: 1, Widerstandsfähigkeit: 1 },
    gesellschaftlich: { Charisma: 1, Manipulation: 1, Erscheinungsbild: 1 },
    geistig: { Wahrnehmung: 1, Intelligenz: 1, Geistesschärfe: 1 }
  },
  abilities: {
    talente: { Ausdruck: 0, Aufmerksamkeit: 0, Ausflüchte: 0, Ausweichen: 0, Einschüchtern: 0, Empathie: 0, Führungsqualitäten: 0, Handgemenge: 0, Sportlichkeit: 0, Szenekenntnis: 0 },
    fertigkeiten: { Etikette: 0, Fahren: 0, Handwerk: 0, Heimlichkeit: 0, Nahkampf: 0, Schusswaffen: 0, Sicherheit: 0, Tierkunde: 0, Überleben: 0, Vortrag: 0 },
    kenntnisse: { Akademisches_Wissen: 0, Computer: 0, Finanzen: 0, Gesetzeskenntnis: 0, Linguistik: 0, Medizin: 0, Nachforschungen: 0, Naturwissenschaften: 0, Okkultismus: 0, Politik: 0 }
  },
  advantages: {
    disziplinen: [{ name: "", value: 0 }, { name: "", value: 0 }, { name: "", value: 0 }],
    hintergründe: [{ name: "", value: 0 }, { name: "", value: 0 }, { name: "", value: 0 }, { name: "", value: 0 }, { name: "", value: 0 }],
    tugenden: { Gewissen: 1, Selbstbeherrschung: 1, Mut: 1 }
  },
  status: { menschlichkeit: 2, willenskraft: 1, blutvorrat: 10, gesundheit: JSON.parse(JSON.stringify(SharedData.initialHealth)) },
  extra: { erfahrung: "", vorzügeSchwächen: [] },
  merits: [],
  flaws: []
});

// ---------- Hilfsfunktionen für Attribute ----------
const getBonusPoints = (value) => Math.max(0, value - 1);

const calculateGroupBonusPoints = (character) => {
  const attrs = character.attributes;
  const isNosferatu = character.info.Clan === 'Nosferatu';

  const calcGroup = (group) => {
    let sum = 0;
    for (const [name, val] of Object.entries(group)) {
      if (isNosferatu && name === 'Erscheinungsbild') continue;
      sum += getBonusPoints(val);
    }
    return sum;
  };

  return {
    körperlich: calcGroup(attrs.körperlich),
    gesellschaftlich: calcGroup(attrs.gesellschaftlich),
    geistig: calcGroup(attrs.geistig),
  };
};

const getGroupLimits = (bonusPoints) => {
  const sorted = Object.entries(bonusPoints).sort((a, b) => b[1] - a[1]);
  return {
    [sorted[0][0]]: 7, // Primär
    [sorted[1][0]]: 5, // Sekundär
    [sorted[2][0]]: 3, // Tertiär
  };
};

// ---------- Hilfsfunktionen für Fähigkeiten ----------
const calculateAbilityTotals = (character) => {
  const abilities = character.abilities;
  const totals = {};
  for (const [group, fields] of Object.entries(abilities)) {
    let sum = 0;
    for (const val of Object.values(fields)) {
      sum += val;
    }
    totals[group] = sum;
  }
  return totals;
};

const getAbilityLimits = (totals) => {
  const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  return {
    [sorted[0][0]]: 13, // Primär
    [sorted[1][0]]: 9,  // Sekundär
    [sorted[2][0]]: 5,  // Tertiär
  };
};

// ---------- Hintergruende --------------
// Get predefined background list safely
const getPredefinedBackgrounds = () => {
  return VampireData.backgrounds ? Object.keys(VampireData.backgrounds) : [];
};

// Tooltip component for background descriptions
const BackgroundTooltip = ({ backgroundName, value, children }) => {
  const [show, setShow] = useState(false);
  const background = VampireData.backgrounds ? VampireData.backgrounds[backgroundName] : null;
  if (!background || !background.levels) return children;

  const levelDesc = background.levels[value - 1] || "Keine Beschreibung verfügbar.";
  return (
    <div className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2 bg-black border border-emerald-800 rounded shadow-lg text-xs text-emerald-100">
          <div className="font-bold mb-1">{backgroundName} (Stufe {value})</div>
          <div>{levelDesc}</div>
        </div>
      )}
    </div>
  );
};

// Custom background list item with dropdown and tooltip
const BackgroundListItem = ({ item, index, onChange, maxPointsPerBackground = 5 }) => {
  const predefinedOptions = getPredefinedBackgrounds();
  const [isCustom, setIsCustom] = useState(!predefinedOptions.includes(item.name) && item.name !== "");
  const [customName, setCustomName] = useState(isCustom ? item.name : "");

  const handleNameChange = (selectedName) => {
    if (selectedName === "custom") {
      setIsCustom(true);
      onChange(index, customName, undefined);
    } else {
      setIsCustom(false);
      onChange(index, selectedName, undefined);
    }
  };

  const handleCustomNameChange = (e) => {
    const newName = e.target.value;
    setCustomName(newName);
    onChange(index, newName, undefined);
  };

  return (
    <div className="mb-3 flex items-center gap-2">
      {!isCustom ? (
        <select
          value={item.name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="bg-transparent border-b border-emerald-900 text-emerald-100 text-sm py-1 w-40"
        >
          <option value="" disabled></option>
          {predefinedOptions.map(opt => (
            <option key={opt} value={opt} className="bg-black">{opt}</option>
          ))}
          <option value="custom" className="bg-[#051a11]">✏️ Eigener Hintergrund...</option>
        </select>
      ) : (
        <input
          type="text"
          value={customName}
          onChange={handleCustomNameChange}
          placeholder="Eigener Hintergrund"
          className="bg-transparent border-b border-emerald-900 text-emerald-100 text-sm py-1 w-40"
        />
      )}

      <DotRating
        theme="emerald"
        value={item.value}
        max={maxPointsPerBackground}
        onChange={(v) => onChange(index, undefined, v)}
      />

      {!isCustom && VampireData.backgrounds && VampireData.backgrounds[item.name] && (
        <BackgroundTooltip backgroundName={item.name} value={item.value}>
          <Info size={14} className="text-emerald-500 cursor-help" />
        </BackgroundTooltip>
      )}
    </div>
  );
};
// ---------- Hilfsfunktionen für Vorteile ----------
const sumDisciplines = (disciplines) => disciplines.reduce((sum, d) => sum + d.value, 0);
const sumBackgrounds = (backgrounds) => backgrounds.reduce((sum, b) => sum + b.value, 0);
const sumVirtues = (virtues) => Object.values(virtues).reduce((sum, v) => sum + v, 0);

const VampireSheet = () => {
  const mngr = useCharacterManager(getEmptyVampire(), 'vtm');
  const { character, setCharacter, updateStat, showToast } = mngr;
  const [showRules, setShowRules] = useState(false);
  const freebie = useFreebies(15, freebieCosts);
  const [showMeritsModal, setShowMeritsModal] = useState(false);
  const [meritsModalType, setMeritsModalType] = useState('merit'); // 'merit' or 'flaw'

  // ---------- Random character generation ----------
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Distribute points across a list of items, respecting max per item
  const distributePoints = (items, totalPoints, maxPerItem = 5) => {
    const result = items.map(() => 0);
    let remaining = totalPoints;
    while (remaining > 0) {
      const possibleIndices = [];
      for (let i = 0; i < result.length; i++) {
        if (result[i] < maxPerItem) possibleIndices.push(i);
      }
      if (possibleIndices.length === 0) break;
      const idx = randomChoice(possibleIndices);
      result[idx]++;
      remaining--;
    }
    return result;
  };

  const randomizeCharacter = () => {
    // 1. Info fields
    const allClans = [];
    for (const category in VampireData.clans) {
      Object.keys(VampireData.clans[category]).forEach(clan => allClans.push(clan));
    }
    const randomClan = randomChoice(allClans);
    const clanDisciplines = getClanDisciplines(randomClan);
    
    const randomName = randomChoice(SharedData.firstNames) + " " + randomChoice(SharedData.lastNames);
    const randomDemeanor = randomChoice(SharedData.demeanors);
    const randomConcept = randomChoice(SharedData.concepts);
    const randomNature = randomChoice(SharedData.natures);
    
    const info = {
      Name: randomName,
      Spieler: "",
      Chronik: "",
      Wesen: randomDemeanor,
      Verhalten: randomNature,
      Clan: randomClan,
      Generation: "13",
      Zuflucht: "",
      Konzept: randomConcept,
    };

    // 2. Attributes
    // Start with base 1 in each
    const baseAttr = {
      körperlich: { Körperkraft: 1, Geschick: 1, Widerstandsfähigkeit: 1 },
      gesellschaftlich: { Charisma: 1, Manipulation: 1, Erscheinungsbild: 1 },
      geistig: { Wahrnehmung: 1, Intelligenz: 1, Geistesschärfe: 1 },
    };
    // Assign 7,5,3 to categories randomly
    const categories = ['körperlich', 'gesellschaftlich', 'geistig'];
    const points = [7,5,3];
    const shuffled = [...points];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const attrBonuses = {};
    categories.forEach((cat, idx) => { attrBonuses[cat] = shuffled[idx]; });
    
    // Distribute within each category
    const newAttributes = JSON.parse(JSON.stringify(baseAttr));
    for (const cat of categories) {
      const attrNames = Object.keys(newAttributes[cat]);
      const distribution = distributePoints(attrNames, attrBonuses[cat], 5); // max 5 per attribute
      attrNames.forEach((name, i) => {
        newAttributes[cat][name] += distribution[i];
      });
    }
    
    // Nosferatu: Erscheinungsbild = 0
    if (randomClan === 'Nosferatu') {
      newAttributes.gesellschaftlich.Erscheinungsbild = 0;
    }

    // 3. Abilities
    const emptyAbilities = {
      talente: { Ausdruck: 0, Aufmerksamkeit: 0, Ausflüchte: 0, Ausweichen: 0, Einschüchtern: 0, Empathie: 0, Führungsqualitäten: 0, Handgemenge: 0, Sportlichkeit: 0, Szenekenntnis: 0 },
      fertigkeiten: { Etikette: 0, Fahren: 0, Handwerk: 0, Heimlichkeit: 0, Nahkampf: 0, Schusswaffen: 0, Sicherheit: 0, Tierkunde: 0, Überleben: 0, Vortrag: 0 },
      kenntnisse: { Akademisches_Wissen: 0, Computer: 0, Finanzen: 0, Gesetzeskenntnis: 0, Linguistik: 0, Medizin: 0, Nachforschungen: 0, Naturwissenschaften: 0, Okkultismus: 0, Politik: 0 },
    };
    const abilityGroups = ['talente', 'fertigkeiten', 'kenntnisse'];
    const abilityPoints = [13, 9, 5];
    const shuffledAbility = [...abilityPoints];
    for (let i = shuffledAbility.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAbility[i], shuffledAbility[j]] = [shuffledAbility[j], shuffledAbility[i]];
    }
    const abilityBonuses = {};
    abilityGroups.forEach((group, idx) => { abilityBonuses[group] = shuffledAbility[idx]; });
    
    const newAbilities = JSON.parse(JSON.stringify(emptyAbilities));
    for (const group of abilityGroups) {
      const abilityNames = Object.keys(newAbilities[group]);
      const distribution = distributePoints(abilityNames, abilityBonuses[group], 3); // max 3 per ability
      abilityNames.forEach((name, i) => {
        newAbilities[group][name] = distribution[i];
      });
    }

    // 4. Disciplines
    let disciplinesList;
    if (clanDisciplines.length > 0) {
      // Use clan disciplines
      disciplinesList = clanDisciplines.map(name => ({ name, value: 0 }));
      // Distribute 3 points among them (max 3 each)
      const discPoints = distributePoints(disciplinesList.map(() => 0), 3, 3);
      disciplinesList.forEach((d, i) => { d.value = discPoints[i]; });
      // Ensure exactly 3 slots: if fewer than 3, pad with empty
      while (disciplinesList.length < 3) disciplinesList.push({ name: "", value: 0 });
    } else {
      // Caitiff or other: leave empty
      disciplinesList = [{ name: "", value: 0 }, { name: "", value: 0 }, { name: "", value: 0 }];
    }

    // 5. Backgrounds
    const predefinedBackgrounds = Object.keys(VampireData.backgrounds);
    const backgroundsList = [{ name: "", value: 0 }, { name: "", value: 0 }, { name: "", value: 0 }, { name: "", value: 0 }, { name: "", value: 0 }];
    // Distribute 5 points among possible backgrounds (max 5 each)
    const usedBackgrounds = [];
    let remainingPoints = 5;
    while (remainingPoints > 0 && usedBackgrounds.length < 5) {
      const bgName = randomChoice(predefinedBackgrounds);
      if (usedBackgrounds.includes(bgName)) continue; // no duplicates
      const maxPoints = Math.min(5, remainingPoints);
      const points = randomInt(1, maxPoints);
      usedBackgrounds.push(bgName);
      backgroundsList[usedBackgrounds.length-1] = { name: bgName, value: points };
      remainingPoints -= points;
    }

    // 6. Virtues
    const baseVirtues = { Gewissen: 1, Selbstbeherrschung: 1, Mut: 1 };
    const extraVirtues = distributePoints([0,0,0], 7, 4); // max 5 total (so extra up to 4)
    const newVirtues = {
      Gewissen: baseVirtues.Gewissen + extraVirtues[0],
      Selbstbeherrschung: baseVirtues.Selbstbeherrschung + extraVirtues[1],
      Mut: baseVirtues.Mut + extraVirtues[2],
    };

    // 7. Humanity & Willpower
    const minHumanity = newVirtues.Gewissen + newVirtues.Selbstbeherrschung;
    const maxHumanity = 10;
    let humanity = minHumanity + randomInt(0, maxHumanity - minHumanity);
    humanity = Math.min(maxHumanity, humanity);
    const minWill = newVirtues.Mut;
    let willpower = minWill + randomInt(0, 10 - minWill);
    willpower = Math.min(10, willpower);

    // 8. Blood Pool based on Generation background
    const genBg = backgroundsList.find(bg => bg.name === "Generation");
    let generation = "13";
    let bloodCapacity = 10;
    if (genBg) {
      const dots = genBg.value;
      const genMap = {
        1: { generation: "12", bloodCapacity: 11 },
        2: { generation: "11", bloodCapacity: 12 },
        3: { generation: "10", bloodCapacity: 13 },
        4: { generation: "9", bloodCapacity: 14 },
        5: { generation: "8", bloodCapacity: 15 },
      };
      if (genMap[dots]) {
        generation = genMap[dots].generation;
        bloodCapacity = genMap[dots].bloodCapacity;
      }
    }
    info.Generation = generation;

    // Build new character
    const newCharacter = {
      info,
      attributes: newAttributes,
      abilities: newAbilities,
      advantages: {
        disziplinen: disciplinesList,
        hintergründe: backgroundsList,
        tugenden: newVirtues,
      },
      status: {
        menschlichkeit: humanity,
        willenskraft: willpower,
        blutvorrat: bloodCapacity,
        gesundheit: JSON.parse(JSON.stringify(SharedData.initialHealth)),
      },
      extra: { erfahrung: "", vorzügeSchwächen: [] },
      merits: [],
      flaws: [],
    };

    setCharacter(newCharacter);
    freebie.reset(15);
    freebie.setFreebiesActive(false); // turn off freebie mode
    showToast("Zufälliger Charakter erstellt!", "success");
  };

  const handleAddMerit = (merit) => {
    if (!freebie.freebiesActive) return;
    if (character.merits.some(m => m.name === merit.name)) {
      showToast("Dieser Vorteil ist bereits ausgewählt.", "error");
      return;
    }
    const cost = merit.cost;
    if (cost > freebie.freebiePoints) {
      showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
      return;
    }
    setCharacter(prev => ({
      ...prev,
      merits: [...prev.merits, merit]
    }));
    freebie.spendPoints(cost); // use spendPoints
  };

  const handleRemoveMerit = (merit) => {
    setCharacter(prev => ({
      ...prev,
      merits: prev.merits.filter(m => m.name !== merit.name)
    }));
    freebie.addPoints(merit.cost); // give points back
  };

  const handleAddFlaw = (flaw) => {
    if (!freebie.freebiesActive) return;
    if (character.flaws.some(f => f.name === flaw.name)) {
      showToast("Dieser Nachteil ist bereits ausgewählt.", "error");
      return;
    }
    setCharacter(prev => ({
      ...prev,
      flaws: [...prev.flaws, flaw]
    }));
    freebie.addPoints(flaw.cost); // gain points
  };

  const handleRemoveFlaw = (flaw) => {
    setCharacter(prev => ({
      ...prev,
      flaws: prev.flaws.filter(f => f.name !== flaw.name)
    }));
    freebie.spendPoints(flaw.cost); // lose points
  };

// ----------- Handler fuer Hintergrund "Generation" -------------
// Generation mapping: dots -> generation & blood capacity
const generationMap = {
  0: { generation: "13", bloodCapacity: 10 },
  1: { generation: "12", bloodCapacity: 11 },
  2: { generation: "11", bloodCapacity: 12 },
  3: { generation: "10", bloodCapacity: 13 },
  4: { generation: "9", bloodCapacity: 14 },
  5: { generation: "8", bloodCapacity: 15 }
};

// Find the Generation background (if any)
const getGenerationBackground = (backgrounds) => {
  return backgrounds.find(bg => bg.name === "Generation");
};

// Compute generation info based on the Generation background
const getGenerationInfo = (backgrounds) => {
  const genBg = getGenerationBackground(backgrounds);
  const dots = genBg ? genBg.value : 0;
  return generationMap[dots] || generationMap[0];
};

  // ---------- Nosferatu-Logik (Erscheinungsbild auf 0) ----------
  useEffect(() => {
    const clan = character.info.Clan;
    const appearanceValue = character.attributes.gesellschaftlich?.Erscheinungsbild;
    
    if (clan === 'Nosferatu') {
      if (appearanceValue !== 0) {
        setCharacter(p => ({
          ...p,
          attributes: {
            ...p.attributes,
            gesellschaftlich: {
              ...p.attributes.gesellschaftlich,
              Erscheinungsbild: 0
            }
          }
        }));
      }
    } else {
      if (appearanceValue === 0) {
        setCharacter(p => ({
          ...p,
          attributes: {
            ...p.attributes,
            gesellschaftlich: {
              ...p.attributes.gesellschaftlich,
              Erscheinungsbild: 1
            }
          }
        }));
      }
    }
  }, [character.info.Clan, character.attributes.gesellschaftlich?.Erscheinungsbild, setCharacter]);

  // ---------- Tugenden → Menschlichkeit & Willenskraft (Mindestwerte) ----------
  useEffect(() => {
    const gewissen = character.advantages.tugenden.Gewissen;
    const selbstbeherrschung = character.advantages.tugenden.Selbstbeherrschung;
    const minHumanity = gewissen + selbstbeherrschung;
    const currentHumanity = character.status.menschlichkeit;
    
    if (currentHumanity < minHumanity) {
      setCharacter(p => ({
        ...p,
        status: { ...p.status, menschlichkeit: minHumanity }
      }));
    }
  }, [character.advantages.tugenden.Gewissen, character.advantages.tugenden.Selbstbeherrschung, character.status.menschlichkeit, setCharacter]);

  useEffect(() => {
    const mut = character.advantages.tugenden.Mut;
    const currentWill = character.status.willenskraft;
    
    if (currentWill < mut) {
      setCharacter(p => ({
        ...p,
        status: { ...p.status, willenskraft: mut }
      }));
    }
  }, [character.advantages.tugenden.Mut, character.status.willenskraft, setCharacter]);

  // ---------- Attribute: Punktestände und Limits ----------
  const bonusPoints = calculateGroupBonusPoints(character);
  const attrLimits = getGroupLimits(bonusPoints);
  const attrGroupStats = {};
  for (const [group, bonus] of Object.entries(bonusPoints)) {
    attrGroupStats[group] = { bonus, limit: attrLimits[group] };
  }

  const validateAndApplyAttributeChange = (cat, name, newValue) => {
    const currentValue = character.attributes[cat][name];
    if (newValue === currentValue) return;

    // Wenn Freebies aktiv, prüfe Kosten
    if (freebie.freebiesActive) {
      const cost = freebie.getCost('attribute', currentValue, newValue);
      if (cost > freebie.freebiePoints) {
        showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
        return;
      }
      updateStat('attributes', cat, name, newValue);
      freebie.spend('attribute', currentValue, newValue);
      return;
    }

    // Normales Limit prüfen
    const testChar = JSON.parse(JSON.stringify(character));
    testChar.attributes[cat][name] = newValue;
    const newBonus = calculateGroupBonusPoints(testChar);
    const newLimits = getGroupLimits(newBonus);
    let valid = true;
    for (const [group, bonus] of Object.entries(newBonus)) {
      if (bonus > newLimits[group]) {
        valid = false;
        break;
      }
    }
    if (valid) {
      updateStat('attributes', cat, name, newValue);
    } else {
      showToast(`Punktelimit überschritten! In "${cat}" dürfen max. ${attrLimits[cat]} Zusatzpunkte vergeben werden.`, 'error');
    }
  };

  // ---------- Fähigkeiten: Punktestände und Limits ----------
  const abilityTotals = calculateAbilityTotals(character);
  const abilityLimits = getAbilityLimits(abilityTotals);
  const abilityGroupStats = {};
  for (const [group, total] of Object.entries(abilityTotals)) {
    abilityGroupStats[group] = { bonus: total, limit: abilityLimits[group] };
  }

  const validateAndApplyAbilityChange = (cat, name, newValue) => {
    const currentValue = character.abilities[cat][name];
    if (newValue === currentValue) return;

    if (freebie.freebiesActive) {
      const cost = freebie.getCost('ability', currentValue, newValue);
      if (cost > freebie.freebiePoints) {
        showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
        return;
      }
      updateStat('abilities', cat, name, newValue);
      freebie.spend('ability', currentValue, newValue);
      return;
    }

    // Normales Limit
    const testChar = JSON.parse(JSON.stringify(character));
    testChar.abilities[cat][name] = newValue;
    const newTotals = calculateAbilityTotals(testChar);
    const newLimits = getAbilityLimits(newTotals);
    let valid = true;
    for (const [group, total] of Object.entries(newTotals)) {
      if (total > newLimits[group]) {
        valid = false;
        break;
      }
    }
    if (valid) {
      updateStat('abilities', cat, name, newValue);
    } else {
      showToast(`Punktelimit überschritten! In "${cat}" dürfen max. ${abilityLimits[cat]} Punkte vergeben werden.`, 'error');
    }
  };

  // ---------- Disziplinen: max 3 Punkte ----------
  const disciplinesTotal = sumDisciplines(character.advantages.disziplinen);
  const handleDisciplinesChange = (index, name, value) => {
    const newList = [...character.advantages.disziplinen];
    if (name !== undefined) newList[index].name = name;
    if (value !== undefined) {
      const oldValue = newList[index].value;
      newList[index].value = value;
      const newTotal = sumDisciplines(newList);

      if (freebie.freebiesActive) {
        const cost = freebie.getCost('discipline', oldValue, value);
        if (cost > freebie.freebiePoints) {
          newList[index].value = oldValue;
          showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
          return;
        }
        setCharacter(p => ({ ...p, advantages: { ...p.advantages, disziplinen: newList } }));
        freebie.spend('discipline', oldValue, value);
      } else {
        // Normales Limit prüfen
        if (newTotal <= 3) {
          setCharacter(p => ({ ...p, advantages: { ...p.advantages, disziplinen: newList } }));
        } else {
          newList[index].value = oldValue;
          showToast(`Maximal 3 Punkte in Disziplinen erlaubt (aktuell ${newTotal}).`, 'error');
        }
      }
    } else {
      setCharacter(p => ({ ...p, advantages: { ...p.advantages, disziplinen: newList } }));
    }
  };

  // ---------- Hintergründe: max 5 Punkte ----------
  const backgroundsTotal = sumBackgrounds(character.advantages.hintergründe);
  const handleBackgroundsChange = (index, name, value) => {
    const newList = [...character.advantages.hintergründe];
    if (name !== undefined) newList[index].name = name;
    if (value !== undefined) {
      const oldValue = newList[index].value;
      newList[index].value = value;
      const newTotal = sumBackgrounds(newList);

      if (freebie.freebiesActive) {
        const cost = freebie.getCost('background', oldValue, value);
        if (cost > freebie.freebiePoints) {
          newList[index].value = oldValue;
          showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
          return;
        }
        setCharacter(p => ({ ...p, advantages: { ...p.advantages, hintergründe: newList } }));
        freebie.spend('background', oldValue, value);
      } else {
        if (newTotal <= 5) {
          setCharacter(p => ({ ...p, advantages: { ...p.advantages, hintergründe: newList } }));
        } else {
          newList[index].value = oldValue;
          showToast(`Maximal 5 Punkte in Hintergründen erlaubt (aktuell ${newTotal}).`, 'error');
        }
      }
    } else {
      setCharacter(p => ({ ...p, advantages: { ...p.advantages, hintergründe: newList } }));
    }
  };

  // ---------- Tugenden: max 7 zusätzliche Punkte (Gesamtsumme max 10) ----------
  const virtuesTotal = sumVirtues(character.advantages.tugenden);
  const virtuesExtra = virtuesTotal - 3; // Punkte über den Grundwerten (1 je Tugend)
  const handleVirtueChange = (name, newValue) => {
    const oldValue = character.advantages.tugenden[name];
    if (newValue === oldValue) return;

    const newVirtues = { ...character.advantages.tugenden, [name]: newValue };
    const newTotal = sumVirtues(newVirtues);

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
        showToast(`Maximal 7 zusätzliche Punkte für Tugenden (Gesamt max. 10).`, 'error');
      }
    }
  };

  // ---------- Menschlichkeit & Willenskraft (mit Mindestwerten + Freebies) ----------
  const handleHumanityChange = (newValue) => {
    const current = character.status.menschlichkeit;
    if (newValue === current) return;
    const minHumanity = character.advantages.tugenden.Gewissen + character.advantages.tugenden.Selbstbeherrschung;
    if (newValue < minHumanity) {
      showToast(`Menschlichkeit kann nicht unter ${minHumanity} sinken (Gewissen + Selbstbeherrschung).`, 'error');
      return;
    }
    if (freebie.freebiesActive) {
      const cost = freebie.getCost('humanity', current, newValue);
      if (cost > freebie.freebiePoints) {
        showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
        return;
      }
      setCharacter(p => ({ ...p, status: { ...p.status, menschlichkeit: newValue } }));
      freebie.spend('humanity', current, newValue);
    } else {
      setCharacter(p => ({ ...p, status: { ...p.status, menschlichkeit: newValue } }));
    }
  };

  const handleWillpowerChange = (newValue) => {
    const current = character.status.willenskraft;
    if (newValue === current) return;
    const minWill = character.advantages.tugenden.Mut;
    if (newValue < minWill) {
      showToast(`Willenskraft kann nicht unter ${minWill} sinken (Mut).`, 'error');
      return;
    }
    if (freebie.freebiesActive) {
      const cost = freebie.getCost('willpower', current, newValue);
      if (cost > freebie.freebiePoints) {
        showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
        return;
      }
      setCharacter(p => ({ ...p, status: { ...p.status, willenskraft: newValue } }));
      freebie.spend('willpower', current, newValue);
    } else {
      setCharacter(p => ({ ...p, status: { ...p.status, willenskraft: newValue } }));
    }
  };

  const disabledFields = character.info.Clan === 'Nosferatu' 
    ? { gesellschaftlich: { Erscheinungsbild: true } }
    : {};

  // Optional: Freebies zurücksetzen, wenn neuer Charakter geladen wird
  useEffect(() => {
    freebie.reset(15);
  }, [character.info.Name]); // einfache Erkennung eines neuen Charakters

// ------------- Handler fuer Hintergrund "Generation" -------------------
// Sync generation info and blood pool capacity when Generation background changes
useEffect(() => {
  const backgrounds = character.advantages.hintergründe;
  const { generation, bloodCapacity } = getGenerationInfo(backgrounds);
  const currentGeneration = character.info.Generation;
  const currentBlood = character.status.blutvorrat;

  let updated = false;
  const updates = {};

  if (currentGeneration !== generation) {
    updates.info = { ...character.info, Generation: generation };
    updated = true;
  }

  // Always set blood points to capacity (full pool) when generation changes.
  // This ensures the pool is always consistent with the new capacity.
  if (currentBlood !== bloodCapacity) {
    updates.status = { ...character.status, blutvorrat: bloodCapacity };
    updated = true;
  }

  if (updated) {
    setCharacter(prev => ({
      ...prev,
      ...(updates.info && { info: updates.info }),
      ...(updates.status && { status: updates.status })
    }));
  }
}, [character.advantages.hintergründe, character.info.Generation, character.status.blutvorrat, setCharacter]);

  const getButtonClasses = (isActive) => `px-3 py-1 text-xs uppercase tracking-wider rounded border ${
      isActive
          ? 'border-emerald-700 bg-emerald-950/50 text-emerald-300 hover:bg-emerald-900/50'
          : 'border-emerald-900/30 bg-black/30 text-emerald-600 cursor-not-allowed'
  }`;
  return (
    <div className="text-emerald-300 font-serif">
      <SheetControls 
        title="Vampire" 
        subtitle="Die Maskerade" 
        theme="emerald" 
        mngr={mngr}
        freebieState={freebie}
      />

      <div className="border-2 border-emerald-900/50 bg-[#051a11]/95 p-8 shadow-2xl relative">
        <header className="text-center mb-12 border-b border-emerald-900/30 pb-6 relative">
          <h1 className="text-5xl font-bold tracking-[0.2em] text-emerald-500 uppercase mb-2">Vampire</h1>
          <div className="absolute top-0 right-0 flex gap-2">
            <button
              onClick={randomizeCharacter}
              className="p-2 text-emerald-400 hover:text-emerald-200 transition-colors"
              title="Zufälliger Charakter"
            >
              🎲
            </button>
            <button
              onClick={() => setShowRules(!showRules)}
              className="p-2 text-emerald-400 hover:text-emerald-200 transition-colors"
              title="Regeln anzeigen"
            >
              <Info size={20} />
            </button>
          </div>
        </header>

        {/* Regel‑Infobox */}
        {showRules && (
          <div className="mb-8 p-4 bg-black/60 border border-emerald-800/50 rounded text-xs space-y-2">
            <p><strong>📜 Attribut‑Punkteverteilung</strong><br />
            Jeder Charakter beginnt mit <strong>1 Punkt</strong> in jedem Attribut (Basis).<br />
            Zusätzlich können <strong>7, 5 und 3 Punkte</strong> auf die drei Kategorien (körperlich, gesellschaftlich, geistig) verteilt werden.<br />
            Die Kategorie mit den <strong>meisten Zusatzpunkten</strong> gilt als <strong>Primär</strong> (max. 7 Zusatzpunkte), die zweitmeiste als <strong>Sekundär</strong> (max. 5), die dritte als <strong>Tertiär</strong> (max. 3).<br />
            Die Limits werden automatisch anhand der verteilten Punkte bestimmt – eine Überschreitung wird verhindert.</p>
            <p><strong>⚙️ Fähigkeiten‑Punkteverteilung</strong><br />
            Alle Fähigkeiten starten bei <strong>0</strong>. Die drei Gruppen (Talente, Fertigkeiten, Kenntnisse) erhalten <strong>13, 9 und 5 Punkte</strong> – ebenfalls automatisch nach der höchsten, zweithöchsten und niedrigsten Gesamtpunktzahl zugeordnet.</p>
            <p><strong>✨ Vorteile</strong><br />
            <strong>Disziplinen:</strong> 3 Punkte insgesamt (beliebig auf die drei Disziplinen verteilbar).<br />
            <strong>Hintergründe:</strong> 5 Punkte insgesamt (max. 5 pro Hintergrund).<br />
            <strong>Tugenden:</strong> 7 Punkte zusätzlich zu den Grundwerten 1 (max. 5 pro Tugend, Gesamtsumme max. 10).</p>
            <p><strong>🧛 Nosferatu‑Schwäche</strong><br />
            Der Clan Nosferatu setzt das Attribut <strong>Erscheinungsbild</strong> auf <strong>0</strong>. Dieser Wert zählt <strong>nicht</strong> zu den Punkte‑Limits und kann nicht erhöht werden.</p>
            <p><strong>💖 Menschlichkeit & Willenskraft</strong><br />
            <strong>Menschlichkeit</strong> entspricht mindestens <strong>Gewissen + Selbstbeherrschung</strong>.<br />
            <strong>Willenskraft</strong> entspricht mindestens <strong>Mut</strong>.<br />
            Beide können später durch Freebies erhöht werden, fallen aber nie unter diese Mindestwerte.</p>
            <p><strong>⭐ Freebies</strong><br />
            Aktiviere den <strong>Freebie‑Modus</strong>, um zusätzliche Punkte zu vergeben. Es stehen <strong>15 Freebies</strong> zur Verfügung. Kosten: Attribut 5, Fähigkeit 2, Disziplin 7, Hintergrund 1, Tugend 2, Menschlichkeit 2, Willenskraft 1 pro Punkt.</p>
            <p><em>Die aktuellen Punktestände werden neben den Gruppenüberschriften angezeigt.</em></p>
          </div>
        )}

        {/* INFO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mb-8">
          {Object.entries(character.info).map(([key, val]) => (
            <div key={key} className="flex flex-col border-b border-emerald-900/30">
              <label className="text-[9px] uppercase text-emerald-700 font-bold">{key}</label>
              {key === "Konzept" ? (
                <>
                <input
                    list="concepts"
                    value={val}
                    onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, Konzept: e.target.value } }))}
                    className="bg-transparent text-emerald-100 outline-none py-1 cursor-pointer"
                />
                   <datalist id="concepts">
                    {SharedData.concepts.map((concept, index) => (
                      <option key={index} value={concept} />
                    ))}
                  </datalist>
                </>
              ) : key === "Wesen" ? (
                <>
                <input
                    list="natures"
                    value={val}
                    onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, Wesen: e.target.value } }))}
                    className="bg-transparent text-emerald-100 outline-none py-1 cursor-pointer"
                />
                   <datalist id="natures">
                    {SharedData.natures.map((nature, index) => (
                      <option key={index} value={nature} />
                    ))}
                  </datalist>
                </>
              ) : key === "Verhalten" ? (
                <>
                <input
                    list="demeanors"
                    value={val}
                    onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, Verhalten: e.target.value } }))}
                    className="bg-transparent text-emerald-100 outline-none py-1 cursor-pointer"
                />
                   <datalist id="demeanors">
                    {SharedData.demeanors.map((demeanor, index) => (
                      <option key={index} value={demeanor} />
                    ))}
                  </datalist>
                </>
              ) : key === "Clan" ? (
                <select
                  value={val}
                  onChange={(e) => {
                    const newClan = e.target.value;
                    const clanDisciplines = getClanDisciplines(newClan);
                    setCharacter(p => ({
                      ...p,
                      info: { ...p.info, Clan: newClan },
                      advantages: {
                        ...p.advantages,
                        disziplinen: clanDisciplines.length > 0
                          ? clanDisciplines.map(d => ({ name: d, value: 0 }))
                          : p.advantages.disziplinen
                      }
                    }));
                  }}
                  className="bg-transparent text-emerald-100 outline-none py-1 cursor-pointer"
                >
                  <option value="" className="bg-black text-emerald-500 italic">Wähle...</option>
                  {Object.entries(VampireData.clans).map(([category, clans]) => (
                    <optgroup key={category} label={category} className="bg-black text-emerald-600 font-bold italic">
                      {Object.keys(clans).map(c => (
                        <option key={c} value={c} className="bg-black text-emerald-100 font-normal not-italic">{c}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              ) : key === "Generation" ? (
                (() => {
                  const genBg = getGenerationBackground(character.advantages.hintergründe);
                  const isReadOnly = genBg && genBg.value > 0;
                  return (
                    <input
                      type="text"
                      value={val}
                      readOnly={isReadOnly}
                      className={`bg-transparent outline-none py-1 text-emerald-100 ${isReadOnly ? 'opacity-70 cursor-default' : ''}`}
                      onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, [key]: e.target.value } }))}
                    />
                  );
                })()
              ) : (
                <input
                  type="text"
                  value={val}
                  onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, [key]: e.target.value } }))}
                  className="bg-transparent outline-none py-1 text-emerald-100"
                />
              )}
            </div>
          ))}
        </div>

        {/* Attribute */}
        <TraitSection 
          title="Attribute" 
          data={character.attributes} 
          theme="emerald" 
          onChange={validateAndApplyAttributeChange}
          isAttr={true}
          disabledFields={disabledFields}
          groupStats={attrGroupStats}
        />
        
        {/* Fähigkeiten */}
        <TraitSection 
          title="Fähigkeiten" 
          data={character.abilities} 
          theme="emerald" 
          onChange={validateAndApplyAbilityChange}
          groupStats={abilityGroupStats}
        />

        {/* VAMPIRE ADVANTAGES */}
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-widest text-emerald-500 text-center py-2 mb-6 bg-emerald-950/20">Vorteile</h2>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <ListTrait 
                block={character.advantages.disziplinen} 
                title={`Disziplinen (${disciplinesTotal}/3)`} 
                theme="emerald" 
                onChange={handleDisciplinesChange}
                max={5}
              />
            </div>
            <div>
              <h3 className="text-xs font-bold text-emerald-700 uppercase mb-4">
                Hintergründe ({backgroundsTotal}/5)
              </h3>
              {character.advantages.hintergründe.map((bg, idx) => (
                <BackgroundListItem
                  key={idx}
                  item={bg}
                  index={idx}
                  onChange={handleBackgroundsChange}
                  maxPointsPerBackground={5}
                />
              ))}
            </div>
            <div>
              <h3 className="text-xs font-bold text-emerald-700 uppercase mb-4">Tugenden ({virtuesExtra}/7)</h3>
              {Object.entries(character.advantages.tugenden).map(([name, val]) => (
                <div key={name} className="flex justify-between items-center mb-3">
                  <span className="text-xs">{name}</span>
                  <DotRating 
                    theme="emerald" 
                    value={val} 
                    min={1} 
                    max={5} 
                    onChange={(v) => handleVirtueChange(name, v)} 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATUS */}
        <section className="grid grid-cols-2 gap-12 border-t border-emerald-900/50 pt-8">
          <div className="space-y-8">
            <div className="text-center">
               <h3 className="text-xs text-emerald-700 uppercase font-bold mb-2">Menschlichkeit</h3>
               <div className="flex justify-center">
                 <DotRating 
                   theme="emerald" 
                   value={character.status.menschlichkeit} 
                   max={10} 
                   onChange={handleHumanityChange} 
                 />
               </div>
               <div className="text-[9px] text-emerald-600 mt-1">
                 Min: {character.advantages.tugenden.Gewissen + character.advantages.tugenden.Selbstbeherrschung}
               </div>
            </div>
            <div className="text-center">
               <h3 className="text-xs text-emerald-700 uppercase font-bold mb-2">Willenskraft</h3>
               <div className="flex justify-center">
                 <DotRating 
                   theme="emerald" 
                   value={character.status.willenskraft} 
                   max={10} 
                   onChange={handleWillpowerChange} 
                 />
               </div>
               <div className="text-[9px] text-emerald-600 mt-1">
                 Min: {character.advantages.tugenden.Mut}
               </div>
               <div className="flex justify-center space-x-1.5 mt-2">{[...Array(10)].map((_, i) => <div key={i} className="w-4 h-4 border border-emerald-900" />)}</div>
            </div>
                        <div className="text-center">
              <h3 className="text-xs text-emerald-700 uppercase font-bold mb-2">Blutvorrat</h3>
              <div className="flex flex-col items-center gap-1">
                  {(() => {
                    // Gesamtzahl der Kästchen (z.B. 15 * 2 = 30)
                    const boxesPerRow = getGenerationInfo(character.advantages.hintergründe).bloodCapacity; // Anzahl der Kästchen pro Zeile
                    const rows = [];

                    for (let row = 0; row < 2; row++) {
                      const rowBoxes = [];
                      for (let col = 0; col < boxesPerRow; col++) {
                        const index = row * boxesPerRow + col;
                        const isFilled = index < character.status.blutvorrat;
                        const isClickable = false;
                        rowBoxes.push(
                          <div
                            key={index}
                            className={`w-5 h-5 border border-emerald-900 ${isFilled ? 'bg-emerald-700' : ''} ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
                          />
                        );
                      }
                      rows.push(
                        <div key={`row-${row}`} className="flex justify-center space-x-1.5">
                          {rowBoxes}
                        </div>
                      );
                    }

                    return rows;
                  })()}
                </div>
            </div>
          </div>
          <HealthBox health={character.status.gesundheit} theme="emerald" setCharacter={setCharacter} />
        </section>
        {/* Merits & Flaws Display */}
        <div className="grid grid-cols-2 gap-8 mt-8 border-t border-emerald-900/50 pt-6">
          <div>
            <h3 className="text-sm font-bold uppercase text-emerald-500 mb-3">Vorzüge</h3>
            {character.merits.length === 0 ? (
              <p className="text-xs text-emerald-600 italic">Keine Vorzüge ausgewählt.</p>
            ) : (
              <ul className="space-y-1">
                {character.merits.sort((a,b) => a.name.localeCompare(b.name)).map((merit, idx) => (
                  <li key={idx} className="text-xs text-emerald-300 flex justify-between items-center border-b border-emerald-800/30 pb-1">
                    <span>
                      <span className="font-bold">{merit.name}</span>
                      <span className="text-emerald-500 ml-2">({merit.cost})</span>
                    </span>
                    {freebie.freebiesActive && (
                      <button
                        onClick={() => handleRemoveMerit(merit)}
                        className="text-rose-400 hover:text-rose-300 text-xs ml-2"
                      >
                        Entfernen
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase text-emerald-500 mb-3">Nachteile</h3>
            {character.flaws.length === 0 ? (
              <p className="text-xs text-emerald-600 italic">Keine Nachteile ausgewählt.</p>
            ) : (
              <ul className="space-y-1">
                {character.flaws.sort((a,b) => a.name.localeCompare(b.name)).map((flaw, idx) => (
                  <li key={idx} className="text-xs text-emerald-300 flex justify-between items-center border-b border-emerald-800/30 pb-1">
                    <span>
                      <span className="font-bold">{flaw.name}</span>
                      <span className="text-emerald-500 ml-2">({flaw.cost})</span>
                    </span>
                    {freebie.freebiesActive && (
                      <button
                        onClick={() => handleRemoveFlaw(flaw)}
                        className="text-rose-400 hover:text-rose-300 text-xs ml-2"
                      >
                        Entfernen
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <br/>
        <div className="absolute bottom-4 left-4 flex gap-2">
          <button onClick={() => {
            setShowMeritsModal(true);
            setMeritsModalType('merit');
          }} className={getButtonClasses(freebie?.freebiesActive)}>Vorzüge</button>
          <button onClick={() => {
            setShowMeritsModal(true);
            setMeritsModalType('flaw');
          }} className={getButtonClasses(freebie?.freebiesActive)}>Nachteile</button>
        </div>
      </div>
      <StorageModals mngr={mngr} theme="emerald" />
      {/* Modal */}
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
        theme="emerald"
      />
    </div>
  );
};
export default VampireSheet