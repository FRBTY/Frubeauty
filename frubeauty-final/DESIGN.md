# Design System: FRUBEAUTY

## 1. Visual Theme & Atmosphere
Kalibrált, galéria-szerű nyugalom puha bőr-tónusokkal. A jelenlegi bézs paletta megmarad — túl nagy ugrás lenne fekete-fehér prémiumra váltani, és a vendégbázis számára a meleg tónus ismerős. De a kompozíció szigorúbb lesz: aszimmetrikus hero, kevesebb fekete CTA-blokk, több negatív tér.

## 2. Color Palette & Roles

Kalibrálva v1.1-ben **szem-komfort** céljából — a body szöveg kicsit lágyabb, hogy a hosszú olvasás ne fárasszon.

| Token | Hex | Szerep |
| --- | --- | --- |
| Cream Canvas | #F4ECE1 | Elsődleges háttér. Lekalibrálva a v1.0 (#F5EDE3) sárgásabb tónusáról. |
| Linen | #F9F2E8 | *Új.* Cream és Ivory közötti réteg — finom layered szekciókhoz (trust bar). |
| Warm Ivory | #FBF6EF | Másodlagos felület, kártyák. |
| Soft Sand | #E8D9C5 | Hangsúlyos felület, esküvői/luxus szekciók. |
| Espresso Ink | #1F1A16 | **Csak** headline-ok + key emphasis. Warm near-black. |
| Ink Soft | #2E2620 | *Új.* Body paragrafusok. Lágyabb, mint az ink — kevésbé strain. |
| Stone | #6B6058 | Másodlagos szöveg. Lekalibrálva #7A6F65-ről, hogy AA-t biztosítson. |
| Stone Muted | #8E847A | Caption / meta / sorszám. Szándékosan alacsony kontraszt. |
| Whisper Line | rgba(31,26,22, 0.07) | Elválasztó vonalak. |
| Whisper Strong | rgba(31,26,22, 0.14) | Erősebb border (FAQ +/× ikon). |
| Rose Accent | #B86A5A | Egyetlen kiemelő — process step szám, link hover, csillagok. |
| Rose Soft | #C88577 | *Új.* Hover állapot a sötét háttéren lévő email linkre. |

**Kontraszt-ellenőrzés (WCAG):**
- Ink (#1F1A16) on Cream (#F4ECE1) → 14.2:1 (AAA, headline-okra)
- Ink Soft (#2E2620) on Cream → 11.4:1 (AAA, body)
- Stone (#6B6058) on Cream → 4.85:1 (AA body, AA+ large)

**Banned:** pure black, neon rózsaszín, arany gradient, AI-purple, glow-effektek.

## 3. Typography Rules
- **Display:** Fraunces (változó tengelyek SOFT 50, OPSZ 100, weight 300–600).
- **Body:** Geist weight 400/500.
- **Banned:** Inter, Times New Roman, Georgia, kézírásos display fontok, dupla szerif-stack.

**Skála:**
- Hero H1: clamp(2.5rem, 6vw, 4.5rem), line-height 1.05, letter-spacing -0.022em
- H2: clamp(2rem, 4vw, 3rem), line-height 1.1
- H3: clamp(1.25rem, 2vw, 1.5rem), line-height 1.2
- Body: 17px desktop / 16px mobile, line-height **1.7** (v1.1: emelve 1.65-ről)
- Caption: 0.8125rem, letter-spacing 0.04em, uppercase

**Eye-comfort frissítések v1.1:**
- Body méret desktopon 16px → 17px.
- Paragrafusokon line-height 1.65 → 1.7.
- Body szöveg külön színt kapott (inkSoft) a headline-tól.

## 4. Component Stylings
- **Primary CTA:** Espresso fill, ivory szöveg, pill radius 999px. Active: scale 0.97 + translateY 1px. *Magnetic spring* pointer-tracking 18% strength — `<MagneticCTA>`.
- **Secondary CTA:** Outline 1px Espresso, ugyanaz a radius.
- **Card (szolgáltatás):** Warm Ivory háttér, border 1px Whisper Line, radius 24px. Hover-fine: translateY -2px, kép scale 1.03. Entry: clip-path inset(0 0 100% 0) → 0.
- **Image treatment:** aspect-ratio 4/5 vagy 3/2. Radius 16px. Sosem kör.
- **NavBar:** Auto-hide scroll-down, show-on-scroll-up. Cream/85 backdrop-blur solid mode-ban.

## 5. Layout Principles
- Hero aszimmetrikus: bal 60% szöveg, jobb 40% kép.
- Sosincs 3 egyforma kártya egymás mellett.
- Max-width container: 1280px.
- Függőleges szekció-spacing: clamp(4rem, 10vw, 7rem).

## 6. Motion & Interaction

**v1.1 update:** Bevezettük a **Framer Motion**-t **csak** React-szigetekben (`client:visible`/`client:load`). A statikus szekciók nem hidrátálódnak. Hover, focus, active továbbra is natív CSS.

**Easing curve-ök:**
- `--ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1)` — entrances
- `--ease-in-out-strong: cubic-bezier(0.77, 0, 0.175, 1)` — on-screen movement
- `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)` — FAQ height

**Animáció-budget:**
- Bejövő szekció: opacity + y 24→0, 650ms easeOutStrong, useInView once.
- Stagger gyerek: 60ms köz, 550ms egyenként.
- Hero parallax: ±40px, useScroll + useTransform.
- Service kártya kép: clip-path 900ms easeOutStrong.
- Magnetic CTA: spring (stiffness 140, damping 18, mass 0.6), 18% strength.
- FAQ accordion: height 360ms easeDrawer + opacity 280ms (delay 50ms).
- NavBar: y 0/-80, 400ms easeOutStrong.
- Gomb active: 100ms, scale 0.97 + translateY 1px (CSS).

**Soha NE** legyen aktív: marquee, bouncing chevron, scroll-arrow, looping micro-pulse, kerek progress bar.

**`prefers-reduced-motion`:** csak opacity-fade, semmi translate. Stagger 0ms. Parallax kikapcsol. Magnetic inert. NavBar nem rejtőzik.

## 7. Anti-Patterns (Banned)
- Emoji a fő tartalomban
- "Kattints ide!" CTA
- Több mint egy primary CTA per szekció
- Centered hero
- Stock-szépségmodell képek a saját portfolió helyett
- Üres melléknevek konkrét állítás nélkül ("prémium", "egyedi")
- Underline minden H2-n
- Google review screenshot beágyazva
- `transition: all` — mindig specifikus property
- `scale(0)` entry — minimum scale(0.95) + opacity
- `ease-in` UI elemen
- Hover effekt media query nélkül
- Framer Motion `x`/`y` shortand prop hardware acceleration nélkül

## 8. Component Inventory (v1.1)

React-szigetek:
- `<NavBar client:load>` — scroll-aware fejléc
- `<ParallaxPortrait client:load>` — hero kép, ±40px parallax
- `<MagneticCTA client:load|visible>` — primary gombok
- `<Reveal client:load|visible>` — univerzális fade wrapper
- `<StaggerGroup client:visible>` — szülő container
- `<ServicesGrid>`, `<AudienceList>`, `<ProcessSteps>`, `<TestimonialsGrid>`, `<GalleryGrid>` — stagger grid-ek
- `<FAQ client:visible>` — AnimatePresence accordion

Statikus (zero JS): Trust Bar, Rólam, Footer, Kapcsolat data-listák.
