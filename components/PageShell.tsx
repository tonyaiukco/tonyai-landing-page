import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Interactions } from "./Interactions";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (<><Nav /><main id="icerik">{children}</main><Footer /><Interactions /></>);
}

export function PageIntro({ eyebrow, title, lead, id }: { eyebrow: string; title: string; lead?: string; id: string }) {
  return (
    <div className="container flex flex-col gap-5 pb-12 pt-16 lg:pb-16 lg:pt-24">
      <p className="eyebrow">{eyebrow}</p>
      <h1 id={id} className="display max-w-[20ch]">{title}</h1>
      {lead && <p className="lead measure text-ink-2">{lead}</p>}
    </div>
  );
}
