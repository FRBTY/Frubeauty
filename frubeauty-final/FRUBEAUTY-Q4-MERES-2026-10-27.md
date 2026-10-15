# FRUBEAUTY — a 2026-09-29-i SEO-csomag hatásmérése

**Futás:** 2026-10-15 (az ütemezett feladat a nevével ellentétben nem 10-27-én, hanem 10-15-én futott le; a fájlnév a feladat kérése szerint maradt).
**Források:** Google Search Console (`sc-domain:frubeauty.com`, service account), GA4 (533860004), Notino Partner statisztika (Chrome, csak olvasás). Semmit nem módosítottam a kódban vagy a fiókokban.

## Ablakok — és egy fontos megkötés

| Ablak | Dátum | Megjegyzés |
|---|---|---|
| Bázis (a feladat szerint) | 2026-08-30 – 09-26 (28 nap) | |
| „Utolsó 28 nap, 3 nap lag” | 2026-09-15 – 10-12 | **14 napja átfed a bázissal**, és csak 13 napja élesítés utáni |
| Élesítés előtt (azonos hossz) | 2026-09-17 – 09-29 (13 nap) | ezt használom „előtte”-nek |
| **Élesítés után** | **2026-09-30 – 10-12 (13 nap)** | ezt használom „most”-nak |

Mivel a feladat 12 nappal korábban futott le, a 28 napos ablak félig még a csomag előtti időszak. Ezért az oldal- és lekérdezésszintű méréseknél a **13 napos előtte/utána párt** mutatom; a 28 napos számokat ott adom meg, ahol a bázissal kell összevetni. A lekérdezésszintű GSC-adat kevés (sok sor 1–10 megjelenés, a ritka lekérdezéseket a Google anonimizálja) → **minden lekérdezésszintű következtetés gyenge bizonyíték.**

---

## 1. Az új és az átépített oldalak (GSC, oldalszint)

| Oldal | Előtte (09-17–29) | Most (09-30–10-12) | Változás | Értékelés |
|---|---|---|---|---|
| /alkalmi-smink-budapest/ (új) | 0 katt / 2 megj | **2 katt / 33 megj**, poz 6,0, CTR 6,1% | új | indexelve (09-29-i crawl); lekérdezései: „alkalmi smink budapest” 5 megj p10,8, „alkalmi smink árak” 2 megj p6,5 |
| /szemoldokfestes-zuglo/ (új) | 0 | 0 katt / 5 megj, poz 3,2 | új | indexelve, de szinte nincs megjelenése; a lekérdezései anonimizáltak |
| /blog/lezeres-szortelenites-vagy-gyantazas/ (új) | 0 | 0 katt / 19 megj, poz 7,9 | új | indexelve, gyenge |
| /blog/lezeres-szortelenites-hany-alkalom/ (új) | 0 katt / 1 megj | **5 katt / 147 megj**, poz 4,9, CTR 3,4% | új | **a csomag legjobb eleme**; „lézeres szőrtelenítés hány alkalom” p6,2, „dióda lézeres szőrtelenítés hány alkalom” p9,0 (1–1 katt) |
| /sminkes-zuglo/ (esküvőire átépítve) | 3 katt / 250 megj, poz 6,9, CTR 1,2% | 5 katt / 190 megj, **poz 9,0**, CTR 2,6% | −24% megj, poz −2,1 | a CTR javult, a pozíció romlott (az alkalmi lekérdezések leváltak róla — ez várt is volt) |
| /szempilla-lifting-zuglo/ | 4 katt / 48 megj, poz 7,9 | 2 katt / 35 megj, poz 9,6 | romlott | kis szám; lásd 6. pont |
| /lezeres-szortelenites-budapest/ | 1 katt / 51 megj, poz 14,6 | 2 katt / 40 megj, poz 27,0 | poz romlott | a megjelenések egy része a cikkekre vándorolt |

## 2. „alkalmi smink árak”

