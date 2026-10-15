# -*- coding: utf-8 -*-
"""
Lezer_V1 — Google Ads import-csomag generátor ÉS validátor.

MIÉRT SCRIPT, NEM KÉZZEL ÍRT CSV: a Google Ads minden karakterlimitet némán levág vagy
elutasít az importnál, és a hibát csak a feltöltés után látod. Ez a fájl a forrás; a CSV-k
generált termékek. Ha bármit módosítasz, futtasd újra:

    python build_lezer_v1.py

Nem ír ki fájlt, ha bármelyik ellenőrzés bukik. Ez a lényege.

FORRÁSOK (minden állítás ellenőrizve 2026-09-16-án):
  - árak, zónaidők, vállalások: ../src/data/lezer.ts
  - céloldal-horgonyok:         élő DOM, frubeauty.com/lezeres-szortelenites-budapest/
  - kulcsszó-volumen:           ../lezer/GKP-*.tsv
"""
import csv, io, os, re, sys, unicodedata

CAMP = "Lezer_V1"
BASE = "https://frubeauty.com/lezeres-szortelenites-budapest/"
U_AR = BASE + "#arak"
U_BI = BASE + "#bikinivonal"
U_KA = BASE + "#kapcsolat"

errors, warnings = [], []


def err(m):
    errors.append(m)


def warn(m):
    warnings.append(m)


# ─────────────────────────────────────────────────────────────────────────────
# ELLENŐRZŐ RÉTEG — a Google Ads szerkesztői és formai szabályai
# ─────────────────────────────────────────────────────────────────────────────
EMOJI = re.compile(
    "[←-⇿⌀-➿⬀-⯿️‍"
    "\U0001F000-\U0001FAFF★☆✓✔✗©®™]"
)
# A Google elutasítja: csillag, pipa, emoji, hullámjel, ismételt írásjel.
BANNED_SUBSTR = ["~", "!!", "??", "...", "  ", "%%", "#1", "№"]


def check_text(s, limit, where, allow_excl=False):
    if s is None or s == "":
        err("%s: üres" % where)
        return
    n = len(s)
    if n > limit:
        err("%s: %d karakter (max %d) — %r" % (where, n, limit, s))
    if EMOJI.search(s):
        err("%s: emoji/szimbólum — %r" % (where, s))
    for b in BANNED_SUBSTR:
        if b in s:
            err("%s: tiltott karaktersor %r — %r" % (where, b, s))
    if not allow_excl and "!" in s:
        err("%s: felkiáltójel (címsorban tilos) — %r" % (where, s))
    # túlzó nagybetűzés: 4+ betűs csupa nagybetűs szó
    for w in re.findall(r"[^\W\d_]+", s, re.UNICODE):
        if len(w) >= 4 and w == w.upper() and w != w.lower():
            err("%s: csupa nagybetűs szó %r — %r" % (where, w, s))
    if s != s.strip():
        err("%s: vezető/záró szóköz — %r" % (where, s))
    for ch in s:
        if unicodedata.category(ch) in ("Cc", "Cf") or ch == " ":
            err("%s: nem nyomtatható vagy nem törhető szóköz — %r" % (where, s))


def check_url(u, where):
    if not u.startswith("https://frubeauty.com/"):
        err("%s: nem a saját domainre mutat — %s" % (where, u))
    if " " in u:
        err("%s: szóköz az URL-ben — %s" % (where, u))


def check_keyword(k, where):
    if len(k) > 80:
        err("%s: %d karakter (max 80) — %r" % (where, len(k), k))
    if len(k.split()) > 10:
        err("%s: %d szó (max 10) — %r" % (where, len(k.split()), k))
    for ch in '!@%,*':
        if ch in k:
            err("%s: tiltott karakter %r a kulcsszóban — %r" % (where, ch, k))
    if k != k.lower():
        warn("%s: nem csupa kisbetű (működik, de rendetlen) — %r" % (where, k))


