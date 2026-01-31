# Lernarchitektur: Potenzen und Logarithmen

## Übersicht

Diese App ist ein adaptives Lernsystem für "Potenzen und Logarithmen", entwickelt für Wirtschaftswissenschaftler. Sie implementiert evidenzbasierte pädagogische Prinzipien mit kompetenzbasierter Progression.

---

## 1. Wissensstruktur-Analyse

### 1.1 Konzept-Hierarchie

```
GRUNDLAGEN (Voraussetzungen)
│
├── Grundrechenarten
├── Bruchrechnung
└── Rechenreihenfolge (Punkt vor Strich)
│
▼
KERNKONZEPTE
│
├── pow_definition: Was ist eine Potenz?
│   └── pow_positive_int: Positive Exponenten
│       ├── pow_zero: Exponent Null (a⁰ = 1)
│       └── pow_negative: Negative Exponenten
│
├── log_definition: Was ist ein Logarithmus?
│   └── log_notation: Schreibweisen (log, ln, lg)
│       └── log_special_values: Besondere Werte
│
▼
RECHENREGELN
│
├── Potenzregeln
│   ├── pow_product_rule: aᵐ · aⁿ = aᵐ⁺ⁿ
│   ├── pow_quotient_rule: aᵐ / aⁿ = aᵐ⁻ⁿ
│   ├── pow_power_rule: (aᵐ)ⁿ = aᵐⁿ
│   └── pow_fractional: Wurzeln als Potenzen
│
├── Logarithmusregeln
│   ├── log_product_rule: log(ab) = log(a) + log(b)
│   ├── log_quotient_rule: log(a/b) = log(a) - log(b)
│   ├── log_power_rule: log(aᵇ) = b·log(a)
│   └── log_change_base: Basiswechsel
│
▼
ANWENDUNGEN
│
├── log_exp_relationship: Beziehung exp ↔ ln
├── combined_compound_interest: Zinseszinsrechnung
└── combined_growth_decay: Wachstum und Zerfall
```

### 1.2 Abhängigkeiten (Prerequisites)

| Konzept | Voraussetzungen |
|---------|-----------------|
| pow_definition | (keine - Einstiegspunkt) |
| pow_positive_int | pow_definition |
| pow_zero | pow_positive_int |
| pow_negative | pow_zero |
| pow_product_rule | pow_positive_int |
| pow_quotient_rule | pow_product_rule |
| pow_power_rule | pow_product_rule |
| pow_fractional | pow_negative, pow_power_rule |
| log_definition | pow_definition |
| log_notation | log_definition |
| log_special_values | log_notation |
| log_product_rule | log_special_values, pow_product_rule |
| log_quotient_rule | log_product_rule |
| log_power_rule | log_quotient_rule |
| log_change_base | log_power_rule |
| log_exp_relationship | log_power_rule |
| combined_compound_interest | pow_fractional, log_exp_relationship |
| combined_growth_decay | combined_compound_interest |

---

## 2. Kompetenzstufen-Framework

### 2.1 Die vier Stufen

#### STUFE 1 - ERKENNEN (25%)
- **Ziel**: Konzept identifizieren und Grunddefinition verstehen
- **Prüfung**: Multiple Choice, Wahr/Falsch, Zuordnung
- **Schwelle**: 80% korrekt bei mind. 3 Versuchen
- **Beispiel**: "Was bedeutet 2³?" → "2 wird 3-mal mit sich multipliziert"

#### STUFE 2 - VERSTEHEN (50%)
- **Ziel**: In eigenen Worten erklären, WARUM Regeln funktionieren
- **Prüfung**: Konzeptfragen, einfache Anwendungen
- **Schwelle**: 80% korrekt bei mind. 5 Versuchen
- **Beispiel**: "Warum ist a⁰ = 1?" → Begründung über Muster erkennen

#### STUFE 3 - ANWENDEN (75%)
- **Ziel**: Regeln korrekt in Berechnungen anwenden
- **Prüfung**: Rechenaufgaben, Textaufgaben
- **Schwelle**: 85% korrekt bei mind. 8 Versuchen
- **Beispiel**: "Vereinfache: 3⁴ · 3² = ?" → 3⁶

