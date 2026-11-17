# Tasks

## 1. Setup and baseline

- [x] 1.1 Create a branch `adopt-tool-palette` from `main` and verify `git status` is clean on it
- [x] 1.2 Build `main` and capture reduced-motion screenshots of `/tasarim/c/` and `/tasarim/d/` at 1440 and 390 px into the scratchpad, using the scripts in `components/looks/c/qa/` and `components/looks/d/qa/`, and verify one image exists per page and width
- [x] 1.3 Add `components/looks/home/qa/` with a screenshot script (adapted from `components/looks/d/qa/shoot.py`) for every route outside `/tasarim/`, and a colour audit script that collects computed text, background, border, fill and stroke colours per route and flags any colour not in the allowed list (design decisions 1, 4, 5 and 6, plus `rgba` tints of those). Verify that run against `main`, the audit flags the look C colours.

## 2. Tokens and ground roles

- [x] 2.1 Replace the look C token block in `components/looks/home/look.css` with the tokens in design decision 1 and the status group in decision 6, and update the file's header comment. Verify `grep -E "h-(moss|sand|paper|terra|sage)"` finds only ground-class uses still to be renamed.
- [x] 2.2 Replace `.h-paper`, `.h-sand` and `.h-moss` with `.h-light`, `.h-alt` and `.h-brand`, each setting every role in design decision 2, plus the nested reset. Rename the classes in `SectionsH.tsx`, `PagesH.tsx`, `HeroH.tsx`, `NavH.tsx` and `AuditLens.tsx`. Verify `npm run lint` passes.
- [x] 2.3 Rewrite every rule that names a palette token directly so it reads a role (`--h-fg`, `--h-fg-2`, `--h-muted`, `--h-accent`, `--h-rule`, `--h-meter-off`, `--h-btn-*`, `--h-line-art`). Verify that outside the token block, the ground classes, the status group and the fixed components in design decision 4, `grep -E "var\(--h-(brand|brand-2|brand-soft|brand-pale|ink|body|muted|line|alt|card|ground)\)"` in section rules returns nothing.
- [x] 2.4 Restyle buttons, the navigation bar, cards (1 px `--h-line` border) and the fixed components per design decision 4. Verify on `npm run dev` that the homepage's buttons, navigation, hero card and video placeholder match the decision.

## 3. Option C ground plan

- [x] 3.1 Set each homepage section's ground per the C column in design decision 3. Remove the skyline above "TonyAI farkı" and keep it above the closing call to action, with the skyline colours from decision 4. Separate the closing band from the footer with a white 0.2 rule. Verify by scrolling the homepage at 1440 px that only the closing band and the footer are green and that no two light sections meet.
- [x] 3.2 Set Şirket's principles to alt and the side panels on Demo, Kayıt, Bize Ulaşın and their thank-you pages to card. Verify each page at 1440 and 390 px.
- [x] 3.3 Check that option A works: temporarily switch the five C rows to `.h-brand` and restore the skyline, take screenshots, then revert. Verify that in the A screenshots no text is dark on green and no accent is green on green, and that `git diff` shows the revert is complete.
- [x] 3.4 Record in `components/looks/home/NOTES.md`: the new palette and its source PDF, the C ground plan and the exact switch to A, the adjusted values with their source colours, and why the look C palette was dropped. Verify that the notes list every adjusted value in design decision 6.

## 4. Product status colours

- [x] 4.1 Restyle the platform panel's status list as pills with bar cells per design decision 6, and the reviewer note as an info card. Verify each status shows its written label and its matching colour.
- [x] 4.2 Recolour the audit lens (base strip, lens, handle, grip, hint) per design decision 6; it carries no status. Verify by dragging the lens, and with keyboard and reduced motion, that the revealed detail uses the new colours.

## 5. Logo, page, forms and assets

- [x] 5.1 Set the logo variables, page ground, skip link and `.h-form` mapping per design decision 5, and set `themeColor` in `app/layout.tsx` to `#ECEBF1`. Verify the logo in the navigation and footer, the skip link on Tab, and the field borders, error states and submit button on Demo, Kayıt and Bize Ulaşın.
- [x] 5.2 Update `docs/qa/assets.py` and run it to regenerate `public/favicon.svg`, `public/apple-touch-icon.png` and `public/og.png`. Verify by opening each file that it uses only palette colours.
- [x] 5.3 Update `docs/qa/brand.py` to the current compositions and fonts (Bricolage Grotesque, DM Sans) and the new colours. Run it to regenerate the eight images in `public/marka/` and `public/imza-logo.png` at their existing sizes, and rewrite `public/marka/OKU-BENI.txt`. Verify that the image sizes are unchanged and the text names no terracotta.

## 6. Integration QA

- [x] 6.1 Run the colour audit from 1.3 against the production build for every route outside `/tasarim/`. Verify it flags nothing and that a grep for `#f6f1e8`, `#ede4d4`, `#1f3d2b`, `#c96a3d`, `#f0b48f` and `#9a4622` in `components/looks/home/`, `app/layout.tsx` and `public/*.svg` returns nothing.
- [x] 6.2 Run the contrast check (adapted from `components/looks/d/qa/contrast.py`) on every text pair and on the field borders and focus rings. Verify that text meets 4.5:1 (3:1 for large text) and controls meet 3:1.
- [x] 6.3 Screenshot every route at 390 and 1440 px. Verify one `h1`, no horizontal scroll, targets at least 44 px on mobile and no page errors.
- [x] 6.4 Re-shoot `/tasarim/c/` and `/tasarim/d/` and compare with the baseline from 1.2. Verify the renderings are identical.
- [x] 6.5 Run a mobile Lighthouse audit of the homepage on the production build. Verify performance is at least 85 and accessibility at least 95, with no colour-contrast failure. Record the pass in `docs/qa.md`.
- [x] 6.6 Start `npm run dev` for the owner's localhost review, and record whether they choose C or A. If they choose A, apply the switch from 3.4 and repeat 6.1 to 6.5. Chosen on 17 November 2026: **C**.

## Workflow follow-up

- The owner merges the branch to `main`, which deploys. The merge is not done in this change.
- Archive the change after the owner approves the colours on the live site.
