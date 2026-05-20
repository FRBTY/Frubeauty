import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { useRef, type ReactNode, type MouseEvent } from 'react';
import { springMagnetic } from './motion-presets';

interface MagneticCTAProps {
  href: string;
  external?: boolean;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'on-dark-primary' | 'on-dark-secondary';
  className?: string;
  ariaLabel?: string;
  /** If true, use uppercase + wide letter-spacing (live-site style). Default true. */
  caps?: boolean;
}

/**
 * Primary CTA with spring-based magnetic pointer tracking.
 *
 * Dark-mode variants:
 *  - primary       = gold pill, ink text     (hero CTA, main page)
 *  - secondary     = outlined cream, transparent
 *  - on-dark-primary / on-dark-secondary kept for footer contact area, same look on ink bg
 */
export function MagneticCTA({
  href,
  external = false,
  children,
  variant = 'primary',
  className = '',
  ariaLabel,
  caps = true,
}: MagneticCTAProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, springMagnetic);
  const sy = useSpring(my, springMagnetic);

  const transform = useTransform(
    [sx, sy],
    ([x, y]: number[]) => `translate3d(${x}px, ${y}px, 0)`
  );

  function handleMove(e: MouseEvent<HTMLAnchorElement>) {
    if (reduced) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    mx.set((e.clientX - cx) * 0.18);
    my.set((e.clientY - cy) * 0.18);
  }
  function handleLeave() { mx.set(0); my.set(0); }

  const base =
    `inline-flex items-center justify-center rounded-full transition-colors duration-200 ${
      caps
        ? 'px-7 py-3.5 text-[12px] uppercase tracking-caps font-medium'
        : 'px-7 py-3.5 text-base font-medium'
    }`;
  const variants: Record<NonNullable<MagneticCTAProps['variant']>, string> = {
    primary:
      'bg-gold text-ink hover:bg-goldSoft active:scale-[0.97] active:translate-y-px',
    secondary:
      'border border-whisperStrong text-cream hover:bg-whisperOnDark active:scale-[0.97]',
    'on-dark-primary':
      'bg-gold text-ink hover:bg-goldSoft active:scale-[0.97] active:translate-y-px',
    'on-dark-secondary':
      'border border-cream/30 text-cream hover:bg-cream hover:text-ink active:scale-[0.97]',
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener' : undefined}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-label={ariaLabel}
      style={{ transform }}
      className={`${base} ${variants[variant]} ${className} will-change-transform`}
    >
      <span className="pointer-events-none">{children}</span>
    </motion.a>
  );
}
