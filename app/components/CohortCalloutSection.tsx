"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiClock, FiZap } from "react-icons/fi";
import { CalendlyModal } from "@/app/components/CalendlyModal";
import { SketchFrame } from "@/app/components/SketchFrame";

gsap.registerPlugin(ScrollTrigger);

type CohortOffer = {
  tag: string;
  title: string;
  subtitle: string;
  price: string;
  meta: string;
  fill: string;
  accentText: string;
  stroke: string;
  overlayFill: string;
  overlayStyle: "hachure" | "cross-hatch" | "zigzag-line";
  overlayAngle: number;
};

const COHORT_OFFERS: CohortOffer[] = [
  {
    tag: "Offer 01 · Web",
    title: "Alpha-50 Architecture Sprint",
    subtitle: "Custom web build · 7-day delivery",
    price: "₹30,000",
    meta: "Flat · 50 slots",
    fill: "#fff2b1",
    accentText: "#7a4e00",
    stroke: "#171717",
    overlayFill: "rgba(255, 179, 71, 0.22)",
    overlayStyle: "hachure",
    overlayAngle: 24,
  },
  {
    tag: "Offer 02 · Growth",
    title: "Core-5 Growth Incubator",
    subtitle: "SMM + PPC · 30-day loop",
    price: "₹25,000",
    meta: "/ month · 30 slots",
    fill: "#fde2ec",
    accentText: "#a8124f",
    stroke: "#171717",
    overlayFill: "rgba(255, 93, 143, 0.18)",
    overlayStyle: "cross-hatch",
    overlayAngle: 26,
  },
];

const CALENDLY_URL = "https://calendly.com/rishav-sthyra/30min";

