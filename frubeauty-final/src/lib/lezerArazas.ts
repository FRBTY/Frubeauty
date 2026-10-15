import { zones, areaCatalog, pairs, packages, type Area, type ZoneTag } from '../data/lezer';

/**
 * Lézeres szőrtelenítés — ÁRAZÁSI MOTOR szabadon kombinált területekre.
 *
 * =============================================================================
 * A KÉRDÉS, amire válaszol (2026-09-20): egy vendég azt írta, hogy több
 * területet szeretne, és nincs olyan csomag, amiben mind benne van. Addig a
 * pontig az oldal csak hat kombinációra tudott árat mondani (négy páros, két
 * csomag), minden másra azt, hogy „az első alkalom elején megmondom”.
 *
 * A SZABÁLY NEM ÚJ. Nem kitaláltam egy kedvezményt, hanem VISSZAFEJTETTEM azt,
 * amivel a hat dokumentált ár készült — és kiderült, hogy egyetlen képlet van
 * mögötte. A `lezer.ts` fejlécében le van írva, mi a mérőszám: a LEFOGLALT
 * ÓRÁRA jutó nettó (a gép 50%-os részesedése miatt a határköltség az ár fele,
 * tehát nincs fix költségpadló). A csomagár indoka pedig szó szerint az, hogy
 * „egy időpont, nem három” — vagyis a vendég a megspórolt RÁHAGYÁST kapja
 * vissza árban, semmi mást.
 *
 * Ebből a két mondatból a képlet kényszer:
 *
 *   külön foglalva:  minden zóna hoz egy 10 perces ráhagyást  → T + n × 10
 *   egyben foglalva: a ráhagyás alkalmanként EGYSZER van       → T + 10
 *
 *   ár = tételes összeg × (T + 10) / (T + n × 10)
 *
 * Ez pontosan az a kedvezmény, amennyi időt a közös időpont felszabadít — így
 * a szalon óradíja ugyanannyi, mintha a vendég külön-külön jönne, viszont a
 * felszabaduló percek eladhatók valaki másnak. Vagyis a kedvezmény nem
 * engedmény: a vendégnek olcsóbb, a szalonnak nem kevesebb.
 *
 * PADLÓ. A puszta paritás csupa apró (XS) területnél a padló alá vinné az
 * óradíjat: négy XS-re 19 600 Ft jönne ki, ami 8 400 Ft/óra — kevesebb, mint a
 * leggyengébb arckezelés (~9 250 Ft/óra). A `lezer.ts` ezt a hibát egyszer már
 * kijavította (ezért lett az XS 5 000-ből 7 000, és a felső ajak + áll páros
 * 12 000, nem a paritásból adódó 11 200). A padló tehát nem új döntés sem:
 * 300 Ft / lefoglalt perc = 9 000 Ft/óra nettó. Egyedül vett zónára NEM
 * érvényes — ott az árlista ára a törvény, különben az XS 7 000-ről 8 000-re
 * ugrana, és a táblázat hazudna.
 *
 * MENNYIRE JÓ A KÉPLET: mind a HAT dokumentált árat visszaadja, kerekítés után
 * pontosan. Ezt nem állítom, hanem `ellenorzes()` méri, és a build elszáll, ha
 * valaki úgy ír át egy árat, hogy a szabály nem követi.
 *
 *   Felső ajak + áll        12 000   (a padlóból)
 *   Hónalj + bikinivonal    18 000
 *   Bikinivonal + lábszár   30 000
 *   Teljes láb + hónalj     40 000
 *   Sima Nyár               37 000
 *   Tetőtől Talpig          63 000
 *
 * AMIT MÉG MÉRTEM (200 000 véletlen kombináción, `scripts/lezer-arak.mjs`):
 * a képlet MONOTON — egy terület hozzáadása sosem csökkenti az árat —, és a
 * nettó óradíj sehol nem esik 9 143 Ft/óra alá. Nagy összeállításoknál
 * 11 800–12 000 Ft/óra, vagyis pont a szalon szokásos rátája.
 */

