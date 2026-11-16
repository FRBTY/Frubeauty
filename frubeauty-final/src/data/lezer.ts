/**
 * Lézeres szőrtelenítés — KÖZÖS TARTALOM-FORRÁS.
 *
 * MIÉRT KÜLÖN FÁJL: öt design-variáns fut ugyanarra a szolgáltatásra
 * (/lezer-v1 … /lezer-v5). Ha az ár, a zónalista vagy egy GYIK-válasz öt helyen
 * él, az első áremeléskor négy oldal hazudik. A variánsok CSAK a szerkezetben és
 * a vizuális nyelvben térnek el — a tények ebből az egy fájlból jönnek.
 *
 * ÁRAZÁS FORRÁSA: 2026-09-12-i élő versenytárs-árlisták (klinikai sáv: hónalj
 * 20–23 000, kisstúdió-sáv: hónalj 10 000). Ez az árazás tudatosan a kettő
 * között áll.
 *
 * ÁRKORREKCIÓ 2026-09-13 — a gépóra-hozam mérése alapján. A 50%-os
 * géprészesedés miatt a határköltség az ár fele, tehát nincs fix költségpadló:
 * egyetlen mérőszám számít, a LEFOGLALT ÓRÁRA jutó nettó. 15 perc/alkalom
 * ráfordítással (fogadás, adatlap, fotó, előkészítés, zárás) számolva a régi
 * árak fejjel lefelé álló kedvezmény-létrát adtak:
 *
 *   Sima Nyár       9 081 Ft/óra  <  sima L zóna   12 545 Ft/óra
 *   Tetőtől Talpig  9 484 Ft/óra  <  sima XL zóna  12 774 Ft/óra
 *   XS egyedül      5 455 Ft/óra  <  a leggyengébb arckezelés ~9 250 Ft/óra
 *
 * Vagyis ott volt a legnagyobb engedmény, ahol a legtöbb idő elmegy. A 38%-os
 * csomagkedvezmény indoka („egy időpont, nem három") ~30 perc ráfordítást spórol
 * = ~5 500 Ft, miközben 17 000 Ft-ot engedett alkalmanként.
 *
 * AMI VÁLTOZOTT: XS 5 000 → 7 000 (karbantartó 8 000 → 10 000, hogy a ~1,45-ös
 * létra ne törjön meg), felső ajak + áll páros 8 000 → 12 000, Sima Nyár
 * 28 000 → 32 000, Tetőtől Talpig 49 000 → 56 000.
 *
 * MÁSODIK KORREKCIÓ, UGYANAZON A NAPON — rossz bemenettel számoltam. A fenti
 * Ft/óra értékek 15 perc/alkalom ráfordítást és a KVÍZ közép-értékeit
 * használták; a valódi lefoglalt sávok ennél hosszabbak (a zóna felső
 * kezelési ideje + 10 perc ráhagyás — lásd a Pkg.duration kommentjét). A
 * helyes nevezőkkel a létra a korrekció UTÁN is fejjel lefelé állt:
 *
 *   Sima Nyár (95 perc)       10 105 Ft/óra   <   ugyanez a három zóna külön: 11 739
 *   Tetőtől Talpig (165 perc) 10 182 Ft/óra   <   ugyanez az öt zóna külön:   11 415
 *   Hónalj + bikinivonal      10 200 Ft/óra   <   külön: 11 000
 *   Bikinivonal + lábszár     11 600 Ft/óra   <   külön: 12 000
 *   Teljes láb + hónalj       11 100 Ft/óra   <   külön: 12 000
 *
 * A VISZONYÍTÁSI ALAP itt szándékosan nem az L zóna, hanem a csomag SAJÁT
 * zónáinak kevert rátája: egy XS-t is tartalmazó csomagtól méltánytalan lenne
 * az L zóna óradíját elvárni.
 *
 * ÍGY A VÉGLEGES ÁRAK: Sima Nyár 32 000 → 37 000, Tetőtől Talpig 56 000 →
 * 63 000, hónalj+bikinivonal 17 000 → 18 000, bikinivonal+lábszár 29 000 →
 * 30 000, teljes láb+hónalj 37 000 → 40 000. A felső ajak + áll páros 12 000-en
 * marad: az 9 000 Ft/óra, vagyis már az első korrekció után is a külön vett
 * XS-ek 8 400-as rátája FÖLÖTT volt.
 *
 * A három páros megtakarítása így egyformán 24 000 Ft lett. Ez NEM elírás:
 * mindhárom páros pontosan egy alkalmankénti ráhagyást spórol, hatszor, közel
 * azonos óradíjon — a paritásos árazásból ez matematikailag következik.
 *
 * AMI SZÁNDÉKOSAN NEM VÁLTOZOTT: az S zóna 11 000 Ft-os ára. Ez a szám dolgozik
 * a title tagben, a meta leírásban, a ragadós sávban és a „belvárosi 23 000 vs
 * nálam 11 000" érvben — ha ez emelkedik, az egész árszekció retorikáját újra
 * kell írni, és elveszik a legerősebb kontraszt. A profit a nagy zónákból és a
 * csomagokból jön, ahol nincs összehasonlítható nyilvános ár.
 *
 * MÁRKANÉV: a gép megnevezését (Soprano Titanium) a tulajdonos kifejezett
 * jóváhagyásával írjuk ki (2026-09-12), mert a kijelzőről készült saját fotó
 * ott van mellette. GYÁRTÓRA vonatkozó állítást (cégnév, ország, FDA/CE) NEM
 * teszünk — arra nincs dokumentum.
 */

