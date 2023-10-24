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
  /**
   * @see https://stackoverflow.com/a/60619061/14195400
   * useEffect触发两次
   */
  reactStrictMode: true,
};

module.exports = nextConfig;
