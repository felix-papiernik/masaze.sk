import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  //without this, i'd get Did you mean to import "next/server.js"?] { code: 'ERR_MODULE_NOT_FOUND',
  transpilePackages: ['next-auth'],
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  //output: "export"
  //webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = { fs: false, path: false };

  //   return config;
  // },
};

export default nextConfig;
