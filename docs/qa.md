# QA log

Each pass: Playwright screenshots at 1440 px and 390 px for every route, a mobile Lighthouse run against the static export, fixes before moving on. Scripts: `docs/qa/fullpage.py`, `docs/qa/assets.py`.

## Pass 1 — 2026-11-02 (rebuild with the template-led content)

Routes checked: `/`, `/bize-ulasin/`, `/sirket/`, `/kaynaklar/`, `/kaynaklar/tsrs-kisa-rehber/`, `/kvkk/`, `/nope/` (404). Every route: one `h1`, no horizontal scroll, no interactive element under 44 × 44 px on mobile, no page errors.

**Lighthouse, mobile, `/`:** Performance 93, Accessibility 96 → 100 after the caption colour fix, Best practices 96, SEO 100. LCP 1.0 s, TBT 320 ms, CLS 0.

**Fixes:** caption colour `--ink-3` darkened to #5f6963 (4.49:1 on the lightest band was just under AA). Remaining console 404s come from link prefetches to `/#platform`-style anchors resolved by the static server; harmless, to be re-checked on the real host.

**Content changes in this pass:** homepage restructured on the enterprise carbon-software pattern Emre chose (hero → standards strip → "TonyAI farkı" → platform modules → demo → six-step journey → method and assurance → roadmap → illustrative case → FAQ → closing CTA); founding story and founders on `/sirket/`; roadmap section states import, AI checks and projection (2027) as plans, not features.

**Open:** form endpoint from the developer; hosting location for the security block; audit-trail example factor to confirm; English version.

## Pass 2 — 2026-11-02 (content review round 1 + demo flow + three looks)

Routes checked: `/`, `/demo/`, `/demo/tesekkurler/`, `/bize-ulasin/`, `/sirket/`, `/kaynaklar/`, `/kaynaklar/tsrs-kisa-rehber/`, `/kvkk/`, `/nope/`, plus `/tasarim/a|b|c/`. Every route: one `h1`, no horizontal scroll, no sub-44px target on mobile, no page errors.

**Content:** positioning widened to every business (groups consolidate "just as easily"); "projeksiyon" → "öngörü"; AI import, AI checks and öngörü shown as *Geliştiriliyor* (fifth "TonyAI farkı" card, hero second line, roadmap labels; 2027 kept for öngörü ve senaryo); founders CEO/COO/CTO, Gökceviz. New `/demo/` ("Bugün demo talep edin", form preset to demo, no topic field) → `/demo/tesekkurler/` confirmation; every demo CTA now points to `/demo/`.

**Three alternative looks** on `/tasarim/a` (Kömür, dark editorial), `/tasarim/b` (Defter, Swiss ledger), `/tasarim/c` (Atmosfer, warm organic), each scoped under `.look-x`, own fonts (fontsource), own screenshot scripts and NOTES.md in `components/looks/x/`. Lighthouse mobile: A 93/100, B 95/100, C 88–93/100 (perf/a11y). Review sheet: https://claude.ai/artifact/7X9iYZuFU3FcSzZesaKUZK

**Open:** same three facts (hosting, response time, emission factor); the chosen look to be rolled out to all pages and the other two removed before launch.

## Pass 3 — 2026-11-10 (Atmosfer revisions 3–5, Emre's "human, not AI-made" review)

Routes checked at 390 / 820 / 1440: `/tasarim/c/` (chosen design), `/kayit/`, `/kayit/tesekkurler/`, `/demo/`, `/`. No horizontal scroll, one `h1`, targets ≥ 44 px, no page errors.

**Changes:** hero right side is a five-verb flow with keywords (Topla · Hesapla · Onayla · Raporla · Öngör; standards named per Emre: ISO 14064-1, IPCC AR6, GHG Protokolü; GRI, TSRS, IFRS S2); the invoice example lives under "Nasıl çalışır" as an "Örnek" line per step; "Önce / Sonra" is one picture (narrow stacked spreadsheet windows, wordless, vs one TonyAI screen) with Emre's four bullets; FAQ first item open; register flow added; all "Geliştiriliyor"/2027 wording removed earlier in the day (rev 2). Looks A and B deleted.

**Open before launch:** roll Atmosfer out to every route and make it `/` (currently `/tasarim/c/`); hosting fact in the security text; English version.

## Pass 4 — 2026-11-14 (fourth look: Orman, `/tasarim/d/`)

Routes checked at 390 / 1440: `/tasarim/d/`, plus `/` and `/tasarim/c/` for regressions. `/tasarim/d/`: one `h1`, no horizontal scroll, no target under 44 px, no page errors, also with reduced motion and with JavaScript disabled.

**New:** look D "Orman", modelled on the DUOL sustainability page: teal, mint, mist and white, Outfit, line drawings, a generated treeline, segment meters and a draggable audit lens (mouse, touch, arrow keys; a plain list without JS or with reduced motion). Scoped under `.look-d`, `noindex, nofollow`, not in the sitemap, linked from nowhere. Notes and self-critique in `components/looks/d/NOTES.md`; contrast table from `components/looks/d/qa/contrast.py`. Lighthouse mobile on the static build: 100 / 100 (performance / accessibility), two runs.

