"use client";

import { motion } from "framer-motion";

// Fades each route in on navigation. Transform resolves to `none` once the
// animation settles, so fixed-position children (modals, lightbox) are safe.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
