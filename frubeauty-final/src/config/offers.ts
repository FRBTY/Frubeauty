/**
 * Kanonikus szolgáltatás-ajánlatok — EGY forrás a névhez, az árhoz és ahhoz,
 * hogy a látogató mit keressen a Notino foglalási felületén.
 *
 * MIÉRT KERÜLT KÜLÖN FÁJLBA: ez a tábla eddig az `ArticleOffer.astro`-ba volt
 * zárva, így csak a blogcikkek használhatták. A `notinoHint` viszont a teljes
 * oldal legfontosabb súrlódás-oldó adata, nem csak a blogé: a Notino „Foglalás"
 * gombjai <button>-ök, nem linkek, ezért egyetlen szolgáltatásra NEM adható
 * közvetlen hivatkozás — mindenki a szalon-oldal tetején landol, és 25 tétel
 * közül kell kiválasztania a sajátját. Aki nem tudja, mit keressen, ott elveszik.
 *
 * A `notinoHint` értékei BETŰ SZERINT a Notino szolgáltatás-listájából valók.
 * Ha ott átnevezel egy szolgáltatást, ITT kell átírni — máshol nincs beégetve.
 *
 * KIVÉTEL a lézer: ott nincs egyetlen megnevezhető tétel, mert 2026-09-14 óta
 * minden zóna a SAJÁT nevén szerepel („Hónalj – lézeres szőrtelenítés" stb.), és
 * a korábbi gyűjtő „Lézeres szőrtelenítés – első alkalom" tétel megszűnt — a
 * vendég rögtön arra a területre foglal, amit kezeltetni akar. A hint ezért ott
 * mintát ad, nem pontos tételnevet.
 */
export type OfferCategory =
  | 'Szempilla'
  | 'Szemöldök'
  | 'Szemöldökfestés'
  | 'Arckezelés'
  | 'Alkalmi smink'
  | 'Esküvői smink'
  | 'Bőrápolás'
  | 'Lézer';

export interface Offer {
  /** A szolgáltatás teljes neve — ez a doboz címe. */
  service: string;
  /** Rövid név szűk helyre (slim sáv, ragadós foglalás-sáv). */
  short: string;
  price: string;
  /** Három tény: időtartam, tartósság, megkülönböztető. */
  facts: string[];
  /** Egy mondat, ami a cikkből a kezelésbe vezet. */
  body: string;
  /** A pillér-oldal, ahova a „részletek" visz — leíró anchorral. */
  href: string;
  anchor: string;
  /** Amit a látogatónak a Notino listájában keresnie kell. Lásd a fenti magyarázatot. */
  notinoHint: string;
}

