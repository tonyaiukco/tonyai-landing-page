# TonyAI website: design comparison and direction

16 November 2026. For Emre, Arda, Deniz and the designer/developer.

Pages compared, as they are live today:

| Label | URL | What it is |
|---|---|---|
| **A · Current** | `tonyai.io/` | The first light design, still the homepage |
| **C · Atmosfer** | `tonyai.io/tasarim/c/` | The design picked on 9 November |
| **D · Orman** | `tonyai.io/tasarim/d/` | The developer's recent design |

How this was reviewed: C and D were opened live at 1440 px desktop width and scrolled top to bottom, with fonts, colours and section structure read from the page. A was reviewed from Emre's live hero screenshot of 16 November and the source code, not re-opened live. Phone width was not re-tested for any of the three in this pass, and D has never been checked on a phone by me.

---

## Part 1 · Mini report

### The short answer

Keep **C** as the base. Take three things from **D**. Retire **A**. Then spend the effort on real material and one signature idea, because that is what makes a site stop looking generated. A fourth skin would not.

### Why the three feel similar to each other, and to everything else

All three pages are the same page wearing different clothes. The section order is identical: hero, standards strip, five difference cards, six platform modules, demo, six steps, standards, before/after, FAQ, final call to action. The copy is nearly identical too. Changing font and colour on the same skeleton produces three variations of one site.

That skeleton is also the default skeleton of every generated SaaS site. The components are the default components: pill badges, rounded cards, a numbered step row, an FAQ accordion. And none of the three shows anything only TonyAI has: no real product screen, no person, no customer, no photograph.

So the "AI look" is mostly not about colour or font. It comes from default structure, default components and no real material.

### Side by side

| | A · Current | C · Atmosfer | D · Orman |
|---|---|---|---|
| Palette | Sage-grey paper, forest green | Warm sand, moss green, terracotta accent | Dark teal, bright mint, white |
| Type | Schibsted Grotesk, mono eyebrows | Bricolage Grotesque headlines, DM Sans text | Outfit throughout, uppercase tracked labels |
| Shapes | Rounded white cards, pills | Large rounded cards, pills, floating pill nav, blurred colour fields | Square corners, flat blocks, hairlines |
| Imagery | Subsidiary card grid | None; a five-row list in a card | Line illustrations: sector Venn diagram, forest silhouette, sun and trees |
| Mood | Neutral, tidy, anonymous | Warm, calm, human | Confident, structured, corporate |
| Copy version | Old hero panel | **Current** (five verbs, before/after windows) | **Out of date** (see below) |
| Page height at 1440 px | not measured | 10,918 px | 11,794 px |

### A · Current homepage

**Works:** clean, legible, good contrast (forest on paper 7.3:1).

**Does not work:**
- It is the most template-like of the three. Nothing on it could not belong to any other green B2B tool.
- The hero panel is the "Bağlı ortaklıklar" grid Emre asked to remove on 9 November. In the live screenshot the company names and sectors are cut off ("Dağıtı…", "İmalat…", "Perak…") and there is an empty gap between the label and the cards.

**Verdict:** retire it. Nothing here needs carrying forward.

### C · Atmosfer

**Works:**
- The palette is the most ownable of the three. Carbon software is almost all green, teal and blue; sand with terracotta is not. It also fits the brief Emre gave: warm, genuine, human.
- Bricolage Grotesque gives the headlines some character.
- The copy is the approved version, and the before/after section (messy spreadsheet windows against one TonyAI screen) is the single most memorable thing on any of the three pages.

**Does not work:**
- The blurred colour fields behind the hero, the floating pill navigation and pills on almost everything are the most recognisable "made with AI in 2025" signals. C leans on all three.
- Almost every block is a large rounded card. With no change in shape, the page has no rhythm.
- No imagery at all. The hero's right side is a list.
- Terracotta fails contrast in places: white on the terracotta button is 3.7:1 and terracotta text on sand is 3.3:1. Both need 4.5:1 for normal-size text.

### D · Orman

**Works:**
- It has pictures with a subject. The sector Venn diagram in the hero says "many kinds of business, one total" faster than any paragraph on the other two pages.
- Square corners, flat blocks and thin rules read as serious B2B software and give the page a firmer rhythm.
- The teal and white sections are high contrast (white on teal 11.2:1).

**Does not work:**
- **It looks very close to Sweep.** Dark teal with bright mint, forest silhouettes, a Venn diagram hero, uppercase tracked buttons: that combination is strongly reminiscent of sweep.net, a direct competitor active in the UK and EU. Put the two side by side before investing further. Looking like a follower of a competitor is a worse problem than looking generated.
- Forest, leaves, sun and clouds are the eco imagery that reads as greenwashing to a finance or audit buyer. The outside research report makes the same point.
- Outfit is one of the most common fonts on generated sites.
- Mint on white is 1.6:1. It is fine as a button background with dark text (6.9:1) but cannot be used for text or icons on white or mist.
- The content is an older version: the hero has no five-verb flow, the difference section still shows the consolidated-total card, and the facts strip ("3 kapsam, tek platformda") that was removed is back.
- At 1440 px the before/after section is broken: the "164.700" figure is oversized and cut off by the block edge.
- The "Denetim merceği" lens needs a mouse hover to reveal the content, so it does nothing on a phone.

