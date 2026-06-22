import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "img-src 'self' data: blob: https://cdn.sthyra.com",
      "media-src 'self' data: blob:",
      "font-src 'self' data:",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com",
      "style-src 'self' 'unsafe-inline'",
      "connect-src 'self' https://cdn.sthyra.com https://assets.calendly.com https://calendly.com https://*.calendly.com https://lottie.host https://cdn.jsdelivr.net https://unpkg.com",
      "frame-src 'self' https://calendly.com https://*.calendly.com",
      "worker-src 'self' blob:",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
];

const nextConfig: NextConfig = {
  images: {
    imageSizes: [32, 48, 64, 96, 128, 160, 192, 256, 320, 384, 480],
    qualities: [60, 65, 70, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sthyra.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
