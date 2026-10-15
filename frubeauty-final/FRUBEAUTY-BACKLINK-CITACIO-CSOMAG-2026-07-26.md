# FRUBEAUTY — Backlink és citáció csomag

**Dátum:** 2026-07-26 · **Frissítve: 2026-09-18** · **Módszer:** minden célpont élő magyar SERP-ből azonosítva (`hl=hu&gl=hu`) és egyenként ellenőrizve, hogy valóban katalógus-e és fogad-e jelentkezést. Nem generikus katalóguslista.

---

## ⚠️ FRISSÍTÉS 2026-09-18 — mi változott a júliusi verzióhoz képest

A csomag hét hete készen áll, és azóta is **nulla dofollow backlink** van (Ahrefs, 2026-07-31). Mielőtt nekiülsz, öt dolgot javítani kellett benne — ezek közül kettő olyan, hogy a régi szöveget követve **rosszat tettél volna**:

| # | Mi volt | Mi a helyes | Miért |
|---|---|---|---|
| 1 | „Kategória: Kozmetikus (elsődleges)" | **Szépségszalon marad elsődlegesnek** | 2026-08-11-én élőben ellenőrizve: a térképcsomag 12 nyertese közül 12 ezt használja. A „Kozmetikus"-ra átállítás a júliusi csomag téves jegyzete volt. **Ne írd át a GBP-ben.** |
| 2 | Apple Business Connect: „az anyagok készen állnak a `Desktop\FRUBEAUTY-APPLE-BUSINESS\` mappában" | **A mappa nincs meg** (2026-08-07-re eltűnt) | A recept és a képspecek érvényesek, de az anyagokat újra kell generálni. Ne keresd azt a mappát. |
| 3 | A hosszú leírás: „5,0 csillag 52 értékelésből" | **70+ vélemény** | A tulajdonos 2026-09-17-én lépte át a 70-et. |
| 4 | A szolgáltatás-lista nem tartalmazta a lézert | **Bekerült** | A `/lezeres-szortelenites-budapest/` 2026-09-12 óta él (Soprano Titanium, 11 000 Ft-tól). Egy teljes bevételi ág hiányzott minden citációból. |
| 5 | A Cylex-regisztráció státusza ismeretlen volt | ✅ **Átfutott, és 2 dofollow linket ad** | 2026-09-18-án élőben ellenőrizve: Cylex + Firmania + Nyitva.hu mind fent van, a Firmania „Tulajdonos által ellenőrzött" 2026.08.18-i dátummal. A Firmania és a Nyitva.hu ikonos „Weboldal" gombja `rel` nélküli → dofollow. **Ne regisztrálj újra** — lásd az A3 alatti dobozt. |
| 6 | Az Arany Oldalak a Cylex-családba sorolva | **Független tőle** | A Cylex-adatbázis a Cylexet, a Firmaniát és a Nyitva.hu-t hajtja — az Arany Oldalak külön rendszer. Ezért ez az egyetlen katalógus, amit a Cylex elakadása NEM blokkol, és ezért lett ez az első lépés. |

**Ami NEM változott:** a NAP-blokk többi sora, a telefonszám, a nyitvatartás és a Sáv B teljes logikája. Azokat élőben ellenőriztük, és azóta sem mozdultak.

---

## 0. Előbb a kellemetlen igazság: a citáció NEM backlink

A két dolgot rendszeresen összemossák, pedig **két különböző problémát oldanak meg**, és neked az egyik jóval égetőbb:

| | Citáció (katalógus-listázás) | Valódi backlink |
|---|---|---|
| Mit ad | NAP-konzisztencia, entitás-megerősítés | **PageRank / link-egyenérték** |
| Mit javít | **Local Pack**, térképes találat, márkafelismerés | **Organikus rangsor** — konkrétan a money page-ek |
| Link típusa | jellemzően `nofollow` | `dofollow` |
| Megoldja a kannibalizációt? | **Nem** | **Igen, ez az egyetlen ami** |

A GSC 1 hivatkozó domaint mutat (notino.hu). Ez **link-egyenérték-probléma**: emiatt marad a `/szemoldok-laminalas-zuglo/` a kezdőlap mögött, bármilyen jó a címe. **A katalógusok ezt nem fogják megoldani.** Ezért a csomag két külön sávra bomlik, külön elvárásokkal.

Egy konkrét bizonyíték a márka-gyengeségre: a Google a `frubeauty zugló` keresést **automatikusan „true beauty zugló"-ra javítja** — nem ismeri fel a márkanevet entitásként. Ezt viszont pont a citációk javítják.

---

## 1. Kanonikus NAP — betű szerint EZ menjen mindenhová

A citáció akkor ér valamit, ha **minden felületen karakterre azonos**. A GBP a hiteles forrás, élőben ellenőrizve:

```
Név:        FRUBEAUTY – Pecze-Kovács Fruzsina Kozmetikus
Cím:        1143 Budapest, Egressy út 16.
Telefon:    +36 70 215 9954
E-mail:     kfruzsi0197@gmail.com
Weboldal:   https://frubeauty.com/
Kategória:  Szépségszalon (elsődleges — MARADJON) · Kozmetikus (másodlagos)
Koordináta: 47.5058846, 19.1024696
Nyitvatartás:
  Hétfő–Péntek  08:30–19:30
  Szombat       08:00–13:00
  Vasárnap      zárva
