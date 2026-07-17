"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, LayoutDashboard, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { logoutAction } from "@/actions/admin.actions";
import { Logo } from "@/components/ui/logo";
import { ROUTES } from "@/constants/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Înscrieri", href: ROUTES.admin, icon: LayoutDashboard },
];

export function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-dvh">
      <AnimatePresence>
        {open ? (
          <div className="fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white shadow-lift"
            >
              <SidebarContent
                pathname={pathname}
                email={email}
                onNavigate={() => setOpen(false)}
              />
            </motion.aside>
          </div>
        ) : null}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-sage/70 bg-cream/85 px-5 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-brand-700 hover:bg-brand-50"
              aria-label="Deschide meniul"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-bold text-ink">Administrare</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-ink-muted sm:inline">
              {email}
            </span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-ink-soft ring-1 ring-black/5 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Deconectare</span>
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 px-5 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}

function SidebarContent({
  pathname,
  email,
  onNavigate,
}: {
  pathname: string;
  email: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      <div className="flex items-center justify-center border-b border-sage/70 px-5 py-6">
        <Logo asLink={false} className="w-[140px]" />
      </div>
      <nav className="flex-1 space-y-1 p-4" aria-label="Navigație administrare">
        {navItems.map((item) => {
          const active = item.href === pathname;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors",
                active
                  ? "bg-brand-600 text-cream"
                  : "text-ink-soft hover:bg-brand-50",
              )}
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sage/70 p-4">
        <Link
          href={ROUTES.home}
          className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-ink-muted transition-colors hover:bg-cream hover:text-brand-700"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          Vezi site-ul
        </Link>
        <p className="mt-3 truncate px-4 text-xs text-ink-muted sm:hidden">
          {email}
        </p>
      </div>
    </>
  );
}
