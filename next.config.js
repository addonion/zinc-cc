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
        hostname: "server.zinc.cc",
      },
    ],
  },
  experimental: {
    nextScriptWorkers: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src https://3d.zinc.cc; child-src https://3d.zinc.cc;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
