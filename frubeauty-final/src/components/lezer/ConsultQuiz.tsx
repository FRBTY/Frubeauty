import { useEffect, useMemo, useRef, useState } from 'react';
import { track } from '../../lib/track';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { siteConfig, relFor } from '../../config/site';
import { areaCatalog } from '../../data/lezer';
import {
  kalkulal, percSzoveg, foglalasiJegyzet, gyujtotetelKell, NOTINO_KOMBINALT,
} from '../../lib/lezerArazas';
import { useVagolap } from './useVagolap';

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
 * ÁRLOGIKA (2026-09-20-tól): a `lib/lezerArazas.ts` motorja számol — ugyanaz,
 * ami az árlista alján lévő szabad összeállítást is hajtja. Így a hero és az
 * árlista SOHA nem mondhat kétféle árat ugyanarra a kiválasztásra.
 *
 * AMI ELŐTTE VOLT, ÉS MIÉRT DŐLT MEG: a panel csak a hat dokumentált
 * kombinációra (négy páros, két csomag) mondott árat; minden más esetben a
 * tételes összeget mutatta, és annyit, hogy „a pontos árat az első alkalom
 * elején mondom meg”. Egy vendég pont ezt kifogásolta: több területet
 * szeretett volna, amire nincs kész csomag — vagyis a kvíz a saját ígéretét
 * („megmondom, mennyi lesz NEKED”) nem tartotta be. A motor a hat dokumentált
 * árból van visszafejtve, tehát ez nem új árazás, hanem a meglévő kiterjesztése.
 *
 * A NYOLC TERÜLET, ami itt választható, SZÁNDÉKOSAN a leggyakoribbak: ez egy
 * harminc másodperces kvíz a heróban, nem árlista. A teljes, huszonhét területes
 * lista az `AreaBuilder`-ben él, az árszekció végén.
 */

// `useGrouping: 'always'`: a hu-HU alapértelmezés négyjegyű számot NEM tagol
// („8000 Ft”), az oldal többi ára viszont tagolva van („8 000 Ft”).
const HUF = new Intl.NumberFormat('hu-HU', { maximumFractionDigits: 0, useGrouping: 'always' });
const MONTHS = ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'];

type HairId = 'sotet' | 'kozepes' | 'vilagos' | 'osz';

const HAIRS: { id: HairId; label: string; hint: string }[] = [
  { id: 'sotet', label: 'Fekete vagy sötétbarna', hint: 'vastag, jól látszik' },
  { id: 'kozepes', label: 'Sötétszőke vagy világosbarna', hint: 'közepesen erős' },
  { id: 'vilagos', label: 'Világosszőke vagy vörös', hint: 'halvány, vékony' },
  { id: 'osz', label: 'Ősz vagy fehér', hint: 'nincs benne szín' },
];

/**
 * A heróban választható nyolc terület — a leggyakoribbak. Az ID-k a
 * `data/lezer.ts` katalógusából valók, tehát a címke és az ár egy helyen él az
 * árlistával; itt csak azt döntjük el, MELYIK nyolc jelenjen meg.
 *
 * Ha egy ID elgépelődik, a `keres()` dob, és a build hangosan elszáll —
 * nem pedig csendben eltűnik egy gomb a heróból.
 */
const HERO_AREA_IDS = [
  'felso-ajak', 'all', 'honalj', 'bikinivonal', 'alkar', 'has', 'labszar', 'teljes-lab',
] as const;

const keres = (id: string) => {
  const a = areaCatalog.find((x) => x.id === id);
  if (!a) throw new Error(`ConsultQuiz: nincs ilyen terület a katalógusban: ${id}`);
  return a;
};

const AREAS = HERO_AREA_IDS.map(keres);

