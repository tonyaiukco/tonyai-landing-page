import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { copy } from "@/content/copy";
import { SmoothScroll } from "@/components/SmoothScroll";

const schibsted = localFont({
  src: [
    { path: "./fonts/schibsted-latin.woff2", weight: "400 900", style: "normal" },
    { path: "./fonts/schibsted-latin-ext.woff2", weight: "400 900", style: "normal" },
  ],
  variable: "--font-schibsted",
  display: "swap",
  preload: true,
});

const plexMono = localFont({
  src: [
    { path: "./fonts/plexmono-latin.woff2", weight: "500", style: "normal" },
    { path: "./fonts/plexmono-latin-ext.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(copy.meta.url),
  title: copy.meta.title,
  description: copy.meta.description,
  openGraph: {
    title: copy.meta.title,
    description: copy.meta.description,
    siteName: copy.meta.siteName,
    locale: copy.meta.locale,
    type: "website",
    url: copy.meta.url,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "TonyAI" }],
  },
  twitter: { card: "summary_large_image", title: copy.meta.title, description: copy.meta.description },
  icons: { icon: "/favicon.svg", apple: "/apple-touch-icon.png" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#f4f6f3", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${schibsted.variable} ${plexMono.variable}`}>
      <body>
        <a href="#icerik" className="skip-link">{copy.nav.skip}</a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
