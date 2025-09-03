/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mysql2'],
  },
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development', // Disable optimization in development
  },
}

module.exports = nextConfig