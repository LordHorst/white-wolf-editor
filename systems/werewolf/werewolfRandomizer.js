// systems/werewolf/werewolfRandomizer.js
import {
    randomChoice,
    randomInt,
    randomizeAttributes,
    randomizeAbilities,
    randomizeBackgrounds,
    distributePoints,
} from '../../utils/characterUtils';
import { WerewolfData } from './werewolfData';
import { SharedData } from '../../data/sharedData';
import { getEmptyWerewolf } from '../../data/templates';
import { getPredefinedBackgrounds } from './werewolfHelpers';

/**
 * Erstellt einen zufälligen Werwolf-Charakter.
 * Wird von BaseSheet so aufgerufen:
 *   onRandomize({ character, setCharacter, freebie, showToast })
 */
export const randomizeCharacter = ({ setCharacter, freebie, showToast }) => {
    const randomTribe   = randomChoice(WerewolfData.tribes);
    const randomAuspice = randomChoice(WerewolfData.auspices);
    const randomBreed   = randomChoice(WerewolfData.breeds);

    const info = {
        Name:       `${randomChoice(SharedData.firstNames)} ${randomChoice(SharedData.lastNames)}`,
        Spieler:    '', Chronik: '',
        Rasse:      randomBreed,
        Vorzeichen: randomAuspice,
        Stamm:      randomTribe,
        Rudel:      '', Totem: '',
        Konzept:    randomChoice(SharedData.concepts  ?? ['?']),
        Wesen:      randomChoice(SharedData.demeanors ?? ['?']),
        Verhalten:  randomChoice(SharedData.natures   ?? ['?']),
    };

    // Gaben: je eine aus Rasse, Vorzeichen und Stamm
    const gaben = [
        { name: `${randomBreed}-Gabe`,   value: 1 },
        { name: `${randomAuspice}-Gabe`, value: 1 },
        { name: `${randomTribe}-Gabe`,   value: 1 },
    ];

    // Renown: 3 Punkte zufällig verteilen
    const renownPoints = distributePoints([0, 0, 0], 3, 5);
    const newRenown    = { Ruhm: renownPoints[0], Ehre: renownPoints[1], Weisheit: renownPoints[2] };

    setCharacter({
        info,
        attributes: randomizeAttributes(getEmptyWerewolf().attributes),
        abilities:  randomizeAbilities(getEmptyWerewolf().abilities),
        advantages: {
            gaben,
            hintergründe: randomizeBackgrounds(getPredefinedBackgrounds()),
            renown:       newRenown,
        },
        status: {
            zorn:         randomInt(1, 5),
            gnosis:       randomInt(1, 5),
            willenskraft: randomInt(1, 5),
            gesundheit:   JSON.parse(JSON.stringify(SharedData.initialHealth)),
        },
        extra:  { erfahrung: '', vorzügeSchwächen: [] },
        merits: [], flaws: [],
    });

    freebie.reset(15);
    freebie.setFreebiesActive(false);
    showToast('Zufälliger Werwolf erstellt!', 'success');
};