### What to take from each

| From | Take | Leave |
|---|---|---|
| **C** | Palette, typefaces, current copy, before/after windows, the five-verb flow | Blurred colour fields, floating pill nav, pill overuse, card-on-card layout |
| **D** | Illustration with a subject, square and firm geometry in places, hairline dividers, uppercase labels used sparingly | Teal and mint, forest and weather drawings, Outfit, the hover lens |
| **A** | Nothing | All of it |

### The three moves that matter more than the skin

1. **Show the real product.** The tool exists now. Real screens of Gösterge Paneli, Veri Girişi and İnceleme Kuyruğu, plus the tutorial video, do more against the generated look than any redesign. Use demo data only.
2. **Build the graphics from the logo.** The mark is three blocks and a leaf. Blocks can stand for companies, locations and categories, and stack into a consolidated total. That gives TonyAI a drawing system no one else has, and it replaces D's forest with something about the product.
3. **One signature device: every number carries its source.** The product's promise is "her rakam kaynağıyla". Do it on the site itself: every figure shown gets a small source tag beside it (for example `19,89 tCO₂e` with `fatura 2026-03 · 0,442`). It is typographic, cheap to build and on message.

After those: founders with real photographs on the company page, and the first customer or pilot name the moment one can be shown.

### Live issues found while reviewing

These are separate from the design question but are public today.

| Where | Issue |
|---|---|
| C and D, standards section | The text `[Barındırma konumu ve sertifikalar: teyit bekliyor]` is visible to visitors. It is an internal placeholder. Hide the line until the hosting answer exists. |
| C and D, demo section | Still shows "Ürün demosu · yakında". The video update of 12 November is not deployed. |
| D, before/after | "164.700" is cut off at 1440 px. |
| A, hero | Card text truncated, empty gap above the cards. |
| `/tasarim/c/` and `/tasarim/d/` | Both design drafts are publicly reachable. Add `noindex` now and remove them at launch. |

---

## Part 2 · Design brief for the developer

Goal: one design, built on C's code (`components/looks/c/`, scoped under `.look-c`), with the changes below. Then make it the homepage and roll it out to the inner pages.

### 1. Tokens

Keep C's existing variables. Add or change these.

```css
.look-c {
  /* accent: darken so text and buttons pass 4.5:1 */
  --c-terra-btn: #9A4622;   /* button background; sand text on it = 5.7:1 */
  --c-terra-text: #9A4622;  /* terracotta used as text on sand */
  --c-terra: #C96A3D;       /* decorative only: large numerals, fills, rules */

  /* geometry: two radii, not one */
  --c-r-lg: 20px;           /* media: video, product screens, before/after */
  --c-r-sm: 6px;            /* everything structural: cards, inputs, tags */

  --c-rule: 1px solid var(--c-sand-3);
}
```

Rules:
- `--c-terra` never carries text below 24 px.
- No new colours. Teal and mint from D do not come across.
- Fonts stay Bricolage Grotesque (headlines) and DM Sans (text). Remove Outfit and every font package not used by C from `package.json`.

### 2. Remove

| Element | Where | Replace with |
|---|---|---|
| Blurred colour fields (`.c-fields`, `.c-field-*`) | `HeroC.tsx`, `look.css` | Flat sand background. One hairline under the nav. |
| Floating pill navigation | `.c-nav-wrap` | Full-width bar, flat, hairline bottom border, logo left, links centre, actions right |
| Pill eyebrows with dot (`.c-pill-dot` above headings) | every section | Plain uppercase label, 12 px, letter-spacing 0.1em, moss colour, no background |
| Standards as pills | hero, strip | Plain text separated by hairlines, as D does |
| Card-inside-band on every section | Difference, Platform | See section 4 |

Pills stay in one place only: status values inside product imagery (Onaylandı, İncelemede, Eksik), because that is what they are in the real tool.

### 3. Add

**3.1 Block illustration system.** Draw from the logo geometry: a square with `rx` equal to 24% of its side, plus the leaf quarter-arc. Flat fills, moss, sage and terracotta only, no outlines, no gradients, no trees, no weather.

| Illustration | Used in | Shows |
|---|---|---|
| Sector blocks to one total | Hero, right side | Six labelled blocks (İmalat, Enerji, Taşımacılık, Dağıtım, Toptan, Perakende) converging on one total block with `164.700 tCO₂e`. This replaces D's Venn idea in our own shapes. |
| Group structure | Difference section | Blocks nested: holding, companies, locations |
| Record to report | How it works | One block travelling through five positions |

