# ProduktionsHero - Lernspiel für Produktionsmanagement

## Status: In Entwicklung

### Beschreibung
Interaktives Lernspiel für das Fach "Produktionsmanagement" im Studiengang "Nachhaltiges Management" (TU Berlin). Spielbar auf Desktop und iPhone.

### Datei
- `produktionshero.html` - Komplettes Spiel (HTML/CSS/JS, keine Dependencies)

### Deployment
- **Branch:** `claude/production-management-game-7sgSF`
- **GitHub Pages:** `https://kennydenvers.github.io/hello/produktionshero.html`
- **Alternativ:** `https://htmlpreview.github.io/?https://github.com/KennyDenvers/hello/blob/claude/production-management-game-7sgSF/produktionshero.html`

### Enthaltene Themen (Basic-Modus)
- Losgrößenplanung (Andler-Formel/EOQ)
- ABC/XYZ-Analyse
- MRP & Bedarfsplanung
- Durchlaufterminierung
- Kapazitätsplanung
- Nachhaltige Produktion

---

## TODO: Expert-Modus erweitern

**Priorität: Hoch**

### Anforderung:
1. **Basic/Expert-Modus Auswahl** am Spielstart
2. **Mehr Aufgaben pro Thema:** 5-8 verschiedene Aufgaben statt nur 1
3. **Wiederholbare Challenges:** Gleiche Challenge mit neuen Aufgaben spielbar
4. **Angepasstes Level-System:** Mehr Punkte/Level für Expert-Modus

### Umsetzung:
- Aufgaben-Pool pro Thema erstellen
- Zufällige Aufgabenauswahl bei Challenge-Start
- Fortschritt pro Thema tracken (z.B. "3/8 Aufgaben gelöst")
- Separater Punktestand für Basic/Expert

---

## Session-Historie

**2026-07-11:** Initiale Version erstellt mit 15 Challenges, Lexikon, Achievements, Fabrik-Gamification. Expert-Modus noch nicht implementiert.
