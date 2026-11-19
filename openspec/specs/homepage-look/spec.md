# homepage-look Specification

## Purpose

Defines what the live homepage at `/` shows beyond its colours, so that it reads as TonyAI's own page: drawings made from the logo's shapes, figures shown with their source, the approved hero content, and no internal placeholders. Colours are governed by `site-palette`.

## Requirements

### Requirement: Homepage drawings are built from the logo's shapes
Homepage illustrations SHALL use the rounded block and leaf, flat fills and straight connecting lines. Product screenshots are evidence of the real interface. Illustrations SHALL exclude trees, suns, clouds, birds, overlapping-circle diagrams and map pins.

#### Scenario: Scrolling the homepage
- **WHEN** the homepage is read at 390 or 1440 px
- **THEN** its diagrams use the TonyAI logo geometry and contain none of the excluded motifs.

#### Scenario: Journey markers
- **WHEN** the visitor explores the invoice workflow
- **THEN** the selected company block identifies the source document and labelled stages identify its calculation and report entry.

#### Scenario: Hero drawing
- **WHEN** the hero is viewed at 1440 px
- **THEN** six sector blocks with readable contributions follow the sourced consolidated total and its record control, and selecting the example identifies Üretim A.Ş. and reveals its source document.

#### Scenario: Group structure drawing
- **WHEN** the visitor switches from facility to group
- **THEN** labels identify the holding, companies and locations and show where the selected record belongs.

### Requirement: Drawings have a text alternative
Meaningful drawings SHALL expose their data as text or a Turkish image description. Decorative shapes SHALL be hidden from assistive technology.

#### Scenario: Hero drawing with a screen reader
- **WHEN** a screen reader reaches the hero and the visitor opens the breakdown on a phone
- **THEN** the summary, source, discovery control and six labelled sector contributions are available in their displayed order.

#### Scenario: Group structure with a screen reader
- **WHEN** a screen reader reaches the group diagram
- **THEN** it identifies the holding, companies and locations, and decorative blocks and band openers are silent.

#### Scenario: Band opener
- **WHEN** a screen reader passes a decorative transition into the green background
- **THEN** the decoration is silent.

### Requirement: Figures are shown with their source
Every emissions total and activity quantity SHALL show the originating records or calculation beside or beneath the figure. Coverage and approval status SHALL be separate from the source.

#### Scenario: Consolidated total
- **WHEN** the total and its breakdown are shown
- **THEN** its source identifies the six companies’ approved records for the period and covers the adjacent parts. Counts appear separately.

#### Scenario: Journey record
- **WHEN** consumption, the calculated result or scope totals appear
- **THEN** consumption names its invoice, the result shows 45 MWh × 0,442 tCO₂e/MWh, and each displayed scope total names its contributing record type.

#### Scenario: Figures covered by a total's line
- **WHEN** subsidiary values are presented alongside the sourced group total
- **THEN** the group source covers the subsidiary list.

#### Scenario: Scope totals
- **WHEN** a view presents scope totals
- **THEN** each scope total identifies the contributing record type beside the figure.

### Requirement: Source lines are readable by everyone
A source line SHALL be text that is visible without hover, focus or scripts, SHALL meet 4.5:1 contrast against its ground, and SHALL follow its figure in reading order.

#### Scenario: Scripts unavailable
- **WHEN** the homepage is loaded with scripts disabled
- **THEN** every source line is visible next to its figure

#### Scenario: Source line on a green or bright green ground
- **WHEN** a source line sits on a `#1C5E3A` ground
- **THEN** its contrast against that ground is at least 4.5:1

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

### Requirement: The audit trail is readable as it stands
On screens narrower than 900 px, when scripts are unavailable, or when reduced motion is requested, the method and assurance section SHALL show every field of one record's audit trail as text, without requiring a drag, hover, focus or key press. On wider screens the fields between the entry and the result MAY be shown through a lens the visitor moves, and every field SHALL then be reachable by pointer drag and by the arrow keys.

