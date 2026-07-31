"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site";

const CONSENT_KEY = "ufl-cookie-consent";
const CONSENT_EVENT = "ufl-consent-change";

export function Analytics() {
  const id = siteConfig.integrations.gaMeasurementId;
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        setConsented(window.localStorage.getItem(CONSENT_KEY) === "accepted");
      } catch {
        setConsented(false);
      }
    };
    read();
    window.addEventListener(CONSENT_EVENT, read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener(CONSENT_EVENT, read);
      window.removeEventListener("storage", read);
    };
  }, []);

  if (!id || !consented) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