```

> **✅ ÉLES (2026-07-26).** A weboldal JSON-LD-je korábban `FRUBEAUTY – Pecze-Kovács Fruzsina` néven futott, a GBP viszont `…Fruzsina **Kozmetikus**`-t mond. Ez NAP-eltérés volt, ami gyengíti az entitás-egyezést. Javítva és kitolva (`Layout.astro` + 3 money page).
>
> **Élesben verifikálva:** a kezdőlap és mind a három aloldal `"name":"FRUBEAUTY – Pecze-Kovács Fruzsina Kozmetikus"`-t szolgál ki, a JSON-LD hibátlanul parse-olódik (BeautySalon + Person + WebSite, illetve FAQPage). **A Sáv A citációk mostantól indíthatók** — a fenti NAP-blokk és az, amit a site állít magáról, egyezik.

> **✅ LEZÁRVA (2026-08-11).** A fenti kérdés — „tényleg Kozmetikus-e az elsődleges kategória" — meg lett vizsgálva élőben, és a válasz az, hogy **a Szépségszalon a helyes, és maradjon is az**. A „szemöldök laminálás budapest" térképcsomagjának mind a 12 nyertese ezt a kategóriát használja. A júliusi csomag „Kozmetikus (elsődleges)" ajánlása téves volt; átírni nemcsak fölösleges, hanem kifejezetten rossz ötlet.

### Leírások — három hosszban, copy-paste

> **Frissítve 2026-09-18.** Mindhárom változatba bekerült a **lézeres szőrtelenítés**, és a vélemény-szám 52-ről **70+**-ra javítva. A régi szövegeket ne használd — a lézer hiánya miatt egy teljes szolgáltatási ág maradt ki minden katalógusból.

**Rövid (≈95 karakter, rövid mezőkhöz):**
> Kozmetikus Zuglóban: lézeres szőrtelenítés, Janssen arckezelés, szempilla lifting, szemöldök laminálás.

**Közepes (≈280 karakter, a legtöbb katalógus fő mezője):**
> A FRUBEAUTY Pecze-Kovács Fruzsina egyszemélyes kozmetikai szalonja Budapest XIV. kerületében, az Egressy úton. Soprano Titanium dióda lézeres szőrtelenítés, Janssen Cosmetics arckezelések, koreai technikás szempilla lifting és szemöldök laminálás, valamint esküvői és alkalmi smink. Egyszerre egy vendég, teljes figyelemmel.

**Hosszú (≈700 karakter, részletes profilokhoz):**
> A FRUBEAUTY Pecze-Kovács Fruzsina kozmetikus egyszemélyes szalonja Budapest XIV. kerületében, Zuglóban, az Egressy út 16. szám alatt. Lézeres szőrtelenítést Soprano Titanium dióda lézerrel végzek, három hullámhosszon — hónalj vagy bikinivonal sorozatban 11.000 Ft alkalmanként. Az arckezeléseket kizárólag Janssen Cosmetics professzionális hatóanyagaival végzem, minden alkalom bőranalízissel indul — mélytisztító, hidratáló és anti-aging protokollokkal. A szemkezelések koreai technikával készülnek: a szempilla lifting festéssel 12.000 Ft és 6–8 hétig tart, a szemöldök laminálás formázással és festéssel 11.000 Ft, tű és tetoválás nélkül. Emellett menyasszonyi próbasminket, esküvői és alkalmi sminket is vállalok, kiszállással. Egyszerre csak egy vendéget fogadok, így nincs kapkodás. Online foglalás, 5,0 csillag 70+ értékelésből.

---

## 2. SÁV A — Citációk (Local Pack, NAP-konzisztencia)

Elvárás: **nem hoznak organikus rangsort.** A térképes találatot, a márkafelismerést és a NAP-egyezést erősítik. Gyors és ingyenes.

| # | Célpont | Bizonyíték / miért | Belépés | Ellenőrizve |
|---|---|---|---|---|
| A1 | **Bing Places** | A Bing/Copilot lokális találataihoz kell; a GBP-ből importálható, 10 perc | bingplaces.com | — |
| A2 | **Apple Business Connect** | iPhone Térkép + Siri. ⚠️ **A `Desktop\FRUBEAUTY-APPLE-BUSINESS\` mappa 2026-08-07-re eltűnt** — a recept és a képspecek érvényesek, de az anyagokat újra kell generálni | businessconnect.apple.com | memória |
| ~~A3~~ | **Cylex-család: Cylex + Firmania + Nyitva.hu** | ✅ **KÉSZ.** Egy regisztráció három megjelenés, ebből a Firmania és a Nyitva.hu **dofollow**. Beküldve 2026-08-07, élesben 2026-08-18. **NE regisztrálj újra** — a duplikátum adatlap rosszabb, mint a hiány | — | ✅ 2026-09-18: élőben ellenőrizve |
| A4 | **Arany Oldalak** | 593 800 céggel a legnagyobb magyar katalógus, ingyenes, **független a Cylex-hálótól**. A dofollow **2026-09-18-án újra ellenőrizve élő cégadatlapon**: a weboldal-linkek `rel` nélküliek → valódi dofollow. ⚠️ **DE a regisztráció nálunk nem megy: „geo" hibára fut** (a tulajdonos többször próbálta) — lásd a lenti dobozt | `aranyoldalak.hu/regisztracio` | ⚠️ 2026-09-18: reg. hibás |
| A5 | **ittlakunk.hu XIV. kerület** | **#8 helyen rangsorol a „kozmetikus 14 kerület"-re** — hiperlokális, pont a te kerületed | `14.kerulet.ittlakunk.hu/holmi/letrehozas` (Bolt/Szolgáltatás) | ✅ böngészővel |
| A6 | **Miutcánk** | Szomszédsági közösség, Zugló-fókusz; nem SEO-erő, hanem valódi helyi elérés | `miutcank.hu/regisztracio` | ✅ |
| A7 | **azeskuvo.hu** | Esküvő-specifikus NAP-citáció a `/sminkes-zuglo/`-hoz; 23 sminkes a kategóriában, ingyenes regisztráció. **Linket nem ad** (a webcím szövegként jelenik meg) — ezért van itt és nem a Sáv B-ben | `azeskuvo.hu/regisztracio` | ✅ forráskódból |

**Időigény összesen: ~2,5 óra.** Mind ingyenes.

### ✅ A Cylex-regisztráció ÁTFUTOTT — és már két dofollow linket ad

**Élőben ellenőrizve 2026-09-18-án**, mindhárom katalógus SAJÁT keresőjével és a renderelt DOM `rel` attribútumaival:

| Katalógus | Adatlap | Weboldal-link | Érték |
|---|---|---|---|
| **Cylex** | ✅ fent van | van | citáció (a Cylex maga nofollow) |
| **Firmania** | ✅ fent van, „Tulajdonos által ellenőrzött", frissítve **2026.08.18.** | ikonos „Weboldal" gomb **`rel` nélkül** | ✅ **DOFOLLOW** |
| **Nyitva.hu** | ✅ fent van | ikonos „Weboldal" gomb **`rel` nélkül** | ✅ **DOFOLLOW** |

A 08-07-i beküldés tehát **11 nap alatt átfutott**, a Cylex által ígért 2–3 héten belül. A NAP-adat helyes mindhárom helyen: `FRUBEAUTY – Pecze-Kovács Fruzsina Kozmetikus` · Egressy út 16, 1143 Budapest XIV · +36 70 215 9954 · https://frubeauty.com/

> **A memória pontosan megjósolta a mintát:** a szöveges `https://frubeauty.com/` link `rel="nofollow"`, de az **ikonos „Weboldal" gomb** rel nélkül van. Ha valaki csak a szöveges linket nézi, tévesen arra jut, hogy nincs dofollow.

