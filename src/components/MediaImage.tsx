import Image from "next/image";
import type { Media } from "../payload-types";

export function MediaImage({ media, priority = false, contain = false, eager = false, sizes = "(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 1100px" }: { media: number | Media | null | undefined; priority?: boolean; contain?: boolean; eager?: boolean; sizes?: string }) {
  if (!media || typeof media === "number" || !media.url) return null;
  const source = new URL(media.sizes?.large?.url || media.url, "http://local").pathname;
  return <Image src={source} alt={media.alt || ""} fill sizes={sizes} loading={eager && !priority ? "eager" : undefined} priority={priority} className={contain ? "image-contain" : "image-cover"} />;
}