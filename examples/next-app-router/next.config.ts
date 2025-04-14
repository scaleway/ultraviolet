import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    emotion: true,
  },
  experimental: {
    // still usefull for @nivo/* issue package
    esmExternals: 'loose',
  },
}

export default nextConfig
