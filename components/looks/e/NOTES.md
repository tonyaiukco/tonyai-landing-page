# Look E — "Blok"

Route: `/tasarim/e/` · components in `components/looks/e/` · all CSS scoped under `.look-e` in `look.css`.

Look E is look D ("Orman", `/tasarim/d/`) with every device that was recognisably the reference's replaced by one drawn from TonyAI's own logo, colours, typeface or data. Look D was modelled on the DUOL sustainability page (https://duol.eu/sustainability). D copied nothing from it, but echoed several of its signature devices; E keeps D's content and structure and gives those devices up. Look D is untouched, for comparison.

## The idea

A group is a set of blocks. The logo already says so: three rounded squares and a leaf. E builds the page out of those two shapes. Six tiles sized by each subsidiary's emissions close up into one square; the block beneath them, with the logo's leaf in its corner, states their consolidated 164.700 tCO₂e and holds the primary action. The dark bands rise as a skyline of rounded blocks. Scope shares are counted in small squares, steps are numbered on squares, and one word in each heading sits on a leaf.

Kept from D, because they are common practice or already TonyAI's own: the twelve sections and their order, the copy, the 7/5 split with side panels that run to the page edge, alternating light and dark bands, the 1.5 px line glyphs (all drawn for D from scratch), the audit lens interaction, the data-entry panel, the inner pages and the reveal motion.

## Colour and type

- Brand greens from `app/tokens.css`: forest ink `#1f4530` (dark bands; `#173524` in the footer), forest `#2b5a3e`, leaf `#6fa583`, paper `#f4f6f3`, plus white. Tints derived from them: `#3d7453`, `#8fbb9f`, `#9cc7ac` (the logo's leaf on dark grounds), `#bfd4c5`, `#cfe1d5`, `#e4eee6`.
- One warm accent, amber `#f0b23e` (hover `#f6c765`). It is used for actions (buttons, the lens ring) and for one highlighted figure (the proof total). It is never text on a light ground (1.9:1); the design's fallback of a green-only palette was not needed.
- Leaf `#6fa583` is a shape colour only (3.8:1 on forest ink, 2.8:1 on white): squares, the leaf corner, the skyline. Accent text is forest on light grounds and `#9cc7ac` on dark ones.
- One family: the brand's **Schibsted Grotesk**, from the root layout's `--font-schibsted`. The look imports no font. Headings 700 at −0.03em; figures 800. Labels, eyebrows, navigation and buttons are sentence case; nothing is set in letter-spaced capitals.
- Shape: 12 px radius on panels, cards and buttons, 8 px on tiles and fields; small squares are rounded by a quarter of their side, as in the logo. The leaf is the logo's: two quarter-circle arcs (`border-radius: 100% 0 100% 0`).
- The shared `Logo` is used in its own colours.

Contrast, from `qa/contrast.py` (WCAG AA needs 4.5:1 for text; every pair E uses for text passes):

| Text | Ground | Ratio | Use |
|---|---|---|---|
| forest ink | white / paper / tint | 10.8 / 9.9 / 9.1 | body |
| soft ink `#40594b` | white / paper / tint | 7.6 / 7.0 / 6.4 | secondary text |
| forest | white / paper / tint | 8.0 / 7.3 / 6.7 | eyebrows, labels, pills |
| forest ink | leaf tint / light leaf / `#8fbb9f` | 7.9 / 6.9 / 5.0 | marked word, the three light tiles |
| white | forest ink / forest / `#3d7453` | 10.8 / 8.0 / 5.5 | body on dark, the three dark tiles, lens base |
| light leaf `#bfd4c5` | forest ink / forest | 6.9 / 5.1 | secondary text on dark, lens keys |
| `#9cc7ac` | forest ink | 5.7 | eyebrows and labels on dark |
| forest ink | `#9cc7ac` | 5.7 | numbered squares on dark |
| white | `#3d6950` | 6.3 | marked word on dark |
| forest ink | amber / light amber | 5.7 / 6.8 | buttons |
| amber | forest ink | 5.7 | highlighted figure, button arrow |
| white / light leaf / `#9cc7ac` | deep ink | 13.4 / 8.6 / 7.1 | footer |

## Device by device

One row per device that was replaced. "Reference" is what the DUOL page does, "D" what look D did, "E" what this look does, and the last column where E's version comes from.

| Device | Reference | Look D | Look E | Source in TonyAI's brand |
|---|---|---|---|---|
| Palette | Grey-teal bands with a neon mint accent on white | Deep teal `#06433f` and neon mint `#2fe6ac`, mist and white | Forest ink bands, forest, leaf, paper and white, one amber accent | Colours in `app/tokens.css`; amber is new and E's own |
| Typeface and corners | A geometric sans; square corners throughout | Outfit; square corners | Schibsted Grotesk; 12 px radius, squares rounded by a quarter of their side | Brand typeface; the logo's rounded squares |
| Headings | Two lines, one of them in the mint accent | Two lines, one in the accent colour | One colour, natural line breaks; one word sits on a leaf-cornered highlight (`Title` in `parts.tsx`) | The logo's leaf |
| Hero drawing | Dashed, overlapping ellipses holding small line icons | Three dashed overlapping ellipses with six facility icons and a cylinder in the middle | A treemap: six rounded tiles whose areas are proportional to each subsidiary's emissions, closing up into one square (`Treemap.tsx`) | `demo.subsidiaries`; the logo's squares |
| Hero card | A mint card with a roof-shaped notch on a darker base, overlapping the hero picture | A mint card with a roof notch on a teal base, overlapping the drawing | A forest-ink block with one large quarter-circle corner and the leaf lying in it, set beneath the square, not over it (`.e-leafblock`) | The logo: block and leaf |
| Band opener | A photograph of misty conifers fading into the dark band | Three layers of generated conifer silhouettes under a mist gradient | A skyline: three rows of rounded blocks of uneven height, flat colour, no mist, one leaf (`Skyline`) | The logo's squares and leaf |
| Share meters | Columns of thin horizontal segments, filled by share | Columns of ten horizontal segments | Ten small rounded squares in two rows of five, filled by share (`DotGrid.tsx`); the data-entry panel's bars became dots and one rounded track | The logo's squares |
| Button | Square, mint, uppercase, arrow at the end, a small caption above it | The same construction in D's colours | Rounded, amber, sentence case, the arrow in a small dark circle, no caption; the line that was a caption is a pill elsewhere in the panel | — (deliberately plain) |
| Journey | Map pins joined by a route | Numbered map pins joined by a zigzag route | Numbered rounded squares on a straight vertical rule (`.e-num`) | The logo's squares |
| Lens | A drag handle with a labelled grip hanging below it | A round lens with a labelled, pointed grip hanging below | The lens alone, with an amber ring; its name is a small pill just inside the top of the ring | — |
| Headline figure | An oversized numeral standing on the edge of a colour band, the unit tucked into it | An oversized numeral standing on a teal band with the unit above it | The numeral inside a leaf-cornered block beside the before/after lists | The logo: block and leaf |
| Line scenes | Outlined conifers with clouds and birds beside the headings | Outlined conifers, clouds and birds around the buildings and the sun | No conifers, clouds or birds: sprouts made of the logo's leaf on a stem, and rounded line blocks | The logo's leaf and squares |

The last row was not in the design's table. It was found in the side-by-side check: the clouds and birds next to a dark-band heading still read as the reference's scene, so they went with the conifers.

How it was checked: full-page captures of the reference, look D and look E at 1440 px were put side by side and each row was compared by eye. The captures are third-party imagery and are not committed; this table is the record. Similarity is a judgement, not a measurement, and this table is evidence for that judgement, not a legal opinion. A lawyer's view is recommended before any look becomes `/`.

## What was made from scratch

Everything in `components/looks/e/` and `app/tasarim/e/` was written in this repository: `.tsx`, `.css`, `.md` and `.py` files only. There is no image, icon, font, text or code file from the reference site. The glyphs are the ones drawn for look D on a 48 px grid; the treemap, the skyline, the leaf-cornered block, the dot grid, the sprouts and the stepper are new in E. The copy is TonyAI's own, from `content/copy.ts`, unchanged. The typeface is the one the live site already loads.

## Hero treemap (`Treemap.tsx`)

The arrangement is fixed: the two largest subsidiaries stacked on the left, the third across the top right, the fourth beside the last two. `layout()` solves for the tile sizes with the gaps taken out, so the visible areas stay proportional to the values (a bisection on the area one unit of value gets, so the right-hand column closes exactly). Measured in the browser, the six areas are within 0.5 % of the six values at 1440 px and within 0.8 % at 390 px; the difference is the rounded corners. The four larger tiles carry a facility glyph. The treemap is `aria-hidden`; a visually hidden sentence after it gives the six figures and the total.

## Motion

No GSAP, as in D.

- On load the six tiles start slightly apart and close into one square, then the total block rises (CSS animations, no script). Under reduced motion they are already closed.
- `RevealE.tsx`: an IntersectionObserver adds `.is-in` to `[data-reveal]`, again on every route change. Blocks fade up, glyphs and line drawings draw on, the dot grids fill square by square, the stepper's rule grows from each number to the next.
- Hidden start states sit behind `@media (scripting: enabled) and (prefers-reduced-motion: no-preference)`, so without JS or with reduced motion the page is at rest. Nothing pins, snaps or captures the wheel.

## Audit lens (`AuditLens.tsx`)

The mechanism is D's: the component only sets `--t` (0–1) and CSS places the lens, clips the detail layer to a circle and, on narrow screens, slides a 63 rem strip under it. It is a `role="slider"` whose `aria-valuetext` reads the field under it. What changed is the dress: no grip, an amber ring, the paper-coloured detail on a forest strip, and the name pill inside the ring. Without JS or under reduced motion the six fields are a plain list.

## Inner pages

`/tasarim/e/sirket/`, `/tasarim/e/kaynaklar/` (and its three articles) and `/tasarim/e/bize-ulasin/`, in `PagesE.tsx`, from the same copy the live pages use. `app/tasarim/e/layout.tsx` carries the shell and the `noindex` tag; `here()` in `parts.tsx` keeps homepage anchors and these three paths beneath `/tasarim/e/`. The contact page reuses the live `ContactForm` and redresses it from outside (`.look-e .e-form`). Demo, login, register and the legal pages open the live ones.

## QA

`qa/shoot.py` screenshots the homepage and the four inner pages at 1440 and 390 after scrolling through, plus a reduced-motion pass of the homepage, and reports console errors, `h1` count, horizontal overflow and tap targets under 44 px (`LOOK_OUT` sends the images outside the repo). `qa/contrast.py` prints the table above and fails if a colour it checks is no longer a token in `look.css`.

Final run (2026-11-16): no errors, one `h1`, no overflow and no small targets on any of the five pages at either width. Lighthouse mobile on the static build: performance 100 and accessibility 100 on `/tasarim/e/` (LCP 1.1 s, TBT 10 ms, CLS 0) and on `/tasarim/e/bize-ulasin/`. Lens checked by mouse drag, arrow keys, touch drag, vertical touch swipe (the page scrolls), JS disabled and reduced motion. Navigation clicked through from the homepage and from an inner page at both widths: every address stays beneath `/tasarim/e/` and nothing in view is left hidden.

Two rounds of visual review. Found and fixed in the first: tabular numerals in Schibsted Grotesk set figures and their punctuation too wide, so they were dropped; on narrow screens the first journey example overlapped its step; the leaf touched the hero button at 390 px; the lens pill's corners crossed the ring; "Perakende" was clipped in the smallest tile; the play disc was oversized on mobile.

## Self-critique

E reads as TonyAI's and no longer as the reference's, and it is calmer than D. It is also less atmospheric: the mist and the forest gave D a mood that flat blocks do not, and part of what was liked in D was the reference's own taste. The treemap is more honest than the ellipses (its areas mean something) but it is a chart, and a chart is a more ordinary thing to open a page with. Paper and white are close in value, so the interlocking panels are quieter than D's mist against white. Amber is doing its job on actions; on the proof figure it is at the edge of looking like a warning. The rounded corners and the brand typeface bring E nearer to the live site and to look C, which is what "TonyAI's own" looks like, but it narrows the distance between the options. The demo block is still a placeholder. The lower third (FAQ, footer) is as plain as it was in D.
