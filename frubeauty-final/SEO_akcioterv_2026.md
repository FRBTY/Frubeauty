# FRUBEAUTY — SEO Akcióterv 2026 (kőkemény, kód-szintű kotta)

**Dátum: 2026-06-29 · Szerző: technikai + lokális SEO stratégia · Fókusz: organikus dominancia hirdetés nélkül**
**Hatókör: Budapest, XIV. kerület (Zugló), Egressy út 16. · `frubeauty.com` · Astro 5 statikus site**

> Ez a fájl a kanonikus végrehajtási terv. A meglévő audit-dokumentumokra épül
> (`FRUBEAUTY-ORGANIKUS-AUDIT-2026-06-12.md`, `FRUBEAUTY-SEO-STRATEGIA-V2.md`,
> `FRUBEAUTY-Local-SEO-Playbook.md`) — azokat NEM ismétli, hanem egy követhető
> 6-pilléres kottába rendezi, és rögzíti, mi KÉSZ vs. mi NYITOTT.

---

## 0. A kiindulópont (a kellemetlen, felszabadító igazság)

A weboldal **on-page része gyakorlatilag KÉSZ**, és a magyar lokális beauty-piac
top 1%-ában van (squirrel 80/100 B; Core SEO 99, Structured Data 100, Mobile 100).
Ezért ez a terv **nem** „építsd meg a landingeket / rakj be schema-t" típusú — az
megvan. Arról szól, **hol van a pénz, amit még nem szedsz fel.**

| Kontextus | Valós érték |
|---|---|
| Város + kerület | Budapest, XIV. kerület (Zugló), Egressy út 16. — 1143 |
| Platform | **Astro 5 statikus site** (nem WordPress/Wix/Shopify) |
| Márka / személy | FRUBEAUTY / Pecze-Kovács Fruzsina (tulajdonos-kozmetikus) |
| Foglalás | Notino szalon-profil |
| GBP | **5,0★ / 47 vélemény** · név ✅ már „FRUBEAUTY – Pecze-Kovács Fruzsina Kozmetikus" (06-29 élőben verifikálva) |
| Mérés | GA4 (`G-L276HPZTL5`) + Ads (`AW-17992123771`) + Consent Mode V2 — ÉL |

**Ami már él a kódban (NE építsd újra):** 4 dedikált money-page; oldalanként
`FAQPage` + `Service` + `BreadcrumbList` schema (szemöldökön `HowTo` + `VideoObject`);
Layout `@graph` (`BeautySalon` + `Person`→`/rolam` + `WebSite`); `trailingSlash: 'always'`;
`/rolam` oldal; 14 blogcikk; AI-crawler robots.txt + `llms.txt`.

---

## 1. PILLÉR — Siló-architektúra (Topic Clusters)

A struktúra helyes. Az URL-séma `/[szolgáltatás]-zuglo/` **pontosan jó** (lokális +
szolgáltatás egy slugban). A munka itt a **belső linkelési topológia** szigorítása.

### Cél-topológia (hub-and-spoke)

```
                    [ / főoldal — márka-hub ]
                              │
        ┌──────────────┬──────┴───────┬───────────────┐
        ▼              ▼              ▼               ▼
 szempilla-lifting  szemoldok-    sminkes-zuglo   arckezeles-
   -zuglo/ (PILLÉR) laminalas-    (PILLÉR)        zuglo/ (PILLÉR)
        │           zuglo/(PILLÉR)     │               │
   ┌────┴────┐      ┌───┴────┐    ┌────┴───┐      ┌─────┴─────┐
  blog-spoke-ok    blog-spoke-ok  blog-spoke-ok   blog-spoke-ok
```

### A 3 szabály (amit a legtöbb szalon elront)

1. **Minden spoke felfelé linkel a SAJÁT pillérre** kulcsszavas anchorral. ✅ KÉSZ — mind a 14 cikk megteszi.
2. **A pillér lefelé linkel MINDEN spoke-jára** (`RelatedArticles`). ✅ KÉSZ (2026-06-29-i bővítés után, lásd §7).
3. **Spoke-ok nem szennyezik a szomszéd klasztert** felesleg nélkül. ✅ — egyetlen, kontextuálisan indokolt kereszt-link van (`szempilla-lifting-vagy-muszempilla` → `/sminkes-zuglo/`, esemény+smink párosítás), ez marad.

