import type { Metadata } from "next";
import {
  baumans,
  comfortaa,
  geistMono,
  geistSans,
  irishGrover,
} from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "sthyra.digital",
  description: "Creative agency hero built with layered typography and illustration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${irishGrover.variable} ${baumans.variable} ${comfortaa.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
