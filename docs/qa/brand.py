"""The brand kit in public/marka/ (and public/imza-logo.png) in the product palette, at the sizes OKU-BENI.txt lists.
Usage, from the repo root: python3 docs/qa/brand.py   (needs playwright; PW_CHANNEL=chrome to use the installed Chrome)"""
import os, shutil, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from brandlib import BRAND, BRAND_SOFT, GROUND, INK, WHITE, logo, mark, render  # noqa: E402

out = "public/marka/"


def tile(n, m):
    return (n, n, f'<div style="width:{n}px;height:{n}px;background:{BRAND};display:flex;align-items:center;justify-content:center">'
                  f'<svg width="{m}" height="{m}" viewBox="5 5 54 54">{mark(WHITE, BRAND_SOFT)}</svg></div>', False)


def centred(w, h, inner, bg="transparent", transparent=True):
    return (w, h, f'<div style="width:{w}px;height:{h}px;display:flex;align-items:center;justify-content:center;background:{bg}">{inner}</div>', transparent)


def cover(left, right):
    """LinkedIn cover: text clear of the profile photo on the left, a brand green rule along the foot."""
    return (1128, 191, f'''<div style="width:1128px;height:191px;box-sizing:border-box;padding:0 48px 0 300px;background:{GROUND};border-bottom:6px solid {BRAND};
 display:flex;align-items:center;justify-content:space-between;font-family:T,sans-serif;color:{INK}">{left}{right}</div>''', False)


heading = lambda html, size: f'<div style="font-family:D,sans-serif;font-variation-settings:\'opsz\' 96;font-size:{size}px;font-weight:600;letter-spacing:-0.02em;line-height:1.1">{html}</div>'

pages = {
    out + "tonyai-linkedin-logo-300.png": tile(300, 170),
    out + "tonyai-profil-720.png": tile(720, 400),
    out + "tonyai-workspace-logo-320x132.png": centred(320, 132, logo(56)),
    out + "tonyai-imza-logo-240.png": (240, 64, f'<div style="width:240px;height:64px;display:flex;align-items:center">{logo(56)}</div>', True),
    out + "tonyai-logo-yatay.png": centred(1200, 320, logo(220)),
    out + "tonyai-logo-yatay-koyu-zemin.png": centred(1200, 320, logo(220, dark=True), bg=BRAND, transparent=False),
    out + "tonyai-linkedin-kapak-1128x191.png": cover(
        heading(f'Her işletme için<br><span style="color:{BRAND}">karbon yönetimi yazılımı.</span>', 34),
        f'<div style="text-align:right;font-size:15px;font-weight:600;letter-spacing:0.08em;line-height:1.9">ISO 14064-1 · GHG PROTOKOLÜ · TSRS<br><span style="color:{BRAND}">tonyai.io</span></div>'),
    out + "tonyai-linkedin-kapak-en-1128x191.png": cover(
        heading("Next-generation ESG &amp; carbon<br>accounting for multi-subsidiary<br>enterprises.", 28),
        logo(64)),
}
render(pages)
shutil.copyfile(out + "tonyai-imza-logo-240.png", "public/imza-logo.png")
print("brand ok")
