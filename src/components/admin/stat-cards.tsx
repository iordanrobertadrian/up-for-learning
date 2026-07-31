import { Archive, GraduationCap, Inbox, PhoneCall } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { EnrollmentStatus } from "@/types";

interface StatCardsProps {
  stats: Record<EnrollmentStatus, number> & { total: number };
}

const cards: Array<{
  key: keyof StatCardsProps["stats"];
  label: string;
  icon: LucideIcon;
  className: string;
}> = [
  {
    key: "total",
    label: "Total cereri",
    icon: Inbox,
    className: "bg-brand-100 text-brand-700",
  },
  {
    key: "new",
    label: "Cereri noi",
    icon: PhoneCall,
    className: "bg-gold-100 text-gold-700",
  },
  {
    key: "enrolled",
    label: "Înscriși",
    icon: GraduationCap,
    className: "bg-sage text-brand-800",
  },
  {
    key: "archived",
    label: "Arhivate",
    icon: Archive,
    className: "bg-ink/10 text-ink-soft",
  },
];

export function StatCards({ stats }: StatCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.key}
          className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-black/[0.03]"
        >
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.className}`}
          >
            <card.icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-2xl font-bold text-ink">
              {stats[card.key]}
            </p>
            <p className="text-sm text-ink-muted">{card.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
