import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { qualities: [75, 90] },
  async redirects() {
    const pages = {
      "index.html": "",
      "about.html": "about",
      "services-overview.html": "services",
      "services-metal.html": "services/metal-mechanic",
      "services-food.html": "services/food-industries",
      "services.html": "services/other-services",
      "portfolio.html": "portfolio",
      "contact.html": "contact",
    };
    return Object.entries(pages).flatMap(([oldPath, newPath]) =>
      ["", "/es"].map((prefix) => ({
        source: `${prefix}/${oldPath}`,
        destination: `${prefix}/${newPath}`.replace(/\/$/, "") || "/",
        permanent: true,
      })),
    );
  },
};

export default withPayload(nextConfig);
