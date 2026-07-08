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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M54V9DZL');`,
          }}
        />
        <link rel="preconnect" href="https://cdn.sthyra.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://cdn.sthyra.com" />
        <link rel="dns-prefetch" href="https://lottie.host" />
      </head>
      <body className="min-h-full flex flex-col">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M54V9DZL"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ClientLayoutEnhancements />
        <div className="flex-1">{children}</div>
        <GlobalFooter />
      </body>
    </html>
  );
}