### Klaszter-térkép (14 cikk → 4 pillér)

| Pillér | Spoke-ok |
|---|---|
| **szempilla-lifting-zuglo** | szempilla-lifting-arak-2026 · koreai-szempilla-lifting · szempilla-lifting-vagy-festes · szempilla-lifting-vagy-muszempilla · szempilla-lifting-utoapolas |
| **szemoldok-laminalas-zuglo** | szemoldok-laminalas-arak-2026 · szemoldok-laminalas-mit-jelent · szemoldok-laminalas-vs-microblading · szemoldok-laminalas-meddig-tart |
| **arckezeles-zuglo** | arckezeles-arak-2026 · janssen-arckezeles-bortipusok · hidratalo-vagy-antiaging-arckezeles |
| **sminkes-zuglo** | eskuvoi-smink-arak-budapest · eskuvoi-smink-felkesziules |

> **NE** építs mély `/szolgaltatasok/szempilla/lifting/` hierarchiát — a lapos
> `/[szolgáltatás]-zuglo/` jobban rangsorol lokálisan, és már él.

---

## 2. PILLÉR — Lokális SEO és Térkép-dominancia (#1 KAR)

Itt van a pénzed nagy része, és itt vagy a legjobban alultöltve. Lokális szolgáltatónál
a kattintások többsége a **Maps 3-as packből** jön — oda nem a webrangsor, hanem a
**GBP-jelek** visznek be.

### 2.1 GBP-név — ✅ KÉSZ (06-29 élőben verifikálva)

A profil neve már **„FRUBEAUTY – Pecze-Kovács Fruzsina Kozmetikus"** (pontosan a javasolt forma; a 06-12-i audit óta megváltozott). A #1 entitás-kar megtörtént — a tulajdonosi GBP-nézet és a publikus knowledge panel is ezt mutatja.
- ❌ Tartsd így — **NE** told meg „…Szempilla Lifting Zugló" típusú kulcsszóval (felfüggesztés-kockázat).

### 2.2 Kanonikus NAP (karakterre pontosan, MINDENHOL)

```
Név:  FRUBEAUTY – Pecze-Kovács Fruzsina Kozmetikus
Cím:  1143 Budapest, Egressy út 16.
Tel:  +36 70 215 9954
Web:  https://frubeauty.com
```

