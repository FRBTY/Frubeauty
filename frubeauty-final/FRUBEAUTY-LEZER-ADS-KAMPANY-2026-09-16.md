# Lézer Google Ads kampány — `Lezer_V1`

**Kelt:** 2026-09-16 · **Fiók:** 853-998-4403 · **Céloldal:** `https://frubeauty.com/lezeres-szortelenites-budapest/`
**Kulcsszóadat:** `lezer/GKP-szortelenites-budapest-1208-kulcsszo-2026-08-18.tsv` (Budapest, 2025.08–2026.07)
**Import-fájlok:** `google-ads-editor/lezer-v1-*.csv`

---

## 0. INDULÁS ELŐTT — egy dolog blokkolja az egészet

**2026-09-16-án élőben ellenőrizve a Notino szalon-oldalon: a lézeres szőrtelenítés
NINCS a foglalható szolgáltatások között.** Mindkét fül (`Kozmetika`, `Esztétikai
szolgáltatások`) végignézve — nulla találat a „lézer" és a „szőrtelenít" szóra.

A lézer-céloldalon **10 foglalás-gomb** van, mind a Notino szalon-oldalra mutat. Ha ma
elindul a kampány, minden kattintás egy olyan foglalási oldalon landol, ahol a keresett
szolgáltatás nem létezik. A konverziós tag ettől még tüzel (Notino-kattintás = konverzió),
tehát **az Ads szép CPA-t fog mutatni, miközben nulla lézer-vendég jön be.**

**Teendő indulás előtt:** a Notino Partner felületen fel kell vinni a lézer-zónákat
(minimum: `Lézeres szőrtelenítés — hónalj`, `— bikinivonal`, `— alsó lábszár`, a hat
alkalmas sorozat alkalmankénti árával). Amíg ez nincs meg, a kampányt ne indítsd el.

---

## 1. A kampány

| Beállítás | Érték | Miért |
|---|---|---|
| Típus | Keresés, csak Google-keresés | Keresési partnereket és Display-bővítést **KI** |
| Cél | Konverziók maximalizálása, **cél-CPA nélkül** | Nulla előzményadat: a tCPA az első hetekben fojtana |
| Keret | **2 000 Ft/nap** | A modell szerint a 3. hónapban ez 69%-on áll — feljebb nincs mit venni |
| Hely | **Budapest (város)** | A sugaras célzás a Sminkes kampányt 805 megjelenésre fojtotta |
| Helyzet-beállítás | „Jelenlét: az általad célzott helyeken" | Az érdeklődés-alapú célzás országos szemetet hoz |
| Nyelv | magyar + angol | A szempilla kampányban az idegen nyelv is konvertált |
| Ütemezés | nincs (24/7) | A napszak-vágás a V3.0-nál mért adatra épült — itt még nincs adat |
| Konverziós cél | fiók-alapértelmezett (Időpont foglalása) | Külön lézer-akció: lásd 6. pont |
| Hirdetéscsoport | 6 db (az 1–5. aktív, a 6. szünetel) | Csoportonként külön RSA + saját kulcsszó-téma = magasabb QS |

**Külön kampány, nem új csoport a `V3.0_Optimized`-ban** — három ok: más fizeti (a
géptulajdonos hirdetési kötelezettsége), nagyságrenddel más a vendégérték (88 000 Ft vs
12 000 Ft), és más a céloldal. Ez az egyetlen eset, amikor a „ne aprózd a Smart Bidding
tanulóadatát" szabály alól kivételt csinálunk.

---

## 2. Hirdetéscsoportok és kulcsszavak

Minden csoport **exact + phrase**, broad sehol. A GKP-ból mért havi keresés és a
„lap tetején" licit alsó–felső sávja Budapestre:

