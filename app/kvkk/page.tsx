import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legalPages } from "@/content/copy";

const page = legalPages.pages.kvkk;
export const metadata: Metadata = { title: `${page.title} — TonyAI`, robots: { index: false }, alternates: { canonical: "/kvkk/" } };
export default function Route() { return <LegalPage page={page} />; }
