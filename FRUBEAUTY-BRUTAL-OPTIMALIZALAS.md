# FRUBEAUTY — „BRUTÁL OPTIMALIZÁLÁS"
## Elit CRO + Google Ads Quality Score audit és akcióterv

**frubeauty.com · Pecze-Kovács Fruzsina · Zugló, XIV. ker. · Kelt: 2026-06-03**

> **Betöltési kulcs:** ha a user a *„brutal optimalizalas"* névre hivatkozik, ezt a
> dokumentumot kell betölteni és innen folytatni. A kanonikus, teljes terv.
> Kapcsolódó: [FRUBEAUTY-SEO-STRATEGIA-V2.md](./FRUBEAUTY-SEO-STRATEGIA-V2.md) (SEO/GEO mélyítés).

---

## Állapot-követő (mi van kész)

| Tétel | Állapot | Hol |
|---|---|---|
| #5 Hero trust-sor (★5,0 · 40+ értékelés) above-the-fold | ✅ **KÉSZ** | `szempilla-lifting-zuglo.astro` (DOM-ellenőrzött) + `szemoldok-laminalas-zuglo.astro` (azonos minta) |
| #6 Combo hirdetés pontos csomag-horgonyra | ✅ **KÉSZ** | `id="csomagajanlatok"` a szempilla csomag-szekción + combo RSA Final URL `…#csomagajanlatok` |
| GA4 él (`G-L276HPZTL5`) — a memóriában frissítve | ✅ tény | `config/site.ts` |
| Minden más tétel | ⏳ függőben | lásd Prioritási mátrix |

---

## A mestermegállapítás (ezt olvasd el először)

A weboldal technikailag már a felső ~5%-ban van: `@graph` entitásréteg (BeautySalon + Person + WebSite), FAQ/HowTo/VideoObject/Breadcrumb schema, két dedikált pillér-landing, metrika-illesztett font-fallback, `content-visibility`, halasztott `gtag`, atomic lead bekezdések, összehasonlító táblák. **Ezekre építünk, nem ezeket cseréljük.**

A felső 5% és a felső 0,1% között **egyetlen szerkezeti tény** áll, és az nem a landing oldalon van: **a tényleges foglalás egy harmadik fél (Notino) oldalán történik.** A `config.booking` egy *általános* Notino szalon-profilra mutat. Két, mindent átíró következmény:

1. **Ez a legnagyobb konverziós szakadék.** A magas szándékú látogató rákattint az „Időpontot foglalok"-ra → generikus Notino-profil → ott *újra* meg kell keresnie a szolgáltatást, időpontot választani, valószínűleg fiókot létrehozni. Minden lépés olyan lemorzsolódás, amit **nem látsz és nem optimalizálsz.**
2. **Emiatt a CPA-számok hazudnak.** A mért konverzió a Notino-kattintás (Layout.astro inline script), nem a foglalás. Ha a Notino 20–30%-on konvertál, a valós foglalási CPA a riportált 3–5×-öse. A „CPA<1000" tehát **proxy** — a bidding és te egy köztes eseményre optimalizáltok, nem bevételre.

**A teljes terv gerince:** (A) csökkentsd/kerüld meg a Notino-átadás súrlódását, és (B) tedd mérhetővé a valós foglalást. Minden más ezt a két tengelyt szolgálja.

---

## 1. PILLÉR — Google Ads Minőségi Mutató (cél: stabil 9–10/10)

### 1.0 A QS lebontása és a jelenlegi állapot

| Komponens | Becsült állapot | Szűk keresztmetszet |
|---|---|---|
| Várható CTR (eCTR) | Átlagos | Nincsenek assetek; nincs RSA-pinning; nincs csillag a hirdetésben |
| Hirdetésrelevancia | Átlagos→Jó | Kulcsszó a címsorban, de nincs P1-pinnelve → nem garantált egyezés |
| Landing page élmény | Jó | Mobil above-the-fold trust (✅ javítva) + a Notino-handoff |

A landing-egyezés tankönyvi: „Szempilla Lifting Zugló" megjelenik a **title-ben, H1-ben, hirdetés-címsorban, URL-slugban és a body-ban**. A pontokat nem itt veszíted.

### 1.1 Konkrét hibák

