import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * „A számla” — a V1 variáns motorja.
 *
 * A MARKETING-DÖNTÉS, ami miatt így néz ki: a látogató a 66 000 Ft-ot a NULLÁHOZ
 * hasonlítja, pedig már ma is fizet — csak részletekben, és örökre. A feladat nem
 * az, hogy meggyőzzük; az, hogy a saját számát kimondassuk vele. Ezért a
 * kalkulátor NEM állít gyanta-árat: a látogató adja meg, mennyit költ EGY
 * alkalomra és milyen gyakran. Mi csak szorzunk.
 *
 * Ez egyszerre etikai és hatás-kérdés:
 * — etikai: nem állítunk versenytárs-árat, amit nem mértünk (Fttv., L23 vakfoltja),
 * — hatás: az önmeggyőzés erősebb, mint a mi számunk (a látogató nem vitatkozik
 *   a saját adatával).
 *
 * A sorozat-árak a `data/lezer.ts`-ből jönnek, tehát áremeléskor itt nincs teendő.
 */

import { zones } from '../../data/lezer';

const HUF = new Intl.NumberFormat('hu-HU', { maximumFractionDigits: 0 });

/** Kezelhető területek → melyik zóna árlistája vonatkozik rá. */
const AREAS = [
  { id: 'honalj', label: 'Hónalj', zone: 'S', defaultEvery: 4 },
  { id: 'bikini', label: 'Bikinivonal', zone: 'S', defaultEvery: 4 },
  { id: 'labszar', label: 'Lábszár', zone: 'L', defaultEvery: 3 },
  { id: 'teljes-lab', label: 'Teljes láb', zone: 'XL', defaultEvery: 4 },
  { id: 'felso-ajak', label: 'Felső ajak', zone: 'XS', defaultEvery: 3 },
] as const;

/** Simított számláló — a szám „felfut”, nem ugrik. Ez teszi PVA-vá (L20). */
function useCountTo(target: number, reduced: boolean) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  const raf = useRef(0);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const a = from.current;
    const dur = 520;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(a + (target - a) * eased));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, reduced]);

  return value;
}

