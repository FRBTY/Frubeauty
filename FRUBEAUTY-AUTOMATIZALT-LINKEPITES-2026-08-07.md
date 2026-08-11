# FRUBEAUTY — automatizált linképítés

**Dátum:** 2026-08-07
**Forrás:** *„Claude automated my link building in 3 minutes"* — Kasra Dash (14:15). A teljes leiratot végigolvastam, nem az összefoglalóból dolgoztam.
**Kiindulás:** 0 dofollow backlink (Ahrefs, 2026-07-31), 415 nofollow spam-domain, technikai SEO 100/100. A kar tehát nem a kódban van — de a kódnak ki kell szolgálnia a linképítést.

---

## 1. Mit mond a videó, és hol tart ebből a FRUBEAUTY

A videó négy pillérre bontja a linképítést. Végigmértem mind a négyet a jelenlegi állapotunkon:

| # | Pillér | A videó állítása | FRUBEAUTY-állapot |
|---|---|---|---|
| 1 | **Foundational linkek** — közösségi profilok | Nem közvetlen rangsor-faktor, de „egy újabb felület, amivel az LLM-eket és az AI Overview-t eteted a vállalkozásodról" | Instagram + Facebook él és a footerből linkelve. **A Google-találat (GBP) viszont eddig nem szerepelt az entitás-gráfban** → ma javítva |
| 2 | **Katalógus-linkek** | „Láttam weboldalakat, amik kizárólag katalógus-linkekből rangsorolnak"; a legtöbb ingyenes | Öt doksiban meg van tervezve 2026-06-12 óta, **egy sincs végrehajtva**. Ez a legrégebbi nyitott tétel a projektben |
| 3 | **Automatizálás** Claude Chrome-mal | A bővítmény kitölti az űrlapot; az adatokat a saját weboldaladról szedi | Ehhez a weboldalnak géppel olvashatóan kell tudnia a saját adatait → ma ez lett beépítve |
| 4 | **Guest post + outreach** hunter.io-val | Versenytárs-backlinkek visszafejtése, e-mail-cím keresés, Claude megírja a levelet | **Ez már megvan** — 5 pitch kiment 2026-08-01-én (`FRUBEAUTY-GUEST-POST-OUTREACH-2026-08-01.md`). Follow-up esedékes 08-10-én |

**Vagyis a videóból a 2. és 3. pillér az, ami nálunk tényleges hiány.** A 4. már fut, az 1. félkész volt.

---

## 2. A döntő rész: melyik magyar katalógus ad VALÓDI linket

A videó a UK-piacról beszél (Yell, dentistdirectory.co.uk). Magyarra átültetve az egészből egyetlen kérdés számít: **kap-e a listázott vállalkozás követhető `<a href>`-et a saját oldalára, `rel="nofollow"` nélkül?** Ha nem, akkor citáció (Local Pack, entitás), nem link (rangsor).

Ezt ma **egyenként megnéztem forráskódból** élő szalon-profilokon:

| Katalógus | A weboldal-link forráskódja | Verdikt |
|---|---|---|
| **Aranyoldalak.hu** | `<a class="externalLink websiteLink" target="_blank" href="…">` — **nincs rajta `rel`** (15 ilyen link a `/kozmetika/budapest/` listaoldalon) | ✅ **dofollow** |
| **Firmania.hu** | az ikonos „Weboldal" gomb: `<a class="gtm-website-click…" data-track="website" href="…" target="_blank">` — **nincs `rel`** | ✅ **dofollow** |
| **Nyitva.hu** | ugyanaz a minta, ugyanaz a kódbázis | ✅ **dofollow** |
| **Cylex.hu** | `<a href="…" rel="nofollow">Weboldal</a>` | ❌ csak citáció |

> A Firmanián és a Nyitva.hu-n a **szöveges** webcím-változat `nofollow`, az **ikonos** gomb viszont nem — ugyanarra az URL-re. Ez majdnem biztosan figyelmetlenség a részükről, nem szándék. Ettől még működik, de ne építs rá örökre: ha egyszer megjavítják, a link nofollow lesz.

### A nem várt felfedezés: a három katalógus egy adatbázisból él

A Firmania profiloldalának forrásában ott van a `"CylexID":"HU1233941"`, a Nyitva.hu-én a `"CylexID":"HU1073275"`, a Firmania kezdőlapja pedig szó szerint azt írja: *„Regisztráljon és bővítse vállalkozását a Firmania & Cylex segítségével!"*. **Mindhármat a Cylex üzemelteti, közös céges adatbázisból.**

