/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching,
  disable: process.env.NODE_ENV === 'development'
})
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const withALL = (nextConfig = {}) => withBundleAnalyzer(withPWA({ ...nextConfig }))

/** @type {import('next').NextConfig} */
module.exports = withALL({
  experimental: {},
  swcMinify: true,
  reactStrictMode: true,
  webpack: (config, { defaultLoaders }) => {
    // clear cache
    defaultLoaders.babel.options.cache = false

    // resolve path
    config.resolve.modules.push(path.resolve(`./`))

    return config
  }
})
