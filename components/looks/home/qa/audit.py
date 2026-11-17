"""Colour audit: collects every computed text, background, border, fill, stroke, outline and shadow colour on each route
at 1440 and 390 px, and flags any colour that is not in palette.ALLOWED (a transparent tint of an allowed colour passes).
Usage: npm run build && npx serve out -l 8095 &  then  python3 components/looks/home/qa/audit.py [route ...]
Exits 1 when anything is flagged. Set LOOK_BASE for another server, PW_CHANNEL=chrome for the installed Chrome.
"""
import asyncio, sys, os, re
from playwright.async_api import async_playwright

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from palette import ALLOWED  # noqa: E402
from shoot import BASE, ROUTES  # noqa: E402

COLLECT = """() => {
  const seen = {};
  const add = (value, where) => {
    for (const m of (value || '').matchAll(/rgba?\\([^)]*\\)/g)) { (seen[m[0]] = seen[m[0]] || new Set()).add(where); }
  };
  for (const el of document.querySelectorAll('body, body *')) {
    if (el.closest('script, style, noscript, head')) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0 && el.tagName !== 'BODY') continue;
    const s = getComputedStyle(el);
    if (s.visibility === 'hidden' || s.display === 'none') continue;
    const tag = el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).slice(0, 2).join('.') : '');
    const hasText = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    if (hasText) add(s.color, 'text ' + tag);
    add(s.backgroundColor, 'bg ' + tag);
    add(s.backgroundImage, 'bg-image ' + tag);
    for (const side of ['Top', 'Right', 'Bottom', 'Left'])
      if (parseFloat(s['border' + side + 'Width']) > 0 && s['border' + side + 'Style'] !== 'none') add(s['border' + side + 'Color'], 'border ' + tag);
    if (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) add(s.outlineColor, 'outline ' + tag);
    add(s.boxShadow, 'shadow ' + tag);
    add(s.filter, 'filter ' + tag);
    // Only shapes paint; an <svg> or <g> reports an inherited default fill that nothing draws with.
    if (el instanceof SVGGeometryElement || el instanceof SVGTextContentElement) {
      if (s.fill !== 'none') add(s.fill, 'fill ' + tag);
      if (s.stroke !== 'none') add(s.stroke, 'stroke ' + tag);
    }
  }
  return Object.fromEntries(Object.entries(seen).map(([k, v]) => [k, [...v].slice(0, 3)]));
}"""


def to_hex(css):
    nums = [float(n) for n in re.findall(r"[\d.]+", css)]
    alpha = nums[3] if len(nums) > 3 else 1.0
    return "#%02x%02x%02x" % tuple(round(n) for n in nums[:3]), alpha


async def audit(browser, route, width):
    ctx = await browser.new_context(viewport={"width": width, "height": 900}, reduced_motion="reduce")
    page = await ctx.new_page()
    await page.goto(BASE + route, wait_until="networkidle")
    found = await page.evaluate(COLLECT)
    await ctx.close()
    flagged = {}
    for css, where in found.items():
        hex_, alpha = to_hex(css)
        if alpha == 0 or hex_ in ALLOWED:
            continue
        flagged[f"{hex_} a={alpha:g}"] = where
    return flagged


async def main():
    routes = sys.argv[1:] or ROUTES
    bad = 0
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel=os.environ.get("PW_CHANNEL") or None)
        for route in routes:
            for width in (1440, 390):
                flagged = await audit(browser, route, width)
                print(f"{'ok  ' if not flagged else 'FLAG'} {route} @{width}")
                for colour, where in sorted(flagged.items()):
                    print(f"     {colour}: {'; '.join(where)}")
                bad += len(flagged)
        await browser.close()
    raise SystemExit(1 if bad else 0)

asyncio.run(main())
