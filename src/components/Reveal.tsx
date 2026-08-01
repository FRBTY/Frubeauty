import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { sectionReveal, easeOutStrong } from './motion-presets';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'header' | 'footer';
  className?: string;
  /** Distance to translate from. 0 = pure fade (used when reduced-motion). */
  distance?: number;
  /** Trigger once and unobserve. Default true — section reveals don't re-trigger on scrollback. */
  once?: boolean;
}

/**
 * Scroll-triggered reveal. Replaces the previous data-reveal CSS attribute approach.
 *
 * Why this matters: useInView with { once: true } unobserves after the first
 * trigger, so there's no ongoing scroll listener cost. Combined with reduced-motion
 * awareness, this respects users who get motion sick.
 */
export function Reveal({
  children,
  delay = 0,
  as = 'div',
  className,
  distance = 24,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '0px 0px -80px 0px' });
  const reduced = useReducedMotion();

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      // A szerver mindig látható állapotot küld. Így a tartalom JavaScript,
      // hidratálás vagy IntersectionObserver nélkül sem marad opacity:0-n.
      initial="visible"
      animate={inView ? 'visible' : 'hidden'}
      variants={
        reduced
          ? {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { duration: 0.3, ease: easeOutStrong },
              },
            }
          : {
              hidden: { opacity: 0, y: distance },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.65, delay, ease: easeOutStrong },
              },
            }
      }
      className={className}
    >
      {children}
    </MotionTag>
  );
}

export { sectionReveal };
