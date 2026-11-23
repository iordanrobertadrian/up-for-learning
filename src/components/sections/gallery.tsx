import { Reveal } from "@/components/motion/reveal";
import { GalleryTabs } from "@/components/sections/gallery-tabs";
import { Section } from "@/components/ui/section";
import { galleryCategories, galleryIntro } from "@/constants/content";

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

      <Reveal className="mt-10">
        <GalleryTabs categories={galleryCategories} />
      </Reveal>
    </Section>
  );
}