/** A ráhagyás: fogadás, Fitzpatrick-beállítás, dokumentációs fotó. Alkalmanként
    EGYSZER van, nem zónánként — ez a teljes kedvezmény forrása.

    EZ AZ ÁRAZÁSI MODELL PARAMÉTERE, nem a naptáré. Nem szabad átírni a
    Notino-időpontok kedvéért: a hat dokumentált ár ezzel a tízzel jön ki. 15-tel
    a hónalj + bikinivonal 18 000 helyett 16 000 lenne, a Sima Nyár 37 000 helyett
    33 000 — vagyis az egész árlistát újra kellene írni. A KIÍRT időpont-hossz
    ettől külön él, lásd `EGYZONAS_RAHAGYAS_PERC`. */
export const RAHAGYAS_PERC = 10;

/**
 * A NAPTÁRI ráhagyás — a naptárban lefoglalt sáv és a kezelési idő különbsége.
 *
 * SZÁNDÉKOSAN KÜLÖN ÁLL a `RAHAGYAS_PERC`-től, holott most ugyanaz a számuk.
 * Az egyik naptári adat, a másik az árlétra modell-paramétere; 2026-09-20-án
 * pont abból lett baj, hogy egynek látszottak. Ha az egyiket átírod, a másik
 * NEM követheti automatikusan.
 *
 * ELŐZMÉNY: 2026-09-20-ig itt 15 perc állt, mert a Notino egyzónás tételei úgy
 * készültek. 2026-09-21-én a tulajdonos a versenytárs (Everderm) idősávjaihoz
 * igazította a szolgáltatást, és ezzel az egyzónás kivétel is megszűnt — újra
 * egyetlen ráhagyás van, mindenhol tíz perc.
 */
export const NAPTARI_RAHAGYAS_PERC = 10;

/** A lefoglalt idősáv percben, ahogy a naptár is számolja. */
export function lefoglaltPerc(kezelesiPercek: number[]): number {
  return kezelesiPercek.reduce((s, x) => s + x, 0) + NAPTARI_RAHAGYAS_PERC;
}

/**
 * AZ ÁRLÉTRA LEVEZETÉSEKOR ÉRVÉNYES KEZELÉSI IDŐK — FAGYASZTVA.
 *
 * MIÉRT VAN KÜLÖN A NAPTÁRI IDŐTŐL (2026-09-21, tulajdonosi döntés): a kezelési
 * idők lerövidültek, mert a versenytárs feleannyiból megcsinálja ugyanazt. Az
 * árak viszont MARADNAK — élesben vannak a weboldalon és a Notinón is, és a
 * felszabaduló perc a szaloné, nem a vendégé.
 *
 * Ha a paritás-képlet a rövidebb időkből számolna, a kombinációs árak MAGUKTÓL
 * esnének, mert a tízperces ráhagyás nagyobb hányadát tenné ki a kezelésnek:
 * a Sima Nyár 37 000-ről 35 000-re, a Tetőtől Talpig 63 000-ről 58 000-re. Az
 * ütemezés javítása nem csökkentheti az árat — ezért a képlet bemenete itt
 * befagyott azokon az értékeken, amikből a hat dokumentált ár született.
 *
 * ⚠️ Ezt a táblát CSAK akkor írd át, ha tudatosan árat akarsz változtatni. Az
 * `ellenorzes()` azonnal szól, ha a hat ár elcsúszik.
 */
const ARAZASI_PERC: Record<ZoneTag, number> = { XS: 15, S: 20, M: 30, L: 45, XL: 70 };

/** Nettó óradíj-padló, percre bontva: 300 Ft/perc = 9 000 Ft/óra nettó.
    Csak kombinációra érvényes, egyedül vett zónára nem (lásd a fejlécet). */
export const PADLO_FT_PER_PERC = 300;

/** Az árlista kerek számokkal dolgozik; a kalkulátor sem mondhat 18 333-at. */
export const KEREKITES = 1000;

/** A sorozat hossza. Minden kiírt végösszeg ennyi alkalomra szól. */
export const ALKALMAK = 6;

const zoneByTag = new Map<ZoneTag, (typeof zones)[number]>(zones.map((z) => [z.tag, z]));
const areaById = new Map<string, Area>(areaCatalog.map((a) => [a.id, a]));

export const areaAr = (a: Area) => zoneByTag.get(a.zone)!.serialNum;
/** NAPTÁRI kezelési idő — ez megy a kiírt időtartamba. */
export const areaPerc = (a: Area) => zoneByTag.get(a.zone)!.maxMinutes;
/** ÁRAZÁSI kezelési idő — befagyasztva, lásd `ARAZASI_PERC`. Csak a képletnek. */
export const areaArazasiPerc = (a: Area) => ARAZASI_PERC[a.zone];

