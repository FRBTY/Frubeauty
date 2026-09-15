import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * „A naptár” — a V3 variáns motorja.
 *
 * A MARKETING-DÖNTÉS: ennél a szolgáltatásnál létezik egy VALÓDI határidő, és
 * majdnem senki nem kommunikálja. A sorozat hat alkalom 4–6 hetente = hat-nyolc
 * hónap, frissen barnult bőrre pedig nem lehet kezelni. Vagyis aki nyárra sima
 * bőrt akar, annak ŐSSZEL kell kezdenie. Ez a szűkösség (L15) tiszta formája:
 * nem visszaszámláló, nem kitalált készlet — naptár.
 *
 * MIÉRT NEM COUNTDOWN: a folyamatosan újrainduló visszaszámláló megtévesztő
 * kereskedelmi gyakorlat lehet (Fttv.), és a hitelességet is viszi. Itt a korlát
 * ellenőrizhető: a látogató utána tud számolni. Ezért erősebb.
 *
 * A dátum a BÖNGÉSZŐBEN számolódik, nem build-időben — különben a lap egy
 * hónappal a deploy után hazudna.
 */

const MONTHS = [
  'január', 'február', 'március', 'április', 'május', 'június',
  'július', 'augusztus', 'szeptember', 'október', 'november', 'december',
];

/** 5 hét az átlagos köz (a 4–6 hetes sáv közepe). */
const WEEKS_BETWEEN = 5;
const SESSIONS = 6;

function addWeeks(d: Date, w: number) {
  const n = new Date(d);
  n.setDate(n.getDate() + w * 7);
  return n;
}

function labelOf(d: Date) {
  return `${MONTHS[d.getMonth()]}`;
}

export function SeasonTimeline() {
  const reduced = useReducedMotion();
  /** 0 = most kezdek, 1 = egy hónap múlva, … — a halogatás ára láthatóvá téve. */
  const [delayMonths, setDelayMonths] = useState(0);

  const data = useMemo(() => {
    const today = new Date();
    const start = new Date(today);
    start.setMonth(start.getMonth() + delayMonths);

    const dates = Array.from({ length: SESSIONS }, (_, i) => addWeeks(start, i * WEEKS_BETWEEN));
    const finish = dates[SESSIONS - 1];

    // A „kész-e nyárra” kérdés: a következő olyan június 1., ami a start után van.
    const summer = new Date(start.getFullYear(), 5, 1);
    if (summer < start) summer.setFullYear(summer.getFullYear() + 1);
    const readyForSummer = finish <= summer;

    // Az utolsó indulási nap, ami még arra a nyárra kész: június 1. mínusz a sorozat hossza.
    const lastStart = addWeeks(summer, -(SESSIONS - 1) * WEEKS_BETWEEN);

    return { today, start, dates, finish, summer, readyForSummer, lastStart };
  }, [delayMonths]);

  const fmt = new Intl.DateTimeFormat('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div>
      {/* ── Vezérlő: a halogatás ára ──────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 mb-9">
        <span className="text-[11px] uppercase tracking-caps text-creamMute mr-1">Ha elkezded:</span>
        {[
          { v: 0, label: 'most' },
          { v: 1, label: '1 hónap múlva' },
          { v: 3, label: '3 hónap múlva' },
          // SZÁNDÉKOSAN „6 hónap múlva" és nem „jövő tavasszal": az évszak-név
          // csak az év egy részében lenne igaz, a hónapszám mindig.
          { v: 6, label: '6 hónap múlva' },
        ].map((o) => {
          const on = o.v === delayMonths;
          return (
            <button
              key={o.v}
              type="button"
              onClick={() => setDelayMonths(o.v)}
              className={`rounded-full px-4 py-2 text-[12px] uppercase tracking-caps transition-colors duration-300 border ${
                on ? 'bg-gold text-ink border-gold font-semibold' : 'text-creamMute border-whisper hover:border-whisperStrong hover:text-cream'
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>

      {/* ── A hat alkalom ─────────────────────────────────────────────────── */}
      <ol className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-3">
        {data.dates.map((d, i) => (
          <motion.li
            key={i}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: reduced ? 0 : i * 0.06 }}
            className="relative"
          >
            <div className="h-full rounded-2xl border border-whisper bg-inkSoft px-4 py-5">
              <p className="text-[10px] uppercase tracking-caps text-gold">{i + 1}. alkalom</p>
              <p className="mt-2 font-display text-cream leading-none" style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)' }}>
                {labelOf(d)}
              </p>
              <p className="mt-1.5 text-[12px] text-creamMute tabular-nums">{d.getDate()}. körül</p>
              {i === 0 && <p className="mt-3 text-[11px] text-creamSoft leading-snug">az első kezelés</p>}
              {i === 2 && <p className="mt-3 text-[11px] text-creamSoft leading-snug">itt látod először a fotókon</p>}
              {i === SESSIONS - 1 && <p className="mt-3 text-[11px] text-goldSoft leading-snug">a sorozat kész</p>}
            </div>
          </motion.li>
        ))}
      </ol>

      {/* ── A verdikt ─────────────────────────────────────────────────────── */}
      <div
        className={`mt-8 rounded-3xl p-7 sm:p-9 ${
          data.readyForSummer
            ? 'bg-inkDeep ring-2 ring-gold/40 shadow-[0_20px_60px_-20px_rgba(184,136,74,0.35)]'
            : 'bg-inkSoft border border-whisperStrong'
        }`}
      >
        <p className="text-[11px] uppercase tracking-caps mb-4" style={{ color: data.readyForSummer ? '#B8884A' : '#A89685' }}>
          {data.readyForSummer ? 'Ez még belefér' : 'Ez már nem fér bele'}
        </p>
        <p className="font-display font-light text-cream leading-[1.15]" style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.15rem)' }}>
          {data.readyForSummer ? (
            <>
              A sorozatod <em className="display">{labelOf(data.finish)}ra</em> kész — még a nyár előtt.
            </>
          ) : (
            <>
              A sorozatod csak <em className="display">{labelOf(data.finish)}ra</em> lesz kész. Az már a nyár után van.
            </>
          )}
        </p>
        <p className="mt-5 text-creamSoft leading-[1.75] max-w-[60ch] text-[15px] sm:text-base">
          {data.readyForSummer ? (
            <>
              Hat alkalom 4–6 hetes közökkel. Az utolsó kezelés {fmt.format(data.finish)} körül van — és mivel
              frissen barnult bőrre nem kezdünk, a sorozatot érdemes a barnulási időszak előtt letudni.
            </>
          ) : (
            <>
              Nem sürgetni akarlak: egyszerűen ennyi idő a sorozat. Ha {new Date(data.summer).getFullYear()} nyarára
              szeretnél kész lenni, a legkésőbbi indulás <span className="text-gold">{fmt.format(data.lastStart)}</span> körül van.
              Utána is elkezdheted — csak ősszel lesz kész, nem nyárra.
            </>
          )}
        </p>
        <p className="mt-4 text-[12px] text-creamMute leading-relaxed max-w-[60ch]">
          A dátumok 5 hetes átlagos közökkel számolva, tájékoztató jelleggel — a valódi ritmust a bőröd és a
          szálad növekedése szabja meg, és menet közben igazítjuk. Nincs visszaszámláló, mert nincs mit
          visszaszámlálni: ez naptár, nem akció.
        </p>
      </div>
    </div>
  );
}

export default SeasonTimeline;
