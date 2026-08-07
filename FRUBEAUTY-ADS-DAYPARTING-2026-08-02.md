# FRU Beauty — Google Ads napszak/nap ütemterv (dayparting)

**Kelt:** 2026-08-02 · **Fiók:** 853-998-4403 · **Kampány:** `V3.0_Optimized` (ID 23904708398)
**Adatforrás:** élő Google Ads fiók, „Mindig" nézet (2026. márc. 4. – aug. 2.), napszak- és hét-napja-szegmens
**Időzóna:** a fiók GMT+02:00 (közép-európai idő) — minden órasáv ebben értendő

---

## 0. Vezetői összefoglaló — 1 mondatban

**Egyetlen beavatkozás indokolt most: vedd ki a 17:00–19:59 sávot az ütemezésből.** Ez viszi a költés
14,2%-át és a konverziók 5,6%-át; minden más sáv vagy jó, vagy nincs elég bizonyíték a vágásra.
A hét napjait **ne** vágd — a napi keret napi, a szerdán meg nem költött pénz nem megy át keddre,
és van szabad kapacitás, tehát a volumen a cél.

---

## 1. Kiindulási állapot (tények a fiókból)

| | Teljes élettartam (jún. 3 – aug. 2) | Utolsó 30 nap (júl. 3 – aug. 1) |
|---|---|---|
| Konverzió | 53,50 | 26,00 |
| Kattintás | 197 | 89 |
| Megjelenés | 2 816 | 1 438 |
| Költés | 55 744 Ft | 27 988 Ft |
| CPA | 1 042 Ft | 1 076 Ft |
| Konv. arány | 27,2% | 29,2% |
| Átl. CPC | 283 Ft | 314 Ft |

- Napi keret: **3 500 Ft** · Kampányállapot a fiókban: **„Költségkeret által korlátozva"**
- Cél-CPA (hirdetéscsoport szinten, mindkettőn): **1 500 Ft**
- Hirdetéscsoportok: `Szempilla Lifting` (39,50 konv / CPA 1 038 Ft) · `Szemöldök Laminálás` (14,00 konv / CPA 1 054 Ft)
- Konverzió = **foglalás-gomb kattintás** (Notino-átirányítás előtti kattintás), nem befejezett foglalás

### ⚠ Egy fel nem oldott ellentmondás, amit mérni kell

A fiók **„Költségkeret által korlátozva"**-t ír, viszont az utolsó 30 nap tényleges költése
**27 988 Ft / 30 nap = 933 Ft/nap**, a 3 500 Ft-os keret **27%-a**. A kettő csak úgy fér össze, ha a
kiszolgálás nagyon egyenetlen: néhány napon délre elfogy a keret, a többi napon alig van forgalom.

Ez azért számít, mert **ettől függ, hogy a dayparting nyer-e volument vagy csak CPA-t**:

- ha a keret **tényleg kifut** a jó napokon → a 17–19-től elvett pénz átmegy a jobb sávokba → **több foglalás**
- ha a kampány **nem tudja elkölteni** a keretet → a vágás csak kevesebb költést és jobb CPA-t hoz

**Teendő (5 perc):** Kampányok → Oszlopok → *Versenymutatók* → kapcsold be a
**„Keresési megj. arány"**, **„Elveszített ker. megj. arány (költségkeret)"** és
**„Elveszített ker. megj. arány (rangsor)"** oszlopokat. Ha a *rangsor*-veszteség a nagyobb, akkor
nem a keret, hanem a licit/QS a szűk keresztmetszet → lásd 6. pont.

---

## 2. Napszak-elemzés (V3.0_Optimized, mind a 24 óra)

A napszakbontás összesen 52,5 konv / 197 katt / 55 744 Ft-ot fed le (a kampány azóta 53,5-re frissült;
az arányokat ez nem érinti).

| Sáv | Katt | Konv | Költés | CPA | Konv. arány |
|---|---|---|---|---|---|
| 06–08 | 26 | 11,00 | 7 163 Ft | **651 Ft** | 42,3% |
| 14–16 | 34 | 11,66 | 9 739 Ft | **835 Ft** | 34,3% |
| 20–23 | 35 | 11,00 | 10 698 Ft | **972 Ft** | 31,4% |
| 00–05 | 9 | 3,83 | 2 796 Ft | 730 Ft | 42,6% |
| 09–11 | 38 | 10,00 | 10 651 Ft | 1 065 Ft | 26,3% |
| **17–19** | 31 | 3,00 | 7 911 Ft | **2 637 Ft** | **9,7%** |
| **12–13** | 24 | 2,00 | 6 786 Ft | **3 393 Ft** | **8,3%** |
| **Összes** | 197 | 52,49 | 55 744 Ft | 1 062 Ft | 26,6% |

