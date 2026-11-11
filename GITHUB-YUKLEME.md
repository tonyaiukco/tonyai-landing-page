# GitHub'a yükleme (geliştirici için, 2 dakika)

Bu klasör çalışan bir git deposu değildir (geçmiş ayrı zip'te); temiz bir depo olarak yüklemek için:

```bash
cd tonyai-site
git init -b main
git add .
git commit -m "TonyAI marketing site — Atmosfer design, 10 Nov 2026"
git remote add origin git@github.com:<kuruluş>/tonyai-site.git   # ya da https://github.com/<kuruluş>/tonyai-site.git
git push -u origin main
```

GitHub web arayüzünden "Upload files" ile sürüklemek 100 dosya sınırına takılır; komut satırı ya da GitHub Desktop kullanın.

Sonrasında:

- `npm install && npm run build` → `out/` klasörü statik sitedir (bkz. README.md, Nginx örneği).
- `.env.production` içine `NEXT_PUBLIC_FORM_ENDPOINT` ve `NEXT_PUBLIC_REGISTER_ENDPOINT` yazılınca formlar canlı uç noktalara gider (bkz. `docs/kayit-ve-davet-akisi.md`).
- `node_modules/`, `.next/`, `out/` zaten `.gitignore`'dadır.
