import type { Metadata } from "next";

import { EnrollmentForm } from "@/components/form/enrollment-form";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants/navigation";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Înscrie-te",
  path: ROUTES.enroll,
  description:
    "Înscrie-te la Up for Learning. Completează formularul și te contactăm pentru a stabili programul potrivit copilului tău.",
});

export default function EnrollPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Acasă", path: ROUTES.home },
          { name: "Înscrie-te", path: ROUTES.enroll },
        ])}
      />
      <PageHero
        eyebrow="Înscrie-te"
        title={
          <>
            Începe parcursul copilului tău la{" "}
            <span className="text-gold-600">Up for Learning</span>
          </>
        }
        description="Completează formularul de mai jos, iar noi te contactăm pentru a stabili împreună programul potrivit copilului tău."
        breadcrumbs={[{ name: "Înscrie-te", href: ROUTES.enroll }]}
      />

      <Section tone="white" size="default">
        <Reveal className="mx-auto max-w-3xl">
          <EnrollmentForm />
        </Reveal>
      </Section>
    </>
  );
}
