"use client";

import { motion } from "framer-motion";
import { Mail, FileDown } from "lucide-react";

export default function Contact() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28 text-center"
    >
      <h2 className="text-4xl font-extrabold tracking-tighter md:text-5xl">
        Let&apos;s Connect.
      </h2>
      <p className="mx-auto mt-4 max-w-md text-muted">
        Open to discussing medical device innovation, synthetic biology, and new
        ventures.
      </p>
      <div className="mt-10 flex justify-center gap-5">
        <a
          href="/assets/CSinghResume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download Resume"
          className="rounded-full border border-white/[0.08] bg-surface p-4 text-white/70 transition duration-300 hover:-translate-y-1.5 hover:border-carolina/60 hover:text-carolina hover:shadow-[0_12px_24px_-10px_rgba(75,156,211,0.45)]"
        >
          <FileDown size={22} />
        </a>
        <a
          href="mailto:chinmay@kairs.ai"
          aria-label="Email"
          className="rounded-full border border-white/[0.08] bg-surface p-4 text-white/70 transition duration-300 hover:-translate-y-1.5 hover:border-carolina/60 hover:text-carolina hover:shadow-[0_12px_24px_-10px_rgba(75,156,211,0.45)]"
        >
          <Mail size={22} />
        </a>
      </div>
    </motion.section>
  );
}
