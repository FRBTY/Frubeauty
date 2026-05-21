import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://frubeauty.com',
  integrations: [tailwind(), sitemap(), react()],
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    cacheDir: '/tmp/vite-fb2',
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
