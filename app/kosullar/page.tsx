import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legalPages } from "@/content/copy";

const page = legalPages.pages.kosullar;
export const metadata: Metadata = { title: `${page.title} — TonyAI`, robots: { index: false }, alternates: { canonical: "/kosullar/" } };
export default function Route() { return <LegalPage page={page} />; }