**Amit ez jelent:** jó eséllyel **egyetlen ingyenes Cylex-regisztrációból három listázás lesz** — és bár maga a Cylex nofollow, a Firmania és a Nyitva.hu **dofollow**. Vagyis egy űrlap ≈ 2 dofollow hivatkozó domain, nulláról.

**Amit ez NEM jelent, és amiben nem hazudok:** a slug-azonosítók nem közösek (a `firmania.hu/…-367901` más céget ad, mint a `cylex.hu/…-367901`), és **nem ellenőriztem, hogy egy friss regisztráció ténylegesen átfut-e mindhárom felületre**, se azt, hogy mennyi idő alatt. Ez egy erősen alátámasztott feltevés, amit maga a regisztráció fog eldönteni. Ha 2–3 hét múlva csak a Cylexen vagy fent, akkor a Firmaniára és a Nyitva.hu-ra külön kell jelentkezni.

**Következmény a korábbi tervre:** a `FRUBEAUTY-BACKLINK-CITACIO-CSOMAG-2026-07-26.md` az Aranyoldalakat és a Cylexet is „Sáv A — nem hoz organikus rangsort" alá sorolta. **Az Aranyoldalak esetében ez téves volt** — az dofollow, tehát Sáv B. A Cylexnél helyes volt, de a mögötte lévő Firmania/Nyitva.hu miatt mégis megéri.

---

## 3. Amit ma beépítettem a weboldalba

A videó automatizálási prompja így szól: *„ha bizonytalan vagy a címben, telefonszámban, szolgáltatásokban, nyugodtan menj fel a weboldalamra és onnan szedd ki."* Ez pontosan annyira működik, amennyire a weboldal **géppel olvashatóan** tudja a saját adatait. Eddig nem tudta: az árak négy oldalon szét voltak szórva, a leírásokat egy `.md` doksi tartalmazta (amit egy böngésző-ágens nem lát), és a `llms.txt` a szolgáltatások felét kihagyta.

**Három változás:**

1. **`src/config/site.ts` → új `businessIdentity` blokk.** Kanonikus név, jogi név, kategóriák, és a három hosszúságú leírás (≈90 / ≈250 / ≈600 karakter) — egy forrásból. Ebből él a JSON-LD és az `llms.txt` is, tehát nem tudnak szétcsúszni. Szándékosan **nincs benne értékelés-szám**: az hetente változik, és egy elavult „52 értékelés" a katalógusokban évekig kint ragadna.

2. **`src/layouts/Layout.astro` → bővített entitás-gráf.** A `BeautySalon` node megkapta a `description`, `legalName` és `knowsLanguage` mezőket, a `sameAs` pedig **a Google Térkép-profilt** is. Eddig csak `hasMap` volt — az annyit mond, hogy „itt a térkép"; a `sameAs` viszont azt állítja, hogy a Maps-találat és ez az oldal **ugyanaz az entitás**. Ez a videó 1. pillére kódban. A `Person` node `sameAs`-ába bekerült a Notino-profil, mert annak a címe szó szerint személy-profil („Pecze-Kovács Fruzsina Kozmetikus, Sminkes, Szemöldök és szempilla stylist").

3. **`public/llms.txt` → teljes üzleti adatlap.** Kanonikus NAP betű szerint, nyitvatartás, kategóriák, ellátott terület, fizetési módok, mind a **20 szolgáltatás árral és időtartammal**, a három leírás, és a hivatalos profilok. Korábban 6 szolgáltatás volt benne, cím- és kategória-blokk nélkül.

**Verifikálva:** `npm run typecheck` tiszta, `npm run build` 24 oldal hibátlanul, `npm run seo:smoke` átment, és a legenerált `dist/index.html` JSON-LD-jét kiparse-oltam — a `BeautySalon` node a négy `sameAs` URL-lel és az új mezőkkel jön ki.

> **Deploy:** a változások a working tree-ben vannak, **még nincsenek élesben**. `npm run deploy` viszi ki őket.

---

## 4. A futtatható rész — prompt-készlet Claude in Chrome-hoz

A videó módszere: megnyitod a katalógus űrlapját, és a Claude Chrome-bővítménynek egy mondatban megmondod, mit töltsön ki. A prompt annyival jobb az övénél, hogy **az `llms.txt`-re irányítom**, nem a kezdőlapra — így nem kell hat aloldalt végigolvasnia, és garantáltan a kanonikus szöveget kapja.

**Az univerzális prompt (ez működik bármelyik katalógusnál):**

