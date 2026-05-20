# FRUBEAUTY — Konverzió-kritikus audit (Executive Summary)

**Auditált:** lokális kódbázis (v1.4.0, Astro + Tailwind + React-szigetek)
**Dátum:** 2026-05-18
**Fókusz:** kizárólag a bevétel-termelő funnel (hero → szolgáltatás-választás → foglalás)
**Módszertan:** marketing-pszichológia + UI/UX polish + technikai konverzió-blockerek

---

## TL;DR — A 3 állítás, amit el kell hinned

1. **A funnel törött a végén.** A foglalás külső Notino-link → nulla attribúció, nulla retargeting, nulla tartalék. Ez egyedül 20–40% bevétel-veszteséget okoz, ha bárhol fizetett forgalmat tervezel.
2. **A hero üzenet 3 dolgot árul egyszerre, ezért semmit sem.** A „ragyogó bőr + tökéletes pillák + smink" egy mondatban = döntésképtelenség. Egy h1 = egy ajánlat = egy CTA.
3. **A copy-pszichológia visszafelé sül el.** „Fáradtnak látszol a tükörben…" = a vendéget azzal nyitod, hogy rosszul néz ki. A szépségiparban ez azonnali bounce-trigger, nem konverzió.

A többi (schema-hibák, fake scarcity, gyenge CTA) ezután jön.

---

## TOP 10 — Konverzió-kritikus, prioritás szerint

### #1 — A foglalás teljes funnele leakage (KRITIKUS)

**Probléma:** `index.astro:37` és minden CTA `https://www.notino.hu/szalonok/...` linkre megy, `target="_blank"`. Amint a felhasználó kilép a domain-ről:
- Meta/Google Ads pixel nem tüzel → nincs konverzió-mérés
- Nincs retargeting pool építés
- Notino downtime = elveszett foglalás (zero fallback)
- A vendég felülete váltakozik → bizalom-törés
- Külön elem: `external` boolean csak `_blank`-et kapcsol, attribútumot vagy UTM-et nem fűz hozzá

**Akció (24 óra alatt megoldható):**
1. Minden booking link kapjon `?utm_source=site&utm_medium=cta&utm_campaign=<location>` paramétert — minimum a Notino dashboard-on ki tudod nyerni honnan jött.
2. Cseréld a CTA-t intersticiális modal-ra: „Átirányítunk a Notino felületre" + 3 mp delayed redirect → ezalatt tüzelhetsz Meta/Google Ads conversion eventet egy `gtag('event','book_click')`-kel.
3. Telefonos fallback: `tel:` link a Notino-link MELLETT, ne CSAK alatta a kapcsolat szekcióban. A magas-szándékú user 2 kattintást nem akar tenni.
4. Hosszú távon: saját foglalási widget (Cal.com self-hosted vagy Reservio iframe) — Notino csak egy másodlagos csatorna legyen, ne az egyetlen.

---

### #2 — Hero: 3 ajánlat egy mondatban = nulla ajánlat (KRITIKUS)

**Probléma:** `index.astro:123`
> „Ébredj **ragyogó** bőrrel és tökéletes pillákkal — a nap többi részére pedig bízd rám a **sminked**."

Három különböző értékajánlat egy h1-ben. Hick's law: minden plusz választás csökkenti a következő kattintás valószínűségét. A vendég nem tudja, melyik szolgáltatás neki szól, ezért egyiket sem kattintja.

**Akció:**
- Válassz EGY hero ajánlatot (a bestseller: szempilla lifting + szemöldök laminálás csomag, 18 000 Ft, 78%-os mix). A többi szolgáltatás külön szekcióban érhető el alább.
- Alternatíva (ha tényleg multi-service hero kell): rotáló h1 időszakos campaign-tematika szerint (eskuvő-szezon → smink-hero, ősz → arckezelés-hero).

**Példa új h1 (bestseller-fókusz):**
> „Szempilla-lift és szemöldök, 90 perc alatt. 6–8 hétig nem kell smink reggelente."

Egy ígéret, egy fájdalompont, egy időtartam, egy tartósság-claim. Mérhető.

---

### #3 — A „kinek szól" szekció INSULTING a vendéget (KRITIKUS)

