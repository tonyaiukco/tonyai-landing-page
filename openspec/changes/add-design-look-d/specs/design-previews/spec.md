# Spec Delta

## Purpose

Defines how alternative homepage designs are served as hidden previews at `/tasarim/<letter>/`: who can find them, how they stay separate from the live site, what content they carry, and the quality floor they meet.

## ADDED Requirements

### Requirement: Preview looks are served at lettered routes
Each alternative homepage look SHALL be served at `/tasarim/<letter>/`, where `<letter>` is a single lowercase letter. Look D SHALL be served at `/tasarim/d/`.

#### Scenario: Look D is reachable
- **WHEN** a visitor requests `https://tonyai.io/tasarim/d/`
- **THEN** the look D page is returned with status 200

#### Scenario: Existing looks keep working
- **WHEN** a visitor requests `/tasarim/c/` after look D is added
- **THEN** the look C page is returned unchanged

### Requirement: Preview navigation stays inside the preview
A preview look SHALL provide its own versions of the pages its main navigation points to (Kaynaklar and its articles, Şirket, Bize Ulaşın) beneath its route, and its navigation and footer links to those pages and to homepage sections SHALL stay beneath that route.

#### Scenario: Navigation link
- **WHEN** a visitor on `/tasarim/d/` activates "Kaynaklar", "Şirket" or "Bize Ulaşın" in the navigation
- **THEN** the address is `/tasarim/d/kaynaklar/`, `/tasarim/d/sirket/` or `/tasarim/d/bize-ulasin/` and the page is shown in look D

#### Scenario: Article link
- **WHEN** a visitor on `/tasarim/d/kaynaklar/` opens an article
- **THEN** the address is beneath `/tasarim/d/kaynaklar/` and the article is shown in look D

#### Scenario: Section link from an inner page
- **WHEN** a visitor on `/tasarim/d/sirket/` activates "Platform" in the navigation
- **THEN** they arrive at the platform section of `/tasarim/d/`

#### Scenario: Inner pages are hidden too
- **WHEN** the HTML of any page beneath `/tasarim/d/` is inspected
- **THEN** it contains a robots meta tag whose content includes `noindex` and `nofollow`

### Requirement: Preview looks are hidden from search
Every preview look page SHALL carry a robots meta tag with `noindex` and `nofollow`, and SHALL NOT be listed in `sitemap.xml`.

#### Scenario: Robots meta tag
- **WHEN** the HTML of `/tasarim/d/` is inspected
- **THEN** it contains a robots meta tag whose content includes `noindex` and `nofollow`

#### Scenario: Not in the sitemap
- **WHEN** `/sitemap.xml` is fetched
- **THEN** no entry contains `/tasarim/`

### Requirement: Preview looks are not linked from the live site
No page outside `/tasarim/` SHALL link to a preview look.

#### Scenario: Live pages do not link to previews
- **WHEN** the built HTML of every page outside `/tasarim/` is searched for links
- **THEN** no `href` points to a path under `/tasarim/`

### Requirement: Preview looks do not alter the live site
Adding a preview look SHALL NOT change the appearance or content of any page outside its own route.

#### Scenario: Homepage is unchanged
- **WHEN** `/` is rendered at 1440 px and 390 px before and after look D is added
- **THEN** the two renderings are visually identical

#### Scenario: Styles stay inside the look
- **WHEN** the stylesheet of look D is inspected
- **THEN** every rule that styles page content is scoped to the look's wrapper element

### Requirement: Preview looks use the shared copy
A preview look SHALL take its text and demo figures from the site's shared copy source and SHALL NOT state a figure, certification or claim that the shared copy does not contain.

#### Scenario: Consolidated total matches
- **WHEN** look D shows the consolidated emissions total
- **THEN** the figure equals the demo total shown on the homepage, 164.700 tCO₂e

#### Scenario: Primary call to action
- **WHEN** a visitor activates the primary call to action on look D
- **THEN** they are taken to `/demo/`

### Requirement: Preview looks cover the homepage sections
A preview look SHALL present, in this order: navigation, hero, standards strip, difference, platform, demo, journey, compliance, proof, FAQ, final call to action, footer.

#### Scenario: All sections present
- **WHEN** look D is read from top to bottom
- **THEN** each of the twelve sections appears once, in the listed order

### Requirement: Preview looks are accessible
A preview look SHALL have exactly one `h1`, SHALL use semantic landmarks, SHALL meet WCAG AA contrast for text, and SHALL give every interactive target at least 44 by 44 CSS pixels on mobile widths.

#### Scenario: Single top-level heading
- **WHEN** the HTML of `/tasarim/d/` is inspected
- **THEN** it contains exactly one `h1`

#### Scenario: Accent text on a light background
- **WHEN** accent-coloured text is shown on a white or pale background in look D
- **THEN** its contrast ratio against that background is at least 4.5:1, or at least 3:1 if the text is large

#### Scenario: Touch targets
- **WHEN** look D is rendered at 390 px wide
- **THEN** no link, button or control is smaller than 44 by 44 CSS pixels

### Requirement: Preview looks work at mobile and desktop widths
A preview look SHALL render without horizontal scrolling at 390 px wide and SHALL use its full layout at 1440 px wide.

#### Scenario: No horizontal scroll on mobile
- **WHEN** look D is rendered at 390 px wide
- **THEN** the document is no wider than the viewport

### Requirement: Motion never blocks reading
A preview look SHALL NOT capture or snap the scroll wheel, and under `prefers-reduced-motion: reduce` SHALL show all content in its final state without animation.

#### Scenario: Reduced motion
- **WHEN** look D is loaded with `prefers-reduced-motion: reduce`
- **THEN** every heading, paragraph, figure and illustration is visible without scrolling-triggered animation

#### Scenario: Free scrolling
- **WHEN** a visitor scrolls look D with a wheel or touch
- **THEN** the page moves by the amount scrolled and never jumps to a section boundary

### Requirement: Interactions have a non-pointer equivalent
Any information a preview look reveals through a drag or hover interaction SHALL also be reachable by keyboard, and SHALL be shown in full when scripts are unavailable or reduced motion is requested.

#### Scenario: Audit lens by keyboard
- **WHEN** a keyboard user focuses the audit lens control in look D and presses the arrow keys
- **THEN** the lens moves and the record's source, emission factor and reviewer become readable

#### Scenario: Audit lens without scripts
- **WHEN** look D is loaded with JavaScript disabled
- **THEN** the record's entry, source document, emission factor and reviewer are all visible as static text

#### Scenario: Audit lens on touch
- **WHEN** a visitor on a touch device swipes vertically across the audit lens
- **THEN** the page scrolls

### Requirement: Preview looks meet a performance floor
A preview look SHALL score at least 85 for performance and at least 95 for accessibility in a Lighthouse mobile audit of the production build.

#### Scenario: Lighthouse mobile audit
- **WHEN** Lighthouse audits the built `/tasarim/d/` page with mobile emulation
- **THEN** the performance score is at least 85 and the accessibility score is at least 95
