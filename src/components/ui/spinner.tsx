import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

export function Spinner({ className }: { className?: string }) {
  return (
    <Loader2
      className={cn("h-5 w-5 animate-spin", className)}
      aria-hidden="true"
    />
  );
}

export function LoadingState({ label = "Se încarcă…" }: { label?: string }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-3 py-20 text-ink-muted"
    >
      <Spinner className="h-8 w-8 text-brand-500" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
