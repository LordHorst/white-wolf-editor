// systems/vampire/vampireHelpers.js
import {VampireData} from './vampireData';

// ─── Generationsmapping ──────────────────────────────────────────────────────
export const generationMap = {
    0: {generation: '13', bloodCapacity: 10},
    1: {generation: '12', bloodCapacity: 11},
    2: {generation: '11', bloodCapacity: 12},
    3: {generation: '10', bloodCapacity: 13},
    4: {generation: '9', bloodCapacity: 14},
    5: {generation: '8', bloodCapacity: 15},
};

/** Gibt Generation und Blutkapazität anhand des Hintergrundwerts zurück. */
export const getGenerationInfo = (backgrounds) => {
    const genBg = backgrounds.find(bg => bg.name === 'Generation');
    return generationMap[genBg?.value ?? 0] ?? generationMap[0];
};

/** Alle vordefinierten Vampir-Hintergründe. */
export const getPredefinedBackgrounds = () =>
    VampireData.backgrounds ? Object.keys(VampireData.backgrounds) : [];

/** Summiert alle Disziplinenpunkte. */
export const sumDisciplines = (disciplines) =>
    disciplines.reduce((sum, d) => sum + d.value, 0);

/** Summiert alle Tugendpunkte. */
export const sumVirtues = (virtues) =>
    Object.values(virtues).reduce((sum, v) => sum + v, 0);