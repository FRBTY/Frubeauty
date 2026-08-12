# Google Ads Editor import — `szempilla_V2.0` csoport-bontás

Ez a 3 CSV a `szempilla_V2.0` kampány **hirdetéscsoport-bontását** tölti be. A
kampány-szintű beállításokat (napi keret, tCPA) **SZÁNDÉKOSAN nem tartalmazzák**,
így az import nem írja felül azokat — csak ad groupokat, kulcsszavakat, negatívokat
és RSA hirdetéseket ad hozzá.

> ⚠️ A `Campaign` oszlopban mindenhol `szempilla_V2.0` szerepel. Ha a fiókban a
> kampány PONTOS neve más, előbb cseréld le a CSV-kben (keresés-csere), különben
> az Editor új kampányt hozna létre.

## Fájlok
| Fájl | Mit tölt be |
|---|---|
| `szempilla-v2-kulcsszavak.csv` | Pozitív kulcsszavak (Phrase + Exact) 4 ad groupban |
| `szempilla-v2-rsa-hirdetesek.csv` | 1 reszponzív keresési hirdetés / ad group (10 címsor, 4 leírás) |
| `szempilla-v2-negativ-kulcsszavak.csv` | Kampány-szintű negatív kulcsszavak |

## Lépések (Google Ads Editor)
1. **Account → Get latest changes** (legyen friss a fiók).
2. **Account → Import → From file…** → válaszd a `szempilla-v2-kulcsszavak.csv`-t.
   Az Editor felismeri a `Campaign / Ad Group / Keyword / Match Type` oszlopokat.
   Nézd át az előnézetet → **Apply / Keep**.
3. Ismételd a `szempilla-v2-rsa-hirdetesek.csv`-vel (RSA hirdetések). Ellenőrizd,
   hogy a Final URL és a megjelenítési útvonal (Path) rendben van.
4. A `szempilla-v2-negativ-kulcsszavak.csv`-t importáld **kampány negatív
   kulcsszóként** (vagy másold be egy közös negatív listába, és rendeld a kampányhoz).
5. **Post changes** (feltöltés a fiókba).

## Fontos a budget-korlátos fiókban
- A bontás célja a **Minőségi mutató** emelése (szoros ad group + egyező landing +
  kulcsszó a címsorban) → **alacsonyabb CPC** → több kattintás ugyanabból az
  5000 Ft-ból. **A tCPA-hoz NE nyúlj** — a lever a keret.
- Indíts **Phrase + Exact** match-csel; a Broad-ot csak bő negatívlista mellett.
- A konverzió a Notinóra mutató kattintás = **foglalási szándék**, nem foglalás.
  Heti rekonciliáció (valós foglalás / kattintás) alapján értelmezd a CPA-t, mielőtt
  keretet emelsz.

## Karakter-limitek (már betartva)
- Címsor ≤ 30 karakter · Leírás ≤ 90 karakter · Path ≤ 15 karakter.
- A `~` és a számok rendben; ellenőrzésnél az Editor jelzi, ha valamit elgépelnél.
