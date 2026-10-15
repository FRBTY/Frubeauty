# FRUBEAUTY — organikus növekedési kör, 2026-10-15

**Ág:** `seo/organikus-novekedes-2026-10-15` (a szülő repóban: `C:\Users\Bence\Desktop\frubeauty-final-v5`)
**Commitok:** `a561f2ae` állapotrögzítés · `4028682a` belső linkek · `a6e54c51` 3 új cikk
**Állapot:** **ÉLESÍTVE 2026-10-15 23:52:49** (Netlify production, a tulajdonos futtatta). Élesben ellenőrizve: mind a 17 pont zöld (3 új URL 200 + FAQ JSON-LD + lábléc, kezdőlapi linkek, a /sminkes-zuglo/-n nincs alkalmi ár, RelatedArticles, sitemap, llms.txt, 0 NUL-bájt), a régi árcikk 301-e él. Az utómérés ablaka: 2026-10-16 → 11-09.
**Adat:** GSC 2026-09-15 → 10-12 (28 nap, 3 nap késleltetés), service account; GA4 533860004; élő Google-SERP és automatikus kiegészítés (`hl=hu&gl=hu`), 2026-10-15.

---

## 1. Röviden

1. **A kezdőlapról eddig egyetlen link sem ment a két új oldalra**, pedig a „szemöldökfestés” mind a 36 megjelenését a kezdőlap viszi. Ezen felül a kezdőlap „Alkalmi smink” gombja az *esküvői* oldalra vitt. Mindkettő javítva.
2. **A /sminkes-zuglo/ még mindig kiírta az alkalmi árat**, és még mindig ez viszi az „alkalmi smink árak” 60 megjelenéséből 45-öt. Az árat kivettem, helyette pontos horgonnyal linkel.
3. **Három új kérdés-cikk** készült a „hány alkalom” minta szerint: *Meddig tart a szempilla lifting?*, *Káros a szempilla lifting?*, *Meddig tart a szemöldökfestés?* A témák mögött a Google saját javaslatai és az élő találati oldal állnak.
4. **A lézer-kvíz `(not set)` szándékos**, nem hiba: az AreaBuilder nem kérdezi a szálszínt, ezért nincs mit `verdict`-ként küldenie. Kódot ezért nem módosítottam.
5. **A legnagyobb kar továbbra is az off-page munka.** A kiinduló tényekben egy hiba volt: a Cylex nem hajtja az Aranyoldalakat (lásd 6. pont). Kész a 2 hetes lista bemásolható szövegekkel.

---

## 2. Mit változtattam és miért

### 2.1 Belső linkek (`4028682a`)

| Hol | Mit | Miért (GSC, 28 nap) |
|---|---|---|
| Kezdőlap, szemöldök laminálás kártya | új sor: „Laminálás nélkül, csak színnel és formával: **szemöldökfestés**” → /szemoldokfestes-zuglo/ | „szemöldökfestés” (3 írásmód): **36 megj., mind a kezdőlapon** (3,7. hely); az új oldalon 0 |
| Kezdőlap, smink kártya | új sor: „Estélyre, ballagásra, fotózásra: **alkalmi smink**” → /alkalmi-smink-budapest/; alcím „Esküvő, ballagás, fotózás” helyett „Esküvő, próbasminkkel” | a kártya címsor-linkje a /sminkes-zuglo/-ra visz, ami 09-29 óta tisztán esküvői oldal |
| Kezdőlap, „Esküvő, ballagás…” blokk | az **„Alkalmi smink”** gomb célja /sminkes-zuglo/ helyett /alkalmi-smink-budapest/ | pontos horgonnyal az esküvői oldalt erősítette az alkalmi keresésre |
| /sminkes-zuglo/, „Nem esküvőre?” doboz | „az alkalmi smink 15 000 Ft” **kikerült**, helyette „**alkalmi smink árak**” link | „alkalmi smink árak”: 45/60 megj. még ezen az oldalon (6,8.); az alkalmi oldalon 2 |
| /blog/eskuvoi-smink-arak-budapest/ | a táblázat „Alkalmi smink” sora linkel; a csomaglistából kikerült az alkalmi ár, helyette „alkalmi smink árak” link | 5 megj. az „alkalmi smink árak”-ra (16,8.); ne versenyezzen |
| /blog/szemoldok-laminalas-arak-2026/ | „szempilla lifting” horgony helyett „**szempilla lifting árak**” → /szempilla-lifting-zuglo/ | „szempilla laminálás árak” 5 megj. ezen a cikken (3,2.) |

