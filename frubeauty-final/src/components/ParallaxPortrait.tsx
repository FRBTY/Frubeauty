import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxPortraitProps {
  src: string;
  alt: string;
  /** Max upward offset in px during scroll. DESIGN.md caps this at 40px. */
  maxOffset?: number;
  className?: string;
}

/**
 * Hero portrait with subtle scroll-based parallax.
 *
 * Why subtle: per DESIGN.md, "the motion should help reveal content, not serve
 * the designer's ego." A salon visitor scrolls slowly — heavy parallax feels gimmicky.
 *
 * Implementation note (emil-design-eng performance rule): we use the `style.y`
 * motion value bound to a transform string under the hood. Framer Motion's `y`
 * shorthand uses RAF on main thread — fine here because there's only one
 * parallax target on the page.
 */
export function ParallaxPortrait({
  src,
  alt,
  maxOffset = 40,
  className,
}: ParallaxPortraitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Inner image translates upward as the section scrolls past.
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [maxOffset, -maxOffset]
  );

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl bg-sand ${className ?? ''}`}
      style={{ aspectRatio: '4 / 5' }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        // Slightly larger than container so parallax doesn't reveal background
        className="absolute inset-0 w-full h-[112%] -top-[6%] object-cover will-change-transform"
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
}
