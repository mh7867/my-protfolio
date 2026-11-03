import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // screenshots are served at 90 so UI text stays sharp; 75 is left for anything decorative
    qualities: [75, 90],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2400, 2880],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