// ── Zóna-árlista ──────────────────────────────────────────────────────────────
// 2026-09-12-i DÖNTÉS: az egyalkalmas ár LEKERÜLT az árlistáról mint belépő
// lehetőség, és KARBANTARTÓ árrá értelmeződött át. Két ok:
//
//   1. Az oldal két szakasszal feljebb azt állítja, hogy „egy alkalomtól nem
//      lesz eredményed, csak elköltött pénzed" — majd adott rá árat. A
//      szkeptikus olvasó (akire az egész oldal épül) ezt észreveszi.
//   2. A régi „hat alkalomból kettőt nem fizetsz ki" érv a SAJÁT, magasabb
//      egyalkalmas árunkhoz mért — vagyis önmagunk gyártotta horgony. Mivel
//      egyetlen alkalmat belépőként nem is árulunk, a „6 × 16 000 = 96 000"
//      nem megvásárolható alternatíva, tehát fiktív referenciaár lenne.
//
// Ami a helyére lépett: (a) a hat alkalom TELJES összege — ez az a szám, amire
// a vendég ténylegesen elköteleződik —, és (b) egy KÜLSŐ, ellenőrizhető horgony
// (belvárosi klinikai ár ugyanazzal a géptípussal). Külső bizonyíték erősebb,
// mint a sajátunk.
//
// A `single` mező MARAD: a sorozat utáni karbantartó alkalom ára, és ez egy
// valóban megvásárolható szolgáltatás. Csak nem a belépő táblázat oszlopa.
export type ZoneTag = 'XS' | 'S' | 'M' | 'L' | 'XL';

export interface Zone {
  tag: ZoneTag;
  time: string;
  /** A `time` FELSŐ értéke percben. Miért külön mező és nem string-feldolgozás:
      a lefoglalt sáv képlete (zónaidő + 10 perc ráhagyás) ebből számol, és egy
      elgépelt gondolatjel a `time`-ban némán rossz időpont-hosszat adna. */
  maxMinutes: number;
  /** A sorozat UTÁNI karbantartó alkalom ára. Nem belépő ajánlat. */
  single: string;
  /** Alkalmankénti ár a hat alkalmas sorozatban. */
  serial: string;
  /** A hat alkalom teljes összege — erre köteleződik el a vendég. */
  seriesTotal: string;
  /** Számértékek a kalkulátorhoz és a szűrőkhöz — a string-ár a megjelenítésé. */
  singleNum: number;
  serialNum: number;
  areas: string;
}

export const zones: Zone[] = [
  {
    tag: 'XS', time: '8–10 perc', maxMinutes: 10, single: '10 000 Ft', serial: '7 000 Ft', seriesTotal: '42 000 Ft',
    singleNum: 10000, serialNum: 7000,
    areas: 'felső ajak · áll · szemöldök köze · fülkagyló · kézfej · lábfej · köldökvonal · mellbimbó udvara',
  },
  {
    tag: 'S', time: '10–12 perc', maxMinutes: 12, single: '16 000 Ft', serial: '11 000 Ft', seriesTotal: '66 000 Ft',
    singleNum: 16000, serialNum: 11000,
    areas: 'hónalj · bikinivonal · tarkó · nyak · arc oldala',
  },
  {
    tag: 'M', time: '15–18 perc', maxMinutes: 18, single: '24 000 Ft', serial: '16 000 Ft', seriesTotal: '96 000 Ft',
    singleNum: 24000, serialNum: 16000,
    // TELJES INTIM, 2026-09-20: a szolgáltatás addig nem létezett (az oldal öt
    // helyen mondta, hogy nem vállaljuk), most viszont igen. A besorolás nem
    // érzésre ment, hanem a lezer.ts egyetlen mérőszámával, a LEFOGLALT ÓRÁRA
    // jutó nettóval: 16 000 Ft egy 45 perces sávon 10 667 Ft/óra, ami pontosan
    // az S (9 429) és az L (11 500) közé esik. Az L ára ugyanezen a sávon
    // 15 333 Ft/órát adna — 33%-kal a legjobb zóna (XL, 11 647) fölött, vagyis
    // nem prémium lenne, hanem kilógás a létrából. Felület szerint is stimmel:
    // a teljes intim nagyjából a bikinivonal duplája, ami itt pont egy lépcső.
    areas: 'alkar · felkar · váll · has · derék · popsi · teljes intim · teljes arc',
  },
  {
    tag: 'L', time: '22–28 perc', maxMinutes: 28, single: '34 000 Ft', serial: '23 000 Ft', seriesTotal: '138 000 Ft',
    singleNum: 34000, serialNum: 23000,
    areas: 'lábszár · comb · teljes hát · teljes mellkas · teljes kar',
  },
  {
    tag: 'XL', time: '35–42 perc', maxMinutes: 42, single: '48 000 Ft', serial: '33 000 Ft', seriesTotal: '198 000 Ft',
    singleNum: 48000, serialNum: 33000,
    areas: 'teljes láb (comb és lábszár) · teljes hát és váll',
  },
];

