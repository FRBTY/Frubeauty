import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const errors = [];

function walk(dir, extension, result = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path, extension, result);
    else if (entry.name.endsWith(extension)) result.push(path);
  }
  return result;
}

function count(html, pattern) {
  return html.match(pattern)?.length ?? 0;
}

function plainText(value) {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function fail(page, message) {
  errors.push(`${page}: ${message}`);
}

function routeFor(file) {
  const rel = relative(dist, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel === '404.html') return '/404.html';
  return `/${dirname(rel).split(sep).join('/')}/`;
}

function localTargetExists(urlPath) {
  const decoded = decodeURIComponent(urlPath).replace(/^\/+/, '');
  if (!decoded) return existsSync(join(dist, 'index.html'));
  const direct = join(dist, decoded);
  return existsSync(direct) || existsSync(join(direct, 'index.html'));
}

if (!existsSync(dist)) {
  console.error('Hiányzik a dist könyvtár. Előbb futtasd az npm run build parancsot.');
  process.exit(1);
}

const htmlFiles = walk(dist, '.html');
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const route = routeFor(file);
  const robots = html.match(/<meta\s+name="robots"\s+content="([^"]+)"\s*\/?>/i)?.[1] ?? '';
  const indexable = !/\bnoindex\b/i.test(robots);

  if (/[\u0000\uFFFD]/u.test(html) || /(?:Ă.|â€|Ĺ.|Ĺ±)/u.test(html)) {
    fail(route, 'sérült karakterkódolás található a generált HTML-ben');
  }
  if (/style="opacity:0;transform:translateY\(/i.test(html)) {
    fail(route, 'SSR-ben rejtett reveal/stagger tartalom maradt');
  }

  if (count(html, /<title(?:\s[^>]*)?>/gi) !== 1) fail(route, 'nem pontosan egy title található');
  if (count(html, /<meta\s+name="description"\s+content=/gi) !== 1) fail(route, 'nem pontosan egy meta description található');
  if (count(html, /<meta\s+name="robots"\s+content=/gi) !== 1) fail(route, 'nem pontosan egy robots meta található');
  if (count(html, /<h1(?:\s[^>]*)?>/gi) !== 1) fail(route, 'nem pontosan egy H1 található');

  const canonicalCount = count(html, /<link\s+rel="canonical"\s+href=/gi);
  if (indexable && canonicalCount !== 1) fail(route, 'indexelhető oldalon nem pontosan egy canonical található');
  if (!indexable && canonicalCount !== 0) fail(route, 'noindex oldalon canonical maradt');
  if (indexable && !/max-image-preview:large/i.test(robots)) fail(route, 'hiányzik a max-image-preview:large robots direktíva');

  const titleText = plainText(html.match(/<title(?:\s[^>]*)?>([\s\S]*?)<\/title>/i)?.[1] ?? '');
  const h1Text = plainText(html.match(/<h1(?:\s[^>]*)?>([\s\S]*?)<\/h1>/i)?.[1] ?? '');
  const descriptionText = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ?? '';
  if (indexable && (titleText.length < 15 || titleText.length > 70)) fail(route, `title hossza ${titleText.length}, elvárt: 15–70`);
  if (indexable && (descriptionText.length < 100 || descriptionText.length > 300)) fail(route, `description hossza ${descriptionText.length}, elvárt: 100–300`);
  if (h1Text.length > 70) fail(route, `H1 hossza ${h1Text.length}, maximum: 70`);

  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
  const expectedCanonical = `https://frubeauty.com${route}`;
  if (indexable && canonical !== expectedCanonical) fail(route, `canonical eltérés: ${canonical ?? 'hiányzik'} ≠ ${expectedCanonical}`);

  const schemas = [];
  for (const match of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      schemas.push(JSON.parse(match[1]));
    } catch (error) {
      fail(route, `hibás JSON-LD: ${error.message}`);
    }
  }

  // VideoObject-őr. A GSC 2026-08-06-án „Missing field uploadDate"-et jelzett a
  // /szempilla-lifting-zuglo/-ra: a kötelező mező egyszerűen kimaradt a kézzel
  // bemásolt sémából. Ez a check nem engedi vissza a hibát a buildbe.
  const videoSchemas = schemas.filter((s) => s?.['@type'] === 'VideoObject');
  for (const video of videoSchemas) {
    for (const field of ['name', 'description', 'thumbnailUrl', 'uploadDate', 'duration', 'contentUrl']) {
      if (!video[field]) fail(route, `VideoObject hiányzó mező: ${field}`);
    }
    // A Google thumbnail-formátumai közt NINCS AVIF (BMP/GIF/JPEG/PNG/WebP/SVG).
    if (video.thumbnailUrl && /\.avif$/i.test(video.thumbnailUrl)) {
      fail(route, 'VideoObject thumbnailUrl AVIF — a Google nem támogatja thumbnailként');
    }
    if (video.uploadDate && !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/.test(video.uploadDate)) {
      fail(route, `VideoObject uploadDate nem ISO 8601 időzónával: ${video.uploadDate}`);
    }
    if (video.duration && !/^PT(?:\d+M)?\d+S$/.test(video.duration)) {
      fail(route, `VideoObject duration nem ISO 8601 időtartam: ${video.duration}`);
    }
    for (const field of ['contentUrl', 'thumbnailUrl']) {
      const url = video[field] ?? '';
      if (url.startsWith('https://frubeauty.com/') && !localTargetExists(url.replace('https://frubeauty.com', ''))) {
        fail(route, `VideoObject ${field} nem létező fájlra mutat: ${url}`);
      }
    }
  }
  // A Google csak akkor indexeli a videót, ha talál lejátszót az oldalon —
  // séma önmagában nem elég (és a <video> nem jöhet csak kliensoldali JS-ből).
  if (videoSchemas.length > count(html, /<video\b/gi)) {
    fail(route, `${videoSchemas.length} VideoObject séma, de csak ${count(html, /<video\b/gi)} <video> elem a kiszolgált HTML-ben`);
  }

  for (const match of html.matchAll(/(?:href|src|poster)="(\/[^"]+)"/gi)) {
    const target = match[1].split(/[?#]/, 1)[0];
    if (!localTargetExists(target)) fail(route, `hiányzó belső cél vagy asset: ${target}`);
  }
}