**Tudatosan NEM csináltam:**
- A kezdőlapra nem került új H3 vagy ár ezekre a szavakra. A 08-09-i mérés szerint a kezdőlap tekintéllyel nyer, a gyengítése csak megjelenést vinne el. A link sima szövegsor.
- Cím- vagy H2-csere nem volt (a 09-15-i kör nem hatott).
- A koreai cikkhez nem nyúltam: 46%-on konvertál, és a „szempilla lifting árak” linkje már megvan benne.

### 2.2 Három új kérdés-cikk (`a6e54c51`)

**Témaválasztás adatból.** Az Ahrefs-csomag nem ad kulcsszó-volument („Insufficient plan”), a memóriában lévő Kulcsszótervező-tábla pedig ezeket a kérdéseket nem tartalmazza. Ezért a Google automatikus kiegészítését (hl=hu, gl=hu) és az élő SERP-et használtam:

| Cikk | Jel | Élő SERP (2026-10-15) | Formátum-döntés |
|---|---|---|---|
| /blog/szempilla-lifting-meddig-tart/ | a „szempilla lifting” (2 400/hó) **top 10 javaslatai között**; plusz „mennyi ideig tart”, „mennyire tartós”, „hány hetente” | nincs AI-áttekintés, nincs kiemelt válasz; reddit a 2., gyakorikerdesek a 8. → gyenge mezőny | közvetlen válasz az első mondatban, a „miért” és a „mitől rövidebb” rész, belső link az utóápolásra (nem ismétli) |
| /blog/szemoldokfestes-meddig-tart/ | a „szemöldökfestés” (320/hó, +52%) **top 10 javaslatai között** | **gyakorikerdesek.hu az 1., reddit a 3.**: a Google-nek nincs jó válasza | ugyanaz; plusz „festés vagy laminálás” (a te jelölted) H2-ként, mert erre nincs önálló keresési jel |
| /blog/szempilla-lifting-karos/ | „szempilla lifting káros”, „káros hatásai”; PAA: „A szempilla lifting káros a pilláknak?” | szalonblogok („előnyei és hátrányai”, „tények és tévhitek”), glamour.hu | kifogáskezelő cikk: mit csinál a hatóanyag, mikor árt, mikor nem végzed el |

**Kihagyva, adat alapján:** a „szempilla lifting festéssel” témát a meglévő *lifting vagy festés* cikk és a money page fedi, egy új cikk kannibalizálna. A „szemöldök laminálás vagy festés” kérdésre nincs automatikus javaslat, ezért a festés-cikkbe került H2-ként.

**Felépítés (a nyertes minta szerint):** a kérdés a H1-ben, a válasz az első bekezdésben, ArticleOffer (a festés-cikknél az új `Szemöldökfestés` kategóriával a 6 000 Ft-os ajánlat jelenik meg, nem a laminálás), FAQ (BlogPosting és FAQPage JSON-LD, buildben ellenőrizve), RelatedArticles a két money page-en, belső link az utóápolás-cikkből, llms.txt.

**Szándékosan nincs bennük ár-blokk.** Egy-egy mondat linkel a money page-re („szempilla lifting árak”, „szemöldökfestés”). Ha a cikk saját ártáblázatot kapna, ugyanúgy versenyezne a money page-dzsel, mint a régi szempilla-árcikk.

