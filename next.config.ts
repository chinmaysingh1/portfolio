import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` emits a plain HTML/CSS/JS site in `out/`,
  // deployable on any static host (Cloudflare Pages, GitHub Pages, etc.).
  output: "export",
  trailingSlash: true,
  images: {
    // The image optimizer needs a server; static export serves originals.
    unoptimized: true,
  },
  // NOTE: do not add a `headers()` block here. Under `output: "export"` there is
  // no runtime server, so Next.js ignores it. Security headers (CSP, HSTS,
  // X-Frame-Options, etc.) are defined in `public/_headers` and applied by
  // Cloudflare Pages at the edge.
};

export default nextConfig;