# ─────────────────────────────────────────────────────────────────────────────
# 1. KULCSSZAVAK
# ─────────────────────────────────────────────────────────────────────────────
KW = {
    "Fej kulcsszo": (
        ["lézeres szőrtelenítés", "lézeres szőrtelenítés budapest", "végleges szőrtelenítés",
         "végleges szőrtelenítés budapest", "végleges lézeres szőrtelenítés", "tartós szőrtelenítés",
         "lezeres szortelenites", "lezer szortelenites", "vegleges szortelenites",
         "szőrtelenítés budapest", "lézeres szőrtelenítés zugló", "lézeres szőrtelenítés 14. kerület",
         "lézeres szőrtelenítés xiv kerület",
         # 2026-09-23: a „kozmetika zugló" KIKERÜLT (élesben szüneteltetve). 6 megjelenés
         # nulla kattintással, a közeli változata („zugló kozmetikus") pedig elvitt egy
         # 449 Ft-os kattintást konverzió nélkül. Aki kozmetikust keres Zuglóban, nem
         # lézer-céloldalt vár — a szándék nem illeszkedik, nem a kulcsszó rossz.
         # 2026-09-18, GKP-bányászat (1 208 kulcsszó): ez az öt az EGYETLEN maradék
         # tétel a fej-klaszterben, ami 20/hó FÖLÖTT van, tehát nem esik azonnal
         # „alacsony keresési arány" státuszba. A csupasz „szőrtelenítés" a legnagyobb
         # kihagyott blokk (140/hó); exact-ban tartjuk, mert a szándéka tág.
         "szőrtelenítés", "szortelenites", "lézeres szőrtelenítés vélemények",
         "végleges szőrtelenítés vélemények", "legjobb végleges szőrtelenítés"],
        ["lézeres szőrtelenítés budapest", "végleges szőrtelenítés budapest",
         "lézeres szőrtelenítés zugló", "lézeres szőrtelenítés vélemények"]),
    "Dioda lezer": (
        ["dióda lézeres szőrtelenítés", "diódalézeres szőrtelenítés", "dióda lézer szőrtelenítés",
         "dióda lézeres szőrtelenítés ára", "dióda lézeres szőrtelenítés árak",
         "dióda lézeres szőrtelenítés budapest", "dióda lézeres szőrtelenítés vélemény",
         "dióda lézeres szőrtelenítés vélemények", "diodalezeres szortelenites",
         "dioda lezeres szortelenites", "dióda lézer", "soprano titanium szőrtelenítés",
         "soprano lézeres szőrtelenítés"],
        ["dióda lézeres szőrtelenítés", "diódalézeres szőrtelenítés", "dióda lézer szőrtelenítés"]),
    "Lezer arak": (
        ["lézeres szőrtelenítés árak", "lézeres szőrtelenítés ára",
         "lézeres szőrtelenítés árak budapest", "lézeres szőrtelenítés ár",
         "végleges szőrtelenítés árak", "végleges szőrtelenítés ára",
         "végleges lézeres szőrtelenítés árak", "lézeres szőrtelenítés akció",
         "lézeres szőrtelenítés hány alkalom", "lézeres szőrtelenítés mennyibe kerül",
         "lézeres szőrtelenítés hónalj ár", "lézeres szőrtelenítés árlista"],
        ["lézeres szőrtelenítés ár", "végleges szőrtelenítés ár",
         "lézeres szőrtelenítés hány alkalom", "lézeres szőrtelenítés akció"]),
    "Zonak": (
        ["intim szőrtelenítés", "intim lézeres szőrtelenítés", "lézeres intim szőrtelenítés",
         "teljes intim lézeres szőrtelenítés", "végleges intim szőrtelenítés",
         "intim végleges szőrtelenítés", "női intim szőrtelenítés", "bikinivonal szőrtelenítés",
         "bikinivonal lézeres szőrtelenítés", "bikini lézeres szőrtelenítés",
         "hónalj lézeres szőrtelenítés", "hónalj szőrtelenítés", "arc szőrtelenítés",
         "lézeres arc szőrtelenítés", "lézeres szőrtelenítés arcon", "végleges szőrtelenítés arcon",
         "végleges arc szőrtelenítés nőknek", "hát szőrtelenítés", "lábszár szőrtelenítés",
         "teljes láb szőrtelenítés", "bajusz szőrtelenítés",
         # 2026-09-18: a „fül szőrtelenítés" KIKERÜLT — a lezer.ts árlistáján nincs fül
         # zóna (XS felső ajak/áll · S hónalj/bikinivonal/tarkó/nyak/arc oldala ·
         # M alkar/felkar/váll/has/derék/popsi/teljes arc · L lábszár/comb/hát/mellkas/kar
         # · XL teljes láb/hát+váll), tehát nem eladható szolgáltatásra hirdettünk.
         # Helyette a GKP két 20/hó fölötti maradék tétele:
         "szőrtelenítés bikinivonal", "intim szortelenites",
         # 2026-09-23: a keresési kifejezés-jelentésből ELŐLÉPTETVE. Mindkettő
         # KONVERTÁLT, még mielőtt kulcsszó lett volna (kifejezés-egyezésen jött be):
         # „lézeres szőrtelenítés intim területen" 265 Ft CPA, „intim lezeres
         # szortelenites" 492 Ft CPA, mindkettő 100%-os konverziós aránnyal — ezek a
         # kampány legolcsóbb konverziói, a fej-kulcsszavak CPA-jának töredéke.
         "lézeres szőrtelenítés intim területen", "intim lezeres szortelenites"],
        ["intim lézeres szőrtelenítés", "bikinivonal lézeres szőrtelenítés",
         "lézeres arc szőrtelenítés", "hónalj lézeres szőrtelenítés"]),
    "Alternativa": (
        ["elektrolízis szőrtelenítés", "elektrolízises szőrtelenítés", "shr szőrtelenítés",
         "tűs epilálás", "gyantázás budapest", "gyantázó szalon", "brazil gyantázás",
         "intim gyanta", "intim gyantázás", "ipl szőrtelenítés", "villanófényes szőrtelenítés",
         "cukorpaszta szőrtelenítés"],
        ["gyantázás budapest", "elektrolízis szőrtelenítés", "shr szőrtelenítés"]),
}

