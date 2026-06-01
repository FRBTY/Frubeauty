import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { easeDrawer, easeOutStrong } from './motion-presets';

export interface FAQItem { q: string; a: string; }

export function FAQ({ items }: { items: FAQItem[] }) {
  // #audit secondary — default zárva. Az első nyitva állapot inkonzisztens
  // vertical rhythm-et okozott és nem feltétlenül a legrelevánsabb kérdést mutatta.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();

  return (
    <div className="divide-y divide-[rgba(245,232,211,0.08)] border-y border-whisper">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q} className="py-2">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={isOpen ? `faq-panel-${i}` : undefined}
              className="w-full py-5 flex items-center justify-between gap-6 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-4 focus-visible:ring-offset-ink rounded-md"
            >
              <span className="font-display text-lg sm:text-xl font-medium pr-4 text-cream">
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={reduced ? { duration: 0 } : { duration: 0.32, ease: easeOutStrong }}
                className={`flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-colors duration-200 ${
                  isOpen ? 'bg-gold text-ink border-gold' : 'border-whisperStrong text-cream'
                }`}
                aria-hidden
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: 'auto', opacity: 1,
                    transition: reduced ? { duration: 0.18 } : {
                      height: { duration: 0.36, ease: easeDrawer },
                      opacity: { duration: 0.28, ease: easeOutStrong, delay: 0.05 },
                    },
                  }}
                  exit={{
                    height: 0, opacity: 0,
                    transition: reduced ? { duration: 0.18 } : {
                      height: { duration: 0.28, ease: easeDrawer, delay: 0.05 },
                      opacity: { duration: 0.18, ease: easeOutStrong },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-12 text-creamSoft leading-[1.7] max-w-[65ch]">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
