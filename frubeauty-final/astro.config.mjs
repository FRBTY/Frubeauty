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

// Reszponziv tablak: minden markdown-tablat vizszintesen gorgetheto kontenerbe
// csomagolunk, hogy mobilon SOHA ne csorduljon tul a lap (a szeles ar-/osszehasonlito
// tablak a konteneren belul gorgethetok). A 4+ oszlopos tablaknak min-width-et adunk,
// hogy ne zsufolodjanak ossze, hanem olvashato oszlopszelesseggel gorogjenek.
function rehypeResponsiveTables() {
  const isEl = (n, tag) => n && n.type === 'element' && (!tag || n.tagName === tag);
  const firstRowCols = (table) => {
    const findTr = (node) => {
      if (!node.children) return null;
      for (const c of node.children) {
        if (isEl(c, 'tr')) return c;
        const nested = findTr(c);
        if (nested) return nested;
      }
      return null;
    };
    const tr = findTr(table);
    if (!tr) return 0;
    return tr.children.filter((c) => isEl(c, 'th') || isEl(c, 'td')).length;
  };
  return (tree) => {
    const walk = (node) => {
      if (!Array.isArray(node.children)) return;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (isEl(child, 'table') && !child.__wrapped) {
          child.__wrapped = true;
          const cols = firstRowCols(child);
          if (cols >= 4) {
            child.properties = child.properties || {};
            const prev = child.properties.style ? `${child.properties.style};` : '';
            child.properties.style = `${prev}min-width:${cols * 7}rem`;
          }
          node.children[i] = {
            type: 'element',
            tagName: 'div',
            properties: { className: ['table-wrap'] },
            children: [child],
          };
          walk(child); // a tabla belsejet bejarjuk (nincs benne beagyazott tabla)
        } else {
          walk(child);
        }
      }
    };
    walk(tree);
  };
}

// Markdown-beli KULSO linkek rel/target kiegeszitese. A markdown-renderer csupasz
// <a href="https://...">-t ad: se rel, se target. Ket kovetkezmenye volt (Ahrefs-
// audit, 2026-07-31): (1) a cikkekbol indulo ~5 Notino-foglalasi link jeloletlen
// maradt, holott sitewide kereskedelmi partnerrol van szo → `sponsored`; (2) minden
// kulso link `noopener` nelkul nyilt. A .astro oldalak <a>-jait a config/site.ts
// relFor() kezeli — ez a plugin ugyanazt a szabalyt viszi a markdownra, hogy uj
// cikk irasakor ne kelljen kezzel emlekezni ra.
function rehypeExternalLinkRel() {
  return (tree) => {
    const walk = (node) => {
      if (!Array.isArray(node.children)) return;
      for (const child of node.children) {
        if (child.type === 'element' && child.tagName === 'a') {
          const href = String(child.properties?.href ?? '');
          if (/^https?:\/\//.test(href)) {
            child.properties = child.properties || {};
            child.properties.target = '_blank';
            child.properties.rel = href.includes('notino.hu')
              ? 'noopener sponsored'
              : 'noopener';
          }
        }
        walk(child);
      }
    };
    walk(tree);
  };
}

// GYIK-akkordeon: a cikkek „Gyakori kerdesek" szekciojat build idoben <details>
// elemekke alakitja. A valasz szovege zart allapotban is a HTML-ben marad, igy a
// Google es az AI-asszisztensek ugyanazt olvassak, mint eddig; a FAQPage-schema
// a blog/[...slug].astro-ban a markdown-torzsbol keszul, ehhez nem nyul.
// Ket forrasformatumot ismer:
//   A) **Kerdes?** + valasz ugyanabban a bekezdesben (a cikkek tobbsege)
//   B) ### Kerdes? + a kovetkezo EGY blokk a valasz (lezer-arcikk)
// A kerdesnek nem minosulo bekezdes (pl. a zaro „Idopontot ... foglalhatsz") a
// csoporton kivul marad. A mozgast a blog-oldal szkriptje adja; JS nelkul a natív
// <details> mukodik.
function rehypeFaqAccordion() {
  const isEl = (n, tag) => n && n.type === 'element' && (!tag || n.tagName === tag);
  const textOf = (n) =>
    n.type === 'text' ? n.value : Array.isArray(n.children) ? n.children.map(textOf).join('') : '';
  const isWs = (n) => n.type === 'text' && !n.value.trim();
  const FAQ_H2 = /^(gyakori kérdések|gyik|kérdések)/i;

  const item = (questionChildren, answerBlocks) => ({
    type: 'element',
    tagName: 'details',
    properties: { className: ['faq-item'] },
    children: [
      {
        type: 'element',
        tagName: 'summary',
        properties: { className: ['faq-q'] },
        children: [
          { type: 'element', tagName: 'span', properties: { className: ['faq-qt'] }, children: questionChildren },
          { type: 'element', tagName: 'span', properties: { className: ['faq-icon'], ariaHidden: 'true' }, children: [] },
        ],
      },
      {
        type: 'element',
        tagName: 'div',
        properties: { className: ['faq-a'] },
        children: [{ type: 'element', tagName: 'div', properties: { className: ['faq-a-inner'] }, children: answerBlocks }],
      },
    ],
  });

  // A) formatum: <p><strong>Kerdes?</strong>\nValasz…</p>
  const fromStrongParagraph = (p) => {
    const kids = p.children.filter((c) => !isWs(c));
    const first = kids[0];
    if (!isEl(first, 'strong') || !textOf(first).trim().endsWith('?')) return null;
    const rest = p.children.slice(p.children.indexOf(first) + 1);
    while (rest.length && (isWs(rest[0]) || isEl(rest[0], 'br'))) rest.shift();
    if (rest[0] && rest[0].type === 'text') rest[0] = { ...rest[0], value: rest[0].value.replace(/^\s+/, '') };
    if (!rest.length) return null;
    return item(first.children, [{ type: 'element', tagName: 'p', properties: {}, children: rest }]);
  };

  return (tree) => {
    const out = [];
    let inFaq = false;
    let group = null;
    const closeGroup = () => {
      if (group) out.push(group);
      group = null;
    };
    const pushItem = (it) => {
      if (!group) group = { type: 'element', tagName: 'div', properties: { className: ['faq-acc'] }, children: [] };
      group.children.push(it);
    };
    const nodes = tree.children;
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (isEl(n, 'h2')) {
        closeGroup();
        inFaq = FAQ_H2.test(textOf(n).trim());
        out.push(n);
        continue;
      }
      if (!inFaq || isWs(n)) {
        if (!isWs(n)) closeGroup();
        out.push(n);
        continue;
      }
      if (isEl(n, 'p')) {
        const it = fromStrongParagraph(n);
        if (it) { pushItem(it); continue; }
      }
      if (isEl(n, 'h3') && textOf(n).trim().endsWith('?')) {
        let j = i + 1;
        while (j < nodes.length && isWs(nodes[j])) j++;
        const ans = nodes[j];
        if (ans && (isEl(ans, 'p') || isEl(ans, 'ul') || isEl(ans, 'ol'))) {
          pushItem(item(n.children, [ans]));
          i = j;
          continue;
        }
      }
      closeGroup();
      out.push(n);
    }
    closeGroup();
    tree.children = out;
  };
}

export default defineConfig({
  site: 'https://frubeauty.com',
  markdown: {
    rehypePlugins: [rehypeResponsiveTables, rehypeExternalLinkRel, rehypeFaqAccordion],
  },
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
