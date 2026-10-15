import { useEffect, useMemo, useRef, useState } from 'react';
import { track } from '../../lib/track';
import { siteConfig, relFor } from '../../config/site';
import { areaCatalog, areaGroups, zones } from '../../data/lezer';
import {
  kalkulal, areaAr, percSzoveg, foglalasiJegyzet, gyujtotetelKell,
  notinoTetel, notinoUtvonal, NOTINO_KOMBINALT,
} from '../../lib/lezerArazas';
import { useVagolap } from './useVagolap';

/**
 * „Állítsd össze a sajátodat” — szabadon kombinálható területválasztó.
 *
 * MIÉRT VAN: egy vendég azt írta (2026-09-20), hogy több területet szeretne, és
 * nincs olyan csomag, amiben mind benne van. Addig az oldal három kész csomagot
 * és négy párost kínált — aki ezeken kívül esett, nem kapott árat, csak annyit,
 * hogy „az első alkalom elején megmondom”. Vagyis az utolsó nyitott kérdéssel
 * („mennyi lesz NEKEM?”) kellett elnavigálnia.
 *
 * A HELYE: az árlista LEGVÉGÉN, a kész csomagok és a gyakori párosok UTÁN. A
 * sorrend szándékos — a legtöbb vendégnek a kész csomag a jó válasz, és ha az
 * összerakós felület van elöl, munkát adunk neki döntés helyett. Ez a szekció
 * annak szól, aki a kész válaszok közt nem találta meg magát.
 *
 * AZ ÁR NEM ITT SZÜLETIK: a `lib/lezerArazas.ts` motorja számolja, ugyanabból
 * a szabályból, amiből a csomagárak. Ez a komponens csak megjeleníti.
 */

// `useGrouping: 'always'` kell: a hu-HU alapértelmezés négyjegyű számnál NEM
// tagol („7000 Ft”), az oldal minden más ára viszont tagolva van („7 000 Ft”).
// Egy kalkulátorban, ami az árlista mellett áll, ez azonnal feltűnik.
const HUF = new Intl.NumberFormat('hu-HU', { maximumFractionDigits: 0, useGrouping: 'always' });
const ft = (n: number) => `${HUF.format(n)} Ft`;

/** Határozott névelő a következő szóhoz. Enélkül „a(z)”-t kellene írni, ami
    űrlapnyelv — a listában van magánhangzóval kezdődő terület is (arc oldala,
    alkar, áll), tehát a fix „a” sem lenne jó. */
const nevelo = (szo: string) =>
  'aáeéiíoóöőuúüű'.includes(szo.trim()[0]?.toLowerCase() ?? '') ? 'az' : 'a';

/** A katalógus címkéi nagybetűvel kezdődnek — mondat közepén ez kiabálásnak
    látszik, mondat elején viszont kell a nagybetű. */
const kis = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const nagy = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const zonaPerc = new Map(zones.map((z) => [z.tag, z.maxMinutes]));

