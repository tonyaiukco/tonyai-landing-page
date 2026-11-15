"""WCAG contrast ratios for the text pairs look E uses. Usage: python3 components/looks/e/qa/contrast.py
The values mirror the tokens at the top of look.css; the script fails if one of them is missing from that file."""
import os, re

INK, INK_DEEP, FOREST, FOREST_2 = "#1f4530", "#173524", "#2b5a3e", "#3d7453"
LEAF, LEAF_2, LEAF_ON_INK, LEAF_LIGHT, LEAF_TINT = "#6fa583", "#8fbb9f", "#9cc7ac", "#bfd4c5", "#cfe1d5"
TINT, PAPER, WHITE, AMBER, AMBER_2, SOFT, MARK_ON_INK = "#e4eee6", "#f4f6f3", "#ffffff", "#f0b23e", "#f6c765", "#40594b", "#3d6950"

def lum(h):
    c = [int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    c = [v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4 for v in c]
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]

def ratio(a, b):
    la, lb = sorted((lum(a), lum(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)

PAIRS = [  # (name, text, ground, minimum, use)
    ("forest ink on white", INK, WHITE, 4.5, "body"),
    ("forest ink on paper", INK, PAPER, 4.5, "body, lens detail"),
    ("forest ink on tint", INK, TINT, 4.5, "body on the tinted panel"),
    ("soft ink on white", SOFT, WHITE, 4.5, "secondary text"),
    ("soft ink on paper", SOFT, PAPER, 4.5, "secondary text"),
    ("soft ink on tint", SOFT, TINT, 4.5, "secondary text"),
    ("forest on white", FOREST, WHITE, 4.5, "eyebrows, labels, chips"),
    ("forest on paper", FOREST, PAPER, 4.5, "eyebrows, labels, lens keys"),
    ("forest on tint", FOREST, TINT, 4.5, "pills"),
    ("forest ink on leaf tint", INK, LEAF_TINT, 4.5, "marked word, smallest tile"),
    ("forest ink on light leaf", INK, LEAF_LIGHT, 4.5, "tile"),
    ("forest ink on leaf 2", INK, LEAF_2, 4.5, "tile"),
    ("white on forest ink", WHITE, INK, 4.5, "body, tile, total, lens pill"),
    ("light leaf on forest ink", LEAF_LIGHT, INK, 4.5, "secondary text"),
    ("leaf-on-ink on forest ink", LEAF_ON_INK, INK, 4.5, "eyebrows, labels, standards"),
    ("forest ink on leaf-on-ink", INK, LEAF_ON_INK, 4.5, "numbered squares on dark"),
    ("white on marked word (dark)", WHITE, MARK_ON_INK, 4.5, "marked word on dark"),
    ("white on forest", WHITE, FOREST, 4.5, "tile, numbered squares, lens base"),
    ("light leaf on forest", LEAF_LIGHT, FOREST, 4.5, "lens base keys"),
    ("white on forest 2", WHITE, FOREST_2, 4.5, "tile"),
    ("forest ink on amber", INK, AMBER, 4.5, "buttons"),
    ("forest ink on light amber", INK, AMBER_2, 4.5, "buttons, hover"),
    ("amber on forest ink", AMBER, INK, 4.5, "highlighted figure, button arrow"),
    ("white on deep ink", WHITE, INK_DEEP, 4.5, "footer"),
    ("light leaf on deep ink", LEAF_LIGHT, INK_DEEP, 4.5, "footer links"),
    ("leaf-on-ink on deep ink", LEAF_ON_INK, INK_DEEP, 4.5, "footer headings"),
    ("amber on white (not used for text)", AMBER, WHITE, 0, "reference only"),
    ("leaf on forest ink (not used for text)", LEAF, INK, 0, "reference only"),
    ("leaf on white (not used for text)", LEAF, WHITE, 0, "reference only"),
]
css = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "look.css")).read().lower()
bad = 0
for value in {v for _, a, b, _, _ in PAIRS for v in (a, b)}:
    if not re.search(re.escape(value) + r"\b", css):
        bad += 1; print("FAIL not a token in look.css:", value)
for name, fg, bg, need, use in PAIRS:
    r = ratio(fg, bg)
    ok = r >= need
    bad += not ok
    print(f"{'ok  ' if ok else 'FAIL'} {r:5.2f}:1  {name}  ({use})")
raise SystemExit(1 if bad else 0)