> **Csapda, amit könnyű félreolvasni:** az Egressy út 16-on van egy másik Firmania/Nyitva-adatlap is, a **„Natural Beauty Szépségszalon"** (+36 1 220 4677, naturalbeauty.hu). Az NEM a te adatlapod. Azonos címen futó, eltérő NAP-adatként inkább gyengíti az entitás-egyezést — ha a katalógus engedi, érdemes jelenteni elavultként.

### ⚠️ Az Arany Oldalak regisztrációja „geo" hibára fut (2026-09-18)

A tulajdonos többször próbálta, mindig ugyanaz. Amit ellenőriztem:

- **A link értéke valós:** élő cégadatlapon a weboldal-linkek `rel` nélküliek → **dofollow**. A katalógus él, 1200 kozmetikai céggel.
- **A `/regisztracio` oldalon nincs geo mező** — az csak e-mail + jelszó. A hiba tehát a bejelentkezés utáni **cégadatlap** lépésben van, ahol a címet geokódolják.
- **Figyelmeztető jelek a platformról:** a footer copyrightja 2021-en áll, és a saját keresőjük irreleváns tartalmat (kalóz felirat-oldalakat) dob ki találatként. Ez nem egy karbantartott rendszer.

**Ügyfélszolgálat** (az üzemeltető MTT Media Kft.): `ugyfelszolgalat@mtt.hu` · +36 1 67 77 400 · +36 20 7777 360

