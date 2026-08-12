# FRUBEAUTY — Low-Hanging Fruit újraoptimalizálás

**Dátum:** 2026-07-26 · **Forrás:** élő GSC (`sc-domain:frubeauty.com`), 3 hónap + 28 nap, oldal- és lekérdezés-bontásban · **SERP-kontroll:** élő google.hu (`hl=hu&gl=hu`)

> **Adathigiéniai figyelmeztetés.** A Chrome automatikus fordítása bekapcsolva **lefordítja a GSC lekérdezés-stringeket** is. A 2026-06-30-i riportban szereplő „szempilla emelés” (51 megj.) és „szemöldök emelés” (28 megj.) **nem valódi lekérdezés** — a „szempilla/szemöldök lifting” gépi fordításai. Az itteni adatok fordítás nélküli Chrome-ból származnak.

---

## 0. Alapadatok (3 hónap)

| Mutató | Érték |
|---|---|
| Kattintás | 155 |
| Megjelenés | 4 700 |
| CTR | 3,3% |
| Átlagpozíció | 6,2 |

### Oldal-szintű bontás — itt derül ki a valódi probléma

| URL | Katt | Megj. | CTR | Poz. |
|---|---:|---:|---:|---:|
| **`/` (kezdőlap)** | **103** | **3 268** | 3,2% | 5,0 |
| `/sminkes-zuglo/` | 13 | 230 | 5,7% | 7,7 |
| `/blog/szemoldok-laminalas-arak-2026/` | 5 | 248 | 2,0% | 6,9 |
| `/blog/koreai-szempilla-lifting/` | 5 | 112 | 4,5% | 7,1 |
| `/szempilla-lifting-zuglo/` | 5 | 95 | 5,3% | 8,5 |
| `/blog/szemoldok-laminalas-meddig-tart/` | 2 | **367** | **0,5%** | 6,8 |
| `/blog/eskuvoi-smink-arak-budapest/` | 1 | 123 | 0,8% | 8,8 |
| **`/szemoldok-laminalas-zuglo/`** | **1** | **49** | 2,0% | 9,1 |
| `/blog/szemoldok-laminalas-mit-jelent/` | 0 | 112 | 0% | 24,9 |
| **`/arckezeles-zuglo/`** | **0** | **36** | 0% | 12,8 |

**A kezdőlap viszi az összes megjelenés 70%-át.** A dedikált money page-ek gyakorlatilag láthatatlanok.

---

## 1. KERESÉSI SZÁNDÉK KONTROLL — brutálisan őszintén

### 1.1 A fő szerkezeti hiba: kannibalizáció

Lekérdezés-bontás oldalanként (3 hónap):

| Lekérdezés | Megj. | Poz. | **Melyik URL rangsorol** | Melyiknek KELLENE |
|---|---:|---:|---|---|
| szemöldök laminálás | **224** | 7,0 | `/` kezdőlap | `/szemoldok-laminalas-zuglo/` |
| szemöldök | 78 | 9,6 | `/` | money page |
| szempilla lifting | 56 | 5,5 | `/` | `/szempilla-lifting-zuglo/` |
| szempilla stylist | 46 | 2,1 | `/` | ✅ helyes |
| szemöldök formázás | 40 | 2,2 | `/` | money page |
| szempilla lifting zugló | 31 | 5,7 | `/` | `/szempilla-lifting-zuglo/` |
| szemöldök lifting | 29 | 5,7 | `/` | money page |

Ezzel szemben a saját money page-ek teljes lekérdezés-lefedettsége:

- `/szemoldok-laminalas-zuglo/` → **1 lekérdezés**: „szemöldök 14 kerület”, 4 megjelenés, pozíció 15,0
- `/szempilla-lifting-zuglo/` → **1 lekérdezés**: „szempilla lifting zugló”, 7 megjelenés, pozíció 15,0
- `/arckezeles-zuglo/` → **1 lekérdezés**: „kozmetikus zugló”, 1 megjelenés, pozíció **69,0**

**Ez nem finomhangolási, hanem szerkezeti probléma.** A Google mindkét URL-t ismeri ugyanarra a szándékra, ezért oszcillál köztük — és emiatt **egyik sem** stabilizálódik. A 28 napos adat ezt élesen mutatja: a „szemöldök laminálás” átlagpozíció **7,0 → 15,8-ra romlott**, a „szempilla lifting” **5,5 → 18,5-re**. Ez a kannibalizáció klasszikus lenyomata.

