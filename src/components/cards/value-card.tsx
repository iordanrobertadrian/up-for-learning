import { IconCircle } from "@/components/ui/icon-circle";
import { cn } from "@/lib/utils";
import type { ValueItem } from "@/types";

export function ValueCard({ value }: { value: ValueItem }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-5 rounded-3xl p-7 shadow-soft ring-1 ring-black/[0.03] sm:flex-row sm:items-center",
        value.accent === "gold" ? "bg-gold-50" : "bg-white",
      )}
    >
      <IconCircle
        icon={value.icon}
        accent={value.accent}
        size="lg"
        className="rounded-full"
      />
      <div>
        <h3
          className={cn(
            "text-xl font-bold",
            value.accent === "gold" ? "text-gold-700" : "text-brand-700",
          )}
        >
          {value.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {value.description}
        </p>
      </div>
    </div>
  );
}
