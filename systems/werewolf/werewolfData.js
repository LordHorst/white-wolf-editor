export const WerewolfData = {
    tribes: ["Black Furies", "Bone Gnawers", "Children of Gaia", "Fianna", "Get of Fenris", "Glass Walkers", "Red Talons", "Shadow Lords", "Silent Striders", "Silver Fangs", "Stargazers", "Uktena", "Wendigo"],
    auspices: ["Ragabash", "Theurge", "Philodox", "Galliard", "Ahroun"],
    breeds: ["Homid", "Metis", "Lupus"],
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

export const WerewolfMerits = [
    { name: "Ausdauer", cost: 1, description: "Der Charakter ist außergewöhnlich ausdauernd." },
    { name: "Verführerische Stimme", cost: 2, description: "Die Stimme des Charakters ist außergewöhnlich angenehm." },
    // ... weitere Vorteile
];

export const WerewolfFlaws = [
    { name: "Klein", cost: 1, description: "Der Charakter ist auffällig klein." },
    { name: "Monströses Aussehen", cost: 3, description: "Das Aussehen ist abschreckend und unvergesslich." },
    // ... weitere Nachteile
];