"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { siteConfig } from "@/config/site";

type Slide =
  | { type: "logo"; src: string; alt: string }
  | { type: "photo"; src: string; alt: string };

const slides: Slide[] = [
  {
    type: "logo",
    src: "/brand/logo.png",
    alt: `${siteConfig.name} — ${siteConfig.tagline}`,
  },
  {
    type: "photo",
    src: "/images/hero/slide-1.jpg",
    alt: "Rincón de lectura — colțul de lectură cu bibliotecă și bancă",
  },
  {
    type: "photo",
    src: "/images/hero/slide-2.jpg",
    alt: "Sală de clasă luminoasă, cu bănci din lemn și tablă interactivă",
  },
  {
    type: "photo",
    src: "/images/hero/slide-3.jpg",
    alt: "Sală de curs cu ferestre mari și mobilier natural",
  },
  {
    type: "photo",
    src: "/images/hero/slide-4.jpg",
    alt: "Spațiu de studiu individual, cu birou și rafturi",
  },
];

const INTERVAL = 3800;

export function HeroSlideshow() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((current) => (current + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(next, INTERVAL);
    return () => window.clearInterval(timer);
  }, [next]);

  const active = slides[index];

  if (!active) {
    return null;
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-[#faf5ef] shadow-soft ring-1 ring-sage/40">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.9, ease: "easeInOut" }}
        >
          {active.type === "logo" ? (
            <div className="flex h-full w-full items-center justify-center bg-[#faf5ef] p-6 sm:p-8">
              <Image
                src={active.src}
                alt={active.alt}
                width={1024}
                height={1024}
                priority
                sizes="(max-width: 1024px) 92vw, 640px"
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="(max-width: 1024px) 92vw, 640px"
              className="object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-1">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Afișează imaginea ${i + 1} din ${slides.length}`}
            aria-current={i === index ? "true" : undefined}
            className="flex h-6 w-6 items-center justify-center"
          >
            <span
              className={
                i === index
                  ? "h-2 w-6 rounded-full bg-cream shadow-soft transition-all"
                  : "h-2 w-2 rounded-full bg-cream/70 transition-all hover:bg-cream/95"
              }
            />
          </button>
        ))}
      </div>
    </div>
  );
}
