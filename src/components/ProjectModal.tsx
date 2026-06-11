"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data";

const gradients = {
  blue: "bg-gradient-to-br from-carolina/40 via-carolina/10 to-transparent",
  purple: "bg-gradient-to-br from-purple-500/40 via-purple-500/10 to-transparent",
  dark: "bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent",
};

export default function ProjectModal({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: {
  items: Project[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const open = activeIndex !== null;
  const project = open ? items[activeIndex] : null;
  const modal = project?.modal;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((activeIndex! + 1) % items.length);
      if (e.key === "ArrowLeft")
        onNavigate((activeIndex! - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, activeIndex, items.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {project && modal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/80 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          {items.length > 1 && (
            <>
              <button
                aria-label="Previous Project"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate((activeIndex! - 1 + items.length) % items.length);
                }}
                className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/10 bg-surface p-3 text-white/70 transition hover:border-carolina/60 hover:text-white md:block"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                aria-label="Next Project"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate((activeIndex! + 1) % items.length);
                }}
                className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/10 bg-surface p-3 text-white/70 transition hover:border-carolina/60 hover:text-white md:block"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/[0.06] bg-surface shadow-2xl"
          >
            <button
              aria-label="Close"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-charcoal/60 p-2 text-white/70 backdrop-blur transition hover:border-carolina/60 hover:text-white"
            >
              <X size={16} />
            </button>

            <div className={cn("px-8 pb-8 pt-10", gradients[modal.gradient])}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                {modal.tag}
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                {modal.title}
              </h2>
            </div>

            <div className="space-y-6 px-8 py-7">
              {modal.image && (
                <Link
                  href={`/gallery#${project.id}`}
                  className="group/banner relative block h-56 w-full overflow-hidden rounded-2xl border border-white/[0.06]"
                >
                  <Image
                    src={modal.image}
                    alt={modal.imageAlt ?? modal.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 672px"
                    className="object-cover transition-transform duration-500 group-hover/banner:scale-[1.03]"
                  />
                  <span className="absolute bottom-3 right-3 rounded-full bg-charcoal/70 px-3 py-1 text-xs font-medium text-white/80 opacity-0 backdrop-blur transition-opacity duration-300 group-hover/banner:opacity-100">
                    View album →
                  </span>
                </Link>
              )}

              <div className="flex flex-wrap gap-2">
                {modal.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {modal.sections.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-carolina">
                    {section.title}
                  </h3>
                  {section.paragraphs?.map((p) => (
                    <p key={p.slice(0, 40)} className="mb-3 text-sm leading-relaxed text-white/80">
                      {p}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="space-y-2">
                      {section.list.map((item) => (
                        <li
                          key={item.slice(0, 40)}
                          className="flex gap-2.5 text-sm leading-relaxed text-white/80"
                        >
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-carolina" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {(modal.website || modal.github) && (
                <div className="flex items-center gap-4 pt-2">
                  {modal.website && (
                    <a
                      href={modal.website.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-carolina px-6 py-2.5 text-sm font-semibold text-charcoal transition hover:bg-carolina/85"
                    >
                      {modal.website.label}
                    </a>
                  )}
                  {modal.github && (
                    <a
                      href={modal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Repository"
                      className="rounded-full border border-white/10 p-2.5 text-white/70 transition hover:border-carolina/60 hover:text-white"
                    >
                      <GithubIcon size={20} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
