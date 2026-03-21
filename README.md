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

### Datenverwaltung
- Speicherung von bis zu 10 Charakteren pro System im Browser
- JSON-Export und -Import für Datensicherung
- Automatische Speicherverwaltung

### Benutzeroberfläche
- Responsive Design für verschiedene Bildschirmgrößen
- System-spezifische Farbthemen (Emerald, Amber, Purple)
- Hamburger-Menü für einfache Navigation

## Installation

```shell script
# Repository klonen
git clone https://github.com/[username]/white-wolf-editor.git
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
5. Charakter lokal speichern oder als JSON exportieren

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

## Lizenz

MIT License. World of Darkness ist ein Warenzeichen von Paradox Interactive. Dieses Projekt ist ein inoffizielles Fan-Tool.

## Beitragen

Pull Requests sind willkommen. Bei größeren Änderungen bitte zuerst ein Issue erstellen, um die geplanten Änderungen zu diskutieren.