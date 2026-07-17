import type { ReactNode } from "react";

import { Section } from "@/components/ui/section";

export interface LegalSection {
  heading: string;
  body: ReactNode;
}

export function LegalContent({
  updatedAt,
  sections,
}: {
  updatedAt: string;
  sections: LegalSection[];
}) {
  return (
    <Section tone="white" size="narrow">
      <p className="text-sm text-ink-muted">Ultima actualizare: {updatedAt}</p>
      <div className="mt-8 space-y-10">
        {sections.map((section, index) => (
          <section key={section.heading}>
            <h2 className="text-xl font-bold text-ink sm:text-2xl">
              {index + 1}. {section.heading}
            </h2>
            <div className="prose-warm mt-3 space-y-3 text-[0.975rem] leading-relaxed">
              {section.body}
            </div>
          </section>
        ))}
      </div>
    </Section>
  );
}
