import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource-variable/dm-sans/wght.css";
import "./look.css";
import { NavH } from "./NavH";
import { FooterH } from "./SectionsH";
import { RevealH } from "./RevealH";

/** Navigation, footer and reveal motion around every page of the site. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="look-h">
      <NavH />
      <main id="icerik">{children}</main>
      <FooterH />
      <RevealH />
    </div>
  );
}
