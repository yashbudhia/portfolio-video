import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static exports for Cloudflare Pages
  output: 'export',

  // Configure image optimization for static export
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true, // Required for static export
  },

  // Disable type checking during production builds
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  // Disable ESLint during builds
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  // Disable the need for trailing slashes
  trailingSlash: false,

  // Allow videos from pixabay - Note: headers don't work with static exports
  // but keeping this for development mode
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; img-src 'self' https://images.unsplash.com; media-src 'self' https://cdn.pixabay.com; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self';"
          }
        ]
      }
    ];
  },
};

export default nextConfig;
