# FRUBEAUTY — Organikus Növekedési Mély-Audit
**Dátum: 2026-06-12 · Fókusz: Google-rangsorolás + marketing, hirdetés NÉLKÜL**
**Eszközök: squirrelscan (230+ szabály, 13 oldal, full coverage) · GSC-bázis (06-09) · élő site-ellenőrzés · versenytárs-kutatás · kód-audit**

---

## 0. Vezetői összefoglaló

A weboldal **technikailag a magyar lokális beauty-piac top 1%-a**: squirrel összpontszám **80/100 (B)**, Core SEO 99, Structured Data 100, Mobile 100, minden security header él, a Wix-301-ek és a sitemap rendben, a GEO-réteg (robots.txt AI-crawlerek + llms.txt) kint van. A korábbi auditok P0-i **mind éles­ben vannak** — nincs deploy-drift.

**A szűk keresztmetszet már nem a weboldal, hanem ami körülötte van:** az entitás (márka) három néven szét van esve a neten, a Google cégprofil nem a FRUBEAUTY nevet viseli, egy elavult listing régi telefonszámot terjeszt, és a tervezett tartalom-pipeline ~70%-a még nincs megírva. A GSC-ben a site átlagpozíciója 5 — a Google **bízik az oldalban**, de kevés lekérdezésre látszik, és a brand-kereslet gyakorlatilag nulla.

**A 3 legnagyobb kar (sorrendben):**
1. **Entitás-konszolidáció + Google cégprofil (local SEO)** — a lokális szolgáltatónál a Maps-pack a legnagyobb organikus csatorna, és itt van a legnagyobb elmaradás.
2. **`/rolam` szakértői oldal (E-E-A-T horgony)** — a squirrel E-E-A-T 73-as pontja és a V2 stratégia #1 nyitott tétele ugyanaz.
3. **Klaszter-tartalom legyártása** (ár-fókuszú commercial cikkek először) — a GSC már most 2–3. oldalas rangsort mutat ár-lekérdezésekre, tartalom nélkül is.

---

## 1. Pillanatkép — mérőszámok

| Metrika | Érték | Forrás | Státusz |
|---|---|---|---|
| GSC kattintás (3 hét) | 38 | GSC 06-09 | 🟡 kevés, de növekvő |
| GSC megjelenés | 1 400 | GSC 06-09 | 🟡 |
| Átlag CTR | 2,7% | GSC 06-09 | 🔴 cél: 4%+ (poz. 5-höz alacsony) |
| Átlagpozíció | 5,2 | GSC 06-09 | 🟢 erős alap |
| „kozmetikus zugló” | poz. 69 | GSC 06-09 | 🔴 prime kulcsszó, láthatatlan |
| squirrel összpontszám | **80/100 (B)** | squirrel 06-12 | 🟡 cél: 90+ |
| Mobil LCP (lab) | 3,4 s | Lighthouse 06-09 | 🔴 cél ≤ 2,5 s |
| CLS / TBT | 0,029 / 0 ms | Lighthouse 06-09 | 🟢 kiváló |
| Google-értékelés | 5,0 ★ (40 db) | GBP | 🟢 erős eszköz |
| Blog-cikkek | 5 él / ~14 tervezett | sitemap vs. V2 | 🔴 pipeline 64%-a hiányzik |

**Squirrel kategória-bontás:** Core SEO 99 · Structured Data 100 · Mobile 100 · Images 100 · Social 100 · URL 100 · Analytics 100 · i18n 100 · Crawlability 98 · Content 98 · Security 97 · Links 95 · A11y 95 (de 16 error!) · Performance 82 · **E-E-A-T 73** · **Legal 68**.

**Élesben verifikálva (06-12):** összes security header (HSTS preload, CSP, XFO…) ✓ · `/book-online` és `/service-page/*` 301 ✓ · sitemap-index 200, 13 URL ✓ · www→non-www ✓ · robots.txt AI-crawlerekkel ✓ · `/llms.txt` 200 ✓ · 4 szolgáltatás-kártya a kezdőlapon a `/szemoldok-laminalas-zuglo` linkkel ✓.

