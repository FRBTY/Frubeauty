/**
 * Single source of truth for all contact-, social- and booking-related URLs.
 * Imported by Layout, SiteHeader, SiteFooter and individual pages so the data
 * never drifts between files.
 */
export const siteConfig = {
  booking: 'https://www.notino.hu/szalonok/pecze-kovacs-fruzsina-sminkes,-szemoldok-es-szempilla-stylist',
  phone: '+36702159954',
  phoneDisplay: '+36 70 215 9954',
  email: 'kfruzsi0197@gmail.com',
  address: '1143 Budapest, Egressy út 16.',
  postalCode: '1143',
  streetAddress: 'Egressy út 16.',
  locality: 'Budapest',
  country: 'HU',
  geo: { latitude: 47.5058846, longitude: 19.1024696 },
  mapsUrl:
    'https://www.google.com/maps/place/Pecze-Kov%C3%A1cs+Fruzsina+Kozmetikus+-+Szempilla+%C3%A9s+Szem%C3%B6ld%C3%B6k+Stylist/@47.5058846,19.1024696,17z/data=!3m1!4b1!4m6!3m5!1s0x4741dd4e35076b99:0x2c1e5cc27b785f95!8m2!3d47.5058846!4d19.1024696!16s%2Fg%2F11n53g1nrp',
  instagram: 'https://www.instagram.com/frubeauty/',
  facebook: 'https://www.facebook.com/profile.php?id=61572135977337',
  googleReviewsUrl:
    'https://www.google.com/maps/place/Pecze-Kov%C3%A1cs+Fruzsina+Kozmetikus+-+Szempilla+%C3%A9s+Szem%C3%B6ld%C3%B6k+Stylist/@47.5057949,19.102677,16.86z/data=!4m8!3m7!1s0x4741dd4e35076b99:0x2c1e5cc27b785f95!8m2!3d47.5058846!4d19.1024696!9m1!1b1!16s%2Fg%2F11n53g1nrp',
} as const;

/**
 * Kanonikus üzleti adatlap — EGY forrás a névhez, a kategóriákhoz és a
 * leírásokhoz. Ebből él a JSON-LD (`Layout.astro`) és a `public/llms.txt`,
 * és **ugyanezt kell bemásolni minden katalógus-regisztrációba is**: a citáció
 * csak akkor erősíti az entitást, ha minden felületen karakterre azonos.
 *
 * A hiteles forrás a Google Business Profile — a `name` betű szerint azzal
 * egyezik. Ha a GBP-ben változik a név, ELŐBB itt kell átírni, és csak utána
 * a katalógusokban.
 *
 * Szándékosan NINCS benne értékelés-szám: az hetente változik, és egy elavult
 * „52 értékelés" a katalógusokban évekig kint ragadna.
 */
export const businessIdentity = {
  /** Kanonikus megjelenített név. Ez megy minden űrlap „cégnév" mezőjébe. */
  name: 'FRUBEAUTY – Pecze-Kovács Fruzsina Kozmetikus',
  /** Vállalkozási forma szerinti név — ahol jogi/számlázási nevet kérnek. */
  legalName: 'Pecze-Kovács Fruzsina e.v.',
  /**
   * Más, TÉNYLEGESEN használt nevek (JSON-LD `alternateName`). A Google a
   * „frubeauty" keresést „true beauty"-re javítja — a márka még nem önálló entitás,
   * ezért kell kimondani, hogy ezek ugyanazt a vállalkozást jelölik. Csak élő
   * listázás neve kerülhet ide: a harmadik a Notino-szalonoldal címe betű szerint.
   */
  alternateNames: [
    'FRUBEAUTY',
    'Pecze-Kovács Fruzsina Kozmetikus',
    'Pecze-Kovács Fruzsina Kozmetikus, Sminkes, Szemöldök és szempilla stylist',
  ],
  // A Cégprofil TÉNYLEGES beállítása (2026-08-11, élőben ellenőrizve): az elsődleges
  // „Szépségszalon" — a térképcsomag 12 nyerőjéből 12 ezt használja. A korábbi
  // „Kozmetikus elsődleges" érték téves jegyzet volt; katalógusba ezt másold.
  primaryCategory: 'Szépségszalon',
  secondaryCategory: 'Kozmetikus',
  /** ~90 karakter — rövid katalógus-mezőkhöz, meta-jellegű helyekre. */
  descriptionShort:
    'Kozmetikus Zuglóban: lézeres szőrtelenítés, Janssen arckezelés, szempilla és szemöldök, smink.',
  /** ~250 karakter — a legtöbb katalógus fő leírásmezője és a JSON-LD `description`. */
  descriptionMedium:
    'A FRUBEAUTY Pecze-Kovács Fruzsina egyszemélyes kozmetikája Budapest XIV. kerületében, az Egressy úton. Dióda lézeres szőrtelenítés, Janssen arckezelés, koreai technikás szempilla lifting és szemöldök laminálás, esküvői és alkalmi smink. Egyszerre egy vendég.',
  /** ~600 karakter — részletes profilokhoz, ahol van hely kifejteni. */
  descriptionLong:
    'A FRUBEAUTY Pecze-Kovács Fruzsina kozmetikus egyszemélyes szalonja Budapest XIV. kerületében, Zuglóban, az Egressy út 16. szám alatt. Soprano Titanium dióda lézeres szőrtelenítés három hullámhosszon, hat-nyolc alkalmas sorozatban, 11.000 Ft-tól alkalmanként. Az arckezelések Janssen Cosmetics hatóanyagaival, bőranalízissel indulnak — mélytisztító, hidratáló és anti-aging kezelésekkel. A szemkezelések koreai technikával: szempilla lifting festéssel 12.000 Ft, szemöldök laminálás festéssel 11.000 Ft, tű és tetoválás nélkül. Esküvői smink próbasminkkel, alkalmi smink, kiszállással. Egyszerre csak egy vendég, így nincs kapkodás.',
} as const;

