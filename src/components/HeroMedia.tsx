import { useEffect, useRef, useState } from 'react';

interface HeroMediaProps {
  videoSrc?: string;
  posterSrc: string;
  alt: string;
  aspect?: string;
  maxWidthClass?: string;
}

/**
 * Hero media — vertical video first, image fallback.
 * Parallax removed: eliminated useTransform/useScroll framer-motion chunk from
 * the critical request chain. Result: use-transform.js no longer in LCP path.
 *
 * Automatikus videó csak desktopon, viewport-közelben és idle időben indul.
 * Mobilon, Save-Data/2G vagy reduced-motion mellett a poszter marad, amíg a
 * látogató kifejezetten meg nem nyomja a lejátszás gombot.
 */
export function HeroMedia({
  videoSrc,
  posterSrc,
  alt,
  aspect = '9 / 16',
  maxWidthClass = 'max-w-[440px]',
}: HeroMediaProps) {
  const [videoReady, setVideoReady] = useState(false);
  const [shouldMountVideo, setShouldMountVideo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // AVIF poszter (~50%-kal kisebb, mint a WebP) — minden -poster.webp mellé
  // generálva van .avif. A <picture> AVIF-source-t ad, az <img> WebP-fallbacket
  // a ritka AVIF-képtelen böngészőkre. Az LCP-elem így kevesebb byte.
  const posterAvif = posterSrc.replace(/\.webp$/, '.avif');

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktop = window.matchMedia('(min-width: 768px)').matches;
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const slowConnection = ['slow-2g', '2g'].includes(connection?.effectiveType ?? '');
    if (prefersReduced || !desktop || connection?.saveData || slowConnection || !videoSrc) return;
    const el = containerRef.current;
    if (!el) return;

    let idleId: number | undefined;
    let timerId: number | undefined;
    const idleWindow = window as typeof window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const mountWhenIdle = () => {
      if (idleWindow.requestIdleCallback) {
        idleId = idleWindow.requestIdleCallback(() => setShouldMountVideo(true), { timeout: 1500 });
      } else {
        timerId = window.setTimeout(() => setShouldMountVideo(true), 600);
      }
    };

    if (!('IntersectionObserver' in window)) {
      mountWhenIdle();
      return () => {
        if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
        if (timerId !== undefined) window.clearTimeout(timerId);
      };
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          mountWhenIdle();
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, [videoSrc]);

  return (
    <div className={`mx-auto ${maxWidthClass}`}>
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-3xl bg-inkRise ring-1 ring-black shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
        style={{ aspectRatio: aspect }}
      >
        <picture>
          <source srcSet={posterAvif} type="image/avif" />
          <img
            src={posterSrc}
            alt={alt}
            width={380}
            height={676}
            className={`absolute inset-0 w-full h-[112%] -top-[6%] object-cover transition-opacity duration-700 ease-out ${
              videoReady ? 'opacity-0' : 'opacity-100'
            }`}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />
        </picture>
        {shouldMountVideo && videoSrc && (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            onCanPlay={() => setVideoReady(true)}
            className={`absolute inset-0 w-full h-[112%] -top-[6%] object-cover transition-opacity duration-700 ease-out ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
        {videoSrc && !videoReady && (
          <button
            type="button"
            onClick={() => setShouldMountVideo(true)}
            className="absolute bottom-4 left-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-ink/80 px-4 py-2.5 text-xs font-medium uppercase tracking-caps text-cream backdrop-blur-sm hover:bg-ink focus-visible:ring-2 focus-visible:ring-gold/70"
            aria-label="Bemutatkozó videó lejátszása"
          >
            <span aria-hidden>▶</span>
            Videó
          </button>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink/40 to-transparent pointer-events-none" aria-hidden />
      </div>
    </div>
  );
}
