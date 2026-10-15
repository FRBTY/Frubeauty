/**
 * Lézer-árazás mérőeszköz — NEM a build része, kézzel futtatandó:
 *
 *     node scripts/lezer-arak.mjs
 *
 * MIT MÉR:
 *   1. visszaadja-e a képlet a hat dokumentált árat,
 *   2. monoton-e (egy terület hozzáadása sosem csökkentheti az árat),
 *   3. hol a legalacsonyabb a lefoglalt órára jutó nettó,
 *   4. kiír egy árlistát a gyakori összeállításokra — ezt érdemes átnézni
 *      azelőtt, hogy az oldal nyilvánosan vállalja ezeket az árakat.
 *
 * A MÉRVADÓ MOTOR a `src/lib/lezerArazas.ts`. Itt a képlet szándékosan újra le
 * van írva, mert ez a szkript sima node-dal fusson, fordító nélkül. Ha a kettő
 * elcsúszik, az 1. pont ELBUKIK — a dokumentált árak fogják kimutatni.
 */

// A `perc` itt az ÁRAZÁSI idő, nem a naptári. 2026-09-21 óta a kettő eltér: a
// kezelési idők lerövidültek (XS 10 · S 12 · M 18 · L 28 · XL 42), az árképlet
// bemenete viszont befagyott ezeken az értékeken, hogy a hat dokumentált ár ne
// mozduljon. Ha ezt a táblát átírod, ÁRAT változtatsz — lásd `ARAZASI_PERC` a
// `src/lib/lezerArazas.ts`-ben.
const ZONA = {
  XS: { ar: 7000, perc: 15 },
  S: { ar: 11000, perc: 20 },
  M: { ar: 16000, perc: 30 },
  L: { ar: 23000, perc: 45 },
  XL: { ar: 33000, perc: 70 },
};

const RAHAGYAS = 10;
const PADLO_FT_PERC = 300;
const KEREKITES = 1000;
const GEP_RESZESEDES = 0.5; // a gép tulajdonosáé az ár fele

const TERULETEK = {
  'felső ajak': 'XS', áll: 'XS', 'szemöldök köze': 'XS', fülkagyló: 'XS',
  kézfej: 'XS', lábfej: 'XS', köldökvonal: 'XS', 'mellbimbó udvara': 'XS',
  hónalj: 'S', bikinivonal: 'S', tarkó: 'S', nyak: 'S', 'arc oldala': 'S',
  alkar: 'M', felkar: 'M', váll: 'M', has: 'M', derék: 'M', popsi: 'M', 'teljes arc': 'M',
  lábszár: 'L', comb: 'L', 'teljes hát': 'L', 'teljes mellkas': 'L', 'teljes kar': 'L',
  'teljes láb': 'XL', 'teljes hát és váll': 'XL',
};

/** Egymást tartalmazó területek. A motor ugyanezt csinálja: ha egy nagyobb
    terület minden darabja ki van pipálva és a nagyobb olcsóbb, arra vált. */
const TARTALMAZ = {
  'teljes láb': ['comb', 'lábszár'],
  'teljes kar': ['alkar', 'felkar'],
  'teljes hát és váll': ['teljes hát', 'váll'],
  'teljes arc': ['felső ajak', 'áll', 'szemöldök köze', 'arc oldala'],
};

function osszevon(nevek) {
  let mostani = [...nevek];
  for (let kor = 0; kor < 4; kor++) {
    const jelolt = Object.entries(TARTALMAZ).find(([nagy, darabok]) =>
      !mostani.includes(nagy) &&
      darabok.every((d) => mostani.includes(d)) &&
      ZONA[TERULETEK[nagy]].ar < darabok.reduce((s, d) => s + ZONA[TERULETEK[d]].ar, 0));
    if (!jelolt) break;
    mostani = [jelolt[0], ...mostani.filter((x) => !jelolt[1].includes(x))];
  }
  const elnyelt = new Set(mostani.flatMap((x) => TARTALMAZ[x] ?? []));
  return mostani.filter((x) => !elnyelt.has(x));
}

const huf = (n) => new Intl.NumberFormat('hu-HU').format(n) + ' Ft';

function ar(tagek) {
  const n = tagek.length;
  const teteles = tagek.reduce((s, t) => s + ZONA[t].ar, 0);
  const T = tagek.reduce((s, t) => s + ZONA[t].perc, 0);
  const egyutt = T + RAHAGYAS;
  const kulon = T + n * RAHAGYAS;
  const paritas = (teteles * egyutt) / kulon;
  const padlo = n > 1 ? PADLO_FT_PERC * egyutt : 0;
  const nyers = Math.min(Math.max(paritas, padlo), teteles);
  const perAlkalom = Math.round(nyers / KEREKITES) * KEREKITES;
  return {
    perAlkalom,
    teteles,
    perc: egyutt,
    padloDontott: padlo > paritas,
    oraHozam: Math.round((perAlkalom * GEP_RESZESEDES) / (egyutt / 60)),
  };
}

