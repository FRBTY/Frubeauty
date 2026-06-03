# FRUBEAUTY — Elit SEO & GEO Stratégia (V2)
**frubeauty.com · Pecze-Kovács Fruzsina · Zugló, XIV. kerület**
*Készült: 2026. június 1. · Chief SEO Officer szemlélet*

> **Auditálva:** lokális kódbázis (Astro v1.4.0) + élő `frubeauty.com` + fő versenytárs (Pilla Negra) + a meglévő GSC-bázis.
> **V2 fókusz:** pillér-klaszter architektúra, entitás/E-E-A-T réteg, GEO (AI-keresők), rich-result felületek és technikai schema — a V1 „quick wins" log továbbfejlesztése stratégiai szintre.

---

## Diagnózis (4 mondat)

1. **Ez nem rangsor-, hanem CTR- + struktúra-probléma.** Pozíció 5, heti 766 impression — a Google már bízik az oldalban. A 2,7%-os CTR-t a rich result-ok (csillag, FAQ, videó) és a title-ek húzzák fel, nem új tartalom.
2. **A legnagyobb egyetlen hiba: a „szemöldök laminálás" nem létezik önálló URL-ként.** A direkt versenytárs (pillanegra.hu) külön oldalt futtat rá (`/szemoldok-laminalas-zuglo`) és strukturálisan elver. Egy URL két kulcsszót nem tud dominálni.
3. **Nincs entitás-réteg (az E-E-A-T magja hiányzik).** Fruzsina mint *személy* (a tényleges szakértő és „Experience" forrás) sehol nincs `Person` schema-ként megfogalmazva — pedig egyszemélyes szalonként ez a legerősebb fegyver a Google *és* az AI-keresők felé.
4. **Kihasználatlan rich-result felületek.** Van 3 valódi videó, 8 valódi vélemény, egy 4-lépéses folyamat — ezekből `VideoObject`, `Review`, `HowTo` rich result lehetne. Jelenleg egyik sincs schema-ban.

---

## Kiindulási adatok

| Forrás | Megállapítás |
|---|---|
| GSC (2026-05-18–28) | Heti 21 klikk · 766 impression · 2,7% CTR · átlag pozíció 5 |
| Élő oldal vs. kód | Egyező, nincs deploy-drift |
| **Irányítószám** | **✅ 1143 — VERIFIKÁLVA** (Magyar Posta irányítószám-kereső, 2026-06-01). A korábbi `AUDIT_REPORT.md` 1149-es felvetése téves; a `config/site.ts` helyes. |
| Versenytárs (Pilla Negra, Zugló XIV.) | Külön URL minden szolgáltatásra: `/szempilla-lifting-zuglo`, `/szemoldok-laminalas-zuglo`, `/3D-muszempilla-zuglo` |
| Meglévő schema | `BeautySalon` (aggregateRating 5.0/40), `FAQPage`, 2× `Service`, blog `Article`+`Person` |

---

# 1. Keresési szándék & Kulcsszó-klaszter terv (Pillér-Klaszter)

## Architektúra-elv
**Téma-sziló:** minden klaszter-cikk **felfelé** linkel a pillér-oldalra (azonos, leíró horgonyszöveggel), a pillér **lefelé** linkel a klaszterekre. Klaszterek egymásra csak valódi relevancia esetén. Ez koncentrálja a topical authority-t a 3 pénztermelő pillér-oldalra.

### 🥇 PILLÉR 1 — Szempilla lifting *(transactional, CORE)*
**Pillér-oldal:** `/szempilla-lifting-zuglo` *(létezik — optimalizálandó; a szemöldök-tartalom KIVÉTELE belőle)*

| Klaszter-aloldal | Slug | Szándék | Fő kulcsszó |
|---|---|---|---|
| Szempilla lifting árak Budapesten 2026 — mennyibe kerül és mitől függ? | `/blog/szempilla-lifting-arak-2026` | **Commercial** | „szempilla lifting ár" |
| Szempilla lifting vagy műszempilla — melyik való neked? | `/blog/szempilla-lifting-vagy-muszempilla` | **Commercial Investigation** | „szempilla lifting vs műszempilla" |
| Szempilla lifting utáni ápolás: így tart ki 8 hétig | `/blog/szempilla-lifting-utani-apolas` | **Informational** (retenció) | „szempilla lifting ápolás" |
| Koreai szempilla lifting: miben más, mint a klasszikus? | `/blog/koreai-szempilla-lifting` | **Informational** (differenciátor) | „koreai szempilla lifting" |

*(Meglévő `szempilla-lifting-vagy-festes.md` ide tartozik — Commercial.)*

### 🥈 PILLÉR 2 — Szemöldök laminálás *(transactional, CORE — a #1 lehetőség)*
**Pillér-oldal:** `/szemoldok-laminalas-zuglo` ⚠️ **ÚJ — MEG KELL ÉPÍTENI** (a `szempilla-lifting-zuglo.astro` template-jét másold; a szemöldök-content kerüljön ide)

| Klaszter-aloldal | Slug | Szándék | Fő kulcsszó |
|---|---|---|---|
| Szemöldök laminálás: mit jelent és kinek ajánlott? | `/blog/szemoldok-laminalas-mit-jelent` | **Informational** | „szemöldök laminálás mit jelent" |
| Szemöldök laminálás vs. microblading vs. henna | `/blog/szemoldok-laminalas-vs-microblading` | **Commercial Investigation** | „szemöldök laminálás vagy microblading" |
| Meddig tart a szemöldök laminálás és hogyan ápold? | `/blog/szemoldok-laminalas-meddig-tart` | **Informational** | „szemöldök laminálás meddig tart" |
| Szemöldök laminálás árak Budapesten 2026 | `/blog/szemoldok-laminalas-arak-2026` | **Commercial** | „szemöldök laminálás ár" |

### 🥉 PILLÉR 3 — Arckezelés / Janssen *(commercial, AOV-növelő + cross-sell + topical authority)*
**Pillér-oldal:** `/arckezeles-zuglo` *(létezik)*

| Klaszter-aloldal | Slug | Szándék | Fő kulcsszó |
|---|---|---|---|
| Janssen arckezelés: melyik protokoll való a bőrtípusodhoz? | `/blog/janssen-arckezeles-bortipusok` *(létezik)* | **Commercial/Info** | „janssen arckezelés" |
| Mennyibe kerül egy arckezelés Budapesten 2026-ban? | `/blog/arckezeles-arak-2026` | **Commercial** | „arckezelés ár budapest" |
| Hidratáló vs. anti-aging arckezelés — mikor melyik? | `/blog/hidratalo-vagy-antiaging-arckezeles` | **Informational** | „milyen arckezelést válasszak" |

> **Tudatos architektúra-döntés:** a „Teljes Tekintet" kombinált csomag (lifting + laminálás; a vendégek 78%-a ezt veszi) **NEM kap önálló URL-t** — kannibalizálná az 1. és 2. pillért. A combo mint *konverziós ajánlat* a Pillér 1 és 2 oldalakon él. Az **esküvői/alkalmi smink** szezonális szatellit a `/sminkes-zuglo`-n marad.

---

# 2. E-E-A-T és AI-optimalizációs (GEO) stratégia

A helyzet ritka előny: egyszemélyes szalon, ahol *Fruzsina személyesen* végez minden kezelést. Ez maga az „Experience" — ki kell kódolni embernek és gépnek egyaránt.

## 2.1 Építsd meg az entitás-réteget (a hiányzó láncszem)
**Hozz létre egy `/rolam` (vagy `/pecze-kovacs-fruzsina`) dedikált szakértői oldalt** — ez lesz a `Person` entitás horgonya, amire minden blog-byline és a `BeautySalon` `founder`/`employee` mutat. Tartalma:

- **Első személyű szakmai életrajz:** képzettség, hány éve a pályán, koreai lash lift képzés/certifikáció (konkrét intézmény + év), Janssen partner-státusz.
- **„Miért csak egy vendég egyszerre" — a filozófia első kézből** (Experience-jelzés).
- **Valódi fotó Fruzsináról munka közben** (nem stock).
- `Person` schema `hasCredential`, `knowsAbout`, `sameAs` mezőkkel (lásd 4. szakasz).
- Minden blogcikk `rel="author"` byline-ja **erre az oldalra** mutasson (jelenleg `/#kapcsolat`-ra megy a `blog/[...slug].astro:114` — cseréld `/rolam`-ra).

## 2.2 Experience-jelzések a tartalomba
- **Valódi előtte/utána**, vendég-hozzájárulással, dátummal — nem stock.
- **„Saját kezűleg, koreai technikával, X éve" mikro-copy** a hero alatt.
- **Folyamat-videók** (megvannak: `/media/szempilla-lifting-video-...mp4`) → `VideoObject` schema-val first-hand bizonyíték.
- **Eset-leírások** (80–120 szó, valós szituáció): pl. „Egy vendég érzékeny szemkörnyékkel jött — így oldottuk meg."

## 2.3 GEO — bekerülés a Gemini / Perplexity / AI Overview hivatkozott forrásai közé

| Taktika | Konkrét végrehajtás |
|---|---|
| **Atomic Answer** | Minden H2/kérdés alatt az első 1–2 mondat önállóan is megálljon. 40–60 szó. Tiltott: „a fentiek alapján…". |
| **Entitás-mondat** | A hero alá: *„A FRUBEAUTY egy zuglói (Budapest, XIV. kerület, Egressy út 16.) kozmetika, amely szempilla liftingre és szemöldök laminálásra specializálódott; a kezeléseket Pecze-Kovács Fruzsina kozmetikus végzi, koreai lash lift technikával."* — ezt az LLM-ek szó szerint kiemelik. |
| **Tényszerűség, számokkal** | „6–8 hét", „90 perc", „12.000 Ft", „koreai technika", „ragasztómentes" — idézhető. A „prémium élmény" típusú ködöt kerüld. |
| **Összehasonlító táblák / listák** | Az LLM-ek imádják kiemelni. A meglévő „lifting vs. műszempilla" tábla (`szempilla-lifting-zuglo.astro:455`) ideális — replikáld a szemöldök oldalon (laminálás vs. microblading vs. henna). |
| **`FAQPage` + `speakable`** | A FAQ megvan — bővítsd, a válaszokat tedd önállóvá, adj `speakable` schema-t az atomic válaszokra. |
| **Frissesség** | `dateModified` minden oldalon + látható „Frissítve: 2026. …" a fontos cikkeknél. |
| **AI-crawler policy** | `robots.txt`-ben engedélyezd: `GPTBot`, `PerplexityBot`, `Google-Extended`, `OAI-SearchBot`. Adj `/llms.txt`-et a fő szolgáltatások + URL-ek listájával. |

> **GEO-szabály egy mondatban:** írj úgy, hogy egy AI a bekezdésedet **változtatás nélkül be tudja idézni egy válaszba**. Ha ehhez kontextust kell hozzátennie, a passzus nem elég atomi.

---

# 3. „Atomic Answer" tartalmi sablon — fő kulcsszó: *szempilla lifting Zugló*

A `/szempilla-lifting-zuglo` oldal ideális szerkezete (a meglévő upgrade-je). A sorrend szándékos: előbb a kinyerhető válasz + konverziós horgony, utána a mélység.

```
H1: Szempilla lifting Zuglóban — reggel smink nélkül, tökéletes tekintet
    (kulcsszó elöl + fő benefit; a "szemöldök laminálás" KIVÉTELE a H1-ből,
     az átkerül a saját pillér-oldalára)

[ATOMIC LEAD — közvetlen a H1 alatt, 45–60 szó, ez megy az AI Overviewbe:]
"A szempilla lifting a saját pilláid tövét emeli meg és rögzíti ívelt formába,
 így tus nélkül is hosszabbnak, dúsabbnak látszanak. Zuglóban (Egressy út 16.)
 koreai technikával, ragasztómentes, bőrbarát anyagokkal végzem; az eredmény
 6–8 hétig tart. Ár: 12.000 Ft (festéssel együtt), időtartam ~90 perc."

[QUICK-FACTS DOBOZ — kinyerhető kulcs-érték párok (LLM + dwell time):]
  Ár: 12.000 Ft · Időtartam: ~90 perc · Tartósság: 6–8 hét ·
  Technika: koreai lash lift · Helyszín: Zugló, XIV. ker. · ★5,0 (40+ értékelés)
  → [Időpontot foglalok] CTA  (above the fold!)

H2: Mi az a szempilla lifting, és kinek ajánlott?
    H3: Hogyan zajlik a kezelés? (→ a 4 lépés, HowTo schema-val)
    H3: Kinek NEM ajánlott? (őszinte: várandósság, friss szemműtét → trust + E-E-A-T)

H2: Szempilla lifting árak Zuglóban 2026
    [Atomic: "A szempilla lifting ára nálam 12.000 Ft, ami a liftinget és a
     tartós festést is tartalmazza."]
    [Csomag-tábla: Alap / Teljes Tekintet (kiemelt) / Prémium]
    → belső link: /blog/szempilla-lifting-arak-2026

H2: Szempilla lifting vagy műszempilla — melyiket válaszd?
    [a meglévő összehasonlító tábla ide jó]
    → belső link: /blog/szempilla-lifting-vagy-muszempilla

H2: Koreai technika — miért ezzel dolgozom? (differenciátor, Experience)
    → belső link: /blog/koreai-szempilla-lifting

H2: Eredmények — vendégeim előtte/utána (galéria + 1-2 mini eset)
H2: Vélemények (8 valós, Review schema-val)
H2: Munka közben (a valódi videó, VideoObject schema-val)

H2: Gyakran ismételt kérdések  ← minden válasz atomi (40–60 szó, önálló)
    - Fáj a szempilla lifting?
    - Meddig tart az eredménye?
    - Mit hozzak magammal?
    - Szempilla lifting utáni ápolás? → belső link: /blog/...utani-apolas
    - Allergiás/érzékeny szemre alkalmas?
    - Lemondható az időpont?

[ZÁRÓ KONVERZIÓS BLOKK]: ismételt CTA + "Teljes Tekintet" combo upsell
+ kapcsolódó: "A szem mellé tiszta bőr" → /arckezeles-zuglo (cross-sell, megvan)
```

**Dwell-time / bounce optimalizálás:**
- **CTA az első képernyőn** mobilon is (375px) — mérd, hogy a hero CTA a fold felett van-e.
- **Quick-facts doboz** rögtön választ ad → nincs pogo-stick vissza a SERP-be.
- **Belső linkek a klaszterekre** a releváns H2-knél → mélyíti a sessiont (session-quality jelzés).
- **Egy `<em class="display">` kiemelés / szekció max.** (ha minden kiemelt, semmi sem az).

---

# 4. Technikai & Schema Markup check-lista

## 4.1 Egyesített `@graph` (a `Layout.astro`-ba)

A jelenlegi különálló `BeautySalon` objektum (`Layout.astro:32`) helyett `@graph`, ahol a `LocalBusiness`, `Person` és `WebSite` `@id`-vel egymásra hivatkozik — összefüggő entitás-gráf (knowledge graph + AI-források felé döntő).

```jsonc
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BeautySalon",
      "@id": "https://frubeauty.com/#business",
      "name": "FRUBEAUTY – Pecze-Kovács Fruzsina",
      "url": "https://frubeauty.com",
      "image": ["https://frubeauty.com/og-image.jpg"],
      "telephone": "+36702159954",
      "email": "kfruzsi0197@gmail.com",
      "priceRange": "4000–26000 Ft",
      "currenciesAccepted": "HUF",
      "paymentAccepted": "Készpénz, Bankkártya",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Egressy út 16.",
        "addressLocality": "Budapest",
        "addressRegion": "Zugló (XIV. kerület)",
        "postalCode": "1143",
        "addressCountry": "HU"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 47.5058846, "longitude": 19.1024696 },
      "hasMap": "https://www.google.com/maps/place/...",
      "founder":  { "@id": "https://frubeauty.com/#fruzsina" },
      "employee": { "@id": "https://frubeauty.com/#fruzsina" },
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:30", "closes": "19:30" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "08:00", "closes": "13:00" }
      ],
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "40", "bestRating": "5", "worstRating": "1" },
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Zugló (XIV. kerület)" },
        { "@type": "City", "name": "Budapest" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Szempilla és szemöldök kezelések",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Szempilla lifting + festés" }, "price": "12000", "priceCurrency": "HUF" },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Szemöldök laminálás + formázás" }, "price": "11000", "priceCurrency": "HUF" }
        ]
      },
      "sameAs": [
        "https://www.instagram.com/frubeauty/",
        "https://www.facebook.com/profile.php?id=61572135977337",
        "https://www.notino.hu/szalonok/pecze-kovacs-fruzsina-sminkes,-szemoldok-es-szempilla-stylist"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://frubeauty.com/#fruzsina",
      "name": "Pecze-Kovács Fruzsina",
      "jobTitle": "Kozmetikus, szempilla- és szemöldök-stylist",
      "image": "https://frubeauty.com/img/fruzsina-portrait.jpg",
      "url": "https://frubeauty.com/rolam",
      "worksFor": { "@id": "https://frubeauty.com/#business" },
      "knowsAbout": ["szempilla lifting","szemöldök laminálás","koreai lash lift","Janssen arckezelés","alkalmi smink"],
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Kozmetikus szakképesítés",
        "name": "Koreai lash lift technika"
      },
      "sameAs": [
        "https://www.instagram.com/frubeauty/",
        "https://www.facebook.com/profile.php?id=61572135977337"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://frubeauty.com/#website",
      "url": "https://frubeauty.com",
      "name": "FRUBEAUTY",
      "publisher": { "@id": "https://frubeauty.com/#business" },
      "inLanguage": "hu-HU"
    }
  ]
}
```

## 4.2 Oldal-szintű schema (az `additionalSchemas` propon keresztül — már létezik a `Layout.astro:23`-ban)

**a) `Review` — a 8 valódi vélemény (nem csak aggregate):**
```jsonc
{
  "@context": "https://schema.org", "@type": "Review",
  "itemReviewed": { "@type": "BeautySalon", "@id": "https://frubeauty.com/#business" },
  "author": { "@type": "Person", "name": "Kitti Varga-Tóth" },
  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
  "reviewBody": "Szempilla lifting a kedvencem, többször is voltam már és biztosan megyek még. Profi szakember, szívből ajánlom mindenkinek."
}
// → generáld le mind a 8-at a testimonials tömbből (szempilla-lifting-zuglo.astro:98)
```