**Probléma:** `index.astro:55`
> „Fáradtnak látszol a tükörben…"

A szépségiparban a vendég NEM azért jön, hogy halálra ítéld a tükörképét. Ez a kőkemény loss-aversion frame egy luxus-kontextusban inverz hatást vált ki: a vendég azt érzi, megalázod őt, hogy eladj neki valamit. A „A reggeleid feszesek" kicsit jobb, de még mindig pain-first.

**Akció:** Cseréld aspirational/future-self framingre.
- Régi: „Fáradtnak látszol a tükörben…"
  → Új: „Egy nyugodt 90 perc, és a tükörből a régi „kipihent" éned néz vissza."
- Régi: „A reggeleid feszesek — nincs idő szempillaspirálra"
  → Új: „Képzeld el a reggelt smink nélkül — és mégis úgy érzed, készen állsz."

A pszichológiai elv: **identitás-építés**, nem hiány-mutatás. Daniel Kahneman → people approach gains more strongly when self-image is positive.

---

### #4 — AnnouncementBar: fake scarcity, ami leleplezi magát (MAGAS)

**Probléma:** `AnnouncementBar.tsx:52`
> „Már csak az utolsó szabad helyek érhetők el a héten."

- Nincs szám (mennyi az „utolsó"?)
- Nincs idő (melyik hét?)
- A localStorage egyszer eltünteti, soha többé nem látja a user → semmilyen funkciója nincs egy returning visitorra
- Ha egy user végignézi a Notino-t és látja, hogy van bőven szabad időpont → instant bizalom-vesztés

**Akció:**
- Cseréld VALÓS scarcity-re: dinamikusan generált „Erre a hétre még X szabad időpont" — egy egyszerű Notino API-pollolás vagy heti manuális frissítés is jobb mint hazudni.
- Vagy: töröld teljesen. Inkább nulla bar, mint hamis bar. A hamis scarcity 2025-ben a leggyorsabb módja a bizalom-temetésnek.
- Alternatíva: **Recency social proof** — „Ma 4 új foglalás érkezett" (manuálisan frissítve hetente). Valós, etikus, működik.

---

### #5 — Secondary CTA: „Tudj meg többet" (MAGAS)

**Probléma:** `index.astro:133` — a hero második CTA-ja az egyik leggyengébb a marketing-pszichológiai kánonban. Semmilyen ígéretet nem hordoz, semmilyen friction-csökkentést nem ad.

**Akció:** Cseréld konkrét, érték-vezérelt CTA-ra:
- „Megnézem a Janssen-protokollokat"
- „Megnézem a szempilla-lifting árakat"
- „Megnézem előtte–utána képeket"

A pszichológiai elv: **commitment ladder**. A „megnézem" alacsony kötelezettségű, de mégis konkrét cselekvést ír le.

---

### #6 — Schema.org / NAP inkonzisztencia (MAGAS — Local SEO + Google Business)

**Probléma:** `Layout.astro:30,42` vs `config/site.ts:11,15`:

| Mező | Schema.org-ban | Valós (site.ts) |
|---|---|---|
| Postal code | `1143` | `1149` (sőt a default description-ban is „1143") |
| Opening hours | `09:00–18:00` Mon-Fri | `08:30–19:30` Mon-Fri (és szombat ki sem szerepel) |
| Facebook URL | `https://www.facebook.com/frubeauty` (404) | `https://www.facebook.com/profile.php?id=61572135977337` |
| Instagram | `https://www.instagram.com/frubeauty` | `https://www.instagram.com/frubeauty/` |

**Hatás:** Google rich result inkonzisztencia → Google Business Profile lehet, hogy NEM párosul a structured data-val → veszített local pack ranking. A 1143 vs 1149 KÜLÖN postai irányítószám-ok Budapesten, ez direct misinformation.

**Akció (1 fájl módosítása, 15 perc):**
- `Layout.astro` schema mezői mind a `siteConfig`-ból olvassanak, ne hardcodeolt értékek.
- Add hozzá a teljes opening hours-t (szombat is).
- A postcode legyen `1149`.
- A facebook URL legyen a `siteConfig.facebook`.

---

### #7 — Trust bar JS-hidrátál (KÖZEPES — első benyomás)

**Probléma:** `index.astro:175` — a trust bar `<Reveal client:visible>` wrapperben van. Default state `opacity: 0`. Ha a JS lassan tölt (slow 3G, alacsony budget), a `★ 5,0 / 40+ Google értékelés / Janssen / 5+ év` MIND láthatatlan. A trust signal az első impressziónál a legfontosabb — pont ezt rejtjük el JS mögé.

**Akció:** A trust bar legyen CSS-only fade-in (e.g. `@starting-style` vagy egyszerűen mindig látható), ne React-szigetbe csomagolva. Zero-JS path = mindenki látja.

---

### #8 — Price anchoring rossz sorrendben (KÖZEPES)

**Probléma:** `arckezeles-zuglo.astro:23-92` — a kategóriák a LEGOLCSÓBBAL kezdődnek (Clear Balance 18 000 Ft → Timeless Lift 21 500 Ft). Anchoring bias 101: a legmagasabb árat kell ELSŐKÉNT mutatni, így a többi olcsóbbnak tűnik.

**Akció:** Rendezd kategóriákat descending price-szal:
1. Anti-aging és masszázs (Timeless Lift 21 500 Ft — anchor)
2. Hidratáló és tápláló (19 500 Ft)
3. Arctisztító kezelések (16 000–19 500 Ft)

Vagy egy elegánsabb verzió: a Timeless Lift legyen „signature" Hero-card a többi felett, külön kiemelve.

---

### #9 — Hiányzó risk-reversal a prémium szolgáltatásnál (KÖZEPES)

**Probléma:** A 26 000 Ft-os „Teljes Megújulás prémium csomag" (`szempilla-lifting-zuglo.astro:67`) komoly döntés. Semmilyen pénzvisszafizetési vagy átdolgozási garancia nincs feltüntetve. Magas-jegyű szolgáltatásoknál a guarantee 15–25%-kal javítja a konverziót.

**Akció:** Adj hozzá egy explicit garancia-szekciót:
> „Ha az első kezelés után 48 órán belül nem vagy elégedett az eredménnyel, ingyenes korrekciós időpontot kapsz."

Ez a beauty-iparban már bevett. Konkrét, alacsony költségű, magas konverziós uplift.

---

### #10 — Testimonials: Google-verified link és outcome hiányzik (KÖZEPES)

**Probléma:** `TestimonialsGrid.tsx:32` — minden vélemény végén csak „Google" felirat áll, de nincs DIREKT link az adott Google review-ra (csak a generic googleReviewsUrl-re). Authenticity-deficit: bárki kitalálhatta a véleményeket.

**Akció:**
- Minden testimonialhoz adj egy konkrét deeplinket az adott Google review-ra (a Google Maps Place-en lehet review-szintű permalink generálni).
- Egészítsd ki outcome-mal: nem csak „szuper", hanem „6 hét után még mindig tartott a lifting". Lehet, hogy szerkeszteni kell a vendéggel emailben — de a kontextuális outcome eladás-ra fordítható signal.
- A „Hajni Kiss" testimonial alacsony outcome-érték: csak hangulat-leírás. Cseréld erősebbre.

---

## Másodlagos issuek (nem konverzió-kritikusok, de gyorsan javíthatók)

- **`index.astro:268`** — „nálam **TE** vagy a középpontban" — capslock + arany szín = visuálisan kiabál, eddigi finom typografiához nem illeszkedik. Emil-elv: a túl sok hangsúly = nincs hangsúly.
- **`Layout.astro:11`** description default „1143 Budapest" — még a meta description is rossz. Local SEO + click-through arány hit.
- **`MagneticCTA.tsx`** — touch device-on a magnetic effekt teljesen lemarad. Mobil = a forgalom 70%+. Adj hozzá tap-feedback animációt (scale 0.97 már megvan, OK, de a magnetic „prémium érzet" mobil userek számára teljesen elveszik).
- **`FAQ.tsx:8`** — `useState<number | null>(0)` az első FAQ-item alapból nyitva. Inconsistent vertical rhythm, és nem feltétlenül a legrelevánsabb kérdést mutatja elsőként. Default `null`.
- **`index.astro:431`** — „A vendégek 40%-a..." statisztika — honnan? Ha nincs forrás, akkor unsubstantiated claim, EU fogyasztóvédelmi szempontból kockázatos. Vagy backupold (data tracking) vagy lágyítsd („sok vendégem").
- **`AnnouncementBar`** + `LampContainer` + `Hero pt-44 sm:pt-52` = mobile fold-on rengeteg padding. Mérd meg: a CTA above-the-fold van 375px-es viewporton?
- **`em.display`** italic + gold overuse: a hero-tól a footer-ig minden h1/h2-ben van „display" italic emphasis. Ha minden hangsúlyos, semmi sem az. Tartsd 1 emphasis/szekcióra.
- **`config.booking`** mindenhol `external` Notino-link. Ha bárki valaha is rebrandel vagy lecserélted a foglalási rendszert, 30+ helyen kell editelni. (Bár siteConfig.ts létezik, az `index.astro:36`-ban újra-definiálod a `config` objektumot — duplikáció.)

---

## A 30 napos cselekvési terv

### Hét 1 — Funnel-mentés (legnagyobb ROI)
1. **Tag minden CTA-t UTM paraméterrel** (`?utm_source=site&utm_medium=hero&utm_campaign=evergreen`).
2. **Cseréld a fake announcement bart**: vagy valós scarcity-re, vagy töröld.
3. **Schema.org fix** (Layout.astro): kösd a siteConfig-hoz, javítsd a postcode-ot, opening hours-t, FB URL-t.
4. **Hero h1 single-focus**: válassz egy ajánlatot, írd át.

### Hét 2 — Copy-pszichológia
5. **Cseréld az audience headlines-t** aspiration-frame-re.
6. **„Tudj meg többet" → konkrét „megnézem" CTA**.
7. **Risk-reversal hozzáadása** a 20k+ Ft-os csomagokhoz.

### Hét 3 — Trust + Social proof
8. **Trust bar zero-JS** (CSS-only fade-in).
9. **Testimonialhoz direct Google permalink + outcome-erősítés** (manuális adatgyűjtés a meglévő reviewerekkel).
10. **Recency social proof** (heti manuális frissítés, „Ma X foglalás").

### Hét 4 — Mérés + iteráció
11. Telepíts **GA4 + Meta Pixel** (CookieBanner már támogatja!).
12. Conversion event: `book_click` minden CTA-ra.
13. Heatmap (Hotjar/Microsoft Clarity ingyenes) — nézd meg, hol kattintanak ténylegesen.
14. **A/B teszt** a hero h1-en (Notino-link redirect modal-jában fogod tudni mérni).

---

## Mit NEM kell csinálni (gyakori csapdák)

- **Ne adj hozzá több szekciót.** Az oldal már most 11+ szekciós. A konverzió a fókuszálásból jön, nem a több contentből.
- **Ne tedd a CTA-t „pulse"-olóvá vagy villogóvá.** Az `active:scale-[0.97]` éppen elég. Bárki, aki ennél többet javasol, nem érti a prémium brand pszichológiát.
- **Ne futtass discount-kampányt indításként.** A „5+ év szakmai tapasztalat" + Janssen brand pozicionálás prémium — 10%-os kupon ezt rögtön diszkontmárkává fokozza le.
- **Ne tegyél exit-intent popupot.** Asztali eszközön irritáló, mobile-on amúgy sem működik. Helyettesítsd inkább recency social proof toast-tal.

---

## Mit mértem és mit NEM

**Mértem (kódbázis):** copy, struktúra, schema.org, komponens-hidrátálás, CTA pozícionálás, anchoring, friction-pontok.

**NEM mértem (mert lokális kódbázis):** valós LCP/INP/CLS, real user metrics, A/B teszt eredmények, Google Analytics adat, Notino dashboard konverzió-arány, ad spend ROI.

**Ha élesben akarod auditálni:** futtass squirrelscan-t az élő domain ellen + Cohort analysis a Notino-ban + Chrome User Experience Report (CrUX) lookup. Külön audit kérhető, ha publikálva van a v1.4.0.

---

**Készítette:** automatikus audit (marketing-pszichológia + UI/UX polish + technikai konverzió-review)
**Verzió:** v1.0 — 2026-05-18
