import type { Metadata } from "next";
import { profile } from "@/data/portfolio";
export function metadataFor(title: string, path = "/"): Metadata {
  const description =
    "Bijay Timilsina — developer, designer, and digital creator based in Pokhara, Nepal. Explore my skills, interests, and ways to collaborate.";
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${profile.name}`,
      description,
      url: path,
      type: "website",
      images: [{ url: "/images/portrait.jpg", alt: profile.name }],
    },
  };
}
