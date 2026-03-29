const archetypes = ["Abenteurer", "Abweichler", "Architekt", "Autokrat", "Büßer", "Einzelgänger", "Fanatiker", "Fürsorger", "Griesgram", "Handlanger", "Intrigant", "Kavalier", "Kind", "Konformist",
    "Lebemann/-frau", "Leiter", "Masochist", "Märtyrer", "Monster", "Pädagoge", "Perfektionist", "Rebell", "Richter", "Ritualist", "Schurke", "Traditionalist", "Trickbetrüger", "Überlebender",
    "Visionär", "Wettkämpfer"
];

export const SharedData = {
    firstNames: [
        "Viktor", "Elena", "Julian", "Sophia", "Marcus", "Clara", "Dimitri", "Isabel", "Arthur", "Lilith", "Aleksandr", "Anya", "Mikhail", "Tatiana", "Nikolai", "Giovanni", "Lorenzo", "Francesca", "Alessia",
        "Jean", "Lucien", "Camille", "Élodie", "Hassan", "Layla", "Omar", "Samira", "Arjun", "Priya", "Ravi", "Anika", "Kenji", "Yuki", "Hiroshi", "Aiko", "Wei", "Mei", "Jian", "Xiao", "Santiago", "Lucia",
        "Mateo", "Valeria", "Kwame", "Amara", "Jabari", "Zola", "Erik", "Freya", "Lars", "Ingrid", "Hans", "Friedrich", "Johann", "Klaus", "Heinrich", "Anna", "Greta", "Liesel", "Marlene", "Ursula"
    ],
    lastNames: [
        "Vane", "Dragos", "Blackwood", "Holloway", "Moretti", "Crowley", "Sterling", "Nightshade", "Petrov", "Ivanov", "Volkov", "Kuznetsov", "Ricci", "Romano", "De Luca", "Dubois", "Lefevre", "Moreau",
        "Al-Farsi", "Haddad", "Nasser", "Sharma", "Patel", "Singh", "Tanaka", "Sato", "Kobayashi", "Li", "Wang", "Zhang", "Garcia", "Martinez", "Rojas", "Okafor", "Diallo", "Mensah", "Andersson", "Johansson",
        "Bjornsen", "Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Wagner", "Becker", "Hoffmann", "Schäfer", "Koch"
    ],
    demeanors: archetypes,
    natures: archetypes,
    concepts: ["Abgehalfterter Rockstar", "Korrupter Staatsanwalt", "Straßenphilosoph", "Ehemaliger Kultführer", "Besessener Kunstsammler", "Untergrund-DJ", "Verstoßene Adelige",
        "Fanatischer Jäger, der selbst zum Vampir wurde", "Eiskalter Investmentbanker", "Verlassene Waisenhausleiterin", "Zynischer Kriegsreporter", "Okkulter Buchhändler", "Gescheiterter Revolutionär",
        "Influencer mit dunklem Geheimnis", "Paranoider Verschwörungstheoretiker", "Eleganter Kunstdieb", "Medizinischer Ethiker ohne Moral", "Ex-Polizist auf Rachefeldzug", "Theaterregisseur mit Gottkomplex",
        "Nachtclubbesitzer mit Verbindungen zur Unterwelt"
    ],
    initialHealth: [
        {label: "Blaue Flecken", penalty: 0, checked: false},
        {label: "Verletzt", penalty: -1, checked: false},
        {label: "Schwer Verletzt", penalty: -1, checked: false},
        {label: "Verwundet", penalty: -2, checked: false},
        {label: "Schwer Verwundet", penalty: -2, checked: false},
        {label: "Verkrüppelt", penalty: -5, checked: false},
        {label: "Außer Gefecht", penalty: "X", checked: false}
    ]
};