| # | Csoport | Fő kulcsszavak | Keresés/hó | Licit-sáv | Státusz |
|---|---|---|---|---|---|
| 0 | **Fej kulcsszo** | lézeres szőrtelenítés · végleges szőrtelenítés · …budapest | 5 450 | 131–507 | aktív |
| 1 | **Dioda lezer** | dióda lézeres szőrtelenítés (+23% YoY) · dióda lézer | 900 | 123–351 | aktív |
| 2 | **Lezer arak** | lézeres szőrtelenítés árak (+89%) · hány alkalom · akció | 380 | **121–201** | aktív |
| 3 | **Zonak** | intim · bikinivonal · hónalj · arc · hát szőrtelenítés | 600 | **56–208** | aktív |
| ~~4~~ | ~~Ferfi lezer~~ | **TÖRÖLVE** — a szalon nem vállal férfi vendéget | ~~490~~ | — | törölve |
| 5 | **Alternativa** | gyantázás budapest · elektrolízis · SHR · tűs epilálás | 2 210 | 81–273 | **szünetel** |

> **2026-09-16: a férfi hirdetéscsoport törölve.** A szalon nem vállal férfi vendéget —
> ez állandó szabály, a szempilla kampányban a `férfi` 2026-06-01 óta kizáró. A 18 férfi
> kulcsszó és az RSA kikerült, helyette 17 férfi-szándékú kizáró ment be kampány-szintre
> (`férfi`, `férfiaknak`, `here`, `mellkas`, `szakáll`, `men`, `male` és ékezet nélküli
> párjaik). A `Zonak` RSA-ból a „Nőknek és férfiaknak” címsor is kikerült.

**Mi itt az „olcsó kulcsszó".** A 2., 3. és 4. csoport a legolcsóbb magas-szándékú készlet:
a felső licit-sávjuk 201–261 Ft, miközben a fej-kulcsszóé 349–507 Ft. Ugyanaz a vendég,
feleannyi kattintásért. A 3. csoportban a `bikinivonal szőrtelenítés` **56 Ft**-os alsó
sávval a legolcsóbb tétel az egész készletben.

**Miért van mégis bent a fej-kulcsszó (0. csoport).** Mert a 2–4. csoport együtt csak
~1 470 keresés/hó, amiből reálisan **5–6 konverzió jön havonta** — a Konverziók
maximalizálása ez alatt soha nem lép ki a tanulási fázisból. A fej-kulcsszó nem azért van
bent, hogy olcsó legyen, hanem hogy **legyen miből tanulnia az algoritmusnak.** Exact
egyezés + 179 kizáró védi.

**Az 5. csoport miért szünetel.** 2 210 keresés/hó, 81–140 Ft-os kattintás — ez a legolcsóbb
forgalom a piacon, de gyantázni akarnak, nem lézerezni. Becsült konverziós arány 2,5% a
6–8% helyett. **Akkor kapcsold be, ha az 1–4. csoport 3 hónap alatt hozott legalább 15
konverziót** — addig elszívná a keretet a tanulás elől.

---

## 3. Várható eredmény — a táblázat

Bázis-forgatókönyv, 2 000 Ft/nap, 0–4. csoport. A megjelenés-arány a reális felfutást
követi (22% → 48%), a CPC a 3. hónaptól esik, ahogy a Quality Score beérik.

| Hónap | Megjelenés | Kattintás | CTR | CPC | Költés | Konverzió | CPA | Keret-kihasználtság |
|---|---|---|---|---|---|---|---|---|
| 1. | 1 306 | 76 | 5,8% | 237 Ft | 17 906 Ft | 4,2 | 4 244 Ft | 29% |
| 2. | 2 566 | 149 | 5,8% | 237 Ft | 35 169 Ft | 8,3 | 4 244 Ft | 58% |
| 3. | 3 518 | 204 | 5,8% | 194 Ft | 39 558 Ft | 11,4 | 3 481 Ft | 65% |
| 4. | 4 032 | 234 | 5,8% | 194 Ft | 45 327 Ft | 13,0 | 3 481 Ft | 75% |
| 5. | 4 251 | 246 | 5,8% | 194 Ft | 47 800 Ft | 13,7 | 3 481 Ft | 79% |
| 6. | 4 398 | 255 | 5,8% | 194 Ft | 49 448 Ft | 14,2 | 3 481 Ft | 81% |
| **6 hó** | **20 071** | **1 164** | **5,8%** | **202 Ft** | **235 209 Ft** | **65** | **3 628 Ft** | — |

