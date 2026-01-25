# MATHE I FÜR WIWIS – CHEAT SHEET

---

## 1. GRUNDLAGEN
**Kernkonzepte:** Potenzen, Logarithmen, Summenformeln, Zinseszins

| Formel | Bedeutung |
|--------|-----------|
| K(t) = K₀ · (1 + i)ᵗ | Endkapital nach t Perioden |
| K₀ = K(t) · (1 + i)⁻ᵗ | Barwert (Abzinsung) |
| ln(aᵇ) = b · ln(a) | Logarithmusregel |

**Beispiel:** 10.000€ bei 5% p.a. → Nach 10 Jahren: 10.000 · 1,05¹⁰ = **16.288,95€**

⚠️ **Häufiger Fehler:** Verwechslung von (1+i)ᵗ und (1+i·t) – Zinseszins ≠ einfache Zinsen!

---

## 2. FOLGEN
**Kernkonzepte:** Konvergenz, Grenzwert, geometrische Reihen

| Konzept | Formel |
|---------|--------|
| Grenzwert | lim(n→∞) aₙ = a |
| Geom. Reihe | Σ qⁿ = 1/(1-q) für \|q\| < 1 |
| Rentenbarwert | R · (1-qⁿ)/(1-q) |

**Beispiel:** Ewige Rente von 1.000€/Jahr bei 5%: 1.000 / 0,05 = **20.000€** Barwert

⚠️ **Häufiger Fehler:** Divergente Folgen haben KEINEN Grenzwert – nicht mit "∞" gleichsetzen!

**↓ Verbindung:** Grenzwerte → Grundlage für Stetigkeit

---

## 3. FUNKTIONEN & STETIGKEIT
**Kernkonzepte:** Definitionsbereich, Stetigkeit, Zwischenwertsatz

| Begriff | Bedeutung |
|---------|-----------|
| Stetig in x₀ | lim(x→x₀) f(x) = f(x₀) |
| Sprungstelle | Links- ≠ Rechtsseitiger Grenzwert |

**Beispiel:** Nachfragefunktion D(p) = 100 - 2p ist stetig → keine plötzlichen Nachfragesprünge

⚠️ **Häufiger Fehler:** f(x₀) existiert ≠ Stetigkeit! Der Grenzwert muss GLEICH dem Funktionswert sein.

**↓ Verbindung:** Stetigkeit → Voraussetzung für Differenzierbarkeit

---

## 4. DIFFERENZIERBARE FUNKTIONEN
**Kernkonzepte:** Ableitung, Kettenregel, Produktregel, Extrema

| Regel | Formel |
|-------|--------|
| Potenz | (xⁿ)' = n·xⁿ⁻¹ |
| Kette | (f∘g)' = f'(g(x))·g'(x) |
| Produkt | (f·g)' = f'·g + f·g' |
| Extrema | f'(x) = 0 und f''(x) ≠ 0 |

**Beispiel:** Kostenfunktion K(x) = x³ - 6x² + 15x → Grenzkosten K'(x) = 3x² - 12x + 15

⚠️ **Häufiger Fehler:** f'(x)=0 bedeutet NUR kritischer Punkt – für Maximum/Minimum f''(x) prüfen!

**↓ Verbindung:** Erweitert sich auf mehrere Variablen → partielle Ableitungen

---

## 5. FUNKTIONEN MEHRERER VARIABLEN
**Kernkonzepte:** Partielle Ableitung, Gradient, Hesse-Matrix

| Konzept | Notation |
|---------|----------|
| Part. Ableitung | ∂f/∂x, ∂f/∂y |
| Gradient | ∇f = (∂f/∂x, ∂f/∂y)ᵀ |
| Hesse-Matrix | H = [[∂²f/∂x², ∂²f/∂x∂y], [∂²f/∂y∂x, ∂²f/∂y²]] |

**Beispiel:** Cobb-Douglas Q(K,L) = K^0.3 · L^0.7 → ∂Q/∂L = 0,7·K^0.3·L^-0.3 (Grenzproduktivität Arbeit)

⚠️ **Häufiger Fehler:** Bei ∂f/∂x wird y als KONSTANTE behandelt, nicht als Variable!

**↓ Verbindung:** Gradient = 0 → notwendige Bedingung, aber mit Nebenbedingungen → Lagrange

---

## 6. OPTIMIERUNG UNTER NEBENBEDINGUNGEN
**Kernkonzepte:** Lagrange-Funktion, Lagrange-Multiplikator λ

| Schritt | Aktion |
|---------|--------|
| 1 | L(x,y,λ) = f(x,y) - λ·(g(x,y) - c) aufstellen |
| 2 | ∂L/∂x = 0, ∂L/∂y = 0, ∂L/∂λ = 0 lösen |
| 3 | λ interpretieren: Schattenpreis der Restriktion |

**Beispiel:** Max U(x,y) = x·y unter Budget 2x + 3y = 120
→ L = xy - λ(2x+3y-120) → Lösung: x=30, y=20, **U*=600**

⚠️ **Häufiger Fehler:** Vorzeichen bei λ! Und: λ ≠ 0 prüfen, sonst greift die NB nicht.

---

## 🔗 DER ROTE FADEN

```
GRUNDLAGEN (Rechnen) → FOLGEN (Grenzwerte) → STETIGKEIT (keine Sprünge)
                                                      ↓
OPTIMIERUNG ← MEHRERE VARIABLEN ← DIFFERENZIERBARKEIT (Steigung)
(mit Restriktion)    (∂/∂x, ∂/∂y)         (f'(x))
```

**Merksatz:** *"Von der Zahl zur Folge, von der Folge zum Grenzwert, vom Grenzwert zur Ableitung, von der Ableitung zum Optimum."*

---
*Mathematik I für Wirtschaftswissenschaftler | Kompakt-Übersicht*
