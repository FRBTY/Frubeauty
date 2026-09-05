import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { siteConfig, relFor } from '../config/site';

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
 *  - 4–6 hónapos előfoglalás a szezonban -> az oldal GYIK-je
 *  - 24 órás díjmentes lemondás -> ÁSZF
 * Ha az árak változnak, itt is át kell írni — lásd STEP_PRICE és PACKAGES.
 *
 * Konverziós logika (2026-09, marketing-audit után): az eszköz nem a tervnél ér
 * véget. A terv elkészülte után EGY döntés marad — a legközelebbi jövőbeli lépés
 * lefoglalása —, és minden felület ezt tolja előre: az „Ezzel kezdd” kártya, a
 * folyamat-híd a terv alatt, a mobil alsó sáv, és a naptárba menthető .ics
 * (ami hónapokon át a márkát tartja a menyasszony naptárában).
 *
 * A Notino-kattintást a Layout globális kattintás-figyelője méri konverzióként,
 * ezért minden foglalás-CTA sima <a> a siteConfig.booking-ra, relFor()-ral.
 */

type Group = 'smink' | 'tekintet' | 'arckezeles' | 'oromanya';

interface Step {
  id: string;
  group: Group;
  /** Napok az esküvő előtt (pozitív szám = ennyi nappal korábban). */
  daysBefore: number;
  title: string;
  /** Rövid név a gombhoz, a mobil sávhoz és a naptár-bejegyzéshez. */
  short: string;
  duration: string;
  why: string;
  href: string;
}

const STEPS: Step[] = [
  {
    id: 'arc-1',
    group: 'arckezeles',
    daysBefore: 70,
    title: 'Arckezelés-kúra — 1. alkalom',
    short: 'Arckezelés',
    duration: '~ 90 perc',
    why: 'A bőr megújulási ciklusa nagyjából 28 nap, ezért a kúra havi ütemben dolgozik. Tíz héttel a nagy nap előtt van idő strukturális változásra, nem csak felszíni ragyogásra.',
    href: '/arckezeles-zuglo/',
  },
  {
    id: 'arc-2',
    group: 'arckezeles',
    daysBefore: 42,
    title: 'Arckezelés-kúra — 2. alkalom',
    short: 'Arckezelés',
    duration: '~ 90 perc',
    why: 'Egy hónappal az első után. Ez az az alkalom, ahol már látszik, mire reagál a bőröd — innentől célzottan tudunk dolgozni.',
    href: '/arckezeles-zuglo/',
  },
  {
    id: 'proba',
    group: 'smink',
    daysBefore: 35,
    title: 'Menyasszonyi próbasmink',
    short: 'Próbasmink',
    duration: '~ 90–120 perc',
    why: 'Az ideális ablak az esküvő előtti 4–8 hét. Itt kísérletezzük ki a végleges stílust, és fotó készül róla — ez lesz a nagy napi tervrajz. Marad idő finomítani, ha valamin változtatnál.',
    href: '/sminkes-zuglo/',
  },
  {
    id: 'arc-3',
    group: 'arckezeles',
    daysBefore: 10,
    title: 'Arckezelés-kúra — 3. alkalom',
    short: 'Arckezelés',
    duration: '~ 90 perc',
    why: 'Az utolsó kezelés 5–10 nappal az esemény előtt a legjobb: a bőr addigra teljesen letisztul, és a nagy napon már a nyugodt, egyenletes felszínt látod.',
    href: '/arckezeles-zuglo/',
  },
  {
    id: 'tekintet',
    group: 'tekintet',
    daysBefore: 8,
    title: 'Szemöldök laminálás + szempilla lifting',
    short: 'Laminálás + lifting',
    duration: '~ 120 perc',
    why: 'A lifting 5–10 nappal a nagy nap előtt áll be a legszebben — a kezelés utáni első 24 órában nem érheti víz, gőz vagy pára, ezért az esküvő előtti napra semmiképp ne tedd. A 6–8 hetes ciklusból bőven kitart a nászútra is.',
    href: '/szempilla-lifting-zuglo/',
  },
  {
    id: 'smink',
    group: 'smink',
    daysBefore: 0,
    title: 'Menyasszonyi smink — a nagy nap',
    short: 'Menyasszonyi smink',
    duration: '~ 90 perc',
    why: 'A próbasmink fotója alapján, tippelgetés nélkül. Bőrelőkészítés, hosszan tartó alapozás, professzionális fixálás — kibírja az ölelést, a könnyet és a délutáni táncot.',
    href: '/sminkes-zuglo/',
  },
  {
    id: 'oromanya',
    group: 'oromanya',
    daysBefore: 0,
    title: 'Örömanya smink',
    short: 'Örömanya smink',
    duration: '~ 60–75 perc',
    why: 'Ugyanazon a reggelen, előre egyeztetett sorrendben. Diszkrét, korhoz illő, fotózásra is alkalmas.',
    href: '/sminkes-zuglo/',
  },
];

