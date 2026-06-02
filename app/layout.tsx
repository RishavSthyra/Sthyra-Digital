import type { Metadata } from "next";
import {
  baumans,
  comfortaa,
  geistMono,
  geistSans,
  irishGrover,
} from "./fonts";
import { GlobalFooter } from "@/app/components/GlobalFooter";
import { GlobalHandCursor } from "@/app/components/GlobalHandCursor";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sthyra.digital"),
  title: {
    default: "sthyra.digital",
    template: "%s | sthyra.digital",
  },
  description:
    "Creative digital agency building expressive websites, performance marketing systems, and content-led service pages with strong SEO foundations.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "sthyra.digital",
    description:
      "Creative digital agency building expressive websites, performance marketing systems, and content-led service pages with strong SEO foundations.",
    url: "/",
    siteName: "sthyra.digital",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "sthyra.digital",
    description:
      "Creative digital agency building expressive websites, performance marketing systems, and content-led service pages with strong SEO foundations.",
  },
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
      className={`site-doodle-cursor ${geistSans.variable} ${geistMono.variable} ${irishGrover.variable} ${baumans.variable} ${comfortaa.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GlobalHandCursor />
        <div className="flex-1">{children}</div>
        <GlobalFooter />
      </body>
    </html>
  );
}
