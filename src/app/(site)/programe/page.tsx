import { CalendarCheck, PartyPopper, Plus } from "lucide-react";
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
  enrollmentPromo,
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
    "Înscrieri deschise în Voluntari, Ilfov: Limba română, Matematică, Clubul de după ore, Limba engleză cu pregătire Cambridge, Limba germană și Limba franceză (clasele P – XII), Evaluări Naționale, simulări cu feedback individual și ateliere de dezvoltare.",
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
            price: course.price,
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
        <Reveal className="relative mb-12 overflow-hidden rounded-3xl bg-brand-700 p-8 shadow-lift sm:p-10">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-gold-400/15 blur-3xl"
          />
          <div className="relative grid gap-9 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <Badge tone="gold">
                <PartyPopper className="h-3.5 w-3.5" aria-hidden="true" />
                {enrollmentPromo.badge}
              </Badge>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-cream sm:text-4xl">
                {enrollmentPromo.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-cream/85 sm:text-lg">
                {enrollmentPromo.subtitle}
              </p>
              <Button
                href={ROUTES.enroll}
                variant="gold"
                size="lg"
                className="mt-7"
              >
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                {enrollmentPromo.cta}
              </Button>
            </div>

            <ul className="space-y-4">
              {enrollmentPromo.discounts.map((discount) => (
                <li
                  key={discount.value}
                  className="flex items-center gap-5 rounded-2xl bg-white/[0.07] p-5 ring-1 ring-white/15"
                >
                  <span className="font-display text-3xl font-bold text-gold-300 sm:text-4xl">
                    {discount.value}
                  </span>
                  <span className="text-sm leading-relaxed text-cream/90 sm:text-base">
                    {discount.description}
                  </span>
                </li>
              ))}
              <li className="flex items-center gap-2 pl-1 text-sm font-semibold text-gold-200">
                <Plus className="h-4 w-4" aria-hidden="true" />
                {enrollmentPromo.note}
              </li>
            </ul>
          </div>
        </Reveal>

        <StaggerGroup className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
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
                  {item.grades || item.price ? (
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                      {item.grades ? (
                        <span className="inline-flex rounded-full bg-sage px-3 py-1 text-xs font-semibold text-brand-700">
                          {item.grades}
                        </span>
                      ) : null}
                      {item.price ? (
                        <span className="font-display text-base font-bold text-brand-700">
                          {item.price}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
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
