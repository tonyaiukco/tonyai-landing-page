# Tasks

## 1. Setup

- [x] 1.1 Create a branch `add-design-look-d` from `main` and verify `git status` shows the branch with a clean tree
- [x] 1.2 Add `@fontsource-variable/outfit` and verify `npm install` succeeds and `ls node_modules/@fontsource-variable/outfit` shows `wght.css` with a `latin-ext` subset (Turkish glyphs)
- [x] 1.3 Make Playwright for Python available in a virtual environment outside the repo (it is not installed on this machine) and verify `python -c "import playwright"` succeeds there

## 2. Shared audit record

- [x] 2.1 Capture the built HTML of `/` (`npm run build`, keep a copy of `out/index.html`) as the baseline for 2.3
- [x] 2.2 Move the audit-trail record and its stages from `components/AuditTrail.tsx` into `content/copy.ts` as `demo.auditTrail` and `demo.auditStages`, have `AuditTrail` import them, and verify `npm run lint` and `npm run build` pass
- [x] 2.3 Verify the live page is unchanged: the text content of the rebuilt `out/index.html` matches the baseline from 2.1

## 3. Look D foundation

- [x] 3.1 Create `components/looks/d/look.css` with the palette tokens, type scale, 12-column grid, square button and panel styles from design.md, every rule scoped under `.look-d`; verify with a grep that no selector in the file starts outside `.look-d` (keyframes and `@media` wrappers excepted)
- [x] 3.2 Check the palette's text pairs (teal on white, teal on mist, emerald on white, emerald on mist, white on teal, mint on teal, teal on mint) with a contrast calculation, adjust values until each passes AA for its use, and record the final ratios in `components/looks/d/NOTES.md`
- [x] 3.3 Create `app/tasarim/d/page.tsx` with the Outfit import, the stylesheet import, `robots: { index: false, follow: false }` metadata and an empty `.look-d` wrapper containing `main#icerik`; verify `npm run build` writes `out/tasarim/d/index.html` containing a robots meta tag with `noindex, nofollow`
- [x] 3.4 Write `components/looks/d/qa/shoot.py` (full-page screenshots at 1440 and 390 after scrolling through, plus a reduced-motion pass, reporting console errors, `h1` count and horizontal overflow) and verify it runs against the page from 3.3 and saves three images

## 4. Illustrations and primitives

- [x] 4.1 Build `Illustrations.tsx`: six facility glyphs, the dashed-ellipse hero drawing, the map-pin route, the section icons and the layered treeline, all inline SVG with 1.5 px strokes in `currentColor` and `aria-hidden` where decorative; verify on a temporary page section that each renders on both teal and white backgrounds
- [x] 4.2 Build `Meter.tsx` (ten square segments filled in proportion to a value, with a text label and an accessible text equivalent of the value) and verify it renders the three `demo.scopes` values with fills proportional to 77.400, 63.500 and 23.800
- [x] 4.3 Build `RevealD.tsx` (IntersectionObserver fade-up, SVG draw-on via `stroke-dashoffset`, meter fill in sequence, journey route wipe; CSS transitions, no GSAP needed) and verify that with `prefers-reduced-motion: reduce` every element is in its final state on load

## 5. Sections

- [x] 5.1 Build `NavD.tsx` (logo recoloured through custom properties, `copy.nav` items, login, register, demo button, mobile menu, skip link) and verify the menu opens and closes by keyboard at 390 px and every target is at least 44 px
- [x] 5.2 Build `HeroD.tsx`: two-tone `h1`, lead, hero drawing, and the overlapping mint card with `demo.total` and `demo.period` on a teal base holding `copy.hero.primary`; verify the page has exactly one `h1`, the total reads 164.700, and the button goes to `/demo/`
- [x] 5.3 Build the standards strip and the difference section (teal band, five items with line icons; the copy no longer has a `wipTag`, so none is shown) and verify all five items appear in the built HTML
- [x] 5.4 Build the platform section (all six modules in the copy, in a 7/5 split beside a sticky white data-entry panel, no invented figures) and the demo section, and verify at 1440 px that the panels run to the page edge and meet the next section and at 390 px that the splits collapse to one column
- [x] 5.5 Build the journey section (six steps along the map-pin route) and the proof section (one figure from `copy.proof` at display size, disclaimer kept) and verify six steps render and the disclaimer text is present
- [x] 5.6 Build the FAQ (native `details` or buttons with `aria-expanded`), the final call to action over the treeline, and the footer; verify all six questions open by keyboard and the footer links match `copy.footer`
- [x] 5.7 Verify section order against the spec: the twelve sections appear once each, in the listed order, in `out/tasarim/d/index.html`

