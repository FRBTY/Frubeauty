import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { screenGroups, type ScreenItem } from '../../data/lezer-szures';
import { siteConfig } from '../../config/site';

/**
 * FOGLALÁS ELŐTTI ELŐSZŰRÉS — a lézer oldal kapuja.
 *
 * MIT CSINÁL: elkapja a Notino-foglalás linkekre leadott kattintást, és előbb
 * megmutatja az ellenjavallati listát. Ha a vendégre semmi nem igaz, egyetlen
 * koppintás, és megy tovább a naptárba — a kattintás EREDETI linkje indul el,
 * tehát az UTM és a konverziómérés érintetlen marad.
 *
 * MIÉRT `window` ÉS MIÉRT CAPTURE FÁZIS: a Layout.astro egy `document`-szintű
 * capture-listenerben tüzeli a Google Ads konverziót minden Notino-kattintásra.
 * Az esemény útja window → document → …, ezért egy WINDOW-szintű capture
 * listener ELŐBB fut. Így meg tudjuk állítani (`stopPropagation`) a konverziót
 * annál, akit épp elutasítunk vagy visszatartunk — különben minden megnyitott
 * kérdőív hamis foglalás-konverziót jelentene a Google Ads felé.
 *
 * ÁTENGEDÉSKOR a panel gombja MAGA IS egy valódi `<a>` a Notino-linkre, az
 * elkapott kattintás href-jével (tehát a Layout által ráírt UTM-mel együtt).
 * Szándékosan nem programozott `link.click()`-kel navigálunk: azt a böngésző
 * felugróablak-blokkolója megfoghatja, egy valódi linkkattintást viszont soha.
 * Így a Layout konverzió-listenere is pontosan egyszer fut le, a valódi
 * szándéknál — a saját listenerünk pedig félreáll, ha a kattintás a panelen
 * belülről jön.
 *
 * ADATVÉDELEM: a válaszokat nem küldjük sehová és nem mentjük el. A
 * sessionStorage-ba egyetlen dolog kerül: hogy a szűrésen már átment, hogy ne
 * kérdezzünk rá minden gombnál újra.
 *
 * HIBATŰRÉS: minden beavatkozás try/catch mögött van, és a komponens
 * FAIL-OPEN — ha bármi elromlik vagy nincs JS, a linkek a régi módon működnek.
 */

const PASS_KEY = 'fb-lezer-szures';
const BOOKING_HOST = 'notino.hu';

const dateFmt = new Intl.DateTimeFormat('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' });

