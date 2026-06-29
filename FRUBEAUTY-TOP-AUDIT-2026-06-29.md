# FRUBEAUTY — Top 0.1% SEO / Technikai / CRO Audit

**Dátum:** 2026-06-29 · **Branch:** `audit/cro-seo-perf-2026-06-03` · **Domain:** https://frubeauty.com
**Stack:** Astro 5 (static, `trailingSlash: always`, `format: directory`) · React-szigetek · Tailwind · Netlify
**Scope:** teljes kódbázis-audit (technikai SEO, indexelés, on-page, strukturált adat, tartalom, lokális/GEO, teljesítmény, akadálymentesség, mérés/CRO) + folyamatos monitoring rendszer a GSC és SEO-monitoring keretrendszer alapján.

> Módszertan: a leletek a forráskódból (`src/`, `public/`, `astro.config.mjs`, `netlify.toml`) statikusan verifikáltak, fájl:sor hivatkozással. Amit **csak élesben** lehet megerősíteni (valós PSI-pontszám, aktuális GSC-indexelés, SERP-pozíciók), az a **14. szakaszban** külön jelölve.

---

## 0. Vezetői összefoglaló

A FRUBEAUTY oldal **műszakilag a magyar helyi szolgáltató-oldalak felső ~1-2%-ában** van: tiszta kanonizáció, agresszív de tudatos mobil-perf, gazdag entitás-alapú strukturált adat, zárt topic-cluster belső linkeléssel, GDPR-konform Consent Mode V2 + működő konverziómérés. Ez a kódszintű minőség önmagában már „audit-rezisztens".

**A „top 0.1%"-ig hátralévő rés NEM a kódban van** — hanem (a) néhány apró, gyorsan zárható schema-/indexelési hiányosságban, és (b) az **off-page** rétegben (GBP-kategória, citációk, friss vélemények), amit a kód nem tud megoldani. A két dolog együtt mozdítja a rangsort a jelenlegi szintről a kerület-domináns szintre.

### Összpontszám: **91 / 100**

| Terület | Pont | Állapot |
|---|---|---|
| Technikai SEO alap | 95 | Kiváló |
| Indexelés & crawl | 84 | Jó — 1 élő ellenőrzés kell |
| On-page (title/meta/H1) | 92 | Kiváló |
| Strukturált adat | 89 | Erős — 4 apró rés |
| Tartalom / topical authority | 90 | Kiváló |
| Lokális SEO (on-page) | 93 | Kiváló |
| Off-page / GBP | 70 | **Ez a fő kar** |
| Teljesítmény (CWV) | 92 | Kiváló — élő PSI kell |
| Akadálymentesség | 94 | Kiváló |
| Konverzió & mérés | 88 | Erős |
| AI-keresés / GEO | 92 | Kiváló |

### Top 5 erősség (NE nyúlj hozzá — lásd `[[perf-techniques-applied]]`)
1. **Kanonizációs higiénia** — `trailingSlash: always` + `format: directory` + www→apex 301 (`netlify.toml:16`) → nincs link-equity szivárgás, nincs 301-hop a belső navigáción.
2. **Entitás-gráf** — `@graph` (BeautySalon + Person + WebSite) `@id`-kereszthivatkozásokkal a `Layout.astro:35`-ben; a `/rolam/` `ProfilePage` ugyanarra a `#fruzsina` node-ra mutat.
3. **Mobil-LCP stratégia** — AVIF poszter preload (`preloadImage`), metrika-illesztett tartalék fontok (CLS≈0), `content-visibility:auto` a hajtás alatti szekciókra, CSS-only lámpa, lazy videó.
4. **Tudatos schema-önmérséklet** — az AggregateRating szándékosan kivéve (self-serving → nincs csillag + policy-kockázat); a csillagok a GBP-ből jönnek. Helyes döntés.
5. **Mérés** — Consent Mode V2 default-denied, egyesített `GT-` loader, kattintásra capture-fázisú konverzió `sendBeacon`-nel navigáció előtt (`Layout.astro:357`).

