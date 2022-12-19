/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/alea",
        destination: "/alea/index.html",
      },
      {
        source: "/alea/interface",
        destination: "/alea/interface/index.html",
      },
    ];
  },
};

module.exports = nextConfig;