export function BookingScreening() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  /**
   * Külön kapcsoló az AnimatePresence köré. Átengedéskor a naptár ÚJ LAPON
   * nyílik meg, az eredeti lap pedig háttérbe kerül — ott a böngésző lefojtja a
   * requestAnimationFrame-et, és a kilépő animáció megáll félúton. A látogató
   * visszatérve egy félig nyitott panelt találna. Ezért átengedéskor nem
   * animálunk kifelé, hanem az egész AnimatePresence-t leszereljük.
   */
  const [mounted, setMounted] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const cleared = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  /** Az elkapott link címe — UTM-mel együtt, ahogy a Layout ráírta. */
  const [href, setHref] = useState<string>(siteConfig.booking);

  /* A korábbi átengedés a munkamenet végéig érvényes. */
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(PASS_KEY) === 'ok') cleared.current = true;
    } catch {
      /* privát ablak, letiltott tárhely — ilyenkor minden kattintásnál kérdezünk */
    }
  }, []);

  /* A kapu. */
  useEffect(() => {
    const onClick = (ev: MouseEvent) => {
      try {
        if (cleared.current || ev.defaultPrevented || ev.button !== 0) return;
        // Módosítós kattintás (új lap/ablak) — nem vesszük el a látogatótól.
        if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
        const target = ev.target;
        if (!(target instanceof Element)) return;
        const link = target.closest<HTMLAnchorElement>(`a[href*="${BOOKING_HOST}"]`);
        if (!link) return;
        // A panel SAJÁT foglalás-linkje nem eshet a saját kapunkba.
        if (link.closest('[data-fb-screening]')) return;

        ev.preventDefault();
        ev.stopPropagation();
        setHref(link.href || siteConfig.booking);
        setPicked([]);
        setShowResult(false);
        setMounted(true);
        setOpen(true);
      } catch {
        /* soha ne akadályozzuk meg a foglalást egy szűrő-hiba miatt */
      }
    };
    window.addEventListener('click', onClick, true);
    return () => window.removeEventListener('click', onClick, true);
  }, []);

  /**
   * Átengedés. NEM navigál — azt a link maga teszi. Csak megjegyzi, hogy ez a
   * látogató a munkamenet hátralévő részében már ne fusson bele a kapuba.
   */
  const pass = useCallback(() => {
    cleared.current = true;
    try {
      window.sessionStorage.setItem(PASS_KEY, 'ok');
    } catch {
      /* privát ablak — legfeljebb újra kérdezünk */
    }
    setOpen(false);
    setMounted(false);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  /* Escape, görgetés-zár, fókusz. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  const toggle = (id: string) =>
    setPicked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const result = useMemo(() => {
    const all: ScreenItem[] = screenGroups.flatMap((g) => g.items);
    const sel = all.filter((i) => picked.includes(i.id));
    const stops = sel.filter((i) => i.verdict === 'stop');
    const waits = sel.filter((i) => i.verdict === 'wait');
    const cares = sel.filter((i) => i.verdict === 'care');
    const days = Math.max(0, ...waits.map((w) => w.waitDays ?? 0));
    const date = days > 0 ? dateFmt.format(new Date(Date.now() + days * 86400000)) : null;
    return { stops, waits, cares, date };
  }, [picked]);

  /** A foglalás-link közös burka — a href az elkapott kattintásé. */
  const BookLink = ({ children }: { children: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      onClick={pass}
      className="fb-book inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[12px] uppercase tracking-caps font-medium bg-gold text-ink hover:bg-goldSoft active:scale-[0.97] transition-colors duration-200"
    >
      {children}
    </a>
  );

  const fade = reduced ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
  const rise = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 16, scale: 0.985 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 8, scale: 0.99 },
        transition: { duration: 0.26, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
      };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          {...fade}
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
          aria-hidden={false}
        >
          <div className="absolute inset-0 bg-ink/85 backdrop-blur-[3px]" onClick={close} aria-hidden="true" />

          <motion.div
            {...rise}
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="fb-szures-cim"
            /* Stabil fogódzó: a fejléc mobil menüje is `role="dialog"`, ezért a
               szűrő panelt nem szabad szerep szerint keresni (teszt, analitika). */
            data-fb-screening=""
            className="relative w-full sm:max-w-[880px] max-h-[92dvh] flex flex-col overflow-hidden rounded-t-[28px] sm:rounded-[28px] border border-whisperStrong bg-inkDeep outline-none"
          >
            {/* ── Fejléc ──────────────────────────────────────────────── */}
            <div className="flex-shrink-0 px-6 sm:px-9 pt-6 sm:pt-8 pb-5 border-b border-whisper">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[11px] uppercase tracking-caps text-gold mb-3">
                    {showResult ? 'A válasz' : 'Mielőtt időpontot foglalsz'}
                  </p>
                  <h2
                    id="fb-szures-cim"
                    className="font-display font-light text-cream leading-[1.15]"
                    style={{ fontSize: 'clamp(1.3rem, 3vw, 1.9rem)' }}
                  >
                    {showResult ? (
                      result.stops.length > 0 ? (
                        <>
                          Ezt a kezelést <em className="display">nem tudom elvégezni</em>.
                        </>
                      ) : result.waits.length > 0 ? (
                        <>
                          Elvégezhető — csak <em className="display">még nem most</em>.
                        </>
                      ) : (
                        <>
                          Mehet a foglalás — <em className="display">ezt tudni fogom rólad</em>.
                        </>
                      )
                    ) : (
                      <>
                        Van bármi ezek közül, ami <em className="display">igaz rád</em>?
                      </>
                    )}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Bezárom"
                  className="flex-shrink-0 -mr-1 -mt-1 w-9 h-9 rounded-full inline-flex items-center justify-center text-creamMute hover:text-cream hover:bg-white/5 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </svg>
                </button>
              </div>

              {!showResult && (
                <p className="mt-4 text-[14px] sm:text-[15px] text-creamSoft leading-[1.7] max-w-[62ch]">
                  A lézeres szőrtelenítésnek van néhány ellenjavallata, és jobb, ha ezek most derülnek ki, mint
                  az időpontodon. A legtöbb vendégnek egyik sem igaz rá — ilyenkor egyetlen koppintás, és
                  mehetsz is a naptárba.{' '}
                  <span className="text-creamMute">
                    A válaszaidat nem mentem el és nem küldöm sehová. Ez nem orvosi vizsgálat.
                  </span>
                </p>
              )}
            </div>

            {/* ── Törzs ───────────────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-9 py-6">
              {showResult ? (
                <div className="space-y-7">
                  {result.stops.length > 0 && (
                    <Block tone="stop" title="Ezért nem" items={result.stops} />
                  )}

                  {result.stops.length === 0 && result.waits.length > 0 && (
                    <>
                      <Block tone="wait" title="Ezt kell kivárni" items={result.waits} />
                      {result.date && (
                        <div className="rounded-2xl border border-gold/35 bg-gold/[0.07] px-5 py-5">
                          <p className="text-[11px] uppercase tracking-caps text-gold">A legkorábbi nap, amire foglalj</p>
                          <p className="mt-2 font-display text-2xl sm:text-3xl text-cream">{result.date}</p>
                          <p className="mt-2 text-[13px] text-creamSoft leading-relaxed">
                            Foglalhatsz most is, csak ennél a napnál korábbi időpontot ne válassz — azt át kellene
                            tennünk.
                          </p>
                        </div>
                      )}
                      {result.cares.length > 0 && <Block tone="care" title="És amit tudni fogok rólad" items={result.cares} />}
                    </>
                  )}

                  {result.stops.length === 0 && result.waits.length === 0 && result.cares.length > 0 && (
                    <Block
                      tone="care"
                      title="Egyik sem zárja ki a kezelést"
                      items={result.cares}
                      note="Az első alkalom elején kitöltünk egy rövid adatlapot — ott ezeket úgyis átbeszéljük."
                    />
                  )}
                </div>
              ) : (
                <div className="space-y-8">
                  {screenGroups.map((g) => (
                    <div key={g.title}>
                      <p className="text-[11px] uppercase tracking-caps text-creamMute mb-3">{g.title}</p>
                      <ul className="space-y-1.5">
                        {g.items.map((it) => {
                          const on = picked.includes(it.id);
                          return (
                            <li key={it.id}>
                              <button
                                type="button"
                                onClick={() => toggle(it.id)}
                                aria-pressed={on}
                                className={`w-full text-left flex items-start gap-3 rounded-xl border px-4 py-3 transition-colors duration-200 ${
                                  on
                                    ? 'border-gold/60 bg-gold/10'
                                    : 'border-whisper hover:border-whisperStrong hover:bg-white/[0.03]'
                                }`}
                              >
                                <span
                                  className={`flex-shrink-0 mt-0.5 w-[18px] h-[18px] rounded-[6px] border inline-flex items-center justify-center ${
                                    on ? 'border-gold bg-gold text-ink' : 'border-whisperStrong text-transparent'
                                  }`}
                                  aria-hidden
                                >
                                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                </span>
                                <span className={`text-[14px] leading-snug ${on ? 'text-cream' : 'text-creamSoft'}`}>
                                  {it.label}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Lábléc ──────────────────────────────────────────────── */}
            <div className="flex-shrink-0 px-6 sm:px-9 py-5 border-t border-whisper bg-inkDeep">
              {showResult ? (
                <div className="flex flex-wrap items-center gap-3">
                  {result.stops.length === 0 ? (
                    <BookLink>{result.waits.length > 0 ? 'Akkor foglalok' : 'Irány a foglalás'}</BookLink>
                  ) : (
                    <a
                      href="/arckezeles-zuglo/"
                      className="inline-flex items-center justify-center rounded-full px-6 py-3 text-[12px] uppercase tracking-caps font-medium border border-whisperStrong text-cream hover:bg-white/5 transition-colors"
                    >
                      Amit helyette ajánlok →
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowResult(false)}
                    className="text-[12px] uppercase tracking-caps text-creamMute hover:text-cream transition-colors px-3 py-2"
                  >
                    ← Módosítom
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
                  {picked.length === 0 ? (
                    <BookLink>Egyik sem igaz rám · Foglalok</BookLink>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setShowResult(true);
                        panelRef.current?.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
                      }}
                      className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[12px] uppercase tracking-caps font-medium bg-gold text-ink hover:bg-goldSoft active:scale-[0.97] transition-colors duration-200"
                    >
                      Megnézem, mit jelent ({picked.length})
                    </button>
                  )}
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener"
                    onClick={pass}
                    className="text-[12px] text-creamMute hover:text-cream transition-colors underline underline-offset-4 decoration-whisperStrong"
                  >
                    Nem lézerre foglalok
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Egy eredmény-blokk: cím + a bejelölt tételek és a hozzájuk tartozó válasz. */
function Block({
  tone,
  title,
  items,
  note,
}: {
  tone: 'stop' | 'wait' | 'care';
  title: string;
  items: ScreenItem[];
  note?: string;
}) {
  const accent =
    tone === 'stop' ? 'border-creamMute/40' : tone === 'wait' ? 'border-gold/45' : 'border-whisperStrong';
  return (
    <div>
      <p className="text-[11px] uppercase tracking-caps text-gold mb-4">{title}</p>
      <ul className="space-y-5">
        {items.map((i) => (
          <li key={i.id} className={`border-l-2 ${accent} pl-4`}>
            <p className="text-[14px] text-cream leading-snug">{i.label}</p>
            <p className="mt-1.5 text-[14px] text-creamSoft leading-[1.7]">{i.answer}</p>
            {i.waitDays ? (
              <p className="mt-1.5 text-[12px] uppercase tracking-caps text-creamMute">
                {i.waitDays >= 30 ? `${Math.round(i.waitDays / 30)} hónap` : `${i.waitDays / 7} hét`}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
      {note && <p className="mt-5 text-[13px] text-creamMute leading-relaxed max-w-[62ch]">{note}</p>}
    </div>
  );
}

export default BookingScreening;
