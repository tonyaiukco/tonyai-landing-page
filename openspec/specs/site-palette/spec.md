# site-palette Specification

## Purpose

Defines the colours the public tonyai.io site may use. The site uses the TonyAI product's palette, so the site and the product read as one brand. This spec also sets where green grounds appear, how the accents are used, the contrast floors and the brand assets that must follow the palette.

## Requirements

### Requirement: Site colours come from the product palette
Every colour on a page outside `/tasarim/` SHALL be a colour from the product palette in `docs/Tool-Mevcut-Renk-Paleti.pdf`, a transparent tint of one, or an adjusted value recorded in the homepage look's notes. An adjusted value SHALL differ from its source only by the darkening or lightening needed to meet a contrast requirement.

#### Scenario: Inspecting a page's colours
- **WHEN** the computed text, background, border, fill and stroke colours of any route outside `/tasarim/` are collected at 1440 px and 390 px
- **THEN** each colour is in the product palette, is a transparent tint of a palette colour, or is listed as an adjusted value with its source colour in the notes

#### Scenario: Look C's palette is gone
- **WHEN** the same colours are collected
- **THEN** none of sand `#ede4d4`, paper `#f6f1e8`, moss `#1f3d2b` or the terracottas `#c96a3d`, `#f0b48f` and `#9a4622` appears

### Requirement: Accents come from the product's greens
The homepage opening’s demo button SHALL use brand green `#1C5E3A` with a white label. Other primary buttons SHALL use `#39C656` with `#141318` labels. The hero total SHALL use `#1B5B38` on white. On light grounds accent text SHALL use brand green. On brand green grounds large accent text SHALL use `#39C656` and smaller accent text SHALL use `#B1D2BD`. Text on a `#39C656` ground SHALL use `#141318`. Accents SHALL use the product greens.

#### Scenario: Primary button
- **WHEN** the homepage is viewed on a phone or desktop
- **THEN** the demo button in the opening has a #1C5E3A background and a #FFFFFF label. Other primary buttons, including the closing invitation, use #39C656 with #141318 labels.

#### Scenario: Accent text on a green band
- **WHEN** a heading on a brand green band marks one line in the accent colour, and an eyebrow or footer heading is shown on the same band
- **THEN** the marked heading line is #39C656 at a large text size (at least 24 px, or 18.66 px bold), and the eyebrow or footer heading is #B1D2BD.

### Requirement: Grounds follow look D
The white opening SHALL lead through the original block skyline into a brand-green facility-to-group chapter. The platform and reference area SHALL use mist. The audit area and closing invitation SHALL use brand green. The shared footer SHALL use mist with brand-green lettering. Other pages outside the previews SHALL continue to use look D's ground placement in the product palette.

#### Scenario: Homepage sections
- **WHEN** the homepage is read from top to bottom at 390 px or 1440 px
- **THEN** the original skyline is visible between the opening and group chapter and again above the closing invitation. The group and audit bands use #1C5E3A, with the #E9FAF2 platform between them.

#### Scenario: Inner pages
- **WHEN** Şirket, Demo, Kayıt or Bize Ulaşın is opened
- **THEN** Şirket's principles section and the side panels beside the forms have a #1C5E3A ground.

#### Scenario: Footer
- **WHEN** the closing invitation is followed by the footer
- **THEN** the #1C5E3A invitation gives way to the #E9FAF2 footer with the TonyAI wordmark, navigation and contact links.

### Requirement: Text and controls meet WCAG AA contrast
Text SHALL meet 4.5:1 against its ground, or 3:1 at large text sizes. Form field borders, focus indicators and other graphics that carry meaning SHALL meet 3:1 against their ground.

#### Scenario: Small text on the mist band and on green
- **WHEN** body or accent text is shown on the `#E9FAF2` band, or small accent text on a `#1C5E3A` band
- **THEN** its contrast is at least 4.5:1

#### Scenario: Form fields
- **WHEN** the Demo, Kayıt or Bize Ulaşın form is shown
- **THEN** each field's border is at least 3:1 against the form's ground, and each field's focus ring is at least 3:1 against its surroundings

#### Scenario: Lighthouse accessibility
- **WHEN** a mobile Lighthouse audit is run on the homepage of the production build
- **THEN** the accessibility score is at least 95 and no colour-contrast item fails

### Requirement: Status is never shown by colour alone
Wherever the site shows a data status, the status SHALL be written out in text, and any mark that shows how complete an item is SHALL use palette colours only.

#### Scenario: Platform panel status list
- **WHEN** the platform section's category list is shown
- **THEN** each category's status is written out, and its completeness bar uses `#39C656` for filled cells and a palette colour for empty ones

### Requirement: Brand assets follow the palette
The logo in the navigation and footer, the favicon, the iOS home-screen icon, the share image, the browser theme colour and every image in `public/marka/` SHALL use only palette colours. `public/marka/OKU-BENI.txt` SHALL list the colours the brand kit uses.

#### Scenario: Browser chrome and icons
- **WHEN** the site is opened on a phone and added to the home screen
- **THEN** the theme colour, favicon and home-screen icon use only palette colours

#### Scenario: Brand kit
- **WHEN** the images in `public/marka/` are opened
- **THEN** they use only palette colours, and `OKU-BENI.txt` names those colours and no terracotta

### Requirement: The palette change leaves the design previews unchanged
Recolouring the site SHALL NOT change the appearance or content of any page under `/tasarim/`.

#### Scenario: Look C and look D
- **WHEN** `/tasarim/c/` and `/tasarim/d/` are rendered at 1440 px and 390 px before and after the change
- **THEN** the renderings are visually identical
