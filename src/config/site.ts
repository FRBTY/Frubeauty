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
 *  - ga4Id:       'G-XXXXXXXXXX'
 *  - metaPixelId: '123456789012345'
 */
interface AnalyticsConfig {
  ga4Id: string;
  metaPixelId: string;
}
export const analytics: AnalyticsConfig = {
  ga4Id: '',
  metaPixelId: '',
};

/**
 * Recency social proof — heti manuális frissítés. A bar csak akkor jelenik meg,
 * ha az `enabled === true` és a `bookingsToday >= 1`. Mai dátum string kötelező
 * (formátum: YYYY-MM-DD) — ha a felhasználó visszatér másnap, akkor új szám
 * megjelenítése előtt frissítsd ezt is.
 */
interface RecencyProof {
  enabled: boolean;
  bookingsToday: number;
  /** Frissítés napja — manuális. */
  updatedAt: string;
}
export const recencyProof: RecencyProof = {
  enabled: true,
  bookingsToday: 4,
  updatedAt: '2026-05-18',
};
