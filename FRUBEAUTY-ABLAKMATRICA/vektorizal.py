# -*- coding: utf-8 -*-
"""
FRUBEAUTY -- wordmark es monogram GORBESITETT vektorra alakitva.

Miert kell: minden megkerdezett budapesti folia-gyarto (Trillion Studio,
JolNyomjuk, Plotbase) gorbesitett vektort ker -- elo betutipussal nem
dolgoznak. A FRUBEAUTY-LOGO csomagban csak PNG van, es az OLVASSEL.md maga
irja, hogy vektor nincs. Ez a script potolja.

A betuk a weboldal SAJAT font-fajljaibol jonnek (public/fonts/*.woff2),
ugyanazokkal a beallitasokkal, amiket a _wordmark.html hasznal:
  nev  = Fraunces 400, opsz 144, letter-spacing -0.022em
  alcim= Geist 500, nagybetus, letter-spacing 0.18em
Az aranyokat a legyartott PNG-bol mertuk vissza (pixelpontosan), lasd RATIO.
"""
import io, sys, math, argparse
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform
import uharfbuzz as hb

FONTDIR = "../frubeauty-final/public/fonts/"

# A frubeauty-wordmark-ink.png-bol visszamert aranyok, a nev CAP-magassagahoz kepest.
RATIO = dict(
    name_w_per_cap = 1113/155.0,   # a "FRUBEAUTY" szelessege / cap-magassag
    rule_gap       = 34/155.0,     # alapvonal -> vonalzo teteje
    rule_thick     = 1/155.0,      # eredeti hajszal (a scriptben padlozva van)
    rule_w         = 1038/1113.0,  # vonalzo szelessege / nev szelessege
    sub_cap        = 35/155.0,     # alcim cap-magassaga / nev cap-magassaga
    sub_top        = 53/155.0,     # alapvonal -> alcim teteje
)

def load(path, loc=None):
    f = TTFont(path)
    if loc and "fvar" in f:
        f = instantiateVariableFont(f, loc, inplace=True, updateFontNames=False)
    f.flavor = None                 # a woff2 burkot le kell venni, kulonben a harfbuzz nem olvassa
    b = io.BytesIO(); f.save(b)
    return f, b.getvalue()

def shape(raw, text):
    face = hb.Face(raw); font = hb.Font(face)
    buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    hb.shape(font, buf, {"kern": True, "liga": True})
    return list(zip(buf.glyph_infos, buf.glyph_positions)), face.upem

def cap_height(f):
    """A tenyleges cap-magassag az 'F' bounding boxabol -- megbizhatobb, mint az OS/2 mezo."""
    gs = f.getGlyphSet(); order = f.getGlyphOrder()
    name = f.getBestCmap()[ord("F")]
    from fontTools.pens.boundsPen import BoundsPen
    bp = BoundsPen(gs); gs[name].draw(bp)
    return bp.bounds[3]

def run_paths(f, raw, text, scale, tracking_em, x0, baseline):
    """Egy szoveg-sor gorbesitve. Visszaad: (path-dek listaja, teljes szelesseg)."""
    gs = f.getGlyphSet(); order = f.getGlyphOrder()
    glyphs, upem = shape(raw, text)
    track = tracking_em * upem
    paths, x = [], 0.0
    for info, pos in glyphs:
        gname = order[info.codepoint]
        pen = SVGPathPen(gs, ntos=lambda v: f"{v:.3f}")
        t = Transform(scale, 0, 0, -scale, x0 + x*scale, baseline)
        gs[gname].draw(TransformPen(pen, t))
        d = pen.getCommands()
        if d: paths.append(d)
        x += pos.x_advance + track
    return paths, (x - track) * scale     # a zaro tracking nem szamit a szelessegbe