**Szöveg:** magam írtam, nem sonnet. Vendégnek szóló állításokról van szó, és a globális modellválasztási szabályod szerint ez a fő munkamenetben marad. A tényeket a meglévő, általad jóváhagyott szövegekből vettem (6–8 hét, 3–4 hét, ellenjavallatok, utóápolás). Gépi ellenőrzés mindhárom cikken lefutott: nincs zárójel, nincs „kapod/fizetsz”, nincs garancia vagy versenytárs-ár, és a kockázatoldás nem ismétlődik.

**Kérlek, nézd át ezt az 5 szakmai állítást.** Szakmailag általánosak, de a te gyakorlatodban nem ellenőriztem őket:
- [ ] Szemöldökfestés: „ha az első 24 órában víz, smink vagy lemosó éri, hamarabb halványul”
- [ ] Szemöldökfestés: „az árnyalatot és a behatási időt a szálhoz választom”, illetve „ősz szálon nehezebben fog”
- [ ] Lifting káros-e: „a behatási időt a pilla vastagságához választom”
- [ ] Lifting meddig tart: „az első 24 óra után lehet úszni, szaunázni”
- [ ] Lifting meddig tart: „a festék a pillavégeken hamarabb halványul”

### 2.3 Lézer-kvíz: `lezer_area_builder_use` → `verdict` = (not set)

`src/components/lezer/AreaBuilder.tsx:69`: `track('lezer_area_builder_use', { areas: valasztott.length })`. A `verdict` a `ConsultQuiz.tsx` saját értéke (a szálszín-kérdésből jön: yes/maybe/no). Az AreaBuilder csak területet kérdez, így nincs miből verdictet adnia. A GA4 az eseményszintű egyéni dimenziót minden olyan eseménynél (not set)-nek mutatja, ami nem hordozza. **Ez helyes viselkedés.** Kitalált érték (pl. `na`) csak zajt vinne a riportba.

---

## 3. GSC: indexelés-kérés és a 4 új URL

**Belépett GSC-böngésző nincs.** A csatlakoztatott Chrome (Browser 2) Google-fiókjának nincs hozzáférése a tulajdonhoz („Hoppá, nincs hozzáférése”), a dedikált GSC-Chrome (`.agent-chrome-gsc`) pedig nem fut. Ezért nem kattintottam semmit.

**A 4 új URL (URL Inspection API, 2026-10-15):**

| URL | Állapot | Utolsó crawl |
|---|---|---|
| /alkalmi-smink-budapest/ | Submitted and indexed | 2026-09-29 |
| /szemoldokfestes-zuglo/ | Submitted and indexed | 2026-09-29 |
| /blog/lezeres-szortelenites-hany-alkalom/ | Submitted and indexed | 2026-09-29 |
| /blog/lezeres-szortelenites-vagy-gyantazas/ | Submitted and indexed | 2026-09-29 |
| /blog/szempilla-lifting-arak-2026/ (régi) | **még a régi változat van indexelve** | **2026-09-15** — a 301-et (élőben ellenőrizve: 301 → /szempilla-lifting-zuglo/) a Google még nem látta |

### A 3 kattintás, amit neked kell megtenned — MOST, a deploytól függetlenül

A `kfruzsi0197@gmail.com` fiókkal nyisd meg: `https://search.google.com/search-console?resource_id=sc-domain:frubeauty.com`

1. **Kattints a felső keresőmezőbe** („Bármely URL ellenőrzése…”), illeszd be ezt, és nyomj Entert:
   `https://frubeauty.com/blog/szempilla-lifting-arak-2026/`
   (Az eredmény „Az URL szerepel a Google-ben” lesz. Ez várható, mert a régi változat van bent.)
2. **Kattints az „Indexelés kérése” gombra.** Egy-két percig tesztel.
3. **Kattints a „Rendben” gombra** a megerősítő ablakban („Indexelés kérve”).