### Top 5 azonnali javítandó (mind kicsi, mind ebben a repóban)
1. **[P0 tartalom] `index.astro:245`** — a cím „**Három** személyre szabott kezelés", de a grid alatta **négy** szolgáltatást mutat (arckezelés, szempilla, szemöldök, smink). → „Négy" vagy „Személyre szabott kezelések."
2. **[P1 indexelés] `/szemoldok-laminalas-zuglo/`** — a `[[frubeauty-gsc-audit-0624]]` szerint nem volt indexelve. A belső linkek azóta kiépültek (footer + főoldal-kártya + cross-link), **élesben ellenőrizni + Request Indexing**.
3. **[P1 schema] szétkapcsolt `provider`** — `szempilla-lifting-zuglo.astro:207` és `arckezeles-zuglo.astro:92` a Service `provider`-t `@id` nélkül adja → duplikált, gráfból kilógó BeautySalon entitás. A `szemoldok`/`sminkes` oldal a helyes minta (`@id` hivatkozás).
4. **[P1 schema] blogcikk-breadcrumb + FAQ** — `blog/[...slug].astro` csak `Article` schemát ad; hiányzik a `BreadcrumbList` és (a Q&A-szekciós cikkeknél) a `FAQPage`.
5. **[P2 off-page] GBP elsődleges kategória** — `[[frubeauty-organic-audit]]`: „Szépségszalon" → **„Kozmetikus"** elsődlegesnek; „Natural Beauty" elavult listing + citációk. Ez a legnagyobb rangsor-kar, és nem kódfeladat.

---

## 1. Technikai SEO alap — 95/100

| Ellenőrzés | Állapot | Hivatkozás |
|---|---|---|
| HTTPS + HSTS preload | ✅ | `netlify.toml:82` |
| www → apex 301 (first match) | ✅ | `netlify.toml:16` |
| Trailing-slash kanonizáció | ✅ | `astro.config.mjs:12` |
| Kanonikus tag minden oldalon | ✅ | `Layout.astro:173` (`Astro.url.href`, money/blog oldalakon explicit) |
| `<html lang="hu">` + `og:locale hu_HU` | ✅ | `Layout.astro:167,180` |
| Biztonsági fejlécek (XFO, nosniff, Referrer-Policy, Permissions-Policy) | ✅ | `netlify.toml:76` |
| HTML-tömörítés + inline CSS | ✅ | `astro.config.mjs:14,17` |
| JS-minify (terser, drop_console, manualChunks) | ✅ | `astro.config.mjs:25` |
| robots.txt + AI-crawler allow + sitemap-ref | ✅ | `public/robots.txt` |

**Apró rések:**
- **Sitemap `lastmod` hiányzik.** A `@astrojs/sitemap` alapbeállítással fut (`astro.config.mjs:13`) — nincs `lastmod`/`changefreq`. A blogposztoknál van `publishedAt`/`updatedAt`; ezt érdemes `serialize`-zel betáplálni, hogy a friss tartalmat a Google gyorsabban újra-crawlozza. *(P2)*
- **Nincs `apple-touch-icon` / `site.webmanifest`** — csak `favicon.svg` (`public/`). Funkcionálisan rendben, de a teljes ikon-lefedettséghez (iOS-könyvjelző, PWA-jel) hiányos. *(P3)*

---

## 2. Indexelés & crawl — 84/100