def build(cap_mm, out, ink="#1F1A16", gold="#B8884A", min_stroke_mm=1.0, pad_mm=0.0):
    fr, fr_raw = load(FONTDIR + "fraunces-latin-normal.woff2", {"opsz": 144, "wght": 400})
    ge, ge_raw = load(FONTDIR + "geist-500.woff2")

    fr_cap = cap_height(fr); ge_cap = cap_height(ge)
    s_name = cap_mm / fr_cap                              # font-egyseg -> mm
    s_sub  = (cap_mm * RATIO["sub_cap"]) / ge_cap

    base = pad_mm + cap_mm                                # a nev alapvonala
    npaths, nw = run_paths(fr, fr_raw, "FRUBEAUTY", s_name, -0.022, pad_mm, base)
    spaths, sw = run_paths(ge, ge_raw, "KOZMETIKA \u00b7 ZUGL\u00d3", s_sub, 0.18, 0, 0)

    W = nw + 2*pad_mm
    # alcim ujraszedve, kozepre igazitva
    spaths, sw = run_paths(ge, ge_raw, "KOZMETIKA \u00b7 ZUGL\u00d3", s_sub,
                           0.18, (W - sw)/2, base + RATIO["sub_top"]*cap_mm + RATIO["sub_cap"]*cap_mm)

    rule_t = max(RATIO["rule_thick"]*cap_mm, min_stroke_mm)   # hajszal helyett vaghato vastagsag
    rule_w = RATIO["rule_w"] * nw
    rule_y = base + RATIO["rule_gap"]*cap_mm
    H = base + RATIO["sub_top"]*cap_mm + RATIO["sub_cap"]*cap_mm + pad_mm

    def fmt(v): return f"{v:.4f}"
    svg = [
      f'<svg xmlns="http://www.w3.org/2000/svg" width="{fmt(W)}mm" height="{fmt(H)}mm" '
      f'viewBox="0 0 {fmt(W)} {fmt(H)}">',
      f'  <!-- FRUBEAUTY wordmark, gorbesitve. 1 SVG-egyseg = 1 mm. cap={cap_mm}mm -->',
      f'  <g id="wordmark" fill="{ink}">' ]
    for d in npaths: svg.append(f'    <path d="{d}"/>')
    svg.append('  </g>')
    svg.append(f'  <g id="rule" fill="{gold}">')
    svg.append(f'    <rect x="{fmt(pad_mm+(nw-rule_w)/2)}" y="{fmt(rule_y)}" '
               f'width="{fmt(rule_w)}" height="{fmt(rule_t)}"/>')
    svg.append('  </g>')
    svg.append(f'  <g id="alcim" fill="{gold}">')
    for d in spaths: svg.append(f'    <path d="{d}"/>')
    svg.append('  </g>')
    svg.append('</svg>')
    open(out, "w", encoding="utf-8").write("\n".join(svg))
    return W, H, rule_t

def monogram(size_mm, out, ink="#1F1A16", gold="#B8884A"):
    """Doltbetus F aranygyuruben -- ugyanaz a jel, mint a favicon.svg-ben."""
    fr, raw = load(FONTDIR + "fraunces-latin-italic.woff2", {"opsz": 144, "wght": 400})
    cap = cap_height(fr)
    s = (size_mm * 0.48) / cap
    gs = fr.getGlyphSet(); order = fr.getGlyphOrder()
    glyphs, upem = shape(raw, "F")
    from fontTools.pens.boundsPen import BoundsPen
    gname = order[glyphs[0][0].codepoint]
    bp = BoundsPen(gs); gs[gname].draw(bp)
    gw = (bp.bounds[2]-bp.bounds[0])*s; gh = (bp.bounds[3]-bp.bounds[1])*s
    x0 = size_mm/2 - gw/2 - bp.bounds[0]*s
    base = size_mm/2 + gh/2 - bp.bounds[1]*s*0 - (bp.bounds[1]*s)
    pen = SVGPathPen(gs, ntos=lambda v: f"{v:.3f}")
    gs[gname].draw(TransformPen(pen, Transform(s,0,0,-s, x0, size_mm/2 + gh/2 + bp.bounds[1]*s)))
    r = size_mm*0.37; sw = size_mm*0.009
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{size_mm}mm" height="{size_mm}mm" '
           f'viewBox="0 0 {size_mm} {size_mm}">\n'
           f'  <circle cx="{size_mm/2}" cy="{size_mm/2}" r="{r:.4f}" fill="none" '
           f'stroke="{gold}" stroke-width="{sw:.4f}"/>\n'
           f'  <path d="{pen.getCommands()}" fill="{gold}"/>\n</svg>')
    open(out, "w", encoding="utf-8").write(svg)
    return sw

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--cap", type=float, default=100.0, help="a nev cap-magassaga mm-ben")
    ap.add_argument("--min-stroke", type=float, default=1.0, help="legvekonyabb vaghato vonal mm")
    a = ap.parse_args()
    W,H,rt = build(a.cap, "frubeauty-wordmark-vektor.svg", min_stroke_mm=a.min_stroke)
    sw = monogram(a.cap*1.6, "frubeauty-monogram-vektor.svg")
    hair = 0.0129 * a.cap
    print(f"wordmark: {W:.1f} x {H:.1f} mm  (cap {a.cap} mm)")
    print(f"vonalzo vastagsag: {rt:.2f} mm")
    print(f"Fraunces legvekonyabb hajszal ennel a meretnel: {hair:.2f} mm  "
          f"({'VAGHATO' if hair>=a.min_stroke else 'TUL VEKONY vagott foliahoz'})")
    print(f"monogram gyuru vastagsag: {sw:.2f} mm")
