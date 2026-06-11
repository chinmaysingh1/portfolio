"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="mx-auto max-w-6xl px-6 pb-6 pt-40 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-[11px] font-semibold uppercase tracking-[0.22em] text-carolina"
      >
        {eyebrow}
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 bg-gradient-to-br from-white via-white to-carolina bg-clip-text text-4xl font-extrabold tracking-tighter text-transparent md:text-6xl"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mx-auto mt-5 max-w-xl text-muted"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
