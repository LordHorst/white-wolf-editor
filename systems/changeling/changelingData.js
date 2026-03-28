// systems/changeling/changelingData.js
import {SharedData} from "../../data/sharedData";
import {ChangelingBackgrounds} from "./data/changelingBackgrounds";

export const getEmptyChangeling = () => ({
    info: {
        Name: '', Spieler: '', Chronik: '',
        Kith: '', Hof: '', Konzept: '',
        Wesen: '', Verhalten: '',
    },
    attributes: {
        körperlich: {Körperkraft: 1, Geschick: 1, Widerstandsfähigkeit: 1},
        gesellschaftlich: {Charisma: 1, Manipulation: 1, Erscheinungsbild: 1},
        geistig: {Wahrnehmung: 1, Intelligenz: 1, Geistesschärfe: 1},
    },
    abilities: {
        talente: {
            Aufmerksamkeit: 0,
            Ausflüchte: 0,
            Empathie: 0,
            Führungsqualitäten: 0,
            Handgemenge: 0,
            Sportlichkeit: 0
        },
        fertigkeiten: {Etikette: 0, Handwerk: 0, Heimlichkeit: 0, Nahkampf: 0, Überleben: 0},
        kenntnisse: {Akademisches_Wissen: 0, Computer: 0, Medizin: 0, Okkultismus: 0},
    },
    advantages: {
        hintergründe: [{name: "", value: 0},
            {name: "", value: 0},
            {name: "", value: 0},
            {name: "", value: 0},
            {name: "", value: 0},
        ]
    },
    status: {
        glamour: 1,
        banality: 1,
        willenskraft: 3,
        gesundheit: JSON.parse(JSON.stringify(SharedData.initialHealth)),
    },
    extra: {erfahrung: '', vorzügeSchwächen: []},
    merits: [],
    flaws: [],
});

export const ChangelingData = {
    kiths: ['Boggan', 'Eshu', 'Nocker', 'Piskey', 'Pooka', 'Redcap', 'Satyr', 'Sidhe', 'Sluagh', 'Troll'],
    courts: ['Seelie', 'Unseelie'],
    backgrounds: ChangelingBackgrounds,
    affiliations: ['Kith', 'Court'],
};

export {ChangelingMerits} from "./data/changelingMerits";
export {ChangelingFlaws} from "./data/changelingFlaws";