import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    // domains: ["obeyable-isothermally-kelly.ngrok-free.dev", "obeyable-isothermally-kelly.ngrok-free.devnull"],
    remotePatterns: [
      {
        protocol: "https", // or http if needed
        hostname: "obeyable-isothermally-kelly.ngrok-free.dev",
        pathname: "/**",
      },
      {
        protocol: "https", // or http if needed
        hostname: "obeyable-isothermally-kelly.ngrok-free.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
