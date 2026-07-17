import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/config/site";
import { ROUTES } from "@/constants/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: ROUTES.home, priority: 1, changeFrequency: "weekly" },
    { path: ROUTES.about, priority: 0.8, changeFrequency: "monthly" },
    { path: ROUTES.programs, priority: 0.9, changeFrequency: "monthly" },
    { path: ROUTES.trips, priority: 0.8, changeFrequency: "monthly" },
    { path: ROUTES.contact, priority: 0.7, changeFrequency: "yearly" },
    { path: ROUTES.enroll, priority: 0.9, changeFrequency: "monthly" },
    { path: ROUTES.privacy, priority: 0.3, changeFrequency: "yearly" },
    { path: ROUTES.cookies, priority: 0.3, changeFrequency: "yearly" },
    { path: ROUTES.terms, priority: 0.3, changeFrequency: "yearly" },
  ];

  const lastModified = new Date("2026-07-01");

  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
