## REMOVED Requirements

### Requirement: The hero carries the approved flow
**Reason**: The five-verb keyword list and separate standards strip repeat the product and method chapters.
**Migration**: Present the workflow through the invoice and three product views. Place the four standards under method and assurance.

### Requirement: Before and after are shown as pictures that fit
**Reason**: The two illustrations repeat the consolidated total and its subsidiary table.
**Migration**: Demonstrate scale through facility and group views of one record.

## MODIFIED Requirements

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

### Requirement: The hero total is not the loudest colour on the page
The hero SHALL identify the sample period and show the sourced total on white. The sourced total SHALL be the most prominent number in the opening. The demo button SHALL follow the introductory paragraph and open `/demo/`.

#### Scenario: Hero panel
- **WHEN** the homepage opens at 1440 px
- **THEN** the introduction and demo action appear in the left column. The right column presents the sample period, 164.700 tCO₂e, its source, the record disclosure and then the six contributions in visual and reading order on white.

#### Scenario: Mobile hero
- **WHEN** the homepage opens at 390 px
- **THEN** the visitor encounters the total, its source and record link before the expandable sector distribution.

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

## ADDED Requirements

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
