import { MetadataRoute } from "next";
import { getAllLogos } from "@/lib/logos";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const logos = await getAllLogos();
  const baseUrl = SITE_URL;

  const logoEntries: MetadataRoute.Sitemap = logos.map((logo) => ({
    url: `${baseUrl}/logo/${logo.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...logoEntries,
  ];
}
