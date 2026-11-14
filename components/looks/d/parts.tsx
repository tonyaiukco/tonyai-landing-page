import type { ReactNode } from "react";

/** Homepage anchors ("/#platform") stay inside the preview. */
export const here = (href: string) => (href.startsWith("/#") ? href.slice(1) : href);

/**
 * Two-tone heading: the copy's title broken after `at` words, one line in the accent colour.
 * The sentence itself is never rewritten.
 */
export function Title({ as: Tag = "h2", id, text, at, accent = 2, className = "d-h2" }: { as?: "h1" | "h2"; id: string; text: string; at: number; accent?: 1 | 2; className?: string }) {
  const words = text.split(" ");
  const lines = [words.slice(0, at).join(" "), words.slice(at).join(" ")];
  return (
    <Tag id={id} className={className}>
      {lines.map((l, i) => (<span key={l} className={i + 1 === accent ? "d-acc" : undefined}>{l}{i === 0 ? " " : ""}</span>))}
    </Tag>
  );
}

/** Small caption above a button, as on the reference. */
export function Noted({ note, children }: { note: string; children: ReactNode }) {
  return (<div className="d-noted"><p>{note}</p>{children}</div>);
}
