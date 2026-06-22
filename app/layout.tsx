import type { Metadata } from "next";
import {
  baumans,
  cabinSketch,
  comfortaa,
  geistMono,
  geistSans,
  irishGrover,
} from "./fonts";
import { ClientLayoutEnhancements } from "@/app/components/ClientLayoutEnhancements";
import { GlobalFooter } from "@/app/components/GlobalFooter";
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
      <body className="min-h-full flex flex-col">
        <ClientLayoutEnhancements />
        <div className="flex-1">{children}</div>
        <GlobalFooter />
      </body>
    </html>
  );
}
