import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Sthyra",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fff8ef",
    theme_color: "#f50d30",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
