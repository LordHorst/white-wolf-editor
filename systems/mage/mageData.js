import {SharedData} from "../../data/sharedData";
import {MageBackgrounds} from "./data/mageBackgrounds";
import {MageMerits} from "./data/mageMerits";

export const getEmptyMage = () => ({
    info: {
        Name: "",
        Wesen: "",
        Zugehörigkeit: "",
        Spieler: "",
        Verhalten: "",
        Gruppierung: "",
        Chronik: "",
        Essenz: "",
        Konzept: ""
    },
    attributes: {
        körperlich: {Körperkraft: 1, Geschick: 1, Widerstandsfähigkeit: 1},
        gesellschaftlich: {Charisma: 1, Manipulation: 1, Erscheinungsbild: 1},
        geistig: {Wahrnehmung: 1, Intelligenz: 1, Geistesschärfe: 1}
    },
    abilities: {
        talente: {
            Aufmerksamkeit: 0, Asudruck: 0, Ausflüchte: 0, Einschüchtern: 0, Empathie: 0,
            Führungsqualitäten: 0, Handgemenge: 0, Kunst: 0, Sechster_Sinn: 0,
            Sportlichkeit: 0, Szenekenntnis: 0
        },
        fertigkeiten: {
            Etikette: 0, Fahren: 0, Handwerk: 0, Heimlichkeit: 0, Kampfkunst: 0,
            Meditation: 0, Nahkampf: 0, Recherche: 0, Schusswaffen: 0, Technologie: 0, Überleben: 0
        },
        kenntnisse: {
            Akademisches_Wissen: 0, Computer: 0, Enigmas: 0, Esoterik: 0, Gesetzeskenntnis: 0,
            Kosmologie: 0, Medizin: 0, Nachforschungen: 0, Naturwissenschaften: 0, Okkultismus: 0,
            Poltik: 0
        }
    },
    advantages: {
        sphären: MageData.spheres.reduce((acc, curr) => ({...acc, [curr]: 0}), {}),
        hintergründe: [
            {name: "", value: 0}, {name: "", value: 0},
            {name: "", value: 0}, {name: "", value: 0}, {name: "", value: 0}
        ],
    },
    status: {
        arete: 1,
        willenskraft: 5,
        quintessenz: 1,
        paradox: 0,
        gesundheit: JSON.parse(JSON.stringify(SharedData.initialHealth))
    },
    extra: {erfahrung: "", vorzügeSchwächen: []},
    merits: [],
    flaws: []
});

export const MageData = {
    affiliations: [
        {
            name: "Traditionen",
            sects: ["Akashayana", "Himmelschor", "Kult der Ekstase", "Traumsprecher", "Euthanatos", "Orden des Hermes", "Gesellschaft des Äthers", "Verbena", "Virtuelle Adepten"]
        },
        {
            name: "Technokratische Union",
            sects: ["Iteration X", "Neue Weltordnung", "Progenitoren", "Syndikat", "Leeren-Ingenieure"]
        },
        {
            name: "Disparaten",
            sects: ["Ahl-i-Batin", "Bata’a", "Kinder des Wissens", "Hollow Ones", "Kopa Loei", "Ngoma", "Waisen", "Schwestern von Hippolyta", "Taftâni", "Tempelritter", "Wu Lung"]
        }
    ],
    essences: ["Dynamisch", "Muster", "Primordial", "Suchend"],
    spheres: ["Korrespondenz", "Entropie", "Kräfte", "Leben", "Materie", "Gedanken", "Kern", "Geister", "Zeit"],
    backgrounds: MageBackgrounds
};

// Helper to get sect list for an affiliation
export const getSectsForAffiliation = (affiliationName) => {
    const aff = MageData.affiliations.find(a => a.name === affiliationName);
    return aff ? aff.sects : [];
};

export {MageMerits} from './data/mageMerits'
export {MageFlaws} from './data/mageFlaws'