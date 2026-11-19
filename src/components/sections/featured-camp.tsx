import {
  Bus,
  CalendarCheck,
  CalendarDays,
  Check,
  MapPin,
  Minus,
  Trophy,
  Users,
} from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/navigation";
import type { FeaturedCamp } from "@/types";

export function FeaturedCampSection({ camp }: { camp: FeaturedCamp }) {
  const [main, ...rest] = camp.images;

  return (
    <section
      id={camp.slug}
      aria-labelledby={`${camp.slug}-titlu`}
      className="scroll-mt-24 bg-cream pb-4 pt-12 sm:pt-16"
    >
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 lg:px-8">
        <Reveal className="overflow-hidden rounded-[2rem] bg-white shadow-lift ring-1 ring-black/[0.03]">
          <div className="grid lg:grid-cols-[1.05fr_1fr]">
            <div className="grid grid-cols-2 gap-2 bg-beige-light p-2 lg:grid-rows-[1fr_auto_auto]">
              {main ? (
                <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-3xl lg:aspect-auto lg:min-h-[340px]">
                  <Image
                    src={main.src}
                    alt={main.alt}
                    fill
                    sizes="(max-width: 1024px) 96vw, 660px"
                    className="object-cover"
                  />
                </div>
              ) : null}
              {rest.map((image) => (
                <div
                  key={image.src}
                  className="relative aspect-[4/3] overflow-hidden rounded-3xl"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 48vw, 330px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="p-7 sm:p-10">
              <Badge tone="gold">{camp.badge}</Badge>
              <h2
                id={`${camp.slug}-titlu`}
                className="mt-4 font-display text-3xl font-bold leading-tight text-brand-700 sm:text-4xl"
              >
                {camp.title}
              </h2>

              <ul className="mt-5 flex flex-col gap-2.5 text-sm font-semibold text-ink sm:text-base">
                <Fact icon={MapPin}>{camp.location}</Fact>
                <Fact icon={CalendarDays}>{camp.dates}</Fact>
                <Fact icon={Users}>Vârsta participanților: {camp.ages}</Fact>
              </ul>

              <p className="mt-6 leading-relaxed text-ink-soft">
                {camp.description}
              </p>

              <h3 className="mt-8 text-sm font-bold uppercase tracking-wide text-gold-600">
                Pachetul include
              </h3>
              <ul className="mt-4 space-y-3">
                {camp.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft sm:text-[0.95rem]"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col items-start gap-5 rounded-3xl bg-brand-700 p-6 text-cream">
                <div>
                  <p className="font-display text-3xl font-bold text-gold-300">
                    {camp.price.label}
                    <span className="ml-2 whitespace-nowrap text-base font-semibold text-cream/85">
                      / {camp.price.unit}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-cream/75">
                    {camp.price.covers}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-cream">
                    {camp.price.deposit} · {camp.price.installments}
                  </p>
                </div>
                <Button
                  href={ROUTES.enroll}
                  variant="gold"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                  Rezervă un loc
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-8 border-t border-sage/60 p-7 sm:p-10 lg:grid-cols-3 lg:gap-10">
            <InfoBlock icon={Minus} title="Pachetul nu include">
              <ul className="space-y-2">
                {camp.excludes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Minus
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-gold-500"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </InfoBlock>
            <InfoBlock icon={Trophy} title="Activități în campus">
              <p>{camp.activities}</p>
            </InfoBlock>
            <InfoBlock icon={Bus} title="Transport și sosire">
              <div className="space-y-3">
                {camp.transport.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </InfoBlock>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Fact({
  icon: Icon,
  children,
}: {
  icon: typeof MapPin;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-2.5">
      <Icon className="h-5 w-5 shrink-0 text-gold-500" aria-hidden="true" />
      {children}
    </li>
  );
}

function InfoBlock({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof MapPin;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-wide text-brand-700">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-100 text-gold-600">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        {title}
      </h3>
      <div className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-[0.95rem]">
        {children}
      </div>
    </div>
  );
}
