"use client";

import { useEffect } from "react";

export function SiteCredit() {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      "%c Realizat de iWeb Digital %c https://iweb-digital.ro ",
      "background:#688257;color:#fff;font-weight:700;padding:4px 8px;border-radius:6px 0 0 6px",
      "background:#CEAA65;color:#1a1a1a;font-weight:600;padding:4px 8px;border-radius:0 6px 6px 0",
    );
  }, []);

  return null;
}