/**
 * `sameAs` — a márka hivatalos, verifikált profiljai. Ez az entitás-gráf gerince:
 * a Google és az LLM-ek ezekből kötik össze a weboldalt a Maps-találattal és a
 * közösségi profilokkal. Csak olyan URL kerülhet ide, ami tényleg a miénk és él
 * — scraper-aggregátorok (pl. beautynailhairsalons.com) NEM.
 */
export const sameAsProfiles = [
  siteConfig.instagram,
  siteConfig.facebook,
  siteConfig.mapsUrl,
  siteConfig.booking,
] as const;

/**
 * Kimenő link `rel` értéke. A Notino a kereskedelmi foglalási partnerünk, és
 * sitewide (minden oldalon, ~28 helyen) linkelünk rá — ez a minta fizetett/
 * affiliate elhelyezésnek olvasható, miközben befelé NULLA dofollow link érkezik
 * (Ahrefs-audit, 2026-07-31). A `sponsored` pontosan leírja a viszonyt és
 * kockázatmentes. Minden más külső link (Térkép, Instagram, Facebook) marad
 * sima `noopener` — azok dofollow-ként rendben vannak.
 */
export function relFor(href: string): string {
  return href.includes('notino.hu') ? 'noopener sponsored' : 'noopener';
}

export const openingHours = [
  { day: 'Hétfő',     hours: '08:00 – 19:00' },
  { day: 'Kedd',      hours: '08:00 – 19:00' },
  { day: 'Szerda',    hours: '08:00 – 19:00' },
  { day: 'Csütörtök', hours: '08:00 – 19:00' },
  { day: 'Péntek',    hours: '08:00 – 19:00' },
  { day: 'Szombat',   hours: '08:00 – 13:00' },
  { day: 'Vasárnap',  hours: 'Zárva' },
] as const;

/**
 * Schema.org-friendly opening hours (24h, Mon-Sat). Read by Layout.astro.
 * Vasárnap zárva → nem szerepel.
 */
export const openingHoursSchema = [
  {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '19:00',
  },
  {
    dayOfWeek: ['Saturday'],
    opens: '08:00',
    closes: '13:00',
  },
] as const;

/**
 * Analytics measurement IDs. ÜRES default = nem inject-elődik semmilyen script.
 * Töltsd ki, amikor a GA4 / Meta Pixel valódi azonosítóval rendelkezik.
 *  - ga4Id:                    'G-XXXXXXXXXX'
 *  - metaPixelId:              '123456789012345'
 *  - googleAdsId:              'AW-XXXXXXXXXX'
 *  - googleAdsConversionLabel: a konverzió esemény label-je
 *  - googleAdsConversionValue: ajánlott konverziós érték HUF-ban
 */
interface AnalyticsConfig {
  ga4Id: string;
  googleTagId: string;
  metaPixelId: string;
  googleAdsId: string;
  googleAdsConversionLabel: string;
  googleAdsConversionValue: number;
}
export const analytics: AnalyticsConfig = {
  ga4Id: 'G-L276HPZTL5',
  // Az egyesített Google-tag (loader ID). A GA4 (G-) és az Ads (AW-) is ennek a
  // destinationje. A gtag.js-t EZZEL kell betölteni: a 'G-L276HPZTL5' ID-ra a
  // googletagmanager.com 404-et ad (csak destination, nem önálló loader), ezért
  // a régi G--alapú betöltés némán megölte a GA4 + Ads mérést is.
  googleTagId: 'GT-NC66MFGW',
  metaPixelId: '',
  googleAdsId: 'AW-17992123771',
  googleAdsConversionLabel: 'LHaBCP_fj6McEPuKqIND',
  googleAdsConversionValue: 12500,
};

/**
 * AnnouncementBar master kapcsoló. FONTOS: a bar NEM statikus/kézi számot mutat —
 * az AnnouncementBar komponens élő, böngészőnkénti localStorage-számláló (a MAI
 * Notino-CTA kattintásokat számolja az adott eszközön), és csak akkor jelenik meg,
 * ha már volt katt. Ezért NINCS „bookingsToday”/„updatedAt” — nem kell heti kézi
 * frissítés, és nem mutatunk idegenek nevében fabrikált számot. Csak az enabled él.
 */
interface RecencyProof {
  enabled: boolean;
}
export const recencyProof: RecencyProof = {
  enabled: true,
};
