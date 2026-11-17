# Homepage look

Routes: every page except the `/tasarim/` previews · components in `components/looks/home/` · all CSS scoped under `.look-h` in `look.css`.

Since 17 November 2026 the homepage look is a copy of look D ("Orman", `/tasarim/d/`, notes in `components/looks/d/NOTES.md`), with three differences only. Look D itself is unchanged and stays as a preview.

## The three differences from look D

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

## What else had to change for the live site

- `here()` in `parts.tsx` returns links unchanged, and `HOME` is `/`, so links go to the live pages, not beneath `/tasarim/d/`.
- Look D links out to the live Demo, Kayıt, thank-you, legal and 404 pages. Those are in `PagesH.tsx` in D's style: the forms beside a green panel of numbered points (as D's contact page), the thank-you steps, the legal pages with the draft banner, the 404.
- `Shell.tsx` (`SiteShell`) puts the navigation, footer and reveal motion around every page; pages are not `noindex` as the preview is.

## QA

`qa/shoot.py` takes reduced-motion screenshots of every route, `qa/audit.py` flags any computed colour outside the palette (`qa/palette.py`), and `qa/contrast.py` checks the text pairs. Run them against a static build served on port 8095.