/**
 * 2026-os TÉTELES árak — ennyibe kerül az adott alkalom külön foglalva.
 * Forrás: a szolgáltatás-oldalak ár-táblái (próbasmink 15 000, menyasszonyi
 * smink 30 000, örömanya 15 000, egyszeri arckezelés 18 000, szempilla lifting
 * 12 000 + szemöldök laminálás 11 000 = 23 000).
 */
const STEP_PRICE: Record<string, number> = {
  'arc-1': 18000,
  'arc-2': 18000,
  'arc-3': 18000,
  proba: 15000,
  tekintet: 23000,
  smink: 30000,
  oromanya: 15000,
};

/** Csomagárak. Csak akkor élnek, ha a csomag MINDEN alkalma még előttünk van. */
const PACKAGES = {
  menyasszonyiCsomag: 39000, // próbasmink + menyasszonyi smink (külön 45 000)
  teljesEskuvo: 51000, // + örömanya, egy reggelen (külön 60 000)
  teljesTekintet: 18000, // laminálás + lifting egy időpontban (külön 23 000)
  signatureReset: 49500, // 3 alkalmas arckezelés-kúra (külön 58 500)
};

interface GroupDef {
  id: Group;
  label: string;
  hint: string;
  /** A csomagár, ami a jelölőnégyzet mellett látszik. */
  price: number;
  defaultOn: boolean;
}

const GROUPS: GroupDef[] = [
  {
    id: 'smink',
    label: 'Próbasmink + menyasszonyi smink',
    hint: 'Menyasszonyi Csomag · két alkalom',
    price: PACKAGES.menyasszonyiCsomag,
    defaultOn: true,
  },
  {
    id: 'tekintet',
    label: 'Szemöldök laminálás + szempilla lifting',
    hint: 'Teljes Tekintet · egy időpontban',
    price: PACKAGES.teljesTekintet,
    defaultOn: true,
  },
  {
    id: 'arckezeles',
    label: 'Arckezelés-kúra, három alkalom',
    hint: 'Signature RESET · havi ütemben',
    price: PACKAGES.signatureReset,
    defaultOn: false,
  },
  {
    id: 'oromanya',
    label: 'Örömanya smink',
    hint: 'A menyasszonyi sminkkel egy reggelen',
    price: 15000,
    defaultOn: false,
  },
];

const huDate = new Intl.DateTimeFormat('hu-HU', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
const huShort = new Intl.DateTimeFormat('hu-HU', { month: 'short', day: 'numeric' });
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

function toISODate(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / 86400000);
}

function formatPrice(n: number): string {
  return `${n.toLocaleString('hu-HU')} Ft`;
}

/** „253 nap múlva” / „holnap” / „ma” — a kártya fejlécéhez. */
function relativeDay(days: number): string {
  if (days <= 0) return 'ma';
  if (days === 1) return 'holnap';
  if (days === 2) return 'holnapután';
  return `${days} nap múlva`;
}

// ── .ics (naptár-export) ────────────────────────────────────────────────────
// A menyasszony naptárába kerülő bejegyzés hónapokon át emlékezteti a
// dátumokra — és minden emlékeztető egy márka-érintés a döntés pillanatában.

