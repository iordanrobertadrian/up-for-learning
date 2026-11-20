import { Ghost } from "lucide-react";
import Image from "next/image";

import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { VideoReels } from "@/components/sections/video-reels";
import { Section } from "@/components/ui/section";
import {
  galleryIntro,
  galleryVideos,
  halloweenGallery,
} from "@/constants/content";

export function Gallery() {
  return (
    <Section id="galerie" tone="beige" size="wide">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold uppercase tracking-tight text-brand-700 sm:text-4xl">
          {galleryIntro.title}
        </h2>
        <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
          {galleryIntro.paragraph}
        </p>
      </Reveal>

      <Reveal className="mt-12">
        <VideoReels videos={galleryVideos} />
      </Reveal>

      <Reveal className="mt-16 flex items-center justify-center gap-3">
        <Ghost className="h-6 w-6 text-gold-500" aria-hidden="true" />
        <h3 className="font-display text-2xl font-bold text-brand-700">
          {halloweenGallery.title}
        </h3>
      </Reveal>

      <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-3 lg:gap-6">
        {halloweenGallery.images.map((image) => (
          <StaggerItem key={image.src}>
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-card ring-1 ring-black/5">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1280px) 31vw, 400px"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