// ── A három csomag ────────────────────────────────────────────────────────────
export interface Pkg {
  tier: string;
  bestFor: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  contains: string;
  perVisit: string;
  total: string;
  /** Áthúzott összehasonlító ár. `null`, ha nincs VALÓDI, megvásárolható
      alternatíva, amihez mérni lehetne — lásd az Első Zónát. */
  priceOld: string | null;
  savings: string | null;
  /** Külső, ellenőrizhető horgony ott, ahol saját áthúzott ár nincs.
      2026-09-15 óta EGYIK csomag sem használja: a belvárosi 23 000 Ft-os
      összevetést a tulajdonos kérésére vettük ki — az árlista bevezetőjéből
      és a „Miért ennyi" szekcióból is (lásd a money page fejléc-kommentárját).
      A mező és a renderelés marad: ha lesz másik, dokumentált külső horgony,
      egy sor a kártyán. Kitalált árat ide soha ne írjunk. */
  marketAnchor?: string;
  /** Semleges címke a megtakarítás-badge helyén, ahol nincs kedvezmény.
      SZÁNDÉKOSAN nem arany kitöltéssel renderelődik: az a kedvezmény jelzése,
      ez viszont pozicionálás. Enélkül a kártya szegényebbnek látszik a másik
      kettőnél — mobilon pedig ez az első, amit a látogató lát. */
  badge?: string;
  dailyEquivalent: string;
  /** A LEFOGLALT idősáv, nem a tiszta kezelési idő — ez az a szám, amit a
      vendég a Notino foglalási felületén is látni fog.

      A SZÁMÍTÁS SZABÁLYA: a csomagban lévő zónák idejének FELSŐ értéke,
      plusz 10 perc. A tíz perc az öltözés, a Fitzpatrick-beállítás és a
      dokumentációs fotó — ez alkalmanként egyszer van, nem zónánként.

      EGYETLEN ZÓNÁRA VISZONT 15 PERC A RÁHAGYÁS, nem tíz. Itt korábban az állt,
      hogy „ugyanez a szabály adja az egyzónás Notino-tételek hosszát is
      (XS 15+10=25, S 20+10=30…)" — ez 2026-09-20-ra MEGDŐLT: a Notinón felső
      ajak 30, hónalj 35, lábszár 60, teljes láb 85 perc. A tulajdonos döntése
      szerint a Notino a mérvadó, tehát a weboldal igazodott hozzá. A csomagok
      ettől függetlenül maradnak tízen — azok a Notinón is így vannak felvive.
      A képlet a `lib/lezerArazas.ts` `lefoglaltPerc()`-ében él, és az
      `ellenorzes()` mind a nyolc élő Notino-idősávot méri build-időben.

      MIÉRT A FELSŐ ÉRTÉK: a tartomány szórása zónánként 5–15 perc, és ez
      összeadódik — a Tetőtől Talpig öt zónája 120 és 155 perc között bárhol
      kijöhet. A ráhagyás viszont NEM adódik össze. Ha a sávot a várható
      értékre méreteznénk, egy sűrűbb szőrzetű vendégnél a kezelés átlógna a
      következő időpontba — egy székkel az azonnal csúszás. A 2026-09-13-i
      első nekifutásomon ezt elrontottam: a kvíz KÖZÉP-értékeiből számoltam,
      így a Tetőtől Talpigra 155 perc jött ki, amiben rossz napon nulla perc
      marad mindenre a kezelésen kívül. */
  duration: string;
  features: string[];
  highlight: boolean;
  ribbon: string | null;
}

export const packages: Pkg[] = [
  {
    tier: 'Belépő',
    bestFor: 'egyetlen terület zavar, és először azt akarod látni, működik-e rajtad.',
    title: 'Első',
    titleAccent: 'Zóna',
    subtitle: 'Egy S zóna · 6 alkalom · 4–6 hetente',
    contains: 'Hónalj vagy bikinivonal vagy tarkó',
    perVisit: '11 000 Ft',
    total: '66 000 Ft',
    // Áthúzott ár SZÁNDÉKOSAN nincs: egyzónás csomagnál nem létezik valódi,
    // megvásárolható alternatíva, amihez mérni lehetne. A másik két csomagnál
    // igen (a tételes sorozat-árak összege), ott marad az áthúzás.
    priceOld: null,
    savings: null,
    badge: 'A legkisebb elköteleződés',
    dailyEquivalent: '≈ napi 181 Ft az első évben — utána nulla',
    // 2026-09-21: a kezelési idők rövidültek, egy S zóna sávja 22 perc.
    duration: '~ 22 perc / alkalom',
    features: [
      'Egészségügyi előszűrés online, a foglalás előtt',
      'Bőrtípus-beállítás a Fitzpatrick-skálán, felírva',
      'Dokumentációs fotó minden alkalom előtt',
      'A sorozatot nem kell előre kifizetned',
    ],
    highlight: false,
    ribbon: null,
  },
  {
    tier: 'A legtöbben ezt választják',
    bestFor: 'nem egy terület zavar, hanem három — és nem akarsz miattuk három külön időpontot.',
    title: 'Sima',
    titleAccent: 'Nyár',
    subtitle: 'Három zóna · 6 alkalom · egy időpontban',
    contains: 'Hónalj + bikinivonal + lábszár',
    perVisit: '37 000 Ft',
    total: '222 000 Ft',
    priceOld: '270 000 Ft',
    savings: '48 000 Ft megtakarítás',
    dailyEquivalent: '≈ napi 608 Ft az első évben',
    duration: '~ 62 perc / alkalom',
    features: [
      'Három terület egyetlen időpontban, nem háromban',
      'Bőrtípus-beállítás a Fitzpatrick-skálán, felírva',
      'Dokumentációs fotó minden alkalom előtt',
      'A sorozatot nem kell előre kifizetned',
    ],
    highlight: true,
    ribbon: 'Három zóna, egy időpont',
  },
  {
    tier: 'Teljes',
    bestFor: 'nem egy-két terület zavar, hanem szeretnél az egésszel végezni.',
    title: 'Tetőtől',
    titleAccent: 'Talpig',
    subtitle: 'Öt zóna · 6 alkalom · egy időpontban',
    contains: 'Hónalj + bikinivonal + teljes láb + alkar + felső ajak',
    perVisit: '63 000 Ft',
    total: '378 000 Ft',
    priceOld: '468 000 Ft',
    savings: '90 000 Ft megtakarítás',
    dailyEquivalent: '≈ napi 1 036 Ft az első évben',
    duration: '~ 1 óra 45 perc / alkalom',
    features: [
      'Öt terület egyetlen időpontban',
      'Egyszerre egy vendég van bent — nem sietünk',
      'Dokumentációs fotó minden alkalom előtt',
      'A sorozatot nem kell előre kifizetned',
    ],
    highlight: false,
    ribbon: null,
  },
];

// A 66 000 és a 192 000 közti rés kitöltése — a legtöbb vendég valójában
// két területtel indul, nem eggyel és nem hárommal.
export const pairs = [
  { name: 'Felső ajak + áll', per: '12 000 Ft', total: '72 000 Ft', apart: '84 000 Ft', save: '12 000 Ft' },
  { name: 'Hónalj + bikinivonal', per: '18 000 Ft', total: '108 000 Ft', apart: '132 000 Ft', save: '24 000 Ft' },
  { name: 'Bikinivonal + lábszár', per: '30 000 Ft', total: '180 000 Ft', apart: '204 000 Ft', save: '24 000 Ft' },
  { name: 'Teljes láb + hónalj', per: '40 000 Ft', total: '240 000 Ft', apart: '264 000 Ft', save: '24 000 Ft' },
];

