# Proposal

## Why

The 16 November comparison (`docs/design-comparison-2026-11-16.md`) found that the site looks generated because of default structure, borrowed imagery and no material of its own, not because of its colours. Since then the site has moved onto the product palette and look D's skeleton, which settled the palette and layout questions but left the report's main findings open: the homepage still draws look D's Venn diagram, trees, sun, clouds and birds, shows an internal placeholder to visitors, carries the older content (no five-verb flow, the "3 kapsam" fact back in the strip), and states figures without the source the product promises for every number.

## What Changes

The homepage keeps look D's skeleton, the product palette (`docs/Tool-Mevcut-Renk-Paleti.pdf`) and Schibsted Grotesk. Nothing in `site-palette` changes.

- **Drawings from the logo.** The hero's Venn diagram, the head-office drawing in "TonyAI farkı" and the sun-and-trees drawing in the closing call to action are removed, with every cloud, bird and tree. Three drawings built from the logo's rounded block and leaf replace them: six sector blocks leading to one total (hero), a holding nested into companies and locations ("TonyAI farkı"), and one record block passing six positions ("Nasıl çalışır", in place of the map pins).
- **Source tags.** Every emissions total and activity quantity on the homepage is shown with a line naming where it comes from: the hero total, the three scope totals, the journey's invoice and result, and the before/after total.
- **Current content.** The hero shows the five-verb flow (Topla, Hesapla, Onayla, Raporla, Öngör) with its approved keywords. The standards strip loses the "3 kapsam, tek platformda" fact.
- **"TonyAI farkı" as a list.** The five items become a numbered, ruled list beside the heading, without icons.
- **Before and after.** The two tick lists gain a picture each: scattered spreadsheet windows for before, one TonyAI screen for after. The oversized "164.700" that is cut off at 1440 px goes; the total sits inside the screen.
- **Closing call to action.** Flat green, no drawing, one button.
- **Placeholder removed.** `[Barındırma konumu ve sertifikalar: teyit bekliyor]` is no longer shown on the homepage.
- **Unused font packages removed** from `package.json` (nine packages no page imports).

Not in this change:

- **The demo video.** It is not ready. The demo section keeps its "Ürün demosu · yakında" frame until the video is delivered.
- **Real product screens.** No exports exist yet. The platform panel and the audit lens stay as they are, and a later change replaces them with real screens.
- **The `/tasarim/` previews.** They stay, unchanged and hidden from search.
- **Inner pages.** They keep their current layout; they do not use the drawings that are removed.

## Capabilities

### New Capabilities

- `homepage-look`: what the live homepage shows beyond its colours: drawings made from the logo's shapes, figures shown with their source, the approved hero content, a before/after that fits every width, no internal placeholders, and motion limited to a single reveal.

### Modified Capabilities

None. `site-palette` is unchanged: the ground plan, accents and contrast floors stay, and the new drawings use palette colours only. `design-previews` is unchanged.

## Impact

- Changed: `components/looks/home/Illustrations.tsx` (three new drawings; Venn, head office, horizon, sky, trees, pin and unused glyphs removed), `HeroH.tsx`, `SectionsH.tsx`, `parts.tsx` (new `Sourced`), `look.css`, `NOTES.md`.
- Changed: `content/copy.ts`, additions only (source lines, drawing labels, a structured figure on two journey steps). No existing string changes, so the previews render as before.
- Changed: `package.json` and `package-lock.json` (nine font packages removed).
- QA: `components/looks/home/qa/` scripts run against the build, screenshots at 390, 820 and 1440 px, a Lighthouse mobile run, an entry in `docs/qa.md`.
- New Turkish strings need the owners' approval before the merge; they are listed in design.md.
- No routing, hosting or deployment change.
