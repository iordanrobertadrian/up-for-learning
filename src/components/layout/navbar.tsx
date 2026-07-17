"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ROUTES, mainNav } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === ROUTES.home ? pathname === href : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-sage/70 bg-cream/85 shadow-soft backdrop-blur-md"
          : "border-b border-transparent bg-cream/60 backdrop-blur-sm",
      )}
    >
      <a
        href="#continut-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
      >
        Sari la conținut
      </a>
      <nav
        aria-label="Navigație principală"
        className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-6 lg:px-8"
      >
        <Logo priority className="w-[104px] sm:w-[156px]" />

        <ul className="hidden items-center gap-1 xl:flex">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[0.95rem] font-semibold transition-colors",
                  isActive(item.href)
                    ? "text-brand-700"
                    : "text-ink-soft hover:text-brand-700",
                )}
              >
                {item.label}
                {isActive(item.href) ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-gold-400"
                  />
                ) : null}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button
            href={ROUTES.enroll}
            size="sm"
            className="hidden sm:inline-flex"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Programează o vizită
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-700 transition-colors hover:bg-brand-50 xl:hidden"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <MobileMenu open={open} onClose={() => setOpen(false)} isActive={isActive} />
    </header>
  );
}

function MobileMenu({
  open,
  onClose,
  isActive,
}: {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden border-t border-sage/70 bg-cream/95 backdrop-blur-md xl:hidden"
        >
          <ul className="mx-auto flex w-full max-w-[1320px] flex-col gap-1 px-5 py-4 sm:px-6">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-2xl px-4 py-3 text-base font-semibold transition-colors",
                    isActive(item.href)
                      ? "bg-brand-50 text-brand-700"
                      : "text-ink-soft hover:bg-brand-50/60",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Button href={ROUTES.enroll} className="w-full" onClick={onClose}>
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Programează o vizită
              </Button>
            </li>
          </ul>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
