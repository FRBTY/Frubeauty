import { useState } from 'react';
import { StaggerGroup, StaggerItem } from './StaggerGroup';
import { Lightbox } from './Lightbox';

interface GalleryGridProps {
  count?: number;
  altPrefix?: string;
  /** Per-kép egyedi alt szövegek — ha megadott, felülírja az altPrefix generált változatát.
   *  SEO szempontból minden képnek egyedi, kulcsszavas alt szöveg kell. */
  alts?: string[];
  images?: string[];
  imageSrc?: (i: number) => string;
  /**
   * 'compact' (default): 4 oszlopos, négyzetes thumbnail-ek (galéria sűrűbb).
   * 'large': 3 oszlopos, álló (4/5) kivágás, nagyobb gap — szempilla/szemöldök/arc közeli
   * képeken több részlet látszik, és nem érnek össze a fotók.
   */
  size?: 'compact' | 'large';
}

export function GalleryGrid({
  count = 8,
  altPrefix = 'Vendég eredmény',
  alts: altsProp,
  images,
  imageSrc,
  size = 'compact',
}: GalleryGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const resolve = (i: number): string => {
    if (images && images[i]) return images[i];
    if (imageSrc) return imageSrc(i);
    return '/img/placeholder.svg';
  };

  const all = Array.from({ length: count }).map((_, i) => resolve(i));
  // Ha per-kép alt szöveg van megadva, azt használjuk; egyébként a generált prefix + index.
  const alts = Array.from({ length: count }).map((_, i) =>
    altsProp && altsProp[i] ? altsProp[i] : `${altPrefix} ${i + 1}`
  );

  const gridClass =
    size === 'large'
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8'
      : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4';
  const tileAspect = size === 'large' ? 'aspect-[4/5]' : 'aspect-square';
  const tileW = 800;
  const tileH = size === 'large' ? 1000 : 800;

  return (
    <>
      <StaggerGroup className={gridClass} staggerDelay={0.04}>
        {all.map((src, i) => (
          <StaggerItem key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Kép nagyítása: ${alts[i]}`}
              className={`group block w-full ${tileAspect} bg-inkSoft rounded-2xl overflow-hidden border border-whisper focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink`}
            >
              <img
                src={src}
                alt={alts[i]}
                width={tileW}
                height={tileH}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] group-active:scale-[1.04]"
              />
            </button>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Lightbox
        images={all}
        alts={alts}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
