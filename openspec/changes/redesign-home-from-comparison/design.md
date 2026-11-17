# Design

## Context

Motivation is in proposal.md, requirements in `specs/homepage-look/spec.md`. What shapes the approach:

- The homepage renders through `components/looks/home/` under `.look-h`. Colours are role variables in `look.css` (`--h-fg`, `--h-accent`, `--h-rule` and so on), set per ground class (`.h-white`, `.h-mist`, `.h-teal`). `site-palette` fixes the grounds, accents and contrast floors, and `qa/audit.py` fails on any colour outside `qa/palette.py`.
- `content/copy.ts` is shared with the `/tasarim/c/` and `/tasarim/d/` previews. An edited or removed string changes them; an added field does not.
- `Illustrations.tsx` holds look D's line art: 1.5 px strokes in `currentColor`, drawn on by `.h-draw` through `stroke-dashoffset`. `HeroDrawing` (three ellipses, six facility glyphs, sky), `GroupDrawing` (head office, bus, trees, sky) and `HorizonDrawing` (sun, trees, sky) are used on the homepage only. `Skyline` already uses rounded blocks and the logo's leaf.
- The logo (`components/Logo.tsx`) is three 25-unit squares with `rx` 6 (24% of the side) and a leaf made of two quarter arcs of radius equal to the side. `Illustrations.tsx` already has a `leaf(x, y, s)` path helper.
- The copy holds the five-verb flow (`copy.hero.flow.steps`), but `HeroH` renders only its caption. `StripH` renders `copy.strip.facts`. `ComplianceH` renders `copy.compliance.security.note`, the bracketed placeholder.
- There is no test runner. Verification is `npm run lint`, `npm run build`, and the Playwright scripts in `components/looks/home/qa/` against a static build on port 8095.

## Goals / Non-Goals

