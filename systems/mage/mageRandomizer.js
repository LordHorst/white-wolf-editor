// systems/mage/mageRandomizer.js
import {
    distributePoints,
    randomChoice,
    randomizeAbilities,
    randomizeAttributes,
    randomizeBackgrounds,
} from '../../utils/characterUtils';
import { MageData } from './mageData';
import { SharedData } from '../../data/sharedData';
import { getEmptyMage } from '../../data/templates';

// ─── Hilfsfunktionen ────────────────────────────────────────────────────────

/** Liste der vordefinierten Mage-Hintergründe */
export const getPredefinedBackgrounds = () =>
    MageData.backgrounds ? Object.keys(MageData.backgrounds) : [];

/**
 * Begrenzt Kampfkunst auf max. 2 Punkte und verteilt Überschuss
 * auf andere Fertigkeiten (ebenfalls max. 3).
 */
export const enforceKampfkunstLimit = (abilities) => {
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

// ─── Randomizer ─────────────────────────────────────────────────────────────

/**
 * Erstellt einen zufälligen Mage-Charakter.
 *
 * Wird von BaseSheet so aufgerufen:
 *   onRandomize({ character, setCharacter, freebie, showToast })
 *
 * `character` wird hier nicht benötigt, ist aber Teil der Signatur
 * damit alle onRandomize-Funktionen dasselbe Interface haben.
 */
export const randomizeCharacter = ({ setCharacter, freebie, showToast }) => {
    const randomAffiliation = randomChoice(MageData.affiliations.map(a => a.name));
    const affiliation       = MageData.affiliations.find(a => a.name === randomAffiliation);

    const info = {
        Name:          `${randomChoice(SharedData.firstNames)} ${randomChoice(SharedData.lastNames)}`,
        Wesen:         randomChoice(SharedData.demeanors ?? ['?']),
        Zugehörigkeit: randomAffiliation,
        Spieler:       '',
        Verhalten:     randomChoice(SharedData.natures ?? ['?']),
        Gruppierung:   randomChoice(affiliation?.sects ?? []),
        Chronik:       '',
        Essenz:        randomChoice(MageData.essences),
        Konzept:       randomChoice(SharedData.concepts ?? ['?']),
    };

    const rawAbilities   = randomizeAbilities(getEmptyMage().abilities);
    const finalAbilities = enforceKampfkunstLimit(rawAbilities);

    // Sphären: 3 Punkte, max. 3 pro Sphäre
    const sphereDist = distributePoints(MageData.spheres, 3, 3);
    const newSpheres = Object.fromEntries(
        MageData.spheres.map((s, i) => [s, sphereDist[i]])
    );

    setCharacter({
        info,
        attributes: randomizeAttributes(getEmptyMage().attributes),
        abilities:  finalAbilities,
        advantages: {
            sphären:      newSpheres,
            hintergründe: randomizeBackgrounds(getPredefinedBackgrounds()),
        },
        status: {
            arete: 1, willenskraft: 5, quintessenz: 1, paradox: 0,
            gesundheit: JSON.parse(JSON.stringify(SharedData.initialHealth)),
        },
        extra:  { erfahrung: '', vorzügeSchwächen: [] },
        merits: [],
        flaws:  [],
    });

    freebie.reset(15);
    freebie.setFreebiesActive(false);
    showToast('Zufälliger Magier erstellt!', 'success');
};