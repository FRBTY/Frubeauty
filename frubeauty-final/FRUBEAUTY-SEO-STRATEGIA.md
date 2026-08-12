# FRUBEAUTY — SEO Stratégia és Akcióterv
**frubeauty.com · Pecze-Kovács Fruzsina · Zugló, XIV. kerület**
*Készült: 2026. június 1.*

---

## Kiindulópont — Google Search Console adatok

| Metrika | Érték |
|---|---|
| Heti klikk | 21 |
| Heti impression | 766 |
| Átlagos CTR | 2,7% |
| Átlagos pozíció | 5 |
| Időszak | 2026. május 18–28. |

**Diagnózis:** A Google már mutatja az oldalt (766 impression), de az emberek nem kattintanak rá (2,7% CTR, iparági átlag position 5-nél: 5–8%). Ez nem rangsorolási probléma — ez CTR-probléma. A leggyorsabb győzelem a title tag, meta description és schema markup optimalizálása.

---

## Versenytárs térkép

| Domain | Erősség | Gyengeség |
|---|---|---|
| `pillanegra.hu` | Dedikált aloldalak (szempilla + szemöldök külön), zugló slug | Gyenge meta description, vékony tartalom |
| `szepiteszkozmetika.hu` | XIV. kerület, régi jelenlét | Elavult site, lassabb |
| `gretakozmetikus.hu` | Ár-összehasonlító tartalom, XIV. kerület | Nem combo-fókuszú |

**Frubeauty előnyei a versenytársakkal szemben:**
- ★5,0 / 40+ Google értékelés (legtöbb versenytársnál kevesebb/alacsonyabb)
- Koreai lash lift technika (nem mindenki specifikálja)
- 1 vendég egyszerre — teljes figyelem (differenciáló érv)
- Csomag-ajánlat: a vendégek 78%-a a Teljes Tekintet csomagot választja
- Versenyképes árak: 12.000 Ft lifting, 11.000 Ft szemöldök, 18.000 Ft csomag

---

## 1. Alacsonyan lógó gyümölcsök — Quick Wins (48 óra)

### A) Title tag optimalizálás (legtöbb hatás)

| Oldal | Régi title | Új title |
|---|---|---|
| Szempilla lifting | `Szempilla lifting és szemöldök laminálás Zugló \| FRUBEAUTY` | `Szempilla Lifting Zugló – 12.000 Ft \| ★5,0 · 40 Vélemény \| FRUBEAUTY` |
| Arckezelés | `Arckezelés Zuglóban — Janssen Cosmetics \| FRUBEAUTY` | `Arckezelés Zugló – 16.900 Ft-tól \| ★5,0 · 40 Vélemény \| FRUBEAUTY` |
| Sminkes | `Alkalmi és esküvői smink Zugló \| FRUBEAUTY` | `Esküvői és Alkalmi Smink Zugló – 13.000 Ft-tól \| ★5,0 · 40 Vélemény \| FRUBEAUTY` |
| Főoldal | `Kozmetika és smink Zuglóban — FRUBEAUTY \| Pecze-Kovács` | `Kozmetika Zugló — ★5,0 · 40+ Vélemény \| Arckezelés, Szempilla Lifting \| FRUBEAUTY` |

### B) Meta description optimalizálás

Minden oldalra bekerült: `★5,0 · 40+ Google-értékelés`, ár-horgony, CTA nyíl (`→ Foglalj most!`).

### C) Schema markup — AggregateRating (csillagok a Google-ben)

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "5.0",
  "reviewCount": "40",
  "bestRating": "5"
}
```

A 40+ db ★5,0 Google értékelés mostantól strukturált adatként is látható a Google-nek → **csillagok jelennek meg a keresőben** → CTR +30–50%.

### D) Google Business Profile (manuálisan elvégzendő)

- [ ] Kategóriák beállítása: **Szépségszalon + Kozmetikus**
- [ ] 10+ friss előtte/utána fotó feltöltése
- [ ] Q&A hozzáadása: "Mennyibe kerül a szempilla lifting?" → megjelenik a keresőben
- [ ] Minden Google értékelésre válasz

---

## 2. Kulcsszó-dominancia terv

### Pillér struktúra

```
SZINT 1 — Meglévő, optimalizált
└── szempilla lifting zugló          ← /szempilla-lifting-zuglo

SZINT 2 — Hiányzik, kritikus
├── szemöldök laminálás zugló        ← KÜLÖN ALOLDAL KELL (/szemoldok-laminalas-zuglo)
├── szempilla lifting budapest       ← főoldalra vagy külön aloldalra
└── szempilla lifting XIV kerület    ← beágyazni a meglévőbe

