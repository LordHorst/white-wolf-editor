import { Hunter5eBackgrounds } from "./hunter5eData";

export const sumEdges = (edges) => edges.reduce((sum, e) => sum + e.value, 0);
export const sumBackgrounds = (bg) => bg.reduce((sum, b) => sum + b.value, 0);

export const getPredefinedBackgrounds = () =>
    Hunter5eBackgrounds ? Object.keys(Hunter5eBackgrounds) : [];

// minimale Willenskraft = Entschlossenheit
export const minWillpower = (attributes) => attributes.geistig.Entschlossenheit;

// Gesundheitsstufen für V5 (6 Stufen)
export const healthLevels = [
    "Gesund",
    "Leicht verwundet",
    "Mäßig verwundet",
    "Schwer verwundet",
    "Handlungsunfähig",
    "Tod",
];