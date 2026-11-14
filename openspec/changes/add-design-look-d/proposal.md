# Proposal

## Why

The homepage design is still being chosen: Atmosfer (`/tasarim/c/`) is the current pick, and the owner now wants to judge a fourth direction modelled on the DUOL sustainability page (https://duol.eu/sustainability), an Awwwards-listed site. It has to be viewable on the real domain next to C without replacing the homepage or becoming discoverable.

## What Changes

- Add a fourth alternative homepage look, "D", at `/tasarim/d/`, built from the same copy and demo data as the other looks (`content/copy.ts`), with the same section order as look C.
- The look follows the reference's visual system: a four-tone palette (deep teal, mint, pale mint-grey, white), two-tone bold geometric headings over light large body text, asymmetric split layouts with offset colour panels, thin-line SVG illustration, segmented bar meters, one oversized numeral, square mint buttons, and one drag interaction (an "audit lens" that reveals the source, evidence and approval chain behind a figure).
- Deliberate departures from the reference: a free geometric typeface (Outfit) instead of the licensed Neulis Sans; a darker emerald for accent text on light backgrounds so contrast passes WCAG AA; vector illustration only, no photography or 3D renders; no asset, icon or code taken from the reference site.
- The page ships to production at `tonyai.io/tasarim/d/` as a hidden preview: `noindex, nofollow`, absent from the sitemap, linked from no page.
- The look carries its own versions of the pages its navigation points to (`/tasarim/d/kaynaklar/` with its three articles, `/tasarim/d/sirket/`, `/tasarim/d/bize-ulasin/`), so browsing the preview never drops the visitor into the live design. Demo, login, register and the legal pages still open the live ones.
- Add the `@fontsource-variable/outfit` dependency.
- Nothing changes on `/`, on any other live route, in the navigation, or in hosting and deployment.

## Capabilities

### New Capabilities

- `design-previews`: alternative homepage looks served at `/tasarim/<letter>/` as hidden previews: how they stay out of search and navigation, how they are isolated from the live site's styles, what content they must carry, and the accessibility and performance floor they must meet.

### Modified Capabilities

None. `site-hosting` and `site-deployment` requirements are unchanged; the new route is one more statically exported page.

## Impact

- New: `app/tasarim/d/` (layout, homepage and inner pages), `components/looks/d/` (components, `look.css` scoped under `.look-d`, `NOTES.md`, screenshot script).
- Changed: `package.json` and `package-lock.json` (Outfit font), `docs/qa.md` (QA record for the new route), `content/copy.ts` and `components/AuditTrail.tsx` (the audit-trail demo record moves into the shared copy file so both the live component and the new look read it; no visible change).
- Dependencies: one font package; GSAP, ScrollTrigger and Lenis are already installed.
- Deployment: merging to `main` publishes the page at `tonyai.io/tasarim/d/`. Anyone who knows the address can open it.
