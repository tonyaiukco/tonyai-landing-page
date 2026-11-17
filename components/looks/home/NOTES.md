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

- **Drawings come from the logo.** D's Venn diagram, head office, sun, trees, clouds, birds and map pins are gone. Drawings are built from the logo's rounded block: `.h-b` (corner radius 24%), toned by `.h-b-1` (brand green; white on a green band, through `--h-blk-1`), `.h-b-2` (Kapsam 1 green) and `.h-b-3` (donut green). They are HTML, not SVG, so their labels stay real text at a readable size on phones. Kapsam 2 blue and Kapsam 3 purple are not used.
  - Hero (`.h-sum`): one block per subsidiary, its area in proportion to its emissions, with sector and figure beneath; a bracket gathers them into a white total panel. The total is set in the palette's "Total figure green" `#1b5b38`.
  - "TonyAI farkı" (`GroupTree`): three labelled tiers, holding, companies and locations, with the counts from the demo data. It is `role="img"` with a label from the copy.
  - Journey: numbered block markers on a straight line.
  - "Önce" (`Windows`): a pile of spreadsheet windows, decorative.
- **Bright green is kept small.** `#39c656` is the ground of buttons, the FAQ toggle and the video label, and the colour of small blocks and large accent type. It is not the ground of a card or panel; the hero's first total card was, and outweighed the heading.
- **Source tags.** `Sourced` in `parts.tsx` shows a figure and, beneath it, the records or calculation it comes from: the hero total, the total and the three scope totals in the "Sonra" screen, and journey steps 02 and 03 (through the copy's `figure` field). A source line names records or a calculation; how much a total covers and whether it is approved go in a separate note. The parts shown beside a total are covered by its line. The last journey step's scenario percentages carry none.
- **Content.** The hero has the primary button under the text and the five-verb flow along its foot (five columns; a ruled list under 900 px). It has no standards list, because the strip below says it once, and no "Demoyu izleyin" link until the video exists. "TonyAI farkı" is a numbered, ruled list beside the heading, with no foot. Platform modules link only where the link is not the demo request. The closing call to action has one button and no drawing. The bracketed hosting placeholder (`compliance.security.note`) is not rendered; the field stays in the copy for the previews.
- **Before and after.** Two equal columns sharing three subgrid rows: label, picture, list. "Önce" is the window pile in a framed panel; "Sonra" is one drawn TonyAI screen (`.h-scr`) with the total, the scope totals with their sources and the six subsidiaries. The screen's rows show no status, because one subsidiary is "İncelemede" in the demo data while the total is labelled approved.
- **Audit trail.** The record is a plain definition list (`.h-rec`). Look D's draggable lens is not used here: it kept four of the six fields behind an interaction.
- **Motion.** The hero's sum rises once on load, sections reveal once on scroll, glyphs draw on once. Nothing loops.
- **Class names.** Do not name a class `h-screen`, `h-full`, `h-min`, `h-max`, `h-fit` or `h-auto`: Tailwind owns those and sets a height.

Still waiting for material: the demo video (the section keeps its "yakında" frame) and a real product screen (the platform panel is still drawn).

## What else had to change for the live site

- `here()` in `parts.tsx` returns links unchanged, and `HOME` is `/`, so links go to the live pages, not beneath `/tasarim/d/`.
- Look D links out to the live Demo, Kayıt, thank-you, legal and 404 pages. Those are in `PagesH.tsx` in D's style: the forms beside a green panel of numbered points (as D's contact page), the thank-you steps, the legal pages with the draft banner, the 404.
- `Shell.tsx` (`SiteShell`) puts the navigation, footer and reveal motion around every page; pages are not `noindex` as the preview is.

## QA

`qa/shoot.py` takes reduced-motion screenshots of every route, `qa/audit.py` flags any computed colour outside the palette (`qa/palette.py`), and `qa/contrast.py` checks the text pairs. Run them against a static build served on port 8095.
