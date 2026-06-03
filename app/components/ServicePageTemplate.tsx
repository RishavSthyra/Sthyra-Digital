"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { baumans } from "@/app/fonts";
import { SketchFrame } from "@/app/components/SketchFrame";
import type { ServicePageContent } from "@/app/services/servicePageContent";

gsap.registerPlugin(ScrollTrigger);

type ServicePageTemplateProps = {
  service: ServicePageContent;
};

function themeVars(service: ServicePageContent): CSSProperties {
  return {
    ["--service-page" as string]: service.theme.page,
    ["--service-hero" as string]: service.theme.hero,
    ["--service-accent" as string]: service.theme.accent,
    ["--service-accent-soft" as string]: service.theme.accentSoft,
    ["--service-dark" as string]: service.theme.dark,
    ["--service-ink" as string]: service.theme.ink,
    ["--service-paper" as string]: service.theme.paper,
    ["--service-paper-alt" as string]: service.theme.paperAlt,
    ["--service-paper-soft" as string]: service.theme.paperSoft,
  };
}

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

function HeroOrbitTag({
  className,
  color,
  label,
  text,
}: {
  className: string;
  color: string;
  label: string;
  text: string;
}) {
  return (
    <div
      data-hero-orbit
      className={`pointer-events-none absolute hidden lg:block ${className}`}
    >
      <SectionTag color={color} label={label} text={text} />
    </div>
  );
}

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [activeShowcaseIndex, setActiveShowcaseIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const showcasePalettes = [
    {
      fill: "#fff8ef",
      overlay: "rgba(255, 163, 131, 0.12)",
      chip: "#ff9a76",
      ink: "#171717",
      text: "#554742",
    },
    {
      fill: "#dff2ff",
      overlay: "rgba(31,143,255,0.12)",
      chip: "#56bef9",
      ink: "#171717",
      text: "#36566f",
    },
    {
      fill: "#fff2b1",
      overlay: "rgba(255,179,71,0.12)",
      chip: "#ffe55a",
      ink: "#171717",
      text: "#695430",
    },
    {
      fill: "#20243b",
      overlay: "rgba(132,212,255,0.12)",
      chip: "#c5a0ff",
      ink: "#ffffff",
      text: "#dbe8ff",
    },
  ];

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const ctx = gsap.context(() => {
      const heroOrbits = gsap.utils.toArray<HTMLElement>("[data-hero-orbit]");
      const heroPortraits = gsap.utils.toArray<HTMLElement>("[data-hero-portrait]");
      const serviceSections = gsap.utils.toArray<HTMLElement>("[data-service-section]");
      const panelSheens = gsap.utils.toArray<HTMLElement>("[data-panel-sheen]");

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .from("[data-hero-wash]", {
          autoAlpha: 0,
          scale: 0.88,
          duration: 1,
          transformOrigin: "center center",
        })
        .from(
          "[data-hero-header]",
          {
            autoAlpha: 0,
            y: -22,
            duration: 0.65,
          },
          0.06,
        )
        .from(
          "[data-hero-badge]",
          {
            autoAlpha: 0,
            scale: 0.92,
            y: 18,
            duration: 0.55,
          },
          0.14,
        )
        .from(
          "[data-hero-title]",
          {
            autoAlpha: 0,
            y: 72,
            filter: "blur(18px)",
            duration: 1.05,
          },
          0.18,
        )
        .from(
          heroPortraits,
          {
            autoAlpha: 0,
            y: 40,
            scale: 0.92,
            duration: 0.82,
            stagger: 0.08,
          },
          0.24,
        )
        .from(
          "[data-hero-copy]",
          {
            autoAlpha: 0,
            y: 28,
            duration: 0.7,
          },
          0.32,
        )
        .from(
          "[data-hero-chip]",
          {
            autoAlpha: 0,
            y: 18,
            scale: 0.94,
            duration: 0.45,
            stagger: 0.06,
          },
          0.42,
        )
        .from(
          "[data-hero-action]",
          {
            autoAlpha: 0,
            y: 18,
            scale: 0.96,
            duration: 0.48,
            stagger: 0.08,
          },
          0.54,
        )
        .from(
          heroOrbits,
          {
            autoAlpha: 0,
            y: 24,
            scale: 0.9,
            rotate: (index) => (index % 2 === 0 ? -6 : 6),
            duration: 0.65,
            stagger: 0.08,
          },
          0.4,
        );

      heroOrbits.forEach((orbit, index) => {
        gsap.to(orbit, {
          x: index % 2 === 0 ? 8 : -8,
          y: index % 3 === 0 ? 10 : -10,
          rotate: index % 2 === 0 ? 3 : -3,
          duration: 3 + index * 0.25,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      serviceSections.forEach((section) => {
        const headings = section.querySelectorAll<HTMLElement>("[data-section-heading]");
        const accents = section.querySelectorAll<HTMLElement>("[data-reveal-accent]");
        const cards = section.querySelectorAll<HTMLElement>("[data-reveal-card]");

        const reveal = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
          scrollTrigger: {
            trigger: section,
            start: "top 74%",
            once: true,
          },
        });

        if (headings.length > 0) {
          reveal.from(headings, {
            autoAlpha: 0,
            y: 30,
            filter: "blur(12px)",
            duration: 0.7,
            stagger: 0.08,
          });
        }

        if (accents.length > 0) {
          reveal.from(
            accents,
            {
              autoAlpha: 0,
              scale: 0.92,
              rotate: (index) => (index % 2 === 0 ? -5 : 5),
              duration: 0.45,
              stagger: 0.05,
            },
            0.08,
          );
        }

        if (cards.length > 0) {
          reveal.from(
            cards,
            {
              autoAlpha: 0,
              y: 42,
              scale: 0.97,
              duration: 0.62,
              stagger: 0.08,
            },
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
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const activeCard = root.querySelector<HTMLElement>(
      `[data-showcase-card="${activeShowcaseIndex}"] [data-showcase-inner]`,
    );

    if (!activeCard) {
      return;
    }

    gsap.fromTo(
      activeCard,
      {
        autoAlpha: 0,
        y: 18,
        filter: "blur(10px)",
      },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.52,
        ease: "power3.out",
      },
    );
  }, [activeShowcaseIndex]);

  return (
    <main
      ref={rootRef}
      className="min-h-screen"
      style={{
        ...themeVars(service),
        backgroundColor: "var(--service-page)",
        color: "var(--service-ink)",
      }}
    >
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "var(--service-hero)" }}
        />
        <div className="hero-noise absolute inset-0 opacity-30 mix-blend-soft-light" />
        <div
          data-hero-wash
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 14% 20%, rgba(255,255,255,0.22), transparent 22%), radial-gradient(circle at 84% 18%, rgba(255,255,255,0.14), transparent 18%), radial-gradient(circle at 50% 70%, rgba(255,255,255,0.1), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.08))",
          }}
        />

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[10%] top-[18%] h-44 w-44 rounded-full bg-white/10 blur-[88px]" />
          <div
            className="absolute right-[8%] top-[26%] h-52 w-52 rounded-full blur-[105px]"
            style={{ backgroundColor: "color-mix(in srgb, var(--service-accent) 14%, transparent)" }}
          />
          <div className="absolute bottom-[10%] left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-[#ffffff]/7 blur-[118px]" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-[2] hidden md:block" aria-hidden="true">
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

        <div className="relative z-10 mx-auto max-w-[90rem] px-5 pb-16 pt-5 sm:px-8 lg:px-12 lg:pb-24 lg:pt-6">
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
                Services
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
                <span>{service.shortName}</span>
                <a href="mailto:hello@sthyra.digital" className="transition hover:text-black/70">
                  hello@sthyra.digital
                </a>
              </div>
            </SketchFrame>
          </header>

          <div className="relative mx-auto flex min-h-[32rem] max-w-[74rem] flex-col items-center justify-center py-14 text-center sm:min-h-[36rem] lg:min-h-[40rem] lg:py-16">
            <HeroOrbitTag
              className="left-[-2%] top-[10%] rotate-[-8deg]"
              color="var(--service-paper)"
              label={service.heroChips[0]}
              text="#8a4a26"
            />
            <HeroOrbitTag
              className="right-[-1%] top-[14%] rotate-[7deg]"
              color="var(--service-accent)"
              label="Premium motion"
              text="#3b2b00"
            />
            <HeroOrbitTag
              className="left-[6%] bottom-[16%] rotate-[6deg]"
              color="var(--service-accent-soft)"
              label="Scroll-triggered"
              text="#ffffff"
            />

            <div data-hero-badge className="mb-5">
              <SectionTag
                color="var(--service-paper)"
                label={service.heroEyebrow}
                text="#8a4a26"
              />
            </div>

            <h1
              data-hero-title
              className={`max-w-[22ch] ${baumans.className} text-[clamp(2.8rem,5vw,5rem)] leading-[0.92] tracking-[-0.068em] text-white`}
            >
              <span>{service.heroTitle}</span>{" "}
              <span className={`inline-block `} style={{ color: "var(--service-accent)" }}>
                {service.heroHighlight}
              </span>
            </h1>

            <p
              data-hero-copy
              className="mt-6 max-w-[56rem] text-[0.98rem] leading-7 text-[#fff] sm:text-[1.05rem]"
            >
              {service.description}
            </p>

            <div className="mt-7 flex max-w-[58rem] flex-wrap justify-center gap-2.5">
              {service.heroChips.map((chip, index) => (
                <div
                  key={chip}
                  data-hero-chip
                  className="rounded-full border border-white/18 px-3.5 py-1.5 font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_8px_18px_rgba(0,0,0,0.08)]"
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)",
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                data-hero-action
                href="mailto:hello@sthyra.digital"
                className="rounded-full border border-black/10 bg-[var(--service-accent)] px-5 py-3 font-semibold text-[#171717] shadow-[0_12px_22px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5"
              >
                Start this service
              </Link>
              <Link
                data-hero-action
                href="/services"
                className="rounded-full border border-white/18 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/14"
              >
                See all services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        data-service-section
        className="relative isolate overflow-hidden bg-[var(--service-paper)] px-5 py-[clamp(4rem,6vw,6rem)] sm:px-8 lg:px-12"
      >
        <div
          data-panel-sheen
          className="absolute inset-0 opacity-95"
          style={{
            backgroundImage:
              "radial-gradient(circle at 14% 18%, rgba(255, 213, 98, 0.18), transparent 18%), radial-gradient(circle at 83% 22%, rgba(9,183,234,0.14), transparent 18%), linear-gradient(to bottom, rgba(215,154,119,0.09) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 100% 100%, 100% 2.2rem",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[80rem]">
          <div className="mb-10 max-w-[54rem]">
            <div data-reveal-accent className="inline-block">
              <SectionTag
                color="var(--service-accent-soft)"
                label="How the service works"
                text="#ffffff"
              />
            </div>
            <h2
              data-section-heading
              className="mt-5 text-[clamp(2.4rem,4.7vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-[var(--service-ink)]"
            >
              Built like a creative system, not a random list of tasks.
            </h2>
            <p
              data-section-heading
              className="mt-4 max-w-[44rem] text-[0.98rem] leading-7 text-[#54463e]"
            >
              {service.audience}
            </p>
          </div>

          {/* <div className="mb-6 grid gap-3 sm:grid-cols-3">
            {service.stats.map((stat) => (
              <div key={stat.value} data-reveal-card>
                <SketchFrame
                  className="h-full px-4 py-4"
                  fill="rgba(255,255,255,0.72)"
                  stroke="#171717"
                  strokeWidth={1.42}
                  roughness={1.08}
                  bowing={1.72}
                  inset={1.2}
                  radius={20}
                  overlayFill="rgba(255,255,255,0.10)"
                  overlayFillStyle="zigzag-line"
                  overlayFillWeight={0.72}
                  overlayHachureGap={10}
                  overlayHachureAngle={24}
                >
                  <div className="space-y-2">
                    <div className="text-[1.02rem] font-semibold tracking-[-0.03em] text-[#171717]">
                      {stat.value}
                    </div>
                    <p className="text-sm leading-6 text-[#564842]">{stat.label}</p>
                  </div>
                </SketchFrame>
              </div>
            ))}
          </div> */}

          <div className="grid gap-5 lg:grid-cols-3">
            {service.pillars.map((pillar, index) => (
              <div key={pillar.title} data-reveal-card>
                <SketchFrame
                  className="h-full px-5 py-5 sm:px-6 sm:py-6"
                  fill={
                    index === 0
                      ? "var(--service-paper)"
                      : index === 1
                        ? "var(--service-paper-alt)"
                        : "var(--service-paper-soft)"
                  }
                  stroke="#171717"
                  strokeWidth={1.6}
                  roughness={1.14}
                  bowing={1.82}
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
                    <div className="inline-flex rounded-full bg-white/62 px-3 py-1 font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#5f534c]">
                      {pillar.chip}
                    </div>
                    <h3 className="text-[1.7rem] font-semibold leading-[1.02] tracking-[-0.045em] text-[#171717]">
                      {pillar.title}
                    </h3>
                    <p className="text-[0.98rem] leading-7 text-[#4d4038]">
                      {pillar.body}
                    </p>
                  </div>
                </SketchFrame>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        data-service-section
        className="relative overflow-hidden bg-[var(--service-dark)] px-5 py-[clamp(4rem,6vw,6rem)] text-white sm:px-8 lg:px-12"
      >
        <div
          data-panel-sheen
          className="absolute inset-0 opacity-85"
          style={{
            backgroundImage:
              "linear-gradient(rgba(132, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(132, 212, 255, 0.1) 1px, transparent 1px), radial-gradient(circle at 18% 24%, rgba(255,255,255,0.12), transparent 18%)",
            backgroundSize: "1.1rem 1.1rem, 1.1rem 1.1rem, 100% 100%",
          }}
        />

        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
          <motion.div
            className="absolute right-[-18rem] top-[-18rem] h-[36rem] w-[36rem] opacity-20 lg:right-[-24rem] lg:top-[-24rem] lg:h-[48rem] lg:w-[48rem]"
            animate={{ rotate: 360 }}
            transition={{
              duration: 36,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
            style={{ transformOrigin: "50% 50%" }}
          >
            <Image
              src="/measuring-circle-blank-circular-protractor-grid-measuring-degrees.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 768px, 576px"
              className="object-contain"
            />
          </motion.div>
        </div>

        <div className="relative z-10 mx-auto max-w-[80rem]">
          <div className="mb-10 max-w-[48rem]">
            <div data-reveal-accent className="inline-block">
              <SectionTag color="var(--service-accent)" label="Workflow" text="#2f2100" />
            </div>
            <h2
              data-section-heading
              className="mt-5 text-[clamp(2.4rem,4.8vw,4.6rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-white"
            >
              The structure stays familiar. The service content does the heavy lifting.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-4">
            {service.process.map((step) => (
              <div
                key={step.step}
                data-reveal-card
                className="rounded-[1.4rem] border border-white/12 bg-white/7 p-5 shadow-[0_16px_34px_rgba(0,0,0,0.2)] backdrop-blur-[2px]"
              >
                <div className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#c7ecff]">
                  {step.step}
                </div>
                <h3 className="text-[1.3rem] font-semibold leading-[1.04] tracking-[-0.04em] text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-7 text-[#d8eefc]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        data-service-section
        className="relative overflow-hidden bg-[var(--service-paper)] px-5 py-[clamp(4rem,6vw,6rem)] sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-[80rem]">
          <div className="mb-8 max-w-[52rem] text-center mx-auto">
            <div data-reveal-accent className="flex justify-center">
              <SectionTag
                color="var(--service-accent-soft)"
                label="Deliverables"
                text="#ffffff"
              />
            </div>
            <h2
              data-section-heading
              className="mt-5 text-[clamp(2.25rem,4.5vw,4.05rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#171717]"
            >
              What your team actually gets, packed into expandable story cards.
            </h2>
          </div>
        </div>

        <div
          className="relative left-1/2 w-screen max-w-none -translate-x-1/2 px-4 sm:px-6 lg:px-8 xl:px-10"
          data-reveal-card
        >
          <div className="flex flex-col gap-3 lg:flex-row">
            {service.deliverables.map((deliverable, index) => {
              const palette = showcasePalettes[index % showcasePalettes.length];
              const active = activeShowcaseIndex === index;
              const pairedOutcome = service.outcomes[index % service.outcomes.length];

              return (
                <button
                  key={deliverable.title}
                  type="button"
                  data-showcase-card={index}
                  aria-expanded={active}
                  onMouseEnter={() => setActiveShowcaseIndex(index)}
                  onFocus={() => setActiveShowcaseIndex(index)}
                  onClick={() => setActiveShowcaseIndex(index)}
                  className={`relative overflow-hidden text-left transition-[flex-grow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:min-h-[34rem] ${
                    active ? "lg:flex-[2.35]" : "lg:flex-[0.9]"
                  }`}
                  style={{ willChange: "flex-grow" }}
                >
                  <SketchFrame
                    className="h-full px-5 py-5 sm:px-6 sm:py-6"
                    fill={palette.fill}
                    stroke="#171717"
                    strokeWidth={1.65}
                    roughness={1.14}
                    bowing={1.84}
                    inset={1.38}
                    radius={26}
                    overlayFill={palette.overlay}
                    overlayFillStyle="zigzag-line"
                    overlayFillWeight={0.82}
                    overlayHachureGap={12}
                    overlayHachureAngle={22}
                  >
                    <div className="relative flex h-full min-h-[18rem] flex-col justify-between overflow-hidden rounded-[1.1rem]">
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            palette.ink === "#ffffff"
                              ? "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.22))"
                              : "linear-gradient(180deg, rgba(255,255,255,0.32), rgba(255,255,255,0.08))",
                        }}
                      />
                      <div
                        className="absolute inset-0 opacity-85"
                        style={{
                          backgroundImage:
                            palette.ink === "#ffffff"
                              ? "linear-gradient(rgba(132,212,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(132,212,255,0.10) 1px, transparent 1px)"
                              : "linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)",
                          backgroundSize:
                            palette.ink === "#ffffff" ? "1.15rem 1.15rem" : "100% 2.15rem",
                        }}
                      />

                      <div data-showcase-inner className="relative z-10 flex h-full flex-col justify-between">
                        <div>
                          <div
                            className="inline-flex rounded-full px-3 py-1 font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.22em]"
                            style={{
                              backgroundColor: palette.chip,
                              color: palette.ink === "#ffffff" ? "#171717" : "#2f2100",
                            }}
                          >
                            0{index + 1} / {active ? "Expanded" : "Preview"}
                          </div>

                          <div className="mt-5">
                            <p
                              className="font-[family:var(--font-geist-mono)] text-[0.64rem] font-semibold uppercase tracking-[0.22em]"
                              style={{ color: palette.ink === "#ffffff" ? "#c7ecff" : "#8a4a26" }}
                            >
                              {active ? "Service deliverable" : "Tap to expand"}
                            </p>
                            <h3
                              className="mt-3 text-[clamp(1.5rem,2.15vw,2.7rem)] font-semibold leading-[1.02] tracking-[-0.045em]"
                              style={{ color: palette.ink }}
                            >
                              {deliverable.title}
                            </h3>
                          </div>
                        </div>

                        <div className="relative mt-6">
                          <p
                            className={`max-w-[28rem] text-[0.97rem] leading-7 transition-opacity duration-300 ${
                              active ? "opacity-100" : "opacity-72"
                            }`}
                            style={{ color: palette.text }}
                          >
                            {deliverable.body}
                          </p>

                          <div
                            className={`mt-5 overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out ${
                              active
                                ? "max-h-48 translate-y-0 opacity-100"
                                : "max-h-0 translate-y-2 opacity-0"
                            }`}
                          >
                            <div
                              className="rounded-[1rem] border px-4 py-4"
                              style={{
                                borderColor:
                                  palette.ink === "#ffffff"
                                    ? "rgba(255,255,255,0.12)"
                                    : "rgba(23,23,23,0.08)",
                                backgroundColor:
                                  palette.ink === "#ffffff"
                                    ? "rgba(255,255,255,0.06)"
                                    : "rgba(255,255,255,0.56)",
                              }}
                            >
                              <p
                                className="font-[family:var(--font-geist-mono)] text-[0.6rem] font-semibold uppercase tracking-[0.22em]"
                                style={{
                                  color:
                                    palette.ink === "#ffffff" ? "#ffe694" : "#7a4e89",
                                }}
                              >
                                Why it matters
                              </p>
                              <h4
                                className="mt-2 text-[1rem] font-semibold tracking-[-0.03em]"
                                style={{ color: palette.ink }}
                              >
                                {pairedOutcome.title}
                              </h4>
                              <p
                                className="mt-2 text-sm leading-6"
                                style={{ color: palette.text }}
                              >
                                {pairedOutcome.body}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SketchFrame>
                </button>
              );
            })}
          </div>
        </div>

        {/* <div className="mx-auto mt-6 max-w-[80rem]">
          <div className="mt-6" data-reveal-card>
            <SketchFrame
              className="px-5 py-5 sm:px-6"
              fill="var(--service-paper-soft)"
              stroke="#171717"
              strokeWidth={1.58}
              roughness={1.1}
              bowing={1.76}
              inset={1.32}
              radius={22}
              overlayFill="rgba(197, 160, 255, 0.10)"
              overlayFillStyle="zigzag-line"
              overlayFillWeight={0.78}
              overlayHachureGap={11}
              overlayHachureAngle={22}
            >
              <div className="grid gap-4 sm:grid-cols-[0.95fr_1.05fr]">
                <div>
                  <p className="font-[family:var(--font-geist-mono)] text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[#7a4e89]">
                    Keyword direction
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {service.keywords.slice(0, 4).map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full border border-black/8 bg-white/60 px-3 py-1 text-[0.72rem] font-medium text-[#413743]"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-[family:var(--font-geist-mono)] text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[#7a4e89]">
                    Built for modern discovery
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#4d4152]">
                    These pages are written to support classic SEO, AI-shaped search
                    behaviour, and clearer service intent at the same time.
                  </p>
                </div>
              </div>
            </SketchFrame>
          </div>
        </div> */}
      </section>

      <section
        data-service-section
        className="relative overflow-hidden bg-[#fff] px-5 py-[clamp(4rem,6vw,6rem)] sm:px-8 lg:px-12"
      >
        <div className="mx-auto grid max-w-[80rem] items-stretch gap-6 lg:grid-cols-[1fr_0.92fr]">
          <div>
            <div data-reveal-accent className="inline-block">
              <SectionTag color="var(--service-accent-soft)" label="FAQ" text="#ffffff" />
            </div>
            <h2
              data-section-heading
              className="mt-5 max-w-[14ch] text-[clamp(2.2rem,4.4vw,4rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-[#171717]"
            >
              Same page structure. Different story, color, and emphasis.
            </h2>

            <div className="mt-8 space-y-4">
              {service.faq.map((item, index) => {
                const open = openFaqIndex === index;

                return (
                  <div key={item.question} data-reveal-card>
                    <SketchFrame
                      className="px-5 py-5 sm:px-6"
                      fill="var(--service-paper)"
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
                        <h3 className="text-[1.06rem] font-semibold tracking-[-0.03em] text-[#171717]">
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

          <div data-reveal-card className="flex min-h-[28rem] self-stretch lg:min-h-full">
            <DotLottieReact
              src="https://lottie.host/6a916d11-4bad-4a77-bd71-ca7d46e27f4f/eGayMAUVBF.lottie"
              loop
              autoplay
              className="h-full w-full"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