---

## 2. 🥇 LEGNAGYOBB KAR: Entitás-konszolidáció + Local SEO

### A lelet (ez az audit legfontosabb megállapítása)

A vállalkozás **négy különböző néven** létezik a neten:

| Platform | Név | Probléma |
|---|---|---|
| Weboldal | **FRUBEAUTY** | — (ez a márka) |
| Google cégprofil (Maps) | **„Pecze-Kovács Fruzsina Kozmetikus - Szempilla és Szemöldök Stylist”** | nem tartalmazza a FRUBEAUTY-t → a Google nem köti össze a site-tal névszinten |
| Facebook | „Pecze-Kovács Fruzsina Makeup & Beauty” | harmadik névvariáns |
| Notino foglalás | „Pecze-Kovács Fruzsina sminkes, szemöldök- és szempilla stylist” | negyedik variáns |
| Régi directory (beautynailhairsalons.com) | **„Natural Beauty Szépségszalon”, Egressy út 16., tel: +36 1 220 4677** | elavult név + RÉGI telefonszám = NAP-inkonzisztencia |

Ráadásul a „fru/fruzsina beauty” névtér zsúfolt: **Fruzsi Beauty** (XIII. ker.), **Fruzsinabeauty – Maczkó Fruzsina** (XVI. ker., másik személy!), **FruFru Szépségszalon**, **Fru Lash&Cosmetic** — márkanév-keresésre ezek is megjelennek, a frubeauty.com pedig a webes indexben saját nevére is alig látszik.

### Miért ez a legnagyobb kar?

Lokális szolgáltatásnál a kattintások többsége a **Maps-packból** jön, nem a kék linkekből. A „kozmetikus zugló” organikusan poz. 69 — de a Maps-packba nem a webes rangsor, hanem a **GBP-jelek** (név, kategória, vélemények, proximity, citáció-konzisztencia) alapján lehet bekerülni. A 40 db 5,0-ás értékelés kiváló alap — a profil maga van aluloptimalizálva.

### Teendők (mind ingyenes)

1. **GBP-név frissítése**: a Google szabálya szerint a *valós, használt üzleti név* mehet be. Ha a szalon táblán/kommunikációban FRUBEAUTY: → **„FRUBEAUTY – Pecze-Kovács Fruzsina Kozmetikus”**. (Kulcsszó-stuffing — pl. „…Szempilla Lifting Zugló” — NE, az felfüggesztést kockáztat.)
2. **GBP teljes kitöltés**: szolgáltatás-lista árakkal (szempilla lifting 12 000 Ft, szemöldök laminálás 11 000 Ft…), másodlagos kategóriák (Kozmetika, Szempilla-stúdió, Sminkes), nyitvatartás, attribútumok, **weboldal-link a megfelelő aloldalakra** (foglalás-link → Notino).
3. **Heti 1 GBP-poszt** (Google Updates): előtte-utána fotó + 1 mondat + link az aloldalra. A posztoló szalonok profilja aktívabbnak rangsorol, és ez tartalom-újrahasznosítás az Instáról.
4. **Fotó-feltöltés rendszeresen** a profilba (munkaközbeni, szalon-belső, portré) — a fotószám/frissesség rangsor-jel.
5. **Vélemény-gyarapítás rendszeresítése**: minden vendégnek QR-kód / utánkövető SMS a `googleReviewsUrl`-lel (már a site.ts-ben van). Cél: havi 4–6 új vélemény, **kulcsszavas szöveggel** (kérd meg: írja bele, milyen kezelést kapott — „szempilla lifting”, „Zugló” a vélemény-szövegben rangsor-jel a Maps-ben). Válaszolj MINDEN véleményre (a válaszoló profil jel).
6. **„Natural Beauty Szépségszalon” takarítás**: ellenőrizd a Google Maps-en, nincs-e DUPLIKÁLT régi cégprofil ezen a néven ugyanazon a címen (ha van: igényeld + jelöld bezártnak/egyesítsd). A beautynailhairsalons.com listinghez kérj adatfrissítést vagy törlést (van rajta contact/claim opció).
7. **Citáció-kiépítés egységes NAP-pal** (név: FRUBEAUTY – Pecze-Kovács Fruzsina; cím: 1143 Budapest, Egressy út 16.; tel: +36 70 215 9954 — MINDENHOL pontosan így):
   - Bing Places (ingyen, 5 perc — a ChatGPT-keresés is Bing-adatot használ!)
   - Apple Business Connect (iPhone-os Maps-felhasználók)
   - Cylex.hu, Aranyoldalak, Firmania, helyi kamarai listák
   - **Salonic.hu / Fresha marketplace-profil** — ezek az oldalak maguk is rangsorolnak „szemöldök laminálás budapest” típusú kifejezésekre → a listing = ingyenes második SERP-jelenlét
