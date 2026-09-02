import { useMemo, useState } from 'react';
import { siteConfig } from '../config/site';

/**
 * Esküvői szépségnaptár — a menyasszony beírja az esküvő dátumát, és
 * visszakapja a saját, dátumozott ütemtervét.
 *
 * FONTOS: minden offset és minden „miért” a saját, MÁR PUBLIKÁLT szabályainkból
 * jön, nem általános szépségipari tanácsból:
 *  - arckezelés havi ütem  -> a bőr 28 napos ciklusa (arckezeles-zuglo GYIK)
 *  - utolsó arckezelés −10 nap -> „5–10 nappal az esemény előtt a legjobb”
 *  - próbasmink 4–8 hét    -> a sminkes-zuglo ProcessSteps 02. lépése
 *  - lifting −8 nap        -> „az esküvő előtt 5–10 nappal” (koreai lifting cikk)
 * Ha az árak változnak, itt is át kell írni — lásd PRICES lent.
 */

type Group = 'arckezeles' | 'smink' | 'tekintet' | 'oromanya';

interface Step {
  id: string;
  group: Group;
  /** Napok az esküvő előtt (pozitív szám = ennyi nappal korábban). */
  daysBefore: number;
  title: string;
  why: string;
  href: string;
}

const STEPS: Step[] = [
  {
    id: 'arc-1',
    group: 'arckezeles',
    daysBefore: 70,
    title: 'Arckezelés-kúra — 1. alkalom',
    why: 'A bőr megújulási ciklusa nagyjából 28 nap, ezért a kúra havi ütemben dolgozik. Tíz héttel a nagy nap előtt van idő strukturális változásra, nem csak felszíni ragyogásra.',
    href: '/arckezeles-zuglo/',
  },
  {
    id: 'arc-2',
    group: 'arckezeles',
    daysBefore: 42,
    title: 'Arckezelés-kúra — 2. alkalom',
    why: 'Egy hónappal az első után. Ez az az alkalom, ahol már látszik, mire reagál a bőröd — innentől célzottan tudunk dolgozni.',
    href: '/arckezeles-zuglo/',
  },
  {
    id: 'proba',
    group: 'smink',
    daysBefore: 35,
    title: 'Menyasszonyi próbasmink',
    why: 'Az ideális ablak az esküvő előtti 4–8 hét. Itt kísérletezzük ki a végleges stílust, és fotó készül róla — ez lesz a nagy napi tervrajz. Marad idő finomítani, ha valamin változtatnál.',
    href: '/sminkes-zuglo/',
  },
  {
    id: 'arc-3',
    group: 'arckezeles',
    daysBefore: 10,
    title: 'Arckezelés-kúra — 3. alkalom',
    why: 'Az utolsó kezelés 5–10 nappal az esemény előtt a legjobb: a bőr addigra teljesen letisztul, és a nagy napon már a nyugodt, egyenletes felszínt látod.',
    href: '/arckezeles-zuglo/',
  },
  {
    id: 'tekintet',
    group: 'tekintet',
    daysBefore: 8,
    title: 'Szemöldök laminálás + szempilla lifting',
    why: 'A lifting 5–10 nappal a nagy nap előtt áll be a legszebben — a kezelés utáni első 24 órában nem érheti víz, gőz vagy pára, ezért az esküvő előtti napra semmiképp ne tedd. A 6–8 hetes ciklusból bőven kitart a nászútra is.',
    href: '/szempilla-lifting-zuglo/',
  },
  {
    id: 'smink',
    group: 'smink',
    daysBefore: 0,
    title: 'Menyasszonyi smink — a nagy nap',
    why: 'A próbasmink fotója alapján, tippelgetés nélkül. Bőrelőkészítés, hosszan tartó alapozás, professzionális fixálás — kibírja az ölelést, a könnyet és a délutáni táncot.',
    href: '/sminkes-zuglo/',
  },
  {
    id: 'oromanya',
    group: 'oromanya',
    daysBefore: 0,
    title: 'Örömanya smink',
    why: 'Ugyanazon a reggelen, előre egyeztetett sorrendben. Diszkrét, korhoz illő, fotózásra is alkalmas.',
    href: '/sminkes-zuglo/',
  },
];

const GROUPS: { id: Group; label: string; hint: string; defaultOn: boolean }[] = [
  { id: 'smink', label: 'Próbasmink + menyasszonyi smink', hint: 'A menyasszonyi csomag', defaultOn: true },
  { id: 'tekintet', label: 'Szemöldök laminálás + szempilla lifting', hint: 'Teljes Tekintet, egy időpontban', defaultOn: true },
  { id: 'arckezeles', label: 'Arckezelés-kúra (3 alkalom)', hint: 'Signature RESET, havi ütemben', defaultOn: false },
  { id: 'oromanya', label: 'Örömanya smink is kell', hint: 'A menyasszonyi sminkkel egy reggelen', defaultOn: false },
];

