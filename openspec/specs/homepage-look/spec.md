# homepage-look Specification

## Purpose

Defines what the live homepage at `/` shows beyond its colours, so that it reads as TonyAI's own page: drawings made from the logo's shapes, figures shown with their source, the approved hero content, and no internal placeholders. Colours are governed by `site-palette`.

## Requirements

### Requirement: Homepage drawings are built from the logo's shapes
Every drawing on the homepage SHALL be composed of the logo's two shapes, the rounded block and the leaf, with flat fills and straight connecting lines. The homepage SHALL NOT show a tree, sun, cloud, bird, overlapping-circle diagram or map pin.

#### Scenario: Scrolling the homepage
- **WHEN** the homepage is scrolled from top to bottom at 1440 px and 390 px
- **THEN** no tree, sun, cloud, bird, overlapping-circle diagram or map pin is visible

#### Scenario: Hero drawing
- **WHEN** the hero is shown
- **THEN** it shows six blocks, each with its subsidiary sector and its emissions as text beneath it, joined by one line to the consolidated total

#### Scenario: Group structure drawing
- **WHEN** "TonyAI farkı" is shown
- **THEN** its drawing shows three tiers, each with a visible label: one holding, the companies beneath it and the locations beneath each company, joined by lines

#### Scenario: Journey markers
- **WHEN** "Nasıl çalışır" is shown
- **THEN** each of the six steps is marked by a numbered block, and the steps are joined by a line

### Requirement: Drawings have a text alternative
A drawing that carries meaning SHALL either present its content as real text or be exposed to assistive technology as one image with a Turkish label that states what it shows. A drawing that only decorates SHALL be hidden from assistive technology.

#### Scenario: Hero drawing with a screen reader
- **WHEN** a screen reader reaches the hero's six blocks and total
- **THEN** it reads the six sectors with their figures as a list, then the total and its source, and announces nothing for the blocks themselves

#### Scenario: Group structure with a screen reader
- **WHEN** a screen reader reaches the group structure drawing
- **THEN** it announces one image whose label names the holding, the companies and the locations

#### Scenario: Band opener
- **WHEN** a screen reader passes the block skyline above a green band
- **THEN** nothing is announced for it

### Requirement: The hero carries the approved flow
The hero SHALL show the five verbs of the shared copy's flow in order (Topla, Hesapla, Onayla, Raporla, Öngör), each with its keywords, as text. The standards strip SHALL list the standards only, and the hero SHALL NOT list them a second time.

#### Scenario: Flow in the hero
- **WHEN** the hero is shown at 1440 px or 390 px
- **THEN** the five verbs appear in order, each followed by its three keywords from the shared copy

#### Scenario: Standards strip
- **WHEN** the standards strip is shown
- **THEN** it lists the four standards and does not show "3 kapsam, tek platformda", and the hero above it carries no list of standards

### Requirement: Figures are shown with their source
Every emissions total and every activity quantity stated on the homepage SHALL be shown with a line of text naming the records or the calculation it comes from, placed directly beside or beneath the figure. How much a total covers and its approval status SHALL be stated apart from the source line.

#### Scenario: Figures covered by a total's line
- **WHEN** the parts of a total are shown next to it, or as rows of a table inside a drawn product screen
- **THEN** they need no source line of their own, and neither do the scenario percentages in the last journey step

#### Scenario: Consolidated total
- **WHEN** the consolidated total is shown in the hero or in the before/after section
- **THEN** its source line says it is the sum of the six companies' approved records for the period, and the count of companies, locations and categories is not part of that line

#### Scenario: Scope totals
- **WHEN** the three scope totals are shown in the "Sonra" screen
- **THEN** each has a source line naming the kind of record it is calculated from

#### Scenario: Journey record
- **WHEN** the journey shows the invoice's 45.000 kWh and the resulting 19,89 tCO₂e
- **THEN** the consumption names its invoice, and the result's source line states the calculation in matching units: 45 MWh × 0,442 tCO₂e/MWh

### Requirement: Source lines are readable by everyone
A source line SHALL be text that is visible without hover, focus or scripts, SHALL meet 4.5:1 contrast against its ground, and SHALL follow its figure in reading order.

#### Scenario: Scripts unavailable
- **WHEN** the homepage is loaded with scripts disabled
- **THEN** every source line is visible next to its figure

#### Scenario: Source line on a green or bright green ground
- **WHEN** a source line sits on a `#1C5E3A` ground
- **THEN** its contrast against that ground is at least 4.5:1

### Requirement: Before and after are shown as pictures that fit
The before/after section SHALL show the before state as several scattered spreadsheet windows and the after state as one TonyAI screen holding the consolidated total. Each state SHALL be one group in the same order: its label, its picture, its list from the shared copy. No text or figure in the section SHALL be clipped or overflow its block at any width from 390 px to 1440 px.

#### Scenario: Desktop width
- **WHEN** the section is shown at 1440 px
- **THEN** before and after stand side by side in two columns of equal width, the pictures level with each other and the lists level with each other, and "164.700" is fully inside the screen

#### Scenario: Phone width
- **WHEN** the section is shown at 390 px
- **THEN** the whole before group comes first and the whole after group second, without horizontal scrolling and without clipped text

### Requirement: The homepage shows no internal placeholder
The homepage SHALL NOT show text written for the team, such as a bracketed note that a fact awaits confirmation. A fact that is not yet confirmed SHALL be left out.

#### Scenario: Security block
- **WHEN** the method and assurance section is shown
- **THEN** "teyit bekliyor" does not appear, and no visible text on the page starts with "["

### Requirement: Nothing moves on its own
Motion on the homepage SHALL be limited to a single reveal as content enters the viewport and to transitions that answer a user's action. No element SHALL animate in a loop. Under `prefers-reduced-motion: reduce` all content SHALL be shown in its final state.

#### Scenario: Idle page
- **WHEN** the homepage has finished loading and the user does nothing for ten seconds
- **THEN** nothing on screen is moving

#### Scenario: Reduced motion
- **WHEN** the homepage is loaded with reduced motion requested
- **THEN** every drawing, figure and source line is visible immediately, without animation

### Requirement: The closing call to action is plain
The closing call to action SHALL show its heading, its sentence and one button, with no drawing beside them.

#### Scenario: Closing band
- **WHEN** the closing call to action is shown
- **THEN** it contains one button, the primary demo request, and no drawing other than the band opener above it

### Requirement: The primary action leads the hero
The hero SHALL show the primary demo request button directly beneath its heading and text, and SHALL NOT link to the demo video while the video does not exist.

#### Scenario: First phone screen
- **WHEN** the homepage is opened at 390 by 844 px
- **THEN** the primary demo request button is fully visible without scrolling

#### Scenario: No link to a missing video
- **WHEN** the demo section shows its "yakında" frame
- **THEN** the hero contains no "Demoyu izleyin" link

### Requirement: The audit trail is readable as it stands
The method and assurance section SHALL show every field of one record's audit trail as text, without requiring a drag, hover, focus or key press to reveal any of it.

#### Scenario: Record on a phone
- **WHEN** the method and assurance section is shown at 390 px with no interaction
- **THEN** the record's six fields, from the entry to the result, are all visible with their values

### Requirement: The hero total is not the loudest colour on the page
The consolidated total in the hero SHALL sit on a white panel, and `#39C656` SHALL NOT be used as the ground of any panel or card in the hero.

#### Scenario: Hero panel
- **WHEN** the hero is shown
- **THEN** the total's panel has a `#FFFFFF` ground, and the only `#39C656` ground in the hero is the primary button
