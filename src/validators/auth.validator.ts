import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Introdu adresa de email.")
    .email("Introdu o adresă de email validă."),
  password: z.string().min(1, "Introdu parola."),
});

export type LoginInput = z.infer<typeof loginSchema>;
