# Tasks

## 1. Hero on phones

- [x] 1.1 Move the primary button above the hero's second paragraph in `HeroH.tsx` and tighten the hero's top spacing and lead size under 600 px in `look.css`. Verify the button's bottom edge at 390 by 844, 375 by 667, 360 by 640 and 430 by 932 px (measured: 481, 481, 508 and 481 px) and that the desktop hero still reads in order.

## 2. Audit lens

- [x] 2.1 Restore `AuditLens.tsx` and its styles from commit 24f5175, use it in `ComplianceH` in place of the definition list, and limit the interactive mode to 900 px and wider; under that the full record shows in six, three or two columns. Verify at 1440 px that dragging and the arrow keys move the lens and update its announced value, and at 390 px that all six fields show and the handle is not displayed.
- [x] 2.2 Update `NOTES.md` and the use notes in `qa/contrast.py` for the lens. Verify the notes no longer say the lens is not used.

## 3. "Yöntem" anchor

- [x] 3.1 Move `id="yontem"` to the method and assurance section and give "Nasıl çalışır" `id="nasil-calisir"`. Verify that clicking "Yöntem" in the navigation leaves the method section's heading just below the navigation bar.

## 4. Integration QA

- [x] 4.1 Run lint, the build, the colour audit on `/` and the contrast pairs; record the pass in `docs/qa.md`. Verify nothing is flagged and `openspec validate restore-audit-lens --strict` passes.

## Workflow follow-up

- The owner checks the hero on their own phone, since the first fix passed here and not there.
- Archive the change after the owner approves it on the live site.
