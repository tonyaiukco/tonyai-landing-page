# Look C — "Atmosfer"

Route: `/tasarim/c/` · components in `components/looks/c/` · all CSS scoped under `.look-c` in `look.css`.

## The idea

Carbon data as weather, not spreadsheets: six soft, value-sized circles float on a warm sand sky and, as you scroll, drift into one deep-moss sun carrying the consolidated 164.700. Every section repeats the same vocabulary (circles, pills, 24–32 px radii, one oversized element) so the page reads as a single warm object rather than a stack of SaaS cards. Enterprise content, consumer-tech temperature.

## Type and colour

- Display: **Bricolage Grotesque Variable** (`opsz.css`, `font-variation-settings: "opsz" 96`, weight 500, −0.03em). Body: **DM Sans Variable** (`wght.css`). Two families, both self-hosted from fontsource.
- Sand `#f6f1e8` base with `#ede4d4` / `#e3d7c2` for surfaces; deep moss `#1f3d2b` (`#2a4f39` surfaces, `#17301f` footer); terracotta `#c96a3d` for accents and large display text, `#b85a2f` for filled buttons and the terracotta orb (white text 4.6:1), `#9a4622` for small terracotta text on sand (5.7:1); sage `#9ec8a9` as the third data colour. Bands alternate sand / moss from "TonyAI farkı" to the final CTA; the footer is the deepest moss.
- The shared `Logo` is recoloured through the `--forest` / `--leaf` / `--ink` custom properties on `.look-c` (leaf becomes terracotta).

## Motion

- Hero (`HeroC.tsx`): GSAP + ScrollTrigger loaded with dynamic `import()` after mount. ≥1024 px the section is pinned for 130% and the gathering is scrubbed (never snapped); below that it plays once when the stage enters. The six orbs translate to the stage centre and fade while the total scales up, the counter runs to 164.700, then the stacked scope bar and the six legend rows appear. Lenis comes from the site layout's `SmoothScroll`.
- Colour fields: three radial-gradient discs per hero/final CTA drifting on a 36–52 s CSS keyframe (no `filter: blur`, so cheap).
- Reveals: a small IntersectionObserver (`RevealC.tsx`) adds `.is-in` to `[data-reveal]`.
- `prefers-reduced-motion`: fields stop, reveals are static, the hero shows the consolidated state (orbs hidden via CSS, total visible, labels swapped in JS), no scroll hint.

## QA

`qa/shoot.py` builds screenshots at 1440 and 390 (plus a reduced-motion pass) after scrolling the page; `desktop-hero-end.png` captures the pinned consolidated state. Final run: no console errors, one `h1`, no horizontal scroll at 390 px. Lighthouse mobile (served from `out/` on :8093): performance 0.88–0.93 across runs (TBT is the swing factor, 320–470 ms), accessibility 1.00 after fixing orb/footer contrast.

## What I would do next

- A real wave path (SVG) through the six journey bubbles instead of the straight dashed rule.
- Make the four platform circles react to hover over the module rows (each module lights its own circle).
- A subtle scroll-linked parallax on the colour fields, and a "melt" of the orbs' colours into the total's gradient rather than a plain fade.
- Replace the hero `lead2` paragraph on mobile with a shorter pointer so the stage lands above the fold.

## Self-critique

The hero carries the idea well, but the middle of the page leans on soft rounded panels more than I intended; the platform and FAQ sections are the most "template" moments and would benefit from the one bolder gesture each section promises. The journey wave is implied by alternating offsets rather than drawn, so it reads as a staggered grid. Finally, the terracotta orb had to darken to pass contrast, which slightly muddies the palette against the lighter terracotta elsewhere.
