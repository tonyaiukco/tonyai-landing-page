# Proposal

## Why

Look D (`/tasarim/d/`) is liked, but it sits close to the site it was modelled on, the DUOL sustainability page. Nothing was copied (no image, icon, code, text or font), yet several of that site's most recognisable devices are echoed, and a homepage that reads as another company's site is a risk under unfair-competition rules even where copyright does not reach. The owner wants to see a version that keeps what works in D while drawing its signature from TonyAI's own brand, before any look is promoted to `/`.

## What Changes

- Add a fifth look, "E", at `/tasarim/e/`, with its own Kaynaklar (and articles), Şirket and Bize Ulaşın pages beneath it, hidden like the other previews.
- E keeps D's page structure, copy, section order, split layout, line-drawn icons and the audit lens. It replaces every device that is recognisably the reference's:
  - the deep teal and neon mint palette becomes TonyAI's forest and leaf greens with one warm accent;
  - the typeface becomes the brand's own Schibsted Grotesk, with rounded corners taken from the logo in place of square ones;
  - the hero's dashed overlapping ellipses become six tiles sized by each subsidiary's emissions that assemble into one square;
  - the mint card with a roof-shaped notch becomes a block-and-leaf card built from the logo's shapes;
  - the misty conifer treeline becomes a skyline of rounded blocks;
  - the horizontal segment meters become square-dot grids;
  - the square uppercase mint button with a caption above becomes a rounded sentence-case button;
  - the map-pin route becomes a numbered stepper;
  - the lens loses its labelled hanging grip;
  - the oversized numeral standing on a colour band becomes a different composition;
  - two-tone heading lines become a single colour with one marked word.
- Look D is left exactly as it is, for comparison.
- A written comparison of E against the reference, device by device, is kept with the look so the difference can be shown to a lawyer or reviewer.

Out of scope: choosing between C, D and E; promoting any look to `/`; legal advice.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `design-previews`: adds look E at `/tasarim/e/`, and a requirement that a look modelled on a third-party site replaces that site's recognisable devices with ones drawn from TonyAI's brand. No existing requirement changes.

## Impact

- New: `app/tasarim/e/` (layout, homepage, inner pages), `components/looks/e/` (components, `look.css` scoped under `.look-e`, `NOTES.md` with the comparison table, QA scripts).
- Changed: `docs/qa.md` (QA record).
- Unchanged: everything under `app/tasarim/d/` and `components/looks/d/`, every live route, `content/copy.ts`, dependencies (Schibsted Grotesk is already loaded by the root layout).
- Deployment: merging to `main` publishes the pages at `tonyai.io/tasarim/e/`.
- The repository is public and its notes name the reference. That stays: the record also shows what was made from scratch.
