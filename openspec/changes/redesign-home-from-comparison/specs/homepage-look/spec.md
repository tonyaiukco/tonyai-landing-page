# Spec Delta

## Purpose

Defines what the live homepage at `/` shows beyond its colours, so that it reads as TonyAI's own page: drawings made from the logo's shapes, figures shown with their source, the approved hero content, and no internal placeholders. Colours are governed by `site-palette`.

## ADDED Requirements

### Requirement: Homepage drawings are built from the logo's shapes
Every drawing on the homepage SHALL be composed of the logo's two shapes, the rounded block and the leaf, with flat fills and straight connecting lines. The homepage SHALL NOT show a tree, sun, cloud, bird, overlapping-circle diagram or map pin.

#### Scenario: Scrolling the homepage
- **WHEN** the homepage is scrolled from top to bottom at 1440 px and 390 px
- **THEN** no tree, sun, cloud, bird, overlapping-circle diagram or map pin is visible

#### Scenario: Hero drawing
- **WHEN** the hero is shown
- **THEN** its drawing shows six blocks, each labelled with one subsidiary sector from the shared copy, leading to the consolidated total

#### Scenario: Group structure drawing
- **WHEN** "TonyAI farkı" is shown
- **THEN** its drawing shows a holding block containing company blocks, which contain location blocks

#### Scenario: Journey markers
- **WHEN** "Nasıl çalışır" is shown
- **THEN** each of the six steps is marked by a numbered block, and the steps are joined by a line

### Requirement: Drawings have a text alternative
A drawing that carries meaning SHALL be exposed to assistive technology as one image with a Turkish label that states what it shows. A drawing that only decorates SHALL be hidden from assistive technology.

#### Scenario: Hero drawing with a screen reader
- **WHEN** a screen reader reaches the hero drawing
- **THEN** it announces one image whose label names the six sectors and the single total

#### Scenario: Band opener
- **WHEN** a screen reader passes the block skyline above a green band
- **THEN** nothing is announced for it

### Requirement: The hero carries the approved flow
The hero SHALL show the five verbs of the shared copy's flow in order (Topla, Hesapla, Onayla, Raporla, Öngör), each with its keywords, as text. The standards strip SHALL list the standards only.

#### Scenario: Flow in the hero
- **WHEN** the hero is shown at 1440 px or 390 px
- **THEN** the five verbs appear in order, each followed by its three keywords from the shared copy

#### Scenario: Standards strip
- **WHEN** the standards strip is shown
- **THEN** it lists the four standards and does not show "3 kapsam, tek platformda"

### Requirement: Figures are shown with their source
Every emissions total and every activity quantity stated on the homepage SHALL be shown with a line of text naming where it comes from, placed directly beside or beneath the figure. Rows of a table inside a drawn product screen are covered by that screen's total. Scenario percentages in the last journey step are not covered.

#### Scenario: Consolidated total
- **WHEN** the consolidated total is shown in the hero or in the before/after section
- **THEN** a source line next to it states how many companies, locations and categories it is drawn from and that it passed approval

#### Scenario: Scope totals
- **WHEN** the three scope totals are shown in "TonyAI farkı"
- **THEN** each has a source line naming the kind of record it is calculated from

#### Scenario: Journey record
- **WHEN** the journey shows the invoice's 45.000 kWh and the resulting 19,89 tCO₂e
- **THEN** the consumption names its invoice, and the result names the consumption and the emission factor it was calculated with

### Requirement: Source lines are readable by everyone
A source line SHALL be text that is visible without hover, focus or scripts, SHALL meet 4.5:1 contrast against its ground, and SHALL follow its figure in reading order.

#### Scenario: Scripts unavailable
- **WHEN** the homepage is loaded with scripts disabled
- **THEN** every source line is visible next to its figure

#### Scenario: Source line on a green or bright green ground
- **WHEN** a source line sits on a `#1C5E3A` or `#39C656` ground
- **THEN** its contrast against that ground is at least 4.5:1

### Requirement: Before and after are shown as pictures that fit
The before/after section SHALL show the before state as several scattered spreadsheet windows and the after state as one TonyAI screen holding the consolidated total, each with its list from the shared copy. No text or figure in the section SHALL be clipped or overflow its block at any width from 390 px to 1440 px.

#### Scenario: Desktop width
- **WHEN** the section is shown at 1440 px
- **THEN** the windows and the single screen are both visible, and "164.700" is fully inside the screen

#### Scenario: Phone width
- **WHEN** the section is shown at 390 px
- **THEN** the before picture, its list, the after screen and its list stack without horizontal scrolling and without clipped text

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
