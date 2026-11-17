# Homepage look

Routes: every page except the `/tasarim/` previews · components in `components/looks/home/` · all CSS scoped under `.look-h` in `look.css`.

Since 17 November 2026 the homepage look is built on look D ("Orman", `/tasarim/d/`, notes in `components/looks/d/NOTES.md`): its skeleton, grounds and inner pages. Look D itself is unchanged and stays as a preview. On 18 November the homepage moved away from D's drawings and content, following `docs/design-comparison-2026-11-16.md`; that is the second section below.

## Palette, font and band opener

- **Colours:** the product's palette, from `docs/Tool-Mevcut-Renk-Paleti.pdf`. D's tones map one to one:

  | Look D | Here | Palette name |
  |---|---|---|
  | teal `#06433f`, deep teal `#04312e` (footer) | `#1c5e3a` (footer the same green, a rule between) | Brand green |
  | mint `#2fe6ac` | `#39c656` | Kapsam 1 |
  | mist `#e3efe9` | `#e9faf2` | Canlı veri pill ground |
  | emerald `#08705a` (accent text on light) | `#1c5e3a` | Brand green |
  | soft white on teal `#c9e0d9` | `#e1f8ee` | aktif pill ground |
  | teal as text | `#141318` / `#17161b` | Heading / Body |
  | rules `#c9ddd5` / `#b7cfc6` | `#d4d4d4` on white / `#b1d2bd` on mist | Card border / Donut green |

  Two contrast rules follow from the palette. Bright green on brand green is 3.46:1, so it is text only at large sizes (heading accent lines, the standards names, principle numbers); smaller accent text on green that D sets in mint (eyebrows, footer headings and links, lens labels, pins, contact details) is `#b1d2bd` (4.7:1). Text on bright green is `#141318` (8.3:1), where D used teal.
- **Font:** Schibsted Grotesk, the face the palette document is set in (`app/fonts/`, loaded once in `app/layout.tsx`), in place of Outfit. Tabular figures are off, because Schibsted spaces dots and commas like digits when they are on.
- **Band opener:** the block skyline the live site had before (rounded blocks, the logo's leaf on one) in place of D's conifer treeline, above "TonyAI farkı" and the closing call to action.

## What the homepage no longer takes from look D (18 November 2026)

- **Drawings come from the logo.** D's Venn diagram, head office, sun, trees, clouds, birds and map pins are gone. `Illustrations.tsx` builds everything from the logo's rounded block (`Block`, corner radius 24% of the side) and its leaf (`leaf()`), as flat fills. Three classes set the fill, so a drawing follows its ground:

  | Class | On white or mist | On brand green |
  |---|---|---|
  | `.h-blk-1` | brand green `#1c5e3a` | white (through `--h-blk-1`) |
  | `.h-blk-2` | Kapsam 1 green `#39c656` | the same |
  | `.h-blk-3` | donut green `#b1d2bd` | the same |

  The drawings: `HeroDrawing` (one block per subsidiary, its area in proportion to its emissions, wired to the total card), `GroupDrawing` (a holding in `.h-blk-3` holding three companies in `.h-blk-1`, which hold 14 locations in `.h-blk-2`, the number in `demo.locations`), the journey's numbered block markers on a straight line, and `Windows` (the "Önce" pile of spreadsheet windows, decorative). The two that carry meaning are `role="img"` with a label from the copy. Kapsam 2 blue and Kapsam 3 purple are not used in drawings.
- **Source tags.** `Sourced` in `parts.tsx` shows a figure and, beneath it, the line that says where it comes from: the hero total, the three scope totals, journey steps 02 and 03 (through the copy's `figure` field), and the total in the "Sonra" screen. A new emissions total or activity quantity on the homepage goes through it. The last journey step's scenario percentages carry none.
- **Content.** The hero shows the five-verb flow along its foot (five columns; a ruled list under 900 px). The strip lists standards only. "TonyAI farkı" is a numbered, ruled list beside the heading, without glyphs. The closing call to action has one button and no drawing. The bracketed hosting placeholder (`compliance.security.note`) is not rendered; the field stays in the copy for the previews.
- **Before and after.** "Önce" is the window pile beside its list. "Sonra" is the list in the green quote panel beside one drawn TonyAI screen (`.h-scr`) with the total, the scope totals and the six subsidiaries. The screen's rows show no status, because one subsidiary is "İncelemede" in the demo data while the total is labelled approved.
- **Motion.** The hero drawing and card rise once on load, blocks reveal once on scroll, glyphs draw on once. Nothing loops.
- **Class names.** Do not name a class `h-screen`, `h-full`, `h-min`, `h-max`, `h-fit` or `h-auto`: Tailwind owns those and sets a height.

Still waiting for material: the demo video (the section keeps its "yakında" frame) and real product screens (the platform panel and the audit lens are still drawn).

## What else had to change for the live site

- `here()` in `parts.tsx` returns links unchanged, and `HOME` is `/`, so links go to the live pages, not beneath `/tasarim/d/`.
- Look D links out to the live Demo, Kayıt, thank-you, legal and 404 pages. Those are in `PagesH.tsx` in D's style: the forms beside a green panel of numbered points (as D's contact page), the thank-you steps, the legal pages with the draft banner, the 404.
- `Shell.tsx` (`SiteShell`) puts the navigation, footer and reveal motion around every page; pages are not `noindex` as the preview is.

## QA

`qa/shoot.py` takes reduced-motion screenshots of every route, `qa/audit.py` flags any computed colour outside the palette (`qa/palette.py`), and `qa/contrast.py` checks the text pairs. Run them against a static build served on port 8095.