# ─────────────────────────────────────────────────────────────────────────────
# 2. HIRDETÉSEK
#
# A SZÖVEG DOKTRÍNÁJA (vbro-marketing / vakfoltok.md, „Szépészet / esztétika"):
#   a domináns súrlódás KOCKÁZATI, nem motivációs. A vevő nem attól fél, hogy nem
#   lesz szép — attól fél, hogy elrontják, hogy fáj, és hogy kifizet 66 000 Ft-ot
#   olyanért, ami rajta nem működik. Ezért EGYETLEN vágykeltő jelző sincs a
#   szövegben. Minden címsor vagy ÁR, vagy KOCKÁZAT-OLDÁS, vagy BIZONYÍTÉK.
#
# HANGNEM (2026-09-17, a tulajdonos kérésére KÖTELEZŐ, lásd a lézer-oldal fejléc-
# kommentárját, „A TULAJDONOS ÁTOLVASÁSA (2026-09-15)"): a kockázat-oldás NEM
# lehet flegma. Három tiltás, ami ezt a blokkot alakította:
#   a) NE mondd meg a vendégnek, mit tegyen a saját testével vagy életével.
#      Kiesett: „Borotválva Jössz, Nem Kinőve", „Ősszel Kezdd, Nyárra Kész",
#      „Számold Ki A Saját Árad", „Nem Kell Visszanövesztened".
#   b) A haszon ÁLLAPOT legyen, ne felszólítás: „Tartósan Sima Bőr",
#      „Nyárra Kész A Sorozat" — nem „kezdd el" és nem „dobd el".
#   c) A korlátot ne elutasításként írd le, hanem közös átbeszélésként.
#      Kiesett: „Barnult bőrön nem kezdek", „Ha Nem Működne, Megmondom".
#      Helyette: „Előtte átbeszéljük" — ugyanaz a tény, gondoskodó keretben.
# Ezt a hármat a szövegre KÉZZEL kell lefuttatni: a validátor karaktert és
# szerkesztői szabályt néz, hangnemet nem tud mérni.
#
# Minden állítás forrása a lezer.ts, és szó szerint visszakereshető. Google Ads
# szerkesztői szempontból ez azért fontos, mert a céloldal igazolja a hirdetést.
#
# PINELÉS: csoportonként 3 kulcsszó-egyező címsor a P1-re. A fiók korábbi tapasztalata
# (2026-06-03): 1 pin „Átlagos"-ra vitte az Ad Strength-et, 2-3 pin visszahozta „Jó"-ra,
# és közben minden kereső kulcsszó-egyező címsort lát elöl. P2/P3-ra NEM pinelünk.
# ─────────────────────────────────────────────────────────────────────────────
ADS = {
    "Fej kulcsszo": dict(url=BASE, p1="lezer", p2="budapest", headlines=[
        ("Lézeres Szőrtelenítés Bp.", "1"),
        ("Végleges Szőrtelenítés", "1"),
        ("Dióda Lézer Budapest XIV.", "1"),
        ("Tartósan Sima Bőr", ""),
        ("Alkalmanként 11.000 Ft", ""),
        ("Hat Alkalom, 66.000 Ft", ""),
        ("Nincs Előre Utalás", ""),
        ("Fizetés A Helyszínen", ""),
        ("Előtte Átbeszéljük", ""),
        ("Hűtött Kezelőfejjel", ""),
        ("Fotóval Követem A Haladást", ""),
        ("Egyszerre Egy Vendég", ""),
        ("Nyárra Kész A Sorozat", ""),
        ("5,0 Csillagos Vélemények", ""),
        ("Egressy Út 16., Zugló", ""),
    ], descriptions=[
        "Hónalj vagy bikinivonal 11.000 Ft alkalmanként, a hat alkalmas sorozat árán.",
        "Alkalmanként fizeted, a helyszínen. Nincs előre utalás és nincs bérlet.",
        "Hűtött kezelőfejjel dolgozom, a bőrtípusodhoz állított energiával.",
        "Foglalás előtt átbeszéljük, hogy a te szálszíneden mire számíthatsz.",
    ]),
    "Dioda lezer": dict(url=BASE, p1="lezer", p2="dioda", headlines=[
        ("Dióda Lézeres Szőrtelenítés", "1"),
        ("Dióda Lézer Budapesten", "1"),
        ("Soprano Titanium Zuglóban", "1"),
        ("Három Hullámhossz Egyben", ""),
        ("Alkalmanként 11.000 Ft", ""),
        ("Hat Alkalom, 66.000 Ft", ""),
        ("Nincs Előre Utalás", ""),
        ("Előtte Átbeszéljük", ""),
        ("Hűtött Kezelőfejjel", ""),
        ("Bőrtípusodhoz Állítva", ""),
        ("Világos És Sötét Bőrre Is", ""),
        ("Fotóval Követem A Haladást", ""),
        ("Egyszerre Egy Vendég", ""),
        ("5,0 Csillagos Vélemények", ""),
        ("Egressy Út 16., Zugló", ""),
    ], descriptions=[
        "Soprano Titanium dióda lézer, három hullámhosszon. Hónalj 11.000 Ft alkalmanként.",
        "Alkalmanként fizeted, a helyszínen, a sorozat árán. Nincs előre utalás.",
        "A bőrtípusodhoz állítom az energiát, és hűtött kezelőfejjel dolgozom.",
        "Sötétszőke, barna és fekete szálon működik a legjobban — előtte átbeszéljük.",
    ]),
    "Lezer arak": dict(url=U_AR, p1="lezer", p2="arak", headlines=[
        ("Lézeres Szőrtelenítés Ára", "1"),
        ("Lézer Árak Budapesten", "1"),
        ("Teljes Árlista Egy Oldalon", "1"),
        ("Hónalj Alkalmanként 11.000", ""),
        ("Hat Alkalom Összesen 66.000", ""),
        ("Bikinivonal 11.000 Ft-tól", ""),
        ("Három Zóna Egy Időpontban", ""),
        ("Nincs Bérlet És Nincs Előleg", ""),
        ("Nincs Előre Utalás", ""),
        ("Rejtett Díj Nélkül", ""),
        ("Kalkulátor Az Árlistán", ""),
        ("Előtte Átbeszéljük", ""),
        ("Hat Alkalom, 4-6 Hetente", ""),
        ("5,0 Csillagos Vélemények", ""),
        ("Egressy Út 16., Zugló", ""),
    ], descriptions=[
        "Hónalj és bikinivonal 11.000 Ft alkalmanként, a hat alkalom összesen 66.000 Ft.",
        "Alkalmanként fizeted, a helyszínen. Nincs bérlet, nincs előleg, nincs rejtett díj.",
        "A kalkulátorban összeáll a saját zónaválogatásod, és kiadja a pontos végösszeget.",
        "Három zóna egy időpontban: hónalj, bikinivonal és lábszár 37.000 Ft alkalmanként.",
    ]),
    "Zonak": dict(url=U_BI, p1="lezer", p2="zonak", headlines=[
        ("Intim Lézeres Szőrtelenítés", "1"),
        ("Bikinivonal Lézerrel", "1"),
        ("Hónalj Lézeres Kezelés", "1"),
        ("Alkalmanként 11.000 Ft", ""),
        ("Hat Alkalom, 66.000 Ft", ""),
        ("Három Zóna Egy Időpontban", ""),
        ("Nincs Előre Utalás", ""),
        ("Intim Zónán Is Kíméletesen", ""),
        ("Egyszerre Egy Vendég", ""),
        ("Előtte Átbeszéljük", ""),
        ("Nincs Benőtt Szál Utána", ""),
        ("Dióda Lézer, Nem Villanófény", ""),
        ("Fotóval Követem A Haladást", ""),
        ("5,0 Csillagos Vélemények", ""),
        ("Egressy Út 16., Zugló", ""),
    ], descriptions=[
        "Hónalj, bikinivonal, tarkó: 11.000 Ft alkalmanként, a hat alkalmas sorozat árán.",
        "Intim területen alacsonyabb energiáról indulok, hűtött kezelőfejjel.",
        "Alkalmanként fizeted, a helyszínen. Nincs előre utalás és nincs bérlet.",
        "Három zóna egy időpontban 37.000 Ft: hónalj, bikinivonal és lábszár együtt.",
    ]),
    "Alternativa": dict(url=BASE, p1="lezer", p2="gyanta-helyett", headlines=[
        ("Gyanta Helyett Lézer", "1"),
        ("Gyantázás Helyett Zuglóban", "1"),
        ("Dióda Lézer Zuglóban", "1"),
        ("Hat Alkalom Az Egész Sorozat", ""),
        ("Nem Kell Kinőnie A Szálnak", ""),
        ("Nincs Benőtt Szál Utána", ""),
        ("Alkalmanként 11.000 Ft", ""),
        ("Hat Alkalom, 66.000 Ft", ""),
        ("Nincs Előre Utalás", ""),
        ("Hűtött Kezelőfejjel", ""),
        ("Előtte Átbeszéljük", ""),
        ("Tartósan Sima Bőr", ""),
        ("Fotóval Követem A Haladást", ""),
        ("5,0 Csillagos Vélemények", ""),
        ("Egressy Út 16., Zugló", ""),
    ], descriptions=[
        "A gyanta négyhetente ismétlődik. A lézer hat alkalom, utána évi egy karbantartás.",
        "A sorozat végére a szálak nagy része nem nő vissza, a többi vékonyabb és ritkább.",
        "Hónalj vagy bikinivonal 11.000 Ft alkalmanként, a hat alkalom 66.000 Ft.",
        "Alkalmanként fizeted, a helyszínen. Nincs előre utalás és nincs bérlet.",
    ]),
}

