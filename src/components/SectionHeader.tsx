"use client";

import { motion } from "framer-motion";

export default function SectionHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="mb-4 h-px w-16 origin-left bg-gradient-to-r from-carolina to-transparent"
      />
      <h2 className="text-3xl font-extrabold tracking-tighter md:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-muted">{description}</p>}
    </motion.div>
  );
}
