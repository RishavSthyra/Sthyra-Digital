import type { Metadata } from "next";
import {
  baumans,
  cabinSketch,
  comfortaa,
  geistMono,
  geistSans,
  irishGrover,
} from "./fonts";
import { GlobalFooter } from "@/app/components/GlobalFooter";
import { GlobalHandCursor } from "@/app/components/GlobalHandCursor";
import { siteConfig } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`site-doodle-cursor ${geistSans.variable} ${geistMono.variable} ${irishGrover.variable} ${baumans.variable} ${comfortaa.variable} ${cabinSketch.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.sthyra.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://cdn.sthyra.com" />
        <link rel="dns-prefetch" href="https://lottie.host" />
        <link
          rel="preconnect"
          href="https://assets.calendly.com"
          crossOrigin=""
        />
      </head>
      <body className="min-h-full flex flex-col">
        <GlobalHandCursor />
        <div className="flex-1">{children}</div>
        <GlobalFooter />
      </body>
    </html>
  );
}