**Ha már bent vagy, egy plusz nézés:** a bal menüben „Linkek” → „Legtöbbet hivatkozó webhelyek”. Írd fel a számot. Ez a hivatkozó domainek alapértéke, mert a riportnak nincs API-ja, és az Ahrefs-csomag nem engedi.

### Deploy UTÁN (ugyanez a 3 kattintás, ebben a sorrendben)

A napi kvóta kb. 10 kérés, ezért ha kell, két napra oszd el:
1. `https://frubeauty.com/blog/szempilla-lifting-meddig-tart/`
2. `https://frubeauty.com/blog/szemoldokfestes-meddig-tart/`
3. `https://frubeauty.com/blog/szempilla-lifting-karos/`
4. `https://frubeauty.com/` (az új linkek miatt)
5. `https://frubeauty.com/sminkes-zuglo/` (kikerült az alkalmi ár)
6. `https://frubeauty.com/szempilla-lifting-zuglo/` és `https://frubeauty.com/szemoldokfestes-zuglo/` (új RelatedArticles)

---

## 4. Alapértékek (2026-09-15 → 10-12, 28 nap)

Gépi formában: `.seo-tracker/baseline-2026-10-15-organikus.json`. A pozíció megjelenéssel súlyozott.

**Oldalak**

| URL | Katt | Megj. | CTR | Poz. | GA4 org. belépő | → book_click |
|---|---|---|---|---|---|---|
| / | 89 | 2 090 | 4,3% | 5,0 | 56 | 24 |
| /sminkes-zuglo/ | 9 | 490 | 1,8% | 7,7 | 4 | 1 |
| /alkalmi-smink-budapest/ | 2 | 35 | 5,7% | 6,1 | 1 | 0 |
| /szemoldokfestes-zuglo/ | 0 | 5 | 0% | 3,2 | 0 | 0 |
| /szempilla-lifting-zuglo/ | 6 | 89 | 6,7% | 8,8 | 6 | 1 |
| /blog/eskuvoi-smink-arak-budapest/ | 4 | 145 | 2,8% | 9,2 | 2 | 0 |
| /blog/szemoldok-laminalas-arak-2026/ | 2 | 281 | 0,7% | 6,4 | 0 | 0 |
| /blog/szempilla-lifting-utoapolas/ | 0 | 7 | 0% | 13,4 | 0 | 0 |
| /blog/szempilla-lifting-arak-2026/ (301) | 1 | 135 | 0,7% | 6,4 | 0 | 0 |
| 3 új cikk | 0 | 0 | — | — | 0 | 0 |
| **Site összesen** | **165** | **4 671** | 3,5% | | **103** | **38** |

**Kulcsszavak**

| Kulcsszó | Cél-URL | Összes: katt / megj. / poz. | A cél-URL-en | Most viszi |
|---|---|---|---|---|
| alkalmi smink árak | /alkalmi-smink-budapest/ | 1 / 60 / 7,5 | 0 / 2 / 6,5 | /sminkes-zuglo/ 45 @6,8 |
| alkalmi smink budapest | /alkalmi-smink-budapest/ | 1 / 30 / 10,8 | 0 / 5 / 10,8 | /sminkes-zuglo/ 22 @11,1 |
| szemöldökfestés (3 írásmód) | /szemoldokfestes-zuglo/ | 0 / 36 / 3,7 | 0 / 0 | kezdőlap 36 @3,7 |
| szempilla lifting ár/árak | /szempilla-lifting-zuglo/ | 0 / 26 / 7,4 | 0 / 1 / 17,0 | régi árcikk 22 @7,3 |
| **esküvői smink árak** | /sminkes-zuglo/ | 1 / 82 / 9,3 | **1 / 60 / 7,3** | /sminkes-zuglo/ |
| szempilla lifting meddig tart | új cikk | 0 | 0 | — |
| szempilla lifting káros | új cikk | 0 | 0 | — |
| szemöldökfestés meddig tart | új cikk | 0 | 0 | — |