A három legdrágább egyedi óra: **19:00** (15 katt / 1 konv / 3 511 Ft), **13:00** (17 / 2 / 5 097 Ft),
**12:00** (7 / 0 / 1 689 Ft). A legjobb egyedi óra **08:00** (11 katt / 7 konv / CPA 489 Ft).

### Szignifikancia — mi bizonyított és mi nem

Alapvonal: 26,6% konverziós arány, binomiális egyoldalas próba, folytonossági korrekcióval.

| Állítás | Bizonyíték | Ítélet |
|---|---|---|
| **17–19 alulteljesít** | V3.0: 31 katt / 3 konv, p ≈ 0,027 · teljes fiók (4 kampány): 60 katt / 7 konv, p ≈ 0,019 · a másik 3 kampány önmagában: 29 katt / 4 konv, azonos irány, p ≈ 0,14 (kombinált Fisher p ≈ 0,025) | **Elfogadva — cselekedj** |
| 12–13 alulteljesít | V3.0: 24 katt / 2 konv, p ≈ 0,036 · **de a másik 3 kampányban 53 katt / 14 konv = 26,4%, azaz átlagos** → nem replikálódik | **Figyelőlistára**, ne vágd |
| 06–08 kiemelkedik | 26 katt / 11 konv, p ≈ 0,035 — de 7 sávból utólag kiválasztva, Bonferroni-küszöb 0,007 | Nem vágunk semmit rá, csak megtartjuk |
| Nap × óra mátrix (7×24) | 168 cellára 52,5 konverzió = cellánként 0,3 | **Nincs értelmezhető adat — tilos rá szabályt építeni** |

---

## 3. Hét-napja elemzés

Két **független** kampány (V3.0_Optimized és a korábbi Szempilla_Kampany), összesen
99,5 konv / 463 katt, közös alapvonal 21,5% konv. arány.

| Nap | V3.0 katt / konv / CPA | Szempilla_Kampany katt / konv / CPA | Egyezik? |
|---|---|---|---|
| **kedd** | 37 / 14,00 / **541 Ft** | 27 / 9,00 / 1 062 Ft | ✅ mindkettőben a legjobb |
| **hétfő** | 36 / 13,00 / **692 Ft** | 38 / 9,00 / 1 496 Ft | ✅ mindkettőben erős |
| vasárnap | 45 / 13,00 / 1 027 Ft | 34 / 4,00 / 3 467 Ft | ❌ ellentmondás |
| csütörtök | 24 / 6,17 / 1 363 Ft \* | 57 / 11,00 / 2 399 Ft | ~ közepes |
| **szerda** | 15 / 2,00 / **2 729 Ft** | 41 / 5,00 / 3 212 Ft | ✅ mindkettőben gyenge |
| **péntek** | 8 / 1,33 / **2 404 Ft** \* | 30 / 5,00 / 2 866 Ft | ✅ mindkettőben gyenge |
| **szombat** | 10 / 2,00 / **1 442 Ft** \* | 39 / 3,00 / 5 234 Ft | ✅ mindkettőben gyenge |

\* A `Szemöldök Laminálás` hirdetéscsoport csüt/pén/szo bontása nem volt kinyerhető a felületről
(összesítve 2,00 konv / 22 katt / 5 857 Ft). Ez a hiányzó blokk **9,1% konverziós arányú**, tehát a
beszámítása a „szerda–péntek–szombat gyenge" következtetést **erősítené**, nem gyengítené.

**Próbák (két kampány egyesítve):**

- **kedd**: 64 katt / 23,00 konv = 35,9% vs 21,5% → z = 2,67, **p ≈ 0,0038** (Bonferroni-küszöb 7 napra: 0,0071) → **szignifikáns nyertes**
- **szerda + péntek + szombat**: 143 katt / 18,33 konv = 12,8% vs 21,5% → z = −2,43, **p ≈ 0,0076** → **szignifikáns vesztes blokk**
- hétfő: 74 katt / 22,00 konv = 29,7% → p ≈ 0,042 → irányában jó, önmagában gyenge bizonyíték
- vasárnap: a két kampány ellentmond egymásnak → **nincs döntés**

---

## 4. A javaslat és a mögötte lévő két megszorítás

### 4.1 Technikai megszorítás — ez dönti el a beavatkozás FORMÁJÁT

A kampány **Konverziók maximalizálása + cél-CPA** licitálást használ (hirdetéscsoport-szintű
cél-CPA 1 500 Ft). Smart Biddingnél a Google **figyelmen kívül hagyja a hirdetésütemezés
bid-módosítóit**. Tehát:

