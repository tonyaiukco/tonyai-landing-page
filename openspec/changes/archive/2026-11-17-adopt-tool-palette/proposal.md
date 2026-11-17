# Proposal

## Why

The public site (tonyai.io) is drawn in look C's warm palette: sand and paper grounds, moss bands and a terracotta accent. The product itself uses a different palette: cool neutral greys, white cards and one brand green. `docs/Tool-Mevcut-Renk-Paleti.pdf` (17 November 2026) records the product's colours as measured from screenshots. The owners want the site to use the product's palette so that the site and the product look like one brand. This knowingly sets aside the 16 November comparison's argument that sand and terracotta were the more ownable choice in a market where carbon software is mostly green and blue.

## What Changes

- Every page outside `/tasarim/` is recoloured to the product palette:
  - page ground `#FAFAFA`, cards `#FFFFFF`, an alternate band `#F3F1F6`, navigation bar `#ECEBF1`;
  - text `#141318` and `#17161B`, muted `#6C6C6E`, rules `#D4D4D4` and `#D7D6DB`;
  - brand green `#1C5E3A` for actions and accents.
- **Dark bands are reduced (option C).** Only the closing call to action and the footer keep a dark ground, now brand green `#1C5E3A` with white text. Five dark blocks become light grounds: "TonyAI farkı", the method and assurance section, the illustrative case's quote panel, Şirket's principles, and the side panels on Demo, Kayıt and Bize Ulaşın. The structure is built so that the five can be switched back to green with a class (option A) if C is not liked once it is seen on localhost.
- **Terracotta is removed.** Brand green becomes the only accent. On the green bands the accent is the light green `#B1D2BD`, and buttons are white with green text.
- The product mock-ups on the site (the platform panel's status list and the audit lens) use the product's status colours for Tamamlandı, Kısmi and Eksik. Values that fail WCAG AA as measured are darkened by the fewest units needed.
- The logo, favicon, iOS icon, share image, browser theme colour, shared forms and the brand kit in `public/marka/` are redrawn in the new palette.
- Fonts (Bricolage Grotesque, DM Sans), layout, copy and section order do not change.
- The `/tasarim/c/` and `/tasarim/d/` previews do not change.

## Capabilities

### New Capabilities

- `site-palette`: the colours the public site may use, where dark grounds may appear, contrast floors, the status colour meanings shared with the product, and the brand assets that must follow the palette.

### Modified Capabilities

None. `design-previews` is untouched: the previews keep their own palettes.

## Impact

- Changed: `components/looks/home/look.css` (palette tokens, ground roles, every direct colour reference moved onto a role variable), `components/looks/home/SectionsH.tsx` and `PagesH.tsx` (ground classes on the five sections that become light; the skyline only above the closing call to action), `components/looks/home/NOTES.md`.
- Changed: `app/layout.tsx` (`themeColor`). The page ground, the skip link and the shared forms are already recoloured from inside `look.css`, so `app/tokens.css`, `app/globals.css` and `components/Logo.tsx` stay as they are, and the previews that read them are unaffected.
- Redrawn assets: `public/favicon.svg`, `public/apple-touch-icon.png`, `public/og.png`, `public/imza-logo.png`, the eight images in `public/marka/` and `public/marka/OKU-BENI.txt`, through the generator scripts in `docs/qa/`.
- QA: screenshots at 390 and 1440 px for every route, a Lighthouse mobile run, and an entry in `docs/qa.md`.
- No dependency, routing or deployment change.
