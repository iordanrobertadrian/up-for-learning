import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { ROUTES } from "@/constants/navigation";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect(ROUTES.adminLogin);
  }

  return <AdminShell email={session.email}>{children}</AdminShell>;
}