// ── Kezelhető területek tételesen — a kalkulátor forrása ──────────────────────
// MIÉRT KELLETT (2026-09-20): egy vendég azt írta, hogy több területet szeretne,
// és nincs olyan csomag, amiben mind benne van. Igaza volt, és ez kódszinten is
// látszott: a heróban lévő kvíz nyolc területet kínált, és ha a kiválasztás nem
// egyezett a négy dokumentált párossal vagy a két csomaggal, nem mondott árat —
// csak annyit, hogy „az első alkalom elején megmondom”. Vagyis pont a döntés
// pillanatában hallgatott el.
//
// A `zones` tömb az ÁRLISTÁT rendereli (öt sáv, felsorolt területekkel). Ez a
// katalógus ugyanazt a huszonhét területet adja tételesen, hogy ki lehessen
// pipálni őket. A kettő nem él függetlenül: az ár és az idő itt sehol nincs
// beégetve, a `zone` mezőn keresztül az árlistából jön — áremeléskor itt sincs
// teendő.
//
// A `covers` az egymást TARTALMAZÓ területeké. Enélkül a kalkulátor 42 000 Ft-ot
// mondana a „comb + lábszár”-ra, amit az árlista teljes lábként 33 000-ért ad.
export interface Area {
  id: string;
  label: string;
  zone: ZoneTag;
  /** UI-csoport. A vendég a testén keresi a területet, nem zónaméret szerint. */
  group: string;
  /** Mely területeket foglalja magában. Ha ez be van pipálva, azok feleslegesek;
      ha azok MIND be vannak pipálva, ez a nagyobb terület olcsóbb. */
  covers?: string[];
  /** Halk pontosítás ott, ahol a név önmagában félreérthető. */
  hint?: string;
}

export const areaGroups = [
  'Arc és nyak',
  'Kar, váll, kéz',
  'Törzs',
  'Hónalj és intim terület',
  'Láb',
] as const;

export const areaCatalog: Area[] = [
  // Arc és nyak
  { id: 'felso-ajak', label: 'Felső ajak', zone: 'XS', group: 'Arc és nyak' },
  { id: 'all', label: 'Áll', zone: 'XS', group: 'Arc és nyak' },
  { id: 'szemoldok-koze', label: 'Szemöldök köze', zone: 'XS', group: 'Arc és nyak' },
  { id: 'fulkagylo', label: 'Fülkagyló', zone: 'XS', group: 'Arc és nyak' },
  { id: 'arc-oldala', label: 'Arc oldala', zone: 'S', group: 'Arc és nyak', hint: 'pofacsont és állkapocs vonala' },
  { id: 'teljes-arc', label: 'Teljes arc', zone: 'M', group: 'Arc és nyak', covers: ['felso-ajak', 'all', 'szemoldok-koze', 'arc-oldala'] },
  { id: 'nyak', label: 'Nyak', zone: 'S', group: 'Arc és nyak' },
  { id: 'tarko', label: 'Tarkó', zone: 'S', group: 'Arc és nyak' },

  // Kar, váll, kéz
  { id: 'kezfej', label: 'Kézfej', zone: 'XS', group: 'Kar, váll, kéz' },
  { id: 'alkar', label: 'Alkar', zone: 'M', group: 'Kar, váll, kéz', hint: 'könyöktől a csuklóig' },
  { id: 'felkar', label: 'Felkar', zone: 'M', group: 'Kar, váll, kéz', hint: 'váll és könyök között' },
  { id: 'teljes-kar', label: 'Teljes kar', zone: 'L', group: 'Kar, váll, kéz', covers: ['alkar', 'felkar'] },
  { id: 'vall', label: 'Váll', zone: 'M', group: 'Kar, váll, kéz' },

  // Törzs
  { id: 'koldokvonal', label: 'Köldökvonal', zone: 'XS', group: 'Törzs', hint: 'a köldöktől lefelé futó csík' },
  { id: 'mellbimbo-udvara', label: 'Mellbimbó udvara', zone: 'XS', group: 'Törzs' },
  { id: 'has', label: 'Has', zone: 'M', group: 'Törzs', covers: ['koldokvonal'] },
  { id: 'derek', label: 'Derék', zone: 'M', group: 'Törzs' },
  { id: 'teljes-mellkas', label: 'Teljes mellkas', zone: 'L', group: 'Törzs', covers: ['mellbimbo-udvara'] },
  { id: 'teljes-hat', label: 'Teljes hát', zone: 'L', group: 'Törzs' },
  { id: 'teljes-hat-vall', label: 'Teljes hát és váll', zone: 'XL', group: 'Törzs', covers: ['teljes-hat', 'vall'] },

  // Hónalj és intim terület
  { id: 'honalj', label: 'Hónalj', zone: 'S', group: 'Hónalj és intim terület' },
  // Halk pontosítás SZÁNDÉKOSAN nincs (a tulajdonos kérésére, 2026-09-20).
  { id: 'bikinivonal', label: 'Bikinivonal', zone: 'S', group: 'Hónalj és intim terület' },
  // A `covers` itt EGYETLEN elemű, és ez szándékos: a teljes intim magában
  // foglalja a bikinivonalat, tehát ha mindkettő ki van pipálva, a bikinivonal
  // kiesik. Automatikus FELFELÉ váltás viszont nincs — arra a motor legalább
  // két lefedett területet kér, és itt ez pont jó: egy bikinivonalat kérő
  // vendégnek nem tolunk oda magától teljes intimet.
  { id: 'teljes-intim', label: 'Teljes intim', zone: 'M', group: 'Hónalj és intim terület', covers: ['bikinivonal'] },
  { id: 'popsi', label: 'Popsi', zone: 'M', group: 'Hónalj és intim terület' },

  // Láb
  { id: 'labfej', label: 'Lábfej', zone: 'XS', group: 'Láb' },
  { id: 'labszar', label: 'Lábszár', zone: 'L', group: 'Láb', hint: 'térdtől lefelé' },
  { id: 'comb', label: 'Comb', zone: 'L', group: 'Láb', hint: 'térdtől felfelé' },
  { id: 'teljes-lab', label: 'Teljes láb', zone: 'XL', group: 'Láb', covers: ['comb', 'labszar'] },
];

