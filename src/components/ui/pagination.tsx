import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn, getPaginationRange } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
}

export function Pagination({ page, totalPages, buildHref }: PaginationProps) {
  if (totalPages <= 1) return null;

  const range = getPaginationRange(page, totalPages);
  const baseItem =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition-colors";

  return (
    <nav
      aria-label="Paginare"
      className="flex items-center justify-center gap-1.5"
    >
      <PageLink
        href={buildHref(page - 1)}
        disabled={page <= 1}
        className={baseItem}
        ariaLabel="Pagina anterioară"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </PageLink>

      {range.map((item, index) =>
        item === "..." ? (
          <span
            key={`dots-${index}`}
            className="px-2 text-ink-muted"
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <Link
            key={item}
            href={buildHref(item)}
            aria-current={item === page ? "page" : undefined}
            className={cn(
              baseItem,
              item === page
                ? "bg-brand-600 text-cream shadow-soft"
                : "bg-white text-ink-soft ring-1 ring-black/5 hover:bg-brand-50",
            )}
          >
            {item}
          </Link>
        ),
      )}

      <PageLink
        href={buildHref(page + 1)}
        disabled={page >= totalPages}
        className={baseItem}
        ariaLabel="Pagina următoare"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </PageLink>
    </nav>
  );
}

function PageLink({
  href,
  disabled,
  className,
  ariaLabel,
  children,
}: {
  href: string;
  disabled: boolean;
  className: string;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  if (disabled) {
    return (
      <span
        aria-disabled="true"
        aria-label={ariaLabel}
        className={cn(
          className,
          "cursor-not-allowed bg-white/60 text-ink-muted/50 ring-1 ring-black/5",
        )}
      >
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        className,
        "bg-white text-ink-soft ring-1 ring-black/5 hover:bg-brand-50",
      )}
    >
      {children}
    </Link>
  );
}
