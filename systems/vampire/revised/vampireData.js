import {SharedData} from "../../../data/sharedData";

export const getEmptyVampire = () => ({
    info: {
        Name: "",
        Spieler: "",
        Chronik: "",
        Wesen: "",
        Verhalten: "",
        Clan: "",
        Generation: "",
        Zuflucht: "",
        Konzept: ""
    },
    attributes: {
        körperlich: {Körperkraft: 1, Geschick: 1, Widerstandsfähigkeit: 1},
        gesellschaftlich: {Charisma: 1, Manipulation: 1, Erscheinungsbild: 1},
        geistig: {Wahrnehmung: 1, Intelligenz: 1, Geistesschärfe: 1}
    },
    abilities: {
        talente: {
            Ausdruck: 0,
            Aufmerksamkeit: 0,
            Ausflüchte: 0,
            Ausweichen: 0,
            Einschüchtern: 0,
            Empathie: 0,
            Führungsqualitäten: 0,
            Handgemenge: 0,
            Sportlichkeit: 0,
            Szenekenntnis: 0
        },
        fertigkeiten: {
            Etikette: 0,
            Fahren: 0,
            Handwerk: 0,
            Heimlichkeit: 0,
            Nahkampf: 0,
            Schusswaffen: 0,
            Sicherheit: 0,
            Tierkunde: 0,
            Überleben: 0,
            Vortrag: 0
        },
        kenntnisse: {
            Akademisches_Wissen: 0,
            Computer: 0,
            Finanzen: 0,
            Gesetzeskenntnis: 0,
            Linguistik: 0,
            Medizin: 0,
            Nachforschungen: 0,
            Naturwissenschaften: 0,
            Okkultismus: 0,
            Politik: 0
        }
    },
    advantages: {
        disziplinen: [{name: "", value: 0}, {name: "", value: 0}, {name: "", value: 0}],
        hintergründe: [{name: "", value: 0}, {name: "", value: 0}, {name: "", value: 0}, {
            name: "",
            value: 0
        }, {name: "", value: 0}],
        tugenden: {Gewissen: 1, Selbstbeherrschung: 1, Mut: 1}
    },
    status: {
        menschlichkeit: 2,
        willenskraft: 1,
        blutvorrat: 10,
        gesundheit: JSON.parse(JSON.stringify(SharedData.initialHealth))
    },
    extra: {erfahrung: "", vorzügeSchwächen: []},
    merits: [],
    flaws: []
});