⚠️ **Kis minta.** A lekérdezés-szintű sorok többsége 60 megjelenés alatti, és a GSC a kattintások nagy részét anonimizálja. A GA4 a Consent Mode miatt csak a hozzájárulókat méri (103 belépő a GSC 165 kattintásával szemben). Ezért arányt nézünk, nem darabszámot.

**Siker (11-12-én):** a cél-URL vigye az „alkalmi smink árak/budapest” és a „szempilla lifting ár” megjelenéseinek több mint felét; a /szemoldokfestes-zuglo/ jelenjen meg a „szemöldökfestés”-re legalább 30%-kal. Az új cikkekhez a mérce: a „hány alkalom” cikk 13 nap alatt 147 megjelenést hozott.

---

## 5. Mérés: 2026-11-12, 9:30

Ütemezett feladat: **„FRUBEAUTY – organikus kör utómérése (nov. 12., a Motionnal együtt)”**. Fél órával a Motion-kiértékelés (9:00) után fut, a végére a Motion-eredményt is beteszi.
- Két ablak: a szabvány 28 nap (10-13 → 11-09), és az élesítés utáni időszak napra normálva. A deploy dátumát a Netlifyból olvassa.
- **Visszalépési szabály:** ha az „esküvői smink árak” pozíciója a /sminkes-zuglo/-n 9,9 fölé megy, javasolja a régi cím visszaállítását: `Esküvői smink árak Budapest 2026 – 30.000 Ft | FRUBEAUTY`. Csak a címet, mert a régi leírásban az elavult 39.000 Ft-os csomagár áll. Jelenleg 7,3 (28 nap), illetve 8,9 (a 10-15-i, 13 napos ablak).
- Foglalás: Notino okt. és nov. 1–11, GA4 organikus book_click-arány.
- A heti loop beavatkozásait zavaró tényezőként kiszűri.
- A feladat **Bypass engedélymódban** mentődött, mert ez a munkamenet abban fut. Az appban átállíthatod.

---

## 6. Off-page: 2 hetes lista (okt. 16. → 29.)

**Miért ez a kar.** A 09-15-i on-page kör mérhetően nem hatott. A külső link a plafon: az Ahrefs 07-31-én 0 dofollow-t mért, azóta a Firmania és a Nyitva.hu dofollow-ja él (09-18-án ellenőrizve). A térképcsomagban a lézerrel már 1–2. helyen vagy, de **76 véleményből 0 lézeres**.

**Javítás a kiinduló tényekhez:** a Cylex-adatbázis **a Cylexet, a Firmaniát és a Nyitva.hu-t** hajtja. Ez a három 08-18 óta fent van, ebből kettő dofollow, újraregisztrálni tilos (duplikátum). Az **Aranyoldalak független**, és a regisztrációja „geo” hibára fut. A téves mondat a `FRUBEAUTY-BACKLINK-LEVELEK-2026-09-07.md`-ben volt, ott javítottam. A heti loop feladatleírásában még benne van.

