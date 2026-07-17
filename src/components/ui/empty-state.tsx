import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { IconCircle } from "@/components/ui/icon-circle";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-dashed border-sage-dark bg-cream/60 px-6 py-16 text-center",
        className,
      )}
    >
      <IconCircle icon={icon} accent="sage" size="lg" />
      <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-sm text-sm text-ink-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
