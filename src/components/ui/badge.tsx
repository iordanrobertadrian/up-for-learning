import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Tone = "brand" | "gold" | "sage" | "neutral";

const tones: Record<Tone, string> = {
  brand: "bg-brand-100 text-brand-700 ring-brand-200",
  gold: "bg-gold-100 text-gold-800 ring-gold-200",
  sage: "bg-sage text-brand-800 ring-brand-200/60",
  neutral: "bg-white text-ink-soft ring-black/5",
};

interface BadgeProps {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}

export function Badge({ tone = "brand", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
