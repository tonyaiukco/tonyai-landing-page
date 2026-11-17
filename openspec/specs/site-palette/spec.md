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
Primary buttons SHALL be Kapsam 1 green `#39C656` with `#141318` labels on every ground. On light grounds, accent text SHALL be brand green `#1C5E3A`. On brand green grounds, accent text at large sizes SHALL be `#39C656` and smaller accent text SHALL be `#B1D2BD`. Text on a `#39C656` ground SHALL be `#141318`. No hue other than these greens SHALL be used as an accent.

#### Scenario: Primary button
- **WHEN** a primary call-to-action button is shown on a light or a brand green ground
- **THEN** its ground is `#39C656` and its label is `#141318`

#### Scenario: Accent text on a green band
- **WHEN** a heading on a brand green band marks one line in the accent colour, and an eyebrow or footer heading is shown on the same band
- **THEN** the marked heading line is `#39C656` at a large text size (at least 24 px, or 18.66 px bold), and the eyebrow or footer heading is `#B1D2BD`

### Requirement: Grounds follow look D
Pages outside `/tasarim/` SHALL use look D's ground plan in the product palette: brand green `#1C5E3A` where look D uses teal, and white `#FFFFFF` or the mist `#E9FAF2` where it uses white or mist. The footer SHALL be the same brand green as the closing call to action, divided from it by a rule.

#### Scenario: Homepage sections
- **WHEN** the homepage is scrolled from top to bottom
- **THEN** "TonyAI farkı", the method and assurance section, the illustrative case's quote panel, the closing call to action and the footer have a `#1C5E3A` ground, and every other section has a `#FFFFFF` or `#E9FAF2` ground

#### Scenario: Inner pages
- **WHEN** Şirket, Demo, Kayıt or Bize Ulaşın is opened
- **THEN** Şirket's principles section and the side panels beside the forms have a `#1C5E3A` ground

#### Scenario: Footer
- **WHEN** the closing call to action is followed by the footer
- **THEN** both have a `#1C5E3A` ground with a rule between them

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
