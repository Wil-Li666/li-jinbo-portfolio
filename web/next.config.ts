import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  async redirects() {
    return [
      { source: "/works/ai", destination: "/#projects", permanent: true },
      {
        source: "/works/ai/contract",
        destination: "/projects/contract-review",
        permanent: true,
      },
      {
        source: "/works/ai/jianjinggui",
        destination: "/projects/building-standards",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
