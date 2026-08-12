# FRUBEAUTY — Core Web Vitals + Best Practices audit

**Dátum:** 2026-06-09 · **Skillek:** `core-web-vitals`, `best-practices` (Lighthouse-alapú szabálykészlet)
**Audit-bázis:** forráskód (`src/`, `Layout.astro`), build kimenet (`dist/`), `netlify.toml`, `npm audit`, mentett Lighthouse-futások (`lh*.json`, mobil).

---

## Verdikt egy mondatban

A CWV-munka **profi szintű** (metrika-illesztett fallback fontok, `content-visibility`, preload + `fetchpriority`, minden képnek van `width/height`) — **de van egy néma, deploy-szintű regresszió a `netlify.toml`-ban, ami a teljes security-fejléckészletet és egy 301-redirectet kitöröl.** Ha ezt commitolod, a Best Practices pontszám és a SEO-redirect élesben elszáll. Ez az audit egyetlen tűzoltó-tétele.

---

## P0 — AZONNAL (deploy-blokkoló regresszió)

### 1. A working `netlify.toml` csonka — minden security-fejléc és a `/service-page/*` redirect elveszett

A lemezen lévő `netlify.toml` **29 sor, és egy komment közepén megszakad** (`# A /service-page régi Wix-prefix` — nincs lezárva). A commitolt (HEAD) verzió 63 soros, és tartalmazza:

- a `/service-page/*` gyűjtő 301-redirectet (a régi Wix-farok → kezdőlap),
- a teljes `[[headers]]` blokkot: **CSP, HSTS (`includeSubDomains; preload`), X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy**,
- a `/assets /img /media /fonts` immutable cache-fejléceket.

`git status`: ` M netlify.toml` → **uncommitted, csonka állapot.** Élesben a fejlécek most még megvannak, mert a *deployolt commit* még ép — de a következő `git commit` + push elviszi őket.

> **Megjegyzés a tegnapi audithoz:** a `WEB-QUALITY-AUDIT-2026-06-09.md` azt állítja, hogy „a fejlécek a netlify.toml-ban is ott voltak, csak a cat levágódott" és hogy „HSTS-upgrade alkalmazva". A lemezen lévő fájl ezt **cáfolja**: a fejlécek nincsenek benne, a HSTS-upgrade nem íródott ki. A korábbi audit téves konklúzióra jutott.

**Fix (1 parancs, visszaállítás a commitolt verzióra):**
```bash
git checkout HEAD -- netlify.toml
```
Ezután ellenőrizd, hogy az `includeSubDomains; preload` és a `max-age=63072000` rajta van-e (a HEAD-verzióban igen).

---

## P1 — Magas prioritás

### 2. [Security] Sérülékeny Astro verzió — `define:vars` XSS, és a Layout pont ezt használja

`npm audit`: **astro 5.18.1** → két ismert sérülékenység (1 moderate, 1 low):
- **GHSA-j687-52p2-xcff** — XSS a `define:vars`-ban hiányos `</script>` szanitizáció miatt. A `Layout.astro` az analytics-stubban **használ `define:vars`-t** (`ga4Id`, `googleAdsId`, `primaryGtagId`).

**Valós kockázat:** alacsony — a behelyettesített értékek a te `site.ts`-edből jönnek (nem felhasználói input), tehát gyakorlatban nem injektálható. De a Lighthouse/dependency-scan flageli, és elvi sérülékenység.

**Fix:** `npm audit fix --force` → Astro 6.4.5 (breaking, Astro 5→6 major). **Ne vakon futtasd**: az Astro 6 migrációt külön branchen, a build + összes aloldal vizuális ellenőrzésével. Ha most nem fér bele: a `define:vars` értékek statikusak, így a kockázat elviselhető a migrációig.

### 3. [LCP] Mobil LCP 3,4 s — a „needs work" sávban (cél ≤ 2,5 s)

Mentett mobil Lighthouse (`lh1.json`, a legjobb futás): **LCP 3,4 s, FCP 2,8 s, TBT 0 ms, CLS 0,029.** A localhost-futás (`lh.json`) rosszabb (LCP 4,8 s), de az fejlesztői gép-zaj. CLS és TBT **kiváló** — itt nincs teendő. Az LCP a szűk keresztmetszet.

