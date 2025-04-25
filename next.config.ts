import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "ucarecdn.com"
      } 
    ]
  }
};

export default nextConfig;
