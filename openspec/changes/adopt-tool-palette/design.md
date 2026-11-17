# Design

## Context

The motivation is in proposal.md. Every page outside `/tasarim/` renders through `SiteShell` inside `.look-h`, and its colours are set in `components/looks/home/look.css`:

- **Palette tokens.** Twelve tokens at the top of the file (`--h-moss`, `--h-sand`, `--h-terra-light` and the rest).
- **Ground classes.** `.h-paper`, `.h-sand` and `.h-moss` set the background and a few role variables (`--h-fg`, `--h-fg-2`, `--h-accent`, `--h-rule`, `--h-meter-off`).
- **Direct references.** About 60 rules name a palette token directly instead of a role. Most are `--h-terra-light` (29 uses) and `--h-sage-2` (14 uses), written for text that sits on moss. These rules are why flipping a section's ground today does not flip its colours.
- **Overrides outside the token block.** The page ground and skip link are set at the end of the file (`body:has(.look-h)`). The shared forms are recoloured through `.h-form`. The shared `Logo` is recoloured through `--forest`, `--leaf`, `--ink` and `--logo-dark-*`.

`app/tokens.css`, `app/globals.css` and `components/Logo.tsx` are shared with the `/tasarim/` previews, so they must not change.

The palette values in the PDF were measured from screenshots and can be a few units off.

## Goals / Non-Goals

**Goals:**
- Every colour on the site is set in one token block. Every section reads colours only through role variables.
- Switching between option C and option A takes one class per section and no other CSS change.
- The product mock-ups look like the real product: the same cards, borders, status pills and dots.

**Non-Goals:**
- Changing the layout, type, spacing, copy, illustrations' shapes or section order.
- Dark mode.
- Recolouring the previews or the shared tokens they read.

## Decisions

### 1. Token block: product colours under role-neutral names

The look C names (`moss`, `sand`, `paper`, `terra`, `sage`) are replaced by names for what each colour does in the product:

| New token | Value | Source in the PDF | Replaces |
|---|---|---|---|
| `--h-ground` | `#FAFAFA` | Page background | `--h-paper` as page and section ground |
| `--h-card` | `#FFFFFF` | Card | `--h-paper` as panel ground |
| `--h-alt` | `#F3F1F6` | Table header | `--h-sand` |
| `--h-bar` | `#ECEBF1` | Sidebar and top bar | navigation ground |
| `--h-track` | `#E1E0E6` | Toggle track | `--h-sand-2` as the meter's off cell |
| `--h-line` | `#D4D4D4` | Card border | `--h-sand-2`, `--h-sand-3` as rules |
| `--h-line-2` | `#D7D6DB` | Sidebar divider | navigation divider |
| `--h-ink` | `#141318` | Heading | `--h-moss` as text |
| `--h-body` | `#17161B` | Body | `--h-moss` as body text |
| `--h-grey` | `#6C6C6E` | Muted | `--h-ink-2` (also field borders, 5.2:1 on white); read through the `--h-muted` role |
| `--h-brand` | `#1C5E3A` | Brand green | `--h-moss` as dark ground, `--h-terra-ink` as accent |
| `--h-brand-2` | `#29553E` | Icon green | button hover (8.5:1 with white) |
| `--h-brand-soft` | `#B1D2BD` | Donut: Tamamlandı | `--h-terra-light` as accent on brand (4.7:1) |
| `--h-brand-pale` | `#E1F8EE` | `aktif` pill ground | `--h-sage-2` as secondary text on brand (7.0:1) |
| `--h-info` | `#EFEFF1` | Info card | `--h-sand` behind the reviewer note |

Status colours are a second group, described in decision 6. Transparent tints use `rgba()` of these values (for example, white at 0.2 for rules on brand). The previous `rgba(246, 241, 232, …)` and `rgba(201, 106, 61, …)` values go.

`#F3F1F6` is the alternate band, not `#ECEBF1`. Muted text reaches 4.67:1 on `#F3F1F6` but only 4.42:1 on `#ECEBF1`, so this avoids an adjusted muted grey. `#ECEBF1` stays on the navigation bar, which carries no muted text, and that echoes the product's top bar.

**Alternative considered:** keep the old token names and only change their values. That is less churn, but `--h-moss` holding a grey or `--h-terra-ink` holding green would mislead the next person who reads the file.

### 2. Three grounds, each setting every role

