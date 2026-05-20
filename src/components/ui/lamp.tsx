import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Lamp light-beam container — recolored to FRUBEAUTY palette.
 *
 * Source: shadcn-style "lamp" pattern using conic gradients to draw a stage-light
 * cone. Original cyan/slate replaced with our gold/ink tokens so the moment
 * reads as warm boutique salon, not sci-fi.
 *
 * Layout note: the demo uses min-h-screen which is too dramatic when the page
 * has an announcement bar + navbar + content below. We expose `className` so
 * the consumer can constrain the height (e.g. min-h-[80vh]).
 *
 * Reduced motion: the conic divs use whileInView animations. When the user
 * prefers reduced motion, we render the final state directly without the
 * width-grow animation so nothing slides into place.
 */

interface LampContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function LampContainer({ children, className }: LampContainerProps) {
  const reduced = useReducedMotion();

  const initial = reduced ? { opacity: 1, width: '30rem' } : { opacity: 0.5, width: '15rem' };
  const animate = reduced ? { opacity: 1, width: '30rem' } : { opacity: 1, width: '30rem' };

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center overflow-hidden bg-ink w-full z-0',
        'min-h-[90vh] sm:min-h-[85vh]',
        className,
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        {/* Left half of cone */}
        <motion.div
          initial={initial}
          whileInView={animate}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          style={{ backgroundImage: 'conic-gradient(var(--conic-position), var(--tw-gradient-stops))' }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-gold via-transparent to-transparent text-cream [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-ink h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-ink bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right half of cone */}
        <motion.div
          initial={initial}
          whileInView={animate}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          style={{ backgroundImage: 'conic-gradient(var(--conic-position), var(--tw-gradient-stops))' }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-gold text-cream [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-ink bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-ink h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Blur layer behind the beam */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-ink blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

        {/* Gold "bulb" glow */}
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-gold opacity-40 blur-3xl" />

        {/* Inner bright bulb */}
        <motion.div
          initial={{ width: reduced ? '16rem' : '8rem' }}
          whileInView={{ width: '16rem' }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-goldGlow blur-2xl"
        />

        {/* Hair-thin gold rail (the lamp's bar) */}
        <motion.div
          initial={{ width: reduced ? '30rem' : '15rem' }}
          whileInView={{ width: '30rem' }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-auto z-50 h-px w-[30rem] -translate-y-[7rem] bg-goldSoft"
        />

        {/* Top mask hides the cone above the bar */}
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-ink" />
      </div>

      {/* Content slot — pulled up so it sits in the light */}
      <div className="relative z-50 flex -translate-y-36 sm:-translate-y-44 flex-col items-center px-5 w-full">
        {children}
      </div>
    </div>
  );
}
