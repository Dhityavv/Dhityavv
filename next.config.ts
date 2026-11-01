import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "capsule-render.vercel.app",
      },
      {
        protocol: "https",
        hostname: "readme-typing-svg.demolab.com",
      },
      {
        protocol: "https",
        hostname: "img.shields.io",
      },
      {
        protocol: "https",
        hostname: "github-stats-extended.vercel.app",
      },
      {
        protocol: "https",
        hostname: "streak-stats.demolab.com",
      },
    ],
  },
};

export default nextConfig;