const errorPage = join(dist, '404.html');
if (!existsSync(errorPage)) {
  fail('/404.html', 'a build nem hozott létre statikus 404.html fájlt');
} else {
  const html = readFileSync(errorPage, 'utf8');
  if (!/<meta\s+name="robots"\s+content="noindex, follow"/i.test(html)) fail('/404.html', 'hiányzik a noindex, follow');
  if (/<link\s+rel="canonical"/i.test(html)) fail('/404.html', 'canonical maradt a 404 oldalon');
  if (/<script[^>]+type="application\/ld\+json"/i.test(html)) fail('/404.html', 'strukturált adat maradt a 404 oldalon');
}

for (const route of ['/', '/arckezeles-zuglo/', '/szempilla-lifting-zuglo/', '/szemoldok-laminalas-zuglo/', '/sminkes-zuglo/']) {
  const file = route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html');
  const html = readFileSync(file, 'utf8');
  if (!/<details\b/i.test(html) || !/<summary\b/i.test(html)) fail(route, 'a FAQ nem natív details/summary markup');
}

for (const required of ['robots.txt', 'sitemap-index.xml', 'video-sitemap.xml']) {
  if (!existsSync(join(dist, required))) fail('/', `hiányzó ${required}`);
}
if (existsSync(join(dist, 'robots.txt'))) {
  const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
  if (!/Sitemap:\s*https:\/\/frubeauty\.com\/sitemap-index\.xml/i.test(robots)) fail('/robots.txt', 'hibás vagy hiányzó sitemap hivatkozás');
  if (!/Sitemap:\s*https:\/\/frubeauty\.com\/video-sitemap\.xml/i.test(robots)) fail('/robots.txt', 'hiányzó videó-sitemap hivatkozás');
}
// Videó-sitemap: minden hivatkozott mp4/poszter tényleg létezik-e a buildben.
if (existsSync(join(dist, 'video-sitemap.xml'))) {
  const xml = readFileSync(join(dist, 'video-sitemap.xml'), 'utf8');
  for (const match of xml.matchAll(/<video:(?:content_loc|thumbnail_loc)>([^<]+)</g)) {
    const target = match[1].replace('https://frubeauty.com', '');
    if (!localTargetExists(target)) fail('/video-sitemap.xml', `nem létező médiafájl: ${match[1]}`);
  }
}
for (const sitemap of walk(dist, '.xml')) {
  const xml = readFileSync(sitemap, 'utf8');
  if (/https:\/\/frubeauty\.com\/404(?:\.html)?/i.test(xml)) fail('/sitemap-index.xml', 'a 404 URL bekerült a sitemapbe');
}

if (errors.length) {
  console.error(`SEO smoke test: ${errors.length} hiba`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`SEO smoke test: rendben (${htmlFiles.length} HTML oldal, érvényes meta/JSON-LD/belső célok).`);
