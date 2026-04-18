import {
    distributePoints,
    randomChoice,
    randomInt,
    randomizeAbilities,
    randomizeAttributes,
    randomizeBackgrounds,
} from "../../utils/characterUtils";
import { getEmptyHunter5e, Hunter5eCreeds, getAllEdges } from "./hunter5eData";
import { SharedData } from "../../data/sharedData";
import { getPredefinedBackgrounds } from "./hunter5eHelpers";

export const randomizeCharacter = ({ setCharacter, freebie, showToast }) => {
    const creeds = Object.keys(Hunter5eCreeds);
    const randomCreed = randomChoice(creeds);
    const creedEdges = Hunter5eCreeds[randomCreed].edges;
    const randomName = `${randomChoice(SharedData.firstNames)} ${randomChoice(SharedData.lastNames)}`;

    // Attribute
    const newAttributes = randomizeAttributes(getEmptyHunter5e().attributes);

    // Fähigkeiten (13/9/5 Verteilung)
    const newAbilities = randomizeAbilities(getEmptyHunter5e().abilities);

    // Edges: 3 Punkte, bevorzugt aus dem Glaubenssatz
    let edgesList = creedEdges.map((name) => ({ name, value: 0 }));
    if (edgesList.length === 0) edgesList = [{ name: "", value: 0 }, { name: "", value: 0 }, { name: "", value: 0 }];
    const edgePoints = distributePoints(edgesList.map(() => 0), 3, 3);
    edgesList.forEach((e, i) => (e.value = edgePoints[i]));
    while (edgesList.length < 3) edgesList.push({ name: "", value: 0 });

    // Hintergründe
    const backgroundsList = randomizeBackgrounds(getPredefinedBackgrounds(), 5, 5);

    // Antrieb (zufälliger Satz)
    const drives = ["Räche meinen Bruder", "Beschütze die Unschuldigen", "Finde die Wahrheit", "Zerstöre die Monster"];
    const randomDrive = randomChoice(drives);

    // Willenskraft = Entschlossenheit (Attribut)
    const willpower = newAttributes.geistig.Entschlossenheit;

    // Gefahr & Verzweiflung zufällig (0‑2)
    const danger = randomInt(0, 2);
    const desperation = randomInt(0, 2);

    setCharacter({
        info: {
            Name: randomName,
            Spieler: "",
            Chronik: "",
            Creed: randomCreed,
            Konzept: randomChoice(SharedData.concepts || []),
            Ambition: "",
            Desire: "",
            Drive: randomDrive,
        },
        attributes: newAttributes,
        abilities: newAbilities,
        advantages: {
            edges: edgesList,
            hintergründe: backgroundsList,
            drive: randomDrive,
        },
        status: {
            gesundheit: JSON.parse(JSON.stringify(SharedData.initialHealthV5)),
            willenskraft: willpower,
            gefahr: danger,
            verzweiflung: desperation,
        },
        merits: [],
        flaws: [],
    });

    freebie.reset(15);
    freebie.setFreebiesActive(false);
    showToast("Zufälliger H5-Jäger erstellt!", "success");
};