| Mutató | Bázis (feladat) | Bázis (mért, 08-30–09-26) | Most (13 nap) | Értékelés |
|---|---|---|---|---|
| CTR | 0,6% | 0/68 = 0,0% | 0/14 = 0,0% | nincs javulás |
| Pozíció | 7,0 | 7,1 | 9,1 | romlott |
| Rangsoroló URL | /sminkes-zuglo/ | /sminkes-zuglo/ (57/68 megj) | **még mindig főleg /sminkes-zuglo/** (9 megj, p9,1); az új /alkalmi-smink-budapest/ csak 2 megj, p6,5 | **az átadás még nem történt meg** |

A megjelenésszám is visszaesett (előtte 42 → most 14 a 13 napos ablakokban). Két hét alatt ez nem meglepő — de a cél (az új oldal vigye) **még nem teljesült**.

## 3. „esküvői smink árak” — visszalépési szabály

| Mutató | Bázis | Most (13 nap) | 28 nap (09-15–10-12) | Változás | Értékelés |
|---|---|---|---|---|---|
| Poz. a /sminkes-zuglo/ URL-en | 6,9 | **8,9** | 7,3 | +2,0 hely romlás | **a szabály NEM lép életbe** (küszöb: > 9,9) |
| Poz. a lekérdezés összesen (több URL) | 9,2 | 9,5 | 9,3 | ~ | |
| Katt / megj | 2 / 93 | 1 / 30 | 1 / 82 | | |

**Döntés: a régi cím visszaállítását most NEM javaslom.** A romlás 2 hely, a küszöb 3. Figyelni kell: ha a következő mérésnél a /sminkes-zuglo/ pozíciója erre a lekérdezésre 9,9 fölé megy, akkor állítsd vissza: „Esküvői smink árak Budapest 2026 – 30.000 Ft | FRUBEAUTY”.

## 4. Szemöldök-lekérdezések

| Lekérdezés | Bázis | Most (13 nap) | 28 nap | Értékelés |
|---|---|---|---|---|
| „laminált szemöldök” + „laminalt szemoldok” | 0 katt / 33 megj (feladat: 0 / 101) | 0 katt / 15 megj, poz ~9,6 | 0 / 22 | **még mindig 0 katt**, a pozíció 7 körülről ~9,5-re csúszott |
| „szemöldök laminálás meddig tart” CTR | 0,5% (feladat), mért 0/50 | 0/35 = 0%, poz 7,7 | 0/64 | nincs javulás |
| „szemöldök laminálás árak” CTR | 0,5% (feladat), mért 2/129 = 1,6% | 0/40 = 0%, **poz 11,6 → 7,6** | 0/73 | a pozíció javult, kattintás még nincs |

## 5. A célzott új lekérdezések megjelennek-e?

| Lekérdezés | Bázis | Most (13 nap) | URL | Értékelés |
|---|---|---|---|---|
| szempilla lifting festéssel | 1 megj, p10 | 0 megj | — | nem jelenik meg |
| szempilla laminálás | 0 | 0 (pontos egyezés); „szempilla laminálás árak” 5 megj, p3 | a szemöldök-árcikk + kezdőlap | csak az „árak” változatra, nem a money page-dzsel |
| szemöldökfestés | 26 megj, p2,8 | 3 megj, p3,7 | **kezdőlap**, nem az új /szemoldokfestes-zuglo/ | az új oldal még nem vette át |
| esküvői sminkes | 0 | 0 | — | nem jelenik meg |
| dióda lézeres szőrtelenítés | 0 | 0 (pontos); „… budapest” 3 megj p1,3; „… hány alkalom” 5 megj p9,0, 1 katt | kezdőlap / hány-alkalom cikk | részleges: hosszú farokra igen |
| lézeres szőrtelenítés budapest | poz 64 | poz 58 (URL-szinten 67,5), 7 megj | /lezeres-szortelenites-budapest/ | érdemben nem mozdult (6–7. oldal) |

## 6. /blog/szempilla-lifting-arak-2026/ 301

| Mutató | Bázis | Most | Értékelés |
|---|---|---|---|
| Élő válasz | 200 | **301 → /szempilla-lifting-zuglo/** (curl, ma) | a szerver oldalon kész |
| Sitemapben | igen | **nincs** | rendben |
| GSC megjelenés | 169 megj (28 nap) | 62 megj / 13 nap, napi 2–9, még 10-13-án is | **NEM tűnt el** |
| Utolsó Google-crawl | — | **2026-09-15** (URL-vizsgálat: „Submitted and indexed”) | a Google a 301 óta **nem járt** az oldalon, ezért nem látta |
| /szempilla-lifting-zuglo/ „szempilla lifting ár” | — | 1 megj, p17 | a money page még nem örökölte; a régi cikk viszi tovább p8,0-on |
| /szempilla-lifting-zuglo/ „szempilla lifting zugló” | 6 megj, p11,7 (bázis) | 0 megj | nincs adat |

## 7. Összes GSC-forgalom

| Mutató | Bázis (08-30–09-26) | 28 nap (09-15–10-12) | Előtte 13 nap | **Utána 13 nap** | Értékelés |
|---|---|---|---|---|---|
| Katt | 170 (feladat: 171) | 165 | 61 | **87 (+43%)** | az utána-ablak erősebb |
| Megjelenés | 5 171 | 4 671 | 1 951 | 2 302 (+18%) | |
| CTR | 3,3% | 3,5% | 3,1% | 3,8% | javult |
| Átl. pozíció | 6,4 | 6,4 | 6,4 | 6,4 | változatlan |

Havi organikus katt (GSC): jún. 72 · júl. 86 · aug. 159 · szept. 182 · **okt. 1–12: 81 (~209/hó ütem)**.

## 8. GA4

| Mutató | Bázis | Most (09-30–10-14) | Értékelés |
|---|---|---|---|
| `lezer_quiz_complete` | nem mért (nem volt esemény) | **5 esemény / 5 user** | az esemény működik |
| ↳ `verdict` bontás | — | **„yes”: 5**, más érték nincs | mind az 5 kitöltő alkalmasnak bizonyult |
| ↳ `areas` | — | 1, 2, 4, 4, 7 terület | |
| `lezer_area_builder_use` | 1 (szept., tesztnek tűnik) | 3 esemény / 3 user, `verdict` = (not set) | működik; az AreaBuilder nem küld verdictet — ez szándékos lehet |
| Lézer-oldal: book_click user / landing user | 18% (5/28) — szept. teljes: 10/46 | **2/9 = 22%** | n túl kicsi; a landing userek 46 → 9-re estek, mert a szeptemberi forgalom 15 fizetett + 13 közösségi + 13 direct volt |
| AI Assistant userek | 12 / 30 nap | **15 / 30 nap** (09-15–10-14); havonta: aug. 14, szept. 13, okt. 1–14: 8 | enyhe növekedés |

**book_click egyedi user havonta** (összes / ebből organikus):

| Hónap | Összes | Organikus | Fizetett |
|---|---|---|---|
| máj. | 37 | 6 | 21 |
| jún. | 52 | 14 | 20 |
| júl. | 55 | 27 | 18 |
| aug. | 77 | 29 | 32 |
| szept. | 93 | 41 | 23 |
| okt. 1–14 | 30 (~66/hó ütem) | 21 (~46/hó ütem) | **0** (Ads 09-25 óta áll) |

Az összes book_click visszaesett, mert **a fizetett ág (szept. 23 user) kiesett és a „Direct” 20 → 3-ra esett**; az organikus ág nőtt (napi 1,41 → 1,50).

## Notino (okt. 1–14 vs. szept. 1–14, azonos hossz)

| Mutató | Szept. 1–14 | Okt. 1–14 | Változás |
|---|---|---|---|
| Lezárt foglalás | 43 | **37** | −14% |
| Bevétel | 523 500 Ft | **486 000 Ft** | −7% |
| Ft / foglalás | 12 174 | 13 135 | +8% |
| Foglalt óra | 52,5 h | 45,95 h | −12% |
| Teljesen blokkolt munkanap | 3 | 3 | azonos |
| Kihasználtság (a nem blokkolt munkanapokon) | ~61% | **~54%** | −7 pp |
| Ügyfél által létrehozott foglalás: web / app | 25 / 13 | 25 / 17 | web változatlan |

A blokkolt napok száma azonos, tehát az októberi visszaesést **nem** a blokkolás okozza. A legkézenfekvőbb magyarázat a hirdetések leállítása (szeptemberben a book_click-ek ~25%-a fizetett volt) — ezt az adat valószínűsíti, de nem bizonyítja.

---

## Skálázási becslés — frissítve

### Mért havi ütemek

| Mutató | Idősor | Mért ütem |
|---|---|---|
| GSC organikus katt | 72 → 86 → 159 → 182 → ~209 (okt. ütem) | jún.→szept. ~+36%/hó, de **lassul**: aug.→szept. +14%, szept.→okt. ~+15% |
| GA4 organikus book_click user | 14 → 27 → 29 → 41 → ~46 | szept.→okt. ~+12% |
| GA4 összes book_click user | 52 → 55 → 77 → 93 → ~66 | **−29%** (Ads-kiesés) |
| Notino lezárt foglalás / nap | júl. 2,13 · aug. 2,19 · szept. 2,75 · okt. 1–14: 2,64 | júl.→okt. **~+8%/hó** (2,75 hónap alatt +24%); szept.→okt. **−4%** |
| Notino bevétel / nap | júl. 29 594 · aug. 30 790 · szept. 35 804 · okt. 34 714 Ft | júl.→okt. **~+6%/hó** |

**Mostani szint:** ~2,64 foglalás/nap ≈ **~80 foglalás/hó** (≈ 1,05 M Ft/hó).
**Mért ütem:** a háromhónapos trend **6–8%/hó** — ez a szeptemberi becslés középső (8%) forgatókönyvének alsó széle. Az utolsó hónap (szept.→okt.) **lassulás**: −4% a foglalásban, mert a fizetett forgalom kiesését az organikus növekedés még nem pótolta.

### Hány hónap múlva (80/hó-ról indulva, 2026. okt. közepétől)

| Cél | 4%/hó (pesszimista: az Ads-kiesés tartós) | **6%/hó (mért bevétel-ütem)** | **8%/hó (mért foglalás-ütem)** | 12%/hó (optimista) |
|---|---|---|---|---|
| ~115 (Fruzsi teli naptára) | 9 hó → 2027. júl. | **6 hó → 2027. ápr.** | **5 hó → 2027. márc.** | 3 hó → 2027. jan. |
| ~215 (Fruzsi + 1 munkatárs) | 25 hó → 2028. nov. | **17 hó → 2028. márc.** | **13 hó → 2027. nov.** | 9 hó → 2027. júl. |
| ~415–515 (3–4 munkatárs) | 42–48 hó → 2030 | **28–32 hó → 2029. febr.–jún.** | **21–24 hó → 2028. júl.–okt.** | 15–16 hó → 2028. jan.–febr. |

### Frissített idővonal

| Mérföldkő | Szeptemberi becslés | **Frissítve (6–8%/hó)** | Változás |
|---|---|---|---|
| Fruzsi teli naptára + 1. munkatárs felvétele | 2027 tavasz–nyár | **2027. márc.–ápr.** (a felvételi kapu teljesülése esetén) | változatlan / kicsit korábbi eleje |
| 2. munkatárs | 2027 vége–2028 | **2027. nov. – 2028. márc.** | változatlan |
| 3–4. munkatárs | 2028–2029 | **2028. júl. – 2029. jún.** | változatlan, a felső széle kitolódik |

**Gyorsult vagy lassult?** A három hónapos trend a szeptemberi becslés **8%-os forgatókönyvével egyezik**, de az **utolsó hónap lassulás** (−4% foglalás/nap, −29% összes book_click). Ha az októberi szint tartósan ~80/hó marad, az idővonal minden pontja 2–4 hónappal kitolódik. A felvételi kapu (4 hét ≥80%) **nem közelít**: a nem blokkolt munkanapokon a kihasználtság szept. ~61%-ról okt. ~54%-ra esett.

**Bizonytalanságok:** a havi ütem 3–4 adatpontból jön; az októberi adat csak 14 nap; a Notino szerinti „lezárt” foglalás a kezelés napjához kötött, a 12-i és a későbbi napok még zárulhatnak; a 12%-os optimista forgatókönyvet a mostani adat nem támasztja alá.

---

## Következő lépések

1. **A régi szempilla-árcikk újrafeltérképezése:** a GSC URL-vizsgálatban kérj indexelést a `https://frubeauty.com/blog/szempilla-lifting-arak-2026/`-ra. A Google 09-15 óta nem járt ott, ezért nem látta a 301-et, és a „szempilla lifting ár” megjelenései még mindig oda mennek. Ez egy kattintás, és csak a tulajdonos fiókjából lehet elvégezni.
2. **Az „esküvői smink árak” visszalépési szabályát a következő mérésnél (11-12, a Motion-kiértékeléssel együtt) nézd meg újra.** Most 8,9; ha 9,9 fölé megy, állítsd vissza a /sminkes-zuglo/ régi címét.
3. **Az Ads-kiesés pótlása organikusan:** szeptemberben 23 fizetett book_click user volt, most 0. Ezt pótolja a lézer-cikk mintája: a „hány alkalom” cikk 13 nap alatt 147 megjelenést hozott. Ugyanez a formátum (kérdés-cikk + ArticleOffer) megéri a szempilla liftingre és a szemöldökfestésre is.
4. **Belső linkek az új oldalakra:** az /alkalmi-smink-budapest/ és a /szemoldokfestes-zuglo/ indexelve van, de a saját lekérdezéseiket még a /sminkes-zuglo/ és a kezdőlap viszi. Ezekről a két oldalról tegyél a két új oldalra pontos horgonyszöveges linket („alkalmi smink árak”, „szemöldökfestés”).
5. **Ne vonj le következtetést a lézer-kvízből 5 kitöltés alapján.** Majd 11-12-én nézd újra. Kérdés hozzá: miért (not set) az AreaBuilder `verdict`-je, szándékos-e.
