"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { awards } from "@/lib/data";

export default function Awards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {awards.map((award, i) => (
        <motion.div
          key={award.title}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.07 }}
          className={cn(
            "rounded-3xl border border-white/[0.04] bg-surface p-6 transition-colors duration-300 hover:border-carolina/60",
            award.tier === "gold" && "border-gold/25 hover:border-gold/60",
            award.tier === "silver" && "border-white/15"
          )}
        >
          <div className="text-3xl">{award.icon}</div>
          <h3 className="mt-3 text-lg font-bold tracking-tight">{award.title}</h3>
          <p className="mt-1.5 text-sm text-white/75">
            <strong>{award.org}</strong>
            <br />
            {award.detail}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