// ── A gép: jellemző + haszon párban ───────────────────────────────────────────
// Minden sor bal oldala a kijelzőn is ELLENŐRIZHETŐ tény (a fotókon látszik),
// a jobb oldala a vendégnek szóló következmény.
export const machineFacts = [
  {
    feature: '755 + 808 + 1064 nm egyszerre',
    benefit:
      'A 755 nm a vékonyabb, világosabb szálra erősebb, a 808 nm az általános munkahullámhossz, az 1064 nm hatol a legmélyebbre és a sötétebb bőrön ez a biztonságosabb. Nem kell választanod: mind a három megy.',
  },
  {
    feature: 'SHR és HR üzemmód',
    benefit:
      'Az SHR sok gyenge impulzussal, fokozatosan melegít — ez a kíméletesebb. A HR egyetlen erős impulzussal dolgozik, vastag szálra hatékonyabb. Hogy melyik megy, azt a területhez és a bőrödhöz választom ki.',
  },
  {
    feature: 'Fitzpatrick I–VI bőrtípus-beállítás',
    benefit:
      'A te bőrtípusodhoz állítom be az energiát, és fel is írom. A hatodik alkalomkor ugyanaz megy, ami az elsőnél bevált.',
  },
];

// ── A menet ───────────────────────────────────────────────────────────────────
export const processSteps = [
  {
    step: '01',
    title: 'Még a foglalás előtt',
    body: 'A foglalás gombra kattintva feljön egy rövid lista: betegségek, gyógyszerek, és hogy mi történt a bőröddel az elmúlt hetekben. Ha valami igaz rád, ott helyben megmondom, hogy az halasztást jelent-e, és mikortól jöhetsz. A válaszaidat nem mentem el és nem küldöm sehová.',
  },
  {
    step: '02',
    title: 'Az első alkalom',
    body: 'Kitöltünk egy rövid adatlapot, megnézem a szálad színét és vastagságát, és beállítom a bőrtípusodat a Fitzpatrick-skálán — ezt fel is írom, hogy a hatodik alkalomkor ugyanaz menjen. Utána borotvált, tiszta bőrre dolgozunk: védőszemüveg, gél, és indul. Hónalj 10–12 perc, lábszár 28, teljes láb 42. Végig mondom, mi következik, és bármikor szólhatsz, hogy álljunk meg.',
  },
  {
    step: '03',
    title: '4–6 hét, aztán újra',
    body: 'A lézer csak a növekedési fázisban lévő szálat éri el — egy adott pillanatban ez a szálak nagyjából ötöde. A többi épp pihen. Négy-hat hét múlva egy újabb adag lép növekedési fázisba: ezért pont ennyi idő múlva van értelme visszajönni.',
  },
  {
    step: '04',
    title: 'A hatodik alkalom után',
    body: 'A szálak nagy része nem jön vissza, ami visszanő, az vékonyabb és ritkább. A legtöbb vendégnél ezután évi egy-két karbantartó alkalom tartja szinten. A fotókat végig gyűjtjük, tehát nem emlékezetből kell felidézned, mi változott.',
  },
];

// ── Kinek működik, és kinek nem ───────────────────────────────────────────────
// Ez a lista SZÁNDÉKOSAN fent van minden variánson. Ösztön ellen való kiírni,
// kinek nem való — de ez szűri ki a rossz foglalást, és ez hitelesíti az összes
// többi állítást. A szkeptikus addig nem hisz semmit, amíg nem lát egy „nem"-et.
export const worksFor = [
  'Sötétszőke, barna és fekete szál — ezen dolgozik a legjobban.',
  'Világos és közepesen sötét bőr egyaránt, mert a bőrtípus szerint állítjuk a hullámhosszat és az energiát.',
  'Vastag, erős szál — hónalj, bikinivonal, lábszár, comb.',
  'Borotválkozás utáni bőrpír és benőtt szőr: ezen a lézer sokat javít, mert megszűnik az, ami okozza.',
];

export const worksNotFor = [
  'Kizárólag női vendégeket kezelek.',
  'Várandósság és szoptatás idején nem kezelek.',
  // A „Teljes intim kezelést nem vállalok" sor 2026-09-20-án KIKERÜLT: a
  // szolgáltatás azóta létezik (M zóna, 16 000 Ft). Ne rakd vissza.
  'Pacemaker, szívbetegség, epilepszia és spaszticitás — ezek mellett nem vállalom a kezelést.',
  'Ősz és fehér szál — ezen a lézer nem tud dolgozni: nincs a szálban festék, amit fel tudna melegíteni.',
  'Világosszőke és világosvörös szál — az eredmény gyengébb és nehezen kiszámítható, ezért előre nem tudok rá ígéretet tenni.',
  'Frissen barnult vagy szoláriumozott bőr — barnulás után 2–4 hét szünet szükséges, mielőtt elkezdjük.',
  'Fényérzékenyítő gyógyszer (izotretinoin, egyes antibiotikumok, orbáncfű) — ilyenkor megvárjuk a kúra végét.',
  'Botox a területen fél éven belül, injekciós bőrfiatalítás két héten belül, vagy önbarnító az elmúlt két hétben — ezeket ki kell várni.',
  'Tetovált bőrfelület, aktív herpesz, gyulladt vagy sérült bőr a kezelendő területen — ezeket kihagyjuk.',
];

