import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants/navigation";
import { galleryImages, galleryIntro } from "@/constants/content";

export function Gallery() {
  return (
    <Section id="galerie" tone="beige" size="wide">
      <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.5fr] lg:gap-14">
        <Reveal direction="right">
          <h2 className="text-3xl font-bold uppercase tracking-tight text-brand-700 sm:text-4xl">
            {galleryIntro.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {galleryIntro.paragraph}
          </p>
          <Button href={ROUTES.trips} variant="outline" className="mt-7">
            Vezi galeria
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </Reveal>

        <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-5">
          {galleryImages.map((image) => (
            <StaggerItem key={image.src}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-card ring-1 ring-black/5">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 220px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}
