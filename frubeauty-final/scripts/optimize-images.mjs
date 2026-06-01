import sharp from 'sharp';
import { readFile, writeFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../public/', import.meta.url);
const p = (rel) => fileURLToPath(new URL(rel, root));
const kb = (n) => Math.round(n / 1024) + ' KB';

async function size(rel) {
  try { return (await stat(p(rel))).size; } catch { return 0; }
}

// 1) Generate the missing OG image (1200x630) from the brand hero poster.
async function makeOg() {
  const out = p('og-image.jpg');
  await sharp(p('media/hero-poster.webp'))
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
  console.log('og-image.jpg created ->', kb(await size('og-image.jpg')));
}

// 2) Create the missing optimized WebP for the szempilla blog cover.
async function makeSzempillaCover() {
  await sharp(p('img/BLOG_Szempilla_lifting_budapest-egressy_ut_zuglo.jpeg'))
    .resize(1400, null, { withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(p('img/BLOG_Szempilla_lifting_budapest-egressy_ut_zuglo.webp'));
  console.log('szempilla cover webp ->', kb(await size('img/BLOG_Szempilla_lifting_budapest-egressy_ut_zuglo.webp')));
}

// 3) Re-compress oversized referenced WebP files in place (>200 KB).
const recompress = [
  'img/menyasszonyi-probasmink-zuglo-budapest-egressy-ut.webp',
  'img/szemoldok-laminalas-budapest-egressy-ut-zuglo-munka.webp',
  'img/eskuvoi-smink-budapest-egressy-ut-zuglo-munka.webp',
  'img/smink-menyasszony-munka.webp',
];

async function shrinkWebp(rel) {
  const before = await size(rel);
  const input = await readFile(p(rel));
  const buf = await sharp(input)
    .resize(1600, null, { withoutEnlargement: true })
    .webp({ quality: 72 })
    .toBuffer();
  await writeFile(p(rel), buf);
  console.log(rel, kb(before), '->', kb(buf.length));
}

await makeOg();
await makeSzempillaCover();
for (const rel of recompress) await shrinkWebp(rel);
console.log('done');