A férfi csoport törlése 70 → 65 konverzió, 24 → 23 vendég. Kevesebb, mint amennyit a
490-es keresési volumene sugall: ez volt a leggyengébb konverziós arányú olcsó klaszter.

### Csoportonkénti bontás (3. hónap)

| Csoport | Megjelenés | Kattintás | CTR | CPC | Költés | Konverzió | CPA |
|---|---|---|---|---|---|---|---|
| Fej kulcsszo | 2 616 | 144 | 5,5% | 210 Ft | 30 215 Ft | 7,2 | 4 200 Ft |
| Dioda lezer | 432 | 28 | 6,5% | 180 Ft | 5 054 Ft | 2,0 | **2 571 Ft** |
| Lezer arak | 182 | 15 | 8,0% | 140 Ft | 2 043 Ft | 1,2 | **1 750 Ft** |
| Zonak | 288 | 17 | 6,0% | 130 Ft | 2 246 Ft | 1,0 | **2 167 Ft** |

Ez a táblázat mondja meg, mit ér az „olcsó kulcsszó" stratégia: **a 2–3. csoport
1 750–2 571 Ft-os CPA-n dolgozik, a fej-kulcsszó 4 200 Ft-on.** A 2. csoport (ár-szándék)
2,4-szer olcsóbb konverziót hoz — csak kevesebbet.

### A konverzió ≠ vendég — a második réteg

Az Ads „konverzió" nálunk **Notino-kattintás**, nem lezárt foglalás. A fiók mért aránya a
szempillánál 52–75%; a lézernél ez rosszabb lesz, mert 66 000–378 000 Ft-os sorozatról dönt
a vendég, nem egy 12 000 Ft-os kezelésről. **35%-os zárással számolva:**

| Hónap | Ads-konverzió | Valós új lézer-vendég | Költség/vendég | Bruttó bevétel (88 000 Ft/vendég) | FRU 50% |
|---|---|---|---|---|---|
| 1. | 4,5 | 1,6 | 11 945 Ft | 139 000 Ft | 70 000 Ft |
| 3. | 12,2 | 4,3 | 9 815 Ft | 375 000 Ft | 188 000 Ft |
| 6. | 15,2 | 5,3 | 9 815 Ft | 469 000 Ft | 235 000 Ft |
| **6 hó** | **70** | **24** | **10 200 Ft** | **2 141 000 Ft** | **1 071 000 Ft** |

A 10 200 Ft-os vendégszerzési költség a 88 000 Ft-os első vásárlás **11,6%-a** — az üzleti
terv 20%-os hirdetési sapkája alatt, közel a feléig.

### 1 200 Ft/nap — alacsonyabb keret

| Hónap | Megjelenés | Kattintás | CTR | CPC | Költés | Konverzió | CPA | Keret | Állapot |
|---|---|---|---|---|---|---|---|---|---|
| 1. | 1 306 | 76 | 5,8% | 237 Ft | 17 906 Ft | 4,2 | 4 244 Ft | 49% | elérés-korlátos |
| 2. | 2 566 | 149 | 5,8% | 237 Ft | 35 169 Ft | 8,3 | 4 244 Ft | 96% | elérés-korlátos |
| 3. | 3 245 | 188 | 5,8% | 194 Ft | 36 480 Ft | 10,5 | 3 481 Ft | 100% | **keret-korlátos** |
| 4. | 3 245 | 188 | 5,8% | 194 Ft | 36 480 Ft | 10,5 | 3 481 Ft | 100% | **keret-korlátos** |
| 5. | 3 245 | 188 | 5,8% | 194 Ft | 36 480 Ft | 10,5 | 3 481 Ft | 100% | **keret-korlátos** |
| 6. | 3 245 | 188 | 5,8% | 194 Ft | 36 480 Ft | 10,5 | 3 481 Ft | 100% | **keret-korlátos** |
| **6 hó** | **16 850** | **976** | **5,8%** | **204 Ft** | **198 996 Ft** | **54,4** | **3 656 Ft** | — | — |