8. **Facebook-oldal átnevezés** FRUBEAUTY-ra (vagy „FRUBEAUTY by Pecze-Kovács Fruzsina”), vanity URL kérése a `profile.php?id=…` helyett.

---

## 3. 🥈 E-E-A-T: a hiányzó `/rolam` oldal

A squirrel E-E-A-T pontja 73 — a három warning közül kettő (`privacy`, `contact`) részben false positive (az `/adatvedelem` létezik, csak a tool angol kulcsszót keres; kontakt-szekció a kezdőlapon van). **Az About-hiány viszont valós**, és a V2 stratégia #1 nyitott tétele is ez.

**Teendő — `/rolam` oldal (a Person-entitás horgonya):**
- Első személyű szakmai bemutatkozás: képzettség, évek, koreai lash lift certifikáció (intézmény + év), Janssen-partnerség
- „Miért csak egy vendég egyszerre” — filozófia (Experience-jel)
- Valódi munkaközbeni fotó (van a médiatárban)
- A Layout `@graph` `Person` node-ja kapjon `url: 'https://frubeauty.com/rolam'` + `mainEntityOfPage` hivatkozást
- Blog byline-ok (`blog/[...slug].astro`) `rel="author"` linkje → `/rolam` (most `/#kapcsolat`)
- Footer-be „Rólam” link (a squirrel és a Google is sitewide linkből találja meg)

Becsült munka: fél nap. Hatás: E-E-A-T pont + entitás-megerősítés a Google ÉS az AI-keresők felé (a GEO-stratégia is erre épül).

---

## 4. 🥉 Tartalmi rés: a klaszter-pipeline állapota

**Él (5):** eskuvoi-smink-arak-budapest · eskuvoi-smink-felkesziules · janssen-arckezeles-bortipusok · szempilla-lifting-utoapolas · szempilla-lifting-vagy-festes

**Hiányzik a V2 tervből (9), javasolt sorrendben:**

| # | Cikk | Intent | Miért ez a sorrend |
|---|---|---|---|
| 1 | `/blog/szempilla-lifting-arak-2026` | Commercial | a GSC már rangsorol ár-lekérdezésekre; legrövidebb út a kattintásig |
| 2 | `/blog/szemoldok-laminalas-arak-2026` | Commercial | az új pillér támogatása; rivális ár-tartalom NULLA (Pilla Negra árat sem közöl) |
| 3 | `/blog/szempilla-lifting-vagy-muszempilla` | Commercial inv. | nagy keresésű döntési lekérdezés; vigyázat: a lifting felé terel, nem építést ad el |
| 4 | `/blog/szemoldok-laminalas-vs-microblading` | Commercial inv. | a pillér-oldali összehasonlító tábla kibontása |
| 5 | `/blog/szemoldok-laminalas-meddig-tart` | Informational | PAA-kérdés, FAQ-ból bővíthető |
| 6 | `/blog/arckezeles-arak-2026` | Commercial | 3. pillér ár-cikke |
| 7 | `/blog/koreai-szempilla-lifting` | Informational | differenciátor-kulcsszó, alacsony verseny |
| 8 | `/blog/szemoldok-laminalas-mit-jelent` | Informational | klaszter-teljesség |
| 9 | `/blog/hidratalo-vagy-antiaging-arckezeles` | Informational | klaszter-teljesség |

