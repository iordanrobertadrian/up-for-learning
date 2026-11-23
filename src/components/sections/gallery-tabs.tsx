"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Ghost, Gift, Sparkles, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";

import { VideoReels } from "@/components/sections/video-reels";
import { cn } from "@/lib/utils";
import type { GalleryCategory, GalleryImage } from "@/types";

const ICONS: Record<GalleryCategory["icon"], LucideIcon> = {
  activities: Sparkles,
  halloween: Ghost,
  christmas: Gift,
};

/**
 * Galeria pe categorii: un singur loc pentru toate momentele, cu taburi pe
 * evenimente. Clipurile din taburile ascunse nu se încarcă și nu rulează.
 */
export function GalleryTabs({ categories }: { categories: GalleryCategory[] }) {
  const visible = categories.filter(
    (category) => category.videos.length > 0 || category.images.length > 0,
  );
  const [activeId, setActiveId] = useState(visible[0]?.id);
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const active = visible.find((category) => category.id === activeId) ?? visible[0];
  if (!active) return null;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = visible.findIndex((category) => category.id === active.id);
    const step =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (current + step + visible.length) % visible.length;
    setActiveId(visible[next]?.id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      {visible.length > 1 ? (
        <div
          role="tablist"
          aria-label="Categorii galerie"
          onKeyDown={onKeyDown}
          className="mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full bg-white p-1.5 shadow-card ring-1 ring-black/5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {visible.map((category, index) => {
            const Icon = ICONS[category.icon];
            const selected = category.id === active.id;
            return (
              <button
                key={category.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${category.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(category.id)}
                className={cn(
                  "relative inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 sm:px-6",
                  selected ? "text-cream" : "text-brand-700 hover:bg-brand-50",
                )}
              >
                {selected ? (
                  <motion.span
                    layoutId={`${baseId}-pill`}
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-brand-700"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 34 }
                    }
                  />
                ) : null}
                <Icon className="relative h-4 w-4" aria-hidden="true" />
                <span className="relative">{category.label}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active.id}
          id={`${baseId}-panel`}
          role={visible.length > 1 ? "tabpanel" : undefined}
          aria-labelledby={
            visible.length > 1 ? `${baseId}-tab-${active.id}` : undefined
          }
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mt-10"
        >
          <CategoryPanel category={active} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function CategoryPanel({ category }: { category: GalleryCategory }) {
  const { videos, images } = category;

  // Doar clipuri: peretele de clipuri.
  if (images.length === 0) return <VideoReels videos={videos} />;

  // Doar fotografii: grilă simplă.
  if (videos.length === 0) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {images.map((image) => (
          <Photo key={image.src} image={image} className="aspect-[3/2]" />
        ))}
      </div>
    );
  }

  // Eveniment cu clip + fotografii: clipul în stânga, fotografiile în mozaic.
  const [lead, ...rest] = images;
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-6">
      <VideoReels videos={videos} layout="single" />
      <div className="grid grid-cols-2 gap-4 lg:auto-rows-fr lg:gap-6">
        {lead ? (
          <Photo
            image={lead}
            className="col-span-2 aspect-[3/2] lg:row-span-2 lg:aspect-auto"
          />
        ) : null}
        {rest.map((image, index) => (
          <Photo
            key={image.src}
            image={image}
            className={cn(
              "aspect-[4/3] lg:aspect-auto",
              rest.length % 2 === 1 && index === rest.length - 1 && "col-span-2",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function Photo({
  image,
  className,
  priority = false,
}: {
  image: GalleryImage;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-brand-50 shadow-card ring-1 ring-black/5",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 92vw, 600px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
}
