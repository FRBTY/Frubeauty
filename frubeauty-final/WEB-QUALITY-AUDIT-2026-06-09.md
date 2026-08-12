# FRUBEAUTY – Web Quality Audit

**Dátum:** 2026-06-09 · **Site:** https://frubeauty.com · **Stack:** Astro (SSG) + React islands + Tailwind, Netlify hosting

---

## FRISSÍTÉS (2026-06-09 második kör): élő böngészős audit + alkalmazott javítások

### Korrekciók az alábbi (statikus) jelentéshez — őszintén
A `frubeauty.com`-ot a saját Chrome-odban megnyitva, futásidőben mérve **két állításom téves volt**, ezeket javítom:

1. **„Nincs szerver-fejléc" → TÉVES.** Az élő oldal MINDEN security fejlécet visz, **HSTS-szel együtt**: `Strict-Transport-Security: max-age=31536000`, `Content-Security-Policy` (teljes), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`. A `netlify.toml`-ban is ott voltak — az első `cat` kimenete levágódott, és rosszul olvastam. A security-posture **erős**.
2. Ennek megfelelően a #2 „high priority" tétel lefokozva: maradt egy apró **upgrade** (HSTS-re `includeSubDomains; preload` + hosszabb max-age, és `/fonts` cache) — ezt alkalmaztam.

