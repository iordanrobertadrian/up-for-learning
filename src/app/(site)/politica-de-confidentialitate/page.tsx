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
  title: "Politica de confidențialitate",
  path: ROUTES.privacy,
  description:
    "Politica de confidențialitate Up for Learning: cum colectăm, folosim și protejăm datele personale, în conformitate cu Regulamentul GDPR.",
});

const sections: LegalSection[] = [
  {
    heading: "Cine suntem",
    body: (
      <p>
        Operatorul datelor este {siteConfig.company.officialName} („Up for
        Learning”, „noi”), cu sediul în {siteConfig.contact.address},{" "}
        {siteConfig.contact.city}, {siteConfig.contact.county}, CUI{" "}
        {siteConfig.company.cui}, înregistrată la Registrul Comerțului sub nr.{" "}
        {siteConfig.company.registrationNumber}. Operăm site-ul {siteConfig.url}{" "}
        și ne dedicăm protejării datelor cu caracter personal ale vizitatorilor
        și beneficiarilor serviciilor noastre, în conformitate cu Regulamentul
        (UE) 2016/679 (GDPR).
      </p>
    ),
  },
  {
    heading: "Ce date colectăm",
    body: (
      <p>
        Prin formularul de înscriere colectăm: numele și prenumele, numărul de
        telefon, adresa de email, vârsta sau clasa copilului, cursul dorit și
        eventualele informații suplimentare pe care alegi să le comunici.
        Colectăm doar datele necesare pentru a răspunde solicitării tale.
      </p>
    ),
  },
  {
    heading: "Scopul prelucrării",
    body: (
      <p>
        Folosim datele pentru a te contacta în legătură cu solicitarea trimisă,
        pentru a stabili programul potrivit copilului și pentru a gestiona
        relația educațională. Nu folosim datele în scopuri de marketing fără
        acordul tău explicit.
      </p>
    ),
  },
  {
    heading: "Temeiul legal",
    body: (
      <p>
        Prelucrarea se bazează pe consimțământul tău (art. 6 alin. 1 lit. a
        GDPR) și, după caz, pe demersurile precontractuale efectuate la cererea
        ta (art. 6 alin. 1 lit. b GDPR).
      </p>
    ),
  },
  {
    heading: "Perioada de stocare",
    body: (
      <p>
        Păstrăm datele doar cât este necesar pentru scopurile de mai sus sau
        pentru respectarea obligațiilor legale. Ulterior, datele sunt șterse în
        siguranță.
      </p>
    ),
  },
  {
    heading: "Drepturile tale",
    body: (
      <p>
        Ai dreptul de acces, rectificare, ștergere, restricționare, portabilitate
        și opoziție, precum și dreptul de a-ți retrage consimțământul în orice
        moment. Pentru exercitarea acestor drepturi, ne poți scrie la{" "}
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
  {
    heading: "Contact",
    body: (
      <p>
        Pentru orice întrebare privind protecția datelor, ne poți contacta la{" "}
        {siteConfig.contact.email} sau la {siteConfig.contact.phone}. Ai, de
        asemenea, dreptul de a depune o plângere la Autoritatea Națională de
        Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP).
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Politica de confidențialitate"
        description="Transparență privind modul în care colectăm și protejăm datele tale personale."
        breadcrumbs={[
          { name: "Politica de confidențialitate", href: ROUTES.privacy },
        ]}
      />
      <LegalContent updatedAt="1 iulie 2026" sections={sections} />
    </>
  );
}
