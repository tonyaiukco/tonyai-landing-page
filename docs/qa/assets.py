"""Site icons and share image in the product palette: public/favicon.svg, app/favicon.ico, public/apple-touch-icon.png, public/og.png.
Usage, from the repo root: python3 docs/qa/assets.py   (needs playwright and pillow; PW_CHANNEL=chrome to use the installed Chrome)"""
import os, sys, tempfile
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from brandlib import BRAND, BRAND_PALE, GROUND, INK, icon_svg, logo, render  # noqa: E402
from PIL import Image  # noqa: E402

icon = icon_svg()
with open("public/favicon.svg", "w") as f:
    f.write(icon)

og = f'''<div style="width:1200px;height:630px;box-sizing:border-box;padding:72px 80px;background:{GROUND};color:{INK};font-family:T,sans-serif;display:flex;flex-direction:column;justify-content:space-between">
 {logo(44)}
 <h1 style="margin:0;font-family:D,sans-serif;font-variation-settings:'opsz' 96;font-size:68px;font-weight:600;letter-spacing:-0.03em;line-height:1.04">Her işletme için<br><span style="color:{BRAND}">karbon yönetimi</span><br>yazılımı.</h1>
 <div style="display:flex;justify-content:space-between;align-items:flex-end">
  <div style="font-size:20px;font-weight:600;letter-spacing:0.08em">ISO 14064-1 · GHG PROTOKOLÜ · TSRS · IFRS S2</div>
  <div style="background:{BRAND_PALE};color:{BRAND};padding:24px 28px;width:360px;box-sizing:border-box">
   <div style="font-size:15px;font-weight:600;letter-spacing:0.09em">KONSOLİDE TOPLAM · 2026 · Ç1</div>
   <div style="margin-top:8px;font-family:D,sans-serif;font-variation-settings:'opsz' 96;font-size:56px;font-weight:700;letter-spacing:-0.035em;line-height:1">164.700<small style="margin-left:6px;font-size:20px;font-weight:600;letter-spacing:0">tCO₂e</small></div>
   <div style="margin-top:10px;font-size:17px">6 şirket · 14 lokasyon · 11 kategori</div>
  </div>
 </div>
</div>'''

with tempfile.TemporaryDirectory() as tmp:
    big = os.path.join(tmp, "icon512.png")
    sized = lambda n: (n, n, f'<div style="width:{n}px;height:{n}px">{icon.replace("<svg ", f"<svg width=\"{n}\" height=\"{n}\" ")}</div>', True)
    render({"public/og.png": (1200, 630, og, False), "public/apple-touch-icon.png": sized(180), big: sized(512)})
    Image.open(big).save("app/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
print("assets ok")
