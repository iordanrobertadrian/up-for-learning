"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { SearchInput } from "@/components/ui/search-input";
import {
  ENROLLMENT_STATUSES,
  ENROLLMENT_STATUS_META,
} from "@/constants/enrollment";
import { ROUTES } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function EnrollmentFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get("status") ?? "";
  const [term, setTerm] = useState(searchParams.get("search") ?? "");
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (term.trim()) params.set("search", term.trim());
      else params.delete("search");
      params.delete("page");
      router.replace(`${ROUTES.admin}?${params.toString()}`);
    }, 350);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  const setStatus = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status) params.set("status", status);
    else params.delete("status");
    params.delete("page");
    router.replace(`${ROUTES.admin}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <SearchInput
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Caută după nume, email, telefon sau curs…"
        aria-label="Caută înscrieri"
        wrapperClassName="w-full lg:max-w-md"
      />

      <div className="flex flex-wrap gap-2">
        <FilterChip active={!activeStatus} onClick={() => setStatus("")}>
          Toate
        </FilterChip>
        {ENROLLMENT_STATUSES.map((status) => (
          <FilterChip
            key={status}
            active={activeStatus === status}
            onClick={() => setStatus(status)}
          >
            {ENROLLMENT_STATUS_META[status].label}
          </FilterChip>
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
        active
          ? "bg-brand-600 text-cream"
          : "bg-white text-ink-soft ring-1 ring-black/5 hover:bg-brand-50",
      )}
    >
      {children}
    </button>
  );
}