#### STUFE 4 - BEHERRSCHEN (100%)
- **Ziel**: Komplexe/kombinierte Aufgaben lösen, Transferleistung
- **Prüfung**: Komplexe Szenarien, klausurtypische Aufgaben
- **Schwelle**: 90% korrekt bei mind. 10 Versuchen
- **Beispiel**: "Ein Kapital verdoppelt sich alle 7 Jahre. Nach wie vielen Jahren hat es sich verachtfacht?"

### 2.2 Stufenspezifische Benchmarks

| Konzept | Erkennen | Verstehen | Anwenden | Beherrschen |
|---------|----------|-----------|----------|-------------|
| pow_definition | Begriff "Potenz" erkennen | Bedeutung erklären | Einfache Potenzen berechnen | Potenzen in Kontexten erkennen |
| pow_product_rule | Regel identifizieren | Erklären warum aᵐ·aⁿ=aᵐ⁺ⁿ | Regel anwenden | Mit anderen Regeln kombinieren |
| log_definition | log als Umkehrung erkennen | Beziehung zu Potenzen erklären | Einfache Logarithmen berechnen | Gleichungen mit log lösen |

---

## 3. Motivationsdesign-Framework

### 3.1 Kompetenzfeedback
- **Sofortiges Feedback** bei jeder Antwort (richtig/falsch + Erklärung)
- **Fortschrittsvisualisierung** pro Konzept und gesamt
- **Kompetenz-Badges** für jede erreichte Stufe
- **Feier-Animationen** bei Stufenaufstiegen

### 3.2 Autonomie
- **Freie Pfadwahl**: Nutzer wählt, welches Konzept als nächstes
- **Jederzeit Wiederholen**: Alle Themen zugänglich (wenn freigeschaltet)
- **Selbstgesteuertes Tempo**: Keine Zeitlimits beim Lernen
- **Überspringen möglich**: Bei Vorkenntnissen direkt zur Anwendung

### 3.3 Relevanz (für Wirtschaftswissenschaftler)
- **Alle Beispiele im Finanz/Business-Kontext**:
  - Zinseszinsrechnung
  - Barwertberechnung
  - Wachstumsraten
  - Verdopplungszeit
- **"Warum ist das wichtig?"** bei jedem Konzept
- **Praxisbezug** in Aufgabenstellungen

### 3.4 Optimale Herausforderung (Flow-Zustand)
- **Adaptive Schwierigkeit** basierend auf Performance
- **Zone der proximalen Entwicklung**:
  - Wenn 5 richtig → schwerer
  - Wenn 3 falsch → leichter + Hinweis
- **Spaced Repetition** für langfristiges Behalten
- **Keine Überforderung**: Konzepte erst nach Voraussetzungen

### 3.5 Wachstumsorientierte Kommunikation
- **Fehler als Lernchance**: "Fast! Schau dir die Erklärung an."
- **Fortschritt betonen**: "Du hast heute 3 neue Konzepte gelernt!"
- **Mühe anerkennen**: "Dranbleiben zahlt sich aus!"
- **Keine negativen Labels**: Nie "falsch", sondern "noch nicht ganz"

---

## 4. Spaced Repetition Algorithmus

### 4.1 Intervall-Berechnung (SM-2 Variante)

```javascript
// Intervalle in Tagen
const intervals = [1, 3, 7, 14, 30, 60];

function calculateNextReview(concept, wasCorrect, currentInterval) {
  if (wasCorrect) {
    // Nächstes Intervall
    const nextIndex = intervals.indexOf(currentInterval) + 1;
    return intervals[Math.min(nextIndex, intervals.length - 1)];
  } else {
    // Zurück auf 1 Tag
    return 1;
  }
}
```

### 4.2 Wiederholungsprioritäten
1. **Überfällige Reviews** (seit > geplantes Datum)
2. **Heute fällige Reviews**
3. **Schwächste Konzepte** (niedrigste Erfolgsquote)
4. **Neue Konzepte** (freigeschaltet, aber ungestartet)

---

## 5. Adaptiver Lernalgorithmus

### 5.1 Aufgabenauswahl

