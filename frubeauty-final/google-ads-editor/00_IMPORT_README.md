# FRUBEAUTY — Google Ads Editor import csomag

Fiók: **853-998-4403** · Kampány: **Szempilla_V2.0** (meglévő, NEM resetelünk).
Két hirdetéscsoport jön létre egy kampányon belül: **„Szempilla lifting"** és **„Szemöldök laminálás"**.

> ⚠️ A CSV-k UTF-8 kódolásúak. Ha a Google Ads Editorban az ékezetek töröttek, az importnál válaszd kézzel az **UTF-8** kódolást.

---

## 0. ELŐKÉSZÍTÉS (Editorban, import ELŐTT)

1. **Töltsd le a legfrissebb fiókot** az Editorba (Get recent changes / Legutóbbi módosítások letöltése).
2. **Tanulás megőrzése:** a meglévő szempilla hirdetéscsoportodat **nevezd át pontosan erre:** `Szempilla lifting`
   - Átnevezés NEM resetel. Így a meglévő, egészséges RSA a helyén marad, és a 01-es fájl új kulcsszavai **ebbe** olvadnak be (a duplikátumokat az Editor kiszűri).
   - Ha külön, üres csoportba akarod a szempillát: hagyd ki ezt a lépést — az Editor új `Szempilla lifting` csoportot hoz létre (de a régi RSA-t kézzel kell áthúznod, hogy megmaradjon az előzménye).

---

## 1. KULCSSZAVAK importja — `01_keywords.csv`

`Account (Fiók) → Import → From file… (Fájlból)` → válaszd a `01_keywords.csv`-t → **Review changes** → **Keep / Apply**.

- A „Szemöldök laminálás" csoportot az Editor **újként** hozza létre (helyes).
- Csak **phrase + exact** egyezés van — szándékosan nincs broad (alacsony volumen + budget védelme).

---

## 2. RESZPONZÍV KERESÉSI HIRDETÉSEK importja — `02_responsive_search_ads.csv`

`Account → Import → From file…` → `02_responsive_search_ads.csv` → Review → Apply.

- Csoportonként **2 RSA** (a briefben kért 3 helyett **2 fut élesben** — ez a Google ajánlása is; 3 közel azonos RSA „similar ads" jelzést kap és szétaprózza a megjelenést alacsony volumennél). A **3. „kihívó" RSA** specifikációja a stratégiai üzenetben van — ha kell, kézzel hozzáadható később.
- **Light pin (a CSV-ben már beállítva):** csoportonként **2-3 lokális/kulcsszavas címsor a P1-re** tűzve (`…Zuglóban`, `…Budapest`, `Koreai…`) — így a felhasználó mindig releváns, kulcsszó-egyező címsort lát elöl (közvetlenül emeli a relevanciát/QS-t). A többi címsor szabadon forog. A CTA-t **szándékosan NEM** pineljük P3-ra (mobilon a 3. címsor gyakran nem jelenik meg, ott pont eltűnne).
- Ha a szempilla csoportban már ott a régi RSA, és nem akarsz 3-at: az egyik importáltat állítsd Paused-ra.

---

## 3. NEGATÍV KULCSSZAVAK — beillesztéssel (NEM fájlból!)

> ❗ A negatívokat **soha ne** fájl-importtal vidd be — az Editor pozitív kulcsszóként húzná be őket. Beillesztés a kizáró panelba: ott a kontextus = negatív.
> Szintaxis a beillesztett szövegben: `szó` = broad · `"szó szó"` = phrase · `[szó]` = exact.

### 3/a — KAMPÁNY-szintű kizárók
Editor: válaszd ki a **Szempilla_V2.0** kampányt → bal panel **Keywords → Negative keywords** → **Campaign negatives** → `Make multiple changes` → *„My data includes campaign/ad group columns" KIKAPCSOLVA* → illeszd be:

```
műszempilla
microblading
"szempilla építés"
"szempilla hosszabbítás"
"volume lash"
"volumen szempilla"
"orosz szempilla"
"3d szempilla"
"5d szempilla"
"hibrid szempilla"
"tincses szempilla"
"szempilla leszedés"
"szemöldök tetoválás"
"szemöldök tetkó"
"pmu szemöldök"
"henna szemöldök"
tanfolyam
képzés
oktatás
kezdő
házilag
otthon
diy
hogyan
kellék
eszköz
szett
alapanyag
ingyen
olcsó
állás
fizetés
bérezés
jelentkezés
férfi
ferfi
```

> Ezek a NEM kínált szolgáltatásokat (műszempilla építés/volumen, microblading, tetoválás, henna), a DIY/tanuló keresőket, az árvadászokat, az álláskeresőket és a férfiakat zárják ki. → minden elköltött forint releváns, vásárlói szándékú kattintásra megy = alacsonyabb CPA.
> **Már bent van (NE vidd be újra):** `ár`, `árak`, `érd`, `dunakeszi`, `veresegyház`, távoli városok, `szempilla festés`, `szemöldök festés`.

### 3/b — HIRDETÉSCSOPORT-szintű kereszt-negatívok
Cél: a tiszta szempilla-keresés ne a szemöldök csoportot triggerelje (a combo szabad marad). Válaszd ki a **„Szemöldök laminálás"** csoportot → **Negative keywords (ad group)** → beillesztés:

```
"szempilla lifting"
"lash lift"
```

> A „Szempilla lifting" csoportba **szándékosan nem** teszünk szemöldök-negatívot — így a combo („szempilla és szemöldök") a magasabb értékű szempilla oldalra fut.

