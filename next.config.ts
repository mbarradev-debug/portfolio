import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Tree-shake Chakra's barrel exports.
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