# ─────────────────────────────────────────────────────────────────────────────
# 3. KIZÁRÓ KULCSSZAVAK
# ─────────────────────────────────────────────────────────────────────────────
CAMPAIGN_NEG = {
    "KÉSZÜLÉK (szőrtelenítŐ = gép, nem szolgáltatás)": [
        "szőrtelenítő", "szortelenito", "szőrtelenítők", "krém", "krem", "gép", "gep", "gépek",
        "gépet", "készülék", "keszulek", "készüléket", "epilátor", "epilator", "borotva",
        "borotválkozás", "spray", "hab", "olaj", "zselé", "zsele", "csipesz", "szálanként"],
    "MÁRKA (készülék-gyártók)": [
        "philips", "braun", "lumea", "remington", "veet", "sanitas", "x epil", "xepil", "beurer",
        "silk expert", "kristály", "rowenta", "panasonic", "bosch"],
    "BOLT / VÁSÁRLÁS": [
        "media markt", "mediamarkt", "emag", "alza", "rossmann", "dm", "tesco", "auchan",
        "árukereső", "arukereso", "eladó", "elado", "webshop", "rendelés", "vásárlás", "vasarlas",
        "olcsón", "használt", "hasznalt", "árgép"],
    "OTTHONI / DIY": [
        "otthoni", "otthon", "házilag", "hazilag", "diy", "saját kezűleg", "házi", "recept"],
    "GÉPVÁSÁRLÁS / ÜZLET / KÉPZÉS": [
        "gép ár", "gép ára", "gép árak", "bérlés", "berles", "kölcsönzés", "lízing", "salontech",
        "zeon", "viszonteladó", "forgalmazó", "tanfolyam", "képzés", "kepzes", "oktatás", "iskola",
        "okj", "állás", "munka", "franchise", "üzleti terv"],
    "MÁS LÉZER-FELHASZNÁLÁS": [
        "szemműtét", "szemlézer", "tetoválás", "tetkó", "tetovalas", "hegkezelés", "bőrmegújítás",
        "visszér", "hajbeültetés", "körömgomba", "fogfehérítés", "lézerterápia", "pattanás",
        "kutya", "macska", "állatorvos"],
    # 2026-09-18, a GKP-bányászatból JÖTT ÚJ KIZÁRÓK. Mindegyik olyan keresés, ami
    # átcsúszott a meglévő 193 kizárón, de vagy készülék-szándék, vagy olyan zóna,
    # amit a szalon nem vállal lézerrel. A „szemöldök" külön fontos: a szalon CSINÁL
    # szemöldök-laminálást és -gyantázást, tehát az a forgalom létezik — csak nem
    # ezen a céloldalon kell landolnia.
    # 2026-09-20, az ELSŐ VALÓDI keresési kifejezés-jelentésből (96 megj., 7 katt).
    # Angol nyelvű keresések csúsztak be „közeli változat" egyezéssel — turisták, akik
    # egy 6-8 hónapos sorozatot nem tudnak végigcsinálni. A legdrágább kattintás közülük
    # 652 Ft volt. A nyelvi beállításból is kikerült az angol, ez a második réteg.
    # Mellette: rossz szolgáltatás (arckezelés) és egy versenytárs-név.
    "ÚJ 2026-09-20: ANGOL / ROSSZ SZOLGÁLTATÁS / VERSENYTÁRS": [
        "laser", "hair removal", "electrolysis", "arckezelés", "arckezeles", "dr b esth"],
    "ÚJ 2026-09: KÉSZÜLÉK ÉS NEM VÁLLALT ZÓNA": [
        "elektromos", "szemöldök", "szemoldok", "orr", "fül", "ful", "homlok"],
    "MÁS GÉPTÍPUS (nálunk dióda van)": [
        "alexandrit", "elysion", "candela", "gentlemax", "deka", "quanta", "motus", "rubin lézer",
        "diolaze"],
    "VERSENYTÁRS": [
        "alma beauty", "foreverderm", "everderm", "skinspirit", "medaid", "evln", "oxygen medical",
        "bársony", "aesthetica", "medicare esztétika", "inspira medical", "be pretty",
        "ikra beauty", "lézi", "laser studio", "lézer stúdió", "lezer studio"],
    "FÉRFI SZÁNDÉK (a szalon nem vállal férfi vendéget)": [
        "férfi", "férfiak", "férfiaknak", "férfias", "ferfi", "ferfiak", "ferfiaknak", "here",
        "herezacskó", "mellkas", "szakáll", "szakall", "pénisz", "urak", "men", "male", "for men"],
    "NEM SZOLGÁLTATÁS-SZÁNDÉK": [
        "veszélyei", "veszélyes", "mellékhatás", "wikipedia", "mi az", "ingyen", "ingyenes",
        "groupon", "kupon", "ősz szőr", "fehér szőr", "szőke szőrre", "terhesség alatt",
        "gyermeknek"],
    "TÁVOLI VÁROS": [
        "debrecen", "szeged", "győr", "gyor", "pécs", "pecs", "miskolc", "nyíregyháza", "kecskemét",
        "székesfehérvár", "szombathely", "veszprém", "tatabánya", "sopron", "eger", "zalaegerszeg",
        "kaposvár", "békéscsaba", "szolnok", "dunaújváros", "salgótarján", "esztergom", "siófok",
        "hévíz", "balaton", "ausztria", "bécs", "szlovákia", "románia", "kassa", "érd", "dunakeszi",
        "gödöllő", "vác"],
}
AG_NEG = ["gyanta", "gyantázás", "gyantazas", "gyantázó", "gyantázni", "wax", "waxing",
          "cukorpaszta", "cukorpasztázás", "elektrolízis", "elektrolizis", "tűs epilálás",
          "tus epilalas", "shr", "ipl", "villanófényes", "villanofenyes", "epilálás", "epilalas",
          "szálankénti"]