**A 3. hónaptól megfordul a korlát.** Eddig minden forgatókönyvben az elérés fogta vissza a
kampányt; 1 200 Ft/napnál a keret lesz a kötő feltétel, és a kampány **10,5 konverzión
beragad** — nem azért, mert nincs kereslet, hanem mert elfogy a pénz.

Csoportonként a 3. hónapban (innentől nem változik):

| Csoport | Megjelenés | Kattintás | CTR | CPC | Költés | Konverzió | CPA |
|---|---|---|---|---|---|---|---|
| Fej kulcsszo | 2 412 | 133 | 5,5% | 210 Ft | 27 863 Ft | 6,6 | 4 200 Ft |
| Dioda lezer | 398 | 26 | 6,5% | 180 Ft | 4 661 Ft | 1,8 | **2 571 Ft** |
| Lezer arak | 168 | 13 | 8,0% | 140 Ft | 1 884 Ft | 1,1 | **1 750 Ft** |
| Zonak | 266 | 16 | 6,0% | 130 Ft | 2 072 Ft | 1,0 | **2 167 Ft** |

FRU-oldal hat hónapra: **19 valós vendég**, 1 676 215 Ft bruttó, 838 107 Ft az 50%,
mínusz 25 143 Ft anyag és 198 996 Ft hirdetés = **613 968 Ft nettó**, vendégenként 32 233 Ft.

### Mit vesz a plusz 800 Ft/nap

| | 6 havi költés | Konverzió | CPA | Vendég | FRU nettó |
|---|---|---|---|---|---|
| 1 200 Ft/nap | 198 996 Ft | 54,4 | 3 656 Ft | 19,0 | 613 968 Ft |
| 2 000 Ft/nap | 235 209 Ft | 64,8 | 3 628 Ft | 22,7 | 733 154 Ft |
| **különbözet** | **+36 214 Ft** | **+10,4** | — | **+3,6** | **+119 186 Ft** |

**A plusz keret nem drágább konverziót vesz, csak többet: 3 481 Ft/konverzió — pontosan az
átlagos CPA.** Ez azért van, mert a kampány nem licit-korlátos, hanem egyszerűen elfogy a
pénze, mielőtt a meglévő olcsó aukciókat leszedné. A 36 214 Ft plusz hirdetés 155 000 Ft
nettó vendégértéket hoz.

### A készpénz-mélypont viszont alig változik

| | 1. hó | 2. hó | 3. hó | 4. hó | 5. hó | 12. hó |
|---|---|---|---|---|---|---|
| 1 200 Ft/nap, kumulált | −7 449 | **−21 919** | −21 765 | −911 | +46 119 | +616 193 |
| 2 000 Ft/nap, kumulált | −7 236 | **−22 211** | −22 211 | −3 518 | +42 578 | +737 896 |

**Az alacsonyabb keret 292 Ft-tal javítja a mélypontot.** Mert az első két hónapban a
kampány úgysem tudja elkölteni a 2 000 Ft-ot — a keret csak a 3. hónaptól fog, amikorra már
jön a bevétel. Ha a keretcsökkentés oka a készpénz volt, ez a döntés nem éri el a célját;
ha az oka a kockázat-korlátozás, akkor viszont érvényes.

### Érzékenység (3. hónap)

| Forgatókönyv | Költés | Konverzió | CPA | Vendég | Ft/vendég |
|---|---|---|---|---|---|
| Pesszimista (CVR −40%, CPC +25%) | 52 329 Ft | 7,3 | 7 156 Ft | 2,6 | 20 447 Ft |
| **Bázis** | 41 863 Ft | 12,2 | 3 435 Ft | 4,3 | 9 815 Ft |
| Optimista (CVR +40%, CPC −15%) | 35 584 Ft | 17,1 | 2 086 Ft | 6,0 | 5 959 Ft |

