# FRUBEAUTY — Ahrefs audit, 2026-07-31

Forrás: Ahrefs Webmaster Tools (Free), `frubeauty.com`, projectId 10147531.
Site Audit: **friss crawl indítva és lefutott 2026-07-31 08:51-kor** (az addigi legutóbbi 07-25-i crawl elavult volt — még a régi címeket látta).
Site Explorer: élő index. Keywords Explorer és GSC Insights fizetős csomagot igényel, ezekhez nem fértünk hozzá.

---

## 1. Vezetői összefoglaló

Három mondatban:

1. **A technikai SEO gyakorlatilag hibátlan.** 173 ellenőrzött szabályból 0 hiba, Health Score 100/100. Ezen az oldalon nincs mit javítani — a további munkát nem ide kell tenni.
2. **A linkprofil a valódi plafon, és rosszabb, mint hittük.** Nem „1 backlink" van, hanem **0 dofollow hivatkozó domain**. A 415 hivatkozó domain mind SEO-szolgáltatást áruló spam, mind nofollow, és a támadás **jelenleg is aktív**.
3. **A tartalom a leggyorsabban mozdítható kar.** A blogcikkek törzse 340–848 szó — ez a fő ok, amiért az informatív lekérdezéseken nem tudnak elmozdulni, miközben a KD (keyword difficulty) a niche-ben **0**.

---

## 2. Alapadatok

| Metrika | Érték | Megjegyzés |
|---|---|---|
| Domain Rating (DR) | **0** | 415 hivatkozó domain mellett — ez önmagában diagnózis |
| Backlinkek | 877 (valaha: 956) | |
| Hivatkozó domainek | 415 (valaha: 422) | |
| **Ebből dofollow** | **0** | ez a kulcsszám |
| Organikus kulcsszó (Ahrefs) | 1 | „esküvői smink árak", 5. poz., 150 keresés, **KD 0** |
| Organikus forgalom (Ahrefs) | 15 / hó | becsült érték: $1 |
| AI-találatok (AIO, ChatGPT, Gemini, Perplexity, Copilot) | **0** | teljes hiány minden felületen |
| Site Audit Health Score | **100** | 0 hiba, 3 figyelmeztetés, 38 megjegyzés |
| Bejárt belső URL | 26 (23 indexelhető + 3 átirányítás) | |

> **Fontos fenntartás:** az Ahrefs magyar indexe vékony. A GSC 87 kattintást / 2620 megjelenést mér, az Ahrefs ebből 1 kulcsszót lát. **A kulcsszóadatokra a GSC a hiteles forrás, nem az Ahrefs.** Az Ahrefs itt a linkprofilra és a crawl-adatra használható.

---

## 3. A linkprofil — a fő lelet

### Mi történik

2026. március 31. óta folyamatos spam-linkelés célpontja az oldal. A legfrissebb link **2026-07-30-i** (tegnapi) — **a kampány most is fut**.

- Mind a 415 domaint az Ahrefs maga jelöli **SPAM**-nak. Végigellenőrizve mind az 5 oldalnyi találat: **egyetlen nem-spam domain sincs**.
- Tipikus domainek: `fiverr-quality-seo-at-affordable-rates.site`, `rankgrowth.agency`, `buyseobacklinks.shop`, `pbnseolinks.shop`, `seopxl-ranking-boost-lab.shop` — ~50–70-es hamis DR-rel.
- Anchor-szövegek (a top 3 a linkek 81%-a):
  - „Boost Rankings & Massive Traffic | High DR … Backlinks for **Casino, Crypto** … For frubeauty.com" — 253 domain (42,2%)
  - „Honestly, before using SEOExpress.org's e-commerce SEO strategies … called frubeauty.com …" — 197 domain (32,9%)
  - „Complete SEO for frubeauty.com: high-DR backlinks, editorial guest posts …" — 38 domain (6,3%)

Ez a jól ismert **„SEO-szolgáltatás-csali" spamhálózat**: domainneveket szüretelnek, generálnak egy oldalt „SEO szolgáltatás a [domain] számára" szöveggel, hogy a tulajdonos rátaláljon és vásároljon. Nem célzott negatív SEO-támadás — az oldal csak egy a több tízezer véletlenszerű célpont közül.

### Miért nem kell pánikolni

