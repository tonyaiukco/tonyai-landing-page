"""Full-page screenshots of /tasarim/d/ at 1440 and 390, scrolling through first so reveals fire, plus a reduced-motion pass.
Reports console errors, the h1 count, horizontal overflow and tap targets under 44 px.
Usage: npm run build && npx serve out -l 8094 &  then  python3 components/looks/d/qa/shoot.py [suffix]
Set PW_CHANNEL=chrome to use the installed Chrome instead of Playwright's Chromium.
"""
import asyncio, sys, os
from playwright.async_api import async_playwright

URL = os.environ.get("LOOK_URL", "http://localhost:8094/tasarim/d/")
OUT = os.path.dirname(os.path.abspath(__file__))
SUFFIX = sys.argv[1] if len(sys.argv) > 1 else ""

SMALL_TARGETS = """() => [...document.querySelectorAll('.look-d a, .look-d button, .look-d summary, .look-d [role=slider]')]
  .filter(e => e.offsetParent !== null)
  .map(e => [e, e.getBoundingClientRect()])
  .filter(([e, r]) => r.width < 44 || r.height < 44)
  .map(([e, r]) => `${e.tagName.toLowerCase()} "${(e.textContent || e.getAttribute('aria-label') || '').trim().slice(0, 30)}" ${Math.round(r.width)}x${Math.round(r.height)}`)"""

async def shoot(browser, width, height, name, reduced=False):
    ctx = await browser.new_context(viewport={"width": width, "height": height}, device_scale_factor=1,
                                    reduced_motion="reduce" if reduced else "no-preference")
    page = await ctx.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    await page.goto(URL, wait_until="networkidle")
    await page.wait_for_timeout(600)
    # Scroll through slowly so the IntersectionObserver reveals fire.
    total = await page.evaluate("document.documentElement.scrollHeight")
    y = 0
    while y < total:
        await page.evaluate(f"window.scrollTo(0, {y})")
        await page.wait_for_timeout(90)
        y += 300
        total = await page.evaluate("document.documentElement.scrollHeight")
    await page.wait_for_timeout(1800)
    await page.evaluate("window.scrollTo(0, 0)")
    await page.wait_for_timeout(600)
    await page.screenshot(path=os.path.join(OUT, f"{name}{SUFFIX}.png"), full_page=True)
    h1 = await page.evaluate("document.querySelectorAll('h1').length")
    overflow = await page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
    small = await page.evaluate(SMALL_TARGETS) if width < 600 else []
    print(f"{name}: h1={h1} overflow={overflow}px errors={len(errors)} small_targets={len(small)} height={total}")
    for e in errors[:8]: print("   error:", e)
    for s in small[:12]: print("   small:", s)
    await ctx.close()

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel=os.environ.get("PW_CHANNEL") or None)
        await shoot(browser, 1440, 900, "desktop")
        await shoot(browser, 390, 844, "mobile")
        await shoot(browser, 1440, 900, "desktop-reduced", reduced=True)
        await browser.close()

asyncio.run(main())
