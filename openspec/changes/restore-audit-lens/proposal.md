# Proposal

## Why

Three things came out of the owner's look at the live homepage on 18 November. The primary button was not visible on their phone without scrolling, although it passed the 390 by 844 px check. The owner liked look D's audit lens and wants it back in place of the plain record that replaced it. And the "Yöntem" link in the navigation opened "Nasıl çalışır" instead of the method and assurance section.

## What Changes

- **Hero on phones.** The primary button moves above the hero's second paragraph, and the space above it is tightened under 600 px, so the button shows without scrolling on short screens too (bottom edge at about 480 px, from 784 px).
- **Audit lens restored on wide screens.** From 900 px up, with scripts and motion, the method and assurance section shows the draggable lens again, with its arrow-key steps. Under 900 px, without scripts or with reduced motion, the record stays laid out in full, as it has been since the review round: a phone visitor reads all six fields without an interaction.
- **"Yöntem" anchor.** `#yontem` moves from "Nasıl çalışır" to the method and assurance section. "Nasıl çalışır" gets `#nasil-calisir`. The navigation link, the footer link and the "Yöntemi inceleyin" module link all point at `#yontem`.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `homepage-look`: "The audit trail is readable as it stands" now allows the lens on wide screens while keeping the record in full on narrow ones; "The primary action leads the hero" is checked on a short phone screen; a new requirement fixes where the "Yöntem" link leads.

## Impact

- Changed: `components/looks/home/AuditLens.tsx` (restored from commit 24f5175), `SectionsH.tsx`, `HeroH.tsx`, `look.css`, `NOTES.md`, `qa/contrast.py`, `docs/qa.md`.
- No copy, dependency, routing or deployment change. The previews are untouched.
