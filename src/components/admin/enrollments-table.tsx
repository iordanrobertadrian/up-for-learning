"use client";

import { ChevronDown, Mail, Phone, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  deleteEnrollmentAction,
  updateStatusAction,
} from "@/actions/admin.actions";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import {
  ENROLLMENT_STATUSES,
  ENROLLMENT_STATUS_META,
} from "@/constants/enrollment";
import { cn, formatDateTime } from "@/lib/utils";
import type { EnrollmentDTO, EnrollmentStatus } from "@/types";

export function EnrollmentsTable({ items }: { items: EnrollmentDTO[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();
  const [toDelete, setToDelete] = useState<EnrollmentDTO | null>(null);

  const changeStatus = (id: string, status: EnrollmentStatus) => {
    startTransition(async () => {
      const result = await updateStatusAction(id, status);
      if (result.ok) {
        toast({ variant: "success", title: "Status actualizat" });
        router.refresh();
      } else {
        toast({
          variant: "error",
          title: "Eroare",
          description: "Statusul nu a putut fi actualizat.",
        });
      }
    });
  };

  const confirmDelete = () => {
    if (!toDelete) return;
    const id = toDelete.id;
    startTransition(async () => {
      const result = await deleteEnrollmentAction(id);
      if (result.ok) {
        toast({ variant: "success", title: "Cerere ștearsă" });
        setToDelete(null);
        router.refresh();
      } else {
        toast({
          variant: "error",
          title: "Eroare",
          description: "Cererea nu a putut fi ștearsă.",
        });
      }
    });
  };

  return (
    <>
      <div className="hidden overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-black/[0.03] lg:block">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-sage/70 bg-cream/60 text-xs uppercase tracking-wide text-ink-muted">
                <th scope="col" className="px-5 py-4 font-semibold">
                  Solicitant
                </th>
                <th scope="col" className="px-5 py-4 font-semibold">
                  Contact
                </th>
                <th scope="col" className="px-5 py-4 font-semibold">
                  Copil
                </th>
                <th scope="col" className="px-5 py-4 font-semibold">
                  Curs
                </th>
                <th scope="col" className="px-5 py-4 font-semibold">
                  Data
                </th>
                <th scope="col" className="px-5 py-4 font-semibold">
                  Status
                </th>
                <th scope="col" className="px-5 py-4 text-right font-semibold">
                  Acțiuni
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sage/60">
              {items.map((item) => (
                <tr key={item.id} className="align-top hover:bg-cream/40">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-ink">{item.fullName}</p>
                    {item.message ? (
                      <p className="mt-1 max-w-[260px] whitespace-pre-wrap break-words text-xs text-ink-muted">
                        {item.message}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-5 py-4">
                    <ContactLinks enrollment={item} />
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-ink-soft">
                    {item.childAge}
                    {item.childGrade ? (
                      <span className="text-ink-muted">
                        {" · Clasa "}
                        {item.childGrade}
                      </span>
                    ) : null}
                  </td>
                  <td className="px-5 py-4 text-ink-soft">
                    <p>{item.course}</p>
                    <ScheduleSummary enrollment={item} className="mt-1" />
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-ink-muted">
                    {formatDateTime(item.createdAt)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusSelect
                      value={item.status}
                      disabled={pending}
                      onChange={(status) => changeStatus(item.id, status)}
                    />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setToDelete(item)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-ink-muted transition-colors hover:bg-red-50 hover:text-red-600"
                      aria-label={`Șterge cererea de la ${item.fullName}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4 lg:hidden">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-black/[0.03]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-ink">{item.fullName}</p>
                <p className="text-xs text-ink-muted">
                  {formatDateTime(item.createdAt)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setToDelete(item)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-ink-muted transition-colors hover:bg-red-50 hover:text-red-600"
                aria-label={`Șterge cererea de la ${item.fullName}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <dl className="mt-4 space-y-1.5 text-sm">
              <Row label="Vârstă">{item.childAge}</Row>
              {item.childGrade ? (
                <Row label="Clasă">{item.childGrade}</Row>
              ) : null}
              <Row label="Curs">{item.course}</Row>
              {item.preferredDays.length ? (
                <Row label="Zile">{item.preferredDays.join(", ")}</Row>
              ) : null}
              {item.preferredSchedule ? (
                <Row label="Interval">{item.preferredSchedule}</Row>
              ) : null}
            </dl>
            <div className="mt-3">
              <ContactLinks enrollment={item} />
            </div>
            {item.message ? (
              <p className="mt-3 rounded-2xl bg-cream/70 p-3 text-xs text-ink-soft">
                {item.message}
              </p>
            ) : null}
            <div className="mt-4">
              <StatusSelect
                value={item.status}
                disabled={pending}
                onChange={(status) => changeStatus(item.id, status)}
              />
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={Boolean(toDelete)}
        onClose={() => setToDelete(null)}
        title="Ștergi această cerere?"
        description={
          toDelete
            ? `Cererea de la ${toDelete.fullName} va fi ștearsă definitiv. Această acțiune nu poate fi anulată.`
            : undefined
        }
      >
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setToDelete(null)}>
            Anulează
          </Button>
          <Button
            variant="gold"
            onClick={confirmDelete}
            disabled={pending}
            className="!bg-red-500 !text-white hover:!bg-red-600"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Șterge definitiv
          </Button>
        </div>
      </Modal>
    </>
  );
}

function ScheduleSummary({
  enrollment,
  className,
}: {
  enrollment: EnrollmentDTO;
  className?: string;
}) {
  const parts = [
    enrollment.preferredDays.length ? enrollment.preferredDays.join(", ") : null,
    enrollment.preferredSchedule || null,
  ].filter(Boolean);

  if (parts.length === 0) return null;

  return (
    <p className={cn("text-xs text-ink-muted", className)}>
      {parts.join(" · ")}
    </p>
  );
}

function ContactLinks({ enrollment }: { enrollment: EnrollmentDTO }) {
  return (
    <div className="space-y-1 text-sm">
      <a
        href={`tel:${enrollment.phone}`}
        className="flex items-center gap-2 whitespace-nowrap text-ink-soft transition-colors hover:text-brand-700"
      >
        <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {enrollment.phone}
      </a>
      <a
        href={`mailto:${enrollment.email}`}
        title={enrollment.email}
        className="flex min-w-0 max-w-[230px] items-center gap-2 text-ink-soft transition-colors hover:text-brand-700"
      >
        <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="truncate">{enrollment.email}</span>
      </a>
    </div>
  );
}

function StatusSelect({
  value,
  onChange,
  disabled,
}: {
  value: EnrollmentStatus;
  onChange: (status: EnrollmentStatus) => void;
  disabled?: boolean;
}) {
  const meta = ENROLLMENT_STATUS_META[value];
  return (
    <div className="relative inline-flex">
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value as EnrollmentStatus)}
        aria-label="Schimbă statusul"
        className={cn(
          "cursor-pointer appearance-none rounded-full py-1.5 pl-3.5 pr-8 text-left text-xs font-semibold ring-1 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-300 disabled:cursor-not-allowed disabled:opacity-60",
          meta.className,
        )}
      >
        {ENROLLMENT_STATUSES.map((status) => (
          <option key={status} value={status} className="bg-white text-ink">
            {ENROLLMENT_STATUS_META[status].label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 opacity-70" />
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="text-right font-medium text-ink">{children}</dd>
    </div>
  );
}
