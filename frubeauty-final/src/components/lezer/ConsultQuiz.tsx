import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { siteConfig, relFor } from '../../config/site';
import { pairs, packages } from '../../data/lezer';

/**
 * „A konzultáció” — a V4 variáns motorja (a név a szerkezetre utal, nem szolgáltatásra).
 *
 * A MARKETING-DÖNTÉS: a látogatónak két kérdése van, és egyikre sem válaszol egy
 * árlista. „Működik-e RAJTAM?” és „mennyi lesz NEKEM?”. Amíg ezek nyitva vannak,
 * nem foglal — ír egy üzenetet, vagy elmegy. Ez a blokk mindkettőt lezárja
 * három koppintás alatt (L29 súrlódás, L26 kérdés, L12 USP).
 *
 * A LEGFONTOSABB DÖNTÉS, amit nem szabad „optimalizálni”: ősz/fehér szálnál a
 * panel azt írja ki, hogy NE költsön erre, és nem ajánl foglalást. Ösztön ellen
 * való, de ez az egész oldal hitelesítő mozdulata — és üzletileg is ez a jó:
 * az a vendég úgyis visszakérné a pénzét a harmadik alkalom után.
 *
 * ÁRLOGIKA: kizárólag DOKUMENTÁLT árakkal dolgozik. Az összevont csomagárak a
 * `data/lezer.ts` csomag- és páros-listájából jönnek; ha a kiválasztás nem
 * egyezik egyikkel sem, a panel a tételes összeget mutatja, és kiírja, hogy egy
 * időpontban kedvezmény jár. Új árat NEM számol ki magának.
 */

const HUF = new Intl.NumberFormat('hu-HU', { maximumFractionDigits: 0 });
const MONTHS = ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'];

type HairId = 'sotet' | 'kozepes' | 'vilagos' | 'osz';

const HAIRS: { id: HairId; label: string; hint: string }[] = [
  { id: 'sotet', label: 'Fekete vagy sötétbarna', hint: 'vastag, jól látszik' },
  { id: 'kozepes', label: 'Sötétszőke vagy világosbarna', hint: 'közepesen erős' },
  { id: 'vilagos', label: 'Világosszőke vagy vörös', hint: 'halvány, vékony' },
  { id: 'osz', label: 'Ősz vagy fehér', hint: 'nincs benne szín' },
];

/**
 * A `minutes` a zóna FELSŐ kezelési ideje a lezer.ts árlistájából (XS 15,
 * S 20, M 30, L 45, XL 70), nem becsült átlag. Korábban közép-értékek voltak
 * itt, és pont ez vitt félre a Notino-időpontok felvitelénél: a kvíz rövidebb
 * időt mutatott, mint amennyit a foglalás valójában lefoglal.
 */
const AREAS = [
  { id: 'felso-ajak', label: 'Felső ajak', price: 7000, minutes: 15 },
  { id: 'all', label: 'Áll', price: 7000, minutes: 15 },
  { id: 'honalj', label: 'Hónalj', price: 11000, minutes: 20 },
  { id: 'bikinivonal', label: 'Bikinivonal', price: 11000, minutes: 20 },
  { id: 'alkar', label: 'Alkar', price: 16000, minutes: 30 },
  { id: 'has', label: 'Has', price: 16000, minutes: 30 },
  { id: 'labszar', label: 'Lábszár', price: 23000, minutes: 45 },
  { id: 'teljes-lab', label: 'Teljes láb', price: 33000, minutes: 70 },
] as const;

type AreaId = (typeof AREAS)[number]['id'];

/**
 * Összevont árak. A SZÁM NEM ITT ÉL: a lezer.ts `pairs` és `packages`
 * listájából olvassuk ki, név szerint. A korábbi változat kézzel átmásolt
 * számokat tartott, és a 2026-09-13-i árkorrekciónál némán elavult volna —
 * a kvíz a régi árat mutatta volna az árlista mellett.
 *
 * Ha egy név elcsúszik, a `huf()` dob: a build hangosan elszáll, nem csendben
 * hazudik egy rossz árat.
 */
const huf = (cimke: string | undefined, honnan: string) => {
  const n = Number((cimke ?? '').replace(/\D/g, ''));
  if (!n) throw new Error(`ConsultQuiz: nincs ár ehhez a tételhez: ${honnan}`);
  return n;
};
const parAr = (nev: string) => huf(pairs.find((x) => x.name === nev)?.per, nev);
const csomagAr = (cim: string) =>
  huf(packages.find((x) => `${x.title} ${x.titleAccent}` === cim)?.perVisit, cim);

