export const HOME = "/";

/** The homepage links to the live inner pages, so every link stays as the copy gives it. */
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
