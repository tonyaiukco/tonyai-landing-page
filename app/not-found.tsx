import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { notFoundPage as n } from "@/content/copy";

export default function NotFound() {
  return (
    <PageShell>
      <div className="container flex min-h-[50vh] flex-col items-start justify-center gap-5 py-24">
        <p className="figure text-ink-3">404</p><h1 className="display">{n.title}</h1><p className="lead text-ink-2">{n.body}</p>
        <Link href="/" className="btn btn-primary">{n.back}</Link>
      </div>
    </PageShell>
  );
}
