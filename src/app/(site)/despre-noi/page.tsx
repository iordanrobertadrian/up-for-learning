import { Star } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import { ValueCard } from "@/components/cards/value-card";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants/navigation";
import { aboutIntro, values } from "@/constants/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Despre noi",
  path: ROUTES.about,
  description:
    "Un proces educațional clar, construit cu grijă. La Up for Learning, curiozitatea devine punctul de plecare, iar progresul se dezvoltă prin claritate, consecvență și încredere.",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Acasă", path: ROUTES.home },
          { name: "Despre noi", path: ROUTES.about },
        ])}
      />

      <section className="overflow-hidden bg-[#fdfbf6] pb-8 pt-12 sm:pt-16">
        <div className="mx-auto grid w-full max-w-[1320px] items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div className="max-w-xl">
            <Reveal>
              <span className="eyebrow">
                <Star
                  className="h-4 w-4 fill-gold-400 text-gold-400"
                  aria-hidden="true"
                />
                {aboutIntro.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] sm:text-5xl">
                <span className="text-brand-600">Un proces educațional </span>
                <span className="text-gold-600">clar, construit cu grijă</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft sm:text-lg">
                {aboutIntro.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.1}>
            <Image
              src="/images/about/about-hero-v2.jpg"
              alt="Profesoară îndrumând trei copii la o lecție Up for Learning, cu manuale de Matematică, Limba română și English"
              width={1400}
              height={933}
              priority
              sizes="(max-width: 1024px) 92vw, 620px"
              className="h-auto w-full"
            />
          </Reveal>
        </div>
      </section>

      <Section tone="cream" size="wide" className="pt-8">
        <StaggerGroup className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <StaggerItem key={value.title} className="h-full">
              <ValueCard value={value} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>
    </>
  );
}
