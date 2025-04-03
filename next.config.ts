import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "www.shreemithai.com",
      "cdn-icons-png.freepik.com",
      "img.freepik.com",
      "cloud.appwrite.io"
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
  
  async rewrites() {
    return [
      {
        source: '/api/:path*', 
        destination: `${process.env.NEXT_PUBLIC_API_URL_ADMIN || 'http://localhost:3000'}/api/:path*`
      }
    ];
  },

  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: `${process.env.NEXT_PUBLIC_BACKEND_URL}` },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { 
            key: 'Access-Control-Allow-Headers', 
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' 
          }
        ]
      }
    ];
  }
};

export default nextConfig;
