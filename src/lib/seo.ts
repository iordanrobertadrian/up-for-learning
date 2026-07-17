import type { Metadata } from "next";

import { absoluteUrl, siteConfig } from "@/config/site";

interface PageSeoInput {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
}

const DEFAULT_OG_IMAGE = "/og-image.png";

const DEFAULT_KEYWORDS = [
  "centru educațional",
  "meditații",
  "cursuri copii",
  "matematică",
  "limba română",
  "limba engleză",
  "pregătire Evaluare Națională",
  "pregătire Cambridge",
  "ateliere educaționale",
  "tabere educaționale",
  "Up for Learning",
];

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image,
  noIndex = false,
  keywords = [],
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title
    ? `${title} · ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.taglineRo}`;

  const ogImage = absoluteUrl(image ?? DEFAULT_OG_IMAGE);

  return {
    ...(title ? { title } : {}),
    description,
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    alternates: { canonical: url },
    ...(siteConfig.verification.google
      ? { verification: { google: siteConfig.verification.google } }
      : {}),
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          secureUrl: ogImage,
          type: "image/png",
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
