# Homepage look

Routes: every page except the `/tasarim/` previews · components in `components/looks/home/` · all CSS scoped under `.look-h` in `look.css`.

Look D ("Orman", `/tasarim/d/`) chosen as the homepage, with the changes below. Look D itself is unchanged and stays as a preview for comparison.

## What changed from look D

- **Palette:** the product's, from `docs/Tool-Mevcut-Renk-Paleti.pdf` (17 November 2026, measured from screenshots of the tool). See [Palette](#palette) below.
- **Type:** look C's. Bricolage Grotesque for headings and figures, DM Sans for text.
- **Band opener:** look E's skyline of rounded blocks in place of D's conifer treeline.
- **Line drawings:** no conifers, clouds or birds. The group and horizon drawings are look E's, with sprouts made of the logo's leaf and rounded blocks.
- **Copy, as on look C:** the hero ends in the five-verb flow (`copy.hero.flow`); the "3 kapsam" facts strip and the consolidated-total block under "TonyAI farkı" are gone; the hosting placeholder is not shown.
- **Links:** `here()` returns links unchanged.

## Palette

Since 17 November 2026 the site uses the product's palette, so that the site and the tool read as one brand (change `adopt-tool-palette`). Look C's warm palette (paper `#f6f1e8`, sand `#ede4d4`, moss `#1f3d2b`, terracotta `#c96a3d` / `#f0b48f` / `#9a4622`) was dropped. The owners chose this knowing it sets aside the 16 November comparison's argument that sand and terracotta were more ownable in a market where carbon software is mostly green and blue.

- **Grounds:** page `#fafafa`, cards `#ffffff` with a `#d4d4d4` border, alternate band `#f3f1f6`, navigation bar `#ecebf1` with a `#d7d6db` divider.
- **Text:** headings `#141318`, body `#17161b`, muted `#6c6c6e`.
- **Brand green `#1c5e3a`** is the only accent: buttons, accent text, step numbers. Hover `#29553e`. On brand green the accent is `#b1d2bd` and secondary text `#e1f8ee`; buttons are white with green text.
- **Logo:** green blocks with a `#39c656` leaf on light grounds; white blocks with a `#b1d2bd` leaf on green.
- **Statuses:** pills take the product's pill for the same word (Onaylandı = `aktif`, İncelemede purple, Eksik red); bars take the data-status dots (`#35c75a`, `#fc9606`).
- Every colour is named once, in the token block at the top of `look.css`. Sections read colours only through the roles that `.h-light`, `.h-alt` and `.h-brand` set (`--h-fg`, `--h-fg-2`, `--h-muted`, `--h-accent`, `--h-rule`, `--h-btn-*`, `--h-line-art`). Use those classes, not colours, when a section changes ground.

**Adjusted values** (allowed only to meet a contrast floor; each is also listed in `qa/palette.py`):

| Value | Source | Where | Why |
|---|---|---|---|
| `#187455` | `#1e8661` (`aktif` pill text) | Onaylandı pill text | 4.07:1 → 5.14:1 on `#e1f8ee` |

**Grounds, option C (current), and how to switch to option A.** Only the closing call to action and the footer are green. To make the page greener (option A), give these five the class `h-brand` in place of `h-light`. Nothing else in the CSS needs to change; this was checked with screenshots and the colour audit on 17 November.

| Where | C (now) | A |
|---|---|---|
| `SectionsH.tsx` `DifferenceH` section | `h-light` | `h-brand`, and put `<Skyline />` back as its first child |
| `SectionsH.tsx` `ComplianceH` section | `h-light` | `h-brand` |
| `SectionsH.tsx` `ProofH` `.h-proof-said` | `h-light` | `h-brand` (the green bar under the figure returns by itself) |
| `PagesH.tsx` `CompanyH` principles section | `h-light` | `h-brand` |
| `PagesH.tsx` `ContactH` and `FormPageH` side panels | `h-panel h-light` | `h-panel h-brand` |

**QA:** `qa/shoot.py` takes reduced-motion screenshots of every route, and `qa/audit.py` flags any computed colour outside the palette. `qa/contrast.py` checks the text pairs. Run all three against a static build served on port 8095.

## Pages

`Shell.tsx` (`SiteShell`) puts the navigation, footer and reveal motion around every page and loads the fonts and `look.css`. `PagesH.tsx` holds the inner pages: Şirket, Kaynaklar and its articles, Bize Ulaşın (ported from look D's `PagesD.tsx`), plus Demo and Kayıt (`FormPageH`, the shared form beside numbered points), the two thank-you pages (`ThanksH`), the legal pages (`LegalH`, through `components/LegalPage.tsx`) and the 404 page (`NotFoundH`). The shared `ContactForm` and `RegisterForm` are redressed from outside through `.h-form`.

## Still open

From the design comparison: real product screens, source tags on figures, the demo video, and C's before/after windows in place of the oversized 164.700, page height under 9,000 px at 1440 px.
