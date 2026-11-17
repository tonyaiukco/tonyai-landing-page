# Tasks

## 1. Setup and baseline

- [x] 1.1 Create a branch `redesign-home-from-comparison` from `main` and verify `git status` shows only the untracked files that were there before
- [x] 1.2 Build `main`, serve `out/` on port 8095 and capture reduced-motion screenshots of `/`, `/tasarim/c/` and `/tasarim/d/` at 1440 and 390 px into the scratchpad. Record the homepage's full height at 1440 px. Verify one image exists per page and width.
- [x] 1.3 Remove the nine unused font packages in design decision 6 with `npm uninstall`. Verify `grep -rn "fontsource" app components` lists only Bricolage Grotesque, DM Sans and Outfit, and that `npm run build` succeeds.

## 2. Copy additions and the source tag

- [x] 2.1 Add the fields in design decision 7 to `content/copy.ts` without editing any existing string. Verify `git diff content/copy.ts` shows added lines only and `npm run lint` passes.
- [x] 2.2 Add `Sourced` to `components/looks/home/parts.tsx` and its `.h-src` rules to `look.css` per design decision 4. Verify with `qa/contrast.py` (pairs added for the source line on white, mist, brand green and `#39C656`) that each is at least 4.5:1.
- [x] 2.3 Use `Sourced` for the hero total, the three scope meters and journey steps 02 and 03 (lead and tag in place of `example` when a step has `figure`). Verify on the built page that each of these figures has its source line beside or beneath it, with scripts disabled.

## 3. Block drawings

- [x] 3.1 Add the `Block` helper and the `.h-blk-1/2/3` and connector classes per design decision 1. Verify on a white, a mist and a green ground that the fills match the table.
- [x] 3.2 Replace `HeroDrawing` with the six value-sized sector blocks and connectors per design decision 2, with `role="img"` and `copy.hero.drawingLabel`. Verify at 1440 and 390 px that the six sector labels are legible and the connectors end at the total card.
- [x] 3.3 Replace `GroupDrawing` with the nested holding, companies and 14 locations, with `role="img"` and `copy.difference.drawingLabel`. Verify it reads on the green band and that the location blocks count 14.
- [x] 3.4 Replace the pins and zigzag rail in `JourneyH` with numbered block markers and a straight connector. Verify at 1440 and 390 px that six markers align with their steps and the line joins them.
- [x] 3.5 Delete `HorizonDrawing`, `Sky`, `CLOUD`, `BIRD`, `lineTree`, `Pin`, the unreferenced glyphs and their CSS. Verify `npm run lint` reports no unused export or import, and `grep -n "infinite\|h-hero-zone\|h-hero-sky\|h-pin\|h-horizon" components/looks/home/look.css` returns nothing.

## 4. Sections

- [x] 4.1 Hero: add the five-verb flow row per design decision 5 and drop the card's separate note line. Verify the five verbs and their fifteen keywords appear in order at 1440, 820 and 390 px without horizontal scrolling.
- [x] 4.2 Strip: stop rendering `strip.facts` and delete `.h-strip-fact`. Verify the strip shows four standards and no "3 kapsam".
- [x] 4.3 "TonyAI farkı": move the five items into the numbered, ruled list beside the heading, without glyphs. Verify the numerals are `#39C656` at 24 px or larger and the section is shorter than in the 1.2 baseline.
- [x] 4.4 Before and after: build the windows cluster and the single screen per design decision 5, with the total through `Sourced`. Verify at 390, 820 and 1440 px that no text is clipped (`scrollWidth` equals `clientWidth` for every element in the section) and the green quote panel is still present.
- [x] 4.5 Closing call to action: remove the drawing and the secondary button, single column. Verify the band holds one button.
- [x] 4.6 Method and assurance: stop rendering `security.note`. Verify the built homepage's text contains neither "teyit bekliyor" nor any visible text starting with "[", and check the other routes outside `/tasarim/` for the same.
- [x] 4.7 Update `components/looks/home/NOTES.md`: the block drawing system and its fill classes, where `Sourced` is used, what was removed from look D, and what still waits (video, product screens). Verify the notes no longer describe the homepage as differing from look D in three points only.

## 5. Integration QA

- [x] 5.1 Run `qa/audit.py` against the production build for every route outside `/tasarim/`. Verify it flags no colour.
- [x] 5.2 Run `qa/contrast.py`. Verify every text pair meets 4.5:1, or 3:1 at large sizes.
- [x] 5.3 Screenshot the homepage at 390, 820 and 1440 px and read every section. Verify one `h1`, no horizontal scroll, targets at least 44 px on mobile, no page errors, no tree, sun, cloud, bird, Venn or pin, and that nothing moves after ten idle seconds. Record the full height at 1440 px against the 1.2 baseline and the 9,000 px target.
- [x] 5.4 Re-shoot `/tasarim/c/` and `/tasarim/d/` and compare with the 1.2 baseline. Verify the renderings are identical.
- [x] 5.5 Run a mobile Lighthouse audit of the homepage on the production build. Verify performance is at least 85 and accessibility at least 95. Record the pass, the heights and the open items in `docs/qa.md`.
- [x] 5.6 Run `openspec validate redesign-home-from-comparison --strict` and verify it passes.

## 6. Review round

- [x] 6.1 Hero: replace the SVG drawing and the bright green card with the HTML sum (six blocks with sector and figure, bracket, white total panel), move the primary button under the heading, remove the standards list and the video link. Verify at 390 by 844 px that the button's bottom edge is above 844 px and the sector labels are 13 px text.
- [x] 6.2 Replace `GroupDrawing` with `GroupTree` (three labelled tiers, counts from the demo data). Verify 6 company blocks and 14 location blocks, and visible tier labels at 1440 and 390 px.
- [x] 6.3 Remove the foot of "TonyAI farkı" and the module links that repeat the demo request; delete `Meter` and `Noted`. Verify `npm run lint` passes and the section is shorter than before the round.
- [x] 6.4 Before and after: two equal columns sharing subgrid rows, scope totals with sources inside the screen, quote panel removed. Verify at 1440 px that both pictures and both lists are level, and at 390 px that each group stays whole.
- [x] 6.5 Replace the audit lens with the record as a definition list and delete `AuditLens.tsx`. Verify at 390 px, with no interaction, that all six fields are visible.
- [x] 6.6 Copy: add `hero.stage.source` and `difference.tiers`, correct the journey result's source to matching units. Verify the built page shows "45 MWh × 0,442 tCO₂e/MWh" and that the previews' markup is unchanged.
- [x] 6.7 Update the spec deltas (`homepage-look`, `site-palette`), design decision 8, `NOTES.md` and `docs/qa.md`. Verify `openspec validate redesign-home-from-comparison --strict` passes.
- [x] 6.8 Re-run the colour audit, the contrast pairs, the clipping, idle-motion and no-script checks and Lighthouse on the rebuilt page, and record the results and the new page height in `docs/qa.md`.

## Workflow follow-up

- The owners approve the new Turkish strings in design decision 7 and compare the homepage side by side with sweep.net.
- The owner merges the branch to `main`, which deploys. The merge is not done in this change.
- The owners decide whether primary buttons move from `#39C656` to brand green, which would be a `site-palette` change.
- Later changes: the demo video when it is delivered (the hero's "Demoyu izleyin" link returns with it), and a real product screen in place of the platform panel.
- Archive the change after the owners approve the homepage on the live site.
