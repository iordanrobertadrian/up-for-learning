const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const siteConfig = {
  name: "Up for Learning",
  legalName: "Up for Learning S.R.L.",
  tagline: "From Curiosity to Performance",
  taglineRo: "De la curiozitate la performanță",
  description:
    "Centru educațional premium din România. Cursuri de Matematică, Limba română și Limba engleză, ateliere de dezvoltare personală, pregătire Cambridge și Evaluare Națională, tabere educaționale. Grupe mici, profesori dedicați, progres măsurabil.",
  url: SITE_URL,
  locale: "ro_RO",
  language: "ro",

  contact: {
    email: "contact@upforlearning.ro",
    phone: "+40 762 689 534",
    phoneHref: "tel:+40762689534",
    address: "Str. Tudor Vladimirescu, Nr. 40C",
    city: "Voluntari",
    county: "Județ Ilfov",
    postalCode: "077190",
    country: "România",
    schedule: "Luni – Vineri: 09:00 – 19:00 · Sâmbătă: 09:00 – 14:00",
    geo: {
      latitude: process.env.NEXT_PUBLIC_GEO_LATITUDE ?? "",
      longitude: process.env.NEXT_PUBLIC_GEO_LONGITUDE ?? "",
    },
  },

  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "19:00" },
    { days: ["Saturday"], opens: "09:00", closes: "14:00" },
  ],

  areaServed: ["Voluntari", "Pipera", "Ilfov", "București"],
  knowsLanguage: ["ro", "en"],
  foundingDate: "2026",
  priceRange: "$$",

  company: {
    officialName: "UP FOR LEARNING S.R.L.",
    cui: "55112125",
    registrationNumber: "J2026042487009",
    euid: "ROONRC.J2026042487009",
    caen: "8559",
    representatives: ["Fundeanu Andreea", "Mitruț Mihaela Alexandra"],
    bank: {
      name: "Banca Transilvania",
      currency: "RON",
      iban: "RO82BTRLRONCRT0DF8569601",
    },
  },

  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
      "https://www.instagram.com/up_for_learning",
  },

  integrations: {
    googleMapsEmbedUrl:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ??
      "https://maps.google.com/maps?q=Str.%20Tudor%20Vladimirescu%2040C%2C%20Voluntari%2C%20Ilfov%2C%20Rom%C3%A2nia&z=15&hl=ro&output=embed",
    googleReviewsUrl:
      process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL ??
      "https://share.google/mBAHvoSaBTchl5wUt",
    googleReviewsRating: process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_RATING ?? "",
    googleReviewsCount: process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_COUNT ?? "",
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
    presentationVideoUrl:
      process.env.NEXT_PUBLIC_PRESENTATION_VIDEO_URL ?? "",
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const absoluteUrl = (path = ""): string =>
  `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