```javascript
function selectNextExercise(userProgress) {
  // Priorität 1: Fällige Wiederholungen
  const dueReviews = getDueReviews(userProgress);
  if (dueReviews.length > 0) {
    return selectFromDueReviews(dueReviews);
  }

  // Priorität 2: Konzepte kurz vor Stufenaufstieg
  const nearThreshold = getConceptsNearThreshold(userProgress);
  if (nearThreshold.length > 0) {
    return selectForConcept(nearThreshold[0]);
  }

  // Priorität 3: Neue freigeschaltete Konzepte
  const newUnlocked = getUnlockedUnstartedConcepts(userProgress);
  if (newUnlocked.length > 0) {
    return selectIntroExercise(newUnlocked[0]);
  }

  // Priorität 4: Schwächste Konzepte verstärken
  const weakest = getWeakestConcepts(userProgress);
  return selectForConcept(weakest[0]);
}
```

### 5.2 Schwierigkeitsanpassung

| Letzte 5 Aufgaben | Aktion |
|-------------------|--------|
| 5 richtig | Schwierigkeit erhöhen |
| 4 richtig | Beibehalten |
| 3 richtig | Beibehalten |
| 2 richtig | Schwierigkeit senken |
| 1 oder weniger | Hinweise anbieten, leichtere Aufgaben |

---

## 6. Konzeptliste (Implementierung)

### Potenzen (10 Konzepte)
1. `pow_definition` - Definition und Grundbegriffe
2. `pow_positive_int` - Positive ganzzahlige Exponenten
3. `pow_zero` - Exponent Null (a⁰ = 1)
4. `pow_negative` - Negative Exponenten
5. `pow_product_rule` - Multiplikationsregel
6. `pow_quotient_rule` - Divisionsregel
7. `pow_power_rule` - Potenz einer Potenz
8. `pow_fractional` - Rationale Exponenten

### Logarithmen (8 Konzepte)
9. `log_definition` - Definition als Umkehrfunktion
10. `log_notation` - Schreibweisen (log, ln, lg)
11. `log_special_values` - Besondere Werte
12. `log_product_rule` - Produktregel
13. `log_quotient_rule` - Quotientenregel
14. `log_power_rule` - Potenzregel
15. `log_change_base` - Basiswechsel

### Anwendungen (3 Konzepte)
16. `log_exp_relationship` - Beziehung exp ↔ ln
17. `combined_compound_interest` - Zinseszinsrechnung
18. `combined_growth_decay` - Wachstum und Zerfall

---

## 7. Technische Umsetzung

### 7.1 Datenpersistenz
- **localStorage** für Offline-Fähigkeit
- **Automatische Speicherung** nach jeder Aktion
- **Export-Funktion** für Backup

### 7.2 PWA-Features
- **Installierbar** auf iPhone/Android
- **Offline-fähig** nach erstem Laden
- **Push-Erinnerungen** für Wiederholungen (optional)

### 7.3 Responsive Design
- **Mobile-First**: Optimiert für iPhone
- **Touch-freundlich**: Große Buttons, swipe-fähig
- **Desktop**: Erweiterte Ansicht mit Sidebar

---

## 8. Erfolgsmessung

### 8.1 Lernziel
- **Ziel**: 100% Klausurfähigkeit in "Mathe I für Wirtschaftswissenschaftler"
- **Indikator**: Alle Konzepte auf Stufe "Beherrschen"

### 8.2 Fortschrittsberechnung
```javascript
function calculateOverallProgress(userProgress) {
  const conceptWeights = {
    'pow_definition': 1,
    'pow_product_rule': 1.5,
    'combined_compound_interest': 2,
    // ... gewichtet nach Klausurrelevanz
  };

  let totalWeight = 0;
  let achievedWeight = 0;

  for (const concept of concepts) {
    const weight = conceptWeights[concept.id];
    totalWeight += weight;
    achievedWeight += weight * (userProgress[concept.id].level / 4);
  }

  return achievedWeight / totalWeight;
}
```

---

## 9. Nächste Schritte

1. ✅ Lernarchitektur dokumentiert
2. ⬜ React-Projekt initialisieren
3. ⬜ Konzept-Daten erstellen
4. ⬜ Übungsaufgaben erstellen (~25 Stück)
5. ⬜ Core Hooks implementieren
6. ⬜ UI-Komponenten bauen
7. ⬜ PWA konfigurieren
8. ⬜ Testen und deployen
