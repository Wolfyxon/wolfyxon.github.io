import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  
  output: "export",
  distDir: "build"
};

export default nextConfig;
