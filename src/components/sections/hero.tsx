import { BookOpen, Star, UserPlus } from "lucide-react";

import { HeroSlideshow } from "@/components/sections/hero-slideshow";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/navigation";
import { heroCopy } from "@/constants/content";

export function Hero() {
  return (
    <section className="overflow-hidden bg-[#faf5ef] pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24">
      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <div className="max-w-xl">
          <Reveal direction="up" eager>
            <span className="eyebrow">
              <Star
                className="h-4 w-4 fill-gold-400 text-gold-400"
                aria-hidden="true"
              />
              {heroCopy.eyebrow}
            </span>
          </Reveal>

          <Reveal direction="up" delay={0.05} eager>
            <h1 className="mt-4 font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-brand-600">Up</span>{" "}
              <span className="text-gold-600">for Learning</span>
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.1} eager>
            <p className="mt-3 font-display text-2xl font-semibold text-brand-500 sm:text-3xl">
              {heroCopy.subtitle}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.15} eager>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-soft sm:text-lg">
              {heroCopy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2} eager>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={ROUTES.programs} size="lg">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
                Descoperă programele
              </Button>
              <Button href={ROUTES.enroll} variant="outline" size="lg">
                <UserPlus className="h-5 w-5" aria-hidden="true" />
                Înscrie-te
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.15} eager>
          <HeroSlideshow />
        </Reveal>
      </div>
    </section>
  );
}
