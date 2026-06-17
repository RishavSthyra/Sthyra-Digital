import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { OpenContactButton } from "@/app/components/OpenContactButton";
import { SketchFrame } from "@/app/components/SketchFrame";
import {
  buildBreadcrumbSchema,
  buildOrganizationSchema,
  buildPageMetadata,
  buildWebPageSchema,
  buildWebsiteSchema,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  category: "brand",
  description:
    "A concise overview of Sthyra Digital's approach to brand systems, websites, creative direction, and growth-focused execution.",
  keywords: [
    "Sthyra Digital overview",
    "brand systems agency Bangalore",
    "website and creative overview",
    "performance marketing overview",
  ],
  path: "/project-overview",
  title: "Project Overview",
});

const projectOverviewStructuredData = [
  buildOrganizationSchema(),
  buildWebsiteSchema(),
  buildBreadcrumbSchema("/project-overview", [
    { name: "Home", path: "/" },
    { name: "Project Overview", path: "/project-overview" },
  ]),
  buildWebPageSchema({
    description:
      "A concise overview of Sthyra Digital's approach to websites, creative systems, and growth execution.",
    name: "Sthyra Digital Project Overview",
    path: "/project-overview",
  }),
];

const overviewCards = [
  {
    chip: "What we build",
    title: "Connected brand systems",
    body:
      "We blend website architecture, performance marketing, and creative direction so the offer stays clear from first click to conversion.",
    fill: "#fff8ef",
    overlay: "rgba(255, 179, 71, 0.1)",
  },
  {
    chip: "How we work",
    title: "Small-team accountability",
    body:
      "The same team that shapes the strategy also ships the page structure, reviews the creative, and checks the traffic quality.",
    fill: "#dff2ff",
    overlay: "rgba(31, 143, 255, 0.12)",
  },
  {
    chip: "Where to start",
    title: "Clear paths into the work",
    body:
      "You can begin with a service page, the cohort offer, or a direct note. The site now routes each of those paths into a working contact flow.",
    fill: "#fff2b1",
    overlay: "rgba(255, 210, 63, 0.14)",
  },
] as const;

export default function ProjectOverviewPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectOverviewStructuredData),
        }}
      />

      <main className="min-h-screen bg-[#fff8ef] text-[#171717]">
        <section className="relative isolate overflow-hidden bg-[#0b1230] px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-20">
          <div className="hero-noise absolute inset-0 opacity-25 mix-blend-soft-light" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18% 18%, rgba(34,211,238,0.18), transparent 24%), radial-gradient(circle at 82% 22%, rgba(255,93,143,0.16), transparent 22%), linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.12))",
            }}
          />

          <div className="relative z-10 mx-auto grid max-w-[80rem] gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] lg:items-center">
            <div>
              <div className="mb-5 inline-block rounded-full border border-white/15 bg-white/10 px-4 py-2 font-[family:var(--font-geist-mono)] text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[#ffe55a]">
                Project Overview
              </div>
              <h1 className="max-w-[12ch] font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] tracking-[-0.07em] text-white">
                The quick read on how Sthyra works.
              </h1>
              <p className="mt-6 max-w-[40rem] text-[1rem] leading-7 text-[#d8eefc] sm:text-[1.05rem]">
                This page closes the gap between the brand, the service pages,
                and the cohort offer. It gives visitors a clean overview of the
                studio without forcing them into a dead link or a missing route.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/services"
                  className="rounded-full bg-[#ffe55a] px-5 py-3 font-semibold text-[#171717] shadow-[0_12px_22px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5"
                >
                  Explore services
                </Link>
                <Link
                  href="/elevate-starter-kit"
                  className="rounded-full border border-white/18 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/14"
                >
                  View cohort offer
                </Link>
                <OpenContactButton className="rounded-full border border-white/18 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/14">
                  Start a conversation
                </OpenContactButton>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[30rem]">
              <div className="absolute -left-4 top-6 h-24 w-24 rounded-full bg-[#22d3ee]/20 blur-3xl" />
              <div className="absolute -right-4 bottom-10 h-28 w-28 rounded-full bg-[#ff5d8f]/18 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/8 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                <Image
                  src="/illustration.png"
                  alt="Illustrated overview of the Sthyra Digital brand direction"
                  width={1148}
                  height={760}
                  className="h-auto w-full rounded-[1.4rem] object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-[clamp(4rem,6vw,6rem)] sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-[80rem] gap-5 lg:grid-cols-3">
            {overviewCards.map((card) => (
              <SketchFrame
                key={card.title}
                className="h-full px-5 py-5 sm:px-6 sm:py-6"
                fill={card.fill}
                stroke="#171717"
                strokeWidth={1.65}
                roughness={1.15}
                bowing={1.84}
                inset={1.35}
                radius={24}
                overlayFill={card.overlay}
                overlayFillStyle="zigzag-line"
                overlayFillWeight={0.8}
                overlayHachureGap={11}
                overlayHachureAngle={24}
              >
                <div className="space-y-4">
                  <div className="inline-flex rounded-full bg-white/60 px-3 py-1 font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#5d5147]">
                    {card.chip}
                  </div>
                  <h2 className="text-[1.8rem] font-semibold leading-[1.02] tracking-[-0.045em] text-[#171717]">
                    {card.title}
                  </h2>
                  <p className="text-[0.98rem] leading-7 text-[#554742]">
                    {card.body}
                  </p>
                </div>
              </SketchFrame>
            ))}
          </div>
        </section>

        <section className="bg-white px-5 py-16 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-[80rem] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.9fr)] lg:items-center">
            <div>
              <p className="font-[family:var(--font-geist-mono)] text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#8f4b1f]">
                Next step
              </p>
              <h2 className="mt-4 max-w-[14ch] text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#171717]">
                Pick the path that matches the kind of help you need.
              </h2>
              <p className="mt-4 max-w-[40rem] text-[1rem] leading-8 text-[#5a4d45]">
                If you already know the workstream, head into the service pages.
                If you want the subsidized offer, use the cohort page. If you
                just want to talk it through, open the notebook and send the
                team a note directly from the site.
              </p>
            </div>

            <SketchFrame
              className="px-5 py-5 sm:px-6 sm:py-6"
              fill="#fff8ef"
              stroke="#171717"
              strokeWidth={1.65}
              roughness={1.14}
              bowing={1.82}
              inset={1.35}
              radius={24}
              overlayFill="rgba(255, 179, 71, 0.1)"
              overlayFillStyle="hachure"
              overlayFillWeight={0.82}
              overlayHachureGap={12}
              overlayHachureAngle={24}
            >
              <div className="space-y-4">
                <Image
                  src="/Team.png"
                  alt="The Sthyra Digital team"
                  width={1200}
                  height={900}
                  className="h-auto w-full rounded-[1.2rem] object-cover"
                />
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/"
                    className="rounded-full bg-[#171717] px-4 py-2 font-semibold text-white transition hover:-translate-y-0.5"
                  >
                    Back to home
                  </Link>
                  <OpenContactButton className="rounded-full border border-black/12 bg-white px-4 py-2 font-semibold text-[#171717] transition hover:-translate-y-0.5">
                    Open the notebook
                  </OpenContactButton>
                </div>
              </div>
            </SketchFrame>
          </div>
        </section>
      </main>
    </>
  );
}
