# Design

## Context

See proposal.md for motivation. Look D's structure is in `components/looks/d/` (`NavD`, `HeroD`, `SectionsD`, `PagesD`, `AuditLens`, `Illustrations`, `Meter`, `RevealD`, `parts`, `look.css`) with routes under `app/tasarim/d/` sharing one layout. The `design-previews` spec already fixes what any preview must do: lettered route, inner pages beneath it, `noindex`, isolation, shared copy, twelve sections, accessibility, motion and performance floors.

TonyAI's own brand material, which E draws on:

- Logo (`components/Logo.tsx`): three rounded squares (radius about a quarter of the side) and a leaf made of two quarter-circle arcs.
- Colours (`app/tokens.css`): forest `#2b5a3e`, forest ink `#1f4530`, leaf `#6fa583`, paper `#f4f6f3`.
- Typeface: Schibsted Grotesk, loaded by the root layout as `--font-schibsted`.

## Goals / Non-Goals

**Goals:**

- Someone who knows the reference site should not think of it when they see E.
- Someone who liked D should recognise E as the same page: same content, same rhythm of light and dark bands, same split layout, same lens.
- Every replaced device comes from TonyAI's logo, colours or data, not from a third site.

**Non-Goals:**

- Changing look D, look C or the live site.
- Sharing code between D and E. Looks stay self-contained so the losers can be deleted whole.
- A legal opinion. The comparison table is evidence for one, not a substitute.

## Decisions

### 1. E is a copy of D that is then changed, not a restyle switch on D

`components/looks/d/` is copied to `components/looks/e/` with the `d-`/`.look-d` prefixes renamed, then the devices below are replaced. A theme flag on D would be less code, but D must stay byte-for-byte as it is, the two would be coupled for as long as both exist, and most of the changes are to shapes and markup, not to tokens.

### 2. What stays and what goes

Kept, because they are common practice or already TonyAI's own: twelve-section order, the 7/5 split with side panels that run to the page edge, alternating light and dark bands, 1.5 px line icons (all drawn for D from scratch), the audit lens interaction, the data-entry panel, the inner pages, the reveal motion.

Replaced, because each is a recognisable device of the reference:

| Device in D | In E | Drawn from |
|---|---|---|
| Deep teal `#06433f` + neon mint `#2fe6ac` | Forest ink `#1f4530` bands, forest `#2b5a3e`, leaf `#6fa583`, paper `#f4f6f3`, one warm accent (amber, about `#f0b23e`) for actions and highlighted data | `tokens.css` |
| Outfit, square corners | Schibsted Grotesk; 12 px radius on panels, cards and buttons | brand font, logo squares |
| Two-line headings, one line in the accent colour | One colour; a single word carries a leaf-shaped highlight behind it | logo leaf |
| Hero: dashed overlapping ellipses with icons | Six rounded tiles sized by each subsidiary's value (a treemap) that close up into one square, the consolidated total | `demo.subsidiaries`, logo squares |
| Mint card with a roof notch on a dark base | A card cut like the logo: a rounded block with a quarter-circle leaf corner, figure inside, action beneath | logo |
| Misty conifer treeline into the dark band | A skyline of rounded blocks of uneven height in leaf tints | logo squares |
| Columns of horizontal segments | Grids of ten small rounded squares (2 × 5), filled by share | logo squares |
| Square mint button, uppercase, arrow, caption above | Rounded amber button, sentence case, arrow in a small circle, no caption | — |
| Map pins joined by a zigzag route | Numbered rounded squares on a straight rule | logo squares |
| Lens with a labelled grip hanging below | Lens only; the label is a small pill inside the ring's top edge | — |
| Giant numeral standing on a dark band with the unit tucked in | Numeral inside a leaf-cornered block beside the before/after lists | logo |

The amber is a proposal, tuned during the build against a contrast check; its role is fixed (the one warm colour, never body text on light grounds unless it passes AA). If amber reads wrong next to the greens, the fallback is a lighter leaf green for actions with no warm colour at all.

### 3. Structure mirrors D

`app/tasarim/e/layout.tsx` carries styles, wrapper, nav, footer and `noindex`; pages for home, `sirket`, `kaynaklar`, `kaynaklar/[slug]`, `bize-ulasin`. `here()` keeps homepage anchors and the three inner paths beneath `/tasarim/e/`. The reveal observer re-runs on each route change, as fixed in D.

Schibsted Grotesk comes from the root layout's CSS variable, so E imports no font and adds no dependency.

### 4. Hero treemap

Tiles are laid out from `demo.subsidiaries` values with a fixed, hand-checked arrangement (six values do not need a general algorithm): areas proportional to value, each tile labelled with sector and figure, a facility glyph in the larger ones. On load the tiles start slightly apart and close into one square; under reduced motion they are already closed. The treemap is decorative for assistive technology and is described by a visually hidden sentence listing the six figures and the total.

### 5. Proving the difference

`components/looks/e/NOTES.md` holds a table with one row per device: what the reference does, what D did, what E does, and where E's version comes from. During QA, fresh captures of the reference, D and E are put side by side and each row is checked by eye. The captures are not committed (third-party imagery); the table is.

## Risks / Trade-offs

- [E may lose some of what made D appealing, since part of that appeal is the reference's own taste] → Keep D live for comparison; the owner chooses.
- [Amber against green can look like a warning colour] → Use it only for actions and one highlight per section; fallback defined in decision 2.
- [Rounded corners and the brand font move E toward the current live site and look C] → Accepted: that is what "TonyAI's own" looks like; the bands, splits and line art keep it distinct.
- [A copy of D doubles the code to maintain] → Looks are temporary; the unchosen ones are deleted.
- [Similarity is a judgement, not a measurement] → The device table makes the judgement inspectable; a lawyer's view is recommended before any look becomes `/`.

## Migration Plan

1. Branch, build, pull request (CI runs the build).
2. Merge to `main`, which deploys. Check `/tasarim/e/` and its inner pages return 200 with `noindex`, and that `/tasarim/d/` is unchanged.
3. Rollback: revert the merge; nothing else depends on the route.
