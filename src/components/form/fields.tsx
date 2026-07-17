"use client";

import { forwardRef } from "react";
import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import { cn } from "@/lib/utils";

const baseField =
  "w-full rounded-2xl border border-sage-dark bg-white px-4 py-3 text-ink placeholder:text-ink-muted/60 shadow-sm transition-colors focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 disabled:opacity-60 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-200";

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function FieldWrapper({
  label,
  htmlFor,
  error,
  required,
  hint,
  children,
  className,
}: FieldWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-semibold text-ink"
      >
        {label}
        {required ? <span className="ml-0.5 text-gold-600">*</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p className="text-xs text-ink-muted">{hint}</p>
      ) : null}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="text-xs font-medium text-red-600"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, id, required, className, ...props },
  ref,
) {
  const fieldId = id ?? props.name ?? label;
  return (
    <FieldWrapper
      label={label}
      htmlFor={fieldId}
      error={error}
      hint={hint}
      required={required}
      className={className}
    >
      <input
        ref={ref}
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={baseField}
        {...props}
      />
    </FieldWrapper>
  );
});

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, error, hint, id, required, className, ...props }, ref) {
    const fieldId = id ?? props.name ?? label;
    return (
      <FieldWrapper
        label={label}
        htmlFor={fieldId}
        error={error}
        hint={hint}
        required={required}
        className={className}
      >
        <textarea
          ref={ref}
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className={cn(baseField, "min-h-[120px] resize-y")}
          {...props}
        />
      </FieldWrapper>
    );
  },
);

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  hint?: string;
  options: string[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, hint, id, required, className, options, placeholder, ...props },
  ref,
) {
  const fieldId = id ?? props.name ?? label;
  return (
    <FieldWrapper
      label={label}
      htmlFor={fieldId}
      error={error}
      hint={hint}
      required={required}
      className={className}
    >
      <select
        ref={ref}
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn(baseField, "appearance-none bg-[right_1rem_center] pr-10")}
        defaultValue=""
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
});

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, error, id, className, ...props }, ref) {
    const fieldId = id ?? props.name ?? "checkbox";
    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <label
          htmlFor={fieldId}
          className="flex cursor-pointer items-start gap-3 text-sm text-ink-soft"
        >
          <input
            ref={ref}
            id={fieldId}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 rounded-md border-sage-dark text-brand-600 focus:ring-brand-300"
            {...props}
          />
          <span>{label}</span>
        </label>
        {error ? (
          <p role="alert" className="text-xs font-medium text-red-600">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