**Shared code touched:** the audit-trail demo record moved from `components/AuditTrail.tsx` to `demo.auditTrail` in `content/copy.ts`; lens label and hint added as `copy.compliance.audit.lens`. Built HTML of `/` and screenshots of `/` and `/tasarim/c/` at both widths are identical to a fresh build of `main`.

**Open:** the owner's review of D against C; a real product screen for the demo block; everything still open from pass 3.

## Pass 5 — 2026-11-14 (look D inner pages)

Routes checked at 390 / 1440: `/tasarim/d/sirket/`, `/tasarim/d/kaynaklar/`, `/tasarim/d/kaynaklar/tsrs-kisa-rehber/`, `/tasarim/d/bize-ulasin/`, plus `/tasarim/d/` and the live `/bize-ulasin/` for regressions. One `h1` each, no horizontal scroll, no target under 44 px, no page errors.

**Why:** on the live preview, "Kaynaklar", "Şirket" and "Bize Ulaşın" opened the live pages in the old design. The look now has its own versions and its nav and footer stay beneath `/tasarim/d/`. Demo, login, register and the legal pages still open the live ones.

**Checked:** nav clicked through from the homepage and from an inner page: Platform, Yöntem, Kaynaklar, Şirket and Bize Ulaşın all stay beneath `/tasarim/d/`, as do article links and the way back. Every inner page carries `noindex, nofollow`; the sitemap and the pages outside `/tasarim/` still have no link into it. The contact page reuses the live form, redressed from outside; the live `/bize-ulasin/` is pixel-identical to production at both widths. Lighthouse mobile on `/tasarim/d/bize-ulasin/`: 100 / 100.

**Fixed after going live:** content reached by an in-app link stayed invisible (Platform or Yöntem after visiting an inner page showed an empty page). The reveal observer sat in the layout and ran only once, so the next page's elements never got their visible state. It now runs on every route change; checked by clicking Kaynaklar → Platform, Şirket → Yöntem and a five-step chain at 1440 and 390, with nothing in view left hidden.

## Pass 6 — 2026-11-16 (fifth look: Blok, `/tasarim/e/`)

Routes checked at 390 / 1440: `/tasarim/e/`, `/tasarim/e/sirket/`, `/tasarim/e/kaynaklar/`, `/tasarim/e/kaynaklar/tsrs-kisa-rehber/`, `/tasarim/e/bize-ulasin/`, plus look D's five pages for regressions. Look E: one `h1` each, no horizontal scroll, no target under 44 px, no page errors, also with reduced motion and with JavaScript disabled.

**New:** look E "Blok": look D's content and structure with each device that was recognisably the reference's (the DUOL sustainability page) replaced by one from TonyAI's logo, colours, typeface or data. Forest ink, forest, leaf and paper with one amber accent; Schibsted Grotesk; a treemap of the six subsidiaries that closes into one square; a block-and-leaf total card; a skyline of rounded blocks; dot grids; a numbered stepper; the lens without its grip; single-colour headings with one marked word. Scoped under `.look-e`, `noindex, nofollow` on every page, not in the sitemap, linked from nowhere outside `/tasarim/`. The device-by-device comparison (reference / D / E / source) and the contrast table are in `components/looks/e/NOTES.md`.

**Checked:** treemap tile areas against the six values, measured in the browser: within 0.5 % at 1440 and 0.8 % at 390. Scope dot grids 5 / 4 / 1 of ten for 77.400 / 63.500 / 23.800. Hero total reads 164.700 and its button goes to `/demo/`. Lens by mouse drag, arrow keys, touch drag and vertical swipe (page scrolls); a plain list without JS or with reduced motion. Nav clicked through from the homepage and from an inner page at both widths: every address stays beneath `/tasarim/e/` and nothing in view is left hidden. Every text pair passes AA (`components/looks/e/qa/contrast.py`). Lighthouse mobile on the static build: 100 / 100 (performance / accessibility) on `/tasarim/e/` and on `/tasarim/e/bize-ulasin/`.

**Look D unchanged:** no file under `components/looks/d` or `app/tasarim/d` differs from `main`, and reduced-motion screenshots of its five pages at both widths are pixel-identical to a build of `main` taken before the work. No shared code, copy or dependency was touched.

**Open:** the owner's comparison of D and E (and C); a lawyer's view of the chosen look before it becomes `/`; a real product screen for the demo block; everything still open from pass 3.

## Pass 7 — 2026-11-17 (the site in the product's palette, option C)

Routes checked at 390 / 1440, with reduced motion: every route outside `/tasarim/` (`/`, `/sirket/`, `/kaynaklar/` and its three articles, `/bize-ulasin/`, `/demo/`, `/demo/tesekkurler/`, `/kayit/`, `/kayit/tesekkurler/`, the four legal pages, the 404 page). One `h1` each, no horizontal scroll, no page errors. The only target under 44 px is the 20 px consent checkbox on the three form pages, as before; its label is the tap target.