## 6. Audit lens

- [x] 6.1 Build `AuditLens.tsx` in the compliance section: result-only row beneath, detail row above clipped to a circle that follows a horizontally draggable handle, data from `demo.auditTrail`; verify by dragging in a browser that the detail is readable inside the lens
- [x] 6.2 Add keyboard support (`role="slider"`, arrow keys, accessible name, visible focus) and verify with keyboard only that the lens moves and the source, emission factor and reviewer can be read
- [x] 6.3 Add the fallbacks: detail shown as a static list without JavaScript and under reduced motion; verify both by loading the built page with JavaScript disabled and with reduced motion emulated
- [x] 6.4 Set `touch-action: pan-y` on the lens area and verify with touch emulation at 390 px that a vertical swipe across it scrolls the page
- [x] 6.5 Place the compliance standards, audit list and security text from `copy.compliance` around the lens and verify all four standards and the three audit items are in the built HTML

## 7. Visual review rounds

- [x] 7.1 Run `qa/shoot.py`, read the 1440 and 390 screenshots next to the reference captures, list what is off (spacing, heading scale, panel offsets, illustration weight) and fix it; verify the script reports no console errors, one `h1`, no horizontal overflow
- [x] 7.2 Repeat the round a second time after the fixes and verify the same three checks pass and the listed issues are gone
- [x] 7.3 Write `components/looks/d/NOTES.md`: the idea in three sentences, type and colour choices, motion, the deliberate departures from the reference, what to do next, honest self-critique; verify the file exists and names the route

## 8. Integration checks

- [x] 8.1 Run `npm run lint` and `npm run build` and verify both pass with no new warnings
- [x] 8.2 Verify hiding: `out/sitemap.xml` has no `/tasarim/` entry, and a grep of every HTML file in `out/` outside `out/tasarim/` finds no `href` to `/tasarim/`
- [x] 8.3 Verify isolation: screenshots of `/` and `/tasarim/c/` at 1440 and 390 match those taken from `main`
- [x] 8.4 Serve `out/` and run a Lighthouse mobile audit of `/tasarim/d/`; verify performance is at least 85 and accessibility at least 95, fixing and re-running if not
- [x] 8.5 Add a pass entry to `docs/qa.md` with the routes checked, widths, Lighthouse scores and open points, and verify the entry names `/tasarim/d/`
- [x] 8.6 Run `openspec validate add-design-look-d --strict` and verify it passes

## 9. Inner pages

- [x] 9.1 Move the look's shell (styles, font, wrapper, nav, footer, `noindex` metadata) into `app/tasarim/d/layout.tsx` and verify the homepage HTML still has one `h1`, the robots tag and the twelve sections
- [x] 9.2 Make `here()` keep homepage anchors and the three inner paths beneath `/tasarim/d/`, mark the current page in the nav, and verify in the built HTML that the nav's five links all start with `/tasarim/d/`
- [x] 9.3 Build Şirket, Kaynaklar, the article page and Bize Ulaşın in look D from the live pages' copy and verify each route is exported with one `h1` and the robots tag
- [x] 9.4 Redress the shared contact form under `.look-d .d-form` without editing it and verify the live `/bize-ulasin/` screenshot is unchanged
- [x] 9.5 Screenshot the four new pages at 1440 and 390 and verify no console errors, no horizontal overflow and no tap target under 44 px
- [x] 9.6 Click through the nav in a browser from the homepage and from an inner page and verify the address never leaves `/tasarim/d/` for Platform, Yöntem, Kaynaklar, Şirket and Bize Ulaşın
- [x] 9.7 Re-run the hiding checks (sitemap, no links into `/tasarim/` from outside) and Lighthouse on the contact page; record the pass in `docs/qa.md` and the pages in `NOTES.md`
- [x] 9.8 Re-run the reveal observer on every route change (it lives in the layout, which stays mounted) and verify in a browser that after Kaynaklar → Platform and Şirket → Yöntem no element in view is left hidden, at 1440 and 390

## Workflow follow-up

- Commit, open a pull request and wait for the owner's go-ahead before merging; merging to `main` deploys to production.
- After the deploy, check `https://tonyai.io/tasarim/d/` returns 200 with the `noindex` meta tag and that `https://tonyai.io/sitemap.xml` does not list it.
- Archive the change once the owner has reviewed the live page.