export function CohortCalloutSection() {
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelectorAll<HTMLElement>("[data-cohort-eyebrow]");
      const heading = section.querySelectorAll<HTMLElement>("[data-cohort-heading]");
      const cards = section.querySelectorAll<HTMLElement>("[data-cohort-card]");
      const ctas = section.querySelectorAll<HTMLElement>("[data-cohort-cta]");

      const reveal = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
      });

      if (eyebrow.length) {
        reveal.from(
          eyebrow,
          { autoAlpha: 0, y: 14, duration: 0.5, stagger: 0.06 },
          0,
        );
      }
      if (heading.length) {
        reveal.from(
          heading,
          { autoAlpha: 0, y: 24, filter: "blur(8px)", duration: 0.7 },
          0.05,
        );
      }
      if (cards.length) {
        reveal.from(
          cards,
          { autoAlpha: 0, y: 32, scale: 0.97, duration: 0.6, stagger: 0.1 },
          0.15,
        );
      }
      if (ctas.length) {
        reveal.from(
          ctas,
          { autoAlpha: 0, y: 18, duration: 0.5, stagger: 0.06 },
          0.3,
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cohort"
      aria-labelledby="cohort-callout-heading"
      className="relative isolate overflow-hidden bg-[#0b1230] text-white"
    >
      {/* Top cyan accent line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[#22d3ee]/70"
      />

      {/* Soft blue glow + grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 0%, rgba(34, 211, 238, 0.18), transparent 32%), radial-gradient(circle at 82% 100%, rgba(99, 102, 241, 0.22), transparent 32%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize:
            "100% 100%, 100% 100%, 1.5rem 1.5rem, 1.5rem 1.5rem",
        }}
      />
      <div className="hero-noise absolute inset-0 opacity-25 mix-blend-soft-light" />

      <div className="relative z-10 mx-auto flex max-w-[80rem] flex-col items-center px-5 py-[clamp(4rem,7vw,6.5rem)] text-center sm:px-8 lg:px-12">
        {/* Eyebrow */}
        <div data-cohort-eyebrow>
          <SketchFrame
            fill="#ffd23f"
            stroke="#ffd23f"
            strokeWidth={1.6}
            roughness={1.18}
            bowing={1.95}
            inset={1.3}
            radius={999}
            overlayFill="rgba(23,23,23,0.08)"
            overlayFillStyle="zigzag-line"
            overlayFillWeight={0.78}
            overlayHachureGap={11}
            overlayHachureAngle={24}
          >
            <div className="px-4 py-1.5 font-[family:var(--font-geist-mono)] text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#3b2b00] sm:px-5 sm:text-[0.66rem]">
              The Elevate Starter Kit · Cohort
            </div>
          </SketchFrame>
        </div>

        {/* Heading */}
        <h2
          id="cohort-callout-heading"
          data-cohort-heading
          className="mt-5 text-[clamp(2.2rem,4.4vw,3.6rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-white"
        >
          50 web slots ·{" "}
          <span style={{ color: "#ffd23f" }}>30 growth slots</span>
        </h2>
        <p
          data-cohort-heading
          className="mt-3 max-w-[34rem] text-[0.95rem] leading-6 text-white/72 sm:text-[1rem]"
        >
          Two closed-cohort offers. Pricing is locked, slots are not.
        </p>

        {/* Two cohort cards side by side */}
        <div className="mt-10 grid w-full max-w-[60rem] grid-cols-1 gap-5 sm:grid-cols-2">
          {COHORT_OFFERS.map((offer) => (
            <div key={offer.title} data-cohort-card>
              <SketchFrame
                className="h-full px-6 py-7 sm:px-7 sm:py-8"
                fill={offer.fill}
                stroke={offer.stroke}
                strokeWidth={1.7}
                roughness={1.2}
                bowing={1.95}
                inset={1.4}
                radius={26}
                overlayFill={offer.overlayFill}
                overlayFillStyle={offer.overlayStyle}
                overlayFillWeight={0.85}
                overlayHachureGap={11}
                overlayHachureAngle={offer.overlayAngle}
              >
                <div className="flex h-full flex-col text-left">
                  <p className="font-[family:var(--font-geist-mono)] text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#7a6e67]">
                    {offer.tag}
                  </p>
                  <h3 className="mt-2 text-[clamp(1.45rem,2.2vw,1.85rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[#171717]">
                    {offer.title}
                  </h3>
                  <p className="mt-1 text-[0.85rem] text-[#54463e]">
                    {offer.subtitle}
                  </p>

                  <div className="my-5 h-px w-full bg-[#171717]/15" />

                  <div className="mt-auto flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[clamp(1.85rem,3vw,2.3rem)] font-semibold leading-none tracking-[-0.05em] text-[#171717]">
                        {offer.price}
                      </p>
                      <p
                        className="mt-1.5 font-[family:var(--font-geist-mono)] text-[0.6rem] font-semibold uppercase tracking-[0.22em]"
                        style={{ color: offer.accentText }}
                      >
                        {offer.meta}
                      </p>
                    </div>
                  </div>
                </div>
              </SketchFrame>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div
          data-cohort-cta
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            type="button"
            onClick={() => setCalendlyOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-[#ffd23f] px-6 py-3 text-sm font-semibold text-[#171717] shadow-[4px_4px_0_rgba(0,0,0,0.4)] transition hover:-translate-y-0.5"
          >
            Book a 30-min call
          </button>
          <Link
            href="/elevate-starter-kit"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/8 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/14"
          >
            See full cohort details
          </Link>
        </div>

        {/* Fine print line */}
        <div
          data-cohort-cta
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.78rem] text-white/60"
        >
          <span className="inline-flex items-center gap-1.5">
            <FiClock className="h-3.5 w-3.5" aria-hidden="true" />
            7-day SLA · 30-day loop
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-[#ff5d8f]">
            <FiZap className="h-3.5 w-3.5" aria-hidden="true" />
            Closes when slots fill
          </span>
        </div>
      </div>

      <CalendlyModal
        open={calendlyOpen}
        url={CALENDLY_URL}
        onClose={() => setCalendlyOpen(false)}
      />
    </section>
  );
}
