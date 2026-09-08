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
 *
 * Az elindult videó kigörgetéskor MEGÁLL és visszagörgetéskor folytatódik —
 * kivéve, ha a látogató állította meg. Enélkül a hero videó egyszer elindulva
 * a lap aljáig a háttérben futott (fölösleges CPU és akku). A pause/resume
 * NEM nyúl a fenti kapukhoz: amit nem indítottunk el, azt nem is indítja.
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
  const videoRef = useRef<HTMLVideoElement>(null);
  // Kigörgetéskor MI állítjuk meg a videót — ezt meg kell tudni különböztetni
  // attól, amikor a látogató állítja meg (natív médiavezérlő, jobbklikk-menü,
  // OS-szintű média-gomb). Csak az utóbbit szabad véglegesnek tekinteni.
  const selfPausedRef = useRef(false);
  const userPausedRef = useRef(false);

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

  // Az `autoPlay` attribútum helyett explicit play(): az elem már a HTML-ben ott
  // van, így a később bekapcsolt autoPlay attribútum nem indítaná el megbízhatóan.
  useEffect(() => {
    if (!shouldMountVideo) return;
    const el = videoRef.current;
    if (!el) return;
    el.load(); // preload="none" → "metadata" váltás után kell a kézi load
    void el.play().catch(() => {
      /* autoplay-tiltás esetén marad a poszter + a lejátszás gomb */
    });
  }, [shouldMountVideo]);

  // Kigörgetéskor állj, visszagörgetéskor indulj újra.
  //
  // Miért külön observer: a fenti mount-observer SZÁNDÉKOSAN egyszer lövő
  // (`disconnect()` az első metszéskor), mert az csak a „mikor mountoljunk"
  // kaput őrzi. A pause/resume ezzel szemben az oldal teljes életciklusán át
  // kell hogy figyeljen.
  //
  // Csak akkor él, ha a videó MÁR elindult (`shouldMountVideo`) — így a
  // desktop-only kapu és a Save-Data/reduced-motion tiltás érintetlen marad:
  // visszagörgetés soha nem indíthat el olyan videót, ami el sem indult.
  useEffect(() => {
    if (!shouldMountVideo || !videoSrc) return;
    const el = containerRef.current;
    if (!el || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const video = videoRef.current;
        if (!video) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (userPausedRef.current || !video.paused) continue;
            void video.play().catch(() => {});
          } else if (!video.paused) {
            // A jelzőt a pause() ELŐTT kell beállítani: a `pause` esemény
            // utána, külön taskban tüzel, és az onPause ebből tudja, hogy nem
            // a látogató volt.
            selfPausedRef.current = true;
            video.pause();
          }
        }
      },
      // threshold 0 = csak akkor áll meg, ha teljesen kigörögtek belőle. A hero
      // a lap tetején van; félig látható állapotban megállítani zavaró lenne.
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldMountVideo, videoSrc]);

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
        {videoSrc && (
          /* A <video> MINDIG benne van a kiszolgált HTML-ben, `preload="none"`-nal.
             SEO: a Google csak akkor tudja indexelni a videót, ha talál lejátszót
             az oldalon — korábban az elem csak desktopon, JS-ből mountolt, a
             Googlebot Smartphone (mobil viewport) tehát SOHA nem látta, hiába volt
             VideoObject séma. Perf: a `preload="none"` miatt ez 0 byte hálózati
             forgalom, amíg a lenti logika (desktop + viewport + idle) vagy a
             lejátszás gomb el nem indítja — a mobil LCP-t nem érinti. */
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            loop
            playsInline
            preload={shouldMountVideo ? 'metadata' : 'none'}
            aria-hidden
            onCanPlay={() => setVideoReady(true)}
            onPlay={() => {
              userPausedRef.current = false;
            }}
            onPause={() => {
              // Ha mi állítottuk meg (kigörgetés), csak nyugtázzuk. Ha nem mi,
              // akkor a látogató volt → a visszagörgetés NEM indíthatja újra
              // (WCAG 2.2.2: a szándékos „állj" nem vonható vissza némán).
              if (selfPausedRef.current) selfPausedRef.current = false;
              else userPausedRef.current = true;
            }}
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
