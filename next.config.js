/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['localhost', 'firebasestorage.googleapis.com', 'avatars.githubusercontent.com', '127.0.0.1']
  },
  reactStrictMode: false
}

module.exports = nextConfig