Minden cikkre érvényes V2-szabályok: atomic lead (45–60 szó a H1 alatt), konkrét számok (Ft, perc, hét), tábla/lista, felfelé link a pillérre kulcsszavas anchorral, `dateModified` + látható „Frissítve” dátum.

**Ütem: heti 1 cikk → 9 hét alatt teljes pipeline.** Ár-cikkeknél évszám a title-ben („2026”) + évente frissítés.

---

## 5. Technikai SEO — javítandók fájl-szinten

### P1 — kattintást/rangsort érintő

| Issue | Hely | Fix |
|---|---|---|
| **Belső linkek 301-re futnak** (12 link: `/blog`, `/arckezeles-zuglo` stb. → Netlify hozzáteszi a `/`-t) | site-wide, minden `href` | minden belső `href` kapjon záró `/`-t (`/szempilla-lifting-zuglo/`), VAGY Astro `trailingSlash: 'always'` + `format: 'directory'` ellenőrzés. A 301 link-equity-t szivárogtat és +1 RTT |
| **Kezdőlap title 64 karakter** — mobilon csonkul | `index.astro` | pl. „Kozmetika Zugló – Szempilla Lifting ★5,0 \| FRUBEAUTY” (53 kar.) — az „Arckezelés” kiesik, de az csonkán sem látszott |
| **Mobil LCP 3,4 s** (cél ≤ 2,5 s; PSI mobil 95+ a projekt-cél) | hero média | a hero poster-AVIF `<link rel="preload" as="image" fetchpriority="high">`; aloldalakon a squirrel 12 poster/LCP-képet listáz preload nélkül |
| **Above-fold képek lazy loadinggal** (10 kép, pl. `service-arckezeles.webp`, blog-card képek) | `index.astro`, aloldalak | első viewport-nyi képeknél `loading="eager"` + `fetchpriority="high"`, a többi maradhat lazy |

### P2 — minőség/megfelelőség

| Issue | Hely | Fix |
|---|---|---|
| A11y: gomb accessible name nélkül (3 szabály ugyanarra a gombra) | `/arckezeles-zuglo` submit-gomb | `aria-label` vagy látható szöveg |
| A11y: **10 fókuszálható link `aria-hidden` alatt** (site-wide!) | valszeg mobil-menü/overlay zárt állapotban | a rejtett konténerre `inert` attribútum vagy linkekre `tabindex="-1"` |
| Font fallback `font-display` warning (Fraunces/Geist Fallback) | `Layout.astro` font-face-ek | ellenőrizd: a *fallback* @font-face-eknek is legyen `font-display: swap` — de NE bontsd meg a metrika-illesztett fallback-rendszert (lásd perf-memó!) |
| Inline script minify (3,6 KB, ~2,5 KB megtakarítás) | Layout inline analytics/consent script | kommentek kiszedése buildkor — alacsony prioritás |
| Total byte weight 5,6 MB | videók | a videók lazy-loadoltak posterrel — elfogadható; több videót NE tegyél egy oldalra |
| CSP `unsafe-inline` | `netlify.toml` | nonce-alapú CSP-re váltás nagy munka, alacsony SEO-hatás — backlog |
| Keyword-stuffing warningok („szem” 5%, „lamin” 3,1%…) | — | **false positive** — magyar szótövek; nincs teendő |
| E-E-A-T „no privacy/contact” | — | részben false positive (magyar elnevezés); a `/rolam` megoldja az About-ot, a footerben legyen „Kapcsolat” anchor-link |

---

## 6. CTR-optimalizáció (a GSC-rések)

A pozíció-5 + 2,7% CTR kombináció a fő rövid távú lehetőség — poz. 5-ön 5–7% az iparági norma, tehát **a mostani megjelenésekből ~2× kattintás kihozható** új rangsor nélkül:

