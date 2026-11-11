"""Full-page screenshots of /tasarim/c/ at 1440 and 390, scrolling through first so reveals and the hero scrub fire.
Usage: npm run build && npx serve out -l 8093 &  then  python3 components/looks/c/qa/shoot.py [suffix]
"""
import asyncio, sys, os
from playwright.async_api import async_playwright

URL = "http://localhost:8093/tasarim/c/"
OUT = os.path.dirname(os.path.abspath(__file__))
SUFFIX = sys.argv[1] if len(sys.argv) > 1 else ""

async def shoot(browser, width, height, name, reduced=False):
    ctx = await browser.new_context(viewport={"width": width, "height": height}, device_scale_factor=1,
                                    reduced_motion="reduce" if reduced else "no-preference")
    page = await ctx.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    await page.goto(URL, wait_until="networkidle")
    await page.wait_for_timeout(600)
    # Scroll through slowly so ScrollTrigger scrub and IntersectionObserver reveals fire.
    total = await page.evaluate("document.documentElement.scrollHeight")
    y = 0
    while y < total:
        await page.evaluate(f"window.scrollTo(0, {y})")
        await page.wait_for_timeout(90)
        y += 300
        total = await page.evaluate("document.documentElement.scrollHeight")
    await page.wait_for_timeout(800)
    await page.evaluate("window.scrollTo(0, 0)")
    await page.wait_for_timeout(600)
    # Hero state at top (first frame) and the consolidated state mid-pin on desktop.
    await page.screenshot(path=os.path.join(OUT, f"{name}-top{SUFFIX}.png"))
    if width >= 1024:
        await page.evaluate("window.scrollTo(0, Math.round(window.innerHeight * 1.25))")
        await page.wait_for_timeout(1200)
        await page.screenshot(path=os.path.join(OUT, f"{name}-hero-end{SUFFIX}.png"))
        await page.evaluate("window.scrollTo(0, 0)")
        await page.wait_for_timeout(500)
    await page.screenshot(path=os.path.join(OUT, f"{name}-full{SUFFIX}.png"), full_page=True)
    sw = await page.evaluate("document.documentElement.scrollWidth")
    h1 = await page.evaluate("document.querySelectorAll('h1').length")
    print(f"{name}: scrollWidth={sw} viewport={width} h1={h1} errors={errors[:3]}")
    await ctx.close()

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        await shoot(browser, 1440, 900, "desktop")
        await shoot(browser, 390, 844, "mobile")
        await shoot(browser, 1440, 900, "desktop-rm", reduced=True)
        await browser.close()

asyncio.run(main())
