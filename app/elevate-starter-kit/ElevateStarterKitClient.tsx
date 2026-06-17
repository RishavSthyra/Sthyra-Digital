"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  FiClock,
  FiCode,
  FiFileText,
  FiSearch,
  FiShield,
  FiAward,
  FiImage,
  FiFilm,
  FiGrid,
  FiRepeat,
  FiTarget,
  FiBookOpen,
} from "react-icons/fi";
import { baumans } from "@/app/fonts";
import { SketchFrame } from "@/app/components/SketchFrame";
import { AlphaCohortApplicationPopup } from "@/app/components/AlphaCohortApplicationPopup";

gsap.registerPlugin(ScrollTrigger);

type CohortOffer = "alpha-50" | "core-5" | "full-stack";

const COLORS = {
  page: "#0f0a1f",
  hero: "#0f0a1f",
  accent: "#ffd23f",
  accentSoft: "#ff5d8f",
  accentThird: "#7ddc62",
  accentFourth: "#56bef9",
  dark: "#181028",
  ink: "#171717",
  paper: "#fff8ef",
  paperAlt: "#fde2ec",
  paperSoft: "#fff2b1",
  paperMint: "#dff7e6",
  paperSky: "#dff2ff",
};

function themeVars(): CSSProperties {
  return {
    ["--ek-page" as string]: COLORS.page,
    ["--ek-hero" as string]: COLORS.hero,
    ["--ek-accent" as string]: COLORS.accent,
    ["--ek-accent-soft" as string]: COLORS.accentSoft,
    ["--ek-accent-third" as string]: COLORS.accentThird,
    ["--ek-accent-fourth" as string]: COLORS.accentFourth,
    ["--ek-dark" as string]: COLORS.dark,
    ["--ek-ink" as string]: COLORS.ink,
    ["--ek-paper" as string]: COLORS.paper,
    ["--ek-paper-alt" as string]: COLORS.paperAlt,
    ["--ek-paper-soft" as string]: COLORS.paperSoft,
    ["--ek-paper-mint" as string]: COLORS.paperMint,
    ["--ek-paper-sky" as string]: COLORS.paperSky,
  };
}

