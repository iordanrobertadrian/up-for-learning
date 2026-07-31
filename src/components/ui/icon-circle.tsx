import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type Accent = "brand" | "gold" | "sage" | "sky" | "violet";
type Size = "sm" | "md" | "lg";

const accents: Record<Accent, string> = {
  brand: "bg-brand-100 text-brand-600",
  gold: "bg-gold-100 text-gold-600",
  sage: "bg-sage text-brand-700",
  sky: "bg-sky-100 text-sky-600",
  violet: "bg-violet-100 text-violet-600",
};

const sizes: Record<Size, string> = {
  sm: "h-11 w-11 rounded-xl [&>svg]:h-5 [&>svg]:w-5",
  md: "h-14 w-14 rounded-2xl [&>svg]:h-6 [&>svg]:w-6",
  lg: "h-16 w-16 rounded-2xl [&>svg]:h-7 [&>svg]:w-7",
};

interface IconCircleProps {
  icon: LucideIcon;
  accent?: Accent;
  size?: Size;
  className?: string;
}

export function IconCircle({
  icon: Icon,
  accent = "brand",
  size = "md",
  className,
}: IconCircleProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        accents[accent],
        sizes[size],
        className,
      )}
      aria-hidden="true"
    >
      <Icon strokeWidth={1.75} />
    </span>
  );
}