export interface Osszevonas {
  /** A nagyobb terület, amire cseréltük. */
  parent: Area;
  /** A kisebbek, amik beleolvadtak. */
  children: Area[];
}

export interface Tipp {
  /** A nagyobb terület, ami olcsóbb lenne. */
  parent: Area;
  /** Az egyetlen hiányzó darab, amivel kijön. */
  missing: Area;
}

/**
 * A kiválasztás rendbetétele, MIELŐTT árat számolnánk. Két dolgot csinál:
 *
 *  1. Kidobja azt, ami már benne van egy nagyobb kiválasztott területben
 *     (ha a teljes láb be van pipálva, a comb nem külön tétel).
 *  2. Ha egy nagyobb terület MINDEN darabja ki van pipálva, és a nagyobb
 *     olcsóbb, akkor átvált rá. Enélkül a comb + lábszár 42 000 Ft lenne,
 *     miközben az árlista ugyanezt teljes lábként 33 000-ért adja — és pont
 *     az a vendég járna rosszul, aki alaposabban kipipálta a testét.
 */
export function osszevon(ids: string[]): {
  /** Amiért ténylegesen fizet — összevonás után. */
  ids: string[];
  /** Amit külön-külön fizetne: összevonás ELŐTT, de a fölösleges tételek nélkül.
      Ez a „külön-külön ennyi lenne” összehasonlítás alapja. Ha valaki a teljes
      lábat ÉS a combot is kipipálta, a combot nem számoljuk hozzá — az már
      benne van, és hazugság lenne kétszer felhozni. */
  alapIds: string[];
  osszevonasok: Osszevonas[];
} {
  const rend = new Map(areaCatalog.map((a, i) => [a.id, i]));
  const sorrendbe = (xs: string[]) => [...xs].sort((x, y) => rend.get(x)! - rend.get(y)!);

  let current = [...new Set(ids.filter((id) => areaById.has(id)))];

  // 1. lépés — a kiválasztott nagyobb területek elnyelik a kisebbeket.
  // (Teljes láb mellett a comb nem külön tétel.)
  const elnyelt = new Set<string>();
  for (const id of current) areaById.get(id)!.covers?.forEach((c) => elnyelt.add(c));
  current = current.filter((id) => !elnyelt.has(id));
  const alapIds = sorrendbe(current);

  // 2. lépés — ha egy nagyobb terület MINDEN darabja ki van pipálva és a
  // nagyobb olcsóbb, átváltunk rá. Ciklusban, mert egy csere újabbat nyithat.
  const osszevonasok: Osszevonas[] = [];
  for (let kor = 0; kor < 4; kor++) {
    const jelolt = areaCatalog.find((p) => {
      if (!p.covers || p.covers.length < 2) return false;
      if (current.includes(p.id)) return false;
      if (!p.covers.every((c) => current.includes(c))) return false;
      const gyerekekAra = p.covers.reduce((s, c) => s + areaAr(areaById.get(c)!), 0);
      return areaAr(p) < gyerekekAra;
    });
    if (!jelolt) break;
    osszevonasok.push({
      parent: jelolt,
      children: jelolt.covers!.map((c) => areaById.get(c)!),
    });
    current = [jelolt.id, ...current.filter((id) => !jelolt.covers!.includes(id))];
  }

  return { ids: sorrendbe(current), alapIds, osszevonasok };
}

/**
 * „Egy darab hiányzik” tippek. Ha valaki a felső ajkat, az állat és az arc
 * oldalát kéri, a teljes arc olcsóbb — de csak akkor jön ki, ha a szemöldök
 * közét is bepipálja. Ezt ki kell mondani: a vendég nem tudhatja, és e nélkül
 * többet fizetne kevesebbért.
 */
export function tippek(ids: string[]): Tipp[] {
  const van = new Set(ids);
  const out: Tipp[] = [];
  for (const p of areaCatalog) {
    if (!p.covers || p.covers.length < 2 || van.has(p.id)) continue;
    const hianyzik = p.covers.filter((c) => !van.has(c));
    if (hianyzik.length !== 1) continue;
    const gyerekekAra = p.covers.reduce((s, c) => s + areaAr(areaById.get(c)!), 0);
    if (areaAr(p) >= gyerekekAra) continue;
    out.push({ parent: p, missing: areaById.get(hianyzik[0])! });
  }
  return out;
}

