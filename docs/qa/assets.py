import asyncio, os
from playwright.async_api import async_playwright
root=os.getcwd()
mark=lambda c1,c2: f'<rect x="5" y="5" width="25" height="25" rx="6" fill="{c1}"/><rect x="5" y="34" width="25" height="25" rx="6" fill="{c1}"/><rect x="34" y="34" width="25" height="25" rx="6" fill="{c1}"/><path d="M34 30A25 25 0 0 1 59 5A25 25 0 0 1 34 30Z" fill="{c2}"/>'
icon=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="15" fill="#2b5a3e"/><g transform="translate(10.88 10.88) scale(0.66)">{mark("#FFFFFF","#9CC7AC")}</g></svg>'
open('public/favicon.svg','w').write(icon)
og=f'''<!doctype html><html lang="tr"><head><meta charset="utf-8"><style>
@font-face{{font-family:S;src:url("file://{root}/app/fonts/schibsted-latin.woff2") format("woff2");font-weight:400 900}}
@font-face{{font-family:S;src:url("file://{root}/app/fonts/schibsted-latin-ext.woff2") format("woff2");font-weight:400 900;unicode-range:U+0100-02AF}}
@font-face{{font-family:M;src:url("file://{root}/app/fonts/plexmono-latin.woff2") format("woff2")}}
@font-face{{font-family:M;src:url("file://{root}/app/fonts/plexmono-latin-ext.woff2") format("woff2");unicode-range:U+0100-02AF}}
body{{margin:0;width:1200px;height:630px;background:#f4f6f3;color:#1b211e;font-family:S,sans-serif;display:flex;flex-direction:column;justify-content:space-between;padding:72px 80px;box-sizing:border-box}}
h1{{margin:0;font-size:66px;line-height:1.04;letter-spacing:-0.025em;font-weight:560;max-width:17ch}}
.top{{display:flex;align-items:center;gap:16px;font-size:30px;font-weight:600}}
.bot{{display:flex;justify-content:space-between;align-items:flex-end}}
.std{{font-family:M,monospace;font-size:20px;color:#2b5a3e;letter-spacing:.04em}}
.card{{background:#fff;border:1px solid #d8ddd8;border-radius:16px;padding:18px 22px;font-family:M,monospace}}
.card .n{{font-size:40px;letter-spacing:-0.02em}} .card .l{{font-size:14px;color:#66706a}}
</style></head><body>
<div class="top"><svg width="44" height="44" viewBox="5 5 54 54">{mark("#2b5a3e","#6fa583")}</svg>TonyAI</div>
<h1>Her işletme için karbon yönetimi yazılımı.</h1>
<div class="bot"><div class="std">ISO 14064-1 · GHG PROTOKOLÜ · TSRS</div><div class="card"><div class="n">164.700 <span style="font-size:18px">tCO₂e</span></div><div class="l">Konsolide toplam · 6 şirket · onaylandı</div></div></div>
</body></html>'''
p='/tmp/claude-0/-home-claude/ac744195-3706-5fd2-8fbf-56e4e3f802be/scratchpad/og.html'; open(p,'w').write(og)
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        pg=await b.new_page(viewport={'width':1200,'height':630}); await pg.goto('file://'+p); await pg.evaluate('document.fonts.ready'); await pg.wait_for_timeout(300); await pg.screenshot(path='public/og.png')
        for size,name in [(180,'public/apple-touch-icon.png'),(512,'/tmp/claude-0/-home-claude/ac744195-3706-5fd2-8fbf-56e4e3f802be/scratchpad/icon512.png')]:
            sized=icon.replace('<svg ', '<svg width="%d" height="%d" ' % (size,size))
            pg=await b.new_page(viewport={'width':size,'height':size}); await pg.set_content('<body style="margin:0">'+sized+'</body>'); await pg.screenshot(path=name,omit_background=True)
        await b.close()
asyncio.run(main())
from PIL import Image
Image.open('/tmp/claude-0/-home-claude/ac744195-3706-5fd2-8fbf-56e4e3f802be/scratchpad/icon512.png').save('app/favicon.ico',sizes=[(16,16),(32,32),(48,48)])
print('assets ok')
