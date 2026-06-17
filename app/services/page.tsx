import type { Metadata } from "next";
import Link from "next/link";
import { baumans } from "@/app/fonts";
import { OpenContactButton } from "@/app/components/OpenContactButton";
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

function SectionTag({
  color,
  label,
  text,
}: {
  color: string;
  label: string;
  text: string;
}) {
  return (
    <SketchFrame
      className="inline-block"
      fill={color}
      stroke="#171717"
      strokeWidth={1.45}
      roughness={1.2}
      bowing={1.95}
      inset={1.2}
      radius={999}
      overlayFill="rgba(255,255,255,0.14)"
      overlayFillStyle="zigzag-line"
      overlayFillWeight={0.7}
      overlayHachureGap={10}
      overlayHachureAngle={24}
    >
      <div
        className="px-4 py-2 font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.22em] sm:px-5 sm:text-[0.68rem]"
        style={{ color: text }}
      >
        {label}
      </div>
    </SketchFrame>
  );
}

export default function ServicesIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesStructuredData) }}
      />

      <main className="min-h-screen bg-[#fff8ef] text-[#171717]">
        <section className="relative isolate overflow-hidden bg-[#171d32] px-5 pb-16 pt-5 text-white sm:px-8 lg:px-12 lg:pb-20 lg:pt-6">
          <div className="hero-noise absolute inset-0 opacity-30 mix-blend-soft-light" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 12% 18%, rgba(255,229,90,0.18), transparent 20%), radial-gradient(circle at 84% 16%, rgba(9,183,234,0.18), transparent 18%), radial-gradient(circle at 50% 78%, rgba(255,139,94,0.18), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.18))",
            }}
          />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-[8%] top-[20%] h-40 w-40 rounded-full bg-white/8 blur-[88px]" />
            <div className="absolute right-[6%] top-[26%] h-52 w-52 rounded-full bg-[#56bef9]/14 blur-[112px]" />
            <div className="absolute bottom-[8%] left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-[#ff8b5e]/12 blur-[124px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-[86rem]">
            <header className="mb-12 flex flex-col gap-4 lg:mb-16 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="font-[family:var(--font-geist-mono)] text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:text-white/75"
                >
                  sthyra.digital
                </Link>
                <span className="text-white/50">/</span>
                <span className="font-[family:var(--font-geist-mono)] text-sm font-semibold uppercase tracking-[0.16em] text-white/72">
                  Services
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <SectionTag color="#fff8ef" label="3 focused lanes" text="#8a4a26" />
                <OpenContactButton className="rounded-full border border-white/18 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/14">
                  Start a project
                </OpenContactButton>
              </div>
            </header>

            <div className="mx-auto max-w-[70rem] text-center">
              <div className="mb-5 flex justify-center">
                <SectionTag color="#ffe55a" label="Service index" text="#3b2b00" />
              </div>

              <h1
                className={`mx-auto max-w-[12ch] text-balance text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.9] tracking-[-0.065em] text-white ${baumans.className}`}
              >
                Three clean service lanes. One connected growth system.
              </h1>

              <p className="mx-auto mt-6 max-w-[48rem] text-[1rem] leading-7 text-[#dbe8ff] sm:text-[1.05rem]">
                This page is the quick way into the work. Each lane is built to
                solve a different kind of bottleneck, but they still fit
                together when a brand needs strategy, site performance, and
                creative execution to move in sync.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/elevate-starter-kit"
                  className="rounded-full bg-[#ffe55a] px-5 py-3 font-semibold text-[#171717] shadow-[0_12px_22px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5"
                >
                  See the cohort offer
                </Link>
                <OpenContactButton className="rounded-full border border-white/18 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/14">
                  Talk to the team
                </OpenContactButton>
              </div>

              <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
                {[
                  {
                    label: "Performance",
                    value: "Demand capture",
                    body: "For brands that need sharper media signal and cleaner conversion paths.",
                  },
                  {
                    label: "Web",
                    value: "Site foundation",
                    body: "For teams whose current site is slowing down trust, speed, or lead flow.",
                  },
                  {
                    label: "Creative",
                    value: "Content system",
                    body: "For campaigns that need stronger direction and less production chaos.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.35rem] border border-white/12 bg-white/8 px-5 py-5 shadow-[0_18px_34px_rgba(0,0,0,0.16)] backdrop-blur-[2px]"
                  >
                    <p className="font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#ffe55a]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-[1.2rem] font-semibold leading-[1.02] text-white">
                      {item.value}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[#dbe8ff]/85">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-5 py-[clamp(4rem,6vw,6rem)] sm:px-8 lg:px-12">
          <div
            className="absolute inset-0 opacity-90"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18% 20%, rgba(255,210,63,0.12), transparent 16%), radial-gradient(circle at 82% 24%, rgba(86,190,249,0.12), transparent 18%), linear-gradient(to bottom, rgba(215,154,119,0.08) 1px, transparent 1px)",
              backgroundSize: "100% 100%, 100% 100%, 100% 2.15rem",
            }}
          />

          <div className="relative z-10 mx-auto max-w-[84rem]">
            <div className="mx-auto mb-10 max-w-[44rem] text-center">
              <SectionTag color="#c5a0ff" label="Choose your lane" text="#ffffff" />
              <h2 className="mt-5 text-[clamp(2.25rem,4.7vw,4.2rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#171717]">
                Built like the single service pages, just tighter and easier to scan.
              </h2>
              <p className="mt-4 text-[0.98rem] leading-7 text-[#554742]">
                Start with the lane that matches the bottleneck. If two or
                three need to connect, the underlying system is already designed
                for that.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
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
                    radius={26}
                    overlayFill={
                      index === 1
                        ? "rgba(31,143,255,0.10)"
                        : index === 2
                          ? "rgba(197,160,255,0.12)"
                          : "rgba(255,179,71,0.10)"
                    }
                    overlayFillStyle="zigzag-line"
                    overlayFillWeight={0.82}
                    overlayHachureGap={11}
                    overlayHachureAngle={24}
                  >
                    <div className="flex h-full flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="inline-flex rounded-full bg-white/65 px-3 py-1 font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#5d5147]">
                            {service.shortName}
                          </div>
                          <p className="mt-3 font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#8a4a26]">
                            {service.primaryKeyword}
                          </p>
                        </div>
                        <div
                          className="h-4 w-4 rounded-full border border-black/10"
                          style={{ backgroundColor: service.theme.accent }}
                        />
                      </div>

                      <h3 className="mt-4 text-[1.9rem] font-semibold leading-[0.98] tracking-[-0.05em] text-[#171717]">
                        {service.name}
                      </h3>

                      <p className="mt-4 text-[0.96rem] leading-7 text-[#554742]">
                        {service.conciseAnswer}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {service.heroChips.slice(0, 3).map((chip) => (
                          <span
                            key={chip}
                            className="rounded-full border border-black/8 bg-white/58 px-3 py-1 text-[0.72rem] font-medium text-[#473f39]"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 grid gap-3">
                        {service.stats.slice(0, 2).map((stat) => (
                          <div
                            key={stat.value}
                            className="rounded-[1rem] border border-black/8 bg-white/55 px-4 py-3"
                          >
                            <p className="text-[0.98rem] font-semibold tracking-[-0.03em] text-[#171717]">
                              {stat.value}
                            </p>
                            <p className="mt-1 text-[0.84rem] leading-6 text-[#5b4d45]">
                              {stat.label}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 border-t border-black/10 pt-4">
                        <p className="font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#8a4a26]">
                          Best for
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[#554742]">
                          {service.audience}
                        </p>
                      </div>

                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#171717]">
                        Open service page
                        <span aria-hidden="true">+</span>
                      </div>
                    </div>
                  </SketchFrame>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#1d2236] px-5 py-[clamp(4rem,6vw,6rem)] text-white sm:px-8 lg:px-12">
          <div
            className="absolute inset-0 opacity-85"
            style={{
              backgroundImage:
                "linear-gradient(rgba(132,212,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(132,212,255,0.10) 1px, transparent 1px), radial-gradient(circle at 20% 22%, rgba(255,255,255,0.12), transparent 18%)",
              backgroundSize: "1.1rem 1.1rem, 1.1rem 1.1rem, 100% 100%",
            }}
          />

          <div className="relative z-10 mx-auto max-w-[84rem]">
            <div className="mb-10 max-w-[48rem]">
              <SectionTag color="#ffe55a" label="How they fit together" text="#3b2b00" />
              <h2 className="mt-5 text-[clamp(2.25rem,4.6vw,4.1rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-white">
                Different entry points, same growth backbone.
              </h2>
              <p className="mt-4 text-[0.98rem] leading-7 text-[#dbe8ff]">
                Most brands enter through one bottleneck first. The system gets
                stronger when media, site, and creative stop operating like
                separate vendors.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {servicePages.map((service, index) => (
                <div
                  key={service.slug}
                  className="rounded-[1.45rem] border border-white/12 bg-white/7 p-5 shadow-[0_16px_34px_rgba(0,0,0,0.22)] backdrop-blur-[2px]"
                >
                  <div className="inline-flex rounded-full bg-white/10 px-3 py-1 font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#c7ecff]">
                    0{index + 1} - {service.shortName}
                  </div>
                  <h3 className="mt-4 text-[1.45rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
                    {service.pillars[0]?.title ?? service.name}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-7 text-[#d8eefc]">
                    {service.pillars[0]?.body ?? service.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.secondaryKeywords.slice(0, 2).map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[0.72rem] font-medium text-[#e8f6ff]"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-16 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-[84rem] gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <SectionTag color="#ff8b5e" label="Questions" text="#ffffff" />
              <h2 className="mt-5 max-w-[14ch] text-[clamp(2.15rem,4.4vw,3.9rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#171717]">
                The quick answers before you choose a lane.
              </h2>
              <p className="mt-4 max-w-[40rem] text-[1rem] leading-8 text-[#5a4d45]">
                The goal here is clarity, not filler. If you already know which
                lane fits, head into the service page. If not, send the team a
                note and we can point you in the right direction.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="rounded-full bg-[#171717] px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Back to home
                </Link>
                <OpenContactButton className="rounded-full border border-black/10 bg-[#fff8ef] px-5 py-3 font-semibold text-[#171717] transition hover:-translate-y-0.5">
                  Open the notebook
                </OpenContactButton>
              </div>
            </div>

            <div className="grid gap-4">
              {servicesFaqs.map((item) => (
                <SketchFrame
                  key={item.question}
                  className="px-5 py-5 sm:px-6"
                  fill="#fff8ef"
                  stroke="#171717"
                  strokeWidth={1.55}
                  roughness={1.1}
                  bowing={1.75}
                  inset={1.3}
                  radius={20}
                  overlayFill="rgba(255, 179, 71, 0.09)"
                  overlayFillStyle="zigzag-line"
                  overlayFillWeight={0.78}
                  overlayHachureGap={12}
                  overlayHachureAngle={25}
                >
                  <h3 className="text-[1.08rem] font-semibold tracking-[-0.03em] text-[#171717]">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#554742]">
                    {item.answer}
                  </p>
                </SketchFrame>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
