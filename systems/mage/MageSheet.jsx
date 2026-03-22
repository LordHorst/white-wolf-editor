import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { SharedData, MageData, MageMerits, MageFlaws, getSectsForAffiliation } from '../../data/sharedData';
import { useCharacterManager } from '../../hooks/useCharacterManager';
import { SheetControls } from '../../components/ui/SheetControls';
import { TraitSection } from '../../components/ui/TraitSection';
import { ListTrait } from '../../components/ui/ListTrait';
import { HealthBox } from '../../components/ui/HealthBox';
import { StorageModals } from '../../components/ui/StorageModals';
import { DotRating } from '../../components/ui/DotRating';
import { useFreebies } from '../../hooks/useFreebies';
import { MeritsFlawsModal } from '../../components/ui/MeritsFlawsModal';

// Kosten pro Kategorie (Mage-spezifisch)
const freebieCosts = {
  attribute: 5,
  ability: 2,
  background: 1,
  sphere: 4,
  arete: 8,
  willpower: 1,
  quintessence: 2
};

const getEmptyMage = () => ({
  info: {
    Name: "",
    Wesen: "",
    Zugehörigkeit: "",
    Spieler: "",
    Verhalten: "",
    Gruppierung: "",
    Chronik: "",
    Essenz: "",
    Konzept: ""
  },
  attributes: {
    körperlich: { Körperkraft: 1, Geschick: 1, Widerstandsfähigkeit: 1 },
    gesellschaftlich: { Charisma: 1, Manipulation: 1, Erscheinungsbild: 1 },
    geistig: { Wahrnehmung: 1, Intelligenz: 1, Geistesschärfe: 1 }
  },
  abilities: {
    talente: {
      Aufmerksamkeit: 0, Asudruck: 0, Ausflüchte: 0, Einschüchtern: 0, Empathie: 0,
      Führungsqualitäten: 0, Handgemenge: 0, Kunst: 0, Sechster_Sinn: 0,
      Sportlichkeit: 0, Szenekenntnis: 0
    },
    fertigkeiten: {
      Etikette: 0, Fahren: 0, Handwerk: 0, Heimlichkeit: 0, Kampfkunst: 0,
      Meditation: 0, Nahkampf: 0, Recherche: 0, Schusswaffen: 0, Technologie: 0, Überleben: 0
    },
    kenntnisse: {
      Akademisches_Wissen: 0, Computer: 0, Enigmas: 0, Esoterik: 0, Gesetzeskenntnis: 0,
      Kosmologie: 0, Medizin: 0, Nachforschungen: 0, Naturwissenschaften: 0, Okkultismus: 0,
      Poltik: 0
    }
  },
  advantages: {
    sphären: MageData.spheres.reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {}),
    hintergründe: [
      { name: "", value: 0 }, { name: "", value: 0 },
      { name: "", value: 0 }, { name: "", value: 0 }, { name: "", value: 0 }
    ],
  },
  status: {
    arete: 1,
    willenskraft: 5,
    quintessenz: 1,
    paradox: 0,
    gesundheit: JSON.parse(JSON.stringify(SharedData.initialHealth))
  },
  extra: { erfahrung: "", vorzügeSchwächen: [] },
  merits: [],
  flaws: []
});

// Hilfsfunktionen für Attribute
const getBonusPoints = (value) => Math.max(0, value - 1);