const COMBOS: { ids: AreaId[]; price: number; name: string }[] = [
  { ids: ['felso-ajak', 'all'], price: parAr('Felső ajak + áll'), name: 'Felső ajak + áll' },
  { ids: ['honalj', 'bikinivonal'], price: parAr('Hónalj + bikinivonal'), name: 'Hónalj + bikinivonal' },
  { ids: ['bikinivonal', 'labszar'], price: parAr('Bikinivonal + lábszár'), name: 'Bikinivonal + lábszár' },
  { ids: ['teljes-lab', 'honalj'], price: parAr('Teljes láb + hónalj'), name: 'Teljes láb + hónalj' },
  { ids: ['honalj', 'bikinivonal', 'labszar'], price: csomagAr('Sima Nyár'), name: 'Sima Nyár csomag' },
  { ids: ['honalj', 'bikinivonal', 'teljes-lab', 'alkar', 'felso-ajak'], price: csomagAr('Tetőtől Talpig'), name: 'Tetőtől Talpig csomag' },
];

const sameSet = (a: string[], b: string[]) =>
  a.length === b.length && [...a].sort().join('|') === [...b].sort().join('|');

export function ConsultQuiz() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [hair, setHair] = useState<HairId | null>(null);
  const [areas, setAreas] = useState<AreaId[]>([]);

  const toggle = (id: AreaId) =>
    setAreas((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const result = useMemo(() => {
    if (!hair || areas.length === 0) return null;

    const picked = AREAS.filter((a) => areas.includes(a.id));
    const itemised = picked.reduce((s, a) => s + a.price, 0);
    // A lefoglalt sáv: a zónák felső kezelési ideje + EGYSZER 10 perc ráhagyás
    // (fogadás, Fitzpatrick-beállítás, fotó). Ez a képlet adja vissza pontosan
    // a Notinón felvitt időtartamokat — a hónalj 30, a Sima Nyár 95, a Tetőtől
    // Talpig 165 percet. A ráhagyás alkalmanként egyszer van, nem zónánként.
    const minutes = picked.length ? picked.reduce((s, a) => s + a.minutes, 0) + 10 : 0;
    const combo = COMBOS.find((c) => sameSet(c.ids, areas));
    const perVisit = combo ? combo.price : itemised;
    const total = perVisit * 6;

    // Befejezés: 6 alkalom, 5 hetes átlagos közökkel.
    const finish = new Date();
    finish.setDate(finish.getDate() + 5 * 7 * 5);

    return {
      picked, itemised, minutes, combo, perVisit, total,
      finishLabel: `${MONTHS[finish.getMonth()]} ${finish.getFullYear()}`,
      saving: combo ? itemised - combo.price : 0,
    };
  }, [hair, areas]);

  const verdict = hair === 'osz' ? 'no' : hair === 'vilagos' ? 'maybe' : 'yes';

  const steps = [
    {
      key: 'hair',
      q: 'Milyen a szőrszálad színe azon a területen?',
      sub: 'Ez dönti el, hogy működni fog-e: a lézer a szálban lévő festéket keresi.',
    },
    {
      key: 'area',
      q: 'Melyik terület zavar?',
      sub: 'Többet is választhatsz — ha egy időpontba összerakjuk, olcsóbb és kevesebb utazás.',
    },
    { key: 'result', q: '', sub: '' },
  ];

  const canNext = step === 0 ? hair !== null : areas.length > 0;

  return (
    <div className="rounded-[28px] border border-whisperStrong bg-inkDeep/80 backdrop-blur-[2px] overflow-hidden">
      {/* Haladásjelző */}
      <div className="h-1 bg-white/5">
        <div
          className="h-full bg-gold"
          style={{ width: `${((step + 1) / 3) * 100}%`, transition: reduced ? 'none' : 'width 480ms cubic-bezier(0.23,1,0.32,1)' }}
        />
      </div>

      <div className="p-6 sm:p-9">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={steps[step].key}
            initial={reduced ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: -18 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          >
            {step < 2 && (
              <>
                <p className="text-[11px] uppercase tracking-caps text-gold mb-4">
                  {step + 1} / 2
                </p>
                <h3 className="font-display font-light text-cream leading-[1.15]" style={{ fontSize: 'clamp(1.35rem, 3vw, 2rem)' }}>
                  {steps[step].q}
                </h3>
                <p className="mt-3 text-[14px] sm:text-[15px] text-creamMute leading-[1.7] max-w-[54ch]">{steps[step].sub}</p>
              </>
            )}

            {/* 1 — szálszín */}
            {step === 0 && (
              <div className="mt-7 grid sm:grid-cols-2 gap-3">
                {HAIRS.map((h) => {
                  const on = hair === h.id;
                  return (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => {
                        setHair(h.id);
                        window.setTimeout(() => setStep(1), reduced ? 0 : 220);
                      }}
                      className={`text-left rounded-2xl border px-5 py-4 transition-colors duration-300 ${
                        on ? 'border-gold bg-gold/10' : 'border-whisper hover:border-whisperStrong hover:bg-white/[0.03]'
                      }`}
                    >
                      <span className={`block text-[15px] leading-snug ${on ? 'text-cream font-medium' : 'text-creamSoft'}`}>{h.label}</span>
                      <span className="block mt-1 text-[12px] text-creamMute">{h.hint}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 2 — területek */}
            {step === 1 && (
              <div className="mt-7 flex flex-wrap gap-2.5">
                {AREAS.map((a) => {
                  const on = areas.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => toggle(a.id)}
                      aria-pressed={on}
                      className={`rounded-full border px-4 py-3 text-[14px] transition-colors duration-200 ${
                        on ? 'border-gold bg-gold text-ink font-medium' : 'border-whisper text-creamSoft hover:border-whisperStrong'
                      }`}
                    >
                      {a.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* 3 — a személyes panel */}
            {step === 2 && result && (
              <div>
                {verdict === 'no' ? (
                  <>
                    <p className="text-[11px] uppercase tracking-caps text-creamMute mb-4">A válasz ebben az esetben</p>
                    <h3 className="font-display font-light text-cream leading-[1.15]" style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.1rem)' }}>
                      Ne költs erre — <em className="display">ezen a szálon nem működik</em>.
                    </h3>
                    <p className="mt-5 text-creamSoft leading-[1.75] max-w-[58ch] text-[15px] sm:text-base">
                      Ősz és fehér szálban nincs festék, amit a lézer felmelegíthetne — nincs mit elnyelnie. Ezért erre
                      a területre nem ajánlok sorozatot.
                    </p>
                    <p className="mt-4 text-creamSoft leading-[1.75] max-w-[58ch] text-[15px] sm:text-base">
                      Ha vegyes a terület — van benne sötét szál is —, azokra a szálakra hat a kezelés.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <a href="/arckezeles-zuglo/" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-[12px] uppercase tracking-caps font-medium border border-whisperStrong text-cream hover:bg-white/5 transition-colors">
                        Amit helyette ajánlok →
                      </a>
                      <button type="button" onClick={() => { setStep(0); setHair(null); setAreas([]); }} className="text-[12px] uppercase tracking-caps text-creamMute hover:text-cream transition-colors px-3">
                        Újrakezdem
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-[11px] uppercase tracking-caps text-gold mb-4">
                      {verdict === 'maybe' ? 'Ezen a szálszínen bizonytalan' : 'Erre a szálszínre dolgozik a lézer'}
                    </p>
                    <h3 className="font-display font-light text-cream leading-[1.15]" style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.1rem)' }}>
                      {result.combo ? result.combo.name : result.picked.map((p) => p.label).join(' + ')} —{' '}
                      <em className="display">{HUF.format(result.perVisit)} Ft</em> alkalmanként.
                    </h3>

                    {verdict === 'maybe' && (
                      <p className="mt-5 text-[15px] text-creamSoft leading-[1.75] max-w-[58ch] border-l-2 border-gold/40 pl-4">
                        Világosszőke és világosvörös szálon gyengébb és nehezen kiszámítható az eredmény, ezért előre nem
                        tudok rá ígéretet tenni. Az első alkalom után már a saját szálodon látod, mire számíthatsz — és ha
                        nem éri meg, azt elmondom, mielőtt sorozatba kezdenél.
                      </p>
                    )}

                    <dl className="mt-7 grid sm:grid-cols-2 gap-x-8 gap-y-5">
                      <div className="border-t border-whisper pt-4">
                        <dt className="text-[11px] uppercase tracking-caps text-creamMute">Hat alkalom összesen</dt>
                        <dd className="mt-1.5 font-display text-2xl text-cream tabular-nums">{HUF.format(result.total)} Ft</dd>
                        <dd className="mt-1 text-[12px] text-creamMute">alkalmanként fizetve, a helyszínen</dd>
                      </div>
                      <div className="border-t border-whisper pt-4">
                        <dt className="text-[11px] uppercase tracking-caps text-creamMute">Egy alkalom hossza</dt>
                        <dd className="mt-1.5 font-display text-2xl text-cream tabular-nums">~{result.minutes} perc</dd>
                        <dd className="mt-1 text-[12px] text-creamMute">egy időpontban, nem többen</dd>
                      </div>
                      <div className="border-t border-whisper pt-4">
                        <dt className="text-[11px] uppercase tracking-caps text-creamMute">Mikorra lesz kész</dt>
                        <dd className="mt-1.5 font-display text-2xl text-cream">{result.finishLabel}</dd>
                        <dd className="mt-1 text-[12px] text-creamMute">6 alkalom, 4–6 hetes közökkel</dd>
                      </div>
                      <div className="border-t border-whisper pt-4">
                        <dt className="text-[11px] uppercase tracking-caps text-creamMute">Most fizetendő</dt>
                        <dd className="mt-1.5 font-display text-2xl text-gold tabular-nums">0 Ft</dd>
                        <dd className="mt-1 text-[12px] text-creamMute">se előleg, se kártyaadat</dd>
                      </div>
                    </dl>

                    {result.combo && result.saving > 0 && (
                      <p className="mt-6 text-[14px] text-creamSoft leading-[1.7] max-w-[58ch]">
                        Külön-külön ez alkalmanként {HUF.format(result.itemised)} Ft lenne. Egy időpontban{' '}
                        <span className="text-gold">{HUF.format(result.saving)} Ft-tal kevesebb</span> — mert egy időpont,
                        nem {result.picked.length}.
                      </p>
                    )}
                    {!result.combo && result.picked.length > 1 && (
                      <p className="mt-6 text-[14px] text-creamSoft leading-[1.7] max-w-[58ch]">
                        Ez a tételes összeg. Ha ezeket egy időpontban csináljuk, kedvezmény jár rá — a hónalj és a
                        bikinivonal például együtt 18 000 Ft alkalmanként a 22 000 helyett. A te összeállításodra az
                        első alkalom elején mondom meg a pontos árat, mielőtt bármit elkezdenénk.
                      </p>
                    )}

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <a
                        href={siteConfig.booking}
                        target="_blank"
                        rel={relFor(siteConfig.booking)}
                        className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[12px] uppercase tracking-caps font-medium bg-gold text-ink hover:bg-goldSoft active:scale-[0.97] transition-colors duration-200"
                      >
                        Időpontot foglalok
                      </a>
                      <button type="button" onClick={() => { setStep(0); setHair(null); setAreas([]); }} className="text-[12px] uppercase tracking-caps text-creamMute hover:text-cream transition-colors px-3">
                        Újrakezdem
                      </button>
                    </div>
                    <p className="mt-4 text-[12px] text-creamMute leading-relaxed max-w-[58ch]">
                      A naptár előtt megkérdezek néhány dolgot az egészségedről — hogy ne az időpontodon derüljön
                      ki, ha valamit ki kell várnunk.
                    </p>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Léptetők */}
        {step < 2 && (
          <div className="mt-8 flex items-center gap-3">
            {step > 0 && (
              <button type="button" onClick={() => setStep(step - 1)} className="text-[12px] uppercase tracking-caps text-creamMute hover:text-cream transition-colors px-3 py-2">
                ← Vissza
              </button>
            )}
            <button
              type="button"
              disabled={!canNext}
              onClick={() => setStep(step + 1)}
              className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-[12px] uppercase tracking-caps font-medium transition-colors duration-200 ${
                canNext ? 'bg-gold text-ink hover:bg-goldSoft' : 'bg-white/5 text-creamMute cursor-not-allowed'
              }`}
            >
              {step === 1 ? 'Megnézem az eredményt' : 'Tovább'}
            </button>
            {step === 1 && areas.length === 0 && (
              <span className="text-[12px] text-creamMute">Válassz legalább egyet</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ConsultQuiz;
