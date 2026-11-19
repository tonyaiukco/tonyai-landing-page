import Link from "next/link";
import { copy, demo, invoiceExample } from "@/content/copy";
import { AuditLens } from "./AuditLens";
import { Arrow, Glyph, GroupTree, Skyline, type GlyphName } from "./Illustrations";
import { Title, Sourced } from "./parts";

const stages = [
  { icon: "calc", label: "Veri gir", title: "Faturadan tüketim kaydı", text: "Tüketim miktarı, tesis ve fatura aynı kayıtta tutulur.", value: invoiceExample.consumption },
  { icon: "shield", label: "İncele", title: "Hesabın dayanağı", text: "İnceleyen ekip, tüketimi ve kullanılan şebeke faktörünü kontrol eder.", value: invoiceExample.emissions },
  { icon: "report", label: "Raporla", title: "Onaylı rapor satırı", text: "Onaylanan elektrik kaydı, raporda kaynağıyla birlikte yer alır.", value: invoiceExample.emissions },
] satisfies { icon: GlyphName; label: string; title: string; text: string; value: typeof invoiceExample.consumption }[];

function ScopeBreakdown() {
  return (
    <figure className="scope-breakdown">
      <figcaption>Grup emisyonları <span>Örnek dönem / {demo.period}</span></figcaption>
      <div className="scope-strip" aria-hidden="true">{demo.scopes.map(s => <i key={s.label} style={{ flexGrow: s.value }} />)}</div>
      <dl>{demo.scopes.map(s => (
        <div key={s.label}><dt>{s.label}</dt><dd><strong>{Math.round(s.value / demo.total * 100)}%</strong> {s.source}</dd></div>
      ))}</dl>
    </figure>
  );
}

export function PlatformH() {
  return (
    <section id="platform" className="trace-platform h-band" aria-labelledby="platform-title">
      <div className="trace-two h-wrap">
        <div>
          <p className="h-eyebrow">Platform</p>
          <Title id="platform-title" text="Bir faturadan onaylı rapora." at={2} />
          <p className="trace-lead">Mart ayı elektrik faturasını kaydedin, hesabı inceleyin ve onaylı rapor satırına ulaşın.</p>
          <ScopeBreakdown />
        </div>
        <fieldset className="trace-views" id="nasil-calisir">
          <legend className="sr-only">Örnek kaydın işlem adımı</legend>
          <div className="trace-choices">{stages.map((s, i) => (
            <label key={s.label}><input type="radio" name="workflow" value={i} defaultChecked={i === 0} /><Glyph name={s.icon} size={22} />{s.label}</label>
          ))}</div>
          {stages.map((s, i) => (
            <div key={s.label} className={`trace-view trace-view-${i}`}>
              <div className="trace-paper">
                <div className="trace-ledger-head"><span>Üretim A.Ş.</span><span>Örnek kayıt</span></div>
                <div className="trace-document-title">
                  <div><h3>{s.title}</h3><p>{demo.facility} · Mart 2026</p></div>
                  <span className="trace-document-mark"><Glyph name={s.icon} size={40} /></span>
                </div>
                <Sourced {...s.value} />
                <div className="trace-paper-foot">{[demo.auditTrail[1].v, demo.auditTrail[4].v, "Kapsam 2 · Onaylandı"][i]}</div>
              </div>
              <p>{s.text}</p>
            </div>
          ))}
        </fieldset>
      </div>
    </section>
  );
}

export function ScaleH() {
  const { drawingLabel, tiers } = copy.difference;
  return (
    <section className="trace-scale h-teal h-diff" aria-labelledby="scale-title">
      <Skyline />
      <div className="h-wrap trace-two">
        <div>
          <p className="h-eyebrow">{copy.difference.eyebrow}</p>
          <Title id="scale-title" text={copy.difference.title} at={4} />
          <p className="trace-lead">Tek bir elektrik faturasını {demo.facility} kaydından konsolide grup envanterine kadar izleyin.</p>
        </div>
        <fieldset className="trace-views">
          <legend className="sr-only">Raporlama ölçeği</legend>
          <div className="trace-choices">{["Tesis", "Grup"].map((s, i) => <label key={s}><input type="radio" name="scale" value={i} defaultChecked={i === 1} />{s}</label>)}</div>
          <div className="trace-scale-record"><span className="trace-tile" aria-hidden="true">↳</span><div><strong>{demo.facility}</strong><p>{invoiceExample.consumption.source}</p></div></div>
          <div className="scale-panels">
            <div className="trace-view trace-view-0"><h3>Tesisin elektrik tüketimi</h3><p>Mart ayı elektrik tüketimi, Üretim A.Ş.’nin Kapsam 2 envanterine dahil edilir.</p><Sourced {...invoiceExample.emissions} /></div>
            <div className="trace-view trace-view-1"><GroupTree label={drawingLabel} tiers={tiers} companies={demo.subsidiaries.length} locations={demo.locations} /><p>{demo.facility} kaydı, Üretim A.Ş. üzerinden {demo.group} envanterine katılır.</p></div>
          </div>
        </fieldset>
      </div>
    </section>
  );
}

export function ComplianceH() {
  const c = copy.compliance;
  return (
    <section id="yontem" className="trace-method" aria-labelledby="method-title">
      <div className="h-teal h-band"><div className="h-wrap">
        <p className="h-eyebrow">{c.eyebrow}</p>
        <div className="trace-two"><Title id="method-title" text={c.title} at={3} /><p className="trace-lead">{c.body}</p></div>
        <div id="denetim-izi" tabIndex={-1}><AuditLens /></div>
        </div></div>
      <div className="h-wrap h-band trace-two trace-reference">
          <div><h3>Standartlar</h3>{c.standards.map(s => <div className="trace-standard" key={s.name}><h4>{s.name}</h4><p>{s.body}</p></div>)}</div>
          <div><h3>{copy.faq.eyebrow}</h3>{copy.faq.items.map((q, i) => <details key={q.q} open={i === 0}><summary>{q.q}</summary><p>{q.a}</p></details>)}</div>
      </div>
    </section>
  );
}

export function FinalCtaH() {
  const f = copy.finalCta;
  return (
    <section className="h-teal h-final" aria-labelledby="h-son-baslik">
      <Skyline />
      <div className="h-wrap" data-reveal>
        <Title id="h-son-baslik" text={f.title} at={2} />
        <p className="h-lead">{f.body}</p>
        <div className="h-final-actions">
          <Link href={f.primary.href} className="h-btn">{f.primary.label}<Arrow /></Link>
        </div>
      </div>
    </section>
  );
}
