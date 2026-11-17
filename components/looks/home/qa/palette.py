"""The colours the site may use: the product palette in docs/Tool-Mevcut-Renk-Paleti.pdf plus the adjusted values
recorded in ../NOTES.md. Shared by audit.py and contrast.py."""

PRODUCT = {
    "brand green": "#1c5e3a", "total figure green": "#1b5b38", "icon green": "#29553e", "white": "#ffffff",
    "sidebar and top bar": "#ecebf1", "page background": "#fafafa", "table header": "#f3f1f6", "grid header": "#f5f5f7",
    "history item": "#fafafc", "info card": "#efeff1", "toggle track": "#e1e0e6", "scrollbar": "#c9c6cd",
    "heading": "#141318", "body": "#17161b", "muted": "#6c6c6e", "card border": "#d4d4d4", "sidebar divider": "#d7d6db",
    "kapsam 1": "#39c656", "kapsam 2": "#0d78ff", "kapsam 3": "#ae53dc",
    "tamamlandi dot": "#35c75a", "kismi dot": "#fc9606", "eksik dot": "#fd3b31", "eksik cell": "#fee2e1", "red text": "#94282c",
    "donut tamamlandi": "#b1d2bd", "donut kismi": "#f4df9e", "donut eksik": "#f2b8b6",
    "banner background": "#fefbea", "banner text": "#774c2f",
    "aktif bg": "#e1f8ee", "aktif text": "#1e8661", "canli bg": "#e9faf2", "canli text": "#26674f",
    "beklemede bg": "#feecc6", "beklemede text": "#c3700a", "gonderildi bg": "#e0e8fb", "gonderildi text": "#4866b4",
    "incelemede bg": "#f1e1fc", "incelemede text": "#8139ad", "istege bagli bg": "#fff4e4", "istege bagli text": "#bb7924",
}

# Adjusted for contrast: value -> source colour in PRODUCT.
ADJUSTED = {
    "#187455": "#1e8661",  # aktif pill text (Onaylandı), 4.07 -> 5.14:1 on #e1f8ee
}

ALLOWED = set(PRODUCT.values()) | set(ADJUSTED)

def lum(h):
    c = [int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    c = [v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4 for v in c]
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]


def ratio(a, b):
    la, lb = sorted((lum(a), lum(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)
