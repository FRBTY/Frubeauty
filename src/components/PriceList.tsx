import { StaggerGroup, StaggerItem } from './StaggerGroup';
import { siteConfig as _siteConfig } from '../config/site';
const siteConfig = { ..._siteConfig };

export interface PriceItem {
  name: string;
  duration?: string;
  description?: string;
  price: string;
  badge?: string;
  /** Opcionális kis lábjegyzet — pl. kiszállási díj. */
  footnote?: string;
}

export interface PriceCategory {
  eyebrow: string;
  title: string;
  items: PriceItem[];
}

interface PriceListProps {
  categories: PriceCategory[];
}

/**
 * Two-column price list with per-item "Ezt szeretném" CTA.
 *  - Left rail (sticky on lg+): category eyebrow + title.
 *  - Right rail: stack of priced rows + booking CTA per item.
 */
export function PriceList({ categories }: PriceListProps) {
  return (
    <div className="space-y-20 sm:space-y-24">
      {categories.map((cat) => (
        <div key={cat.title} className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <p className="text-[11px] uppercase tracking-caps text-gold mb-4">{cat.eyebrow}</p>
            <h3
              className="font-display font-light leading-[1.1] tracking-tight text-cream"
              style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2rem)' }}
            >
              {cat.title}
            </h3>
          </div>
          <StaggerGroup
            className="lg:col-span-8 divide-y divide-[rgba(245,232,211,0.08)] border-y border-whisper"
            staggerDelay={0.06}
          >
            {cat.items.map((item) => (
              <StaggerItem key={item.name}>
                <article className="py-6 sm:py-7 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 min-w-0 pr-0 sm:pr-8">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h4 className="font-display text-lg sm:text-xl font-medium text-cream leading-snug">
                        {item.name}
                      </h4>
                      {item.duration && (
                        <span className="text-[11px] uppercase tracking-caps text-creamMute">
                          {item.duration}
                        </span>
                      )}
                      {item.badge && (
                        <span className="text-[10px] uppercase tracking-caps font-medium bg-gold/15 text-gold border border-gold/30 px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="mt-2 text-sm sm:text-[15px] text-creamSoft leading-relaxed max-w-[60ch]">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0 self-start sm:self-baseline flex flex-col items-start sm:items-end gap-3">
                    <span className="font-display text-xl sm:text-2xl font-medium tracking-tight text-gold whitespace-nowrap">
                      {item.price}
                    </span>
                    <a
                      href={siteConfig.booking}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center px-4 py-2 text-[11px] uppercase tracking-caps font-semibold bg-gold text-ink rounded-full hover:bg-goldSoft active:scale-[0.97] active:translate-y-px transition-colors duration-150 whitespace-nowrap"
                      aria-label={`Ezt szeretném: ${item.name}`}
                    >
                      Ezt szeretném →
                    </a>
                    {item.footnote && (
                      <p className="text-[11px] text-creamMute leading-snug max-w-[28ch] text-left sm:text-right italic">
                        {item.footnote}
                      </p>
                    )}
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      ))}
    </div>
  );
}
