import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { easeOutStrong } from './motion-presets';

const CONSENT_KEY = 'frubeauty_cookie_consent_v1';

/**
 * GDPR-compliant cookie consent banner.
 *
 * Behavior:
 *  - Strictly opt-in (no auto-accept, no pre-checked boxes — illegal under EDPB guidance).
 *  - Three actions: accept all / essential only / settings link to /adatvedelem.
 *  - Decision persisted in localStorage so we don't show again.
 *
 * Positioning:
 *  - Mobile: full-width bar anchored to the very bottom edge (bottom-0, rounded-t-2xl)
 *    so it sits below viewport content and cannot overlap hero CTA buttons.
 *  - Desktop (sm+): compact card, bottom-right corner.
 *
 * NOTE: This component only displays the banner and records the choice.
 * If you add analytics (GA4, Hotjar, etc.) later, gate them behind:
 *   window.localStorage.getItem('frubeauty_cookie_consent_v1') === 'all'
 */
type Consent = 'all' | 'essential' | null;

export function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    try {
      const stored = window.localStorage.getItem(CONSENT_KEY) as Consent;
      if (stored === 'all' || stored === 'essential') {
        setConsent(stored);
      }
    } catch {}
  }, []);

  function decide(choice: 'all' | 'essential') {
    try { window.localStorage.setItem(CONSENT_KEY, choice); } catch {}
    setConsent(choice);
    // Dispatch a custom event so analytics code can hook in later.
    window.dispatchEvent(new CustomEvent('cookie-consent', { detail: choice }));
  }

  const show = mounted && consent === null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: easeOutStrong }}
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-body"
          /* Mobile: full-width bottom bar, flush to screen edge — cannot overlap content above.
             Desktop (sm+): compact card anchored bottom-right, away from page CTAs. */
          className="fixed bottom-0 inset-x-0 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md sm:rounded-2xl z-[60] bg-inkRise text-creamSoft border border-whisperStrong rounded-t-2xl shadow-[0_-8px_40px_-10px_rgba(0,0,0,0.5)] sm:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] px-5 py-5 sm:p-6"
        >
          <p id="cookie-banner-body" className="text-sm leading-relaxed text-creamSoft/90">
            Weboldalunk működéséhez elengedhetetlen, valamint a látogatottság elemzéséhez és a hirdetéseink optimalizálásához statisztikai és marketing sütiket használunk. Az „Összes elfogadása" gombbal hozzájárulsz az adatok feldolgozásához. A beállításaidat bármikor módosíthatod.{' '}
            <a href="/adatvedelem" className="underline underline-offset-2 hover:text-gold transition-colors">
              Részletek
            </a>
          </p>
          <div className="mt-4 flex flex-row gap-2">
            <button
              type="button"
              onClick={() => decide('all')}
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium bg-gold text-ink rounded-full hover:bg-goldSoft active:scale-[0.97] active:translate-y-px transition-colors duration-150"
            >
              Összes elfogadása
            </button>
            <button
              type="button"
              onClick={() => decide('essential')}
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium border border-whisperStrong text-creamSoft rounded-full hover:bg-whisperOnDark active:scale-[0.97] transition-colors duration-150"
            >
              Csak szükséges
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
