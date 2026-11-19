import { invoiceExample, demo } from "@/content/copy";
import { Sourced } from "./parts";

export function InvoiceRecord() {
  return (
    <details className="trace-record">
      <summary className="trace-record-link">
        <span aria-hidden="true">↳</span>
        Bir kaydın izini sür
        <span className="trace-chevron" aria-hidden="true" />
      </summary>
      <article id="demo" className="trace-invoice" aria-label="Örnek elektrik faturası">
        <header><h2>Elektrik faturası</h2><p>Üretim A.Ş. · {demo.facility} · Mart 2026</p></header>
        <dl>
          <div><dt>Kaynak belge</dt><dd><Sourced {...invoiceExample.consumption} /></dd></div>
          <div><dt>Emisyon hesabı</dt><dd><Sourced {...invoiceExample.emissions} /></dd></div>
          <div><dt>Rapor satırı</dt><dd>Kapsam 2 · Onaylandı<small>{demo.auditTrail[4].v}</small></dd></div>
        </dl>
        <a className="h-record-link" href="#denetim-izi">Denetim izini aç ↗</a>
      </article>
    </details>
  );
}