**Mind a 415 domain, mind a 877 link nofollow.** Nulla PageRank érkezik rajtuk. A Google hivatalos álláspontja szerint a disavow eszközt csak akkor kell használni, ha (a) manuális büntetés érkezett, vagy (b) a linkeket te magad építetted. Egyik sem áll fenn.

**Javaslat: NE készíts disavow-fájlt.** Egyetlen teendő: a GSC-ben negyedévente ellenőrizni a *Biztonság és manuális műveletek* menüpontot. Ha ott nem jelenik meg semmi, a spam nem számít.

### Ami viszont tényleg baj

**0 dofollow hivatkozó domain.** Nem kevés — nulla. A Notino-oldal sem ad értékátadó linket (marketplace-linkek jellemzően nofollow-k, illetve az Ahrefs nem is találja meg).

Ez azt jelenti, hogy a jelenlegi rangsorok **teljes egészében** on-page tartalomból, technikai minőségből és a Google Cégprofilból származnak. Külső tekintély nulla.

A jó hír: a niche-ben a **KD = 0**. A verseny sem épít linket. Emiatt **3–5 valódi dofollow link már érdemi elmozdulást hozhat** — ez a legmagasabb megtérülésű hátralévő feladat az egész projektben. (A konkrét célpontokat lásd: `FRUBEAUTY-BACKLINK-CITACIO-CSOMAG-2026-07-26.md`.)

### Kimenő linkek — aszimmetria

193 külső link `rel="noopener"`, azaz **dofollow**; mindössze 10 nofollow.

- `notino.hu` → **28 dofollow link**, sitewide (minden oldalon a foglalás gomb)
- `google.com` (Térkép) → 27, `facebook.com` → 23, `instagram.com` → 23

A közösségi és térkép-linkek dofollow-ként rendben vannak. A **28 sitewide dofollow link egyetlen kereskedelmi partnerre** viszont olyan minta, amit a Google fizetett/affiliate elhelyezésként is olvashat — miközben befelé nulla dofollow érkezik.

**Javaslat:** a Notino foglalás-gombokra `rel="noopener sponsored"`. Kockázatmentes, és pontosan leírja a viszonyt.

---

## 4. Technikai SEO — 4 valós tétel

173 ellenőrzött szabályból mindössze ennyi aktív:

| # | Tétel | Db | Prioritás |
|---|---|---|---|
| 1 | 3XX átirányítás | 3 | alacsony |
| 2 | HTTP → HTTPS átirányítás | 2 | alacsony |
| 3 | **Átirányítási lánc** | 1 | **közepes** |
| 4 | IndexNow-ra beküldendő oldalak | 11 | alacsony |

### 4.1 Átirányítási lánc (egyetlen érdemi technikai javítás)

Igazolva `curl`-lel:

```
http://www.frubeauty.com/  →  https://www.frubeauty.com/  →  https://frubeauty.com/
```

Két ugrás egy helyett. A `http://frubeauty.com/` már most helyesen egy ugrással megy.

**Javítás:** Netlify-szinten a `http://www.` közvetlenül a `https://` (www nélküli) verzióra menjen. Egy sor a `netlify.toml`-ban / `_redirects`-ben.

### 4.2 Core Web Vitals kikapcsolva a crawl-beállításokban

Az Ahrefs Performance riportja ezt írja: *„To get page speed data from Google PageSpeed Insights, enable Core Web Vitals in Crawl settings."*

A PSI mobil 95+ cél mellett ezt érdemes bekapcsolni: minden crawl automatikusan lehúzza az oldalankénti PSI-adatot, és riasztást ad, ha romlik. Egy kapcsoló, visszatérő értékkel.

### 4.3 IndexNow — reális elvárással

Az Ahrefs 11 oldalt javasol beküldésre. Fontos: **az IndexNow-t a Bing és a Yandex használja, a Google nem.** Magyar kozmetikus-keresésnél a Bing részesedése elhanyagolható. Alacsony prioritás, nem sürgős.

### 4.4 Ami kifogástalan (ne nyúlj hozzá)

- 0 hibás belső link, 0 hibás külső link, 0 db 4xx
- 0 kép alt szöveg nélkül (47 kép, mind HTTPS, mind alt-tal)
- 23/23 oldal önhivatkozó canonical, mind `index, follow`
- 0 duplikált / közel duplikált tartalom
- Brotli tömörítés mind a 23 oldalon; TTFB 20 oldalon <200 ms, 3 oldalon 200–300 ms; betöltés mind <500 ms; oldalméret mind <100 KB
- Open Graph és X-kártya mind a 23 oldalon hiánytalan
- 0 bejárt JS-erőforrás — az oldal **teljesen szerveroldalon renderelt**, JS nélkül is maradéktalanul bejárható

