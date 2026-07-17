import "server-only";

import { buildEnrollmentConfirmationEmail } from "@/emails/enrollment-confirmation";
import { buildEnrollmentNotificationEmail } from "@/emails/enrollment-notification";
import { sendMail } from "@/lib/mailer";
import {
  countByStatus,
  createEnrollment,
  deleteEnrollment,
  findEnrollments,
  updateEnrollmentStatus,
  type FindEnrollmentsParams,
  type FindEnrollmentsResult,
} from "@/repositories/enrollment.repository";
import type { EnrollmentInput } from "@/validators/enrollment.validator";
import type { EnrollmentDTO, EnrollmentStatus } from "@/types";

export async function submitEnrollment(
  input: EnrollmentInput,
): Promise<EnrollmentDTO> {
  const enrollment = await createEnrollment({
    fullName: input.fullName,
    phone: input.phone,
    email: input.email,
    childAge: input.childAge,
    childGrade: input.childGrade,
    course: input.course,
    preferredDays: input.preferredDays ?? [],
    preferredSchedule: input.preferredSchedule ?? "",
    message: input.message ?? "",
    consent: input.consent,
  });

  try {
    const email = buildEnrollmentNotificationEmail(enrollment);
    await sendMail({ ...email, replyTo: enrollment.email });
  } catch (error) {
    console.error("[enrollment.service] Failed to send notification:", error);
  }

  try {
    const confirmation = buildEnrollmentConfirmationEmail(enrollment);
    await sendMail({ ...confirmation, to: enrollment.email });
  } catch (error) {
    console.error("[enrollment.service] Failed to send confirmation:", error);
  }

  return enrollment;
}

export async function listEnrollments(
  params: FindEnrollmentsParams,
): Promise<FindEnrollmentsResult> {
  return findEnrollments(params);
}

export async function getEnrollmentStats(): Promise<
  Record<EnrollmentStatus, number> & { total: number }
> {
  return countByStatus();
}

export async function changeEnrollmentStatus(
  id: string,
  status: EnrollmentStatus,
): Promise<EnrollmentDTO | null> {
  return updateEnrollmentStatus(id, status);
}

export async function removeEnrollment(id: string): Promise<boolean> {
  return deleteEnrollment(id);
}