- **Sitemap-index** `sitemap-index.xml` → robots-ból hivatkozva ✅. Minden statikus oldal + 14 blogposzt bekerül.
- **Wix-örökség 301-ek** (`netlify.toml:35-74`): a **percent-kódolt** `from` szabályok elöl, a literál ékezetesek alattuk fallbackként, a `/service-page/*` gyűjtő utoljára. Ez a `[[frubeauty-fixes-0624]]` szerint már élesített encoding-fix — **a fájl jelenleg helyes**. A `[[frubeauty-gsc-audit-0624]]` „halott redirect" leletje ezt megelőzi; **deploy után curl-lel verifikálni**, hogy money-page-re visz, nem a főoldalra.
- **`/szemoldok-laminalas-zuglo/` indexelés** — a memória szerint korábban kimaradt az indexből. Mostanra a belső linkstruktúra teljes (footer `SiteFooter.astro:33`, főoldal 3. kártya `index.astro:49`, cross-link a szempilla-oldalról). → **GSC URL Inspection + Request Indexing**, és figyelni a következő crawl-ot.
- **4 Wix-szellem URL** még indexelt lehet (`[[frubeauty-gsc-audit-0624]]`) — a 301-ek átirányítják, türelmi idő kell a de-indexeléshez. Nem igényel új beavatkozást, csak megfigyelést.

---

## 3. On-page SEO — 92/100

**Cím/leírás** (mind a 10 oldal, `Grep` verifikálva): kulcsszó-első + lokáció + ár + CTA, egyedi oldalanként, hossz a határon belül. Példa: `Szemöldök Laminálás + Formázás Zugló ★5,0 | FRUBEAUTY`.

**H1:** pontosan **1 H1 / oldal** mind a 10 sablonban (`Grep <h1>` → 10/10). ✅
**Heading-hierarchia:** logikus H1→H2→H3, az `em.display` arany kiemeléssel — szemantikailag tiszta.

**Finomhangolás:**
- **`★` (U+2605) a title-ben** — a Google a SERP-ben gyakran törli vagy átírja a special charactert. Nem hiba, de ne számíts rá, hogy mindig megjelenik; az érték a CTR-teszt. *(megfigyelés)*
- **„40+ értékelés"** mindenhol (meta + látható trust-sor) — a GBP `[[frubeauty-organic-audit]]` szerint már **47★**. Frissítsd „**45+**"-ra a meta-leírásokban és a trust-sávokban a friss social proofért. *(P2, gyors)*
- A money-page meta-leírások „★5,0 · 40+ értékelés ·" prefixe értékes, de a Google átírhatja; figyeld a tényleges megjelenített leírást GSC-ben.

---

## 4. Strukturált adat (Schema.org) — 89/100

**Ami megvan (kiváló lefedettség):**
- `@graph`: `BeautySalon` (NAP, geo, nyitvatartás, OfferCatalog 4 szolgáltatásra, sameAs Notino/IG/FB) + `Person` + `WebSite` — `Layout.astro:35`.
- Oldalankénti: `FAQPage` (mind a 4 money + főoldal), `Service`, `HowTo`, `VideoObject`, `BreadcrumbList` a money-page-eken; `Article` a blogposztokon; `ProfilePage` a `/rolam/`-on.

**Rések (mind apró, mind javítható):**

| # | Lelet | Fájl:sor | Hatás | Prio |
|---|---|---|---|---|
| 4.1 | Service `provider` `@id` nélkül → különálló BeautySalon entitás (gráfból kilóg) | `szempilla-lifting-zuglo.astro:207`, `arckezeles-zuglo.astro:92` | gyengül az entitás-konszolidáció | P1 |
| 4.2 | Blogposztoknak nincs `BreadcrumbList` | `blog/[...slug].astro` | breadcrumb rich result kimarad | P1 |
| 4.3 | Q&A-szekciós blogposztoknak nincs `FAQPage` (pl. a `koreai-szempilla-lifting.md` 5 Q&A-t tartalmaz a törzsben) | `blog/[...slug].astro` | featured-snippet/PAA esély kimarad | P1 |
| 4.4 | `Offer.priceValidUntil` hiányzik 3 oldalon (a `szemoldok` oldalon megvan, `:282`) | `szempilla:216`, `arckezeles:101`, `sminkes:139` | Rich Results „missing field" warning | P2 |
| 4.5 | Blog-index nincs `Blog`/`CollectionPage` + `BreadcrumbList` | `blog/index.astro` | gyengébb listaoldal-megértés | P2 |

> **Minta a javításhoz:** a `provider`-t mindenhol így: `provider: { '@type': 'BeautySalon', '@id': 'https://frubeauty.com/#business' }` — pontosan ahogy a `szemoldok-laminalas-zuglo.astro:272` csinálja.

