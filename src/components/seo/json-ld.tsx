import { absoluteUrl, siteConfig } from "@/config/site";

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
    telephone: siteConfig.contact.phone,
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
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressLocality: siteConfig.contact.city,
      addressRegion: siteConfig.contact.county,
      postalCode: siteConfig.contact.postalCode,
      addressCountry: "RO",
    },
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
      telephone: siteConfig.contact.phone,
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
  };
}
