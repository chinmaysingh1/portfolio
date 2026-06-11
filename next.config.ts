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
};

export default nextConfig;
