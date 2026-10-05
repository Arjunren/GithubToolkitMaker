import type { MetadataRoute } from "next";
import { toolSlugs } from "@/data/tools";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://github-markdown-toolkit.vercel.app";
  return [
    "",
    "/builder",
    "/playground",
    ...toolSlugs.map((slug) => `/${slug}`),
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
