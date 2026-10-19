// Blog-borítók kisebb változatai a cikkoldal srcset-jéhez (LCP-javítás, 2026-10-19).
//
// A cikk borítója a mobil LCP-elem. Telefonon ~370 CSS px széles, a teljes
// 1200 px-es kép viszont ~118 KB. Két változat készül minden borítóhoz:
//   <név>-640w.webp   — 1x kijelzős telefon, kis tablet
//   <név>-1000w.webp  — 2,6x DPR-es telefon (a Lighthouse mobil profilja is ez)
// Az eredeti marad a nagy kijelzőkre és az og:image-re.
//
// Használat: node scripts/blog-cover-variants.mjs
// Új cikk után futtasd le újra; a már meglévő, frissebb változatot kihagyja.
import sharp from 'sharp';
import { readFile, readdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const WIDTHS = [640, 1000];
const QUALITY = 76;
const blogDir = fileURLToPath(new URL('../src/content/blog/', import.meta.url));
const publicDir = fileURLToPath(new URL('../public', import.meta.url));

const mtime = async (p) => {
  try { return (await stat(p)).mtimeMs; } catch { return 0; }
};

const covers = new Set();
for (const f of await readdir(blogDir)) {
  if (!f.endsWith('.md')) continue;
  const src = await readFile(blogDir + f, 'utf8');
  const m = src.match(/^cover:\s*"?([^"\n]+?)"?\s*$/m);
  if (m) covers.add(m[1]);
}

for (const cover of covers) {
  const input = publicDir + cover;
  const meta = await sharp(input).metadata();
  for (const w of WIDTHS) {
    if (!meta.width || meta.width <= w) continue; // nincs felnagyítás
    const out = publicDir + cover.replace(/\.webp$/, `-${w}w.webp`);
    if ((await mtime(out)) > (await mtime(input))) continue;
    const info = await sharp(input).resize(w).webp({ quality: QUALITY }).toFile(out);
    process.stdout.write(`${cover} → ${w}w: ${Math.round(info.size / 1024)} KB\n`);
  }
}
