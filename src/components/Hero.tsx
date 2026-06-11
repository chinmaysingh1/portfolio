"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { heroStats } from "@/lib/data";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Text and portrait drift apart at different rates as the hero scrolls away
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center gap-14 overflow-x-clip px-6 pb-20 pt-36 md:flex-row md:gap-10"
    >
      {/* Aurora orbs drifting behind the hero, rising slower than the text */}
      <motion.div
        aria-hidden
        style={{ y: visualY }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-20 left-[10%] h-72 w-72 rounded-full bg-carolina/15 blur-[100px]" />
        <div className="absolute right-[5%] top-1/3 h-80 w-80 rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-carolina/10 blur-[110px]" />
      </motion.div>
      <motion.div style={{ y: textY, opacity }} className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] font-semibold uppercase tracking-[0.22em] text-carolina"
        >
          Biomedical Engineer • Entrepreneur • Researcher • Leader • Mentor
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 bg-gradient-to-br from-white via-white to-carolina bg-clip-text pb-2 text-5xl font-extrabold leading-[1.08] tracking-tighter text-transparent md:text-6xl"
        >
          Bridging the gap between biology and technology.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
        >
          I&apos;m Chinmay. I build medical devices, engineer organisms, and develop
          startup ventures. Currently scaling KAIRS and researching at UNC Chapel Hill.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-10"
        >
          {heroStats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold tracking-tight text-white">
                {s.num}
              </div>
              <div className="mt-1 max-w-[160px] text-xs font-medium uppercase tracking-wider text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: visualY, opacity }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex flex-col items-center gap-8"
      >
        <div className="relative">
          <div className="absolute -inset-3 rounded-full border border-carolina/30 [mask-image:linear-gradient(to_bottom_right,black,transparent_70%)] animate-spin-slow" />
          <div className="relative h-72 w-72 overflow-hidden rounded-full border border-white/[0.08] md:h-80 md:w-80">
            <Image
              src="/assets/ChinmayHeadshot.webp"
              alt="Chinmay Singh"
              fill
              priority
              sizes="320px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex gap-4">
          {[
            { href: "mailto:Chinmay.Singh@unc.edu", label: "Email", Icon: Mail },
            {
              href: "https://www.linkedin.com/in/chinmayksingh/",
              label: "LinkedIn",
              Icon: LinkedinIcon,
            },
            {
              href: "https://github.com/chinmaysingh1",
              label: "GitHub",
              Icon: GithubIcon,
            },
          ].map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="rounded-full border border-white/[0.08] bg-surface p-3.5 text-white/70 transition duration-300 hover:-translate-y-1.5 hover:border-carolina/60 hover:text-carolina hover:shadow-[0_12px_24px_-10px_rgba(75,156,211,0.45)]"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
