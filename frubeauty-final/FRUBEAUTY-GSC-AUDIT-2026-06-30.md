# FRUBEAUTY — Google Search Console audit (top 0.1%)

**Property:** `sc-domain:frubeauty.com` · **Snapshot:** 2026-06-30 (élő, belépett GSC)
**Teljesítmény-időszak:** GSC Performance alapnézet, az adat 2026-06-27-ig (utolsó frissítés ~4,5 órával a lekérés előtt) · **Forrás:** közvetlen GSC + `site:` kontroll-keresés

> Módszer: a riport élő GSC-adatból készült (Performance lekérdezés-/totál-szint, Page Indexing, Sitemaps, CWV, Enhancements, Links, Manual Actions/Security) + külső `site:` kereszt-ellenőrzés az indexeltségre. Nem becslés.

---

## 0. Vezetői összefoglaló (a 3 legnagyobb kar)

1. **A fej-kulcsszavak a 1. találati oldal ALJÁN ragadnak.** „szemöldök laminálás" = **202 megjelenés, pozíció 9,9, 2% CTR**; „szemöldök" = **75 megjelenés, pozíció 9,7, 0% katt**. A `/szemoldok-laminalas-zuglo/` money page **MÁR INDEXELT** (`site:` = 1 találat — a 06-24-es „nincs indexelve" lelet ELAVULT), tehát ez már **nem indexelési, hanem rangsor-erő** kérdés. Ezt top 5-be felhúzni a #1 forgalmi nyereség.
2. **Mindössze 1 külső backlink** (notino.hu → főoldal). Ez a legnagyobb off-page gyengeség, és közvetlenül magyarázza, miért nem tud a money page feljebb jönni. A kar: citációk + linkek.
3. **CTR-rés erős pozíciókon a lokális pack miatt:** „szempilla stylist" (poz 2,1 / 2,2% CTR), „kozmetikus" (poz 2,7 / 2,1%), „szemöldök formázás" (poz 2,5 / 3%). A térképes pack a szerves találat fölött visz el kattintásokat → a kar itt a **GBP** (folyamatban) + cím/meta, nem önmagában a rangsor.

**Higiénia rendben:** nincs Manual Action, nincs Security issue, sitemap Success, breadcrumb rich result érvényes.

---

## 1. Teljesítmény — totálok

| Mutató | Érték |
|---|---|
| Összes kattintás | **87** |
| Összes megjelenés | **2 620** |
| Átlagos CTR | **3,3%** |
| Átlagos pozíció | **6,1** |

Olvasat: a 6,1-es átlagpozíció = jellemzően az 1. oldal alja / 2. oldal teteje. A 3,3% CTR-t a lokális (térképes) pack nyomja le a helyi lekérdezéseken — ez részben strukturális, nem cím/meta-hiba.

---

## 2. Lekérdezés-szintű elemzés + CTR-rés

A 120 lekérdezésből a nagy megjelenés-számú, akcióképes sorok (CTR a pozícióhoz mért elvárással szemben):

| Lekérdezés | Megj. | Poz. | CTR | Diagnózis | Kar |
|---|---|---|---|---|---|
| **szemöldök laminálás** | 202 | 9,9 | 2% | Fej-term a p1 alján | **Rangsor↑** (lásd §7) |
| szemöldök | 75 | 9,7 | 0% | p1 alja, 0 katt | Rangsor↑ |
| 1 nap szempilla | 61 | 3,6 | 0% | Intent-eltérés (műszempilla-hosszabbítás, nem lifting) | Hagyd — irreleváns |
| szempilla emelés | 51 | 5,8 | 0% | p1 alja | Rangsor↑ |
| **kozmetikus** | 48 | 2,7 | 2,1% | Erős poz, gyenge CTR | **GBP + cím/meta** |
| **szempilla stylist** | 46 | 2,1 | 2,2% | Erős poz, gyenge CTR | **Cím/meta + sitelinks** |
| szemöldök laminálás meddig tart | 36 | 8,2 | 2,8% | Blogposzt a p1 alján | Rangsor↑ (belső link) |
| szemöldök formázás | 33 | 2,5 | 3% | Erős poz, gyenge CTR | GBP + cím/meta |
| szempilla budapest | 28 | 4,2 | 3,6% | Közepes | Rangsor↑ |
| szemöldök emelés | 28 | 5,5 | 0% | 0 katt | Rangsor↑ |
| szempilla | 70 | 4,2 | 5,7% | OK | — |
| szemöldök laminálás budapest | 16 | 2,6 | 6,2% | OK | — |
| szempilla lifting budapest | 1 | 1,0 | 100% | OK (kis volumen) | — |

**Két minta rajzolódik ki:**
- **(A) Pozíció-probléma:** a legnagyobb megjelenés-számú fej-termek (szemöldök laminálás, szemöldök, szempilla emelés) a 9–10. helyen állnak → a felhúzás a tét, nem a snippet.
- **(B) CTR-rés erős pozíción:** kozmetikus (2,7), szempilla stylist (2,1), szemöldök formázás (2,5) — itt a poz jó, de a CTR a lokális pack miatt alacsony → GBP + cím/meta + (lehetőség szerint) FAQ/sitelink rich result.

> Megjegyzés: a „szempilla hosszabbítás", „1 nap szempilla", „műszempilla", „lash extensions" lekérdezések eltérő szolgáltatási intent (hosszabbítás, nem lifting) — 0 katt mellett **ezek nem hiba**, hanem helyesen szűr a snippet. Nem prioritás.

---

## 3. Indexelés (Page Indexing)

| | Oldalak |
|---|---|
| **Indexelt** | **18** |
| **Nem indexelt** | **15** (6 ok) |

Nem-indexelt bontás:

| Ok | Forrás | Oldalak |
|---|---|---|
| Discovered – currently not indexed | Google | **5** |
| Crawled – currently not indexed | Google | **3** |
| Page with redirect | Website | 3 |
| Redirect error | Website | **2** |
| Excluded by ‘noindex’ tag | Website | **1** |
| Not found (404) | Website | 1 |

- **8 oldal (5 discovered + 3 crawled) „talált, de nem indexelt".** `site:`-exact ellenőrzéssel a nem-indexelt **blogposztok pontosan (2026-06-30):**
  1. `koreai-szempilla-lifting`
  2. `szempilla-lifting-arak-2026`
  3. `szempilla-lifting-vagy-festes`
  4. `szempilla-lifting-vagy-muszempilla`

  **Mind a 4 a szempilla-lifting klaszterből** → a klaszter alul-indexelt. A 06-24 óta 2 poszt (`eskuvoi-smink-felkesziules`, `arckezeles-arak-2026`) viszont MÁR beindexelt. A 4 money page + a többi cikk indexelt. A friss belső linkek (RelatedArticles hub-and-spoke) + a **sitemap valós `lastmod`** (most élesítve) gyorsítja a maradékot; a 4 posztra Request Indexing javasolt.
- **„Excluded by noindex: 1" + „Not found (404): 1"** — a 06-24 audit szerint ezek a Wix `www/blank` szellemek (benign), NEM apex-oldal. A sablon mindenhol `index,follow`-t ad, így saját oldal nincs veszélyben. Egy URL-ellenőrzéssel megerősíthető, de feltehetően nem teendő.
- **„Redirect error: 2"** — a Wix/ékezetes redirect-maradék; deploy után `curl -I`-vel ellenőrizendő (lásd [[frubeauty-deploy-redirects]]).
- A `site:frubeauty.com` ~25 URL-t ad, köztük egy **www-szellem**et: `www.frubeauty.com/book-online` — a www→apex + `/book-online`→`/` redirect él, idővel kiesik, de jelzi, hogy a régi www-URL-ek még lógnak.

---

## 4. Sitemaps

`sitemap-index.xml` — **Success**, beküldve 2026-06-09, utolsó olvasás 2026-06-26, **23 felfedezett oldal**, 0 videó. Egészséges. (A most hozzáadott per-poszt `lastmod` a következő olvasásnál jelenik meg.)

## 5. Core Web Vitals

**„Not enough usage data"** mind mobil, mind desktop — a forgalom a CrUX-küszöb alatt van (nem lassúság). Tehát **mezei CWV-rangsorjel jelenleg nincs**; a labor-Lighthouse (cél: mobil 95+, lásd [[project_perf_goal]]) marad az irányadó. Ahogy nő a forgalom, a CrUX feltöltődik — figyelni.

## 6. Enhancements / Links / Biztonság

- **Breadcrumbs rich result: Valid 3, Invalid 0** („Good job!"). Deploy után a 14 blogposzt + blog-index breadcrumb ~18-ra emeli. Videók + Profiloldal típus is detektálva.
- **Külső linkek: 1** (notino.hu → főoldal, üres anchor). **Belső linkek: 10** (alul-crawl-olt — friss szerkezet). → §0/2-es backlink-kar.
- **Manual actions: nincs** ✅ · **Security: nincs** ✅

---

## 7. Akcióterv (prioritás szerint)

### P0 — most
1. **„szemöldök laminálás" money page felhúzása (poz 9,9 → top 5).** Karok együtt:
   - **Deploy** a working tree-ben álló on-page javításokat (FAQ schema, blog-breadcrumb, RelatedArticles hub-and-spoke, sitemap `lastmod`) — sok már kész, csak ki kell vinni.
   - Deploy után **Request Indexing** a money page-re + a 8 „not indexed" közül a fontosakra.
   - **1–3 citáció/backlink** (a leghiányzóbb darab — lásd P0/3).
2. **CTR-rés erős pozíciókon:** „szempilla stylist", „kozmetikus", „szemöldök formázás" (poz 2–3, CTR 2–3%). Lever sorrendben: **GBP** (térképes pack a kattintásért) → a rangsoroló oldal cím/meta finomítása → FAQ/sitelink rich result. (A főoldal title már optimalizált — a fő kar itt a GBP, ami folyamatban.)
3. **Off-page backlink/citáció start (a #1 strukturális gyengeség, 1 backlink):** Bing Places, Apple Business Connect, 2–3 magyar lokál-katalógus/szalon-aggregátor. Cél: 30 napon belül ≥5 referring domain.

### P1 — 2 héten belül
4. **„Redirect error: 2" validálása** (06-24 szerint STALE, élőben tiszta 301→200 — csak GSC „Validate Fix"). A noindex:1/404:1 Wix-szellem, nem teendő.
5. A **8 „discovered/crawled – not indexed"** oldal indexeltetése: belső link + sitemap `lastmod` (kész) + Request Indexing a fontosakra.
6. www-szellem (`www.frubeauty.com/book-online`) — a redirect él, monitorozni, hogy kiesik-e; ha makacs, GSC Removals.

### P2 — monitoring (lásd [[seo-monitoring]] havi sablon)
7. Havi GSC-snapshot: kattintás/megjelenés/CTR/poz, indexelt szám, backlink-szám, breadcrumb/FAQ valid. Benchmark: a mostani 87 katt / 2 620 megj / 3,3% / poz 6,1.
8. CWV-figyelés, ahogy a CrUX feltöltődik.

---

## 8. Korreláció (release-ek)
- A money page indexeltsége a 06-24-es „nincs indexelve" óta **megfordult** (most indexelt) — egybevág a 06-24-es Wix-redirect-encoding-fixszel + Request Indexinggel ([[frubeauty-fixes-0624]]).
- A breadcrumb valid=3 a money-page schema-állapotot tükrözi; a 06-29/06-30-i blog-breadcrumb + FAQ + sitemap-`lastmod` **még nincs deployolva** → a hatás a következő crawlnál mérhető.

## 9b. GSC-akciók agent-browser-rel (CLI-alapú, natív interakciók)

> A GSC-adatok kiolvasása automatizáltan ment (nyers CDP-vel), de az **Angular Material UI írás-akcióit** szintetizált események nem triggerelnek. **Megoldás:** az `agent-browser --cdp 9222` CLI (Claude Code) — ez DOM-szelektor alapú, valódi UI-eseményeket küld, amit az Angular Material fogad.
>
> **Előfeltétel:** a dedikált GSC-Chrome már be van jelentkezve és futva van (`C:\Users\Bence\.agent-chrome-gsc`).

### Gyors-indítás

**1. Chrome indítása** (ha nincs futva):
```bash
# PowerShell vagy Bash, ugyanabban a terminálban:
Start-Process "C:\Program Files\Google\Chrome\Application\chrome.exe" -ArgumentList `
  "--user-data-dir=C:\Users\Bence\.agent-chrome-gsc", `
  "--profile-directory=Profile 1", `
  "--remote-debugging-port=9222", `
  "--no-first-run", `
  "https://search.google.com/search-console?resource_id=sc-domain:frubeauty.com"
```
Várd meg a teljes betöltést (~5–10 mp).

**2. agent-browser csatlakozás** (egy másik terminál-ablakban, ahol az `agent-browser` CLI él):
```bash
agent-browser --cdp 9222
```

**3. Az agent-browser promptjában** (pl. `agent>`) — Request Indexing a 4 nem-indexelt poszthoz:

```bash
# Navigálás (már itt lesz, de biztosan)
navigate https://search.google.com/search-console?resource_id=sc-domain:frubeauty.com
wait 2000

# Az első poszt (koreai-szempilla-lifting) ellenőrzése és Request Indexing
focus "input[placeholder*='Inspect any URL']"
fill "https://frubeauty.com/blog/koreai-szempilla-lifting/"
press Enter
wait 3000
click "button:has-text('Indexelés kérése')"
wait 2000

# Ismételd meg a másik 3 URL-lel:
# - https://frubeauty.com/blog/szempilla-lifting-arak-2026/
# - https://frubeauty.com/blog/szempilla-lifting-vagy-festes/
# - https://frubeauty.com/blog/szempilla-lifting-vagy-muszempilla/
```

**4. Redirect-error Validate** (ha GSC továbbra is mutat error-t):
```bash
navigate https://search.google.com/search-console/index?resource_id=sc-domain:frubeauty.com
wait 2000
click "a:has-text('Validate Fix')" || click "button:has-text('Validate Fix')"
wait 2500
```

### Részletes lista (copy-paste-ready)

**A) Indexelés kérése — a 4 nem-indexelt poszt (legfontosabb):**
1. `https://frubeauty.com/blog/koreai-szempilla-lifting/`
2. `https://frubeauty.com/blog/szempilla-lifting-arak-2026/`
3. `https://frubeauty.com/blog/szempilla-lifting-vagy-festes/`
4. `https://frubeauty.com/blog/szempilla-lifting-vagy-muszempilla/`

Mindegyikre: felül a „Inspect any URL" sávba bemásolod → Enter → **„Indexelés kérése"**. (Napi kvóta ~10–15 URL.)

**B) Recrawl a mai schema-frissítésért — 4 money page (indexeltek, de új FAQ/breadcrumb/priceValidUntil):**
5. `https://frubeauty.com/szemoldok-laminalas-zuglo/`
6. `https://frubeauty.com/szempilla-lifting-zuglo/`
7. `https://frubeauty.com/arckezeles-zuglo/`
8. `https://frubeauty.com/sminkes-zuglo/`

**C) Indexing → Page indexing → „Redirect error" sor → „Validate Fix"** (06-24 szerint stale; élőben tiszta 301→200).

**D) Sitemap:** marad (Success). Újra-beküldés nem szükséges; a friss `lastmod` a következő olvasásnál bekerül.

## 9. Következő mérési pont
Deploy után 7–14 nappal: (a) „szemöldök laminálás" pozíció mozgás, (b) indexelt szám 18→?, (c) breadcrumb valid 3→~18, (d) megjelenik-e az FAQ rich result, (e) referring domains 1→?.