SZINT 3 — Long-tail, alacsony verseny
├── szempilla lifting ár budapest 2026
├── koreai szempilla lifting budapest
├── szempilla lifting vagy műszempilla
├── szemöldök laminálás mit jelent
├── szempilla lifting allergiás bőrre
└── szempilla lifting előtt mit kell tudni
```

### Keyword opportunity tábla

| Kulcsszó | Nehézség | Lehetőség | Ajánlott tartalom |
|---|---|---|---|
| szempilla lifting zugló | Alacsony | Magas | Meglévő oldal optimalizálása |
| szemöldök laminálás zugló | Alacsony | Magas | Új aloldal |
| szempilla lifting budapest | Közepes | Magas | Főoldal vagy aloldal |
| szempilla lifting vs műszempilla | Alacsony | Magas | Blog cikk / oldal szekció |
| szempilla lifting ár budapest 2026 | Alacsony | Magas | Blog cikk |
| koreai szempilla lifting | Alacsony | Közepes | Blog cikk |
| szemöldök laminálás mit jelent | Nagyon alacsony | Közepes | Blog cikk |
| szempilla lifting utáni ápolás | Nagyon alacsony | Közepes | Blog cikk |
| arckezelés zugló | Közepes | Magas | Meglévő oldal optimalizálása |
| janssen arckezelés budapest | Alacsony | Közepes | Meglévő oldal |

---

## 3. Tartalom-optimalizálási blueprint

### Meglévő /szempilla-lifting-zuglo oldal javításai (implementálva)

- **Title** frissítve: ár-horgony + csillag + social proof
- **Description** frissítve: ★5,0, ár, CTA nyíl
- **FAQPage schema** hozzáadva → featured snippet esély
- **Service schema** hozzáadva (2 kezelés, árral, területtel)
- **Új szekció**: "Szempilla lifting vagy műszempilla — melyiket válaszd?" → high-volume long-tail keyword lefedve

### Blog prioritás — 90 napon belül legtöbb forgalmat hozó cikkek

| # | Cím | Miért prioritás | Effort |
|---|---|---|---|
| 1 | Szempilla lifting vagy műszempilla – melyiket válasszd 2026-ban? | Magas keresési volumen, döntési fázis | 2–3 óra |
| 2 | Szempilla lifting árak Budapesten 2026 – mennyit fizess? | Vásárlói szándék, "ár" kulcsszó | 1–2 óra |
| 3 | Szemöldök laminálás: minden, amit tudni kell az első kezelés előtt | Edukáció, long-tail | 2–3 óra |
| 4 | Szempilla lifting utáni ápolás: 6 szabály, hogy 8 hétig tartson | Meglévő vendégek keresik | 1–2 óra |
| 5 | Koreai szempilla lifting vs. hagyományos – mi a különbség? | Differenciáló tartalom, alacsony verseny | 2 óra |

### Blog cikk struktúra (minden cikkre alkalmazandó)

1. **H1**: kulcsszó + vonzó ígéret
2. **Bevezető 3 mondat**: azonnal válaszolj a kérdésre (Google ezt jutalmazza)
3. **H2-k**: al-kérdések, amikre a felhasználó gondolhat
4. **CTA**: foglalás gomb a cikk közepén és végén
5. **Belső link**: minden cikk linkeli a `/szempilla-lifting-zuglo` főoldalt

### Hiányzó aloldalak (következő lépés)

- [ ] `/szemoldok-laminalas-zuglo` — önálló szemöldök laminálás oldal (pillanegra.hu ezt csinálja, nekünk nincs!)
- [ ] `/szempilla-lifting-budapest` — szélesebb lefedettségért

---

## 4. Technikai és On-Page SEO

### Implementált változtatások (2026. június 1.)

| Fájl | Változtatás | Hatás |
|---|---|---|
| `Layout.astro` | `aggregateRating` schema (★5,0 / 40 vélemény) | Csillagok Google-ben |
| `Layout.astro` | OG image relatív → abszolút URL | Social sharing javítás |
| `Layout.astro` | `additionalSchemas` prop — aloldalak saját schema-t adhatnak | Bővíthetőség |
| `Layout.astro` | `priceRange: "11000-26000 Ft"` | Pontosabb üzleti adat |
| `index.astro` | Title + description override (★5,0, ár) | CTR főoldalon |
| `index.astro` | FAQPage schema | Featured snippet esély |
| `index.astro` | Gallery per-kép alt szövegek | Képkeresés SEO |
| `szempilla-lifting-zuglo.astro` | Title + description (★5,0, 12.000 Ft, CTA) | CTR +80–150% |
| `szempilla-lifting-zuglo.astro` | FAQPage schema (6 kérdés) | Featured snippet |
| `szempilla-lifting-zuglo.astro` | Service schema (2 kezelés, árakkal) | Rich results |
| `szempilla-lifting-zuglo.astro` | "vs. műszempilla" összehasonlítás szekció | Long-tail keyword |
| `szempilla-lifting-zuglo.astro` | Gallery per-kép alt szövegek (8 kép) | Képkeresés SEO |
| `arckezeles-zuglo.astro` | Title + description (★5,0, 16.900 Ft, CTA) | CTR javítás |
| `arckezeles-zuglo.astro` | FAQPage schema (6 kérdés) | Featured snippet |
| `arckezeles-zuglo.astro` | Service schema (AggregateOffer, árral) | Rich results |
| `sminkes-zuglo.astro` | Title + description (★5,0, 13.000 Ft, CTA) | CTR javítás |
| `sminkes-zuglo.astro` | Gallery per-kép alt szövegek (9 kép) | Képkeresés SEO |
| `GalleryGrid.tsx` | `alts?: string[]` prop — per-kép alt szöveg támogatás | Komponens bővítés |

### Technikai ellenőrzőlista

| Ellenőrzés | Státusz | Megjegyzés |
|---|---|---|
| robots.txt | ✅ Helyes | `Allow: /`, sitemap-index.xml deklarálva |
| sitemap-index.xml | ✅ Elérhető | Astro automatikusan generálja |
| Canonical URL | ✅ Minden oldalon | Trailing slash konzisztens |
| HTTPS | ✅ | Secure |
| meta robots: index, follow | ✅ Minden oldalon | |
| WebP képformátum | ✅ | Minden kép WebP |
| Mobile viewport | ✅ | Helyes |
| lang="hu" + og:locale | ✅ | Magyar beállítás |
| OG image abszolút URL | ✅ Javítva | Korábban relatív volt |
| AggregateRating schema | ✅ Hozzáadva | ★5,0 / 40 vélemény |
| FAQPage schema | ✅ 3 oldalon | Szempilla, Arckezelés, Főoldal |
| Service schema | ✅ 2 oldalon | Szempilla + Arckezelés |
| Article schema (blog) | ✅ Már megvolt | BlogPosting típus |
| BreadcrumbList schema | ⏳ Következő sprint | Még nem implementálva |
| Core Web Vitals | ⏳ Ellenőrizni | pagespeed.web.dev |

### Elvégzendő technikai feladatok

- [ ] **Core Web Vitals ellenőrzés**: [pagespeed.web.dev](https://pagespeed.web.dev) → LCP, CLS, INP mérés
- [ ] **Mobile Friendly teszt**: [search.google.com/test/mobile-friendly](https://search.google.com/test/mobile-friendly)
- [ ] **Rich Results teszt**: [search.google.com/test/rich-results](https://search.google.com/test/rich-results) → schema ellenőrzés
- [ ] **BreadcrumbList schema** hozzáadása minden aloldalhoz
- [ ] `/szemoldok-laminalas-zuglo` önálló aloldal létrehozása

---

## Várható eredmény ütemterv

| Időszak | Intézkedés | Várható hatás |
|---|---|---|
| **48 óra** | Title + description + Schema deploy | CTR: 2,7% → 5%+ = +19 klikk/hét |
| **1–2 hét** | Google újraindexelés | Csillagok megjelennek SERP-ben |
| **2–4 hét** | GMB optimalizálás + belső linkek | Helyi csomag (térkép) megjelenés javul |
| **4–6 hét** | Szemöldök laminálás aloldal + 2 blog cikk | +2 URL rangsorol, long-tail forgalom indul |
| **8–12 hét** | 5 blog cikk + teljes schema | Pozíció 5 → 2-3 a fő kulcsszavakra |
| **3–4 hónap** | Teljes tartalom-dominancia | 300–500 organikus klikk/hó hirdetés nélkül |

### Számítás

```
Jelenlegi állapot:
- 766 impression/hét × 2,7% CTR = 21 klikk/hét ≈ 85 klikk/hónap

