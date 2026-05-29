import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { easeOutStrong } from './motion-presets';

interface NavBarProps {
  bookingUrl: string;
  instagram: string;
  facebook: string;
}

const navLinks = [
  { href: '/',                        label: 'Főoldal' },
  { href: '/arckezeles-zuglo',        label: 'Arckezelés' },
  { href: '/sminkes-zuglo',           label: 'Smink' },
  { href: '/szempilla-lifting-zuglo', label: 'Szempilla/Szemöldök' },
  { href: '/blog',                    label: 'Blog' },
  { href: '/#velemenyek',             label: 'Vélemények' },
];

export function NavBar({ bookingUrl, instagram, facebook }: NavBarProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 80);
    if (menuOpen || reduced) { setHidden(false); return; }
    if (y > 240 && y > prev) setHidden(true);
    else if (y < prev) setHidden(false);
  });

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setMenuOpen(false); }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ transform: 'translate3d(0,0,0)' }}
        animate={{ transform: hidden ? 'translate3d(0,-100px,0)' : 'translate3d(0,0,0)' }}
        transition={{ duration: 0.4, ease: easeOutStrong }}
        className={`relative transition-[background-color,backdrop-filter,border-color] duration-300 ease-out ${
          solid || menuOpen
            ? 'bg-ink/92 backdrop-blur-md border-b border-whisper'
            : 'bg-ink/70 backdrop-blur-sm border-b border-whisper'
        }`}
      >
        <nav className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-3">
          <a
            href="/"
            className="font-display text-xl tracking-tight font-medium text-cream"
            aria-label="FRUBEAUTY főoldal"
            onClick={() => setMenuOpen(false)}
          >
            FRUBEAUTY
          </a>

          <div className="hidden lg:flex items-center gap-6 text-[12px] uppercase tracking-caps text-creamSoft">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-gold transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={instagram}
              target="_blank"
              rel="noopener"
              aria-label="Frubeauty Instagram"
              className="hidden sm:inline-flex w-10 h-10 items-center justify-center rounded-full text-creamSoft hover:text-gold hover:bg-whisperOnDark transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href={facebook}
              target="_blank"
              rel="noopener"
              aria-label="Frubeauty Facebook"
              className="hidden sm:inline-flex w-10 h-10 items-center justify-center rounded-full text-creamSoft hover:text-gold hover:bg-whisperOnDark transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.54V9.83c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.91h-2.33V22c4.78-.75 8.43-4.91 8.43-9.93Z"/>
              </svg>
            </a>

            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-[12px] uppercase tracking-caps font-medium bg-gold text-ink rounded-full hover:bg-goldSoft active:scale-[0.97] active:translate-y-px transition-colors duration-150"
            >
              Foglalás
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Menü bezárása' : 'Menü megnyitása'}
              aria-expanded={menuOpen}
              aria-controls={menuOpen ? 'mobile-nav' : undefined}
              className="lg:hidden inline-flex w-11 h-11 items-center justify-center rounded-full border border-whisperStrong text-cream hover:bg-whisperOnDark transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="17" x2="20" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.32, ease: easeOutStrong }}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobil menü"
            className="lg:hidden fixed inset-x-0 top-16 z-40 bg-ink/95 backdrop-blur-md border-b border-whisper"
          >
            <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-6 flex flex-col gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3.5 px-2 text-[14px] uppercase tracking-caps text-cream hover:text-gold border-b border-whisper last:border-0 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener"
                onClick={() => setMenuOpen(false)}
                className="mt-4 inline-flex items-center justify-center px-6 py-3.5 text-[13px] uppercase tracking-caps font-medium bg-gold text-ink rounded-full hover:bg-goldSoft transition-colors"
              >
                Időpontot foglalok
              </a>
              <div className="mt-4 flex items-center justify-center gap-3 pt-3 border-t border-whisper">
                <a href={instagram} target="_blank" rel="noopener" aria-label="Instagram" className="w-11 h-11 inline-flex items-center justify-center rounded-full text-cream hover:text-gold border border-whisperStrong">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href={facebook} target="_blank" rel="noopener" aria-label="Facebook" className="w-11 h-11 inline-flex items-center justify-center rounded-full text-cream hover:text-gold border border-whisperStrong">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.54V9.83c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.91h-2.33V22c4.78-.75 8.43-4.91 8.43-9.93Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
