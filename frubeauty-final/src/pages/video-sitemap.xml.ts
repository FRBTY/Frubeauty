/**
 * Videó-sitemap (/video-sitemap.xml).
 *
 * Miért külön fájl: a @astrojs/sitemap nem tud `video:` névtér-kiterjesztést
 * írni, a Google viszont ezen a csatornán fedezi fel leggyorsabban az önhosztolt
 * (nem YouTube-os) videókat. A JSON-LD VideoObject és ez a sitemap ugyanabból a
 * `src/config/videos.ts` katalógusból generálódik, tehát nem tudnak ellentmondani
 * egymásnak — ha eltérnének, a Google a strukturált adatot hibásnak jelölné.
 *
 * Beküldés: GSC → Sitemaps → `video-sitemap.xml` (a robots.txt-ben is hirdetve).
 */
import type { APIRoute } from 'astro';
import { siteVideos, videoUrl, videoThumbUrl, type SiteVideo } from '../config/videos';

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Oldalanként csoportosítunk: egy <url> alá kerül az oldal összes videója. */
function groupByPage(videos: readonly SiteVideo[]) {
  const map = new Map<string, SiteVideo[]>();
  for (const v of videos) {
    const list = map.get(v.pageUrl) ?? [];
    list.push(v);
    map.set(v.pageUrl, list);
  }
  return map;
}

export const GET: APIRoute = () => {
  const pages = groupByPage(Object.values(siteVideos));

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${[...pages]
  .map(
    ([pageUrl, videos]) => `  <url>
    <loc>${escapeXml(pageUrl)}</loc>
${videos
  .map(
    (v) => `    <video:video>
      <video:thumbnail_loc>${escapeXml(videoThumbUrl(v))}</video:thumbnail_loc>
      <video:title>${escapeXml(v.name)}</video:title>
      <video:description>${escapeXml(v.description)}</video:description>
      <video:content_loc>${escapeXml(videoUrl(v))}</video:content_loc>
      <video:duration>${v.durationSeconds}</video:duration>
      <video:publication_date>${v.uploadDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:live>no</video:live>
    </video:video>`,
  )
  .join('\n')}
  </url>`,
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
