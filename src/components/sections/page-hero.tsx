import { ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { Blob, DotGrid } from "@/components/ui/decorations";
import { ROUTES } from "@/constants/navigation";

interface Crumb {
  name: string;
  href: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs: Crumb[];
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-hero-fade pb-14 pt-10 sm:pb-16 sm:pt-14">
      <Blob className="-right-20 -top-10 h-72 w-72" color="sage" />
      <Blob className="-left-24 bottom-0 h-64 w-64" color="gold" />
      <DotGrid className="right-10 bottom-6 hidden lg:block" />

      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 lg:px-8">
        <Reveal>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
              <li>
                <Link
                  href={ROUTES.home}
                  className="transition-colors hover:text-brand-700"
                >
                  Acasă
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-1.5">
                  <ChevronRight
                    className="h-3.5 w-3.5 text-ink-muted/60"
                    aria-hidden="true"
                  />
                  {index === breadcrumbs.length - 1 ? (
                    <span aria-current="page" className="font-semibold text-ink">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-brand-700"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>

        <div className="mt-8 max-w-3xl">
          {eyebrow ? (
            <Reveal>
              <span className="eyebrow">
                <Star
                  className="h-4 w-4 fill-gold-400 text-gold-400"
                  aria-hidden="true"
                />
                {eyebrow}
              </span>
            </Reveal>
          ) : null}
          <Reveal delay={0.05}>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-[3.25rem]">
              {title}
            </h1>
          </Reveal>
          {description ? (
            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
                {description}
              </p>
            </Reveal>
          ) : null}
          {children ? (
            <Reveal delay={0.15}>
              <div className="mt-8">{children}</div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
