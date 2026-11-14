"""WCAG contrast ratios for the text pairs look D uses. Usage: python3 components/looks/d/qa/contrast.py"""
TEAL, TEAL_DEEP, MINT, MIST, WHITE, EMERALD, ON_TEAL_2 = "#06433f", "#04312e", "#2fe6ac", "#e3efe9", "#ffffff", "#08705a", "#c9e0d9"

def lum(h):
    c = [int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    c = [v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4 for v in c]
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]

def ratio(a, b):
    la, lb = sorted((lum(a), lum(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)

PAIRS = [  # (text, ground, minimum, use)
    ("teal on white", TEAL, WHITE, 4.5, "body"),
    ("teal on mist", TEAL, MIST, 4.5, "body"),
    ("teal on mint", TEAL, MINT, 4.5, "buttons, card, lens"),
    ("emerald on white", EMERALD, WHITE, 4.5, "accent headings, eyebrows"),
    ("emerald on mist", EMERALD, MIST, 4.5, "accent headings, eyebrows"),
    ("white on teal", WHITE, TEAL, 4.5, "body"),
    ("mint on teal", MINT, TEAL, 4.5, "accent headings, eyebrows"),
    ("soft white on teal", ON_TEAL_2, TEAL, 4.5, "secondary text"),
    ("soft white on deep teal", ON_TEAL_2, TEAL_DEEP, 4.5, "footer"),
    ("mint on deep teal", MINT, TEAL_DEEP, 4.5, "footer headings"),
    ("mint on white (not used for text)", MINT, WHITE, 0, "reference only"),
]
bad = 0
for name, fg, bg, need, use in PAIRS:
    r = ratio(fg, bg)
    ok = r >= need
    bad += not ok
    print(f"{'ok  ' if ok else 'FAIL'} {r:5.2f}:1  {name}  ({use})")
raise SystemExit(1 if bad else 0)
