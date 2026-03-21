import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { SharedData, WerewolfData, WerewolfMerits, WerewolfFlaws } from '../../data/sharedData';
import { useCharacterManager } from '../../hooks/useCharacterManager';
import { SheetControls } from '../../components/ui/SheetControls';
import { TraitSection } from '../../components/ui/TraitSection';
import { ListTrait } from '../../components/ui/ListTrait';
import { HealthBox } from '../../components/ui/HealthBox';
import { StorageModals } from '../../components/ui/StorageModals';
import { DotRating } from '../../components/ui/DotRating';
import { useFreebies } from '../../hooks/useFreebies';
import { MeritsFlawsModal } from '../../components/ui/MeritsFlawsModal';

// Kosten pro Kategorie (gleiche wie bei Vampir – anpassbar)
const freebieCosts = {
  attribute: 5,
  ability: 2,
  background: 1,
  renown: 2,
  rage: 2,
  gnosis: 2,
  willpower: 1,
};

// Leerer Werwolf
const getEmptyWerewolf = () => ({
  info: {
    Name: "",
    Spieler: "",
    Chronik: "",
    Rasse: "",
    Vorzeichen: "",
    Stamm: "",
    Rudel: "",
    Totem: "",
    Konzept: "",
    Wesen: "",
    Verhalten: "",
  },
  attributes: {
    körperlich: { Körperkraft: 1, Geschick: 1, Widerstandsfähigkeit: 1 },
    gesellschaftlich: { Charisma: 1, Manipulation: 1, Erscheinungsbild: 1 },
    geistig: { Wahrnehmung: 1, Intelligenz: 1, Geistesschärfe: 1 },
  },
  abilities: {
    talente: {
      Aufmerksamkeit: 0,
      Ausflüchte: 0,
      Ausweichen: 0,
      Einschüchtern: 0,
      Empathie: 0,
      Führungsqualitäten: 0,
      Handgemenge: 0,
      Instinkte: 0,
      Sportlichkeit: 0,
      Szenekenntnis: 0,
    },
    fertigkeiten: {
      Etikette: 0,
      Fahren: 0,
      Handwerk: 0,
      Heimlichkeit: 0,
      Nahkampf: 0,
      Schusswaffen: 0,
      Tierkunde: 0,
      Überleben: 0,
      Vortrag: 0,
    },
    kenntnisse: {
      Akademisches_Wissen: 0,
      Computer: 0,
      Enigmas: 0,
      Gesetzeskenntnis: 0,
      Linguistik: 0,
      Medizin: 0,
      Nachforschungen: 0,
      Naturwissenschaften: 0,
      Okkultismus: 0,
      Riten: 0,
    },
  },
  advantages: {
    gaben: [
      { name: "", value: 1 },
      { name: "", value: 1 },
      { name: "", value: 1 },
    ],
    hintergründe: [
      { name: "", value: 0 },
      { name: "", value: 0 },
      { name: "", value: 0 },
      { name: "", value: 0 },
      { name: "", value: 0 },
    ],
    renown: { Ruhm: 0, Ehre: 0, Weisheit: 0 },
  },
  status: {
    zorn: 1,
    gnosis: 1,
    willenskraft: 1,
    gesundheit: JSON.parse(JSON.stringify(SharedData.initialHealth)),
  },
  extra: { erfahrung: "", vorzügeSchwächen: [] },
  merits: [],
  flaws: [],
});

// Hilfsfunktionen für Attribute (gleiche Logik wie Vampir)
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
    [sorted[0][0]]: 7, // primär
    [sorted[1][0]]: 5, // sekundär
    [sorted[2][0]]: 3, // tertiär
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

// Hintergrundliste ohne "Generation"
const getPredefinedBackgroundsForWerewolf = () => {
  if (!SharedData.backgrounds) return [];
  return Object.keys(SharedData.backgrounds).filter(bg => bg !== "Generation");
};

