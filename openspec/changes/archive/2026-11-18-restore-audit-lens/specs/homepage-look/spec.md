# Spec Delta

## MODIFIED Requirements

### Requirement: The primary action leads the hero
The hero SHALL show the primary demo request button directly beneath its heading and first paragraph, and SHALL NOT link to the demo video while the video does not exist.

#### Scenario: First phone screen
- **WHEN** the homepage is opened at 390 by 844 px
- **THEN** the primary demo request button is fully visible without scrolling

#### Scenario: Short phone screen
- **WHEN** the homepage is opened at 360 by 640 px
- **THEN** the bottom edge of the primary demo request button is no lower than 540 px from the top of the viewport

#### Scenario: No link to a missing video
- **WHEN** the demo section shows its "yakında" frame
- **THEN** the hero contains no "Demoyu izleyin" link

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

## ADDED Requirements

### Requirement: The "Yöntem" link leads to the method section
Every link on the homepage that targets `#yontem`, including "Yöntem" in the navigation and footer, SHALL bring the method and assurance section into view.

#### Scenario: Navigation link
- **WHEN** "Yöntem" is clicked in the navigation on the homepage
- **THEN** the section headed "Her rakamın arkasında açık bir yöntem var." is at the top of the viewport, below the navigation bar
