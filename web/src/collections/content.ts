import { APIError, type CollectionConfig, type Field } from "payload";
import { administrator, publishedOnly } from "../lib/access";

const fields: Field[] = [
  { name: "title", type: "text", localized: true, required: true },
  { name: "slug", type: "text", required: true, unique: true, index: true,
    validate: (value: unknown) => typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) || "Use lowercase words separated by hyphens.",
    admin: { description: "Permanent URL. Cannot be changed after first publication." } },
  { name: "summary", type: "textarea", localized: true, required: true },
  { name: "description", type: "textarea", localized: true },
  { name: "industry", type: "select", required: true, options: [
    { label: "Metal-mechanic", value: "metal" },
    { label: "Food industries", value: "food" },
    { label: "Other engineering", value: "other" },
  ] },
  { name: "image", type: "upload", relationTo: "media", required: true },
  { name: "gallery", type: "array", fields: [{ name: "image", type: "upload", relationTo: "media", required: true }] },
  { name: "order", type: "number", defaultValue: 0, required: true },
  { name: "featured", type: "checkbox", defaultValue: false },
  { name: "slugLocked", type: "checkbox", defaultValue: false, admin: { hidden: true }, access: { update: () => false } },
  { name: "seoTitle", type: "text", localized: true },
  { name: "seoDescription", type: "textarea", localized: true },
  { name: "legacySource", type: "text", unique: true, admin: { readOnly: true } },
];

function contentCollection(slug: "services" | "projects"): CollectionConfig {
  return {
    slug,
    admin: {
      useAsTitle: "title",
      defaultColumns: ["title", "industry", "_status", "order"],
      preview: (doc, { locale }) => `/preview?collection=${slug}&id=${doc.id}&locale=${locale}`,
      description: "Complete English and Spanish before publishing. Unpublish to archive; revisions are retained.",
    },
    defaultSort: "order",
    access: { read: publishedOnly, create: administrator, update: administrator, delete: () => false, readVersions: administrator },
    versions: { drafts: true, maxPerDoc: 30 },
    hooks: {
      beforeChange: [async ({ data, originalDoc, req }) => {
        if (originalDoc?.slugLocked && data.slug && data.slug !== originalDoc.slug) {
          throw new APIError("Published URLs are permanent. Keep the existing slug.", 400);
        }
        if (data._status === "published") {
          const otherLocale = req.locale === "es" ? "en" : "es";
          const other = originalDoc?.id ? await req.payload.findByID({
            collection: slug, id: originalDoc.id, locale: otherLocale, fallbackLocale: false,
            draft: true, depth: 0, req: { ...req, locale: otherLocale },
          }) : null;
          if (!other?.title || !other.summary) {
            throw new APIError("Save a draft in both English and Spanish before publishing.", 400);
          }
          const currentImage = data.image ?? originalDoc?.image;
          const gallery = data.gallery ?? originalDoc?.gallery ?? [];
          const images = [currentImage, ...gallery.map((item: { image: number | { id: number } }) => item.image)];
          for (const image of images) {
            const id = typeof image === "object" && image ? image.id : image;
            if (!id) continue;
            for (const locale of ["en", "es"] as const) {
              const media = await req.payload.findByID({
                collection: "media", id, locale, fallbackLocale: false, depth: 0,
                req: { ...req, locale },
              });
              if (!media.alt?.trim()) throw new APIError("Add English and Spanish image descriptions before publishing.", 400);
            }
          }
          data.slugLocked = true;
        }
        return data;
      }],
    },
    fields: slug === "projects" ? [...fields, { name: "services", type: "relationship", relationTo: "services", hasMany: true }] : fields,
  };
}

export const Services = contentCollection("services");
export const Projects = contentCollection("projects");