export function AreaBuilder() {
  const [valasztott, setValasztott] = useState<string[]>([]);

  /** Amit egy kiválasztott nagyobb terület már tartalmaz — ezeket kivesszük a
      játékból, hogy ne lehessen kétszer kifizetni ugyanazt a bőrfelületet. */
  const letiltott = useMemo(() => {
    const s = new Set<string>();
    for (const id of valasztott) {
      areaCatalog.find((a) => a.id === id)?.covers?.forEach((c) => s.add(c));
    }
    return s;
  }, [valasztott]);

  const kalk = useMemo(() => kalkulal(valasztott), [valasztott]);

  // GA4 (2026-09-29): oldalanként EGYSZER, az első pipálásnál — azt mérjük, hányan
  // kezdik el összeállítani a saját kezelésüket, nem a kattintások számát.
  const elsoJelzes = useRef(false);
  useEffect(() => {
    if (!elsoJelzes.current && valasztott.length > 0) {
      elsoJelzes.current = true;
      track('lezer_area_builder_use', { areas: valasztott.length });
    }
  }, [valasztott]);

  /** Amit a motor összevont — a listában is jelöljük, ne csak az összegzésben. */
  const beolvadt = useMemo(() => {
    const m = new Map<string, string>();
    kalk?.osszevonasok.forEach((o) => o.children.forEach((c) => m.set(c.id, o.parent.label)));
    return m;
  }, [kalk]);

  const kapcsol = (id: string) =>
    setValasztott((elozo) => {
      if (elozo.includes(id)) return elozo.filter((x) => x !== id);
      const terulet = areaCatalog.find((a) => a.id === id)!;
      // Ha nagyobb területet pipált be, a benne lévő kisebbek kikerülnek.
      const tisztitott = terulet.covers ? elozo.filter((x) => !terulet.covers!.includes(x)) : elozo;
      return [...tisztitott, id];
    });

  const hosszu = (kalk?.perc ?? 0) >= 150;
  /** A Notino gyűjtőtételét kell-e foglalni. Nem egyszerűen „egynél több
      terület”: a katalógus 27 területéből csak hatnak van saját Notino-tétele,
      a többi egyedül is a gyűjtőtételen megy. */
  const kombinalt = kalk ? gyujtotetelKell(kalk) : false;

  const { masolva, kezi, masol } = useVagolap();
  const jegyzet = kalk ? foglalasiJegyzet(kalk) : '';

  /**
   * Az aktuális állás átadása az oldal alján futó ragadós foglalás-sávnak.
   *
   * MIÉRT ESEMÉNNYEL, ÉS NEM KÖZÖS ÁLLAPOTTAL: a `StickyBookBar` szándékosan
   * statikus .astro, nem sziget — így a benne lévő Notino-link már az első
   * `decorate()` futáskor a DOM-ban van, és a kampány-attribúció garantált.
   * Ha közös React-állapotba emelnénk, pont ezt veszítenénk el. Az esemény
   * egyirányú: mi küldjük, a sáv írja a szövegét, és semmi nem jön vissza.
   *
   * Üres kiválasztásnál `null`-t küldünk, amitől a sáv visszaáll az eredeti,
   * szerver-oldalon renderelt szövegére.
   */
  useEffect(() => {
    const kuld = (detail: unknown) =>
      window.dispatchEvent(new CustomEvent('lezer:valasztas', { detail }));

    kuld(
      kalk && {
        eyebrow: `${kalk.areas.length} terület · ${percSzoveg(kalk.perc)}`,
        price: `${ft(kalk.perAlkalom)} / alkalom`,
        hint: `A Notinón: ${notinoUtvonal(kalk)}`,
      },
    );

    // Kilépéskor a sáv ne ragadjon be egy elnavigált oldal árán.
    return () => {
      kuld(null);
    };
  }, [kalk]);

  return (
    <div>
      {/* A saját, FELÜL ragadó mobil sávja 2026-09-21-én KIKERÜLT: az oldal alján
          amúgy is ott ül a `StickyBookBar`, és az a tulajdonos kérésére mostantól
          az élő árat mutatja. Két sáv ugyanazzal a számmal csak zaj lett volna.
          A táplálás a fenti `useEffect`-ben van. */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* ── A pipálható lista ───────────────────────────────────────────── */}
        <div className="lg:col-span-7 space-y-8">
          {areaGroups.map((csoport) => (
            <fieldset key={csoport} className="border-0 p-0 m-0">
              <legend className="text-[11px] uppercase tracking-caps text-gold mb-3.5 px-0">
                {csoport}
              </legend>
              <div className="divide-y divide-whisper border-y border-whisper">
                {areaCatalog
                  .filter((a) => a.group === csoport)
                  .map((a) => {
                    const be = valasztott.includes(a.id);
                    const tiltott = letiltott.has(a.id);
                    const beolvadtIde = beolvadt.get(a.id);
                    return (
                      <label
                        key={a.id}
                        className={`flex items-start gap-3.5 py-3.5 transition-colors duration-200 ${
                          tiltott ? 'opacity-45 cursor-not-allowed' : 'cursor-pointer hover:bg-white/[0.02]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={be && !tiltott}
                          disabled={tiltott}
                          onChange={() => kapcsol(a.id)}
                        />
                        <span
                          aria-hidden
                          className={`mt-0.5 flex-shrink-0 w-[19px] h-[19px] rounded-[6px] border inline-flex items-center justify-center transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-gold/70 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ink ${
                            be && !tiltott ? 'border-gold bg-gold text-ink' : 'border-whisperStrong text-transparent'
                          }`}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className={`block text-[15px] leading-snug ${be && !tiltott ? 'text-cream' : 'text-creamSoft'}`}>
                            {a.label}
                          </span>
                          {tiltott && (
                            <span className="block mt-0.5 text-[12px] text-creamMute leading-snug">
                              már benne van a nagyobb területben
                            </span>
                          )}
                          {!tiltott && beolvadtIde && (
                            <span className="block mt-0.5 text-[12px] text-goldSoft leading-snug">
                              {beolvadtIde}ként számolom — úgy olcsóbb
                            </span>
                          )}
                          {!tiltott && !beolvadtIde && a.hint && (
                            <span className="block mt-0.5 text-[12px] text-creamMute leading-snug">{a.hint}</span>
                          )}
                        </span>

                        <span className="flex-shrink-0 text-right">
                          <span className="block font-display text-[15px] text-creamSoft tabular-nums whitespace-nowrap">
                            {ft(areaAr(a))}
                          </span>
                          <span className="block text-[11px] text-creamMute whitespace-nowrap">
                            {a.zone} · {zonaPerc.get(a.zone)} perc
                          </span>
                        </span>
                      </label>
                    );
                  })}
              </div>
            </fieldset>
          ))}

          {/* HANGNEM: a mondat második fele („Ha többet raksz össze, kevesebb
              lesz”) harmadszor mondta el ugyanazt a mechanizmust — az összegzés
              üres állapota már elmondja. Ami maradt, az tényközlés: mit jelent a
              sorok melletti szám. */}
          <p className="text-[12px] text-creamMute leading-relaxed max-w-[58ch]">
            A területek melletti ár az önálló sorozat alkalmankénti ára.
          </p>
        </div>

        {/* ── Az összegzés ────────────────────────────────────────────────── */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="rounded-3xl bg-inkDeep ring-1 ring-gold/30 p-6 sm:p-7">
            {!kalk ? (
              <>
                {/* HANGNEM: itt előbb a szekció bevezetője ismétlődött szó
                    szerint („Pipáld ki, ami zavar”), utána az ígéret („rögtön
                    látod”), végül egy „kapod” — mind a három szabályba ütközött.
                    Ami maradt: EGYSZER, kijelentő módban, hogy mitől lesz
                    kevesebb. Ez az egyetlen dolog, amit a panel üresen tud. */}
                <p className="text-[11px] uppercase tracking-caps text-gold mb-4">A te összeállításod</p>
                <p className="font-display font-light text-cream leading-[1.2]" style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.6rem)' }}>
                  Több terület, <em className="display">egy időpont</em>.
                </p>
                <p className="mt-4 text-[14px] text-creamSoft leading-[1.75]">
                  Ettől lesz kevesebb az ár: a fogadás, a bőrtípus-beállítás és a dokumentációs fotó alkalmanként
                  egyszer van, nem területenként.
                </p>
              </>
            ) : (
              <>
                <p className="text-[11px] uppercase tracking-caps text-gold mb-4">
                  {kalk.nev ? 'Ez egy kész ajánlat' : 'A te összeállításod'}
                </p>

                <h4 className="font-display font-light text-cream leading-[1.2]" style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)' }}>
                  {kalk.nev ?? kalk.areas.map((a) => a.label).join(' + ')}
                </h4>

                {kalk.nev && (
                  <p className="mt-2 text-[13px] text-creamMute leading-snug">
                    {kalk.areas.map((a) => a.label).join(' + ')}
                  </p>
                )}

                <div className="mt-6 pt-5 border-t border-whisperStrong">
                  <p className="font-display text-4xl font-medium tracking-tight text-gold tabular-nums">
                    {ft(kalk.perAlkalom)}
                    <span className="text-base text-creamMute font-normal font-sans"> / alkalom</span>
                  </p>
                  <p className="mt-2 text-[15px] text-creamSoft">
                    Hat alkalom összesen: <span className="text-cream tabular-nums">{ft(kalk.hatAlkalom)}</span>
                  </p>
                  {kalk.megtakaritasPerAlkalom > 0 && (
                    <p className="mt-1 text-[13px] text-creamMute">
                      Külön-külön, külön időpontokban:{' '}
                      <span className="line-through tabular-nums">{ft(kalk.tetelesPerAlkalom)}</span> / alkalom
                    </p>
                  )}
                </div>

                {kalk.megtakaritasPerAlkalom > 0 && (
                  <div className="mt-4">
                    <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-caps font-medium bg-gold/15 text-goldSoft border border-goldSoft/30 px-3 py-1.5 rounded-full">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {ft(kalk.megtakaritasHat)} megtakarítás
                    </span>
                  </div>
                )}

                {/* HANGNEM (3. szabály): itt volt egy „Most fizetendő — 0 Ft”
                    cella is. A kockázatoldás három állítása az oldalon amúgy is
                    hatszor szerepel — 2026-09-15-én pont ezért törölted a
                    `RiskReversal` blokkot. Ez lett volna a hetedik. */}
                <dl className="mt-6">
                  <div className="border-t border-whisper pt-3.5">
                    <dt className="text-[11px] uppercase tracking-caps text-creamMute">Egy alkalom hossza</dt>
                    <dd className="mt-1 font-display text-lg text-cream">~{percSzoveg(kalk.perc)}</dd>
                  </div>
                </dl>

                {/* Amit a motor magától jobbra igazított — ki kell mondani, mert a
                    vendég mást pipált ki, mint amit számolunk (és kevesebbet fizet). */}
                {kalk.osszevonasok.map((o) => (
                  <p key={o.parent.id} className="mt-5 text-[13px] text-creamSoft leading-[1.7] border-l-2 border-gold/40 pl-3.5">
                    {nagy(o.children.map((c) => kis(c.label)).join(' és '))} együtt = {kis(o.parent.label)}. Így
                    számolom, mert úgy {ft(o.children.reduce((s, c) => s + areaAr(c), 0) - areaAr(o.parent))}-tal
                    olcsóbb alkalmanként.
                  </p>
                ))}

                {/* Egy darab hiányzik a nagyobb, olcsóbb területhez. Ezt a vendég
                    nem tudhatja — ha elhallgatjuk, többet fizet kevesebbért.

                    HANGNEM: itt „válaszd inkább a teljes arc területet” állt —
                    felszólítás a vendég döntésére. Most kijelentés. A tárgyeset
                    gépi képzése SZÁNDÉKOSAN nincs benne: a birtokos alakokból
                    („szemöldök köze” → „közét”, „felső ajak” → „ajkat”) egy
                    naiv „+t” hibás szót gyártana, ezért a mondat alanyesetű. */}
                {kalk.tippek.map((t) => (
                  <p key={t.parent.id} className="mt-5 text-[13px] text-creamSoft leading-[1.7] border-l-2 border-gold/40 pl-3.5">
                    Ha {nevelo(t.missing.label)} {kis(t.missing.label)} is érdekel, {nevelo(t.parent.label)}{' '}
                    <span className="text-cream">{kis(t.parent.label)}</span> jön ki olcsóbbnak: nagyobb felület,{' '}
                    {ft(areaAr(t.parent))} alkalmanként.
                  </p>
                ))}

                {hosszu && (
                  <p className="mt-5 text-[13px] text-creamSoft leading-[1.7] border-l-2 border-whisperStrong pl-3.5">
                    Ez hosszú időpont. Ha kényelmesebb, kétfelé osztjuk, ugyanezen az áron.
                  </p>
                )}

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href={siteConfig.booking}
                    target="_blank"
                    rel={relFor(siteConfig.booking)}
                    className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[12px] uppercase tracking-caps font-medium bg-gold text-ink hover:bg-goldSoft active:scale-[0.97] transition-colors duration-200"
                  >
                    Időpontot foglalok
                  </a>
                  {kombinalt && (
                    <button
                      type="button"
                      onClick={() => masol(jegyzet)}
                      className="inline-flex items-center gap-2 rounded-full border border-whisperStrong px-5 py-3 text-[12px] uppercase tracking-caps text-cream hover:bg-white/5 transition-colors"
                    >
                      {masolva ? (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Kimásolva
                        </>
                      ) : (
                        'Másolom a listát'
                      )}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setValasztott([])}
                    className="text-[12px] uppercase tracking-caps text-creamMute hover:text-cream transition-colors px-3 py-2"
                  >
                    Törlöm
                  </button>
                </div>

                {/* Ha a vágólap nem megy (nem biztonságos kontextus, letiltott
                    engedély, régi mobil böngésző), a vendég ne maradjon üres
                    kézzel: itt kijelölhetően megkapja ugyanazt a szöveget. */}
                {kezi && (
                  <div className="mt-4">
                    <label className="block text-[11px] uppercase tracking-caps text-creamMute mb-2">
                      Jelöld ki és másold
                    </label>
                    <textarea
                      readOnly
                      rows={3}
                      value={jegyzet}
                      onFocus={(e) => e.currentTarget.select()}
                      className="w-full rounded-xl bg-ink border border-whisperStrong p-3 text-[13px] text-creamSoft leading-[1.6] resize-none focus:outline-none focus:border-gold/60"
                    />
                  </div>
                )}

                {/* A foglalási lánc utolsó lépése. A Notinón egyetlen tételre sem
                    lehet közvetlenül linkelni, tehát meg kell mondani, mit keressen
                    — kombinációnál pedig azt is, hogy az idősávot mi állítjuk be. */}
                <p className="mt-5 text-[13px] text-creamSoft leading-[1.7] border-l-2 border-gold/40 pl-3.5">
                  {kombinalt ? (
                    <>
                      A Notinón ezt foglald: <span className="text-cream">{NOTINO_KOMBINALT}</span>, és illeszd be a
                      megjegyzésbe a kimásolt listát. Az idősávot — ~{percSzoveg(kalk.perc)} — én állítom be.
                    </>
                  ) : (
                    <>
                      A Notinón ezt foglald: <span className="text-cream">{notinoTetel(kalk)}</span>.
                    </>
                  )}
                </p>

                {/* HANGNEM: „Alkalmanként fizetsz” volt itt — a jegyzetben
                    kifejezetten tiltott parancsoló ragozás; a jóváhagyott alak
                    a „fizeted”. Az egészségügyi előszűrés mondata pedig kikerült:
                    a kvíz panelje alatt és a menet-szekcióban is ott van, és a
                    foglalás gombja úgyis az előszűrőt nyitja. */}
                <p className="mt-4 text-[12px] text-creamMute leading-relaxed">
                  Alkalmanként fizeted, a helyszínen.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AreaBuilder;
