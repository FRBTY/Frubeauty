# Lézeres szőrtelenítés — 5 design-variáns

**Készült:** 2026-09-12 · **Állapot:** ✅ ELDŐLT — a **V4 (A konzultáció)** nyert, és élesben van
a `/lezeres-szortelenites-budapest/` oldalon.

**Az öt előnézeti oldal már nem útvonal.** Átkerültek `src/pages/`-ből ide:
`lezer/design-variansok/lezer-v1.astro` … `-v5.astro`. Ott a build nem érinti őket, tehát
`npm run deploy` sem viszi ki őket élesbe, és nem bukik el rajtuk az `npm run validate`
(noindex oldalon bent maradt kanonikus + egy túl hosszú H1 miatt 7 hibát adtak).
Ha valamelyik variánsra később szükség van, egyetlen `mv` visszateszi `src/pages/`-be —
a kódjuk érintetlen. Az `astro.config.mjs` sitemap-szűrője ezzel feleslegessé vált, kivettem.

---

## Mi a kísérlet

Öt oldal, **ugyanazokkal a tényekkel és ugyanazokkal az árakkal** — a tartalom egyetlen
forrásból jön (`src/data/lezer.ts`), tehát az áremelés egy helyen történik, és egyik variáns
sem tud elcsúszni a többitől.

A variánsok nem színsémában térnek el, hanem abban, **melyik kart húzzák meg**. Mind az öt
top-0,1% kivitel; a kérdés nem az, melyik szebb, hanem az, **melyik akadályt kell ennél a
szalonnál elmozdítani**.

| # | Név | A kar | Mit bizonyít, ha ez nyer |
|---|---|---|---|
| **V1** | **A számla** | Az árkifogás átkeretezése | A vendégkör **ár-vezérelt**; a gyanta-alternatíva költsége a valódi versenytárs |
| **V2** | **A dosszié** | Kockázat-oldás forrásmegjelöléssel | A vendégkör **szkeptikus**; a bizonyíték hiánya állítja meg, nem az ár |
| **V3** | **A naptár** | Valódi, ellenőrizhető határidő | A vendégkör **halogat**; nem a „megéri-e”, hanem a „mikor” a döntés |
| **V4** | **A konzultáció** | Súrlódás a döntés előtt | A vendégkör **bizonytalan abban, hogy rá vonatkozik-e** |
| **V5** | **A klinika** | Prémium visszafogottság | A vendégkör **bizalom-vezérelt**; a direct-response eszközök itt ártanak |

---

## V1 — A SZÁMLA

**Hero:** interaktív kalkulátor. A látogató megadja, mennyit költ **ma** egy szőrtelenítésre
és milyen gyakran; az oldal kiszámolja a 10 éves számláját, mellé teszi a sorozat árát, és
megmutatja a megtérülési pontot hónapban.

**Miért így:** a látogató a 66 000 Ft-ot a nullához méri, pedig már ma is fizet — csak
részletekben, és örökre. (L9 boríték-teszt, L20 PVA, L6 pozitív végeredmény.)

**Etikai döntés, amit nem szabad visszacsinálni:** a kalkulátor **nem állít gyanta-árat**.
A látogató adja a számot, mi szorzunk. Versenytárs-árat állítani, amit nem mértünk, Fttv.-
kockázat — és gyengébb is, mert vitatható. Az önmeggyőzés erősebb.

**Kockázat:** a kalkulátor a legnagyobb új felület; ha a látogató nem nyúl hozzá, a hero
üresebb, mint egy klasszikus kép+szöveg hero.

---

## V2 — A DOSSZIÉ

**Hero:** „kezelési lap” fejléc négy adatmezővel (eljárás / hullámhossz / ár / előre
fizetendő). Utána sorszámozott bizonyíték-blokkok 01–07, mindegyik alján **`FORRÁS:`** sor.

**Miért így:** a vbro-marketing vakfolt-fájlának szépészeti szabálya szerint ebben az
iparágban a domináns súrlódás **kockázati**, nem motivációs — a vendég nem attól fél, hogy
nem lesz szép, hanem hogy elrontják. Vágykeltés helyett forrás kell.

**A 07-es blokk a hiányról szól** („amit nem tudok megmutatni”): nincs saját előtte-utána
kép, nincs lézeres vélemény. Ez sorszámot kap, nem elhallgatást — és ez hitelesíti az összes
többi állítást.

**Kockázat:** a leghosszabb és a leghűvösebb variáns. Ha a vendégkör nem szkeptikus, ez
csak lassabb.

---

## V3 — A NAPTÁR

**Hero:** „A kérdés nem az, hogy mennyibe kerül. Hanem hogy mikorra lesz kész.” Alatta
naptár-modul: a látogató kiválasztja, mikor kezdene, és látja a hat időpontot meg a
befejezés hónapját — **valódi dátumokkal, a böngészőben számolva**.

**Miért így:** itt létezik egy valódi, ellenőrizhető határidő (a sorozat 6–8 hónap, frissen
barnult bőrre nem lehet kezelni), amit szinte senki nem kommunikál. Ez a szűkösség (L15)
tiszta formája.

