import {
  Baumans,
  Cabin_Sketch,
  Comfortaa,
  Geist,
  Geist_Mono,
  Irish_Grover,
} from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const irishGrover = Irish_Grover({
  variable: "--font-irish-grover",
  weight: "400",
  subsets: ["latin"],
});

export const baumans = Baumans({
  variable: "--font-baumans",
  weight: "400",
  subsets: ["latin"],
});

export const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const cabinSketch = Cabin_Sketch({
  variable: "--font-cabin-sketch",
  weight: ["400", "700"],
  subsets: ["latin"],
});
