const nextConfig = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    loader: 'imgix',
    path: 'https://ultraviolet.scaleway.com',
  },
  poweredByHeader: false,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['react-syntax-highlighter'],
}

export default nextConfig
