import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  reactStrictMode: false, // Fixes useEffect running twice after Next 16.3.1

  output: "export",
  distDir: "build"
};

export default nextConfig;
