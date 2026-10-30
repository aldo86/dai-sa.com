import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const images = [
  { filename: "industrial-facility.webp", source: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=max&w=3840&q=90" },
  { filename: "metal-fabrication.webp", source: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=max&w=3840&q=90" },
  { filename: "engineering-equipment-wide.webp", source: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=max&w=3840&q=90", crop: { left: 0, top: 0, width: 3840, height: 1600 } },
];

await mkdir("public/images/hero", { recursive: true });
for (const image of images) {
  const response = await fetch(image.source);
  if (!response.ok) throw new Error(`Image download failed: ${image.filename} (${response.status})`);
  const original = Buffer.from(await response.arrayBuffer());
  const metadata = await sharp(original).metadata();
  if (!metadata.width || metadata.width < 3200 || !metadata.height || metadata.height < 1600) {
    throw new Error(`Source is too small for a full-width hero: ${image.filename} (${metadata.width}x${metadata.height})`);
  }
  const pipeline = sharp(original).rotate();
  if (image.crop) pipeline.extract(image.crop);
  const output = await pipeline.webp({ quality: 90, effort: 5 }).toBuffer({ resolveWithObject: true });
  await writeFile(`public/images/hero/${image.filename}`, output.data);
  console.log(`${image.filename}: ${output.info.width}x${output.info.height}, ${Math.round(output.data.length / 1024)} KB`);
}