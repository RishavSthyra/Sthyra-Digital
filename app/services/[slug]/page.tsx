import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/app/components/ServicePageTemplate";
import { getServicePage, servicePages } from "@/app/services/servicePageContent";
import {
  buildBreadcrumbSchema,
  buildOrganizationSchema,
  buildPageMetadata,
  buildWebPageSchema,
  buildWebsiteSchema,
  siteConfig,
} from "@/lib/seo";

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
    ...buildPageMetadata({
      category: "services",
      description: service.metaDescription,
      keywords: service.keywords,
      path,
      title: service.name,
    }),
    category: "services",
  };
}

function buildStructuredData(service: (typeof servicePages)[number]) {
  const path = `/services/${service.slug}`;
  const pageUrl = `${siteConfig.url}${path}`;

  return [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: service.name,
      serviceType: service.name,
      category: service.primaryKeyword,
      description: service.metaDescription,
      url: pageUrl,
      areaServed: "Bangalore",
      keywords: service.keywords.join(", "),
      provider: {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
      },
    },
    buildBreadcrumbSchema(path, [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: service.name, path },
    ]),
    buildWebPageSchema({
      description: service.metaDescription,
      name: service.name,
      path,
    }),
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
