"""Shared pieces for assets.py and brand.py: the product palette, the fonts, the logo and a renderer.
Colours from docs/Tool-Mevcut-Renk-Paleti.pdf, as used on the site (components/looks/home/NOTES.md)."""
import asyncio, os, tempfile
from playwright.async_api import async_playwright

ROOT = os.getcwd()
GROUND, WHITE, INK = "#fafafa", "#ffffff", "#141318"
BRAND, BRAND_SOFT, BRAND_PALE, LEAF = "#1c5e3a", "#b1d2bd", "#e1f8ee", "#39c656"

FONTS_DIR = f"{ROOT}/node_modules/@fontsource-variable"
FONTS = f'''@font-face{{font-family:D;src:url("file://{FONTS_DIR}/bricolage-grotesque/files/bricolage-grotesque-latin-opsz-normal.woff2") format("woff2");font-weight:200 800}}
@font-face{{font-family:D;src:url("file://{FONTS_DIR}/bricolage-grotesque/files/bricolage-grotesque-latin-ext-opsz-normal.woff2") format("woff2");font-weight:200 800;unicode-range:U+0100-02AF}}
@font-face{{font-family:T;src:url("file://{FONTS_DIR}/dm-sans/files/dm-sans-latin-wght-normal.woff2") format("woff2");font-weight:100 1000}}
@font-face{{font-family:T;src:url("file://{FONTS_DIR}/dm-sans/files/dm-sans-latin-ext-wght-normal.woff2") format("woff2");font-weight:100 1000;unicode-range:U+0100-02AF}}'''


def mark(block, leaf):
    return (f'<rect x="5" y="5" width="25" height="25" rx="6" fill="{block}"/><rect x="5" y="34" width="25" height="25" rx="6" fill="{block}"/>'
            f'<rect x="34" y="34" width="25" height="25" rx="6" fill="{block}"/><path d="M34 30A25 25 0 0 1 59 5A25 25 0 0 1 34 30Z" fill="{leaf}"/>')


def logo(h, dark=False):
    """Mark and wordmark, as the site's Logo component draws them: green blocks and a bright leaf on light, white and soft green on brand."""
    block, leaf, text = (WHITE, BRAND_SOFT, WHITE) if dark else (BRAND, LEAF, INK)
    return (f'<div style="display:flex;align-items:center;gap:{h * 0.1}px;font-family:T,sans-serif;font-weight:600;font-size:{h * 0.46}px;'
            f'letter-spacing:-0.01em;color:{text}"><svg width="{h}" height="{h}" viewBox="5 5 54 54">{mark(block, leaf)}</svg><span>TonyAI</span></div>')


def icon_svg():
    """The app icon: white blocks and a soft green leaf on a brand green tile."""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="15" fill="{BRAND}"/>'
            f'<g transform="translate(10.88 10.88) scale(0.66)">{mark(WHITE, BRAND_SOFT)}</g></svg>')


def render(pages):
    """pages: {output path: (width, height, body html, transparent)}. Renders each at 1x with the fonts loaded."""
    async def main():
        async with async_playwright() as pw:
            b = await pw.chromium.launch(channel=os.environ.get("PW_CHANNEL") or None)
            with tempfile.TemporaryDirectory() as tmp:
                for path, (w, h, body, transparent) in pages.items():
                    html = os.path.join(tmp, "page.html")
                    with open(html, "w") as f:
                        f.write(f'<!doctype html><html><head><meta charset="utf-8"><style>{FONTS} body{{margin:0}}</style></head><body>{body}</body></html>')
                    pg = await b.new_page(viewport={"width": w, "height": h}, device_scale_factor=1)
                    await pg.goto("file://" + html)
                    await pg.evaluate("document.fonts.ready")
                    await pg.wait_for_timeout(200)
                    await pg.screenshot(path=path, omit_background=transparent)
                    await pg.close()
            await b.close()
    asyncio.run(main())
