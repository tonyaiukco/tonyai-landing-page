import Link from "next/link";
import { copy, demo } from "@/content/copy";
import { formatInt } from "@/lib/format";
import { Arrow } from "./Illustrations";
import { InvoiceRecord } from "./InvoiceRecord";
import { Sourced, Title } from "./parts";

const stage = copy.hero.stage;
const largest = Math.max(...demo.subsidiaries.map(s => s.value));

function Contributions() {
  return (
    <ul className="h-sum-parts" aria-label="Şirketlerin emisyon katkısı, ton karbondioksit eşdeğeri">
      {demo.subsidiaries.map((s, i) => (
        <li key={s.name}>
          <span className="h-sum-box" aria-hidden="true">
            <i className={`h-b h-b-${i === 0 ? 1 : 3}`} style={{ width: `${Math.sqrt(s.value / largest) * 100}%` }} />
          </span>
          <span className="h-sum-name">{s.sector}</span>
          <span>{formatInt(s.value)}</span>
          {i === 0 && <a className="trace-bar-link" href="#demo" aria-label="Üretim A.Ş. faturasını aç" />}
        </li>
      ))}
    </ul>
  );
}

export function HeroH() {
  return (
    <section className="h-hero city-opening" aria-labelledby="trace-title">
      <div className="h-wrap h-hero-grid">
        <div className="h-hero-text trace-intro">
          <p className="h-eyebrow">Karbon muhasebesi ve raporlama</p>
          <Title as="h1" id="trace-title" className="h-h1" text={copy.hero.title} at={3} />
          <p className="h-lead">Tek tesisten şirketler grubuna, Kapsam 1, 2 ve 3 emisyonlarınızı hesaplayın. Her rakamı kaynağıyla raporlayın.</p>
          <Link className="h-btn" href={copy.nav.cta.href}>{copy.nav.cta.label}<Arrow /></Link>
        </div>
        <div className="city-ledger">
          <div className="h-plot-caption"><span>{demo.group} · {stage.unit}</span><span>Örnek veri / {demo.period}</span></div>
          <div className="city-total">
            <Sourced className="h-sum-figure" value={<>{formatInt(demo.total)}<small>{stage.unit}</small></>} source={stage.source} />
            <p className="h-sum-note">{demo.subsidiaries.length} şirket · {demo.locations} lokasyon</p>
          </div>
          <InvoiceRecord />
          <div className="trace-desktop-chart"><Contributions /></div>
          <details className="trace-mobile-chart"><summary>Şirket dağılımını göster</summary><Contributions /></details>
        </div>
      </div>
    </section>
  );
}
