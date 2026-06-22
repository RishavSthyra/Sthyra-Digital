import type { Metadata } from "next";
import { buildPageMetadata, siteConfig } from "@/lib/seo";
import { ElevateStarterKitClient } from "./ElevateStarterKitClient";

export const metadata: Metadata = {
  ...buildPageMetadata({
    category: "starter-kit",
    description:
      "Cohort-limited web build and growth offers from Sthyra Digital: Alpha-50 for custom websites and Core-5 for performance-focused content and PPC.",
    keywords: [
      "elite web build offer",
      "subsidized web development",
      "premium custom website sprint",
      "social media PPC retainer offer",
      "performance marketing cohort",
      "Sthyra starter kit",
      "case study cohort",
    ],
    path: "/elevate-starter-kit",
    title: "Elevate Starter Kit Cohort Offers",
  }),
  category: "starter-kit",
};

function buildStructuredData() {
  const path = "/elevate-starter-kit";
  const pageUrl = `${siteConfig.url}${path}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#page`,
      name: "The Elevate Starter Kit - Alpha-50 and Core-5 Cohort",
      url: pageUrl,
      description:
        "Two cohort-limited programs: Alpha-50 Architecture Sprint for custom web builds and Core-5 Growth Incubator for content and PPC.",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Offer",
      name: "The Alpha-50 Architecture Sprint",
      description:
        "High-speed engineering deployment for ambitious founders. Fully custom-coded storefront in 7 days at a flat Rs. 30,000 for the first 50 slots.",
      price: "30000",
      priceCurrency: "INR",
      category: "Web Development",
      availabilityStarts: "2026-06-15T00:00:00+05:30",
      availabilityEnds: "2026-12-31T23:59:59+05:30",
      url: pageUrl,
      seller: {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Offer",
      name: "The Core-5 Growth Incubator",
      description:
        "A structured 6-month optimization sprint for brands with ad budgets under Rs. 30,000/month at a flat Rs. 25,000/month fee.",
      price: "25000",
      priceCurrency: "INR",
      priceValidUntil: "2026-12-31",
      category: "Social Media & PPC",
      url: pageUrl,
      seller: {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
      },
    },
  ];
}

export default function ElevateStarterKitPage() {
  const structuredData = buildStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ElevateStarterKitClient />
    </>
  );
}