**New:** every page outside `/tasarim/` moves from look C's warm palette to the product's, from `docs/Tool-Mevcut-Renk-Paleti.pdf` (change `adopt-tool-palette`). Grounds `#fafafa` / `#f3f1f6`, white cards with a `#d4d4d4` border, `#ecebf1` navigation, brand green `#1c5e3a` as the only accent, no terracotta. Option C: only the closing call to action and the footer are green. The platform panel shows the product's status pills and dots. Logo, favicon, iOS icon, share image, theme colour and the brand kit in `public/marka/` are redrawn with `docs/qa/assets.py` and `docs/qa/brand.py`.

**Checked:** `components/looks/home/qa/audit.py` collects every computed text, background, border, outline, shadow, fill and stroke colour on each route at both widths. Nothing outside the palette was found (one adjusted value, `#187455`, recorded in `components/looks/home/NOTES.md`). Every text pair, field border and focus ring passes (`components/looks/home/qa/contrast.py`; the lowest is muted text on the info card, 4.56:1). The audit lens works by drag and arrow keys at both widths, and as a plain grid with reduced motion. Option A was applied temporarily (five classes and the skyline), screenshotted and audited clean, then reverted. Lighthouse mobile on `/` of the static build: 91 / 100 / 100 / 100 (performance / accessibility / best practices / SEO), colour contrast passes, CLS 0.

**Previews unchanged:** `/tasarim/c/`, `/tasarim/d/`, `/tasarim/d/sirket/` and `/tasarim/d/bize-ulasin/` are pixel-identical at both widths to a build of `main` taken before the work, except for one anti-aliased pixel in look D's contact page whose green channel moved by 1. `/tasarim/c/sirket/` is not a preview page (look C has no inner pages), so it shows the site's 404 page, which is meant to change.

**Open:** the owner's choice between C and A on localhost; the product's exact hex values (the PDF was measured from screenshots); whether the logo's leaf stays bright green `#39c656` or goes one-colour.

## Pass 8 — 2026-11-17 (the homepage becomes a copy of look D)

Routes checked at 390 / 1440, with reduced motion: every route outside `/tasarim/`. One `h1` each, no horizontal scroll, no page errors; the only target under 44 px is the 20 px consent checkbox on the three form pages, as before.

**New:** the homepage look is now a copy of look D with three differences only: the product's palette (D's teal, mint and mist mapped to brand green, Kapsam 1 green and the "Canlı veri" mint), Schibsted Grotesk in place of Outfit, and the live block skyline in place of the treeline. Demo, Kayıt, thank-you, legal and 404 pages, which D links out to, are restyled in D's look. Details in `components/looks/home/NOTES.md`.

**Checked:** the colour audit finds nothing outside the palette on any route at either width. All 18 contrast pairs pass (`qa/contrast.py`; bright green on brand only at large sizes). The lens works by drag and arrow keys at both widths. Lighthouse mobile on `/` of the static build: 97 / 100 / 100 / 100, colour contrast passes, CLS 0. `/tasarim/c/` and look D's four pages are pixel-identical at both widths to a build of `main` taken before the work.

## Pass 9 — 2026-11-18 (homepage redesign from the 16 November comparison)

Routes checked: `/` at 390 / 820 / 1440 with reduced motion; every route outside `/tasarim/` in the colour audit. One `h1`, no horizontal scroll, no page errors, no target under 44 px on the homepage.

**New:** drawings built from the logo's block and leaf in place of look D's Venn diagram, head office, sun, trees, clouds, birds and map pins; source tags on the hero total, the scope totals, the journey's invoice and result, and the before/after total; the five-verb flow in the hero; "TonyAI farkı" as a numbered list; before/after as a pile of spreadsheet windows against one TonyAI screen; a plain closing call to action; the hosting placeholder no longer rendered; nine unused font packages removed. Details in `components/looks/home/NOTES.md`.

**Checked:** the colour audit finds nothing outside the palette (the only flag is `/yok/`, where the local test server answers with its own 404 page). All 25 contrast pairs pass. No element in the hero, "TonyAI farkı" or before/after is wider than its box at 390, 820 or 1440 px. Two full-page captures taken ten seconds apart on an idle page are identical. With scripts off, all seven source lines are visible. Lighthouse mobile on `/` of the static build: performance 98, accessibility 100, colour contrast passes. `/tasarim/c/` and `/tasarim/d/` have byte-identical markup and stylesheets to a build of `main` taken before the work; look D is pixel-identical at both widths, and look C differs between two captures of the same build, so pixels cannot settle it.

**Page height at 1440 px:** 11,459 px before, 11,752 px after; the report's target was under 9,000 px. "TonyAI farkı" lost 342 px and the closing band 60 px; the flow row added 257 px to the hero and the before/after pictures 480 px. The tallest sections are "TonyAI farkı" (1,769 px), Platform (1,741 px), the journey (1,526 px) and before/after (1,494 px).

**Open:** the owners' approval of the seven new Turkish strings; the demo video; real product screens; a side-by-side look against sweep.net. `/kvkk/` still shows bracketed placeholders (`[Şirket unvanı], [adres]`) under its draft banner. Full-page captures at 390 px wrap around past 16,384 px, so the foot of the phone page was checked by section captures.