AG_NEG_GROUPS = ["Fej kulcsszo", "Dioda lezer", "Lezer arak", "Zonak"]

# CSOPORTONKÉNT ELTÉRŐ kizárók. Az AG_NEG közös listája mind a 4 csoportra megy, ez
# viszont csak a megnevezettre. 2026-09-23: a `dioda` a Fej kulcsszo-ba kerül, mert a
# „dioda lezeres szortelenites budapest" keresést MINDKÉT csoport elkapta — a Dioda
# lezer 424 Ft-ért, a Fej kulcsszo viszont 1 262 Ft-ért, konverzió nélkül. Így a
# dióda-keresések csak a saját, relevánsabb csoportjukban versenyeznek.
AG_NEG_EXTRA = {"Fej kulcsszo": ["dioda", "dióda"]}

# ─────────────────────────────────────────────────────────────────────────────
# 4. ASSETEK
# ─────────────────────────────────────────────────────────────────────────────
SITELINKS = [
    ("Teljes árlista", "Zónánkénti árak, hat alkalom", "Hónalj 11.000 Ft alkalmanként", U_AR),
    ("Bikinivonal és hónalj", "A két leggyakoribb zóna", "30 perc, 11.000 Ft alkalmanként", U_BI),
    ("Cím és nyitvatartás", "Budapest XIV., Egressy út 16.", "Hétköznap 8 és 19 óra között", U_KA),
    ("Kinek működik", "Szálszín és bőrtípus szerint", "Foglalás előtt átbeszéljük", BASE),
]
CALLOUTS = ["Alkalmanként fizeted", "Nincs bérlet és előleg", "Hűtött kezelőfej",
            "Egyszerre egy vendég", "Fotó minden alkalom előtt", "Előtte átbeszéljük",
            "Hat alkalom, 4-6 hetente", "Zugló, Egressy út 16."]
