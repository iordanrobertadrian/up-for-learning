import { IconCircle } from "@/components/ui/icon-circle";
import { Reveal } from "@/components/motion/reveal";
import { highlights } from "@/constants/content";

export function HighlightsSection() {
  return (
    <section className="border-y border-sage/60 bg-sage-light py-12">
      <div className="mx-auto grid w-full max-w-[1320px] gap-8 px-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {highlights.map((item, index) => (
          <Reveal
            key={item.title}
            delay={index * 0.08}
            className="flex items-center gap-4"
          >
            <IconCircle
              icon={item.icon}
              accent={index % 2 === 0 ? "brand" : "gold"}
            />
            <div>
              <p className="font-bold text-ink">{item.title}</p>
              <p className="text-sm text-ink-muted">{item.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
