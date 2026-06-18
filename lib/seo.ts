import type { Metadata } from "next";

const CANONICAL_SITE_URL = "https://www.sthyradigital.com";
const LEGACY_SITE_HOSTS = new Set(["sthyra.digital", "www.sthyra.digital"]);

function getSiteUrl() {
  const rawSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    CANONICAL_SITE_URL;

  const siteUrl = rawSiteUrl.replace(/\/+$/, "");

  try {
    const parsedUrl = new URL(siteUrl);

    if (LEGACY_SITE_HOSTS.has(parsedUrl.hostname)) {
      return CANONICAL_SITE_URL;
    }

    if (parsedUrl.hostname === "sthyradigital.com") {
      return `https://www.${parsedUrl.hostname}`;
    }
  } catch {
    return CANONICAL_SITE_URL;
  }

  return siteUrl;
}

export const siteConfig = {
  countryName: "Bangalore",
  description:
    "Sthyra Digital is a Bangalore digital marketing agency offering performance marketing, custom web development, technical SEO, and creative management for ambitious brands.",
  email: "hello@sthyra.digital",
  locale: "en_US",
  name: "Sthyra Digital",
  siteName: "Sthyra Digital",
  url: getSiteUrl(),
} as const;

type PageMetadataInput = {
  category?: string;
  description: string;
  keywords?: string[];
  path: string;
  title: string;
};

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export function buildPageMetadata({
  category,
  description,
  keywords,
  path,
  title,
}: PageMetadataInput): Metadata {
  const canonicalUrl = absoluteUrl(path);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    authors: [{ name: siteConfig.name }],
    category,
    creator: siteConfig.name,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    publisher: siteConfig.name,
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
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    description: siteConfig.description,
    email: siteConfig.email,
    areaServed: ["Bangalore", "Bengaluru"],
    url: siteConfig.url,
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    url: siteConfig.url,
  };
}

export function buildWebPageSchema({
  description,
  name,
  path,
}: {
  description: string;
  name: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    about: {
      "@id": `${siteConfig.url}/#organization`,
    },
    breadcrumb: {
      "@id": `${absoluteUrl(path)}#breadcrumb`,
    },
    description,
    inLanguage: "en",
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    name,
    url: absoluteUrl(path),
  };
}

export function buildBreadcrumbSchema(
  path: string,
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      item: absoluteUrl(item.path),
      name: item.name,
      position: index + 1,
    })),
  };
}
