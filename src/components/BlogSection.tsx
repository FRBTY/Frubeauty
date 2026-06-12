import { StaggerGroup, StaggerItem } from './StaggerGroup';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingMinutes: number;
  publishedAt: string;
  cover: string;
}

interface BlogSectionProps {
  posts?: BlogPost[];
}

const defaultPosts: BlogPost[] = [
  {
    slug: 'szempilla-lifting-vagy-festes',
    title: 'Szempilla lifting vagy festés? A zuglói szakértő válaszol',
    excerpt: 'Rengeteg nő téved abba a hibába, hogy egy trendi Insta-fotó alapján foglal liftinget — miközben festéssel vagy szemöldök-lamináltatással sokkal drámaibb eredményt érne el.',
    category: 'Szempilla',
    readingMinutes: 5,
    publishedAt: '2026-04-12',
    cover: '/img/szempilla-lifting-vagy-festes-blog-cover.webp',
  },
  {
    slug: 'janssen-arckezeles-bortipusok',
    title: 'Janssen arckezelés bőrtípusonként: melyik protokoll hozza el a változást?',
    excerpt: 'A legnagyobb hiba egy sablonos „tisztító arckezelésre” befizetni. A bőröd nem sablon — hét különböző Janssen protokoll közül melyikre van valójában szükséged.',
    category: 'Arckezelés',
    readingMinutes: 8,
    publishedAt: '2026-03-28',
    cover: '/img/janssen-arckezeles-bortipusok-blog-cover.webp',
  },
  {
    slug: 'eskuvoi-smink-felkesziules',
    title: 'Esküvői smink Budapesten: hogyan készülj a próbasminkre?',
    excerpt: 'A próbasmink nem stílusgyakorlat, hanem a nagy napod legfontosabb vizuális szerződése. Mit hozz, mit hagyj otthon, és mi történik a 90 perc alatt.',
    category: 'Alkalmi smink',
    readingMinutes: 7,
    publishedAt: '2026-02-15',
    cover: '/img/eskuvoi-smink-felkesziules-blog-cover.webp',
  },
];

export function BlogSection({ posts = defaultPosts }: BlogSectionProps) {
  return (
    <StaggerGroup
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      staggerDelay={0.07}
    >
      {posts.map((p) => (
        <StaggerItem key={p.slug}>
          <article className="group flex flex-col h-full bg-inkSoft border border-whisper rounded-3xl overflow-hidden md:hover:-translate-y-0.5 md:hover:border-whisperStrong transition-[transform,border-color] duration-500 ease-out">
            <a href={`/blog/${p.slug}/`} className="flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60">
              <div className="aspect-[4/5] overflow-hidden bg-inkRise">
                <img
                  src={p.cover}
                  alt={p.title}
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6 sm:p-7 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-caps text-creamMute">
                  <span className="text-gold">{p.category}</span>
                  <span aria-hidden>·</span>
                  <span>{p.readingMinutes} perc olvasás</span>
                </div>
                <h3 className="mt-3 font-display text-xl sm:text-2xl font-medium leading-snug text-cream">
                  {p.title}
                </h3>
                <p className="mt-3 text-creamSoft leading-relaxed flex-1">
                  {p.excerpt}
                </p>
                <div className="mt-5 pt-5 border-t border-whisper inline-flex items-center text-[12px] uppercase tracking-caps font-medium text-cream group-hover:text-gold transition-colors duration-200">
                  Olvasd el
                  <span aria-hidden className="ml-2 transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
                </div>
              </div>
            </a>
          </article>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}