Még a pesszimista ágon is 20 447 Ft a vendégszerzés a 88 000 Ft-os vásárlásra — 23%, azaz
épp a hirdetési sapka fölött. **A kampány a modell teljes szórásában nyereséges.**

### Mi lenne, ha CSAK az olcsó kulcsszavak futnának

| | 6 havi költés | Konverzió | CPA | Valós vendég |
|---|---|---|---|---|
| Csak olcsó hosszú farok (1–3. csoport) | 54 185 Ft | 22 | **2 462 Ft** | 8 |
| Fej-kulcsszóval együtt (0–3.) | 235 209 Ft | 65 | 3 628 Ft | **23** |

A tisztán olcsó kampány **32%-kal olcsóbb konverziót** hoz — és **15 vendéggel kevesebbet**
fél év alatt. Ha a cél a legolcsóbb CPA, az első sor nyer. Ha a cél a megtelt szék, a
második. A géptulajdonossal kötött megállapodás a széket fizeti, nem a CPA-t.

---

## 3b. A FRU-oldal a 50%-os részesedéssel — utólag beszúrva

A 3. pont táblázatának „FRU 50%" oszlopa **bruttó fél**, anyagköltség és hirdetés nélkül.
A tényleges FRU-oldali eredmény:

| Egy vendég | Ft |
|---|---|
| Bruttó első vásárlás | 88 000 |
| FRU 50% | 44 000 |
| − anyagköltség (1,5% a bruttóból) | −1 320 |
| **= FRU nettó, hirdetés előtt** | **42 680** |

**Megtérülési határ: a hirdetés vendégenként 42 680 Ft-ig mehet fel nullszaldóig.**
A modell szerinti tényleges 10 367 Ft — ez a határ 24%-a, **4,2-szeres biztonsági sáv**.
A pesszimista ágon (20 447 Ft) is 2,1-szeres. A kampány a modell teljes szórásában
nyereséges marad a 50%-os leadás után is.

### Hat hónap, 23 új vendég — RÖGZÍTETT: a hirdetést MI fizetjük

2026-09-16-i döntés: a hirdetési költséget a FRU-oldal viseli, a saját 50%-ából.
Az üzleti terv „élő ajánlata" (a tulajdonos fizeti a gépet ÉS a teljes hirdetést) tehát
NEM ez — a különbség hat hónapra **235 209 Ft, a részesedés 23,6%-a.** Ez a tény nem
dönti meg a kampányt, de ez az egyetlen tétel, amit tárgyalással lehetne megnyerni, és
kulcsszó-optimalizálással nem.

| | 6 hó |
|---|---|
| Elkötelezett bruttó (23 vendég × 88 000 Ft) | 2 024 000 Ft |
| FRU 50% | 1 012 000 Ft |
| − anyagköltség (1,5%) | −30 360 Ft |
| − hirdetés | −235 209 Ft |
| **= FRU nettó** | **746 431 Ft** |
| Vendégenként | 32 453 Ft |
| Ft / lefoglalt óra | **8 855 Ft** |

### Ft / lefoglalt óra — az egyetlen mérőszám, ami számít

> **KORREKCIÓ 2026-09-16.** Ennek a szakasznak az első változata azt állította, hogy a lézer
> 50%-on a szempilla/szemöldök vonal ALATT van. Téves volt, két okból: (1) a lézer-oldalon a
> kedvezményes CSOMAG-rátákkal (10 105–11 600) számoltam a ténylegesen eladott ZÓNA-ráták
> helyett; (2) a szempilla/szemöldök oldalon az üzleti terv 2026-08-i „10 000–14 400 Ft/óra"
> becslését vettem át, ahelyett hogy az élő Notino-árakból és a VALÓDI lefoglalt sávokból
> számoltam volna. Az alábbi tábla minden sora élő adat (Notino 2026-09-16, `src/data/lezer.ts`).

Lézer, sorozat-áron, a lefoglalt sáv = a zóna felső kezelési ideje + 10 perc ráhagyás:

