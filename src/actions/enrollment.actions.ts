"use server";

import type { FormState } from "@/actions/types";
import { submitEnrollment } from "@/services/enrollment.service";
import {
  enrollmentSchema,
  type EnrollmentInput,
} from "@/validators/enrollment.validator";

type EnrollmentField = keyof EnrollmentInput;

export async function submitEnrollmentAction(
  raw: EnrollmentInput,
): Promise<FormState<EnrollmentField>> {
  const parsed = enrollmentSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<EnrollmentField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as EnrollmentField | undefined;
      if (key && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Te rugăm să corectezi câmpurile marcate.",
      fieldErrors,
    };
  }

  if (parsed.data.website && parsed.data.website.length > 0) {
    return {
      status: "success",
      message: "Îți mulțumim! Cererea ta a fost înregistrată.",
    };
  }

  try {
    await submitEnrollment(parsed.data);
    return {
      status: "success",
      message:
        "Îți mulțumim! Am primit cererea ta și te vom contacta în cel mai scurt timp.",
    };
  } catch (error) {
    console.error("[submitEnrollmentAction]", error);
    return {
      status: "error",
      message:
        "A apărut o eroare la trimiterea cererii. Te rugăm să încerci din nou sau să ne suni.",
    };
  }
}