---

## 5. On-page leletek

### 5.1 H1-regresszió: 3 → 6 oldal 70 karakter felett

A 07-25-i crawlon 3 oldal H1-e volt túl hosszú, a mai crawlon már **6**. A közben élesített cím/H1-átírás rontott ezen.

| Karakter | Oldal | H1 |
|---|---|---|
| 92 | `/blog/janssen-arckezeles-bortipusok/` | Janssen arckezelés bőrtípusonként: melyik protokoll hozza el a változást a bőrödön? |
| 83 | `/sminkes-zuglo/` | Esküvői és alkalmi smink Budapesten — árak tételesen, rejtett díj nélkül. |
| 83 | `/blog/eskuvoi-smink-felkesziules/` | Esküvői smink Budapesten: így készülj a próbasminkre tudatos menyasszonyként |
| 83 | `/blog/eskuvoi-smink-arak-budapest/` | Mennyibe kerül az esküvői smink Budapesten? Árak és ami mögöttük van (2026) |
| 80 | `/` | Kozmetikus Zuglóban — hogy tökéletes bőrrel és kész tekintettel ébredj. |
| 74 | `/szempilla-lifting-zuglo/` | Szempilla lifting Zuglóban — 6–8 hétig ívelt pillák, tus nélkül. |

Ez nem rangsorolási hiba — a hosszú H1 hígítja a fő kulcsszó súlyát, és a Google gyakran ebből generál címet a SERP-en. A kulcsszót vidd az első 60 karakterbe, a marketinges farkat vágd le vagy told alcímbe.

**Címek és leírások ezzel szemben rendben:** 23/23 oldal pontosan egy címmel, egy leírással, egy H1-gyel; minden cím 15–70 karakter, minden leírás 100–300 karakter között.

### 5.2 Tartalom-mélység — ez a legnagyobb tartalmi kar

A blogcikkek törzsszövege (markdown, sablon nélkül):

| Szó | Cikk |
|---|---|
| 340 | `szemoldok-laminalas-meddig-tart` |
| 353 | `szemoldok-laminalas-mit-jelent` |
| 376 | `szemoldok-laminalas-vs-microblading` |
| 387 | `szempilla-lifting-vagy-muszempilla` |
| 419 | `hidratalo-vagy-antiaging-arckezeles` |
| 437 | `koreai-szempilla-lifting` |
| 580–697 | `arckezeles-arak-2026`, `szempilla-lifting-utoapolas`, `szempilla-lifting-vagy-festes`, `szempilla-lifting-arak-2026`, `eskuvoi-smink-arak-budapest`, `szemoldok-laminalas-arak-2026`, `eskuvoi-smink-felkesziules` |
| 848 | `janssen-arckezeles-bortipusok` |

Az Ahrefs a sablonnal együtt 604–1069 „tartalmi szót" mér — a valódi egyedi törzs ennél jóval kevesebb.

A hat 340–440 szavas cikk informatív lekérdezésekre pályázik, ahol a jelenlegi terjedelem nem elég a témalefedettséghez. Mivel a **KD 0**, itt a mélység önmagában elég a mozgáshoz — nem kell link.

