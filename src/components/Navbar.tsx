"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Projects", href: "/#work", section: "work" },
  { label: "Education", href: "/#education", section: "education" },
  { label: "Experience", href: "/#experience", section: "experience" },
  { label: "Awards", href: "/#honors", section: "honors" },
  { label: "Hobby", href: "/hardware" },
  { label: "Gallery", href: "/gallery" },
];

const SPY_SECTIONS = ["about", "work", "education", "experience", "honors", "contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: highlight the nav link for the section currently in view.
  useEffect(() => {
    if (pathname !== "/") {
      setSection("");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setSection(entry.target.id);
        }
      },
      // A narrow band around the upper-middle of the viewport decides the
      // active section, so exactly one section "wins" at a time.
      { rootMargin: "-35% 0px -60% 0px" }
    );
    for (const id of SPY_SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-white/[0.06] bg-charcoal/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-carolina transition hover:opacity-80"
        >
          CS.
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => {
            const active = l.section
              ? pathname === "/" && section === l.section
              : l.href === pathname;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "relative text-sm font-medium transition",
                    active ? "text-carolina" : "text-white/70 hover:text-white"
                  )}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1.5 left-0 h-px w-full bg-carolina"
                    />
                  )}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/#contact"
              className={cn(
                "rounded-full bg-carolina px-5 py-2 text-sm font-semibold text-charcoal transition hover:bg-carolina/85 hover:shadow-[0_0_24px_-6px_rgba(75,156,211,0.8)]",
                pathname === "/" &&
                  section === "contact" &&
                  "shadow-[0_0_24px_-6px_rgba(75,156,211,0.8)]"
              )}
            >
              Contact
            </Link>
          </li>
        </ul>

        <button
          aria-label="Toggle Menu"
          onClick={() => setOpen(!open)}
          className="text-white/80 md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/[0.04] bg-charcoal/95 backdrop-blur-xl md:hidden"
          >
            {[...links, { label: "Contact", href: "/#contact" }].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-4 text-sm font-medium text-white/80 hover:bg-white/[0.03]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
