import type { MetadataRoute } from "next";
import { profile } from "@/data/portfolio";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "about/", "services/", "skills/", "projects/", "contact/"].map(
    (path) => ({
      url: `${profile.url}/${path}`,
      changeFrequency: "monthly",
      priority: path ? 0.7 : 1,
    }),
  );
}
