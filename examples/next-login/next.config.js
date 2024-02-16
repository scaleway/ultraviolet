const nextConfig = () => {
  /** @type {import('next/dist/server/config').NextConfig} */
  const config = {
    compress: true,
    images: {
      formats: ['image/avif', 'image/webp'],
      loader: 'imgix',
      path: 'https://ultraviolet.scaleway.com',
    },
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
      emotion: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    transpilePackages: [
      '@ultraviolet/ui',
      '@ultraviolet/form',
      '@ultraviolet/icons',
    ],
  }
  return config
}

module.exports = nextConfig()