const tagekOf = (nevek) => nevek.map((n) => {
  const t = TERULETEK[n];
  if (!t) throw new Error(`ismeretlen terület: ${n}`);
  return t;
});

// ── 1. A hat dokumentált ár ──────────────────────────────────────────────────
const DOKUMENTALT = [
  [['felső ajak', 'áll'], 12000, 'Felső ajak + áll'],
  [['hónalj', 'bikinivonal'], 18000, 'Hónalj + bikinivonal'],
  [['bikinivonal', 'lábszár'], 30000, 'Bikinivonal + lábszár'],
  [['teljes láb', 'hónalj'], 40000, 'Teljes láb + hónalj'],
  [['hónalj', 'bikinivonal', 'lábszár'], 37000, 'Sima Nyár'],
  [['hónalj', 'bikinivonal', 'teljes láb', 'alkar', 'felső ajak'], 63000, 'Tetőtől Talpig'],
];

console.log('\n── 1. Visszaadja-e a képlet az árlistát ────────────────────────────');
let hiba = 0;
for (const [nevek, vart, cimke] of DOKUMENTALT) {
  const r = ar(tagekOf(nevek));
  const ok = r.perAlkalom === vart;
  if (!ok) hiba++;
  console.log(
    `${ok ? '  ✓' : '  ✗'} ${cimke.padEnd(24)} képlet ${huf(r.perAlkalom).padStart(10)}` +
      `   árlista ${huf(vart).padStart(10)}${r.padloDontott ? '   (a padló döntött)' : ''}`,
  );
}

// ── 2–3. Monotonitás és óradíj-padló ─────────────────────────────────────────
const MINDEN = Object.keys(TERULETEK);
let nemMonoton = 0;
let minHozam = Infinity;
let minHozamNal = '';

for (let i = 0; i < 120000; i++) {
  const valasztas = MINDEN.filter(() => Math.random() < Math.random());
  if (!valasztas.length) continue;
  const alap = ar(tagekOf(valasztas));
  for (const plusz of MINDEN) {
    if (valasztas.includes(plusz)) continue;
    if (ar(tagekOf([...valasztas, plusz])).perAlkalom < alap.perAlkalom) nemMonoton++;
    break;
  }
  if (alap.oraHozam < minHozam) {
    minHozam = alap.oraHozam;
    minHozamNal = `${valasztas.join(' + ')} → ${huf(alap.perAlkalom)} / ${alap.perc} perc`;
  }
}

console.log('\n── 2–3. Viselkedés 120 000 véletlen összeállításon ──────────────────');
console.log(`  monotonitás-sértés: ${nemMonoton} (0 a helyes)`);
console.log(`  legalacsonyabb nettó óra-hozam: ${huf(minHozam)}/óra`);
console.log(`     ${minHozamNal}`);

// ── 4. Árlista a gyakori összeállításokra ────────────────────────────────────
const PELDAK = [
  ['hónalj', 'bikinivonal', 'felső ajak'],
  ['hónalj', 'bikinivonal', 'comb'],
  ['felső ajak', 'áll', 'arc oldala', 'szemöldök köze'],
  ['hónalj', 'teljes láb', 'bikinivonal'],
  ['alkar', 'felkar'],
  ['teljes kar', 'hónalj'],
  ['has', 'derék'],
  ['teljes hát', 'váll'],
  ['hónalj', 'bikinivonal', 'teljes láb', 'teljes kar'],
  ['hónalj', 'bikinivonal', 'teljes láb', 'teljes kar', 'teljes arc', 'has'],
];

console.log('\n── 4. Mit fog kiírni az oldal ───────────────────────────────────────');
console.log(`  ${'összeállítás'.padEnd(52)}${'külön'.padStart(11)}${'egyben'.padStart(11)}${'spórol'.padStart(10)}${'idő'.padStart(8)}${'Ft/óra'.padStart(10)}`);
for (const nyers of PELDAK) {
  const nevek = osszevon(nyers);
  const r = ar(tagekOf(nevek));
  const cimke = nevek.join(' + ') + (nevek.length === nyers.length ? '' : '  ⟵ összevonva');
  console.log(
    `  ${(cimke.length > 50 ? cimke.slice(0, 49) + '…' : cimke).padEnd(52)}` +
      `${huf(r.teteles).padStart(11)}${huf(r.perAlkalom).padStart(11)}` +
      `${huf(r.teteles - r.perAlkalom).padStart(10)}${(r.perc + 'p').padStart(8)}${huf(r.oraHozam).padStart(10)}`,
  );
}

console.log(
  `\n  Az „egyben” oszlop alkalmankénti ár; a sorozat hatszor ennyi.` +
    `\n  A Ft/óra a LEFOGLALT órára jutó nettó, a gép 50%-a után.\n`,
);

process.exit(hiba ? 1 : 0);
