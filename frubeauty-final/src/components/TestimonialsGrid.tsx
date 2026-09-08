import { StaggerGroup, StaggerItem } from './StaggerGroup';
import { siteConfig as _siteConfig } from '../config/site';
// Spread widens as-const literal types to string — needed for JSX href attrs
const siteConfig = { ..._siteConfig };

export interface Testimonial {
  name: string;
  rating: number;
  text: string;
  service: string;
  /** Konkrét outcome — pl. „6 hét tartós lifting” (#audit #10). */
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
              <div className="flex gap-0.5 text-gold mb-5" role="img" aria-label={`${t.rating} csillagos értékelés`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2l2.39 7.36H22l-6.18 4.49L18.21 22 12 17.5 5.79 22l2.39-8.15L2 9.36h7.61z" />
                  </svg>
                ))}
              </div>
              <blockquote className="font-display text-xl sm:text-2xl font-light leading-snug text-cream flex-1">
                „{t.text}”
              </blockquote>
              {/* A jelölő SZÁNDÉKOSAN inline SVG, nem „↳" (U+21B3) karakter.
                  A glyph megvan a tartalék fontban — mérve nem tofu —, de 11 px-es
                  méretben egyetlen hajszálvékony függőleges vonal apró kampóval:
                  élesben vesszőnek vagy „ı"-nek olvasódik, nem nyílnak. Az SVG
                  2,4-es vonalvastagsággal ugyanezt a jelentést adja olvashatóan.
                  Ez eddig nem derült ki, mert az `outcome` mező 2026-09-08-ig
                  egyetlen oldalon sem volt kitöltve.
                  A szín goldSoft, nem gold/90: 11 px-es szövegre 4,5:1 kontraszt
                  kell, és a gold/90 inkSoft kártyán 4,6:1-gyel épphogy súrolta a
                  határt — ugyanaz a korrekció, mint a PriceList badge-én. */}
              {t.outcome && (
                <p className="mt-5 flex items-center gap-2 text-[11px] uppercase tracking-caps text-goldSoft">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0" aria-hidden>
                    <polyline points="9 10 4 15 9 20" />
                    <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                  </svg>
                  {t.outcome}
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
                  // -my-1 + py-1: 16 px magas linkből 24 px-es érintőfelület
                  // (WCAG 2.5.8 AA), a figcaption sormagasságának változtatása nélkül.
                  className="text-xs text-creamMute hover:text-gold transition-colors inline-flex items-center gap-1 -my-1 py-1"
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
