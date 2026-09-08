import { useEffect, useRef, useState } from 'react';

interface ScrollVideoProps {
  videoSrc: string;
  posterSrc: string;
  alt: string;
  /** A videó alatt megjelenő rövid leírás (CRO: a videó „mit bizonyít"). */
  caption?: string;
  aspect?: string;
  maxWidthClass?: string;
}

/**
 * Görgetésre induló tartalmi videó (menyasszonyi smink referenciák).
 *
 * Miben más, mint a HeroMedia:
 *  - A HeroMedia SZÁNDÉKOSAN csak desktopon indít (a hero a kritikus úton van,
 *    ott a mobil LCP a főszempont). Ez a komponens viszont mélyen a hajtás
 *    alatt ül, tehát MOBILON IS elindulhat: a Lighthouse nem görget, így a
 *    PSI-pontszámot nem érinti, a valódi látogató viszont pont azt a mozgást
 *    kapja meg, ami elad.
 *  - Kigörgetéskor PAUSE. Enélkül négy videó pörögne egyszerre a háttérben
 *    (a hero + a podcast + ez a kettő) — fölösleges CPU és akku.
 *
 * Perf-garanciák:
 *  - A <video> SSR-ben ott van `preload="none"`-nal → 0 byte, amíg a látogató
 *    oda nem görget. (SEO: a Googlebot Smartphone így talál lejátszót az
 *    oldalon — ez a feltétele a videó rich resultnak.)
 *  - Az island `client:visible`, tehát maga a JS-chunk is csak a szekció
 *    közelében töltődik le.
 *
 * Adatforgalom-tisztelet: Save-Data, 2G/slow-2G és `prefers-reduced-motion`
 * esetén marad a poszter + egy kézi lejátszás gomb.
 */
export function ScrollVideo({
  videoSrc,
  posterSrc,
  alt,
  caption,
  aspect = '9 / 16',
  maxWidthClass = 'max-w-[380px]',
}: ScrollVideoProps) {
  const [armed, setArmed] = useState(false); // szabad-e egyáltalán byte-ot tölteni
  const [ready, setReady] = useState(false); // van-e már dekódolt kép
  const [playing, setPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Ha a látogató KÉZZEL állította meg, a visszagörgetés nem indíthatja újra —
  // különben a szándékos „állj" néma visszavonása lenne (WCAG 2.2.2).
  const userPausedRef = useRef(false);

  // AVIF poszter (~50%-kal kisebb a WebP-nél) — minden -poster.webp mellé
  // generálva van .avif; a <picture> a WebP-t hagyja fallbacknek.
  const posterAvif = posterSrc.replace(/\.webp$/, '.avif');

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const stingy =
      connection?.saveData === true ||
      ['slow-2g', '2g'].includes(connection?.effectiveType ?? '');

    // Automatika kikapcsolva: a poszter marad, a gomb viszont működik.
    if (prefersReduced || stingy || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = videoRef.current;
          if (entry.isIntersecting) {
            if (userPausedRef.current) continue;
            setArmed(true);
            // Az `armed` csak a következő renderben állítja át a preload-ot,
            // ezért itt még nem play()-elünk — azt a lenti effect intézi.
            if (video && video.readyState > 0) void video.play().catch(() => {});
          } else {
            video?.pause();
          }
        }
      },
      // 35%: a videó érdemben a képernyőn van, nem csak beleér a széle.
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Az `autoPlay` attribútum itt nem használható: az elem már a HTML-ben ott
  // van, a később bekapcsolt attribútum nem indítaná el megbízhatóan. Ezért
  // explicit load() + play() a preload="none" → "metadata" váltás után.
  useEffect(() => {
    if (!armed) return;
    const video = videoRef.current;
    if (!video) return;
    video.load();
    void video.play().catch(() => {
      /* autoplay-tiltás: marad a poszter és a lejátszás gomb */
    });
  }, [armed]);

  const toggle = () => {
    const video = videoRef.current;
    if (!armed || !video) {
      userPausedRef.current = false;
      setArmed(true);
      return;
    }
    if (video.paused) {
      userPausedRef.current = false;
      void video.play().catch(() => {});
    } else {
      userPausedRef.current = true;
      video.pause();
    }
  };

  return (
    <figure className={`mx-auto ${maxWidthClass}`}>
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
            width={720}
            height={1280}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
              ready ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </picture>

        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload={armed ? 'metadata' : 'none'}
          aria-hidden
          onCanPlay={() => setReady(true)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* WCAG 2.2.2: az 5 másodpercnél hosszabb, magától induló mozgást a
            látogatónak meg kell tudnia állítani. */}
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Videó megállítása' : 'Videó lejátszása'}
          className="absolute bottom-4 left-4 inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-white/25 bg-ink/70 px-4 py-2.5 text-xs font-medium uppercase tracking-caps text-cream backdrop-blur-sm transition-colors hover:bg-ink focus-visible:ring-2 focus-visible:ring-gold/70"
        >
          <span aria-hidden>{playing ? '❚❚' : '▶'}</span>
          {!playing && <span>Videó</span>}
        </button>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink/40 to-transparent"
          aria-hidden
        />
      </div>
      {caption && (
        <figcaption className="mt-4 text-[14px] leading-[1.65] text-creamSoft">{caption}</figcaption>
      )}
    </figure>
  );
}
