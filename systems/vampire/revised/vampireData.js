import {SharedData} from "../../../data/sharedData";
import {VampireBackgrounds} from "./data/vampireBackgrounds";

export const getEmptyVampire = () => ({
    info: {
        Name: "",
        Spieler: "",
        Chronik: "",
        Wesen: "",
        Verhalten: "",
        Clan: "",
        Generation: "",
        Zuflucht: "",
        Konzept: ""
    },
    attributes: {
        körperlich: {Körperkraft: 1, Geschick: 1, Widerstandsfähigkeit: 1},
        gesellschaftlich: {Charisma: 1, Manipulation: 1, Erscheinungsbild: 1},
        geistig: {Wahrnehmung: 1, Intelligenz: 1, Geistesschärfe: 1}
    },
    abilities: {
        talente: {
            Ausdruck: 0,
            Aufmerksamkeit: 0,
            Ausflüchte: 0,
            Ausweichen: 0,
            Einschüchtern: 0,
            Empathie: 0,
            Führungsqualitäten: 0,
            Handgemenge: 0,
            Sportlichkeit: 0,
            Szenekenntnis: 0
        },
        fertigkeiten: {
            Etikette: 0,
            Fahren: 0,
            Handwerk: 0,
            Heimlichkeit: 0,
            Nahkampf: 0,
            Schusswaffen: 0,
            Sicherheit: 0,
            Tierkunde: 0,
            Überleben: 0,
            Vortrag: 0
        },
        kenntnisse: {
            Akademisches_Wissen: 0,
            Computer: 0,
            Finanzen: 0,
            Gesetzeskenntnis: 0,
            Linguistik: 0,
            Medizin: 0,
            Nachforschungen: 0,
            Naturwissenschaften: 0,
            Okkultismus: 0,
            Politik: 0
        }
    },
    advantages: {
        disziplinen: [{name: "", value: 0}, {name: "", value: 0}, {name: "", value: 0}],
        hintergründe: [{name: "", value: 0}, {name: "", value: 0}, {name: "", value: 0}, {
            name: "",
            value: 0
        }, {name: "", value: 0}],
        tugenden: {Gewissen: 1, Selbstbeherrschung: 1, Mut: 1}
    },
    status: {
        menschlichkeit: 2,
        willenskraft: 1,
        blutvorrat: 10,
        gesundheit: JSON.parse(JSON.stringify(SharedData.initialHealth))
    },
    extra: {erfahrung: "", vorzügeSchwächen: []},
    merits: [],
    flaws: []
});

export const VampireData = {
    clans: {
        "Camarilla": {
            "Brujah": ["Geschwindigkeit", "Stärke", "Präsenz"],
            "Gangrel": ["Tierhaftigkeit", "Seelenstärke", "Gestaltwandel"],
            "Malkavianer": ["Auspex", "Irrsinn", "Verdunkelung"],
            "Nosferatu": ["Tierhaftigkeit", "Verdunkelung", "Stärke"],
            "Toreador": ["Auspex", "Geschwindigkeit", "Präsenz"],
            "Tremere": ["Auspex", "Beherrschung", "Thaumaturgie"],
            "Ventrue": ["Beherrschung", "Präsenz", "Seelenstärke"]
        },
        "Sabbat": {
            "Lasombra": ["Beherrschung", "Schattenspiele", "Stärke"],
            "Tzimisce": ["Auspex", "Fleischformen", "Tierhaftigkeit"]
        },
        "Unabhängige": {
            "Assamiten": ["Geschwindigkeit", "Verdunkelung", "Quietus"],
            "Giovanni": ["Beherrschung", "Nekromantie", "Stärke"],
            "Jünger des Seth": ["Präsenz", "Serpentis", "Verdunkelung"],
            "Ravnos": ["Seelenstärke", "Schimären", "Tierhaftigkeit"]
        },
        "Sonstige": {
            "Caitiff": [], // Keine festen Disziplinen
            "Pander": []   // Keine festen Disziplinen (Sabbat)
        }
    },
    backgrounds: VampireBackgrounds
};

export {VampireMerits} from './data/vampireMerits'; 
export {VampireFlaws} from "./data/vampireFlaws";

// Hilfsfunktion, um die Disziplinen eines Clans zu finden, egal in welcher Kategorie er steckt
export const getClanDisciplines = (clanName) => {
    for (const category in VampireData.clans) {
        if (VampireData.clans[category][clanName]) {
            return VampireData.clans[category][clanName];
        }
    }
    return [];
};