**b) `VideoObject` — a meglévő folyamat-videókhoz:**
```jsonc
{
  "@context": "https://schema.org", "@type": "VideoObject",
  "name": "Szempilla lifting munka közben — FRUBEAUTY Zugló",
  "description": "Szempilla lifting koreai technikával, bőrbarát anyagokkal a zuglói szalonban.",
  "thumbnailUrl": "https://frubeauty.com/media/szempilla-lifting-video-frubeauty-zuglo-budapest-14kerulet-poster.webp",
  "contentUrl": "https://frubeauty.com/media/szempilla-lifting-video-frubeauty-zuglo-budapest-14kerulet.mp4",
  "uploadDate": "2026-01-01",
  "publisher": { "@id": "https://frubeauty.com/#business" }
}
```

**c) `HowTo`** — a 4-lépéses folyamatból (`processSteps`, `szempilla-lifting-zuglo.astro:91`) → „A kezelés menete" rich result.
**d) `BreadcrumbList`** — minden aloldalra (Főoldal › Szempilla lifting Zugló).
**e) `Service` bővítés** — a meglévő 2 `Service` (`:157`) kapjon `url`-t (a pillér-oldalra) és `priceValidUntil`-t az `Offer`-ben.

## 4.3 NAP / technikai ellenőrzőlista

