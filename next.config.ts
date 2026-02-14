import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No rewrites: /assets/* is served directly from public/assets/ so Background.png loads.
  // For files in root Assets/ folder, use /api/serve-asset?path=filename.png in components.
};

export default nextConfig;
