# White Wolf Editor

Ein Charakterbogen-Editor für die **World of Darkness** Rollenspielsysteme. Entwickelt mit React und Tailwind CSS für eine moderne Benutzeroberfläche im Gothic-Design.

## Unterstützte Systeme

- **Vampire: The Masquerade** - Charaktererstellung mit Clan-Auswahl und Disziplinen
- **Werewolf: The Apocalypse** - Stamm-, Vorzeichen- und Rassen-System
- **Mage: The Ascension** - Traditionen und Sphären der Magie

## Funktionen

### Charaktererstellung
- Punkteverteilung nach offiziellen WoD-Regeln
- Automatische Validierung von Attribut- und Fähigkeitslimits
- Freebie-Point-System für individuelle Anpassungen
- System-spezifische Besonderheiten (z.B. Nosferatu-Schwäche)
- **🎲 Zufällige Charaktergenerierung** - Automatische Erstellung kompletter Charaktere
- **✨ Merits & Flaws System** - Vor- und Nachteile für erweiterte Charakteranpassung

### Datenverwaltung
- Speicherung von bis zu 10 Charakteren pro System im Browser
- JSON-Export und -Import für Datensicherung
- Automatische Speicherverwaltung

### Benutzeroberfläche
- Responsive Design für verschiedene Bildschirmgrößen
- System-spezifische Farbthemen (Emerald, Amber, Purple)
- Hamburger-Menü für einfache Navigation
- Modal-Dialoge für erweiterte Funktionen

## Letzte Updates

### Version 1.5 (23.03.2023)
- **Refactoring
  - Codestruktur verbessert
  - Code-Einsparung von 20%-30%
### Version 1.4.1 (22.03.2026)
- **Verbesserungen
  - "Wesen", "Verhalten" und "Konzept" kann jetzt aus einem DropDown-Menü gewählt werden
  - Datenstruktur modularisiert
  - "Hintergründe" für Mage angepasst und auswählbar gemacht
  - Codestruktur verbessert
    - Code massiv refactored, Code-Einsparung von 50%-60% 
- **Bugfixes
  - "Kampfkunst" in Mage darf zu Beginn nicht mehr als 2 sein
  - "Merits" und "Flaws" öffnen jetzt korrekten Tab

### Version 1.4 (21.03.2026)
- **Bugfixes
  - Benennung des Buttons "Speicher" auf "Load / Save" geändert
  - Mage-Charakterbogen korrigiert
  - Bei Mage: Keine Fähigkeit über 3 Punkte (ohne Freebie)
  - Arete kann jetzt nur noch durch Freebies gesteigert werden
  - Theme der Merits und Flaws angepasst.
- **Mage-Charaktererstellung angepasst
  - Mage-Charakterbogen auf den Stand von Vampire/Werewolf gebracht
  - Zugehörigkeit und Gruppierung eingefügt
- 
### Version 1.3 (21.03.2026)
- **🎲 Zufällige Charaktergenerierung hinzugefügt**
  - Kompletter Algorithmus für WoD-regelkonforme Charaktererstellung
  - Intelligente Punktverteilung (7/5/3 für Attribute, 13/9/5 für Fähigkeiten)
  - Automatische Clan-Auswahl mit entsprechenden Disziplinen
  - Berücksichtigung von Clan-spezifischen Schwächen (z.B. Nosferatu Erscheinungsbild = 0)
  - Zufällige Namen, Konzepte und Naturen aus vordefiniertem Pool
  - Tugenden-basierte Menschlichkeits- und Willenskraft-Berechnung
  - Generationsabhängige Blutvorrat-Kapazität
  - 🎲-Button im Charakterbogen-Header für Ein-Klick-Generierung

- **✨ Merits & Flaws System implementiert**
  - Neue `MeritsFlawsModal` Komponente mit Tab-Navigation
  - Vollständig anpassbares Punktesystem für Vor- und Nachteile
  - Intelligente Freebie-Point-Integration (Merits kosten, Flaws geben Punkte)
  - Responsive Modal-Design mit Theme-Support
  - Erweiterte Datenstruktur in `sharedData.js` für Vampire-spezifische Merits/Flaws
  - Automatische Validierung verfügbarer Freebie-Punkte
  - Persistente Speicherung in Charakterdaten