- **🔴 A „Festés (opcionális)" hirdetéscsoportnak nincs RSA-ja.** A v3.0 kulcsszó-CSV-ben létezik a csoport (3 kulcsszó), de az RSA-CSV csak 3 csoporthoz ad hirdetést. **Hirdetés nélküli ad group nem szolgál ki / hibát dob importnál.** Döntés: vagy saját RSA + landing-szekció, vagy (ajánlott) **töröld** — a festés 4–7.000 Ft, alacsony ROAS, felhígítja a budget-korlátos kampányt.
- **🟠 (✅ JAVÍTVA) Combo landing-horgony.** A „Kombó Teljes Tekintet" final URL most már `…/szempilla-lifting-zuglo#csomagajanlatok` → egyből a „Teljes Tekintet 18.000 Ft" kiemelt kártyára ugrik.

### 1.2 A három legnagyobb eCTR- (és QS-) emelő

**a) RSA Position-1 pinning a relevanciáért → „Átlag feletti".** Most semmi nincs pinnelve. Ad grouponként **pinneld a pontos kulcsszót tartalmazó címsort a Position 1-be** (pl. „Szempilla Lifting Zuglóban" → H1-pozíció), így a megjelenő hirdetés *mindig* echózza a keresést. A maradék 9 címsor maradjon unpinned. *(Ads UI: a címsor melletti gombostű-ikon → Position 1.)*

**b) Hirdetésbővítmények (assetek) — jelenleg NULLA van.** Nem emelik közvetlenül a QS-t, de drámaian emelik az Ad Rankot és a CTR-t (visszacsatol az eCTR-be):

| Asset | Tartalom |
|---|---|
| **Helybővítmény (Location)** | Google Business Profile bekötése → **ez hozza a ★ minősítést + térképet a hirdetésbe** (lásd 1.3) |
| **Hívás (Call)** | +36 70 215 9954 |
| **Sitelink** | „Árak", „Vélemények", „Szemöldök laminálás", „A kezelés menete" |
| **Kiemelés (Callout)** | „Ragasztómentes", „Koreai technika", „6–8 hétig tartós", „Egressy út 16." |
| **Struktúrált kódrészlet** | Szolgáltatások: Szempilla lifting · Szemöldök laminálás · Festés · Arckezelés |
| **Akció (Promotion)** | „5.000 Ft megtakarítás — Teljes Tekintet csomag" |
| **Ár (Price)** | Lifting 12.000 Ft · Laminálás 11.000 Ft · Combo 18.000 Ft |

**c) Dinamikus kulcsszó-echo** egyetlen leírás-variánsban (`{KeyWord:szempilla lifting}`), óvatosan, hogy ne legyen gépies.

### 1.3 Csillag a hirdetésben — a helyes út

Helyesen vetted ki az on-page `AggregateRating`-et (self-serving, nem hoz csillagot, manual-action kockázat). **A hirdetési csillag független forrásból jön:**

- **Helyi formátumú hirdetés csillaga = Google Business Profile**, a Helybővítményen át → **azonnal kösd be**, ez a leggyorsabb csillag-út.
- **Seller Ratings** (szöveges hirdetés alatti csillag): automatikus, kb. **100+ értékelés** kell jóváhagyott forrásból 12 hónapban. Most 40 → még nem aktív. A **review-velocity** (40→100) tehát egyszerre Ads- és SEO-cél (lásd Pillér 4/5).

### 1.4 LSI / entitás-lefedettség a landingen

| Landing | Adjon hozzá (entitás/LSI) |
|---|---|
| `/szempilla-lifting-zuglo` | „szempilla dauer" (régi szinonima), „szempilla emelés", „szilikon párna/forma", „lifting szérum/keratin", „természetes szempilla göndörítés" |
| `/szemoldok-laminalas-zuglo` | „szemöldök dauer", „szemöldök szálirány", „rakoncátlan szemöldök rendezés" |
| **Mindkettő (hiperlokál)** | közeli tájékozódási pontok: „Bosnyák tér", „Örs vezér tere", „Rákosfalva" — **a pontos földrajzot előbb ellenőrizni** (a szalon 47.5059, 19.1025; ne állíts valótlan „X és Y között"-et) |

### 1.5 Landing page élmény

