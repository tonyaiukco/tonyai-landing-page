# Look D — "Orman"

Route: `/tasarim/d/` · components in `components/looks/d/` · all CSS scoped under `.look-d` in `look.css`.

Modelled on the DUOL sustainability page (https://duol.eu/sustainability). Nothing is taken from it: the drawings, the typeface, the layout proportions and the interaction are this look's own.

## The idea

A carbon report as a walk through a managed forest: deep teal ground, mint for whatever is alive (data, actions), and thin line drawings instead of screenshots. Six facilities sit in three overlapping dashed groups and the shared middle is the consolidated 164.700 tCO₂e, stated on a mint card with a roof-shaped notch. One interaction carries the product's promise: drag a lens across a record and the entry, source document, emission factor and reviewer behind the result come into view.

## Type and colour

- One family: **Outfit Variable** (`@fontsource-variable/outfit/wght.css`). Headings 700 at −0.025em and leading 1.02, always broken into two lines with one line in the accent colour; leads 300 at about 1.4 × body; figures 800 with tabular numerals.
- Teal `#06433f` (deep `#04312e` in the footer), mint `#2fe6ac`, mist `#e3efe9`, white, and emerald `#08705a` for accent text on light grounds. Mint is never text on white or mist (1.6:1); it is text only on teal.
- Contrast, from `qa/contrast.py`: teal on white 11.2, teal on mist 9.5, teal on mint 6.9, emerald on white 6.0, emerald on mist 5.1, white on teal 11.2, mint on teal 6.9, soft white on teal 8.1, soft white on deep teal 10.2, mint on deep teal 8.8.
- Square corners everywhere except the lens, the pins and the play rings.
- The shared `Logo` is recoloured through `--forest` / `--leaf` / `--ink` on `.look-d`.

## Layout

A four-column grid (`.d-split`): gutter, a 44 rem main column, a 32 rem side column, gutter. Side panels run from the split to the page edge and change ground against the section they sit in, so colour blocks interlock across section boundaries: the mist panel at the foot of the teal "TonyAI farkı" band is the platform section rising into it, the white data-entry panel rides down the platform section (sticky), the journey's examples form one white column beside the route. Below 900 px every split is a single column.

## Illustration

All inline SVG, 1.5 px strokes in `currentColor` (`Illustrations.tsx`): 19 glyphs on a 48 px grid, the hero drawing, the head-office-and-subsidiaries drawing, the horizon with sun and clouds, and the treeline. The treeline replaces the reference's forest photograph: three layers of generated conifer silhouettes (seeded, so every build is identical) with a mist gradient over the tips and the band's teal rising through the trunks.

## Motion

No GSAP in this look; the design called for it "where needed" and nothing needed it.

- Hero drawing draws itself on load with a CSS animation (`stroke-dashoffset` on `pathLength=1` paths); the card rises once.
- `RevealD.tsx`: an IntersectionObserver adds `.is-in` to `[data-reveal]`. Blocks fade up, line drawings and glyphs draw on, meter segments fill bottom-up in sequence, journey route segments wipe down from pin to pin.
- Hidden start states sit behind `@media (scripting: enabled) and (prefers-reduced-motion: no-preference)`, so without JS or with reduced motion the page is simply at rest. Nothing pins, snaps or captures the wheel.

## Audit lens (`AuditLens.tsx`)

The component only sets `--t` (0–1). CSS places the lens, clips the mint detail layer to a circle, and on narrow screens slides a 63 rem strip under the lens, so the same mechanism works at 390 px. The lens is exactly one cell wide, so each arrow-key step centres it on the next field. It is a `role="slider"` whose `aria-valuetext` reads the field under it ("Kaynak belge: Fatura 2026-03-ELK-0417.pdf"). `touch-action: pan-y` keeps vertical swipes scrolling. Without JS or under reduced motion the six fields are a plain list.

The record itself moved from `components/AuditTrail.tsx` to `demo.auditTrail` in `content/copy.ts`; the lens label and hint are `copy.compliance.audit.lens`.

## Inner pages

Added after the first live review, so the navigation never drops out of the preview: `/tasarim/d/sirket/`, `/tasarim/d/kaynaklar/` (and its three articles) and `/tasarim/d/bize-ulasin/`, in `PagesD.tsx`, from the same copy the live pages use. `app/tasarim/d/layout.tsx` carries the shell and the `noindex` tag for all of them; `here()` in `parts.tsx` keeps homepage anchors and these three paths beneath `/tasarim/d/`. The contact page reuses the live `ContactForm` and redresses it from outside (`.look-d .d-form` overrides its tokens and squares its fields), so there is still one form. Demo, login, register and the legal pages open the live ones.

## QA

`qa/shoot.py` screenshots 1440 and 390 after scrolling through, plus a reduced-motion pass, and reports console errors, `h1` count, horizontal overflow and tap targets under 44 px. Final run (2026-11-14): no errors, one `h1`, no overflow, no small targets at either width. Lighthouse mobile on the static build: performance 100, accessibility 100 (LCP 1.1 s, TBT 10 ms, CLS 0), two runs. Lens checked by mouse drag, arrow keys, touch drag, vertical touch swipe (page scrolls), JS disabled and reduced motion.

## Differences from the brief and from the reference

- The reference's licensed Neulis Sans became Outfit; its mint-on-white headings became emerald-on-white to pass AA.
- No photography or 3D renders. This is the largest gap: the reference gets much of its weight from product renders, and this page reads more as drawing than as product.
- The platform section shows all six modules in the copy (the brief said four), and the fifth "TonyAI farkı" card has no "in development" tag because the copy no longer has one.
- Navigation and footer anchors (`/#platform`, `/#yontem`, `/#demo`) stay inside the preview.

## What I would do next

- Give the hero drawing a second state: on scroll the six glyphs send small pulses into the middle and the card's figure counts up.
- A real product screen in the demo block instead of the placeholder.
- Tie the meters to a hover on the scopes so each lights the facilities that feed it.
- If the look is chosen, move the teal a few degrees toward TonyAI's forest green so the palette is unmistakably its own.

## Self-critique

The top third (hero, treeline, "TonyAI farkı") carries the direction well; the lower third is tidier than it is memorable, and the FAQ and footer are plain. The oversized 164.700 repeats the hero's figure because the copy has only one headline number. The hero drawing explains "many into one" but needs the labels to be understood, and at 390 px those labels are at the edge of comfortable reading. The demo block is the weakest moment: a teal rectangle where the reference would show the product.