1. **Title-ök**: a ★5,0 jó pattern — de a kezdőlapé túl hosszú (fent). Minden title-be: kulcsszó elöl + ár vagy ★ + márka.
2. **Meta descriptionök**: CTA + konkrét ár + „Zugló/Egressy út” minden money-page-en (140–155 kar.). A WebFetch a kezdőlapon nem talált description-t a kivonatban — ellenőrizd, hogy minden oldalnak egyedi, ár-tartalmú descriptionje legyen.
3. **„kozmetikus zugló” (poz. 69)**: a kezdőlap title már „Kozmetika Zugló”-val indul — jó. A továblépés: a kezdőlapra egy rövid „Kozmetikus Zuglóban” H2-blokk (a szó *kozmetikus* alakban is szerepeljen), + a `/rolam` oldal title-je: „Pecze-Kovács Fruzsina – Kozmetikus Zuglóban | FRUBEAUTY”. Ez a kulcsszó hosszú táv — a GBP-kategória („Kozmetikus”) a Maps-oldalról gyorsabban hoz rá találatot.
4. **Esküvői smink ár-lekérdezések 2–3. oldalon**: a meglévő blogcikk title-jébe évszám + Ft-összeg, belső link rá a `/sminkes-zuglo` pillérről kulcsszavas anchorral (most mélyen van).

---

## 7. Versenytárs-brief (Zugló + kategória)

| Dimenzió | **FRUBEAUTY** | Pilla Negra | Beauty Studio Zugló by Alexa | Gréta Kozmetikus |
|---|---|---|---|---|
| Dedikált lokális landing/szolgáltatás | ✅ 4 db | ✅ (lash-fókusz) | ❌ (egy oldal) | részben |
| Árak publikusan | ✅ csomagárakkal | ❌ külön árlista, landingen nincs | ❌ | ✅ |
| Schema/strukturált adat | ✅ teljes @graph (100/100) | ❌ | ? | ? |
| Vélemények a landingen | ✅ beágyazva | ❌ | ✅ | ? |
| Blog/content | ✅ 5 cikk (cél: 14) | ❌ | ❌ | ✅ (lifting-cikk rangsorol!) |
| GBP-jelenlét | 🟡 5,0★/40, de név-káosz | ? | ✅ | ✅ |
| CTA-k | ✅ 8+/oldal | 🔴 gyenge | ✅ | ✅ |

**Konklúzió:** on-page-ben a FRUBEAUTY **már most veri az összes zuglói riválist** — a lemaradás kizárólag off-page (entitás, citációk, linkek, GBP). A pillanegra.hu strukturális előnye (külön URL-ek) a `/szemoldok-laminalas-zuglo` elkészültével megszűnt. **Egyik rivális sem közöl árat a landingjén és nem ír blogot** → az ár-transzparencia + ár-cikkek a legvédhetőbb pozicionálási rés.

**Pozicionálási üzenet, amit senki nem birtokol Zuglóban:** *„Egy vendég egyszerre, a tulajdonos-kozmetikus kezei között, transzparens árakkal — koreai technika.”* Ezt vidd a GBP-leírásba, a hero-microcopy-ba és minden directory-profilba szó szerint ugyanúgy (entitás-mondat, az AI-keresők is ezt idézik majd).

---

## 8. GEO / AI-keresés állapot

| Elem | Státusz |
|---|---|
| robots.txt AI-crawlerek (GPTBot, PerplexityBot, ClaudeBot, Google-Extended, OAI-SearchBot) | ✅ él |
| `/llms.txt` | ✅ él (200) |
| Atomic lead-ek a pillér-oldalakon | ✅ (szemöldök-oldalon verifikálva) |
| Entitás-mondat a heroban | ellenőrizd/egységesítsd a 4 money-page-en |
| `speakable` schema a FAQ-válaszokra | ❌ nyitott (V2-terv) |
| `dateModified` + látható „Frissítve” | ❌ nyitott a money-page-eken |
| **Bing Places** (ChatGPT-keresés forrása!) | ❌ nyitott — 5 perc, magas GEO-hatás |
| Wikipedia/Wikidata-szintű entitás | nem reális — a citáció-háló pótolja |

---

## 9. Off-page / linképítés hirdetés nélkül (HU-realista)

