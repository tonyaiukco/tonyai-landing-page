import type { Metadata } from "next";
import "@fontsource-variable/outfit/wght.css";
import "@/components/looks/d/look.css";
import { NavD } from "@/components/looks/d/NavD";
import { RevealD } from "@/components/looks/d/RevealD";
import { FooterD } from "@/components/looks/d/SectionsD";

/** Every page of the preview is kept out of search. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function LookDLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="look-d">
      <NavD />
      <main id="icerik">{children}</main>
      <FooterD />
      <RevealD />
    </div>
  );
}
