import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type Tone = "cream" | "white" | "beige" | "sage" | "brand";

const toneMap: Record<Tone, string> = {
  cream: "bg-cream",
  white: "bg-white",
  beige: "bg-beige-light",
  sage: "bg-sage-light",
  brand: "bg-brand-700 text-cream",
};

interface SectionProps {
  id?: string;
  tone?: Tone;
  size?: "default" | "narrow" | "wide";
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

export function Section({
  id,
  tone = "cream",
  size = "default",
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-16 sm:py-20 lg:py-28",
        toneMap[tone],
        className,
      )}
    >
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  inverted?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  inverted = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "eyebrow mb-3",
            inverted && "text-gold-200",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]",
          inverted ? "text-cream" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            inverted ? "text-cream/80" : "text-ink-soft",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
