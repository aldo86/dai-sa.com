import { getPayload } from "payload";
import config from "@payload-config";
import { headers } from "next/headers";

export type Locale = "en" | "es";
export const href = (locale: Locale, pathname = "") => `${locale === "es" ? "/es" : ""}/${pathname}`.replace(/\/$/, "") || "/";

export function resolveRoute(segments: string[] = []) {
  const locale: Locale = segments[0] === "es" ? "es" : "en";
  return { locale, parts: locale === "es" ? segments.slice(1) : segments };
}

export async function listContent(collection: "services" | "projects", locale: Locale, industry?: string) {
  const payload = await getPayload({ config });
  return payload.find({
    collection, locale, fallbackLocale: false, overrideAccess: false, draft: false,
    where: { and: [{ _status: { equals: "published" } }, ...(industry ? [{ industry: { equals: industry } }] : [])] },
    depth: 1, limit: 100, sort: "order",
  });
}

export async function getRecord(collection: "services" | "projects", slug: string, locale: Locale, preview?: string) {
  const payload = await getPayload({ config });
  const { user } = preview ? await payload.auth({ headers: await headers() }) : { user: null };
  const result = await payload.find({
    collection, locale, fallbackLocale: false, overrideAccess: false, user,
    draft: Boolean(preview && user), depth: 1, limit: 1,
    where: { and: [
      { slug: { equals: slug } },
      ...(preview && user ? [{ id: { equals: preview } }] : [{ _status: { equals: "published" } }]),
    ] },
  });
  return { record: result.docs[0], previewing: Boolean(user && preview) };
}