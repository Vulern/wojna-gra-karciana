# 🃏 Wojna 2.2 - Gra Karciana

## Opis projektu

**Wojna 2.2** to klasyczna gra karciana "Wojna" zrealizowana w nowoczesnym stylu z wykorzystaniem HTML, CSS i JavaScript. Gra toczy się między graczem a komputerem w 30 rundach.

## ✨ Funkcje

- 🎴 **Automatyczne rozdanie kart** - 26 kart dla każdego gracza
- 🏆 **System punktacji** - wygrana runda = 1 punkt
- ⚔️ **Mechanika Wojny** - przy remisie dodatkowa runda z podwójnymi punktami
- 📊 **Statystyki w czasie rzeczywistym** - liczba kart, punkty, runda
- 🎨 **Nowoczesny interfejs** - animowane karty i responsywny design
- 📱 **Responsywność** - działa na komputerach i urządzeniach mobilnych
- 💡 **Modal z zasadami** - instrukcja gry dostępna w każdej chwili

## 🚀 Jak uruchomić

1. Pobierz pliki projektu
2. Otwórz plik `index.html` w dowolnej przeglądarce internetowej

## 🎮 Zasady gry

1. Każdy gracz otrzymuje talię 26 kart
2. W każdej rundzie obaj gracze dobierają po jednej karcie
3. Wyższa karta wygrywa rundę i daje **1 punkt**
4. Przy remisie następuje **WOJNA**:
   - Obaj gracze dobierają dodatkową kartę
   - Wygrany otrzymuje **2 punkty**
5. Gra trwa **30 rund** lub do wyczerpania talii
6. Wygrywa gracz z większą liczbą punktów

## 📋 Wartości kart

| Wartość | Symbol |
|---------|--------|
| 2-9 | 2-9 |
| 10 | 10 |
| 11 | J (Walet) |
| 12 | Q (Dama) |
| 13 | K (Król) |
| 14 | A (As) |

## 🛠️ Technologie

- **HTML5** - struktura strony
- **CSS3** - style i animacje
- **JavaScript (ES6+)** - logika gry
- **Deck of Cards API** - grafiki kart

## 📁 Struktura projektu

```
projekt/
├── index_updated.html  # Główny plik HTML
├── style_updated.css   # Style CSS
├── script_updated.js   # Logika gry JavaScript
├── index.html          # Prototypowy plik HTML
├── style.css           # Prototypowe style CSS
├── script.js           # Prototypowa logika gry JavaScript
└── README.md           # Dokumentacja
```

## 🎨 Elementy interfejsu

- **Talia gracza** - lewa strona stołu
- **Talia komputera** - prawa strona stołu
- **Licznik punktów** - aktualny stan punktowy
- **Licznik rund** - postęp w grze (maks. 30)
- **Przycisk "Dobierz kartę"** - uruchamia rundę
- **Przycisk "Nowa gra"** - resetuje grę
- **Przycisk "Zasady"** - otwiera instrukcję

## 🏅 Scenariusze końcowe

- **Gracz wygrywa** - więcej punktów niż komputer
- **Komputer wygrywa** - mniej punktów niż komputer
- **Remis** - taka sama liczba punktów

## 📱 Responsywność

Gra jest w pełni responsywna i dostosowuje się do różnych rozmiarów ekranu:
- **Desktop** - pełny rozmiar kart (140x200px)
- **Mobile** - zmniejszone karty (110x157px)

## 📄 Licencja

Projekt edukacyjny - wolny do używania i modyfikowania.

---

**Wersja:** 2.2  
