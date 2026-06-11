"use client";

import { tickerSkills } from "@/lib/data";

export default function Ticker() {
  const items = [...tickerSkills, ...tickerSkills];
  return (
    <section className="overflow-hidden border-y border-white/[0.04] bg-surface/40 py-5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div className="flex w-max animate-ticker gap-12 hover:[animation-play-state:paused]">
        {items.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="cursor-default whitespace-nowrap text-sm font-semibold uppercase tracking-[0.18em] text-white/40 transition-all duration-300 hover:scale-110 hover:text-carolina hover:[text-shadow:0_0_18px_rgba(75,156,211,0.6)]"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
