import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { staggerParent, staggerChild, easeOutStrong } from './motion-presets';

/**
 * StaggerGroup — container that fires staggered children when scrolled into view.
 * Children must be StaggerItem to participate.
 */
export function StaggerGroup({
  children,
  className,
  as = 'div',
  staggerDelay = 0.06,
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'ul' | 'ol';
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });
  const reduced = useReducedMotion();

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      // SSR-ben minden gyermek látható. A kliens csak progresszív animációt ad;
      // JavaScript nélkül a szolgáltatás-, cikk- és véleménykártyák sem tűnnek el.
      initial="visible"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : staggerDelay,
            delayChildren: 0.04,
          },
        },
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'li';
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      variants={
        reduced
          ? {
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.3 } },
            }
          : staggerChild
      }
      className={className}
    >
      {children}
    </MotionTag>
  );
}

export { staggerParent };
