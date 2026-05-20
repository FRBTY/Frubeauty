import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface HeroMediaProps {
  videoSrc?: string;
  posterSrc: string;
  alt: string;
  /** Aspect ratio. Hero video is portrait 9:16 by default. */
  aspect?: string;
  /** Max parallax offset (px). 0 disables. */
  maxOffset?: number;
  /** Max width container. Default 440px works for vertical video. */
  maxWidthClass?: string;
}

/**
 * Hero media — vertical video first, image fallback.
 *
 * Behaviour:
 *  - Poster image renders immediately (eager, fetchpriority high).
 *  - Video lazy-loads after idle, crossfades over the poster.
 *  - Autoplay muted + playsInline + loop — works on mobile.
 *  - prefers-reduced-motion: no parallax, no autoplay (poster only).
 */
export function HeroMedia({
  videoSrc,
  posterSrc,
  alt,
  aspect = '9 / 16',
  maxOffset = 20,
  maxWidthClass = 'max-w-[440px]',
}: HeroMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);
  const [shouldMountVideo, setShouldMountVideo] = useState(false);

  useEffect(() => {
    if (reduced || !videoSrc) return;
    const id = window.requestIdleCallback?.(() => setShouldMountVideo(true), { timeout: 1200 })
      ?? window.setTimeout(() => setShouldMountVideo(true), 600);
    return () => {
      if (typeof id === 'number') window.clearTimeout(id);
      else window.cancelIdleCallback?.(id as unknown as number);
    };
  }, [reduced, videoSrc]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [maxOffset, -maxOffset]
  );

  return (
    <div className={`mx-auto ${maxWidthClass}`}>
      <div
        ref={ref}
        className="relative overflow-hidden rounded-3xl bg-inkRise ring-1 ring-whisperStrong shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
        style={{ aspectRatio: aspect }}
      >
        {/* LCP image: nincs initial transform az SSR HTML-ben (parallax csak hydration után indul).
            width/height megakadályozza a CLS-t a layout paint-nél. */}
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
        {shouldMountVideo && videoSrc && (
          <motion.video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            onCanPlay={() => setVideoReady(true)}
            style={{ y }}
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
