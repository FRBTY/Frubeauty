# FRUBEAUTY — Crawlability audit (Googlebot / no-JS nézet)

**Dátum:** 2026-06-30 · **Módszer:** élő `https://frubeauty.com` lekérése **Googlebot user-agenttel, JavaScript futtatása NÉLKÜL** (nyers szerver-válasz = az, amit egy nem-renderelő crawler / a Google első hulláma lát), + JS-renderelt DOM kontroll-összevetés Chrome-ban.

> **Verdikt: a site teljesen olvasható JS nélkül.** Az Astro statikusan szerver-rendereli a sziget-komponensek tartalmát is a HTML-be; nincs „üres SPA-shell", nincs JS-zárolt fő tartalom. Minden vizsgált oldal HTTP 200, helyes `lang=hu`, `robots: index, follow`, pontosan 1 `<h1>`, teljes heading-fa, gazdag JSON-LD — mind a nyers HTML-ben.

---

## 1. Oldalankénti olvashatóság (nyers HTML, JS nélkül)

| Oldal | Méret | Látható szöveg | H1 | JSON-LD a nyersben | Belső link |
|---|---|---|---|---|---|
| Főoldal | 148 KB | ~907 szó | 1 | BeautySalon+Person+WebSite gráf · FAQPage | 12 |
| /szemoldok-laminalas-zuglo/ | 190 KB | **~1670 szó** | 1 | gráf · FAQPage · Service · HowTo · 2×VideoObject · **BreadcrumbList** | 13 |
| /szempilla-lifting-zuglo/ | 189 KB | gazdag | 1 | gráf + Service + FAQ + Breadcrumb | ✓ |
| /arckezeles-zuglo/ | 159 KB | gazdag | 1 | gráf + Service + FAQ + Breadcrumb | ✓ |
| /sminkes-zuglo/ | 172 KB | gazdag | 1 | gráf + Service + FAQ + Breadcrumb | ✓ |
| /blog/ | 114 KB | gazdag | 1 | gráf | ✓ |
| /blog/koreai-szempilla-lifting/ | 99 KB | ~680 szó | 1 | gráf · **Article · BreadcrumbList · FAQPage** | 15 |
| /rolam/ | 88 KB | jó | 1 | gráf | ✓ |

A teljes heading-struktúra, a szolgáltatás-leírások, az „akinek szól" blokk, a folyamat-lépések, a vélemények, a galéria-altok, a GYIK **kérdései és válaszai**, és a kapcsolati adatok mind a nyers HTML-ben vannak — egy crawler hiánytalanul indexeli.

**A live oldal a mai session változtatásait már mutatja** (deploy megtörtént): a főoldali „Négy … kezelés", a „45+" social proof, a money-page `priceValidUntil`/`BreadcrumbList`, és a **blog `Article+BreadcrumbList+FAQPage`** mind élesben látszik. A blog `FAQPage` a törzs „Gyakori kérdések" szekciójából automatikusan generálódik — élőben verifikálva.

---

## 2. Sziget-architektúra (Astro islands)

Oldalanként 12–40 `astro-island`, de **mindössze 2 sziget renderel üres tartalmat szerver-oldalon:**
- **AnnouncementBar** — localStorage-számláló, szándékosan `null`-ig mountig (nem indexelhető tartalom).
- **CookieBanner** — szintén kliens-only, GDPR-widget (nem tartalom).

Minden más sziget (`ServicesGrid`, `TestimonialsGrid`, `FAQ`, `GalleryGrid`, `BlogSection`, `Reveal`, `ProcessSteps`, `AudienceList`, `HeroMedia` poszter stb.) **tartalmilag szerver-renderelt** — a `client:*` csak a hidratálást vezérli, a HTML-t nem. Egy no-JS crawler a teljes szöveget látja.

---

## 3. Két finom (top 0.1%) részlet — mindkettő SEO-biztos

