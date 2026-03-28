// systems/werewolf/werewolfHelpers.js
import { WerewolfData, TribeRestrictions } from './werewolfData';

export const getPredefinedBackgrounds = (tribe = null) => {
    let backgrounds = Object.keys(WerewolfData.backgrounds);
    if (tribe && TribeRestrictions[tribe]?.restrictedBackgrounds) {
        backgrounds = backgrounds.filter(bg => !TribeRestrictions[tribe].restrictedBackgrounds.includes(bg));
    }
    return backgrounds;
};