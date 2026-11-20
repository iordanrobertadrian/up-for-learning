import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  Layers,
  MapPin,
  Users,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/navigation";
import type { FeaturedCamp } from "@/types";

/**
 * Promovarea taberei pe prima pagină: bandă închisă la culoare, ca să iasă
 * în evidență între secțiunile deschise. Detaliile complete sunt pe /tabere.
 */
export function CampSpotlight({ camp }: { camp: FeaturedCamp }) {
  const image = camp.images[0];
  const detailsHref = `${ROUTES.trips}#${camp.slug}`;

  return (
    <section
      aria-labelledby="tabara-acasa-titlu"
      className="bg-[#faf5ef] pb-14 sm:pb-20"
    >
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 lg:px-8">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-brand-700 shadow-lift">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl"
          />
          <div className="relative grid grid-cols-1 items-center gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:p-10">
            {image ? (
              <figure>
                <Link
                  href={detailsHref}
                  className="group relative block aspect-[16/10] overflow-hidden rounded-3xl ring-1 ring-white/15"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 580px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-gold-400 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-900 shadow-glow">
                    Vara 2027
                  </span>
                </Link>
              </figure>
            ) : null}

            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-gold-300">
                {camp.badge}
              </p>
              <h2
                id="tabara-acasa-titlu"
                className="mt-3 font-display text-3xl font-bold leading-tight text-cream sm:text-4xl"
              >
                {camp.title}
              </h2>

              <ul className="mt-5 flex flex-col gap-2.5 text-sm font-semibold text-cream sm:text-base">
                <li className="flex items-center gap-2.5">
                  <MapPin className="h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
                  {camp.location}
                </li>
                <li className="flex items-center gap-2.5">
                  <CalendarDays className="h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
                  {camp.dates}
                </li>
                <li className="flex items-center gap-2.5">
                  <Users className="h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
                  Vârsta participanților: {camp.ages}
                </li>
              </ul>

              <p className="mt-5 leading-relaxed text-cream/85">
                {camp.description}
              </p>

              <div className="mt-7 flex flex-col gap-4 rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/15 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div>
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-cream/60">
                    Preț pachet
                  </p>
                  <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="font-display text-4xl font-bold leading-none text-gold-300">
                      {camp.price.label}
                    </span>
                    <span className="text-sm font-semibold text-cream/75">
                      / {camp.price.unit}
                    </span>
                  </p>
                </div>
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-1">
                  <PriceChip icon={Wallet}>{camp.price.deposit}</PriceChip>
                  <PriceChip icon={Layers}>{camp.price.installments}</PriceChip>
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={ROUTES.enroll} variant="gold" size="lg">
                  <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                  Rezervă un loc
                </Button>
                <Link
                  href={detailsHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold text-cream ring-1 ring-cream/30 transition-colors hover:bg-cream/10"
                >
                  Vezi ce include
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PriceChip({
  icon: Icon,
  children,
}: {
  icon: typeof Wallet;
  children: React.ReactNode;
}) {
  return (
    <li className="flex w-full items-center gap-1.5 whitespace-nowrap rounded-full bg-gold-400/15 px-3 py-1.5 text-xs font-semibold text-gold-200 ring-1 ring-gold-300/30">
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {children}
    </li>
  );
}
