import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { easeOutStrong } from './motion-presets';

interface LightboxProps {
  images: string[];
  alts?: string[];
  /** Index of the currently open image, or null if closed. */
  openIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

/**
 * Full-size image viewer for the gallery.
 *
 * Behavior:
 *  - Click backdrop or × to close
 *  - Arrow keys + on-screen chevrons to navigate
 *  - Esc to close
 *  - Body scroll lock while open
 *  - prefers-reduced-motion: instant open/close, no scale animation
 */
export function Lightbox({
  images,
  alts = [],
  openIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const reduced = useReducedMotion();
  const isOpen = openIndex !== null;
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Body scroll lock + keyboard nav
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onNavigate((openIndex! + 1) % images.length);
      else if (e.key === 'ArrowLeft') onNavigate((openIndex! - 1 + images.length) % images.length);
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, openIndex, images.length, onClose, onNavigate]);

  const go = useCallback(
    (delta: number) => {
      if (openIndex === null) return;
      onNavigate((openIndex + delta + images.length) % images.length);
    },
    [openIndex, images.length, onNavigate],
  );

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: easeOutStrong }}
          role="dialog"
          aria-modal="true"
          aria-label="Galéria nézet"
          className="fixed inset-0 z-[70] bg-inkDeep/95 backdrop-blur-sm flex items-center justify-center px-4 sm:px-8"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Bezárás"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 inline-flex items-center justify-center rounded-full bg-inkSoft text-cream hover:bg-inkRise border border-whisperStrong z-10 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="Előző kép"
            className="hidden sm:inline-flex absolute left-4 sm:left-8 w-12 h-12 items-center justify-center rounded-full bg-inkSoft/80 hover:bg-inkRise text-cream border border-whisperStrong transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Image */}
          <motion.img
            key={openIndex}
            src={images[openIndex!]}
            alt={alts[openIndex!] ?? `Galéria ${openIndex! + 1}`}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: easeOutStrong }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[min(94vw,1100px)] max-h-[88vh] w-auto h-auto object-contain rounded-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
            loading="eager"
          />

          {/* Next */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="Következő kép"
            className="hidden sm:inline-flex absolute right-4 sm:right-8 w-12 h-12 items-center justify-center rounded-full bg-inkSoft/80 hover:bg-inkRise text-cream border border-whisperStrong transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Counter */}
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-inkSoft/80 text-cream text-xs uppercase tracking-caps border border-whisperStrong"
            onClick={(e) => e.stopPropagation()}
          >
            {openIndex! + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