| Mikor | Mit | Miért | Hozam |
|---|---|---|---|
| okt. 16. | **Lézeres véleménykérés** mindenkinek, aki szeptember óta lézeren volt (1. szöveg) | 0 lézeres vélemény; a térképes 1–2. hely megtartásához és a választáshoz kell | térkép + a lézer-oldal vélemény-szekciója visszatehető |
| mostantól, minden kezelés után | **Véleménykérés** (2. és 3. szöveg) | 76 → cél 85+ a 11-12-i mérésig; a „kozmetikus zugló” csomagban a bent lévőknek 75–224 véleményük van | térkép |
| okt. 16–17. | **Janssen-levél** (4. szöveg) | a kozmetikus-keresőjük **ma is üres** (10-15-én ellenőrizve); beszállítói, témába vágó link | dofollow, a legerősebb |
| okt. 16–17. | **Ceremóniamester Szövetség** (5. szöveg) | 72 kimenő link, 0 nofollow, a Beauty kategóriában 3 szereplő | dofollow a /sminkes-zuglo/-ra |
| okt. 20–24. | **3 esküvői fotós**, akikkel ténylegesen dolgoztál (6. szöveg) | partner-oldalak sima `<a href>`-fel | dofollow |
| okt. 20–24. | **Cylex-adatlap lézeres kiegészítése** | a Firmania és a Nyitva.hu innen frissül; a lézer most hiányzik belőlük | a 2 meglévő dofollow tartalma |
| okt. 20–24. | **ittlakunk.hu XIV. kerület** hirdetés (7. szöveg) | a „kozmetikus 14 kerület”-re a 8. helyen rangsorol (07-26-i mérés) | hiperlokális citáció; a link `rel`-jét feltöltés után meg kell nézni |
| okt. 27–29. | **Aranyoldalak ügyfélszolgálat** (8. szöveg) | független a Cylextől, dofollow, de a regisztráció elakad | dofollow, ha megoldják |
| okt. 27–29. | Janssen-emlékeztető, ha nem jött válasz (4/b) | | |

Fiókot nem hoztam létre, és semmit nem küldtem el.

### 1. Lézeres véleménykérés: akik már voltak (egyszer, most)
> Szia [Név]! Fruzsi vagyok a FRUBEAUTY-ból. Már túl vagy a lézeres sorozatod első alkalmán, és kíváncsi vagyok, hogyan élted meg.
> Ha leírod a Google-ben, hogyan telt a kezelés, azzal annak segítesz, aki most gondolkodik rajta: [link]
> Köszönöm, Fruzsi

### 2. Lézeres véleménykérés: a kezelés napján
> Köszönöm, hogy ma nálam voltál a lézeres kezelésen! Ha leírod a Google-ben, milyen volt, azzal annak segítesz, aki még csak gondolkodik rajta: [link]
> Fruzsi

### 3. Véleménykérés minden más kezelés után
> Köszönöm, hogy ma nálam voltál! Ha van egy perced, sokat segít, ha leírod a Google-ben, milyen kezelésen voltál és milyen volt: [link]
> Fruzsi

A `[link]` helyére: Cégprofil → „Vélemény kérése” → rövid link másolása. Mindenkinek küldd, ne csak annak, akiről tudod, hogy elégedett, és ne adj érte kedvezményt. A Google irányelve mindkettőt tiltja.

### 4. Janssen Cosmetics — `shop@janssen-cosmetics.hu`
**Tárgy:** Kozmetikus-kereső — feltölthető vagyok elsőként?
> Kedves Janssen Cosmetics Csapat!
>
> Pecze-Kovács Fruzsina vagyok, kozmetikus Budapest XIV. kerületében. A szalonomban kizárólag Janssen Cosmetics hatóanyagokkal dolgozom: minden arckezelés bőranalízissel indul, és arra épül a protokoll — Deep Clean Expert, Hydro Radiance, Timeless Lift.
>
> Azért írok, mert a webhelyeteken a janssen-cosmetics.hu/kozmetikus-kereso/ oldal jelenleg üresen áll, pedig pont arra a kérdésre válaszolna, amit a vendégeim is feltesznek: hol találnak kozmetikust, aki tényleg ezzel dolgozik.
>
> Szívesen lennék az első listázott szalon rajta. Pontos adatokat és saját fotókat tudok adni a kezelésekről, és ha kéritek, a rövid bemutatkozó szöveget is megírom, hogy nektek ne legyen vele munkátok. Az elmúlt 12 hónapban több mint 340 kezelést zártam le, a Google-értékelésem 5,0 csillag 76 véleményből.
>
> Ha a kereső most nem prioritás, egy esettanulmányt is szívesen írnék a blogotokra egy konkrét protokollról, előtte-utána fotókkal.
>
> Melyik lenne a legkönnyebb út a ti oldalatokról nézve?
>
> Üdvözlettel,
> Pecze-Kovács Fruzsina · FRUBEAUTY
> 1143 Budapest, Egressy út 16. · +36 70 215 9954
> https://frubeauty.com/arckezeles-zuglo/

