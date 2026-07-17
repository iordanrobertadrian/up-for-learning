import "server-only";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

import { serverEnv } from "@/lib/env";
import {
  SESSION_COOKIE,
  SESSION_DURATION_SECONDS,
  createSessionToken,
  verifySessionToken,
  type SessionPayload,
} from "@/lib/session";

export type { SessionPayload };
export { SESSION_COOKIE };

export async function verifyCredentials(
  email: string,
  password: string,
): Promise<boolean> {
  const emailMatches = email.trim().toLowerCase() === serverEnv.adminEmail;
  const passwordMatches = await bcrypt.compare(
    password,
    serverEnv.adminPasswordHash,
  );
  return emailMatches && passwordMatches;
}

export async function createSession(email: string): Promise<void> {
  const token = await createSessionToken(email);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}
