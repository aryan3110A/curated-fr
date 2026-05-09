import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getSitemapBlogs } from "@/services/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getSitemapBlogs();

  return [
    "",
    "/blog",
    "/categories",
    "/search",
    "/about",
    "/contact",
    ...blogs.map((blog) => `/blog/${blog.slug}`)
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date()
  }));
}