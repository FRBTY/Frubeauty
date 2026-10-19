// Térkép-rács mérés (Google Maps, headless Chrome). Használat és pontok: baseline-2026-10-19-ai-terkep.json.
// node terkep-grid.mjs '["kifejezés",...]' '[["pont",lat,lng],...]' kimenet.json
// A playwright a gépen az npx-cache-ből jön; ha eltűnt: npm i -D playwright, és írd át az útvonalat.
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/Bence/AppData/Local/npm-cache/_npx/381cec31605a419a/node_modules/playwright');
import fs from 'fs';
const KW = process.argv[2] ? JSON.parse(process.argv[2]) : ['lézeres szőrtelenítés'];
const PTS = process.argv[3] ? JSON.parse(process.argv[3]) : [['Egressy (FRU)',47.5047,19.0985]];
const browser = await chromium.launch({ headless: true, channel:'chrome', args:['--lang=hu-HU'] });
const out=[];
async function one(ctx, kw, [name,lat,lng]) {
  const page = await ctx.newPage();
  const url = `https://www.google.com/maps/search/${encodeURIComponent(kw)}/@${lat},${lng},15z?hl=hu&gl=hu`;
  await page.goto(url, { waitUntil:'domcontentloaded', timeout:45000 });
  if (page.url().includes('consent.google')) {
    const b = page.getByRole('button', { name: /Az összes elutasítása|Reject all/ }).first();
    await b.click(); await page.waitForURL(/maps/, {timeout:30000});
  }
  try { await page.waitForSelector('div[role=feed] a.hfpxzc', { timeout: 20000 }); } catch(e) {}
  // görgetés egyszer, hogy top 20 meglegyen
  try { await page.$eval('div[role=feed]', el => el.scrollBy(0, 3000)); await page.waitForTimeout(2500); } catch(e){}
  const names = await page.$$eval('div[role=feed] a.hfpxzc', as => as.map(a=>a.getAttribute('aria-label')));
  const rank = names.findIndex(n => /fru ?beauty/i.test(n||'')) + 1;
  await page.close();
  return { kw, pt:name, rank, top3: names.slice(0,3), n: names.length };
}
const ctx = await browser.newContext({ locale:'hu-HU', geolocation:{latitude:47.5047, longitude:19.0985}, permissions:['geolocation'], userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36' });
const jobs=[]; for (const k of KW) for (const p of PTS) jobs.push([k,p]);
let i=0; async function worker(){ while(i<jobs.length){ const [k,p]=jobs[i++]; try{ const r=await one(ctx,k,p); out.push(r); console.log(JSON.stringify(r)); }catch(e){ console.log(JSON.stringify({kw:k,pt:p[0],err:String(e).slice(0,120)})); } } }
await Promise.all([worker(),worker(),worker()]);
fs.writeFileSync(process.argv[4]||'grid-out.json', JSON.stringify(out,null,1));
await browser.close();
