import type { Metadata, Viewport } from "next";

import "@/app/globals.css";
import { Analytics } from "@/components/seo/analytics";
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
} from "@/components/seo/json-ld";
import { SiteCredit } from "@/components/seo/site-credit";
import { ToastProvider } from "@/components/ui/toast";
import { fraunces, nunito } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...buildMetadata({ path: "/" }),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s · ${siteConfig.name}`,
  },
  applicationName: siteConfig.name,
  authors: [{ name: "iWeb Digital", url: "https://iweb-digital.ro" }],
  creator: "iWeb Digital",
  publisher: siteConfig.legalName,
  other: {
    "designed-by": "iWeb Digital",
    "developed-by": "iWeb Digital — https://iweb-digital.ro",
  },
  formatDetection: { telephone: true, email: true, address: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "1024x1024" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#688257",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={cn(nunito.variable, fraunces.variable)}>
      {/* Extensiile de browser injectează atribute pe <body> înainte să pornească
          React (ex. cz-shortcut-listen de la ColorZilla), ceea ce produce un
          hydration warning fals în dev. */}
      <body
        className="min-h-dvh bg-cream font-sans text-ink"
        suppressHydrationWarning
      >
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <ToastProvider>{children}</ToastProvider>
        <SiteCredit />
        <Analytics />
      </body>
    </html>
  );
}
