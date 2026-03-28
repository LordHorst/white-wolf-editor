// systems/mage/data/mageFlaws.js
export const MageFlaws = [
    {
        name: "Klein",
        cost: 1,
        description: "Der Charakter ist auffällig klein (unter 1,40 m). Laufgeschwindigkeit halbiert, Reichweite bei Gegenständen eingeschränkt."
    },
    {
        name: "Monströses Aussehen",
        cost: 3,
        description: "Dein Aussehen ist abschreckend und unvergesslich. Schwierigkeiten für soziale Würfe +2, Aussehen kann nicht über 2 sein."
    },
    {
        name: "Schlechte Augen",
        cost: 1,
        description: "Deine Sehkraft ist beeinträchtigt. Schwierigkeiten für Würfe mit Sehen +2 (1 Punkt: korrigierbar; 3 Punkte: nicht korrigierbar).",
        stackable: true,
        maxStack: 3
    },
    {
        name: "Schwerhörig",
        cost: 1,
        description: "Dein Gehör ist beeinträchtigt. Schwierigkeiten für Würfe mit Hören +2."
    },
    {
        name: "Stumm",
        cost: 4,
        description: "Du kannst nicht sprechen. Kommunikation ist nur durch Schreiben oder Zeichensprache möglich."
    },
    {
        name: "Lahm",
        cost: 3,
        description: "Deine Beine sind beschädigt. Du kannst nicht rennen, gehst nur mit Stock oder Schienen. Gehgeschwindigkeit ein Viertel."
    },
    {
        name: "Krankheitsanfällig",
        cost: 2,
        description: "Du hast ein schwaches Immunsystem. Krankheiten treffen dich doppelt so hart."
    },
    {
        name: "Blutrausch",
        cost: 3,
        description: "Bei jeder Verwundung gerätst du in Raserei, es sei denn, du würfelst erfolgreich Willenskraft (Schw. 7)."
    },
    {
        name: "Jähzorn",
        cost: 2,
        description: "Du hast einen kurzen Geduldsfaden. Bei Provokation musst du Willenskraft würfeln, um nicht die Kontrolle zu verlieren."
    },
    {
        name: "Schüchtern",
        cost: 1,
        description: "Du fühlst dich bei Menschen unwohl. Schwierigkeiten für soziale Würfe bei Fremden +2; wenn du im Mittelpunkt stehst, +3."
    },
    {
        name: "Alpträume",
        cost: 1,
        description: "Du leidest unter schrecklichen Albträumen. Beim Erwachen musst du Willenskraft (Schw. 7) würfeln oder verlierst für diese Nacht einen Würfel auf alle Aktionen."
    },
    {
        name: "Phobie",
        cost: 2,
        description: "Du hast eine krankhafte Angst vor etwas (z.B. Spinnen, Höhen, Menschenmengen). Bei Begegnung Mutwurf nötig, sonst Flucht."
    },
    {
        name: "Schuldgefühle",
        cost: 1,
        description: "Eine alte Schuld lastet auf dir. Bei Konfrontation mit dem Thema erhältst du +2 Schwierigkeit auf alle Würfe."
    },
    {name: "Feind", cost: 2, description: "Du hast einen mächtigen Feind, der immer wieder versucht, dir zu schaden."},
    {
        name: "Berüchtigt",
        cost: 2,
        description: "Du hast einen schlechten Ruf unter Zauberern. Schwierigkeiten für soziale Proben mit Unbekannten +2."
    },
    {
        name: "Gelübde",
        cost: 2,
        description: "Du hast ein persönliches Gelübde abgelegt. Brichst du es, verlierst du 1 Punkt Weisheit oder Respekt."
    },
    {
        name: "Stigma",
        cost: 1,
        description: "Du trägst ein sichtbares Zeichen deiner Verbindung zur Magie (z.B. ungewöhnliche Augenfarbe, bleibende Narben). Bei Aufmerksamkeit kann dies deine Identität gefährden."
    },
    {
        name: "Anfällig für Paradox",
        cost: 3,
        description: "Paradox-Rückstände haften stärker an dir. Du erhältst +2 Schwierigkeit auf alle Würfe, um Paradox zu widerstehen."
    },
    {
        name: "Magischer Blinder",
        cost: 4,
        description: "Du kannst magische Energie nicht wahrnehmen. Du siehst keine Auren, spürst keine Quintessenz und kannst keine magischen Gegenstände identifizieren."
    },
    {
        name: "Gebrochener Avatar",
        cost: 5,
        description: "Dein Avatar ist beschädigt oder feindselig. Du erhältst nur die Hälfte der Quintessenz (abgerundet) und hast Schwierigkeiten, neue Erkenntnisse zu gewinnen."
    },
    {
        name: "Zauberzwang",
        cost: 3,
        description: "Du bist süchtig nach Magie. Wenn du längere Zeit keine Zauber wirkst, musst du Willenskraft würfeln oder erleidest Entzugserscheinungen (Erschwernis auf alle Würfe)."
    },
    {
        name: "Fokusabhängigkeit",
        cost: 2,
        description: "Du kannst ohne deinen magischen Fokus (Zauberstab, Amulett, etc.) keine Zauber wirken. Verlierst du ihn, bist du machtlos."
    },
    {
        name: "Lauter Zauber",
        cost: 1,
        description: "Deine Zauber sind ungewöhnlich auffällig. Sie erzeugen Geräusche, Lichtblitze oder andere Effekte, die Aufmerksamkeit erregen."
    },
    {
        name: "Verflucht",
        cost: 4,
        description: "Ein Fluch lastet auf dir. Du erhältst bei einer bestimmten Handlungsart (z.B. im Kampf, bei Heilung) +2 Schwierigkeit auf alle Proben."
    },
    {
        name: "Schwache Essenz",
        cost: 3,
        description: "Deine magische Essenz ist schwach. Du kannst höchstens 5 Punkte Quintessenz speichern, unabhängig von deiner Arete."
    }
];