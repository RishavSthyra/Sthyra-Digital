import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/app/components/ServicePageTemplate";
import { getServicePage, servicePages } from "@/app/services/servicePageContent";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) {
    notFound();
  }

  const path = `/services/${service.slug}`;

  return {
    title: service.name,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: service.name,
      description: service.metaDescription,
      url: path,
      siteName: "sthyra.digital",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: service.name,
      description: service.metaDescription,
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
    category: "services",
  };
}

function buildStructuredData(service: (typeof servicePages)[number]) {
  const pageUrl = `https://sthyra.digital/services/${service.slug}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      serviceType: service.name,
      description: service.metaDescription,
      url: pageUrl,
      areaServed: "Worldwide",
      keywords: service.keywords.join(", "),
      provider: {
        "@type": "Organization",
        name: "sthyra.digital",
        url: "https://sthyra.digital",
        email: "hello@sthyra.digital",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://sthyra.digital/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: "https://sthyra.digital/services",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.name,
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) {
    notFound();
  }

  const structuredData = buildStructuredData(service);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ServicePageTemplate service={service} />
    </>
  );
}
