// data/templates.js
import {MageData, SharedData} from "./sharedData";

export const getBaseAttributes = () => ({
    körperlich: { Körperkraft: 1, Geschick: 1, Widerstandsfähigkeit: 1 },
    gesellschaftlich: { Charisma: 1, Manipulation: 1, Erscheinungsbild: 1 },
    geistig: { Wahrnehmung: 1, Intelligenz: 1, Geistesschärfe: 1 }
});

export const getEmptyVampire = () => ({
    info: { Name: "", Spieler: "", Chronik: "", Wesen: "", Verhalten: "", Clan: "", Generation: "", Zuflucht: "", Konzept: "" },
    attributes: {
        körperlich: { Körperkraft: 1, Geschick: 1, Widerstandsfähigkeit: 1 },
        gesellschaftlich: { Charisma: 1, Manipulation: 1, Erscheinungsbild: 1 },
        geistig: { Wahrnehmung: 1, Intelligenz: 1, Geistesschärfe: 1 }
    },
    abilities: {
        talente: { Ausdruck: 0, Aufmerksamkeit: 0, Ausflüchte: 0, Ausweichen: 0, Einschüchtern: 0, Empathie: 0, Führungsqualitäten: 0, Handgemenge: 0, Sportlichkeit: 0, Szenekenntnis: 0 },
        fertigkeiten: { Etikette: 0, Fahren: 0, Handwerk: 0, Heimlichkeit: 0, Nahkampf: 0, Schusswaffen: 0, Sicherheit: 0, Tierkunde: 0, Überleben: 0, Vortrag: 0 },
        kenntnisse: { Akademisches_Wissen: 0, Computer: 0, Finanzen: 0, Gesetzeskenntnis: 0, Linguistik: 0, Medizin: 0, Nachforschungen: 0, Naturwissenschaften: 0, Okkultismus: 0, Politik: 0 }
    },
    advantages: {
        disziplinen: [{ name: "", value: 0 }, { name: "", value: 0 }, { name: "", value: 0 }],
        hintergründe: [{ name: "", value: 0 }, { name: "", value: 0 }, { name: "", value: 0 }, { name: "", value: 0 }, { name: "", value: 0 }],
        tugenden: { Gewissen: 1, Selbstbeherrschung: 1, Mut: 1 }
    },
    status: { menschlichkeit: 2, willenskraft: 1, blutvorrat: 10, gesundheit: JSON.parse(JSON.stringify(SharedData.initialHealth)) },
    extra: { erfahrung: "", vorzügeSchwächen: [] },
    merits: [],
    flaws: []
});

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
        körperlich: { Körperkraft: 1, Geschick: 1, Widerstandsfähigkeit: 1 },
        gesellschaftlich: { Charisma: 1, Manipulation: 1, Erscheinungsbild: 1 },
        geistig: { Wahrnehmung: 1, Intelligenz: 1, Geistesschärfe: 1 }
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
        sphären: MageData.spheres.reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {}),
        hintergründe: [
            { name: "", value: 0 }, { name: "", value: 0 },
            { name: "", value: 0 }, { name: "", value: 0 }, { name: "", value: 0 }
        ],
    },
    status: {
        arete: 1,
        willenskraft: 5,
        quintessenz: 1,
        paradox: 0,
        gesundheit: JSON.parse(JSON.stringify(SharedData.initialHealth))
    },
    extra: { erfahrung: "", vorzügeSchwächen: [] },
    merits: [],
    flaws: []
});

export const getEmptyWerewolf = () => ({
    info: {
        Name: "",
        Spieler: "",
        Chronik: "",
        Abstammung: "",
        Vorzeichen: "",
        Stamm: "",
        Rudel: "",
        Totem: "",
        Konzept: "",
        Wesen: "",
        Verhalten: "",
    },
    attributes: {
        körperlich: { Körperkraft: 1, Geschick: 1, Widerstandsfähigkeit: 1 },
        gesellschaftlich: { Charisma: 1, Manipulation: 1, Erscheinungsbild: 1 },
        geistig: { Wahrnehmung: 1, Intelligenz: 1, Geistesschärfe: 1 },
    },
    abilities: {
        talente: {
            Aufmerksamkeit: 0,
            Ausflüchte: 0,
            Ausweichen: 0,
            Einschüchtern: 0,
            Empathie: 0,
            Führungsqualitäten: 0,
            Handgemenge: 0,
            Instinkte: 0,
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
            Tierkunde: 0,
            Überleben: 0,
            Vortrag: 0,
        },
        kenntnisse: {
            Akademisches_Wissen: 0,
            Computer: 0,
            Enigmas: 0,
            Gesetzeskenntnis: 0,
            Linguistik: 0,
            Medizin: 0,
            Nachforschungen: 0,
            Naturwissenschaften: 0,
            Okkultismus: 0,
            Riten: 0,
        },
    },
    advantages: {
        gaben: [
            { name: "", value: 1 },
            { name: "", value: 1 },
            { name: "", value: 1 },
        ],
        hintergründe: [
            { name: "", value: 0 },
            { name: "", value: 0 },
            { name: "", value: 0 },
            { name: "", value: 0 },
            { name: "", value: 0 },
        ],
        renown: { Ruhm: 0, Ehre: 0, Weisheit: 0 },
    },
    status: {
        zorn: 1,
        gnosis: 1,
        willenskraft: 1,
        gesundheit: JSON.parse(JSON.stringify(SharedData.initialHealth)),
    },
    extra: { erfahrung: "", vorzügeSchwächen: [] },
    merits: [],
    flaws: [],
});

export const getEmptyTemplate = () => ({
    info: {
        Name: "",
        Spieler: "",
        Chronik: "",
        Abstammung: "",
        Vorzeichen: "",
        Stamm: "",
        Rudel: "",
        Totem: "",
        Konzept: "",
        Wesen: "",
        Verhalten: "",
    },
    attributes: {
        körperlich: { Körperkraft: 1, Geschick: 1, Widerstandsfähigkeit: 1 },
        gesellschaftlich: { Charisma: 1, Manipulation: 1, Erscheinungsbild: 1 },
        geistig: { Wahrnehmung: 1, Intelligenz: 1, Geistesschärfe: 1 },
    },
    abilities: {
        talente: {
            Aufmerksamkeit: 0,
            Ausflüchte: 0,
            Ausweichen: 0,
            Einschüchtern: 0,
            Empathie: 0,
            Führungsqualitäten: 0,
            Handgemenge: 0,
            Instinkte: 0,
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
            Tierkunde: 0,
            Überleben: 0,
            Vortrag: 0,
        },
        kenntnisse: {
            Akademisches_Wissen: 0,
            Computer: 0,
            Enigmas: 0,
            Gesetzeskenntnis: 0,
            Linguistik: 0,
            Medizin: 0,
            Nachforschungen: 0,
            Naturwissenschaften: 0,
            Okkultismus: 0,
            Riten: 0,
        },
    },
    advantages: {
        gaben: [
            { name: "", value: 1 },
            { name: "", value: 1 },
            { name: "", value: 1 },
        ],
        hintergründe: [
            { name: "", value: 0 },
            { name: "", value: 0 },
            { name: "", value: 0 },
            { name: "", value: 0 },
            { name: "", value: 0 },
        ],
        renown: { Ruhm: 0, Ehre: 0, Weisheit: 0 },
    },
    status: {
        zorn: 1,
        gnosis: 1,
        willenskraft: 1,
        gesundheit: JSON.parse(JSON.stringify(SharedData.initialHealth)),
    },
    extra: { erfahrung: "", vorzügeSchwächen: [] },
    merits: [],
    flaws: [],
});