// ── Amit vállalok ─────────────────────────────────────────────────────────────
// FONTOS: ez NEM garancia, és nem is szabad annak nevezni — a szalonnak nincs
// formális elégedettségi garanciája (2026-09-07-i visszaigazolás). Ez itt három
// konkrét, ELLENŐRIZHETŐ feltétel, ami egy egyszemélyes kozmetikában betartható.
export const commitments = [
  {
    n: '01',
    title: 'A sorozatot nem kell előre kifizetned',
    body:
      'Alkalmanként fizetsz, a sorozat árán. Ha az első kezelés után azt mondod, hogy ez nem neked való, ott abbahagyjuk. Ezért nincs bérlet és nincs előre utalás.',
  },
  {
    // A korábbi 02-es vállalás („a hetedik és a nyolcadik fele áron") 2026-09-13-án
    // lekerült. Ami a helyére jött, SZÁNDÉKOSAN nem kedvezmény: nem ígér semmit,
    // amit utólag ki kellene fizetni, viszont pont azt a félelmet kezeli, ami a
    // legtöbb foglalást megállítja — „mi van, ha rajtam nem működik, és ezt csak
    // a negyedik alkalomnál mondják meg". A tartalma nem új ígéret: az előszűrő
    // kérdőív és a worksNotFor lista már az oldalon van, ez csak kimondja őket
    // vállalásként.
    n: '02',
    title: 'Ha nem működne rajtad, azt előre megmondom',
    body:
      'A foglalás előtt végigfutsz egy rövid kérdéssoron, az első alkalom elején pedig megnézem a bőröd és a szálaidat. Ha azon a területen nem várható értékelhető eredmény, azt még a sorozat megkezdése előtt elmondom.',
  },
  {
    n: '03',
    title: 'Minden alkalom előtt fotózok',
    body:
      'Ugyanarról a területről, ugyanabban a fényben. A képek a tieid — a harmadik alkalomra látszik rajtuk a változás.',
  },
];

