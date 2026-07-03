import type { Metadata } from "next";
import Link from "next/link";
import { ContactPageForm } from "@/app/components/ContactPageForm";
import {
  buildBreadcrumbSchema,
  buildOrganizationSchema,
  buildPageMetadata,
  buildWebPageSchema,
  buildWebsiteSchema,
  siteConfig,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  category: "contact",
  description:
    "Contact Sthyra Digital about performance marketing, web development, technical SEO, and creative systems through a dedicated contact page.",
  keywords: [
    "contact Sthyra Digital",
    "contact performance marketing agency Bangalore",
    "contact web development agency Bangalore",
    "contact technical SEO agency",
    "contact creative agency Bangalore",
  ],
  path: "/contact",
  title: "Contact Us",
});

const contactStructuredData = [
  buildOrganizationSchema(),
  buildWebsiteSchema(),
  buildBreadcrumbSchema("/contact", [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]),
  buildWebPageSchema({
    description:
      "Dedicated contact page for Sthyra Digital covering websites, performance marketing, technical SEO, and creative systems.",
    name: "Contact Sthyra Digital",
    path: "/contact",
  }),
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactStructuredData) }}
      />

      <main className="min-h-screen overflow-hidden bg-[#fdf6ee] text-[#171717]">
        <section className="relative isolate overflow-hidden bg-[#171d32] px-5 pb-20 pt-6 text-white sm:px-8 lg:px-12 lg:pb-24">
          <div className="hero-noise absolute inset-0 opacity-30 mix-blend-soft-light" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 14% 18%, rgba(255,229,90,0.12), transparent 18%), radial-gradient(circle at 84% 16%, rgba(9,183,234,0.18), transparent 20%), radial-gradient(circle at 50% 100%, rgba(255,139,94,0.14), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.16))",
            }}
          />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-[6%] top-[16%] h-44 w-44 rounded-full bg-white/8 blur-[90px]" />
            <div className="absolute right-[10%] top-[20%] h-52 w-52 rounded-full bg-[#56bef9]/14 blur-[120px]" />
            <div className="absolute bottom-[-2rem] left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#ff8b5e]/10 blur-[128px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-[70rem]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="font-[family:var(--font-geist-mono)] text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:text-white/75"
                >
                  sthyra.digital
                </Link>
                <span className="text-white/50">/</span>
                <span className="font-[family:var(--font-geist-mono)] text-sm font-semibold uppercase tracking-[0.16em] text-white/72">
                  Contact
                </span>
              </div>

              <div className="hidden rounded-full border border-white/16 bg-white/10 px-4 py-2 font-[family:var(--font-geist-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#ffe55a] sm:block">
                Web + growth + creative
              </div>
            </div>

            <div className="mx-auto mt-16 max-w-[52rem] text-center">
              <div className="inline-flex rotate-[-2deg] rounded-full border-2 border-white/18 bg-[#fff36d] px-4 py-1 font-[family:var(--font-geist-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-black shadow-[0_10px_24px_rgba(0,0,0,0.16)]">
                Contact us
              </div>

              <h1 className="mt-6 font-baumans text-[clamp(3.3rem,8.5vw,6.7rem)] leading-[0.9] tracking-[-0.06em] text-white">
                Let&apos;s talk about what needs to move.
              </h1>

              <p className="mx-auto mt-6 max-w-[40rem] text-[1rem] leading-8 text-[#dbe8ff] sm:text-[1.06rem]">
                One clean place to send the full brief. Websites, performance
                marketing, creative direction, technical cleanup, launches, or
                a mixed problem that crosses all three.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="rounded-full bg-[#ffe55a] px-5 py-3 font-semibold text-[#171717] shadow-[0_12px_22px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5"
                >
                  {siteConfig.email}
                </a>
                <Link
                  href="/services"
                  className="rounded-full border border-white/18 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/14"
                >
                  Explore services
                </Link>
              </div>
            </div>
          </div>

        </section>

        <section className="relative -mt-10 px-5 pb-24 sm:px-8 lg:px-12 lg:pb-28">
          <div
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(216,173,141,0.1) 1px, transparent 1px)",
              backgroundSize: "100% 2.25rem",
            }}
          />

          <div className="relative z-10 mx-auto max-w-[66rem]">
            <ContactPageForm />

            <div className="mx-auto mt-8 max-w-[40rem] text-center">
              <p className="font-[family:var(--font-geist-mono)] text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#8a4a26]">
                best start
              </p>
              <p className="mt-3 text-[0.98rem] leading-7 text-[#5b4f45]">
                A link, a timeline, and the part that feels blocked right now
                is usually enough for a strong first reply.
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-[#fdf6ee] to-white sm:h-36" />
        </section>
      </main>
    </>
  );
}
