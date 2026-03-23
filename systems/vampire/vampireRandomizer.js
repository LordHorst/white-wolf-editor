// systems/vampire/vampireRandomizer.js
import {
    randomChoice,
    randomInt,
    randomizeAttributes,
    randomizeAbilities,
    randomizeBackgrounds,
    distributePoints,
} from '../../utils/characterUtils';
import { VampireData, getClanDisciplines } from './vampireData';
import { SharedData } from '../../data/sharedData';
import { getEmptyVampire } from '../../data/templates';
import { generationMap, getPredefinedBackgrounds } from './vampireHelpers';

/**
 * Erstellt einen zufälligen Vampir-Charakter.
 * Wird von BaseSheet so aufgerufen:
 *   onRandomize({ character, setCharacter, freebie, showToast })
 */
export const randomizeCharacter = ({ setCharacter, freebie, showToast }) => {
    const allClans        = Object.values(VampireData.clans).flatMap(cat => Object.keys(cat));
    const randomClan      = randomChoice(allClans);
    const clanDisciplines = getClanDisciplines(randomClan);
    const randomName      = `${randomChoice(SharedData.firstNames)} ${randomChoice(SharedData.lastNames)}`;

    // Attribute (Nosferatu: Erscheinungsbild = 0)
    const newAttributes = randomizeAttributes(getEmptyVampire().attributes);
    if (randomClan === 'Nosferatu') newAttributes.gesellschaftlich.Erscheinungsbild = 0;

    // Fähigkeiten
    const newAbilities = randomizeAbilities(getEmptyVampire().abilities);

    // Disziplinen: Clan-Disziplinen bevorzugen, 3 Punkte verteilen
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
    const backgroundsList = randomizeBackgrounds(getPredefinedBackgrounds(), 5, 5);

    // Tugenden: 7 Zusatzpunkte (max 4 pro Tugend, damit Basis 1 + 4 = 5)
    const extraVirtues = distributePoints([0, 0, 0], 7, 4);
    const newVirtues   = {
        Gewissen:          1 + extraVirtues[0],
        Selbstbeherrschung: 1 + extraVirtues[1],
        Mut:               1 + extraVirtues[2],
    };

    // Generation / Blutvorrat aus dem Hintergrund ableiten
    const genBg    = backgroundsList.find(bg => bg.name === 'Generation');
    const genInfo  = generationMap[genBg?.value ?? 0] ?? generationMap[0];

    const humanity  = Math.min(10, newVirtues.Gewissen + newVirtues.Selbstbeherrschung + randomInt(0, 3));
    const willpower = Math.min(10, newVirtues.Mut + randomInt(0, 3));

    setCharacter({
        info: {
            Name:       randomName,
            Spieler:    '', Chronik: '',
            Wesen:      randomChoice(SharedData.demeanors),
            Verhalten:  randomChoice(SharedData.natures),
            Clan:       randomClan,
            Generation: genInfo.generation,
            Zuflucht:   '',
            Konzept:    randomChoice(SharedData.concepts),
        },
        attributes: newAttributes,
        abilities:  newAbilities,
        advantages: {
            disziplinen:  disciplinesList,
            hintergründe: backgroundsList,
            tugenden:     newVirtues,
        },
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