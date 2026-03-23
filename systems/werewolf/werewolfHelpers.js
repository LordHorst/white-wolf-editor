// systems/werewolf/werewolfHelpers.js
import { WerewolfData } from './werewolfData';

/** Vordefinierte Hintergründe ohne "Generation" */
export const getPredefinedBackgrounds = () =>
    WerewolfData.backgrounds
        ? Object.keys(WerewolfData.backgrounds).filter(bg => bg !== 'Generation')
        : [];
