import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// Framer Motion is loaded only inside React islands (client:visible / client:load),
// so static sections stay zero-JS. See README for the islands list.
export default defineConfig({
  site: 'https://frubeauty.com',
  integrations: [tailwind(), sitemap(), react()],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    ssr: {
      noExternal: ['framer-motion'],
    },
  },
});
