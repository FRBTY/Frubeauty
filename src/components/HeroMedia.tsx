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
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced.current || !videoSrc) return;
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(() => setShouldMountVideo(true), { timeout: 1200 })
      : window.setTimeout(() => setShouldMountVideo(true), 600);
    return () => {
      if (typeof id === 'number') window.clearTimeout(id);
      else window.cancelIdleCallback?.(id as unknown as number);
    };
  }, [videoSrc]);

  return (
    <div className={`mx-auto ${maxWidthClass}`}>
      <div
        className="relative overflow-hidden rounded-3xl bg-inkRise ring-1 ring-black shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
        style={{ aspectRatio: aspect }}
      >
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
