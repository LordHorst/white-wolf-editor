import {SharedData} from "../../../data/sharedData";

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
    backgrounds: {
        "Einfluss": {
            levels: [
                "Mäßig einflussreich",
                "Gut vernetzt",
                "Bedeutende Position",
                "Große persönliche Macht",
                "Enormer globaler Einfluss"
            ]
        },
        "Gefolgsleute": {
            levels: [
                "Loyale Diener oder Begleiter: Ein/-e Gefolgsmann/-frau",
                "Loyale Diener oder Begleiter: Zwei Gefolgsleute",
                "Loyale Diener oder Begleiter: Drei Gefolgsleute",
                "Loyale Diener oder Begleiter: Vier Gefolgsleute",
                "Loyale Diener oder Begleiter: Fünf Gefolgsleute"
            ]
        },
        "Generation": {
            levels: [
                "12. Generation: 11 Blutpunkte, 1 pro Runde ausgebbar",
                "11. Generation: 12 Blutpunkte, 1 pro Runde",
                "10. Generation: 13 Blutpunkte, 1 pro Runde",
                "9. Generation: 14 Blutpunkte, 2 pro Runde",
                "8. Generation: 15 Blutpunkte, 3 pro Runde"
            ]
        },
        "Herde": {
            levels: [
                "3 Gefäße.",
                "7 Gefäße",
                "15 Gefäße",
                "30 Gefäße",
                "60 Gefäße"
            ]
        },
        "Kontakte": {
            levels: [
                "Einzelne, sporadische Quelle.",
                "Kleines Netzwerk, regelmäßige Informationen.",
                "Gutes Netzwerk, zuverlässige Quellen.",
                "Weitreichendes Netzwerk, Zugang zu Geheimnissen.",
                "Umfangreiches Netzwerk, praktisch alle relevanten Kreise."
            ]
        },
        "Mentor": {
            levels: [
                "Ein älterer Verbündeter, gibt gelegentlich Ratschläge.",
                "Verlässlicher Mentor, lehrt Fertigkeiten und gibt Aufträge.",
                "Mächtiger Beschützer, der oft für den Charakter eintritt.",
                "Einflussreiche Figur, die den Charakter unter ihre Fittiche nimmt.",
                "Legendärer Mentor, der fast alles für den Charakter tun würde."
            ]
        },
        "Ressourcen": {
            levels: [
                "Kleine Ersparnisse: eine kleine Wohnung und vielleicht ein Motorrad. Wenn alles veräußert würde, hättest du etwa 1.000€ in bar. Monatliches Budget: 500€.",
                "Mittelschicht: eine Wohnung oder Eigentumswohnung. Wenn alles veräußert würde, hättest du mindestens 8.000€ in bar. Monatliches Budget: 1.200€.",
                "Große Ersparnisse: ein Hausbesitzer oder jemand mit Eigenkapital. Wenn alles veräußert würde, hättest du mindestens 50.000€ in bar. Monatliches Budget: 3.000€.",
                "Wohlhabend: ein Mitglied der Oberschicht. Du besitzt ein sehr großes Haus oder vielleicht ein heruntergekommenes Herrenhaus. Wenn alles veräußert würde, hättest du mindestens 500.000€ in bar. Monatliches Budget: 9.000€.",
                "Unermesslich wohlhabend: ein Multimillionär. Dein Refugium ist kaum durch etwas anderes als deine Vorstellungskraft begrenzt. Wenn alles veräußert würde, hättest du mindestens 5.000.000€ in bar. Monatliches Budget: 30.000€."
            ]
        },
        "Ruhm": {
            levels: [
                "Du bist in einer bestimmten Subkultur der Stadt bekannt.",
                "Die Mehrheit erkennt dein Gesicht; du bist eine lokale Berühmtheit.",
                "Du bist landesweit bekannt.",
                "National berühmt.",
                "Internationales Medienidol."
            ]
        },
        "Status": {
            levels: [
                "Bekannt",
                "Respektiert",
                "Einflussreich",
                "Mächtig",
                "Führungsfigur"
            ]
        },
        "Verbündete": {
            levels: [
                "Ein älterer Verbündeter, gibt gelegentlich Ratschläge.",
                "Verlässlicher Mentor, lehrt Fertigkeiten und gibt Aufträge.",
                "Mächtiger Beschützer, der oft für den Charakter eintritt.",
                "Einflussreiche Figur, die den Charakter unter ihre Fittiche nimmt.",
                "Legendärer Mentor, der fast alles für den Charakter tun würde."
            ]
        }
    }
};

export const VampireMerits = [
    {name: "Essen", cost: 1, description: "Der Vampir kann Nahrung zu sich nehmen."},
    {name: "Verführerische Stimme", cost: 2, description: "Die Stimme des Charakters ist außergewöhnlich angenehm."},
    // ... weitere Vorteile
];

export const VampireFlaws = [
    {name: "Klein", cost: 1, description: "Der Charakter ist auffällig klein."},
    {name: "Monströses Aussehen", cost: 3, description: "Das Aussehen ist abschreckend und unvergesslich."},
    // ... weitere Nachteile
];

// Hilfsfunktion, um die Disziplinen eines Clans zu finden, egal in welcher Kategorie er steckt
export const getClanDisciplines = (clanName) => {
    for (const category in VampireData.clans) {
        if (VampireData.clans[category][clanName]) {
            return VampireData.clans[category][clanName];
        }
    }
    return [];
};