import { ArrowLeft, Compass } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Blob } from "@/components/ui/decorations";
import { Logo } from "@/components/ui/logo";
import { ROUTES, mainNav } from "@/constants/navigation";

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-16 text-center">
      <Blob className="-left-24 top-10 h-72 w-72" color="sage" />
      <Blob className="-right-24 bottom-10 h-72 w-72" color="gold" />

      <Logo asLink priority className="w-[180px]" />

      <span className="mt-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
        <Compass className="h-8 w-8" aria-hidden="true" />
      </span>
      <p className="mt-6 font-display text-6xl font-bold text-brand-600">404</p>
      <h1 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
        Pagina nu a fost găsită
      </h1>
      <p className="mt-3 max-w-md text-ink-soft">
        Ne pare rău, pagina căutată nu există sau a fost mutată. Hai să te
        readucem pe drumul cel bun.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href={ROUTES.home} size="lg">
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          Înapoi acasă
        </Button>
        <Button href={ROUTES.contact} variant="secondary" size="lg">
          Contactează-ne
        </Button>
      </div>

      <nav
        aria-label="Legături utile"
        className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm"
      >
        {mainNav.slice(1, 6).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-semibold text-ink-muted transition-colors hover:text-brand-700"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
