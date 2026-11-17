# site-palette Specification

## Purpose

Defines the colours the public tonyai.io site may use. The site uses the TonyAI product's palette, so the site and the product read as one brand. This spec also sets where dark grounds may appear, the contrast floors and the brand assets that must follow the palette.

## Requirements

### Requirement: Site colours come from the product palette
Every colour on a page outside `/tasarim/` SHALL be a colour from the product palette in `docs/Tool-Mevcut-Renk-Paleti.pdf`, a transparent tint of one, or an adjusted value recorded in the homepage look's notes. An adjusted value SHALL differ from its source only by the darkening or lightening needed to meet a contrast requirement.

#### Scenario: Inspecting a page's colours
- **WHEN** the computed text, background, border, fill and stroke colours of any route outside `/tasarim/` are collected at 1440 px and 390 px
- **THEN** each colour is in the product palette, is a transparent tint of a palette colour, or is listed as an adjusted value with its source colour in the notes

#### Scenario: Look C's palette is gone
- **WHEN** the same colours are collected
- **THEN** none of sand `#ede4d4`, paper `#f6f1e8`, moss `#1f3d2b` or the terracottas `#c96a3d`, `#f0b48f` and `#9a4622` appears

### Requirement: Brand green is the only accent
Actions and accent text SHALL use brand green `#1C5E3A` on light grounds. On a brand green ground, accent text SHALL use `#B1D2BD` and buttons SHALL be white with brand green text. No other hue SHALL be used as an accent.

#### Scenario: Primary button on a light ground
- **WHEN** a primary call-to-action button is shown on a light ground
- **THEN** its ground is `#1C5E3A` and its label is `#FFFFFF`

#### Scenario: Primary button on the closing band
- **WHEN** a primary call-to-action button is shown on the brand green closing band
- **THEN** its ground is `#FFFFFF` and its label is `#1C5E3A`

### Requirement: Dark grounds are limited to the closing band and the footer
Among full-width sections and side panels, only the closing call to action and the footer SHALL have a dark ground, which SHALL be brand green `#1C5E3A`. Other sections and panels SHALL use the light grounds `#FAFAFA`, `#FFFFFF` or `#F3F1F6`. Small components (buttons, step numbers, the hero certificate card, the video placeholder, the logo tile) MAY use brand green.

#### Scenario: Homepage sections
- **WHEN** the homepage is scrolled from top to bottom
- **THEN** "TonyAI farkı", the method and assurance section, the illustrative case and the FAQ have light grounds, and only the closing call to action and the footer have a brand green ground

#### Scenario: Inner page panels
- **WHEN** Şirket, Demo, Kayıt or Bize Ulaşın is opened
- **THEN** the principles section and the side panels have light grounds, and no two neighbouring full-width bands share a ground

### Requirement: Text and controls meet WCAG AA contrast
Text SHALL meet 4.5:1 against its ground, or 3:1 at large text sizes. Form field borders, focus indicators and other graphics that carry meaning SHALL meet 3:1 against their ground.

#### Scenario: Muted text on the alternate band
- **WHEN** muted text is shown on the `#F3F1F6` band
- **THEN** its contrast is at least 4.5:1

#### Scenario: Form fields
- **WHEN** the Demo, Kayıt or Bize Ulaşın form is shown
- **THEN** each field's border is at least 3:1 against the form's ground, and each field's focus ring is at least 3:1 against its surroundings

#### Scenario: Lighthouse accessibility
- **WHEN** a mobile Lighthouse audit is run on the homepage of the production build
- **THEN** the accessibility score is at least 95 and no colour-contrast item fails

### Requirement: Status colours carry the product's meanings
Wherever the site shows a data status, its label SHALL use the product's pill colours for the same word (for example, İncelemede purple, Eksik red), and any completeness mark SHALL use the product's data-status dots: green for complete, amber for partial, red for missing. The status SHALL also be given in text, so that colour is never its only signal.

#### Scenario: Platform panel status list
- **WHEN** the platform section's category list is shown
- **THEN** each category's status is written out in a pill coloured as the product colours that word, and its bar uses the green or amber dot that matches how complete it is

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
