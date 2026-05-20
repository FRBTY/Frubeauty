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
    category: z.enum(['Szempilla', 'Arckezelés', 'Alkalmi smink', 'Bőrápolás']),
    readingMinutes: z.number().int().positive().max(30),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    cover: z.string().startsWith('/'),
    coverAlt: z.string().min(8),
    /** Optional override slug. Default = filename. */
    slug: z.string().optional(),
    /** Hide draft posts from the index. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