// ── GYIK ──────────────────────────────────────────────────────────────────────
// A sorrend a FENYEGETETTSÉG szerinti, nem a logika szerinti: előbb a fájdalom
// és a biztonság, csak utána a pénz.
export const faqs = [
  {
    q: 'Fáj a lézeres szőrtelenítés?',
    a: 'Nem úgy, mint a gyanta. A legtöbb vendég meleg gumipöccintésnek írja le. A kezelőfejben hűtött fémlap van, ami folyamatosan hűti a bőrt, miközben az impulzus megy — ez viszi el az érzés nagy részét. A vékonyabb bőrű helyeken, például a felső ajkon és az intim területen erősebb az érzés; a hónaljon és a lábon a legtöbben simán végigbeszélgetik. Ha az első néhány impulzus után azt mondod, hogy ez sok, lejjebb veszem az energiát vagy átváltok a fokozatosan melegítő üzemmódra. Nem kell kibírnod semmit.',
  },
  {
    q: 'Működik szőke vagy ősz szőrre?',
    a: 'Ősz és fehér szálra nem működik: a lézer a szálban lévő festéket keresi, és ha nincs benne festék, nincs mit felmelegítenie. Világosszőkén és világosvörösön gyengébb és nehezen kiszámítható az eredmény — erre előre nem tudok ígéretet tenni. Sötétszőke, barna és fekete szálon dolgozik a legjobban. Ha bizonytalan vagy, az első alkalom után már látod a saját szálodon, mire számíthatsz — és ha nem éri meg, azt elmondom, mielőtt sorozatba kezdenénk.',
  },
  {
    q: 'Nem veszélyes? Mi van, ha megég a bőröm?',
    a: 'A kockázat a rossz beállításban van, nem a lézerben. Három dolog tartja kézben. Az első a foglalás előtti előszűrés: még mielőtt időpontod lenne, kiderül, ha valami kizárja vagy halasztja a kezelést. A második a bőrtípusod beállítása a Fitzpatrick-skálán, alacsonyabb energiáról indulva, hűtött kezelőfejjel. A harmadik pedig az, amihez nem nyúlok: az anyajegyeket letakarom, tetovált bőrfelületre nem dolgozom, frissen barnult bőrön nem kezdek, és ha bármi szokatlant látok a bőrödön, azt a területet aznap kihagyjuk. Ha fényérzékenyítő gyógyszert szedsz — izotretinoin, antibiotikum, orbáncfű —, azt az előszűrés is kérdezi, és megmondja, mennyit kell várni.',
  },
  {
    q: 'Hány alkalom kell, és miért nem elég egy?',
    a: 'Hat-nyolc alkalom, 4–6 hetente. Azért ennyi, mert a szőrszál háromféle állapotban lehet, és a lézer csak a növekedési fázisban lévőt éri el — ez egy adott pillanatban a szálak nagyjából ötöde. A többi épp pihen, azokat ilyenkor nem éri el. Négy-hat hét múlva egy újabb adag lép növekedési fázisba, ezért pont ennyi idő múlva van értelme visszajönni. Ezért szólnak az árak is a sorozatra: egyetlen alkalomtól még nem látszik eredmény.',
  },
  {
    q: 'Miért kell kitöltenem valamit, mielőtt foglalhatok?',
    a: 'Mert a lézeres szőrtelenítésnek vannak ellenjavallatai, és jobb, ha ezt itthon tudod meg, nem a kezelőben. A foglalás gombra kattintva feljön egy lista: betegségek, gyógyszerek, és hogy mi történt a bőröddel az elmúlt hetekben. A legtöbb vendégnek egyik sem igaz rá, nekik ez egyetlen koppintás. Akinek igen, az rögtön látja, mit jelent: van, ami csak annyit, hogy két héttel később kezdünk, és van, ami azt, hogy ezt a kezelést nem tudom elvállalni. A válaszaidat nem mentem el és nem küldöm sehová — a lista csak azért van, hogy ne ide érkezve derüljön ki valami.',
  },
  {
    q: 'Nyáron is lehet, vagy meg kell várni az őszt?',
    a: 'Frissen barnult vagy szoláriumozott bőrre nem kezdek — ott nő meg az égés kockázata. Barnulás után 2–4 hét szünet kell. Ha nyáron végig árnyékban tudod tartani a kezelt területet és erős fényvédőt használsz, mehet a kezelés, a mindennapokban viszont ezt kevesen tudják tartani. Ezért érdemes a sorozatot ősszel vagy télen elkezdeni. Hat alkalom 4–6 hetente hat-nyolc hónap: aki szeptemberben kezd, annak júniusra kész a sorozata.',
  },
  {
    q: 'Mennyibe kerül a lézeres szőrtelenítés Budapesten?',
    a: 'Hónalj vagy bikinivonal: 11 000 Ft alkalmanként, hat alkalom összesen 66 000 Ft. Teljes láb: 33 000 Ft alkalmanként, hat alkalom 198 000 Ft. A három zónás Sima Nyár csomag (hónalj, bikinivonal, lábszár) alkalmanként 37 000 Ft, hat alkalom 222 000 Ft — a három zónát külön-külön véve 270 000 Ft lenne. Az árak a sorozatra szólnak, mert egyetlen alkalomtól még nem látszik eredmény; a sorozat után a karbantartó alkalmak egyesével jönnek, hónaljra 16 000 Ft. A sorozatot nem kell előre kifizetned: minden alkalommal csak az aznapit fizeted.',
  },
  {
    q: 'Előre ki kell fizetnem a sorozatot?',
    a: 'Nem. Alkalmanként fizetsz, a sorozat árán, a helyszínen, a kezelés után. Ha az első kezelés után azt mondod, hogy ez nem neked való, ott abbahagyjuk, és nem tartozol tovább semmivel. A foglaláshoz sem kell kártyaadat, és 24 órával az időpont előtt díjmentesen lemondható.',
  },
  {
    q: 'Mit kell csinálnom a kezelés előtt?',
    a: 'Egyetlen dolgot: a kezelés előtti nap vagy aznap reggel borotváld le a területet. A szálnak a bőr alatt kell lennie, a felszínen nem — ha borotválatlanul érkezel, vagy elmegy vele az időnk, vagy át kell tennünk az időpontot. Amit ne csinálj: ne gyantázz, ne epilálj és ne csipeszezz négy héttel a kezelés előtt (a szálnak a hagymában kell maradnia), ne napozz és ne szoláriumozz két hétig, és a kezelés napján ne legyen dezodor vagy testápoló a területen.',
  },
  {
    q: 'Végleges szőrtelenítés ez, vagy visszanő?',
    a: 'A szakma tartós szőrcsökkentésnek hívja — ez a pontosabb szó rá. Amit reálisan várhatsz: a szálak nagy része nem nő vissza, ami visszanő, az vékonyabb, világosabb és ritkább, és a legtöbb vendégnél évi egy-két karbantartó alkalom tartja szinten. Amit nem ígérhetek: hogy soha többé egyetlen szál sem nő ki. Ha a szőrnövekedésed mögött hormonális ok áll, például PCOS, akkor az arcon és az állon számolj rendszeres karbantartással — ott a lézer nem lezárja a kérdést, hanem kezelhetővé teszi.',
  },
  {
    q: 'Miért drágább, mint a gyanta?',
    a: 'Egyetlen alkalmat nézve tényleg drágább. Egy évet nézve nem. Ha négyhetente gyantáztatod a hónaljadat, az évente tizenhárom alkalom, jövőre ugyanennyi, azután is — és nincs vége. A hónalj-sorozat nálam összesen 66 000 Ft, alkalmanként 11 000 Ft-ra elosztva, és nagyjából másfél év gyantázás árából kijön. Utána évi egy-két karbantartó alkalom, és kész.',
  },
  {
    q: 'Kínos lesz a bikinivonal kezelése?',
    a: 'Egyszerre egy vendéget fogadok, más nincs bent a szalonban, és kizárólag nőket kezelek. Csak azt a területet hagyjuk szabadon, amin épp dolgozunk, és ha szünetet kérsz, megállunk. Bikinivonalat és teljes intim területet egyaránt kezelek.',
  },
  {
    q: 'Férfiakat is fogadsz?',
    a: 'Nem, kizárólag női vendégeket kezelek.',
  },
  {
    q: 'Le lehet mondani vagy módosítani az időpontot?',
    a: 'Igen, 24 órával az időpont előtt bármikor díjmentesen.',
  },
  // A helyi kérdés az AI-asszisztensek miatt került be: a 2026-10-19-i panelen a
  // „lézeres szőrtelenítés Zuglóban, hova menjek?" típusú kérdésekre a Google
  // AI-módja azokat az oldalakat idézte, amelyek kimondják a kerületet és a
  // megközelítést. A közlekedési adat ugyanaz, mint a SiteContact blokkban.
  {
    q: 'Hol van a szalon, és honnan könnyű odajutni?',
    a: 'Zuglóban, a XIV. kerületben: 1143 Budapest, Egressy út 16. Az Örs vezér tere felől az M2-vel és a 77-es trolival 18 perc. Jár erre az 1-es villamos és a 75-ös troli is, így a Hungária körút és a Kerepesi út felől is egyszerű. Parkolni a helyszínen lehet, fizetős.',
  },
];

// A lézerre MÉG NINCS saját vendég-véleményem — ezek a meglévő kezelésekről
// szólnak, és minden variánson pontosan így vannak keretezve („a lézer új, az
// ember nem"). Szándékosan azok a vélemények kerültek ide, amelyek a MUNKAMÓDRÓL
// szólnak (alaposság, magyarázat, rugalmasság): az vihető át, az eredmény nem.
export const testimonials = [
  { name: 'Gabriella Hendrik', rating: 5, text: 'Már az első pillanattól kezdve kedvesen és figyelmesen fogadott, végig érezhető volt a profizmus és a hozzáértés. A végeredmény magáért beszél: gyönyörű lett a pillám. Biztosan visszatérek még, és szívből ajánlom mindenkinek!', outcome: 'Visszatérő vendég', service: 'Szempilla lifting' },
  { name: 'Krisztina Daczó', rating: 5, text: 'Először jártam Fruzsinál szemöldök lamináláson, és nagyon meg vagyok elégedve. Nagyon kellemes volt a légkör és Fruzsi személyisége is nagyon pozitív. Rugalmas az időpontokat illetően, amit nagyon köszönök neki!', service: 'Szemöldök laminálás' },
  { name: 'Orosz-Adamcsek Zsuzsanna', rating: 5, text: 'Szinte azonnal kaptam időpontot, nagyon rugalmas volt Fruzsi. Minden kérésemet figyelembe vette és egy csodás sminket készített nekem. Visszatérek még hozzá a közeljövőben is.', outcome: 'Szinte azonnal kapott időpontot', service: 'Alkalmi smink' },
];

