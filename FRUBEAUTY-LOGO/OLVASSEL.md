# FRUBEAUTY — logócsomag

**Készült:** 2026-08-07 · a `frubeauty.com` saját arculati rendszeréből, nem külső sablonból.

## Mi az arculati alap

Minden érték a weboldal `tailwind.config.mjs`-éből és a tényleges tipográfiából jön, nem közelítés:

| | Érték |
|---|---|
| Betű — név | **Fraunces** (a site `font-display`-e), 400, `letter-spacing: -0.022em` (a site `tracking-tightest-` értéke) |
| Betű — alcím | **Geist** 500, nagybetűs, `letter-spacing: 0.18em` (a site `tracking-caps` értéke, ugyanaz, amit a kiskapitális címkék használnak) |
| Sötét alap | `#0F0B08` (inkDeep) → `#221C17` (inkSoft) sugaras átmenettel — a kezdőlap lámpafény-hangulatának visszafogott utalása |
| Világos alap | `#F9F2E8` (linen) |
| Szöveg sötéten | `#F5E8D3` (cream) |
| Arany | `#B8884A` (gold) · `#C9A36C` (goldSoft) · `#8E6730` (goldDeep) · `#D9B27D` (goldGlow) |

A monogram dőlt **F**-je szándékosan ugyanaz a megoldás, mint a `public/favicon.svg`-ben — így a böngészőfül, a katalógus-profilkép és a közösségi avatar ugyanazt a jelet mutatja.

## Melyik fájlt mire

| Cél | Fájl |
|---|---|
| **Katalógus-logó** (Cylex, Aranyoldalak, Firmania…) | `frubeauty-logo-square-dark-1024.png` |
| **Profilkép / avatar**, ahol körre vágnak (Google Business, Facebook, Instagram) | `frubeauty-monogram-dark-1024.png` |
| **Apple Business Connect** logó (1:1, min. 1024×1024) | `frubeauty-monogram-dark-2048.png` |
| Kis méret, kedvencek, app-ikon | `frubeauty-monogram-dark-512.png` |
| Világos háttér, nyomtatás, számla, árlista | `…-light-…` változatok |
| Partneroldal, e-mail-aláírás, sötét háttérre | `frubeauty-wordmark-cream.png` (átlátszó háttér) |
| Ugyanaz világos háttérre | `frubeauty-wordmark-ink.png` (átlátszó háttér) |

A négyzetes fájlok **teljes felületűek, lekerekítés nélkül** — szándékosan: a legtöbb felület maga vágja körre vagy lekerekített négyzetre, és egy előre lekerekített sarok ilyenkor csúnyán duplázódna.

## Használati szabályok

- **A monogram körvonala ne kerüljön a szélére.** A körgyűrű a vászon 74%-a; ez a védőtávolság szándékos, hogy a körre vágás ne harapjon bele.
- **A wordmark alcímét ne írd át.** A „KOZMETIKA · ZUGLÓ" a Google Business kategóriáddal (Kozmetikus) és a fő helymegjelöléssel egyezik — ez ugyanaz a konzisztencia-elv, mint a NAP-nál.
- **Ne nyújtsd.** Minden fájl négyzetes vagy fix arányú; méretezéskor tartsd az arányt.
- **Sötét változat sötét háttérre, világos világosra.** A krém wordmark fehér háttéren gyakorlatilag láthatatlan.

## Formátum

A fájlok PNG-k, 512–2048 px között. Ez minden felsorolt célra bőven elég (a katalógusok és a Google/Apple is rasztert kér, jellemzően max. 1024–2048 px).

Vektoros (SVG) változat nincs: a wordmark valódi Fraunces szedés, és a görbésítéshez font-konvertáló eszköz kellene, ami nincs a gépen. Ha egyszer nyomdai anyag kell (tábla, matrica), szólj — akkor érdemes megcsinálni.

## Újragenerálás

A `_*.html` fájlok a források: mindegyik önálló, base64-be ágyazott Fraunces és Geist betűkkel, tehát internet nélkül is renderelnek. Fejléc nélküli Chrome-mal képezhetők le:

```bash
chrome --headless --disable-gpu --screenshot=out.png --window-size=1024,1024 _square.html
```

Átlátszó háttérhez tedd hozzá: `--default-background-color=00000000`
