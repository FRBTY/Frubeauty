# `Lezer_V1` — feltölthető Google Ads csomag

Fiók **853-998-4403** · Készült 2026-09-16 · Stratégia és előrejelzés:
`../FRUBEAUTY-LEZER-ADS-KAMPANY-2026-09-16.md`

Minden CSV **generált termék**. A forrás a `build_lezer_v1.py`. Ha bármit módosítasz,
ott módosítsd és futtasd újra — a script nem ír ki fájlt, ha bármelyik ellenőrzés bukik:

```bash
python build_lezer_v1.py
```

---

## 0. STOP — amíg ez nincs meg, ne indítsd el

**A Notino szalon-oldalon nincs lézer-szolgáltatás** (2026-09-16, élőben ellenőrizve).
A céloldal mind a 10 foglalás-gombja oda mutat, és a konverziós tag minden Notino-kattintásra
tüzel. Ha most indul a kampány: szép CPA az Ads-ben, nulla lézer-vendég a székben.

Fel kell vinni a Notino Partnerbe legalább: `Lézeres szőrtelenítés — hónalj`,
`— bikinivonal`, `— alsó lábszár`, a sorozat alkalmankénti árával (11.000 / 11.000 / 23.000).

---

## 1. Import-sorrend

A CSV-k Google Ads Editor-formátumúak. `Account → Import → From file…` → Review changes →
Apply. Ebben a sorrendben, mert minden lépés az előzőre épül:

| # | Fájl | Mit hoz létre |
|---|---|---|
| 00 | `lezer-v1-00-kampany.csv` | a kampány vázát (Paused állapotban) |
| 01 | `lezer-v1-01-hirdetescsoportok.csv` | 5 hirdetéscsoport |
| 02 | `lezer-v1-02-kulcsszavak.csv` | 90 kulcsszó, exact + phrase |
| 03 | `lezer-v1-03-hirdetesek.csv` | 5 RSA, egyenként 15 címsor + 4 leírás |
| 04 | `lezer-v1-kizaro-BEILLESZTHETO.txt` | 273 kizáró — **beillesztéssel, nem fájlból** |
| 05–08 | sitelink / callout / kódrészlet / árak | assetek — **a webes felületen** |

**A kampány `Paused` állapotban jön létre.** Szándékos: előbb végezz a 2. ponttal, és csak
utána indítsd. Egy hiányos assetekkel induló kampány az első napokban rontja a Quality
Score-t, és az visszatekintő mutató — nehéz kijavítani.

### Amit a CSV NEM visz át — ezt a felületen állítsd be

| Beállítás | Érték |
|---|---|
| Hely | **Budapest (város)** — ne sugár, ne ország |
| Helyzet-beállítás | „Jelenlét: az általad célzott helyeken" |
| Keresési partnerek | **KI** |
| Display-bővítés | **KI** |
| Licit | Konverziók maximalizálása, **cél-CPA nélkül** |
| Konverziós cél | fiók-alapértelmezett (Időpont foglalása) |
| Napi keret | 2 000 Ft |
| Ütemezés | nincs (24/7) |

> A `lezer-v1-00-kampany.csv` tartalmazza a keretet, a nyelvet és a licit-stratégiát, de az
> Editor a hely- és hálózat-beállítást verziófüggően kezeli. Ezért van külön ez a táblázat:
> import után **nézd végig ezt a hét sort a felületen.** Ez a leggyakoribb néma hiba.

### Kizárók: miért nem fájlból

Az Editor a fájlból importált kulcsszót **pozitívként** húzza be, ha nincs meg a pontos
`Criterion Type` oszlop — és az Editor-verziók között eltér, mit fogad el. A beillesztés a
kizáró panelbe viszont 100%-ban megbízható: ott a kontextus maga a negatív.

A `lezer-v1-04-kizaro-kulcsszavak.csv` **referencia**, ne importáld. A `.txt`-ben két blokk:
- **196 kampány-szintű** — készülék, márka, bolt, otthoni, gépvásárlás, más lézer-felhasználás,
  más géptípus, versenytárs, férfi szándék, távoli város
