"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { siteConfig } from "@/config/site";

type Slide = {
  type: "logo" | "photo";
  src: string;
  alt: string;
  /**
   * object-position pentru cadrul pătrat. Pozele au formate diferite, deci
   * fiecare e ancorată acolo unde stă esențialul: afișul, peretele cu cuvinte,
   * biblioteca. Fără asta, decupajul din centru ar tăia exact subiectul.
   */
  position?: string;
};

const slides: Slide[] = [
  {
    type: "logo",
    src: "/brand/logo-v3.png",
    alt: `${siteConfig.name} — ${siteConfig.tagline}`,
  },
  {
    type: "photo",
    src: "/images/hero/slide-01-logo-perete.jpg",
    alt: "Holul centrului Up for Learning, cu logo-ul înrămat pe perete și intrarea către sălile de curs",
    position: "25% 50%",
  },
  {
    type: "photo",
    src: "/images/hero/slide-02-perete-magic.jpg",
    alt: "Perete pictat cu mesajul „You can find magic wherever you look” și o sală de curs luminoasă în plan secund",
    position: "20% 50%",
  },
  {
    type: "photo",
    src: "/images/hero/slide-03-sala-scrabble.jpg",
    alt: "Sală de curs cu mese așezate în formă de U și peretele decorat cu piese tip scrabble",
    position: "50% 50%",
  },
  {
    type: "photo",
    src: "/images/hero/slide-04-clasa-puzzle.jpg",
    alt: "Sală de grup mic, cu tablă interactivă și un panou decorativ în formă de puzzle",
    position: "45% 50%",
  },
  {
    type: "photo",
    src: "/images/hero/slide-05-sala-tv.jpg",
    alt: "Sala mare de curs, cu mese din lemn, ecran interactiv și bibliotecă cu cărți",
    position: "65% 50%",
  },
  {
    type: "photo",
    src: "/images/hero/slide-06-hol.jpg",
    alt: "Holul de la intrare, cu logo-ul Up for Learning înrămat pe perete",
    position: "55% 50%",
  },
  {
    type: "photo",
    src: "/images/hero/slide-07-birou.jpg",
    alt: "Spațiu de studiu individual, cu birou și rafturi",
    position: "50% 50%",
  },
];

const INTERVAL = 4200;

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
    <div className="w-full">
      {/* Cadru pătrat identic pentru toate slide-urile: formatul care pierde
          cel mai puțin dintr-un set cu poze verticale și orizontale la un loc. */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-[#faf5ef] shadow-soft ring-1 ring-sage/40">
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, ease: "easeInOut" }}
          >
            {active.type === "logo" ? (
              <div className="flex h-full w-full items-center justify-center p-8 sm:p-10">
                <Image
                  src={active.src}
                  alt={active.alt}
                  width={1200}
                  height={1200}
                  priority
                  sizes="(max-width: 1024px) 92vw, 620px"
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 620px"
                style={{ objectPosition: active.position }}
                className="object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-center gap-1">
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
                  ? "h-2 w-6 rounded-full bg-brand-600 transition-all"
                  : "h-2 w-2 rounded-full bg-brand-600/25 transition-all hover:bg-brand-600/50"
              }
            />
          </button>
        ))}
      </div>
    </div>
  );
}
