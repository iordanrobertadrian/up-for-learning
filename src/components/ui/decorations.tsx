import { cn } from "@/lib/utils";

export function Blob({
  className,
  color = "sage",
}: {
  className?: string;
  color?: "sage" | "gold" | "brand" | "cream";
}) {
  const colors = {
    sage: "bg-sage",
    gold: "bg-gold-100",
    brand: "bg-brand-100",
    cream: "bg-beige",
  } as const;

  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 block rounded-blob blur-2xl",
        colors[color],
        className,
      )}
    />
  );
}

export function DotGrid({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 block h-24 w-24 bg-grid-dots opacity-70",
        className,
      )}
    />
  );
}

export function GradientGlow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 block rounded-full bg-gradient-to-br from-gold-100 via-sage to-brand-100 opacity-60 blur-3xl",
        className,
      )}
    />
  );
}
