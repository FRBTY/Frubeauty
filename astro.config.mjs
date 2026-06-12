import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://frubeauty.com',
  // Netlify a záró slash nélküli URL-eket 301-gyel a slashes verzióra irányítja.
  // A 'always' + 'directory' formátummal a belső linkek, a sitemap és a kanonikus
  // URL-ek mind a végleges (slashes) változatra mutatnak → nincs 301-hop, nem
  // szivárog link-equity, és megszűnik a +1 RTT a belső navigáción.
  trailingSlash: 'always',
  integrations: [tailwind(), sitemap(), react()],
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
