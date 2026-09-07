import type { MetadataRoute } from "next";
import { cakes } from "@/lib/cakes";
import { primaryNav, site } from "@/lib/site";

/**
 * Static sitemap.
 *
 * `output: "export"` renders this to `sitemap.xml` at build time, so the file
 * ships with the bundle and needs no server.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = ["/", ...primaryNav.map((link) => link.href)].map((route) => ({
    url: `${site.url}${route === "/" ? "/" : `${route}/`}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));

  const cakeRoutes = cakes.map((cake) => ({
    url: `${site.url}/cakes/${cake.slug}/`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...cakeRoutes];
}