**Javaslat:** a hat legrövidebb cikket 900–1200 szóra bővíteni, valódi tartalommal (esetleírás, „kinek nem való", ártáblázat-kontextus, ellenjavallatok, saját fotó) — nem töltelékkel.

### 5.3 Belső linkelés — a jogi oldalak ugyanannyit kapnak, mint a pénztermelők

Az oldal 10 legtöbb belső linket kapó URL-je:

| Bejövő belső link | URL |
|---|---|
| 22 | `/` |
| 22 | **`/adatvedelem/`** |
| 22 | `/arckezeles-zuglo/` |
| 22 | **`/aszf/`** |
| 22 | `/blog/` |
| 22 | `/rolam/` |
| 22 | `/sminkes-zuglo/` |
| 22 | `/szemoldok-laminalas-zuglo/` |
| 22 | `/szempilla-lifting-zuglo/` |
| 12 | `/blog/szemoldok-laminalas-arak-2026/` |

És az oldal két leggyakoribb belső anchor-szövege:

| Db | Anchor |
|---|---|
| 22 | **Adatvédelem** |
| 22 | **ÁSZF** |
| 20 | Alkalmi és esküvői smink |
| 19 | Vélemények |
| 18 | Összes cikk → |
| 17 | Arckezelés Zugló |
| 15 | Szemöldök laminálás |
| 14 | Pecze-Kovács Fruzsina |
| 13 | **Szempilla lifting** |

Két dolog látszik:

1. A lábléc miatt az ÁSZF és az Adatvédelem **pontosan annyi belső linket kap, mint bármelyik pénztermelő oldal**, és a két leggyakoribb anchor az egész oldalon jogi oldalak neve. Belső linkerőt és anchor-jelzést pazarolunk.
2. **A „Szempilla lifting" anchor (13) a legritkább a szolgáltatás-anchorok közül** — miközben ez a Google Ads fő kampánya, és a Map Packben itt csak #6 a pozíció. Az „Alkalmi és esküvői smink" 20-at kap.

**Javaslat:** a törzsszövegi (kontextuális) linkek számát növelni a szempilla-lifting oldalra a blogcikkekből, hogy a szolgáltatás-oldalak fölé kerüljenek a jogi oldalaknak. A láblécet nem kell átalakítani — belső `nofollow`-val sculptolni elavult és nem működik.

*Mellékes:* a RelatedArticles kártyák teljes kártyát linkelnek, így az anchor egy hosszú blokk lesz („Koreai technikájú szempilla lifting natúr íve — FRUBEAUTY Zugló Szempilla · 5 perc Koreai szempilla lifting — miben más…", 8×). Nem hiba, de az anchor-jelzést szétkeni.

### 5.4 `og:type` mind a 23 oldalon `website`

A blogcikkeken `article` kellene, `article:published_time` és `article:author` mezőkkel. Érinti a közösségi megosztás megjelenését és az AI-crawlerek tartalomtípus-felismerését. Olcsó javítás a `Layout.astro`-ban.

*Opcionális:* a `twitter:site` és `twitter:image:alt` hiányzik (az Ahrefs is opcionálisként jelöli).

### 5.5 Képméretek

43 WebP kép, összesen 6,4 MB; ebből **36 db 100 KB felett**, a legnagyobbak 187 / 184 / 183 KB. Az Ahrefs is „Medium: 100–500 KB" sávba sorolja egy részüket. A PSI mobil 95+ célhoz a hajtás feletti képeknél érdemes 100 KB alá menni (a hajtás alattiak lazy-loadolva kevésbé kritikusak).

---

## 6. Strukturált adat — mit tarts meg, mit dobj

A séma-lefedettség kiemelkedő: `BeautySalon`, `Person` + `EducationalOccupationalCredential`, `OfferCatalog`, `OpeningHoursSpecification`, `BreadcrumbList`, `Article`, `VideoObject`, `HowTo`, `FAQPage`. Két finomítás:

### 6.1 `HowTo` — elavult, kidobható

`/szemoldok-laminalas-zuglo/` és `/szempilla-lifting-zuglo/` oldalon van `HowTo` + `HowToStep`. **A Google 2023-ban megszüntette a HowTo rich resultot** — sem asztali, sem mobil találatban nem jelenik meg. Nem árt, de halott súly. Elhagyható; ha marad, ne számíts tőle megjelenésre.

### 6.2 `FAQPage` — reális elvárás + következetlenség

A Google 2023 augusztusa óta **csak hiteles kormányzati és egészségügyi oldalaknak** ad FAQ rich resultot. Erre az oldalra nem fog megjelenni. **Megtartani viszont érdemes**: az LLM-ek és AI-keresők jól hasznosítják kérdés-válasz kinyerésre — ez a GEO-ág szempontjából értékes.

Következetlenség: **4 blogcikkből hiányzik a FAQPage**, pedig a többiben van:
- `/blog/eskuvoi-smink-arak-budapest/`
- `/blog/eskuvoi-smink-felkesziules/`
- `/blog/janssen-arckezeles-bortipusok/`
- `/blog/szempilla-lifting-utoapolas/`

Érdemes pótolni — a tartalom-bővítéssel egy menetben.

### 6.3 `AggregateRating` — helyesen hiányzik, NE tedd bele

Sehol nincs `AggregateRating` vagy `Review` séma, miközben a címekben és leírásokban szerepel a „★5,0 · 50+ értékelés". **Ez így helyes.** A Google 2019 óta figyelmen kívül hagyja a saját magára vonatkozó (self-serving) LocalBusiness értékelés-jelölést, és szabálysértésként is kezelheti. A ★ a címsorban CTR-eszköz, nem sémafüggő. **Ne add hozzá.**

### 6.4 `AggregateOffer` következetlenség

`/arckezeles-zuglo/` és `/sminkes-zuglo/` oldalon van `AggregateOffer`, a `/szempilla-lifting-zuglo/` és `/szemoldok-laminalas-zuglo/` oldalon nincs. Egységesíteni érdemes.

---

## 7. AI-láthatóság (GEO) — nulláról indulunk

Az Ahrefs Brand Radar szerint az oldal **0 említést** kap minden AI-felületen: AI Overviews 0, ChatGPT 0, AI Mode 0, Gemini 0, Perplexity 0, Copilot 0.

A `robots.txt` már most helyesen engedi a GPTBot, OAI-SearchBot, PerplexityBot, Google-Extended és ClaudeBot crawlereket — a technikai alap tehát megvan. A hiány oka a külső említések és a tartalom-mélység hiánya, nem a hozzáférés. Ugyanaz a két kar mozdítja, mint a klasszikus organikust: **valódi linkek/említések + mélyebb tartalom**.

---

## 8. Amit NE csinálj (hamis riasztások)

| Jelzés | Miért ne foglalkozz vele |
|---|---|
| „23 oldalról hiányzik a hreflang" | Egynyelvű magyar oldal. A hreflang itt értelmetlen. A `html lang` mind a 23 oldalon megvan. |
| 415 spam backlink → disavow | Mind nofollow, nincs manuális művelet. A Google figyelmen kívül hagyja. Disavow-fájl itt kárt is okozhat. |
| Health Score 100 → „kész vagyunk" | A Health Score csak a *hibákat* méri. A valódi korlát (0 dofollow link, vékony tartalom) nem jelenik meg benne. |
| „Csak 1 organikus kulcsszó az Ahrefsben" | Az Ahrefs magyar indexe vékony. A GSC 87 kattintást mér. A kulcsszavakra a GSC a hiteles forrás. |
| IndexNow beküldés | Bing/Yandex funkció, a Google nem használja. |

---

## 9. Prioritási sorrend

### P0 — a valódi plafon
1. **3–5 valódi dofollow link megszerzése.** KD 0 mellett ez a legnagyobb megtérülésű lépés az egész projektben. Célpontok: `FRUBEAUTY-BACKLINK-CITACIO-CSOMAG-2026-07-26.md` (a fotós/ceremóniamester partneroldalak a valódi dofollow-forrás; a magyar esküvői katalógusok link-halottak).
2. **A 6 legrövidebb blogcikk bővítése 900–1200 szóra**, a hiányzó 4 FAQPage-dzsel együtt.

### P1 — olcsó, gyors javítások
3. 6 db 70+ karakteres H1 rövidítése.
4. `http://www.` → `https://` egy ugrásra (Netlify).
5. `og:type: article` a blogcikkekre.
6. Kontextuális belső linkek a `/szempilla-lifting-zuglo/` oldalra a blogcikkekből.
7. `rel="noopener sponsored"` a Notino foglalás-gombokra.

### P2 — karbantartás és higiénia
8. Core Web Vitals bekapcsolása az Ahrefs crawl-beállításokban (folyamatos PSI-monitorozás).
9. `HowTo` séma eltávolítása, `AggregateOffer` egységesítése a négy szolgáltatás-oldalon.
10. A hajtás feletti képek 100 KB alá.
11. Negyedévente: GSC → *Biztonság és manuális műveletek* ellenőrzése (a spam-kampány miatt).

---

## 10. Módszertani megjegyzés

Az Ahrefs Site Audit legutóbbi ütemezett crawlja 2026-07-25-i volt, és **elavult adatot mutatott**: még a `Szempilla Lifting + Festés Zugló ★5,0` típusú régi címeket látta, miközben élesben már a Budapest-előretételes címek futnak. Az audit során **friss crawl indult 2026-07-31 08:51-kor**, és minden fenti megállapítás ennek az eredménye (23 számlázott oldal, 4977 crawl-kredit maradt). A friss crawl épp ezért jelezte a „Title tag changed" (7), „H1 tag changed" (7) és „Meta description changed" (8) tételeket — ezek a saját, szándékos átírásaink, nem hibák.
