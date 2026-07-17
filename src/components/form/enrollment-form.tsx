"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, CheckCircle2, Clock, Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { submitEnrollmentAction } from "@/actions/enrollment.actions";
import { Checkbox, Input, Select, Textarea } from "@/components/form/fields";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/toast";
import {
  PREFERRED_DAYS,
  PREFERRED_SCHEDULES,
} from "@/constants/enrollment";
import { ROUTES } from "@/constants/navigation";
import { courseOptions } from "@/constants/content";
import { cn } from "@/lib/utils";
import {
  enrollmentSchema,
  type EnrollmentInput,
} from "@/validators/enrollment.validator";

const STEPS = [
  "Date de contact",
  "Despre copil",
  "Cursul dorit",
  "Programul preferat",
  "Informații suplimentare",
] as const;

export function EnrollmentForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted) {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [submitted]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EnrollmentInput>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      childAge: "",
      childGrade: "",
      course: "",
      preferredDays: [],
      preferredSchedule: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (values: EnrollmentInput) => {
    const result = await submitEnrollmentAction(values);

    if (result.status === "success") {
      setSubmitted(true);
      reset();
      toast({
        variant: "success",
        title: "Cerere trimisă",
        description: "Te vom contacta în cel mai scurt timp.",
      });
      return;
    }

    if (result.status === "error") {
      if (result.fieldErrors) {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          setError(field as keyof EnrollmentInput, {
            type: "server",
            message,
          });
        }
      }
      toast({
        variant: "error",
        title: "Nu am putut trimite cererea",
        description: result.message,
      });
    }
  };

  if (submitted) {
    return (
      <div
        ref={successRef}
        className="flex scroll-mt-24 flex-col items-center rounded-3xl bg-white p-10 text-center shadow-card ring-1 ring-black/[0.03]"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-600">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-2xl font-bold text-ink">
          Îți mulțumim pentru înscriere!
        </h2>
        <p className="mt-3 max-w-md text-ink-soft">
          Am primit cererea ta cu succes. Echipa Up for Learning te va contacta
          în cel mai scurt timp pentru a stabili următorii pași.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => setSubmitted(false)} variant="secondary">
            Trimite o nouă cerere
          </Button>
          <Button href={ROUTES.home}>Înapoi la pagina principală</Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-black/[0.03] sm:p-8 lg:p-10"
    >
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Nu completa acest câmp</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <Step number={1} title={STEPS[0]}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Nume și prenume"
            required
            autoComplete="name"
            placeholder="ex. Maria Popescu"
            error={errors.fullName?.message}
            className="sm:col-span-2"
            {...register("fullName")}
          />
          <Input
            label="Telefon"
            type="tel"
            required
            autoComplete="tel"
            placeholder="ex. 07XX XXX XXX"
            error={errors.phone?.message}
            {...register("phone")}
          />
          <Input
            label="Email"
            type="email"
            required
            autoComplete="email"
            placeholder="ex. maria@email.ro"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
      </Step>

      <Step number={2} title={STEPS[1]}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Vârsta copilului"
            required
            placeholder="Între 6 și 18 ani"
            error={errors.childAge?.message}
            {...register("childAge")}
          />
          <Input
            label="Clasa"
            required
            placeholder="Ex: a VIII-a"
            error={errors.childGrade?.message}
            {...register("childGrade")}
          />
        </div>
      </Step>

      <Step number={3} title={STEPS[2]}>
        <Select
          label="Selectează cursul"
          required
          placeholder="Selectați cursul..."
          options={courseOptions}
          error={errors.course?.message}
          {...register("course")}
        />
      </Step>

      <Step number={4} title={STEPS[3]}>
        <Controller
          control={control}
          name="preferredDays"
          render={({ field }) => (
            <fieldset>
              <legend className="flex items-center gap-2 text-sm font-semibold text-ink">
                <CalendarDays
                  className="h-4 w-4 text-brand-600"
                  aria-hidden="true"
                />
                Zilele preferate pentru lecții
              </legend>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {PREFERRED_DAYS.map((day) => {
                  const selected = (field.value ?? []).includes(day.value);
                  return (
                    <button
                      type="button"
                      key={day.value}
                      aria-pressed={selected}
                      onClick={() =>
                        field.onChange(
                          selected
                            ? (field.value ?? []).filter((v) => v !== day.value)
                            : [...(field.value ?? []), day.value],
                        )
                      }
                      className={cn(
                        "flex h-16 w-16 flex-col items-center justify-center rounded-2xl border text-center transition-colors",
                        selected
                          ? "border-brand-500 bg-brand-50 text-brand-700"
                          : "border-sage-dark bg-white text-ink-soft hover:border-brand-300 hover:bg-brand-50/50",
                      )}
                    >
                      <span className="text-[0.65rem] uppercase text-ink-muted">
                        {day.value.charAt(0)}
                      </span>
                      <span className="text-sm font-semibold">{day.label}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}
        />

        <Controller
          control={control}
          name="preferredSchedule"
          render={({ field }) => (
            <fieldset className="mt-7">
              <legend className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Clock className="h-4 w-4 text-brand-600" aria-hidden="true" />
                Intervalul orar preferat
              </legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {PREFERRED_SCHEDULES.map((slot) => {
                  const selected = field.value === slot;
                  return (
                    <button
                      type="button"
                      key={slot}
                      aria-pressed={selected}
                      onClick={() => field.onChange(selected ? "" : slot)}
                      className={cn(
                        "rounded-2xl border px-4 py-3.5 text-sm font-semibold transition-colors",
                        selected
                          ? "border-brand-500 bg-brand-50 text-brand-700"
                          : "border-sage-dark bg-white text-ink-soft hover:border-brand-300 hover:bg-brand-50/50",
                      )}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}
        />
      </Step>

      <Step number={5} title={STEPS[4]} last>
        <Textarea
          label="Mesaj (opțional)"
          placeholder="Alte detalii despre stilul de învățare al copilului, nevoi specifice sau întrebări..."
          error={errors.message?.message}
          {...register("message")}
        />
      </Step>

      <div className="mt-8">
        <Checkbox
          label={
            <>
              Sunt de acord cu prelucrarea datelor personale conform{" "}
              <Link
                href={ROUTES.privacy}
                className="font-semibold text-brand-700 underline underline-offset-2"
                target="_blank"
              >
                Politicii de confidențialitate
              </Link>
              .
            </>
          }
          error={errors.consent?.message}
          {...register("consent")}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="mt-7 w-full sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Spinner className="h-5 w-5" />
            Se trimite…
          </>
        ) : (
          <>
            <Send className="h-5 w-5" aria-hidden="true" />
            Trimite cererea de înscriere
          </>
        )}
      </Button>
    </form>
  );
}

function Step({
  number,
  title,
  last,
  children,
}: {
  number: number;
  title: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={cn(!last && "mb-8 border-b border-sage/60 pb-8")}>
      <h3 className="mb-5 flex items-center gap-3 font-display text-lg font-bold text-ink">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-400 text-sm font-bold text-brand-900">
          {number}
        </span>
        {title}
      </h3>
      {children}
    </section>
  );
}