```
Töltsd ki ezt a katalógus-regisztrációs űrlapot a FRUBEAUTY nevű budapesti
kozmetikai szalon adataival.

Minden adatot innen vegyél: https://frubeauty.com/llms.txt
Semmit ne találj ki. Ha egy kötelező mezőhöz nincs adat az llms.txt-ben,
hagyd üresen és a végén sorold fel, mit kérsz tőlem.

Mezőkitöltési szabályok:
- Cégnév mező: PONTOSAN „FRUBEAUTY – Pecze-Kovács Fruzsina Kozmetikus”.
  Ne rövidítsd, ne írd át, ne cseréld le a gondolatjelet kötőjelre.
- Rövid leírás / szlogen mező: az llms.txt „Leírás — rövid” blokkja.
- Fő leírás mező: a „Leírás — közepes” blokk. Ha 400 karakternél többet enged,
  a „Leírás — hosszú”.
- Kategória: elsődleges „Kozmetikus”, másodlagos „Szépségszalon”. Ha csak
  előre megadott listából lehet választani, válaszd a legközelebbit és írd
  meg nekem, mit választottál.
- Nyitvatartás: az llms.txt szerint, a vasárnap zárva.
- Weboldal mező: https://frubeauty.com/ (záró perjellel)

Ne küldd be az űrlapot. Amikor kész, szólj, és én nézem át.
```

**Az utolsó sor nem udvariasság.** A beküldés visszavonhatatlan és a te neveddel történik — a katalógusban a te címed és telefonszámod jelenik meg. Nézd át, mielőtt elküldöd.

**Célpontonkénti kiegészítés:**

| Cél | URL | Prompt-kiegészítés |
|---|---|---|
| **Cylex** ⭐ (→ Firmania + Nyitva.hu) | `cylex.hu/register-company` | „Ha kategóriát választani kell, a »Szépségszalon, kozmetika« a helyes." |
| **Aranyoldalak** ⭐ dofollow | `aranyoldalak.hu/regisztracio` | „Az ingyenes csomagot válaszd, ne a fizetőset." |
| **ittlakunk.hu XIV. ker.** | `14.kerulet.ittlakunk.hu/holmi/letrehozas` | „Típus: Bolt/Szolgáltatás. A leírásban hangsúlyozd a Zugló / XIV. kerület helyszínt." |
| **Miutcánk** | `miutcank.hu/regisztracio` | „Szomszédsági oldal — a hosszú leírás megy ide." |
| **azeskuvo.hu** | `azeskuvo.hu/regisztracio` | „Sminkes kategória. A leírásból az esküvői/menyasszonyi részt emeld ki." |

**Amit a videó is elmond, és nálunk is igaz:** a bővítmény **képet nem tud feltölteni**. Ez a te 20 másodperces feladatod minden űrlapnál.

> ⚠️ **Ehhez viszont nincs kész eszközkészletünk.** A `Desktop\FRUBEAUTY-APPLE-BUSINESS\` mappa, amiben a logó- és borítóanyagok voltak, **már nem létezik a gépen** (ma ellenőriztem). Ami most használható: `public/img/fruzsina-portrait.jpg` (493 KB) profilképnek, és a `public/favicon.svg` „F" monogram — de az utóbbi csak egy betű sötét négyzeten, katalógus-logónak gyenge. Egy rendes, négyzetes logófájl hiánya az egyetlen tényleges hiányzó eszköz ebben a csomagban.

---

## 5. Amit nem én csinálok meg

**Fiókot nem hozok létre és jelszót nem írok be** egyik felületen sem — ez rád marad, felületenként 2 perc. Ugyanígy: a beküldés (`Mentés`, `Elküldöm`) gombot sem nyomom meg helyetted, mert az a te neveddel tett, visszavonhatatlan lépés. **CAPTCHA-t sem oldok meg és nem kerülök meg.**

### ⚠️ Munkamegosztás — 2026-08-07-i tapasztalat alapján javítva

Az eredeti terv az volt, hogy a regisztrációt a Claude Browser paneljében csinálod, és onnan átveszem az űrlapot. **Ez captcha-s oldalnál nem működik.**

A Cylex regisztrációján a reCAPTCHA felismeri a távvezérelt böngészőt (a panel CDP-vel hajtott), és **nem engedi bepipálni a „Nem vagyok robot"-ot** — a Cylex saját hibaüzenete is azt írja: *„Ha nem látja a CAPTCHA-t, kapcsolja ki a VPN-t, vagy használjon másik böngészőt."* Nem géphiba, nem VPN: a bot-védelem dolgozik rendeltetésszerűen.

**A helyes sorrend ezért minden katalógusnál:**

| Lépés | Hol | Ki |
|---|---|---|
| Regisztráció / bejelentkezés (captcha, jelszó) | **saját Chrome** | te |
| Cégadatlap kitöltése (a hosszú, unalmas rész) | saját Chrome + **Claude in Chrome bővítmény** | a bővítmény, a §4 promptjával |
| Kép/logó feltöltése | saját Chrome | te (a bővítmény nem tud képet feltölteni) |
| Beküldés | saját Chrome | te |

A Browser panel így a **felderítésre** marad jó (megnéztem vele, melyik katalógus ad dofollow-t, és milyen mezőket kér az űrlap) — a bejelentkezett munkamenetre nem.

**Egy fontos következmény:** mivel a kitöltést a Chrome-bővítmény végzi és nem én, a `https://frubeauty.com/llms.txt` élesben létezése nem kényelmi kérdés, hanem **előfeltétel**. A bővítmény onnan veszi az adatokat. ✅ Élesben verifikálva 2026-08-07-én.

