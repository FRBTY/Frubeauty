/**
 * Lézer — FOGLALÁS ELŐTTI EGÉSZSÉGÜGYI ELŐSZŰRÉS.
 *
 * MIÉRT LÉTEZIK: 2026-09-12-én a próbafolt és a konzultáció lekerült az oldalról.
 * Az a két lépés addig két dolgot csinált: (1) kiszűrte, akinél a kezelés nem
 * végezhető el, és (2) beállította a várakozást. A (2)-t a kvíz és az árlista
 * viszi. Az (1)-nek viszont muszáj valahol megtörténnie, KÜLÖNBEN a vendég
 * ideutazik, és a helyszínen derül ki, hogy nem lehet kezelni. Ez a fájl az az
 * (1): a szűrés a foglalás ELÉ került, online, ingyen, adatbekérés nélkül.
 *
 * FORRÁS: a géptulajdonos ellenjavallati adatlapja (magyar fordítás, 2 oldal,
 * 2026-09-12-én fotón átadva). Minden tétel onnan származik, kivéve a
 * gyanta/epilálás négy hetét (ez a szálnak a hagymában maradásáról szól, és
 * eddig is az oldal saját állítása volt) és a szálszínt (a kvíz kérdése).
 *
 * HÁROM KIMENET, SZÁNDÉKOSAN:
 *   stop — nem végezhető el. Nincs foglalás gomb, helyette megmondjuk, mi van.
 *   wait — elvégezhető, de nem most. Kap egy DÁTUMOT, és foglalhat is arra.
 *          Ez a legfontosabb konverziós döntés: a halasztás nem elutasítás.
 *   care — elvégezhető, csak tudni kell róla. Foglalhat, a magyarázatot látja.
 *
 * A `waitDays` nélküli `wait` tétel (pl. aktív fertőzés) nem számít bele a
 * dátumba — ott a gyógyulás a határ, nem egy naptári szám.
 *
 * ELLENTMONDÁS, AMIT A TULAJDONOSNAK KELL FELOLDANIA: a gép adatlapja a
 * napozás után 7 napot ír, az oldal viszont 2–4 hetet állít (és ez már ÉLES).
 * Itt az oldal saját, óvatosabb számát tartjuk (14 nap), hogy ne mondjon két
 * dolgot ugyanaz a site. Ha a 7 nap a helyes, egyetlen szám átírása.
 */

export type Verdict = 'stop' | 'wait' | 'care';

export interface ScreenItem {
  id: string;
  /** Amit a látogató bejelöl. Egyes szám első személyben — ne kelljen fordítania. */
  label: string;
  verdict: Verdict;
  /** A válasz, amit kap. Teljes mondat, nem címke, és nem ijesztget. */
  answer: string;
  /** Csak `wait`-nél: hány nap múlva jöhet. A legnagyobb adja a dátumot. */
  waitDays?: number;
}

export interface ScreenGroup {
  title: string;
  items: ScreenItem[];
}