### 1.2 A második szerkezeti hiba: intent-eltérés a fő kulcsszón

Élő SERP, „szemöldök laminálás” (Local Pack jelen, AI Overview nincs):

| # | Domain | Tartalomtípus |
|---|---|---|
| 1 | patkosalexandra.hu | szalon **szolgáltatás-oldal** (laminálás + lifting egyben) |
| 2 | salonic.hu | **aggregátor / katalógus** |
| 3 | beautebudapest.com | **informatív cikk** — „Mi az a szemöldök laminálás és hogyan működik?” |
| 4 | bestlashespro.hu | **informatív listicle** — „7 dolog, amit tudni kell” |
| 5 | douglas.hu | **útmutató** |
| 6 | lashandlashes.hu | **e-kereskedelem** |
| 7 | salonic.hu | aggregátor |
| 8 | studioflash.hu | **informatív + ár** — „árak, vélemények” |

**A verdikt: a „szemöldök laminálás” vegyes szándékú, informatív túlsúlyú SERP.** A top 8-ból mindössze **egy** klasszikus szalon-landing. Egy tisztán értékesítési LP — bármilyen szép — így nem tud top 5-be jönni. Ezért választotta a Google helyette a kezdőlapot: az legalább „entitás-szintű” választ ad.

Ugyanez „szempilla lifting”-re: top 6-ból 3 informatív útmutató, 3 szalon-oldal. FRU nincs a top 10-ben.

**Ellenpélda — ahol az intent STIMMEL:** „esküvői smink árak” → top 7 mind **tételes árlista** (Árlistám, Árlista, „2026-es útmutató”, Reddit-szál). A `/sminkes-zuglo/` **#8-on rangsorol élőben**, és ez a site egyetlen money page-e, ami saját jogon hoz forgalmat (230 megj., 13 katt). Ez bizonyítja: ahol a formátum illeszkedik, ott a rendszer működik.

### 1.3 Harmadik hiba: az informatív klaszter AI Overview-ba fut

A `/blog/szemoldok-laminalas-meddig-tart/` **367 megjelenés / 0,5% CTR** pozíció 6,8-on. Az ok élőben ellenőrizve: a „szemöldök laminálás meddig tart” SERP-en **AI Overview fut**, ami kimondja a választ („6–8 hét”), és a FRU organikus találata a hajtás alá kerül. Ugyanez az „…árak” és „alkalmi smink árak” lekérdezéseken.

**Következtetés:** ezen a klaszteren a CTR-plafon strukturálisan alacsony. Nem érdemes további informatív cikkeket írni rá — a meglévőket kell **átirányító eszközzé** tenni (belső link a money page-re), nem forgalom-célnak.

---

## 2. A STRUKTURÁLIS ÁTALAKÍTÁSI TERV

**A döntés: NEM a kezdőlapot optimalizáljuk a szolgáltatás-kulcsszavakra.** A kezdőlap 155-ből 103 kattintást hoz, és pozíció 2,1–2,9-en áll a „kozmetikus”, „kozmetikus budapest”, „szempilla stylist” lekérdezésekre. Egy működő **címet** átírni a legdrágább SEO-öngól — a Title változatlan marad. A kezdőlap marad a **lokális/márka-hub**.

**A H1 és a lead viszont át lett írva** (utólagos döntés, 2026-07-26). Indok: a Title „Kozmetikus Zugló · Szempilla Stylist”-et ígért, a H1 viszont *„Ébredj minden nap tökéletes bőrrel és kész tekintettel.”* volt — **nulla kulcsszó, nulla geo**. Aki „kozmetikus”-ra keresve kattintott (85 megj., poz. 2,9), egy versre landolt: message-match szakadás, ami pogo-stickinget termel.

| | Előtte | Utána |
|---|---|---|
| **Eyebrow** | FRUBEAUTY · Zugló, XIV. kerület | FRUBEAUTY · **Budapest XIV.** · Zugló, Egressy út |
| **H1** | Ébredj minden nap tökéletes bőrrel és kész tekintettel. | **Kozmetikus Zuglóban** — hogy tökéletes bőrrel és kész tekintettel ébredj. |
| **Lead** | …alkalmi sminkek, amelyek kiemelik a természetes szépséged. | **Kozmetikus és sminkes Zuglóban, a XIV. kerületi Egressy úton** — arckezelés, tartós szempilla- és szemöldökkezelés, alkalmi smink. Egyszerre egy vendéggel, teljes figyelemmel. |

