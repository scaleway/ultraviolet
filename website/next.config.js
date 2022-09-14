/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const nextConfig = () => {
  const plugins = [
    require('next-transpile-modules')([
      '@scaleway/ui',
      '@scaleway/random-name',
      'react-syntax-highlighter',
    ]),
    require('@next/bundle-analyzer')({
      enabled: process.env.ANALYZE === 'true',
    }),
  ].filter(Boolean)

  /** @type {import('next/dist/server/config').NextConfig} */
  const config = {
    compress: true,
    images: {
      formats: ['image/avif', 'image/webp'],
      loader: 'imgix',
      path: 'https://ui.scaleway.com',
    },
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true,
  }

  return plugins.reduce((acc, next) => next(acc), config)
}

module.exports = nextConfig()