function icsEscape(s: string): string {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/** RFC 5545: sor max. 75 oktett. Az ékezetek miatt bájtban kell számolni. */
function icsFold(line: string): string {
  const enc = new TextEncoder();
  if (enc.encode(line).length <= 75) return line;
  const out: string[] = [];
  let cur = '';
  let len = 0;
  for (const ch of line) {
    const b = enc.encode(ch).length;
    const limit = out.length === 0 ? 75 : 74; // a folytatósor egy szóközzel indul
    if (len + b > limit) {
      out.push(cur);
      cur = '';
      len = 0;
    }
    cur += ch;
    len += b;
  }
  if (cur) out.push(cur);
  return out.join('\r\n ');
}

function icsDate(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`;
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
  const [copyFailed, setCopyFailed] = useState(false);
  const [saved, setSaved] = useState(false);
  const [barVisible, setBarVisible] = useState(false);
  /**
   * A mobil sáv portállal kerül a <body> alá. Muszáj: a Layout
   * `main > section:not(:first-of-type) { content-visibility: auto }` szabálya
   * `contain: layout paint`-et implikál, ami TARTALMAZÓ BLOKKOT csinál a
   * szekcióból — egy azon belüli `position: fixed` elem nem a viewporthoz, hanem
   * a szekcióhoz igazodna, és sosem látszana. (Mérve, 2026-09.)
   */
  const [mounted, setMounted] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);
  const planEventSent = useRef(false);

  useEffect(() => setMounted(true), []);

  const minDate = useMemo(() => toISODate(todayStart()), []);

  const weddingDate = useMemo(() => {
    if (!dateValue) return null;
    // A date input yyyy-mm-dd-t ad; helyi idő szerinti éjfélként olvassuk,
    // hogy a UTC-eltolás ne csússzon egy napot visszafelé.
    const [y, m, d] = dateValue.split('-').map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
  }, [dateValue]);

  const daysToWedding = useMemo(
    () => (weddingDate ? daysBetween(todayStart(), weddingDate) : null),
    [weddingDate],
  );
  const weddingIsPast = daysToWedding !== null && daysToWedding < 0;

  const plan = useMemo(() => {
    if (!weddingDate) return [];
    const today = todayStart();
    return STEPS.filter((s) => active[s.group])
      .map((s) => {
        const when = addDays(weddingDate, -s.daysBefore);
        return { ...s, when, past: when < today, inDays: daysBetween(today, when) };
      })
      .sort((a, b) => a.when.getTime() - b.when.getTime());
  }, [weddingDate, active]);

  const pastCount = plan.filter((s) => s.past).length;
  const futureCount = plan.length - pastCount;
  const nextStep = plan.find((s) => !s.past) ?? null;

  /**
   * Főszezon (május–szeptember) + szombat. Mindkettő a saját, publikált
   * állításunk: ilyenkor 4–6 hónappal előre érdemes foglalni, és szombaton
   * 8–13 óra között, egyszerre egy vendéggel dolgozunk. Nem gyártunk sürgetést
   * oda, ahol nincs — más hónapban ez a blokk meg sem jelenik.
   */
  const seasonNote = useMemo(() => {
    if (!weddingDate || weddingIsPast || daysToWedding === null) return null;
    // Három hétnél közelebbi esküvőnél az „előre foglalj” üzenetnek nincs
    // értelme — ott a sürgősséget a közeli-esküvő doboz viszi.
    if (daysToWedding < 21) return null;
    const month = weddingDate.getMonth(); // 4 = május, 8 = szeptember
    if (month < 4 || month > 8) return null;
    const isSaturday = weddingDate.getDay() === 6;
    if (daysToWedding <= 120) {
      return isSaturday
        ? 'Szombat, főszezonban, és négy hónapon belül. Szombaton 8 és 13 óra között dolgozom, egyszerre egy vendéggel — egy esküvői reggel tehát egy menyasszony. Ha a dátumod fix, ezt ne halaszd tovább.'
        : 'Főszezonban vagy, négy hónapon belül. A reggeli időpontok ilyenkor fogynak el elsőként.';
    }
    return isSaturday
      ? 'Szombat, főszezonban. Szombaton 8 és 13 óra között dolgozom, egyszerre egy vendéggel — egy esküvői reggel tehát egy menyasszony. Ezekre a reggelekre 4–6 hónappal előre érkeznek a foglalások.'
      : 'Főszezonban vagy (május–szeptember). A sminkes időpontot ilyenkor 4–6 hónappal előre érdemes lefoglalni.';
  }, [weddingDate, weddingIsPast, daysToWedding]);

  /**
   * Árszámítás. A csomagkedvezmény csak akkor él, ha a csomag MINDEN alkalma
   * még előttünk van — különben az elmúlt alkalmakat is kiszámláznánk (ez volt
   * a 2026-09-i audit egyik valós hibája). Ha nincs beírt dátum, mindent
   * jövőbelinek veszünk, hogy a szolgáltatás-választáskor is látszódjon az ár.
   */
  const pricing = useMemo(() => {
    const liveIds = new Set<string>(
      weddingDate
        ? plan.filter((s) => !s.past).map((s) => s.id)
        : STEPS.filter((s) => active[s.group]).map((s) => s.id),
    );

    let list = 0;
    liveIds.forEach((id) => {
      list += STEP_PRICE[id] ?? 0;
    });

    let total = 0;
    const sminkFull = liveIds.has('proba') && liveIds.has('smink');
    const oromanya = liveIds.has('oromanya');

    if (sminkFull && oromanya) {
      total += PACKAGES.teljesEskuvo;
    } else if (sminkFull) {
      total += PACKAGES.menyasszonyiCsomag;
      if (oromanya) total += STEP_PRICE.oromanya;
    } else {
      if (liveIds.has('proba')) total += STEP_PRICE.proba;
      if (liveIds.has('smink')) total += STEP_PRICE.smink;
      if (oromanya) total += STEP_PRICE.oromanya;
    }

    if (liveIds.has('tekintet')) total += PACKAGES.teljesTekintet;

    const arcCount = ['arc-1', 'arc-2', 'arc-3'].filter((id) => liveIds.has(id)).length;
    if (arcCount === 3) total += PACKAGES.signatureReset;
    else total += arcCount * STEP_PRICE['arc-1'];

    return { total, list, saving: list - total, droppedPast: weddingDate ? pastCount : 0 };
  }, [active, plan, weddingDate, pastCount]);

  const planAsText = useMemo(() => {
    if (!weddingDate || plan.length === 0) return '';
    const lines = [
      `Esküvői szépségnaptár — ${huDate.format(weddingDate)}`,
      '',
      ...plan.map((s) => `${huDate.format(s.when)} (${huWeekday.format(s.when)}) — ${s.title}`),
      '',
      `A hátralévő alkalmak ára: ${formatPrice(pricing.total)}`,
      'FRUBEAUTY · 1143 Budapest, Egressy út 16. · frubeauty.com/eskuvoi-szepsegnaptar/',
    ];
    return lines.join('\n');
  }, [plan, weddingDate, pricing.total]);

  /**
   * Mérés: a Notino-kattintást a Layout figyelője viszi, de a tölcsér közepe
   * eddig vak volt — nem lehetett tudni, használják-e egyáltalán az eszközt.
   * Látogatásonként egyszer küldünk egy eseményt. Consent Mode kezeli.
   */
  useEffect(() => {
    if (planEventSent.current || !weddingDate || plan.length === 0) return;
    planEventSent.current = true;
    try {
      const g = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      g?.('event', 'plan_generated', {
        event_category: 'tool',
        event_label: 'eskuvoi-szepsegnaptar',
      });
    } catch {
      // A mérés hiánya soha nem törheti el az eszközt.
    }
  }, [weddingDate, plan.length]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(planAsText);
      setCopied(true);
      setCopyFailed(false);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      // Ha a clipboard API nem elérhető (régi böngésző, nem-biztonságos
      // kontextus), NEM maradunk némán: kitesszük a tervet egy kijelölhető
      // mezőbe, hogy kézzel is másolható legyen.
      setCopyFailed(true);
    }
  }

  function handleCalendar() {
    if (!weddingDate || plan.length === 0) return;
    const stamp = `${icsDate(new Date())}T000000Z`;
    const lines: string[] = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//FRUBEAUTY//Eskuvoi szepsegnaptar//HU',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
    ];
    plan
      .filter((s) => !s.past)
      .forEach((s) => {
        lines.push(
          'BEGIN:VEVENT',
          `UID:frubeauty-${s.id}-${icsDate(s.when)}@frubeauty.com`,
          `DTSTAMP:${stamp}`,
          `DTSTART;VALUE=DATE:${icsDate(s.when)}`,
          `DTEND;VALUE=DATE:${icsDate(addDays(s.when, 1))}`,
          // Középpont, nem gondolatjel: több lépés címében már van egy „—”,
          // és a naptárban a dupla gondolatjel csúnya.
          icsFold(`SUMMARY:${icsEscape(`${s.title} · FRUBEAUTY`)}`),
          icsFold(
            `DESCRIPTION:${icsEscape(`${s.why}\n\nIdőtartam: ${s.duration}\nFoglalás: ${siteConfig.booking}`)}`,
          ),
          icsFold(`LOCATION:${icsEscape(siteConfig.address)}`),
          `URL:https://frubeauty.com${s.href}`,
          'BEGIN:VALARM',
          'TRIGGER:-P7D',
          'ACTION:DISPLAY',
          icsFold(`DESCRIPTION:${icsEscape(`Egy hét múlva: ${s.title}`)}`),
          'END:VALARM',
          'END:VEVENT',
        );
      });
    lines.push('END:VCALENDAR');

    const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eskuvoi-szepsegnaptar-${toISODate(weddingDate)}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2600);
  }

  const toggle = (id: Group) => setActive((prev) => ({ ...prev, [id]: !prev[id] }));

  /**
   * A mobil alsó sáv csak akkor jelenik meg, ha van terv, ÉS a saját CTA-sor
   * már kigörgött, ÉS még nem értünk le a kapcsolat-szekcióhoz — így sosem
   * duplázza a képernyőn látható foglalás-gombot.
   */
  useEffect(() => {
    if (plan.length === 0) {
      setBarVisible(false);
      return;
    }
    const actions = actionsRef.current;
    const contact = document.getElementById('kapcsolat');
    if (!actions) return;
    const seen = { actions: true, contact: false };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === actions) seen.actions = e.isIntersecting;
          else seen.contact = e.isIntersecting;
        }
        setBarVisible(!seen.actions && !seen.contact);
      },
      { threshold: 0 },
    );
    io.observe(actions);
    if (contact) io.observe(contact);
    return () => io.disconnect();
  }, [plan.length]);

  /** Három napon belül a telefon a jobb csatorna, nem az online naptár. */
  const urgent = !!nextStep && nextStep.inDays <= 3;

  const primaryCta =
    'inline-flex items-center justify-center px-6 py-3.5 text-[12px] uppercase tracking-caps font-medium bg-gold text-ink rounded-full hover:bg-goldSoft active:scale-[0.97] active:translate-y-px transition-colors duration-150';
  const secondaryCta =
    'inline-flex items-center justify-center px-6 py-3.5 text-[12px] uppercase tracking-caps font-medium border border-whisperStrong text-cream rounded-full hover:border-gold hover:text-gold active:scale-[0.97] active:translate-y-px transition-colors duration-150';

  return (
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
      {/* ── Bal oszlop: a két döntés (mikor? mit?) + az ár + bizonyíték ───── */}
      <div className="lg:col-span-5">
        <div className="border-t border-whisper pt-6">
          <label
            htmlFor="wedding-date"
            className="block text-[11px] uppercase tracking-caps text-gold mb-3"
          >
            1. Az esküvő dátuma
          </label>
          <input
            id="wedding-date"
            type="date"
            value={dateValue}
            min={minDate}
            onChange={(e) => setDateValue(e.target.value)}
            className="w-full bg-inkRise text-cream text-lg rounded-2xl border border-whisperStrong px-5 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus:border-gold transition-colors"
          />

          {!weddingDate && (
            <p className="mt-3 text-[13px] text-creamMute leading-relaxed">
              Ha még nem végleges a dátum, írd be a legvalószínűbbet — az ütemterv attól még
              használható, és bármikor átírhatod.
            </p>
          )}

          {weddingDate && !weddingIsPast && daysToWedding !== null && (
            <p className="mt-4 text-[15px] text-creamSoft leading-[1.6]">
              <span className="text-cream">
                {huDate.format(weddingDate)}, {huWeekday.format(weddingDate)}.
              </span>{' '}
              {daysToWedding === 0 ? (
                <>Ma van a nagy nap.</>
              ) : (
                <>
                  Az esküvőig{' '}
                  <strong className="text-cream font-medium">{daysToWedding} nap</strong> van
                  hátra — nagyjából {Math.max(1, Math.round(daysToWedding / 7))} hét.
                </>
              )}
            </p>
          )}

          {weddingIsPast && (
            <p className="mt-4 text-[15px] text-creamSoft leading-[1.6]">
              Ez a dátum már elmúlt. Írd be a valódi esküvői dátumot, és megkapod a tervet.
            </p>
          )}
        </div>

        <fieldset className="border-t border-whisper pt-6 mt-8">
          <legend className="text-[11px] uppercase tracking-caps text-gold mb-2">
            2. Mit szeretnél?
          </legend>
          <p className="text-[13px] text-creamMute leading-relaxed mb-4">
            Pipáld ki, ami érdekel. Ez nem foglalás és nem kötelezettség — csak azért kérdezem,
            hogy a terved ne legyen tele olyasmivel, amit nem szeretnél.
          </p>
          <div className="space-y-1">
            {GROUPS.map((g) => (
              <label
                key={g.id}
                className="flex items-start gap-3 cursor-pointer group -mx-3 px-3 py-2.5 rounded-xl hover:bg-whisperOnDark transition-colors"
              >
                <input
                  type="checkbox"
                  checked={active[g.id]}
                  onChange={() => toggle(g.id)}
                  className="mt-1 w-4 h-4 shrink-0 accent-gold cursor-pointer"
                />
                <span className="flex-1 min-w-0">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-[15px] text-cream leading-snug group-hover:text-gold transition-colors">
                      {g.label}
                    </span>
                    <span className="shrink-0 text-[13px] text-creamSoft tabular-nums">
                      {formatPrice(g.price)}
                    </span>
                  </span>
                  <span className="block text-[13px] text-creamMute leading-snug mt-0.5">
                    {g.hint}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {pricing.total > 0 && (
          <div className="border-t border-whisper pt-6 mt-8">
            <p className="text-[11px] uppercase tracking-caps text-creamMute mb-2">
              {pricing.droppedPast > 0 ? 'A hátralévő alkalmak' : 'A kiválasztott szolgáltatások'}
            </p>
            {pricing.saving > 0 && (
              <p className="text-[13px] text-creamMute mb-1">
                Külön foglalva <span className="line-through">{formatPrice(pricing.list)}</span>
              </p>
            )}
            <p className="font-display text-4xl font-light text-cream tabular-nums">
              {formatPrice(pricing.total)}
            </p>
            {pricing.saving > 0 && (
              <p className="mt-2 text-[13px] text-gold">
                {formatPrice(pricing.saving)} marad nálad a csomagárak miatt.
              </p>
            )}
            {pricing.droppedPast > 0 && (
              <p className="mt-2 text-[13px] text-creamSoft">
                Azokat az alkalmakat, amelyeknek az ideje már elmúlt, kivettem az összegből.
              </p>
            )}
            <p className="mt-3 text-[13px] text-creamMute leading-relaxed">
              2026-os árak, végösszeg. A helyszíni kiszállás díja nincs benne: írd meg a
              helyszínt és a reggeli időzítést, és 24 órán belül megírom a pontos összeget.
            </p>
            <p className="mt-3 text-[13px] text-creamMute leading-relaxed">
              A foglalás legkésőbb 24 órával az időpont előtt díjmentesen lemondható vagy
              áttehető — az esküvői dátumod nem ragad be.
            </p>
          </div>
        )}

        {/* Bizonyíték pontosan ott, ahol az ár van — a kifogás helyén.
            A vélemény VALÓS és a Google-on visszakereshető (lásd sminkes-zuglo). */}
        <figure className="border-t border-whisper pt-6 mt-8">
          <blockquote className="font-display text-lg font-light leading-snug text-cream">
            „Fruzsi a menyasszonyi sminkemet készítette el, maximálisan figyelembe vette amit
            szerettem volna és pontosan olyan lett a végeredmény, amit elképzeltem.”
          </blockquote>
          <figcaption className="mt-4 flex items-center justify-between gap-4">
            <span className="text-[13px] text-creamMute">Gréti Sápi · Menyasszonyi smink</span>
            <a
              href={siteConfig.googleReviewsUrl}
              target="_blank"
              rel="noopener nofollow"
              className="text-[12px] uppercase tracking-caps text-creamMute hover:text-gold transition-colors shrink-0"
            >
              Google →
            </a>
          </figcaption>
        </figure>
      </div>

      {/* ── Jobb oszlop: a következő lépés + az ütemterv + a folyamat ─────── */}
      <div className="lg:col-span-7">
        <div aria-live="polite">
          {!weddingDate && (
            <div className="border border-dashed border-whisperStrong rounded-3xl px-7 py-12 text-center">
              <p className="text-creamSoft leading-[1.7] max-w-[44ch] mx-auto">
                Írd be az esküvőd dátumát. Innentől minden dátumot kiszámolok — és azt is
                megírom, melyik kezelés miért pont akkor a legjobb.
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
              {/* A LEGFONTOSABB BLOKK: egyetlen következő lépés, egyetlen döntés. */}
              {nextStep && (
                <div className="rounded-3xl border border-gold/45 bg-gold/[0.06] p-6 sm:p-8 mb-10">
                  <p className="text-[11px] uppercase tracking-caps text-gold mb-3">
                    Ezzel kezdd
                  </p>
                  <p className="text-[13px] text-creamSoft mb-1.5 tabular-nums">
                    {huDate.format(nextStep.when)} · {huWeekday.format(nextStep.when)} ·{' '}
                    {relativeDay(nextStep.inDays)}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl font-light text-cream leading-tight">
                    {nextStep.title}
                  </h3>
                  <p className="mt-4 text-creamSoft leading-[1.7] text-[15px] max-w-[52ch]">
                    {futureCount > 1
                      ? 'Ez az egyetlen dátum, amivel most dolgod van. A többi ehhez képest áll a helyére — és egy kattintással beteheted mindet a naptáradba.'
                      : 'Ez az egyetlen dátum, ami még előtted van a tervből. Ha ezt lefixáljuk, a nagy nap reggele a helyén van.'}
                  </p>
                  {/* Három napon belül az online foglalás rossz csatorna: ott a
                      telefon lesz az elsődleges gomb. */}
                  {nextStep.inDays <= 3 ? (
                    <>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <a href={`tel:${siteConfig.phone}`} className={primaryCta}>
                          Hívom Fruzsit · {siteConfig.phoneDisplay}
                        </a>
                        <a
                          href={siteConfig.booking}
                          target="_blank"
                          rel={relFor(siteConfig.booking)}
                          className={secondaryCta}
                        >
                          Megnézem online
                        </a>
                      </div>
                      <p className="mt-4 text-[13px] text-creamMute leading-relaxed max-w-[52ch]">
                        Ilyen közel a dátumhoz a telefon a gyorsabb: az online naptárban lehet,
                        hogy már nem látszik szabad hely, miközben élőben még van mozgásterem.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <a
                          href={siteConfig.booking}
                          target="_blank"
                          rel={relFor(siteConfig.booking)}
                          className={primaryCta}
                        >
                          Lefoglalom — {nextStep.short}
                        </a>
                        <a href={`tel:${siteConfig.phone}`} className={secondaryCta}>
                          Inkább felhívlak
                        </a>
                      </div>
                      <p className="mt-4 text-[13px] text-creamMute leading-relaxed max-w-[52ch]">
                        A foglalóoldalon ezt keresd:{' '}
                        <span className="text-creamSoft">{nextStep.short}</span>. Ha nem találsz
                        szabad reggelt, hívj vagy írj — megnézem, mit tudok tenni.
                      </p>
                    </>
                  )}
                </div>
              )}

              {seasonNote && (
                <p className="mb-8 text-[15px] text-creamSoft leading-[1.7] border-l-2 border-gold/50 pl-5">
                  {seasonNote}
                </p>
              )}

              {/* A legmagasabb szándékú szegmens: közeli esküvő. Itt korábban
                  csak szöveg állt, kattintható elem nélkül — pont a leggyorsabban
                  fizető látogatónál volt zsákutca. */}
              {pastCount > 0 && (
                <div className="mb-10 rounded-2xl border border-whisperStrong bg-inkRise px-5 py-5 sm:px-6 sm:py-6">
                  <h3 className="font-medium text-lg text-cream mb-2 leading-snug">
                    {pastCount === plan.length
                      ? 'Ez a dátum már nagyon közel van — a nagy nap viszont megvan.'
                      : `${pastCount} lépés ideje elmúlt — a nagy nap viszont nem.`}
                  </h3>
                  <p className="text-[15px] text-creamSoft leading-[1.7] max-w-[52ch]">
                    {daysToWedding !== null && daysToWedding >= 0 && (
                      <>
                        {daysToWedding === 0
                          ? 'Ma van a nagy nap. '
                          : `Az esküvődig ${daysToWedding} nap van. `}
                      </>
                    )}
                    {daysToWedding !== null && daysToWedding >= 10
                      ? 'Ennyi idő alatt a tekintet még beáll — nyolc nap kell hozzá —, és egy próbasmink is befér. Hívj fel, és a maradék napokból összerakom a legjobb sorrendet.'
                      : daysToWedding !== null && daysToWedding >= 2
                        ? 'A smink ilyenkor is megoldható, és van, amit a tekintetből még be lehet csúsztatni. Hívj fel, és két perc alatt megmondom, mi fér bele.'
                        : 'Ez már nagyon szoros, de a smink még megoldható lehet. Hívj fel — megnézem, mit tudok kinyitni.'}
                  </p>
                  {/* Ha a hívás-gomb közvetlenül fentebb, az „Ezzel kezdd”
                      kártyán már arany, itt nem duplázzuk aranyban. */}
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className={urgent ? secondaryCta : primaryCta}
                    >
                      Hívom Fruzsit · {siteConfig.phoneDisplay}
                    </a>
                    <a
                      href={`mailto:${siteConfig.email}?subject=${encodeURIComponent('Közeli esküvő — segítség a sorrendben')}`}
                      className={secondaryCta}
                    >
                      Inkább írok
                    </a>
                  </div>
                </div>
              )}

              <p className="text-[11px] uppercase tracking-caps text-creamMute mb-6">
                A teljes ütemterved
              </p>

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
                      className={`text-[11px] uppercase tracking-caps mb-1.5 tabular-nums ${
                        s.past ? 'text-creamMute' : 'text-gold'
                      }`}
                    >
                      {huDate.format(s.when)} · {huWeekday.format(s.when)}
                      {s.daysBefore === 0 && ' · a nagy nap'}
                      {s.past && ' · elmúlt'}
                    </p>
                    <h3
                      className={`font-medium text-lg leading-snug mb-1 ${
                        s.past ? 'text-creamMute' : 'text-cream'
                      }`}
                    >
                      {s.title}
                    </h3>
                    <p className="text-[13px] text-creamMute mb-2">{s.duration}</p>
                    <p className="text-creamSoft leading-[1.7] text-[15px] max-w-[52ch]">{s.why}</p>
                    {/* Másodlagos súly: a konverziós pillanatban a foglalás-gomb
                        legyen az egyetlen hangsúlyos elem, ne ez a 3–7 kifelé
                        mutató link. */}
                    <a
                      href={s.href}
                      className="mt-3 inline-flex items-center text-[11px] uppercase tracking-caps text-creamMute hover:text-gold transition-colors"
                    >
                      Részletek és árak
                      <span aria-hidden className="ml-2">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ol>

              {/* A HÍD: a terv és a foglalás közötti szakadék. Erre a kérdésre
                  („jó, és most pontosan mi történik?”) eddig nem volt válasz. */}
              <div className="mt-12 border-t border-whisper pt-8">
                <h3 className="font-display text-2xl font-light text-cream leading-tight">
                  Jó. És most pontosan <em className="display">mi történik</em>?
                </h3>
                <ol className="mt-6 space-y-6">
                  <li>
                    <p className="text-[11px] uppercase tracking-caps text-gold mb-1.5">
                      1 · Foglalás
                    </p>
                    <p className="text-creamSoft leading-[1.7] text-[15px] max-w-[54ch]">
                      Most csak a tervedben szereplő legkorábbi időpontot kell lefoglalnod. A
                      többi ráér — a nagy napi reggelt a próbasminken együtt tesszük a naptárba.
                    </p>
                  </li>
                  <li>
                    <p className="text-[11px] uppercase tracking-caps text-gold mb-1.5">
                      2 · Egyeztetés
                    </p>
                    <p className="text-creamSoft leading-[1.7] text-[15px] max-w-[54ch]">
                      A visszaigazolás után küldj át egy-két referenciaképet Instagramon vagy
                      e-mailben: a ruhát, a frizurát vagy egy sminket, ami tetszik. Ennyiből
                      tudom, milyen hatást szeretnél, és felkészülten várlak.
                    </p>
                  </li>
                  <li>
                    <p className="text-[11px] uppercase tracking-caps text-gold mb-1.5">
                      3 · Ha közben változik valami
                    </p>
                    <p className="text-creamSoft leading-[1.7] text-[15px] max-w-[54ch]">
                      Csúszik az esküvő, más lesz a ruha, kicsúszol az időből — szólj, és
                      átrakjuk. A foglalás legkésőbb 24 órával az időpont előtt díjmentesen módosítható.
                    </p>
                  </li>
                </ol>
              </div>

              <div ref={actionsRef} className="mt-10 flex flex-wrap gap-3">
                {urgent ? (
                  <a href={`tel:${siteConfig.phone}`} className={primaryCta}>
                    Hívom Fruzsit · {siteConfig.phoneDisplay}
                  </a>
                ) : (
                  <a
                    href={siteConfig.booking}
                    target="_blank"
                    rel={relFor(siteConfig.booking)}
                    className={primaryCta}
                  >
                    {nextStep ? `Lefoglalom — ${nextStep.short}` : 'Időpontot foglalok'}
                  </a>
                )}
                <button type="button" onClick={handleCalendar} className={secondaryCta}>
                  {saved ? 'Naptárba téve ✓' : 'Naptárba teszem'}
                </button>
                <button type="button" onClick={handleCopy} className={secondaryCta}>
                  {copied ? 'Kimásolva ✓' : 'Kimásolom a tervet'}
                </button>
              </div>

              {copyFailed && (
                <div className="mt-5">
                  <label
                    htmlFor="plan-fallback"
                    className="block text-[13px] text-creamSoft mb-2 leading-relaxed"
                  >
                    A böngésződ nem engedte a másolást. Jelöld ki az alábbi szöveget, és másold
                    ki kézzel:
                  </label>
                  <textarea
                    id="plan-fallback"
                    readOnly
                    rows={Math.min(12, plan.length + 5)}
                    value={planAsText}
                    onFocus={(e) => e.currentTarget.select()}
                    className="w-full bg-inkRise text-creamSoft text-[13px] leading-relaxed rounded-2xl border border-whisperStrong px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  />
                </div>
              )}

              <p className="mt-5 text-[13px] text-creamMute leading-relaxed max-w-[54ch]">
                Az ütemterv javaslat, nem szabály. Ha csúszik valami, szólj — átrendezzük. A
                naptár-mentés minden hátralévő lépéshez egy hetes emlékeztetőt is beállít.
              </p>
            </>
          )}
        </div>
      </div>

      {/* ── Mobil: alsó akciósáv, amíg a terv nincs szem előtt ────────────── */}
      {mounted &&
        plan.length > 0 &&
        nextStep &&
        createPortal(
        <div
          data-planner-bar
          className={`lg:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ease-strong-out motion-reduce:transition-none ${
            barVisible ? 'translate-y-0' : 'translate-y-[130%]'
          }`}
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          aria-hidden={!barVisible}
        >
          <div className="mx-3 mb-3 rounded-2xl border border-whisperStrong bg-inkRise/95 backdrop-blur-sm px-4 py-3 flex items-center gap-4 shadow-[0_-10px_36px_-14px_rgba(0,0,0,0.7)]">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-caps text-creamMute">Ezzel kezdd</p>
              <p className="text-[13px] text-cream truncate">
                {huShort.format(nextStep.when)} · {nextStep.short}
              </p>
            </div>
            <a
              href={urgent ? `tel:${siteConfig.phone}` : siteConfig.booking}
              target={urgent ? undefined : '_blank'}
              rel={urgent ? undefined : relFor(siteConfig.booking)}
              tabIndex={barVisible ? undefined : -1}
              className="ml-auto shrink-0 inline-flex items-center justify-center px-5 py-3 text-[11px] uppercase tracking-caps font-medium bg-gold text-ink rounded-full active:scale-[0.97] transition-transform duration-150"
            >
              {urgent ? 'Hívás' : 'Foglalás'}
            </a>
          </div>
        </div>,
          document.body,
        )}
    </div>
  );
}
