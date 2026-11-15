import type { Metadata } from "next";
import "@/components/looks/e/look.css";
import { NavE } from "@/components/looks/e/NavE";
import { RevealE } from "@/components/looks/e/RevealE";
import { FooterE } from "@/components/looks/e/SectionsE";

/** Every page of the preview is kept out of search. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function LookELayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="look-e">
      <NavE />
      <main id="icerik">{children}</main>
      <FooterE />
      <RevealE />
    </div>
  );
}
