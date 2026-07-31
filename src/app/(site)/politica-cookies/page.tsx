import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import {
  LegalContent,
  type LegalSection,
} from "@/components/sections/legal-content";
import { ROUTES } from "@/constants/navigation";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Politica de cookies",
  path: ROUTES.cookies,
  description:
    "Politica de cookies Up for Learning: ce sunt cookie-urile, cum le folosim și cum îți poți gestiona preferințele.",
});

const sections: LegalSection[] = [
  {
    heading: "Ce sunt cookie-urile",
    body: (
      <p>
        Cookie-urile sunt fișiere text de mici dimensiuni stocate în browserul
        tău atunci când vizitezi un site. Ele ne ajută să facem site-ul să
        funcționeze corect și să înțelegem modul în care este utilizat.
      </p>
    ),
  },
  {
    heading: "Ce tipuri de cookie-uri folosim",
    body: (
      <>
        <p>
          <strong>Cookie-uri esențiale:</strong> necesare pentru funcționarea
          site-ului (de exemplu, memorarea preferinței tale privind acest
          banner). Acestea nu pot fi dezactivate.
        </p>
        <p>
          <strong>Cookie-uri de analiză (opționale):</strong> ne ajută să
          înțelegem cum este folosit site-ul, pentru a-l îmbunătăți. Sunt
          activate doar cu acordul tău.
        </p>
      </>
    ),
  },
  {
    heading: "Gestionarea preferințelor",
    body: (
      <p>
        Îți poți exprima sau retrage consimțământul prin bannerul de cookie-uri.
        De asemenea, poți controla și șterge cookie-urile din setările
        browserului tău. Dezactivarea unor cookie-uri poate afecta funcționarea
        anumitor secțiuni.
      </p>
    ),
  },
  {
    heading: "Contact",
    body: (
      <p>
        Pentru întrebări despre politica de cookies, scrie-ne la{" "}
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="font-semibold text-brand-700 underline underline-offset-2"
        >
          {siteConfig.contact.email}
        </a>
        .
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Politica de cookies"
        description="Cum folosim cookie-urile și cum îți poți gestiona preferințele."
        breadcrumbs={[{ name: "Politica de cookies", href: ROUTES.cookies }]}
      />
      <LegalContent updatedAt="1 iulie 2026" sections={sections} />
    </>
  );
}
