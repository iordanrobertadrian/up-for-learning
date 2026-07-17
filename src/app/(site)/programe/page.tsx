import { CalendarCheck } from "lucide-react";
import type { Metadata } from "next";

import { CourseCard } from "@/components/cards/course-card";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import {
  JsonLd,
  breadcrumbSchema,
  courseSchema,
} from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconCircle } from "@/components/ui/icon-circle";
import { Section } from "@/components/ui/section";
import { Blob, DotGrid } from "@/components/ui/decorations";
import { ROUTES } from "@/constants/navigation";
import {
  courses,
  programFeatures,
  programHighlights,
  programsClosing,
  programsIntro,
} from "@/constants/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Programe și ateliere",
  path: ROUTES.programs,
  description:
    "Programe educaționale structurate: Limba română, Matematică, Limba engleză, Evaluări Naționale și ateliere de dezvoltare. Clasele I – VIII, grupe mici, progres măsurabil.",
});

export default function ProgramsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Acasă", path: ROUTES.home },
          { name: "Programe și ateliere", path: ROUTES.programs },
        ])}
      />
      {courses.map((course) => (
        <JsonLd
          key={course.slug}
          data={courseSchema({
            name: course.name,
            description: course.description,
          })}
        />
      ))}

      <section className="relative overflow-hidden bg-hero-fade pb-4 pt-12 sm:pt-16">
        <Blob className="-right-24 top-0 h-80 w-80" color="gold" />
        <Blob className="-left-24 top-10 h-72 w-72" color="sage" />
        <DotGrid className="right-10 top-16 hidden lg:block" />
        <Reveal className="mx-auto max-w-2xl px-5 text-center sm:px-6">
          <h1 className="font-display text-5xl font-bold uppercase tracking-tight text-brand-600 sm:text-6xl">
            {programsIntro.title}
          </h1>
          <span
            aria-hidden="true"
            className="mx-auto mt-4 block h-1 w-24 rounded-full bg-gold-400"
          />
          <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
            {programsIntro.subtitle}
          </p>
        </Reveal>
      </section>

      <Section tone="cream" size="wide" className="pt-14">
        <StaggerGroup className="grid gap-7 md:grid-cols-3">
          {courses.map((course) => (
            <StaggerItem key={course.slug} className="h-full">
              <CourseCard course={course} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <StaggerGroup className="mt-8 grid gap-7 lg:grid-cols-2">
          {programHighlights.map((item) => (
            <StaggerItem key={item.slug} className="h-full">
              <div className="flex h-full flex-col gap-5 rounded-3xl bg-white p-7 shadow-card ring-1 ring-black/[0.03] sm:flex-row sm:items-center">
                <IconCircle
                  icon={item.icon}
                  accent={item.accent}
                  size="lg"
                  className="rounded-full"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-bold uppercase tracking-tight text-brand-700">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-gold-600">
                    {item.tags}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {item.description}
                  </p>
                </div>
                <Badge
                  tone={item.accent === "gold" ? "gold" : "sage"}
                  className="self-start whitespace-nowrap sm:self-center"
                >
                  {item.badge}
                </Badge>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-8 rounded-3xl bg-beige-light p-8 ring-1 ring-black/[0.03]">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-sage/70">
            {programFeatures.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-4 lg:px-6 lg:first:pl-0 lg:last:pr-0"
              >
                <IconCircle icon={feature.icon} accent="brand" />
                <div>
                  <p className="font-bold text-ink">{feature.title}</p>
                  <p className="mt-0.5 text-sm text-ink-soft">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <section className="bg-cream pb-20 text-center">
        <Reveal className="mx-auto max-w-2xl px-5 sm:px-6">
          <p className="font-display text-xl font-semibold text-brand-700 sm:text-2xl">
            {programsClosing}
          </p>
          <Button href={ROUTES.enroll} size="lg" className="mt-8">
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            Programează o vizită
          </Button>
        </Reveal>
      </section>
    </>
  );
}
