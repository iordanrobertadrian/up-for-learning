"use client";

import { LogIn } from "lucide-react";
import { useActionState } from "react";

import { loginAction } from "@/actions/admin.actions";
import type { FormState } from "@/actions/types";
import { Input } from "@/components/form/fields";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const initialState: FormState = { status: "idle" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  const fieldErrors =
    state.status === "error" ? state.fieldErrors : undefined;

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.status === "error" && !state.fieldErrors ? (
        <p
          role="alert"
          className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-200"
        >
          {state.message}
        </p>
      ) : null}

      <Input
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="username"
        placeholder="admin@upforlearning.ro"
        error={fieldErrors?.email}
      />
      <Input
        label="Parolă"
        name="password"
        type="password"
        required
        autoComplete="current-password"
        placeholder="••••••••"
        error={fieldErrors?.password}
      />

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? (
          <>
            <Spinner className="h-5 w-5" />
            Se autentifică…
          </>
        ) : (
          <>
            <LogIn className="h-5 w-5" aria-hidden="true" />
            Autentificare
          </>
        )}
      </Button>
    </form>
  );
}