const calculateGroupBonusPoints = (character) => {
  const attrs = character.attributes;
  const calcGroup = (group) => {
    let sum = 0;
    for (const val of Object.values(group)) {
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
    [sorted[0][0]]: 7,
    [sorted[1][0]]: 5,
    [sorted[2][0]]: 3,
  };
};

// Hilfsfunktionen für Fähigkeiten
const calculateAbilityTotals = (character) => {
  const totals = {};
  for (const [group, fields] of Object.entries(character.abilities)) {
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
    [sorted[0][0]]: 13,
    [sorted[1][0]]: 9,
    [sorted[2][0]]: 5,
  };
};

// Sphären-Hilfsfunktionen
const sumSpheres = (spheres) => Object.values(spheres).reduce((sum, v) => sum + v, 0);
// Backgrounds
const sumBackgrounds = (backgrounds) => backgrounds.reduce((sum, b) => sum + b.value, 0);

// Helper to get predefined backgrounds for Mage (without Generation)
const getPredefinedBackgroundsForMage = () => {
  if (!MageData.backgrounds) return [];
  return Object.keys(MageData.backgrounds);
};

export const MageSheet = () => {
  const mngr = useCharacterManager(getEmptyMage(), 'mta');
  const { character, setCharacter, gmMode, updateStat, showToast } = mngr;
  const [showRules, setShowRules] = useState(false);
  const [showMeritsModal, setShowMeritsModal] = useState(false);
  const [meritsModalType, setMeritsModalType] = useState('merit');
  const freebie = useFreebies(15, freebieCosts);

  // ---------- Zufallsgenerator ----------
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

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
    // 1. Info Felder
    const randomAffiliation = randomChoice(MageData.affiliations.map(a => a.name));
    const affiliation = MageData.affiliations.find(a => a.name === randomAffiliation);
    const randomSect = randomChoice(affiliation?.sects || []);
    const randomEssence = randomChoice(MageData.essences);
    const randomName = randomChoice(SharedData.firstNames) + " " + randomChoice(SharedData.lastNames);
    const randomDemeanor = randomChoice(SharedData.demeanors || ["?"]);
    const randomConcept = randomChoice(SharedData.concepts || ["?"]);
    const randomNature = randomChoice(SharedData.natures || ["?"]);

    const info = {
      Name: randomName,
      Wesen: randomDemeanor,
      Zugehörigkeit: randomAffiliation,
      Spieler: "",
      Verhalten: randomNature,
      Gruppierung: randomSect,
      Chronik: "",
      Essenz: randomEssence,
      Konzept: randomConcept
    };

    // 2. Attribute (7/5/3)
    const baseAttr = {
      körperlich: { Körperkraft: 1, Geschick: 1, Widerstandsfähigkeit: 1 },
      gesellschaftlich: { Charisma: 1, Manipulation: 1, Erscheinungsbild: 1 },
      geistig: { Wahrnehmung: 1, Intelligenz: 1, Geistesschärfe: 1 },
    };
    const categories = ['körperlich', 'gesellschaftlich', 'geistig'];
    const points = [7, 5, 3];
    const shuffled = [...points];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const attrBonuses = {};
    categories.forEach((cat, idx) => { attrBonuses[cat] = shuffled[idx]; });

    const newAttributes = JSON.parse(JSON.stringify(baseAttr));
    for (const cat of categories) {
      const attrNames = Object.keys(newAttributes[cat]);
      const distribution = distributePoints(attrNames, attrBonuses[cat], 5);
      attrNames.forEach((name, i) => {
        newAttributes[cat][name] += distribution[i];
      });
    }

    // 3. Fähigkeiten (13/9/5, max 3 pro Fähigkeit)
    const emptyAbilities = getEmptyMage().abilities;
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
      const distribution = distributePoints(abilityNames, abilityBonuses[group], 3);
      abilityNames.forEach((name, i) => {
        newAbilities[group][name] = distribution[i];
      });
    }

    // Spezialfall: Kampfkunst auf maximal 2 beschränken
    const finalAbilities = enforceKampfkunstLimit(newAbilities);

    // 4. Hintergründe (5 Punkte, ohne "Generation")
    const availableBgs = getPredefinedBackgroundsForMage();
    const backgroundsList = [];
    let remainingBgPoints = 5;
    const usedBgNames = new Set();
    while (remainingBgPoints > 0 && backgroundsList.length < 5 && availableBgs.length > 0) {
      const bgName = randomChoice(availableBgs.filter(b => !usedBgNames.has(b)));
      if (!bgName) break;
      const maxPoints = Math.min(5, remainingBgPoints);
      const points = randomInt(1, maxPoints);
      usedBgNames.add(bgName);
      backgroundsList.push({ name: bgName, value: points });
      remainingBgPoints -= points;
    }
    while (backgroundsList.length < 5) backgroundsList.push({ name: "", value: 0 });

    // 5. Sphären: 3 Punkte verteilen (max 3 pro Sphäre)
    const sphereDist = distributePoints(MageData.spheres, 3, 3);
    const newSpheres = {};
    MageData.spheres.forEach((sphere, idx) => {
      newSpheres[sphere] = sphereDist[idx];
    });

    // 6. Status
    const newStatus = {
      arete: 1,
      willenskraft: 5,
      quintessenz: 1,
      paradox: 0,
      gesundheit: JSON.parse(JSON.stringify(SharedData.initialHealth))
    };

    const newCharacter = {
      info,
      attributes: newAttributes,
      abilities: finalAbilities,
      advantages: {
        sphären: newSpheres,
        hintergründe: backgroundsList,
      },
      status: newStatus,
      extra: { erfahrung: "", vorzügeSchwächen: [] },
      merits: [],
      flaws: [],
    };

    setCharacter(newCharacter);
    freebie.reset(15);
    freebie.setFreebiesActive(false);
    showToast("Zufälliger Magier erstellt!", "success");
  };

  // ---------- Merit/Flaw Handler ----------
  const handleAddMerit = (merit) => {
    if (!freebie.freebiesActive) return;
    if (character.merits.some(m => m.name === merit.name)) {
      showToast("Dieser Vorteil ist bereits ausgewählt.", "error");
      return;
    }
    if (merit.cost > freebie.freebiePoints) {
      showToast(`Nicht genug Freebies (${merit.cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
      return;
    }
    setCharacter(prev => ({ ...prev, merits: [...prev.merits, merit] }));
    freebie.spendPoints(merit.cost);
  };

  const handleRemoveMerit = (merit) => {
    setCharacter(prev => ({ ...prev, merits: prev.merits.filter(m => m.name !== merit.name) }));
    freebie.addPoints(merit.cost);
  };

  const handleAddFlaw = (flaw) => {
    if (!freebie.freebiesActive) return;
    if (character.flaws.some(f => f.name === flaw.name)) {
      showToast("Dieser Nachteil ist bereits ausgewählt.", "error");
      return;
    }
    setCharacter(prev => ({ ...prev, flaws: [...prev.flaws, flaw] }));
    freebie.addPoints(flaw.cost);
  };

  const handleRemoveFlaw = (flaw) => {
    setCharacter(prev => ({ ...prev, flaws: prev.flaws.filter(f => f.name !== flaw.name) }));
    freebie.spendPoints(flaw.cost);
  };

  // ---------- Attribute & Fähigkeiten Limits ----------
  const bonusPoints = calculateGroupBonusPoints(character);
  const attrLimits = getGroupLimits(bonusPoints);
  const attrGroupStats = {};
  for (const [group, bonus] of Object.entries(bonusPoints)) {
    attrGroupStats[group] = { bonus, limit: attrLimits[group] };
  }

  const abilityTotals = calculateAbilityTotals(character);
  const abilityLimits = getAbilityLimits(abilityTotals);
  const abilityGroupStats = {};
  for (const [group, total] of Object.entries(abilityTotals)) {
    abilityGroupStats[group] = { bonus: total, limit: abilityLimits[group] };
  }

  const validateAndApplyAttributeChange = (cat, name, newValue) => {
    const currentValue = character.attributes[cat][name];
    if (newValue === currentValue) return;

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

    // Ohne Freebies: max 5 pro Attribut
    if (newValue > 5) {
      showToast("Attribute können ohne Freebies maximal 5 Punkte haben.", 'error');
      return;
    }

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

  const validateAndApplyAbilityChange = (cat, name, newValue) => {
    const currentValue = character.abilities[cat][name];
    if (newValue === currentValue) return;

    // Special rule: Kampfkunst (Do) darf maximal 2 Punkte haben (auch mit Freebies)
    if (name === "Kampfkunst" && newValue > 2) {
      showToast("Kampfkunst (Do) kann zu Beginn maximal 2 Punkte haben.", 'error');
      return;
    }
    
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

    // Ohne Freebies: max 3 pro Fähigkeit
    if (newValue > 3) {
      showToast("Fähigkeiten können ohne Freebies maximal 3 Punkte haben.", 'error');
      return;
    }

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

  // ---------- Sphären: Startlimit 3 Punkte, Freebies ----------
  // Helper function. Kampfkunst (Do) nur 2 Punkte!
  const enforceKampfkunstLimit = (abilities) => {
    const newAbilities = JSON.parse(JSON.stringify(abilities));
    const fertigkeiten = newAbilities.fertigkeiten;
    const kampfkunstValue = fertigkeiten.Kampfkunst;

    if (kampfkunstValue <= 2) return newAbilities;

    // Überzählige Punkte
    const excess = kampfkunstValue - 2;
    fertigkeiten.Kampfkunst = 2;

    // Verteilung der überschüssigen Punkte auf andere Fertigkeiten (max 3)
    const otherSkills = Object.keys(fertigkeiten).filter(name => name !== "Kampfkunst");
    let remaining = excess;
    while (remaining > 0) {
      const possible = otherSkills.filter(name => fertigkeiten[name] < 3);
      if (possible.length === 0) break;
      const skill = randomChoice(possible);
      fertigkeiten[skill]++;
      remaining--;
    }

    return newAbilities;
  };
  
  const spheresTotal = sumSpheres(character.advantages.sphären);
  const handleSphereChange = (sphereName, newValue) => {
    const oldValue = character.advantages.sphären[sphereName];
    if (newValue === oldValue) return;

    const newSpheres = { ...character.advantages.sphären, [sphereName]: newValue };
    const newTotal = sumSpheres(newSpheres);

    if (freebie.freebiesActive) {
      const cost = freebie.getCost('sphere', oldValue, newValue);
      if (cost > freebie.freebiePoints) {
        showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
        return;
      }
      setCharacter(p => ({
        ...p,
        advantages: { ...p.advantages, sphären: newSpheres }
      }));
      freebie.spend('sphere', oldValue, newValue);
    } else {
      if (newTotal <= 3) {
        setCharacter(p => ({
          ...p,
          advantages: { ...p.advantages, sphären: newSpheres }
        }));
      } else {
        showToast(`Maximal 3 Punkte in Sphären erlaubt (aktuell ${newTotal}).`, 'error');
      }
    }
  };
// Tooltip component for background descriptions
  const BackgroundTooltip = ({ backgroundName, value, children }) => {
    const [show, setShow] = useState(false);
    const background = MageData.backgrounds ? MageData.backgrounds[backgroundName] : null;
    if (!background || !background.levels) return children;

    const levelDesc = background.levels[value - 1] || "Keine Beschreibung verfügbar.";
    return (
        <div className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
          {children}
          {show && (
              <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2 bg-black border border-purple-800 rounded shadow-lg text-xs text-purple-100">
                <div className="font-bold mb-1">{backgroundName} (Stufe {value})</div>
                <div>{levelDesc}</div>
              </div>
          )}
        </div>
    );
  };

// Custom background list item with dropdown and tooltip
  const BackgroundListItem = ({ item, index, onChange, maxPointsPerBackground = 5 }) => {
    const predefinedOptions = getPredefinedBackgroundsForMage();
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
                  className="bg-transparent border-b border-purple-900 text-purple-100 text-sm py-1 w-40"
              >
                <option value="" disabled></option>
                {predefinedOptions.map(opt => (
                    <option key={opt} value={opt} className="bg-black">{opt}</option>
                ))}
                <option value="custom" className="bg-[#060208]">✏️ Eigener Hintergrund...</option>
              </select>
          ) : (
              <input
                  type="text"
                  value={customName}
                  onChange={handleCustomNameChange}
                  placeholder="Eigener Hintergrund"
                  className="bg-transparent border-b border-purple-900 text-purple-100 text-sm py-1 w-40"
              />
          )}

          <DotRating
              theme="purple"
              value={item.value}
              max={maxPointsPerBackground}
              onChange={(v) => onChange(index, undefined, v)}
          />

          {!isCustom && MageData.backgrounds && MageData.backgrounds[item.name] && (
              <BackgroundTooltip backgroundName={item.name} value={item.value}>
                <Info size={14} className="text-purple-500 cursor-help" />
              </BackgroundTooltip>
          )}
        </div>
    );
  };

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
  
  // ---------- Status-Änderungen mit Freebies (nur Erhöhung mit Freebies) ----------
  const handleAreteChange = (newValue) => {
    const current = character.status.arete;
    if (newValue === current) return;

    if (freebie.freebiesActive) {
      const cost = freebie.getCost('arete', current, newValue);
      if (cost > freebie.freebiePoints) {
        showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
        return;
      }
      setCharacter(p => ({ ...p, status: { ...p.status, arete: newValue } }));
      freebie.spend('arete', current, newValue);
    } else {
      // Erhöhung ohne Freebies nicht erlaubt
      if (newValue > current) {
        showToast("Arete kann nur mit Freebies erhöht werden.", 'error');
      } else {
        // Verringern erlaubt (innerhalb min=1)
        setCharacter(p => ({ ...p, status: { ...p.status, arete: newValue } }));
      }
    }
  };

  const handleWillpowerChange = (newValue) => {
    const current = character.status.willenskraft;
    if (newValue === current) return;

    if (freebie.freebiesActive) {
      const cost = freebie.getCost('willpower', current, newValue);
      if (cost > freebie.freebiePoints) {
        showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
        return;
      }
      setCharacter(p => ({ ...p, status: { ...p.status, willenskraft: newValue } }));
      freebie.spend('willpower', current, newValue);
    } else {
      if (newValue > current) {
        showToast("Willenskraft kann nur mit Freebies erhöht werden.", 'error');
      } else {
        setCharacter(p => ({ ...p, status: { ...p.status, willenskraft: newValue } }));
      }
    }
  };

  const handleQuintessenceChange = (newValue) => {
    const current = character.status.quintessenz;
    if (newValue === current) return;

    if (freebie.freebiesActive) {
      const cost = freebie.getCost('quintessence', current, newValue);
      if (cost > freebie.freebiePoints) {
        showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
        return;
      }
      setCharacter(p => ({ ...p, status: { ...p.status, quintessenz: newValue } }));
      freebie.spend('quintessence', current, newValue);
    } else {
      if (newValue > current) {
        showToast("Quintessenz kann nur mit Freebies erhöht werden.", 'error');
      } else {
        setCharacter(p => ({ ...p, status: { ...p.status, quintessenz: newValue } }));
      }
    }
  };

  const handleParadoxChange = (newValue) => {
    setCharacter(p => ({ ...p, status: { ...p.status, paradox: newValue } }));
  };

  // ---------- Freebies zurücksetzen bei neuem Charakter ----------
  useEffect(() => {
    freebie.reset(15);
  }, [character.info.Name]);

  // Helper für Gruppierung-Select
  const getSectsForCurrentAffiliation = () => {
    const affiliation = character.info.Zugehörigkeit;
    return MageData.affiliations.find(a => a.name === affiliation)?.sects || [];
  };

  return (
    <div className="text-purple-300 font-serif">
      <SheetControls
        title="Mage"
        subtitle="The Ascension"
        theme="purple"
        mngr={mngr}
        freebieState={freebie}
      />

      <div className="border-2 border-purple-900/50 bg-[#060208]/95 p-8 shadow-2xl relative">
        <header className="text-center mb-12 border-b border-purple-900/30 pb-6 relative">
          <h1 className="text-5xl font-bold tracking-[0.2em] text-purple-500 uppercase mb-2">Mage</h1>
          <div className="absolute top-0 right-0 flex gap-2">
            <button
              onClick={randomizeCharacter}
              className="p-2 text-purple-400 hover:text-purple-200 transition-colors"
              title="Zufälliger Charakter"
            >
              🎲
            </button>
            <button
              onClick={() => setShowRules(!showRules)}
              className="p-2 text-purple-400 hover:text-purple-200 transition-colors"
              title="Regeln anzeigen"
            >
              <Info size={20} />
            </button>
          </div>
        </header>

        {/* Regel‑Infobox */}
        {showRules && (
          <div className="mb-8 p-4 bg-black/60 border border-purple-800/50 rounded text-xs space-y-2">
            <p><strong>📜 Attribut‑Punkteverteilung</strong><br />
            Jeder Charakter beginnt mit 1 Punkt in jedem Attribut. Zusätzlich werden 7, 5 und 3 Punkte auf die drei Kategorien verteilt.<br />
            Die Kategorie mit den meisten Zusatzpunkten gilt als Primär (max. 7), die zweitmeiste als Sekundär (max. 5), die dritte als Tertiär (max. 3).<br />
            Ohne Freebies darf kein Attribut 5 überschreiten.</p>
            <p><strong>⚙️ Fähigkeiten‑Punkteverteilung</strong><br />
            Alle Fähigkeiten starten bei 0. Die drei Gruppen erhalten 13, 9 und 5 Punkte – automatisch nach der Gesamtpunktzahl zugeordnet.<br />
            Ohne Freebies darf keine Fähigkeit 3 überschreiten.</p>
            <p><strong>✨ Vorteile</strong><br />
            <strong>Hintergründe:</strong> 5 Punkte insgesamt (max. 5 pro Hintergrund).<br />
            <strong>Sphären:</strong> 3 Punkte insgesamt (max. 3 pro Sphäre).<br />
            <strong>Arete:</strong> Startwert 1.<br />
            <strong>Willenskraft:</strong> Startwert 5.<br />
            <strong>Quintessenz:</strong> Startwert = Arete (1).</p>
            <p><strong>⭐ Freebies</strong><br />
            Aktiviere den Freebie‑Modus, um zusätzliche Punkte zu vergeben. Es stehen 15 Freebies zur Verfügung.<br />
            Kosten: Attribut 5, Fähigkeit 2, Hintergrund 1, Sphäre 4, Arete 8, Willenskraft 1, Quintessenz 2 pro Punkt.</p>
            <p><strong>➕ Vorzüge & Nachteile</strong><br />
            Vorzüge kosten Freebies, Nachteile geben zusätzliche Freebies (auch über 15 hinaus).</p>
          </div>
        )}

        {/* INFO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mb-8">
          {Object.entries(character.info).map(([key, val]) => (
            <div key={key} className="flex flex-col border-b border-purple-900/30">
              <label className="text-[9px] uppercase text-purple-700 font-bold">{key}</label>
              {key === "Zugehörigkeit" ? (
                <select
                  value={val}
                  onChange={(e) => {
                    const newAff = e.target.value;
                    setCharacter(p => ({
                      ...p,
                      info: {
                        ...p.info,
                        Zugehörigkeit: newAff,
                        Gruppierung: "" // reset
                      }
                    }));
                  }}
                  className="bg-transparent text-purple-100 outline-none py-1 cursor-pointer"
                >
                  <option value="" className="bg-black text-purple-500">Wähle...</option>
                  {MageData.affiliations.map(aff => (
                    <option key={aff.name} value={aff.name} className="bg-black text-purple-100">{aff.name}</option>
                  ))}
                </select>
              ) : key === "Konzept" ? (
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
              ) : key === "Gruppierung" ? (
                <select
                  value={val}
                  disabled={!character.info.Zugehörigkeit}
                  onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, Gruppierung: e.target.value } }))}
                  className={`bg-transparent outline-none py-1 cursor-pointer ${!character.info.Zugehörigkeit ? 'opacity-50' : ''}`}
                >
                  <option value="" className="bg-black text-purple-500">Wähle...</option>
                  {getSectsForCurrentAffiliation().map(sect => (
                    <option key={sect} value={sect} className="bg-black text-purple-100">{sect}</option>
                  ))}
                </select>
              ) : key === "Essenz" ? (
                <select
                  value={val}
                  onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, Essenz: e.target.value } }))}
                  className="bg-transparent text-purple-100 outline-none py-1 cursor-pointer"
                >
                  <option value="" className="bg-black text-purple-500">Wähle...</option>
                  {MageData.essences.map(ess => (
                    <option key={ess} value={ess} className="bg-black text-purple-100">{ess}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={val}
                  onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, [key]: e.target.value } }))}
                  className="bg-transparent outline-none py-1 text-purple-100"
                />
              )}
            </div>
          ))}
        </div>

        {/* Attribute */}
        <TraitSection
          title="Attribute"
          data={character.attributes}
          theme="purple"
          onChange={validateAndApplyAttributeChange}
          isAttr={true}
          groupStats={attrGroupStats}
        />

        {/* Fähigkeiten */}
        <TraitSection
          title="Fähigkeiten"
          data={character.abilities}
          theme="purple"
          onChange={validateAndApplyAbilityChange}
          groupStats={abilityGroupStats}
        />

        {/* MAGE ADVANTAGES */}
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-widest text-purple-500 text-center py-2 mb-6 bg-purple-950/20">Vorteile</h2>
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h3 className="text-xs font-bold text-purple-700 uppercase mb-4 text-center">
                Sphären ({spheresTotal}/3)
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {Object.entries(character.advantages.sphären).map(([name, val]) => (
                  <div key={name} className="flex justify-between items-center">
                    <span className="text-xs">{name}</span>
                    <DotRating
                      theme="purple"
                      value={val}
                      max={5}
                      onChange={(v) => handleSphereChange(name, v)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-purple-700 uppercase mb-4">
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
          </div>
        </section>

        {/* STATUS */}
        <section className="grid grid-cols-2 gap-12 border-t border-purple-900/50 pt-8">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xs text-purple-700 uppercase font-bold mb-2">Arete</h3>
              <div className="flex justify-center">
                <DotRating
                  theme="purple"
                  value={character.status.arete}
                  min={1}
                  max={10}
                  onChange={handleAreteChange}
                />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xs text-purple-700 uppercase font-bold mb-2">Willenskraft</h3>
              <div className="flex justify-center">
                <DotRating
                  theme="purple"
                  value={character.status.willenskraft}
                  min={5}
                  max={10}
                  onChange={handleWillpowerChange}
                />
              </div>
              <div className="flex justify-center space-x-1.5 mt-2">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-4 h-4 border border-purple-900" />
                ))}
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xs text-purple-700 uppercase font-bold mb-2">Quintessenz / Paradox</h3>
              <div className="flex justify-center items-center space-x-4">
                <div className="text-right">
                  <span className="text-[10px] uppercase text-purple-400">Quintessenz</span>
                  <div className="flex space-x-1 justify-end">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        onClick={() => handleQuintessenceChange(i + 1)}
                        className={`w-3 h-3 border border-purple-500 cursor-pointer ${i < character.status.quintessenz ? 'bg-purple-500' : ''}`}
                      />
                    )).slice(0, 10)}
                  </div>
                  <div className="flex space-x-1 justify-end mt-1">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        onClick={() => handleQuintessenceChange(i + 1)}
                        className={`w-3 h-3 border border-purple-500 cursor-pointer ${i < character.status.quintessenz ? 'bg-purple-500' : ''}`}
                      />
                    )).slice(10, 20)}
                  </div>
                </div>
                <div className="w-px h-10 bg-purple-900/50"></div>
                <div className="text-left">
                  <span className="text-[10px] uppercase text-red-500">Paradox</span>
                  <div className="flex space-x-1">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        onClick={() => handleParadoxChange(i + 1)}
                        className={`w-3 h-3 border border-red-900 cursor-pointer ${i < character.status.paradox ? 'bg-red-500' : ''}`}
                      />
                    )).slice(0, 10)}
                  </div>
                  <div className="flex space-x-1 mt-1">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        onClick={() => handleParadoxChange(i + 1)}
                        className={`w-3 h-3 border border-red-900 cursor-pointer ${i < character.status.paradox ? 'bg-red-500' : ''}`}
                      />
                    )).slice(10, 20)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HealthBox health={character.status.gesundheit} theme="purple" setCharacter={setCharacter} />
        </section>

        {/* Merits & Flaws Display */}
        <div className="grid grid-cols-2 gap-8 mt-8 border-t border-purple-900/50 pt-6">
          <div>
            <h3 className="text-sm font-bold uppercase text-purple-500 mb-3">Vorzüge</h3>
            {character.merits.length === 0 ? (
              <p className="text-xs text-purple-600 italic">Keine Vorzüge ausgewählt.</p>
            ) : (
              <ul className="space-y-1">
                {character.merits
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((merit, idx) => (
                    <li key={idx} className="text-xs text-purple-300 flex justify-between items-center border-b border-purple-800/30 pb-1">
                      <span>
                        <span className="font-bold">{merit.name}</span>
                        <span className="text-purple-500 ml-2">({merit.cost})</span>
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
            <h3 className="text-sm font-bold uppercase text-purple-500 mb-3">Nachteile</h3>
            {character.flaws.length === 0 ? (
              <p className="text-xs text-purple-600 italic">Keine Nachteile ausgewählt.</p>
            ) : (
              <ul className="space-y-1">
                {character.flaws
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((flaw, idx) => (
                    <li key={idx} className="text-xs text-purple-300 flex justify-between items-center border-b border-purple-800/30 pb-1">
                      <span>
                        <span className="font-bold">{flaw.name}</span>
                        <span className="text-purple-500 ml-2">({flaw.cost})</span>
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
        <br />

        {/* Buttons für Vorzüge/Nachteile */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <button
            onClick={() => {
              setMeritsModalType('merit');
              setShowMeritsModal(true);
            }}
            disabled={!freebie.freebiesActive}
            className={`px-3 py-1 text-xs uppercase tracking-wider rounded border ${
              freebie.freebiesActive
                ? 'border-purple-700 bg-purple-950/50 text-purple-300 hover:bg-purple-900/50'
                : 'border-purple-900/30 bg-black/30 text-purple-600 cursor-not-allowed'
            }`}
          >
            Vorzüge
          </button>
          <button
            onClick={() => {
              setMeritsModalType('flaw');
              setShowMeritsModal(true);
            }}
            disabled={!freebie.freebiesActive}
            className={`px-3 py-1 text-xs uppercase tracking-wider rounded border ${
              freebie.freebiesActive
                ? 'border-purple-700 bg-purple-950/50 text-purple-300 hover:bg-purple-900/50'
                : 'border-purple-900/30 bg-black/30 text-purple-600 cursor-not-allowed'
            }`}
          >
            Nachteile
          </button>
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