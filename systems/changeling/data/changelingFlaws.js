// systems/changeling/changelingFlaws.js
export const ChangelingFlaws = [
    // Physische Nachteile
    {name: "Blaue Haut (Blue Skin)", cost: 1, description: "Deine Haut hat einen bläulichen Schimmer, der dich in der Menschenwelt auffällig macht. Soziale Proben mit Sterblichen erhalten +1 Erschwernis, es sei denn, du verbirgst die Verfärbung."},
    {name: "Ebenholzaugen (Ebony Eyes)", cost: 1, description: "Deine Augen sind tiefschwarz, ohne erkennbare Iris. Dies ist beunruhigend für Sterbliche (+1 Erschwernis auf soziale Proben), kann aber bei anderen Feen Respekt einflößen."},
    {name: "Elfenohren (Eldritch Ears)", cost: 1, description: "Deine Ohren sind spitz und ungewöhnlich lang. Du kannst sie nur schwer verbergen (+1 Erschwernis auf Verkleidungsproben), dein Gehör ist jedoch leicht geschärft."},
    {name: "Fae-Riesenwuchs (Eldritch Giantism)", cost: 2, description: "Du bist ungewöhnlich groß, selbst für einen Wechselbalg. Dies macht es schwer, unauffällig zu bleiben (+1 Erschwernis auf Heimlichkeitsproben), verschafft dir aber Respekt bei anderen Feen."},
    {name: "Surreale Qualität (Surreal Quality)", cost: 2, description: "An dir ist etwas faszinierend Seltsames. Menschen fühlen sich zu dir hingezogen, selbst wenn du unauffällig sein willst. Du wirst oft angesprochen oder ausgewählt, was die Aufrechterhaltung der Tarnung erschwert."},

    // Geistige Nachteile
    {name: "Zungenschlag des Barden (Bard's Tongue)", cost: 1, description: "Du neigst dazu, die Wahrheit zu sagen, selbst wenn es unklug ist. Bei Versuchen zu lügen oder Geheimnisse zu bewahren, erhältst du +1 Erschwernis."},
    {name: "Verlorener Horizont (Lost Horizon)", cost: 3, description: "Du bist von einer Sehnsucht nach fernen Orten erfüllt, die du nie finden kannst. Du erhältst +1 Erschwernis auf Konzentrationsproben und leidest unter Heimweh, das dich in fremden Umgebungen benachteiligt."},
    {name: "Urteilsfreudig (Judgmental)", cost: 2, description: "Du neigst dazu, vorschnell über andere zu urteilen. Bei sozialen Proben mit Personen, die du bereits verurteilt hast, erhältst du +1 Erschwernis, wenn du sie um Hilfe bittest."},
    {name: "Zwangs-Zähler (Compulsive Counter)", cost: 2, description: "Du hast den Zwang, Dinge zu zählen – Treppenstufen, Muster, Gegenstände. In stressigen Situationen musst du Willenskraft (Schw. 6) würfeln, sonst verbringst du eine Runde mit Zählen."},

    // Übernatürliche Nachteile
    {name: "Dunkles Schicksal (Darklings Fate)", cost: 5, description: "Ein dunkles Schicksal lastet auf dir. Der Spielleiter kann deine Schicksalswürfe manipulieren, und du erhältst bei wichtigen Entscheidungen +1 Erschwernis. Dieses Schicksal ist unausweichlich."},
    {name: "Schreckliche Mara (Dreadful Mara)", cost: 4, description: "Deine Träume werden von einem Albtraumwesen heimgesucht. Jede Nacht musst du Willenskraft (Schw. 7) würfeln, sonst verlierst du einen Glamour-Punkt und erwachst erschöpft."},
    {name: "Geächtet (Nemesis)", cost: 5, description: "Du hast einen mächtigen Feind, der dir nach dem Leben trachtet – möglicherweise ein Mitglied des Schattenhofs, ein Dauntain oder ein rivalisierendes Hausmitglied."},
    {name: "Spielerische Schatten (Playful Shadows)", cost: 1, description: "Schatten um dich herum bewegen sich manchmal eigenständig. Dies ist unheimlich für Sterbliche (+1 Erschwernis auf Heimlichkeit bei Tageslicht) und kann Aufmerksamkeit erregen."},
    {name: "Aufsässige Schatten (Rebellious Shadows)", cost: 1, description: "Deine Schatten gehorchen dir nicht immer. Bei Versuchen, dich zu verstecken oder unbemerkt zu bleiben, erhältst du +1 Erschwernis, besonders bei hellem Licht."},
    {name: "Wilde Schattenkräfte (Wild Tenebrations)", cost: 2, description: "Wenn du bei einer schattenbezogenen oder magischen Probe patzt, muss der Spieler Willenskraft (Schw. 6) würfeln. Bei Misserfolg entsteht ein unkontrollierter, chaotischer Effekt (z. B. Milch gerinnt, Lichter flackern, Computer stürzen ab)."},
    {name: "Verfluchtes Blut (Tainted Blood)", cost: 2, description: "Das Blut übernatürlicher Wesen, das du konsumierst, hinterlässt eine Spur. Bei Heimlichkeits- oder Tarnungsversuchen erhältst du +2 Erschwernis."},
    {name: "Analphabet (Illiterate)", cost: 1, description: "Du kannst weder lesen noch schreiben. Dies kann in der modernen Welt zu erheblichen Problemen führen. (1 Punkt: vorübergehend; 2 Punkte: dauerhaft aufgrund einer Behinderung)."},
    {name: "Geheiligte Geräusche (Echoes of the Bell)", cost: 4, description: "Der Klang von Kirchenglocken oder religiöser Musik (Gesang, Gebete) verursacht bei dir Angst. Du musst bei solchen Geräuschen Mut (Schw. 6) würfeln, sonst fliehst du."},
    {name: "Fluch der Sidhe (Sidhe's Curse)", cost: 4, description: "Du bist anfälliger für Banality als andere Wechselbälge. Du kannst Banality wie ein normaler Wechselbalg sammeln, und bei 10 permanenten Banality stirbt deine Feenseele – du verlierst alle fae-Fähigkeiten."},
    {name: "Geas (Geasa)", cost: 1, description: "Du stehst unter einem heiligen Eid oder einer Verpflichtung. Je nach Schwere des Gelübdes (1 Punkt für kleine Einschränkungen, 5 Punkte für lebensbestimmende Verpflichtungen) kann der Bruch schwerwiegende Folgen haben."},
    {name: "Leichtgewicht (Lightweight)", cost: 1, description: "Alkohol und andere Drogen wirken besonders stark auf dich. Du erleidest doppelte Auswirkungen und benötigst nur die halbe Menge für eine Wirkung."},
    {name: "Spielzeugsüchtig (Prized Collection)", cost: 2, description: "Du besitzt eine Sammlung seltener Gegenstände, deren Verlust dich zutiefst treffen würde. Wenn deine Sammlung bedroht ist, musst du Willenskraft würfeln, um nicht unüberlegt zu handeln."}
];