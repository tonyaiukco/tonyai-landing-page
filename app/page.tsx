import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Strip, Difference, Platform, DemoSection, Journey, Compliance, Faq, FinalCta } from "@/components/Sections";
import { Footer } from "@/components/Footer";
import { Interactions } from "@/components/Interactions";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="icerik">
        <Hero />
        <Strip />
        <Difference />
        <Platform />
        <DemoSection />
        <Journey />
        <Compliance />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <Interactions />
    </>
  );
}