Két szándékos korlát:
1. **Az aspirációs ígéret szó szerint megmaradt** (`hogy tökéletes bőrrel és kész tekintettel ébredj`) — csak elé került az entitás + geo. Az identitás-építő keretezés nem sérült.
2. **Se a H1-be, se a leadbe nem került szolgáltatás-fej-kulcsszó** (`szemöldök laminálás`, `szempilla lifting`) — az pont a bontani kívánt kannibalizációt erősítené. A lead a generikus „szempilla- és szemöldökkezelés” alakot használja.

**Kockázat-értékelés:** a H1 másodlagos rangsorjel és **nem jelenik meg a SERP-ben** (a snippet nem változik), a korábbi H1-ben pedig nulla kulcsszó volt — tehát csak hozzáadás történt, elvétel nem. A CRO-kockázat valós, de kicsi és egy edittel visszafordítható. Mérve: mobilon (375×667) a H1 **3 sor, pontosan annyi mint korábban** (108px), a CTA 470px-en maradt, hajtás felett; desktopon (1280×800) 3 sor, CTA 676px. Sortávolság-arány 1,120 ≥ 1,11 (magyar ékezet-minimum), az `<em>` opsz 144-gyel rendereli — a tipográfiai szabályok sértetlenek.

Helyette három karon nyúlunk hozzá:

**① A money page-ek hibrid formátumot kapnak.** Nem „csak” landing, hanem *szolgáltatás + definíció + ár + folyamat + összehasonlítás* — pontosan az, amit a vegyes SERP kér. A `/szemoldok-laminalas-zuglo/` szerkezete ehhez már **készen áll** (FAQ, folyamat, összehasonlító tábla laminálás/microblading/henna, videó, árlista) — eddig a *nyitánya* nem árulta el a Google-nek. Ezt javítottuk (§3).

**② Geo-váltás a címekben: Zugló → Budapest.** Adat:

| Geo-módosító | Összes megjelenés (3 hó) |
|---|---:|
| **„budapest”** | **~135** |
| „zugló” | ~47 (ebből 39 egyetlen lekérdezés: „szempilla lifting zugló”) |
| „14 kerület” | 8 |

Eddig **mind a négy** money page címében kizárólag „Zugló” szerepelt. Ez a legnagyobb megtérülésű egysoros javítás a site-on. A „Zugló / Egressy út / XIV. kerület” a H1-ben, a leadben, a schemában és a lábléc-NAP-ban marad — a lokális relevancia nem sérül.

**③ Belső link-architektúra a head term köré.** A szemöldök-blogklaszter (367 + 248 + 112 + 47 = **774 megjelenés**) rangsorol, de nem konvertál. Ez a klaszter mostantól **exact-match anchorral** tolja a money page-et, nem „szemöldök laminálás Zuglóban”-nal (ami a nulla volumenű geo-t erősítette).

---

## 3. A „HÁROM KIRÁLY” — előtte / utána

### 3.1 `/szemoldok-laminalas-zuglo/` — **elsődleges cél: „szemöldök laminálás”** (274 megj., poz. 11,4)

| | Előtte | Utána |
|---|---|---|
| **Title** | `Szemöldök Laminálás + Formázás Zugló ★5,0 \| FRUBEAUTY` | `Szemöldök laminálás Budapest ★5,0 – 11.000 Ft \| FRUBEAUTY` (57 kar.) |
| **H1** | Szemöldök laminálás **Zuglóban** — dúsabb, rendezett szemöldök tű nélkül. | Szemöldök laminálás **Budapesten** — dúsabb, rendezett szemöldök tű nélkül. |

**Miért:** a `+ Formázás` hígította a fő kulcsszót és elvette a helyet a *döntési információtól*. Az ár a címben olyan differenciáló, amit a top 8-ból senki nem mutat — a Local Packben megszokott „ár nincs feltüntetve” mellett ez kattintás-mágnes.

**Új első bekezdés** (a definíció + a számok azonnal, sallang nélkül — ez egyszerre szolgálja az informatív SERP-szándékot és az AI-kivonatolást):

> A szemöldök laminálás tűmentes kezelés: a saját szálaidat rögzíti a kívánt irányba, így rendezettebbnek és dúsabbnak látszanak. Budapesten, a XIV. kerületi Egressy úton, koreai technikával. Ár: **11.000 Ft** — a szemöldök formázás és a festés is benne van. ~60 perc, 6 hétig tart.

### 3.2 `/szempilla-lifting-zuglo/` — **cél: „szempilla lifting”** (64 megj., poz. 8,4)

