import type { MetadataRoute } from "next";
import { href, listContent } from "../lib/content";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = process.env.SERVER_URL || "http://localhost:3000";
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of ["en", "es"] as const) {
    for (const pathname of ["", "about", "services", "portfolio", "contact"]) entries.push({ url: `${origin}${href(locale, pathname)}` });
    for (const collection of ["services", "projects"] as const) {
      const { docs } = await listContent(collection, locale);
      for (const doc of docs) {
        if (doc.title && doc.summary) entries.push({ url: `${origin}${href(locale, `${collection === "services" ? "services" : "portfolio"}/${doc.slug}`)}`, lastModified: doc.updatedAt });
      }
    }
  }
  return entries;
}