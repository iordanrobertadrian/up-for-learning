import { BookOpen, Heart, Tent } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants/navigation";
import {
  educationalCamps,
  thematicTrips,
  tripsClosing,
  tripsIntro,
} from "@/constants/content";
import { cn } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import type { CategoryItem } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Excursii tematice și tabere",
  path: ROUTES.trips,
  description:
    "Excursii tematice și tabere educaționale Up for Learning. Învățăm dincolo de clasă, prin aventură, curiozitate și prietenie: natură, cultură, știință și creativitate.",
});

export default function TripsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Acasă", path: ROUTES.home },
          { name: "Excursii tematice și tabere", path: ROUTES.trips },
        ])}
      />

      <section className="overflow-hidden bg-[#f9f8f2] pb-6 pt-12 sm:pt-16">
        <div className="mx-auto grid w-full max-w-[1320px] items-center gap-8 px-5 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div className="max-w-xl">
            <Reveal>
              <h1 className="font-display text-4xl font-bold leading-[1.08] sm:text-5xl">
                <span className="text-brand-600">Excursii tematice </span>
                <span className="text-gold-600">și tabere educaționale</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
                {tripsIntro.subtitle}
              </p>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.1}>
            <Image
              src="/images/trips/hero-v2.jpg"
              alt="Copii cu ghiozdane într-o excursie educațională, pe o potecă spre munte"
              width={1400}
              height={840}
              priority
              sizes="(max-width: 1024px) 92vw, 600px"
              className="h-auto w-full"
            />
          </Reveal>
        </div>
      </section>

      <Section tone="cream" size="wide" className="pt-12">
        <SectionLabel icon={BookOpen} tone="brand">
          Excursii tematice
        </SectionLabel>
        <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {thematicTrips.map((item) => (
            <StaggerItem key={item.slug} className="h-full">
              <CategoryCard item={item} tone="brand" />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section tone="beige" size="wide">
        <SectionLabel icon={Tent} tone="gold">
          Tabere educaționale
        </SectionLabel>
        <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {educationalCamps.map((item) => (
            <StaggerItem key={item.slug} className="h-full">
              <CategoryCard item={item} tone="gold" />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <section className="bg-cream py-16 text-center">
        <Reveal className="mx-auto flex max-w-3xl items-center justify-center gap-4 px-5 sm:px-6">
          <Heart
            className="hidden h-6 w-6 shrink-0 text-gold-400 sm:block"
            aria-hidden="true"
          />
          <p className="font-display text-xl font-semibold text-brand-700 sm:text-2xl">
            {tripsClosing}
          </p>
          <Heart
            className="hidden h-6 w-6 shrink-0 text-brand-400 sm:block"
            aria-hidden="true"
          />
        </Reveal>
      </section>
    </>
  );
}

function SectionLabel({
  icon: Icon,
  tone,
  children,
}: {
  icon: typeof BookOpen;
  tone: "brand" | "gold";
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full py-2 pl-2 pr-5 text-sm font-bold uppercase tracking-wide text-cream",
        tone === "gold" ? "bg-gold-400 text-brand-900" : "bg-brand-600",
      )}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/25">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      {children}
    </span>
  );
}

function CategoryCard({
  item,
  tone,
}: {
  item: CategoryItem;
  tone: "brand" | "gold";
}) {
  const Icon = item.icon;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center gap-3 p-5">
        <Icon
          className={cn(
            "h-6 w-6 shrink-0",
            tone === "gold" ? "text-gold-500" : "text-brand-600",
          )}
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <h3 className="font-semibold text-ink">{item.title}</h3>
      </div>
    </article>
  );
}
