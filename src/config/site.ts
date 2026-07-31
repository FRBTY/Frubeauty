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
  { day: 'Hétfő',     hours: '08:30 – 19:30' },
  { day: 'Kedd',      hours: '08:30 – 19:30' },
  { day: 'Szerda',    hours: '08:30 – 19:30' },
  { day: 'Csütörtök', hours: '08:30 – 19:30' },
  { day: 'Péntek',    hours: '08:30 – 19:30' },
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
    opens: '08:30',
    closes: '19:30',
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