---

## 6. Sorrend

| # | Lépés | Idő | Várható hozam |
|---|---|---|---|
| 1 | **Deploy** (`npm run deploy`) — enélkül az `llms.txt` régi verziója él, és az ágens hiányos adatokat kap | 3 perc | előfeltétel |
| 2 | **Cylex-regisztráció** | 15 perc | potenciálisan **2 dofollow domain** (Firmania + Nyitva.hu) |
| 3 | **Aranyoldalak** | 15 perc | **1 dofollow domain** |
| 4 | Guest-post follow-up (08-10, az 5 kiküldött pitchre) | 10 perc | 0–2 szerkesztőségi link |
| 5 | ittlakunk + Miutcánk + azeskuvo | 30 perc | citáció (Local Pack, entitás) |
| 6 | 2–3 hét múlva: **ellenőrizd, átfutott-e a Cylex a Firmaniára és a Nyitva.hu-ra**. Ha nem, külön jelentkezés | 10 perc | a 2. lépés beváltása |

## 6/a. Végrehajtási napló

### ✅ Cylex — beküldve 2026-08-07

Amit ténylegesen rögzítettünk (a Claude in Chrome bővítménnyel kitöltve, a user küldte be):

| Mező | Érték |
|---|---|
| Cég neve | `FRUBEAUTY – Pecze-Kovács Fruzsina Kozmetikus` (gondolatjellel, karakterre a kanonikus) |
| Hivatalos név | `Pecze-Kovács Fruzsina e.v.` |
| Cím | Egressy út 16 · Budapest · 1143 · Kerület: XIV · **megjelenítve** (nem elrejtve) |
| Koordináta | `47.505856 / 19.102443` |
| Telefon | `+36 70 215 9954` |
| E-mail | `kfruzsi0197@gmail.com`, megjelenítve |
| Honlap | `https://frubeauty.com/` |
| Facebook | automatikusan a `sameAs`-ból |
| Elsődleges kategória | Egészség & szépségápolás » **Szépségszalon, kozmetika** |
| Leírások | a kanonikus közepes + hosszú, utóbbi a teljes árlistával |

**Két tanulság a folyamatból:**

1. **A honlap-crawl a döntő lépés.** A regisztráció 2. lépésében a Cylex felajánlja, hogy ~60 másodperc alatt lekéri a honlapról a regisztrációhoz szükséges összes adatot — és meg is tette: a webcímet, a Facebook-oldalt és a koordináta-javaslatot is a `frubeauty.com`-ról szedte. **A mai on-site munka (bővített JSON-LD + `llms.txt`) itt térült meg közvetlenül.** Minden további katalógusnál előbb a site-nak kell rendben lennie, csak utána van értelme regisztrálni.
2. **A Cylex Google-autocomplete-je hibás.** A cégnév-mezőben a „Google-adatok átvétele" opcióra kattintva a mező értéke szó szerint `[object Object]` lett (DOM-ból ellenőrizve), és a legördülő beragadt. Kerüld: a névmezőben az „**Új adatlap létrehozása ezzel a névvel**" opciót válaszd, a Google-importot pedig a **2. lépés külön gombjával** kérd — az hibátlanul működik.

**Nyitott, ellenőrizendő:** a belépéskor a Cylex jelezte, hogy a manuális kérelmek feldolgozása **2–3 hét**. Ezért a Firmania/Nyitva.hu átfutást **~2026-09-18 körül** nézd meg, ne korábban:

