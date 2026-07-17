"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/navigation";

const STORAGE_KEY = "ufl-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        setVisible(!stored);
      } catch {
        setVisible(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
      window.dispatchEvent(new Event("ufl-consent-change"));
    } catch {
      setVisible(false);
      return;
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Consimțământ cookie-uri"
          className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-3xl rounded-3xl bg-white p-5 shadow-lift ring-1 ring-black/5 sm:inset-x-6 sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-100 text-gold-600">
                <Cookie className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-sm text-ink-soft">
                Folosim cookie-uri esențiale pentru funcționarea site-ului și,
                cu acordul tău, cookie-uri de analiză pentru a îmbunătăți
                experiența. Detalii în{" "}
                <Link
                  href={ROUTES.cookies}
                  className="font-semibold text-brand-700 underline underline-offset-2"
                >
                  Politica de cookies
                </Link>
                .
              </p>
            </div>
            <div className="flex shrink-0 gap-2 sm:ml-auto">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => decide("rejected")}
              >
                Refuz
              </Button>
              <Button size="sm" onClick={() => decide("accepted")}>
                Accept
              </Button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
