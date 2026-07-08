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
      "img-src 'self' data: blob: https://cdn.sthyra.com https://www.googletagmanager.com https://*.googletagmanager.com https://*.google-analytics.com https://ssl.gstatic.com https://www.gstatic.com",
      "media-src 'self' data: blob:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com https://www.googletagmanager.com https://*.googletagmanager.com https://tagmanager.google.com",
      "style-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://tagmanager.google.com https://fonts.googleapis.com",
      "connect-src 'self' blob: https://cdn.sthyra.com https://assets.calendly.com https://calendly.com https://*.calendly.com https://lottie.host https://cdn.jsdelivr.net https://unpkg.com https://www.googletagmanager.com https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
      "frame-src 'self' https://calendly.com https://*.calendly.com https://www.googletagmanager.com https://*.googletagmanager.com https://tagmanager.google.com",
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
