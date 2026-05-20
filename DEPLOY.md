# Deploy to Netlify

All PageSpeed optimizations are committed in the source. Run the build locally then deploy.

## Option A – Local build + Netlify drag-and-drop (leggyorsabb)

```bash
cd frubeauty-final
npm run build
```

Then open https://app.netlify.com/sites/<your-site>/deploys  
and drag the generated **`dist/`** folder into the browser.

## Option B – Netlify CLI

```bash
npm install -g netlify-cli
cd frubeauty-final
netlify deploy --build --prod
```

---

## What changed (PageSpeed fixes)

| File | Change |
|---|---|
| `astro.config.mjs` | `inlineStylesheets: 'always'` — CSS inline, render-blocking link eliminated |
| `src/pages/index.astro` | Hero H1 uses `class="hero-reveal"` CSS animation instead of `<Reveal client:load>` (which SSR'd `opacity:0`) |
| `src/pages/index.astro` | `AnnouncementBar` + `CookieBanner` → `client:idle` |
| `src/pages/index.astro` | `MagneticCTA` → `client:visible` |
| `src/components/HeroMedia.tsx` | Hero poster: plain `<img>` with `fetchPriority="high" decoding="sync" width height` (was `motion.img` with parallax transform) |
| `src/layouts/Layout.astro` | CSS `@keyframes heroFadeUp` + `.hero-reveal`, `@keyframes zeroJsFade` + `.zero-js-fade` |
| `netlify.toml` | Cache-Control headers for `/img/*` and `/media/*` |