export function ConsultQuiz() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [hair, setHair] = useState<HairId | null>(null);
  const [areas, setAreas] = useState<string[]>([]);

  const started = useRef(false);
  const toggle = (id: string) =>
    setAreas((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const result = useMemo(() => {
    if (!hair || areas.length === 0) return null;

    // A teljes árlogika — ár, lefoglalt idő, megtakarítás, összevonás — a közös
    // motorból jön. A lefoglalt sáv képlete (zónaidők + EGYSZER 10 perc
    // ráhagyás, egyetlen zónánál 15) is ott él: ez adja vissza a Notinón
    // felvitt időtartamokat, és a build méri, hogy tényleg vissza is adja.
    const kalk = kalkulal([...areas]);
    if (!kalk) return null;

    // Befejezés: 6 alkalom, 5 hetes átlagos közökkel.
    const finish = new Date();
    finish.setDate(finish.getDate() + 5 * 7 * 5);

    return {
      picked: kalk.areas,
      itemised: kalk.tetelesPerAlkalom,
      minutes: kalk.perc,
      combo: kalk.nev,
      perVisit: kalk.perAlkalom,
      total: kalk.hatAlkalom,
      finishLabel: `${MONTHS[finish.getMonth()]} ${finish.getFullYear()}`,
      saving: kalk.megtakaritasPerAlkalom,
      jegyzet: foglalasiJegyzet(kalk),
      // Nem „egynél több terület”: a heróban választható nyolcból az alkarnak
      // és a hasnak sincs saját Notino-tétele, azok egyedül is a gyűjtőtételen
      // mennek. A lista a `lezerArazas.ts`-ben él, egy helyen.
      kombinalt: gyujtotetelKell(kalk),
    };
  }, [hair, areas]);

  const { masolva, kezi, masol } = useVagolap();

  const verdict = hair === 'osz' ? 'no' : hair === 'vilagos' ? 'maybe' : 'yes';

  // GA4: a kvíz-tölcsér mérése (2026-09-29). A lézer-oldal foglalási kattintása 18%
  // (28 látogatóból 5), a többi money page-é 31–58% — ebből derül ki, hogy a rés a
  // kvíz ELŐTT, KÖZBEN vagy UTÁN van. A `verdict` azt is megmutatja, hány látogatót
  // szűr ki szándékosan az ősz/fehér szálnál kiírt „ne költs erre" panel.
  useEffect(() => {
    if (step === 2 && result) {
      track('lezer_quiz_complete', { verdict, areas: areas.length, per_visit: result.perVisit });
    }
  }, [step]);

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
                        // Első érintés: a kvíz-indítás mérése, oldalmegtekintésenként egyszer.
                        if (!started.current) {
                          started.current = true;
                          track('lezer_quiz_start');
                        }
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

            {/* 2 — területek. Itt csak a nyolc leggyakoribb van; aki mást keres,
                 az árlista alján a teljes listából rakhatja össze a sajátját.
                 E nélkül a link nélkül ugyanabba a zsákutcába futna, ami miatt
                 ez az egész átalakítás elkezdődött. */}
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
                <a
                  href="#osszeallitas"
                  className="self-center text-[13px] text-creamMute hover:text-cream underline underline-offset-4 decoration-whisperStrong transition-colors px-2"
                >
                  Más terület kell →
                </a>
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
                      {result.combo ?? result.picked.map((p) => p.label).join(' + ')} —{' '}
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

                    {result.saving > 0 && (
                      <p className="mt-6 text-[14px] text-creamSoft leading-[1.7] max-w-[58ch]">
                        Külön-külön ez alkalmanként {HUF.format(result.itemised)} Ft lenne. Egy időpontban{' '}
                        <span className="text-gold">{HUF.format(result.saving)} Ft-tal kevesebb</span> — mert egy időpont,
                        nem {result.picked.length}.
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
                      {result.kombinalt && (
                        <button
                          type="button"
                          onClick={() => masol(result.jegyzet)}
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
                      <button type="button" onClick={() => { setStep(0); setHair(null); setAreas([]); }} className="text-[12px] uppercase tracking-caps text-creamMute hover:text-cream transition-colors px-3">
                        Újrakezdem
                      </button>
                    </div>

                    {kezi && (
                      <div className="mt-4 max-w-[58ch]">
                        <label className="block text-[11px] uppercase tracking-caps text-creamMute mb-2">
                          Jelöld ki és másold
                        </label>
                        <textarea
                          readOnly
                          rows={3}
                          value={result.jegyzet}
                          onFocus={(e) => e.currentTarget.select()}
                          className="w-full rounded-xl bg-ink border border-whisperStrong p-3 text-[13px] text-creamSoft leading-[1.6] resize-none focus:outline-none focus:border-gold/60"
                        />
                      </div>
                    )}

                    {/* A Notinón egyetlen tételre sem lehet közvetlenül linkelni,
                        tehát meg kell mondani, mit keressen. Ugyanaz a szöveg, mint
                        az árlista alján lévő kalkulátorban — egy forrásból. */}
                    <p className="mt-5 text-[13px] text-creamSoft leading-[1.7] max-w-[58ch] border-l-2 border-gold/40 pl-3.5">
                      {result.kombinalt ? (
                        <>
                          A Notinón ezt foglald: <span className="text-cream">{NOTINO_KOMBINALT}</span>, és illeszd be a
                          megjegyzésbe a kimásolt listát. Az idősávot — ~{percSzoveg(result.minutes)} — én állítom be.
                        </>
                      ) : (
                        <>
                          A Notinón ezt foglald:{' '}
                          <span className="text-cream">{result.picked[0].label} – lézeres szőrtelenítés</span>.
                        </>
                      )}
                    </p>

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
