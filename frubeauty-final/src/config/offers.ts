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
 */
export type OfferCategory =
  | 'Szempilla'
  | 'Szemöldök'
  | 'Arckezelés'
  | 'Alkalmi smink'
  | 'Bőrápolás';

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
    facts: ['~90 perc', '6–8 hétig tartós', 'ragasztó és műszempilla nélkül'],
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
  'Alkalmi smink': {
    service: 'Esküvői és alkalmi smink',
    short: 'Esküvői és alkalmi smink',
    price: '15 000 Ft-tól',
    facts: ['menyasszonyi 30 000 Ft', 'próbasminkkel csomagban 39 000 Ft', 'kiszállással is'],
    body:
      'Alkalmi smink 15 000 Ft-tól, menyasszonyi smink próbasminkkel csomagban. Rejtett díj nincs — az árat előre tudod.',
    href: '/sminkes-zuglo/',
    anchor: 'esküvői és alkalmi smink Budapesten',
    notinoHint: 'Alkalmi smink',
  },
} satisfies Record<OfferCategory, Offer>;
