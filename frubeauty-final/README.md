# FRUBEAUTY — főoldal redesign (v1.1)

Astro + Tailwind + React-szigetek alapú statikus oldal, Netlify-re optimalizálva.
SEO-barát (meta + OG + LocalBusiness JSON-LD), gyors — csak a motion-szigetek hidrátálódnak, a többi szekció zero-JS.

## Mi változott a v1.0-hoz képest

- Hozzáadtuk a Framer Motion-t **csak** ott, ahol látható értéke van — a többi szekció statikus marad.
- Színpaletta finomhangolva eye-comfort céllal (új `linen`, `inkSoft`, `stoneMuted`, `roseSoft` tokenek).
- Body szöveg 16px → 17px desktopon, line-height 1.65 → 1.7.
- NavBar most auto-hide scroll-down / show-on-scroll-up logikával.
- FAQ accordion: smooth height + opacity (native `<details>` helyett).
- Hero portré: subtle useScroll-alapú parallax (max ±40px).
- Magnetic CTA: spring-tracked pointer az elsődleges foglalás gombokon.

## Mit kell pótolnod telepítés előtt

1. **Képek** a `public/img/` mappába:
   - `hero-fruzsina.jpg` (4:5, min 1200×1500)
   - `about-fruzsina.jpg`
   - `service-arckezeles.jpg`, `service-szempilla.jpg`, `service-smink.jpg`
   - `gallery-1.jpg` … `gallery-8.jpg`
   - `og-image.jpg` (1200×630)
   - `favicon.svg`

2. **Cseréld le a `src/pages/index.astro` `config` objektumban:**
   - `booking` — a valódi Booksy/Fresha link
   - `googleReviewsUrl` — a Google Maps oldal konkrét URL-je
   - `instagram`, `facebook`

3. **Layout.astro Schema.org:** GPS koordinátákat pontosítsd (47.5121, 19.1108 becsült).

4. **Pótlandó aloldalak** (külön körben):
   - `/arckezeles`, `/szempilla-szemoldok`, `/smink`, `/adatvedelem`

## Telepítés

```bash
npm install
npm run dev      # localhost:4321
npm run build    # statikus build a /dist mappába
```

Új függőségek v1.1-ben: `@astrojs/react`, `react`, `react-dom`, `framer-motion`.

## Deployment Netlify-re

**Git-tel (ajánlott):** Push GitHub-ra → Netlify import → `netlify.toml`-t automatikusan felismeri.

**Drag & drop:** `npm run build`, majd `dist` mappa → https://app.netlify.com/drop

## Teljesítmény-cél és JS-budget

Célok: LCP < 2.0s, INP < 100ms, CLS < 0.05.

**JS budget:** A motion-szigetek + React + Framer Motion együttese ~75-90 KB gzipped. Csak a motion-szigetekre rakódik rá — a statikus szövegszekciók (Rólam, Trust Bar, Footer) zero-JS-ek. A NavBar és ParallaxPortrait `client:load` (azonnal), a többi `client:visible` (lazy).

Ha a JS-budget szorítóvá válik:
- A `<MagneticCTA>` cserélhető natív CTA-ra (a magnetic dekoráció).
- A `<Reveal>` és `<StaggerGroup>` visszacserélhető natív CSS `data-reveal`-re (v1.0 patternje).

## React-szigetek áttekintése

| Komponens | Hidráció | Cél |
| --- | --- | --- |
| `<NavBar>` | client:load | Scroll-tracking, azonnal kell |
| `<ParallaxPortrait>` | client:load | Hero, view-port felett van |
| `<Reveal>` (hero) | client:load | Első impresszió |
| `<MagneticCTA>` (hero) | client:load | Hero CTA |
| Minden más motion | client:visible | Lazy, IntersectionObserver alapon |

## Mit NEM tartalmaz szándékosan

- Cookie banner — csak analitikával kell.
- Form — a foglalás Booksy/Fresha rendszeren megy.
- Page transitions — Astro multi-oldalas, View Transitions külön körben.
- Scroll progress bar — SaaS-pattern, szalon-oldalra nem illik.

## Következő lépések

1. Aloldalak (arckezelés, szempilla, smink) — ugyanezt a komponens-szettet használjuk.
2. Adatvédelmi nyilatkozat (kötelező).
3. Esetleg blog/Tippek a bőrápolásról — long-tail SEO.
4. View Transitions API ha lesz több oldal.
