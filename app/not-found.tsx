import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you are looking for could not be found. Explore the homepage or service pages instead.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center bg-[#fff8ef] px-5 py-16 text-[#171717] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[48rem] text-center">
        <p className="font-[family:var(--font-geist-mono)] text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#8f4b1f]">
          404
        </p>
        <h1 className="mt-4 text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[0.92] tracking-[-0.06em]">
          This page wandered off the website.
        </h1>
        <p className="mx-auto mt-5 max-w-[36rem] text-[1rem] leading-8 text-[#5a4d45]">
          The URL may have changed, the page may have been removed, or the link
          may be outdated. The homepage and service library are the best places
          to continue.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-[#171717] px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5"
          >
            Go to homepage
          </Link>
          <Link
            href="/services"
            className="rounded-full border border-black/10 bg-white px-5 py-3 font-semibold text-[#171717] transition hover:-translate-y-0.5"
          >
            Explore services
          </Link>
        </div>
      </div>
    </main>
  );
}