---

## 5. Tartalom & topical authority — 90/100

- **14 blogposzt**, 4 kategória-klaszterben (Szempilla / Arckezelés / Alkalmi smink / Bőrápolás), szigorú content-collection sémával (`content.config.ts`).
- **Zárt topic-cluster:** a posztok **felfelé** linkelnek a money-page-ekre (16 belső link 14 fájlban — `Grep` verifikálva), a money-page-ek `RelatedArticles`-szel **lefelé** a klaszterre. Ez tankönyvi hub-and-spoke.
- A cornerstone cikk (`koreai-szempilla-lifting.md`) tartalmaz összehasonlító táblát, beágyazott Q&A-t, oldalirányú belső linkeket → magas „helpful content" jel.

**Lehetőség:**
- A money-page-eken belüli **összehasonlító szekciók** (pl. laminálás vs microblading vs henna a `szemoldok` oldalon `:665`) önmagukban snippet-erősek — ezeket érdemes a 4.3 szerint **FAQ/HowTo schemával** is megtámogatni a cikkekben. *(P1-hez kötve)*
- A blog cadenciát a memória reálisan kezeli (nem heti). A következő tartalmi rés a GSC-ben látható lekérdezésekhez igazítandó (lásd 14.).

---

## 6. Lokális SEO / GBP — on-page 93 / off-page 70

