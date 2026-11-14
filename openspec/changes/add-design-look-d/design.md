# Design

## Context

See proposal.md for motivation. Look C already establishes the pattern for an alternative look: a route at `app/tasarim/c/page.tsx`, components in `components/looks/c/`, one stylesheet with every rule scoped under `.look-c`, the look's background set on the wrapper instead of `body`, `robots: { index: false, follow: false }` in the page metadata, and its own `NOTES.md` and screenshot script. `docs/looks-brief.md` records the ground rules (copy from `content/copy.ts`, at most two font families, GSAP and Lenis loaded with dynamic `import()`, no scroll-jacking, static under `prefers-reduced-motion`, QA floor).

Constraints that shape this design:

- The site is a static export (`output: "export"`), so the page is plain HTML, CSS and client JS.
- `nginx.conf` sends `X-Robots-Tag: noindex` only on non-canonical hosts. On `tonyai.io` the page's own robots meta tag is what keeps it out of search.
- A push to `main` deploys to production.
- The reference's typeface (Neulis Sans, Adobe Fonts) and its photographs and 3D renders are not ours to use.
- The audit-trail demo record (six key/value lines and three stages) is hard-coded inside `components/AuditTrail.tsx`, not in `content/copy.ts`.

## Goals / Non-Goals

**Goals:**

- A page a viewer would recognise as the same family as the reference at a glance: palette, heading treatment, split layout, line illustration, meters, square buttons.
- Carry TonyAI's own story in that language: six subsidiaries converging into the consolidated 164.700 tCO₂e, and an audit trail behind every figure.
- Full isolation from the live site and from look C.

**Non-Goals:**

- Rolling the look out to other routes or making it `/`.
- An English version.
- Sharing components with look C. The looks are throwaway alternatives until one is chosen; coupling them makes deleting the losers harder.
- Pixel-level imitation of the reference.

## Decisions

### 1. Same structure as look C

`app/tasarim/d/page.tsx` plus `components/looks/d/` with `NavD`, `HeroD`, `SectionsD`, `AuditLens`, `Illustrations`, `Meter`, `RevealD`, `look.css`, `NOTES.md`, `qa/shoot.py`. Sections in look C's order: nav, hero, standards strip, difference, platform, demo, journey, compliance, proof, FAQ, final CTA, footer. The platform section shows all six modules the copy now holds. `Logo` is reused and recoloured through custom properties on `.look-d`, as C does.

Alternative considered: a shared "look kit" for C and D. Rejected, see Non-Goals.

### 2. Palette: four tones plus one text accent

| Token | Value | Use |
|---|---|---|
| `--d-teal` | `#06433f` | dark bands, headings and body text on light |
| `--d-mint` | `#2fe6ac` | buttons, accent heading line on dark, illustration strokes on dark, meter fill |
| `--d-mist` | `#e3efe9` | tinted bands and panels |
| `--d-white` | `#ffffff` | base and offset panels |
| `--d-emerald` | `#0b7a5c` | accent heading line and small accent text on light backgrounds |

Mint on white is about 1.5:1, so the reference's mint-on-white headings fail AA even as large text. The emerald stands in for mint wherever accent text sits on white or mist; mint text appears only on teal. Button labels are teal on mint. Exact values are tuned during the build against a contrast check; the roles are fixed.

Alternative considered: TonyAI's current forest green `#2b5a3e` as the dark tone. Rejected because the teal and mint pairing is the most recognisable part of the reference, and the look exists to judge that direction.

### 3. Type: Outfit, one family

`@fontsource-variable/outfit`. Headings 700 with tight tracking and leading near 1.0, set as two lines where one line takes the accent colour. Lead paragraphs 300 at roughly 1.5 times body size with open leading, which is where the reference gets its calm. Figures use `font-variant-numeric: tabular-nums`. No second family.

Alternatives considered: DM Sans (already installed, but its proportions are narrower and less circular, so the resemblance weakens); Urbanist (close, but its light weights are thinner at body sizes).

### 4. Layout: a 12-column grid with offset panels

Sections split 7/5. A white or mist panel in the narrow column is pulled up or down across the section boundary with negative margins so colour blocks interlock, as in the reference. Below 900 px every split collapses to one column and the offsets are removed. Corners are square throughout: buttons, panels, meters.

### 5. Illustration: inline SVG components

Hand-authored line drawings with a 1.5 px stroke in `currentColor`, so one drawing works on teal and on white: five facility glyphs (factory, power plant, truck, warehouse, shop) plus a sixth for distribution, dashed overlapping ellipses for the hero, a map-pin route for the journey, small icons for the difference and platform items, and a layered conifer treeline with a mist gradient for the final CTA. The reference's forest photograph and dome renders have no counterpart; the treeline and the hero drawing take their places.