- ❌ „17–19 → −50%" beállítás → **semmilyen hatása nincs**
- ✅ a 17–19 **kivétele magából a hirdetésütemezésből** (nem jelenik meg a hirdetés) → **valódi hatás**

Ezért a terv kizárólag ütemezés-be/kivétel, nem licitmódosító.

### 4.2 Üzleti megszorítás

- **Van bőven szabad kapacitás** → a cél a konverzió-VOLUMEN, nem a legalacsonyabb CPA
- **Keret marad 3 500 Ft/nap** → nincs skálázás, csak újraelosztás
- **Szalon: hétfő–szombat, vasárnap zárva**

---

## 5. AZ ÜTEMTERV — ✅ BEÁLLÍTVA 2026-08-02

**Hol van a felületen:** bal menü → **Közönségek, kulcsszavak és tartalom → Hirdetésütemezés**
(NEM a Kampánybeállítások között — onnan hiányzik). Szerkesztés: a kék ceruza (FAB) gomb.

Kiindulás: nem volt beállítva ütemezés („a hét minden napján, egész nap megjelenhetnek").
Beállítva két sor, majd Mentés. **Ellenőrizve: 14 sor jött létre (7 nap × 2 blokk).**

| # | Napok | Kezdés | Vége |
|---|---|---|---|
| 1 | Minden nap | 00:00 | 17:00 |
| 2 | Minden nap | 20:00 | 00:00 |

Ennyi. Ez egyetlen dolgot csinál: **kiveszi a 17:00–19:59 sávot mind a hét napon.**

### Két dolog, amit a Google a mentéskor kiírt (mindkettő fontos)

1. **„A kiszámítható havi költés támogatása érdekében a kampányok mostantól egy teljes hónapra
   ütemeződnek, és elosztják a költségkeretet az aktív hirdetésütemezésben."**
   → Ez válasz arra a kérdésre, hogy a 00:00–17:00 blokk „elviszi-e" a napi keretet a 20:00–00:00
   elől: **a Google a keretet az aktív ütemezésre osztja el**, nem érkezési sorrendben égeti.
   Nincs és nem is kell napszakonkénti keret-felosztás. (A napi keret napszakok közti kézi
   szétosztására egyébként sincs natív eszköz — csak kampány-szétvágással lenne, ami ekkora
   volumennél szétvágná a Smart Bidding tanulóadatát.)
2. **„A mentéssel törli a módosított beállításokat, és újakat ad hozzá, amivel visszaállítja a
   teljesítményadatokat."** → az **ütemezés-szintű** statisztika nulláról indul (ezért mutat minden
   sor 0-t). A napszak-riportok és a kampány előzményei ettől érintetlenek.

### Mit NEM csinálunk és miért

| Nem csináljuk | Indok |
|---|---|
| **Nem vágunk napot** (szerdát sem) | A napi keret **napi**: a szerdán meg nem költött pénz **nem** megy át keddre. Napvágásból tehát nem lesz több keddi foglalás, csak kevesebb összes foglalás. Szabad kapacitás mellett ez rossz csere. A szerda bizonyítéka is gyengébb (p ≈ 0,07 önmagában). |
| **Nem vágjuk a vasárnapot**, pedig zárva a szalon | A vasárnap adja a V3.0 konverzióinak **24%-át** (13 konv / 45 katt / CPA 1 027 Ft). Vasárnap **a hétre előre foglalnak** — a zárva tartás nem jelenti, hogy a hirdetés értéktelen. |
| **Nem vágjuk a 12–13-at** (még) | V3.0-ban rossz (CPA 3 393 Ft), de a másik három kampányban átlagos (26,4%) → **nem replikálódik**, és a teljes minta 24 kattintás. Figyelőlistára kerül előre rögzített döntési szabállyal. |
| **Nem vágjuk az éjszakát (00–05)** | Kevés forgalom, de olcsó és jól konvertál (9 katt / 3,83 konv / CPA 730 Ft). Nincs ok kizárni. |
| **Nem építünk 7×24-es mátrixot** | 168 cellára 52,5 konverzió jut. Bármilyen cellaszintű szabály tiszta zajra illesztés lenne. |

---

## 6. Várható hatás

A 17–19 sáv a **költés 14,2%-át** és a **konverziók 5,6%-át** adja. Az utolsó 30 napra vetítve
≈ **3 970 Ft költés / ≈ 1,5 konverzió**.

