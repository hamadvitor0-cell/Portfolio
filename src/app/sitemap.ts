import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/cases/centro-da-juventude", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/cases/hamadflow", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/curriculo", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/privacidade", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return routes.map((route) => ({
    url: `${siteConfig.seo.siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
