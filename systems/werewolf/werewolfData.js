import {SharedData} from "../../data/sharedData";

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
    backgrounds: {
        "Ahnen": {
            levels: [
                "Du hast kurze, verschwommene Visionen aus ferner Vergangenheit.",
                "Du erinnerst dich an Gesichter und Orte aus früheren Leben wie an deine frühe Kindheit.",
                "Du kannst Namen mit deinen Ahnen verbinden.",
                "Deine Ahnen unterhalten sich regelmäßig mit dir.",
                "Deine Vorfahren verfolgen deine Abenteuer mit Interesse und kommen oft, um dir Rat zu geben."
            ]
        },
        "Blutsverwandte": {
            levels: [
                "Du hast Kontakt zu zwei Blutsverwandten (Kinfolk).",
                "Du hast Kontakt zu fünf Blutsverwandten.",
                "Du hast Kontakt zu zehn Blutsverwandten.",
                "Du hast Kontakt zu zwanzig Blutsverwandten.",
                "Du hast Kontakt zu fünfzig Blutsverwandten."
            ]
        },
        "Einfluss": {
            levels: [
                "Mäßig einflussreich",
                "Gut vernetzt",
                "Bedeutende Position",
                "Große persönliche Macht",
                "Enormer globaler Einfluss"
            ]
        },
        "Fetisch": {
            levels: [
                "Du besitzt einen Fetisch der Stufe 1.",
                "Du besitzt einen Fetisch der Stufe 2 oder zwei Fetische der Stufe 1.",
                "Du besitzt einen oder mehrere Fetische mit insgesamt drei Stufen.",
                "Du besitzt einen oder mehrere Fetische mit insgesamt vier Stufen.",
                "Du besitzt einen oder mehrere Fetische mit insgesamt fünf Stufen."
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
        "Reine Abstammung": {
            levels: [
                "Deine Abstammung ist rein – du hast die Augen deines Vaters und das heldenhafte Blut deiner Vorfahren.",
                "Dein Stammbaum ist gesegnet mit Säulen der Garou-Nation, und das Blut zeigt sich.",
                "Selbst als Bettler gekleidet, gebietest du Respekt.",
                "Die größten Helden leben in dir fort – deine Linie ist unübertroffen.",
                "Dein Blut ist so rein, dass selbst die Ahnen vor dir Ehrfurcht haben."
            ]
        },
        "Ressourcen": {
            levels: [
                "Kleine Ersparnisse: eine kleine Wohnung und vielleicht ein Motorrad. Wenn alles veräußert würde, hättest du etwa 1.000€ in bar. Monatliches Budget: 500€.",
                "Mittelschicht: eine Wohnung oder Eigentumswohnung. Wenn alles veräußert würde, hättest du mindestens 8.000€ in bar. Monatliches Budget: 1.200€.",
                "Große Ersparnisse: ein Hausbesitzer oder jemand mit Eigenkapital. Wenn alles veräußert würde, hättest du mindestens 50.000€ in bar. Monatliches Budget: 3.000€.",
                "Wohlhabend: ein Mitglied der Oberschicht. Du besitzt ein sehr großes Haus oder vielleicht ein heruntergekommenes Herrenhaus. Wenn alles veräußert würde, hättest du mindestens 500.000€ in bar. Monatliches Budget: 9.000€.",
                "Unermesslich wohlhabend: ein Multimillionär. Dein Refugium ist kaum durch etwas anderes als deine Vorstellungskraft begrenzt. Wenn alles veräußert würde, hättest du mindestens 5.000.000€ in bar. Monatliches Budget: 30.000€."
            ]
        },
        "Riten": {
            levels: [
                "Der Charakter kennt Riten im Gesamtwert von einer Stufe (z. B. einen Stufe-1-Ritus oder zwei Stufe-1-Riten).",
                "Der Charakter kennt Riten im Gesamtwert von zwei Stufen.",
                "Der Charakter kennt Riten im Gesamtwert von drei Stufen.",
                "Der Charakter kennt Riten im Gesamtwert von vier Stufen.",
                "Der Charakter kennt Riten im Gesamtwert von fünf Stufen."
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
        "Totem": {
            levels: [
                "Das Rudel hat einen Totem mit Basiswerten: drei Punkte für Zorn, Willenskraft oder Gnosis; die Kräfte ‚Airt Sense‘ und ‚Re-Form‘. Zusätzlich kann der Totem sprechen und das Rudel jederzeit finden.",
                "Wie Stufe 1, aber der Totem ist bei den Rudelmitgliedern fast immer anwesend.",
                "Wie Stufe 2, aber der Totem wird von anderen Geistern respektiert.",
                "Wie Stufe 3, aber der Totem kann seine Kräfte mehreren Rudelmitgliedern gleichzeitig gewähren.",
                "Wie Stufe 4, aber der Totem ist auf mystische Weise mit allen Rudelmitgliedern verbunden und ermöglicht Kommunikation über große Entfernungen; er wird von Dienern des Wyrm gefürchtet."
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
    // Umstrukturierte Gaben, die eine Auswahl nach Abstammung, Vorzeichen und Stamm ermöglichen
    gifts: {
        // Abstammungs-Gaben (Breed Gifts)
        breeds: {
            Homid: {
                1: [
                    {
                        name: "Master of Fire",
                        description: "Erlaubt es, Feuerschaden als Schlagschaden (bashing) zu heilen"
                    },
                    {
                        name: "Persuasion",
                        description: "Verleiht Argumenten mehr Glaubwürdigkeit und senkt die Schwierigkeit für gesellschaftliche Würfe"
                    },
                    {
                        name: "Smell of Man",
                        description: "Lässt Wildtiere nervös werden oder fliehen, während Haustiere den Werwolf als Meister anerkennen"
                    }
                ],
                2: [
                    {
                        name: "Jam Technology",
                        description: "Setzt technische Geräte in der Nähe vorübergehend außer Funktion"
                    },
                    {
                        name: "Staredown",
                        description: "Zwingt Menschen oder Tiere durch Blickkontakt zur Flucht; Werwölfe erstarren stattdessen"
                    }
                ],
                3: [
                    {
                        name: "Disquiet",
                        description: "Ruft beim Ziel Depressionen hervor und verhindert die Regeneration von Zorn"
                    },
                    {
                        name: "Reshape Object",
                        description: "Verwandelt ehemals lebendes Material (wie Holz oder Leder) sofort in andere Gegenstände"
                    }
                ],
                4: [
                    {
                        name: "Cocoon",
                        description: "Umhüllt den Werwolf mit einer schützenden Schicht, die ihn gegen Umweltgefahren wie Feuer oder Kälte immun macht"
                    },
                    {name: "Spirit Ward", description: "Erschafft ein Symbol, das Geister in der Umgebung schwächt"}
                ],
                5: [
                    {
                        name: "Assimilation",
                        description: "Ermöglicht es, sich perfekt in fremde Kulturen einzufügen und deren Sprache zu verstehen"
                    },
                    {name: "Part the Veil", description: "Macht einen Menschen für eine Szene immun gegen das Delirium"}
                ]
            },
            Metis: {
                1: [
                    {
                        name: "Create Element",
                        description: "Erzeugt kleine Mengen der vier Grundelemente (Luft, Erde, Feuer, Wasser)"
                    },
                    {
                        name: "Primal Anger",
                        description: "Der Werwolf opfert Gesundheit, um zusätzlichen Zorn zu gewinnen"
                    },
                    {name: "Sense Wyrm", description: "Spürt die Verderbnis des Wyrm in der Nähe auf"}
                ],
                2: [
                    {name: "Burrow", description: "Ermöglicht das Graben von Tunneln durch Erde oder Fels"},
                    {
                        name: "Curse of Hatred",
                        description: "Verringert Zorn und Willenskraft eines Gegners durch verbale Bösartigkeit"
                    }
                ],
                3: [
                    {name: "Eyes of the Cat", description: "Gewährt perfekte Sicht in absoluter Dunkelheit"},
                    {name: "Mental Speech", description: "Ermöglicht mentale Kommunikation über große Entfernungen"}
                ],
                4: [
                    {
                        name: "Gift of the Porcupine",
                        description: "Lässt das Fell stachelig und scharf wie das eines Stachelschweins werden"
                    },
                    {
                        name: "Wither Limb",
                        description: "Lässt ein Bein oder einen Arm eines Gegners austrocknen und unbrauchbar werden"
                    }
                ],
                5: [
                    {name: "Madness", description: "Ruft beim Ziel schweren Wahnsinn und Psychosen hervor"},
                    {name: "Totem Gift", description: "Bittet das Stammes-Totem direkt um eine mächtige Intervention"}
                ]
            },
            Lupus: {
                1: [
                    {name: "Hare’s Leap", description: "Verdoppelt die normale Sprungdistanz"},
                    {
                        name: "Heightened Senses",
                        description: "Schärft alle Sinne massiv und ermöglicht übermenschliche Wahrnehmungen (z. B. Spurenlesen durch Geruch)"
                    },
                    {
                        name: "Sense Prey",
                        description: "Hilft dabei, genug Beute zu finden, um ein ganzes Rudel zu ernähren"
                    }
                ],
                2: [
                    {
                        name: "Scent of Sight",
                        description: "Kompensiert den Verlust des Sehsinns vollständig durch den Geruchssinn"
                    },
                    {
                        name: "Sense the Unnatural",
                        description: "Spürt unnatürliche Wesen wie Vampire, Geister oder Magie auf"
                    }
                ],
                3: [
                    {
                        name: "Catfeet",
                        description: "Verleiht perfektes Gleichgewicht und Immunität gegen Stürze aus unter 30 Metern Höhe"
                    },
                    {
                        name: "Name the Spirit",
                        description: "Ermöglicht es, die Art und Stärke von Geistern in der Umbra zu erkennen"
                    }
                ],
                4: [
                    {
                        name: "Beast Life",
                        description: "Erlaubt die Kommunikation mit Wildtieren und das Befehlen dieser"
                    },
                    {
                        name: "Gnaw",
                        description: "Verstärkt den Kiefer so sehr, dass der Werwolf sich durch fast alles (auch Stahl) beißen kann"
                    }
                ],
                5: [
                    {
                        name: "Elemental Gift",
                        description: "Ruft einen mächtigen Elementargeist herbei, um die Elemente direkt zu kontrollieren"
                    },
                    {
                        name: "Song of the Great Beast",
                        description: "Beschwört eine uralte Kreatur (z. B. ein Mammut oder einen Säbelzahntiger) aus der Wildnis zur Hilfe"
                    }
                ]
            }
        },
        // Vorzeichen-Gaben (Auspice Gifts)
        auspices: {
            Ragabash: {
                1: [
                    {
                        name: "Blur of the Milky Eye",
                        description: "The Garou’s form becomes a shimmering blur, allowing him to pass unnoticed among others"
                    },
                    {
                        name: "Open Seal",
                        description: "The Garou can open nearly any sort of closed or locked physical device"
                    },
                    {
                        name: "Scent of Running Water",
                        description: "The Garou can mask her scent completely, making herself virtually impossible to track"
                    }
                ],
                2: [
                    {
                        name: "Blissful Ignorance",
                        description: "The Garou can become completely invisible to all senses, spirits or monitoring devices by remaining still"
                    },
                    {
                        name: "Sense of the Prey",
                        description: "The character can track down anyone, as long as they know anything about them"
                    },
                    {
                        name: "Taking the Forgotten",
                        description: "The Ragabash with this Gift can steal something from a target, and his victim will forget that she ever possessed the stolen item"
                    }
                ],
                3: [
                    {
                        name: "Gremlins",
                        description: "Kann technische Geräte durch Berührung zum Ausfall bringen; Erfolge bestimmen Schwere der Beschädigung, fünf Erfolge zerstören das Gerät dauerhaft."
                    },
                    {
                        name: "Open Moon Bridge",
                        description: "Öffnet eine Mondbrücke ohne Erlaubnis des Caern-Totems; maximale Entfernung 1000 Meilen."
                    }
                ],
                4: [
                    {
                        name: "Luna’s Blessing",
                        description: "Wenn der Mond sichtbar ist, verursacht Silber keine gehäuften Wunden; der Werwolf kann Silber wie Schlagschaden abwehren."
                    },
                    {
                        name: "Whelp Body",
                        description: "Verflucht einen Gegner, verringert dauerhaft einen körperlichen Attributspunkt pro Erfolg; kann nur einmal pro Gegner eingesetzt werden."
                    }
                ],
                5: [
                    {
                        name: "Thieving Talons of the Magpie",
                        description: "Stiehlt eine übernatürliche Fähigkeit eines Ziels; kann sie für eine Runde pro ausgegebenen Gnosis-Punkt nutzen."
                    },
                    {
                        name: "Thousand Forms",
                        description: "Verwandelt sich in jedes Tier zwischen Vogel und Bison und übernimmt dessen besondere Fähigkeiten; Schwierigkeit hängt von der Ähnlichkeit ab."
                    }
                ]
            },
            Theurge: {
                1: [
                    {
                        name: "Mother’s Touch",
                        description: "Heilt Wunden durch Handauflegen; pro Gnosis-Punkt ein Gesundheitslevel."
                    },
                    {name: "Sense Wyrm", description: "Spürt die Verderbnis des Wyrm in der Nähe auf."},
                    {name: "Spirit Speech", description: "Ermöglicht die Kommunikation mit Geistern."}
                ],
                2: [
                    {
                        name: "Command Spirit",
                        description: "Gibt einem Geist einfache Befehle; jeder Befehl kostet einen Willenskraft-Punkt."
                    },
                    {
                        name: "Name the Spirit",
                        description: "Erkennt Art und ungefähre Stärke (Zorn, Gnosis, Willenskraft) eines Geistes."
                    },
                    {
                        name: "Sight from Beyond",
                        description: "Erhält prophetische Visionen von drohenden Gefahren oder wichtigen Ereignissen, oft in symbolischer Form."
                    }
                ],
                3: [
                    {
                        name: "Exorcism",
                        description: "Vertreibt Geister aus Orten oder Gegenständen; erfordert drei Runden Konzentration."
                    },
                    {
                        name: "Pulse of the Invisible",
                        description: "Ständige Wahrnehmung der Geisterwelt; kann bei ausreichender Gnosis in die Umbra sehen."
                    }
                ],
                4: [
                    {
                        name: "Grasp the Beyond",
                        description: "Ermöglicht es, Gegenstände oder Wesen ohne vorherige Weihe in die Umbra mitzunehmen; Kosten nach Größe."
                    },
                    {
                        name: "Spirit Drain",
                        description: "Zieht Essenz aus einem Geist und wandelt alle zwei Punkte in temporäre Willenskraft um."
                    }
                ],
                5: [
                    {
                        name: "Feral Lobotomy",
                        description: "Zerstört dauerhaft die Intelligenz eines Ziels; kostet 2 Gnosis pro Punkt."
                    },
                    {
                        name: "Malleable Spirit",
                        description: "Verändert Form oder Zweck eines Geistes; Schwierigkeit je nach Änderung."
                    }
                ]
            },
            Philodox: {
                1: [
                    {name: "Resist Pain", description: "Ignoriert alle Wundmalusse für eine Szene."},
                    {
                        name: "Scent of the True Form",
                        description: "Erkennt die wahre Natur einer Person (Werwolf, Vampir, etc.) am Geruch."
                    },
                    {name: "Truth of Gaia", description: "Erkennt, ob jemand die Wahrheit sagt oder lügt."}
                ],
                2: [
                    {
                        name: "Call to Duty",
                        description: "Ruft einen Geist, dessen Name bekannt ist, und befiehlt ihm eine Aufgabe; kann auch alle freundlichen Geister in der Umgebung herbeirufen."
                    },
                    {
                        name: "King of the Beasts",
                        description: "Befiehlt einem einzelnen Tier absolute Loyalität; Schwierigkeit hängt von der Vertrautheit ab."
                    },
                    {
                        name: "Strength of Purpose",
                        description: "Stellt Willenskraft wieder her; pro zwei Erfolge ein Punkt."
                    }
                ],
                3: [
                    {
                        name: "Weak Arm",
                        description: "Analysiert die Kampfweise eines Gegners und erhält Bonuswürfel für Angriff und Schaden."
                    },
                    {
                        name: "Wisdom of the Ancient Ways",
                        description: "Meditiert, um auf Ahnenwissen zuzugreifen; Erfolge bestimmen Detailgrad."
                    }
                ],
                4: [
                    {
                        name: "Roll Over",
                        description: "Zwingt einen Gegner durch Willenskraft-Wettstreit zur Unterwerfung; Opfer kann nur handeln, wenn in unmittelbarer Gefahr."
                    },
                    {
                        name: "Scent of Beyond",
                        description: "Spürt einen vertrauten Ort (auch in der Umbra) aus der Ferne, als stünde man dort."
                    }
                ],
                5: [
                    {
                        name: "Geas",
                        description: "Belegt ein Ziel mit einem heiligen Eid, eine Aufgabe zu erfüllen; kann keine selbstmörderischen Befehle erzwingen."
                    },
                    {
                        name: "Wall of Granite",
                        description: "Beschwört eine Wand aus Erde, die sich mit dem Werwolf bewegt; bietet 10 Würfel Abwehr und hält 15 Gesundheitslevel aus."
                    }
                ]
            },
            Galliard: {
                1: [
                    {name: "Beast Speech", description: "Ermöglicht die Kommunikation mit Tieren."},
                    {
                        name: "Call of the Wyld",
                        description: "Verstärkt das Heulen, um andere Werwölfe zu erreichen oder zu inspirieren; Reichweite und Effekt hängen von Erfolgen ab."
                    },
                    {
                        name: "Mindspeak",
                        description: "Stellt telepathische Verbindung zu Sichtkontakt-Zielen her; kostet Willenskraft pro Ziel."
                    }
                ],
                2: [
                    {
                        name: "Call of the Wyrm",
                        description: "Lockt Wyrm-Kreaturen an; muss einen Willenskraft-Wettstreit gewinnen."
                    },
                    {
                        name: "Distractions",
                        description: "Lenkt mit Geräuschen ab, reduziert den Würfelpool des Ziels für eine Runde."
                    },
                    {
                        name: "Dreamspeak",
                        description: "Betritt die Träume eines bekannten Ziels und kann sie beeinflussen."
                    }
                ],
                3: [
                    {
                        name: "Eye of the Cobra",
                        description: "Zieht ein Ziel mit einem Blick an; drei Erfolge bringen es herbei."
                    },
                    {
                        name: "Song of Rage",
                        description: "Stürzt ein Ziel in Raserei (oder Wut); Dauer eine Runde pro Erfolg."
                    }
                ],
                4: [
                    {
                        name: "Bridge Walker",
                        description: "Erschafft eine persönliche Mondbrücke über Entfernung gleich Gnosis in Meilen; nicht durch Lunengeister geschützt."
                    },
                    {
                        name: "Shadows by the Firelight",
                        description: "Zwingt andere in eine interaktive Geschichte; auf Unwillige kostet es Gnosis und einen Widerstands-Wurf."
                    }
                ],
                5: [
                    {
                        name: "Fabric of the Mind",
                        description: "Erschafft ein Lebewesen aus der Vorstellung; jeder Erfolg gibt einen Punkt für Eigenschaften; kostet Gnosis pro Szene zum Erhalten."
                    },
                    {
                        name: "Head Games",
                        description: "Ändert die Emotionen eines Ziels nach Belieben; mehr Erfolge = stärkere Wirkung."
                    }
                ]
            },
            Ahroun: {
                1: [
                    {name: "Falling Touch", description: "Bringt einen Gegner durch Berührung zu Fall."},
                    {
                        name: "Inspiration",
                        description: "Verleiht allen Verbündeten (außer sich selbst) einen automatischen Erfolg auf Willenskraftwürfe in der Szene."
                    },
                    {
                        name: "Razor Claws",
                        description: "Schärft die Klauen für eine Szene; erhöht den Schaden um einen Würfel."
                    }
                ],
                2: [
                    {
                        name: "Sense Silver",
                        description: "Spürt Silber in der Nähe; drei Erfolge orten die genaue Position."
                    },
                    {
                        name: "Spirit of the Fray",
                        description: "Permanenter Bonus von +10 auf Initiative; kann für weitere +10 Gnosis ausgeben (aber dann keine Zorn-Aktionen)."
                    },
                    {name: "True Fear", description: "Schüchtert einen Gegner ein; eine Runde Untätigkeit pro Erfolg."}
                ],
                3: [
                    {
                        name: "Heart of Fury",
                        description: "Erhöht vorübergehend die Raserei-Schwierigkeit für die Szene; danach muss Willenskraft ausgegeben oder Raserei gewürfelt werden."
                    },
                    {
                        name: "Silver Claws",
                        description: "Klauen werden zu Silber, verursachen gehäuften Schaden; jede Runde automatischer Zorn-Punkt, Risiko der Raserei."
                    }
                ],
                4: [
                    {
                        name: "Clenched Jaw",
                        description: "Verriegelt den Biss; jeder weitere Biss automatisch, Gegner erleidet zusätzlichen Schaden beim Befreiungsversuch."
                    },
                    {
                        name: "Stoking Fury’s Furnace",
                        description: "Erhält Zorn zurück, wenn Schaden erlitten wird; kann einen Zorn pro Runde ausgeben, ohne ihn dauerhaft zu verlieren."
                    }
                ],
                5: [
                    {
                        name: "Kiss of Helios",
                        description: "Immun gegen natürliches Feuer; künstliches Feuer verursacht nur Viertel Schaden; flammende Angriffe verursachen +2 Würfel gehäuften Schaden."
                    },
                    {
                        name: "Strength of Will",
                        description: "Verleiht allen Verbündeten innerhalb von 30 Metern zusätzliche Willenskraft-Punkte für die Szene; ein Punkt pro Erfolg."
                    }
                ]
            }
        },
        // Stammes-Gaben (Tribe Gifts)
        tribes: {
            "Black Furies": {
                1: [
                    {
                        name: "Breath of the Wyld",
                        description: "Verleiht einem Lebewesen einen Schub an Vitalität; gibt einen Bonuswürfel auf geistige Proben, erschwert aber Zorn-Proben."
                    },
                    {name: "Heightened Senses", description: "Schärft alle Sinne massiv."},
                    {name: "Sense Wyrm", description: "Spürt die Verderbnis des Wyrm in der Nähe auf."}
                ],
                2: [
                    {
                        name: "Curse of Aeolus",
                        description: "Erzeugt dichten Nebel, den nur die Anwenderin durchdringen kann; Gegner haben erschwerte Wahrnehmung und verlieren einen Willenskraft-Würfel."
                    },
                    {
                        name: "Sense of the Prey",
                        description: "Ermöglicht es, jede Beute unfehlbar zu verfolgen, sobald man etwas über sie weiß."
                    }
                ],
                3: [
                    {
                        name: "Coup de Grace",
                        description: "Findet eine Schwachstelle im Gegner; der nächste erfolgreiche Angriff verursacht doppelten Schaden."
                    },
                    {
                        name: "Visceral Agony",
                        description: "Klauen werden giftig; Wundmalus des Gegners wird verdoppelt."
                    }
                ],
                4: [
                    {
                        name: "Body Wrack",
                        description: "Fügt einem Ziel lähmende Schmerzen zu; senkt dessen Würfelpool für eine Szene um einen pro Erfolg."
                    },
                    {
                        name: "Wasp Talons",
                        description: "Schleudert Klauen wie Geschosse; Reichweite wie Feuerwaffe; Klauen regenerieren nach einer Runde."
                    }
                ],
                5: [
                    {
                        name: "Thousand Forms",
                        description: "Verwandelt sich in jedes Tier zwischen Vogel und Bison und übernimmt dessen besondere Fähigkeiten."
                    },
                    {
                        name: "Wyld Warp",
                        description: "Ruft unberechenbare Wyld-Geister herbei, die meist nützliches Chaos stiften; Effekt hängt von Erfolgen ab."
                    }
                ]
            },
            "Bone Gnawers": {
                1: [
                    {
                        name: "Cooking",
                        description: "Verwandelt Abfall in essbaren Brei; Schwierigkeit je nach Ausgangsmaterial."
                    },
                    {
                        name: "Resist Toxin",
                        description: "Erhöht die Widerstandsfähigkeit gegen Gifte und Toxine für eine Szene."
                    },
                    {
                        name: "Tagalong",
                        description: "Wird für einen Tag vom Totem eines fremden Rudels oder Caerns als Mitglied akzeptiert."
                    }
                ],
                2: [
                    {
                        name: "Blissful Ignorance",
                        description: "Wird durch Regungslosigkeit unsichtbar; Erfolge erschweren das Entdecken."
                    },
                    {
                        name: "Odious Aroma",
                        description: "Verstärkt Körpergeruch; alle in 6 Metern erleiden -2 Würfel auf Aktionen."
                    },
                    {
                        name: "Friend In Need",
                        description: "Kann einem Rudel- oder Stammesmitglied Zorn, Willenskraft, Gaben oder Gesundheitslevel leihen; Risiko des dauerhaften Verlusts."
                    }
                ],
                3: [
                    {
                        name: "Reshape Object",
                        description: "Formt ehemals lebendes Material (Holz, Leder) in andere Gegenstände um."
                    },
                    {
                        name: "Attunement",
                        description: "Kommuniziert mit Stadtgeistern, um Informationen über das Gebiet zu erhalten; Erfolge bestimmen Genauigkeit."
                    }
                ],
                4: [
                    {
                        name: "Infest",
                        description: "Ruft eine Horde Ungeziefer herbei, die ein Gebäude überflutet; mehr Erfolge = größeres Chaos."
                    },
                    {
                        name: "Riot",
                        description: "Schürt in einer Stadt einen Aufruhr an; Erfolge bestimmen die betroffene Fläche."
                    }
                ],
                5: [
                    {
                        name: "Survivor",
                        description: "Gewährt Immunität gegen Hunger, Durst, extreme Temperaturen und natürliche Krankheiten/Gifte für einen Tag pro Erfolg; Wyrm-Gifte halb so wirksam."
                    }
                ]
            },
            "Children of Gaia": {
                1: [
                    {
                        name: "Mercy",
                        description: "Verwandelt allen eigenen Schaden in Schlagschaden, um Gegner nicht zu töten."
                    },
                    {name: "Mother’s Touch", description: "Heilt Wunden durch Handauflegen."},
                    {name: "Resist Pain", description: "Ignoriert alle Wundmalusse für eine Szene."}
                ],
                2: [
                    {
                        name: "Calm",
                        description: "Besänftigt Zorn; entfernt Zorn-Punkte oder beendet Raserei bei Kreaturen ohne Zorn."
                    },
                    {
                        name: "Luna’s Armor",
                        description: "Erhält Bonuswürfel für Abwehr (auch gegen Silber) für eine Szene."
                    },
                    {
                        name: "Dazzle",
                        description: "Überwältigt ein Ziel mit Gaias Liebe; es verharrt passiv für die Szene, es sei denn, es wird angegriffen."
                    }
                ],
                3: [
                    {
                        name: "Spirit Friend",
                        description: "Erleichtert den Umgang mit Geistern; gibt Bonuswürfel auf alle sozialen Proben mit ihnen."
                    },
                    {
                        name: "Beast Life",
                        description: "Kommuniziert mit Wildtieren und kann sie herbeirufen oder befehlen."
                    }
                ],
                4: [
                    {
                        name: "Strike the Air",
                        description: "Wird für einen Gegner unantastbar, kann aber selbst nicht angreifen; für jeden Gegner separate Aktivierung."
                    },
                    {
                        name: "Halo of the Sun",
                        description: "Umhüllt sich mit blendendem Sonnenlicht; Gegner werden geblendet, Nahkampfschaden erhöht, Vampire erleiden Sonnenschaden."
                    }
                ],
                5: [
                    {name: "The Living Wood", description: "Belebt Bäume in der Nähe; ein Baum pro Erfolg kämpft mit."}
                ]
            },
            "Fianna": {
                1: [
                    {
                        name: "Faerie Light",
                        description: "Erschafft ein schwebendes Licht, das einen kleinen Bereich erhellt."
                    },
                    {
                        name: "Persuasion",
                        description: "Verleiht Argumenten mehr Glaubwürdigkeit und senkt die Schwierigkeit für gesellschaftliche Würfe."
                    },
                    {
                        name: "Resist Toxin",
                        description: "Erhöht die Widerstandsfähigkeit gegen Gifte und Toxine für eine Szene."
                    }
                ],
                2: [
                    {
                        name: "Glib Tongue",
                        description: "Lässt Zuhörer hören, was sie hören wollen; erleichtert Überredung und Lügen."
                    },
                    {
                        name: "Howl of the Banshee",
                        description: "Schreckensgeheul; Hörer fliehen eine Runde pro Erfolg, Verbündete haben geringere Schwelle."
                    },
                    {name: "Dreamspeak", description: "Betritt und beeinflusst Träume bekannter Ziele."}
                ],
                3: [
                    {
                        name: "Faerie Kin",
                        description: "Ruft Feen zu Hilfe; mehr Gnosis und Erfolge erhöhen Anzahl und Macht."
                    },
                    {name: "Reshape Object", description: "Formt ehemals lebendes Material in andere Gegenstände um."}
                ],
                4: [
                    {
                        name: "Balor’s Gaze",
                        description: "Blick verursacht lähmende Schmerzen; Opfer erleiden -5 Würfel Malus, unabhängig von Gesundheitszustand."
                    },
                    {
                        name: "Phantasm",
                        description: "Erschafft eine komplexe Illusion mit allen Sinnen; Deckungsgrad hängt von Erfolgen ab."
                    }
                ],
                5: [
                    {
                        name: "Call the Hunt",
                        description: "Ruft den Jäger der keltischen Mythologie, um ein großes Übel zu jagen; einmal pro Monat, riskant."
                    },
                    {
                        name: "Gift of the Spriggan",
                        description: "Vergrößert sich bis zum Dreifachen oder schrumpft auf Welpengröße; Stärke steigt proportional."
                    }
                ]
            },
            "Get of Fenris": {
                1: [
                    {
                        name: "Razor Claws",
                        description: "Schärft die Klauen für eine Szene; erhöht den Schaden um einen Würfel."
                    },
                    {name: "Resist Pain", description: "Ignoriert alle Wundmalusse für eine Szene."},
                    {
                        name: "Visage of Fenris",
                        description: "Erscheint größer und furchteinflößender; verbessert soziale Proben bei Gleichrangigen, erschwert Initiative bei Feinden."
                    }
                ],
                2: [
                    {
                        name: "Halt the Coward’s Flight",
                        description: "Verlangsamt einen fliehenden Gegner um die Hälfte für die Szene."
                    },
                    {
                        name: "Snarl of the Predator",
                        description: "Schreckt einen Gegner ein; reduziert seinen Würfelpool für die nächste Runde."
                    }
                ],
                3: [
                    {name: "Might of Thor", description: "Verdoppelt Stärke für kurze Zeit, danach starke Schwächung."},
                    {
                        name: "Venom Blood",
                        description: "Blut wird zu giftiger Säure; Kontakt verursacht gehäuften Schaden."
                    }
                ],
                4: [
                    {
                        name: "Hero’s Stand",
                        description: "Verwurzelt sich mit der Erde, erhält Bonuswürfel auf körperliche Proben und ist unüberraschbar, kann sich aber nicht bewegen."
                    },
                    {
                        name: "Scream of Gaia",
                        description: "Schrei verursacht Schlagschaden und wirft alle in 15 Metern um."
                    }
                ],
                5: [
                    {
                        name: "Horde of Valhalla",
                        description: "Ruft Geisterwölfe; ein Wolf pro ausgegebenen Zorn- oder Gnosis-Punkt."
                    },
                    {
                        name: "Fenris’ Bite",
                        description: "Biss verstümmelt eine Gliedmaße, verursacht 3 automatische gehäufte Schadenspunkte und macht sie unbrauchbar; bei 5+ Erfolgen wird sie abgetrennt."
                    }
                ]
            },
            "Glass Walkers": {
                1: [
                    {
                        name: "Control Simple Machine",
                        description: "Befiehlt einfachen Maschinen (Hebel, Türen) für eine Szene."
                    },
                    {name: "Diagnostics", description: "Erkennt Fehler in Maschinen und repariert sie schneller."},
                    {
                        name: "Trick Shot",
                        description: "Ermöglicht Trickschüsse (z. B. Waffe aus der Hand schießen), ohne direkten Schaden zu verursachen."
                    }
                ],
                2: [
                    {
                        name: "Cybersenses",
                        description: "Ersetzt einen Sinn durch technisches Äquivalent (Radar, Infrarot) für eine Szene."
                    },
                    {name: "Power Surge", description: "Verursacht einen Stromausfall; Fläche abhängig von Erfolgen."}
                ],
                3: [
                    {
                        name: "Control Complex Machine",
                        description: "Befiehlt elektronischen Geräten (Computer, Autos) für eine Szene."
                    },
                    {
                        name: "Elemental Favor",
                        description: "Überredet ein urbanes Elementarwesen zu einem Gefallen (Glas zerbrechen, Tür blockieren etc.)."
                    }
                ],
                4: [
                    {
                        name: "Attunement",
                        description: "Kommuniziert mit Stadtgeistern, um Informationen über das Gebiet zu erhalten."
                    },
                    {
                        name: "Doppelganger",
                        description: "Nimmt exakt die Gestalt eines anderen Wesens an; hält einen Tag pro Erfolg."
                    }
                ],
                5: [
                    {
                        name: "Chaos Mechanics",
                        description: "Ermöglicht dauerhaft die gleichzeitige Nutzung von Zorn und Gnosis in einer Runde."
                    },
                    {
                        name: "Summon Net-Spider",
                        description: "Ruft einen Net-Spider zur Kontrolle eines Computersystems; halbiert alle Computer-Schwierigkeiten."
                    }
                ]
            },
            "Red Talons": {
                1: [
                    {name: "Beast Speech", description: "Ermöglicht die Kommunikation mit Tieren."},
                    {name: "Scent of Running Water", description: "Maskiert den eigenen Geruch vollständig."},
                    {
                        name: "Wolf at the Door",
                        description: "Flößt einem Menschen panische Angst vor der Wildnis ein; er meidet Wälder für einen Tag pro Erfolg."
                    }
                ],
                2: [
                    {
                        name: "Beastmind",
                        description: "Reduziert den Geist eines Ziels auf das eines wilden Tieres für eine Runde pro Erfolg."
                    },
                    {name: "Sense of the Prey", description: "Ermöglicht es, jede Beute unfehlbar zu verfolgen."}
                ],
                3: [
                    {
                        name: "Elemental Favor",
                        description: "Überredet ein natürliches Elementarwesen zu einem Gefallen."
                    },
                    {
                        name: "Trackless Waste",
                        description: "Verwirrt Menschen in einem Gebiet; sie verlieren die Orientierung; jeder Erfolg deckt zwei Meilen ab."
                    }
                ],
                4: [
                    {
                        name: "Gorge",
                        description: "Erlaubt, drei zusätzliche Punkte in Zorn, Gnosis oder Willenskraft zu speichern."
                    },
                    {
                        name: "Quicksand",
                        description: "Verwandelt Boden in Sumpf; Bewegung verlangsamt, Kampf erschwert."
                    }
                ],
                5: [
                    {
                        name: "Curse of Lycaon",
                        description: "Verwandelt Menschen dauerhaft in Wölfe; Werwölfe werden für die Szene in Lupus-Form gezwungen."
                    },
                    {
                        name: "Gaia’s Vengeance",
                        description: "Ruft Waldgeister, um Eindringlinge anzugreifen; Effekt hängt vom Gelände ab."
                    }
                ]
            },
            "Shadow Lords": {
                1: [
                    {
                        name: "Aura of Confidence",
                        description: "Projiziert Selbstvertrauen und Überlegenheit; erschwert Aura-Lesen und Gedankenlesen."
                    },
                    {
                        name: "Fatal Flaw",
                        description: "Erkennt eine Schwäche des Ziels; gewinnt einen Bonuswürfel für Schaden."
                    },
                    {
                        name: "Seizing the Edge",
                        description: "Bei Gleichstand in Widerstandsproben gewinnt der Shadow Lord; hält eine Szene."
                    }
                ],
                2: [
                    {name: "Clap of Thunder", description: "Donnerschlag betäubt alle in 3 Metern für eine Runde."},
                    {
                        name: "Luna’s Armor",
                        description: "Erhält Bonuswürfel für Abwehr (auch gegen Silber) für eine Szene."
                    }
                ],
                3: [
                    {
                        name: "Direct the Storm",
                        description: "Lenkt die Raserei eines Werwolfs auf selbstgewählte Ziele."
                    },
                    {name: "Paralyzing Stare", description: "Lähmt einen Gegner für eine Runde pro Erfolg."}
                ],
                4: [
                    {
                        name: "Open Wounds",
                        description: "Eine Wunde blutet stark; verursacht eine Runde lang einen gehäuften Schadenspunkt pro Erfolg."
                    },
                    {
                        name: "Strength of the Dominator",
                        description: "Entzieht einem Ziel Zorn und fügt ihn dem eigenen Vorrat hinzu."
                    }
                ],
                5: [
                    {
                        name: "Obedience",
                        description: "Zwingt andere zum Gehorsam; mehr Erfolge erlauben gefährlichere Befehle."
                    },
                    {
                        name: "Shadow Pack",
                        description: "Erschafft Schattendubletten des Werwolfs, die für eine Szene kämpfen."
                    }
                ]
            },
            "Silent Striders": {
                1: [
                    {name: "Sense Wyrm", description: "Spürt die Verderbnis des Wyrm in der Nähe auf."},
                    {name: "Silence", description: "Dämpft alle eigenen Geräusche für eine Szene."},
                    {name: "Speed of Thought", description: "Verdoppelt die Laufgeschwindigkeit für eine Szene."}
                ],
                2: [
                    {name: "Blissful Ignorance", description: "Wird durch Regungslosigkeit unsichtbar."},
                    {
                        name: "Messenger’s Fortitude",
                        description: "Kann drei Tage ohne Unterbrechung rennen, muss danach drei Tage schlafen."
                    }
                ],
                3: [
                    {
                        name: "Adaptation",
                        description: "Immun gegen Umwelteinflüsse, Gifte und Krankheiten für eine Stunde pro Erfolg."
                    },
                    {name: "Great Leap", description: "Springt bis zu 30 Meter pro Erfolg."}
                ],
                4: [
                    {
                        name: "Attunement",
                        description: "Kommuniziert mit Stadt- oder Wildnisgeistern, um Informationen zu erhalten."
                    },
                    {
                        name: "Speed Beyond Thought",
                        description: "Läuft mit zehnfacher Geschwindigkeit bis zu acht Stunden; muss danach sofort essen."
                    }
                ],
                5: [
                    {
                        name: "Gate of the Moon",
                        description: "Erschafft eine sofortige Mondbrücke; kostet 1 Gnosis pro 160 km; benötigt sichtbares Mondlicht."
                    },
                    {
                        name: "Reach the Umbra",
                        description: "Kann jederzeit ohne Probe in die Umbra treten; alle Proben zum Betreten/Verlassen haben -2 Schwierigkeit."
                    }
                ]
            },
            "Silver Fangs": {
                1: [
                    {
                        name: "Falcon’s Grasp",
                        description: "Verstärkt Griff (Hände oder Kiefer) um drei Stärkepunkte für die Szene."
                    },
                    {
                        name: "Lambent Flame",
                        description: "Körper leuchtet silbern; erschwert Nahkampf-Angriffe, erleichtert Fernkampf."
                    },
                    {name: "Sense Wyrm", description: "Spürt die Verderbnis des Wyrm in der Nähe auf."}
                ],
                2: [
                    {
                        name: "Empathy",
                        description: "Erkennt die Wünsche der Mehrheit; mehr Erfolge offenbaren verborgene Wünsche."
                    },
                    {
                        name: "Luna’s Armor",
                        description: "Erhält Bonuswürfel für Abwehr (auch gegen Silber) für eine Szene."
                    }
                ],
                3: [
                    {name: "Silver Claws", description: "Klauen werden zu Silber, verursachen gehäuften Schaden."},
                    {
                        name: "Wrath of Gaia",
                        description: "Überwältigt Wyrm-Diener mit Schrecken; sie müssen Willenskraft würfeln oder fliehen."
                    }
                ],
                4: [
                    {
                        name: "Mastery",
                        description: "Befiehlt einem anderen Werwolf (auch Schwarzspiralen) eine nicht selbstmörderische Aktion."
                    },
                    {
                        name: "Mindblock",
                        description: "Erhöht dauerhaft die Schwierigkeit für mentale Angriffe und Kontrolle auf 10."
                    }
                ],
                5: [
                    {
                        name: "Luna’s Avenger",
                        description: "Körper wird zu lebendem Silber; immun gegen Silber, Angriffe verursachen gehäuften, nicht abwehrbaren Schaden."
                    },
                    {
                        name: "Paws of the Newborn Cub",
                        description: "Entzieht einem Gegner alle übernatürlichen Fähigkeiten für eine Runde pro Erfolg."
                    }
                ]
            },
            "Uktena": {
                1: [
                    {name: "Sense Magic", description: "Erkennt magische Energien in der Nähe."},
                    {
                        name: "Shroud",
                        description: "Erzeugt ein Feld absoluter Dunkelheit, durch das nur der Uktena sehen kann."
                    },
                    {name: "Spirit Speech", description: "Ermöglicht die Kommunikation mit Geistern."}
                ],
                2: [
                    {name: "Spirit of the Bird", description: "Ermöglicht Fliegen mit 30 km/h für eine Stunde."},
                    {
                        name: "Spirit of the Fish",
                        description: "Ermöglicht Unterwasseratmung und Schwimmen in Hispo-Geschwindigkeit für eine Stunde pro Erfolg."
                    }
                ],
                3: [
                    {
                        name: "Banish Totem",
                        description: "Blockiert die Kräfte eines Rudel-Totems und die Rudeltaktiken für eine Szene."
                    },
                    {name: "Invisibility", description: "Wird unsichtbar, kann sich aber nur halb so schnell bewegen."}
                ],
                4: [
                    {name: "Call Elemental", description: "Ruft ein Elementarwesen zur Hilfe; zwei Proben nötig."},
                    {name: "Hand of the Earth Lords", description: "Bewegt Gegenstände bis 450 kg telekinetisch."}
                ],
                5: [
                    {name: "Fabric of the Mind", description: "Erschafft ein Lebewesen aus der Vorstellung."},
                    {
                        name: "Fetish Doll",
                        description: "Erschafft eine Puppe, die mit einem Ziel verbunden ist; jeder Erfolg fügt einen gehäuften Schadenspunkt zu."
                    }
                ]
            },
            "Wendigo": {
                1: [
                    {
                        name: "Call the Breeze",
                        description: "Ruft einen starken, kalten Wind; stört Wahrnehmung und vertreibt Gase."
                    },
                    {name: "Camouflage", description: "Erschwert das Entdecken in der Wildnis um +3 Schwierigkeit."},
                    {name: "Resist Pain", description: "Ignoriert alle Wundmalusse für eine Szene."}
                ],
                2: [
                    {
                        name: "Cutting Wind",
                        description: "Blast einen eisigen Wind; trifft Gegner mit Würfelmalus und kann sie umwerfen."
                    },
                    {
                        name: "Speak with Wind Spirits",
                        description: "Stellt eine Frage an Windgeister über die unmittelbare Umgebung."
                    }
                ],
                3: [
                    {
                        name: "Bloody Feast",
                        description: "Erhält vorübergehend Stärke durch Beißen; pro zwei zugefügte Gesundheitslevel ein Stärkepunkt."
                    },
                    {name: "Wisdom of the Ancient Ways", description: "Meditiert, um auf Ahnenwissen zuzugreifen."}
                ],
                4: [
                    {
                        name: "Call the Cannibal Spirit",
                        description: "Ruft Wendigo, um ein Ziel zu jagen; benötigt einen Teil des Ziels."
                    },
                    {
                        name: "Chill of Early Frost",
                        description: "Lässt die Temperatur in einer Region unter den Gefrierpunkt fallen; Wesen ohne Fell erleiden Würfelmalus."
                    }
                ],
                5: [
                    {
                        name: "Invoke the Spirits of the Storm",
                        description: "Ruft Unwetter (Tornado, Blizzard etc.) über 16 km pro Erfolg; kann Blitze herbeirufen."
                    },
                    {
                        name: "Heart of Ice",
                        description: "Verflucht ein Ziel mit innerem Eis; pro Erfolg ein gehäufter Schadenspunkt pro Runde."
                    }
                ]
            },
            "Stargazers": {
                1: [
                    {
                        name: "Balance",
                        description: "Ermöglicht das Gehen auf jeder schmalen oder rutschigen Oberfläche ohne Probe."
                    },
                    {name: "Falling Touch", description: "Bringt einen Gegner durch Berührung zu Fall."},
                    {name: "Sense Wyrm", description: "Spürt die Verderbnis des Wyrm in der Nähe auf."}
                ],
                2: [
                    {name: "Inner Strength", description: "Wandelt Zorn in Willenskraft um; pro Erfolg ein Punkt."},
                    {
                        name: "Surface Attunement",
                        description: "Geht auf schwierigen Untergründen (Schlamm, Wasser, Schnee) ohne Spuren zu hinterlassen."
                    }
                ],
                3: [
                    {
                        name: "Clarity",
                        description: "Sieht durch Dunkelheit, Nebel und Illusionen; Widerstandsprobe gegen Illusionen."
                    },
                    {
                        name: "Merciful Blow",
                        description: "Schaltet einen Gegner ohne Schaden aus; kann für eine Runde oder die ganze Szene lähmen."
                    }
                ],
                4: [
                    {
                        name: "Preternatural Awareness",
                        description: "Erhöhte Wahrnehmung senkt die Angriffswürfel aller Gegner für die Szene."
                    },
                    {
                        name: "Strike the Air",
                        description: "Wird für einen Gegner unantastbar, kann aber selbst nicht angreifen."
                    }
                ],
                5: [
                    {
                        name: "Circular Attack",
                        description: "Lenkt Angriffe mehrerer Gegner auf sie selbst um; jeder Erfolg leitet einen Angriff um."
                    },
                    {
                        name: "Wisdom of the Seer",
                        description: "Erhält eine Antwort auf eine einfache Frage durch Sterndeutung; Klarheit hängt von Erfolgen ab."
                    }
                ]
            }
        }
    }
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