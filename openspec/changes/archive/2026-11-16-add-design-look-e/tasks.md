# Tasks

## 1. Setup and baseline

- [x] 1.1 Create a branch `add-design-look-e` from `main` and verify `git status` shows a clean tree
- [x] 1.2 Build `main`, serve it, and capture reduced-motion screenshots of `/tasarim/d/` and its four inner pages at 1440 and 390 as the baseline for 8.3; verify ten images exist
- [x] 1.3 Capture the reference page and look D side by side into a scratch folder outside the repo for the comparison in group 7; verify both captures open

## 2. Scaffold look E from look D

- [x] 2.1 Copy `components/looks/d/` to `components/looks/e/` and `app/tasarim/d/` to `app/tasarim/e/`, rename components (`…D` → `…E`), class prefixes (`d-` → `e-`, `.look-d` → `.look-e`), keyframes and ids; verify a grep of `components/looks/e` and `app/tasarim/e` finds no `look-d`, `"d-` or `/tasarim/d`
- [x] 2.2 Point `here()` and the nav at `/tasarim/e/` and verify `npm run lint` and `npm run build` pass and `out/tasarim/e/` contains the homepage and four inner routes, each with the robots meta tag
- [x] 2.3 Adapt `qa/shoot.py` and `qa/contrast.py` to look E and verify the screenshot script runs against `/tasarim/e/`

## 3. Foundation: colour, type, shape

- [x] 3.1 Replace the palette tokens with forest ink, forest, leaf, paper and the warm accent, remove the Outfit import and use `--font-schibsted`, and set the radius scale; verify no hex from look D's teal or mint remains in `components/looks/e`
- [x] 3.2 Run the contrast check on every text pair E uses, tune values until each passes AA for its use, and record the ratios in `NOTES.md`; if the amber cannot pass where it is needed, switch to the fallback in design.md and note it
- [x] 3.3 Restyle buttons (rounded, sentence case, arrow in a circle, no caption) and links, and replace the two-tone `Title` with a single-colour heading that marks one word with a leaf highlight; verify on the homepage that no heading has an accent-coloured line and every page still has one `h1`

## 4. Replace the hero and band devices

- [x] 4.1 Build the hero treemap from `demo.subsidiaries` (six tiles with areas proportional to value, labels, glyphs in the larger tiles, closing into one square on load, static under reduced motion, hidden text equivalent) and verify the tile areas match the six values within 2 %
- [x] 4.2 Replace the notched card with the block-and-leaf card holding the consolidated total and the primary action, and verify the total reads 164.700 and the button goes to `/demo/`
- [x] 4.3 Replace the treeline with the block skyline in both places it appears and verify no conifer shape remains in `Illustrations.tsx`
- [x] 4.4 Replace the segment meters with square-dot grids for the three scopes and verify fills are proportional to 77.400, 63.500 and 23.800 and animate in sequence only when motion is allowed

## 5. Replace the remaining devices

- [x] 5.1 Replace the map-pin route with the numbered stepper in the journey section and verify six steps and their examples render at 1440 and 390
- [x] 5.2 Remove the lens grip and move its label into a pill inside the ring; verify drag, arrow keys, touch drag, vertical swipe scrolling, and the static list without JS and under reduced motion
- [x] 5.3 Recompose the proof figure inside a leaf-cornered block beside the before/after lists and verify the disclaimer is still present
- [x] 5.4 Restyle panels, FAQ, footer, the data-entry panel and the four inner pages (including the redressed contact form) to the new shape and colour language, and verify each inner page at 1440 and 390 has no overflow and no tap target under 44 px

## 6. Visual review rounds

- [x] 6.1 Run `qa/shoot.py` on the homepage and inner pages, read the screenshots, list what is off and fix it; verify no console errors, one `h1` per page, no horizontal overflow
- [x] 6.2 Repeat after the fixes and verify the listed issues are gone

## 7. Prove the difference

- [x] 7.1 Put fresh captures of the reference, look D and look E side by side and check each device in design.md's table by eye; fix any device that still reads as the reference's and re-check
- [x] 7.2 Write `components/looks/e/NOTES.md`: the idea, colour and type, the device table (reference / D / E / source in TonyAI's brand), a statement of what was made from scratch, motion, self-critique; verify the table has one row per replaced device
- [x] 7.3 Verify no file under `components/looks/e` or `app/tasarim/e` is an image, font or text taken from the reference (only `.tsx`, `.css`, `.md`, `.py` written here)

## 8. Integration checks

- [x] 8.1 Run `npm run lint` and `npm run build` and verify both pass
- [x] 8.2 Verify hiding: every page beneath `/tasarim/e/` has the robots tag, the sitemap has no `/tasarim/` entry, no page outside `/tasarim/` links into it
- [x] 8.3 Verify look D is unchanged: `git diff main -- components/looks/d app/tasarim/d` is empty and its screenshots match the baseline from 1.2
- [x] 8.4 Click through look E's nav in a browser from the homepage and from an inner page and verify the address stays beneath `/tasarim/e/` and nothing in view is left hidden
- [x] 8.5 Run a Lighthouse mobile audit of `/tasarim/e/` and `/tasarim/e/bize-ulasin/` and verify performance is at least 85 and accessibility at least 95
- [x] 8.6 Add a pass entry to `docs/qa.md` and verify it names `/tasarim/e/`
- [x] 8.7 Run `openspec validate add-design-look-e --strict` and verify it passes

## Workflow follow-up

- Commit, open a pull request and merge once the check passes; merging to `main` deploys.
- After the deploy, check `https://tonyai.io/tasarim/e/` and its inner pages on the live site, and that `/tasarim/d/` still looks as before.
- Archive the change after the owner has compared D and E.
