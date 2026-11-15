import Link from "next/link";
import { companyPage, contactPage, resourcesPage } from "@/content/copy";
import { ContactForm } from "@/components/ContactForm";
import { Mark } from "@/components/Logo";
import { Arrow } from "./Illustrations";
import { FinalCtaE } from "./SectionsE";
import { Title, here } from "./parts";

/** Inner pages of the preview: the live pages' copy in look E, so the nav never leaves /tasarim/e/. */

function IntroE({ id, eyebrow, title, mark, lead }: { id: string; eyebrow: string; title: string; mark: number; lead: string }) {
  return (
    <section className="e-intro" aria-labelledby={id}>
      <div className="e-wrap">
        <p className="e-eyebrow">{eyebrow}</p>
        <Title as="h1" id={id} className="e-h1" text={title} mark={mark} />
        <p className="e-lead">{lead}</p>
      </div>
    </section>
  );
}

export function CompanyE() {
  const c = companyPage;
  return (
    <>
      <IntroE id="e-sirket-baslik" eyebrow={c.eyebrow} title={c.title} mark={2} lead={c.lead} />
      <section className="e-paper e-split e-story" aria-labelledby="e-hikaye">
        <div className="e-main">
          <div data-reveal>
            <p className="e-eyebrow">{c.story.eyebrow}</p>
            <Title id="e-hikaye" text={c.story.title} mark={5} />
          </div>
          <div className="e-prose">
            {c.story.paragraphs.map((p, i) => (<p key={i} className={i === 0 ? "e-lead" : undefined} data-reveal>{p}</p>))}
          </div>
        </div>
        <div className="e-panel e-white e-facts">
          <dl className="e-panel-in" data-reveal>
            {c.facts.map((f) => (<div key={f.k}><dt className="e-cap">{f.k}</dt><dd>{f.v}</dd></div>))}
          </dl>
        </div>
      </section>
      <section className="e-ink e-band" aria-labelledby="e-ilkeler">
        <div className="e-wrap">
          <h2 id="e-ilkeler" className="e-eyebrow">{c.principles.eyebrow}</h2>
          <ol className="e-principles">
            {c.principles.items.map((p, i) => (
              <li key={p.title} data-reveal style={{ "--d": i } as React.CSSProperties}>
                <span className="e-num" aria-hidden="true">0{i + 1}</span>
                <h3 className="e-h3">{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="e-white e-band" aria-labelledby="e-ekip">
        <div className="e-wrap e-two e-two-top">
          <div data-reveal>
            <p className="e-eyebrow">{c.team.eyebrow}</p>
            <Title id="e-ekip" text={c.team.title} mark={4} />
            <p className="e-lead">{c.team.body}</p>
          </div>
          <ul className="e-team">
            {c.team.members.map((m, i) => (
              <li key={m.name} data-reveal style={{ "--d": i } as React.CSSProperties}>
                <span className="e-team-mark" aria-hidden="true"><Mark size={26} /></span>
                <div><h3 className="e-h3">{m.name}</h3><p>{m.role}</p></div>
                <span className="e-cap">{m.field}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCtaE />
    </>
  );
}

export function ResourcesE() {
  const r = resourcesPage;
  return (
    <>
      <IntroE id="e-kaynaklar-baslik" eyebrow={r.eyebrow} title={r.title} mark={5} lead={r.lead} />
      <section className="e-paper e-articles-band" aria-label="Yazılar">
        <ul className="e-wrap e-articles">
          {r.articles.map((a, i) => (
            <li key={a.slug} data-reveal style={{ "--d": i } as React.CSSProperties}>
              <Link href={here(`/kaynaklar/${a.slug}/`)}>
                <span className="e-cap">{a.minutes} dk okuma</span>
                <h2 className="e-h3">{a.title}</h2>
                <p>{a.summary}</p>
                <span className="e-link">{r.readMore}<Arrow /></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section id="sozluk" className="e-white e-band" aria-labelledby="e-sozluk-baslik">
        <div className="e-wrap e-gloss">
          <h2 id="e-sozluk-baslik" className="e-h2" data-reveal>{r.glossaryTitle}</h2>
          <dl>
            {r.glossary.map((g) => (<div key={g.term} data-reveal><dt>{g.term}</dt><dd>{g.def}</dd></div>))}
          </dl>
        </div>
      </section>
      <FinalCtaE />
    </>
  );
}

export function ArticleE({ slug }: { slug: string }) {
  const r = resourcesPage;
  const a = r.articles.find((x) => x.slug === slug)!;
  return (
    <>
      <article className="e-split e-article">
        <div className="e-main">
          <Link href={here("/kaynaklar/")} className="e-link e-link-back"><Arrow />{r.eyebrow}</Link>
          <p className="e-eyebrow">{a.minutes} dk okuma</p>
          <h1 className="e-h2">{a.title}</h1>
          <p className="e-lead">{a.summary}</p>
          <div className="e-prose">{a.body.map((p, i) => (<p key={i}>{p}</p>))}</div>
        </div>
        <aside className="e-panel e-paper" aria-label={r.eyebrow}>
          <div className="e-panel-in">
            <p className="e-eyebrow">{r.eyebrow}</p>
            <ul className="e-more">
              {r.articles.filter((x) => x.slug !== slug).map((x) => (
                <li key={x.slug}><Link href={here(`/kaynaklar/${x.slug}/`)}><span className="e-cap">{x.minutes} dk okuma</span><span className="e-h3">{x.title}</span></Link></li>
              ))}
            </ul>
            <Link href={here("/kaynaklar/#sozluk")} className="e-link">{r.glossaryTitle}<Arrow /></Link>
          </div>
        </aside>
      </article>
      <FinalCtaE />
    </>
  );
}

export function ContactE() {
  const c = contactPage;
  return (
    <>
      <IntroE id="e-iletisim-baslik" eyebrow={c.eyebrow} title={c.title} mark={4} lead={c.lead} />
      <section className="e-paper e-split e-contact" aria-label={c.eyebrow}>
        <div className="e-main e-form"><ContactForm /></div>
        <aside className="e-panel e-ink" aria-labelledby="e-demo-panel">
          <div className="e-panel-in">
            <div>
              <p className="e-eyebrow">{c.panel.eyebrow}</p>
              <Title id="e-demo-panel" text={c.panel.title} mark={3} className="e-h2 e-h2-sm" />
            </div>
            <p>{c.panel.body}</p>
            <ol className="e-contact-steps">
              {c.panel.steps.map((s, i) => (<li key={s}><span className="e-num e-num-sm" aria-hidden="true">{i + 1}</span>{s}</li>))}
            </ol>
            <p className="e-contact-note">{c.panel.responseNote}</p>
            <div>
              <p className="e-cap">{c.panel.directLabel}</p>
              <a href={`mailto:${c.panel.email}`} className="e-contact-mail">{c.panel.email}</a>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
