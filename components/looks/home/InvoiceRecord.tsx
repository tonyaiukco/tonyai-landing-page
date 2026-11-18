import { demo, invoiceExample } from "@/content/copy";
import { Arrow } from "./Illustrations";
import { Sourced } from "./parts";

export function InvoiceRecord() {
  const { consumption, emissions } = invoiceExample;

  return (
    <section id="demo" className="h-white h-band h-record" aria-labelledby="record-title" tabIndex={-1}>
      <div className="h-wrap h-two h-two-top">
        <div className="h-record-intro">
          <p className="h-eyebrow">Örnek kayıt · Üretim A.Ş.</p>
          <h2 id="record-title" className="h-h2">Bir faturanın <span className="h-acc">karbon karşılığı.</span></h2>
          <p className="h-lead">Grup toplamının içinden tek bir kayda bakın. Kocaeli tesisinin mart ayı elektrik tüketimini faturadan rapor satırına kadar izleyin.</p>
          <a href="/demo/" className="h-record-link">Demo talep edin <Arrow /></a>
        </div>
        <div className="h-dossier">
          <header className="h-document-head">
            <span>Elektrik tüketimi</span>
            <span>Mart 2026</span>
          </header>
          <details name="invoice-stages" open>
            <summary>Kaynak belge</summary>
            <div className="h-document-body">
              <Sourced className="h-document-value" value={consumption.value} source={consumption.source} />
              <p>Üretim A.Ş. · Kocaeli tesisi</p>
            </div>
          </details>
          <details name="invoice-stages">
            <summary>Emisyon hesabı</summary>
            <div className="h-document-body">
              <Sourced className="h-document-value" value={emissions.value} source={emissions.source} />
              <p>Satın alınan elektrik · Kapsam 2</p>
            </div>
          </details>
          <details name="invoice-stages">
            <summary>Onaylı rapor satırı</summary>
            <div className="h-document-body">
              <Sourced className="h-document-value" value={emissions.value} source={emissions.source} />
              <p>Bu kayıt, Üretim A.Ş.’nin dönem toplamına Kapsam 2 altında dahil edildi.</p>
              <p className="h-document-meta">{demo.auditTrail[4].k} · {demo.auditTrail[4].v}</p>
              <a href="#denetim-izi" className="h-record-link">Denetim izini aç <Arrow /></a>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