- **✅ Mobil above-the-fold trust** — a ★5,0 most a hero ELSŐ képernyőjén van (a H1 alatt), nem csak a lenti stats-sávban.
- A **handoff** a LP-élmény rejtett gyengéje → a deep-link (Pillér 4/1) gyógyítja.
- Dwell-time már erős (hosszú, gazdag lapok, ismételt CTA-k) — tartsd.

---

## 2. PILLÉR — Konverziós Ráta Optimalizálás (CRO) és UX/UI

### 2.1 Súrlódás #1: a Notino-átadás (a tölcsér legdrágább pontja)

1. **Deep-link a konkrét szolgáltatásra**, ne a generikus profilra. Oldalanként szabd a `config.booking`-ot a megfelelő Notino-szolgáltatás URL-re (ha a Notino enged mély-linket).
2. **On-site alternatíva a fiók-averz, magas szándékú látogatónak:** „Foglalás 15 mp alatt — WhatsApp / Messenger" vagy 2-mezős visszahívás-kérő (név + telefon). Nem helyettesíti a Notinót, hanem *elkapja* a különben elveszett szándékot.
3. **Beágyazott foglaló-widget**, ha elérhető — a látogató el sem hagyja a domaint.

### 2.2 Above-the-fold értékajánlat és trust (✅ részben kész)

Megvalósult mobil-sorrend a H1 alatt: `★ 5,0 · 40+ Google-értékelés`. Következő: a lead alá / CTA fölé tartsd a hely + ár-ígéretet (megvan). A trust-sor a pogo-stick (vissza a SERP-re) elleni legolcsóbb védelem.

### 2.3 Pszichológiai triggerek — pontos elhelyezés (Cialdini → kód)