**4/b — emlékeztető 7–10 nap múlva:**
> Kedves Janssen Csapat! Pár napja írtam a kozmetikus-keresővel kapcsolatban. Ha segít, az adatokat és a fotókat egy levélben el tudom küldeni, hogy csak fel kelljen tölteni. Üdvözlettel, Pecze-Kovács Fruzsina

### 5. Ceremóniamester Szövetség — `iroda@ceremoniamesterszovetseg.hu`
**Tárgy:** Menyasszonyi smink — bemutatkozás a Beauty kategóriához
> Kedves Szövetség!
>
> Pecze-Kovács Fruzsina vagyok, sminkes és kozmetikus Budapesten, a XIV. kerületben. Az „Elismert esküvői szolgáltatók” oldalatokat nézve feltűnt, hogy a Beauty kategóriában hárman szerepeltek, ezért gondoltam, hogy bemutatkozom.
>
> Menyasszonyi sminket készítek próbasminkkel, kiszállással is. Egyszerre egy vendéggel dolgozom, ezért az esküvő reggelén nincs kapkodás, és a menyasszonyaim ezt jelzik vissza a leggyakrabban. A Google-értékelésem 5,0 csillag 76 véleményből, az elmúlt 12 hónapban több mint 340 időpontot zártam le.
>
> Ha hasznosnak tartjátok, szívesen küldök referenciákat konkrét esküvőkről, fotókkal és a menyasszonyok elérhetőségével, hogy meg tudjátok kérdezni őket.
>
> Van olyan út, amin egy sminkes bekerülhet a bemutatott szolgáltatók közé? Ha ehhez ceremóniamesteri ajánlás kell, szívesen dolgoznék együtt valamelyik tagotokkal egy közelgő esküvőn.
>
> Üdvözlettel,
> Pecze-Kovács Fruzsina · FRUBEAUTY
> 1143 Budapest, Egressy út 16. · +36 70 215 9954
> https://frubeauty.com/sminkes-zuglo/

### 6. Esküvői fotós — egyesével, csak akivel dolgoztál
**Tárgy:** [Menyasszony neve] esküvője — a sminkről
> Szia [Keresztnév]!
>
> [Menyasszony neve] esküvőjén dolgoztunk együtt [hónap]-ban, én készítettem a sminkjét. A képeid gyönyörűek lettek, külön köszönöm a [egy konkrét dolog: a készülődős sorozatot / a természetes fényt / a portrékat].
>
> Két dolog miatt írok. Használhatok-e néhány képet a munkámhoz, a nevedet és a linkedet minden felületen feltüntetve?
>
> Ha pedig készül blogbejegyzés az esküvőről, és felsorolod a szolgáltatókat: a nevem Pecze-Kovács Fruzsina, a link https://frubeauty.com/sminkes-zuglo/ — de csak ha amúgy is szoktál ilyet.
>
> Üdv,
> Fruzsina

Minden levélbe kerüljön egy konkrét mondat arról az esküvőről. Enélkül sablonnak hat.

### 7. ittlakunk.hu — `14.kerulet.ittlakunk.hu/holmi/letrehozas` (Bolt/Szolgáltatás)
- **Cím:** FRUBEAUTY – kozmetikus Zuglóban, az Egressy úton
- **Leírás:**
  > A FRUBEAUTY Pecze-Kovács Fruzsina egyszemélyes kozmetikai szalonja Budapest XIV. kerületében, az Egressy úton. Soprano Titanium dióda lézeres szőrtelenítés, Janssen Cosmetics arckezelések, koreai technikás szempilla lifting és szemöldök laminálás, valamint esküvői és alkalmi smink. Egyszerre egy vendég, teljes figyelemmel.
- **Cím / telefon / web:** 1143 Budapest, Egressy út 16. · +36 70 215 9954 · https://frubeauty.com/