export const screenGroups: ScreenGroup[] = [
  {
    title: 'Egészség',
    items: [
      {
        id: 'ferfi',
        label: 'Férfi vendég vagyok',
        verdict: 'stop',
        answer: 'Kizárólag női vendégeket fogadok, így ezt a kezelést nem tudom elvállalni.',
      },
      {
        id: 'varandos',
        label: 'Várandós vagyok, vagy szoptatok',
        verdict: 'stop',
        answer:
          'Várandósság és szoptatás idején nem kezelek. Nem azért, mert a lézer bizonyítottan ártana, hanem mert erre nincs elég adat — és ezt nem rajtad szeretném kipróbálni. Amint ez az időszak lezárul, szívesen várlak.',
      },
      {
        id: 'sziv',
        label: 'Szívbetegségem van, vagy pacemakerem',
        verdict: 'stop',
        answer: 'Pacemaker vagy szívbetegség mellett nem vállalom a kezelést.',
      },
      {
        id: 'epilepszia',
        label: 'Epilepsziám van',
        verdict: 'stop',
        answer: 'Epilepszia mellett nem kezelek: a készülék erős fényimpulzusokkal dolgozik.',
      },
      {
        id: 'spaszticitas',
        label: 'Spaszticitással élek',
        verdict: 'stop',
        answer: 'Spaszticitás mellett a kezelés nem végezhető el.',
      },
      {
        id: 'fertozes',
        label: 'Most éppen fertőzésem van (láz, gyulladás vagy gombásodás a területen)',
        verdict: 'wait',
        answer:
          'Amíg a fertőzés tart, nem kezelek — átvihetném egyik területről a másikra. Amint meggyógyultál, jöhetsz.',
      },
      {
        id: 'herpesz',
        label: 'Aktív ajakherpeszem van',
        verdict: 'wait',
        answer:
          'Aktív herpesz mellett az arcot nem kezelem. Amint lement, mehet — és ha később inaktív fázisban jössz, azt a pontot letakarom.',
      },
      {
        id: 'cukor',
        label: 'Cukorbeteg vagyok',
        verdict: 'care',
        answer: 'Ez nem kizáró ok. Egy alkalommal kisebb területtel dolgozom, és lassabban haladunk.',
      },
      {
        id: 'visszer',
        label: 'Visszértágulat van a kezelendő területen, vagy gyenge ott a vérkeringés',
        verdict: 'care',
        answer: 'A visszeres szakaszt kihagyom, a környékét viszont nyugodtan kezelhetjük.',
      },
      {
        id: 'verhigito',
        label: 'Vérhígítót szedek',
        verdict: 'care',
        answer: 'Ez nem kizáró ok, csak óvatosabb beállítással dolgozom.',
      },
      {
        id: 'kronikus',
        label: 'Krónikus betegségem van, ami a bőrt vagy a gyógyulást érinti',
        verdict: 'care',
        answer:
          'A legtöbb krónikus betegség nem zárja ki a kezelést. Az adatlapon leírod majd, mi az, és ahhoz igazítom a beállítást.',
      },
      {
        id: 'fem',
        label: 'Fémimplantátum, korona vagy híd van a kezelendő terület alatt',
        verdict: 'care',
        answer: 'Arcon ilyenkor vattával kitakarom a területet, hogy ne legyen kellemetlen az érzés.',
      },
      {
        id: 'gel',
        label: 'Allergiás vagyok az ultrahang gélre',
        verdict: 'care',
        answer: 'Akkor aloe verával dolgozunk helyette — ugyanúgy működik.',
      },
    ],
  },
  {
    title: 'Gyógyszerek',
    items: [
      {
        id: 'roaccutane',
        label: 'Izotretinoint (Roaccutane) szedek, vagy fél éven belül szedtem',
        verdict: 'wait',
        waitDays: 180,
        answer: 'Az izotretinoin után hat hónapnak el kell telnie, mire a bőr újra terhelhető.',
      },
      {
        id: 'antibiotikum',
        label: 'Most szedek antibiotikumot, vagy két héten belül szedtem',
        verdict: 'wait',
        waitDays: 14,
        answer: 'Az utolsó tabletta után két hét kell — addig sok antibiotikum fényérzékennyé teszi a bőrt.',
      },
      {
        id: 'orbancfu',
        label: 'Orbáncfüvet szedek',
        verdict: 'wait',
        waitDays: 28,
        answer: 'Az orbáncfű erősen fényérzékenyítő. A kúra után négy hét kell.',
      },
      {
        id: 'kortizon',
        label: 'Kortikoszteroidot szedek',
        verdict: 'care',
        answer:
          'Egyes kortikoszteroidok fényérzékennyé teszik a bőrt, és fokozhatják a szőrnövekedést. Kérdezd meg a kezelőorvosodat, hogy a tiéd ilyen-e — ha rendben van, jöhetsz.',
      },
      {
        id: 'fenyerzekenyito',
        label:
          'Fényérzékenyítő gyógyszert szedek (doxiciklin, tetraciklin, ciprofloxacin, furoszemid, hidroklorotiazid, amiodaron vagy hasonló)',
        verdict: 'care',
        answer:
          'Ha átmeneti kúráról van szó, annak a végét megvárjuk, és utána még két hetet. Ha tartósan szeded — például vérnyomásra vagy vízhajtóként —, attól még lehet kezelni, csak óvatosabb beállítással kezdünk.',
      },
    ],
  },
  {
    title: 'A bőröd és a szőröd az elmúlt hetekben',
    items: [
      {
        id: 'oszfeher',
        label: 'Ősz vagy fehér a szál a kezelendő területen',
        verdict: 'stop',
        answer:
          'Ősz és fehér szálban nincs festék, amit a lézer felmelegíthetne — nincs mit elnyelnie. Erre nem ajánlok sorozatot, mert nem lenne eredménye.',
      },
      {
        id: 'vilagos',
        label: 'Világosszőke vagy világosvörös a szál',
        verdict: 'care',
        answer:
          'Itt gyengébb és nehezen kiszámítható az eredmény, ezért előre nem tudok rá ígéretet tenni. Az első alkalom után látjuk, mire számíthatsz — és ha nem éri meg, azt elmondom, mielőtt sorozatba kezdenél.',
      },
      {
        id: 'napozas',
        label: 'Az elmúlt két hétben napoztam vagy szoláriumoztam a kezelendő területen',
        verdict: 'wait',
        waitDays: 14,
        answer:
          'Frissen barnult bőrön megnő az égés kockázata. Két hét szünet kell, erős barnaság után inkább négy.',
      },
      {
        id: 'onbarnito',
        label: 'Önbarnítót használtam a területen az elmúlt két hétben',
        verdict: 'wait',
        waitDays: 14,
        answer: 'Az önbarnító festéke ugyanúgy elnyeli a fényt, mint a szál. Két hét, amíg kiürül a bőrből.',
      },
      {
        id: 'hamlas',
        label: 'Leégtem, és hámlott a bőröm',
        verdict: 'wait',
        waitDays: 28,
        answer: 'Leégés után négy hét kell, amíg a bőr teljesen rendbe jön.',
      },
      {
        id: 'gyulladt',
        label: 'Gyulladt, sérült vagy nyílt seb van a kezelendő területen',
        verdict: 'wait',
        answer: 'Sérült bőrre nem dolgozom. Amint begyógyult, mehet.',
      },
      {
        id: 'botox',
        label: 'Botoxom volt a kezelendő területen fél éven belül',
        verdict: 'wait',
        waitDays: 180,
        answer: 'A botoxszal kezelt területen hat hónapot várunk.',
      },
      {
        id: 'filler',
        label: 'Injekciós bőrfiatalításom volt két héten belül',
        verdict: 'wait',
        waitDays: 14,
        answer: 'Injekciós bőrfiatalítás után két hét szünet kell.',
      },
      {
        id: 'gyanta',
        label: 'Az elmúlt négy hétben gyantáztam, epiláltam vagy csipesszel szedtem a területet',
        verdict: 'wait',
        waitDays: 28,
        answer:
          'A lézer a hagymában lévő szálat éri el. Ha a szálat gyökerestül kihúztuk, nincs mit megcéloznia — négy hét kell, hogy visszanőjön. Borotválni viszont szabad, sőt kell.',
      },
      {
        id: 'maslezer',
        label: 'Más helyen lézereztették ugyanezt a területet az elmúlt három hónapban',
        verdict: 'wait',
        waitDays: 90,
        answer:
          'Idegen beállítás után három hónapot hagyunk, hogy tiszta lappal induljunk. Ha nálam futó sorozatod van, ez nem vonatkozik rád — ott 4–6 hetente jövünk.',
      },
      {
        id: 'tetovalas',
        label: 'Tetoválás van a kezelendő területen',
        verdict: 'care',
        answer: 'Magán a tetováláson nem lehet lézerezni, de körülötte igen — a tetovált részt kihagyom.',
      },
      // A „Teljes intim területet szeretnék kezeltetni" tétel 2026-09-20-án
      // KIKERÜLT az előszűrésből: `care` volt, mert nem vállaltuk. Azóta
      // vállaljuk (M zóna, 16 000 Ft), tehát nincs mit átbeszélni — előszűrő
      // kérdésnek maradni itt azt sugallná, hogy valami gond van vele.
      {
        id: 'pcos',
        label: 'PCOS vagy más hormonális ok áll a szőrnövekedés mögött',
        verdict: 'care',
        answer:
          'Kezelhető, de arcon és állon számolj rendszeres karbantartással: a hormonális ok folyamatosan új szálakat indít. A lézer itt nem lezárja a kérdést, hanem kezelhetővé teszi.',
      },
    ],
  },
];

/** Gyors kereséshez: id → tétel. */
export const screenItemById = new Map(
  screenGroups.flatMap((g) => g.items).map((i) => [i.id, i] as const),
);
