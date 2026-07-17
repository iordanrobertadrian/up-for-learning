"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { FormState } from "@/actions/types";
import {
  createSession,
  destroySession,
  getSession,
  verifyCredentials,
} from "@/lib/auth";
import { ROUTES } from "@/constants/navigation";
import {
  changeEnrollmentStatus,
  removeEnrollment,
} from "@/services/enrollment.service";
import { loginSchema, type LoginInput } from "@/validators/auth.validator";
import {
  deleteEnrollmentSchema,
  updateStatusSchema,
} from "@/validators/enrollment.validator";
import type { EnrollmentStatus } from "@/types";

type LoginField = keyof LoginInput;

export async function loginAction(
  _prev: FormState<LoginField>,
  formData: FormData,
): Promise<FormState<LoginField>> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const fieldErrors: Partial<Record<LoginField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as LoginField | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Date invalide.", fieldErrors };
  }

  const ok = await verifyCredentials(parsed.data.email, parsed.data.password);
  if (!ok) {
    return {
      status: "error",
      message: "Email sau parolă incorecte.",
    };
  }

  await createSession(parsed.data.email);
  redirect(ROUTES.admin);
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect(ROUTES.adminLogin);
}

async function requireAdmin(): Promise<void> {
  const session = await getSession();
  if (!session) {
    redirect(ROUTES.adminLogin);
  }
}

export async function updateStatusAction(
  id: string,
  status: EnrollmentStatus,
): Promise<{ ok: boolean }> {
  await requireAdmin();
  const parsed = updateStatusSchema.safeParse({ id, status });
  if (!parsed.success) return { ok: false };

  const updated = await changeEnrollmentStatus(
    parsed.data.id,
    parsed.data.status as EnrollmentStatus,
  );
  if (updated) revalidatePath(ROUTES.admin);
  return { ok: Boolean(updated) };
}

export async function deleteEnrollmentAction(
  id: string,
): Promise<{ ok: boolean }> {
  await requireAdmin();
  const parsed = deleteEnrollmentSchema.safeParse({ id });
  if (!parsed.success) return { ok: false };

  const deleted = await removeEnrollment(parsed.data.id);
  if (deleted) revalidatePath(ROUTES.admin);
  return { ok: deleted };
}
