import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    inlineCss: true,
    optimizePackageImports: ['framer-motion'],
  },
}

export default nextConfig