export interface Kalkulacio {
  areas: Area[];
  /** Alkalmankénti ár, ha külön-külön, külön időpontokban csináltatná. */
  tetelesPerAlkalom: number;
  /** Amit ténylegesen fizet alkalmanként, egy időpontban. */
  perAlkalom: number;
  /** A hat alkalom teljes összege — erre köteleződik el. */
  hatAlkalom: number;
  megtakaritasPerAlkalom: number;
  megtakaritasHat: number;
  /** A lefoglalt idősáv egy alkalomra, percben (zónaidők + egyszer ráhagyás). */
  perc: number;
  /** Ennyi percet töltene ott, ha külön-külön járna. */
  percKulon: number;
  /** A dokumentált páros/csomag neve, ha a kiválasztás pont az. */
  nev: string | null;
  /** Igaz, ha nem a paritás, hanem az óradíj-padló határozta meg az árat. */
  padloDontott: boolean;
  osszevonasok: Osszevonas[];
  tippek: Tipp[];
}

/** Dokumentált kombinációk — CSAK a NEVÜKÉRT. Az árat a képlet adja, és az
    `ellenorzes()` őrzi, hogy a kettő egyezzen. Így a kalkulátor sosem mond
    mást, mint amit a csomagkártya két szekcióval feljebb kiír. */
const NEVESITETT: { ids: string[]; nev: string }[] = [
  { ids: ['felso-ajak', 'all'], nev: 'Felső ajak + áll' },
  { ids: ['honalj', 'bikinivonal'], nev: 'Hónalj + bikinivonal' },
  { ids: ['bikinivonal', 'labszar'], nev: 'Bikinivonal + lábszár' },
  { ids: ['teljes-lab', 'honalj'], nev: 'Teljes láb + hónalj' },
  { ids: ['honalj', 'bikinivonal', 'labszar'], nev: 'Sima Nyár csomag' },
  { ids: ['honalj', 'bikinivonal', 'teljes-lab', 'alkar', 'felso-ajak'], nev: 'Tetőtől Talpig csomag' },
];

const azonosHalmaz = (a: string[], b: string[]) =>
  a.length === b.length && [...a].sort().join('|') === [...b].sort().join('|');

/** A nyers ár — kerekítés előtt, hogy az ellenőrzés és a motor ugyanazt fussa. */
function nyersAr(arak: number[], percek: number[]): { ar: number; padlo: boolean } {
  const n = arak.length;
  const teteles = arak.reduce((s, x) => s + x, 0);
  const T = percek.reduce((s, x) => s + x, 0);
  const egyutt = T + RAHAGYAS_PERC;
  const kulon = T + n * RAHAGYAS_PERC;

  const paritas = (teteles * egyutt) / kulon;
  // Egyedül vett zónára az árlista ára a törvény — padló nélkül.
  const padlo = n > 1 ? PADLO_FT_PER_PERC * egyutt : 0;
  // Biztonsági fék: egy kombináció sosem lehet drágább, mint külön-külön.
  const ar = Math.min(Math.max(paritas, padlo), teteles);
  return { ar, padlo: padlo > paritas };
}

