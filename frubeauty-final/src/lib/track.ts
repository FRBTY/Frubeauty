/**
 * GA4-esemény küldése a Layout.astro gtag-stubján keresztül.
 *
 * A stub a <head>-ben definiálja a `window.gtag`-et, mielőtt bármelyik React-sziget
 * hidratálna, így a hívás akkor is biztonságos, ha a gtag.js még nem töltődött be:
 * az esemény a dataLayer-sorba kerül, és a Consent Mode V2 szerint dolgozódik fel.
 * Ha valamiért nincs gtag (pl. adblock), a hívás csendben elmarad — mérés miatt
 * soha ne törjön el a felület.
 */
export function track(event: string, params: Record<string, string | number> = {}): void {
  try {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag === 'function') w.gtag('event', event, params);
  } catch {
    /* a mérés nem akaszthatja meg a felületet */
  }
}