- [ ] Megjelent-e a listázás a `cylex.hu`-n?
- [ ] Átfutott-e a **Firmania.hu**-ra? (ha igen: **dofollow link**)
- [ ] Átfutott-e a **Nyitva.hu**-ra? (ha igen: **dofollow link**)
- [ ] Ha 6 hét után sincs átfutás → külön jelentkezés mindkettőre

### ⛔ Aranyoldalak — 2026-08-07: szerveroldali hiba, elhalasztva

A regisztráció beküldéskor hibára fut. Megnéztem: **a `/regisztracio` lap maga ép** (Symfony-űrlap, captcha nélkül, nulla hibaüzenet a lapon), tehát a hiba az ő oldalukon, beküldéskor keletkezik — kliensoldalról nincs mit tenni.

**Nem ejtjük**, mert a dofollow-megállapítás újraellenőrizve áll: a `/kozmetika/budapest/` kategórialapon 15 webcím-link van, ebből **7 valódi saját domainre** mutat (bognardori.hu, budaisoszoba.hu, sbgk.hu…), tehát nem csak a fizetős `uzleti.hu` mikrosite-ok kapnak linket.

**Terv:** 3–4 nap múlva újra. Ha akkor is hibázik, kerülő út az üzemeltető: **MTT Media Kft.** (`mtt.hu/kapcsolat`) — cégadatot ők is fel tudnak vinni.

### ⚠️ Amit MOST nem szabad: Firmania / Nyitva.hu külön regisztráció

Kézenfekvőnek tűnik, hogy ha az Aranyoldalak áll, akkor menjünk rá közvetlenül a Firmaniára és a Nyitva.hu-ra — hiszen ott van a két dofollow. **Ne.** Mindkettő a Cylex adatbázisából él, és a 08-07-i Cylex-beküldés feldolgozása még fut (2–3 hét). Ha most külön is bejelentkezünk, és közben a Cylex is átfut, **duplikált listázás** lesz belőle — az pedig aktívan ront a NAP-konzisztencián, ami az egész citációs program lényege. Előbb a ~09-18-i ellenőrzés, utána döntünk.

### Ehelyett: a két e-mailes Sáv B célpont (se regisztráció, se captcha, se szerver)

Mindkettő **2026-08-07-én újraellenőrizve**:

- **B1 Janssen `/kozmetikus-kereso/`** — a lap továbbra is **teljesen üres** (a tartalom-konténer 0 karakter, a „kozmetikus/szalon/partner" szó elő sem fordul benne). A 07-26-i tárgyalási alap tehát változatlanul érvényes.
- **B4c Ceremóniamester Szövetség** — a doksi 72 kimenő linket írt; ma **155 külső link van rajta, és továbbra is NULLA nofollow** (mintavétel: `topart-hotel.hu`, `lantaibirtok.hu` → `rel="noopener"`). A „Beauty" kategória létezik és vékony.

**Mérés (GSC → Links, illetve Ahrefs):**

| Mutató | Most (2026-08-07) | Cél 30 napra |
|---|---|---|
| Dofollow hivatkozó domain | **0** | **3+** |
| Hivatkozó domain összesen (GSC) | 1 | 6+ |
| „szemöldök laminálás" pozíció | 9,9 | <7 |
| Melyik URL rangsorol rá | money page ✅ | marad |

---

## 7. Amit a videóból tudatosan NEM veszek át

- **Tömeges, 40 katalógusos kitöltés.** A videó egy manchesteri fogorvosról beszél, 167 hivatkozó domainnel. Egy egyszemélyes zuglói szalonnál 40 vegyes minőségű katalógus-link mintázata rosszabb, mint 4 releváns. A fenti listán minden célpont vagy dofollow, vagy bizonyítottan rangsorol a te kulcsszavaidra.
- **hunter.io.** A videóban ez a guest-post outreach eszköze. Nálunk a 4. pillér már lefutott, és a magyar célpontoknál (Janssen, Ceremóniamester Szövetség, esküvői fotósok) **nyilvános a kapcsolattartó e-mail** — nincs mit felderíteni.
- **Új közösségi profilok gyártása (TikTok, Pinterest, LinkedIn).** A videó maga mondja ki a problémát: a legtöbben létrehozzák, aztán nem posztolnak rájuk. Egy halott profil nem entitás-jel, hanem zaj. Ha viszont a TikTokra tényleg menne tartalom, az a beauty-szektorban ma önálló keresőfelület — de az tartalomstratégiai döntés, nem SEO-feladat.
