import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // still usefull for @nivo/* issue package
    esmExternals: 'loose',
  },
}

export default nextConfig
