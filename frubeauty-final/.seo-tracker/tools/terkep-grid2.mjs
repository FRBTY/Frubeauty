// Térkép-rács v2 (2026-10-31): a szponzorált helyeket KISZŰRI, és kártyánként rögzíti a kategóriát + vélemény-számot.
// node terkep-grid2.mjs '["kifejezés"]' '[["pont",lat,lng],...]' kimenet.json   — 26 pontos rács: grid-2026-10-31-lezer-26pont.json
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/Bence/AppData/Local/npm-cache/_npx/381cec31605a419a/node_modules/playwright');
import fs from 'fs';
const KW = JSON.parse(process.argv[2]); const PTS = JSON.parse(process.argv[3]); const OUT = process.argv[4];
const browser = await chromium.launch({ headless: true, channel:'chrome', args:['--lang=hu-HU'] });
const ctx = await browser.newContext({ locale:'hu-HU', userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36' });
const out=[];
async function one(kw,[name,lat,lng]){
  const page=await ctx.newPage();
  await page.goto(`https://www.google.com/maps/search/${encodeURIComponent(kw)}/@${lat},${lng},14z?hl=hu&gl=hu`,{waitUntil:'domcontentloaded',timeout:45000});
  if(page.url().includes('consent.google')){await page.getByRole('button',{name:/Az összes elutasítása|Reject all/}).first().click();await page.waitForURL(/maps/,{timeout:30000});}
  try{await page.waitForSelector('div[role=feed] a.hfpxzc',{timeout:20000});}catch(e){}
  try{await page.$eval('div[role=feed]',el=>el.scrollBy(0,3000));await page.waitForTimeout(2500);}catch(e){}
  const cards=await page.$$eval('div[role=feed] a.hfpxzc',as=>as.map(a=>{const c=a.parentElement;const t=(c?c.innerText:'');const m=t.match(/(\d,\d)\s*\(([\d\s.]+)\)/);const lines=t.split('\n').map(s=>s.trim()).filter(Boolean);const cat=lines.find(l=>/·/.test(l))||'';return {name:a.getAttribute('aria-label'),ad:/Szponzorált/i.test(t),rating:m?m[1]:null,reviews:m?+m[2].replace(/\D/g,''):null,cat:cat.split('·')[0].trim().slice(0,40)}}));
  const org=cards.filter(c=>!c.ad);
  const rank=org.findIndex(c=>/fru ?beauty/i.test(c.name||''))+1;
  await page.close();
  return {kw,pt:name,lat,lng,rank,top:org.slice(0,5),ads:cards.filter(c=>c.ad).map(c=>c.name),n:org.length};
}
const jobs=[];for(const k of KW)for(const p of PTS)jobs.push([k,p]);
let i=0;async function w(){while(i<jobs.length){const [k,p]=jobs[i++];try{const r=await one(k,p);out.push(r);console.log(k,'|',p[0],'| FRU',r.rank,'| 1.',r.top[0]?.name,'(',r.top[0]?.reviews,')');}catch(e){console.log('ERR',k,p[0],String(e).slice(0,80));}}}
await Promise.all([w(),w(),w()]);
fs.writeFileSync(OUT,JSON.stringify(out,null,1));await browser.close();
