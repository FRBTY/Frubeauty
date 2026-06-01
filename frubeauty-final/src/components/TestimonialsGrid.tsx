import { StaggerGroup, StaggerItem } from './StaggerGroup';
import { siteConfig as _siteConfig } from '../config/site';
// Spread widens as-const literal types to string — needed for JSX href attrs
const siteConfig = { ..._siteConfig };

export interface Testimonial {
  name: string;
  rating: number;
  text: string;
  service: string;
  /** Konkrét outcome — pl. „6 hét tartós lifting" (#audit #10). */
  outcome?: string;
  /** Optional direct Google review permalink. Fallback: site-szintű review-lista. */
  googleUrl?: string;
}

export function TestimonialsGrid({ items }: { items: Testimonial[] }) {
  return (
    <StaggerGroup className="grid md:grid-cols-2 gap-6 lg:gap-8" staggerDelay={0.08}>
      {items.map((t) => {
        const reviewUrl = t.googleUrl || siteConfig.googleReviewsUrl;
        return (
          <StaggerItem key={`${t.name}-${t.service}`}>
            <figure className="bg-inkSoft border border-whisper rounded-3xl p-7 sm:p-9 flex flex-col h-full">
              <div className="flex gap-0.5 text-gold mb-5" aria-label={`${t.rating} csillagos értékelés`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2l2.39 7.36H22l-6.18 4.49L18.21 22 12 17.5 5.79 22l2.39-8.15L2 9.36h7.61z" />
                  </svg>
                ))}
              </div>
              <blockquote className="font-display text-xl sm:text-2xl font-light leading-snug text-cream flex-1">
                „{t.text}"
              </blockquote>
              {t.outcome && (
                <p className="mt-5 text-[11px] uppercase tracking-caps text-gold/90">
                  ↳ {t.outcome}
                </p>
              )}
              <figcaption className="mt-6 pt-5 border-t border-whisper flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm text-cream">{t.name}</p>
                  <p className="text-xs text-creamMute mt-0.5">{t.service}</p>
                </div>
                <a
                  href={reviewUrl}
                  target="_blank"
                  rel="noopener nofollow"
                  className="text-xs text-creamMute hover:text-gold transition-colors inline-flex items-center gap-1"
                  aria-label={`${t.name} véleménye a Google-on`}
                >
                  Google
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </a>
              </figcaption>
            </figure>
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}
