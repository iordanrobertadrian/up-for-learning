import { ProcessCard } from "@/components/cards/process-card";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { processIntro, processSteps } from "@/constants/content";

export function ProcessSection() {
  return (
    <Section id="cum-lucram" tone="cream" size="wide">
      <Reveal className="mx-auto max-w-2xl text-center">
        <div className="flex items-center justify-center gap-4">
          <span
            aria-hidden="true"
            className="h-px w-12 bg-gradient-to-r from-transparent to-sage-dark"
          />
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-brand-700 sm:text-4xl">
            {processIntro.title}
          </h2>
          <span
            aria-hidden="true"
            className="h-px w-12 bg-gradient-to-l from-transparent to-sage-dark"
          />
        </div>
        <p className="mt-4 text-base text-ink-soft sm:text-lg">
          {processIntro.description}
        </p>
      </Reveal>

      <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
        {processSteps.map((step) => (
          <StaggerItem key={step.number} className="h-full">
            <ProcessCard step={step} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
