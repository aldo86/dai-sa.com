import "dotenv/config";
import { createHash } from "node:crypto";
import { readFile, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";
import { getPayload } from "payload";
import config from "../src/payload.config";

if (process.env.NODE_ENV === "production" || process.env.ALLOW_LOCAL_SETUP !== "true") {
  throw new Error("This import is for local review only. Production requires an approved content manifest.");
}
const root = path.resolve("..");
const payload = await getPayload({ config });
const mediaByHash = new Map<string, number>();

async function media(relative: string, en: string, es: string) {
  const filePath = path.resolve(root, relative);
  const hash = createHash("sha256").update(await readFile(filePath)).digest("hex");
  if (mediaByHash.has(hash)) return mediaByHash.get(hash)!;
  const existing = await payload.find({ collection: "media", where: { credit: { equals: `Legacy SHA256:${hash}` } }, limit: 1 });
  let doc = existing.docs[0];
  if (!doc) {
    doc = await payload.create({ collection: "media", filePath, locale: "en", data: { alt: en, credit: `Legacy SHA256:${hash}` } });
    await payload.update({ collection: "media", id: doc.id, locale: "es", data: { alt: es } });
  }
  mediaByHash.set(hash, doc.id);
  return doc.id;
}

async function serviceText(filename: string, locale: "en" | "es") {
  const document = load(await readFile(path.join(root, locale === "es" ? "es" : "", filename), "utf8"));
  const section = document("#page-header").next(".row").clone();
  section.find("img, .testimonial, script, style").remove();
  section.find("br").replaceWith("\n");
  section.find("p, li").append("\n");
  return section.text().split("\n").map((line) => line.trim()).filter(Boolean).join("\n");
}

try {
  await mkdir("public/brand", { recursive: true });
  await copyFile(path.join(root, "_layout/images/logo_small.png"), "public/brand/logo.png");
  await mkdir("public/images", { recursive: true });
  await copyFile(path.join(root, "_layout/images/070G0001fav.jpg"), "public/images/engineering-plans.jpg");
  await copyFile(path.join(root, "favicon.ico"), "src/app/favicon.ico");
  const services = [
    { source: "services-metal.html", slug: "metal-mechanic", industry: "metal" as const, en: "Metal-mechanic engineering", es: "Ingenieria metal-mecanica", summary: ["Engineering for steel, chemical, aluminum, and metal-processing facilities.", "Ingenieria para instalaciones siderurgicas, quimicas, de aluminio y procesamiento de metales."] },
    { source: "services-food.html", slug: "food-industries", industry: "food" as const, en: "Food industry engineering", es: "Ingenieria para la industria alimentaria", summary: ["Process tanks, production facilities, and installation engineering.", "Tanques de proceso, instalaciones de produccion e ingenieria de instalacion."] },
    { source: "services.html", slug: "other-services", industry: "other" as const, en: "Industrial systems and infrastructure", es: "Sistemas e infraestructura industrial", summary: ["Mechanical, civil, electrical, and automation engineering for industrial projects.", "Ingenieria mecanica, civil, electrica y de automatizacion para proyectos industriales."] },
  ];
  for (const [order, service] of services.entries()) {
    const existing = await payload.find({ collection: "services", where: { legacySource: { equals: service.source } }, limit: 1 });
    if (existing.totalDocs) { console.log(`Skipped existing service: ${service.slug}`); continue; }
    const image = await media("_content/revolutionslider/1980x500-3.png", "Industrial engineering project", "Proyecto de ingenieria industrial");
    const doc = await payload.create({ collection: "services", locale: "en", draft: true, data: {
      title: service.en, slug: service.slug, industry: service.industry, summary: service.summary[0],
      description: await serviceText(service.source, "en"), image, order, featured: true, legacySource: service.source,
    } });
    await payload.update({ collection: "services", id: doc.id, locale: "es", draft: true, data: {
      title: service.es, summary: service.summary[1], description: await serviceText(service.source, "es"),
    } });
    await payload.update({ collection: "services", id: doc.id, locale: "en", data: { _status: "published" } });
    console.log(`Imported service: ${service.slug}`);
  }
  const enPortfolio = load(await readFile(path.join(root, "portfolio.html"), "utf8"));
  const esPortfolio = load(await readFile(path.join(root, "es/portfolio.html"), "utf8"));
  for (const [order, item] of enPortfolio("#content .portfolio-item").toArray().entries()) {
    const title = enPortfolio(item).find("h5").text().trim();
    const translated = esPortfolio("#content .portfolio-item").eq(order).find("h5").text().trim();
    const relative = enPortfolio(item).find("img").attr("src");
    if (!title || !translated || !relative) throw new Error(`Missing bilingual portfolio source at item ${order + 1}`);
    const source = `portfolio.html#${order + 1}`;
    const existing = await payload.find({ collection: "projects", where: { legacySource: { equals: source } }, limit: 1 });
    if (existing.totalDocs) { console.log(`Skipped existing project: ${title}`); continue; }
    const image = await media(relative, title, translated);
    const doc = await payload.create({ collection: "projects", locale: "en", draft: true, data: {
      title, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, ""),
      summary: title, image, industry: "metal", order, featured: order < 3, legacySource: source,
    } });
    await payload.update({ collection: "projects", id: doc.id, locale: "es", draft: true, data: { title: translated, summary: translated } });
    await payload.update({ collection: "projects", id: doc.id, locale: "en", data: { _status: "published" } });
    console.log(`Imported project: ${title}`);
  }
  console.log("Local import complete. Review wording, categories, image permissions, and translations before production.");
} finally {
  await payload.destroy();
}
process.exit(0);