The ground classes become `.h-light` (`#FAFAFA`; `#FFFFFF` when the element is also `.h-panel`), `.h-alt` (`#F3F1F6`) and `.h-brand` (`#1C5E3A`). Each one sets the full set of roles:

| Role | `.h-light` / `.h-alt` | `.h-brand` |
|---|---|---|
| `--h-fg` (headings) | `#141318` | `#FFFFFF` |
| `--h-fg-2` (body and secondary text) | `#17161B` | `#E1F8EE` |
| `--h-muted` | `#6C6C6E` | `#E1F8EE` |
| `--h-accent` (labels, numerals, links) | `#1C5E3A` | `#B1D2BD` |
| `--h-rule` | `#D4D4D4` | `rgba(255,255,255,0.2)` |
| `--h-meter-off` | `#E1E0E6` | `rgba(255,255,255,0.22)` |
| `--h-btn-bg` / `--h-btn-fg` / `--h-btn-hover` | `#1C5E3A` / `#FFFFFF` / `#29553E` | `#FFFFFF` / `#1C5E3A` / `#E1F8EE` |
| `--h-line-art` (drawings' `currentColor`) | `#1C5E3A` | `#B1D2BD` |

A light element nested inside a brand element resets the roles, just as `.h-moss :is(.h-sand, .h-paper)` does today.

Every one of the ~60 direct references is rewritten to read a role. For example, `.h-diff-grid .h-h3 { color: var(--h-terra-light) }` becomes `color: var(--h-accent)`, and `.h-diff-grid p { color: var(--h-sage-2) }` becomes `var(--h-fg-2)`. After this, the only places a palette token is named are the token block, the three ground classes, the status group and the fixed components in decision 4.

**Alternative considered:** fix each rule for its new light ground and leave the rest alone. That makes C work, but A would then need another rule-by-rule pass.

### 3. Option C ground plan, and option A as a class swap

The grounds alternate light and alt down the page, and the page ends on brand:

| Section | Today | C | A |
|---|---|---|---|
| Hero | paper → sand | light → alt gradient | same |
| Standards strip | sand | alt | same |
| TonyAI farkı | **moss**, skyline on top | **light**, no skyline | brand, skyline |
| Platform | sand (panel paper) | alt (panel card) | same |
| Demo | paper | light | same |
| Journey | sand | alt | same |
| Method and assurance | **moss** | **light** | brand |
| Illustrative case | paper, quote panel **moss** | alt, quote panel **card** | quote panel brand |
| FAQ | sand (panel paper) | light (panel card) | same |
| Closing CTA | moss, skyline on top | brand, skyline | same |
| Footer | moss-deep | brand | same |
| Şirket: principles | **moss** | **light** (and the team below turns alt, so that the alt story band above and the team never meet a band of their own colour) | brand |
| Demo, Kayıt, Bize Ulaşın: side panel | **moss** | **card** | brand |

The case and FAQ swap light and alt so that two light sections never meet. Switching to A means changing the five bold rows' class to `.h-brand` and adding `<Skyline />` back above "TonyAI farkı". NOTES.md records this list.

The closing band and the footer share one green. A white rule at 0.2 opacity separates them, which turns the end of the page into one green block. Today they use two moss shades, but the PDF offers no second dark green that would read as different, so one green it is.

Cards (`.h-panel` on a light or alt ground) get a 1 px `--h-line` border, like the product's cards. Without it, `#FFFFFF` on `#FAFAFA` is hard to see.

### 4. Fixed components that keep their own colours

These do not follow the ground roles:

- **Hero certificate card.** Upper part `#E1F8EE` with brand text; base `#1C5E3A` with a white button.
- **Hero drawing.** Zone fill `rgba(28,94,58,0.08)` with a brand dashed stroke; core `#B1D2BD`; total `#1C5E3A` with a `#B1D2BD` stroke.
- **Skyline.** Back `#B1D2BD`, middle `#29553E`, front `#1C5E3A` so that it merges into the band below; the leaf uses the logo leaf colour.
- **Video placeholder.** `#1C5E3A` ground; label `#E1F8EE` with brand text.
- **Navigation.** `#ECEBF1` bar with a `#D7D6DB` bottom divider; the link underline is brand.
- **Step numbers and map pins.** Brand with white numerals.
- **Legal notice banner.** The product's warning banner: `#FEFBEA` ground, `#774C2F` text.
- **Reviewer note.** `#EFEFF1` ground with a brand left rule.
- **Article cards.** Brand top rule. On hover the card turns brand, using the brand roles.

### 5. Logo, icons and the page outside the look

- **Logo.** `.look-h` sets `--forest: #1C5E3A`, `--leaf: #39C656`, `--ink: #141318`. `--logo-dark-block` is `#FFFFFF`, `--logo-dark-leaf` is `#B1D2BD` and `--logo-dark-text` is `#FFFFFF`. `#39C656` (the product's Kapsam 1 dot) keeps the logo two-toned on light grounds; on brand it is only 3.5:1, so the dark logo uses `#B1D2BD`.
- **Favicon and iOS icon.** `#1C5E3A` tile, white blocks, `#B1D2BD` leaf.
- **`themeColor`.** `#ECEBF1`, so that the phone's browser bar matches the navigation.
- **Page ground and skip link.** `body:has(.look-h)` gets ground `#FAFAFA`; the skip link becomes brand with white text.
- **Shared forms.** Through `.h-form`: `--ink`/`--ink-2` `#17161B`, `--ink-3` `#6C6C6E`, `--line` `#D4D4D4`, `--line-2` (field border) `#6C6C6E`, `--surface` `#FFFFFF`, `--miss-fg` `#94282C`, `--miss-bg` `#FEE2E1`. The submit button uses the brand button roles and the form's top rule is brand.

### 6. Status colours, with the adjusted values

The site's statuses read Onaylandı, İncelemede and Eksik. Each pill takes the product's pill for the same word. Each bar takes the product's data-status dot for how complete the item is (3, 2 or 0 of 3 cells):

| Status | Pill (product source) | Pill ground | Pill text | Bar cell on | Adjustment |
|---|---|---|---|---|---|
| Onaylandı (`ok`) | `aktif` | `#E1F8EE` | `#187455` | `#35C75A` (Tamamlandı dot) | text from `#1E8661` (4.07 → 5.14:1) |
| İncelemede (`warn`) | `İncelemede` | `#F1E1FC` | `#8139AD` | `#FC9606` (Kısmi dot) | none (5.42:1) |
| Eksik (`miss`) | Eksik cell, red text | `#FEE2E1` | `#94282C` | none (0 cells) | none (6.61:1) |

Cells that are off use `--h-meter-off`. The bars are `aria-hidden` and the status is written out, so the dot colours (below 3:1 on white) are decoration and not the only signal. The audit lens shows one record's trail and carries no status, so it takes the light and brand colours (an alt base strip, a pale green lens) and no status colour. The adjusted values go into NOTES.md with their source colours, as the spec requires.

### 7. Brand assets come from the generator scripts

`docs/qa/assets.py` (favicon, share image, iOS icon) and `docs/qa/brand.py` (the brand kit) are updated to the new colours and run again. They render at the same sizes and compositions, with Bricolage Grotesque and DM Sans as in the 16 November redraw. The checked-in `brand.py` still has the earlier forest palette and Schibsted fonts, so its fonts and compositions are brought up to date first. `OKU-BENI.txt` is rewritten with the new colours.

## Risks / Trade-offs

- [Measured values are a few units off the product's real tokens] → All values sit in one token block. Swapping in the exact values from the product's code is a one-place edit and changes neither the spec nor the tasks.
- [With fewer dark bands, the page reads flatter and section breaks are weaker] → Bordered cards and the light/alt rhythm carry the breaks. If C still reads flat on localhost, option A is a class swap (decision 3).
- [Green-and-grey sits closer to other carbon software] → Accepted by the owners. Recorded in NOTES.md and the proposal.
- [The favicon and `themeColor` are site-wide, so the `/tasarim/` previews show the new icon in the browser tab] → This is browser chrome, not the rendered page, and the spec's preview requirement covers the page. The previews' own rendering does not change.
- [Rewriting ~60 rules can miss one, leaving a terracotta or sand value in place] → QA collects computed colours on every route and checks them against the allowed list (spec scenario). A grep for the old hex values and token names must come back empty.

## Migration Plan

1. Work on a branch. Run `npm run dev` for the owner's review on localhost.
2. The owner picks C or A. If A, swap the five classes and restore the skyline, then QA again.
3. QA pass recorded in `docs/qa.md`.
4. The owner merges to main, which deploys.

Rollback is reverting the merge commit. Nothing outside the static site depends on the colours.

## Open Questions

- Exact product tokens: if the product's developer can share the real hex values, they replace the measured ones in the token block.
- Logo leaf on light grounds: `#39C656` (two-toned, as proposed) or brand green (a one-colour mark). Both are palette colours and the choice can be made on localhost.
