import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['assets.scaleway.com'],
    // loader: 'imgix',
    // path: 'https://ultraviolet.scaleway.com',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.scaleway.com',
        port: '',
        search: '',
      },
    ],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    cssChunking: true,
  },
}

export default nextConfig