/** 2026-os árak. Ha változnak, a szolgáltatás-oldalakon is át kell írni. */
const PRICES = {
  sminkCsomag: 39000, // próbasmink + menyasszonyi smink együtt
  teljesEskuvo: 51000, // + örömanya, egy reggelen
  tekintet: 18000, // szemöldök laminálás + szempilla lifting
  arckezeles: 49500, // 3 alkalmas Signature RESET
};

const huDate = new Intl.DateTimeFormat('hu-HU', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
const huWeekday = new Intl.DateTimeFormat('hu-HU', { weekday: 'long' });

function addDays(base: Date, days: number): Date {
  const d = new Date(base.getTime());
  d.setDate(d.getDate() + days);
  return d;
}

/** Ma éjfél — így a „már elmúlt” összehasonlítás nem függ a napszaktól. */
function todayStart(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatPrice(n: number): string {
  return `${n.toLocaleString('hu-HU')} Ft`;
}

export function WeddingPlanner() {
  const [dateValue, setDateValue] = useState('');
  const [active, setActive] = useState<Record<Group, boolean>>(() => {
    const init = {} as Record<Group, boolean>;
    GROUPS.forEach((g) => {
      init[g.id] = g.defaultOn;
    });
    return init;
  });
  const [copied, setCopied] = useState(false);

  const weddingDate = useMemo(() => {
    if (!dateValue) return null;
    // A date input yyyy-mm-dd-t ad; helyi idő szerinti éjfélként olvassuk,
    // hogy a UTC-eltolás ne csússzon egy napot visszafelé.
    const [y, m, d] = dateValue.split('-').map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
  }, [dateValue]);

  const plan = useMemo(() => {
    if (!weddingDate) return [];
    const today = todayStart();
    return STEPS.filter((s) => active[s.group])
      .map((s) => {
        const when = addDays(weddingDate, -s.daysBefore);
        return { ...s, when, past: when < today };
      })
      .sort((a, b) => a.when.getTime() - b.when.getTime());
  }, [weddingDate, active]);

  const pastCount = plan.filter((s) => s.past).length;

  const total = useMemo(() => {
    let sum = 0;
    if (active.smink && active.oromanya) sum += PRICES.teljesEskuvo;
    else if (active.smink) sum += PRICES.sminkCsomag;
    else if (active.oromanya) sum += 15000;
    if (active.tekintet) sum += PRICES.tekintet;
    if (active.arckezeles) sum += PRICES.arckezeles;
    return sum;
  }, [active]);

  const planAsText = useMemo(() => {
    if (!weddingDate || plan.length === 0) return '';
    const lines = [
      `Esküvői szépségnaptár — ${huDate.format(weddingDate)}`,
      '',
      ...plan.map((s) => `${huDate.format(s.when)} (${huWeekday.format(s.when)}) — ${s.title}`),
      '',
      `Összesen: ${formatPrice(total)}`,
      'FRUBEAUTY · 1143 Budapest, Egressy út 16. · frubeauty.com/eskuvoi-szepsegnaptar/',
    ];
    return lines.join('\n');
  }, [plan, weddingDate, total]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(planAsText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Ha a clipboard API nem elérhető (régi böngésző, nem-biztonságos
      // kontextus), csendben nem csinálunk semmit — a terv így is olvasható.
    }
  }

  const toggle = (id: Group) => setActive((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
      {/* Bal oszlop — a vezérlők */}
      <div className="lg:col-span-5">
        <div className="border-t border-whisper pt-6">
          <label
            htmlFor="wedding-date"
            className="block text-[11px] uppercase tracking-caps text-gold mb-3"
          >
            Az esküvő dátuma
          </label>
          <input
            id="wedding-date"
            type="date"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
            className="w-full bg-inkRise text-cream text-lg rounded-2xl border border-whisperStrong px-5 py-4 focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        <fieldset className="border-t border-whisper pt-6 mt-8">
          <legend className="text-[11px] uppercase tracking-caps text-gold mb-4">
            Mit szeretnél?
          </legend>
          <div className="space-y-3">
            {GROUPS.map((g) => (
              <label
                key={g.id}
                className="flex items-start gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={active[g.id]}
                  onChange={() => toggle(g.id)}
                  className="mt-1 w-4 h-4 shrink-0 accent-gold cursor-pointer"
                />
                <span>
                  <span className="block text-[15px] text-cream leading-snug group-hover:text-gold transition-colors">
                    {g.label}
                  </span>
                  <span className="block text-[13px] text-creamMute leading-snug">{g.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {total > 0 && (
          <div className="border-t border-whisper pt-6 mt-8">
            <p className="text-[11px] uppercase tracking-caps text-creamMute mb-2">
              A kiválasztott szolgáltatások
            </p>
            <p className="font-display text-4xl font-light text-cream">{formatPrice(total)}</p>
            <p className="mt-2 text-[13px] text-creamMute leading-relaxed">
              2026-os csomagárak. A helyszíni kiszállás díja ebben nincs benne — azt a
              távolság alapján egyedileg számolom.
            </p>
          </div>
        )}
      </div>

      {/* Jobb oszlop — az ütemterv */}
      <div className="lg:col-span-7">
        {!weddingDate && (
          <div className="border border-dashed border-whisperStrong rounded-3xl px-7 py-12 text-center">
            <p className="text-creamSoft leading-[1.7] max-w-[42ch] mx-auto">
              Írd be az esküvőd dátumát, és megkapod a saját ütemtervedet — dátumra
              pontosan, azzal együtt, hogy melyik kezelést miért pont akkor érdemes.
            </p>
          </div>
        )}

        {weddingDate && plan.length === 0 && (
          <div className="border border-dashed border-whisperStrong rounded-3xl px-7 py-12 text-center">
            <p className="text-creamSoft leading-[1.7]">
              Válassz legalább egy szolgáltatást a bal oldalon.
            </p>
          </div>
        )}

        {weddingDate && plan.length > 0 && (
          <>
            {pastCount > 0 && (
              <div className="mb-8 rounded-2xl border border-gold/40 bg-gold/5 px-5 py-4">
                <p className="text-[15px] text-cream leading-[1.7]">
                  <strong>
                    {pastCount === plan.length
                      ? 'Ez a dátum már nagyon közel van.'
                      : `${pastCount} lépés ideje már elmúlt.`}
                  </strong>{' '}
                  Ettől még nincs baj — írj rám, és a maradék időből összerakjuk a
                  lehető legjobb tervet.
                </p>
              </div>
            )}

            <ol className="relative border-l border-whisperStrong pl-7 sm:pl-9 space-y-9">
              {plan.map((s) => (
                <li key={s.id} className="relative">
                  <span
                    aria-hidden
                    className={`absolute -left-[33px] sm:-left-[41px] top-1.5 w-3 h-3 rounded-full ring-4 ring-ink ${
                      s.past ? 'bg-whisperStrong' : 'bg-gold'
                    }`}
                  />
                  <p
                    className={`text-[11px] uppercase tracking-caps mb-1.5 ${
                      s.past ? 'text-creamMute' : 'text-gold'
                    }`}
                  >
                    {huDate.format(s.when)} · {huWeekday.format(s.when)}
                    {s.daysBefore === 0 && ' · a nagy nap'}
                    {s.past && ' · elmúlt'}
                  </p>
                  <h3
                    className={`font-medium text-lg leading-snug mb-2 ${
                      s.past ? 'text-creamMute' : 'text-cream'
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p className="text-creamSoft leading-[1.7] text-[15px] max-w-[52ch]">{s.why}</p>
                  <a
                    href={s.href}
                    className="mt-3 inline-flex items-center text-[12px] uppercase tracking-caps font-medium text-cream group hover:text-gold transition-colors"
                  >
                    Részletek és árak
                    <span
                      aria-hidden
                      className="ml-2 transition-transform duration-300 ease-out group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={siteConfig.booking}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center px-6 py-3.5 text-[12px] uppercase tracking-caps font-medium bg-gold text-ink rounded-full hover:bg-goldSoft active:scale-[0.97] active:translate-y-px transition-colors duration-150"
              >
                Időpontot foglalok
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center px-6 py-3.5 text-[12px] uppercase tracking-caps font-medium border border-whisperStrong text-cream rounded-full hover:border-gold hover:text-gold active:scale-[0.97] active:translate-y-px transition-colors duration-150"
              >
                {copied ? 'Kimásolva ✓' : 'Terv másolása'}
              </button>
            </div>

            <p className="mt-5 text-[13px] text-creamMute leading-relaxed max-w-[52ch]">
              Az ütemterv javaslat, nem szabály — ha csúszik valami, szólj, és
              átrendezzük. A szezonban (május–szeptember) viszont érdemes korán
              foglalni, mert a szombat reggelek fogynak el elsőként.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