Build as inline SVG components in `components/looks/c/illustrations/`. Each needs a `role="img"` and a Turkish `aria-label`.

**3.2 Hero.** Keep the left column as is. On the right, the sector-blocks illustration on top, and the five-verb flow (Topla, Hesapla, Onayla, Raporla, Öngör, with the approved keywords) as a single compact row or column under it. Keep the keywords from `copy.hero.flow` unchanged.

**3.3 Real product screens.** New component `ProductShot` with a plain browser-style frame (hairline border, `--c-r-lg`, no shadow heavier than `0 20px 40px -24px rgba(0,0,0,.25)`).

| Screen | Section |
|---|---|
| Gösterge Paneli | Platform, lead image |
| Veri Girişi with live calculation | Platform or How it works |
| İnceleme Kuyruğu | Standards / audit section, replacing the hover lens |

Use the demo data set from the tutorial (Demo Holding A.Ş., 164.700 tCO₂e, users Burcu Uzunoğlu and Can Aras). No real names or companies. Export at 2× as WebP, width 1600 px, with `width`, `height` and `loading="lazy"`.

**3.4 Source tags.** New component `Sourced`:

```tsx
<Sourced value="19,89 tCO₂e" source="Fatura 2026-03 · 0,442 tCO₂e/MWh" />
```

Renders the value, then the source in 12 px mono-style small caps beneath or beside it, moss colour, with a 1 px left rule. Use it on every figure on the page: hero total, journey example, before/after screen, standards record.

**3.5 Video.** Deploy the 12 November update (`components/DemoVideo.tsx`, `public/video/`). The demo section then has a real poster frame in place of the placeholder.

### 4. Section-by-section

| Section | Change |
|---|---|
| Nav | Flat bar (section 2). |
| Hero | Section 3.2. No background effects. |
| Standards strip | Text with hairline separators. No pills. |
| TonyAI farkı (5 items) | Drop the card grid. Two columns on moss: heading and lead left, the five items right as a ruled list (hairline between items, small terracotta numeral, title, one paragraph). Group-structure illustration under the heading. |
| Platform (6 modules) | Product screenshot as the lead, full width. Modules below as a 3 × 2 ruled grid with square corners, no card backgrounds. |
| Demo | Video. Unchanged otherwise. |
| Nasıl çalışır | Keep C's row. Change the circles to blocks from the illustration system. Example lines become `Sourced` tags. |
| Yöntem ve güvence | Four standards as a ruled row (D's layout is good here). Replace the hover lens with the İnceleme Kuyruğu screenshot. Remove the placeholder hosting line. |
| Önce ve sonra | Keep exactly as in C. This is the page's best section. |
| SSS | Keep. First item open. |
| Final CTA | Flat moss, no illustration, one button. |

Target page height at 1440 px: under 9,000 px. C is 10,918 px today; the list layouts in Difference and Platform should recover most of the difference.

### 5. Motion

- Reveal on scroll: opacity and 12 px rise, 300 ms, once. Nothing else moves on its own.
- No parallax, no drifting backgrounds, no cursor effects, no hover-only content.
- Honour `prefers-reduced-motion`: everything visible and static.

### 6. Accessibility and weight

- Text contrast 4.5:1 minimum, large text and interface borders 3:1. Check every terracotta use against section 1.
- Visible focus outline on every link, button and field: 2 px moss, 2 px offset.
- All content reachable by keyboard and by touch.
- Homepage transfer weight, first load without the video: under 600 KB. Fonts: two families, variable, `latin` and `latin-ext` subsets only.

### 7. Housekeeping

- Make this design `/`. Delete `components/looks/d/` and the first-design components once the inner pages are moved.
- Until then, add `<meta name="robots" content="noindex">` to `/tasarim/*`.
- Inner pages (`/demo/`, `/kayit/`, `/sirket/`, `/bize-ulasin/`, `/kaynaklar/`, legal) take the same nav, footer, tokens and form styles.
- The web app at `app.tonyai.io` still uses a different leaf icon as its logo. Swap in the brand mark so site and product match.

### 8. Done when

- [ ] One design at `/`; no `/tasarim/*` routes in the build
- [ ] No blurred backgrounds, no floating nav, pills only as status values
- [ ] Hero shows the sector-blocks illustration and the five verbs
- [ ] At least three real product screens with demo data
- [ ] Every figure on the homepage has a source tag
- [ ] Video plays in the demo section and on `/demo/`
- [ ] No placeholder text visible anywhere (`teyit bekliyor`, `yakında`)
- [ ] Contrast, focus and keyboard checks pass
- [ ] Checked at 390, 820 and 1440 px
- [ ] Side-by-side check against sweep.net shows no resemblance

### Decisions needed from Emre and Arda

1. Confirm C as the base with D's structure, or say if you would rather go the other way.
2. Agree to drop the forest and weather drawings in favour of the block system.
3. Who draws the three illustrations: the designer, or should a first version be drafted in code?
4. Who exports the product screens with demo data?
