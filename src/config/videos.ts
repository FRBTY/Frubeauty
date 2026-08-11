/**
 * Videó-katalógus — EGY forrás a VideoObject strukturált adatokhoz és a
 * videó-sitemaphez.
 *
 * Miért kell: a GSC „Videos → Missing field uploadDate" hibát dobta a
 * /szempilla-lifting-zuglo/ oldalra (2026-08-06-i crawl). Az `uploadDate` a
 * VideoObject KÖTELEZŐ mezője; nélküle a videó nem jogosult a videó rich
 * resultra. A séma korábban oldalanként, kézzel volt bemásolva — így két
 * helyen kellett volna nem elfelejteni. Innentől a séma innen generálódik,
 * nem tud szétcsúszni.
 *
 * Adat-hitelesség (fontos: ezek NEM kitalált értékek):
 *  - `uploadDate` = a videófájl első publikálása (git add: 2026-05-20).
 *    Sosem a build dátuma — a hamis frissesség-jelzés policy-kockázat.
 *  - `durationSeconds` = az MP4 `mvhd` boxából mérve (nincs ffprobe a gépen,
 *    a mérés a moov/mvhd timescale+duration párosból jött).
 *  - `thumbnailUrl` szándékosan CSAK .webp: a Google támogatott thumbnail-
 *    formátumai BMP/GIF/JPEG/PNG/WebP/SVG — az AVIF poszter NEM jó ide,
 *    hiába az a kisebb (az AVIF marad a <picture>-ben, LCP-re).
 */

const SITE = 'https://frubeauty.com';

export interface SiteVideo {
  /** A /media alatti közös fájlnév-tő (mp4 + -poster.webp). */
  slug: string;
  name: string;
  description: string;
  /** ISO 8601, időzónával — a videó első publikálása. */
  uploadDate: string;
  /** Mért hossz másodpercben (mvhd). */
  durationSeconds: number;
  /** Az oldal, ahol a videó a tartalom része (videó-sitemaphez). */
  pageUrl: string;
}

export const siteVideos = {
  'szempilla-lifting': {
    slug: 'szempilla-lifting-video-frubeauty-zuglo-budapest-14kerulet',
    name: 'Szempilla lifting munka közben — FRUBEAUTY Zugló, 14. kerület',
    description:
      'Szempilla lifting koreai technikával, ragasztó nélkül a zuglói szalonban. Pecze-Kovács Fruzsina kozmetikus.',
    uploadDate: '2026-05-20T10:00:00+02:00',
    durationSeconds: 33,
    pageUrl: `${SITE}/szempilla-lifting-zuglo/`,
  },
  'szemoldok-laminalas-munkakozben': {
    slug: 'szemoldok-laminalas-munkakozben-budapest-egressy-ut',
    name: 'Szemöldök laminálás munka közben — FRUBEAUTY Zugló, Egressy út',
    description:
      'Szemöldök laminálás koreai technikával a zuglói szalonban. Pecze-Kovács Fruzsina kozmetikus, Zugló XIV. kerület.',
    uploadDate: '2026-05-20T10:00:00+02:00',
    durationSeconds: 17,
    pageUrl: `${SITE}/szemoldok-laminalas-zuglo/`,
  },
  'szemoldok-laminalas': {
    slug: 'szemoldok-laminalas',
    name: 'Szemöldök laminálás Zuglóban — FRUBEAUTY Pecze-Kovács Fruzsina',
    description:
      'Szemöldök laminálás természetes dúsítással a zuglói szalonban. Tű nélkül, koreai technikával, ~6 hétig tartós eredmény.',
    uploadDate: '2026-05-20T10:00:00+02:00',
    durationSeconds: 15,
    pageUrl: `${SITE}/szemoldok-laminalas-zuglo/`,
  },
} as const satisfies Record<string, SiteVideo>;

export type VideoKey = keyof typeof siteVideos;

export const videoUrl = (v: SiteVideo) => `${SITE}/media/${v.slug}.mp4`;
export const videoThumbUrl = (v: SiteVideo) => `${SITE}/media/${v.slug}-poster.webp`;

/** Másodperc → ISO 8601 időtartam (schema.org `duration`). */
export function isoDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `PT${m > 0 ? `${m}M` : ''}${s}S`;
}

/**
 * Teljes VideoObject JSON-LD. A kötelező négyes (name, description,
 * thumbnailUrl, uploadDate) mellett a Google által ajánlott mezőket is
 * kiadja — `duration` és `contentUrl` a két legfontosabb, ezek nélkül a
 * videó gyakran „nem indexelhető" státuszban ragad.
 */
export function videoObjectSchema(key: VideoKey) {
  const v: SiteVideo = siteVideos[key];
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${v.pageUrl}#video-${v.slug}`,
    name: v.name,
    description: v.description,
    thumbnailUrl: videoThumbUrl(v),
    uploadDate: v.uploadDate,
    duration: isoDuration(v.durationSeconds),
    contentUrl: videoUrl(v),
    encodingFormat: 'video/mp4',
    inLanguage: 'hu-HU',
    isFamilyFriendly: true,
    publisher: { '@id': `${SITE}/#business` },
  };
}