| | Előtte | Utána |
|---|---|---|
| **Title** | `Szempilla Lifting + Festés Zugló ★5,0 \| FRUBEAUTY` | `Szempilla lifting Budapest, Zugló – 12.000 Ft \| FRUBEAUTY` (56 kar.) |
| **H1** | Szempilla lifting Zuglóban — reggel smink nélkül, tökéletes tekintet. | Szempilla lifting **Zuglóban** — **6–8 hétig ívelt pillák, tus nélkül.** |

**Miért:** itt a „Zugló” **marad** a címben — egyedüli kivételként. Oka: a „szempilla lifting zugló” a site legjobb lekérdezése (39 megj., **10,3% CTR**, poz. 4,9). Budapest melléje kerül, nem helyette. A H1 az érzelmi ígéret helyett most **mérhető ígéretet** ad (6–8 hét), mert a SERP-en az informatív találatokkal kell versenyezni.

**Új első bekezdés** (beépítve a „szempilla laminálás” szinonima és a „műszempilla” összehasonlítási horgony):

> A szempilla lifting — más néven **szempilla laminálás** — a saját pilláid tövét emeli meg ívelt formába, így tus és **műszempilla** nélkül is hosszabbnak látszanak. Budapesten, Zuglóban (Egressy út 16.), ragasztómentes koreai technikával, **szempilla festéssel**: **12.000 Ft**, ~90 perc, 6–8 hétig tart.

### 3.3 `/sminkes-zuglo/` — **cél: „esküvői smink árak”** (44 megj., poz. 8,0 — élőben #8)

| | Előtte | Utána |
|---|---|---|
| **Title** | `Esküvői Smink Árak Zugló – 13.000 Ft ★5,0 \| FRUBEAUTY` | `Esküvői smink árak Budapest 2026 – 25.000 Ft \| FRUBEAUTY` (55 kar.) |
| **H1** | Esküvői és alkalmi smink Zuglóban — a fontos pillanatokra. | Esküvői és alkalmi smink Budapesten — **árak tételesen, rejtett díj nélkül.** |

**Miért:** a régi cím **13.000 Ft**-ot ígért — ez a *nappali* smink ára. Aki „esküvői smink árak”-ra keres, 25.000-et talál a kattintás után: ez klasszikus intent-csapda, ami bounce-ot és rossz minőségjelet termel. A „2026” évszám a top 3-ból kettőnél szerepel (`2026-es útmutató`, `Smink árak 2026`) — frissesség-jel, amit a Google ezen a SERP-en jutalmaz.

**Új első bekezdés** (ár-elsőség, mert a SERP árlistát kér):

> A menyasszonyi smink nálam **25.000 Ft**, próbasminkkel csomagban 35.000 Ft, az alkalmi smink 15.000 Ft — mindegyik árban benne van a bőrelőkészítés és a hosszan tartó fixálás. Budapesten, a XIV. kerületi Egressy úton dolgozom, esküvői helyszínre kiszállással is.

### 3.4 `/arckezeles-zuglo/` — **nincs low-hanging fruit. Ez őszinte diagnózis, nem kifogás.**

36 megjelenés 3 hónap alatt, 0 kattintás, egyetlen lekérdezés pozíció **69**-en. Nincs 5–15. pozícióban álló, bizonyított megjelenésű kulcsszó, amire rá lehetne fordulni — **tartalmi/láthatósági hiány van, nem optimalizálási.**

Amit ettől függetlenül javítottunk, mert egyértelmű hiba volt: a cím a **„Janssen”** márkanévvel indult, amit gyakorlatilag senki nem keres (2 megjelenés, „janssen árlista”), miközben a legerősebb pozíciót foglalta el. Helyette a valódi keresett fej-term került előre.

| | Előtte | Utána |
|---|---|---|
| **Title** | `Janssen Arckezelés Zugló – 16.900 Ft ★5,0 \| FRUBEAUTY` | `Arckezelés Budapesten – kozmetikus Zuglóban \| FRUBEAUTY` (55 kar.) |
| **H1** | **Janssen** arckezelés Zugló szívében — bőrtípusra szabva. | **Arckezelés Budapesten**, Zugló szívében — bőrtípusra szabva. |

Az első bekezdés a korábbi tartalom nélküli marketing-mondat („Add vissza bőröd egészséges ragyogását”) helyett most a konkrét folyamatot és az árat adja. (Az ár 16.900 → **16.000 Ft-tól**-ra pontosítva: a lapon lévő árlistában a legolcsóbb arckezelés a Young Skin, 16.000 Ft.)

