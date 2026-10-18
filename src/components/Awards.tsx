"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { awards, type Award } from "@/lib/data";

function FeaturedAward({ award }: { award: Award }) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
      <div className="md:w-2/5 md:shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{award.icon}</span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-carolina">
            {award.date}
          </span>
        </div>
        <p className="mt-4 text-sm font-semibold text-white/75">{award.org}</p>
        <h3 className="mt-1 text-2xl font-extrabold tracking-tighter md:text-3xl">
          {award.title}
        </h3>
        {award.prizes && (
          <div className="mt-4 flex flex-wrap gap-2">
            {award.prizes.map((prize) => (
              <span
                key={prize}
                className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold"
              >
                {prize}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="md:border-l md:border-white/[0.06] md:pl-10">
        <p className="text-sm leading-relaxed text-white/75">{award.detail}</p>
        {award.context && (
          <p className="mt-3 text-sm leading-relaxed text-muted">{award.context}</p>
        )}
        {award.link && (
          <a
            href={award.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-carolina transition hover:text-white"
          >
            {award.link.label}
            <ArrowUpRight size={16} aria-hidden />
          </a>
        )}
      </div>
    </div>
  );
}

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
            award.tier === "silver" && "border-white/15",
            award.featured && "sm:col-span-2 md:p-8 lg:col-span-3"
          )}
        >
          {award.featured ? (
            <FeaturedAward award={award} />
          ) : (
            <>
              <div className="text-3xl">{award.icon}</div>
              <h3 className="mt-3 text-lg font-bold tracking-tight">{award.title}</h3>
              <p className="mt-1.5 text-sm text-white/75">
                <strong>{award.org}</strong>
                <br />
                {award.detail}
              </p>
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
}