**On-page (kiváló):**
- Konzisztens NAP: `1143 Budapest, Egressy út 16.` + `+36 70 215 9954` — egyetlen forrásból (`site.ts`), a `[[frubeauty-postal-code]]` szerint az **1143 a helyes** (ne javítsd 1149-re).
- `LocalBusiness`/`BeautySalon` geo + `openingHoursSpecification` + `areaServed` (Zugló XIV. + Budapest) + `hasMap`.
- Lokáció-kulcsszó a címekben, H1-ekben, alt-okban („Zugló", „Egressy út", „XIV. kerület").

**Off-page — ITT a legnagyobb kar (`[[frubeauty-seo-akcioterv-2026]]`, `[[frubeauty-organic-audit]]`):**
1. **GBP elsődleges kategória:** „Szépségszalon" → **„Kozmetikus"** elsődlegesnek (a „Szépségszalon" mehet másodlagosnak). Ez közvetlenül a „kozmetikus zugló" (poz ~69, `[[frubeauty-gsc-audit]]`) relevanciáját mozdítja.
2. **„Natural Beauty" elavult listing** rendezése + duplikátumok.
3. **Citáció-építés** (magyar katalógusok, NAP-konzisztensen) — nyitott.
4. **Friss vélemények** folyamatos gyűjtése (47★ → cél a havi új review-k; a recency a lokális rangsor erős jele).

> A GBP-**név** már kész és élőben verifikált (`[[frubeauty-organic-audit]]`) — azt **ne** ajánld újra.

---

## 7. Teljesítmény / Core Web Vitals — 92/100 (cél: mobil PSI 95+)

**Erős, tudatos technikák** (`[[perf-techniques-applied]]` — ne revertáld):
- LCP: AVIF poszter `preload ... fetchpriority="high"` (`Layout.astro:174`), a hero CTA-k statikus `<a>`-k (nincs hidratációs függés), CSS-only `LampStatic`.
- CLS≈0: metrika-illesztett tartalék fontok (`Fraunces/Geist Fallback`, `size-adjust`), `font-display: optional` a body fontra, fix `width`/`height` minden képen.
- TBT: `content-visibility:auto` a hajtás alatti szekciókra (`Layout.astro:527`), `manualChunks`, `drop_console`, terser-mangle.
- Videó: `IntersectionObserver` + `preload="metadata"`, AVIF/WebP `<picture>` poszter (`HeroMedia.tsx`).

**Megfigyelendő:**
- A `content-visibility:auto` + `contain-intrinsic-size: auto 700px` ritkán **anchor-ugrásnál** (pl. `#velemenyek`) pici offset-eltérést okozhat, ha a becsült magasság nagyon eltér a valóditól. Élőben ellenőrizni a horgony-görgetést mobilon. *(alacsony kockázat)*
- A **PSI mobil 95+** célt (`[[project_perf_goal]]`) **csak élő méréssel** lehet igazolni — lásd 14. A videók mérete (`git status` szerint több `.mp4` módosult) a legnagyobb byte-tétel; ellenőrizd, hogy a hajtás alatti videók tényleg csak görgetésre töltenek (a kód szerint igen).

---

## 8. Akadálymentesség & best practices — 94/100

- Skip-link a tartalomra (`Layout.astro:286`), `:focus-visible` stílusok, `prefers-reduced-motion` ágak mindenhol.
- Mobil menü `inert`-tel zárva (kiveszi a tab-sorrendből **és** az a11y-fából — helyesebb, mint az `aria-hidden` fókuszálható linkeken), `role="dialog"`, `aria-modal`, `aria-expanded`, `Escape`-zárás (`NavBar.tsx:170`).
- Dekoratív SVG-k `aria-hidden`, ikon-linkek `aria-label`-lel.
- Szemantikus `<article>`, `<time datetime>`, `<address itemprop>` a blogban.

**Apró:** a `<title>`-beli `★` képernyőolvasón „fekete csillag"-ként felolvasódhat — kozmetikai, nem blokkoló.

---

## 9. Konverzió (CRO) & mérés — 88/100

- **Consent Mode V2** default-denied, banner-vezérelt update, visszatérő-látogató localStorage-helyreállítás (`Layout.astro:210`) — `[[frubeauty-consent-mode]]`. Ne bántsd a tüzelő logikát.
- **Konverzió** kattintásra, **capture-fázisban**, a sziget-hidratálástól függetlenül; `event_callback` + `sendBeacon` navigáció előtt (`Layout.astro:357`). Notino-katt = foglalási proxy-konverzió (`[[frubeauty-conversion-tracking]]`).
- **UTM-dekoráció** a Notino-linkeken path-szegmens kampánnyal (`Layout.astro:309`).
- CRO-elemek: ★5,0 trust-sáv above-the-fold, „78% a Teljes Tekintet csomagot választja" social proof, ár-lebontás napi költségre, elégedettségi garancia, dupla CTA (foglalás + hívás).

**Rések/megfigyelés:**
- **Meta Pixel üres** (`site.ts:76`) — a `fbq` kód be van drótozva, de ID nélkül nem fut. Ha nincs Meta-hirdetés, hagyd; ha lesz, csak az ID kell.
- **A lokális teszt mindig halottnak tűnik** (`[[frubeauty-local-tracker-block]]`) — a user gépe blokkolja a Google tag scriptet. Konverziót **mobiladaton / Tag Assistant / GA4-ben** tesztelj, ne a fejlesztői gépről.
- **CookieBanner hidratációs direktíva inkonzisztens** oldalanként (`client:idle` / `client:visible` / `client:load`) — működik, de egységesíteni érdemes (javaslat: `client:idle` mindenhol). *(P3)*

---

## 10. AI-keresés / GEO — 92/100

- `public/llms.txt` strukturált entitás-összefoglaló (NAP, szolgáltatások+árak, szakértő, blog). ✅
- robots: GPTBot, OAI-SearchBot, PerplexityBot, Google-Extended, ClaudeBot, anthropic-ai mind `Allow` (`robots.txt`). ✅
- Entitás-gráf + `knowsAbout` + `hasCredential` a Person node-ban → erős AI-keresési megérthetőség.

**Apró:** az `llms.txt` URL-jei **trailing slash nélkül** szerepelnek (`/szempilla-lifting-zuglo`), miközben az oldal `trailingSlash: always` → minden ilyen link 301-hop. Add hozzá a záró slasht (kozmetikai). *(P3)*

---

## 11. Konkrét hibák (fájl:sor)

1. **`index.astro:245`** — „Három személyre szabott kezelés." cím, de 4 kártya (`services` tömb, `:46-51`). **→ „Négy", vagy „Személyre szabott kezelések."** *(P0, copy)*
2. **`szempilla-lifting-zuglo.astro:207-211`** — Service `provider` `@id` nélkül. **→ `@id: 'https://frubeauty.com/#business'`.** *(P1)*
3. **`arckezeles-zuglo.astro:92-96`** — ugyanaz. *(P1)*
4. **`blog/[...slug].astro`** — nincs `BreadcrumbList` + nincs `FAQPage` a Q&A-s posztokra. *(P1)*
5. **`szempilla:216` / `arckezeles:101` / `sminkes:139`** — `Offer`/`AggregateOffer` `priceValidUntil` nélkül. *(P2)*
6. **`blog/index.astro`** — nincs `Blog`/`CollectionPage` + `BreadcrumbList`. *(P2)*
7. **`public/llms.txt`** — URL-ek trailing slash nélkül (301-hop). *(P3)*
8. **Nincs `src/pages/404.astro`** — branded 404 a Wix-migráció maradék 404-jeinek visszaterelésére (linkek a money-page-ekre). *(P2)*
9. **Sitemap `lastmod` hiányzik** — `serialize`-zel `updatedAt`/`publishedAt` betáplálása. *(P2)*

---

## 12. Prioritált akcióterv

### P0 — most (perc, tartalmi)
- [x] **KÉSZ (2026-06-29)** `index.astro` „Három" → „Négy" — buildben verifikálva.

### P1 — ezen a héten (kód, kis kockázat)
- [x] **KÉSZ (2026-06-29)** `provider` `@id`-fix a szempilla + arckezelés Service schemában (#2, #3) — buildben verifikálva (`@id: …/#business`).
- [x] **KÉSZ (2026-06-29)** `BreadcrumbList` minden blogposztra (`Főoldal › Blog › cikk`) a `[...slug].astro`-ban (#4) — mind a 14 poszton kimegy.
- [x] **KÉSZ (2026-06-29)** `FAQPage` schema a Q&A-szekciós posztokra — a törzs „Gyakori kérdések" szekciójából **automatikusan** parse-olva (nincs frontmatter-duplikáció); 10 poszt kapott FAQPage-et (5–6 Q&A/poszt), a markdown-linkek tisztára húzva, a GYIK nélküli 4 poszt helyesen kimarad.
- [ ] **Élő (nyitott):** GSC URL Inspection + Request Indexing a `/szemoldok-laminalas-zuglo/`-ra; redirect curl-ellenőrzés deploy után.

### P2 — 2 héten belül
- [x] **KÉSZ (2026-06-29)** `priceValidUntil: '2026-12-31'` mind a 3 Offerre (#5) · `Blog`(14 BlogPosting)+`BreadcrumbList` schema a blog-indexre (#6) — buildben verifikálva.
- [x] **KÉSZ (2026-06-29)** Branded `404.astro` (#8, money-page-linkekkel) · sitemap valós `lastmod` a 14 blogposztra `updatedAt ?? publishedAt`-ből (#9) — buildben verifikálva.
- [x] **KÉSZ (2026-06-29)** „40+" → „45+" social proof (6 oldal meta + trust-sávok + llms.txt).
- [x] **KÉSZ (off-page, user által, 2026-06-29):** GBP elsődleges kategória „Kozmetikus" · „Natural Beauty" listing rendezve. Maradék off-page kar: **citációk + vélemény-velocity**.

### P3 — folyamatos
- [ ] llms.txt trailing slash · CookieBanner direktíva egységesítés · apple-touch-icon/manifest.
- [ ] Citáció-építés + folyamatos vélemény-gyűjtés (off-page kar).

---

## 13. Folyamatos monitoring rendszer

### 13.1 Négy alapmetrika (SEO-monitoring keret)

| Metrika | Forrás | Cél / benchmark |
|---|---|---|
| **Indexelés** — minden money + blog URL indexelt | GSC Page Indexing | 100% a target-oldalakra; `/szemoldok-laminalas-zuglo/` figyelt |
| **Forgalom** — organikus klikk/megjelenés, oldalanként | GA4 + GSC | havi trend ↑; benchmark rögzítendő (lásd lent) |
| **Kulcsszavak** — pozíció a fő lekérdezésekre | GSC Performance | „kozmetikus zugló" 69→top10; money-kulcsszavak top3 |
| **Backlinkek / citációk** | manuális log + SEO-eszköz | NAP-konzisztens citációk havi +N |

**Forgalmi benchmark beállítása (most):** GA4 › Reports › Acquisition › Traffic acquisition — rögzítsd a havi organikus session-bázist, hogy legyen mihez mérni. A `[[frubeauty-gsc-audit]]` szerint friss property (~3 hét, 38 katt) → most a baseline-rögzítés ideje.

### 13.2 Havi GSC audit-checklist
- [ ] Performance: klikk/megjelenés/CTR/pozíció trend (egy metrika egyszerre, teljes görbe, ne 2 pont).
- [ ] **CTR-rés:** poz 2-5 lekérdezések, ahol a tényleges CTR < elvárt (poz 3 ≈ 8-12%, poz 4-5 ≈ 5-7%) → title/meta finomítás. A `[[frubeauty-gsc-audit-0624]]` poz 2-4 CTR-rést jelez.
- [ ] Page Indexing: indexelt vs nem-indexelt (külön nézet); „Crawled — currently not indexed" a money-oldalakra = piros zászló.
- [ ] Sitemap: „Success", indexelt URL-szám stabil.
- [ ] Core Web Vitals (mobil): Good URL-ek aránya; release-ekhez kötve.
- [ ] Enhancements: nincs új invalid (FAQ/Breadcrumb/Video/HowTo) — a P1 schema-bővítések után ezt figyelni.
- [ ] Hó végén export táblázatba + chart-screenshot (a GSC csak korlátozott historyt tart).

### 13.3 Cikk-adatbázis (per-poszt teljesítmény)
Oszlopok: URL · publikálás · cél-kulcsszó · index-státusz · pozíció · klikk · vs-benchmark. → ebből vezérelhető a következő tartalom és a belső-link optimalizálás.

### 13.4 GSC API automatizálás (opcionális)
`searchanalytics.query()` napi 1-napos lekérésekkel (kvótabarát), dimenzió: `query`+`page`+`date`. A `[[frubeauty-ads-browser-access]]` szerint a böngészős GSC-hozzáférés már kiépített (`sc-domain:frubeauty.com`) — ebből dashboard építhető.

---

## 14. Élesben ellenőrizendő (a kódból nem igazolható)

| # | Mit | Hogyan |
|---|---|---|
| 14.1 | `/szemoldok-laminalas-zuglo/` indexelt-e | GSC URL Inspection → „URL is on Google?" |
| 14.2 | Wix-301-ek tényleg money-page-re visznek | `curl -I` az encoded Wix-URL-ekre deploy után (`[[frubeauty-deploy-redirects]]`: a Netlify %xx-kódolt `from`-mal illeszt) |
| 14.3 | Mobil PSI 95+ teljesül-e | PageSpeed Insights mobil, a 4 money + főoldal |
| 14.4 | Rich Results validitás | Rich Results Test az új FAQ/Breadcrumb schemákra (P1 után) |
| 14.5 | Konverzió tüzel-e | Tag Assistant / GA4 DebugView **mobiladaton** (a fejlesztői gép blokkolja — `[[frubeauty-local-tracker-block]]`) |
| 14.6 | „kozmetikus zugló" pozíció | GSC Performance, query-szűrő |
| 14.7 | GBP elsődleges kategória + „Natural Beauty" listing | GBP admin (`[[frubeauty-organic-audit]]`) |

---

*Készítette: Claude (Opus 4.8) · a leletek forráskódból verifikálva, fájl:sor hivatkozással · az off-page és élő-adat tételek a 14. szakaszban külön jelölve.*