function SectionTag({
  color,
  label,
  text,
  fillStyle = "zigzag-line",
}: {
  color: string;
  label: string;
  text: string;
  fillStyle?: "zigzag-line" | "hachure" | "cross-hatch" | "solid";
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
      overlayFillStyle={fillStyle}
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

function HeroOrbitTag({
  className,
  color,
  label,
  text,
  fillStyle = "zigzag-line",
}: {
  className: string;
  color: string;
  label: string;
  text: string;
  fillStyle?: "zigzag-line" | "hachure" | "cross-hatch" | "solid";
}) {
  return (
    <div
      data-hero-orbit
      className={`pointer-events-none absolute hidden lg:block ${className}`}
    >
      <SectionTag color={color} label={label} text={text} fillStyle={fillStyle} />
    </div>
  );
}

function SlotCounter({ filled, total, accent }: { filled: number; total: number; accent: string }) {
  const percent = Math.min(100, Math.round((filled / total) * 100));
  return (
    <div className="w-full">
      <div className="mb-2 flex items-end justify-between font-[family:var(--font-geist-mono)]">
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#171717]/70">
          Cohort slots filled
        </span>
        <span className="text-[0.72rem] font-semibold tracking-[0.05em] text-[#171717]">
          {filled} / {total}
        </span>
      </div>
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-[#171717]/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-0 h-full rounded-full"
          style={{ backgroundColor: accent }}
        />
      </div>
    </div>
  );
}

const FAQS = [
  {
    question: "Why are these offers priced below market?",
    answer:
      "We are actively building our flagship case-study portfolio. In exchange for the heavily subsidized launch pricing and a strict performance SLA, every client in the cohort signs a data-release clause allowing Sthyra to publish verified performance data, page-speed metrics, and conversion lift as public case studies.",
  },
  {
    question: "What happens once the cohort fills?",
    answer:
      "Once Slot 50 is filled for the Alpha-50 Sprint and Slot 30 is filled for the Core-5 Incubator, both cohorts close permanently. Pricing resets to standard market valuations with no exceptions. There is no waitlist, no rollover, no second wave.",
  },
  {
    question: "Can I take just one of the two offers?",
    answer:
      "Yes. The Alpha-50 Architecture Sprint and the Core-5 Growth Incubator are independent programs. Most clients take only one. The few that take both typically use the Sprint for a faster site foundation and the Incubator to drive paid traffic to it from day one.",
  },
  {
    question: "Is the 7-day delivery actually 7 calendar days?",
    answer:
      "Yes, 7 calendar days from kickoff call to live deployment, with an ironclad money-back SLA. The clock starts the moment we receive your brand assets, copy, and offer details — not the moment you inquire. We do not run the Sprint on ambiguous inputs.",
  },
  {
    question: "What does the Core-5 framework actually include?",
    answer:
      "Nine static creatives, four short-form reels per month, a permanent retargeting engine, and our 4/5 content framework installed inside your account. We do not post vanity content — we engineer a high-intent loop that turns raw profile visitors into paying customers within 30 days.",
  },
  {
    question: "Is there a minimum ad spend for the Core-5 Incubator?",
    answer:
      "Yes. The Core-5 program is built specifically for brands running ad budgets under ₹30,000/month. The framework is mathematically tuned for that range. If your monthly ad spend is already significantly higher, you are a better fit for our enterprise performance tier.",
  },
];

export function ElevateStarterKitClient() {
  const rootRef = useRef<HTMLElement>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [activeOffer, setActiveOffer] = useState<CohortOffer | undefined>(
    undefined,
  );

  const openApplication = (offer?: CohortOffer) => {
    setActiveOffer(offer);
    setIsApplicationOpen(true);
  };

  const closeApplication = () => {
    setIsApplicationOpen(false);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const heroOrbits = gsap.utils.toArray<HTMLElement>("[data-hero-orbit]");
      const heroPortraits = gsap.utils.toArray<HTMLElement>("[data-hero-portrait]");
      const sections = gsap.utils.toArray<HTMLElement>("[data-ek-section]");
      const panelSheens = gsap.utils.toArray<HTMLElement>("[data-panel-sheen]");
      const slotCounters = gsap.utils.toArray<HTMLElement>("[data-slot-counter]");

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .from("[data-hero-wash]", {
          autoAlpha: 0,
          scale: 0.88,
          duration: 1,
          transformOrigin: "center center",
        })
        .from("[data-hero-header]", { autoAlpha: 0, y: -22, duration: 0.65 }, 0.06)
        .from("[data-hero-badge]", { autoAlpha: 0, scale: 0.92, y: 18, duration: 0.55 }, 0.14)
        .from(
          "[data-hero-title]",
          { autoAlpha: 0, y: 72, filter: "blur(18px)", duration: 1.05 },
          0.18,
        )
        .from(
          heroPortraits,
          { autoAlpha: 0, y: 40, scale: 0.92, duration: 0.82, stagger: 0.08 },
          0.24,
        )
        .from("[data-hero-copy]", { autoAlpha: 0, y: 28, duration: 0.7 }, 0.32)
        .from(
          "[data-hero-chip]",
          { autoAlpha: 0, y: 18, scale: 0.94, duration: 0.45, stagger: 0.06 },
          0.42,
        )
        .from(
          "[data-hero-action]",
          { autoAlpha: 0, y: 18, scale: 0.96, duration: 0.48, stagger: 0.08 },
          0.54,
        )
        .from(
          heroOrbits,
          {
            autoAlpha: 0,
            y: 24,
            scale: 0.9,
            rotate: (i) => (i % 2 === 0 ? -6 : 6),
            duration: 0.65,
            stagger: 0.08,
          },
          0.4,
        );

      heroOrbits.forEach((orbit, i) => {
        gsap.to(orbit, {
          x: i % 2 === 0 ? 8 : -8,
          y: i % 3 === 0 ? 10 : -10,
          rotate: i % 2 === 0 ? 3 : -3,
          duration: 3 + i * 0.25,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      sections.forEach((section) => {
        const headings = section.querySelectorAll<HTMLElement>("[data-section-heading]");
        const accents = section.querySelectorAll<HTMLElement>("[data-reveal-accent]");
        const cards = section.querySelectorAll<HTMLElement>("[data-reveal-card]");

        const reveal = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: section, start: "top 74%", once: true },
        });

        if (headings.length) {
          reveal.from(headings, {
            autoAlpha: 0,
            y: 30,
            filter: "blur(12px)",
            duration: 0.7,
            stagger: 0.08,
          });
        }
        if (accents.length) {
          reveal.from(
            accents,
            {
              autoAlpha: 0,
              scale: 0.92,
              rotate: (i) => (i % 2 === 0 ? -5 : 5),
              duration: 0.45,
              stagger: 0.05,
            },
            0.08,
          );
        }
        if (cards.length) {
          reveal.from(
            cards,
            { autoAlpha: 0, y: 42, scale: 0.97, duration: 0.62, stagger: 0.08 },
            0.14,
          );
        }
      });

      panelSheens.forEach((panel) => {
        gsap.to(panel, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      slotCounters.forEach((counter) => {
        const target = Number(counter.getAttribute("data-slot-counter") ?? 0);
        const numEl = counter.querySelector<HTMLElement>("[data-slot-number]");
        if (!numEl) return;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: counter, start: "top 80%", once: true },
          onUpdate: () => {
            numEl.textContent = Math.round(obj.v).toString();
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={rootRef}
      className="min-h-screen"
      style={{
        ...themeVars(),
        backgroundColor: "var(--ek-page)",
        color: "var(--ek-ink)",
      }}
    >
      {/* HERO */}
      <section className="relative isolate overflow-x-hidden overflow-y-visible lg:overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: "var(--ek-hero)" }} />
        <div className="hero-noise absolute inset-0 opacity-30 mix-blend-soft-light" />
        <div
          data-hero-wash
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 14% 20%, rgba(255,255,255,0.22), transparent 22%), radial-gradient(circle at 84% 18%, rgba(255,255,255,0.14), transparent 18%), radial-gradient(circle at 50% 70%, rgba(255,255,255,0.1), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.18))",
          }}
        />

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[10%] top-[18%] h-44 w-44 rounded-full bg-white/10 blur-[88px]" />
          <div
            className="absolute right-[8%] top-[26%] h-52 w-52 rounded-full blur-[105px]"
            style={{ backgroundColor: "color-mix(in srgb, var(--ek-accent) 14%, transparent)" }}
          />
          <div
            className="absolute bottom-[10%] left-1/2 h-52 w-52 -translate-x-1/2 rounded-full blur-[118px]"
            style={{ backgroundColor: "color-mix(in srgb, var(--ek-accent-soft) 18%, transparent)" }}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[2] hidden overflow-hidden lg:block"
          aria-hidden="true"
        >
          <div
            data-hero-portrait
            className="absolute bottom-[-20rem] left-[-2rem] flex h-[44rem] w-[22rem] items-end justify-start opacity-95 lg:bottom-[-29rem] lg:left-[-3rem] lg:h-[64rem] lg:w-[32rem]"
          >
            <Image
              src="/Man1.svg"
              alt=""
              width={236}
              height={500}
              unoptimized
              sizes="(min-width: 1024px) 512px, 352px"
              className="h-full w-auto object-contain"
            />
          </div>
          <div
            data-hero-portrait
            className="absolute bottom-[-20rem] right-[-2rem] flex h-[44rem] w-[22rem] items-end justify-end opacity-95 lg:bottom-[-29rem] lg:right-[-3rem] lg:h-[64rem] lg:w-[32rem]"
          >
            <Image
              src="/Woman1.svg"
              alt=""
              width={236}
              height={500}
              unoptimized
              sizes="(min-width: 1024px) 512px, 352px"
              className="h-full w-auto object-contain"
            />
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[2] overflow-hidden lg:hidden"
          aria-hidden="true"
        >
          <div
            data-hero-portrait
            className="absolute bottom-[-4.5rem] left-[-1.9rem] flex h-[20.5rem] w-[12.75rem] items-end justify-start opacity-95 sm:bottom-[-6.5rem] sm:left-[-2.2rem] sm:h-[24rem] sm:w-[14.75rem] md:bottom-[-17rem] md:left-[-3.5rem] md:h-[46rem] md:w-[27rem]"
          >
            <Image
              src="/Man1.svg"
              alt=""
              width={236}
              height={500}
              unoptimized
              sizes="(min-width: 768px) 432px, 236px"
              className="h-full w-auto object-contain"
            />
          </div>
          <div
            data-hero-portrait
            className="absolute bottom-[-5rem] right-[-1.7rem] flex h-[19rem] w-[11.75rem] items-end justify-end opacity-95 sm:bottom-[-7rem] sm:right-[-2.2rem] sm:h-[24rem] sm:w-[14.75rem] md:bottom-[-17rem] md:right-[-3.5rem] md:h-[44rem] md:w-[26rem]"
          >
            <Image
              src="/Woman1.svg"
              alt=""
              width={236}
              height={500}
              unoptimized
              sizes="(min-width: 768px) 416px, 224px"
              className="h-full w-auto object-contain"
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-[90rem] px-5 pb-28 pt-5 sm:px-8 sm:pb-36 md:pb-[14rem] lg:px-12 lg:pb-24 lg:pt-6">
          <header
            data-hero-header
            className="mb-12 flex flex-col gap-4 lg:mb-16 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="font-[family:var(--font-geist-mono)] text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:text-white/75"
              >
                sthyra.digital
              </Link>
              <span className="text-white/50">/</span>
              <Link
                href="/services"
                className="font-[family:var(--font-geist-mono)] text-sm font-semibold uppercase tracking-[0.16em] text-white/72 transition hover:text-white"
              >
                Starter Kit
              </Link>
            </div>

            <SketchFrame
              className="px-4 py-3 sm:px-5"
              fill="rgba(255,248,239,0.95)"
              stroke="#171717"
              strokeWidth={1.6}
              roughness={1.22}
              bowing={2.05}
              inset={1.35}
              radius={999}
              overlayFill="rgba(255, 179, 71, 0.13)"
              overlayFillStyle="zigzag-line"
              overlayFillWeight={0.82}
              overlayHachureGap={11}
              overlayHachureAngle={25}
            >
              <div className="flex flex-wrap items-center gap-3 font-[family:var(--font-geist-mono)] text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[#3f3530] sm:gap-4">
                <span>50 + 30 slots only</span>
                <a href="mailto:hello@sthyra.digital" className="transition hover:text-black/70">
                  hello@sthyra.digital
                </a>
              </div>
            </SketchFrame>
          </header>

          <div className="relative mx-auto flex min-h-[32rem] max-w-[78rem] flex-col items-center justify-start pt-8 text-center sm:min-h-[36rem] sm:pt-10 md:min-h-[42rem] md:pt-12 lg:min-h-[42rem] lg:justify-center lg:py-16">
            <HeroOrbitTag
              className="left-[-2%] top-[10%] rotate-[-8deg]"
              color="var(--ek-accent)"
              label="50 + 30 slots"
              text="#3b2b00"
            />
            <HeroOrbitTag
              className="right-[-1%] top-[14%] rotate-[7deg]"
              color="var(--ek-accent-soft)"
              label="Cohort closes"
              text="#ffffff"
              fillStyle="hachure"
            />
            <HeroOrbitTag
              className="left-[6%] bottom-[18%] rotate-[6deg]"
              color="var(--ek-accent-third)"
              label="Case study cohort"
              text="#0a2a10"
              fillStyle="cross-hatch"
            />
            <HeroOrbitTag
              className="right-[3%] bottom-[14%] rotate-[-5deg]"
              color="var(--ek-paper)"
              label="7-day sprint"
              text="#8a4a26"
            />

            <div data-hero-badge className="mb-5 flex flex-wrap justify-center gap-2">
              <SectionTag
                color="var(--ek-accent)"
                label="The Elevate Starter Kit"
                text="#3b2b00"
              />
              <SectionTag
                color="var(--ek-paper)"
                label="Limited cohort · 50 web · 30 growth"
                text="#8a4a26"
                fillStyle="hachure"
              />
            </div>

            <h1
              data-hero-title
              className={`max-w-[28ch] text-balance ${baumans.className} text-[clamp(2.45rem,5.2vw,5.2rem)] leading-[0.92] tracking-[-0.068em] text-white sm:max-w-[26ch] lg:max-w-[24ch]`}
            >
              <span>Two elite, cohort-limited offers to</span>{" "}
              <span
                className="inline text-balance"
                style={{ color: "var(--ek-accent)" }}
              >
                engineer your next chapter.
              </span>
            </h1>

            <p
              data-hero-copy
              className="mt-6 max-w-[58rem] text-[0.98rem] leading-7 text-white/90 sm:text-[1.05rem]"
            >
              We are selecting <span className="font-semibold text-white">50 forward-thinking brands</span> to
              build our foundational case-study portfolio. We have engineered our operational pipelines to
              eliminate agency bloat and deliver massive conversion authority at subsidized launch constraints.
              Once Slot 50 is filled, the cohort closes permanently and pricing resets to standard market
              valuations.
            </p>

            <div className="mt-7 flex max-w-[60rem] flex-wrap justify-center gap-2.5">
              {[
                "50 web build slots",
                "30 growth incubator slots",
                "7-day web delivery SLA",
                "30-day customer loop",
                "Case-study pricing",
              ].map((chip, i) => (
                <div
                  key={chip}
                  data-hero-chip
                  className="rounded-full border border-white/18 px-3.5 py-1.5 font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_8px_18px_rgba(0,0,0,0.08)]"
                  style={{
                    backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)",
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a
                data-hero-action
                href="#alpha-50"
                className="rounded-full border border-black/10 bg-[var(--ek-accent)] px-5 py-3 font-semibold text-[#171717] shadow-[0_12px_22px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5"
              >
                Claim a web build slot
              </a>
              <a
                data-hero-action
                href="#core-5"
                className="rounded-full border border-white/18 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/14"
              >
                Reserve a growth slot
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* POSITIONING / MANIFESTO */}
      <section
        data-ek-section
        className="relative isolate overflow-hidden bg-[var(--ek-paper)] px-5 py-[clamp(4rem,6vw,6rem)] sm:px-8 lg:px-12"
      >
        <div
          data-panel-sheen
          className="absolute inset-0 opacity-95"
          style={{
            backgroundImage:
              "radial-gradient(circle at 14% 18%, rgba(255, 213, 98, 0.18), transparent 18%), radial-gradient(circle at 83% 22%, rgba(255, 93, 143, 0.12), transparent 18%), linear-gradient(to bottom, rgba(215,154,119,0.09) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 100% 100%, 100% 2.2rem",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[80rem]">
          <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-[40rem]">
              <div data-reveal-accent className="inline-block">
                <SectionTag
                  color="var(--ek-accent-soft)"
                  label="The positioning"
                  text="#ffffff"
                />
              </div>
              <h2
                data-section-heading
                className="mt-5 text-[clamp(2.4rem,4.8vw,4.6rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-[#171717]"
              >
                Not discounts. <br />
                <span style={{ color: "#c2175c" }}>Engineered cohort slots.</span>
              </h2>
            </div>
            <p
              data-section-heading
              className="max-w-[44rem] text-[1rem] leading-7 text-[#54463e]"
            >
              Sthyra is not running a sale. We are not running an introductory discount. We are
              building the foundational case-study portfolio of our flagship performance
              infrastructure — and we are willing to subsidize the front of the funnel to do it
              cleanly. In exchange, every cohort member signs a data-release clause and accepts
              the ironclad performance SLAs. Once the slots fill, the doors close.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {[
              {
                chip: "01",
                title: "Subsidized by design",
                body: "We have eliminated agency onboarding bloat and rebuilt our ops pipeline to deliver enterprise-grade output at cohort economics. The math works because the case studies compound.",
                color: "var(--ek-paper)",
                fillStyle: "zigzag-line" as const,
                overlay: "rgba(255, 179, 71, 0.10)",
              },
              {
                chip: "02",
                title: "Tight by SLA",
                body: "7-day web delivery. 30-day customer conversion loop. These are not aspirations — they are contractually locked performance commitments backed by a money-back guarantee.",
                color: "var(--ek-paper-alt)",
                fillStyle: "hachure" as const,
                overlay: "rgba(255, 93, 143, 0.10)",
              },
              {
                chip: "03",
                title: "Data-release cohort",
                body: "Every member signs a clause allowing Sthyra to publish verified performance metrics, page-speed data, and conversion lift as flagship case studies. The transparency is the trade.",
                color: "var(--ek-paper-mint)",
                fillStyle: "cross-hatch" as const,
                overlay: "rgba(125, 220, 98, 0.10)",
              },
              {
                chip: "04",
                title: "Closes permanently",
                body: "Once Slot 50 of the web sprint and Slot 30 of the growth incubator are filled, both cohorts close permanently. Pricing resets to standard market valuation. No waitlist, no rollover, no second wave.",
                color: "var(--ek-paper-sky)",
                fillStyle: "zigzag-line" as const,
                overlay: "rgba(86, 190, 249, 0.10)",
              },
            ].map((pillar) => (
              <div key={pillar.chip} data-reveal-card>
                <SketchFrame
                  className="h-full px-5 py-5 sm:px-6 sm:py-6"
                  fill={pillar.color}
                  stroke="#171717"
                  strokeWidth={1.6}
                  roughness={1.14}
                  bowing={1.82}
                  inset={1.35}
                  radius={24}
                  overlayFill={pillar.overlay}
                  overlayFillStyle={pillar.fillStyle}
                  overlayFillWeight={0.8}
                  overlayHachureGap={11}
                  overlayHachureAngle={24}
                >
                  <div className="space-y-4">
                    <div className="inline-flex rounded-full bg-white/62 px-3 py-1 font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#5f534c]">
                      Pillar {pillar.chip}
                    </div>
                    <h3 className="text-[1.45rem] font-semibold leading-[1.02] tracking-[-0.045em] text-[#171717]">
                      {pillar.title}
                    </h3>
                    <p className="text-[0.95rem] leading-7 text-[#4d4038]">{pillar.body}</p>
                  </div>
                </SketchFrame>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFER 1 — ALPHA-50 ARCHITECTURE SPRINT */}
      <section
        id="alpha-50"
        data-ek-section
        className="relative overflow-hidden bg-[var(--ek-dark)] px-5 py-[clamp(4rem,6vw,6rem)] text-white sm:px-8 lg:px-12"
      >
        <div
          data-panel-sheen
          className="absolute inset-0 opacity-85"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 210, 63, 0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 210, 63, 0.10) 1px, transparent 1px), radial-gradient(circle at 18% 24%, rgba(255,255,255,0.12), transparent 18%)",
            backgroundSize: "1.1rem 1.1rem, 1.1rem 1.1rem, 100% 100%",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            className="absolute -left-32 top-20 h-64 w-64 opacity-40 lg:-left-40 lg:top-32 lg:h-80 lg:w-80"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
            style={{ transformOrigin: "50% 50%" }}
          >
            <Image
              src="/measuring-circle-blank-circular-protractor-grid-measuring-degrees.png"
              alt=""
              fill
              sizes="320px"
              className="object-contain"
            />
          </motion.div>
        </div>

        <div className="relative z-10 mx-auto max-w-[80rem]">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <div data-reveal-accent className="inline-block">
                <SectionTag
                  color="var(--ek-accent)"
                  label="Offer 01 · The web sprint"
                  text="#2f2100"
                  fillStyle="zigzag-line"
                />
              </div>
              <h2
                data-section-heading
                className="mt-5 text-[clamp(2.4rem,4.8vw,4.6rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-white"
              >
                The Alpha-50 <br />
                <span style={{ color: "var(--ek-accent)" }}>Architecture Sprint.</span>
              </h2>
              <p
                data-section-heading
                className="mt-4 text-[0.98rem] leading-7 text-[#dbe8ff] sm:text-[1rem]"
              >
                A high-speed engineering deployment designed exclusively for ambitious founders
                who refuse to waste six weeks dealing with slow, bloated traditional agencies.
                You are bypassing standard agency onboarding backlogs to deliver a fully
                custom-coded, enterprise-grade storefront in exactly{" "}
                <span className="font-semibold text-white">7 days</span>.
              </p>
              <p
                data-section-heading
                className="mt-4 text-[0.98rem] leading-7 text-[#dbe8ff] sm:text-[1rem]"
              >
                We are heavily subsidizing the upfront development costs to a flat{" "}
                <span className="font-semibold text-white">₹30,000</span> strictly for the first
                50 slots. In exchange for this pricing and an ironclad 7-day money-back SLA,
                the client signs a data-release clause allowing Sthyra to publish their
                page-speed data, structural performance metrics, and initial traffic
                conversions as a flagship case study.
              </p>

              <div className="mt-7" data-reveal-card>
                <SketchFrame
                  className="px-5 py-5 sm:px-6"
                  fill="rgba(255, 248, 239, 0.06)"
                  stroke="rgba(255, 210, 63, 0.65)"
                  strokeWidth={1.5}
                  roughness={1.15}
                  bowing={1.8}
                  inset={1.3}
                  radius={22}
                  overlayFill="rgba(255, 210, 63, 0.08)"
                  overlayFillStyle="zigzag-line"
                  overlayFillWeight={0.78}
                  overlayHachureGap={11}
                  overlayHachureAngle={24}
                >
                  <div className="space-y-4">
                    <p className="font-[family:var(--font-geist-mono)] text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[var(--ek-accent)]">
                      Do not call this
                    </p>
                    <p className="text-[0.92rem] leading-6 text-[#dbe8ff]">
                      This is not a cheap web package. It is not an introductory discount. It
                      is a flagship case-study deployment at cohort pricing.
                    </p>
                  </div>
                </SketchFrame>
              </div>
            </div>

            <div data-reveal-card className="flex flex-col gap-5">
              <SketchFrame
                className="px-6 py-6 sm:px-8 sm:py-8"
                fill="var(--ek-accent)"
                stroke="#171717"
                strokeWidth={1.7}
                roughness={1.18}
                bowing={1.9}
                inset={1.4}
                radius={28}
                overlayFill="rgba(23, 23, 23, 0.08)"
                overlayFillStyle="hachure"
                overlayFillWeight={0.85}
                overlayHachureGap={12}
                overlayHachureAngle={26}
              >
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <p className="font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#3b2b00]">
                    Flat fee · 7-day delivery
                  </p>
                  <p className="font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#3b2b00]">
                    Slots 1 — 50
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap items-end gap-3">
                  <span
                    className={`${baumans.className} text-[clamp(3.6rem,7vw,5.6rem)] leading-[0.9] tracking-[-0.06em] text-[#171717]`}
                  >
                    ₹30,000
                  </span>
                  <span className="mb-2 text-[0.95rem] font-semibold text-[#3b2b00]">flat</span>
                </div>
                <p className="max-w-[28rem] text-[0.92rem] leading-6 text-[#2f2100]">
                  Custom-coded, enterprise-grade storefront. Built in 7 calendar days. Backed
                  by an ironclad money-back SLA.
                </p>
                <div className="mt-5" data-slot-counter="12">
                  <SlotCounter filled={12} total={50} accent="#171717" />
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => openApplication("alpha-50")}
                    className="rounded-full border border-black/15 bg-[#171717] px-5 py-3 text-sm font-semibold text-[var(--ek-accent)] shadow-[0_10px_22px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5"
                  >
                    Claim an Alpha-50 slot
                  </button>
                  <Link
                    href="/services/web-development"
                    className="rounded-full border border-[#171717]/30 bg-white/40 px-5 py-3 text-sm font-semibold text-[#171717] transition hover:bg-white/60"
                  >
                    See the full web service
                  </Link>
                </div>
              </SketchFrame>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { k: "Delivery", v: "7 calendar days", Icon: FiClock },
                  { k: "Stack", v: "Next.js · custom code", Icon: FiCode },
                  { k: "Pages", v: "Home + 4 inner", Icon: FiFileText },
                  { k: "SEO", v: "Technical foundation", Icon: FiSearch },
                  { k: "SLA", v: "Money-back guarantee", Icon: FiShield },
                  { k: "Trade", v: "Data-release case study", Icon: FiAward },
                ].map((item) => (
                  <div
                    key={item.k}
                    data-reveal-card
                    className="flex items-start gap-3 rounded-[1.2rem] border border-white/12 bg-white/5 p-4 backdrop-blur-[2px]"
                  >
                    <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-[#ffd23f]/40 bg-[#ffd23f]/12 text-[#ffd23f]">
                      <item.Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="block min-w-0">
                      <p className="font-[family:var(--font-geist-mono)] text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#ffe694]">
                        {item.k}
                      </p>
                      <p className="mt-1 text-[0.98rem] font-semibold tracking-[-0.03em] text-white">
                        {item.v}
                      </p>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFER 2 — CORE-5 GROWTH INCUBATOR */}
      <section
        id="core-5"
        data-ek-section
        className="relative isolate overflow-hidden px-5 py-[clamp(4rem,6vw,6rem)] sm:px-8 lg:px-12"
        style={{ backgroundColor: "var(--ek-paper-alt)" }}
      >
        <div
          data-panel-sheen
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 18%, rgba(255, 210, 63, 0.18), transparent 18%), radial-gradient(circle at 88% 82%, rgba(125, 220, 98, 0.16), transparent 20%), linear-gradient(to bottom, rgba(255, 93, 143, 0.05) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 100% 100%, 100% 2.2rem",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[80rem]">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div data-reveal-card className="flex flex-col gap-5 lg:order-2">
              <SketchFrame
                className="px-6 py-6 sm:px-8 sm:py-8"
                fill="var(--ek-accent-soft)"
                stroke="#171717"
                strokeWidth={1.7}
                roughness={1.18}
                bowing={1.9}
                inset={1.4}
                radius={28}
                overlayFill="rgba(23, 23, 23, 0.10)"
                overlayFillStyle="cross-hatch"
                overlayFillWeight={0.85}
                overlayHachureGap={12}
                overlayHachureAngle={28}
              >
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <p className="font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white">
                    Monthly fee · 6-month cohort
                  </p>
                  <p className="font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white">
                    Slots 1 — 30
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap items-end gap-3">
                  <span
                    className={`${baumans.className} text-[clamp(3.6rem,7vw,5.6rem)] leading-[0.9] tracking-[-0.06em] text-white`}
                  >
                    ₹25,000
                  </span>
                  <span className="mb-2 text-[0.95rem] font-semibold text-white/85">/ month</span>
                </div>
                <p className="max-w-[28rem] text-[0.92rem] leading-6 text-white/90">
                  A high-converting social + PPC customer-acquisition ecosystem. Built for
                  brands with ad budgets under ₹30K/mo. Engineered to convert profile visitors
                  into paying customers within 30 days.
                </p>
                <div className="mt-5" data-slot-counter="8">
                  <SlotCounter filled={8} total={30} accent="#171717" />
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => openApplication("core-5")}
                    className="rounded-full border border-white/30 bg-[#171717] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5"
                  >
                    Reserve a Core-5 slot
                  </button>
                  <Link
                    href="/services/performance-marketing"
                    className="rounded-full border border-[#171717]/25 bg-white/55 px-5 py-3 text-sm font-semibold text-[#171717] transition hover:bg-white/80"
                  >
                    See the full performance service
                  </Link>
                </div>
              </SketchFrame>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { k: "Static creatives", v: "9 / month", Icon: FiImage },
                  { k: "Short-form reels", v: "4 / month", Icon: FiFilm },
                  { k: "Framework", v: "4 / 5 content engine", Icon: FiGrid },
                  { k: "Retargeting", v: "Permanent loop", Icon: FiRepeat },
                  { k: "Window", v: "30-day conversion", Icon: FiTarget },
                  { k: "Trade", v: "Flagship case study", Icon: FiBookOpen },
                ].map((item) => (
                  <div
                    key={item.k}
                    data-reveal-card
                    className="flex items-start gap-3 rounded-[1.2rem] border border-[#171717]/10 bg-white/65 p-4 backdrop-blur-[2px]"
                  >
                    <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-[#c2175c]/30 bg-[#c2175c]/10 text-[#c2175c]">
                      <item.Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="block min-w-0">
                      <p className="font-[family:var(--font-geist-mono)] text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#c2175c]">
                        {item.k}
                      </p>
                      <p className="mt-1 text-[0.98rem] font-semibold tracking-[-0.03em] text-[#171717]">
                        {item.v}
                      </p>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:order-1">
              <div data-reveal-accent className="inline-block">
                <SectionTag
                  color="var(--ek-accent-third)"
                  label="Offer 02 · The growth incubator"
                  text="#0a2a10"
                  fillStyle="hachure"
                />
              </div>
              <h2
                data-section-heading
                className="mt-5 text-[clamp(2.4rem,4.8vw,4.6rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-[#171717]"
              >
                The Core-5 <br />
                <span style={{ color: "#c2175c" }}>Growth Incubator.</span>
              </h2>
              <p
                data-section-heading
                className="mt-4 text-[0.98rem] leading-7 text-[#54463e] sm:text-[1rem]"
              >
                This is not a commodity content-churn retainer where you post mindless graphics
                to a dead feed. This is an elite, mathematically structured optimization sprint
                built specifically for brands with ad budgets under ₹30,000/month — designed to
                install a high-converting customer acquisition ecosystem.
              </p>
              <p
                data-section-heading
                className="mt-4 text-[0.98rem] leading-7 text-[#54463e] sm:text-[1rem]"
              >
                Sthyra is taking on exactly{" "}
                <span className="font-semibold text-[#171717]">30 high-potential brands</span>{" "}
                for this 6-month cohort. We deploy our full creative director and editing
                team asset pipeline — building a permanent conversion grid and 5 dynamic
                performance reel hooks — at a highly optimized baseline fee of{" "}
                <span className="font-semibold text-[#171717]">Rs. 25,000/month</span>. We don&apos;t
                make vanity posts. We engineer a high-intent loop that turns raw profile
                visitors into paying customers within 30 days.
              </p>

              <div className="mt-7" data-reveal-card>
                <SketchFrame
                  className="px-5 py-5 sm:px-6"
                  fill="var(--ek-paper)"
                  stroke="#171717"
                  strokeWidth={1.5}
                  roughness={1.15}
                  bowing={1.8}
                  inset={1.3}
                  radius={22}
                  overlayFill="rgba(125, 220, 98, 0.10)"
                  overlayFillStyle="cross-hatch"
                  overlayFillWeight={0.78}
                  overlayHachureGap={11}
                  overlayHachureAngle={24}
                >
                  <div className="space-y-4">
                    <p className="font-[family:var(--font-geist-mono)] text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#0a2a10]">
                      Do not call this
                    </p>
                    <p className="text-[0.92rem] leading-6 text-[#171717]">
                      This is not &quot;affordable SMM & ads.&quot; It is not a 6-month discount starter
                      kit. It is a 30-brand flagship case-study cohort running on a
                      mathematically structured funnel engine.
                    </p>
                  </div>
                </SketchFrame>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE FRAMEWORK — WHAT'S INSIDE */}
      <section
        data-ek-section
        className="relative overflow-hidden bg-[var(--ek-paper)] px-5 py-[clamp(4rem,6vw,6rem)] sm:px-8 lg:px-12"
      >
        <div
          data-panel-sheen
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 22%, rgba(255, 210, 63, 0.16), transparent 18%), radial-gradient(circle at 82% 78%, rgba(86, 190, 249, 0.14), transparent 20%), linear-gradient(to bottom, rgba(255, 93, 143, 0.05) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 100% 100%, 100% 2.2rem",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[80rem]">
          <div className="mb-10 max-w-[60rem] text-center mx-auto">
            <div data-reveal-accent className="flex justify-center">
              <SectionTag
                color="var(--ek-accent-fourth)"
                label="What's inside"
                text="#0a2a3a"
                fillStyle="hachure"
              />
            </div>
            <h2
              data-section-heading
              className="mt-5 text-[clamp(2.25rem,4.5vw,4.05rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#171717]"
            >
              The full deliverable stack, packed into one cohort.
            </h2>
            <p
              data-section-heading
              className="mt-4 max-w-[44rem] mx-auto text-[0.98rem] leading-7 text-[#54463e]"
            >
              Every offer ships with the entire operating system — creative production, paid
              distribution, conversion engineering, and reporting — pre-built and battle-tested
              across 50+ active brand deployments.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {[
              {
                chip: "Creative",
                title: "9 static creatives / month",
                body: "Hand-designed static ad units, story creatives, and feed-ready assets engineered around your offer angles — not generic templates.",
                fill: "var(--ek-paper-mint)",
                overlay: "rgba(125, 220, 98, 0.10)",
                fillStyle: "hachure" as const,
                accent: "#0a2a10",
              },
              {
                chip: "Motion",
                title: "4 short-form reels / month",
                body: "Performance-grade reels built around 5 dynamic hooks. Stop-the-scroll storytelling engineered for high-intent scroll feeds, not vanity reach.",
                fill: "var(--ek-paper-alt)",
                overlay: "rgba(255, 93, 143, 0.10)",
                fillStyle: "cross-hatch" as const,
                accent: "#c2175c",
              },
              {
                chip: "Engine",
                title: "Permanent retargeting loop",
                body: "Custom audiences, exclusion stacks, and lookalike logic installed once and iterated weekly. Cold traffic gets warmed, warm traffic gets closed.",
                fill: "var(--ek-paper-soft)",
                overlay: "rgba(255, 179, 71, 0.12)",
                fillStyle: "zigzag-line" as const,
                accent: "#7a4e00",
              },
              {
                chip: "Framework",
                title: "The 4/5 content framework",
                body: "Four conversion pillars, five dynamic hook patterns. We install a repeatable content architecture that compounds over the 6-month cohort.",
                fill: "var(--ek-paper-sky)",
                overlay: "rgba(86, 190, 249, 0.12)",
                fillStyle: "zigzag-line" as const,
                accent: "#0a3a5a",
              },
              {
                chip: "Web",
                title: "Custom storefront in 7 days",
                body: "For the Alpha-50 sprint: a fully custom-coded, enterprise-grade marketing site shipped in 7 calendar days with technical SEO baked in.",
                fill: "var(--ek-paper)",
                overlay: "rgba(255, 210, 63, 0.14)",
                fillStyle: "hachure" as const,
                accent: "#3b2b00",
              },
              {
                chip: "SLA",
                title: "Performance-backed money-back",
                body: "Both offers carry ironclad performance SLAs. If the contracted metric is not met inside the cohort window, the engagement unwinds cleanly.",
                fill: "var(--ek-paper-mint)",
                overlay: "rgba(255, 93, 143, 0.10)",
                fillStyle: "zigzag-line" as const,
                accent: "#0a2a10",
              },
            ].map((card) => (
              <div key={card.title} data-reveal-card>
                <SketchFrame
                  className="h-full px-5 py-5 sm:px-6 sm:py-6"
                  fill={card.fill}
                  stroke="#171717"
                  strokeWidth={1.6}
                  roughness={1.14}
                  bowing={1.82}
                  inset={1.35}
                  radius={24}
                  overlayFill={card.overlay}
                  overlayFillStyle={card.fillStyle}
                  overlayFillWeight={0.8}
                  overlayHachureGap={11}
                  overlayHachureAngle={24}
                >
                  <div className="space-y-4">
                    <div
                      className="inline-flex rounded-full bg-white/62 px-3 py-1 font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.22em]"
                      style={{ color: card.accent }}
                    >
                      {card.chip}
                    </div>
                    <h3 className="text-[1.5rem] font-semibold leading-[1.02] tracking-[-0.045em] text-[#171717]">
                      {card.title}
                    </h3>
                    <p className="text-[0.95rem] leading-7 text-[#4d4038]">{card.body}</p>
                  </div>
                </SketchFrame>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COHORT MATH */}
      <section
        data-ek-section
        className="relative overflow-hidden bg-[var(--ek-dark)] px-5 py-[clamp(4rem,6vw,6rem)] text-white sm:px-8 lg:px-12"
      >
        <div
          data-panel-sheen
          className="absolute inset-0 opacity-85"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 93, 143, 0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 93, 143, 0.10) 1px, transparent 1px), radial-gradient(circle at 82% 76%, rgba(255, 255, 255, 0.12), transparent 18%)",
            backgroundSize: "1.1rem 1.1rem, 1.1rem 1.1rem, 100% 100%",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[80rem]">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div data-reveal-accent className="inline-block">
                <SectionTag
                  color="var(--ek-accent-soft)"
                  label="The cohort math"
                  text="#ffffff"
                  fillStyle="zigzag-line"
                />
              </div>
              <h2
                data-section-heading
                className="mt-5 text-[clamp(2.4rem,4.8vw,4.6rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-white"
              >
                50 + 30. <br />
                <span style={{ color: "var(--ek-accent-soft)" }}>Then the doors close.</span>
              </h2>
              <p
                data-section-heading
                className="mt-4 max-w-[40rem] text-[0.98rem] leading-7 text-[#dbe8ff] sm:text-[1rem]"
              >
                We are not scaling these offers. We are capping them on purpose. Every
                cohort is sized so the founding team can stay personally accountable for
                every shipped site, every retargeting loop, and every 30-day conversion
                result. The cap is the quality control.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { k: "Web sprint slots", v: 50, sub: "Alpha-50 Architecture Sprint" },
                { k: "Growth incubator slots", v: 30, sub: "Core-5 Growth Incubator" },
                { k: "Total cohort members", v: 80, sub: "Combined flagship cohort" },
                { k: "Pricing reset trigger", v: 0, sub: "Both cohorts close at 0 left" },
              ].map((stat) => (
                <div
                  key={stat.k}
                  data-reveal-card
                  data-slot-counter={stat.v}
                  className="rounded-[1.4rem] border border-white/12 bg-white/5 p-5 shadow-[0_16px_34px_rgba(0,0,0,0.2)] backdrop-blur-[2px]"
                >
                  <p className="font-[family:var(--font-geist-mono)] text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#ffd23f]">
                    {stat.k}
                  </p>
                  <p
                    className={`mt-2 ${baumans.className} text-[clamp(2.6rem,5.5vw,4rem)] leading-[0.9] tracking-[-0.05em] text-white`}
                  >
                    <span data-slot-number>0</span>
                    {stat.v > 0 ? "" : ""}
                  </p>
                  <p className="mt-1 text-[0.85rem] text-[#dbe8ff]/85">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        data-ek-section
        className="relative overflow-hidden bg-white px-5 py-[clamp(4rem,6vw,6rem)] sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-[80rem]">
          <div className="mb-8 max-w-[60rem] text-center mx-auto">
            <div data-reveal-accent className="flex justify-center">
              <SectionTag
                color="var(--ek-accent)"
                label="FAQ"
                text="#3b2b00"
                fillStyle="zigzag-line"
              />
            </div>
            <h2
              data-section-heading
              className="mt-5 text-[clamp(2.25rem,4.5vw,4.05rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#171717]"
            >
              Questions founders ask before claiming a slot.
            </h2>
          </div>

          <div className="grid items-start gap-5 lg:grid-cols-2">
            {FAQS.map((item, index) => {
              const open = openFaqIndex === index;
              return (
                <div key={item.question} data-reveal-card>
                  <SketchFrame
                    className="px-5 py-5 sm:px-6"
                    fill="var(--ek-paper)"
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
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenFaqIndex(open ? -1 : index)}
                      className="flex w-full items-start justify-between gap-4 text-left"
                    >
                      <h3 className="text-[1.04rem] font-semibold tracking-[-0.03em] text-[#171717]">
                        {item.question}
                      </h3>
                      <motion.span
                        animate={{ rotate: open ? 45 : 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-1 text-lg leading-none text-[#8a4a26]"
                      >
                        +
                      </motion.span>
                    </button>

                    <motion.div
                      initial={false}
                      animate={{
                        height: open ? "auto" : 0,
                        opacity: open ? 1 : 0,
                        marginTop: open ? 12 : 0,
                      }}
                      transition={{
                        height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.24, ease: "easeOut" },
                        marginTop: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="rounded-[0.95rem] bg-white/55 px-4 py-4">
                        <p className="text-sm leading-6 text-[#554742]">{item.answer}</p>
                      </div>
                    </motion.div>
                  </SketchFrame>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section
        data-ek-section
        className="relative overflow-hidden px-5 py-[clamp(4rem,6vw,6rem)] sm:px-8 lg:px-12"
        style={{ backgroundColor: "var(--ek-hero)" }}
      >
        <div
          data-panel-sheen
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage:
              "radial-gradient(circle at 16% 18%, rgba(255, 210, 63, 0.18), transparent 18%), radial-gradient(circle at 84% 82%, rgba(255, 93, 143, 0.18), transparent 20%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[80rem] text-center">
          <div data-reveal-accent className="inline-block">
            <SectionTag
              color="var(--ek-accent)"
              label="Final word"
              text="#3b2b00"
              fillStyle="zigzag-line"
            />
          </div>
          <h2
            data-section-heading
            className={`mt-5 mx-auto max-w-[20ch] text-[clamp(2.6rem,5.6vw,5.2rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-white`}
          >
            <span>50 web slots. </span>
            <span style={{ color: "var(--ek-accent)" }}>30 growth slots.</span>
            <br />
            <span>Both close permanently.</span>
          </h2>
          <p
            data-section-heading
            className="mx-auto mt-5 max-w-[40rem] text-[0.98rem] leading-7 text-white/85"
          >
            Pick the offer that fits, send a one-line email, and we&apos;ll confirm your slot and
            ship the kickoff packet the same day.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              data-hero-action
              type="button"
              onClick={() => openApplication()}
              className="rounded-full border border-black/10 bg-[var(--ek-accent)] px-6 py-3 text-base font-semibold text-[#171717] shadow-[0_12px_22px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5"
            >
              Apply for a slot
            </button>
            <Link
              data-hero-action
              href="/services"
              className="rounded-full border border-white/25 bg-white/10 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/16"
            >
              See the full services menu
            </Link>
          </div>
        </div>
      </section>

      {/* Multi-step application popup — page-scoped, not the global notebook */}
      {isApplicationOpen ? (
        <AlphaCohortApplicationPopup
          isOpen={isApplicationOpen}
          onClose={closeApplication}
          defaultOffer={activeOffer}
        />
      ) : null}

      {/* Floating cohort trigger */}
      <button
        type="button"
        aria-label="Open cohort application"
        onClick={() => openApplication()}
        className="pointer-events-auto fixed bottom-5 right-5 z-[100] flex h-[4.25rem] w-[4.25rem] rotate-[-6deg] items-center justify-center rounded-full border-[3px] border-[#ffd23f]/70 bg-[#1a1530] shadow-[6px_6px_0_rgba(0,0,0,0.45)] transition hover:-translate-y-1 hover:rotate-[-10deg] sm:h-[5rem] sm:w-[5rem]"
      >
        <Image
          src="/icons/calendar_white.svg"
          alt=""
          width={48}
          height={48}
          className="object-contain"
        />
      </button>
    </main>
  );
}