**Takarítandó NAP-szennyezés:** `beautynailhairsalons.com` elavult listing —
*„Natural Beauty Szépségszalon", Egressy út 16., +36 1 220 4677 (RÉGI szám)*.
Igényeld/töröld; nézd meg a Maps-en a duplikált régi cégprofilt (claim → „bezárt"/egyesítés).

### 2.3 GBP-kimaxolás (ingyenes, prioritás-sorrendben)

| # | Teendő | Miért rangsor-jel |
|---|---|---|
| 1 | Szolgáltatás-lista **árakkal** (lift 12 000, laminálás 11 000, arckezelés 16 900-tól, smink 13 000-tól) | Maps „Szolgáltatások" szűrő |
| 2 | ⚠️ **Kategória — NYITOTT:** az elsődleges most **„Szépségszalon"** (06-29 verifikálva). A „kozmetikus zugló"-hoz (poz. 69) a **„Kozmetikus"** legyen LEGALÁBB másodlagos kategória; ha a kozmetikus-rangsor stuck marad, teszteld elsődlegesként. (A másodlagosok read-only nézetből nem látszottak.) | proximity + kategória = fő pack-jel |
| 3 | **Heti 1 GBP-poszt** (előtte-utána + 1 mondat + link a money-page-re), Instáról újrahasznosítva | aktivitás-jel |
| 4 | **Vélemény-velocity:** QR a szalonba + utánkövető SMS a `googleReviewsUrl`-lel. Cél: **havi 4-6 új, kulcsszavas** vélemény („szempilla lifting", „Zugló" a szövegbe). **Válaszolj MINDRE.** | a leghatásosabb pack-jel |
| 5 | Rendszeres fotó-feltöltés (munka közben, belső, portré) | frissesség-jel |

---

## 3. PILLÉR — Technikai SEO és Schema (90% kész — hézagpótlás)

**Már él:** teljes `@graph`, oldalanként `FAQPage` + `Service` + `BreadcrumbList`,
`HowTo`+`VideoObject` (szemöldök), Consent Mode V2, security headerek, sitemap, AI-robots + `llms.txt`.

### Schema-tételek
- ✅ **Offer-katalógus kiegészítve** (2026-06-29): arckezelés + smink hozzáadva, katalógus átnevezve. Lásd §7.
- ⚠️ **`AggregateRating` SZÁNDÉKOSAN marad KI a domainről** — self-serving rating LocalBusiness-nél nem ad csillagot + manual-action kockázat. A csillagokat a GBP hozza. **NE revertáld.**
- ⬜ **`speakable` + látható „Frissítve" dátum** a 4 money-page-en — GEO/hangkeresés réteg, nyitott (a blognak már van `dateModified`-je).

### A valódi technikai szűk keresztmetszet: mobil LCP
Cél **PSI mobil 95+**, LCP ≤ 2,5 s (most ~3,4 s lab). Above-fold képekre `loading="eager"` +
`fetchpriority="high"`, hero posterre `<link rel="preload" as="image">`.
**A font/island perf-döntéseket (metrika-illesztett fallback, eager gtag) NE bántsd — tudatosak.**

---

## 4. PILLÉR — Kulcsszó-mátrix (Pénztermelő vs. Információs)

**BOFU** (vásárlási szándék) → money-page · **TOFU** (problémakereső) → blog-spoke.
Sosem keverendő egy oldalon.

| Szolgáltatás | 🟢 BOFU → money-page | 🔵 TOFU → blog |
|---|---|---|
| **Szempilla lifting** | szempilla lifting zugló · …budapest 14. kerület · …ár · …egressy út · legjobb… budapest | …vagy festés · …vagy műszempilla · meddig tart… · koreai lash lift mi az · …utóápolás |
| **Szemöldök laminálás** | szemöldök laminálás zugló · …ár · …budapest 14. kerület · …közel | …vs microblading · …meddig tart · mi az a… · …káros |
| **Smink (alkalmi/esküvői)** | esküvői smink zugló · alkalmi smink budapest ár · menyasszonyi smink zugló · sminkes 14. kerület · smink próba budapest | esküvői smink mennyibe kerül · …felkészülés · meddig tart… · smink tartós-e egész nap |
| **Arckezelés** | janssen arckezelés zugló · anti-aging arckezelés budapest · arckezelés zugló ár · tisztító arckezelés 14. kerület | janssen termékek bőrtípus · hidratáló vagy anti-aging · arckezelés milyen gyakran · pattanásos bőr kezelése |

**Logika:** a BOFU-n a **helyszín** dönt (a general „arckezelés" értéktelen). Az **ár-kulcsszavak
a leggyorsabb organikus győzelem** — már most 2-3. oldalon rangsorolsz rájuk, és **egyetlen
zuglói riválisod sem közöl árat.** A TOFU-cikk célja a Topical Authority, nem a közvetlen eladás.

> **VAKFOLT (légy tisztában vele):** ezek a prioritások US-index keresési mintákból
> származnak → **hipotézis, nem tény.** Az első 60 napban validáld GSC-ben (Performance →
> Queries), és írd át a tényleges magyar megjelenés-adat szerint.

---

## 5. PILLÉR — Off-page / backlink (HU-realista, toxikus katalógus NÉLKÜL)

Érték szerinti sorrend:

1. **Citáció-háló egységes NAP-pal** (§2.2): Bing Places (ChatGPT-keresés Bing-adata!) · Apple Business Connect · **Salonic.hu / Fresha** (maguk is rangsorolnak → 2. SERP-jelenlét) · Cylex.hu, Aranyoldalak, Firmania, XIV. ker. kamara.
2. **Notino szalon-profil** maximális kitöltése (erős domain).
3. **Helyi PR (legértékesebb link):** zuglói kisvállalkozó-portré, kerületi online magazin, XIV. ker. FB-csoportok (szakértői válaszok, nem spam) → link a `/rolam`-ra (entitás + E-E-A-T).
4. **Szakmai:** Janssen magyar forgalmazó szalonkeresője · koreai lash lift képzés alumni-lista.
5. **Esküvői vertikum:** eskuvo.hu-típus + esküvői blog beszállító-listák (a smink-cikkek már rangsorolnak).

**SOHA:** fizetett linkfarm, cégtár-spam tömeg, link-csere háló. Egy releváns link > 100 katalógus.

---

## 6. KÍMÉLETLEN ŐSZINTESÉG

**A legnehezebb fázis:** a **3-6 hónap, amíg semmi látható nem történik** (citáció-indexelés,
vélemény-tömeg, tartalom-érés lassú). A legtöbb szalon itt feladja, és visszaesik az Ads-reflexbe.

**Hol bukik el a legtöbb szalon:**
1. Egyszeri projektnek hiszik a SEO-t (a build kész — a 80% most jön: ritmus).
2. Nem gyűjtenek véleményt rendszerszerűen (a velocity a #1 Maps-jel).
3. Entitás-fragmentáció (te 4 néven létezel — konkrét, mérhető hiba).

**Amit NEKED másképp kell csinálnod a top 0,1%-ért:**
> **Hagyd abba a kód csiszolását.** A weboldal kész. A 0,1% három unalmas, offline dolgon
> múlik, amit a riválisok nem bírnak kitartani: **(1) GBP-név javítás ma, (2) heti vélemény +
> poszt-ritmus 9 hónapon át, (3) a hiányzó cikkek legyártása.** Nincs benne deploy — ezért
> nem csinálja senki, ezért nyerhető.

---

## 30 / 60 / 90 napos végrehajtás

**0-30 nap (alapozás):** GBP-név + szolgáltatások/árak + kategória „Kozmetikus" · heti poszt indul · vélemény-QR · Bing Places + Apple + Salonic/Fresha + 5 HU-citáció · „Natural Beauty" takarítás · 2 ár-cikk frissítés/title.
**30-60 nap (tartalom + jelek):** `speakable` + látható „Frissítve" a money-page-eken · Facebook + Notino átnevezés egységes entitás-mondattal · 1 helyi PR-link.
**60-90 nap (mérés + iteráció):** GSC-felülvizsgálat (CTR-teszt, „kozmetikus zugló" pozíció) · vélemény +12-18 · §4 mátrix újraírása valós GSC-adatból · LCP re-mérés (PSI mobil 95+).

### KPI-célok (~3 hónap, hirdetés nélkül)

| KPI | Most | Cél |
|---|---|---|
| GSC katt/hó | ~50 | **150+** |
| CTR | 2,7% | **4,5%+** |
| „kozmetikus zugló" | poz. 69 | **top 20 + Maps-pack** |
| Google-vélemény | 47 (06-29) | **55+** |
| GBP útvonal+hívás/hó | ? (mérd!) | +50% |

---

## 7. Változásnapló — 2026-06-29 (kód-szintű)

| Feladat | Fájl | Változás |
|---|---|---|
| **Belső linkek (hub-and-spoke teljessé tétele)** | `src/pages/szempilla-lifting-zuglo.astro` | `RelatedArticles` slug-lista 3→5 (hozzá: `szempilla-lifting-vagy-muszempilla`, `szempilla-lifting-utoapolas`) → a pillér MINDEN spoke-jára linkel |
| **Belső linkek** | `src/pages/szemoldok-laminalas-zuglo.astro` | `RelatedArticles` slug-lista 3→4 (hozzá: `szemoldok-laminalas-meddig-tart`) |
| **Schema** | `src/layouts/Layout.astro` | `hasOfferCatalog`: +Janssen arckezelés (16 900 Ft) +Alkalmi/esküvői smink (13 000 Ft); katalógus átnevezve „FRUBEAUTY szépségszalon szolgáltatások"-ra |
| **Dokumentáció** | `SEO_akcioterv_2026.md` | ez a fájl |

**Verifikáció előtti megjegyzés az arckezelés-árhoz:** az Offer-ben a marketingelt „-tól" ár
(16 900 Ft, SOS Sensitive) szerepel, NEM a money-page Service-AggregateOffer 11 000 Ft-os
alsó értéke (az a Relax & Glow masszázs add-on). Ha az árstruktúra változik, ezt és a
money-page schemáját együtt frissítsd.

> **Deploy:** ✅ **ÉLESÍTVE 2026-06-29** — a production `frubeauty.com` szerveren
> élőben verifikálva (Offer-katalógus 4 szolgáltatás + a bővített hub-and-spoke
> spoke-linkek mind kint vannak).