| Zóna | Ár/alkalom | Lefoglalt | FRU 50% | − anyag | − hirdetés is |
|---|---|---|---|---|---|
| XS (ajak, áll) | 7 000 | 25 perc | 8 400 | 8 148 | 4 068 |
| S (hónalj, bikinivonal) | 11 000 | 30 perc | 11 000 | **10 670** | 7 270 |
| M (alkar, has) | 16 000 | 40 perc | 12 000 | **11 640** | 9 090 |
| L (lábszár, hát) | 23 000 | 55 perc | 12 545 | **12 169** | 10 315 |
| XL (teljes láb) | 33 000 | 80 perc | 12 375 | **12 004** | 10 729 |

A saját, 100%-os szolgáltatások ugyanezen az alapon (élő Notino-ár / élő lefoglalt idő):

| Szolgáltatás | Ft/óra |
|---|---|
| Teljes esküvő · Esküvői smink · Menyasszonyi csomag | 19 500 – 25 500 |
| Arckezelések (anyagköltség NINCS levonva) | 12 900 – 22 000 |
| Mindennapi smink | 13 000 |
| Szemöldök laminálás festés nélkül | 12 000 |
| **→ a lézer S–XL sávja, 50% és anyag után** | **10 670 – 12 169** |
| Szemöldök laminálás festéssel | 11 000 |
| Smink · Smink fotózáshoz · Sminkpróba · Sminkoktatás | 10 000 – 11 250 |
| Teljes Megújulás csomag | 9 750 |
| **Szempilla lifting + festés** | **9 600** |
| Szempillafestés | 9 600 |
| Teljes Tekintet Csomag | 9 000 |
| Szemöldök formázás+festés · szedés · szempillafestés | 8 000 |
| Gyantázás | 6 000 |

**A lézer az XS zónát leszámítva a teljes szempilla/szemöldök vonal FÖLÖTT van — a 50%-os
leadás után is.** Az S zóna (hónalj, bikinivonal), ami a belépő termék, 10 670 Ft/óra: több,
mint a szempilla lifting 9 600-a és a Teljes Tekintet Csomag 9 000-e. Csak az arckezelések és
az esküvői smink előzik meg — azok viszont vagy anyagigényesek, vagy szezonálisan korlátosak.

**A hirdetés ezt a sorrendet nem forgatja fel, csak a kis zónákon szorít.** Az L és XL zónán
még a hirdetéssel együtt is 10 315–10 729 Ft/óra marad. És ez a legrosszabb eset: a
vendégszerzési költség **egyszeri**, a sorozat utáni évi egy-két karbantartó alkalom már a
teljes „− anyag" rátán megy.

### Amit ez a táblázat NEM mond meg

Az összes fenti összehasonlítás csak akkor érdekes, ha a szék tele van. **Nincs tele:**
2026 augusztusában 266,5 óra műszakból 94,5 óra volt lefoglalt — **35,5% kihasználtság,
172 szabad óra havonta.** A `Lezer_V1` csúcson ~17 órát igényel havonta, a szabad kapacitás
10%-át. **A lézer-óra nem szorít ki semmit — üres órát tölt meg.** Amíg ez így van, nem a
sorrend számít, hanem az, hogy egyáltalán jön-e vendég.

### A kar átkerült: nem a CPC, hanem az átlagos kosár

Mivel a hirdetést mi fizetjük, minden hirdetési forint a FRU-oldal feléből megy el — de a
**vendégszerzés költsége ugyanannyi, akármekkora sorozatot vesz a vendég.** Ezért a
legnagyobb kar nem a kattintás ára, hanem az, hogy mekkora sorozatot visz el.

| Átlagos első vásárlás | Bruttó (23 vendég) | FRU nettó, hirdetés után | Vendégenként | A hirdetés a részesedés %-a |
|---|---|---|---|---|
| 66 000 Ft (egy S zóna) | 1 518 000 | 501 021 | 21 784 | 31,0% |
| **88 000 Ft (a modell)** | **2 024 000** | **746 431** | **32 454** | **23,2%** |
| 120 000 Ft | 2 760 000 | 1 103 391 | 47 974 | 17,0% |
| 222 000 Ft (Sima Nyár trió) | 5 106 000 | 2 241 201 | 97 444 | 9,2% |

