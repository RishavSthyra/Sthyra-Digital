import Image from "next/image";
import illustration from "@/public/illustration.webp";
import Link from "next/link";
import { CreativeNavbar } from "@/app/components/CreativeNavbar";
import { OpenContactButton } from "@/app/components/OpenContactButton";

const FIGMA_FRAME_WIDTH = 1436;
const SVG_WIDTH_RATIO = 1396.12 / FIGMA_FRAME_WIDTH;
const ILLUSTRATION_WIDTH_RATIO = 1148 / FIGMA_FRAME_WIDTH;
const marqueeLoopText = [
  "Too F** Creative",
  "Built Different",
  "Too F** Targeted",
  "Too F** Creative",
  "Built Different",
  "Too F** Targeted",
];

export function CreativeHero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-x-hidden bg-[var(--hero-bg)] text-white sm:min-h-[100svh]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_48%),radial-gradient(circle_at_20%_70%,rgba(0,180,255,0.18),transparent_38%),radial-gradient(circle_at_80%_24%,rgba(255,255,255,0.16),transparent_26%)]" />
      <div className="hero-noise absolute inset-0 opacity-35 mix-blend-soft-light" />

      <div className="relative z-10 flex w-full flex-col px-4 pb-3 pt-4 sm:min-h-[100svh] sm:px-6 sm:pb-6 sm:pt-5 lg:px-8 lg:pb-8 lg:pt-6 xl:px-12">
        <CreativeNavbar />

        <div className="relative flex flex-1 flex-col items-center pt-8 sm:pt-10 md:pt-12 lg:pt-6">
          <div
            className="pointer-events-none absolute left-1/2 top-[15%] z-10 max-w-none -translate-x-1/2 select-none sm:top-[14%] md:top-[15%] lg:top-[12%]"
            style={{ width: `${SVG_WIDTH_RATIO * 100}vw` }}
          >
            <Image
              src="/we-are-new.svg"
              alt=""
              aria-hidden="true"
              width={1397}
              height={526}
              unoptimized
              priority
              sizes="100vw"
              className="hero-we-are h-auto w-full"
            />
          </div>

          <div className="relative z-20 mt-[8svh] translate-x-[clamp(0.9rem,2.2vw,2.8rem)] sm:mt-[8svh] md:mt-[10svh] lg:mt-[10svh] xl:mt-[8svh]">
            <div
              className="absolute inset-x-0 bottom-[-1.8rem] z-10 mx-auto h-12 rounded-full bg-[#0d3554]/28 blur-3xl sm:h-14 md:bottom-[-2.2rem] md:h-16"
              style={{
                width: `${ILLUSTRATION_WIDTH_RATIO * 68}vw`,
              }}
            />
            <div
              className="hero-illustration-shell relative z-20"
              style={{ width: `${ILLUSTRATION_WIDTH_RATIO * 100}vw` }}
            >
              <Image
                src={illustration}
                alt="Three creative teammates working across bright floating platforms"
                preload
                fetchPriority="high"
                sizes="(max-width: 767px) 92vw, 79.944vw"
                className="h-auto w-full drop-shadow-[0_35px_50px_rgba(9,23,43,0.26)]"
              />
            </div>
          </div>

          <div className="relative z-30 mt-[clamp(0.5rem,2vh,1.5rem)] flex w-full flex-col items-center gap-5 sm:gap-6">
            <div className="pointer-events-none relative left-1/2 w-screen -translate-x-1/2 overflow-hidden sm:left-[52%]">
              <div className="hero-marquee-track flex items-end whitespace-nowrap">
                {marqueeLoopText.map((text, index) => (
                  <div
                    key={`${text}-${index}`}
                    className="font-display flex h-full w-screen shrink-0 items-end justify-center px-4 text-center text-[clamp(3.4rem,10vw,8rem)] leading-[0.9] tracking-[-0.04em] text-white"
                  >
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto flex w-full max-w-[72rem] flex-col items-center px-6 text-center">
              <p className="font-[family:var(--font-geist-mono)] text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#ffe9a3]">
                Digital marketing agency in Bangalore
              </p>
              <h1 className="mt-4 max-w-[26ch] text-balance font-sans text-[clamp(2.2rem,4.6vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
                Performance marketing for{" "}
                <span className="text-[#ffe55a]">bold brands</span>, built to
                grow.
              </h1>
            </div>

            <p className="mx-auto max-w-[50rem] px-6 text-center text-[0.95rem] leading-7 text-[#bde9ff] sm:text-base">
              Sthyra Digital blends technical SEO, performance marketing,
              custom websites, and creative direction into one connected growth
              system. We help ambitious teams launch memorable digital
              experiences that load fast, explain the offer clearly, and
              convert attention into measurable demand.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 px-6">
              <Link
                href="/services"
                className="rounded-full bg-[#ffe55a] px-5 py-3 text-sm font-semibold text-[#171717] transition hover:-translate-y-0.5"
              >
                Explore service pages
              </Link>
              <OpenContactButton className="rounded-full border border-white/18 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/16">
                Start a project
              </OpenContactButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