### 8. Aranyoldalak ügyfélszolgálat — `ugyfelszolgalat@mtt.hu`
**Tárgy:** Cégadatlap létrehozása — „geo” hiba a cím mentésénél
> Jó napot!
>
> A FRUBEAUTY – Pecze-Kovács Fruzsina Kozmetikus cégadatlapját szeretném létrehozni az Aranyoldalakon. A regisztráció sikerült, de a cégadatlap mentésekor a címnél többszöri próbálkozásra is „geo” hibaüzenetet kapok.
>
> A cím: 1143 Budapest, Egressy út 16. Koordináta: 47.5058846, 19.1024696.
>
> Kérem, rögzítsék az adatlapot ezzel a címmel, vagy írják meg, mit csináljak másként. A többi adat: +36 70 215 9954 · kfruzsi0197@gmail.com · https://frubeauty.com/ · kategória: szépségszalon, kozmetikus.
>
> Köszönöm,
> Pecze-Kovács Fruzsina

**Cylex lézeres kiegészítés és a 4 lézeres Cégprofil-termék:** a kész szövegek a `FRUBEAUTY-LEZER-GBP-CYLEX-SZOVEGEK-2026-10-07.md`-ben vannak. Ne regisztrálj újra, csak a meglévő Cylex-adatlapot szerkeszd. A termékekhez a fotó a tiéd.

---

## 7. Deploy előtt — amit tudnod kell

**A teljes diff az élesítéshez képest:** 13 fájl, +210 / −12 sor (`git diff a561f2ae..HEAD`). Ebből 3 új cikk; a többi link- és listamódosítás.

**Nem ebből a munkából való változások a working tree-ben:**
- A korábbi, nem commitolt munkát (76 fájl) **külön commitba rögzítettem** (`a561f2ae`), hogy a mai diff tiszta legyen. Ez **már élesben van**: a fájlok módosítási ideje mind a 2026-10-07 11:42-es utolsó Netlify-deploy előtti, és az llms.txt meg a lézer-cikk élő és lokális változata egyezik. A deploy tehát ebből semmi újat nem visz ki.
- Nem követett, a deployt nem érintő fájlok: `brag-output/` (1,6 GB videós munkafájl) és `google-ads-editor/*.bak*`. Kihagytam őket.
- ⚠️ **A `frubeauty-final` mappában van egy második, beágyazott git-repo** (`seo/ahrefs-audit-2026-08-21` ágon). Ahhoz nem nyúltam. Git-műveletet mindig a szülő mappából (`frubeauty-final-v5`) futtass.
- ⚠️ **A hétfői „foglalás-loop” (következő futás: okt. 19., 8:35) a munkafában szerkeszthet**, élesíteni viszont nem fog. Mivel a `npm run deploy` a working tree-t viszi ki, deploy előtt a `git status` legyen tiszta. Most tiszta.

**Élesítés után ellenőrzöm:** a 3 új URL 200-at ad, a kezdőlapon kint vannak az új linkek, a /sminkes-zuglo/-n nincs „alkalmi smink 15 000”, és a záró elemek (lábléc, süti-sáv) a helyükön vannak.

---

## 8. Észrevételek, amikhez nem nyúltam

- **/blog/szemoldok-laminalas-meddig-tart/: 357 megjelenés, 0 kattintás, 6,3. hely** (28 nap). Az élő SERP-en az 5. helyen áll, a címe kimondja a választ („6 hét”). Ez CTR-probléma, de mivel azt kérted, hogy adat nélkül ne induljon újabb címkör, nem nyúltam hozzá. Ha egyszer csinálunk egy címtesztet, ez a legjobb jelölt.
- **A /sminkes-zuglo/-n van egy üres `<section class="py-20 sm:py-28">`**, ami kb. 160–220 px üres sávot hagy. A korábbi munkából maradt itt, ezért nem javítottam.
- A Google Ads-be semmilyen javaslat nem került.
