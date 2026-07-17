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
  title: "Termeni și condiții",
  path: ROUTES.terms,
  description:
    "Termenii și condițiile de utilizare a site-ului Up for Learning și a serviciilor educaționale oferite.",
});

const sections: LegalSection[] = [
  {
    heading: "Datele societății",
    body: (
      <ul className="space-y-1.5">
        <li>
          <strong>Denumire:</strong> {siteConfig.company.officialName}
        </li>
        <li>
          <strong>Sediu social:</strong> {siteConfig.contact.address},{" "}
          {siteConfig.contact.city}, {siteConfig.contact.county},{" "}
          {siteConfig.contact.country}
        </li>
        <li>
          <strong>CUI:</strong> {siteConfig.company.cui}
        </li>
        <li>
          <strong>Nr. Registrul Comerțului:</strong>{" "}
          {siteConfig.company.registrationNumber}
        </li>
        <li>
          <strong>EUID:</strong> {siteConfig.company.euid}
        </li>
        <li>
          <strong>Cod CAEN principal:</strong> {siteConfig.company.caen}
        </li>
        <li>
          <strong>Reprezentanți legali:</strong>{" "}
          {siteConfig.company.representatives.join(", ")}
        </li>
        <li>
          <strong>Cont bancar (IBAN):</strong> {siteConfig.company.bank.iban} (
          {siteConfig.company.bank.currency}), deschis la{" "}
          {siteConfig.company.bank.name}
        </li>
      </ul>
    ),
  },
  {
    heading: "Acceptarea termenilor",
    body: (
      <p>
        Prin utilizarea site-ului {siteConfig.url} și a serviciilor {" "}
        {siteConfig.legalName}, ești de acord cu prezentele termeni și condiții.
        Te rugăm să le citești cu atenție.
      </p>
    ),
  },
  {
    heading: "Serviciile oferite",
    body: (
      <p>
        Up for Learning oferă cursuri educaționale, ateliere și tabere pentru
        copii și adolescenți. Detaliile programelor, prețurile și disponibilitatea
        pot fi actualizate periodic și sunt confirmate în urma contactului direct.
      </p>
    ),
  },
  {
    heading: "Înscrieri și programări",
    body: (
      <p>
        Formularul de înscriere reprezintă o solicitare de contact, nu o
        confirmare automată a locului. Vom lua legătura cu tine pentru a stabili
        detaliile și a confirma disponibilitatea.
      </p>
    ),
  },
  {
    heading: "Proprietate intelectuală",
    body: (
      <p>
        Conținutul site-ului (texte, logo, materiale grafice) aparține {" "}
        {siteConfig.legalName} și este protejat de legislația privind proprietatea
        intelectuală. Reproducerea fără acord este interzisă.
      </p>
    ),
  },
  {
    heading: "Limitarea răspunderii",
    body: (
      <p>
        Depunem toate eforturile pentru ca informațiile de pe site să fie corecte
        și actuale. Nu ne asumăm răspunderea pentru eventuale erori sau pentru
        deciziile luate exclusiv pe baza informațiilor de pe site.
      </p>
    ),
  },
  {
    heading: "Contact",
    body: (
      <p>
        Pentru întrebări privind acești termeni, ne poți contacta la{" "}
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

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Termeni și condiții"
        description="Regulile de utilizare a site-ului și a serviciilor Up for Learning."
        breadcrumbs={[{ name: "Termeni și condiții", href: ROUTES.terms }]}
      />
      <LegalContent updatedAt="1 iulie 2026" sections={sections} />
    </>
  );
}
