import {SharedData} from "../../data/sharedData";
import {WerewolfBackgrounds} from "./data/werewolfBackgrounds";
import {WerewolfGifts} from "./data/werewolfGifts";

export const getEmptyWerewolf = () => ({
    info: {
        Name: "",
        Spieler: "",
        Chronik: "",
        Abstammung: "",
        Vorzeichen: "",
        Stamm: "",
        Rudel: "",
        Totem: "",
        Konzept: "",
        Wesen: "",
        Verhalten: "",
    },
    attributes: {
        körperlich: {Körperkraft: 1, Geschick: 1, Widerstandsfähigkeit: 1},
        gesellschaftlich: {Charisma: 1, Manipulation: 1, Erscheinungsbild: 1},
        geistig: {Wahrnehmung: 1, Intelligenz: 1, Geistesschärfe: 1},
    },
    abilities: {
        talente: {
            Aufmerksamkeit: 0,
            Ausflüchte: 0,
            Ausweichen: 0,
            Einschüchtern: 0,
            Empathie: 0,
            Führungsqualitäten: 0,
            Handgemenge: 0,
            Instinkte: 0,
            Sportlichkeit: 0,
            Szenekenntnis: 0,
        },
        fertigkeiten: {
            Etikette: 0,
            Fahren: 0,
            Handwerk: 0,
            Heimlichkeit: 0,
            Nahkampf: 0,
            Schusswaffen: 0,
            Tierkunde: 0,
            Überleben: 0,
            Vortrag: 0,
        },
        kenntnisse: {
            Akademisches_Wissen: 0,
            Computer: 0,
            Enigmas: 0,
            Gesetzeskenntnis: 0,
            Linguistik: 0,
            Medizin: 0,
            Nachforschungen: 0,
            Naturwissenschaften: 0,
            Okkultismus: 0,
            Riten: 0,
        },
    },
    advantages: {
        gaben: {
            abstammung: "",
            vorzeichen: "",
            stamm: ""
        },
        hintergründe: [
            {name: "", value: 0},
            {name: "", value: 0},
            {name: "", value: 0},
            {name: "", value: 0},
            {name: "", value: 0},
        ],
        renown: {Ruhm: 0, Ehre: 0, Weisheit: 0},
    },
    status: {
        zorn: 1,
        gnosis: 1,
        willenskraft: 1,
        gesundheit: JSON.parse(JSON.stringify(SharedData.initialHealth)),
    },
    extra: {erfahrung: "", vorzügeSchwächen: []},
    merits: [],
    flaws: [],
});

export const TribeRestrictions = {
    "Stargazers": {
        restrictedBackgrounds: ["Ressourcen"]
    },
    // Weitere Stämme können hier ergänzt werden
};
export const WerewolfData = {
    tribes: ["Black Furies", "Bone Gnawers", "Children of Gaia", "Fianna", "Get of Fenris", "Glass Walkers", "Red Talons", "Shadow Lords", "Silent Striders", "Silver Fangs", "Stargazers", "Uktena", "Wendigo"],
    auspices: ["Ragabash", "Theurge", "Philodox", "Galliard", "Ahroun"],
    breeds: ["Homid", "Metis", "Lupus"],
    backgrounds: WerewolfBackgrounds,
    gifts: WerewolfGifts,
};

