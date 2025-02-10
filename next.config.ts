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
      "cloud.appwrite.io"
    ]
    
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Matches all API requests
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`, // Redirects to your backend
      },
    ];
  },
};

export default nextConfig;
