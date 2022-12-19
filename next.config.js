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
      {
        source: "/codeplasty",
        destination: "/codeplasty/index.html",
      },
      {
        source: "/codeplasty/interface",
        destination: "/codeplasty/pilot.html",
      },
      {
        source: "/404-animation",
        destination: "/404/index.html",
      },
    ];
  },
};

module.exports = nextConfig;
