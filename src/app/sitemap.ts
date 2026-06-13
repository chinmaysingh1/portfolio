import type { MetadataRoute } from "next";

// Required so the route is emitted as a static file under `output: "export"`.
export const dynamic = "force-static";

const SITE_URL = "https://chinmayksingh.com";

// URLs carry a trailing slash to match `trailingSlash: true` in next.config.ts,
// keeping the sitemap aligned with the canonical URLs the pages declare.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/hardware/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/gallery/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
