import type { MetadataRoute } from "next";

// Required so the route is emitted as a static file under `output: "export"`.
export const dynamic = "force-static";

const SITE_URL = "https://chinmayksingh.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
