import Link from "next/link";
import { companyPage, contactPage, resourcesPage } from "@/content/copy";
import { ContactForm } from "@/components/ContactForm";
import { Mark } from "@/components/Logo";
import { Arrow } from "./Illustrations";
import { FinalCtaD } from "./SectionsD";
import { Title, here } from "./parts";

/** Inner pages of the preview: the live pages' copy in look D, so the nav never leaves /tasarim/d/. */

function IntroD({ id, eyebrow, title, at, lead }: { id: string; eyebrow: string; title: string; at: number; lead: string }) {
  return (
    <section className="d-intro" aria-labelledby={id}>
      <div className="d-wrap">
        <p className="d-eyebrow">{eyebrow}</p>
        <Title as="h1" id={id} className="d-h1" text={title} at={at} />
        <p className="d-lead">{lead}</p>
      </div>
    </section>
  );
}

export function CompanyD() {
  const c = companyPage;
  return (
    <>
      <IntroD id="d-sirket-baslik" eyebrow={c.eyebrow} title={c.title} at={2} lead={c.lead} />
      <section className="d-mist d-split d-story" aria-labelledby="d-hikaye">
        <div className="d-main">
          <div data-reveal>
            <p className="d-eyebrow">{c.story.eyebrow}</p>
            <Title id="d-hikaye" text={c.story.title} at={2} />
          </div>
          <div className="d-prose">
            {c.story.paragraphs.map((p, i) => (<p key={i} className={i === 0 ? "d-lead" : undefined} data-reveal>{p}</p>))}
          </div>
        </div>
        <div className="d-panel d-white d-facts">
          <dl className="d-panel-in" data-reveal>
            {c.facts.map((f) => (<div key={f.k}><dt className="d-cap">{f.k}</dt><dd>{f.v}</dd></div>))}
          </dl>
        </div>
      </section>
      <section className="d-teal d-band" aria-labelledby="d-ilkeler">
        <div className="d-wrap">
          <h2 id="d-ilkeler" className="d-eyebrow">{c.principles.eyebrow}</h2>
          <ol className="d-principles">
            {c.principles.items.map((p, i) => (
              <li key={p.title} data-reveal style={{ "--d": i } as React.CSSProperties}>
                <span className="d-principles-n" aria-hidden="true">0{i + 1}</span>
                <h3 className="d-h3">{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="d-white d-band" aria-labelledby="d-ekip">
        <div className="d-wrap d-two d-two-top">
          <div data-reveal>
            <p className="d-eyebrow">{c.team.eyebrow}</p>
            <Title id="d-ekip" text={c.team.title} at={3} />
            <p className="d-lead">{c.team.body}</p>
          </div>
          <ul className="d-team">
            {c.team.members.map((m, i) => (
              <li key={m.name} data-reveal style={{ "--d": i } as React.CSSProperties}>
                <span className="d-team-mark" aria-hidden="true"><Mark size={26} /></span>
                <div><h3 className="d-h3">{m.name}</h3><p>{m.role}</p></div>
                <span className="d-cap">{m.field}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCtaD />
    </>
  );
}

export function ResourcesD() {
  const r = resourcesPage;
  return (
    <>
      <IntroD id="d-kaynaklar-baslik" eyebrow={r.eyebrow} title={r.title} at={3} lead={r.lead} />
      <section className="d-mist d-articles-band" aria-label="Yazılar">
        <ul className="d-wrap d-articles">
          {r.articles.map((a, i) => (
            <li key={a.slug} data-reveal style={{ "--d": i } as React.CSSProperties}>
              <Link href={here(`/kaynaklar/${a.slug}/`)}>
                <span className="d-cap">{a.minutes} dk okuma</span>
                <h2 className="d-h3">{a.title}</h2>
                <p>{a.summary}</p>
                <span className="d-link">{r.readMore}<Arrow /></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section id="sozluk" className="d-white d-band" aria-labelledby="d-sozluk-baslik">
        <div className="d-wrap d-gloss">
          <h2 id="d-sozluk-baslik" className="d-h2" data-reveal>{r.glossaryTitle}</h2>
          <dl>
            {r.glossary.map((g) => (<div key={g.term} data-reveal><dt>{g.term}</dt><dd>{g.def}</dd></div>))}
          </dl>
        </div>
      </section>
      <FinalCtaD />
    </>
  );
}

export function ArticleD({ slug }: { slug: string }) {
  const r = resourcesPage;
  const a = r.articles.find((x) => x.slug === slug)!;
  return (
    <>
      <article className="d-split d-article">
        <div className="d-main">
          <Link href={here("/kaynaklar/")} className="d-link d-link-back"><Arrow />{r.eyebrow}</Link>
          <p className="d-eyebrow">{a.minutes} dk okuma</p>
          <h1 className="d-h2">{a.title}</h1>
          <p className="d-lead">{a.summary}</p>
          <div className="d-prose">{a.body.map((p, i) => (<p key={i}>{p}</p>))}</div>
        </div>
        <aside className="d-panel d-mist" aria-label={r.eyebrow}>
          <div className="d-panel-in">
            <p className="d-eyebrow">{r.eyebrow}</p>
            <ul className="d-more">
              {r.articles.filter((x) => x.slug !== slug).map((x) => (
                <li key={x.slug}><Link href={here(`/kaynaklar/${x.slug}/`)}><span className="d-cap">{x.minutes} dk okuma</span><span className="d-h3">{x.title}</span></Link></li>
              ))}
            </ul>
            <Link href={here("/kaynaklar/#sozluk")} className="d-link">{r.glossaryTitle}<Arrow /></Link>
          </div>
        </aside>
      </article>
      <FinalCtaD />
    </>
  );
}

export function ContactD() {
  const c = contactPage;
  return (
    <>
      <IntroD id="d-iletisim-baslik" eyebrow={c.eyebrow} title={c.title} at={2} lead={c.lead} />
      <section className="d-mist d-split d-contact" aria-label={c.eyebrow}>
        <div className="d-main d-form"><ContactForm /></div>
        <aside className="d-panel d-teal" aria-labelledby="d-demo-panel">
          <div className="d-panel-in">
            <div>
              <p className="d-eyebrow">{c.panel.eyebrow}</p>
              <Title id="d-demo-panel" text={c.panel.title} at={1} className="d-h2 d-h2-sm" />
            </div>
            <p>{c.panel.body}</p>
            <ol className="d-contact-steps">
              {c.panel.steps.map((s, i) => (<li key={s}><span aria-hidden="true">0{i + 1}</span>{s}</li>))}
            </ol>
            <p className="d-contact-note">{c.panel.responseNote}</p>
            <div>
              <p className="d-cap">{c.panel.directLabel}</p>
              <a href={`mailto:${c.panel.email}`} className="d-contact-mail">{c.panel.email}</a>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
