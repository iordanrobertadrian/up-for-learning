import type { Metadata } from "next";

import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { HighlightsSection } from "@/components/sections/highlights";
import { ProcessSection } from "@/components/sections/process";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/",
  description:
    "Centru educațional în Voluntari, Ilfov: meditații și cursuri de Limba română, Matematică și Limba engleză pentru clasele I – VIII. Grupe mici, profesori dedicați și progres măsurabil. 80 lei/oră, 2 ore/sesiune.",
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
