import type { Metadata } from "next";

import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { HighlightsSection } from "@/components/sections/highlights";
import { ProcessSection } from "@/components/sections/process";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/",
  description:
    "Up for Learning — de la curiozitate la performanță. Un parcurs educațional clar, structurat și adaptat fiecărui copil: grupe mici, profesori dedicați și progres măsurabil.",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProcessSection />
      <HighlightsSection />
      <Gallery />
    </>
  );
}
