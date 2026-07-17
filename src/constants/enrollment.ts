import type { EnrollmentStatus } from "@/types";

export const ENROLLMENT_STATUSES: EnrollmentStatus[] = [
  "new",
  "contacted",
  "enrolled",
  "archived",
];

interface StatusMeta {
  label: string;
  className: string;
  dot: string;
}

export const ENROLLMENT_STATUS_META: Record<EnrollmentStatus, StatusMeta> = {
  new: {
    label: "Nou",
    className: "bg-gold-100 text-gold-800 ring-gold-200",
    dot: "bg-gold-500",
  },
  contacted: {
    label: "Contactat",
    className: "bg-sky-100 text-sky-800 ring-sky-200",
    dot: "bg-sky-500",
  },
  enrolled: {
    label: "Înscris",
    className: "bg-brand-100 text-brand-800 ring-brand-200",
    dot: "bg-brand-500",
  },
  archived: {
    label: "Arhivat",
    className: "bg-ink/10 text-ink-soft ring-ink/15",
    dot: "bg-ink-muted",
  },
};

export const ENROLLMENTS_PER_PAGE = 10;

export const PREFERRED_DAYS: { value: string; label: string }[] = [
  { value: "Luni", label: "Lu" },
  { value: "Marți", label: "Ma" },
  { value: "Miercuri", label: "Mi" },
  { value: "Joi", label: "Jo" },
  { value: "Vineri", label: "Vi" },
];

export const PREFERRED_SCHEDULES: string[] = [
  "08:00 – 12:00",
  "12:00 – 16:00",
  "16:00 – 18:00",
];
