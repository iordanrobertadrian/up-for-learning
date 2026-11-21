"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";
import type { GalleryVideo } from "@/types";

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

/**
 * Clipurile rulează ca un „perete viu”: fără controale, fără sunet, în buclă,
 * doar cât sunt pe ecran. Click pe unul deschide vizualizarea tip stories,
 * cu sunet, bare de progres și trecere automată la următorul clip.
 */
export function VideoReels({ videos }: { videos: GalleryVideo[] }) {
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="group/reels -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-6 [&::-webkit-scrollbar]:hidden">
        {videos.map((video, index) => (
          <div
            key={video.src}
            className="w-[64%] shrink-0 snap-center sm:w-auto"
          >
            <ReelCard
              video={video}
              ambient={!reduceMotion}
              suspended={openIndex !== null}
              onOpen={() => setOpenIndex(index)}
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null ? (
          <StoryViewer
            videos={videos}
            index={openIndex}
            onIndexChange={setOpenIndex}
            onClose={() => setOpenIndex(null)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

function ReelCard({
  video,
  ambient,
  suspended,
  onOpen,
}: {
  video: GalleryVideo;
  ambient: boolean;
  suspended: boolean;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [playing, setPlaying] = useState(false);

  // Pornește doar când cardul e vizibil și se oprește când iese din ecran,
  // ca să nu consume date și baterie degeaba.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (!ambient || suspended) {
      el.pause();
      return;
    }
    if ((navigator as NavigatorWithConnection).connection?.saveData) return;

    el.muted = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ambient, suspended]);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const tick = () => {
      const el = videoRef.current;
      const bar = barRef.current;
      if (el && bar && el.duration) {
        bar.style.transform = `scaleX(${el.currentTime / el.duration})`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Redă clipul „${video.title}” cu sunet`}
      className="group/card relative block aspect-[9/16] w-full overflow-hidden rounded-[1.75rem] bg-brand-900 shadow-card ring-1 ring-black/5 transition-all duration-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-300 lg:hover:-translate-y-1.5 lg:hover:shadow-lift lg:group-hover/reels:opacity-60 lg:hover:!opacity-100"
    >
      <video
        ref={videoRef}
        src={video.src}
        poster={video.poster}
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
        aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-105"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
      />

      <span
        aria-hidden="true"
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white ring-1 ring-white/20 backdrop-blur-md"
      >
        <VolumeX className="h-4 w-4" />
      </span>

      <AnimatePresence>
        {!playing ? (
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/25 text-white ring-1 ring-white/40 backdrop-blur-md">
              <Play className="ml-0.5 h-6 w-6 fill-white" />
            </span>
          </motion.span>
        ) : null}
      </AnimatePresence>

      <span className="absolute inset-x-4 bottom-4 text-left">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/30 backdrop-blur-md transition-colors group-hover/card:bg-white group-hover/card:text-brand-800">
          <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
          Vezi cu sunet
        </span>
        <span
          aria-hidden="true"
          className="mt-3 block h-[3px] overflow-hidden rounded-full bg-white/25"
        >
          <span
            ref={barRef}
            className="block h-full origin-left scale-x-0 rounded-full bg-gold-300"
          />
        </span>
      </span>
    </button>
  );
}

function StoryViewer({
  videos,
  index,
  onIndexChange,
  onClose,
}: {
  videos: GalleryVideo[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tapLayerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const video = videos[index];
  const isFirst = index === 0;
  const isLast = index === videos.length - 1;

  const next = useCallback(() => {
    if (isLast) {
      onClose();
      return;
    }
    setPaused(false);
    onIndexChange(index + 1);
  }, [index, isLast, onClose, onIndexChange]);

  const prev = useCallback(() => {
    setPaused(false);
    if (isFirst) {
      const el = videoRef.current;
      if (el) el.currentTime = 0;
      return;
    }
    onIndexChange(index - 1);
  }, [index, isFirst, onIndexChange]);

  const togglePause = useCallback(() => setPaused((value) => !value), []);

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight") next();
      else if (event.key === "ArrowLeft") prev();
      else if (event.key === " ") {
        event.preventDefault();
        togglePause();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onClose, togglePause]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted, index]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (paused) {
      el.pause();
      return;
    }
    el.play().catch(() => {
      // Browserul a refuzat redarea cu sunet: pornim fără sunet.
      el.muted = true;
      setMuted(true);
      el.play().catch(() => {});
    });
  }, [paused, index]);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const el = videoRef.current;
      const bar = barRefs.current[index];
      if (el && bar && el.duration) {
        bar.style.transform = `scaleX(${el.currentTime / el.duration})`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [index]);

  const onTap = (event: MouseEvent | TouchEvent | PointerEvent) => {
    const layer = tapLayerRef.current;
    if (!layer) return;
    const rect = layer.getBoundingClientRect();
    const x =
      "clientX" in event
        ? event.clientX
        : (event.changedTouches[0]?.clientX ?? rect.left + rect.width / 2);
    const ratio = (x - rect.left) / rect.width;
    if (ratio < 0.3) prev();
    else if (ratio > 0.7) next();
    else togglePause();
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.y) > 120) onClose();
  };

  if (!video) return null;

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Clip video: ${video.title}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-xl"
    >
      <NavButton
        label="Clipul anterior"
        disabled={isFirst}
        onClick={prev}
        className="left-6"
      >
        <ChevronLeft className="h-6 w-6" />
      </NavButton>

      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.5}
        onDragEnd={onDragEnd}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        onClick={(event) => event.stopPropagation()}
        className="relative h-dvh w-full overflow-hidden bg-black sm:aspect-[9/16] sm:h-[min(90dvh,880px)] sm:w-auto sm:rounded-[2rem] sm:shadow-2xl sm:ring-1 sm:ring-white/10"
      >
        <video
          key={video.src}
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          muted={muted}
          playsInline
          preload="auto"
          onEnded={next}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div
          ref={tapLayerRef}
          aria-hidden="true"
          className="absolute inset-0"
        >
          <motion.div className="h-full w-full" onTap={onTap} />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute inset-x-3 top-3 flex gap-1.5" aria-hidden="true">
          {videos.map((item, i) => (
            <span
              key={item.src}
              className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30"
            >
              <span
                ref={(node) => {
                  barRefs.current[i] = node;
                }}
                style={{
                  transform:
                    i < index ? "scaleX(1)" : i > index ? "scaleX(0)" : undefined,
                }}
                className="block h-full origin-left rounded-full bg-white"
              />
            </span>
          ))}
        </div>

        <div className="absolute inset-x-4 top-7 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-white">
            Up for Learning
            <span className="ml-2 font-normal text-white/70">
              {index + 1} / {videos.length}
            </span>
          </p>
          <div className="flex gap-2">
            <IconButton
              label={muted ? "Pornește sunetul" : "Oprește sunetul"}
              onClick={() => setMuted((value) => !value)}
            >
              {muted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </IconButton>
            <IconButton label="Închide" onClick={onClose} buttonRef={closeRef}>
              <X className="h-5 w-5" />
            </IconButton>
          </div>
        </div>

        <AnimatePresence>
          {paused ? (
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/40 backdrop-blur-md">
                <Play className="ml-1 h-9 w-9 fill-white" />
              </span>
            </motion.span>
          ) : null}
        </AnimatePresence>

      </motion.div>

      <NavButton
        label={isLast ? "Închide" : "Clipul următor"}
        onClick={next}
        className="right-6"
      >
        <ChevronRight className="h-6 w-6" />
      </NavButton>
    </motion.div>,
    document.body,
  );
}

function IconButton({
  label,
  onClick,
  buttonRef,
  children,
}: {
  label: string;
  onClick: () => void;
  buttonRef?: React.Ref<HTMLButtonElement>;
  children: React.ReactNode;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      {children}
    </button>
  );
}

function NavButton({
  label,
  onClick,
  disabled,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={cn(
        "absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-white/25 disabled:opacity-30 md:flex",
        className,
      )}
    >
      {children}
    </button>
  );
}