export const crossSell = [
  { title: 'Szempilla lifting', price: '12 000 Ft', body: 'Koreai technikával, a saját pilláidból — 6–8 hétig tartós, ragasztó nélkül.', href: '/szempilla-lifting-zuglo/' },
  { title: 'Szemöldök laminálás', price: '11 000 Ft', body: 'Formázással és festéssel együtt, tű és tetoválás nélkül, ~6 hétig tartós.', href: '/szemoldok-laminalas-zuglo/' },
  { title: 'Janssen arckezelés', price: '16 000 Ft-tól', body: 'Bőranalízissel kezdünk, és arra épül a kezelés.', href: '/arckezeles-zuglo/' },
];

// ── Képek ─────────────────────────────────────────────────────────────────────
// 2026-09-17: a gépről készült fotók CSERÉLVE. A korábbi felvételeken a kijelző
// fóliával volt letakarva — a gyűrődés és a csillanás minden képen látszott, és
// a képernyő szövege olvashatatlan volt. Az új, fólia nélküli fotóból két KÜLÖN
// keret készült (`machine` = az egész gép, `settings` = szoros a kijelzőn), hogy
// a „A gép" szekció két képe ne ugyanaz a kivágás legyen.
//
// A `fitzpatrick` kulcs ezért lett `settings`: az új fotón a kezelés paraméterei
// állnak a képernyőn, nem a Fitzpatrick-skála — a régi néven hivatkozva a kép
// olyat állított volna, amit nem mutat.
export const images = {
  machine: '/img/lezeres-szortelenites-gep-zuglo-egressy-ut-budapest.webp',
  machineWide: '/img/lezeres-szortelenites-dioda-lezer-808-755-1064nm-zuglo.webp',
  head: '/img/dioda-lezer-kezelofej-kozelrol-frubeauty-zuglo.webp',
  settings: '/img/lezeres-szortelenites-bortipus-fitzpatrick-beallitas-zuglo.webp',
  room: '/img/lezeres-szortelenites-kozmetika-zuglo-egressy-ut.webp',
  portrait: '/img/pecze-kovacs-fruzsina-zuglo-kozmetikus.webp',
};

// ── SEO ───────────────────────────────────────────────────────────────────────
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

/* A jelenlegi lézerárak utolsó érvényes napja: 2027-03-01-től új árlista él
   (FRUBEAUTY-ARAZAS-2027.md). Árcserekor ezt a dátumot is léptetni kell. */
const PRICE_VALID_UNTIL = '2027-02-28';

export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Dióda lézeres szőrtelenítés Budapest',
  alternateName: ['Tartós szőrtelenítés', 'Végleges szőrtelenítés'],
  serviceType: 'Lézeres szőrtelenítés',
  description:
    'Soprano Titanium dióda lézeres szőrtelenítés három hullámhosszon (755, 808 és 1064 nm) Budapesten, a XIV. kerületben. Hat-nyolc alkalmas sorozat 4–6 hetente, bőrtípus-beállítással a Fitzpatrick-skálán és foglalás előtti egészségügyi előszűréssel. A sorozatot nem kell előre kifizetni.',
  url: 'https://frubeauty.com/lezeres-szortelenites-budapest/',
  provider: { '@type': 'BeautySalon', '@id': 'https://frubeauty.com/#business' },
  areaServed: [
    { '@type': 'City', name: 'Budapest' },
    { '@type': 'AdministrativeArea', name: 'Zugló' },
  ],
  /* Alkalmankénti árak, tételenként. Korábban egyetlen AggregateOffer állt itt,
     ami az alkalmi zónaárat (7 000 Ft) és a hatalkalmas csomag teljes árát
     (378 000 Ft) egy sávba keverte. A lista a `zones` és a `packages` tömbből
     épül, árváltozáskor ide nem kell nyúlni, csak a dátumhoz. */
  offers: [
    ...zones.map((z) => ({
      '@type': 'Offer',
      name: `${z.tag} zóna, sorozatban alkalmanként: ${z.areas.split(' · ').join(', ')}`,
      price: String(z.serialNum),
      priceCurrency: 'HUF',
      availability: 'https://schema.org/InStock',
      priceValidUntil: PRICE_VALID_UNTIL,
    })),
    ...packages.map((p) => ({
      '@type': 'Offer',
      name: `${p.title} ${p.titleAccent} csomag, alkalmanként: ${p.contains}`,
      price: p.perVisit.replace(/\D/g, ''),
      priceCurrency: 'HUF',
      availability: 'https://schema.org/InStock',
      priceValidUntil: PRICE_VALID_UNTIL,
    })),
  ],
};

export const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'A lézeres szőrtelenítés menete — FRUBEAUTY Budapest',
  description:
    'Amit végleges szőrtelenítésnek hívnak: hat alkalom 4–6 hetente. Mi történik a lézeres szőrtelenítés során a zuglói szalonban — a foglalás előtt online előszűrés, az első alkalmon bőrtípus-beállítás és rögtön a kezelés.',
  totalTime: 'PT90M',
  step: processSteps.map((s) => ({
    '@type': 'HowToStep',
    name: s.title,
    text: s.body,
  })),
};

export const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Főoldal', item: 'https://frubeauty.com' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Lézeres szőrtelenítés Budapest',
      item: 'https://frubeauty.com/lezeres-szortelenites-budapest/',
    },
  ],
};
