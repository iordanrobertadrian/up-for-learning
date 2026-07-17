import "server-only";

import nodemailer, { type Transporter } from "nodemailer";

import { isEmailConfigured, serverEnv } from "@/lib/env";

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (!isEmailConfigured()) return null;
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: serverEnv.smtp.host,
    port: serverEnv.smtp.port,
    secure: serverEnv.smtp.secure,
    auth: {
      user: serverEnv.smtp.user,
      pass: serverEnv.smtp.password,
    },
  });

  return transporter;
}

export interface MailMessage {
  subject: string;
  html: string;
  text: string;
  to?: string;
  replyTo?: string;
}

export async function sendMail(message: MailMessage): Promise<boolean> {
  const tx = getTransporter();
  if (!tx) {
    console.warn(
      "[mailer] SMTP is not configured — skipping email notification.",
    );
    return false;
  }

  await tx.sendMail({
    from: serverEnv.smtp.from,
    to: message.to ?? serverEnv.smtp.to,
    subject: message.subject,
    html: message.html,
    text: message.text,
    replyTo: message.replyTo,
  });

  return true;
}
