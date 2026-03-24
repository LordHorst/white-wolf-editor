// systems/changeling/changelingRandomizer.js
import {
    distributePoints,
    randomChoice,
    randomizeAbilities,
    randomizeAttributes,
    randomizeBackgrounds,
} from '../../utils/characterUtils';
import { SharedData } from '../../data/sharedData';
import {getEmptyMage, getEmptyTemplate} from '../../data/templates';
import {ChangelingData} from "./changelingData";

// ─── Hilfsfunktionen ────────────────────────────────────────────────────────

/** Liste der vordefinierten Changeling-Hintergründe */
export const getPredefinedBackgrounds = () =>
    ChangelingData.backgrounds ? Object.keys(ChangelingData.backgrounds) : [];

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
    const randomAffiliation = randomChoice(ChangelingData.affiliations.map(a => a.name));
    const affiliation       = ChangelingData.affiliations.find(a => a.name === randomAffiliation);

    const info = {
        Name:          `${randomChoice(SharedData.firstNames)} ${randomChoice(SharedData.lastNames)}`,
        Wesen:         randomChoice(SharedData.demeanors ?? ['?']),
        Zugehörigkeit: randomAffiliation,
        Spieler:       '',
        Verhalten:     randomChoice(SharedData.natures ?? ['?']),
        Gruppierung:   randomChoice(affiliation?.sects ?? []),
        Chronik:       '',
        Konzept:       randomChoice(SharedData.concepts ?? ['?']),
    };

    const rawAbilities   = randomizeAbilities(getEmptyTemplate().abilities);
    

    setCharacter({
        info,
        attributes: randomizeAttributes(getEmptyMage().attributes),
        abilities:  rawAbilities,
        advantages: {
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
    showToast('Zufälliger Changeling erstellt!', 'success');
};