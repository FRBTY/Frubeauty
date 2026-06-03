import { useEffect, useState } from 'react';

const DISMISS_KEY = 'frubeauty_promo_dismissed_v5';

interface AnnouncementBarProps {
  /** Legacy prop — backward compat; nem használjuk. */
  bookingsToday?: number;
  /** Legacy prop. */
  updatedAt?: string;
  /** Master toggle. */
  enabled?: boolean;
  /** Legacy prop. */
  dailyRandomRange?: [number, number];
}

function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `frubeauty_booking_clicks_${y}-${m}-${day}`;
}

function readTodayCount(): number {
  try {
    const raw = window.localStorage.getItem(todayKey());
    const n = raw ? parseInt(raw, 10) : 0;
    return Number.isFinite(n) && n > 0 ? n : 0;
  } catch {
    return 0;
  }
}

function incrementTodayCount(): number {
  try {
    const k = todayKey();
    const cur = readTodayCount();
    const next = cur + 1;
    window.localStorage.setItem(k, String(next));
    // Régi napi kulcsok takarítása.
    for (let i = window.localStorage.length - 1; i >= 0; i--) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith('frubeauty_booking_clicks_') && key !== k) {
        window.localStorage.removeItem(key);
      }
    }
    return next;
  } catch {
    return 0;
  }
}

/**
 * Top recency social proof bar — VALÓDI klikk-alapú counter.
 *
 * Mechanizmus:
 *  - localStorage napi kulcs számolja, hányszor kattintott a user
 *    bármely Notino foglalás CTA-ra ezen a böngészőn ma.
 *  - Globális delegált click-listener fogja minden `<a href*="notino">` klikket.
 *  - Ha még nincs klikk aznap → a bar NEM jelenik meg (zero-noise).
 *  - Klikk után a számláló frissül, a bar megjelenik (vagy a szám nő).
 *
 * Animáció: tiszta CSS grid-rows 0fr→1fr (height-auto trükk) + opacity —
 * NINCS framer-motion, így a 32 KiB motion chunk nem kerül a kritikus útba.
 */
export function AnnouncementBar({ enabled = true }: AnnouncementBarProps) {
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    setCount(readTodayCount());

    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      if (href.includes('notino.hu')) {
        const next = incrementTodayCount();
        setCount(next);
      }
    };
    document.addEventListener('click', onDocClick, true);

    const onStorage = (e: StorageEvent) => {
      if (e.key && e.key === todayKey()) setCount(readTodayCount());
    };
    window.addEventListener('storage', onStorage);

    return () => {
      document.removeEventListener('click', onDocClick, true);
      window.removeEventListener('storage', onStorage);
    };
  }, [enabled]);

  const shouldShow = enabled && count >= 1;

  useEffect(() => {
    if (!shouldShow) { setVisible(false); return; }
    try {
      const dismissed = window.localStorage.getItem(DISMISS_KEY);
      if (!dismissed) setVisible(true);
    } catch { setVisible(true); }
  }, [shouldShow]);

  function dismiss() {
    setVisible(false);
    try { window.localStorage.setItem(DISMISS_KEY, '1'); } catch {}
  }

  if (!shouldShow) return null;

  return (
    <div
      className="relative z-[60] grid transition-[grid-template-rows,opacity] duration-[400ms] ease-strong-out motion-reduce:transition-opacity"
      style={{ gridTemplateRows: visible ? '1fr' : '0fr', opacity: visible ? 1 : 0 }}
      role="region"
      aria-label="Friss foglalások"
    >
      <div className="overflow-hidden bg-gold text-ink">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-2.5 flex items-center justify-center gap-3 sm:gap-4 text-[12px] sm:text-[13px]">
          <span className="inline-flex w-1.5 h-1.5 rounded-full bg-ink flex-shrink-0 animate-pulse" aria-hidden />
          <p className="text-center leading-snug">
            {/* Igazmondó felirat: a bar a SAJÁT, mai Notino-CTA kattintásod után jelenik
                meg, ezért nem állítunk idegenek foglalásairól semmit — befejezésre
                ösztönző (cart-reminder) üzenet, nem hamis social proof. */}
            <span className="font-medium">Elkezdted az online foglalást.</span>
            <span className="hidden sm:inline mx-2 opacity-60">·</span>
            <span className="block sm:inline font-semibold mt-0.5 sm:mt-0">Fejezd be a Notino felületén →</span>
          </p>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Bezárás"
            className="ml-2 flex-shrink-0 w-7 h-7 inline-flex items-center justify-center rounded-full text-ink hover:bg-ink/15 transition-colors duration-200"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