### 3a. `content-visibility: auto` és a mérő-eszközök
A Layout a hajtás alatti szekciókra `content-visibility: auto`-t tesz (mobil-perf). Következmény: a `document.body.innerText` (layout-függő) **csak a festett, hajtás feletti szöveget adja vissza** (~136 szó) — ezért tűnhet „üresnek" egy naiv innerText-alapú ellenőrzőnek. A `main.textContent` (layout-független) viszont **910 szó ≈ a nyers 907** → a tartalom a DOM-ban van, csak nincs még festve. **A Google a renderelt DOM-ot olvassa, a `content-visibility:auto` SEO-biztos** (festési optimalizáció, nem rejtés). Nincs teendő — de fontos tudni, hogy innerText-tel mérni félrevezet.

### 3b. FAQ accordion (főoldal + 4 money page)
A `FAQ.tsx` a választ `{isOpen && …}` feltétellel rendereli, alapból zárva. Eredmény:
- **Nyers SSR-HTML (no-JS / első hullám): a válasz BENNE van** ✅ (verifikálva: script-eken kívül 1× előfordul). A crawler olvassa.
- **Hidratálás után (Google második, JS-renderelő hulláma): a React a zárt elemekből kiveszi** a választ a DOM-ból → a renderelt body-ban csak a kérdés marad.
- **Mitigáció:** a teljes Q&A a **FAQPage JSON-LD-ben** is ott van → a rich result és a kérdés-válasz jel független az accordiontól.

→ **Opcionális, low-prio fejlesztés:** a `FAQ.tsx` mindig rendereljen `<p>`-t a válasszal (CSS-szel `height:0`/`hidden` a csukás helyett a feltételes render helyett), hogy a válasz-szöveg a **hidratált DOM-ban is** crawlozható legyen. Nem kritikus (a JSON-LD + a nyers HTML lefedi), de tisztább.

---

## 4. Crawl-higiénia (HTTP-szint)

| Jel | Eredmény |
|---|---|
| `robots.txt` | 200, `text/plain`, AI-crawlerek engedve, sitemap hivatkozva ✅ |
| `sitemap-index.xml` | 200, `application/xml` ✅ |
| Homepage `X-Robots-Tag` | nincs (nem blokkol) ✅ |
| `Cache-Control` | `public, max-age=0, must-revalidate` (HTML-re rendben) |
| Non-slash → slash | `301 → …/szemoldok-laminalas-zuglo/` ✅ (kanonikus trailing slash) |
| www → apex | `301 → https://frubeauty.com/` ✅ |
| Régi Wix `/service-page/szempillafest%C3%A9s` | **`301 → /szempilla-lifting-zuglo/`** ✅ (a 06-24-es encoding-fix élesben működik — a money page-re visz, NEM a főoldalra) |
| Nemlétező URL | `404` ✅ (helyes státusz; branded 404-oldal) |

---

## 5. Összegzés

- **A te kérdésedre (no-JS crawler olvashatóság): IGEN, hiánytalanul olvasható.** A tartalom, a linkek, a schema mind a nyers HTML-ben van.
- **Zöld:** indexelhetőség, heading-struktúra, kanonikalizáció, redirectek, sitemap, robots, 404, gazdag schema.
- **Egyetlen apró, opcionális javaslat:** a FAQ-accordion válasz-szövegét tartsd a hidratált DOM-ban is (CSS-collapse a feltételes render helyett) — a no-JS és a JSON-LD út már most lefedi, ez csak a JS-renderelő második hullámnak tisztább.
- A `content-visibility:auto` miatt **innerText-tel ne mérj** olvashatóságot — `textContent`/nyers HTML a helyes mérce.

> Kapcsolódó: a teljesítmény/indexelés oldal a `FRUBEAUTY-GSC-AUDIT-2026-06-30.md`-ben; a kód-szintű SEO-audit a `FRUBEAUTY-TOP-AUDIT-2026-06-29.md`-ben.
