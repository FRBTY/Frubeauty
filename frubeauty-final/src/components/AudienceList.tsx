import { StaggerGroup, StaggerItem } from './StaggerGroup';

export interface AudienceProfile {
  headline: string;
  body: string;
  cta: string;
  href: string;
}

export function AudienceList({ profiles }: { profiles: AudienceProfile[] }) {
  return (
    <StaggerGroup className="space-y-0" staggerDelay={0.07}>
      {profiles.map((p, i) => (
        <StaggerItem key={p.headline}>
          <div
            className={`grid md:grid-cols-12 gap-6 md:gap-10 items-center py-10 md:py-12 border-t border-whisper ${
              i === profiles.length - 1 ? 'border-b' : ''
            }`}
          >
            <div className="md:col-span-1 font-display text-3xl text-creamDim">
              0{i + 1}
            </div>
            <div className="md:col-span-7">
              <h3 className="font-display text-2xl md:text-3xl font-light leading-tight text-cream">
                {p.headline}
              </h3>
              <p className="mt-3 text-creamSoft leading-[1.7] max-w-[60ch]">
                {p.body}
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <a
                href={p.href}
                className="group inline-flex items-center text-base font-medium text-cream hover:text-gold transition-colors duration-200"
              >
                {p.cta}
                <span aria-hidden className="ml-2 inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