export function kalkulal(nyersIds: string[]): Kalkulacio | null {
  const { ids, alapIds, osszevonasok } = osszevon(nyersIds);
  if (ids.length === 0) return null;

  const areas = ids.map((id) => areaById.get(id)!);
  const arak = areas.map(areaAr);
  // KÉT KÜLÖN IDŐ: a `percek` a naptárba megy, az `arazasiPercek` a képletbe.
  // A kettő 2026-09-21 óta eltér — lásd az `ARAZASI_PERC` kommentárját.
  const percek = areas.map(areaPerc);
  const arazasiPercek = areas.map(areaArazasiPerc);

  // A „külön-külön ennyi lenne” az ÖSSZEVONÁS ELŐTTI listából számol: aki a
  // combot és a lábszárat pipálta ki, annak külön két időpont és 46 000 Ft
  // lenne, nem a teljes láb 33 000-e. Ha az összevonás utáni listát
  // hasonlítanánk magához, nulla megtakarítást írnánk ki — pont ott, ahol a
  // legnagyobb.
  const alapAreas = alapIds.map((id) => areaById.get(id)!);
  const tetelesPerAlkalom = alapAreas.reduce((s, a) => s + areaAr(a), 0);
  const alapPercek = alapAreas.reduce((s, a) => s + areaPerc(a), 0);

  const { ar, padlo } = nyersAr(arak, arazasiPercek);
  const perAlkalom = Math.round(ar / KEREKITES) * KEREKITES;

  return {
    areas,
    tetelesPerAlkalom,
    perAlkalom,
    hatAlkalom: perAlkalom * ALKALMAK,
    megtakaritasPerAlkalom: tetelesPerAlkalom - perAlkalom,
    megtakaritasHat: (tetelesPerAlkalom - perAlkalom) * ALKALMAK,
    perc: lefoglaltPerc(percek),
    // Külön-külön minden terület saját időpont lenne, tehát mindegyik viszi a
    // maga naptári ráhagyását. Megjelenítési adat: az árat az `nyersAr()`
    // számolja, a befagyasztott árazási időkből.
    percKulon: alapPercek + alapAreas.length * NAPTARI_RAHAGYAS_PERC,
    nev: NEVESITETT.find((c) => azonosHalmaz(c.ids, ids))?.nev ?? null,
    padloDontott: padlo,
    osszevonasok,
    tippek: tippek(ids),
  };
}

/** „~95 perc” helyett „~1 óra 35 perc” — két óra fölött a percszám olvashatatlan. */
export function percSzoveg(perc: number): string {
  if (perc < 90) return `${perc} perc`;
  const ora = Math.floor(perc / 60);
  const maradek = perc % 60;
  return maradek === 0 ? `${ora} óra` : `${ora} óra ${maradek} perc`;
}

/**
 * A FOGLALÁS ÁTADÁSA — a lánc utolsó, és sokáig szakadt láncszeme.
 *
 * A PROBLÉMA: a Notino „Foglalás” gombjai <button>-ök, nem linkek, tehát egyetlen
 * szolgáltatásra sem lehet közvetlenül hivatkozni — a vendég a szalon-oldal
 * tetején landol, és a listából kell kiválasztania a sajátját (lásd
 * `config/offers.ts`). Egy tetszőleges területkombinációra viszont nem létezhet
 * saját tétel: 27 területből 134 millió kombináció van.
 *
 * A MEGOLDÁS, amit a tulajdonos 2026-09-20-án megerősített: EGYETLEN gyűjtőtétel
 * („Kombinált lézeres szőrtelenítés”), és a foglalás beérkezése után ő állítja be
 * a naptárban a valódi hosszt. Ezért kell a megjegyzésbe a területlista és a
 * becsült idő — abból tudja beállítani.
 *
 * MIÉRT NEM IDŐSÁVOS TÉTELEK (30/60/90 perc), ami kézenfekvőbb lett volna: az ár
 * NEM az időből jön. Ugyanaz a 130 perc egyszer 39 000 Ft (nyolc apró terület),
 * egyszer 52 000 (teljes láb + teljes arc + nyak) — egy „130 perc” nevű tétel
 * tehát nem tudna helyes árat kiírni, és pont a foglalás pillanatában mondana
 * mást a Notino, mint a kalkulátor. Ráadásul a felfelé kerekítés alkalmanként
 * 25 elveszett percet is jelentett volna.
 *
 * EGY területnél nincs szükség minderre: annak 2026-09-14 óta saját tétele van.
 */
export const NOTINO_KOMBINALT = 'Kombinált lézeres szőrtelenítés';

/**
 * Azok a területek, amiknek 2026-09-20-án SAJÁT tétele van a Notinón
 * („Hónalj – lézeres szőrtelenítés” stb.). A katalógus 27 területet kínál, a
 * Notino-lista viszont csak ezt a hatot — a többihez a gyűjtőtétel való.
 *
 * MIÉRT SZÁMÍT: e nélkül a lista nélkül a kalkulátor azt írta volna ki egy
 * alkarra, hogy „A Notinón ezt foglald: Alkar – lézeres szőrtelenítés” — egy
 * olyan tételre küldve a vendéget, ami nem létezik. Pont a foglalás pillanatában.
 *
 * KARBANTARTÁS: ha új egyzónás tétel kerül fel a Notinóra, ide is be kell írni.
 * Rosszabb irányba nem tud elromlani: egy hiányzó ID-nél a vendég a gyűjtőtételt
 * kapja, ami mindig működik.
 */
