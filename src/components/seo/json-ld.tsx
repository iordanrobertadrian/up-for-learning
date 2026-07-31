import { absoluteUrl, siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/navigation";
import type { CoursePrice } from "@/types";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

const agency = () => ({
  "@type": "Organization",
  "@id": "https://iweb-digital.ro/#organization",
  name: "iWeb Digital",
  url: "https://iweb-digital.ro",
});

const TELEPHONES = siteConfig.contact.phones.map((phone) => phone.value);

const postalAddress = () => ({
  "@type": "PostalAddress",
  streetAddress: siteConfig.contact.address,
  addressLocality: siteConfig.contact.city,
  addressRegion: siteConfig.contact.county,
  postalCode: siteConfig.contact.postalCode,
  addressCountry: "RO",
});

export function organizationSchema(): Record<string, unknown> {
  const { geo } = siteConfig.contact;
  const hasGeo = Boolean(geo.latitude && geo.longitude);

  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": ORGANIZATION_ID,
    name: siteConfig.name,
    legalName: siteConfig.company.officialName,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icon.png"),
    },
    image: absoluteUrl("/og-image.png"),
    description: siteConfig.description,
    slogan: siteConfig.taglineRo,
    email: siteConfig.contact.email,
    telephone: TELEPHONES,
    priceRange: siteConfig.priceRange,
    foundingDate: siteConfig.foundingDate,
    taxID: siteConfig.company.cui,
    vatID: `RO${siteConfig.company.cui}`,
    knowsLanguage: siteConfig.knowsLanguage,
    areaServed: siteConfig.areaServed.map((name) => ({
      "@type": "Place",
      name,
    })),
    hasMap: siteConfig.integrations.googleMapsEmbedUrl,
    address: postalAddress(),
    ...(hasGeo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: geo.latitude,
            longitude: geo.longitude,
          },
        }
      : {}),
    openingHoursSpecification: siteConfig.openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: TELEPHONES,
      email: siteConfig.contact.email,
      areaServed: "RO",
      availableLanguage: siteConfig.knowsLanguage,
    },
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram].filter(
      Boolean,
    ),
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "ro-RO",
    publisher: { "@id": ORGANIZATION_ID },
    creator: agency(),
    author: agency(),
    copyrightHolder: { "@id": ORGANIZATION_ID },
    copyrightYear: 2026,
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function courseSchema(course: {
  name: string;
  description: string;
  price: CoursePrice;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    inLanguage: "ro-RO",
    provider: {
      "@type": "EducationalOrganization",
      "@id": ORGANIZATION_ID,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    offers: {
      "@type": "Offer",
      category: "Paid",
      price: course.price.amount,
      priceCurrency: course.price.currency,
      availability: "https://schema.org/InStock",
      url: absoluteUrl(ROUTES.enroll),
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Onsite",
      courseWorkload: "PT2H",
      inLanguage: "ro-RO",
      location: {
        "@type": "Place",
        name: siteConfig.name,
        address: postalAddress(),
      },
    },
  };
}
