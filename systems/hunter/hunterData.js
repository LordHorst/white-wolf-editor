import { SharedData } from "../../data/sharedData";

// ----- Empty Hunter Character -----
export const getEmptyHunter = () => ({
    info: {
        Name: "",
        Spieler: "",
        Chronik: "",
        Creed: "",
        Nature: "",
        Demeanor: "",
        Konzept: "",
        Zuflucht: "",
    },
    attributes: {
        körperlich: { Kraft: 1, Geschick: 1, Widerstandsfähigkeit: 1 },
        gesellschaftlich: { Charisma: 1, Manipulation: 1, Erscheinungsbild: 1 },
        geistig: { Wahrnehmung: 1, Intelligenz: 1, Geistesschärfe: 1 },
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
            Szenekenntnis: 0,
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
            Vortrag: 0,
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
            Politik: 0,
        },
    },
    advantages: {
        edges: [{ name: "", value: 0 }, { name: "", value: 0 }, { name: "", value: 0 }],
        hintergründe: [
            { name: "", value: 0 },
            { name: "", value: 0 },
            { name: "", value: 0 },
            { name: "", value: 0 },
            { name: "", value: 0 },
        ],
        tugenden: {
            Überzeugung: 1,   // Conviction
            Selbstbeherrschung: 1,
            Mut: 1,
        },
    },
    status: {
        gesundheit: JSON.parse(JSON.stringify(SharedData.initialHealth)),
        willenskraft: 1,     // current Willpower rating (min = Mut)
        überzeugung: 1,      // Conviction rating
        // Note: current Conviction pool = Überzeugung rating
    },
    extra: { erfahrung: "", vorzügeSchwächen: [] },
    merits: [],
    flaws: [],
});

// ----- Creeds -----
export const HunterCreeds = {
    Avenger: {
        description: "Racheengel, getrieben von Wut.",
        edges: ["Schmelzen", "Rache", "Zorn", "Stärke", "Hass"],
    },
    Defender: {
        description: "Beschützer der Unschuldigen.",
        edges: ["Schild", "Ausharren", "Wache", "Verteidigung", "Opfer"],
    },
    Innocent: {
        description: "Bewahrer der Menschlichkeit.",
        edges: ["Reinheit", "Unschuld", "Heilung", "Hoffnung", "Vertrauen"],
    },
    Judge: {
        description: "Richter über Gut und Böse.",
        edges: ["Urteil", "Erkenntnis", "Recht", "Wahrheit", "Gerechtigkeit"],
    },
    Martyr: {
        description: "Opferbereite Helden.",
        edges: ["Leiden", "Standhaftigkeit", "Erlösung", "Glaube", "Aufopferung"],
    },
    Redeemer: {
        description: "Sucher nach Erlösung für Monster.",
        edges: ["Vergebung", "Mitleid", "Zweifel", "Versöhnung", "Gnade"],
    },
    Visionary: {
        description: "Seher der Wahrheit.",
        edges: ["Vorahnung", "Weisheit", "Einsicht", "Prophetie", "Offenbarung"],
    },
    Wayward: {
        description: "Verrückte, die die Monster jagen.",
        edges: ["Wahnsinn", "Besessenheit", "Fixierung", "Verrücktheit", "Wut"],
    },
};

// Helper: get edges allowed for a given creed
export const getCreedEdges = (creedName) => {
    const creed = HunterCreeds[creedName];
    return creed ? creed.edges : [];
};

// ----- Backgrounds -----
export {HunterBackgrounds} from './data/hunterBackgrounds';

// ----- Merits and Flaws (placeholders – expand as needed) -----
export {HunterMerits} from './data/hunterMerits';
export {HunterFlaws} from './data/hunterFlaws';