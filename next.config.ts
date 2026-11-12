import type { NextConfig } from "next";

/** Static export: `next build` writes a plain HTML/CSS/JS site to ./out, which is uploaded to Azure Static Web Apps (see README). */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: { rules: { "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" } } },
};

export default nextConfig;