- **20 csoport-szintű**, négy csoportra külön-külön (Fej kulcsszo / Dioda lezer / Lezer arak /
  Zonak) — gyanta, wax, elektrolízis, SHR, IPL. **Kampány-szintre nem mehetnek:** megölnék az
  `Alternativa` csoportot, ami szándékosan ezekre a keresésekre megy.

A `build_lezer_v1.py` minden kizárót összevet minden pozitív kulcsszóval, és nem enged
kiírni, ha bármelyik blokkolná a sajátunkat.

---

## 2. Assetek — ezek adják a CTR nagy részét

A hirdetés fizikai MÉRETE a találati oldalon a legnagyobb egyszeri CTR-kar. Egy asset nélküli
RSA két sor; assetekkel a duplája, és a versenytársat lejjebb tolja.

| Asset | Fájl | Hol |
|---|---|---|
| 4 sitelink | `05-sitelinkek.csv` | Assetek → Sitelinkek → kampány-szinten |
| 8 callout | `06-callout.csv` | Assetek → Kiemelések |
| Strukturált kódrészlet | `07-strukturalt-kodreszlet.csv` | Assetek → Strukturált kódrészletek, fejléc: Szolgáltatások |
| **6 tételes ár-bővítmény** | `08-arak.csv` | Assetek → Árak · típus Szolgáltatások · HUF |
| **GBP helybővítmény** | — | Assetek → Helyek. Ellenőrizd: „Jogosult", nem „Függőben" |
| 6 kép | `../../LEZER-DESIGN-KEPEK/` | Assetek → Képek, 1:1 és 1.91:1 kivágással |

**Az ár-bővítmény a csomag legritkább eleme.** A budapesti lézer-piacon szinte senki nem
használja, pedig itt az ár a fő keresési szándék (`lézeres szőrtelenítés árak` 140/hó, +89%
YoY). Hat sort tesz a hirdetés alá, saját kattintható linkkel zónánként.

**Hívás-asset szándékosan NINCS.** Rögzített döntés: a telefonos vendég problémásabb, mint az
online foglaló, és a hívás-gombot tilos a foglalással egyenrangúvá tenni. Ha ezen változtatsz,
az üzleti döntés, nem kampány-beállítás.

---

## 3. A hirdetésszöveg — miért pont ez

A szépészeti kategóriában a domináns súrlódás **kockázati, nem motivációs**: a vevő már akarja
a sima bőrt. Attól fél, hogy elrontják, hogy fáj, és hogy kifizet 66.000 Ft-ot olyasmiért,
ami rajta nem működik.

**Ezért a szövegben egyetlen vágykeltő jelző sincs.** Nincs „selymes", „tökéletes",
„magabiztos". Minden címsor a három közül az egyik:

| Típus | Példa | Mit old fel |
|---|---|---|
| **Ár** | `11.000 Ft Alkalmanként` · `Hat Alkalom, 66.000 Ft` | „mennyibe fog ez kerülni összesen" |
| **Kockázat** | `A Sorozatot Nem Fizeted Előre` · `Ha Nem Működne, Megmondom` · `Hűtött Fejjel, Nem Éget` | „mi van, ha rajtam nem működik / fáj / becsapnak" |
| **Bizonyíték** | `Fotó Minden Alkalom Előtt` · `5,0 Csillagos Vélemények` · `Egyszerre Egy Vendég` | „miért higgyek neked" |

Négy dolog, ami emiatt **nincs** benne, pedig kézenfekvő lenne:

1. **Nincs „Zavar a szőr?" típusú megszólítás.** A Google személyre szabott hirdetési
   szabályzata tiltja a személyes testi állapotra utalást, és a kategóriában amúgy is
   visszaüt: a vevő már fél, nem kell tovább ijeszteni.
