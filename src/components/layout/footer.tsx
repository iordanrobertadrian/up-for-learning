import { Facebook, Instagram, Mail, MapPin, Phone, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Logo } from "@/components/ui/logo";
import { footerNav } from "@/constants/navigation";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = 2026;

  return (
    <footer className="border-t border-sage/70 bg-brand-800 text-cream/90">
      <div className="mx-auto w-full max-w-[1320px] px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="inline-block rounded-2xl bg-cream/95 p-3">
              <Logo asLink={false} className="w-[150px]" />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/75">
              {siteConfig.legalName} — centru educațional premium.{" "}
              {siteConfig.taglineRo}.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {siteConfig.social.facebook ? (
                <SocialLink
                  href={siteConfig.social.facebook}
                  label="Facebook"
                  icon={Facebook}
                />
              ) : null}
              {siteConfig.social.instagram ? (
                <SocialLink
                  href={siteConfig.social.instagram}
                  label="Instagram"
                  icon={Instagram}
                />
              ) : null}
            </div>
            {siteConfig.integrations.googleReviewsUrl ? (
              <GoogleReviews
                href={siteConfig.integrations.googleReviewsUrl}
                rating={siteConfig.integrations.googleReviewsRating}
                count={siteConfig.integrations.googleReviewsCount}
              />
            ) : null}
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm font-bold uppercase tracking-wide text-gold-200">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/75 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 grid gap-4 border-t border-cream/15 pt-8 sm:grid-cols-3">
          <ContactRow icon={MapPin}>
            {siteConfig.contact.address}, {siteConfig.contact.city}
          </ContactRow>
          <ContactRow icon={Phone}>
            <a
              href={siteConfig.contact.phoneHref}
              className="transition-colors hover:text-cream"
            >
              {siteConfig.contact.phone}
            </a>
          </ContactRow>
          <ContactRow icon={Mail}>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="transition-colors hover:text-cream"
            >
              {siteConfig.contact.email}
            </a>
          </ContactRow>
        </div>

        <div className="mt-12 border-t border-cream/15 pt-6 text-xs leading-relaxed text-cream/75">
          <p>
            {siteConfig.company.officialName} · CUI {siteConfig.company.cui} ·
            Reg. Com. {siteConfig.company.registrationNumber} · EUID{" "}
            {siteConfig.company.euid}
          </p>
        </div>

        <div className="mt-4 flex flex-col items-center justify-between gap-3 pt-2 text-xs text-cream/80 sm:flex-row">
          <p>
            © {year} {siteConfig.legalName}. Toate drepturile rezervate.
          </p>
          <a
            href="https://iweb-digital.ro"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Realizat de iWeb Digital"
            className="group inline-flex items-center gap-2 rounded-full bg-cream/10 py-1.5 pl-2 pr-3.5 text-cream/70 ring-1 ring-cream/15 transition-colors hover:bg-cream/15 hover:text-cream"
          >
            <Image
              src="/images/iweb-digital.png"
              alt="iWeb Digital"
              width={22}
              height={22}
              className="h-[22px] w-[22px] rounded-full"
            />
            <span>
              Realizat de{" "}
              <span className="font-semibold text-cream/90 group-hover:text-cream">
                iWeb Digital
              </span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

function GoogleReviews({
  href,
  rating,
  count,
}: {
  href: string;
  rating?: string;
  count?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Recenziile noastre pe Google"
      className="group mt-6 inline-flex items-center gap-3 rounded-2xl bg-white py-2.5 pl-3.5 pr-4 shadow-soft ring-1 ring-black/5 transition-all hover:shadow-card"
    >
      <span className="text-base font-bold leading-none tracking-tight">
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-[#34A853]">l</span>
        <span className="text-[#EA4335]">e</span>
      </span>
      <span className="h-6 w-px bg-black/10" aria-hidden="true" />
      <span className="flex flex-col gap-0.5">
        <span className="flex items-center gap-1.5">
          <span className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-3.5 w-3.5 fill-gold-400 text-gold-400"
                aria-hidden="true"
              />
            ))}
          </span>
          {rating ? (
            <span className="text-xs font-bold text-ink">{rating}</span>
          ) : null}
        </span>
        <span className="text-xs font-medium text-ink-soft">
          {count ? `${count} recenzii pe Google` : "Recenzii pe Google"}
        </span>
      </span>
    </a>
  );
}

function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: typeof Facebook;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-gold-400 hover:text-brand-900"
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </a>
  );
}

function ContactRow({
  icon: Icon,
  children,
}: {
  icon: typeof MapPin;
  children: React.ReactNode;
}) {
  return (
    <p className="flex items-center gap-3 text-sm text-cream/80">
      <Icon className="h-4 w-4 shrink-0 text-gold-200" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
