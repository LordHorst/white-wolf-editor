import {randomChoice, randomInt} from '../../../utils/characterUtils';
import {SharedData} from '../../../data/sharedData';
import {VampireV5Data} from './vampireV5Data';
import {getEmptyVampireV5} from '../../../data/vampireV5Template';

/**
 * Erstellt einen zufälligen Charakter für Vampire V5.
 * Beachtet die V5 spezifischen Erschaffungsregeln:
 * - Attribute: 4/3/2 verteilen
 * - Fertigkeiten: 8/5/2 verteilen
 * - Disziplinen: 2 Punkte in einer, 1 Punkt in einer anderen Clan-Disziplin
 */
export const randomizeCharacter = ({setCharacter, showToast}) => {
    const emptyChar = getEmptyVampireV5();

    // --- Basis Infos ---
    const allClans = VampireV5Data.clans || ['Brujah', 'Ventrue', 'Tremere', 'Toreador', 'Malkavianer', 'Nosferatu', 'Gangrel'];
    const randomClan = randomChoice(allClans);
    const randomName = `${randomChoice(SharedData.firstNames)} ${randomChoice(SharedData.lastNames)}`;

    const predatorTypes = VampireV5Data.predatorTypes || ['Gassenschläger', 'Bauer', 'Siren', 'Blutegel', 'Osiris'];
    const randomPredator = randomChoice(predatorTypes);

    // --- Attribute (V5: 4/3/2 verteilen, Max 4) ---
    // Alle Attribute starten im emptyChar bei 1
    const newAttributes = JSON.parse(JSON.stringify(emptyChar.attributes));
    const attrCategories = Object.keys(newAttributes);
    const attrPoints = [4, 3, 2].sort(() => Math.random() - 0.5);

    attrCategories.forEach((cat, index) => {
        let points = attrPoints[index];
        const traits = Object.keys(newAttributes[cat]);

        while (points > 0) {
            const randomTrait = randomChoice(traits);
            if (newAttributes[cat][randomTrait] < 4) { // Maximal 4 bei Erschaffung
                newAttributes[cat][randomTrait]++;
                points--;
            }
        }
    });

    // --- Fertigkeiten (V5: 8/5/2 verteilen, Max 3) ---
    // Alle Fertigkeiten starten im emptyChar bei 0
    const newAbilities = JSON.parse(JSON.stringify(emptyChar.abilities));
    const abilityCategories = Object.keys(newAbilities);
    const abilityPoints = [8, 5, 2].sort(() => Math.random() - 0.5);

    abilityCategories.forEach((cat, index) => {
        let points = abilityPoints[index];
        const traits = Object.keys(newAbilities[cat]);

        while (points > 0) {
            const randomTrait = randomChoice(traits);
            if (newAbilities[cat][randomTrait] < 3) { // Maximal 3 bei Erschaffung
                newAbilities[cat][randomTrait]++;
                points--;
            }
        }
    });

    // --- Disziplinen ---
    // V5 Start: 2 Punkte in einer Clan-Disziplin, 1 Punkt in einer anderen
    let disciplinesList = [];
    const clanDisciplines = VampireV5Data.clanDisciplines?.[randomClan] || ['Stärke', 'Geschwindigkeit', 'Seelenstärke', 'Auspex', 'Beherrschung', 'Präsenz', 'Verdunkelung', 'Tierhaftigkeit', 'Blutmagie', 'Gestaltwandel'];

    const shuffledDisciplines = [...clanDisciplines].sort(() => Math.random() - 0.5);
    if (shuffledDisciplines.length >= 2) {
        disciplinesList.push({name: shuffledDisciplines[0], value: 2});
        disciplinesList.push({name: shuffledDisciplines[1], value: 1});
    }

    // --- Statuswerte (Gesundheit & Willenskraft) ---
    // Sucht die Werte dynamisch (Fallback auf 1, falls Bezeichnungen abweichen)
    const getVal = (cat, name) => newAttributes[cat]?.[name] || 1;

    // Willenskraft = Entschlossenheit + Fassung
    const entschlossenheit = getVal('geistig', 'Entschlossenheit') || getVal('mental', 'Entschlossenheit') || 2;
    const fassung = getVal('gesellschaftlich', 'Fassung') || getVal('sozial', 'Fassung') || 2;
    const willpowerMax = entschlossenheit + fassung;

    // Gesundheit = Widerstandsfähigkeit + 3
    const widerstand = getVal('körperlich', 'Widerstandsfähigkeit') || getVal('physisch', 'Widerstandsfähigkeit') || 2;
    const healthMax = widerstand + 3;

    // Helper: Passt die Track-Länge für die V5 DualDamageBox an, falls das Template Arrays nutzt
    const formatTrack = (templateTrack, maxVal) => {
        if (Array.isArray(templateTrack)) {
            return Array.from({length: maxVal}, () => ({value: 0})); // 0 = leer (kein Schaden)
        }
        return maxVal;
    };

    // --- Charakter zusammenbauen ---
    setCharacter({
        ...emptyChar,
        info: {
            ...emptyChar.info,
            Name: randomName,
            Konzept: randomChoice(SharedData.concepts || ['Rebell', 'Künstler', 'Überlebender']),
            Clan: randomClan,
            Vorzeichen: randomPredator,
            Generation: '12. oder 13.',
        },
        attributes: newAttributes,
        abilities: newAbilities,
        advantages: {
            ...emptyChar.advantages,
            disziplinen: disciplinesList,
            hintergründe: [
                {name: 'Ressourcen', value: randomInt(1, 3)},
                {name: 'Herde', value: randomInt(0, 2)},
                {name: 'Kontakte', value: randomInt(0, 3)}
            ].filter(h => h.value > 0).slice(0, 2), // Max 2 zufällige Vorteile behalten
        },
        status: {
            ...emptyChar.status,
            menschlichkeit: 7,
            hunger: 1,
            blutstärke: 1,
            willenskraft: formatTrack(emptyChar.status.willenskraft, willpowerMax),
            gesundheit: formatTrack(emptyChar.status.gesundheit, healthMax),
        }
    });

    if (showToast) {
        showToast(`V5 Charakter "${randomName}" (${randomClan}) erfolgreich generiert!`, 'success');
    }
};