export const SharedData = {
  firstNames: ["Viktor", "Elena", "Julian", "Sophia", "Marcus", "Clara", "Dimitri", "Isabel", "Arthur", "Lilith"],
  lastNames: ["Vane", "Dragos", "Blackwood", "Holloway", "Moretti", "Crowley", "Sterling", "Nightshade", "Petrov"],
  concepts: ["Außenseiter", "Drifter", "Gefallener Adeliger", "Künstler", "Okultist", "Privatdetektiv", "Söldner", "Gelehrter"],
  natures: ["Architekt", "Autokrat", "Einzelgänger", "Fanatiker", "Kapitalist", "Kind", "Rebell", "Überlebender", "Visionär"],
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
        "Kleine Ersparnisse: eine kleine Wohnung und vielleicht ein Motorrad. Wenn alles veräußert würde, hättest du etwa 1.000 $ in bar. Monatliches Budget: 500€.",
        "Mittelschicht: eine Wohnung oder Eigentumswohnung. Wenn alles veräußert würde, hättest du mindestens 8.000 $ in bar. Monatliches Budget: 1.200€.",
        "Große Ersparnisse: ein Hausbesitzer oder jemand mit Eigenkapital. Wenn alles veräußert würde, hättest du mindestens 50.000 $ in bar. Monatliches Budget: 3.000€.",
        "Wohlhabend: ein Mitglied der Oberschicht. Du besitzt ein sehr großes Haus oder vielleicht ein heruntergekommenes Herrenhaus. Wenn alles veräußert würde, hättest du mindestens 500.000 $ in bar. Monatliches Budget: 9.000€.",
        "Unermesslich wohlhabend: ein Multimillionär. Dein Refugium ist kaum durch etwas anderes als deine Vorstellungskraft begrenzt. Wenn alles veräußert würde, hättest du mindestens 5.000.000 $ in bar. Monatliches Budget: 30.000€."
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
  },
  initialHealth: [
    { label: "Blaue Flecken", penalty: 0, checked: false },
    { label: "Verletzt", penalty: -1, checked: false },
    { label: "Schwer Verletzt", penalty: -1, checked: false },
    { label: "Verwundet", penalty: -2, checked: false },
    { label: "Schwer Verwundet", penalty: -2, checked: false },
    { label: "Verkrüppelt", penalty: -5, checked: false },
    { label: "Außer Gefecht", penalty: "X", checked: false }
  ]
};

// ---------------- VAMPIRE DATA ---------------------------
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


// ---------------- WEREWOLF DATA ---------------------------
export const WerewolfData = {
  tribes: ["Black Furies", "Bone Gnawers", "Children of Gaia", "Fianna", "Get of Fenris", "Glass Walkers", "Red Talons", "Shadow Lords", "Silent Striders", "Silver Fangs", "Stargazers", "Uktena", "Wendigo"],
  auspices: ["Ragabash", "Theurge", "Philodox", "Galliard", "Ahroun"],
  breeds: ["Homid", "Metis", "Lupus"]
};

// ---------------- MAGE DATA ---------------------------
export const MageData = {
  traditions: ["Akashic Brotherhood", "Celestial Chorus", "Cult of Ecstasy", "Dreamspeakers", "Euthanatos", "Order of Hermes", "Sons of Ether", "Verbena", "Virtual Adepts"],
  essences: ["Dynamisch", "Muster", "Primordial", "Suchend"],
  spheres: ["Entropie", "Geist", "Kräfte", "Leben", "Materie", "Gedanken", "Kern", "Verbindung", "Zeit"]
};