| Tennivaló | Prioritás | Megjegyzés |
|---|---|---|
| **Irányítószám** | ✅ KÉSZ | **1143 verifikálva** (Magyar Posta). NAP minden felületen 1143 legyen: site schema + Google Business Profile + Notino + katalógusok. |
| `/szemoldok-laminalas-zuglo` megépítése | 🔴 KRITIKUS | A Pillér 2 hiányzó pénztermelő oldala. Szemöldök-content átköltöztetése a szempilla oldalról. |
| `Person` + `@graph` schema | 🟠 MAGAS | E-E-A-T + entitás (4.1). |
| `Review` + `VideoObject` + `HowTo` + `BreadcrumbList` | 🟠 MAGAS | Új rich-result felületek (4.2). |
| Per-oldal OG image | 🟡 KÖZEPES | Most minden oldal a default `/og-image.jpg`-t használja (`Layout.astro:20`). Egyedi OG legalább a 3 pillérnek. |
| `dateModified` + látható „Frissítve" | 🟡 KÖZEPES | Frissesség-jelzés GEO-hoz. |
| `robots.txt`: AI-crawlerek + `/llms.txt` | 🟡 KÖZEPES | GPTBot, PerplexityBot, Google-Extended engedése. |
| `sitemap` `lastmod` | 🟢 ALACSONY | Astro generálja; ellenőrizd a lastmod-ot. |
| Rich Results Test deploy után | 🟢 ALACSONY | search.google.com/test/rich-results |