**Goals:**
- One drawing vocabulary: every drawing is produced by the same two helpers (block, leaf), so a fourth drawing later costs a few lines.
- Source tags are one component fed from the copy, so a figure cannot be added without deciding its source.
- Homepage height at 1440 px drops below 9,000 px (the report's target). Measured before and after and recorded; a miss is reported, not hidden.

**Non-Goals:**
- The demo video and real product screens (see proposal). The platform panel and the audit lens are not touched.
- Any change to grounds, accents, fonts, navigation, footer, FAQ or the inner pages.
- Any change to the previews or to existing copy strings.

## Decisions

### 1. Block drawings: filled shapes, two helpers, palette roles

Add to `Illustrations.tsx` a `Block` element (`<rect>` with `rx = 0.24 × side`) beside the existing `leaf()` helper. Drawings are filled, not stroked; the only strokes are 1 px connectors.

Fills come from three CSS classes so each drawing adapts to its ground through the existing variables:

| Class | On white or mist | On brand green |
|---|---|---|
| `.h-blk-1` | `--h-teal` `#1C5E3A` | `--h-white` |
| `.h-blk-2` | `--h-mint` `#39C656` | `--h-mint` |
| `.h-blk-3` | `--h-mint-text` `#B1D2BD` | `--h-mint-text` |
| connector | `--h-rule` | `--h-rule` |

No gradients, outlines or shadows. Kapsam 2 blue and Kapsam 3 purple are not used: `site-palette` allows no accent hue other than the greens.

*Alternative considered:* keeping stroke line art and only swapping the subjects. Rejected: the report's point is that the drawings should come from the logo, and the logo is solid.

### 2. The three drawings

**Hero (`HeroDrawing`, replaces the Venn).** Six blocks, one per `demo.subsidiaries` entry, side proportional to the square root of its value (largest about 110 units in a 640 × 450 viewBox, so 52.600 → 110, 8.300 → 44). They sit bottom-aligned in two loose rows, each with its sector label beneath in `--h-ink`. A leaf sits on the largest block. A 1 px connector runs from each block to a point at the lower right, where the existing total card (`.h-cert`) overlaps the drawing, so the card is the "one total". Sizing by value makes the drawing say something true about the demo data, where the Venn did not.

**Group structure (`GroupDrawing`).** One large `.h-blk-3` block for the holding, holding three `.h-blk-1` company blocks (white on the green band), which hold four to six small `.h-blk-2` location blocks, 14 in total to match `demo.locations`. Bright green locations on soft green companies, the first assignment tried, were too close in lightness to tell apart.

**Journey (in `JourneyH`, replaces `Pin` and the zigzag rail).** Each step's marker is a 44 px block with its number; a straight vertical connector joins them. All six markers are `.h-blk-1` with the number in white; the fills are static and need no JavaScript. The six markers are the "one record passing six positions".

`HorizonDrawing`, `Sky`, `CLOUD`, `BIRD`, `lineTree`, `Pin` and the glyphs no longer referenced (the six facility glyphs and the five difference glyphs) are deleted, with their CSS.

### 3. Text alternatives and reveal

`HeroDrawing` and `GroupDrawing` get `role="img"` and an `aria-label` from new copy strings (decision 7). `Skyline` and the journey markers stay `aria-hidden`; the step number is already in the copy's order. Blocks reveal with the page's existing `data-reveal` (opacity and rise, once). `.h-draw` stays for the remaining glyphs only. Any `@keyframes` used in a loop by the removed sky is deleted; a grep for `infinite` in `look.css` must come back empty.

### 4. `Sourced` component

In `parts.tsx`:

```tsx
<Sourced value="19,89 tCO₂e" source="45.000 kWh × 0,442 tCO₂e/MWh · Türkiye şebeke, 2024" />
```

Renders `<span class="h-src"><span class="h-src-v">…</span><span class="h-src-s">…</span></span>`: the value, then the source on its own line at 0.75rem, weight 500, with a 1 px left rule and 0.6rem padding. Colour is `--h-fg-2` on every ground except the bright green card, where it is `--h-ink`: that gives 15:1 on white, 7.0:1 on brand green and 8.3:1 on `#39C656`. `value` is optional styling-wise: a `className` prop lets the hero and the after-screen keep their large figure styles.

Schibsted Grotesk only. The report asks for a mono face; a second family would cost a font file for five lines of text, and tabular figures are already off in this look for a reason recorded in NOTES.md.

Where it is used:

| Figure | Source line | From |
|---|---|---|
| Hero total 164.700 tCO₂e | `6 şirket · 14 lokasyon · 11 kategori · Onay akışından geçti` | existing `stage.footer` + `stage.approved` |
| Before/after total 164.700 tCO₂e | same | same |
| Kapsam 1, 2, 3 totals | one line each | new `demo.scopes[].source` |
| Journey step 02: 45.000 kWh | `Fatura 2026-03-ELK-0417.pdf` | new `steps[1].figure` |
| Journey step 03: 19,89 tCO₂e | `45.000 kWh × 0,442 tCO₂e/MWh · Türkiye şebeke, 2024` | new `steps[2].figure` |

The hero card's separate note line (`stage.footer`) is dropped there, since the source line now says it.

### 5. Section changes

- **Hero.** Left column unchanged. Right: new drawing and the total card. A new full-width row at the foot of the hero holds the flow: the label, then five columns (verb, three keywords beneath), hairlines between columns; below 900 px it becomes a single ruled list with the keywords inline. The caption `flow.caption` stays in the card's base.
- **Strip.** `StripH` stops rendering `strip.facts`; `.h-strip-fact` CSS is deleted.
- **"TonyAI farkı".** `.h-two` keeps heading, lead and the group drawing on the left; the five cards move to the right column as an `<ol>` with a hairline above each item, the numeral 01–05 in `--h-acc-lg` at `h-h3` size (bright green at a large size, as `site-palette` requires), title and paragraph. No glyphs. The foot (scope meters and the mist panel) stays, with a source line under each meter.
- **Platform.** No change. Its module list is already ruled and cardless, and the panel waits for a real screen.
- **Before and after (`ProofH`).** Top row: left, an `aria-hidden` cluster of nine spreadsheet windows at slight offsets (title bar, grid lines, card border on white, palette greys); right, the "Önce" list. Foot: the green quote panel stays on the left (`site-palette` names it) and now also holds the "Sonra" list, which keeps the section about 240 px shorter than a separate row for it; the right half replaces `.h-proof-figure` with one drawn screen: logo, period, the total through `Sourced`, the three scope totals as text, and six rows of subsidiary name, sector and value. The rows carry no status, because one subsidiary's status in the demo data is "İncelemede" while the total's label says approved. The figure inside the screen is sized in `clamp()` against the screen's width, which removes the clipping.
- **Closing call to action.** `HorizonDrawing` and the secondary button are removed; `.h-two` becomes a single column. The skyline above stays.
- **Method and assurance.** `ComplianceH` stops rendering `security.note`. The field stays in the copy for the previews; when the hosting answer exists, the line comes back with real text.

### 6. Font packages

No page imports them: `@fontsource-variable/archivo`, `fraunces`, `inter-tight`, `jetbrains-mono`, `schibsted-grotesk`, `space-grotesk`, `syne`, `@fontsource/ibm-plex-mono`, `@fontsource/instrument-serif`. The site's Schibsted Grotesk is loaded from `app/fonts/` through `next/font/local`. Kept: `bricolage-grotesque` and `dm-sans` (look C preview), `outfit` (look D preview).

### 7. New copy (needs the owners' approval)

All additions to `content/copy.ts`:

| Field | Text |
|---|---|
| `demo.scopes[0].source` | `Yakıt ve soğutucu gaz kayıtları` |
| `demo.scopes[1].source` | `Elektrik faturaları · şebeke emisyon faktörü` |
| `demo.scopes[2].source` | `İş seyahati, atık ve lojistik kayıtları` |
| `journey.steps[1].figure` | lead `Mart faturası okundu`, value `45.000 kWh`, source `Fatura 2026-03-ELK-0417.pdf` |
| `journey.steps[2].figure` | lead `Kapsam 2`, value `19,89 tCO₂e`, source `45.000 kWh × 0,442 tCO₂e/MWh · Türkiye şebeke, 2024` |
| `hero.drawingLabel` | `Altı sektörden altı şirket: İmalat, Enerji, Taşımacılık, Dağıtım, Toptan ve Perakende. Hepsi tek bir konsolide toplamda birleşir.` |
| `difference.drawingLabel` | `Grup yapısı: bir holding, içinde şirketler, şirketlerin içinde lokasyonlar.` |

The invoice name, factor and quantities repeat `demo.auditTrail`, so the journey, the lens and the tags tell one story. When a step has `figure`, the homepage renders the lead and the tag in place of `example`; the previews keep reading `example`.

## Risks / Trade-offs

- [The homepage still shows "Ürün demosu · yakında" and a drawn panel where the report wants a video and real screens] → Accepted and stated in the proposal; both wait for material. The report's "at least three real product screens" item stays open.
- [The page may not get under 9,000 px, since the flow row and the before/after pictures add height while only the difference grid gives some back] → Measure and record; if it misses, report the number and the tallest sections for a follow-up.
- [Value-sized blocks make the two smallest sectors small (44 and 51 units)] → Labels sit beneath the blocks, not inside, and the narrow-width label size rule that exists today is kept. Check at 390 px.
- [New Turkish strings ship without review] → They are listed in decision 7 and the merge waits for approval (workflow follow-up in tasks.md).
- [A shared-copy edit leaks into the previews] → Additions only; before and after screenshots of both previews are compared.
- [The resemblance to sweep.net cannot be verified by a script] → Removing the Venn, the trees and the sky removes the borrowed elements; the side-by-side look is left to the owners as a follow-up.

## Migration Plan

Work on a branch from `main`. A push to `main` deploys, so the merge is the owners' step. Rollback is reverting the merge commit; there is no data or infrastructure change.

## Open Questions

- Whether the journey's last-step scenario percentages (−%6, −%14) should also carry a tag once the forecasting feature has a nameable source. It does not change this change's tasks.