SNIPPET_HEADER = "Szolgáltatások"
SNIPPETS = ["Hónalj", "Bikinivonal", "Lábszár", "Teljes láb", "Hát", "Alkar", "Felső ajak", "Áll"]
PRICES = [
    ("Hónalj", "alkalmanként, sorozatban", "11000", U_AR),
    ("Bikinivonal", "alkalmanként, sorozatban", "11000", U_BI),
    ("Alkar vagy has", "alkalmanként, sorozatban", "16000", U_AR),
    ("Lábszár vagy hát", "alkalmanként, sorozatban", "23000", U_AR),
    ("Teljes láb", "alkalmanként, sorozatban", "33000", U_AR),
    ("Három zóna együtt", "alkalmanként, sorozatban", "37000", U_AR),
]

# ─────────────────────────────────────────────────────────────────────────────
# VALIDÁLÁS
# ─────────────────────────────────────────────────────────────────────────────
for ag, (ex, ph) in KW.items():
    for k in ex:
        check_keyword(k, "kulcsszó[%s/exact]" % ag)
    for k in ph:
        check_keyword(k, "kulcsszó[%s/phrase]" % ag)
    if len(set(ex)) != len(ex):
        err("kulcsszó[%s]: duplikátum az exact listában" % ag)

for ag, a in ADS.items():
    hs = [h for h, _ in a["headlines"]]
    if len(hs) != 15:
        err("RSA[%s]: %d címsor (15 kell a maximális kombinációhoz)" % (ag, len(hs)))
    if len(set(hs)) != len(hs):
        dup = [h for h in set(hs) if hs.count(h) > 1]
        err("RSA[%s]: ISMÉTLŐDŐ címsor %r — a Google elutasítja" % (ag, dup))
    if len(set(a["descriptions"])) != len(a["descriptions"]):
        err("RSA[%s]: ismétlődő leírás" % ag)
    if len(a["descriptions"]) != 4:
        err("RSA[%s]: %d leírás (4 kell)" % (ag, len(a["descriptions"])))
    pins = [p for _, p in a["headlines"] if p == "1"]
    if len(pins) < 2:
        err("RSA[%s]: %d P1-pin — 1 pin lerontja az Ad Strength-et, 2-3 kell" % (ag, len(pins)))
    if len(pins) > 3:
        err("RSA[%s]: %d P1-pin — 3 fölött elfogy a tesztelhető kombináció" % (ag, len(pins)))
    for h, _ in a["headlines"]:
        check_text(h, 30, "RSA[%s].címsor" % ag)
    for d in a["descriptions"]:
        check_text(d, 90, "RSA[%s].leírás" % ag, allow_excl=False)
    check_text(a["p1"], 15, "RSA[%s].Path1" % ag)
    check_text(a["p2"], 15, "RSA[%s].Path2" % ag)
    check_url(a["url"], "RSA[%s].FinalURL" % ag)
    if set(KW.keys()) and ag not in KW:
        err("RSA[%s]: nincs hozzá kulcsszócsoport" % ag)

