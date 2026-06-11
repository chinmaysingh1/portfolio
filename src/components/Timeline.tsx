"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { TimelineEntry } from "@/lib/data";

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  // The spine draws itself in as the section scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <div ref={ref} className="relative">
      <div className="absolute inset-y-0 left-0 hidden w-px bg-white/[0.05] md:block" />
      <motion.div
        style={{ scaleY }}
        className="absolute inset-y-0 left-0 hidden w-px origin-top bg-gradient-to-b from-carolina via-carolina/60 to-purple-400/40 md:block"
      />
      <div className="space-y-12">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.title + entry.date}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
            className="relative grid gap-3 md:grid-cols-[220px_1fr] md:gap-10 md:pl-10"
          >
            <div className="absolute -left-[5px] top-2 hidden h-[11px] w-[11px] rounded-full border-2 border-carolina bg-charcoal md:block" />
            <div>
              <div className="text-sm font-semibold text-carolina">{entry.date}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">
                {entry.role}
              </div>
            </div>
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="rounded-3xl border border-white/[0.04] bg-surface/90 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-carolina/40"
            >
              <h3 className="text-xl font-bold tracking-tight">{entry.title}</h3>
              <p className="mt-1 text-sm font-medium text-carolina/80">
                {entry.institution}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{entry.body}</p>
              {entry.tech && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-xs text-white/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