export const VampireData = {
    clans: {
        "Camarilla": {
            "Brujah": ["Geschwindigkeit", "Stärke", "Präsenz"],
            "Gangrel": ["Tierhaftigkeit", "Seelenstärke", "Gestaltwandel"],
            "Malkavianer": ["Auspex", "Irrsinn", "Verdunkelung"],
            "Nosferatu": ["Tierhaftigkeit", "Verdunkelung", "Stärke"],
            "Toreador": ["Auspex", "Geschwindigkeit", "Präsenz"],
            "Tremere": ["Auspex", "Beherrschung", "Thaumaturgie"],
            "Ventrue": ["Beherrschung", "Präsenz", "Seelenstärke"]
        },
        "Sabbat": {
            "Lasombra": ["Beherrschung", "Schattenspiele", "Stärke"],
            "Tzimisce": ["Auspex", "Fleischformen", "Tierhaftigkeit"]
        },
        "Unabhängige": {
            "Assamiten": ["Geschwindigkeit", "Verdunkelung", "Quietus"],
            "Giovanni": ["Beherrschung", "Nekromantie", "Stärke"],
            "Jünger des Seth": ["Präsenz", "Serpentis", "Verdunkelung"],
            "Ravnos": ["Seelenstärke", "Schimären", "Tierhaftigkeit"]
        },
        "Sonstige": {
            "Caitiff": [], // Keine festen Disziplinen
            "Pander": []   // Keine festen Disziplinen (Sabbat)
        }
    },
    backgrounds: {
        "Einfluss": {
            levels: [
                "Mäßig einflussreich",
                "Gut vernetzt",
                "Bedeutende Position",
                "Große persönliche Macht",
                "Enormer globaler Einfluss"
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
        "Generation": {
            levels: [
                "12. Generation: 11 Blutpunkte, 1 pro Runde ausgebbar",
                "11. Generation: 12 Blutpunkte, 1 pro Runde",
                "10. Generation: 13 Blutpunkte, 1 pro Runde",
                "9. Generation: 14 Blutpunkte, 2 pro Runde",
                "8. Generation: 15 Blutpunkte, 3 pro Runde"
            ]
        },
        "Herde": {
            levels: [
                "3 Gefäße.",
                "7 Gefäße",
                "15 Gefäße",
                "30 Gefäße",
                "60 Gefäße"
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
        "Ressourcen": {
            levels: [
                "Kleine Ersparnisse: eine kleine Wohnung und vielleicht ein Motorrad. Wenn alles veräußert würde, hättest du etwa 1.000€ in bar. Monatliches Budget: 500€.",
                "Mittelschicht: eine Wohnung oder Eigentumswohnung. Wenn alles veräußert würde, hättest du mindestens 8.000€ in bar. Monatliches Budget: 1.200€.",
                "Große Ersparnisse: ein Hausbesitzer oder jemand mit Eigenkapital. Wenn alles veräußert würde, hättest du mindestens 50.000€ in bar. Monatliches Budget: 3.000€.",
                "Wohlhabend: ein Mitglied der Oberschicht. Du besitzt ein sehr großes Haus oder vielleicht ein heruntergekommenes Herrenhaus. Wenn alles veräußert würde, hättest du mindestens 500.000€ in bar. Monatliches Budget: 9.000€.",
                "Unermesslich wohlhabend: ein Multimillionär. Dein Refugium ist kaum durch etwas anderes als deine Vorstellungskraft begrenzt. Wenn alles veräußert würde, hättest du mindestens 5.000.000€ in bar. Monatliches Budget: 30.000€."
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
        "Verbündete": {
            levels: [
                "Ein älterer Verbündeter, gibt gelegentlich Ratschläge.",
                "Verlässlicher Mentor, lehrt Fertigkeiten und gibt Aufträge.",
                "Mächtiger Beschützer, der oft für den Charakter eintritt.",
                "Einflussreiche Figur, die den Charakter unter ihre Fittiche nimmt.",
                "Legendärer Mentor, der fast alles für den Charakter tun würde."
            ]
        }
    }
};

export const VampireMerits = [
    {
        name: "Acute Sense",
        cost: 1,
        description: "Einer Ihrer Sinne ist außergewöhnlich scharf (Sehen, Hören, Riechen, Schmecken, Tasten). Die Schwierigkeiten für alle Würfe mit diesem Sinn sinken um 2."
    },
    {
        name: "Ambidextrous",
        cost: 1,
        description: "Sie können die nicht-dominante Hand ohne Abzug benutzen. Sie müssen weiterhin die Regeln für mehrere Aktionen beachten, erhalten aber keinen Erschwernis-Abzug."
    },
    {
        name: "Blush of Health",
        cost: 2,
        description: "Sie wirken gesünder und lebendiger als andere Vampire und können sich leichter unter Menschen mischen. Ihre Haut fühlt sich nur leicht kühl an."
    },
    {
        name: "Catlike Balance",
        cost: 1,
        description: "Sie haben ein außergewöhnlich gutes Gleichgewicht. Die Schwierigkeiten für alle Würfe, die das Gleichgewicht betreffen (z.B. auf schmalen Vorsprüngen gehen), sinken um 2."
    },
    {
        name: "Code of Honor",
        cost: 2,
        description: "Sie halten sich an einen persönlichen Ehrenkodex. Wenn Sie nach diesem Kodex handeln oder versuchen, ihn nicht zu verletzen, erhalten Sie +2 Würfel auf Willenskraft- oder Tugendwürfe."
    },
    {
        name: "Common Sense",
        cost: 1,
        description: "Sie haben einen ausgeprägten praktischen Verstand. Der Spielleiter kann Sie warnen, wenn Ihre Figur etwas offensichtlich Unvernünftiges tun will."
    },
    {
        name: "Concentration",
        cost: 1,
        description: "Sie können sich trotz starker Ablenkung konzentrieren und erleiden keine Abzüge durch ablenkende Umstände (z.B. Lärm, Lichtblitze)."
    },
    {
        name: "Daredevil",
        cost: 3,
        description: "Sie gehen gerne Risiken ein und überleben sie oft. Bei besonders riskanten Aktionen (Schwierigkeit 8+, mindestens 3 Schadensstufen bei Misserfolg) erhalten Sie +3 Würfel und dürfen einen Patzer ignorieren."
    },
    {
        name: "Eat Food",
        cost: 1,
        description: "Sie können normale Nahrung zu sich nehmen und ihren Geschmack wahrnehmen, ohne sie verdauen zu müssen. Hilfreich für die Masquerade, aber Sie müssen die Nahrung später wieder erbrechen."
    },
    {
        name: "Efficient Digestion",
        cost: 3,
        description: "Sie ziehen mehr Nahrung aus Blut. Pro zwei konsumierte Blutpunkte erhalten Sie einen zusätzlichen Blutpunkt. Das Maximum bleibt unverändert."
    },
    {
        name: "Eidetic Memory",
        cost: 2,
        description: "Sie können sich an alles Gesehene und Gehörte perfekt erinnern."
    },
    {
        name: "Enchanting Voice",
        cost: 2,
        description: "Ihre Stimme ist außergewöhnlich angenehm. Schwierigkeiten für Würfe, bei denen Sie mit Ihrer Stimme überzeugen, bezaubern oder befehlen, sinken um 2."
    },
    {
        name: "Huge Size",
        cost: 4,
        description: "Sie sind überdurchschnittlich groß (mindestens 2,10 m und 140 kg). Sie erhalten eine zusätzliche Gesundheitsstufe (‚Blaues Auge‘) und Boni bei Kraftproben."
    },
    {
        name: "Iron Will",
        cost: 3,
        description: "Ihr Wille ist eisern. Gegen Dominate können Sie einen Willenskraftpunkt ausgeben, um den Effekt abzuschütteln. Sie erhalten +3 Würfel gegen alle geistbeeinflussenden Kräfte."
    },
    {
        name: "Light Sleeper",
        cost: 2,
        description: "Sie wachen bei Gefahr sofort auf, ohne Benommenheit. Die Einschränkungen durch Ihre Humanity/Path während des Tages entfallen für Sie."
    },
    {
        name: "Lucky",
        cost: 3,
        description: "Sie können bis zu drei misslungene Würfe pro Geschichte wiederholen (einschließlich Patzer), jedoch nur einmal pro Wurf."
    },
    {
        name: "Magic Resistance",
        cost: 2,
        description: "Sie sind gegen Thaumaturgie und andere Zauberei resistent. Die Schwierigkeit für alle Zauber gegen Sie ist um 2 erhöht. Sie können nie Thaumaturgie erlernen."
    },
    {
        name: "Medium",
        cost: 2,
        description: "Sie können Geister spüren, mit ihnen sprechen und sie herbeirufen. Sie können um Hilfe oder Rat bitten, aber es hat immer seinen Preis."
    },
    {
        name: "Natural Leader",
        cost: 1,
        description: "Andere folgen Ihnen instinktiv. Sie erhalten +2 Würfel bei Führungsproben. Sie benötigen Charisma 3+."
    },
    {
        name: "Natural Linguist",
        cost: 2,
        description: "Sie haben ein Talent für Sprachen. Sie erhalten +3 Würfel auf alle Würfe mit geschriebenen oder gesprochenen Sprachen."
    },
    {
        name: "Nine Lives",
        cost: 6,
        description: "Fate hat Ihnen neun Leben gegeben. Wenn ein Wurf zum Tode führen würde, wird er wiederholt – solange, bis Sie Erfolg haben oder alle neun Leben aufgebraucht sind."
    },
    {
        name: "Oracular Ability",
        cost: 3,
        description: "Sie können Zeichen und Omen deuten und daraus Ratschläge für die Zukunft ableiten. Der Spielleiter entscheidet, wann Sie ein Omen sehen."
    },
    {
        name: "Prestigious Sire",
        cost: 1,
        description: "Ihr Erzeuger hatte hohes Ansehen. Dies verschafft Ihnen Prestige, kann aber auch Neid oder Misstrauen hervorrufen."
    },
    {
        name: "Spirit Mentor",
        cost: 3,
        description: "Sie haben einen geistigen Begleiter, der Ihnen in schwierigen Situationen helfen kann. Art und Kräfte des Geistes bestimmt der Spielleiter."
    },
    {
        name: "Time Sense",
        cost: 1,
        description: "Sie haben ein perfektes Zeitgefühl und können ohne Uhr die Zeit genau schätzen."
    },
    {
        name: "True Faith",
        cost: 7,
        description: "Sie haben tiefen Glauben an Gott und erhalten einen Punkt True Faith (s. S. 272). Sie benötigen Humanity 9+ und verlieren den Glauben, wenn Sie Humanity verlieren."
    },
    {
        name: "True Love",
        cost: 4,
        description: "Sie haben eine wahre Liebe gefunden. Der Gedanke an sie gibt Ihnen Kraft: Sie erhalten einen automatischen Erfolg auf Willenskraftwürfe (außer bei Patzern). Sie müssen Ihre Liebe beschützen."
    },
    {name: "Unbondable", cost: 3, description: "Sie können nicht durch Blut gebunden werden."}
];

export const VampireFlaws = [
    {
        name: "Addiction",
        cost: 3,
        description: "Sie sind süchtig nach einer Substanz (Alkohol, Drogen, Adrenalin), die im Blut Ihrer Opfer vorhanden sein muss. Diese Substanz beeinträchtigt Sie."
    },
    {
        name: "Amnesia",
        cost: 2,
        description: "Sie können sich an nichts aus Ihrer Vergangenheit erinnern. Der Spielleiter bestimmt Ihre Vorgeschichte."
    },
    {
        name: "Bad Sight",
        cost: 1,
        description: "Ihr Sehvermögen ist beeinträchtigt. Schwierigkeiten für Würfe mit Sehen erhöhen sich um 2. (1 Punkt: korrigierbar; 3 Punkte: nicht korrigierbar).",
        stackable: true,
        maxStack: 3
    },
    {
        name: "Blind",
        cost: 6,
        description: "Sie sind blind. Schwierigkeiten für alle Geschicklichkeitswürfe erhöhen sich um 2. Sie können mit Auspex 2 trotzdem Auren wahrnehmen."
    },
    {
        name: "Can’t Cross Running Water",
        cost: 3,
        description: "Sie können fließendes Wasser nicht überqueren, es sei denn, Sie sind mindestens 15 m darüber. Fließendes Wasser = mindestens 60 cm breit und nicht völlig stehend."
    },
    {
        name: "Cast No Reflection",
        cost: 1,
        description: "Sie werfen keinen Schatten und spiegeln sich nicht. Dies kann die Masquerade gefährden. Lasombra können diesen Nachteil nicht wählen."
    },
    {
        name: "Child",
        cost: 3,
        description: "Sie wurden als kleines Kind (5–10 Jahre) zur Untoten. Sie können Stärke und Widerstandskraft nicht über 2 steigern (außer durch Blut). Schwierigkeiten für Führungsproben bei Erwachsenen +2. Sie müssen auch den Nachteil ‚Short‘ nehmen."
    },
    {
        name: "Conspicuous Consumption",
        cost: 4,
        description: "Sie müssen nicht nur Blut, sondern auch herz, Leber und andere blutreiche Organe Ihrer Opfer verzehren. Dies erfordert den Tod der Opfer und erschwert die Masquerade."
    },
    {
        name: "Cursed",
        cost: 1,
        description: "Sie sind verflucht. Je nach Stärke des Fluches z.B.:" +
            "1 - Wenn Sie ein Ihnen anvertrautes Geheimnis verraten, wird es irgendwann Nachteile für Sie geben" +
            "2 – Sie stottern unkontrollierbar, wenn Sie etwas beschreiben wollen, dass Sie gesehen oder gehört haben" +
            "3 – Werkzeuge versagen, wenn Sie versuchen, sie zu benutzen" +
            "4 – Sie sind dazu verdammt, sich aus geliebten Menschen irgendwann Feinde zu machen" +
            "5 – Jeder Ihrer Erfolge wird irgendwann zunichte gemacht.",
        stackable: true,
        maxStack: 5
    },
    {
        name: "Dark Fate",
        cost: 5,
        description: "Ihr Schicksal ist der endgültige Tod oder ewige Qual. Sie können dem nicht entkommen. Der Spielleiter bestimmt, wann es eintritt."
    },
    {
        name: "Dark Secret",
        cost: 1,
        description: "Sie haben ein dunkles Geheimnis, das Sie in der örtlichen Vampirgemeinschaft zum Ausgestoßenen machen würde."
    },
    {
        name: "Deaf",
        cost: 4,
        description: "Sie sind taub. Sie können Dominate ignorieren, aber Schwierigkeiten für Aufmerksamkeitswürfe erhöhen sich um 3."
    },
    {
        name: "Debt of Gratitude",
        cost: 1,
        description: "Ein älterer Vampir schuldet Ihnen Dankbarkeit." +
            "1 - eine kleine Gefälligkeit" +
            "2 - eine große Gefälligkeit" +
            "3 - er verdankt Ihnen seine Existenz.",
        stackable: true,
        maxStack: 3
    },
    {
        name: "Deep Sleeper",
        cost: 1,
        description: "Sie wachen nur schwer auf. Schwierigkeit für Erwachenswürfe während des Tages +2."
    },
    {
        name: "Deformity",
        cost: 3,
        description: "Sie haben eine körperliche Deformität (z.B. Buckel, verkrüppelter Arm), die Ihre Bewegung oder Interaktion beeinträchtigt. Der Spielleiter legt die Auswirkungen fest."
    },
    {
        name: "Disfigured",
        cost: 2,
        description: "Eine hässliche Entstellung macht Ihr Aussehen verstörend und einprägsam. Schwierigkeiten für soziale Würfe +2, Aussehen kann nicht über 2 sein."
    },
    {
        name: "Disease Carrier",
        cost: 4,
        description: "Ihr Blut trägt eine ansteckende, tödliche Krankheit (z.B. HIV). Andere Vampire, die Ihr Blut trinken, haben 10% Chance, ebenfalls Überträger zu werden."
    },
    {
        name: "Eerie Presence",
        cost: 2,
        description: "Menschen spüren unbewusst Ihre Untoten-Natur und sind unwohl. Schwierigkeiten für soziale Würfe bei Menschen +2."
    },
    {
        name: "Enemy",
        cost: 1,
        description: "Sie haben einen Feind (oder eine Gruppe), der Ihnen schaden will. Je höher die Punktzahl, desto mächtiger der Feind.",
        stackable: true,
        maxStack: 5
    },
    {
        name: "Flesh of the Corpse",
        cost: 5,
        description: "Ihr Fleisch heilt Narben nicht. Jede Wunde bleibt sichtbar, was soziale Interaktion erschwert."
    },
    {
        name: "Fourteenth Generation",
        cost: 2,
        description: "Sie sind der 14. Generation, wurden vor weniger als fünf Jahren erschaffen und haben nur 8 nutzbare Blutpunkte. Sie sind wahrscheinlich Caitiff."
    },
    {
        name: "Grip of the Damned",
        cost: 4,
        description: "Ihr Biss ist nicht ekstatisch, sondern schmerzhaft. Opfer schreien und wehren sich während des Fütterns. Bei hoher Humanity kann dies eine Degenerationsprobe erfordern."
    },
    {
        name: "Hard of Hearing",
        cost: 1,
        description: "Ihr Gehör ist beeinträchtigt. Schwierigkeiten für Würfe mit Hören +2."
    },
    {
        name: "Haunted",
        cost: 3,
        description: "Sie werden von einem wütenden, gequälten Geist heimgesucht (oft eines Ihrer ersten Opfer), der Sie bei der Jagd behindert."
    },
    {
        name: "Hunted",
        cost: 4,
        description: "Sie werden von einem fanatischen Hexenjäger verfolgt, der Sie für eine Gefahr für die Menschheit hält."
    },
    {
        name: "Infamous Sire",
        cost: 1,
        description: "Ihr Erzeuger war verhasst, und das überträgt sich auf Sie."
    },
    {
        name: "Infectious Bite",
        cost: 2,
        description: "Sie können Bisswunden nicht verschließen. Ihre Bisse entzünden sich oft (20% Chance) und machen die Opfer schwer krank."
    },
    {
        name: "Lame",
        cost: 3,
        description: "Ihre Beine sind beschädigt; Sie können nicht rennen und gehen nur mit Stock oder Schienen. Gehgeschwindigkeit ist ein Viertel normal."
    },
    {
        name: "Light-Sensitive",
        cost: 5,
        description: "Sie reagieren extrem auf Licht. Sonnenlicht verursacht doppelten Schaden, selbst Mondlicht kann tödlich sein."
    },
    {
        name: "Lunacy",
        cost: 2,
        description: "Die Mondphasen beeinflussen Ihre Raserei. Schwierigkeiten steigen mit zunehmendem Mond."
    },
    {
        name: "Mistaken Identity",
        cost: 1,
        description: "Sie werden oft mit einem anderen Vampir verwechselt, was zu unangenehmen Situationen führen kann."
    },
    {
        name: "Monstrous",
        cost: 3,
        description: "Ihre Gestalt ist während der Umarmung verzerrt worden. Sie sehen aus wie ein wildes Monster, Aussehen 0. Selbst Nosferatu haben Probleme mit Ihnen."
    },
    {
        name: "Mute",
        cost: 4,
        description: "Sie können nicht sprechen. Sie müssen schreiben oder Zeichensprache verwenden."
    },
    {
        name: "Nightmares",
        cost: 1,
        description: "Sie haben jede Nacht schreckliche Albträume. Beim Erwachen müssen Sie Willenskraft würfeln (Schw. 7) oder verlieren für diese Nacht einen Würfel auf alle Aktionen."
    },
    {
        name: "One Eye",
        cost: 2,
        description: "Sie haben nur ein Auge. Schwierigkeiten für Wahrnehmungswürfe mit Sehen +2, für Tiefenschätzung +1 (gilt für Fernkampf)."
    },
    {
        name: "Permanent Wound",
        cost: 3,
        description: "Eine Verletzung aus Ihrer Umarmung heilt nie ganz. Sie erwachen jede Nacht mit der Wunde ‚Verwundet‘, können sie aber mit Blut heilen."
    },
    {
        name: "Phobia",
        cost: 2,
        description: "Sie haben eine krankhafte Angst vor etwas (Spinnen, Höhen, Menschenmengen usw.). Bei Begegnung müssen Sie Mut würfeln oder fliehen."
    },
    {
        name: "Prey Exclusion",
        cost: 1,
        description: "Sie verweigern die Jagd auf eine bestimmte Gruppe (z.B. Kinder, Polizisten). Wenn Sie versehentlich auf ein solches Opfer stoßen, geraten Sie in Raserei und riskieren Humanity-Verlust."
    },
    {
        name: "Probationary Sect Member",
        cost: 4,
        description: "Sie sind ein Überläufer (z.B. von der Camarilla zur Sabbat) und müssen sich erst beweisen. Andere Vampire misstrauen Ihnen."
    },
    {
        name: "Repelled by Crosses",
        cost: 3,
        description: "Sie werden von Kreuzen abgestoßen. Bei Konfrontation mit einem Kreuz müssen Sie Willenskraft (Schw. 9) würfeln oder fliehen. Bei Berührung erleiden Sie gehäuften Schaden."
    },
    {
        name: "Repulsed by Garlic",
        cost: 1,
        description: "Sie können Knoblauch nicht ertragen. Schon der Geruch kann Sie vertreiben (Willenskraftwurf, Schw. je nach Intensität)."
    },
    {
        name: "Short",
        cost: 1,
        description: "Sie sind deutlich unterdurchschnittlich groß (unter 1,40 m). Sie haben Probleme, normale Gegenstände zu erreichen, und Ihre Laufgeschwindigkeit ist halbiert."
    },
    {
        name: "Short Fuse",
        cost: 2,
        description: "Sie sind leicht reizbar. Schwierigkeiten, Raserei zu vermeiden, sind um 2 höher. Brujah können diesen Nachteil nicht nehmen."
    },
    {
        name: "Shy",
        cost: 1,
        description: "Sie fühlen sich bei Menschen unwohl. Schwierigkeiten für soziale Würfe bei Fremden +2; wenn Sie im Mittelpunkt stehen, +3."
    },
    {name: "Sire’s Resentment", cost: 1, description: "Ihr Erzeuger hasst Sie und sucht Ihnen zu schaden."},
    {
        name: "Slow Healing",
        cost: 3,
        description: "Sie heilen langsam. Normale Wunden heilen mit 2 Blutpunkten pro Stufe, schwer heilbare Wunden heilen nur eine Stufe pro 5 Tage (zusätzlich Blut und Willenskraft)."
    },
    {
        name: "Smell of the Grave",
        cost: 1,
        description: "Sie riechen nach feuchter Erde. Parfüm kann den Geruch nicht überdecken. Menschen in Ihrer Nähe sind unwohl; Schwierigkeiten für soziale Würfe +1."
    },
    {
        name: "Soft-Hearted",
        cost: 1,
        description: "Sie können es nicht ertragen, andere leiden zu sehen. Wenn Sie Schmerz zufügen wollen, müssen Sie Willenskraft (Schw. 8) würfeln. Sie benötigen Humanity 7+."
    },
    {
        name: "Speech Impediment",
        cost: 1,
        description: "Sie haben einen Sprachfehler. Schwierigkeiten für verbale Kommunikation +2."
    },
    {
        name: "Territorial",
        cost: 2,
        description: "Sie beanspruchen ein Jagdgebiet und reagieren aggressiv auf Eindringlinge. Bei unbefugtem Betreten müssen Sie Raserei würfeln."
    },
    {
        name: "Thin Blood",
        cost: 4,
        description: "Ihr Blut ist sehr dünn. Alle Blutkosten sind verdoppelt, Sie können keine Blutbindung erzeugen und nur selten (20%) Nachkommen erschaffen."
    },
    {
        name: "Touch of Frost",
        cost: 1,
        description: "Pflanzen welken bei Ihrer Berührung. Sie entziehen Lebewesen Wärme."
    },
    {
        name: "Vengeful",
        cost: 2,
        description: "Sie haben eine offene Rechnung mit einer Person oder Gruppe. Wenn Sie dieser begegnen, müssen Sie sich rächen; Sie können für eine Szene einen Willenskraftpunkt ausgeben, um sich zu beherrschen."
    },
    {
        name: "Weak-Willed",
        cost: 3,
        description: "Sie sind leicht zu dominieren und zu beeindrucken. Dominate wirkt automatisch, es sei denn, der Anwender ist höherer Generation. Ihre Willenskraft kann nie über 4 steigen."
    }
];

// Hilfsfunktion, um die Disziplinen eines Clans zu finden, egal in welcher Kategorie er steckt
export const getClanDisciplines = (clanName) => {
    for (const category in VampireData.clans) {
        if (VampireData.clans[category][clanName]) {
            return VampireData.clans[category][clanName];
        }
    }
    return [];
};