---

### 3.6 Mobil-kontroll (elvégezve, nem feltételezés)

A hosszabb lead először **lenyomta az elsődleges CTA-t a hajtás alá** 375×667-es telefonon (CTA 692px > 667px viewport). Ez konverzió-romlás lett volna, ezért mind a négy lead tömörítve lett. Mért végállapot (375×667, dev szerver):

| Oldal | Title (kar.) | Lead (kar.) | CTA pozíció | Hajtás alatt? | Vízszintes túlcsordulás |
|---|---:|---:|---:|---|---|
| `/szemoldok-laminalas-zuglo/` | 57 | 276 | 637px | **nem** | nincs |
| `/szempilla-lifting-zuglo/` | 57 | 288 | 600px | **nem** | nincs |
| `/sminkes-zuglo/` | 56 | 259 | 541px | **nem** | nincs |
| `/arckezeles-zuglo/` | 55 | 248 | 514px | **nem** | nincs |

Minden cím a 50–60 karakteres sávban van (nem vágja le a Google), és a leadek rövidebbek vagy azonos hosszúak a korábbiaknál — az arckezelés kivételével, ahol az eredeti 137 karakteres mondat tartalmatlan volt.

### 3.5 Blog — CTR-mentés a már rangsoroló oldalakon

| Oldal | Poz. | CTR | Új metaTitle |
|---|---:|---:|---|
| `szemoldok-laminalas-meddig-tart` | 7,5 | 2,1% | **Szemöldök laminálás meddig tart? 6 hét, ha ezt betartod** |
| `szemoldok-laminalas-arak-2026` | 9,5 | 0% | **Szemöldök laminálás ára 2026: 11.000 Ft \| FRUBEAUTY Budapest** |
| `eskuvoi-smink-arak-budapest` | 8,8 | 0,8% | **Esküvői smink árak Budapesten 2026 – teljes piaci körkép** |

- A „meddig tart” címe most **feltételt** ígér („ha ezt betartod”), amit az AI Overview nem tud teljesíteni. Ez az egyetlen valós fegyver AIO ellen: nyitott hurok, amit a generált válasz nem zár be.
- Az ár-cikk címe **„ára”** egyes számra vált (fedi az „ár”/„ára”/„árak” variánsokat) és konkrét számot mutat.
- Az esküvői ár-cikk **szándékosan** „piaci körkép”-re differenciálódik, mert eddig ugyanarra a lekérdezésre versenyzett a `/sminkes-zuglo/`-val. Mostantól: **money page = a saját árlistám, blog = a piac.**

---

## 4. ON-PAGE SZEMANTIKA (LSI / NLP) — mit, hova, miért

Mind a 10 kifejezés a **saját GSC-adatból** származik (tehát bizonyítottan keresik), nem generikus szinonima-listából.

| # | Kifejezés | Megj. | Hova került / kerüljön |
|---|---|---:|---|
| 1 | **szemöldök lifting** | 30 | ✅ beépítve — `/szemoldok-laminalas-zuglo/` „A megközelítés” blokk: szinonima-mondat |
| 2 | **szemöldök formázás** | 40 | ✅ első bekezdés + árlista tételnevek |
| 3 | **szemöldök festés** | — | ✅ első bekezdés + szinonima-mondat |
| 4 | **szemöldöklaminálás** (egybeírva) | 5 | ✅ szinonima-mondat |
| 5 | **laminált szemöldök** | 6 | ✅ szinonima-mondat |
| 6 | **szemöldök stylist** | 13 | ✅ „Pecze-Kovács Fruzsina kozmetikus és szemöldök stylist” |
| 7 | **szempilla laminálás** | 14 | ✅ `/szempilla-lifting-zuglo/` első bekezdés |
| 8 | **műszempilla** | 33 | ✅ `/szempilla-lifting-zuglo/` első bekezdés (elhatárolás) |
| 9 | **szemöldök laminálás ára / árak** | 71 | ✅ blog metaTitle + money page title |
| 10 | **microblading szemöldök** | 6 | már megvan az összehasonlító táblában — hagyni |
| 11 | *szemöldök laminálás tartóssága* | 10 | **teendő:** H3 a „meddig tart” cikkben |
| 12 | *szemöldök styling budapest* | 8 | **teendő:** a galéria-szekció H2-jébe |

Beszúrt szinonima-mondat (`/szemoldok-laminalas-zuglo/`):

