import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { MapEmbed } from "@/components/sections/map-embed";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { IconCircle } from "@/components/ui/icon-circle";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants/navigation";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  path: ROUTES.contact,
  description:
    "Contactează Up for Learning: adresă, telefon, email și program. Suntem la un mesaj distanță pentru a găsi împreună programul potrivit copilului tău.",
});

const contactItems = [
  {
    icon: MapPin,
    label: "Adresă",
    value: `${siteConfig.contact.address}, ${siteConfig.contact.city}, ${siteConfig.contact.county}`,
    href: undefined,
  },
  {
    icon: Phone,
    label: "Telefon",
    value: siteConfig.contact.phone,
    href: siteConfig.contact.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: Clock,
    label: "Program",
    value: siteConfig.contact.schedule,
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Acasă", path: ROUTES.home },
          { name: "Contact", path: ROUTES.contact },
        ])}
      />
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Hai să ne <span className="text-gold-600">cunoaștem</span>
          </>
        }
        description="Ai întrebări despre programe, ateliere sau tabere? Scrie-ne, sună-ne sau programează o vizită. Îți răspundem cu drag."
        breadcrumbs={[{ name: "Contact", href: ROUTES.contact }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={ROUTES.enroll} size="lg">
            Programează o vizită
          </Button>
          <Button
            href={siteConfig.contact.phoneHref}
            variant="secondary"
            size="lg"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            Sună acum
          </Button>
        </div>
      </PageHero>

      <Section tone="white" size="wide">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {contactItems.map((item, index) => (
                <Reveal
                  key={item.label}
                  delay={index * 0.06}
                  className="rounded-3xl bg-cream/70 p-6 ring-1 ring-black/[0.03]"
                >
                  <IconCircle
                    icon={item.icon}
                    accent={index % 2 === 0 ? "brand" : "gold"}
                  />
                  <p className="mt-4 text-xs font-bold uppercase tracking-wide text-ink-muted">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-1 block font-semibold text-ink transition-colors hover:text-brand-700"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 font-semibold text-ink">{item.value}</p>
                  )}
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-6 rounded-3xl bg-brand-700 p-7 text-cream">
              <h2 className="text-lg font-bold text-cream">Urmărește-ne</h2>
              <p className="mt-1.5 text-sm text-cream/80">
                Noutăți, activități și momente din viața Up for Learning.
              </p>
              <div className="mt-5 flex gap-3">
                {siteConfig.social.facebook ? (
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-gold-400 hover:text-brand-900"
                  >
                    <Facebook className="h-5 w-5" aria-hidden="true" />
                  </a>
                ) : null}
                {siteConfig.social.instagram ? (
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-gold-400 hover:text-brand-900"
                  >
                    <Instagram className="h-5 w-5" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </Reveal>
          </div>

          <Reveal direction="left" className="min-h-[420px]">
            <MapEmbed className="h-full min-h-[420px]" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