1. **Citációk** (4. szakasz listája) — ez a baseline, link + NAP egyben.
2. **Notino szalon-profil** maximális kitöltése — erős domain, a profil maga rangsorol.
3. **Helyi sajtó/közösség**: zuglói online magazinok, XIV. kerületi Facebook-csoportok (nem spam — szakértői válaszok), kerületi újság beauty-rovata. Egy „zuglói kisvállalkozó-portré” cikk = a legértékesebb megszerezhető helyi link.
4. **Szakmai linkek**: Janssen Cosmetics magyar forgalmazójának partner-/szalonkereső oldala (ha van — partner-státusz említve), koreai lash lift képzés alumni/szalonkereső listája.
5. **HARO-stílusú PR helyett**: magyar újságírók beauty-témájú cikkeihez szakértői kommentár felajánlása (femina, nlc, glamour beauty-rovat) — egy idézet + link a `/rolam`-ra az E-E-A-T-t és az entitást is erősíti.
6. **Esküvői vertikum**: az esküvői smink-cikkek már rangsorolnak → esküvői szolgáltató-katalógusok (eskuvo.hu típus, esküvői blogok beszállító-listái) természetes linkforrás.

---

## 10. Prioritás-mátrix és ütemterv

|  | **Kis munka** | **Nagy munka** |
|---|---|---|
| **Nagy hatás** | GBP-optimalizálás + név · Bing Places + Apple Maps · vélemény-QR rendszeresítés · kezdőlap-title vágás · trailing-slash linkek · LCP poster preload | `/rolam` oldal · 9 klaszter-cikk (heti 1) · citáció-háló (10+ lista) · helyi PR-link |
| **Kis hatás** | a11y gomb-fixek · inline script minify · meta description polír | CSP nonce · Astro 6 migráció (security backlog) |

### 30 nap (alapozás)
- [ ] GBP: név, szolgáltatások+árak, kategóriák, heti poszt elindítása, vélemény-QR a szalonba
- [ ] Bing Places + Apple Business Connect + Salonic/Fresha + 5 HU-citáció
- [ ] „Natural Beauty” duplikátum/elavult listing takarítás
- [ ] `/rolam` oldal + Person-schema bekötés + byline-csere
- [ ] Technikai P1-csomag: trailing slash, title-vágás, LCP preload, eager above-fold, a11y errorok
- [ ] 4 ár-cikk (1/hét): szempilla-árak, szemöldök-árak, lifting-vs-műszempilla, laminálás-vs-microblading

### 60 nap (tartalom + jelek)
- [ ] Maradék 5 klaszter-cikk
- [ ] `speakable` + `dateModified` a money-page-eken
- [ ] Facebook-átnevezés, minden profil entitás-mondattal egységesítve
- [ ] Helyi PR: 1 zuglói megjelenés/link megszerzése

### 90 nap (mérés + iteráció)
- [ ] GSC-felülvizsgálat: CTR-teszt eredménye, „kozmetikus zugló” pozíció, Maps-megjelenések (GBP Insights)
- [ ] Vélemény-szám: +12–18 új (kulcsszavas)
- [ ] squirrel re-audit (cél: 90+) + PSI mobil re-mérés (cél: 95+, LCP ≤ 2,5 s)

### KPI-célok (szept. közepe, hirdetés nélkül)
| KPI | Most | Cél |
|---|---|---|
| GSC kattintás/hó | ~50 | **150+** |
| CTR | 2,7% | **4,5%+** |
| „kozmetikus zugló” | 69 | **top 20** (organikus) + Maps-pack megjelenés |
| GBP-útvonaltervezés+hívás/hó | ? (mérd!) | +50% |
| Google-vélemény | 40 | **55+** |
| Élő blog-cikk | 5 | **14** |

---

*Megjegyzés a methodológiához: a webes keresési minták US-indexből származnak — a magyar SERP ettől eltérhet, de az entitás-fragmentáció és a directory-leletek index-függetlenek. A GSC-számok a 06-09-i auditból; a PSI API anonim kvótája betelt, a CWV-adat a 06-09-i mentett Lighthouse-futásból való.*
