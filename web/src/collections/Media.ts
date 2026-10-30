import path from "node:path";
import sharp from "sharp";
import { APIError, type CollectionConfig } from "payload";
import { administrator } from "../lib/access";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "alt",
    description: "Public website images only. Do not upload confidential drawings or documents.",
  },
  access: { read: () => true, create: administrator, update: administrator, delete: administrator },
  upload: {
    staticDir: process.env.MEDIA_DIR || path.resolve("../.daisa-data/media"),
    mimeTypes: ["image/jpeg", "image/png", "image/webp"],
    pasteURL: false,
    focalPoint: true,
    imageSizes: [
      { name: "thumbnail", width: 480, height: 360, withoutEnlargement: true },
      { name: "large", width: 1600, withoutEnlargement: true },
    ],
    adminThumbnail: "thumbnail",
  },
  hooks: {
    beforeOperation: [async ({ operation, req }) => {
      if ((operation === "create" || operation === "update") && req.file) {
        const metadata = await sharp(req.file.data, { limitInputPixels: 40_000_000 }).metadata();
        if (!metadata.format || !["jpeg", "png", "webp"].includes(metadata.format)) {
          throw new APIError("Upload a JPEG, PNG, or WebP image.", 400);
        }
        if ((metadata.pages || 1) > 1) throw new APIError("Animated images are not supported.", 400);
      }
    }],
    beforeDelete: [async ({ req, id }) => {
      for (const collection of ["services", "projects"] as const) {
        const references = await req.payload.find({
          collection,
          where: { or: [{ image: { equals: id } }, { "gallery.image": { equals: id } }] },
          limit: 1,
          depth: 0,
          req,
        });
        const versions = await req.payload.findVersions({
          collection,
          where: { or: [{ "version.image": { equals: id } }, { "version.gallery.image": { equals: id } }] },
          limit: 1,
          depth: 0,
          req,
        });
        if (references.totalDocs || versions.totalDocs) {
          throw new APIError("This image is used by content or its revision history. Keep it to avoid broken images.", 400);
        }
      }
    }],
  },
  fields: [
    { name: "alt", type: "text", localized: true, required: true, label: "Image description (alt text)" },
    { name: "caption", type: "text", localized: true },
    { name: "credit", type: "text" },
  ],
};