export const NOTINO_EGYZONAS = new Set([
  'felso-ajak', 'all', 'honalj', 'bikinivonal', 'labszar', 'teljes-lab',
  // 2026-09-20-án került fel a Notinóra, a szolgáltatás bevezetésével együtt.
  'teljes-intim',
]);

/** Igaz, ha ehhez a kiválasztáshoz a gyűjtőtételt kell foglalni. */
export function gyujtotetelKell(k: Kalkulacio): boolean {
  return !(k.areas.length === 1 && NOTINO_EGYZONAS.has(k.areas[0].id));
}

/** A Notino kategóriája, amiben az összes lézeres tétel ül. */
export const NOTINO_KATEGORIA = 'Esztétikai szolgáltatások';

/** A KERESENDŐ tétel neve a Notinón. Egy forrásból, hogy az árlista alatti
    panel és a ragadós sáv soha ne küldje két különböző tételre a vendéget. */
export function notinoTetel(k: Kalkulacio): string {
  return gyujtotetelKell(k) ? NOTINO_KOMBINALT : `${k.areas[0].label} – lézeres szőrtelenítés`;
}

/** Teljes útvonal, ahogy a vendég a Notino-listán végigmegy. */
export function notinoUtvonal(k: Kalkulacio): string {
  return `${NOTINO_KATEGORIA} › ${notinoTetel(k)}`;
}

const HUF_JEGYZET = new Intl.NumberFormat('hu-HU', { maximumFractionDigits: 0, useGrouping: 'always' });

/** A Notino megjegyzés-mezőjébe másolható szöveg. Szándékosan EGY bekezdés és
    rövid: nem tudjuk, mekkora a mező, és a szalonnak pont három adat kell
    belőle — mely területek, mennyi idő, milyen áron. */
export function foglalasiJegyzet(k: Kalkulacio): string {
  const teruletek = k.areas.map((a) => a.label.toLowerCase()).join(', ');
  return (
    `Lézeres szőrtelenítés, hat alkalmas sorozat. ` +
    `Területek: ${teruletek}. ` +
    `Becsült idő: ~${percSzoveg(k.perc)}. ` +
    `A weboldali kalkulátor szerint ${HUF_JEGYZET.format(k.perAlkalom)} Ft / alkalom.`
  );
}

/**
 * A BIZONYÍTÁS: a képlet visszaadja-e a hat dokumentált árat.
 *
 * Miért dob hibát és nem logol: ha valaki átír egy csomagárat anélkül, hogy a
 * szabály követné, akkor a kalkulátor és a csomagkártya MÁS árat mondana
 * ugyanarra a kiválasztásra. Az a vendég szemében nem apró eltérés, hanem
 * megbízhatatlan árlista. Jobb, ha a build áll meg.
 */
