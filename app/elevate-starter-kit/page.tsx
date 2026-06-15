import type { Metadata } from "next";
import { buildPageMetadata, siteConfig } from "@/lib/seo";
import { ElevateStarterKitClient } from "./ElevateStarterKitClient";

export const metadata: Metadata = {
  ...buildPageMetadata({
    category: "starter-kit",
    description:
      "The Elevate Starter Kit: two elite, cohort-limited programs — The Alpha-50 Architecture Sprint (₹30,000 custom web build, 7-day delivery) and The Core-5 Growth Incubator (₹25,000/mo social media + PPC funnel). 50 web slots. 30 growth slots.",
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
    title: "The Elevate Starter Kit — Alpha-50 & Core-5 Cohort",
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
      name: "The Elevate Starter Kit — Alpha-50 & Core-5 Cohort",
      url: pageUrl,
      description:
        "Two elite, cohort-limited programs: Alpha-50 Architecture Sprint (₹30,000 custom web build, 7-day delivery) and Core-5 Growth Incubator (₹25,000/mo social media + PPC funnel).",
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
        "High-speed engineering deployment for ambitious founders. Fully custom-coded, enterprise-grade storefront in exactly 7 days. Flat ₹30,000 strictly for the first 50 slots.",
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
        "Elite, mathematically structured 6-month optimization sprint for brands with ad budgets under ₹30,000/month. ₹25,000/mo flat fee. Limited to 30 brands.",
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