for ag in ADS:
    if ag not in KW:
        err("Hirdetéscsoport eltérés: %s" % ag)

seen = set()
for grp, ks in CAMPAIGN_NEG.items():
    for k in ks:
        check_keyword(k, "kizáró[%s]" % grp)
        if k in seen:
            warn("kizáró: duplikátum %r (%s)" % (k, grp))
        seen.add(k)

# ütközés-ellenőrzés: kizáró, ami saját pozitív kulcsszót blokkolna
for ag, (ex, ph) in KW.items():
    for k in ex + ph:
        words = set(re.findall(r"[^\W\d_]+", k.lower(), re.UNICODE))
        for neg in seen:
            if " " in neg:
                if neg in k:
                    if not (ag == "Alternativa" and neg in (" ".join(AG_NEG))):
                        err("ÜTKÖZÉS: a(z) %r kampány-kizáró blokkolná a(z) %r kulcsszót [%s]"
                            % (neg, k, ag))
            elif neg in words:
                err("ÜTKÖZÉS: a(z) %r kampány-kizáró blokkolná a(z) %r kulcsszót [%s]"
                    % (neg, k, ag))
# csoport-szintű kizárók nem érinthetik a saját csoportjuk kulcsszavait
for ag in AG_NEG_GROUPS:
    ex, ph = KW[ag]
    for k in ex + ph:
        for neg in AG_NEG + AG_NEG_EXTRA.get(ag, []):
            if (" " in neg and neg in k) or (" " not in neg and neg in
                                             set(re.findall(r"[^\W\d_]+", k.lower(), re.UNICODE))):
                err("ÜTKÖZÉS: a(z) %r csoport-kizáró blokkolná a(z) %r kulcsszót [%s]"
                    % (neg, k, ag))

for t, d1, d2, u in SITELINKS:
    check_text(t, 25, "sitelink.szöveg")
    check_text(d1, 35, "sitelink.leírás1")
    check_text(d2, 35, "sitelink.leírás2")
    check_url(u, "sitelink.URL")
if len({u for *_, u in SITELINKS}) != len(SITELINKS):
    err("sitelink: két sitelink ugyanarra az URL-re mutat — a Google elutasítja")
for c in CALLOUTS:
    check_text(c, 25, "callout")
check_text(SNIPPET_HEADER, 25, "snippet.fejléc")
if len(SNIPPETS) < 3:
    err("snippet: legalább 3 érték kell")
for s in SNIPPETS:
    check_text(s, 25, "snippet.érték")
if len(PRICES) < 3:
    err("ár-bővítmény: legalább 3 tétel kell")
for h, d, p, u in PRICES:
    check_text(h, 25, "ár.fejléc")
    check_text(d, 25, "ár.leírás")
    check_url(u, "ár.URL")
    if not p.isdigit():
        err("ár: nem szám — %r" % p)

# ─────────────────────────────────────────────────────────────────────────────
# KIÍRÁS
# ─────────────────────────────────────────────────────────────────────────────
if errors:
    print("HIBA — egyetlen fájl sem íródott ki:\n")
    for e in errors:
        print("  x " + e)
    sys.exit(1)


def write(name, rows):
    with io.open(name, "w", encoding="utf-8-sig", newline="") as f:
        csv.writer(f).writerows(rows)
    return "%-42s %4d sor" % (name, len(rows) - 1)


out = []

# kampány + hirdetéscsoport váz
rows = [["Campaign", "Campaign Daily Budget", "Campaign Type", "Status", "Networks",
         "Languages", "Bid Strategy Type"]]
rows.append([CAMP, "1200", "Search", "Paused", "Google search",
             # 2026-09-20: az ANGOL KIKERÜLT. A terv a szempilla-kampányra hivatkozva
             # tette be („az idegen nyelv is konvertált"), de az érv nem vihető át:
             # egy szempilla-liftinget egy turista meg tud csinálni, egy hat alkalmas,
             # négy-hat hetente ismétlődő sorozatot nem. Az első jelentésben angol
             # keresések (budapest laser, laser hair removal budapest, electrolysis
             # budapest) vitték a legdrágább kattintásokat.
             "hu", "Maximize conversions"])
out.append(write("lezer-v1-00-kampany.csv", rows))

rows = [["Campaign", "Ad Group", "Status", "Ad Group Type"]]
for ag in ADS:
    rows.append([CAMP, ag, "Paused" if ag == "Alternativa" else "Enabled", "Standard"])
out.append(write("lezer-v1-01-hirdetescsoportok.csv", rows))

rows = [["Campaign", "Ad Group", "Keyword", "Match Type", "Status"]]
for ag, (ex, ph) in KW.items():
    st = "Paused" if ag == "Alternativa" else "Enabled"
    for k in ex:
        rows.append([CAMP, ag, k, "Exact", st])
    for k in ph:
        rows.append([CAMP, ag, k, "Phrase", st])
