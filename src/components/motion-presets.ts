/**
 * Shared motion tokens for FRUBEAUTY.
 *
 * Philosophy (per DESIGN.md + emil-design-eng):
 *  - Beauty salon = deliberate, gallery-quiet. Not bouncy. Not snappy SaaS.
 *  - Every animation has a purpose: spatial consistency, state indication, or
 *    preventing jarring changes. Never decoration for decoration's sake.
 *  - Custom cubic-beziers — never the weak built-in CSS easings.
 *  - Body section reveals stay under 700ms; micro-interactions under 200ms.
 *  - Springs reserved for "alive" interactions (magnetic CTA, image hover lift).
 */

import type { Variants, Transition } from 'framer-motion';

// === Easing curves ===
export const easeOutStrong = [0.23, 1, 0.32, 1] as const;       // entrances, reveals
export const easeInOutStrong = [0.77, 0, 0.175, 1] as const;     // on-screen movement
export const easeDrawer = [0.32, 0.72, 0, 1] as const;           // iOS-like, for FAQ height

// === Section reveal — used on every <section> via <Reveal> ===
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOutStrong },
  },
};

// === Stagger group — parent + child variants ===
export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,  // emil-design: 30-80ms range
      delayChildren: 0.05,
    },
  },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOutStrong },
  },
};

// === Spring presets (Apple-style: easier to reason about) ===
export const springGentle: Transition = {
  type: 'spring',
  duration: 0.55,
  bounce: 0.15,
};

export const springMagnetic: Transition = {
  type: 'spring',
  stiffness: 140,
  damping: 18,
  mass: 0.6,
};

// === Image reveal via clip-path (per emil-design-eng "image reveal on scroll") ===
export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0 0)',
    transition: { duration: 0.9, ease: easeOutStrong },
  },
};

// === Accordion (height + opacity) ===
export const accordionContent: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.28, ease: easeDrawer },
  },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.36, ease: easeDrawer },
      opacity: { duration: 0.28, ease: easeOutStrong, delay: 0.05 },
    },
  },
};
