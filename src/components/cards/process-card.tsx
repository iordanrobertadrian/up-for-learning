import { IconCircle } from "@/components/ui/icon-circle";
import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/types";

export function ProcessCard({ step }: { step: ProcessStep }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-3xl p-7 shadow-soft ring-1 ring-black/[0.03]",
        step.accent === "gold" ? "bg-gold-50" : "bg-white",
      )}
    >
      <IconCircle icon={step.icon} accent={step.accent} size="lg" />
      <h3
        className={cn(
          "mt-5 text-lg font-bold uppercase tracking-tight",
          step.accent === "gold" ? "text-gold-600" : "text-brand-700",
        )}
      >
        {step.number}. {step.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
        {step.description}
      </p>
      <span
        className={cn(
          "mt-6 h-1 w-12 rounded-full",
          step.accent === "gold" ? "bg-gold-400" : "bg-brand-400",
        )}
        aria-hidden="true"
      />
    </div>
  );
}