out.append(write("lezer-v1-02-kulcsszavak.csv", rows))

hdr = ["Campaign", "Ad Group", "Ad Type", "Status", "Final URL", "Path 1", "Path 2"]
for i in range(1, 16):
    hdr += ["Headline %d" % i, "Headline %d position" % i]
hdr += ["Description %d" % i for i in range(1, 5)]
rows = [hdr]
for ag, a in ADS.items():
    r = [CAMP, ag, "Responsive search ad",
         "Paused" if ag == "Alternativa" else "Enabled", a["url"], a["p1"], a["p2"]]
    for h, p in a["headlines"]:
        r += [h, p]
    r += a["descriptions"]
    rows.append(r)
out.append(write("lezer-v1-03-hirdetesek.csv", rows))

rows = [["Campaign", "Ad Group", "Keyword", "Match Type", "Szint / indok"]]
for grp, ks in CAMPAIGN_NEG.items():
    for k in ks:
        rows.append([CAMP, "", k, "Phrase" if " " in k else "Broad", grp])
for ag in AG_NEG_GROUPS:
    for k in AG_NEG:
        rows.append([CAMP, ag, k, "Phrase" if " " in k else "Broad",
                     "ALTERNATÍV MÓDSZER — csak csoport-szinten"])
    for k in AG_NEG_EXTRA.get(ag, []):
        rows.append([CAMP, ag, k, "Phrase" if " " in k else "Broad",
                     "BELSŐ VERSENY — csak ebben a csoportban"])
out.append(write("lezer-v1-04-kizaro-kulcsszavak.csv", rows))

rows = [["Campaign", "Sitelink text", "Description line 1", "Description line 2", "Final URL"]]
for t, d1, d2, u in SITELINKS:
    rows.append([CAMP, t, d1, d2, u])
out.append(write("lezer-v1-05-sitelinkek.csv", rows))

rows = [["Campaign", "Callout text"]] + [[CAMP, c] for c in CALLOUTS]
out.append(write("lezer-v1-06-callout.csv", rows))

rows = [["Campaign", "Header", "Values"]]
rows.append([CAMP, SNIPPET_HEADER, ";".join(SNIPPETS)])
out.append(write("lezer-v1-07-strukturalt-kodreszlet.csv", rows))

rows = [["Campaign", "Price type", "Currency", "Price qualifier", "Item header",
         "Item description", "Item price", "Item unit", "Item final URL"]]
for h, d, p, u in PRICES:
    rows.append([CAMP, "Services", "HUF", "From", h, d, p, "per unit", u])
out.append(write("lezer-v1-08-arak.csv", rows))

# beillesztésre kész kizárók
with io.open("lezer-v1-kizaro-BEILLESZTHETO.txt", "w", encoding="utf-8") as f:
    f.write("=== 1. KAMPÁNY-SZINTŰ kizáró kulcsszavak — %s ===\n" % CAMP)
    f.write("Google Ads -> Kampány -> Közönségek, kulcsszavak és tartalom -> Keresési kulcsszavak\n")
    f.write("-> Kizáró kulcsszavak fül -> + -> Kampány kiválasztása -> beillesztés.\n\n")
    for grp, ks in CAMPAIGN_NEG.items():
        f.write("--- %s ---\n" % grp)
        for k in ks:
            f.write(('"%s"\n' % k) if " " in k else ("%s\n" % k))
        f.write("\n")
    f.write("\n=== 2. HIRDETÉSCSOPORT-SZINTŰ kizárók — CSAK ezekre a csoportokra ===\n")
    f.write("%s\n" % " / ".join(AG_NEG_GROUPS))
    f.write("Kampány-szintre NEM mehetnek: megölnék az Alternativa csoportot,\n")
    f.write("ami szándékosan ezekre a keresésekre megy.\n\n")
    for k in AG_NEG:
        f.write(('"%s"\n' % k) if " " in k else ("%s\n" % k))
    for ag2, ks in AG_NEG_EXTRA.items():
        f.write("\n--- CSAK a(z) %s csoportba (belso verseny) ---\n" % ag2)
        for k in ks:
            f.write(('"%s"\n' % k) if " " in k else ("%s\n" % k))
out.append("%-42s %4d kizáró" % ("lezer-v1-kizaro-BEILLESZTHETO.txt",
                                 len(seen) + len(AG_NEG) * len(AG_NEG_GROUPS)
                                 + sum(len(v) for v in AG_NEG_EXTRA.values())))

print("MINDEN ELLENŐRZÉS RENDBEN.\n")
for o in out:
    print("  " + o)
if warnings:
    print("\nFigyelmeztetés (nem blokkoló):")
    for w in warnings:
        print("  ! " + w)

print("\n--- Karakter-tartalék a limitekhez ---")
for ag, a in ADS.items():
    mh = max(len(h) for h, _ in a["headlines"])
    md = max(len(d) for d in a["descriptions"])
    print("  %-14s leghosszabb címsor %2d/30, leghosszabb leírás %2d/90" % (ag, mh, md))
