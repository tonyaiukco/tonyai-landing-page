# Homepage look

Routes: every page except the `/tasarim/` previews · components in `components/looks/home/` · all CSS scoped under `.look-h` in `look.css`.

Look D ("Orman", `/tasarim/d/`) chosen as the homepage, with the changes below. Look D itself is unchanged and stays as a preview for comparison.

## What changed from look D

- **Palette:** look C's ("Atmosfer", `/tasarim/c/`). Paper `#f6f1e8` and sand `#ede4d4` grounds, moss `#1f3d2b` bands. Terracotta follows `docs/design-comparison-2026-11-16.md`: `#9a4622` for buttons and accent text on light grounds (5.7:1 with paper), `#c96a3d` for fills only, light terracotta `#f0b48f` for accents and buttons on moss (6.6:1).
- **Type:** look C's. Bricolage Grotesque for headings and figures, DM Sans for text.
- **Band opener:** look E's skyline of rounded blocks in place of D's conifer treeline.
- **Line drawings:** no conifers, clouds or birds. The group and horizon drawings are look E's, with sprouts made of the logo's leaf and rounded blocks.
- **Copy, as on look C:** the hero ends in the five-verb flow (`copy.hero.flow`); the "3 kapsam" facts strip and the consolidated-total block under "TonyAI farkı" are gone; the hosting placeholder is not shown.
- **Links:** `here()` returns links unchanged.

## Pages

`Shell.tsx` (`SiteShell`) puts the navigation, footer and reveal motion around every page and loads the fonts and `look.css`. `PagesH.tsx` holds the inner pages: Şirket, Kaynaklar and its articles, Bize Ulaşın (ported from look D's `PagesD.tsx`), plus Demo and Kayıt (`FormPageH`, the shared form beside numbered points), the two thank-you pages (`ThanksH`), the legal pages (`LegalH`, through `components/LegalPage.tsx`) and the 404 page (`NotFoundH`). The shared `ContactForm` and `RegisterForm` are redressed from outside through `.h-form`.

## Still open

From the design comparison: real product screens, source tags on figures, the demo video, and C's before/after windows in place of the oversized 164.700, page height under 9,000 px at 1440 px.
