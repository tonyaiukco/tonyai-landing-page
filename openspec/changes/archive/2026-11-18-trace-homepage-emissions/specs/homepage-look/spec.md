## MODIFIED Requirements

### Requirement: The hero total is not the loudest colour on the page
The hero SHALL place the six contributions and sourced consolidated total in a single unframed composition on white. The example and reporting period SHALL be identified. The primary demo button SHALL have the only bright green background in the hero.

#### Scenario: Hero panel
- **WHEN** the homepage is shown
- **THEN** the six sectors lead to 164.700 tCO₂e on white, with its source and a separate link to inspect an example record

### Requirement: The primary action leads the hero
The primary demo request SHALL follow the hero heading and first paragraph. A secondary link beneath the consolidated figure SHALL lead to the working record example.

#### Scenario: First phone screen
- **WHEN** the page is opened at 390 by 844 px
- **THEN** the primary demo request button is fully visible without scrolling

#### Scenario: Short phone screen
- **WHEN** the page is opened at 360 by 640 px
- **THEN** the bottom of the primary button is within 540 px of the viewport top

#### Scenario: No link to a missing video
- **WHEN** the homepage presents the working record example
- **THEN** the hero links to that record and contains no video playback link

#### Scenario: Record selection
- **WHEN** the visitor follows “Bir kaydın izini sür”
- **THEN** the sample electricity record is visible below the navigation

## ADDED Requirements

### Requirement: A visitor can trace a contribution to its evidence
The homepage SHALL replace the pending video with a navigable three-stage sample showing the source invoice, its calculation and the approved report entry. It SHALL identify the sample as one contribution and provide a path to its audit history.

#### Scenario: Trace the invoice
- **WHEN** the visitor inspects the March electricity record for Üretim A.Ş.
- **THEN** its invoice identifier and 45.000 kWh, its 45 MWh × 0,442 tCO₂e/MWh calculation, and its 19,89 tCO₂e Kapsam 2 report contribution can each be inspected

#### Scenario: Read the history
- **WHEN** the visitor follows the report entry's audit link
- **THEN** the audit trail for the same record is reached

#### Scenario: Portable record
- **WHEN** using a keyboard, a phone, reduced motion or a browser without JavaScript
- **THEN** each stage is reachable in reading order with its evidence and the page fits the viewport
