/** @type {import('next').NextConfig} */
const nextConfig = {
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
  experimental: {
    nextScriptWorkers: true,
  },
};

module.exports = nextConfig;
