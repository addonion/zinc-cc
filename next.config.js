/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/about/",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
