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
          },
          {
            protocol:'https',
            hostname: 'codeandcraft-six.vercel.app',
            pathname: '/**'
          }
      ],
    },
};
export default nextConfig;
