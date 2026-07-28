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
 * A videó akkor mountol és indul el, amikor a viewportba ér (IntersectionObserver,
 * 200px rootMargin), mobilon és desktopon egyaránt. A hajtás alatti videók így csak
 * görgetéskor töltődnek, a hero pedig azonnal (mert eleve látszik).
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
    if (prefersReduced || !videoSrc) return;
    const el = containerRef.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setShouldMountVideo(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldMountVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
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
            /* Kisbetűs alak: a React 18 a camelCase fetchPriority-t nem ismeri fel,
               ezért minden renderre figyelmeztetést dobott a konzolba (a HTML
               ugyan működött, mert az attribútumnév kis-nagybetű-független). */
            fetchpriority="high"
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
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink/40 to-transparent pointer-events-none" aria-hidden />
      </div>
    </div>
  );
}