LCP-elem: `/media/hero-poster.webp` (380×676), már preloadolva `fetchpriority=high`, `decoding=sync`, `loading=eager` — **a HTML-oldali optimalizáció kész.** Ami maradt:

- **Lighthouse `image-delivery-insight`: ~23 KiB megtakarítás** a hero-képen. Próbáld AVIF-ban (`<picture>` AVIF + WebP fallback), vagy szűkebb felbontásban — a 380px-es megjelenítéshez nézd meg, nem túl nagy-e a forrásfájl.
- **`unused-javascript`: ~21 KiB** — framer-motion / React sziget. Nézd meg, hány sziget hidratál a hero felett; a hero-szakasz lehetőleg legyen 0-JS (a fade CSS-ből megy, ez jó irány).
- **TTFB:** `lh1` 180 ms, `lh` 10 ms — Netlify CDN-en rendben lesz; ez lab-zaj.

---

## P2 — Finomhangolás

### 4. [Best Practices] CSP `script-src 'unsafe-inline' https:` — laza

A HEAD-beli CSP `script-src 'self' 'unsafe-inline' https:`. Az `'unsafe-inline'` + `https:` gyakorlatilag bármilyen HTTPS-scriptet és inline-t enged → a CSP XSS-védelmi értéke alacsony. Mivel sok az inline script (gtag-stub, pixel, UTM-decorator), a nonce-alapú CSP nem triviális statikus Astrónál. **Reális cél:** legalább `object-src 'none'` és `base-uri 'self'` (ez már megvan a HEAD-ben). Szigorítás csak akkor, ha az inline scriptek nonce-olhatók — ez nagyobb meló, alacsony megtérülés egy szalon-oldalon.

### 5. [Best Practices] Harmadik féltől nincs SRI

A gtag.js és a Meta Pixel futásidőben, dinamikusan töltődik (`document.createElement('script')`) — ezekre az SRI nem alkalmazható (a Google forgatja a fájlt). **Nincs teendő**, csak rögzítem, hogy tudatos kompromisszum.

### 6. Médiakönyvtár mérete

A korábbi audit 43 MB tömörítetlen videót említ. Nem ez az audit fókusza, de ha a hero videó a `media/`-ban nagy, az a mobil-adatforgalmat terheli (még ha nem is LCP). Külön kör.

---

## Amit JÓL csinál (ne nyúlj hozzá)

- Metrika-illesztett fallback fontok (`size-adjust`, `ascent/descent-override`) → font-swap **nem okoz CLS-t**. Ritka, hogy ezt valaki helyesen csinálja.
- `content-visibility:auto` + `contain-intrinsic-size` a hajtás alatti szekciókon → kevesebb layout a first paint előtt.
- Minden 13 képnek van `width`/`height` (0 hiányzik), 12/13 `loading=lazy`, hero `eager`.
- Inline-olt kritikus CSS (`inlineStylesheets:'always'`), `drop_console` terserrel, manualChunks szétbontás.
- Consent Mode v2, gtag eager-betöltés (a konverziómérés helyesen prioritizálva a szintetikus PSI-pont felett).

---

## Priorizált cselekvési terv

| # | Tétel | Hatás | Effort | Parancs / lépés |
|---|-------|-------|--------|-----------------|
| 1 | `netlify.toml` visszaállítás | **Kritikus** (security + SEO) | 1 perc | `git checkout HEAD -- netlify.toml` |
| 2 | Astro 5→6 upgrade (XSS) | Közepes | 1–3 óra | külön branch, `npm audit fix --force`, teljes vizuális regresszió-teszt |
| 3 | Hero-kép AVIF + méretezés | LCP −0,3–0,8 s | 30 perc | `<picture>` AVIF/WebP, forrásfájl ≤ megjelenítési méret |
| 4 | Hero feletti JS auditja | TBT/LCP | 1 óra | mérd, mely szigetek hidratálnak; hero = 0-JS |
| 5 | CSP szigorítás (opcionális) | Alacsony | nagy | csak ha az inline scriptek nonce-olhatók |

**Most azonnal a #1-et futtasd le** — minden más várhat, az nem.