| Trigger | Jelenleg | Top-0,1% lépés |
|---|---|---|
| **Társadalmi bizonyíték** | ★5,0, 40+, „78% combót választ", vélemények | ✅ ★5,0 a heróba kész. Véleményekhez: **dátum + szolgáltatás** (frissesség + relevancia) |
| **Tekintély** | Gyenge — a landingen nincs Fruzsina arca, a bio generikus | Lásd 2.4 — a legnagyobb kihasználatlan trust-tartalék |
| **Hiányérzet / sürgősség** | Gyakorlatilag nincs (AnnouncementBar csak katt UTÁN) | Lásd 2.5 — a piac leghitelesebb scarcity-sztorija a tiéd |
| **Kötelezettség/konzisztencia** | Jó („Árak" mikro-elköteleződés) | Tartsd |
| **Veszteségkerülés** | Részben („≈ napi 285 Ft", „kevesebb egy kávénál") | Combónál jelen idejű keret: „Ma spórolsz 5.000 Ft-ot" |
| **Reciprocitás** | Nincs | Ingyenes „mini szemöldök-konzultáció / formaterv" a foglaláshoz |

### 2.4 Tekintély-rés: arc és /rolam entitás-horgony

Az esztétikai szolgáltatás **személy-bizalmi vásárlás** („ki nyúl a szememhez?").

- A két fizetett landingen **nincs Fruzsina portréja** (a képek munka-eredmények).
- A `#rolam` csak a **főoldal egy szekciója**, nem önálló URL; a bio **generikus**.
- A `Person` schema **`url` mezője hiányzik** → az entitásnak nincs kanonikus horgonya. *(A `fruzsina-portrait.jpg` létezik, a schema-kép érvényes.)*

**Lépés:** építsd meg a `/rolam` oldalt valódi arccal és konkrét hitelesítéssel („X éve, koreai lash lift certifikáció [intézmény, év], Janssen partner"); `Person.url` → `/rolam`; a két landing „A megközelítés" szekciójába tedd be Fruzsina arcát + első személyű mondatot.

### 2.5 A kihasználatlan szuperfegyver: hiteles solo-scarcity

Egyszemélyes szalon — *„egyszerre csak egy vendég"* már a copyban van, de filozófiaként. Ez a **leghitelesebb sürgősség-forrás**: egy ember, véges időpont. Nem kell hamis countdown:

- *„Egyetlen kéz, heti korlátozott időpont — a szombatok hetekkel előre betelnek."*
- Ha a Notino adja: *„A legközelebbi szabad időpont: [nap]"* — élő scarcity, nulla hazugság.

### 2.6 Súrlódás-leltár

- **Nav-szivárgás:** a Google szereti a navigálhatóságot → **ne csupaszítsd le**, de a fejléc IG/FB ikonjai high-intent kattintást szivárogtathatnak; tartsd másodlagos súlyúnak (most így van). A galéria „Több munkám Instán" linkjeit fontold meg lightboxra cserélni.
- **Kimenő `target="_blank"` social linkek** a tölcsér közepén — auditáld, a fő CTA dominanciáját ne ossza meg.
- **Visszahívás-kérő:** ha bevezeted (2.1/2), **maradj 2 mezőnél**.

### 2.7 CTA-architektúra

A CTA-sűrűség jó (hero, minden csomag, combo-blokk, kapcsolat). A fő CTA végig „Időpontot foglalok" — tartsd.

---

## 3. PILLÉR — SEO és Google első oldal (on-page + technikai)

### 3.1 Core Web Vitals (cél: PSI mobil 95+)

A perf-alap kiváló (font-display:optional + metrika-illesztett fallback, content-visibility, halasztott gtag, kondicionális preload) — **ne bántsd**. Maradék mozgástér:

| Lépés | Miért | Hatás |
|---|---|---|
| **`<Reveal client:visible>` → közös CSS-IO reveal** a nem-kritikus szekciókban | A `Reveal` **framer-motion sziget**; landingenként **~15+** hidratál. Már megépítve a CSS-alternatíva (`.zero-js-fade`, `.hero-reveal`) | **INP/TBT — a legnagyobb maradék nyereség.** Egy közös IntersectionObserver `is-visible` osztály kiváltja a ~15 szigetet/oldal |
| **`AnnouncementBar` `client:load` → `client:idle`** | Csak katt UTÁN számít | Kiveszi a kritikus hidratálási útból. *(Megj.: a perf-island döntésekhez óvatosan — előbb mérd.)* |
| **LCP-mérés fegyelem** | Mérd PSI-vel, mi az LCP-elem mobilon (H1-szöveg vs. kép/poszter) | Ne preloadolj képet, ha a H1 az LCP |

### 3.2 Tartalmi struktúra és keresési szándék

- **H1/H2 hierarchia és szándék-kiszolgálás tankönyvi** (kulcsszó elöl, atomic lead, quick-facts, FAQ, összehasonlító tábla). Tartsd.
- **Kulcsszó-kannibalizáció jól kezelve** (két külön oldal, a szemöldök Service-schema kivéve a szempilla-lapról).
- **Klaszter-tartalom még hátra** (a V2 stratégia szerint): ár- és összehasonlító blogcikkek hozzák a long-tail commercial forgalmat. GSC: 766 impr/hét, 2,7% CTR, pozíció 5 → **CTR- és klaszter-, nem rangsor-probléma.**
- **Frissesség (GEO):** `dateModified` + látható „Frissítve: 2026. …" a pillérekre.

### 3.3 Schema-teljesség

- `Person.url` → `/rolam`.
- `sitemap` `lastmod` ellenőrzés.
- `priceValidUntil` a szempilla-lap `Offer`-ébe is (a szemöldök-lapon már van).

---

## 4. PILLÉR — „Brainstorming & Superpowers": 5 rendhagyó ötlet

1. **„15 mp-es szabad-időpont teaser" + deep-link / WhatsApp-bypass.** A landingre könnyű blokk: „Mikor érnél rá? → [Hétköznap d.u.] [Hétvége] [Mihamarabb]", és a választás közvetlenül a Notino konkrét szolgáltatás+időpont nézetébe (vagy WhatsApp előtöltött szöveggel) visz. **A legnagyobb egyetlen konverzió-emelő** — a tölcsér legdrágább pontját gyógyítja.

2. **Offline konverzió-import: a „hazudó CPA" valóssá tétele.** A valós Notino-foglalásokat GCLID-del töltsd vissza Ads-be offline konverzióként (heti rekonciliáció → import). A bidding **valós foglalásra** optimalizál, nem kattintásra. Egyetlen solo-szalon sem csinálja ezt a piacon — strukturális előny, pont a budget-korlátos fiókban a legértékesebb.

3. **„30 mp-es eredmény-reveal" mint hero ÉS bizonyíték.** Néma, autoplay előtte→utána reel, ami a hero LCP-eleme; a poszter SSR-ben azonnal látszik (már így megy a `HeroMedia`), a videó `client:visible`-re hidratál → perf-semleges. Hook + Experience-bizonyíték + dwell-time egyben.

4. **Megnevezett kockázat-megfordítás: „48 órás igazítás-garancia".** A homályos „Elégedettségi garancia" helyett: *„Ha 48 órán belül nem tetszik az ív vagy a forma, ingyen igazítom."* A konkrét, megnevezett garancia 2–3× erősebb — solo-mesternél teljesen hiteles.

5. **Review-velocity motor + hiperlokál referral-hurok (40→100).** QR-kód a széknél → 20 mp-es Google-értékelés a csúcs-pillanatban (tükör). „Hozd a barátnőd — mindkettőtöknek 2.000 Ft" hurok. Zuglói nem-versenytárs szépségvállalkozásokkal keresztbe-ajánlás. Egyszerre SEO- (lokális entitás + frissesség), Ads- (Seller-Ratings csillag) és CRO- (social proof) tőkeáttétel.

---

## 5. PILLÉR — Prioritási mátrix (ROI-sorrendben)

| # | Feladat | Hatás | Erőfeszítés | Állapot | Lépések |
|---|---|---|---|---|---|
| 1 | GBP Helybővítmény a hirdetésekbe | Magas | Könnyű | ⏳ | Ads → Assets → Location → GBP összekapcsolás → ★ + térkép a hirdetésben |
| 2 | Hirdetés-assetek (Sitelink, Callout, Call, Snippet, Promotion, Price) | Magas | Könnyű | ⏳ | 1.2/b tábla betöltése |
| 3 | RSA Position-1 pinning (kulcsszó a H1-be) | Magas | Könnyű | ⏳ | Mindhárom élő ad groupban pinneld a kulcsszavas címsort P1-be |
| 4 | „Festés" ad group törlése (vagy RSA+landing) | Közepes | Könnyű | ⏳ | Ads Editor → töröld a hirdetés nélküli csoportot |
| 5 | ★5,0 trust-sor a heróba (mobil ATF) | Magas | Könnyű | ✅ KÉSZ | Mindkét landingen a H1 alá |
| 6 | Combo final URL → `#csomagajanlatok` | Közepes | Könnyű | ✅ KÉSZ | Horgony + RSA-CSV frissítve |
| 7 | **Notino deep-link / WhatsApp-bypass** | **Nagyon magas** | Közepes | ⏳ | Oldalankénti `config.booking`; +2-mezős visszahívás vagy WhatsApp-CTA |
| 8 | `/rolam` entitás-oldal + arc a landingekre | Magas | Közepes | ⏳ | Valódi portré + konkrét hitelesítés; `Person.url` → `/rolam` |
| 9 | Hiteles solo-scarcity sor (belépéskor) | Magas | Könnyű | ⏳ | „Egyetlen kéz, heti korlátozott időpont…" a hero közelébe |
| 10 | Review-velocity motor (40→100, QR + referral) | **Nagyon magas** (hosszú táv) | Közepes | ⏳ | QR a tükörnél; „hozd a barátnőd" kupon; Seller-Ratings küszöb |
| 11 | `Reveal client:visible` → közös CSS-IO reveal | Közepes (perf) | Közepes | ⏳ | Egy IO `is-visible` osztály a ~15 sziget helyett; AnnouncementBar → idle |
| 12 | **Offline konverzió-import** (valós foglalás GCLID) | **Nagyon magas** (mérés) | Nehéz | ⏳ | Heti foglalás↔GCLID → Ads offline import |
| 13 | Klaszter-blogcikkek (ár + összehasonlítás) | Magas (SEO, hosszú táv) | Nehéz | ⏳ | `/blog/szempilla-lifting-arak-2026` stb. (lásd V2) |
| 14 | Hiperlokál landmark-terminusok + `dateModified` | Közepes | Könnyű | ⏳ | Földrajz ELLENŐRZÉSE után; frissesség-jel a pillérekre |

**Sorrend-logika:** az 1–6 ma elvégezhető, alacsony kockázatú QS/CTR-emelés a budget-korlátos fiókban (több kattintás ugyanabból az 5000 Ft-ból). A **7, 10, 12** a három „nagyon magas" tétel — mind a mestermegállapításra (handoff + valós mérés) válaszol; ezek emelik a felső 5%-ot a felső 0,1%-ba.

---

*FRUBEAUTY „brutal optimalizalas" — 2026-06-03 · a kanonikus CRO + Quality Score akcióterv.*
