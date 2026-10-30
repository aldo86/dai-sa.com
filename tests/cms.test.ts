import { mkdtemp, rm, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { randomBytes } from "node:crypto";
import sharp from "sharp";
import { beforeAll, afterAll, expect, test } from "vitest";
import type { Payload } from "payload";

let payload: Payload;
let directory: string;
let image: number;
let service: number;

beforeAll(async () => {
  directory = await mkdtemp(path.join(tmpdir(), "daisa-cms-"));
  process.env.PAYLOAD_SECRET = randomBytes(48).toString("hex");
  process.env.DATABASE_URL = `file:${directory}/test.db`;
  process.env.MEDIA_DIR = `${directory}/media`;
  await mkdir(process.env.MEDIA_DIR);
  const { getPayload } = await import("payload");
  const { default: config } = await import("../src/payload.config");
  payload = await getPayload({ config });
});

afterAll(async () => {
  await payload?.destroy();
  if (directory) await rm(directory, { recursive: true, force: true });
});

test("anonymous users cannot create accounts or write content", async () => {
  await expect(payload.create({ collection: "users", overrideAccess: false, data: { email: "intruder@example.com", password: randomBytes(24).toString("hex") } })).rejects.toThrow();
  await expect(payload.create({ collection: "services", overrideAccess: false, draft: true, data: { title: "Intruder" } })).rejects.toThrow();
  await expect(payload.find({ collection: "users", overrideAccess: false })).rejects.toThrow();
  await expect(payload.create({ collection: "users", overrideAccess: true, data: { email: "bootstrap@example.com", password: randomBytes(24).toString("hex") } })).rejects.toThrow("local provisioning");
});

test("image library validates actual image formats and localized metadata", async () => {
  const data = await sharp({ create: { width: 800, height: 600, channels: 3, background: "#1b4544" } }).png().toBuffer();
  const doc = await payload.create({ collection: "media", locale: "en", data: { alt: "Test engineering image" }, file: { data, name: "test.png", size: data.length, mimetype: "image/png" } });
  image = doc.id;
  await payload.update({ collection: "media", id: image, locale: "es", data: { alt: "Imagen de ingenieria" } });
  const spanish = await payload.findByID({ collection: "media", id: image, locale: "es", fallbackLocale: false });
  expect(spanish.alt).toBe("Imagen de ingenieria");
  await expect(payload.create({ collection: "media", data: { alt: "Bad image" }, file: { data: Buffer.from("<script>bad</script>"), name: "bad.png", size: 20, mimetype: "image/png" } })).rejects.toThrow();
});

test("drafts are private, bilingual publication works, and URLs stay stable", async () => {
  const doc = await payload.create({ collection: "services", locale: "en", draft: true, data: { title: "Test service", slug: "test-service", summary: "English summary", industry: "metal", image, order: 0 } });
  service = doc.id;
  expect((await payload.find({ collection: "services", overrideAccess: false })).totalDocs).toBe(0);
  await expect(payload.update({ collection: "services", id: service, locale: "en", data: { _status: "published" } })).rejects.toThrow("English and Spanish");
  await payload.update({ collection: "services", id: service, locale: "es", draft: true, data: { title: "Servicio de prueba", summary: "Resumen en espanol" } });
  await payload.update({ collection: "services", id: service, locale: "en", data: { _status: "published" } });
  const published = await payload.find({ collection: "services", locale: "es", fallbackLocale: false, overrideAccess: false });
  expect(published.docs[0].title).toBe("Servicio de prueba");
  await expect(payload.update({ collection: "services", id: service, data: { slug: "changed-url" } })).rejects.toThrow("permanent");
  await expect(payload.delete({ collection: "media", id: image })).rejects.toThrow("revision history");
});

test("unpublishing archives the record without leaking it publicly", async () => {
  await payload.update({ collection: "services", id: service, data: { _status: "draft" } });
  expect((await payload.find({ collection: "services", overrideAccess: false })).totalDocs).toBe(0);
  await expect(payload.findByID({ collection: "services", id: service, overrideAccess: false })).rejects.toThrow();
});

test("publication requires image descriptions in both languages", async () => {
  const data = await sharp({ create: { width: 100, height: 100, channels: 3, background: "#ffffff" } }).png().toBuffer();
  const untranslated = await payload.create({ collection: "media", locale: "en", data: { alt: "English only" }, file: { data, name: "untranslated.png", size: data.length, mimetype: "image/png" } });
  const doc = await payload.create({ collection: "services", locale: "en", draft: true, data: { title: "Alt text validation", slug: "alt-text-validation", summary: "English summary", industry: "metal", image: untranslated.id, order: 0 } });
  await payload.update({ collection: "services", id: doc.id, locale: "es", draft: true, data: { title: "Validacion de imagen", summary: "Resumen" } });
  await expect(payload.update({ collection: "services", id: doc.id, locale: "en", data: { _status: "published" } })).rejects.toThrow("image descriptions");
});