**A döntés, amit javaslok: ne harcolj tovább ezzel az űrlappal.** A 3. dofollow domainhez a **B1 (Janssen)** jobb választás minden szempontból:

| | Arany Oldalak | Janssen kozmetikus-kereső |
|---|---|---|
| Témabeli illeszkedés | általános katalógus | **a márka, amivel kizárólag dolgozol** |
| Link-erő | gyenge (katalógus-link) | **erős, releváns** |
| Állapot | törött űrlap, elhanyagolt platform | üres kereső-oldal → elsőként kerülhetsz fel |
| Ráfordítás | ismeretlen, már többször elbukott | **egy e-mail, ami már meg van írva** |

A kész levél: `FRUBEAUTY-BACKLINK-LEVELEK-2026-09-07.md`, 1. levél — *„Kozmetikus-kereső — feltölthető vagyok elsőként?"*

Ha mégis meg akarod csinálni az Arany Oldalakat: jelentkezz be, és onnantól a cégadatlap kitöltése végigvihető Claude in Chrome-mal — a geo hibát élőben megnézzük.

> **Módszertani tanulság, ami sok időt spórol:** a `WebSearch` (amerikai index) **nem alkalmas** magyar katalógus-listázás ellenőrzésére — ezekre a JS-ből renderelt aloldalakra nem lát rá, és 2026-09-18-án hamis negatívot adott mind a háromra. A `curl` sem jó: a Firmania szerveroldalon 5,9 KB-os vázat ad vissza. **Autoritatív forrás: a katalógus saját keresője, valódi böngészőben**, a `rel` attribútumot pedig a renderelt DOM-ból kell kiolvasni.

