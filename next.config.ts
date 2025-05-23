import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'picsum.photos',
          port: '',
          pathname: '/**',
        },
          {
            protocol:'https',
            hostname: 'i.pravatar.cc',
            pathname: '/**'
          }
      ],
    },
};
export default nextConfig;
