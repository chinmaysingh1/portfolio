"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { albums, type Album } from "@/lib/gallery-data";

const PARALLAX_SPEEDS = [40, 90, 60, 110, 50];

function AlbumCard({
  album,
  speed,
  onOpen,
}: {
  album: Album;
  speed: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const y = useSpring(rawY, { stiffness: 90, damping: 22, mass: 0.6 });
  const opacity = useTransform(scrollYProgress, [0, 0.12, 1], [0, 1, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      onClick={onOpen}
      className="group relative cursor-pointer"
    >
      {/* Photo-stack layers that fan out on hover */}
      <div className="absolute inset-0 translate-x-2 translate-y-2 rotate-2 rounded-2xl border border-white/[0.05] bg-white/[0.04] transition-transform duration-300 group-hover:translate-x-3.5 group-hover:translate-y-3.5 group-hover:rotate-[4deg]" />
      <div className="absolute inset-0 translate-x-1 translate-y-1 rotate-1 rounded-2xl border border-white/[0.05] bg-white/[0.07] transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:rotate-2" />

      <div className="relative z-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-surface transition-[transform,border-color,box-shadow] duration-300 group-hover:-translate-y-1.5 group-hover:border-carolina/50 group-hover:shadow-[0_24px_60px_-24px_rgba(75,156,211,0.3)]">
        <div className="relative h-60 w-full bg-charcoal">
          <span className="absolute right-3.5 top-3.5 z-10 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur">
            {album.photos.length} Photos
          </span>
          <Image
            src={album.cover}
            alt={album.title}
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            className={cn(
              "transition-transform duration-500 group-hover:scale-[1.04]",
              album.coverFit === "contain" ? "object-contain p-7" : "object-cover object-top"
            )}
          />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold tracking-tight">{album.title}</h3>
          <p className="mt-1 text-sm text-muted">{album.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function GalleryClient() {
  const [albumIndex, setAlbumIndex] = useState<number | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const album = albumIndex !== null ? albums[albumIndex] : null;

  const openAlbum = useCallback((index: number) => {
    setAlbumIndex(index);
    setPhotoIndex(0);
    setDirection(0);
  }, []);

  // Deep-link support: /gallery#kairs opens that album, matching the old site
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const index = albums.findIndex((a) => a.id === hash);
    if (index !== -1) openAlbum(index);
  }, [openAlbum]);

  const step = useCallback(
    (delta: number) => {
      if (albumIndex === null) return;
      const count = albums[albumIndex].photos.length;
      setDirection(delta);
      setPhotoIndex((i) => (i + delta + count) % count);
    },
    [albumIndex]
  );

  const close = useCallback(() => setAlbumIndex(null), []);

  useEffect(() => {
    if (album === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [album, step, close]);

  const photo = album?.photos[photoIndex];

  return (
    <>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((a, i) => (
          <AlbumCard
            key={a.id}
            album={a}
            speed={PARALLAX_SPEEDS[i % PARALLAX_SPEEDS.length]}
            onOpen={() => openAlbum(i)}
          />
        ))}
      </div>

      <AnimatePresence>
        {album && photo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-lg"
            onClick={close}
          >
            <button
              aria-label="Close"
              onClick={close}
              className="absolute right-5 top-5 z-10 rounded-full border border-white/10 bg-surface p-2.5 text-white/70 transition hover:border-carolina/60 hover:text-white"
            >
              <X size={18} />
            </button>

            <button
              aria-label="Previous Photo"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-surface/80 p-3 text-white/70 backdrop-blur transition hover:border-carolina/60 hover:text-white"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              aria-label="Next Photo"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-surface/80 p-3 text-white/70 backdrop-blur transition hover:border-carolina/60 hover:text-white"
            >
              <ChevronRight size={22} />
            </button>

            <div
              className="flex w-full max-w-4xl flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[68vh] w-full overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={`${album.id}-${photoIndex}`}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 60, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: direction * -60, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.caption}
                      fill
                      sizes="(max-width: 1024px) 100vw, 896px"
                      className="rounded-xl object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <motion.p
                key={`caption-${album.id}-${photoIndex}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mt-5 max-w-2xl text-center text-sm leading-relaxed text-white/85"
              >
                {photo.caption}
              </motion.p>
              <div className="mt-2 text-xs font-medium text-muted">
                {photoIndex + 1} / {album.photos.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