### Új lelet, amit csak böngészőből lehetett megfogni
**[A11y] Kontraszthiba a hero eyebrow-n.** A főoldali `FRUBEAUTY · Zugló, XIV. kerület` felirat `text-black` (tiszta fekete) a sötét hero-háttéren → **1.15:1 kontraszt**, WCAG AA bukás (159 vizsgált szövegelemből ez volt az egyetlen). Forrás: `src/pages/index.astro:141`. **Javítva** → `text-gold` (#B8884A a sötét háttéren ≈ 6:1, átmegy).

### Élő runtime-adatok (cache-elt nézet)
TTFB 108 ms · DOMContentLoaded 185 ms · load 727 ms · 13 kép mind `alt`+méretezett (CLS-biztos) · 78 link/gomb mind hozzáférhető névvel · skip-link ✓ · canonical/lang/JSON-LD ✓. (Cold-load LCP-hez a júniusi Lighthouse mérvadó: ~3,4 s prod.)

### Alkalmazott javítások (forrásban — a következő deploy viszi élesre)
| # | Javítás | Fájl |
|---|---|---|
| 1 | 4 túl hosszú title ≤60 karakterre (★5,0 megtartva) | `src/pages/{sminkes,szemoldok-laminalas,szempilla-lifting,arckezeles}-zuglo.astro` |
| 2 | arckezeles meta description 169→158 | `src/pages/arckezeles-zuglo.astro` |
| 3 | Hero eyebrow kontraszt: `text-black`→`text-gold` | `src/pages/index.astro:141` |
| 4 | HSTS upgrade (`includeSubDomains; preload`) + `/fonts` cache | `netlify.toml` |
| 5 | 7 videó újrakódolva 720px/H.264/CRF30, hang nélkül: **34 MB → 13 MB (-62%)** | `public/media/*.mp4` (eredetik: `_media-originals-backup/`) |

**NEM** alkalmaztam (szándékosan): font-preload visszarakása — a `Layout.astro` (362–396. sor) metrika-illesztett fallback fontokkal direkt eldobta, hogy az LCP-kép kapja a sávszélességet. Helyes döntés, nem rontom el.

### Browser-audit korlát
A sandboxban friss Lighthouse/agent-browser nem futott (Chromium-letöltés allowlist-tiltott, a mount bash-ből nem enged felülírást, lemez 96%-on). Ezért a saját Chrome-odhoz csatlakozva, az **élő** oldalon auditáltam. Cold-load Lighthouse-számhoz: PageSpeed Insights vagy `npx lighthouse https://frubeauty.com` deploy után.

### Build-státusz (2026-06-09)
Lokális rebuild-et megkíséreltem `/tmp`-ben friss `npm install`-lal: a függőségek **tisztán települtek** (helyes linux rollup binár, verziók pontosan a lockfile szerint — astro 5.18.1, tailwind 3.4.19, postcss 8.5.14). A build viszont elakadt egy ponton: **a Linux-mount a `Layout.astro`-t bash-ből 562 sorban csonkolva adja vissza** (záró `</style>` nélkül), miközben a valódi, Windows-oldali fájl ép (582 sor, korrekt lezárás). Ez **mount-olvasási artefakt, NEM forráshiba** — a production Netlify-build a teljes, git-ben lévő forrásból épül, így ott nem jelentkezik.

**Következmény:** lokális friss `dist`-et a sandbox nem tud megbízhatóan előállítani. Nem is szükséges: a Netlify a `npm run build` paranccsal git-ből rebuildel. A teendő egyetlen, általam nem végezhető lépés: **commit + push (vagy Netlify deploy trigger)**.

**Egy ellenőrzendő pont:** a videók újrakódolása a shell-en át történt. Mielőtt commitolsz, nézd meg a `public/media/*.mp4` méreteket a saját mappádban (hero ≈ 2,8 MB, többi 1–3,2 MB) — ha bármelyik még a régi 5–8 MB-os, futtasd újra az `ffmpeg`-et helyben. Az eredetik: `_media-originals-backup/`.

---

## Mérési korlát (olvasd el)

Friss Lighthouse-t **nem** tudtam futtatni: a sandboxban nincs Chrome, az élő domaint az allowlist tiltja, a Chrome-letöltés is tiltott. Ezért:

- **Performance** = a meglévő, 2026-06-01-i Lighthouse-futások (`lh1–4.json`, a production `dist` preview ellen). Reprezentatív, de 8 napos.
- **A11y / SEO / Best Practices** = a **jelenlegi** `dist` build statikus elemzése (valós kimenet, nem becslés).

Ha 100%-os friss számokat akarsz: `npx lighthouse https://frubeauty.com --output=json` egy olyan gépen, ahol van Chrome — vagy PageSpeed Insights. A javaslatok ettől függetlenül érvényesek.

---

## Összegzés

| Kategória | Állapot | Kritikus | High | Medium |
|---|---|---|---|---|
| Performance | ~85–87 (prod) | 0 | 1 | 2 |
| Accessibility | Erős | 0 | 0 | 1 |
| SEO | Erős | 0 | 0 | 2 |
| Best Practices | Hiányos infra | 0 | 1 | 1 |

**Nyers verdikt:** A frontend mérnöki munka jó (lazy video IntersectionObserverrel, poster `fetchpriority=high`, `font-display`, explicit kép-méretek → CLS 0.029). A pénzt nem itt veszíted. A két valódi vakfolt: **(1) 2–8 MB-os tömörítetlen MP4-ek** és **(2) hiányzó szerver-oldali fejlécek (security + cache) a `netlify.toml`-ban.** Mindkettő infra-szintű, olcsón javítható, és a build minőségéhez képest aránytalanul húzza le az élményt és a bizalmi jeleket.

---

## High priority

### 1. [Performance] Tömörítetlen videók — 43 MB médiakönyvtár
A `/media` MP4-ek brutálisak:

```
hero.mp4                          7.1 MB
szempilla-lifting-video...mp4     8.2 MB
smink-oldal-video...mp4           6.0 MB
arckezeles-zuglo.mp4              4.9 MB
szemoldok-laminalas-...mp4        3.3 MB
```

A hero videó lazy-mountol és `preload="metadata"`, szóval az **initial** payload rendben (727 KiB, LCP 3.4 s) — DE amint a videó lejátszódik, mobiladaton 7 MB-ot tölt egyetlen díszítő (`aria-hidden`) loopért. Ez pazarlás és a tényleges felhasználói LCP/élmény-rontó tényező a hajtás alatti szekciókban.

**Fix (priorizált):**
1. Transzkódold mindet H.264 helyett **H.265/AV1 + WebM** páros forrásra, és csökkentsd a bitrátát. Cél: minden klip **< 1.5 MB**.
   ```bash
   # ~70-85% méretcsökkenés, vizuálisan észrevehetetlen loop-videónál
   ffmpeg -i hero.mp4 -vf "scale=720:-2" -c:v libx264 -crf 30 -preset slow -an -movflags +faststart hero-opt.mp4
   ffmpeg -i hero.mp4 -vf "scale=720:-2" -c:v libvpx-vp9 -crf 38 -b:v 0 -an hero.webm
   ```
2. A `<video>`-ba tegyél több `<source>`-t (webm először), és `-an` (hangsáv eldobása — némított loopnál felesleges).
3. A loop-videó max 720px széles legyen (a konténer `max-w-[440px]`), most valószínűleg túlméretezett.

### 2. [Best Practices] Nincs egyetlen szerver-fejléc sem a `netlify.toml`-ban
A `netlify.toml` csak `redirects`-et tartalmaz. Hiányzik: **security headerek** és **cache-control** a nem-fingerprintelt assetekre (`/media`, `/img`, `/fonts`).

**Fix — másold be:**
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Strict-Transport-Security = "max-age=63072000; includeSubDomains; preload"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"

[[headers]]
  for = "/media/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/img/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/fonts/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```
(CSP-t külön, óvatosan vezesd be — a gtag/Google inline scriptek miatt előbb `Content-Security-Policy-Report-Only`-val teszteld.)

---

## Medium priority

### 3. [SEO] Túl hosszú title tagek (SERP-ben levágódnak)
| Oldal | Hossz | Ideális |
|---|---|---|
| `sminkes-zuglo` | **79** | ≤ 60 |
| `szemoldok-laminalas-zuglo` | 70 | ≤ 60 |
| `szempilla-lifting-zuglo` | 68 | ≤ 60 |
| `arckezeles-zuglo` | 65 | ≤ 60 |

A `sminkes-zuglo` 79 karaktere a Google-ban ~620px fölött elvágódik — a „| FRUBEAUTY" és a vélemény-szám eltűnik. Rövidítsd: a brand + ár + ★5,0 közül max kettőt tarts meg. Pl. `Esküvői & Alkalmi Smink Zugló – 13.000 Ft-tól | FRUBEAUTY` (~56).

### 4. [SEO] Canonical trailing-slash inkonzisztencia
A szolgáltatás-/jogi/főoldalak `/`-re végződnek, a **blogposztok nem** (`/blog/eskuvoi-smink-arak-budapest` slash nélkül). Egységesítsd (Astro `trailingSlash` config + canonical), különben duplikációs jelzéseket küldhetsz. Önmagában nem kritikus, de tiszta jel a crawlernek.

### 5. [Performance] Fontok nincsenek preloadolva
A Fraunces woff2-k (60–82 KB) self-hosted, `font-display` rendben — de **nincs `<link rel="preload">`**. A render-kritikus heading-font (Fraunces normal) preloadja faraghat az FCP 2.8 s / LCP 3.4 s-ből.
```html
<link rel="preload" href="/fonts/fraunces-latin-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/geist-400.woff2" as="font" type="font/woff2" crossorigin>
```

### 6. [A11y] Kontraszt nem ellenőrizhető statikusan
Minden gépi a11y-jel jó (`lang=hu`, oldalanként 1×`<h1>`, minden `<img>`-nek van `alt`, skip-link megvan, `aria-label`-ek a helyükön). Amit kódból nem tudok mérni: **szín-kontraszt** (WCAG AA 4.5:1). A világos arany/krém paletta gyanús — futtass axe DevTools-t vagy Lighthouse a11y-t egy böngészőben, és ellenőrizd a halvány szövegeket háttéren.

---

## Ami már most jó (ne bántsd)

- **CLS 0.029, TBT 0 ms** — explicit kép-méretekből, kiváló.
- **HeroMedia** logika: poster eager + `fetchpriority=high`, video lazy + `prefers-reduced-motion` tisztelet — ez profi munka.
- **Strukturált adat** gazdag: szolgáltatás-oldalakon 6–7 JSON-LD blokk (LocalBusiness/Service/FAQ/Breadcrumb).
- **robots.txt** AI-crawlereket is enged (GPTBot, PerplexityBot, ClaudeBot) — jó GEO-húzás.
- **301 redirectek** a régi Wix-URL-ekről — a rangsor-átörökítés rendben.
- **GA4** (`G-L276HPZTL5`) él. **llms.txt** megvan. Sitemap + canonical mindenhol.

---

## Akcióterv (sorrendben)

1. **Ma:** `netlify.toml` security + cache fejlécek (#2) — 10 perc, azonnali bizalmi + sebesség-nyereség.
2. **Ezen a héten:** videók transzkódolása < 1.5 MB-ra (#1) — a legnagyobb valós felhasználói nyereség.
3. **Ezen a héten:** `sminkes-zuglo` + másik 3 title rövidítése ≤ 60 (#3) — CTR a SERP-ben.
4. **Következő sprint:** font-preload (#5), canonical egységesítés (#4), böngészős a11y-kontraszt audit (#6).
5. **Verifikáció:** deploy után `npx lighthouse https://frubeauty.com --preset=desktop` + mobil, és vesd össze az itteni baseline-nal (LCP 3.4 s → cél < 2.5 s).