Alternatives considered: stock photography (licensing, weight, and it would be the only raster on the site); an icon library (generic, and the reference's charm is that the drawings are its own).

### 6. Hero: six facilities, one total

Left: the two-tone `h1`, the lead, and the dashed-ellipse drawing in which six facility glyphs sit in overlapping groups around a filled centre. Right, overlapping the drawing: a mint card with the consolidated total and period from `demo`, on a teal base that holds `copy.hero.primary`. The card is the counterpart of the reference's certificate card, but it states a figure from the demo data, not a certification TonyAI does not hold. The trust list (`copy.hero.trust`) is shown as plain labels.

No pinning. The reference does not pin, and look C already explores a pinned hero.

### 7. Meters and the oversized numeral

`Meter` renders a column of ten square segments, filled from the bottom in proportion to a value. It is used for the three scopes (`demo.scopes`) and, in the platform section, as paired "before / with TonyAI" columns only where the copy supports a comparison; otherwise as a decorative rhythm element without invented numbers. The proof section sets one figure from `copy.proof` at display size with a small label tucked into it, like the reference's "40 years".

### 8. Audit lens

The compliance section holds the look's one interaction. Two layers are stacked: beneath, a ledger row for one record showing only the result; above, clipped to a circle with `clip-path`, the same row with its entry, source document, emission factor and reviewer. The circle follows a draggable handle.

- Input: pointer events on the handle, with `touch-action: pan-y` so vertical page scroll still works on touch; the lens moves horizontally only.
- Keyboard: the handle is a `role="slider"` with arrow-key steps and an accessible name.
- Without JS, and under `prefers-reduced-motion`, the detail layer is shown unclipped as a static list, so no information depends on the interaction.
- Data: the record moves from `components/AuditTrail.tsx` into `content/copy.ts` as `demo.auditTrail` and `demo.auditStages`; `AuditTrail` imports them. The live page's output is unchanged. The lens label and hint are new strings, kept with the rest of the copy as `copy.compliance.audit.lens`.
- Narrow screens: the six fields do not fit side by side at 390 px, so the strip keeps a minimum width and slides under the lens as it moves; the lens is always one field wide.

Alternative considered: duplicating the record inside look D. Rejected because two copies of the same demo figures will drift.

### 9. Motion

CSS transitions driven by a small IntersectionObserver (`RevealD`); Lenis comes from the site layout. Line drawings draw themselves with `stroke-dashoffset` when they enter, meter segments fill in sequence, journey route segments wipe from pin to pin, and blocks fade up. The hero drawing draws on load with a CSS animation. Hidden start states sit behind `@media (scripting: enabled) and (prefers-reduced-motion: no-preference)`, so without scripts or under reduced motion everything renders in its final state.

GSAP was planned "where needed" and turned out not to be: nothing here is scroll-scrubbed or pinned, and leaving it out keeps the look's own script to a few hundred bytes.

### 10. Hidden preview

Page metadata sets `robots: { index: false, follow: false }`. The route is not added to `app/sitemap.ts`, and no component outside `components/looks/d/` links to it. This matches look C. `app/robots.ts` is left alone: listing the path under `disallow` would advertise it and would stop crawlers from seeing the `noindex` tag.

## Risks / Trade-offs

- [Vector-only pages can read as flatter than the reference, whose weight comes from 3D renders] → Put the effort into the hero drawing and the treeline; say so in `NOTES.md` so the owner judges the direction knowing photography could be added later.
- [The palette sits close to the reference's] → Own drawings, own typeface, own layout proportions and own interaction; nothing is copied. If the look is chosen, the hue can move toward TonyAI's forest green in a later change.
- [The page is public to anyone with the URL once merged] → Accepted by the owner; same exposure as look C.
- [Many inline SVGs and a new font can cost Lighthouse points] → Keep drawings to simple paths, load only the variable `wght` file, check the mobile score before finishing.
- [Drag interaction conflicting with scroll on touch devices] → Horizontal-only drag with `touch-action: pan-y`, checked at 390 px.
- [Moving the audit record touches a live component] → Pure data move; compare the built HTML of `/` before and after.

## Migration Plan

1. Work on a branch; the pull request runs the build.
2. Merge to `main`, which deploys. Check `https://tonyai.io/tasarim/d/` returns 200 with the `noindex` meta tag and that `/sitemap.xml` does not list it.
3. Rollback: revert the merge commit. The route disappears on the next deploy; nothing else depends on it.