---

## 3. SÁV B — Valódi linkek (ez oldja a kannibalizációt)

Itt van a tényleges tét. Kevesebb célpont, nagyobb hozam, több munka.

### B1 — Janssen Cosmetics Hungary ⭐ a legnagyobb hozamú

Kizárólag Janssen hatóanyagokkal dolgozol — ez egy **beszállítói kapcsolat**, ami a legtermészetesebb dofollow link a szakmában, és tematikusan tökéletes (`arckezelés`, `kozmetikus`).

**Utólagos ellenőrzés (2026-07-26, második nekifutás):** a site korábban timeoutolt, most válaszol. Átnéztem a teljes oldaltérképüket, és van egy fontos találat:

> **Létezik egy `janssen-cosmetics.hu/kozmetikus-kereso/` oldaluk** — pontosan az, amire szükséged lenne. **DE jelenleg teljesen üres** (a tartalom-konténer 0 karakter), nincs benne se lista, se térkép, és a főmenüből sem érhető el. A sitemap szerint 2024-04-17-én készült és aznap óta nem módosult. Vagyis: elindították a kozmetikus-keresőt, aztán elhalt.

Ez **jobb tárgyalási pozíció**, mint egy kész lista lett volna, mert konkrét kérésed van egy konkrét oldalra. Amit kérni kell, ebben a sorrendben:

1. **Felkerülés a `/kozmetikus-kereso/` oldalra**, a weboldalra mutató linkkel. Ha az oldal üresen áll, ajánld fel, hogy te vagy az első listázott — az ő oldaluknak is jobb egy feltöltött kereső, mint egy üres.
2. Ha a kereső halott projekt: **esettanulmány vagy interjú** a blogjukra (`/blog/` aktív, rendszeresen posztolnak) vagy a közösségi felületeikre — kozmetikus-portré, protokoll-bemutató, előtte/utána. Ehhez van anyagod (fotók, 70+ értékelés, konkrét protokollok).
3. Harmadik szál: **workshopok**. Van `/workshopok/` oldaluk és nyílt napjaik (2024, 2025). Egy résztvevői/oktatói szereplés jellemzően névvel + linkkel jár.

Kapcsolat: `shop@janssen-cosmetics.hu` · +36 1 708 5738 · Facebook/Instagram `@janssencosmeticshu` · üzemeltető **Time Reverse 21 Kft.**, 1117 Budapest, Sopron út 18. (H–P 9:00–17:00)

### B2 — Salonic.hu ⭐ bizonyítottan az 1. oldalon a te kulcsszavadra

Ez a **legerősebb aggregátor** a szakmádban, és a saját SERP-adataid bizonyítják:

| Lekérdezés | Salonic helyezése |
|---|---|
| szemöldök laminálás | **#2** és #7 |
| szemöldök laminálás budapest | **#2** és #6 |
| szempilla lifting budapest | #4 |

Vagyis a Salonic ott áll, ahová te nem érsz fel. Egy ottani profil **kettős haszon**: link + közvetlen ajánlásforgalom pont azokról a kulcsszavakról, amiken jelenleg 11–15. helyen vagy.

