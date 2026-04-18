// systems/hunter5e/hunter5eData.js (aktualisiert)

import {SharedData} from "../../data/sharedData";

// ----- Leerer H5-Jäger -----
export const getEmptyHunter5e = () => ({
    info: {
        Name: "",
        Spieler: "",
        Chronik: "",
        Creed: "",           // Entrepreneurial, Faithful, Inquisitive, Martial, Underground
        Konzept: "",
        Ambition: "",
        Desire: "",
        Drive: "",           // Curiosity, Vengeance, Oath, Greed, Pride, Envy, Atonement
    },
    attributes: {
        körperlich: {Körperkraft: 1, Geschicklichkeit: 1, Widerstandsfähigkeit: 1},
        gesellschaftlich: {Charisma: 1, Manipulation: 1, Fassung: 1},
        geistig: {Intelligenz: 1, Scharfsinn: 1, Entschlossenheit: 1},
    },
    abilities: {
        talente: {
            Diebeshandwerk: 0,
            Fahren: 0,
            Handgemenge: 0,
            Handwerkt: 0,
            Heimlichkeit: 0,
            Nahkampf: 0,
            Schusswaffen: 0,
            Sportlichkeit: 0,
            Überleben: 0,
        },
        fertigkeiten: {
            Anführen: 0,
            Ausflüchte: 0,
            Darbietung: 0,
            Einschüchtern: 0,
            Etikette: 0,
            Menschenkenntnis: 0,
            Szenekenntnis: 0,
            Tierkunde: 0,
            Überzeugen: 0,
        },
        kenntnisse: {
            Ermitteln: 0,
            Finanzen: 0,
            Geisteswissenschaften: 0,
            Medizin: 0,
            Naturwissenschaften: 0,
            Okkultismus: 0,
            Politik: 0,
            Technologie: 0,
            Wahrnehmung: 0,
        },
    },
    advantages: {
        edges: [{name: "", value: 0}, {name: "", value: 0}, {name: "", value: 0}],
        hintergründe: [
            {name: "", value: 0},
            {name: "", value: 0},
            {name: "", value: 0},
            {name: "", value: 0},
            {name: "", value: 0},
        ],
        drive: "",
    },
    status: {
        gesundheit: JSON.parse(JSON.stringify(SharedData.initialHealth)),
        willenskraft: 1,
        gefahr: 0,
        verzweiflung: 0,
    },
    merits: [],
    flaws: [],
});

// ----- H5 Glaubenssätze (Creeds) -----
export const Hunter5eCreeds = {
    "Unternehmerisch": {   // Entrepreneurial
        description: "Erfinderisch, geschäftstüchtig, nutzt Ressourcen.",
        edges: [],
    },
    "Gläubig": {          // Faithful
        description: "Getragen von religiösem oder spirituellem Glauben.",
        edges: [],
    },
    "Forschend": {        // Inquisitive
        description: "Suchend, forschend, immer auf der Suche nach Wahrheit.",
        edges: [],
    },
    "Kriegerisch": {      // Martial
        description: "Kämpferisch, diszipliniert, ehemaliges Militär oder Kämpfer.",
        edges: [],
    },
    "Untergrund": {       // Underground
        description: "Verbindungen zur Unterwelt, kriminelle oder subkulturelle Kreise.",
        edges: [],
    },
};

// ----- Alle verfügbaren Edges (flache Liste, vorerst leer) -----
export const getAllEdges = () => {
    // In H5 gibt es keine festen Edges pro Creed; der Spieler wählt aus einer allgemeinen Liste.
    // Für eine vollständige Implementierung müsste die Edge-Liste aus dem Regelwerk ergänzt werden.
    // Hier als Platzhalter:
    return [
        "Analytisch", "Aufmerksam", "Dickköpfig", "Drahtzieher", "Einschüchternd",
        "Empathisch", "Entschlossen", "Flink", "Gefährten", "Geldgeber",
        "Gesund", "Glücklich", "Hart im Nehmen", "Instinktiv", "Kämpferisch",
        "Kontaktfreudig", "Kreativ", "Menschenkenner", "Präzise", "Schattenläufer",
        "Selbstbeherrscht", "Taktiker", "Unbestechlich", "Unternehmer", "Widerstandsfähig",
    ];
};

// ----- Hintergründe (unverändert) -----
export const Hunter5eBackgrounds = {
    "Kontakte": {
        levels: ["Einzelne Quelle", "Kleines Netzwerk", "Gutes Netzwerk", "Weitreichend", "Allgegenwärtig"],
    },
    "Ressourcen": {
        levels: ["500 €", "1.200 €", "3.000 €", "9.000 €", "30.000 €"],
    },
    "Mentor": {
        levels: ["Erfahren", "Weise", "Mächtig", "Einflussreich", "Legendär"],
    },
    "Zuflucht": {
        levels: ["Einfach", "Komfortabel", "Gesichert", "Festung", "Heiligtum"],
    },
    "Alliierte": {
        levels: ["Einzelner", "Kleine Gruppe", "Organisation", "Einflussreiche Fraktion", "Armee"],
    },
};

// ----- Vor- & Nachteile (unverändert) -----
export const Hunter5eMerits = [
    {name: "Furchtlos", cost: 2, description: "+2 Würfel auf Mutproben."},
    {name: "Zäher Hund", cost: 3, description: "Eine zusätzliche Gesundheitsstufe."},
    {name: "Beidhändig", cost: 1, description: "Kein Abzug für Nebenhand."},
    {name: "Eidetisches Gedächtnis", cost: 2, description: "Perfekte Erinnerung."},
];

export const Hunter5eFlaws = [
    {name: "Albtraum", cost: 1, description: "Nächtliche Albträume; Willenskraftprobe."},
    {name: "Phobie", cost: 2, description: "Krankhafte Angst; Mutprobe bei Konfrontation."},
    {name: "Feind", cost: 1, description: "Mächtiger Feind (stapelbar).", stackable: true, maxStack: 5},
];