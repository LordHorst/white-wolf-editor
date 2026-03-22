// data/templates.js
export const getBaseAttributes = () => ({
    körperlich: { Körperkraft: 1, Geschick: 1, Widerstandsfähigkeit: 1 },
    gesellschaftlich: { Charisma: 1, Manipulation: 1, Erscheinungsbild: 1 },
    geistig: { Wahrnehmung: 1, Intelligenz: 1, Geistesschärfe: 1 }
});

// In VampireSheet.jsx
const getEmptyVampire = () => ({
    info: { Name: "", /* ... vampire spezifisch ... */ },
    attributes: getBaseAttributes(),
    // ... rest
});