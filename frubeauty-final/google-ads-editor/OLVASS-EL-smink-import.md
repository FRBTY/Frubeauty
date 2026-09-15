# Google Ads Editor import — `Sminkes_Kampany` újraépítés

Ez a 3 CSV a **meglévő, szüneteltetett** `Sminkes_Kampany` kampány tartalmát cseréli le.
A kampány-szintű beállításokat (napi keret, licitstratégia, hely) **SZÁNDÉKOSAN nem
tartalmazzák** — azokat kézzel kell átállítani a felületen (lásd lent), így az import
nem ír felül semmit, csak hirdetéscsoportokat, kulcsszavakat, negatívokat és RSA-kat ad hozzá.

> ⚠️ A `Campaign` oszlopban mindenhol **`Sminkes_Kampany`** szerepel — ez a fiókban lévő
> pontos név (kampány ID 23798942059). Ha átnevezed, előbb cseréld a CSV-kben.

> ⚠️ **Ne hozz létre új kampányt.** A `Sminkes_Kampany`-ban 15 konverziónyi tanulóadat van
> (CPA 1 554 Ft, 21,43% konv. arány). Új kampány = nulláról induló Smart Bidding.

## Fájlok

| Fájl | Mit tölt be |
|---|---|
| `smink-v1-kulcsszavak.csv` | 52 kulcsszó (Phrase + Exact), 5 hirdetéscsoportban |
| `smink-v1-rsa-hirdetesek.csv` | 5 reszponzív keresési hirdetés (10 címsor + 4 leírás mind) |
| `smink-v1-negativ-kulcsszavak.csv` | 112 kampány-szintű negatív kulcsszó |

## Sorrend (a negatívokat MINDIG előbb)

1. **Account → Get latest changes.**
2. Importáld a **`smink-v1-negativ-kulcsszavak.csv`**-t kampány-szintű negatívként.
   Ez az első lépés: enélkül az első nap forgalma termék- és tanfolyam-keresésekre megy el.
3. Importáld a **`smink-v1-kulcsszavak.csv`**-t (Campaign / Ad Group / Keyword / Match Type).
4. Importáld a **`smink-v1-rsa-hirdetesek.csv`**-t. Ellenőrizd a Final URL-t és a Path-okat.
5. **Szüneteltesd** a régi `1. hirdetéscsoport`-ot — ne töröld, a konverziós előzménye ott van.
6. **Post changes.**

## Amit KÉZZEL kell átállítani a felületen (az import nem érinti)

| Beállítás | Jelenleg | Állítsd erre |
|---|---|---|
| **Hely** | **5,0 km körzet, Egressy út 16.** | **Budapest (város)** — ez a legnagyobb kar |
| Hely-opció | — | „Jelenlét vagy rendszeres tartózkodás" |
| Napi keret | 3 500 Ft | **800 Ft** |
| Licitstratégia | — | **Konverziók maximalizálása, cél-CPA NÉLKÜL** (7. héttől tCPA 1 800–2 200 Ft) |
| Hálózat | — | Csak Keresés (Display-partnerek KI) |
| Hirdetésütemezés | — | **Ne korlátozd** (a V3.0 17–19 kivétele erre a kampányra nem bizonyított) |

Ezután vedd fel a bővítményeket: **ár-bővítmény** (ez hozta a 32%-os CTR-t), hívás-,
hely- és webhely-link bővítmény, kiemelések, struktúrált kódrészlet (Szolgáltatások).

## Miért így

- **Kifejezés + pontos, általános NINCS.** A kampány saját adata: az általános egyezésű
  kulcsszavak 87 megjelenésből **0 kattintást** hoztak. Általánost csak 30+ konverzió után.
- **A fej-kulcsszavak eddig hiányoztak.** `esküvői smink` (320/hó BP), `alkalmi smink` (210),
  `menyasszonyi smink` (170) — összesen 700 budapesti keresés/hó, mind Alacsony versennyel.
- **A `sminkes` (1 300/hó, Magas verseny) szándékosan kimaradt** — a szomszédjai
  `halloween sminkes`, `sminkes szék`, `sminkes tanfolyam`. Fázis 2, külön csoportban.
- **Kerületi kulcsszó nincs a listában:** a `"sminkes zugló"`, `"sminkes 14. kerület"`
  típusú kulcsszavak a fiókban mind „Alacsony keresési arány" státuszban vannak — a Google
  ki sem szolgálja őket. A kerület a hirdetésszövegben és a landing oldalon van a helyén.
- **Célzásként viszont a kerület LÉTEZIK** (*XIV. kerület, Budapest — körzet*, elérés 1 240 000),
  csak nem érdemes használni: az elérése a városénak kevesebb mint egyötöde, és pont azt a
  szűkítést ismételné meg, amit az 5 km-es sugár okozott. **Budapest (város) marad.**

Teljes indoklás és számok: [`../FRUBEAUTY-SMINK-KULCSSZOKUTATAS-2026-08-13.md`](../FRUBEAUTY-SMINK-KULCSSZOKUTATAS-2026-08-13.md)