export const WerewolfSheet = () => {
  const mngr = useCharacterManager(getEmptyWerewolf(), 'wta');
  const { character, setCharacter, gmMode, updateStat, showToast } = mngr;
  const [showRules, setShowRules] = useState(false);
  const [showMeritsModal, setShowMeritsModal] = useState(false);
  const [meritsModalType, setMeritsModalType] = useState('merit');
  const freebie = useFreebies(15, freebieCosts);

  // ----- Zufallsgenerator -----
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
    const randomTribe = randomChoice(WerewolfData.tribes);
    const randomAuspice = randomChoice(WerewolfData.auspices);
    const randomBreed = randomChoice(WerewolfData.breeds);
    const randomName = randomChoice(SharedData.firstNames) + " " + randomChoice(SharedData.lastNames);
    const randomDemeanor = randomChoice(SharedData.demeanors || ["?"]);
    const randomConcept = randomChoice(SharedData.concepts || ["?"]);
    const randomNature = randomChoice(SharedData.natures || ["?"]);

    const info = {
      Name: randomName,
      Spieler: "",
      Chronik: "",
      Rasse: randomBreed,
      Vorzeichen: randomAuspice,
      Stamm: randomTribe,
      Rudel: "",
      Totem: "",
      Konzept: randomConcept,
      Wesen: randomDemeanor,
      Verhalten: randomNature,
    };

    // 2. Attribute (7/5/3 verteilt)
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

    // 3. Fähigkeiten (13/9/5)
    const emptyAbilities = getEmptyWerewolf().abilities;
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

    // 4. Gaben (breed, auspice, tribe – wir setzen nur Namen als Platzhalter)
    const giftsList = [
      { name: `${randomBreed}-Gabe`, value: 1 },
      { name: `${randomAuspice}-Gabe`, value: 1 },
      { name: `${randomTribe}-Gabe`, value: 1 },
    ];
    while (giftsList.length < 3) giftsList.push({ name: "", value: 1 });

    // 5. Hintergründe (5 Punkte, ohne "Generation")
    const availableBgs = getPredefinedBackgroundsForWerewolf();
    const backgroundsList = [];
    let remainingPoints = 5;
    const usedBgNames = new Set();
    while (remainingPoints > 0 && backgroundsList.length < 5 && availableBgs.length > 0) {
      const bgName = randomChoice(availableBgs.filter(b => !usedBgNames.has(b)));
      if (!bgName) break;
      const maxPoints = Math.min(5, remainingPoints);
      const points = randomInt(1, maxPoints);
      usedBgNames.add(bgName);
      backgroundsList.push({ name: bgName, value: points });
      remainingPoints -= points;
    }
    while (backgroundsList.length < 5) backgroundsList.push({ name: "", value: 0 });

    // 6. Renown (zufällige Verteilung von 3 Punkten auf die drei Kategorien)
    const renownNames = ['Ruhm', 'Ehre', 'Weisheit'];
    const renownPoints = distributePoints([0, 0, 0], 3, 5);
    const newRenown = {
      Ruhm: renownPoints[0],
      Ehre: renownPoints[1],
      Weisheit: renownPoints[2],
    };

    // 7. Status (Zorn, Gnosis, Willenskraft)
    // Vereinfacht: Zorn = 1 + random(0-4), Gnosis = 1 + random(0-4), Willenskraft = 1 + random(0-4)
    // In echtem Spiel gibt es feste Startwerte nach Rasse und Vorzeichen – hier nur Zufall.
    const newStatus = {
      zorn: randomInt(1, 5),
      gnosis: randomInt(1, 5),
      willenskraft: randomInt(1, 5),
      gesundheit: JSON.parse(JSON.stringify(SharedData.initialHealth)),
    };

    const newCharacter = {
      info,
      attributes: newAttributes,
      abilities: newAbilities,
      advantages: {
        gaben: giftsList,
        hintergründe: backgroundsList,
        renown: newRenown,
      },
      status: newStatus,
      extra: { erfahrung: "", vorzügeSchwächen: [] },
      merits: [],
      flaws: [],
    };

    setCharacter(newCharacter);
    freebie.reset(15);
    freebie.setFreebiesActive(false);
    showToast("Zufälliger Werwolf erstellt!", "success");
  };

  // ----- Merit/Flaw Handler (identisch zu Vampir) -----
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

  // ----- Attribute & Fähigkeiten Limits (wie Vampir) -----
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

  // Validierung mit Freebies
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

  // ----- Freebies zurücksetzen bei neuem Charakter -----
  useEffect(() => {
    freebie.reset(15);
  }, [character.info.Name]);

  return (
    <div className="text-amber-300 font-serif">
      <SheetControls
        title="Werewolf"
        subtitle="The Apocalypse"
        theme="amber"
        mngr={mngr}
        freebieState={freebie}
      />

      <div className="border-2 border-amber-900/50 bg-[#0a0502]/95 p-8 shadow-2xl relative">
        <header className="text-center mb-12 border-b border-amber-900/30 pb-6 relative">
          <h1 className="text-5xl font-bold tracking-[0.2em] text-amber-600 uppercase mb-2">Werewolf</h1>
          <div className="absolute top-0 right-0 flex gap-2">
            <button
              onClick={randomizeCharacter}
              className="p-2 text-amber-400 hover:text-amber-200 transition-colors"
              title="Zufälliger Charakter"
            >
              🎲
            </button>
            <button
              onClick={() => setShowRules(!showRules)}
              className="p-2 text-amber-400 hover:text-amber-200 transition-colors"
              title="Regeln anzeigen"
            >
              <Info size={20} />
            </button>
          </div>
        </header>

        {/* Regel‑Infobox (werwolf-spezifisch) */}
        {showRules && (
          <div className="mb-8 p-4 bg-black/60 border border-amber-800/50 rounded text-xs space-y-2">
            <p><strong>📜 Attribut‑Punkteverteilung</strong><br />
            Jeder Charakter beginnt mit 1 Punkt in jedem Attribut. Zusätzlich werden 7, 5 und 3 Punkte auf die drei Kategorien verteilt.<br />
            Die Kategorie mit den meisten Zusatzpunkten gilt als Primär (max. 7), die zweitmeiste als Sekundär (max. 5), die dritte als Tertiär (max. 3).</p>
            <p><strong>⚙️ Fähigkeiten‑Punkteverteilung</strong><br />
            Alle Fähigkeiten starten bei 0. Die drei Gruppen erhalten 13, 9 und 5 Punkte – automatisch nach der Gesamtpunktzahl zugeordnet.</p>
            <p><strong>✨ Vorteile</strong><br />
            <strong>Gabenspuren:</strong> Jeder Werwolf beginnt mit drei Gaben (Rasse, Vorzeichen, Stamm).<br />
            <strong>Hintergründe:</strong> 5 Punkte insgesamt (max. 5 pro Hintergrund).<br />
            <strong>Ruhm/Ehre/Weisheit:</strong> 3 Punkte insgesamt (verteilt auf die drei Kategorien).</p>
            <p><strong>⭐ Freebies</strong><br />
            Aktiviere den Freebie‑Modus, um zusätzliche Punkte zu vergeben. Es stehen 15 Freebies zur Verfügung.<br />
            Kosten: Attribut 5, Fähigkeit 2, Hintergrund 1, Renown 2, Zorn/Gnosis 2, Willenskraft 1 pro Punkt.</p>
            <p><strong>➕ Vorzüge & Nachteile</strong><br />
            Vorzüge kosten Freebies, Nachteile geben zusätzliche Freebies (auch über 15 hinaus).</p>
          </div>
        )}

        {/* INFO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mb-8">
          {Object.entries(character.info).map(([key, val]) => (
            <div key={key} className="flex flex-col border-b border-amber-900/30">
              <label className="text-[9px] uppercase text-amber-700 font-bold">{key}</label>
              {key === "Stamm" || key === "Vorzeichen" || key === "Rasse" ? (
                <select
                  value={val}
                  onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, [key]: e.target.value } }))}
                  className="bg-transparent text-amber-100 outline-none py-1 cursor-pointer"
                >
                  <option value="" className="bg-black text-amber-500 italic">Wähle...</option>
                  {(key === "Stamm"
                    ? WerewolfData.tribes
                    : key === "Vorzeichen"
                    ? WerewolfData.auspices
                    : WerewolfData.breeds
                  ).map(c => (
                    <option key={c} value={c} className="bg-black text-amber-100">
                      {c}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={val}
                  onChange={(e) => setCharacter(p => ({ ...p, info: { ...p.info, [key]: e.target.value } }))}
                  className="bg-transparent outline-none py-1 text-amber-100"
                />
              )}
            </div>
          ))}
        </div>

        {/* Attribute */}
        <TraitSection
          title="Attribute"
          data={character.attributes}
          theme="amber"
          onChange={validateAndApplyAttributeChange}
          isAttr={true}
          groupStats={attrGroupStats}
        />

        {/* Fähigkeiten */}
        <TraitSection
          title="Fähigkeiten"
          data={character.abilities}
          theme="amber"
          onChange={validateAndApplyAbilityChange}
          groupStats={abilityGroupStats}
        />

        {/* WEREWOLF ADVANTAGES */}
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-widest text-amber-600 text-center py-2 mb-6 bg-amber-950/20">Vorteile</h2>
          <div className="grid grid-cols-3 gap-8">
            <ListTrait
              block={character.advantages.gaben}
              title="Gaben"
              theme="amber"
              max={5}
              onChange={(i, name, v) => {
                const nl = [...character.advantages.gaben];
                if (name !== undefined) nl[i].name = name;
                if (v !== undefined) nl[i].value = v;
                setCharacter(p => ({ ...p, advantages: { ...p.advantages, gaben: nl } }));
              }}
            />
            <ListTrait
              block={character.advantages.hintergründe}
              title="Hintergründe"
              theme="amber"
              onChange={(i, name, v) => {
                const nl = [...character.advantages.hintergründe];
                if (name !== undefined) nl[i].name = name;
                if (v !== undefined) nl[i].value = v;
                setCharacter(p => ({ ...p, advantages: { ...p.advantages, hintergründe: nl } }));
              }}
            />
            <div>
              <h3 className="text-xs font-bold text-amber-700 uppercase mb-4">Renown</h3>
              {Object.entries(character.advantages.renown).map(([name, val]) => (
                <div key={name} className="flex justify-between items-center mb-3">
                  <span className="text-xs">{name}</span>
                  <DotRating
                    theme="amber"
                    value={val}
                    max={10}
                    onChange={(v) =>
                      setCharacter(p => ({
                        ...p,
                        advantages: {
                          ...p.advantages,
                          renown: { ...p.advantages.renown, [name]: v },
                        },
                      }))
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATUS */}
        <section className="grid grid-cols-2 gap-12 border-t border-amber-900/50 pt-8">
          <div className="space-y-6">
            {["Zorn", "Gnosis", "Willenskraft"].map(stat => (
              <div key={stat} className="text-center">
                <h3 className="text-xs text-amber-700 uppercase font-bold mb-2">{stat}</h3>
                <div className="flex justify-center">
                  <DotRating
                    theme="amber"
                    value={character.status[stat.toLowerCase()]}
                    max={10}
                    onChange={v =>
                      setCharacter(p => ({
                        ...p,
                        status: { ...p.status, [stat.toLowerCase()]: v },
                      }))
                    }
                  />
                </div>
                <div className="flex justify-center space-x-1.5 mt-2">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-4 h-4 border border-amber-900" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <HealthBox health={character.status.gesundheit} theme="amber" setCharacter={setCharacter} />
        </section>

        {/* Merits & Flaws Display */}
        <div className="grid grid-cols-2 gap-8 mt-8 border-t border-amber-900/50 pt-6">
          <div>
            <h3 className="text-sm font-bold uppercase text-amber-500 mb-3">Vorzüge</h3>
            {character.merits.length === 0 ? (
              <p className="text-xs text-amber-600 italic">Keine Vorzüge ausgewählt.</p>
            ) : (
              <ul className="space-y-1">
                {character.merits
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((merit, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-amber-300 flex justify-between items-center border-b border-amber-800/30 pb-1"
                    >
                      <span>
                        <span className="font-bold">{merit.name}</span>
                        <span className="text-amber-500 ml-2">({merit.cost})</span>
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
            <h3 className="text-sm font-bold uppercase text-amber-500 mb-3">Nachteile</h3>
            {character.flaws.length === 0 ? (
              <p className="text-xs text-amber-600 italic">Keine Nachteile ausgewählt.</p>
            ) : (
              <ul className="space-y-1">
                {character.flaws
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((flaw, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-amber-300 flex justify-between items-center border-b border-amber-800/30 pb-1"
                    >
                      <span>
                        <span className="font-bold">{flaw.name}</span>
                        <span className="text-amber-500 ml-2">({flaw.cost})</span>
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

        {/* Buttons für Vorzüge/Nachteile (nur wenn Freebies aktiv) */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <button
            onClick={() => {
              setMeritsModalType('merit');
              setShowMeritsModal(true);
            }}
            disabled={!freebie.freebiesActive}
            className={`px-3 py-1 text-xs uppercase tracking-wider rounded border ${
              freebie.freebiesActive
                ? 'border-amber-700 bg-amber-950/50 text-amber-300 hover:bg-amber-900/50'
                : 'border-amber-900/30 bg-black/30 text-amber-600 cursor-not-allowed'
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
                ? 'border-amber-700 bg-amber-950/50 text-amber-300 hover:bg-amber-900/50'
                : 'border-amber-900/30 bg-black/30 text-amber-600 cursor-not-allowed'
            }`}
          >
            Nachteile
          </button>
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