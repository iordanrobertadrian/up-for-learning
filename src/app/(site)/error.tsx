"use client";

import { RefreshCw } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/navigation";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 py-16 text-center">
      <p className="font-display text-5xl font-bold text-gold-400">Ups!</p>
      <h1 className="mt-4 text-2xl font-bold text-ink">
        A apărut o problemă neașteptată
      </h1>
      <p className="mt-3 max-w-md text-ink-soft">
        Îți mulțumim pentru răbdare. Poți reîncerca sau reveni la pagina
        principală.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset} size="lg">
          <RefreshCw className="h-5 w-5" aria-hidden="true" />
          Reîncearcă
        </Button>
        <Button href={ROUTES.home} variant="secondary" size="lg">
          Înapoi acasă
        </Button>
      </div>
    </div>
  );
}