## 4.4 Core Web Vitals (cél: PSI **mobil 95+**)

A perf-alap már erős (font-display:optional + metrika-illesztett fallback, content-visibility, deferred gtag, kondicionális hero-preload) — **ezeket NE bántsd**. Maradék mozgástér:

| Metrika | Konkrét lépés a `/szempilla-lifting-zuglo`-n |
|---|---|
| **LCP** | A hero kép (`:226`) `fetchpriority="high"`, de nincs `<link rel="preload">`. **Mérd PSI-vel, mi az LCP-elem mobilon** — ha a hero *kép*, add át a `preloadImage` propot; ha a *H1 szöveg* (valószínű kis viewporton), NE preloadolj képet (helyes a mostani döntés). |
| **INP** | A hero `Reveal` + 2× `MagneticCTA` **`client:load`** szigetekkel hidratál a kritikus úton (`:215`). Van már CSS-only `.hero-reveal` (`Layout.astro:371`) — a hero feltáró animációját váltsd erre a CSS-classra, a `MagneticCTA` mehet `client:visible`-re. Kevesebb fő-szál-munka → jobb INP. (Additív, nem visszavonás.) |
| **CLS** | Rendben (font-fallback + minden képen `width`/`height`). Ellenőrizd, hogy a `Lightbox` (createPortal) megnyitása nem okoz-e shiftet. |

