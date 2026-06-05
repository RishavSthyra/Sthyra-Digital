import type { Metadata } from "next";
import Link from "next/link";
import { SketchFrame } from "@/app/components/SketchFrame";
import { servicePages } from "@/app/services/servicePageContent";
import {
  buildBreadcrumbSchema,
  buildOrganizationSchema,
  buildPageMetadata,
  buildWebPageSchema,
  buildWebsiteSchema,
  siteConfig,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  category: "services",
  description:
    "Explore Bangalore-focused performance marketing, web development, and creative management services from Sthyra Digital.",
  keywords: [
    "digital marketing services",
    "digital marketing services Bangalore",
    "performance marketing services Bangalore",
    "web development services Bangalore",
    "creative management services Bangalore",
    "technical SEO services",
  ],
  path: "/services",
  title: "Bangalore Digital Marketing Services for Performance, Web & Creative",
});

const servicesFaqs = [
  {
    answer:
      "Start with performance marketing if you need faster demand capture, web development if the site is limiting conversions, and creative management if campaigns are slowing down because direction and production are fragmented.",
    question: "How should a brand choose between these services?",
  },
  {
    answer:
      "Yes. Many engagements combine paid media, landing page development, technical SEO, and creative systems because the conversion path works better when messaging and execution stay connected.",
    question: "Can these services be combined into one growth system?",
  },
  {
    answer:
      "The service pages are designed to answer high-intent questions clearly, use semantic keyword clusters, support internal linking, and provide structured summaries that work for both search engines and AI answer systems.",
    question: "How are the service pages optimized for SEO and AI search?",
  },
];

const servicesStructuredData = [
  buildOrganizationSchema(),
  buildWebsiteSchema(),
  buildBreadcrumbSchema("/services", [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]),
  buildWebPageSchema({
    description:
      "Services index for Sthyra Digital covering Bangalore-focused performance marketing, web development, and creative management.",
    name: "Sthyra Digital Services",
    path: "/services",
  }),
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Sthyra Digital Services",
    url: `${siteConfig.url}/services`,
    hasPart: servicePages.map((service) => ({
      "@type": "Service",
      name: service.name,
      description: service.conciseAnswer,
      url: `${siteConfig.url}/services/${service.slug}`,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: servicesFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
];

export default function ServicesIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesStructuredData) }}
      />

      <main className="min-h-screen bg-[#fff8ef] text-[#171717]">
        <section className="relative isolate overflow-hidden bg-[#f50d30] px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-20">
          <div className="hero-noise absolute inset-0 opacity-30 mix-blend-soft-light" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 16% 18%, rgba(255,255,255,0.22), transparent 22%), radial-gradient(circle at 82% 24%, rgba(255,255,255,0.14), transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.08))",
            }}
          />

          <div className="relative z-10 mx-auto max-w-[80rem]">
            <div className="mb-5 inline-block">
              <SketchFrame
                className="px-4 py-2"
                fill="#fff8ef"
                stroke="#171717"
                strokeWidth={1.45}
                roughness={1.16}
                bowing={1.88}
                inset={1.2}
                radius={999}
                overlayFill="rgba(255,179,71,0.12)"
                overlayFillStyle="zigzag-line"
                overlayFillWeight={0.75}
                overlayHachureGap={10}
                overlayHachureAngle={22}
              >
                <div className="font-[family:var(--font-geist-mono)] text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[#8f4b1f]">
                  Service library
                </div>
              </SketchFrame>
            </div>

            <h1 className="max-w-[12ch] font-display text-[clamp(3rem,7vw,6.2rem)] leading-[0.9] tracking-[-0.075em]">
              Bangalore digital marketing services that work as one connected system.
            </h1>

            <p className="mt-6 max-w-[44rem] text-[1rem] leading-7 text-[#fff3ed] sm:text-[1.05rem]">
              Sthyra Digital offers performance marketing, custom web
              development, and creative management for Bangalore brands that
              need more than disconnected channel support. Each service page is
              structured to explain the offer clearly, match search intent, and
              show how the work connects to the rest of the growth system.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-full bg-[#ffe55a] px-5 py-3 font-semibold text-[#171717] shadow-[0_12px_22px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5"
              >
                Back to home
              </Link>
              <a
                href="mailto:hello@sthyra.digital"
                className="rounded-full border border-white/18 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/14"
              >
                Email the team
              </a>
            </div>
          </div>
        </section>

        <section className="px-5 py-[clamp(4rem,6vw,6rem)] sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-[80rem] gap-5 lg:grid-cols-3">
            {servicePages.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="block"
              >
                <SketchFrame
                  className="h-full px-5 py-5 transition hover:-translate-y-1 sm:px-6 sm:py-6"
                  fill={
                    index === 0
                      ? service.theme.paper
                      : index === 1
                        ? service.theme.paperAlt
                        : service.theme.paperSoft
                  }
                  stroke="#171717"
                  strokeWidth={1.65}
                  roughness={1.15}
                  bowing={1.84}
                  inset={1.35}
                  radius={24}
                  overlayFill={
                    index === 1
                      ? "rgba(31,143,255,0.10)"
                      : "rgba(255,179,71,0.10)"
                  }
                  overlayFillStyle="zigzag-line"
                  overlayFillWeight={0.8}
                  overlayHachureGap={11}
                  overlayHachureAngle={24}
                >
                  <div className="space-y-4">
                    <div className="inline-flex rounded-full bg-white/60 px-3 py-1 font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#5d5147]">
                      {service.primaryKeyword}
                    </div>
                    <h2 className="text-[1.85rem] font-semibold leading-[1.02] tracking-[-0.045em] text-[#171717]">
                      {service.name}
                    </h2>
                    <p className="text-[0.98rem] leading-7 text-[#554742]">
                      {service.conciseAnswer}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.secondaryKeywords.slice(0, 3).map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-black/8 bg-white/58 px-3 py-1 text-[0.72rem] font-medium text-[#473f39]"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </SketchFrame>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white px-5 py-16 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-[80rem] gap-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="font-[family:var(--font-geist-mono)] text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#8f4b1f]">
                What these pages cover
              </p>
              <h2 className="mt-4 max-w-[14ch] text-[clamp(2.15rem,4.4vw,4rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#171717]">
                Clear service intent, stronger internal links, and answer-first content.
              </h2>
              <p className="mt-4 max-w-[42rem] text-[1rem] leading-8 text-[#5a4d45]">
                These pages are written to target commercial-intent searches for
                agency services while also making the offer easy to summarize.
                Each page includes a focused keyword cluster, concise service
                explanation, process detail, FAQs, and direct paths into related
                services.
              </p>
            </div>

            <div className="grid gap-4">
              {servicesFaqs.map((item) => (
                <article
                  key={item.question}
                  className="rounded-[1.4rem] border border-black/10 bg-[#fff8ef] p-5 shadow-[0_16px_30px_rgba(0,0,0,0.05)]"
                >
                  <h3 className="text-[1.06rem] font-semibold tracking-[-0.03em] text-[#171717]">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#554742]">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
