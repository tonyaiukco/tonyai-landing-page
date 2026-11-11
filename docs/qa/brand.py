import asyncio, os
from playwright.async_api import async_playwright
root=os.getcwd(); out='public/marka/'
mark=lambda c1,c2: f'<rect x="5" y="5" width="25" height="25" rx="6" fill="{c1}"/><rect x="5" y="34" width="25" height="25" rx="6" fill="{c1}"/><rect x="34" y="34" width="25" height="25" rx="6" fill="{c1}"/><path d="M34 30A25 25 0 0 1 59 5A25 25 0 0 1 34 30Z" fill="{c2}"/>'
FONTS=f'''@font-face{{font-family:S;src:url("file://{root}/app/fonts/schibsted-latin.woff2") format("woff2");font-weight:400 900}}
@font-face{{font-family:S;src:url("file://{root}/app/fonts/schibsted-latin-ext.woff2") format("woff2");font-weight:400 900;unicode-range:U+0100-02AF}}
@font-face{{font-family:M;src:url("file://{root}/app/fonts/plexmono-latin.woff2") format("woff2")}}
@font-face{{font-family:M;src:url("file://{root}/app/fonts/plexmono-latin-ext.woff2") format("woff2");unicode-range:U+0100-02AF}}'''
def logo(h, dark=False):
    c1,c2,txt=('#FFFFFF','#9CC7AC','#FFFFFF') if dark else ('#2b5a3e','#6fa583','#1b211e')
    return f'<div style="display:flex;align-items:center;gap:{h*0.1}px;font-family:S,sans-serif;font-weight:600;font-size:{h*0.46}px;letter-spacing:-0.01em;color:{txt}"><svg width="{h}" height="{h}" viewBox="5 5 54 54">{mark(c1,c2)}</svg><span>TonyAI</span></div>'
pages={
 # LinkedIn logo 300: mark on forest tile
 'tonyai-linkedin-logo-300.png':(300,300,f'<div style="width:300px;height:300px;background:#2b5a3e;display:flex;align-items:center;justify-content:center"><svg width="170" height="170" viewBox="5 5 54 54">{mark("#FFFFFF","#9CC7AC")}</svg></div>'),
 # Gmail / Workspace profile photo for hello@ 720
 'tonyai-profil-720.png':(720,720,f'<div style="width:720px;height:720px;background:#2b5a3e;display:flex;align-items:center;justify-content:center"><svg width="400" height="400" viewBox="5 5 54 54">{mark("#FFFFFF","#9CC7AC")}</svg></div>'),
 # Workspace org logo 320x132 (shown on light bars)
 'tonyai-workspace-logo-320x132.png':(320,132,f'<div style="width:320px;height:132px;display:flex;align-items:center;justify-content:center;background:transparent">{logo(56)}</div>'),
 # Signature logo @2x: 240x64 displayed at 120x32
 'tonyai-imza-logo-240.png':(240,64,f'<div style="width:240px;height:64px;display:flex;align-items:center;background:transparent">{logo(56)}</div>'),
 # Horizontal logo light & dark 1200 wide
 'tonyai-logo-yatay.png':(1200,320,f'<div style="width:1200px;height:320px;display:flex;align-items:center;justify-content:center;background:transparent">{logo(220)}</div>'),
 'tonyai-logo-yatay-koyu-zemin.png':(1200,320,f'<div style="width:1200px;height:320px;display:flex;align-items:center;justify-content:center;background:#1b211e">{logo(220,True)}</div>'),
 # LinkedIn cover 1128x191
 'tonyai-linkedin-kapak-1128x191.png':(1128,191,f'''<div style="width:1128px;height:191px;background:#f4f6f3;display:flex;align-items:center;justify-content:space-between;padding:0 48px 0 300px;box-sizing:border-box;font-family:S,sans-serif;color:#1b211e;border-bottom:6px solid #2b5a3e">
 <div><div style="font-size:34px;font-weight:600;letter-spacing:-0.02em;line-height:1.1">Her işletme için<br>karbon yönetimi yazılımı.</div></div>
 <div style="font-family:M,monospace;font-size:15px;color:#2b5a3e;letter-spacing:.06em;text-align:right;line-height:1.7">ISO 14064-1 · GHG PROTOKOLÜ · TSRS<br>tonyai.io</div></div>'''),
}
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        for name,(w,h,html) in pages.items():
            pg=await b.new_page(viewport={'width':w,'height':h},device_scale_factor=1)
            await pg.set_content(f'<html><head><style>{FONTS} body{{margin:0}}</style></head><body>{html}</body></html>')
            await pg.evaluate('document.fonts.ready'); await pg.wait_for_timeout(200)
            await pg.screenshot(path=out+name,omit_background=True); await pg.close()
        await b.close()
asyncio.run(main()); print('brand ok')