**SZÁNDÉKOSAN NINCS visszaszámláló**, és az oldal ezt ki is mondja: „ez naptár, nem akció”.
A folyamatosan újrainduló countdown megtévesztő kereskedelmi gyakorlat lehet (Fttv.), és a
hitelességet is viszi.

**Kockázat:** szezonálisan egyenetlen. Nyár közepén ez a variáns a saját érvével beszéli le
a látogatót az azonnali indulásról.

---

## V4 — A KONZULTÁCIÓ

**Hero:** két kérdés (szálszín → területek), majd személyes panel: működik-e rajta, mennyi
lesz neki alkalmanként, mennyi összesen, mennyi ideig tart egy alkalom, mikorra lesz kész,
és mennyit kell most fizetnie (0 Ft).

**Miért így:** a látogatónak két kérdése van, és egyikre sem válaszol egy árlista. Amíg
nyitva vannak, nem foglal — ír egy üzenetet, vagy elmegy. (L29, L26, L22, L12.)

**A legfontosabb döntés, amit nem szabad „optimalizálni”:** ősz/fehér szálnál a panel azt
írja ki, hogy **ne költsön erre**, és nem ajánl foglalást. Ösztön ellen való — de ez az
oldal hitelesítő mozdulata, és üzletileg is ez a jó: az a vendég úgyis visszamondaná a
harmadik alkalom után.

**Árlogika:** kizárólag dokumentált árakkal dolgozik (a csomag- és páros-lista `lezer.ts`-ből).
Ha a kiválasztás nem egyezik egyikkel sem, a tételes összeget mutatja, és kiírja, hogy egy
időpontban kedvezmény jár. **Új árat nem számol ki magának.**

**Kockázat:** a legtöbb interaktív elem = a legtöbb, ami elromolhat. És aki nem akar
kérdésekre válaszolni, annak le kell görgetnie a teljes árlistáig.

---

## V5 — A KLINIKA

**Hero:** egy mondat, sok levegő, nagy gépfotó. Az oldal **világos** (ivory) — ez az egyetlen
világos lap a site-on.

**Miért így:** ez a variáns szándékosan **felfüggeszti a direct-response szabályok egy
részét**, ahogy a vakfolt-fájl a prémium szegmensre előírja: kerek ár, kevesebb szó,
visszafogott jelzők, nincs sürgetés, **nincs áthúzott ár és nincs „megtakarítás” badge**.
Ami marad: bizonyíték, konkrétság, whitespace, design.

**Ez a kontrollcsoport.** Ha ez veri a V1-et, az azt jelenti, hogy a vendégkör nem ár-,
hanem bizalom-vezérelt — és ez az információ többet ér, mint maga az oldal.

**Nyitott feladat, ha ez nyer:** a fejléc és a lábléc sötét maradt (tudatosan: sötét
navigáció világos tartalom fölött). A fejléc világos változata külön munka.

---

## Az animáció — `LaserDiodeAnimation`

Mind az öt variánson ott van, mert egyetlen, jól körülhatárolt munkát végez:
**megválaszolja a kategória legdrágább kifogását** — „miért kell 6–8 alkalom, ha egyszer már
kifizettem?”.

**Magától indul, amikor a görgetés odaér, és magától megy körbe. NINCS semmilyen vezérlő,
és nincs felirat az ábra ALATT** (2026-09-12-i döntés). Fázisonként eltérő tempóval
(7 / 9 / 8 / 11 másodperc, a felirat hosszához mérve), teljes kör ~35 másodperc.

Ebből két dolog következik, amit nem szabad visszacsinálni:

1. **Minden felirat az SVG-n BELÜL van**, fázisonként váltakozó bal felső képaláírással —
   különben az ábra néma ábrává válna. A kezelőfej ezért nem megy a bal szélre: az a sarok
   a képaláírásé.
2. **Mobilon minden feliratnak külön, nagyobb rajzegységű változata fut**
   (`sm:hidden` / `hidden sm:block`). A 760-as viewBox mobilon ~0,46× léptékre esik: ott a
   10,5-es betű 4,8 px-en jönne ki. A hullámhossz-panel mobilon csak a SZÁMOKAT mutatja,
   mert a magyarázó sorok nem férnek el olvashatóan.

Négy fázis:

1. **Borotvált bőr** — miért a bőr alatt kell lennie a szálnak
2. **Az impulzus** — 755 / 808 / 1064 nm három különböző mélységig (itt válik a „három
   hullámhossz” jellemzőből haszonná: együtt lefedik a teljes mélységet)
3. **A festék elnyeli** — a melanin nyeli el és alakítja hővé; ezért nem működik ősz szálon
4. **Amiért 6–8 alkalom** — 5 tüszőből 2 volt növekedési fázisban; a többi „épp pihen”

**Technikai döntések, amiket nem szabad visszacsinálni:**

- **Nulla új függőség.** Inline SVG + a bundle-ban már benne lévő framer-motion, ~7 kB.
  Lottie (~300 kB), PixiJS (~400 kB) vagy Vanta+Three (~600 kB) egyetlen magyarázó ábráért
  megölné a PSI mobil 95+ célt.