---

## 4. 🔴 5 KÁROS NEGATÍV TÖRLÉSE (kézzel — import nem töröl!)

Ezek saját/releváns forgalmat fojtanak. Editor: **Szempilla_V2.0 → Negative keywords (campaign)** → jelöld ki és **Remove**:

```
"11 kerület"
"13 kerület"
"18 kerület"
"lifting pestañas"
"inlei lash filler kezelés"
```

(A 11/13/18 budapesti kerületeket, a spanyol konvertáló forgalmat és magát a lash-lift szolgáltatást blokkolják.)

---

## 5. KAMPÁNY-SZINTŰ BEÁLLÍTÁSOK (Editor-panel / UI — nem CSV)

- **Licit:** **Maximize Conversions + cél-CPA 1500 Ft** (a 1150-ről FELemelve, NEM levéve). Indok: a naptár **félig telt** + az árrés a CPA 15-30-szorosa → a cél most a szék megtöltése, nem a CPA-minimum. Egy üres szék-óra örökre odavan; egy drágább katt olcsó tandíj. A tCPA MARAD guardrailnek (korlátlan Max Conv tilos a laza Notino-katt mérés miatt), csak bőkezűen. **2 hét után VALÓS foglaláshoz igazítsd** (kérdezd Fruzsinát: hány új Google-vendég jött), ne a felfújt konverziószámhoz. Ha közben ~80%+ telítettség → fordíts: árat emelj, keretet húzz vissza.
- **Keret:** **7000 Ft/nap mennyezet** (5000-ről emelve — fejtér, nem cél; az emelt tCPA több aukciót nyer, a jó napokat ne vágja le a budget). **Megosztott pool** — NE oszd ketté a két szolgáltatás közt (egy konverzió-pool = gyorsabb betanulás).
- **Földrajz:** 10 km sugár, Egressy út 16. (marad) · **Jelenlét:** „akik a célterületen vannak" (nem az érdeklődők).
- **Nem:** Férfi −100% · **Ismeretlen nem: HAGYD BE** (a volumen nagy része ide esik).
- **Kor/eszköz/napszak:** induláskor megfigyelésre, módosítás nélkül; 30 nap adat után optimalizálj.
- **Bővítmények:** ár-bővítmény (12.000 / 11.000 / 18.000 / 26.000 Ft), promóció („Teljes Tekintet −5.000 Ft"), callout, struktúrált kódrészlet (Szolgáltatások), **hívás** (+36 70 215 9954) és **hely** (GBP: Egressy út 16.) — lásd a stratégiai üzenetet.
- **Hívás-konverzió:** a `tel:` kattintás mostantól **kódszinten tüzeli** ugyanazt az „Időpontfoglalás" konverziót (`src/layouts/Layout.astro` → `fireCallEvents`). Ellenőrizd a Google Ads-ben, hogy beérkeznek a hívás-konverziók. Opcionális finomítás: hozz létre **külön hívás-konverziós akciót** (saját címke), és cseréld a kódban a `CALL_SEND_TO` értéket — így szét tudod választani az online vs. telefonos foglalási szándékot.

---

## VÉGSŐ SORREND
1. Fiók letöltése → szempilla csoport átnevezése `Szempilla lifting`-re.
2. `01_keywords.csv` import.
3. `02_responsive_search_ads.csv` import.
4. Kampány-negatívok beillesztése (3/a) + kereszt-negatívok (3/b).
5. 5 káros negatív törlése (4).
6. Licit → Maximize Conversions + **cél-CPA 1500** + keret **7000** + bővítmények (5).
7. **Post changes** (Módosítások közzététele).
