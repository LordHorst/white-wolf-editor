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
    backgrounds: {
        "Arcane": {
            levels: [
                "Du verschmilzt mit der Masse.",
                "Leute vergessen dich leicht.",
                "Du bist schwer zu verfolgen",
                "Es gibt Bilder, Papiere und Aufzeichnungen von dir, und die Leute können sich immer noch nicht einigen, wie du eigentlich aussiehst",
                "In den Gedanken anderer Leute existierst du überhaupt nicht."
            ]
        },
        "Avatar": {
            levels: [
                "Darf 1 Punkt Quintessenz verwenden/regenerieren",
                "Darf 2 Punkte Quintessenz verwenden/regenerieren",
                "Darf 3 Punkte Quintessenz verwenden/regenerieren",
                "Darf 4 Punkte Quintessenz verwenden/regenerieren",
                "Darf 5 Punkte Quintessenz verwenden/regenerieren"
            ]
        },
        "Bibliothek": {
            levels: [
                "Eine Sammlung von New-Age-Taschenbüchern.",
                "Einige bemerkenswerte Werke und viel oberflächliches Material.",
                "Eine Handvoll seltener und alter Bücher sowie umfangreiche weltliche Quellen.",
                "Eine beeindruckende Sammlung okkulter und moralischer Lehren.",
                "Ein Hort verlorener Geheimnisse, ein Meer alltäglicher Weisheit.",
            ]
        },
        "Einfluss": {
            levels: [
                "Deine Freunde hören dir zu.",
                "Du hast viele lokale Verbündete, und du weißt, wen du anrufen musst.",
                "Du bist regional respektiert; die Leute fragen dich nach deiner Meinung.",
                "Deine Worte sind wie Gold auf nationaler Ebene.",
                "Du bist äußerst einflussreich auf globaler Ebene.",
            ]
        },
        "Kontakte": {
            levels: [
                "Ein Kontakt.",
                "Zwei Kontakte.",
                "Drei Kontakte.",
                "Vier Kontakte.",
                "Fünf Kontakte.",
            ]
        },
        "Mentor": {
            levels: [
                "Unwichtiger oder desinteressierter Mentor.",
                "Hilfreicher, aber exzentrischer Mentor.",
                "Guter und nobler Mentor.",
                "Weiser und respektierter Mentor.",
                "Mächtiger und einflussreicher Mentor.",
            ]
        },
        "Nest": {
            levels: [
                "1 Quintessenz/Woche",
                "2 Quintessenz/Woche",
                "3 Quintessenz/Woche",
                "4 Quintessenz/Woche",
                "5 Quintessenz/Woche"
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
        "Schicksal": {
            levels: [
                "Magus von Verdienst; würfle 1 Würfel",
                "Achtbarer Magus; würfle 2 Würfel",
                "Vielversprechender Magus; würfle 3 Würfel",
                "Angesehener Magus; würfle 4 Würfel",
                "Ehrwürdiger Magus; würfle 5 Würfel"
            ]
        },
        "Talisman": {
            levels: [
                "Ein schwaches Item -> Arete 1, Quintessenz 5",
                "Ein nützlicher Talisman -> Arete 2, Quintessenz 10",
                "Ein bedeutsames Item -> Arete 3, Quintessenz 15",
                "Ein berühmter und mächtiger Talisman -> Arete 4, Quintessenz 20",
                "Ein mächtiges magisches Objekt -> Arete 5, Quintessenz 25",
            ]
        },
        "Traum": {
            levels: [
                "Vage Informationsfragmente können gewonnen werden.",
                "Achtbare Lehren können gezogen werden.",
                "Wertvolles Wissen ist zugänglich.",
                "Bemerkenswertes Wissen kann erschlossen werden.",
                "Erstaunliche Erkenntnisse sind möglich."
            ]
        },
        "Verbündete": {
            levels: [
                "Ein Verbündeter mit moderatem Einfluss",
                "Zwei Verbündete, oder ein mächtigerer Verbündeter",
                "Drei Verbündete; oder weniger, dafür mächtigere Verbündete",
                "Vier Verbündete; oder weniger, dafür mächtigere Verbündete",
                "Fünf Verbündete; oder weniger, dafür mächtigere Verbündete"
            ]
        }
    }
};

// Helper to get sect list for an affiliation
export const getSectsForAffiliation = (affiliationName) => {
    const aff = MageData.affiliations.find(a => a.name === affiliationName);
    return aff ? aff.sects : [];
};

export const MageMerits = [
    {name: "Ausdauer", cost: 1, description: "Der Charakter ist außergewöhnlich ausdauernd."},
    {name: "Verführerische Stimme", cost: 2, description: "Die Stimme des Charakters ist außergewöhnlich angenehm."},
    // ... weitere Vorteile
];

export const MageFlaws = [
    {name: "Klein", cost: 1, description: "Der Charakter ist auffällig klein."},
    {name: "Monströses Aussehen", cost: 3, description: "Das Aussehen ist abschreckend und unvergesslich."},
    // ... weitere Nachteile
];