"use client";

import dynamic from "next/dynamic";

const ParticleScene = dynamic(() => import("./ParticleScene"), { ssr: false });

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <ParticleScene />
      {/* Vignette so text stays legible over the field */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,7,0.55)_100%)]" />
    </div>
  );
}
