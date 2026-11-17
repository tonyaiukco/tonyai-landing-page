import type { ReactNode } from "react";

export const HOME = "/";

/** Look D keeps links inside its preview; on the live site every link already points where it should. */
export const here = (href: string) => href;

/**
 * Two-tone heading: the copy's title broken after `at` words, one line in the accent colour.
 * The sentence itself is never rewritten.
 */
export function Title({ as: Tag = "h2", id, text, at, accent = 2, className = "h-h2" }: { as?: "h1" | "h2"; id: string; text: string; at: number; accent?: 1 | 2; className?: string }) {
  const words = text.split(" ");
  const lines = [words.slice(0, at).join(" "), words.slice(at).join(" ")];
  return (
    <Tag id={id} className={className}>
      {lines.map((l, i) => (<span key={l} className={i + 1 === accent ? "h-acc" : undefined}>{l}{i === 0 ? " " : ""}</span>))}
    </Tag>
  );
}

/**
 * A figure with the line that says where it comes from, always visible beneath it.
 * `className` styles the value, so large figures keep their own type.
 */
export function Sourced({ value, source, className = "" }: { value: ReactNode; source: string; className?: string }) {
  return (
    <span className="h-src">
      <span className={`h-src-v ${className}`}>{value}</span>
      <span className="h-src-s">{source}</span>
    </span>
  );
}

/** Small caption above a button, as on the reference. */
export function Noted({ note, children }: { note: string; children: ReactNode }) {
  return (<div className="h-noted"><p>{note}</p>{children}</div>);
}