**Az átlag 88 000 → 120 000 Ft-ra emelése +356 960 Ft — másfélszer annyi, mint amennyit a
teljes hirdetési költség áthárítása hozna (+235 209 Ft).** Ugyanannyi kattintásból,
ugyanannyi hirdetési pénzből.

És a lefoglalt órára vetítve ugyanez:

| Amit a vendég vesz | Ár/alkalom | Lefoglalt | Ft/óra hirdetéssel | hirdetés nélkül |
|---|---|---|---|---|
| S zóna egyedül (hónalj) | 11 000 | 30 perc | **7 270** | 10 670 |
| M zóna | 16 000 | 40 perc | 9 090 | 11 640 |
| **Sima Nyár trió** | **37 000** | **95 perc** | **10 260** | 11 334 |
| L zóna (lábszár) | 23 000 | 55 perc | 10 315 | 12 169 |
| Tetőtől Talpig | 63 000 | 165 perc | 10 493 | 11 111 |
| XL (teljes láb) | 33 000 | 80 perc | **10 729** | 12 004 |

A hirdetési költség a kis zónákat bünteti: az S zónán 3 400 Ft/órát visz el, az XL-en
1 275-öt. **Egy trió-vendég 41%-kal jobb órát ad, mint egy hónalj-vendég.**

### …de kulcsszóval ezt NEM lehet terelni

Megnéztem a nagy zónák keresési volumenét: `hát szőrtelenítés` 20/hó, `láb szőrtelenítés` 10,
`teljes test szőrtelenítés` 10, `comb` / `alkar` / `has` / `kar` mind 10 — a nagy része
„Ismeretlen" versennyel, azaz valós adat nélkül. Az egész nagy-zóna klaszter ~100–150
keresés/hó. **A kereslet a kis zónákon van** (`intim szőrtelenítés` 170, `bikinivonal` 30,
`férfi intim` 170).