export function ellenorzes(): void {
  const dok = (cimke: string | undefined, honnan: string) => {
    const n = Number((cimke ?? '').replace(/\D/g, ''));
    if (!n) throw new Error(`lezerArazas: nincs dokumentált ár ehhez: ${honnan}`);
    return n;
  };

  const vart: { ids: string[]; ar: number; honnan: string }[] = [
    ...pairs.map((p) => {
      const talalt = NEVESITETT.find((c) => c.nev === p.name);
      if (!talalt) throw new Error(`lezerArazas: nincs területlista ehhez a pároshoz: ${p.name}`);
      return { ids: talalt.ids, ar: dok(p.per, p.name), honnan: p.name };
    }),
    ...packages
      .filter((p) => p.title !== 'Első')
      .map((p) => {
        const nev = `${p.title} ${p.titleAccent} csomag`;
        const talalt = NEVESITETT.find((c) => c.nev === nev);
        if (!talalt) throw new Error(`lezerArazas: nincs területlista ehhez a csomaghoz: ${nev}`);
        return { ids: talalt.ids, ar: dok(p.perVisit, nev), honnan: nev };
      }),
  ];

  for (const v of vart) {
    const k = kalkulal(v.ids);
    if (!k) throw new Error(`lezerArazas: nem számolható: ${v.honnan}`);
    if (k.perAlkalom !== v.ar) {
      throw new Error(
        `lezerArazas: a képlet ${k.perAlkalom} Ft-ot ad a(z) „${v.honnan}” tételre, ` +
          `az árlistában viszont ${v.ar} Ft áll. Vagy az árat kell visszaigazítani, ` +
          `vagy a szabályt (paritás + 300 Ft/perc padló) újra kell gondolni.`,
      );
    }
  }

  // A KIÍRT IDŐSÁVOK egyeznek-e a Notinón felvitt tételekkel. 2026-09-20-ig ez
  // csak egy kommentárban állított tény volt — és közben elcsúszott öt perccel,
  // némán. Most méri a build.
  // 2026-09-21-i ÉRTÉKEK. A tulajdonos a versenytárs (Everderm) idősávjaihoz
  // igazította a kezelési időket, ezért mind a kilenc tétel rövidült. A Notino
  // admin felületén is ÁT KELL ÍRNI ugyanezekre — ez a tábla a KÓD elcsúszását
  // fogja meg, nem a Notinóét; azt csak kézzel lehet szinkronban tartani.
  const NOTINO_IDOK: { ids: string[]; perc: number; tetel: string }[] = [
    { ids: ['felso-ajak'], perc: 20, tetel: 'Felső ajak – lézeres szőrtelenítés' },
    { ids: ['all'], perc: 20, tetel: 'Áll – lézeres szőrtelenítés' },
    { ids: ['honalj'], perc: 22, tetel: 'Hónalj – lézeres szőrtelenítés' },
    { ids: ['bikinivonal'], perc: 22, tetel: 'Bikinivonal – lézeres szőrtelenítés' },
    { ids: ['labszar'], perc: 38, tetel: 'Lábszár – lézeres szőrtelenítés' },
    { ids: ['teljes-lab'], perc: 52, tetel: 'Teljes láb – lézeres szőrtelenítés' },
    { ids: ['teljes-intim'], perc: 28, tetel: 'Teljes intim – lézeres szőrtelenítés' },
    { ids: ['honalj', 'bikinivonal', 'labszar'], perc: 62, tetel: 'Sima Nyár csomag' },
    { ids: ['honalj', 'bikinivonal', 'teljes-lab', 'alkar', 'felso-ajak'], perc: 104, tetel: 'Tetőtől Talpig csomag' },
  ];
  for (const n of NOTINO_IDOK) {
    const k = kalkulal(n.ids);
    if (k && k.perc !== n.perc) {
      throw new Error(
        `lezerArazas: a(z) „${n.tetel}” tételre ${k.perc} percet számolunk, ` +
          `a Notinón viszont ${n.perc} perc van felvive. A vendég a weboldalon olvasott ` +
          `időt hasonlítja a naptárban látotthoz — a kettőnek egyeznie kell.`,
      );
    }
  }

  // A Notino egyzónás tételei valódi katalógus-területekre mutatnak-e. Egy
  // elgépelt vagy átnevezett ID itt csendben a gyűjtőtételre terelné a vendéget
  // — működne, csak fölöslegesen kérnénk tőle megjegyzést oda, ahol kész tétel
  // van. A másik irány rosszabb: ha valaki átnevez egy katalógus-ID-t, ez a
  // halmaz elavul, és a build most szól érte.
  for (const id of NOTINO_EGYZONAS) {
    if (!areaById.has(id)) {
      throw new Error(
        `lezerArazas: a NOTINO_EGYZONAS „${id}” eleme nincs a területkatalógusban. ` +
          `Vagy elgépelés, vagy átneveztek egy területet — a Notino-tétellistát is frissíteni kell.`,
      );
    }
  }

  // Az egyedül vett zónák: az árlista ára, kedvezmény és padló nélkül.
  for (const z of zones) {
    const pelda = areaCatalog.find((a) => a.zone === z.tag);
    if (!pelda) continue;
    const k = kalkulal([pelda.id]);
    if (k && k.perAlkalom !== z.serialNum) {
      throw new Error(
        `lezerArazas: a(z) ${z.tag} zóna egyedül ${k.perAlkalom} Ft-ot ad, ` +
          `az árlistában ${z.serialNum} Ft áll.`,
      );
    }
  }
}

// Build és SSR alatt lefut; a böngészőben nem, hogy egy árelírás ne fehér
// szekciót adjon a látogatónak, hanem piros buildet a fejlesztőnek.
if (import.meta.env?.SSR) ellenorzes();