- **A feliratok valódi DOM-szövegek**, nem canvas-pixelek — mind a négy fázis szövege benne
  van a HTML-ben (a nem aktív `hidden`), tehát a képernyőolvasó és a Google is látja.
- **`client:visible`**, és az ábra a JS megérkezése előtt is teljes és olvasható.
- **`prefers-reduced-motion`**: nincs automata léptetés és nincs impulzus-villogás; az ábra a
  ZÁRÓ állapotban áll meg, mert az hordozza a fő érvet (miért 6–8 alkalom).
- **Akadálymentesség:** mivel látható magyarázó szöveg nincs, a teljes négyfázisú leírás az
  SVG `<desc>` elemében él, `aria-describedby`-jal hivatkozva. SZÁNDÉKOSAN `aria-label` +
  `<desc>`, és NEM `<title>`: az SVG-n belüli `<title>`-t az `npm run seo:smoke` második
  lap-címként számolja meg.
- **Világos tónus** (`tone="light"`) a V5-höz — csak a paletta cserélődik.
- Az ábra alján kötelező felirat: *„Sematikus ábra a mechanizmus bemutatására — nem orvosi
  illusztráció és nem konkrét kezelési eredmény.”*

---

## A döntés: V4 — és mi változott az élesítéskor

A V4 előnézet **nem egy az egyben** került át. Két dolgot módosítani kellett:

**1. A H1 visszakapta a kulcsszót.** Az előnézeti H1 („Mielőtt bármit eladnék neked:
működik ez rajtad?") ütősebb volt, de nem tartalmazta a „lézeres szőrtelenítés Budapest"
kifejezést — a money page-nek viszont pont ezért kell rangsorolnia. Az éles H1:
*„Lézeres szőrtelenítés Budapesten — de előbb: működik ez rajtad?"*, a horog pedig a
felvezető bekezdésbe került.

**2. Visszakerültek a SEO-t hordozó szakaszok**, amiket az előnézeti V4 nem tartalmazott:

| Szakasz | Miért kellett vissza |
|---|---|
| „Végleges szőrtelenítés" helyett pontosabbat | a „végleges szőrtelenítés" 880/hó keresés |
| A gép — három hullámhossz + gépfotók | jellemző→haszon blokk, „Soprano Titanium", 755/808/1064 |
| Kinek működik (a „nem"-lista mellé) | az előnézeten csak a tiltólista volt fent |
| Bikinivonal | ~110/hó, és az „intim lézer" +22% YoY |
| Gyakori párosok táblázat | a 66 000 és a 168 000 közti rés kitöltése |
| Lézer vagy gyanta? / „Láttál olcsóbbat. Tudom." | az árkifogás kezelése (ez volt a V1 kara) |
| A menet (ProcessSteps) + BreadcrumbList schema | HowTo-schema fedezete, morzsa |

**3. Mobil sorrend.** A hero rácsa `lg:row-start` / `lg:row-span` pozíciókkal dolgozik,
nem két egyszerű oszloppal: mobilon a kvíznek a H1 UTÁN kell jönnie. Két oszlopnál a teljes
bal hasáb (felsorolás, bizalmi sor, gombok) a kvíz elé került volna — ~800 px görgetés a
nyerő mechanizmusig.

**Ami NEM került át:** `preloadImage`. A hero szöveg- és kvíz-vezérelt, nincs benne kép;
a gépfotó előtöltése mobilon sávszélességet égetne olyasmire, ami nem az LCP-elem.

**4. A „Bizonyíték" szekció KIVÉVE (2026-09-12, user-döntés).** Ez volt az „Amit nem tudok
megmutatni" blokk Fruzsi portréjával. Két következménye van, amit tudni kell:

- Az oldalon **nincs több ember-fotó**. Ha ez később zavar, a portré bárhova visszatehető
  (`images.portrait`), az adat megvan.
- A „lézerre még nincs saját véleményem és nincs előtte-utána képem" közlés **már csak
  egyetlen helyen** szerepel: a vélemény-szekció bevezető bekezdésében. Ez a mondat a
  megtévesztés elleni védelem — **ne rövidítsd és ne töröld.**

**Ellenőrizve:** `tsc --noEmit` tiszta, `npm run build` 26 oldal, `npm run seo:smoke` rendben,
és az animáció önindulása méréssel igazolva (görgetés után 0→5→15→25 mp-nél vált fázist,
érintés nélkül).

## Fejlesztői megjegyzések

- Előnézeti szerver: `.claude/launch.json` → `lezer-design-preview` (4331-es port),
  hogy ne ütközzön a többi munkamenet 4328-as szerverével.
- Képernyőképek: a Browser-panel tabja `visibilityState:hidden`, ott **semmilyen**
  `client:visible` sziget nem hidratál. A megoldás headless Chrome + CDP, és **a viewportot
  ideiglenesen a teljes laphosszra kell állítani** — a puszta végiggörgetés headlessben is
  kihagyta a szigetek háromnegyedét.
