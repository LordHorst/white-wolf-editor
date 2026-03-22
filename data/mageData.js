export const MageData = {
    affiliations: [
        { name: "Traditionen", sects: ["Akashayana", "Himmelschor", "Kult der Ekstase", "Traumsprecher", "Euthanatos", "Orden des Hermes", "Gesellschaft des Äthers", "Verbena", "Virtuelle Adepten"] },
        { name: "Technokratische Union", sects: ["Iteration X", "Neue Weltordnung", "Progenitoren", "Syndikat", "Leeren-Ingenieure"] },
        { name: "Disparaten", sects: ["Ahl-i-Batin", "Bata’a", "Kinder des Wissens", "Hollow Ones", "Kopa Loei", "Ngoma", "Waisen", "Schwestern von Hippolyta", "Taftâni", "Tempelritter", "Wu Lung"] }
    ],
    essences: ["Dynamisch", "Muster", "Primordial", "Suchend"],
    spheres: ["Korrespondenz", "Entropie", "Kräfte", "Leben", "Materie", "Gedanken", "Ursprung", "Geister", "Zeit"]
};

// Helper to get sect list for an affiliation
export const getSectsForAffiliation = (affiliationName) => {
    const aff = MageData.affiliations.find(a => a.name === affiliationName);
    return aff ? aff.sects : [];
};

export const MageMerits = [
    { name: "Ausdauer", cost: 1, description: "Der Charakter ist außergewöhnlich ausdauernd." },
    { name: "Verführerische Stimme", cost: 2, description: "Die Stimme des Charakters ist außergewöhnlich angenehm." },
    // ... weitere Vorteile
];

export const MageFlaws = [
    { name: "Klein", cost: 1, description: "Der Charakter ist auffällig klein." },
    { name: "Monströses Aussehen", cost: 3, description: "Das Aussehen ist abschreckend und unvergesslich." },
    // ... weitere Nachteile
];