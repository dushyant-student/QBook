/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://qbook-b267.onrender.com/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
