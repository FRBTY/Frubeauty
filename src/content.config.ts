/**
 * Astro Content Collections — blog.
 *
 * Posts live as Markdown in src/content/blog/. The schema below is strict on
 * purpose: every post needs a category + reading time + cover so the listing
 * grid and article schema can render without fallback hacks.
 *
 * Adding a post = drop one .md into src/content/blog/. The slug is derived
 * from the filename (or overridable via frontmatter `slug`).
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(8).max(120),
    excerpt: z.string().min(20).max(200),
    // 'Szemöldök' 2026-07-31-én vált külön a 'Szempilla'-tól: a négy szemöldök-cikk
    // tévesen 'Szempilla' volt, így a kártyákon rossz címke jelent meg, ÉS a cikkek
    // „kapcsolódó posztok” blokkja (blog/[...slug].astro, azonos kategória) keresztbe
    // ajánlott pilla- és szemöldök-tartalmat. A szétválasztás szűkíti a topikus
    // klasztereket — minden cikk a saját témáján belül linkel tovább.
    category: z.enum(['Szempilla', 'Szemöldök', 'Arckezelés', 'Alkalmi smink', 'Bőrápolás']),
    readingMinutes: z.number().int().positive().max(30),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    cover: z.string().startsWith('/'),
    coverAlt: z.string().min(8),
    /** Cover intrinsic pixel dimensions — reserves space to prevent CLS. */
    coverWidth: z.number().int().positive().optional(),
    coverHeight: z.number().int().positive().optional(),
    /** SEO <title> override (≤60 chars). Default = title. */
    metaTitle: z.string().max(60).optional(),
    /** SEO meta description override (≤160 chars). Default = excerpt. */
    metaDescription: z.string().max(160).optional(),
    /** Optional override slug. Default = filename. */
    slug: z.string().optional(),
    /** Hide draft posts from the index. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
