const nextConfig = {
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    loader: 'imgix',
    path: 'https://ultraviolet.scaleway.com',
  },
  poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig
