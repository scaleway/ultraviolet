import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    loader: 'imgix',
    path: 'https://ultraviolet.scaleway.com',
  },
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    cssChunking: true,
  },
}

export default nextConfig