**A buktató, amit tudnod kell:** a Salonic nem katalógus, hanem **foglalási rendszer** (digitális naptár + szalonkereső piactér). 14 nap ingyenes próba, utána fizetős. Te jelenleg **Notinóval** foglalsz — tehát ez nem egy „regisztrálok és kész" lépés, hanem üzleti döntés arról, átállsz-e vagy párhuzamosan futtatod. Ezt neked kell eldönteni; SEO-ból nézve a listázás értékes, a rendszerváltás viszont valós költség és tanulási idő.

Belépés: `partner-onboarding.salonic.hu` · árak: `partner.salonic.hu/arak/`

### B3 — JóSzaki

Szakemberkereső, 10 000+ ellenőrzött szakemberrel, van Szépségápolás kategória, és **#7-en rangsorol a „kozmetikus 14 kerület"-re**. „Szakemberként regisztrálok" belépés a `joszaki.hu`-n. Az ügyféloldal ingyenes; a szakemberi díjazás nem derült ki az oldalról — kérdezd meg jelentkezés előtt.

### B4 — Esküvői vonal (a `/sminkes-zuglo/`-hoz)

A `/sminkes-zuglo/` a **működő** money page-ed (230 megjelenés, 13 kattintás, #8 az „esküvői smink árak"-ra). Ez a legkönnyebben feljebb tolható oldal.

**Kikutatva 2026-07-26-án.** Minden célpontnál egyetlen dolgot néztem: **kap-e a szolgáltató valódi, követhető `<a href>` linket a saját oldalára.** Az eredmény meglepő és fontos, ezért két részre bontom.

#### B4a — A nagy esküvői katalógusok: MIND link-halottak. Ne számíts rájuk backlinkként.

Végigmentem a négy legnagyobbon, és mindegyiknél megnéztem egy valódi sminkes-profil forráskódját:

| Portál | Méret | Link a te oldaladra | A konkrét bizonyíték |
|---|---|---|---|
| **mieskuvonk24.hu** | 18 kategória, „fodrász, smink" | ❌ | A „weboldal" gomb valójában `<a href="#" rel="nofollow" onclick="openRedirect(890,1,0)">` — üres href **és** nofollow **és** JS-átirányítás. Háromszorosan halott. |
| **azeskuvo.hu** | 23 sminkes, ingyenes reg. | ❌ | A profilon a webcím **sima szövegként** áll (`divatsminkes.hu`), nincs körülötte `<a>` tag. Az egyetlen kimenő link a saját fizetett bannereik. |
| **eskuvo.online** | 1 331 szolgáltató, van Budapest **és kerület** szintű kategórialap | ❌ | `<span data-toggle="modal" data-target="#pleaseLoginModal">Weboldal megtekintése</span>` — a webcím **belépés mögé van rejtve**, még csak nem is anchor. |
| **CEWES Esküvő Kiállítás** (Hungexpo, 2026.02.28–03.01. és 11.07–08.) | 300+ kiállító | ❌ | A `/kiallitok/` oldal egy **sima szöveges tábla**: név / kategória / stand-szám. Nulla kimenő link az egész listán. |

**Amit ebből le kell vonni:** a magyar esküvői katalógus-piac **lead-gen üzlet, nem link-forrás**. Szándékosan tartják bent a látogatót. Vagyis a doksi §0-ban leírt szétválasztás itt is érvényes — ezek Sáv A-jellegűek, nem Sáv B.

Ettől még **két hasznos maradt belőlük**, de citációként, nem linkként:
- **azeskuvo.hu** — ingyenes regisztráció (`azeskuvo.hu/regisztracio`), esküvő-specifikus NAP-citáció, a telefon + webcím szövegesen kint van. Vedd fel a Sáv A listára A7-ként.
- **mieskuvonk24.hu** — ajánlatkérő platform. SEO-ból nulla, **lead-forrásként viszont valós**, mert a párok konkrét ajánlatkéréssel érkeznek. Üzleti döntés, nem SEO-döntés.

Az **eskuvo.online**-t kihagynám: még citációnak is gyenge, mert a webcím login mögött van, tehát a Google sem látja.
A **CEWES kiállítást** backlink-céllal pláne ne — standköltséget fizetnél nulla linkért. Marketingként lehet értelme, de az más kassza.

#### B4b — Ami viszont TÉNYLEG ad dofollow linket: a partner-oldalak

Itt van a valódi esküvői link-forrás, és pont az ellenkezője a katalógusnak: **nem regisztrálsz sehova, hanem együtt dolgozol valakivel.** Az esküvői fotósok, DJ-k, ceremóniamesterek és szervezők rendszeresen tartanak „Partnerek" / „Ajánlott szolgáltatók" / „Referenciák" oldalt — és ezek **valódi, követhető linkek**. Ellenőrizve:

| Példa-oldal | Kimenő link formája | Dofollow? |
|---|---|---|
| `lar.hu/partnerek/` (Love and Ring esküvői fotózás) | `<a href="https://kovarimate.hu/">` — **semmilyen `rel` nincs rajta** | ✅ tiszta dofollow |
| `djcsiki.hu/ajanlott-eskuvoi-szolgaltatok/` | `rel="noopener noreferrer"` — 11 kimenő link | ✅ (a noopener nem befolyásolja a rangsort) |
| `budapestdj.hu/referenciak/` | 7 kimenő link, ebből egy nofollow (a webfejlesztő kreditje) | ✅ a szolgáltatói linkek dofollow-k |
| `menyasszonyfoto.hu` | külön **sminkes / fodrász / manikűrös** partnerszekció | ✅ |

**A gyakorlati lépés ezért nem keresgélés, hanem egy lista a saját múltadból:** kik fotózták azokat az esküvőket, ahol sminkeltél? Írj nekik. A kérés természetes és kölcsönös — te is fel tudod tenni őket a saját oldaladra. Ez a legmagasabb konverziójú link-kérés, ami létezik, mert nem idegentől kérsz.

#### B4c — Ceremóniamester Szövetség ⭐ a legjobb egyedi célpont

`ceremoniamesterszovetseg.hu/elismert-eskuvoi-szolgaltatok/` — átnéztem a teljes oldal forrását:

- **72 kimenő külső link, és NULLA nofollow.** Ez az egyik legtisztább dofollow-forrás, amit a magyar esküvői szektorban találtam.
- Van **„Beauty" kategória — mindössze 3 szereplővel** (Almási Petra Makeup Artist → `almasipetra.hu`, Glammaker – Varga Szilvi, Várady Polett). Vagyis a szekció **vékony**, van benne hely.
- A szövetség 2000+ esküvőn dolgozott együtt szolgáltatókkal.

**A buktató:** nincs jelentkezési űrlap és nincs díjszabás, mert ez nem katalógus. Az oldal saját megfogalmazása szerint azokat mutatják be, akiknek a munkáját szakmailag elismerik és emberileg is nagyra tartják. Tehát **kapcsolat-alapú**: vagy egy ceremóniamester ajánl be, vagy közvetlenül megkeresed őket.

Kapcsolat: `iroda@ceremoniamesterszovetseg.hu` · +36 1 501 3463

Ez a sáv B egyetlen olyan eleme, ahol egy jól megírt e-mail önmagában elég lehet — érdemes a `/sminkes-zuglo/` oldalt, a 70+ értékelést és a konkrét esküvői referenciákat mellékelni.

### B5 — Amit NEM érdemes csinálni

A kutatás során ezek katalógusnak tűntek a SERP-ben, de **egyéni szolgáltatók saját oldalai** — ne pazarolj rájuk időt:

- `eskuvoi-sminkes.com` — Szépvölgyi Ildikó saját oldala
- `sminkesem.hu` — Ungvári Brigi saját oldala
- `beauty.co.hu` — **Beauty Szalon Zugló** (1141 Budapest, Komócsy u. 14.) — ez nem katalógus, hanem **közvetlen lokális versenytársad**: #9 a „kozmetikus zugló"-ra, #6 a „kozmetikus 14 kerület"-re

Ide tartozik a B4a négy esküvői portálja is: `eskuvo.online` (a webcím login mögött) és a **CEWES Esküvő Kiállítás** (standköltség nulla linkért) backlink-céllal kidobott pénz és idő.

---

## 4. Amit én nem tudok elvégezni

**Fiókot nem hozok létre és jelszót nem adok meg** egyik felületen sem — ezeket neked kell megcsinálnod. Amit viszont át tudok venni: a fenti NAP-blokk és a három leírás úgy van megírva, hogy **másolás-beillesztéssel** kitölthető legyen minden űrlap; nem kell fogalmazni közben.

---

## 5. Sorrend

**1. hét — Sáv A teljesen (~2 óra).** Olcsó, gyors, és megalapozza a NAP-konzisztenciát, mielőtt bárhová linket kérnél.

**1. hét — B1 megkeresés.** Egy e-mail vagy DM a Janssennek. Ez a legnagyobb hozamú lépés, és nem kerül semmibe. Ha van partnerlistájuk, a link napokon belül meglehet.

**1. hét — B4c megkeresés.** A Ceremóniamester Szövetség e-mailje. A B1 mellett ez a másik lépés, ami nem kerül semmibe, és bizonyítottan dofollow linket ad egy vékonyan lefedett kategóriában.

**2. hét — B2 döntés.** Salonic: 14 napos próba elindítása, vagy tudatos elvetés. Ne halogasd döntés nélkül.

**2. hét — B4b lista.** Írd össze, kik fotózták azokat az esküvőket, ahol sminkeltél. Ez egy 20 perces feladat a saját naptáradból/fotóidból, és ez adja a legvalószínűbb linkeket az egész csomagban.

**2–3. hét — B3 + a B4b megkeresések.** Ha a fentiek megvannak.

**Cél 30 napra:** hivatkozó **dofollow** domainek **0 → 4+**. A júliusi csomag még „1 → 5+"-öt írt, de a 2026-07-31-i Ahrefs-audit pontosította a kiindulást: a dofollow linkek száma **nulla** (a GSC-ben látszó notino.hu és infobel.com nem ad átadható erőt). A 415 nofollow spam-domain egy külső kampányból jön — **disavow-olni NEM kell**, a Google ezeket magától figyelmen kívül hagyja.

Mérés: GSC `Links` riport + Ahrefs.

**A 2026-09-18-i élő állapot: 2 dofollow domain már megvan** (firmania.hu, nyitva.hu) — mindkettő 2026-08-18 óta. A 2026-07-31-i Ahrefs-audit „0 dofollow" megállapítása **nem mond ennek ellent**: az a mérés három héttel a listázások élesedése ELŐTT készült.

Innen a 4-es célig két darab hiányzik:
- **A4 (Arany Oldalak)** = +1 dofollow, független rendszer, ~20 perc → **ez a következő lépés**
- **B1 (Janssen)** vagy **B4c (Ceremóniamester Szövetség)** = +1, e-mailbe kerül

Következő mérési pont: **2026-10-18**. Ha az Ahrefs addigra sem látja a firmania.hu/nyitva.hu linket, az nem a listázás hibája, hanem a crawl-késés — a GSC `Links` riportja a megbízhatóbb visszajelzés.

---

## 6. Mérési pont

A 2026-08-09-i (14 napos) mérésbe ezt is vedd bele:

| Mutató | Most (2026-07-26) | Cél |
|---|---|---|
| Hivatkozó domainek (GSC Links) | **1** | 5+ |
| `/szemoldok-laminalas-zuglo/` megjelenés (28 nap) | 48 | 150+ |
| „szemöldök laminálás" pozíció | 15,8 | <10 |
| Melyik URL rangsorol a „szemöldök laminálás"-ra | kezdőlap | money page |
| Google-értékelés | 52 | 60+ |
