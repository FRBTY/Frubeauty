/**
 * Build utáni javítás: NUL-bájtok eltávolítása a generált HTML-ből.
 *
 * A HIBA. A build-lánc időnként egyetlen 0x00 bájtot szúr be a kimenetbe,
 * mindig ugyanazzal a mintázattal: egy ASCII karakter UTÁN és egy többbájtos
 * UTF-8 karakter ELÉ. Két megfigyelt eset:
 *
 *     Visszajár\0ó vendég          (dist/arckezeles-zuglo/index.html)
 *     Vivien Szűcsn\0é Birnbaum    (dist/sminkes-zuglo/index.html)
 *
 * Az ékezetes karakter maga MINDKÉT esetben sértetlen (\xc3\xb3, \xc3\xa9),
 * tehát ez tiszta BESZÚRÁS, nem csere — a NUL törlése pontosan az eredeti
 * szöveget adja vissza. NUL-bájt HTML-ben egyébként sem érvényes.
 *
 * MIÉRT ÍGY JAVÍTJUK. A hiba bájt-eltolás függő: nem a szöveggel van baj, hanem
 * azzal, hogy a kimenetben hányadik bájtra esik. Eddig úgy kezeltük, hogy
 * addig változtattuk a szöveg hosszát, amíg tiszta lett a build — csakhogy
 * ilyenkor a hiba egyszerűen átugrik egy másik oldalra, és MINDEN későbbi
 * szövegmódosítás újra előhozhatja. (2026-09-08: a vélemény-jelölő ikon cseréje
 * az arckezelés-oldalról a smink-oldalra tolta át.) Ez a lépés determinisztikus.
 *
 * NEM elnyomás: a `npm run seo:smoke` továbbra is fut és továbbra is elbukik,
 * ha bármi más kódolási gond van. Ez a script csak ezt az EGY, pontosan
 * körülírt sérülést javítja, és kiírja, hol találta — ha sok helyen jelenik
 * meg, azt látni fogod a build kimenetén.
 *
 * NEM az astro `compressHTML` okozza: kikapcsolva is reprodukálható (mérve
 * 2026-09-08-án).
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';

function htmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...htmlFiles(full));
    else if (entry.endsWith('.html')) out.push(full);
  }
  return out;
}

let repaired = 0;

for (const file of htmlFiles(DIST)) {
  const buf = readFileSync(file);
  const nulCount = buf.filter((b) => b === 0).length;
  if (nulCount === 0) continue;

  // Kontextus a naplóba, hogy lássuk, MIT javítottunk — némán javítani rossz
  // ötlet lenne, mert elrejtené, ha egyszer csak elszabadulna a hiba.
  const at = buf.indexOf(0);
  const around = buf.subarray(Math.max(0, at - 40), at + 20).toString('utf8').replace(/\s+/g, ' ');

  writeFileSync(file, buf.filter((b) => b !== 0));
  repaired += nulCount;
  console.log(`[fix-nul-bytes] ${file}: ${nulCount} NUL-bájt eltávolítva — „…${around}…"`);
}

if (repaired === 0) console.log('[fix-nul-bytes] nincs javítanivaló.');
