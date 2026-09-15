import { useEffect, useId, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * „Mi történik a bőr alatt” — a dióda lézeres szőrtelenítés mechanizmusa.
 *
 * MIÉRT EZ AZ OLDAL LEGFONTOSABB VIZUÁLJA: a kategória legdrágább kifogása nem
 * az ár, hanem a „miért kell 6–8 alkalom, ha egyszer már kifizettem?”. Amíg ez
 * megválaszolatlan, a látogató drágának ÉS gyanúsnak látja az ajánlatot. Ezt
 * szöveggel háromszor elmondtuk az oldalon — de a mechanizmus (a szőrciklus)
 * térbeli, nem nyelvi dolog. Ábrán egy másodperc alatt érthető.
 *
 * VEZÉRLŐ NINCS, és felirat sincs az ábra ALATT (2026-09-12-i döntés). Az ábra
 * magától indul, amikor a görgetés odaér (`useInView`), és magától megy körbe.
 * Ebből két dolog következik, amit nem szabad visszacsinálni:
 *
 * 1. MINDEN felirat az SVG-n BELÜL van, fázisonként váltakozó bal felső
 *    képaláírással — különben az ábra néma ábrává válna.
 * 2. Mobilon a feliratoknak KÜLÖN, nagyobb rajzegységű változata fut
 *    (`sm:hidden` / `hidden sm:block`): a 760-as viewBox mobilon ~0,46× léptékre
 *    esik, ott a 10,5-es betű 4,8 px-en jönne ki. A hullámhossz-panel mobilon
 *    csak a SZÁMOKAT mutatja, mert a magyarázó sorok nem férnek el olvashatóan.
 *
 * A kezelőfej ezért nem megy a bal szélre: a bal felső sarok a képaláírásé.
 *
 * MIÉRT NULLA ÚJ FÜGGŐSÉG: a PSI mobil 95+ cél áll. Lottie (~300 kB),
 * PixiJS (~400 kB) vagy Vanta+Three (~600 kB) egyetlen magyarázó ábráért
 * megölné azt. Ez itt inline SVG + a bundle-ban MÁR benne lévő framer-motion.
 *
 * AKADÁLYMENTESSÉG: mivel látható magyarázó szöveg nincs, a teljes négyfázisú
 * leírás az SVG `<desc>` elemében él (`aria-labelledby`/`aria-describedby`) —
 * ez a grafikák hosszú leírásának szabványos helye, a képernyőolvasó felolvassa.
 *
 * REDUCED MOTION: nincs automata léptetés és nincs impulzus-villogás; az ábra a
 * ZÁRÓ állapotban áll meg, mert az hordozza a fő érvet (miért 6–8 alkalom).
 */

type Tone = 'dark' | 'light';

interface Props {
  /** 'light' a világos (klinikai) variánshoz — csak a paletta cserélődik. */
  tone?: Tone;
  /** Kikapcsolja a bevezető címsort, ha az oldal maga adja. */
  bare?: boolean;
  className?: string;
}

/**
 * Fázisok. `a`/`b` a képaláírás két sora asztali nézetben, `am`/`bm` a rövidebb
 * mobil változat (ha hiányzik, az asztali sor megy), `desc` pedig a
 * képernyőolvasónak szóló teljes mondat.
 *
 * Explicit típus és NEM `as const`: az `'bm' in p` szűkítés `never`-re vitte a
 * fallback-ágat, amint minden fázis kapott `bm`-et.
 */
interface Phase {
  key: string;
  a: string;
  am?: string;
  b: string;
  bm?: string;
  desc: string;
}

const PHASES: Phase[] = [
  {
    key: 'skin',
    a: 'Borotvált bőr',
    b: 'a fény a hagymát keresi, nem a szálat',
    bm: 'a hagymát keressük',
    desc:
      'Első szakasz — borotvált bőr: a kezelés előtt le kell borotválni a területet, hogy a lézer energiája a hagymában lévő festéket találja meg, ne a felszínen lévő szálat égesse el.',
  },
  {
    key: 'pulse',
    a: 'Az impulzus',
    b: 'egy villanás, három mélységig',
    bm: 'három mélységig',
    desc:
      'Második szakasz — az impulzus: a 755 nanométeres hullámhossz a felszínhez közeli, vékonyabb szálra erős, a 808 nanométer az általános munkahullámhossz, az 1064 nanométer hatol a legmélyebbre, és sötétebb bőrön ez a biztonságosabb. A kezelőfej hűtött lapja közben végig hűti a bőrt.',
  },
  {
    key: 'heat',
    a: 'A melanin elnyeli a fényt',
    am: 'A melanin elnyeli',
    b: 'a hő kikapcsolja a hagymát',
    bm: 'a hagyma kikapcsol',
    desc:
      'Harmadik szakasz — a festék elnyeli: a fényt a szál festékanyaga, a melanin nyeli el és alakítja hővé, a hő pedig a hagymáig fut és kikapcsolja azt. Ezért nem működik ősz és fehér szálon: nincs benne festék, nincs mit felmelegíteni.',
  },
  {
    key: 'cycle',
    a: 'A lézer csak a növekvő szálat éri el',
    am: 'Csak a növekvőt éri el',
    b: 'ezért 6–8 alkalom, nem egy',
    bm: 'ezért 6–8 alkalom',
    desc:
      'Negyedik szakasz — amiért 6–8 alkalom kell: a lézer csak a növekedési fázisban lévő szálat éri el, egy adott pillanatban ez a szálaknak nagyjából az ötöde. A többi hagymája alszik, azon nincs mit kikapcsolni. Négy-hat hét múlva egy újabb adag lép növekedési fázisba, ezért pont ennyi idő múlva van értelme visszajönni.',
  },
];

/**
 * Fázishossz ezredmásodpercben, a PHASES sorrendjében. Lassú, olvasható tempó a
 * felirat hosszához mérve; a teljes kör ~21 másodperc.
 */
const PHASE_MS = [4000, 5500, 5000, 7000];

/** Tüszők: x-pozíció, fázis, a hagyma mélysége. */
const FOLLICLES = [
  { x: 108, phase: 'telogen', bulbY: 186, tilt: -7 },
  { x: 232, phase: 'anagen', bulbY: 272, tilt: 5 },
  { x: 372, phase: 'anagen', bulbY: 284, tilt: -4 },
  { x: 506, phase: 'catagen', bulbY: 228, tilt: 6 },
  { x: 638, phase: 'telogen', bulbY: 180, tilt: -5 },
] as const;

const SURFACE = 104;

export function LaserDiodeAnimation({ tone = 'dark', bare = false, className }: Props) {
  const uid = useId().replace(/:/g, '');
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: '0px 0px -120px 0px' });
  const reduced = useReducedMotion();

  const [phase, setPhase] = useState(reduced ? 3 : 0);

  // Magától indul, amikor a görgetés ideér, és magától megy körbe. Kilépéskor
  // megáll (nem pörög a háttérben), visszagörgetéskor onnan folytatja.
  useEffect(() => {
    if (reduced || !inView) return;
    const t = window.setTimeout(() => setPhase((p) => (p + 1) % PHASES.length), PHASE_MS[phase]);
    return () => window.clearTimeout(t);
  }, [phase, inView, reduced]);

  const light = tone === 'light';
  const c = {
    bg: light ? '#FBF6EF' : '#15100C',
    hair: light ? 'rgba(26,20,16,0.12)' : 'rgba(245,232,211,0.12)',
    text: light ? '#2A211A' : '#F5E8D3',
    // #7A6A5A ivory alapon csak 4,35:1 — a 10,5 px-es rétegfeliratokhoz kevés.
    mute: light ? '#6B5C4D' : '#A89685',
    gold: '#B8884A',
    goldSoft: '#C9A36C',
    goldGlow: '#D9B27D',
    /** Kiemelt SZÖVEG színe — világos alapon a goldGlow csak ~2:1. */
    accent: light ? '#8E6730' : '#D9B27D',
    epidermis: light ? '#EAD9C0' : '#3A2E24',
    dermis: light ? '#E0CBAE' : '#2E241C',
    subcutis: light ? '#D6BE9D' : '#261D17',
  };

  /**
   * A kezelőfej x-pozíciója. SZÁNDÉKOSAN nem megy a bal szélre: a bal felső
   * sarok a fázis-képaláírásé. A nyalábok a 296-os álláshoz vannak rajzolva,
   * ezért az 1–2. fázisban a fej is ott áll.
   */
  const headX = phase === 3 ? 470 : 296;
  const pulsing = phase === 1 || phase === 2;
  const p = PHASES[phase];

  return (
    <div ref={wrapRef} className={className}>
      {!bare && (
        <div className="mb-7 sm:mb-9 max-w-[52ch]">
          <p className="text-[11px] uppercase tracking-caps mb-4" style={{ color: c.gold }}>
            A mechanizmus
          </p>
          <h3
            className="font-display font-light leading-[1.12] tracking-tight"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: c.text }}
          >
            Mi történik a bőr alatt, amíg a fej végigmegy rajtad.
          </h3>
        </div>
      )}

      <figure
        data-laser-anim
        className="overflow-hidden rounded-3xl"
        style={{ background: c.bg, boxShadow: light ? '0 1px 0 rgba(26,20,16,0.08) inset' : 'none', border: `1px solid ${c.hair}` }}
      >
        <svg
          viewBox="0 0 760 400"
          className="w-full h-auto block"
          role="img"
          aria-label="Hogyan működik a dióda lézeres szőrtelenítés — keresztmetszeti ábra"
          aria-describedby={`${uid}-d`}
        >
          {/* A teljes magyarázat itt él, mert látható kísérőszöveg nincs.
              SZÁNDÉKOSAN `aria-label` + `<desc>`, és NEM `<title>`: az SVG-n belüli
              <title> elemet az `npm run seo:smoke` második lap-címként számolja meg
              („nem pontosan egy title található”). Az akadálymentességi eredmény
              ugyanaz. */}
          <desc id={`${uid}-d`}>
            {PHASES.map((x) => x.desc).join(' ')} Sematikus ábra a mechanizmus bemutatására — nem
            orvosi illusztráció és nem konkrét kezelési eredmény.
          </desc>

          <defs>
            <linearGradient id={`${uid}-skin`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={c.epidermis} />
              <stop offset="26%" stopColor={c.dermis} />
              <stop offset="100%" stopColor={c.subcutis} />
            </linearGradient>
            {/* A három nyaláb — a szélesség a mélységgel fordítva arányos, hogy
                a rajz ne látszódjon három egyforma reflektornak. */}
            <linearGradient id={`${uid}-b755`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={c.goldGlow} stopOpacity="0.55" />
              <stop offset="100%" stopColor={c.goldGlow} stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${uid}-b808`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={c.goldSoft} stopOpacity="0.5" />
              <stop offset="100%" stopColor={c.goldSoft} stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${uid}-b1064`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={c.gold} stopOpacity="0.55" />
              <stop offset="100%" stopColor={c.gold} stopOpacity="0" />
            </linearGradient>
            <radialGradient id={`${uid}-heat`}>
              <stop offset="0%" stopColor="#FFD9A0" stopOpacity="0.95" />
              <stop offset="45%" stopColor={c.goldGlow} stopOpacity="0.45" />
              <stop offset="100%" stopColor={c.gold} stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`${uid}-chill`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#9FC6D8" stopOpacity="0" />
              <stop offset="50%" stopColor="#9FC6D8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#9FC6D8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* ── Bőrrétegek ─────────────────────────────────────────────── */}
          <rect x="0" y={SURFACE} width="760" height={400 - SURFACE} fill={`url(#${uid}-skin)`} />
          <line x1="0" y1={SURFACE} x2="760" y2={SURFACE} stroke={c.goldSoft} strokeOpacity="0.5" strokeWidth="1.5" />
          <line x1="0" y1={SURFACE + 34} x2="760" y2={SURFACE + 34} stroke={c.hair} strokeWidth="1" />
          <line x1="0" y1="344" x2="760" y2="344" stroke={c.hair} strokeWidth="1" />

          {/* Rétegfeliratok kétszer: mobilon nagyobb rajzegységgel, hogy
              ugyanakkora VALÓDI pixelméretet adjon. */}
          {[
            { y: SURFACE + 22, t: 'FELHÁM' },
            { y: SURFACE + 60, t: 'IRHA' },
            { y: 366, t: 'BŐRALJA' },
          ].map((l) => (
            <g key={l.t}>
              <text className="hidden sm:block" x="16" y={l.y} fontSize="10.5" letterSpacing="1.6" fill={c.mute}>{l.t}</text>
              <text className="sm:hidden" x="16" y={l.y + 5} fontSize="22" letterSpacing="1.2" fill={c.mute}>{l.t}</text>
            </g>
          ))}

          {/* ── Tüszők ─────────────────────────────────────────────────── */}
          {FOLLICLES.map((f, i) => {
            const isAnagen = f.phase === 'anagen';
            const isCatagen = f.phase === 'catagen';
            // A hagyma sötét (festékdús) csak a növekedési fázisban.
            const shaft = isAnagen ? c.gold : isCatagen ? c.goldSoft : c.mute;
            const shaftOp = isAnagen ? 0.95 : isCatagen ? 0.7 : 0.4;
            const killed = phase >= 2 && isAnagen;
            const endX = f.x + f.tilt * 4;

            return (
              <g key={f.x}>
                {/* szár */}
                <path
                  d={`M ${f.x} ${SURFACE - 2} Q ${f.x + f.tilt} ${(SURFACE + f.bulbY) / 2} ${endX} ${f.bulbY - 10}`}
                  fill="none"
                  stroke={shaft}
                  strokeOpacity={killed ? 0.3 : shaftOp}
                  strokeWidth={isAnagen ? 5 : isCatagen ? 3.5 : 2.5}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-opacity 700ms ease' }}
                />
                {/* hagyma */}
                <motion.ellipse
                  cx={endX}
                  cy={f.bulbY}
                  rx={isAnagen ? 12 : isCatagen ? 9 : 7}
                  ry={isAnagen ? 15 : isCatagen ? 11 : 8}
                  fill={killed ? (light ? '#C4B6A4' : '#4A4038') : shaft}
                  fillOpacity={killed ? 0.75 : isAnagen ? 1 : 0.55}
                  animate={
                    !reduced && phase === 2 && isAnagen
                      ? { scale: [1, 1.22, 0.88], opacity: [1, 1, 0.8] }
                      : { scale: 1, opacity: 1 }
                  }
                  transition={{ duration: 1.5, delay: i * 0.12, ease: 'easeOut' }}
                  style={{ transformOrigin: `${endX}px ${f.bulbY}px`, transition: 'fill 700ms ease' }}
                />
                {/* hő-korona a kikapcsolás pillanatában */}
                {phase === 2 && isAnagen && (
                  <motion.circle
                    cx={endX}
                    cy={f.bulbY}
                    r="40"
                    fill={`url(#${uid}-heat)`}
                    initial={{ opacity: 0, scale: 0.35 }}
                    animate={reduced ? { opacity: 0.55, scale: 1 } : { opacity: [0, 0.95, 0.25], scale: [0.35, 1, 1.25] }}
                    transition={{ duration: 1.8, delay: i * 0.12, ease: 'easeOut' }}
                    style={{ transformOrigin: `${endX}px ${f.bulbY}px` }}
                  />
                )}
                {/* Záró állapot. A pipa GRAFIKA, ezért mobilon is marad; a
                    szöveges címke csak asztali nézetben fér el olvashatóan. */}
                {phase === 3 && (
                  <motion.g
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.09 }}
                  >
                    {isAnagen ? (
                      <>
                        <circle cx={endX} cy={f.bulbY + 34} r="10.5" fill={c.gold} />
                        <path
                          d={`M ${endX - 4.5} ${f.bulbY + 34} l 3.2 3.4 l 6.1 -6.6`}
                          fill="none"
                          stroke={light ? '#FBF6EF' : '#15100C'}
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <text className="hidden sm:block" x={endX} y={f.bulbY + 59} fontSize="11" fill={c.accent} textAnchor="middle">
                          kikapcsolva
                        </text>
                      </>
                    ) : (
                      <text className="hidden sm:block" x={endX} y={f.bulbY + 30} fontSize="11" fill={c.mute} textAnchor="middle">
                        épp pihen
                      </text>
                    )}
                  </motion.g>
                )}
              </g>
            );
          })}

          {/* ── Nyalábok ───────────────────────────────────────────────── */}
          {pulsing && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              {/* 755 — legszélesebb, legsekélyebb */}
              <motion.path
                d={`M 318 ${SURFACE} L 452 ${SURFACE} L 424 202 L 346 202 Z`}
                fill={`url(#${uid}-b755)`}
                animate={reduced ? { opacity: 0.7 } : { opacity: [0.25, 0.95, 0.35] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* 808 — közepes */}
              <motion.path
                d={`M 332 ${SURFACE} L 438 ${SURFACE} L 414 256 L 356 256 Z`}
                fill={`url(#${uid}-b808)`}
                animate={reduced ? { opacity: 0.7 } : { opacity: [0.3, 1, 0.4] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.12 }}
              />
              {/* 1064 — legkeskenyebb, legmélyebb */}
              <motion.path
                d={`M 346 ${SURFACE} L 424 ${SURFACE} L 408 320 L 362 320 Z`}
                fill={`url(#${uid}-b1064)`}
                animate={reduced ? { opacity: 0.7 } : { opacity: [0.35, 1, 0.45] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.24 }}
              />

              {/* Mélység-vonalzó: itt válik a „három hullámhossz" jellemzőből
                  haszonná — látszik, hogy a három együtt lefedi a teljes mélységet.
                  Saját panelen ül, mert a 4. és 5. tüsző pont ebben a sávban van. */}
              <rect x="474" y="180" width="272" height="166" rx="12" fill={c.bg} fillOpacity="0.9" stroke={c.hair} />
              {[
                { y: 206, nm: '755 nm', note: 'vékonyabb, világosabb szál' },
                { y: 258, nm: '808 nm', note: 'az általános munkahullámhossz' },
                { y: 312, nm: '1064 nm', note: 'legmélyebb · sötét bőrön is biztonságos' },
              ].map((d) => (
                <g key={d.nm}>
                  <line x1="428" y1={d.y} x2="468" y2={d.y} stroke={c.goldSoft} strokeOpacity="0.55" strokeWidth="1" strokeDasharray="3 3" />
                  {/* Mobilon CSAK a szám fér el olvashatóan — a magyarázó sor
                      19-es rajzegységgel kilógna a panelből. */}
                  <text className="hidden sm:block" x="490" y={d.y - 3} fontSize="14" fill={c.accent} fontWeight="500">{d.nm}</text>
                  <text className="hidden sm:block" x="490" y={d.y + 14} fontSize="10.5" fill={c.mute}>{d.note}</text>
                  <text className="sm:hidden" x="494" y={d.y + 9} fontSize="27" fill={c.accent} fontWeight="500">{d.nm}</text>
                </g>
              ))}
            </motion.g>
          )}

          {/* ── Kezelőfej ──────────────────────────────────────────────── */}
          <motion.g animate={{ x: headX }} initial={false} transition={{ type: 'spring', stiffness: 60, damping: 18 }}>
            {/* 190 és nem 168: a „755 · 808 · 1064" felirat 181-nél végződött,
                tehát kilógott a dobozból. A zafírablak és a „hűtött lap" felirat
                együtt mozog vele, hogy a fej szimmetrikus maradjon. */}
            <rect x="0" y="16" width="190" height="60" rx="16" fill={light ? '#2A211A' : '#0F0B08'} />
            <rect x="0" y="16" width="190" height="60" rx="16" fill="none" stroke={c.hair} />
            <rect x="14" y="30" width="52" height="10" rx="5" fill={c.gold} fillOpacity="0.45" />
            <rect x="14" y="46" width="30" height="6" rx="3" fill={c.goldSoft} fillOpacity="0.3" />
            {/* A kezelőfej MINDKÉT tónusban sötét, ezért a feliratai fix világos
                színt kapnak — a világos paletta `mute`-ja itt 2,6:1-et adna. */}
            <text className="hidden sm:block" x="82" y="42" fontSize="11" letterSpacing="1.4" fill="#C9A36C">DIÓDA</text>
            <text className="hidden sm:block" x="82" y="58" fontSize="9.5" letterSpacing="1" fill="#A89685">755 · 808 · 1064</text>
            <text className="sm:hidden" x="82" y="53" fontSize="22" letterSpacing="1.2" fill="#C9A36C">DIÓDA</text>
            {/* zafírablak = a hűtött lap */}
            <rect x="22" y="76" width="146" height="9" rx="4.5" fill="#9FC6D8" fillOpacity="0.25" />
            <motion.rect
              x="22"
              y="76"
              width="146"
              height="9"
              rx="4.5"
              fill={`url(#${uid}-chill)`}
              animate={reduced ? { opacity: 0.6 } : { opacity: pulsing ? [0.4, 1, 0.4] : 0.45 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <text className="hidden sm:block" x="95" y="98" fontSize="10.5" fill="#9FC6D8" textAnchor="middle" opacity="0.9">
              hűtött lap
            </text>
          </motion.g>

          {/* ── Fázis-képaláírás ───────────────────────────────────────────
               Az ábra EGYETLEN magyarázó eleme, mert alatta már nincs szöveg.
               A bal felső sarok ezért mindig szabad: a kezelőfej nem megy oda. */}
          <motion.g key={p.key} initial={reduced ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <g className="hidden sm:block">
              <text x="24" y="40" fontSize="16" fontWeight="500" fill={c.text}>{p.a}</text>
              <text x="24" y="62" fontSize="12.5" fill={c.accent}>{p.b}</text>
            </g>
            <g className="sm:hidden">
              <text x="24" y="40" fontSize="28" fontWeight="500" fill={c.text}>{p.am ?? p.a}</text>
              <text x="24" y="74" fontSize="22" fill={c.accent}>{p.bm ?? p.b}</text>
            </g>
          </motion.g>
        </svg>
      </figure>
    </div>
  );
}

export default LaserDiodeAnimation;