2. **Nincs versenytárs-ár.** Rögzített hangnem-szabály, és összehasonlító reklámként jogilag
   is szabályozott.
3. **Nincs garancia-szó.** A szalonnak nincs formális elégedettségi garanciája. Helyette
   három ellenőrizhető vállalás megy: nem fizetsz előre, előre megmondom, fotózok.
4. **Nincs felkiáltójel, csillag, pipa, emoji.** A Google elutasítja; a validátor sem engedi.

**A szűkösség valódi:** „Ősszel kezdd, nyárra kész" és „Barnult bőrön nem kezdek". Ez nem
kitalált visszaszámláló, hanem fizika — barnult bőrön nem lehet kezelni, és hat alkalom
négy-hat hetente hat-nyolc hónap. Aki szeptemberben kezd, annak júniusra kész a sorozata.

**Minden állítás visszakereshető** a `../src/data/lezer.ts`-ben. Ez nemcsak becsületesség:
a Google a céloldalhoz méri a hirdetést, és a fedezetlen állítás a leggyakoribb elutasítási ok.

### Pinelés

Csoportonként **3 kulcsszó-egyező címsor P1-re**. A fiók saját tapasztalata (2026-06-03):
1 pin „Átlagos"-ra vitte az Ad Strength-et, 2–3 visszahozta „Jó"-ra. P2-re és P3-ra
szándékosan nem pinelünk — ott hagyni kell a gépnek teret.

### Csoportonként 1 RSA, nem 2

A Google 2–3 RSA-t ajánl csoportonként, de az a havi több ezer kattintásos kampányokra
vonatkozik. Ez a kampány a 3. hónapban ~204 kattintást hoz öt csoportra. Két RSA itt
kettéosztaná a tanulóadatot, és mindkettő lassabban érne be. A 15 címsor önmagában
belső A/B tesztet futtat. Második RSA akkor jöjjön, ha egy csoport havi 100 kattintás fölé nő.

---

## 4. Indítás utáni első két hét

1. **Nap 1:** ellenőrizd, hogy mind az 5 RSA státusza „Jogosult", nem „Elutasítva". Ha
   elutasítás van, a szöveg mellett ott az indok — írd meg, javítjuk a forrásfájlban.
2. **Nap 1:** Ad Strength csoportonként. Ha bármelyik „Gyenge", szólj — nem a szöveggel lesz
   baj, hanem a pinelés és a címsor-hasonlóság arányával.
3. **Naponta:** keresési kifejezés-jelentés. Minden készülék-szándékú és férfi-szándékú
   kifejezés azonnal kizáróba. Ez többet ér, mint bármelyik előre megírt lista.
4. **Nap 14:** Quality Score kulcsszavanként. Az első 2-3 hétben alacsony lesz — ez
   visszatekintő mutató, kattintások kellenek hozzá. Ne indíts miatta új kampányt.

---

## Fájlok

| Fájl | Tartalom |
|---|---|
| `build_lezer_v1.py` | **a forrás** — itt módosíts, aztán futtasd |
| `lezer-v1-00-kampany.csv` | kampány-váz |
| `lezer-v1-01-hirdetescsoportok.csv` | 5 hirdetéscsoport |
| `lezer-v1-02-kulcsszavak.csv` | 90 kulcsszó |
| `lezer-v1-03-hirdetesek.csv` | 5 RSA · 75 címsor · 20 leírás |
| `lezer-v1-04-kizaro-kulcsszavak.csv` | 273 kizáró, referencia (ne importáld) |
| `lezer-v1-05-sitelinkek.csv` | 4 sitelink |
| `lezer-v1-06-callout.csv` | 8 kiemelés |
| `lezer-v1-07-strukturalt-kodreszlet.csv` | Szolgáltatások, 8 érték |
| `lezer-v1-08-arak.csv` | 6 tételes ár-bővítmény |
| `lezer-v1-kizaro-BEILLESZTHETO.txt` | beillesztésre kész kizárók, két blokkban |