CTR javítás után (csillagok + optimalizált title):
- 766 impression × 5% CTR = 38 klikk/hét ≈ 152 klikk/hónap

Pozíció 3-ra javulás után + blog tartalom:
- ~2000 impression × 7% CTR = 140 klikk/hét ≈ 560 klikk/hónap
```

---

## Folyamatos feladatok (heti rutin)

| Feladat | Gyakoriság | Idő |
|---|---|---|
| 1 blog cikk megírása | Kéthetente | 2–3 óra |
| Google értékelésekre válasz | Ahogy érkezik | 5 perc |
| GMB post feltöltése | Hetente | 10 perc |
| GSC CTR monitoring | Hetente | 15 perc |
| Új Google értékelés kérése vendégektől | Minden kezelés után | 1 perc |

---

## Hivatkozások és eszközök

| Eszköz | URL | Mire használd |
|---|---|---|
| Google Search Console | [search.google.com/search-console](https://search.google.com/search-console) | CTR, pozíció, kulcsszavak monitorozás |
| Google PageSpeed Insights | [pagespeed.web.dev](https://pagespeed.web.dev) | Core Web Vitals ellenőrzés |
| Rich Results Test | [search.google.com/test/rich-results](https://search.google.com/test/rich-results) | Schema markup validálás |
| Google Business Profile | [business.google.com](https://business.google.com) | GMB kezelés |
| Mobile Friendly Test | [search.google.com/test/mobile-friendly](https://search.google.com/test/mobile-friendly) | Mobil kompatibilitás |

---

*FRUBEAUTY SEO dokumentum — 2026. június 1. · frubeauty.com*
