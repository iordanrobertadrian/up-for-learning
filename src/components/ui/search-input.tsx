import { Search } from "lucide-react";
import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
}

export function SearchInput({
  className,
  wrapperClassName,
  "aria-label": ariaLabel = "Caută",
  ...props
}: SearchInputProps) {
  return (
    <div className={cn("relative", wrapperClassName)}>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
        aria-hidden="true"
      />
      <input
        type="search"
        aria-label={ariaLabel}
        className={cn(
          "w-full rounded-2xl border border-sage-dark bg-white py-2.5 pl-11 pr-4 text-sm text-ink placeholder:text-ink-muted/70 shadow-sm transition-colors focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200",
          className,
        )}
        {...props}
      />
    </div>
  );
}
