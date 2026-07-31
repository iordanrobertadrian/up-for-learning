import { z } from "zod";

import { ENROLLMENT_STATUSES } from "@/constants/enrollment";

const ROMANIAN_PHONE = /^(?:\+?4?0)?7\d{8}$|^(?:\+?4?0)?[23]\d{8}$/;

export const enrollmentSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Introdu numele și prenumele.")
    .max(120, "Numele este prea lung."),
  phone: z
    .string()
    .trim()
    .min(6, "Introdu un număr de telefon valid.")
    .max(40, "Numărul de telefon este prea lung.")
    .refine(
      (value) => ROMANIAN_PHONE.test(value.replace(/[\s.-]/g, "")),
      "Introdu un număr de telefon românesc valid.",
    ),
  email: z
    .string()
    .trim()
    .min(1, "Introdu adresa de email.")
    .email("Introdu o adresă de email validă.")
    .max(160, "Adresa de email este prea lungă."),
  childAge: z
    .string()
    .trim()
    .min(1, "Precizează vârsta copilului.")
    .max(60, "Textul este prea lung."),
  childGrade: z
    .string()
    .trim()
    .min(1, "Precizează clasa copilului.")
    .max(60, "Textul este prea lung."),
  course: z
    .string()
    .trim()
    .min(1, "Alege cursul dorit.")
    .max(120, "Textul este prea lung."),
  preferredDays: z
    .array(z.string().trim().max(20))
    .max(7, "Prea multe zile selectate.")
    .optional()
    .default([]),
  preferredSchedule: z
    .string()
    .trim()
    .max(40, "Textul este prea lung.")
    .optional()
    .default(""),
  message: z
    .string()
    .trim()
    .max(2000, "Mesajul este prea lung.")
    .optional()
    .default(""),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "Este necesar acordul pentru prelucrarea datelor.",
    }),
  }),
  website: z.string().max(0, "").optional().default(""),
});

export type EnrollmentInput = z.infer<typeof enrollmentSchema>;

export const enrollmentStatusSchema = z.enum(
  ENROLLMENT_STATUSES as [string, ...string[]],
);

export const updateStatusSchema = z.object({
  id: z.string().min(1),
  status: enrollmentStatusSchema,
});

export const deleteEnrollmentSchema = z.object({
  id: z.string().min(1),
});
