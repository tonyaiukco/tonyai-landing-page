import Link from "next/link";
import type { ReactNode } from "react";
import { CompanyArtwork } from "./CompanyArtwork";
import { ResourcesArtwork } from "./ResourcesArtwork";
import { companyPage, contactPage, copy, legalPages, notFoundPage, resourcesPage } from "@/content/copy";
import { ContactForm } from "@/components/ContactForm";
import { RegisterForm } from "@/components/RegisterForm";
import { ContactArtwork } from "./ContactArtwork";
import { Arrow, Glyph, Play, Skyline } from "./Illustrations";
import { FinalCtaH } from "./SectionsH";
import { Title, here } from "./parts";

/** The site's inner pages in the homepage look (look D's, plus the pages D links out to: Demo, Kayıt, thank-you, legal, 404). */

function IntroH({ id, eyebrow, title, at = Math.ceil(title.split(" ").length / 2), lead, children }: { id: string; eyebrow: string; title: string; at?: number; lead?: string; children?: ReactNode }) {
  return (
    <section className="h-intro" aria-labelledby={id}>
      <div className={children ? "h-wrap h-demo-opening" : "h-wrap"}>
        <div>
          <p className="h-eyebrow">{eyebrow}</p>
          <Title as="h1" id={id} className="h-h1" text={title} at={at} />
          {lead && <p className="h-lead">{lead}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function CompanyH() {
  const c = companyPage;
  const principleIcons = ["report", "shield", "merge", "target"] as const;
  return (
    <div className="company-page">
      <section className="company-opening h-wrap" aria-labelledby="h-sirket-baslik">
        <div>
          <p className="h-eyebrow">{c.eyebrow}</p>
          <Title as="h1" id="h-sirket-baslik" className="h-h1" text={c.title} at={2} />
          <p className="h-lead">{c.lead}</p>
        </div>
        <CompanyArtwork />
      </section>
      <section className="company-story h-mist" aria-labelledby="h-hikaye">
        <div className="h-wrap h-two h-two-top">
          <div>
            <p className="h-eyebrow">{c.story.eyebrow}</p>
            <Title id="h-hikaye" text={c.story.title} at={2} />
            <dl className="company-facts">
              {c.facts.map(f => <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>)}
            </dl>
          </div>
          <div className="h-prose">
            <p>{c.story.paragraphs[0]}</p>
            <details><summary>Hikâyenin devamı</summary>{c.story.paragraphs.slice(1).map(p => <p key={p}>{p}</p>)}</details>
          </div>
        </div>
      </section>
      <Skyline />
      <section className="h-teal h-band" aria-labelledby="h-ilkeler">
        <div className="h-wrap">
          <h2 id="h-ilkeler" className="h-eyebrow">{c.principles.eyebrow}</h2>
          <ol className="h-principles">
            {c.principles.items.map((p, i) => (
              <li key={p.title} data-reveal style={{ "--d": i } as React.CSSProperties}>
                <Glyph name={principleIcons[i]} size={40} />
                <h3 className="h-h3">{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="h-white h-band" aria-labelledby="h-ekip">
        <div className="h-wrap h-two h-two-top">
          <div data-reveal>
            <p className="h-eyebrow">{c.team.eyebrow}</p>
            <Title id="h-ekip" text={c.team.title} at={3} />
            <p className="h-lead">{c.team.body}</p>
          </div>
          <ul className="h-team">
            {c.team.members.map((m, i) => (
              <li key={m.name} data-reveal style={{ "--d": i } as React.CSSProperties}>
                <span className="h-team-mark" aria-hidden="true">{m.name.split(" ").map(word => word[0]).join("")}</span>
                <div><h3 className="h-h3">{m.name}</h3><p>{m.role}</p></div>
                <span className="h-cap">{m.field}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCtaH />
    </div>
  );
}

export function ResourcesH() {
  const r = resourcesPage;
  return (
    <>
      <section className="h-intro h-resource-opening" aria-labelledby="h-kaynaklar-baslik">
        <div className="h-wrap">
          <div>
            <p className="h-eyebrow">{r.eyebrow}</p>
            <Title as="h1" id="h-kaynaklar-baslik" className="h-h1" text={r.title} at={3} />
            <p className="h-lead">{r.lead}</p>
          </div>
          <div className="h-opening-art"><ResourcesArtwork /></div>
        </div>
      </section>
      <section className="h-mist h-articles-band" aria-label="Yazılar">
        <ul className="h-wrap h-articles">
          {r.articles.map((a, i) => (
            <li key={a.slug} data-reveal style={{ "--d": i } as React.CSSProperties}>
              <Link href={here(`/kaynaklar/${a.slug}/`)}>
                <span className="h-cap">{a.minutes} dk okuma</span>
                <h2 className="h-h3">{a.title}</h2>
                <p>{a.summary}</p>
                <span className="h-link">{r.readMore}<Arrow /></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section id="sozluk" className="h-white h-band" aria-labelledby="h-sozluk-baslik">
        <div className="h-wrap h-gloss">
          <h2 id="h-sozluk-baslik" className="h-h2" data-reveal>{r.glossaryTitle}</h2>
          <dl>
            {r.glossary.map((g) => (<div key={g.term} data-reveal><dt>{g.term}</dt><dd>{g.def}</dd></div>))}
          </dl>
        </div>
      </section>
      <FinalCtaH />
    </>
  );
}

export function ArticleH({ slug }: { slug: string }) {
  const r = resourcesPage;
  const a = r.articles.find((x) => x.slug === slug)!;
  return (
    <>
      <article className="h-split h-article">
        <div className="h-main">
          <Link href={here("/kaynaklar/")} className="h-link h-link-back"><Arrow />{r.eyebrow}</Link>
          <p className="h-eyebrow">{a.minutes} dk okuma</p>
          <h1 className="h-h2">{a.title}</h1>
          <p className="h-lead">{a.summary}</p>
          <div className="h-prose">{a.body.map((p, i) => (<p key={i}>{p}</p>))}</div>
        </div>
        <aside className="h-panel h-mist" aria-label={r.eyebrow}>
          <div className="h-panel-in">
            <p className="h-eyebrow">{r.eyebrow}</p>
            <ul className="h-more">
              {r.articles.filter((x) => x.slug !== slug).map((x) => (
                <li key={x.slug}><Link href={here(`/kaynaklar/${x.slug}/`)}><span className="h-cap">{x.minutes} dk okuma</span><span className="h-h3">{x.title}</span></Link></li>
              ))}
            </ul>
            <Link href={here("/kaynaklar/#sozluk")} className="h-link">{r.glossaryTitle}<Arrow /></Link>
          </div>
        </aside>
      </article>
      <FinalCtaH />
    </>
  );
}

export function ContactH() {
  const c = contactPage;
  return (
    <div className="contact-page">
      <section className="h-intro h-resource-opening" aria-labelledby="h-iletisim-baslik">
        <div className="h-wrap">
          <div>
            <p className="h-eyebrow">{c.eyebrow}</p>
            <Title as="h1" id="h-iletisim-baslik" className="h-h1" text="Uzmanla görüşün." at={1} />
            <p className="h-lead">{c.lead}</p>
            <div className="contact-actions">
              <a className="h-link" href="#iletisim-formu">Bize yazın <span aria-hidden="true">↓</span></a>
              <a href={`mailto:${c.panel.email}`}>{c.panel.email}</a>
            </div>
          </div>
          <div className="h-opening-art"><ContactArtwork /></div>
        </div>
      </section>
      <section className="h-mist contact-body" aria-labelledby="iletisim-formu">
        <div className="h-wrap contact-layout">
          <div className="h-form contact-form-panel">
            <h2 className="h-h2 h-h2-sm" id="iletisim-formu" tabIndex={-1}>Bize yazın</h2>
            <p>{c.panel.responseNote}</p>
            <ContactForm />
          </div>
          <aside className="contact-demo h-teal" aria-labelledby="h-demo-panel">
            <p className="h-eyebrow">{c.panel.eyebrow}</p>
            <Title id="h-demo-panel" text={c.panel.title} at={1} className="h-h2 h-h2-sm" />
            <p>{c.panel.body}</p>
            <ol>{c.panel.steps.map((step, i) => <li key={step}><span aria-hidden="true">0{i + 1}</span>{step}</li>)}</ol>
          </aside>
        </div>
      </section>
    </div>
  );
}

type Points = { eyebrow: string; title: string; lead: string; points: Array<{ title: string; body: string }>; successHref?: string };

/** Demo and Kayıt: what the visitor gets, numbered, beside the shared form. */
export function FormPageH({ id, page, form }: { id: string; page: Points; form: "demo" | "register" }) {
  const points = (
    <ol className={form === "demo" ? "demo-steps" : "h-panel-in h-points"}>
      {page.points.map((point, index) => (
        <li key={point.title}>
          <span className="h-points-n" aria-hidden="true">0{index + 1}</span>
          <h2 className="h-h3">{point.title}</h2>
          <p>{point.body}</p>
        </li>
      ))}
    </ol>
  );
  return (
    <>
      <IntroH id={id} eyebrow={page.eyebrow} title={page.title} lead={page.lead}>
        {form === "demo" && (
          <figure className="h-demo-poster">
            <Skyline />
            <span className="h-demo-play" aria-hidden="true"><Play size={22} /></span>
            <figcaption>{copy.demoSection.videoLabel}</figcaption>
          </figure>
        )}
      </IntroH>
      {form === "demo" ? (
        <section className="h-mist contact-body" aria-labelledby={id}>
          <div className="h-wrap contact-layout demo-layout">
            <div className="h-form contact-form-panel">
              <ContactForm variant="demo" successHref={page.successHref} />
            </div>
            <aside className="contact-demo h-teal" aria-label={page.eyebrow}>{points}</aside>
          </div>
        </section>
      ) : (
        <section className="h-mist h-split h-contact" aria-labelledby={id}>
          <div className="h-main h-form"><RegisterForm /></div>
          <aside className="h-panel h-teal" aria-label={page.eyebrow}>{points}</aside>
        </section>
      )}
    </>
  );
}

type Thanks = { eyebrow: string; title: string; lead: string; next: string[]; primary: { label: string; href: string }; secondary: { label: string; href: string } };

/** After a form is sent: the next steps and two ways on. */
export function ThanksH({ id, page }: { id: string; page: Thanks }) {
  return (
    <>
      <IntroH id={id} eyebrow={page.eyebrow} title={page.title} lead={page.lead} />
      <section className="h-white h-band" aria-labelledby={id}>
        <div className="h-wrap">
          <ol className="h-next">
            {page.next.map((n, i) => (
              <li key={n} data-reveal style={{ "--d": i } as React.CSSProperties}>
                <span className="h-principles-n" aria-hidden="true">0{i + 1}</span>
                <p>{n}</p>
              </li>
            ))}
          </ol>
          <div className="h-next-actions">
            <Link href={page.primary.href} className="h-btn">{page.primary.label}<Arrow /></Link>
            <Link href={page.secondary.href} className="h-btn h-btn-line">{page.secondary.label}</Link>
          </div>
        </div>
      </section>
    </>
  );
}

/** KVKK, gizlilik, çerez, koşullar: the draft banner, then each section under a rule. */
export function LegalH({ page }: { page: { title: string; sections: Array<{ h: string; p: string }> } }) {
  return (
    <article className="h-legal">
      <div className="h-wrap">
        <div className="h-legal-in">
          <p className="h-legal-banner">{legalPages.banner}</p>
          <h1 className="h-h2">{page.title}</h1>
          {page.sections.map((s) => (<section key={s.h}><h2 className="h-h3">{s.h}</h2><p>{s.p}</p></section>))}
        </div>
      </div>
    </article>
  );
}

export function NotFoundH() {
  const n = notFoundPage;
  return (
    <section className="h-intro h-notfound" aria-labelledby="h-404-baslik">
      <div className="h-wrap">
        <p className="h-eyebrow">404</p>
        <Title as="h1" id="h-404-baslik" className="h-h1" text={n.title} at={Math.ceil(n.title.split(" ").length / 2)} />
        <p className="h-lead">{n.body}</p>
        <Link href="/" className="h-btn">{n.back}<Arrow /></Link>
      </div>
    </section>
  );
}