export const OFFERS = {
  Szempilla: {
    service: 'Szempilla lifting festéssel',
    short: 'Szempilla lifting festéssel',
    price: '12 000 Ft',
    facts: ['~75 perc', '6–8 hétig tartós', 'ragasztó és műszempilla nélkül'],
    body:
      'Koreai technikával, a saját pilláidból — Zuglóban, az Egressy úton. Egyszerre egy vendég, így nincs kapkodás.',
    href: '/szempilla-lifting-zuglo/',
    anchor: 'szempilla lifting Zuglóban',
    notinoHint: 'Szempilla lifting + szempillafestés',
  },
  Szemöldök: {
    service: 'Szemöldök laminálás formázással és festéssel',
    short: 'Szemöldök laminálás',
    price: '11 000 Ft',
    facts: ['~60 perc', '6 hétig tartós', 'tű és tetoválás nélkül'],
    body:
      'Formázás és festés is benne van — nem külön tétel. Zuglóban, az Egressy úton, egyszerre egy vendéggel.',
    href: '/szemoldok-laminalas-zuglo/',
    anchor: 'szemöldök laminálás Zuglóban',
    notinoHint: 'Szemöldök laminálás Festéssel Formázással',
  },
  // 2026-09-29: saját oldal (/szemoldokfestes-zuglo/) a „szemöldökfestés" (320/hó,
  // +52%) és „szemöldök formázás" (140/hó) keresésre. Az ár a Notinóé (6 000 Ft,
  // 55 perc) — a site korábban 5 000 Ft-ot írt, az volt elavult.
  'Szemöldökfestés': {
    service: 'Szemöldök formázás és festés',
    short: 'Szemöldökfestés és formázás',
    price: '6 000 Ft',
    facts: ['~55 perc', 'a forma az arcodhoz', 'szempillafestéssel 8 000 Ft'],
    body:
      'A felesleges szálak kiszedése, a forma kialakítása és tartós festés egy alkalommal — Zuglóban, az Egressy úton.',
    href: '/szemoldokfestes-zuglo/',
    anchor: 'szemöldökfestés Zuglóban',
    notinoHint: 'Szemöldök formázás és festés',
  },
  Arckezelés: {
    service: 'Janssen arckezelés bőranalízissel',
    short: 'Janssen arckezelés',
    price: '16 000 Ft-tól',
    facts: ['bőranalízissel indul', 'Janssen Cosmetics hatóanyagok', 'mélytisztító, hidratáló, anti-aging'],
    body:
      'Minden alkalom bőranalízissel kezdődik, és arra épül a protokoll — nem fordítva. Zuglóban, az Egressy úton.',
    href: '/arckezeles-zuglo/',
    anchor: 'arckezelés Zuglóban',
    notinoHint: 'Kozmetikai kezelés',
  },
  Bőrápolás: {
    service: 'Janssen arckezelés bőranalízissel',
    short: 'Janssen arckezelés',
    price: '16 000 Ft-tól',
    facts: ['bőranalízissel indul', 'Janssen Cosmetics hatóanyagok', 'mélytisztító, hidratáló, anti-aging'],
    body:
      'Az otthoni rutin fele siker — a másik fele az, hogy tudd, milyen a bőröd. Ezzel kezdünk, Zuglóban.',
    href: '/arckezeles-zuglo/',
    anchor: 'arckezelés Zuglóban',
    notinoHint: 'Kozmetikai kezelés',
  },
  // 2026-09-29: a korábbi közös „Esküvői és alkalmi smink" ajánlat KETTÉVÁLT, mert
  // a két szándék két oldalra költözött: az esküvői a /sminkes-zuglo/-n maradt (ott
  // van a rangsor), az alkalmi saját oldalt kapott. A két esküvői blogcikk kategóriája
  // ezért lett „Esküvői smink" — különben az ArticleOffer az alkalmi ajánlatot tenné
  // egy menyasszonynak szóló cikk alá.
  'Alkalmi smink': {
    service: 'Alkalmi smink',
    short: 'Alkalmi smink',
    price: '15 000 Ft',
    facts: ['60–75 perc', 'bőrelőkészítéssel és fixálással', 'fotózásra 17 000 Ft'],
    body:
      'Estélyre, szalagavatóra, ballagásra vagy fotózásra — Zuglóban, az Egressy úton, egyszerre egy vendéggel.',
    href: '/alkalmi-smink-budapest/',
    anchor: 'alkalmi smink Budapesten',
    notinoHint: 'Alkalmi smink',
  },
  // A Notino „Menyasszonyi csomag" tételének SAJÁT foglalási utasítása: a csomagot az
  // esküvő NAPJÁRA kell foglalni, a próbasmink időpontját üzenetben egyeztetik. A hint
  // ezt a sorrendet adja tovább, hogy a menyasszony ne a próbasmink dátumára foglaljon.
  'Esküvői smink': {
    service: 'Menyasszonyi smink próbasminkkel',
    short: 'Menyasszonyi smink',
    price: '30 000 Ft',
    facts: ['próbasminkkel csomagban 40 000 Ft', 'örömanyával együtt 51 000 Ft', 'kiszállással is'],
    body:
      'A próbasminken beállítjuk a végleges stílust, és fotóval rögzítjük — a nagy napon ugyanaz kerül fel. Budapesten kiszállással is.',
    href: '/sminkes-zuglo/',
    anchor: 'esküvői smink Budapesten',
    notinoHint: 'Menyasszonyi csomag — az esküvő napjára',
  },
  'Lézer': {
    service: 'Lézeres szőrtelenítés',
    short: 'Lézeres szőrtelenítés',
    price: '11 000 Ft-tól alkalmanként',
    facts: ['755 + 808 + 1064 nm', '6–8 alkalom, 4–6 hetente', 'a sorozatot nem kell előre kifizetni'],
    body:
      'Soprano Titanium dióda lézer három hullámhosszon, Zuglóban, egyszerre egy vendéggel. A foglalás előtt egy rövid egészségügyi előszűrésen futsz át, az első alkalmon pedig beállítom a bőrtípusodat, és rögtön kezelünk is.',
    href: '/lezeres-szortelenites-budapest/',
    anchor: 'lézeres szőrtelenítés Budapesten',
    notinoHint: 'a kezelendő terület — például „Hónalj – lézeres szőrtelenítés”',
  },
} satisfies Record<OfferCategory, Offer>;
