# QA log

Each pass: Playwright screenshots at 1440 px and 390 px for every route, a mobile Lighthouse run against the static export, fixes before moving on. Scripts: `docs/qa/fullpage.py`, `docs/qa/assets.py`.

## Pass 1 — 2026-11-02 (rebuild with the template-led content)

Routes checked: `/`, `/bize-ulasin/`, `/sirket/`, `/kaynaklar/`, `/kaynaklar/tsrs-kisa-rehber/`, `/kvkk/`, `/nope/` (404). Every route: one `h1`, no horizontal scroll, no interactive element under 44 × 44 px on mobile, no page errors.

**Lighthouse, mobile, `/`:** Performance 93, Accessibility 96 → 100 after the caption colour fix, Best practices 96, SEO 100. LCP 1.0 s, TBT 320 ms, CLS 0.

**Fixes:** caption colour `--ink-3` darkened to #5f6963 (4.49:1 on the lightest band was just under AA). Remaining console 404s come from link prefetches to `/#platform`-style anchors resolved by the static server; harmless, to be re-checked on the real host.

**Content changes in this pass:** homepage restructured on the enterprise carbon-software pattern Emre chose (hero → standards strip → "TonyAI farkı" → platform modules → demo → six-step journey → method and assurance → roadmap → illustrative case → FAQ → closing CTA); founding story and founders on `/sirket/`; roadmap section states import, AI checks and projection (2027) as plans, not features.

**Open:** form endpoint from the developer; hosting location for the security block; audit-trail example factor to confirm; English version.

## Pass 2 — 2026-11-02 (content review round 1 + demo flow + three looks)

Routes checked: `/`, `/demo/`, `/demo/tesekkurler/`, `/bize-ulasin/`, `/sirket/`, `/kaynaklar/`, `/kaynaklar/tsrs-kisa-rehber/`, `/kvkk/`, `/nope/`, plus `/tasarim/a|b|c/`. Every route: one `h1`, no horizontal scroll, no sub-44px target on mobile, no page errors.

**Content:** positioning widened to every business (groups consolidate "just as easily"); "projeksiyon" → "öngörü"; AI import, AI checks and öngörü shown as *Geliştiriliyor* (fifth "TonyAI farkı" card, hero second line, roadmap labels; 2027 kept for öngörü ve senaryo); founders CEO/COO/CTO, Gökceviz. New `/demo/` ("Bugün demo talep edin", form preset to demo, no topic field) → `/demo/tesekkurler/` confirmation; every demo CTA now points to `/demo/`.

**Three alternative looks** on `/tasarim/a` (Kömür, dark editorial), `/tasarim/b` (Defter, Swiss ledger), `/tasarim/c` (Atmosfer, warm organic), each scoped under `.look-x`, own fonts (fontsource), own screenshot scripts and NOTES.md in `components/looks/x/`. Lighthouse mobile: A 93/100, B 95/100, C 88–93/100 (perf/a11y). Review sheet: https://claude.ai/artifact/7X9iYZuFU3FcSzZesaKUZK

**Open:** same three facts (hosting, response time, emission factor); the chosen look to be rolled out to all pages and the other two removed before launch.

## Pass 3 — 2026-11-10 (Atmosfer revisions 3–5, Emre's "human, not AI-made" review)

Routes checked at 390 / 820 / 1440: `/tasarim/c/` (chosen design), `/kayit/`, `/kayit/tesekkurler/`, `/demo/`, `/`. No horizontal scroll, one `h1`, targets ≥ 44 px, no page errors.

**Changes:** hero right side is a five-verb flow with keywords (Topla · Hesapla · Onayla · Raporla · Öngör; standards named per Emre: ISO 14064-1, IPCC AR6, GHG Protokolü; GRI, TSRS, IFRS S2); the invoice example lives under "Nasıl çalışır" as an "Örnek" line per step; "Önce / Sonra" is one picture (narrow stacked spreadsheet windows, wordless, vs one TonyAI screen) with Emre's four bullets; FAQ first item open; register flow added; all "Geliştiriliyor"/2027 wording removed earlier in the day (rev 2). Looks A and B deleted.

**Open before launch:** roll Atmosfer out to every route and make it `/` (currently `/tasarim/c/`); hosting fact in the security text; English version.

## Pass 4 — 2026-11-14 (fourth look: Orman, `/tasarim/d/`)

Routes checked at 390 / 1440: `/tasarim/d/`, plus `/` and `/tasarim/c/` for regressions. `/tasarim/d/`: one `h1`, no horizontal scroll, no target under 44 px, no page errors, also with reduced motion and with JavaScript disabled.

**New:** look D "Orman", modelled on the DUOL sustainability page: teal, mint, mist and white, Outfit, line drawings, a generated treeline, segment meters and a draggable audit lens (mouse, touch, arrow keys; a plain list without JS or with reduced motion). Scoped under `.look-d`, `noindex, nofollow`, not in the sitemap, linked from nowhere. Notes and self-critique in `components/looks/d/NOTES.md`; contrast table from `components/looks/d/qa/contrast.py`. Lighthouse mobile on the static build: 100 / 100 (performance / accessibility), two runs.

**Shared code touched:** the audit-trail demo record moved from `components/AuditTrail.tsx` to `demo.auditTrail` in `content/copy.ts`; lens label and hint added as `copy.compliance.audit.lens`. Built HTML of `/` and screenshots of `/` and `/tasarim/c/` at both widths are identical to a fresh build of `main`.

**Open:** the owner's review of D against C; a real product screen for the demo block; everything still open from pass 3.

## Pass 5 — 2026-11-14 (look D inner pages)

Routes checked at 390 / 1440: `/tasarim/d/sirket/`, `/tasarim/d/kaynaklar/`, `/tasarim/d/kaynaklar/tsrs-kisa-rehber/`, `/tasarim/d/bize-ulasin/`, plus `/tasarim/d/` and the live `/bize-ulasin/` for regressions. One `h1` each, no horizontal scroll, no target under 44 px, no page errors.

**Why:** on the live preview, "Kaynaklar", "Şirket" and "Bize Ulaşın" opened the live pages in the old design. The look now has its own versions and its nav and footer stay beneath `/tasarim/d/`. Demo, login, register and the legal pages still open the live ones.

**Checked:** nav clicked through from the homepage and from an inner page: Platform, Yöntem, Kaynaklar, Şirket and Bize Ulaşın all stay beneath `/tasarim/d/`, as do article links and the way back. Every inner page carries `noindex, nofollow`; the sitemap and the pages outside `/tasarim/` still have no link into it. The contact page reuses the live form, redressed from outside; the live `/bize-ulasin/` is pixel-identical to production at both widths. Lighthouse mobile on `/tasarim/d/bize-ulasin/`: 100 / 100.