Ezért a terelés nem kulcsszó-feladat, hanem **céloldal-feladat**: a hirdetés hozza be a
hónalj-keresőt a 11 000 Ft-os horgonnyal, a Sima Nyár triót pedig az oldal adja el neki.
A `Zonak` hirdetéscsoport RSA-jába ezért bekerült egy csomag-címsor („Három Zóna Egy
Időpontban") és egy csomag-leírás — de az érdemi munka a 222 000 Ft-os trió
meggyőző erején van, nem a hirdetésen.

### Pénzáramlás, ha FRU fizeti a hirdetést

A sorozatot alkalmanként fizetik, tehát a bevétel 6–8 hónapra nyúlik, a hirdetés viszont
azonnal megy el. Havi egyenleg:

| Hónap | 1. | 2. | 3. | 4. | 5. | 6. | 12. |
|---|---|---|---|---|---|---|---|
| Egyenleg | −7 236 | −14 540 | −435 | +18 693 | +46 096 | +78 592 | +35 567 |
| Kumulált | −7 236 | −21 776 | **−22 211** | −3 518 | +42 578 | +121 170 | **+746 431** |

**A mélypont −22 211 Ft a 2. hónapban, a nullszaldó a 4–5. hónapban.** Ennyi készpénzt kell
kibírni, ha nem a tulajdonos hirdet.

### A keresztértékesítés dönti el, hogy megérte-e

Hat hónap alatt 138 találkozás. Ha ezek 20%-án vesznek egy 18 000 Ft-os, teljes fedezetű
szolgáltatást: **+496 800 Ft, 100%-ban FRU-é.** Ez a „FRU fizeti a hirdetést"
forgatókönyvet 746 431 → 1 243 231 Ft-ra, azaz **1,67-szeresére** emeli.

Az üzleti terv ezt már 2026-08-18-án kimondta: a lézer önmagában, ezen a felosztáson nem
üzleti előrelépés — a keresztértékesítés teszi azzá. **A kampányt tehát nem a lézer
megtérülésére kell optimalizálni, hanem új vendég megszerzésére**; a Lezer_V1 pontosan
így van beállítva (Konverziók maximalizálása, nem érték-alapú licit).

---

## 4. Amit a modell NEM tud

- **A keret nem kar.** A kampány a 3. hónapban is csak a keret 69%-át költi el. Az üzleti
  tervben szereplő 100 000 Ft/hó hirdetési minimumot **keresésből nem lehet elkölteni** a
  budapesti lézer-piacon. A maradéknak más helye van (Performance Max, Meta, vagy Pest
  megyei kiterjesztés) — de az már nem ez a kampány.
- **Szezonalitás.** A fej-kulcsszó szeptemberben 2 900, novembertől 3 600, májusban 4 400.
  A modell az 1. hónapra 0,81-es szorzót használ. Az őszi indulás jó időzítés: a sorozat
  hat alkalma nyárra készül el, és barnult bőrön nem lehet kezelni.
- **A Quality Score visszatekintő.** Az első 2–3 hétben a CPC magasabb lesz, mint a
  táblázat. A 231 Ft már tartalmazza ezt; ha az első héten 300 Ft fölött van, az normális.
- **A 35%-os zárási arány becslés**, nem mérés. A 3. hónap végén a Notino Partner
  statisztikája adja meg a valódi számot.

---

## 5. Import — a sorrend számít

1. **Notino: lézer-szolgáltatások felvitele.** Amíg nincs, ne indulj (lásd 0. pont).
2. Kampány létrehozása kézzel a felületen (`Lezer_V1`, az 1. pont beállításaival).
3. `lezer-v1-kulcsszavak.csv` import — Google Ads Editor → Account → Import → From file.
4. `lezer-v1-rsa-hirdetesek.csv` import (a 6. csoport RSA-ja `Paused` státusszal jön).
5. `lezer-v1-negativ-BEILLESZTHETO.txt` — **beillesztéssel**, nem fájlból. Két blokk:
   179 kampány-szintű, majd 20 csoport-szintű az 1–5. csoportra külön-külön.
6. Assetek kampány-szinten: sitelink (Árlista / Kinek működik / Gyakori kérdések /
   Kapcsolat), callout, strukturált kódrészlet, **GBP helybővítmény**, 6 lézer-kép.
   Ezek **nem öröklődnek** a másik kampányból — ez a V3.0-nál már egyszer megfájt.

---

## 6. Két opcionális javítás, ha megy a kampány

**a) Külön lézer-konverziós akció.** Ma minden Notino-kattintás ugyanarra az akcióra fut,
fix 12 500 Ft értékkel. A lézer első vásárlása ennek a hétszerese. Amíg Konverziók
maximalizálása fut (nem érték-alapú), ez nem torzít, de a riportolást igen. A
`Layout.astro` konverzió-tüzelő logikájához **nem kell hozzányúlni** ahhoz, hogy külön
akciód legyen: elég egy második `send_to` a lézer-útvonalon. Perf-érzékeny fájl, csak akkor
nyúlj hozzá, ha a kampány már termel.

**b) A kizáró lista karbantartása.** Az első 2 hét keresési kifejezés-jelentése többet ér,
mint bármelyik előre megírt lista. Készülék-szándék („szőrtelenítŐ") a legnagyobb
kockázat — 720+590+480 keresés/hó megy a krém, IPL és gép változatokra.

---

## 7. Forrás

Minden keresési volumen és licit-sáv: Google Ads Kulcsszótervező, Budapest, 2025.08–2026.07
(`lezer/GKP-*.tsv`, 1208 kulcsszó). Árak: `src/data/lezer.ts` (2026-09-12-i élesítés).
Vendégérték és 88 000 Ft-os első vásárlás: `lezer/LEZER-UZLETI-TERV-2026-08-18.md`.
Konverziós lánc-arányok: a 2026-09-07-i GSC+GA4+Notino Partner mérés.
A CTR-, CVR- és megjelenés-arány-becslés modell, nem mérés.