#### Scenario: Record on a phone
- **WHEN** the method and assurance section is shown at 390 px with no interaction
- **THEN** the record's six fields, from the entry to the result, are all visible with their values, and no lens is shown

#### Scenario: Lens on a desktop
- **WHEN** the section is shown at 1440 px with scripts and motion
- **THEN** a lens can be dragged along the record, and each arrow-key press moves it to the next field and announces that field's name and value

#### Scenario: Reduced motion on a desktop
- **WHEN** the section is shown at 1440 px with reduced motion requested
- **THEN** the six fields are all visible and no lens is shown

### Requirement: The hero total is not the loudest colour on the page
The hero SHALL identify the sample period and show the sourced total on white. The sourced total SHALL be the most prominent number in the opening. The demo button SHALL follow the introductory paragraph and open `/demo/`.

#### Scenario: Hero panel
- **WHEN** the homepage opens at 1440 px
- **THEN** the introduction and demo action appear in the left column. The right column presents the sample period, 164.700 tCO₂e, its source, the record disclosure and then the six contributions in visual and reading order on white.

#### Scenario: Mobile hero
- **WHEN** the homepage opens at 390 px
- **THEN** the visitor encounters the total, its source and record link before the expandable sector distribution.

### Requirement: The "Yöntem" link leads to the method section
Every link on the homepage that targets `#yontem`, including "Yöntem" in the navigation and footer, SHALL bring the method and assurance section into view.

#### Scenario: Navigation link
- **WHEN** "Yöntem" is clicked in the navigation on the homepage
- **THEN** the section headed "Her rakamın arkasında açık bir yöntem var." is at the top of the viewport, below the navigation bar

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

### Requirement: Five chapters tell one record’s story
The homepage SHALL present five primary chapters in order: opening and record, facility to group, platform, method and assurance, and demo invitation. Standards and frequently asked questions SHALL be available within method and assurance.

#### Scenario: Reading the landing page
- **WHEN** a visitor reads the main headings in order
- **THEN** the platform and method are each introduced once, the record is reachable within the opening chapter and the closing action opens `/demo/`.

#### Scenario: Transition into the group chapter
- **WHEN** the visitor scrolls past the opening at 1440 px
- **THEN** the block skyline spans the transition into the green chapter. Its heading aligns with the opening’s left column and the Tesis/Grup selector aligns with the right column.

#### Scenario: Group chapter on a phone
- **WHEN** the same transition is viewed at 390 px
- **THEN** the skyline separates the chapters and the group introduction precedes the scale selector in a single column.

#### Scenario: Existing inbound links
- **WHEN** a visitor opens `/#platform`, `/#nasil-calisir`, `/#demo`, `/#yontem` or `/#denetim-izi` directly
- **THEN** the corresponding platform, workflow, invoice, method or audit content appears below the navigation and is usable without first unlocking another interaction.

### Requirement: The example can be explored in place
The hero SHALL offer a reversible path from group total to company to invoice. The document SHALL expand inline below its trigger. The opening control, hero heading and total SHALL retain their positions while following content flows downward. The visitor SHALL control progression.

#### Scenario: Inspecting an invoice on a phone
- **WHEN** the visitor opens the record and then returns to the summary
- **THEN** the inline disclosure opens below its summary, and the same keyboard-accessible summary closes it.

#### Scenario: Equivalent evidence without animation
- **WHEN** scripts are disabled or reduced motion is requested
- **THEN** the source, calculation, report entry and audit link can be read in order without animation or dragging.

### Requirement: Product views follow the same example
The platform chapter SHALL offer data entry, review and reporting views using readable crops of actual product screens with demo data, a text equivalent and one short explanation per view.

#### Scenario: Switching views
- **WHEN** the visitor chooses “Veri gir”, “İncele” or “Raporla” by touch or keyboard
- **THEN** the selected view shows the relevant stage of the same March Tesis A1 record and identifies the active choice in text or control state.

#### Scenario: Facility and group views
- **WHEN** the visitor switches scale in either direction
- **THEN** the same invoice is identifiable within the facility and the group, and its contribution is distinguished from the group total. The controls, heading and next chapter retain their positions throughout the switch.
