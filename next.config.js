/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
  distDir: 'dist',
  reactStrictMode: true,
};

module.exports = nextConfig;
