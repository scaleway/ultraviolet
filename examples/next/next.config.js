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
    eslint: {
      ignoreDuringBuilds: true,
    },
    transpilePackages: ['react-syntax-highlighter'],
    experimental: {
      // still usefull for @nivo/* issue package
      esmExternals: 'loose',
    },
  }

  return config
}

export default nextConfig()
