"""Reduced-motion full-page screenshots of the site's routes at 1440 and 390, so runs are comparable pixel for pixel.
Reports console errors, the h1 count, horizontal overflow and tap targets under 44 px on mobile.
Usage: npm run build && npx serve out -l 8095 &  then  python3 components/looks/home/qa/shoot.py OUT_DIR [route ...]
Defaults to every route outside /tasarim/. Set LOOK_BASE for another server, PW_CHANNEL=chrome for the installed Chrome.
"""
import asyncio, sys, os
from playwright.async_api import async_playwright

BASE = os.environ.get("LOOK_BASE", "http://localhost:8095")
ROUTES = ["/", "/sirket/", "/kaynaklar/", "/kaynaklar/kapsam-1-2-3-nedir/", "/kaynaklar/tsrs-kisa-rehber/",
          "/kaynaklar/grup-konsolidasyonu-uc-hata/", "/bize-ulasin/", "/demo/", "/demo/tesekkurler/", "/kayit/",
          "/kayit/tesekkurler/", "/kvkk/", "/gizlilik/", "/cerez/", "/kosullar/", "/yok/"]

SMALL_TARGETS = """() => [...document.querySelectorAll('a, button, summary, input, select, textarea, [role=slider]')]
  .filter(e => e.offsetParent !== null && !e.closest('.skip-link') && !e.classList.contains('skip-link'))
  .map(e => [e, e.getBoundingClientRect()])
  .filter(([e, r]) => (r.width < 44 || r.height < 44) && !(e.tagName === 'A' && e.closest('p, li p, dd')))
  .map(([e, r]) => `${e.tagName.toLowerCase()} "${(e.textContent || e.getAttribute('aria-label') || '').trim().slice(0, 30)}" ${Math.round(r.width)}x${Math.round(r.height)}`)"""


def slug(route):
    return route.strip("/").replace("/", "_") or "home"


async def shoot(browser, route, width, height, out):
    ctx = await browser.new_context(viewport={"width": width, "height": height}, device_scale_factor=1, reduced_motion="reduce")
    page = await ctx.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" and "404" not in m.text else None)
    await page.goto(BASE + route, wait_until="networkidle")
    await page.evaluate("document.fonts.ready")
    await page.wait_for_timeout(400)
    await page.screenshot(path=os.path.join(out, f"{slug(route)}-{width}.png"), full_page=True)
    h1 = await page.evaluate("document.querySelectorAll('h1').length")
    overflow = await page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
    small = await page.evaluate(SMALL_TARGETS) if width < 600 else []
    print(f"{route} @{width}: h1={h1} overflow={overflow}px errors={len(errors)} small_targets={len(small)}")
    for e in errors[:8]: print("   error:", e)
    for s in small[:12]: print("   small:", s)
    await ctx.close()


async def main():
    out = sys.argv[1]
    routes = sys.argv[2:] or ROUTES
    os.makedirs(out, exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel=os.environ.get("PW_CHANNEL") or None)
        for route in routes:
            await shoot(browser, route, 1440, 900, out)
            await shoot(browser, route, 390, 844, out)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