export const WerewolfMerits = [
    {name: "Adlerauge", cost: 1, description: "Der Charakter hat außergewöhnlich scharfe Augen und erhält einen Bonus von +2 auf alle Wahrnehmungswürfe, die das Sehen betreffen."},
    {name: "Doppelgelenkig", cost: 2, description: "Der Charakter ist außergewöhnlich beweglich und kann sich durch enge Öffnungen zwängen oder aus Fesseln befreien."},
    {name: "Eisenwille", cost: 2, description: "Der Charakter ist besonders widerstandsfähig gegen mentale Beeinflussung und erhält +2 auf alle Willenskraftwürfe zur Abwehr."},
    {name: "Eidetisches Gedächtnis", cost: 2, description: "Der Charakter kann sich an alles erinnern, was er je gesehen oder gehört hat."},
    {name: "Flinke Finger", cost: 1, description: "Der Charakter erhält einen Bonus von +2 auf Würfe, die Geschicklichkeit mit den Händen erfordern (z.B. Taschendiebstahl)."},
    {name: "Instinkt", cost: 2, description: "Der Charakter folgt seinen Eingebungen und erhält einen Bonus von +2 auf Würfe, die auf reinem Instinkt beruhen (z.B. Gefahren spüren)."},
    {name: "Lebensretter", cost: 3, description: "Der Charakter ist ein geborener Heiler. Jeder Versuch, eine andere Person medizinisch zu versorgen, erhält einen Bonus von +2."},
    {name: "Natürlicher Kämpfer", cost: 2, description: "Der Charakter beherrscht jede Kampftechnik intuitiv und erhält einen Bonus von +1 auf alle Kampfwürfe (Nahkampf, Handgemenge, Fernkampf)."},
    {name: "Sprachgenie", cost: 3, description: "Der Charakter lernt neue Sprachen in einem Viertel der normalen Zeit und spricht sie akzentfrei."},
    {name: "Überlebenskünstler", cost: 2, description: "Der Charakter findet in jeder Umgebung Nahrung und Unterschlupf; alle Überlebenswürfe erhalten einen Bonus von +2."},
    {name: "Vampirblut", cost: 2, description: "Das Blut des Charakters ist giftig für Vampire. Wer ihn beißt, erleidet sofort 2 Ebenen gehäuften Schadens."}
];

export const WerewolfFlaws = [
    {name: "Albtraum", cost: 2, description: "Der Charakter leidet unter schrecklichen Träumen, die ihn jede Nacht einen Punkt Willenskraft kosten, es sei denn, er würfelt erfolgreich (Schwierigkeit 7)."},
    {name: "Anfällig für Wahnsinn", cost: 4, description: "Bei Stress muss der Charakter Willenskraft würfeln (Schwierigkeit 8); bei Misserfolg erleidet er eine kurzzeitige Geisteskrankheit."},
    {name: "Arroganz", cost: 1, description: "Der Charakter hält sich für besser als andere und erleidet einen Malus von +2 auf alle gesellschaftlichen Proben mit Wesen, die er für geringer hält."},
    {name: "Berüchtigt", cost: 2, description: "Der Charakter hat einen schlechten Ruf unter den Garou und erhält einen Malus von +2 auf alle sozialen Proben mit Unbekannten."},
    {name: "Blutrausch", cost: 3, description: "Der Charakter gerät bei jeder Verwundung automatisch in Raserei, es sei denn, er würfelt erfolgreich Willenskraft (Schwierigkeit 7)."},
    {name: "Eifersucht", cost: 1, description: "Der Charakter erträgt keine Rivalen und muss bei Erfolgen anderer Willenskraft würfeln (Schwierigkeit 7), um nicht zu handeln."},
    {name: "Empfindlich gegen Silber", cost: 3, description: "Silber verursacht bei diesem Charakter bereits bei Berührung eine Ebene gehäuften Schadens pro Runde, auch in Homid-Form."},
    {name: "Feind", cost: 2, description: "Der Charakter hat einen mächtigen Feind, der immer wieder versucht, ihm zu schaden."},
    {name: "Geheimnisvoll", cost: 1, description: "Der Charakter wird von allen misstrauisch beäugt; er erhält einen Malus von +1 auf alle Proben, bei denen Vertrauen nötig ist."},
    {name: "Gelübde", cost: 2, description: "Der Charakter hat ein persönliches Gelübde abgelegt; bricht er es, verliert er 1 Punkt Ehre oder Weisheit."},
    {name: "Jähzorn", cost: 2, description: "Der Charakter hat einen kurzen Geduldsfaden. Bei Provokation muss er sofort Zorn würfeln, um nicht in Raserei zu verfallen."},
    {name: "Krankheitsanfällig", cost: 2, description: "Der Charakter hat ein geschwächtes Immunsystem und erleidet bei jeder Krankheit doppelte Auswirkungen."},
    {name: "Schuldgefühle", cost: 1, description: "Der Charakter wird von einer alten Schuld geplagt. Erhält bei Konfrontation mit dem Thema einen Malus von +2 auf alle Würfe."},
    {name: "Verflucht", cost: 4, description: "Ein Fluch lastet auf dem Charakter. Er erhält bei einer bestimmten Handlungsart (z.B. im Kampf) einen Malus von +2 auf alle Proben."}
];