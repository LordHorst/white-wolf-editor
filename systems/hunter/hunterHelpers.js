import { HunterBackgrounds } from "./hunterData";

/** Sum of all Edge dots */
export const sumEdges = (edges) => edges.reduce((sum, e) => sum + e.value, 0);

/** Sum of all Virtues */
export const sumVirtues = (virtues) => Object.values(virtues).reduce((sum, v) => sum + v, 0);

/** All predefined backgrounds (keys) */
export const getPredefinedBackgrounds = () =>
    HunterBackgrounds ? Object.keys(HunterBackgrounds) : [];

/** Minimum Willpower = Courage */
export const minWillpower = (virtues) => virtues.Mut;

/** Minimum Conviction? (no strict min, but we can keep it >=1) */
export const minConviction = () => 1;

/** Health levels array (used for display) */
export const healthLevels = [
    "Gesund",
    "Blaues Auge",
    "Verwundet",
    "Schwer verwundet",
    "Gekrüppelt",
    "Handlungsunfähig",
];