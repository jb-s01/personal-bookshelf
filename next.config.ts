import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  devIndicators: false,
  async redirects() {
    return [
      { source: "/shelves", destination: "/", permanent: false },
      { source: "/currently-reading", destination: "/", permanent: false },
      { source: "/book/:id", destination: "/", permanent: false },
      { source: "/bio", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
