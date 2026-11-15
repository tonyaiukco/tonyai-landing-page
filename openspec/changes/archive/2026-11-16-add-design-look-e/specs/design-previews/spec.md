# Spec Delta

## ADDED Requirements

### Requirement: Look E is served at its own route
Look E SHALL be served at `/tasarim/e/` with its inner pages beneath it, and SHALL meet every requirement that applies to a preview look.

#### Scenario: Look E is reachable
- **WHEN** a visitor requests `https://tonyai.io/tasarim/e/`
- **THEN** the look E page is returned with status 200 and a robots meta tag containing `noindex` and `nofollow`

#### Scenario: Look E navigation stays inside look E
- **WHEN** a visitor on `/tasarim/e/` activates "Kaynaklar", "Şirket" or "Bize Ulaşın" and then "Platform"
- **THEN** every address visited is beneath `/tasarim/e/` and the content in view is visible

### Requirement: Adding a look leaves the other looks unchanged
Adding a preview look SHALL NOT change the appearance, content or files of any other preview look.

#### Scenario: Look D after look E is added
- **WHEN** `/tasarim/d/` and its inner pages are rendered at 1440 px and 390 px before and after look E is added
- **THEN** the renderings are visually identical

### Requirement: A look modelled on another site carries TonyAI's own devices
A preview look that follows a look modelled on a third-party site SHALL replace that site's recognisable visual devices with ones drawn from TonyAI's logo, colours, typeface or data, and SHALL be accompanied by a written comparison listing each device, what the reference does and what the look does instead.

#### Scenario: Palette and typeface
- **WHEN** the colours and typeface of look E are inspected
- **THEN** its dark, mid and light greens are TonyAI's brand greens, its typeface is the brand's Schibsted Grotesk, and neither look D's teal nor its mint appears

#### Scenario: Signature devices
- **WHEN** look E is compared with look D
- **THEN** the hero's dashed ellipses, the notched card, the conifer treeline, the horizontal segment meters, the square uppercase button with a caption, the map-pin route, the lens grip and the two-tone heading lines are each replaced by a different device

#### Scenario: Comparison record
- **WHEN** the notes kept with look E are read
- **THEN** they contain one entry per replaced device naming the reference's version, look E's version and its source in TonyAI's brand

#### Scenario: Nothing taken from the reference
- **WHEN** the files of look E are inspected
- **THEN** none of them is an image, icon, font, text or code file taken from the reference site
