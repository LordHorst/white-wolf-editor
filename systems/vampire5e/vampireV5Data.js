// systems/vampire5e/vampireV5Data.js

export const VampireV5Data = {
    clans: [
        'Banu Haqim', 'Brujah', 'Gangrel', 'Hecata', 'Lasombra',
        'Malkavian', 'Ministry', 'Nosferatu', 'Ravnos', 'Salubri',
        'Toreador', 'Tremere', 'Tzimisce', 'Ventrue', 'Caitiff', 'Thin-Blood',
    ],
    predatorTypes: [
        'Alleycat', 'Bagger', 'Blood Leech', 'Cleaver', 'Consensualist',
        'Farmer', 'Osiris', 'Sandman', 'Scene Queen', 'Siren',
    ],
    disciplines: [
        'Animalism', 'Auspex', 'Blood Sorcery', 'Celerity', 'Dominate',
        'Fortitude', 'Obfuscate', 'Oblivion', 'Potence', 'Presence',
        'Protean', 'Alchemy', 'Rituals',
    ],
};

export const VampireV5Merits = [
    { name: 'Schöne Gesichtszüge', cost: 1, description: '+1 Würfel auf sozialen Würfen.' },
    { name: 'Kontakte',            cost: 1, description: 'Informationsnetzwerk in einem Bereich.', stackable: true, maxStack: 5 },
];

export const VampireV5Flaws = [
    { name: 'Feind',  cost: 1, description: 'Jemand will dir schaden.' },
    { name: 'Sucht',  cost: 1, description: 'Abhängigkeit von einer Substanz oder einem Verhalten.' },
];