- **🗂️ Erweiterte Datenstruktur**
  - Umfassende Backgrounds-Datenbank mit detaillierten Level-Beschreibungen
  - 10 vordefinierte Hintergrund-Kategorien (Generation, Ressourcen, Einfluss, etc.)
  - Strukturierte Merit/Flaw-Definitionen mit Kosten und Beschreibungen
  - Verbesserte Datenorganisation in `sharedData.js`

- **🔧 Technische Verbesserungen**
  - Robuste Punktverteilungs-Algorithmen (`distributePoints`, `randomInt`, `randomChoice`)
  - Erweiterte Character-State-Management
  - Verbesserte Toast-Benachrichtigungen für Benutzer-Feedback
  - Theme-aware Modal-Komponenten für konsistentes Design

### Version 1.2 (21.03.2026)
- **🎲 Zufällige Charaktergenerierung hinzugefügt**
  - Automatische Punktverteilung für Attribute und Fähigkeiten
  - Zufällige Clan- und Disziplinwahl für Vampire
  - Vollständig WoD-regelkonformer Charakteraufbau
  - Ein-Klick-Generierung für schnelle NPCs

- **✨ Merits & Flaws System implementiert**
  - Umfangreiche Bibliothek von Vor- und Nachteilen
  - Punktesystem für ausgewogene Charakterentwicklung
  - Benutzerfreundliche Modal-Oberfläche
  - Integration in bestehenden Charakterbogen

### Version 1.1 (21.03.2026)
- Projekt-Refactoring für Mehrsystem-Unterstützung
- Verbesserte Benutzeroberfläche
- README-Dokumentation erweitert

## Installation
Entweder den Release verwenden: https://lordhorst.github.io/white-wolf-editor/

oder lokal installieren
```
shell script
# Repository klonen
git clone https://github.com/LordHorst/white-wolf-editor.git
cd white-wolf-editor

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Für Produktion erstellen
npm run build
```
## Technische Details

**Frontend-Stack:**
- React 18 mit Hooks
- Tailwind CSS für Styling
- Lucide React für Icons
- Vite als Build-Tool

**Datenhaltung:**
- LocalStorage für browserbasierte Persistierung
- JSON-Format für Import/Export

## Nutzung

1. System über das Menü auswählen
2. Charakterinformationen eingeben
3. Attribute und Fähigkeiten nach WoD-Regeln verteilen
4. Optional Freebies für Feinabstimmung verwenden
5. **NEU**: Zufällige Charaktergenerierung für schnelle Erstellung
6. **NEU**: Merits & Flaws für erweiterte Charakteranpassung
7. Charakter lokal speichern oder als JSON exportieren

## Projektstruktur
```

src/
├── components/ui/     # Wiederverwendbare UI-Komponenten
├── systems/          # System-spezifische Charakterbögen
├── hooks/            # Custom React Hooks
├── data/             # Spieldaten und Konfiguration
└── App.jsx           # Hauptkomponente
```
## Entwicklung

Das Projekt verwendet Standard-React-Patterns mit funktionalen Komponenten und Hooks. Spieldaten sind in `src/data/sharedData.js` zentral verwaltet.

**Wichtige Hooks:**
- `useCharacterManager` - Charakterdaten und Persistierung
- `useFreebies` - Freebie-Point-Verwaltung

**Neue Komponenten:**
- `RandomCharacterGenerator` - Zufällige Charaktererstellung
- `MeritsFlawsModal` - Vor- und Nachteile-Verwaltung

## Lizenz

MIT License. World of Darkness ist ein Warenzeichen von Paradox Interactive. Dieses Projekt ist ein inoffizielles Fan-Tool.

## Beitragen

Pull Requests sind willkommen. Bei größeren Änderungen bitte zuerst ein Issue erstellen, um die geplanten Änderungen zu diskutieren.