> Mérés-vezérelt megközelítés: futtass PSI-t mobilon a 3 pillérre, és csak a ténylegesen LCP-t/INP-t rontó elemen nyúlj.

---

## Végrehajtási ütemterv

| Időszak | Intézkedés | Várható hatás |
|---|---|---|
| **48 óra** | NAP-szinkron (1143) · `@graph` + `Person` · `Review`/`VideoObject`/`HowTo`/`BreadcrumbList` a szempilla oldalon | Rich-result + CTR-uplift |
| **1. hét** | `/szemoldok-laminalas-zuglo` + `/rolam` entitás-oldal · belső linkek a sziló szerint | +1 rangsoroló pénztermelő URL |
| **2–4. hét** | Pillér 1 & 2 első 2-2 klaszter-cikke (ár + összehasonlítás) | Long-tail commercial forgalom indul |
| **8–12. hét** | Teljes klaszter-kör + schema-érettség | Pozíció 5 → 2–3 a fő kulcsszavakra |
| **Folyamatos** | Kéthetente 1 klaszter-cikk, heti GSC CTR-monitoring, vendégenként értékelés-kérés | Tartós organikus növekedés |

---

*FRUBEAUTY SEO V2 — 2026. június 1. · frubeauty.com · Pillér-klaszter + entitás/GEO + rich-result fókusz*
