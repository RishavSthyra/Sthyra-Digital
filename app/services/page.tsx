import type { Metadata } from "next";
import Link from "next/link";
import { SketchFrame } from "@/app/components/SketchFrame";
import { servicePages } from "@/app/services/servicePageContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore performance marketing, web development, and creative management services from sthyra.digital.",
  alternates: {
    canonical: "/services",
  },
  keywords: [
    "performance marketing services",
    "web development services",
    "creative management services",
    "digital agency services",
  ],
};

export default function ServicesIndexPage() {
  return (
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

          <h1 className="max-w-[11ch] font-display text-[clamp(3.2rem,7vw,6.6rem)] leading-[0.88] tracking-[-0.075em]">
            Three service pages.
            <br />
            One creative system.
          </h1>

          <p className="mt-6 max-w-[42rem] text-[1rem] leading-7 text-[#fff3ed] sm:text-[1.05rem]">
            Each page keeps the same notebook energy, but the messaging, color
            direction, and SEO focus shift around the actual service.
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
            <Link key={service.slug} href={`/services/${service.slug}`} className="block">
              <SketchFrame
                className="h-full px-5 py-5 transition hover:-translate-y-1 sm:px-6 sm:py-6"
                fill={index === 0 ? service.theme.paper : index === 1 ? service.theme.paperAlt : service.theme.paperSoft}
                stroke="#171717"
                strokeWidth={1.65}
                roughness={1.15}
                bowing={1.84}
                inset={1.35}
                radius={24}
                overlayFill={index === 1 ? "rgba(31,143,255,0.10)" : "rgba(255,179,71,0.10)"}
                overlayFillStyle="zigzag-line"
                overlayFillWeight={0.8}
                overlayHachureGap={11}
                overlayHachureAngle={24}
              >
                <div className="space-y-4">
                  <div className="inline-flex rounded-full bg-white/60 px-3 py-1 font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#5d5147]">
                    {service.heroEyebrow}
                  </div>
                  <h2 className="text-[1.85rem] font-semibold leading-[1.02] tracking-[-0.045em] text-[#171717]">
                    {service.name}
                  </h2>
                  <p className="text-[0.98rem] leading-7 text-[#554742]">
                    {service.metaDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.heroChips.slice(0, 3).map((chip) => (
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
    </main>
  );
}
