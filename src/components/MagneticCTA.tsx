import type { ReactNode } from 'react';

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
 * CTA gomb — statikus <a>, framer-motion NÉLKÜL.
 *
 * A korábbi „magnetic” pointer-követő effekt (useMotionValue/useSpring/useTransform)
 * a framer-motion + use-transform chunkot a KRITIKUS útba húzta a fizetett landing
 * oldalakon (lásd a főoldal döntését: ott már statikus <a>-ra váltottunk). A press/
 * hover visszajelzést tiszta CSS adja (active:scale, hover:bg). Mivel a komponens így
 * nem használ hookot, client direktíva nélkül statikus HTML-ként renderel (NULLA JS),
 * de hidratálva is olcsó (nincs framer-motion import). A props-API változatlan, így a
 * meglévő használatok nem törnek.
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
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener' : undefined}
      aria-label={ariaLabel}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <span className="pointer-events-none">{children}</span>
    </a>
  );
}
