"""WCAG contrast ratios for the text pairs and controls the homepage look uses. Usage: python3 components/looks/home/qa/contrast.py"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from palette import ratio  # noqa: E402

WHITE, MIST, INK, BODY, GREY = "#ffffff", "#e9faf2", "#141318", "#17161b", "#6c6c6e"
BRAND, BRIGHT, SOFT, PALE = "#1c5e3a", "#39c656", "#b1d2bd", "#e1f8ee"

PAIRS = [  # (name, foreground, ground, minimum, use)
    *[(f"ink on {n}", INK, g, 4.5, "headings, text") for n, g in (("white", WHITE), ("mist", MIST))],
    *[(f"body on {n}", BODY, g, 4.5, "form text, secondary text") for n, g in (("white", WHITE), ("mist", MIST))],
    ("muted on white", GREY, WHITE, 4.5, "legal text, form hints"),
    *[(f"brand on {n}", BRAND, g, 4.5, "accent text, eyebrows, heading accent") for n, g in (("white", WHITE), ("mist", MIST))],
    ("white on brand", WHITE, BRAND, 4.5, "text on green bands, button hover"),
    ("pale green on brand", PALE, BRAND, 4.5, "secondary text on green"),
    ("donut green on brand", SOFT, BRAND, 4.5, "small accent text on green: eyebrows, footer, record labels, tree labels"),
    ("bright green on brand (large text only)", BRIGHT, BRAND, 3, "heading accent, standards, principle numbers on green"),
    ("ink on bright green", INK, BRIGHT, 4.5, "buttons, video label"),
    *[(f"source line on {n}", fg, g, 4.5, "source tag beneath a figure") for n, fg, g in (("white", BODY, WHITE), ("mist", BODY, MIST), ("brand", PALE, BRAND))],
    ("total figure green on white", "#1b5b38", WHITE, 4.5, "consolidated total in the hero panel and the after screen"),
    ("white on brand (journey marker)", WHITE, BRAND, 4.5, "step numbers on block markers"),
    ("bright green numeral on brand (large text only)", BRIGHT, BRAND, 3, "difference list numerals, 24 px bold"),
    ("muted on white (screen rows)", GREY, WHITE, 4.5, "sector names in the after screen"),
    ("brand on white", BRAND, WHITE, 4.5, "button hover on green"),
    ("form error", "#94282c", "#fee2e1", 4.5, "form errors"),
    ("banner text", "#774c2f", "#fefbea", 4.5, "legal notice"),
    ("field border on white", GREY, WHITE, 3, "form field borders"),
    ("focus ring ink on white", INK, WHITE, 3, "focus"),
    ("focus ring white on brand", WHITE, BRAND, 3, "focus on green"),
]
bad = 0
for name, fg, bg, need, use in PAIRS:
    r = ratio(fg, bg)
    ok = r >= need
    bad += not ok
    print(f"{'ok  ' if ok else 'FAIL'} {r:5.2f}:1  {name}  ({use})")
raise SystemExit(1 if bad else 0)
