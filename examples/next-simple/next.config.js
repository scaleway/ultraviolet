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
    experimental: {
      esmExternals: 'loose', // See https://github.com/Hacker0x01/react-datepicker/issues/3834
    },
    transpilePackages: [
      '@ultraviolet/ui',
      '@ultraviolet/form',
      '@ultraviolet/icons',
    ],
  }

  return config
}

export default nextConfig()
