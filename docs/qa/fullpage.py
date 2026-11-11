import asyncio, sys
from playwright.async_api import async_playwright
BASE=sys.argv[1] if len(sys.argv)>1 else 'http://localhost:8081/'
PAGES=['/','/demo/','/demo/tesekkurler/','/bize-ulasin/','/sirket/','/kaynaklar/','/kaynaklar/tsrs-kisa-rehber/','/kvkk/','/nope/']
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); errs=[]
        for path in PAGES:
            for name,vp,mob in [('desktop',{'width':1440,'height':900},False),('mobile',{'width':390,'height':844},True)]:
                pg=await b.new_page(viewport=vp,is_mobile=mob,has_touch=mob)
                pg.on('pageerror',lambda e,path=path:errs.append(path+':'+str(e)))
                r=await pg.goto(BASE.rstrip('/')+path,wait_until='networkidle')
                h=await pg.evaluate('document.body.scrollHeight'); y=0
                while y<h: await pg.evaluate(f'window.scrollTo(0,{y})'); await pg.wait_for_timeout(200 if path=='/' else 100); y+=400
                await pg.wait_for_timeout(600); await pg.evaluate('window.scrollTo(0,0)'); await pg.wait_for_timeout(300)
                slug=path.strip('/').replace('/','_') or 'home'
                await pg.screenshot(path=f'docs/qa/{slug}-{name}.png',full_page=True)
                hs=await pg.evaluate('document.documentElement.scrollWidth>document.documentElement.clientWidth')
                h1=await pg.evaluate('document.querySelectorAll("h1").length')
                small=await pg.evaluate('''()=>[...document.querySelectorAll('a,button,summary,input,select')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&(r.width<44||r.height<44)&&e.type!=='checkbox'}).map(e=>(e.textContent||e.name).trim().slice(0,20)+' '+Math.round(e.getBoundingClientRect().width)+'x'+Math.round(e.getBoundingClientRect().height))''') if mob else []
                print(f'{path} {name} status={r.status} h1={h1} hscroll={hs}' + (f' small={small}' if mob else ''))
                await pg.close()
        print('errors',errs); await b.close()
asyncio.run(main())
