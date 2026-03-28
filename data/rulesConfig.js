// data/rulesConfigs.js
export const BASE_FREEBIE_COSTS = {
    attribute: 5,
    ability: 2,
    background: 1,
    willpower: 1,
};

export const VAMPIRE_COSTS = {...BASE_FREEBIE_COSTS, discipline: 7, virtue: 2, humanity: 2};
export const WEREWOLF_COSTS = {...BASE_FREEBIE_COSTS, renown: 2, rage: 2, gnosis: 2};
export const MAGE_COSTS = {...BASE_FREEBIE_COSTS, sphere: 4, arete: 8, quintessence: 2};