| Forgatókönyv | Eredmény 30 napra |
|---|---|
| **A keret tényleg kifut** (a fiók státusza szerint) → a pénz átmegy a maradék sávokba, azok 980 Ft-os CPA-ján | 3 970 / 980 ≈ **+4,0 konverzió**, mínusz az elvesztett 1,5 → **nettó ≈ +2,5 foglalás/hó (+10%) ugyanabból a keretből** |
| **A kampány nem tudja elkölteni a keretet** (a 933 Ft/nap ezt sugallja) | −1,5 konverzió, −3 970 Ft → **CPA 1 076 → ≈ 980 Ft (−9%)**, a volumen kicsit csökken |

Mindkét kimenet elfogadható; az elsőhöz a 6. pont diagnosztikája kell.

---

## 7. A dayparting NEM a legnagyobb kar — ezt is nézd meg

A kampány **933 Ft-ot költ naponta a 3 500 Ft-os keretből**, és a **tényleges CPA (1 042 Ft) jóval a
cél-CPA (1 500 Ft) alatt van**. Ez azt jelenti, hogy a licitstratégia konzervatívan viselkedik, és a
szűk keresztmetszet valószínűleg **nem a pénz, hanem az elérés**.

Sorrend a napszak-vágás után:

1. **Diagnózis (most):** kapcsold be a megjelenítési arány oszlopokat (lásd 1. pont). Ez eldönti,
   hogy keret- vagy rangsor-korlátos-e a kampány.
2. **Ha rangsor-korlátos** (a valószínűbb): a volumen kara a lefedettség — kulcsszó-bővítés,
   kifejezés/általános egyezés óvatos nyitása, a QS emelése. A cél-CPA emelése csak akkor, ha a
   valós (Notino-oldali) foglalási arányt is ismerjük — a mért konverzió **kattintás-proxy**, a valódi
   CPA ennél magasabb.
3. **Ha keret-korlátos**: a napszak-vágás után 4 héttel a keretemelés a következő lépés — de ezt a
   user most 3 500 Ft-on tartja, tehát ez nem aktuális.

---

## 8. Mérési terv és előre rögzített döntési szabályok

Mérés: **2026-09-01** (4 hét), a `V3.0_Optimized` kampányon, napszak- és nap-szegmenssel.

| Figyelt tétel | Döntési szabály (előre rögzítve, hogy ne utólag racionalizáljunk) |
|---|---|
| A vágás sikere | Ha a 30 napos CPA ≤ 1 000 Ft **és** a konverziószám ≥ 24 → marad. Ha a konverziószám < 20 → vedd vissza a 17–19-et és mérj újra. |
| 12:00–13:59 | Ha ≥ 25 kattintás gyűlt **és** a sáv CPA-ja > 2 × kampány-CPA → vedd ki (új ütemezés-sor: 00:00–12:00 / 14:00–17:00 / 20:00–00:00). Különben marad. |
| Szerda | Ha ≥ 25 kattintás **és** a szerdai CPA > 2 200 Ft → szűkítsd a szerdát a 06:00–12:00 / 14:00–17:00 / 20:00–00:00 sávokra (nem teljes kivétel). |
| Vasárnap | Ne nyúlj hozzá 8 hétig — az adat ellentmondásos, és jelenleg a konverziók negyedét hozza. |

---

## 9. Adathiányok, amiket vállaltan nem tudtam kinyerni

1. A `Szemöldök Laminálás` hirdetéscsoport **csütörtök/péntek/szombat** bontása (összesítve
   2,00 konv / 22 katt / 5 857 Ft ismert). A Google Ads táblája szegmentálva egyszerre csak
   ~13 sort tölt be, és a maradékot nem lehetett rábírni a betöltésre. **A következtetést nem érinti**
   (lásd 3. pont jegyzete).
2. A `Szempilla_Kampany` **10–17 órás** napszakbontása. Ezért a fiók-szintű napszak-poolba ez a
   kampány nem került be; a pool a másik négy kampány teljes adata (113 konv / 472 katt).
3. Megjelenítési arány mutatók — még nincsenek bekapcsolva a fiókban (1. pont teendője).

---

## 10. Végrehajtási sorrend

1. Kapcsold be a 3 megjelenítési arány oszlopot (diagnózis, nem változtat semmit).
2. Állítsd be az 5. pont szerinti **két ütemezés-sort** a `V3.0_Optimized` kampányon.
3. Ne nyúlj a licitstratégiához, a cél-CPA-hoz és a kerethez.
4. Naptárba: **2026-09-01** — 8. pont szerinti kiértékelés.

**Amihez ne nyúlj:** a weboldal konverzió-tüzelő kódja és a Consent Mode réteg működik, a mérés jó
(konv. arány 27–29%). A probléma nem mérési.
