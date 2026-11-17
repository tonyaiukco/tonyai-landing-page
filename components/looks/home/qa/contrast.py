"""WCAG contrast ratios for the text pairs and controls the homepage look uses. Usage: python3 components/looks/home/qa/contrast.py"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from palette import ratio  # noqa: E402

GROUND, CARD, ALT, BAR, INFO = "#fafafa", "#ffffff", "#f3f1f6", "#ecebf1", "#efeff1"
INK, BODY, GREY = "#141318", "#17161b", "#6c6c6e"
BRAND, BRAND_2, SOFT, PALE, WHITE = "#1c5e3a", "#29553e", "#b1d2bd", "#e1f8ee", "#ffffff"

PAIRS = [  # (name, foreground, ground, minimum, use)
    *[(f"heading on {n}", INK, g, 4.5, "headings") for n, g in (("ground", GROUND), ("card", CARD), ("alt", ALT), ("nav bar", BAR))],
    *[(f"body on {n}", BODY, g, 4.5, "text") for n, g in (("ground", GROUND), ("card", CARD), ("alt", ALT), ("info card", INFO), ("pale green", PALE))],
    *[(f"muted on {n}", GREY, g, 4.5, "captions, disclaimers, hints") for n, g in (("ground", GROUND), ("card", CARD), ("alt", ALT), ("info card", INFO))],
    *[(f"brand on {n}", BRAND, g, 4.5, "accent text, eyebrows, links") for n, g in (("ground", GROUND), ("card", CARD), ("alt", ALT), ("nav bar", BAR), ("pale green", PALE))],
    ("white on brand", WHITE, BRAND, 4.5, "buttons, closing band, footer"),
    ("white on button hover", WHITE, BRAND_2, 4.5, "button hover"),
    ("pale green on brand", PALE, BRAND, 4.5, "secondary text on brand"),
    ("soft green on brand", SOFT, BRAND, 4.5, "accent text on brand"),
    ("brand on white button", BRAND, WHITE, 4.5, "buttons on brand"),
    ("brand on pale hover", BRAND, PALE, 4.5, "button hover on brand"),
    ("ink on pale lens", INK, PALE, 4.5, "audit lens detail"),
    ("Onaylandı pill", "#187455", "#e1f8ee", 4.5, "status pill"),
    ("İncelemede pill", "#8139ad", "#f1e1fc", 4.5, "status pill"),
    ("Eksik pill", "#94282c", "#fee2e1", 4.5, "status pill, form errors"),
    ("banner text", "#774c2f", "#fefbea", 4.5, "legal notice"),
    ("field border on card", GREY, CARD, 3, "form field borders"),
    ("focus ring brand on card", BRAND, CARD, 3, "form focus"),
    ("focus ring ink on ground", INK, GROUND, 3, "link and button focus"),
    ("focus ring white on brand", WHITE, BRAND, 3, "focus on brand"),
]
bad = 0
for name, fg, bg, need, use in PAIRS:
    r = ratio(fg, bg)
    ok = r >= need
    bad += not ok
    print(f"{'ok  ' if ok else 'FAIL'} {r:5.2f}:1  {name}  ({use})")
raise SystemExit(1 if bad else 0)
