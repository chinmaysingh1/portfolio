"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data";
import ProjectModal from "./ProjectModal";

// Each card rises at its own rate as the grid scrolls through the viewport,
// so neighbors drift apart and re-align — the "kinetic" layering effect.
const PARALLAX_SPEEDS = [40, 110, 70, 130, 55, 95];

function KineticCard({
  project,
  speed,
  onOpen,
  className,
}: {
  project: Project;
  speed: number;
  onOpen?: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const y = useSpring(rawY, { stiffness: 90, damping: 22, mass: 0.6 });
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.9, 1], [0, 1, 1, 0.6]);

  // Pointer-tracked 3D tilt + glare
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const rotateX = useSpring(tiltX, { stiffness: 180, damping: 20 });
  const rotateY = useSpring(tiltY, { stiffness: 180, damping: 20 });
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(75,156,211,0.10), transparent 65%)`;

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    tiltX.set((0.5 - py) * 5);
    tiltY.set((px - 0.5) * 5);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.article
      ref={ref}
      style={{ y, opacity, rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onClick={onOpen}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/[0.04] bg-surface/90 p-7 backdrop-blur-sm",
        "transition-[border-color,background-color,box-shadow] duration-300 hover:border-carolina/60 hover:bg-surface-hover hover:shadow-[0_24px_60px_-24px_rgba(75,156,211,0.25)]",
        onOpen && "cursor-pointer",
        className
      )}
    >
      <motion.div
        aria-hidden
        style={{ background: glare }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-carolina">
            {project.tag}
          </span>
          {project.award && (
            <span className="shrink-0 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
              {project.award}
            </span>
          )}
        </div>
        <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.blurb}</p>
        <div className="mt-auto pt-6">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-xs text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
          {onOpen && (
            <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-carolina opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
              {project.cta ?? "Learn More"} <ArrowRight size={15} />
            </div>
          )}
        </div>
      </div>
      {project.glow && (
        <div
          className={cn(
            "pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100",
            project.glow === "blue" ? "bg-carolina/25" : "bg-purple-500/20"
          )}
        />
      )}
    </motion.article>
  );
}

const SIZE_CLASSES: Record<Project["size"], string> = {
  full: "md:col-span-6 min-h-[280px]",
  large: "md:col-span-4 min-h-[320px]",
  half: "md:col-span-3 min-h-[300px]",
  medium: "md:col-span-2 min-h-[300px]",
};

export default function BentoGrid({ items }: { items: Project[] }) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const modalItems = items.filter((p) => p.modal);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
        {items.map((project, i) => {
          const onOpen = project.modal
            ? () => setActiveIndex(modalItems.indexOf(project))
            : project.href
              ? () => router.push(project.href!)
              : undefined;
          return (
            <KineticCard
              key={project.id}
              project={project}
              speed={PARALLAX_SPEEDS[i % PARALLAX_SPEEDS.length]}
              onOpen={onOpen}
              className={SIZE_CLASSES[project.size]}
            />
          );
        })}
      </div>
      {modalItems.length > 0 && (
        <ProjectModal
          items={modalItems}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </>
  );
}
