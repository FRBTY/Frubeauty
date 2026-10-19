// IndexNow-jelzés deploy UTÁN: a Bing (és rajta keresztül a ChatGPT keresője és a
// Copilot) így napokon belül újraolvassa a megváltozott oldalakat, nem heteken belül.
//
// Használat (a deploy után, amikor a kulcsfájl már élesben elérhető):
//   node scripts/indexnow.mjs                 → a sitemap összes URL-je
//   node scripts/indexnow.mjs /lezeres-szortelenites-budapest/ /arckezeles-zuglo/
//
// A kulcs nem titok: az IndexNow-protokoll szerint nyilvánosan, a domain gyökerében
// kell elérhetőnek lennie (public/<kulcs>.txt), ebből igazolja a tulajdonjogot.

const HOST = 'frubeauty.com';
const KEY = '447cf6937e0119f2955f0ae5ac426fb9';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP = `https://${HOST}/sitemap-0.xml`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function urlsFromSitemap() {
  const res = await fetch(SITEMAP);
  if (!res.ok) throw new Error(`A sitemap nem olvasható: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function assertKeyIsLive() {
  const res = await fetch(KEY_LOCATION);
  const body = res.ok ? (await res.text()).trim() : '';
  if (body !== KEY) {
    throw new Error(`A kulcsfájl még nincs élesben (${KEY_LOCATION}) — előbb deployolj.`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const urls = args.length
    ? args.map((p) => new URL(p, `https://${HOST}`).href)
    : await urlsFromSitemap();

  await assertKeyIsLive();

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls }),
  });

  // 200 = fogadva, 202 = fogadva, a kulcs ellenőrzése folyamatban.
  if (res.status !== 200 && res.status !== 202) {
    throw new Error(`IndexNow hiba: ${res.status} ${await res.text()}`);
  }
  process.stdout.write(`IndexNow: ${urls.length} URL elküldve (${res.status}).\n`);
}

main().catch((err) => {
  process.stderr.write(`${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
