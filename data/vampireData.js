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
    }
};

export const VampireMerits = [
    { name: "Essen", cost: 1, description: "Der Vampir kann Nahrung zu sich nehmen." },
    { name: "Verführerische Stimme", cost: 2, description: "Die Stimme des Charakters ist außergewöhnlich angenehm." },
    // ... weitere Vorteile
];

export const VampireFlaws = [
    { name: "Klein", cost: 1, description: "Der Charakter ist auffällig klein." },
    { name: "Monströses Aussehen", cost: 3, description: "Das Aussehen ist abschreckend und unvergesslich." },
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