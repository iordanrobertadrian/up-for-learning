import { Inbox } from "lucide-react";

import { EnrollmentFilters } from "@/components/admin/enrollment-filters";
import { EnrollmentsTable } from "@/components/admin/enrollments-table";
import { StatCards } from "@/components/admin/stat-cards";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import {
  ENROLLMENTS_PER_PAGE,
  ENROLLMENT_STATUSES,
} from "@/constants/enrollment";
import { ROUTES } from "@/constants/navigation";
import {
  getEnrollmentStats,
  listEnrollments,
} from "@/services/enrollment.service";
import type { EnrollmentStatus } from "@/types";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminDashboardPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = firstParam(params.search)?.trim() || undefined;
  const statusParam = firstParam(params.status);
  const status =
    statusParam && ENROLLMENT_STATUSES.includes(statusParam as EnrollmentStatus)
      ? (statusParam as EnrollmentStatus)
      : undefined;
  const page = Math.max(1, Number(firstParam(params.page)) || 1);

  const [stats, result] = await Promise.all([
    getEnrollmentStats(),
    listEnrollments({
      page,
      perPage: ENROLLMENTS_PER_PAGE,
      search,
      status,
    }),
  ]);

  const buildHref = (targetPage: number) => {
    const query = new URLSearchParams();
    if (search) query.set("search", search);
    if (status) query.set("status", status);
    if (targetPage > 1) query.set("page", String(targetPage));
    const qs = query.toString();
    return qs ? `${ROUTES.admin}?${qs}` : ROUTES.admin;
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink">
          Cereri de înscriere
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          Gestionează solicitările primite prin formularul de pe site.
        </p>
      </div>

      <StatCards stats={stats} />

      <section id="inscrieri" className="scroll-mt-24 space-y-6">
        <EnrollmentFilters />

        {result.items.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title={
              search || status
                ? "Nicio cerere găsită"
                : "Nu există cereri încă"
            }
            description={
              search || status
                ? "Încearcă să modifici căutarea sau filtrele."
                : "Cererile trimise prin formularul de înscriere vor apărea aici."
            }
          />
        ) : (
          <>
            <EnrollmentsTable items={result.items} />
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-ink-muted">
                {result.total}{" "}
                {result.total === 1 ? "cerere" : "cereri"} în total
              </p>
              <Pagination
                page={result.page}
                totalPages={result.totalPages}
                buildHref={buildHref}
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
}