> A kezelést sokan **szemöldök liftingnek** vagy egybeírva szemöldöklaminálásnak hívják — ugyanarról szól mindegyik: a **laminált szemöldök** néhány perc alatt felveszi a végleges irányát, és a **szemöldök formázás**, valamint a **szemöldök festés** is része a szolgáltatásnak.

Ez egyetlen természetes mondatban visz be 5 szemantikai variánst, ~50 megjelenésnyi lefedettséggel, kulcsszóhalmozás nélkül.

---

## 5. META LEÍRÁSOK + URL SLUG

Minden meta leírás új, 150–165 karakter, kettős idézőjel nélkül, ár + időtartam + tartósság + CTA szerkezettel. (A pontos szövegeket lásd a kódban.)

### URL slug — a javaslat az, hogy **NE változtassunk**, és ennek adat-oka van

| Oldal | Slug | Ítélet |
|---|---|---|
| `/szemoldok-laminalas-zuglo/` | tartalmazza a fő kulcsszót, kisbetűs, kötőjeles, 1 szint mély | **marad** |
| `/szempilla-lifting-zuglo/` | ugyanez, + a „zugló” itt valódi volumen | **marad** |
| `/sminkes-zuglo/` | rövid, egyértelmű | **marad** |

Indoklás, nem kitérés: a `/szemoldok-laminalas-zuglo/` **június 24-én küzdötte ki magát az indexbe** (előtte hetekig „nem indexelt” volt). Egy URL-váltás most 301-et, újra-felfedezést és újabb indexelési ciklust jelentene — pontosan azt a hetet dobnánk el, amiért megküzdöttünk. A slug ráadásul már tartalmazza a fő kulcsszót; a slug mint rangsorjel gyenge, a fenti Title/H1/lead/linkarchitektúra nagyságrenddel erősebb kar. **A várható nyereség negatív.**

**Egyetlen slug-adósság P2-re:** a `-2026` végű blog-slugok (`szemoldok-laminalas-arak-2026`, `szempilla-lifting-arak-2026`, `arckezeles-arak-2026`) évente elavulnak. Örökzöld slug (`…-arak`) + évszám csak a címben lenne a helyes minta — de ezt **csak akkor**, ha ezek a posztok stabilizálódtak (jelenleg 248 megj. / poz. 6,9-en futnak, most nem érdemes hozzájuk nyúlni).

---

## 6. Ami még hátravan (prioritás szerint)

**P0**
1. **Deploy** — a fenti változtatások a working tree-ben állnak.
2. Deploy után **Request Indexing** a 4 money page-re + a 3 érintett blogposztra (GSC → URL-ellenőrzés).
3. **Backlinkek.** A site-nak **1 hivatkozó domainje van** (notino.hu). Ez az igazi plafon: on-page oldalról minden kar meghúzva, a money page ettől függetlenül nem tud a kezdőlap fölé kerülni link-egyenérték nélkül. Cél: 30 napon belül ≥5 hivatkozó domain (Bing Places, Apple Business Connect, magyar szalon-aggregátorok).

**P1**
4. `/arckezeles-zuglo/` — ez tartalmi projekt, nem optimalizálás. Az egyetlen élő jel az „acne treatment” (26 megj., poz. 8,5), ami jelenleg a **kezdőlapra** rangsorol. Egy dedikált pattanás-/aknékezelés szekció + angol nyelvű másodlagos lefedettség (budapesti expat-kereslet) az első lépés.
5. `/blog/szemoldok-laminalas-mit-jelent/` pozíció 24,9 — 112 megjelenés kihasználatlanul. Belső link-erősítés a klaszterből.

**P2**
6. Mérési pont **14 nap múlva**: (a) `/szemoldok-laminalas-zuglo/` megjelenés 49 → ?, (b) „szemöldök laminálás” pozíció 15,8 → ?, (c) melyik URL rangsorol rá, (d) money page-ek CTR-je.

---

## 7. Benchmark a következő méréshez

| Mutató (3 hó) | 2026-07-26 |
|---|---|
| Kattintás / megjelenés | 155 / 4 700 |
| CTR / átlagpozíció | 3,3% / 6,2 |
| Kezdőlap részesedés a megjelenésből | **70%** |
| `/szemoldok-laminalas-zuglo/` megjelenés | 49 |
| `/szempilla-lifting-zuglo/` megjelenés | 95 |
| Hivatkozó domainek | 1 |
| Google-értékelés | 52 (★5,0) |
