@AGENTS.md

# Portfolio: Deep Dimension & Kinetic Scroll

## Architecture
Next.js App Router (static export via `output: "export"` — the site deploys as
plain HTML/CSS/JS from `out/` on Cloudflare Pages).
Tailwind CSS v4 (CSS-based config in `src/app/globals.css`).
Framer Motion for scroll-linked animations (useScroll, useTransform).
React Three Fiber and Drei for the 3D WebGL particle background.

## Design System: Deep Dimension
Global Background: Pure charcoal #050507.
Card Surfaces: #0c0d12 with 1px solid rgba(255, 255, 255, 0.04) borders.
Hover states: Illuminate borders with Carolina Blue #4B9CD3.
Typography: Tight tracking on headers, stark weight contrasts.
Kinetic Scroll: Elements map scrollYProgress to y position and opacity for
multi-layered parallax.

## Component Rules
The background MUST be a Canvas containing a rotating 3D particle field; the
camera Y-position maps to the browser scroll position (src/components/ParticleScene.tsx).
Bento Grid cards slide up at different speeds based on scroll (src/components/BentoGrid.tsx).
Maintain all original portfolio content including KAIRS, iGEM, BioCast,
Johns Hopkins CBID, and UNC (content lives in src/lib/data.ts and src/lib/gallery-data.ts).
