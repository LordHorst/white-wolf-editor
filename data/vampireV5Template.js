// Ergänzung für data/templates.js
// (Diese Funktion in die bestehende templates.js einfügen)

export const getEmptyVampireV5 = () => ({
    info: {
        Name: '', Spieler: '', Chronik: '',
        Clan: '', Vorzeichen: '', Generation: '13',
        Konzept: '', Ambition: '', Wunsch: '',
    },
    attributes: {
        körperlich: {Stärke: 1, Geschicklichkeit: 1, Ausdauer: 1},
        gesellschaftlich: {Charisma: 1, Manipulation: 1, Auftreten: 1},
        geistig: {Intelligenz: 1, Geistesschärfe: 1, Entschlossenheit: 1},
    },
    abilities: {
        körperlich: {Athletik: 0, Schleichen: 0, Handgemenge: 0, Melee: 0, Schusswaffen: 0, Überleben: 0},
        gesellschaftlich: {Tierkunde: 0, Etikette: 0, Einschüchterung: 0, Führung: 0, Überzeugung: 0, Auftreten: 0},
        geistig: {Bewusstsein: 0, Finanzen: 0, Untersuchen: 0, Medizin: 0, Okkultismus: 0, Politik: 0, Technologie: 0},
    },
    advantages: {
        disziplinen: [{name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}],
        hintergründe: [{name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}],
    },
    status: {
        bloodPotency: 1,
        hunger: 1,
        humanity: 7,
        // Gesundheit: je Box kann '', 'superficial', 'aggravated' sein
        gesundheit: Array(10).fill(''),
        // Willenskraft: gleiche Logik
        willenskraft: Array(6).fill(''),
    },
    extra: {erfahrung: ''},
    merits: [],
    flaws: [],
});
