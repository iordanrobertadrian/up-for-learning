const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (!value || value.trim().length === 0) {
    throw new Error(
      `Missing required environment variable "${key}". Copy .env.example to .env.local and fill it in.`,
    );
  }
  return value;
};

export const serverEnv = {
  get mongodbUri(): string {
    return requireEnv("MONGODB_URI");
  },
  get authSecret(): string {
    return requireEnv("AUTH_SECRET");
  },
  get adminEmail(): string {
    return requireEnv("ADMIN_EMAIL").toLowerCase();
  },
  get adminPasswordHash(): string {
    return requireEnv("ADMIN_PASSWORD_HASH");
  },
  smtp: {
    host: process.env.SMTP_HOST ?? "",
    port: Number(process.env.SMTP_PORT ?? "587"),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER ?? "",
    password: process.env.SMTP_PASSWORD ?? "",
    from:
      process.env.MAIL_FROM ??
      "Up for Learning <contact@upforlearning.ro>",
    to: process.env.MAIL_TO ?? "contact@upforlearning.ro",
  },
} as const;

export const isEmailConfigured = (): boolean =>
  Boolean(serverEnv.smtp.host && serverEnv.smtp.user && serverEnv.smtp.password);
