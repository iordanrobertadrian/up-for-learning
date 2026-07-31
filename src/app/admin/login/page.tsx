import { LoginForm } from "@/components/admin/login-form";
import { Logo } from "@/components/ui/logo";
import { Blob } from "@/components/ui/decorations";

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-5 py-12">
      <Blob className="-left-20 top-10 h-72 w-72" color="sage" />
      <Blob className="-right-20 bottom-10 h-72 w-72" color="gold" />

      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo asLink={false} className="w-[170px]" priority />
          <h1 className="mt-6 font-display text-2xl font-bold text-ink">
            Panou de administrare
          </h1>
          <p className="mt-1.5 text-sm text-ink-muted">
            Autentifică-te pentru a gestiona înscrierile.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-7 shadow-lift ring-1 ring-black/5 sm:p-8">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-ink-muted">
          Acces restricționat · Up for Learning
        </p>
      </div>
    </div>
  );
}
