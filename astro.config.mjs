import { defineConfig } from 'astro/config';
import { readFileSync, readdirSync } from 'node:fs';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// A sitemaphez VALÓDI lastmod-ot adunk a blogposztokra: a frontmatter
// `updatedAt ?? publishedAt` dátumát olvassuk be build-időben, slug szerint.
// Így a Google a tényleges frissítést látja (build-dátum-spam helyett), és a
// friss/aktualizált cikkeket gyorsabban újra-crawlozza. A statikus oldalak
// lastmod nélkül maradnak (nem hazudunk nekik dátumot).
const blogDir = new URL('./src/content/blog/', import.meta.url);
const lastmodBySlug = {};
for (const file of readdirSync(blogDir)) {
  if (!file.endsWith('.md')) continue;
  const fm = readFileSync(new URL(file, blogDir), 'utf8').match(/^---\n([\s\S]*?)\n---/);
  if (!fm) continue;
  const slug = (fm[1].match(/^slug:\s*["']?(.+?)["']?\s*$/m)?.[1] ?? file.replace(/\.md$/, '')).trim();
  const date = (fm[1].match(/^updatedAt:\s*([0-9-]+)/m)?.[1]
    ?? fm[1].match(/^publishedAt:\s*([0-9-]+)/m)?.[1] ?? '').trim();
  if (date) lastmodBySlug[slug] = new Date(date).toISOString();
}

export default defineConfig({
  site: 'https://frubeauty.com',
  // Netlify a záró slash nélküli URL-eket 301-gyel a slashes verzióra irányítja.
  // A 'always' + 'directory' formátummal a belső linkek, a sitemap és a kanonikus
  // URL-ek mind a végleges (slashes) változatra mutatnak → nincs 301-hop, nem
  // szivárog link-equity, és megszűnik a +1 RTT a belső navigáción.
  trailingSlash: 'always',
  integrations: [
    tailwind(),
    sitemap({
      serialize(item) {
        const slug = item.url.match(/\/blog\/([^/]+)\/$/)?.[1];
        if (slug && lastmodBySlug[slug]) item.lastmod = lastmodBySlug[slug];
        return item;
      },
    }),
    react(),
  ],
  compressHTML: true,
  build: {
    format: 'directory',
    inlineStylesheets: 'always',
  },
  vite: {
    cacheDir: '/tmp/vite-fb4',
    ssr: {
      noExternal: ['framer-motion'],
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: { drop_console: true },
        mangle: true,
      },
      rollupOptions: {
        output: {
          manualChunks: {
            reveal: ['./src/components/Reveal'],
            framer: ['framer-motion'],
            react: ['react', 'react-dom'],
          },
          chunkFileNames: 'chunks/[name]-[hash].js',
          entryFileNames: '[name]-[hash].js',
        },
      },
      chunkSizeWarningLimit: 1000,
    },
  },
});
