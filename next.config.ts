import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "res.cloudinary.com"
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
