import ts from "typescript";
import fs from "fs";
const src=fs.readFileSync("content/copy.ts","utf8");
const js=ts.transpileModule(src,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020}}).outputText;
fs.writeFileSync("/tmp/claude-0/-home-claude/ac744195-3706-5fd2-8fbf-56e4e3f802be/scratchpad/copy.mjs",js);
const m=await import("/tmp/claude-0/-home-claude/ac744195-3706-5fd2-8fbf-56e4e3f802be/scratchpad/copy.mjs");
const out=[];
const walk=(v,depth,key)=>{
  if(v==null) return;
  if(typeof v==="string"||typeof v==="number"||typeof v==="boolean"){ out.push(`${"  ".repeat(Math.max(0,depth-2))}- **${key}:** ${v}`); return; }
  if(Array.isArray(v)){ if(v.every(x=>typeof x!=="object")){ out.push(`${"  ".repeat(Math.max(0,depth-2))}- **${key}:** ${v.join(" · ")}`); return;} v.forEach((x,i)=>walk(x,depth+1,`${key} ${i+1}`)); return; }
  if(depth<=2) out.push(`\n${"#".repeat(depth+1)} ${key}\n`); else out.push(`${"  ".repeat(Math.max(0,depth-2))}- **${key}**`);
  for(const [k,x] of Object.entries(v)) walk(x,depth+1,k);
};
out.push("# TonyAI — Site metinleri (content/copy.ts dökümü)\n\nKaynak dosya: `content/copy.ts`. Bu döküm otomatik üretildi; kod her zaman esas alınır.\n");
for(const [name,val] of Object.entries(m)){ if(name==="demo"){continue;} out.push(`\n# ${name}\n`); for(const [k,x] of Object.entries(val)) walk(x,1,k); }
fs.writeFileSync("/home/claude/paket/copy-dump.md",out.join("\n"));
console.log("ok",out.length);
