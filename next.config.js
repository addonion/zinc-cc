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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.zinc.cc",
      },
    ],
  },
};

module.exports = nextConfig;