export function CostCalculator() {
  const reduced = useReducedMotion();
  const [areaId, setAreaId] = useState<(typeof AREAS)[number]['id']>('honalj');
  /** Mennyit fizet MA egy alkalomra — az ő száma, nem a miénk. */
  const [perTime, setPerTime] = useState(5000);
  /** Hány hetente. */
  const [everyWeeks, setEveryWeeks] = useState(4);

  const area = AREAS.find((a) => a.id === areaId)!;
  const zone = zones.find((z) => z.tag === area.zone)!;

  const math = useMemo(() => {
    const perYear = Math.round(52 / everyWeeks);
    const yearly = perTime * perYear;
    const tenYears = yearly * 10;
    const series = zone.serialNum * 6;
    // Megtérülés: hány hónap alatt fizetne ki ugyanennyit a mostani módszerrel.
    const monthly = yearly / 12;
    const breakEvenMonths = monthly > 0 ? Math.ceil(series / monthly) : 0;
    return { perYear, yearly, tenYears, series, breakEvenMonths, saved: Math.max(0, tenYears - series) };
  }, [perTime, everyWeeks, zone]);

  const tenYears = useCountTo(math.tenYears, !!reduced);
  const saved = useCountTo(math.saved, !!reduced);

  // A megtérülési sáv 36 hónapos skálán — a valós döntési horizont nem 10 év.
  const barPct = Math.min(100, (math.breakEvenMonths / 36) * 100);

  return (
    <div className="rounded-[28px] bg-linen text-ink overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
      <div className="px-6 sm:px-9 pt-8 sm:pt-10 pb-7">
        <p className="text-[11px] uppercase tracking-caps text-goldDeep">A saját számod</p>
        <h3 className="mt-3 font-display font-light leading-[1.12] tracking-tight" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)' }}>
          Nem mondom meg, mennyit költesz. <em className="display not-italic text-goldDeep italic">Te mondod meg.</em>
        </h3>

        {/* 1 — terület */}
        <fieldset className="mt-7">
          <legend className="text-[11px] uppercase tracking-caps text-ink/65 mb-3">1 · Melyik terület</legend>
          <div className="flex flex-wrap gap-2">
            {AREAS.map((a) => {
              const on = a.id === areaId;
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => {
                    setAreaId(a.id);
                    setEveryWeeks(a.defaultEvery);
                  }}
                  className={`rounded-full px-4 py-2.5 text-[13px] transition-colors duration-200 border ${
                    on
                      ? 'bg-ink text-cream border-ink font-medium'
                      : 'bg-transparent text-ink/70 border-ink/15 hover:border-ink/40'
                  }`}
                >
                  {a.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* 2 — mennyit fizet egy alkalomra */}
        <div className="mt-8">
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor="fb-cost" className="text-[11px] uppercase tracking-caps text-ink/65">
              2 · Mennyit fizetsz egy szőrtelenítésre
            </label>
            <span className="font-display text-2xl tabular-nums">{HUF.format(perTime)} Ft</span>
          </div>
          <input
            id="fb-cost"
            type="range"
            min={500}
            max={25000}
            step={500}
            value={perTime}
            onChange={(e) => setPerTime(Number(e.target.value))}
            className="fb-range mt-3"
            aria-valuetext={`${HUF.format(perTime)} forint`}
          />
          <p className="mt-2 text-[12px] text-ink/65">
            Gyanta, borotva-utánpótlás, epilátor — ami nálad a valóság. Ezt a számot nem én találom ki.
          </p>
        </div>

        {/* 3 — milyen gyakran */}
        <div className="mt-7">
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor="fb-freq" className="text-[11px] uppercase tracking-caps text-ink/65">
              3 · Milyen gyakran
            </label>
            <span className="font-display text-2xl tabular-nums">
              {everyWeeks === 1 ? 'hetente' : `${everyWeeks} hetente`}
            </span>
          </div>
          <input
            id="fb-freq"
            type="range"
            min={1}
            max={12}
            step={1}
            value={everyWeeks}
            onChange={(e) => setEveryWeeks(Number(e.target.value))}
            className="fb-range mt-3"
            aria-valuetext={`${everyWeeks} hetente`}
          />
          <p className="mt-2 text-[12px] text-ink/65">Ez évi {math.perYear} alkalom.</p>
        </div>
      </div>

      {/* ── Az eredmény ────────────────────────────────────────────────── */}
      <div className="bg-ink text-cream px-6 sm:px-9 py-8 sm:py-10">
        <div className="grid sm:grid-cols-2 gap-7 sm:gap-9">
          <div>
            <p className="text-[11px] uppercase tracking-caps text-creamMute">Amit 10 év alatt kifizetsz így</p>
            <p className="mt-2 font-display font-light tabular-nums text-cream leading-none" style={{ fontSize: 'clamp(2.2rem, 6vw, 3.4rem)' }}>
              {HUF.format(tenYears)}
              <span className="text-xl text-creamMute font-normal"> Ft</span>
            </p>
            <p className="mt-2 text-[13px] text-creamSoft">
              …és a tizedik év után is fizeted tovább. Ennek nincs vége.
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-caps text-gold">
              {area.label} · {zone.tag} zóna · 6 alkalmas sorozat
            </p>
            <p className="mt-2 font-display font-light tabular-nums text-gold leading-none" style={{ fontSize: 'clamp(2.2rem, 6vw, 3.4rem)' }}>
              {HUF.format(math.series)}
              <span className="text-xl text-goldSoft/70 font-normal"> Ft</span>
            </p>
            <p className="mt-2 text-[13px] text-creamSoft">
              {HUF.format(zone.serialNum)} Ft alkalmanként, a helyszínen. <span className="text-cream">Egyszer.</span>
            </p>
          </div>
        </div>

        {/* Megtérülési sáv */}
        <div className="mt-9">
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <p className="text-[11px] uppercase tracking-caps text-creamMute">Mikor jön vissza</p>
            <p className="text-[13px] text-cream">
              <span className="font-display text-xl tabular-nums">{math.breakEvenMonths}</span> hónap
            </p>
          </div>
          <div className="h-2.5 rounded-full bg-white/10 overflow-hidden" role="img" aria-label={`Megtérülés ${math.breakEvenMonths} hónap alatt, 36 hónapos skálán`}>
            <div
              className="h-full rounded-full bg-gold"
              style={{ width: `${barPct}%`, transition: reduced ? 'none' : 'width 560ms cubic-bezier(0.23,1,0.32,1)' }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[10px] uppercase tracking-caps text-creamMute/70">
            <span>ma</span>
            <span>3 év</span>
          </div>
        </div>

        {math.saved > 0 && (
          <p className="mt-7 text-[15px] sm:text-base text-creamSoft leading-[1.7] max-w-[52ch]">
            A tizedik évig{' '}
            <span className="text-gold font-medium tabular-nums">{HUF.format(saved)} Ft</span> marad nálad — és
            a naptáradból kiesik {math.perYear * 10} alkalom.
          </p>
        )}

        <p className="mt-5 text-[11px] text-creamMute/80 leading-relaxed max-w-[56ch]">
          A bal oldali szám a te adataidból jön, nem az én becslésem. A jobb oldali a tényleges
          árlistám. A karbantartó alkalmakat (évi egy-kettő, egyalkalmas áron) a számítás nem
          tartalmazza.
        </p>
      </div>
    </div>
  );
}

export default CostCalculator;
