import {
    distributePoints,
    randomChoice,
    randomInt,
    randomizeAbilities,
    randomizeAttributes,
    randomizeBackgrounds,
} from "../../utils/characterUtils";
import { getEmptyHunter, HunterCreeds, getCreedEdges } from "./hunterData";
import { SharedData } from "../../data/sharedData";
import { getPredefinedBackgrounds } from "./hunterHelpers";

export const randomizeCharacter = ({ setCharacter, freebie, showToast }) => {
    const creeds = Object.keys(HunterCreeds);
    const randomCreed = randomChoice(creeds);
    const creedEdges = getCreedEdges(randomCreed);
    const randomName = `${randomChoice(SharedData.firstNames)} ${randomChoice(SharedData.lastNames)}`;

    // Attributes
    const newAttributes = randomizeAttributes(getEmptyHunter().attributes);

    // Abilities
    const newAbilities = randomizeAbilities(getEmptyHunter().abilities);

    // Edges: 3 points distributed among creed edges (or empty slots)
    let edgesList = creedEdges.map((name) => ({ name, value: 0 }));
    if (edgesList.length === 0) edgesList = [{ name: "", value: 0 }, { name: "", value: 0 }, { name: "", value: 0 }];
    const edgePoints = distributePoints(edgesList.map(() => 0), 3, 3);
    edgesList.forEach((e, i) => (e.value = edgePoints[i]));
    while (edgesList.length < 3) edgesList.push({ name: "", value: 0 });

    // Backgrounds
    const backgroundsList = randomizeBackgrounds(getPredefinedBackgrounds(), 5, 5);

    // Virtues: start with 1 each, 7 extra points (max 5 per virtue)
    const extraVirtues = distributePoints([0, 0, 0], 7, 4);
    const newVirtues = {
        Überzeugung: 1 + extraVirtues[0],
        Selbstbeherrschung: 1 + extraVirtues[1],
        Mut: 1 + extraVirtues[2],
    };

    // Willpower = Courage
    const willpower = newVirtues.Mut;
    // Conviction random (1–10 but typical start 3–5)
    const conviction = randomInt(3, 7);

    setCharacter({
        info: {
            Name: randomName,
            Spieler: "",
            Chronik: "",
            Creed: randomCreed,
            Nature: randomChoice(SharedData.natures || []),
            Demeanor: randomChoice(SharedData.demeanors || []),
            Konzept: randomChoice(SharedData.concepts || []),
            Zuflucht: "",
        },
        attributes: newAttributes,
        abilities: newAbilities,
        advantages: {
            edges: edgesList,
            hintergründe: backgroundsList,
            tugenden: newVirtues,
        },
        status: {
            gesundheit: JSON.parse(JSON.stringify(SharedData.initialHealth)),
            willenskraft: willpower,
            überzeugung: conviction,
        },
        extra: { erfahrung: "", vorzügeSchwächen: [] },
        merits: [],
        flaws: [],
    });

    freebie.reset(15);
    freebie.setFreebiesActive(false);
    showToast("Zufälliger Jäger erstellt!", "success");
};