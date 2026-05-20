import { motion, useReducedMotion } from 'framer-motion';
import { clipReveal } from './motion-presets';

export interface ServiceCardData {
  title: string;
  subtitle: string;
  body: string;
  priceFrom: string;
  duration: string;
  href: string;
  image: string;
  alt: string;
}

export function ServiceCard({ service: s }: { service: ServiceCardData }) {
  const reduced = useReducedMotion();

  return (
    <article className="group flex flex-col bg-inkSoft border border-whisper rounded-3xl overflow-hidden md:hover:-translate-y-0.5 md:hover:border-whisperStrong transition-[transform,border-color] duration-500 ease-out h-full">
      <div className="aspect-[4/5] overflow-hidden bg-inkRise">
        <motion.img
          src={s.image}
          alt={s.alt}
          loading="lazy"
          variants={reduced ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : clipReveal}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <p className="text-[11px] uppercase tracking-caps text-creamMute mb-2">{s.subtitle}</p>
        <h3 className="font-display text-2xl font-medium leading-tight text-cream">{s.title}</h3>
        <p className="mt-3 text-creamSoft leading-relaxed flex-1">{s.body}</p>
        <div className="mt-5 pt-5 border-t border-whisper flex flex-col gap-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="font-display text-xl font-medium text-gold">{s.priceFrom}</p>
              <p className="text-xs text-creamMute mt-0.5">{s.duration}</p>
            </div>
          </div>
          <a
            href={s.href}
            className="inline-flex items-center justify-center w-full px-5 py-3 text-[12px] uppercase tracking-caps font-semibold bg-gold text-ink rounded-full hover:bg-goldSoft active:scale-[0.97] active:translate-y-px transition-colors duration-150"
            aria-label={`Kattints ide az árakért: ${s.title}`}
          >
            Kattints ide az árakért
            <span aria-hidden className="ml-2 transition-transform duration-300 ease-out group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}
