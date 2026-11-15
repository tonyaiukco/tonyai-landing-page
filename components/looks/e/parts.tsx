export const HOME = "/tasarim/e/";

/** Keeps a link inside the preview when the look has its own version of the target: homepage anchors and the three inner pages. */
export const here = (href: string) =>
  href.startsWith("/#") ? HOME + href.slice(1) : /^\/(kaynaklar|sirket|bize-ulasin)\//.test(href) ? HOME + href.slice(1) : href;

/**
 * Single-colour heading. The word at `mark` (counted from 0) sits on a leaf-cornered highlight;
 * its trailing punctuation stays outside. The sentence itself is never rewritten.
 */
export function Title({ as: Tag = "h2", id, text, mark, className = "e-h2" }: { as?: "h1" | "h2"; id: string; text: string; mark: number; className?: string }) {
  const words = text.split(" ");
  const [, core, tail] = words[mark].match(/^(.*?)([.,;:?!]*)$/)!;
  const before = words.slice(0, mark).join(" ");
  const after = words.slice(mark + 1).join(" ");
  return (
    <Tag id={id} className={className}>
      {before && `${before} `}<span className="e-mark">{core}</span>{tail}{after && ` ${after}`}
    </Tag>
  );
}
