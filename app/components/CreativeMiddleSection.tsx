"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { BsFillCursorFill } from "react-icons/bs";
import { SketchFrame } from "@/app/components/SketchFrame";
import { servicePages } from "@/app/services/servicePageContent";
import { SquigglyText } from "@/components/ui/squiggly-text";
import asteriskIcon from "@/public/icons/Sketch-annotation-element-brush-pen-icon-asterisk-1.png";
import graphMonitorIcon from "@/public/icons/Sketch-annotation-element-brush-pen-icon-graph-monitor.png";
import highfiveIcon from "@/public/icons/Sketch-annotation-element-brush-pen-icon-highfive.png";
import okHandIcon from "@/public/icons/Sketch-annotation-element-brush-pen-icon-ok-hand.png";
import smileyGrindingIcon from "@/public/icons/Sketch-annotation-element-brush-pen-icon-smiley-grinding.png";
import smileyLoveIcon from "@/public/icons/Sketch-annotation-element-brush-pen-icon-smiley-love.png";
import thunderIcon from "@/public/icons/Sketch-annotation-element-brush-pen-icon-thunder.png";
import whatsappIcon from "@/public/icons/Whatsapp.png";
gsap.registerPlugin(ScrollTrigger);

type Point = readonly [number, number];

const TORN_TOP_OUTER: Point[] = [
  [0, 92],
  [28, 95],
  [52, 88],
  [78, 98],
  [106, 84],
  [136, 101],
  [168, 83],
  [201, 105],
  [236, 85],
  [273, 108],
  [313, 87],
  [355, 111],
  [400, 89],
  [447, 114],
  [497, 92],
  [550, 117],
  [607, 94],
  [668, 118],
  [733, 95],
  [803, 119],
  [878, 95],
  [958, 118],
  [1044, 94],
  [1137, 116],
  [1237, 92],
  [1344, 113],
  [1458, 89],
  [1578, 109],
  [1600, 104],
];

const TORN_TOP_INNER: Point[] = [
  [0, 122],
  [26, 126],
  [50, 117],
  [74, 129],
  [101, 114],
  [130, 132],
  [161, 112],
  [194, 136],
  [229, 114],
  [266, 140],
  [306, 116],
  [349, 143],
  [394, 118],
  [442, 146],
  [494, 122],
  [551, 148],
  [613, 124],
  [680, 149],
  [751, 124],
  [829, 150],
  [911, 124],
  [1001, 148],
  [1097, 123],
  [1200, 145],
  [1309, 120],
  [1424, 141],
  [1545, 117],
  [1600, 126],
];

const TORN_BOTTOM_INNER: Point[] = [
  [0, 40],
  [26, 47],
  [55, 36],
  [87, 53],
  [121, 37],
  [159, 58],
  [200, 40],
  [245, 62],
  [293, 43],
  [345, 67],
  [401, 46],
  [462, 70],
  [527, 49],
  [597, 73],
  [671, 52],
  [750, 75],
  [833, 53],
  [923, 75],
  [1019, 52],
  [1121, 73],
  [1230, 50],
  [1344, 70],
  [1466, 48],
  [1595, 67],
  [1600, 66],
];

const TORN_BOTTOM_OUTER: Point[] = [
  [0, 74],
  [23, 86],
  [49, 74],
  [78, 97],
  [110, 79],
  [146, 104],
  [185, 83],
  [228, 109],
  [275, 87],
  [327, 114],
  [384, 91],
  [446, 118],
  [514, 95],
  [588, 122],
  [668, 99],
  [756, 124],
  [850, 100],
  [952, 123],
  [1060, 98],
  [1179, 119],
  [1307, 95],
  [1445, 115],
  [1591, 92],
  [1600, 96],
];

function linePath(points: readonly Point[]) {
  return points.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" ");
}

function bandPath(upper: readonly Point[], lower: readonly Point[]) {
  return `${linePath(upper)} ${[...lower]
    .reverse()
    .map(([x, y]) => `L${x} ${y}`)
    .join(" ")} Z`;
}

function fillBelowPath(points: readonly Point[], height: number) {
  return `${linePath(points)} L1600 ${height} L0 ${height} Z`;
}

function fillAbovePath(points: readonly Point[]) {
  return `M0 0 L1600 0 ${[...points]
    .reverse()
    .map(([x, y]) => `L${x} ${y}`)
    .join(" ")} Z`;
}

function TornPaperEdge({
  side,
}: {
  side: "top" | "bottom";
}) {
  const id = useId().replace(/:/g, "");
  const noiseId = `${id}-${side}-noise`;
  const grainId = `${id}-${side}-grain`;
  const shadowId = `${id}-${side}-shadow`;
  const paperId = `${id}-${side}-paper`;
  const outerPoints = side === "top" ? TORN_TOP_OUTER : TORN_BOTTOM_OUTER;
  const innerPoints = side === "top" ? TORN_TOP_INNER : TORN_BOTTOM_INNER;
  const paperBand = bandPath(outerPoints, innerPoints);
  const redFill = side === "top" ? fillBelowPath(innerPoints, 180) : fillAbovePath(innerPoints);
  const outerPath = linePath(outerPoints);
  const innerPath = linePath(innerPoints);
  const fibers = outerPoints
    .filter((_, index) => index % 2 === 1)
    .map(([x, y], index) => {
      const length = 9 + (index % 4) * 3;
      return side === "top"
        ? { x1: x - 1.5, y1: y - 1, x2: x + 1.5, y2: y - length }
        : { x1: x - 1.5, y1: y + 1, x2: x + 1.5, y2: y + length };
    });

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1600 180"
      preserveAspectRatio="none"
      className="pointer-events-none block h-[clamp(5.5rem,8vw,8rem)] w-full select-none"
    >
      <defs>
        <filter id={noiseId} x="-10%" y="-20%" width="120%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.92"
            numOctaves="4"
            seed={side === "top" ? "17" : "23"}
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 0.18 0"
          />
        </filter>
        <pattern id={grainId} width="84" height="32" patternUnits="userSpaceOnUse">
          <path
            d="M-4 14C7 9 14 19 25 15C34 12 42 19 53 15C63 11 71 19 84 14"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M2 25C13 21 20 29 31 25C40 22 49 29 60 25C69 22 76 29 84 25"
            fill="none"
            stroke="rgba(112,31,33,0.055)"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
        </pattern>
        <pattern id={paperId} width="36" height="18" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="6" r="0.7" fill="rgba(177,132,117,0.22)" />
          <circle cx="19" cy="11" r="0.7" fill="rgba(177,132,117,0.18)" />
          <circle cx="31" cy="4" r="0.65" fill="rgba(255,255,255,0.35)" />
        </pattern>
        <linearGradient id={shadowId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop
            offset="0%"
            stopColor={side === "top" ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.12)"}
          />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
      </defs>

      <path d={redFill} fill="#f50d30" />
      <path d={redFill} fill={`url(#${grainId})`} opacity="0.42" />
      <path d={paperBand} fill="#fff8ef" />
      <path d={paperBand} fill={`url(#${paperId})`} opacity="0.8" />
      <path d={paperBand} fill="#fff7f2" filter={`url(#${noiseId})`} />
      <path d={paperBand} fill={`url(#${shadowId})`} opacity={side === "top" ? 0.7 : 0.5} />
      {fibers.map((fiber, index) => (
        <line
          key={`${side}-fiber-${index}`}
          x1={fiber.x1}
          y1={fiber.y1}
          x2={fiber.x2}
          y2={fiber.y2}
          stroke="#fff8ef"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.85"
        />
      ))}
      <path
        d={outerPath}
        fill="none"
        stroke="#fff8ef"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={innerPath}
        fill="none"
        stroke="#e8cec4"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={innerPath}
        fill="none"
        stroke={side === "top" ? "rgba(112, 31, 33, 0.09)" : "rgba(112, 31, 33, 0.13)"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinHoles({ dark = false }: { dark?: boolean }) {
  return (
    <div className="absolute left-4 top-7 hidden flex-col gap-10 md:flex">
      {[0, 1, 2].map((hole) => (
        <span
          key={hole}
          className={`h-3 w-3 rounded-full border ${
            dark ? "border-white/18 bg-black/18" : "border-black/10 bg-white/70"
          }`}
        />
      ))}
    </div>
  );
}

type FloatingCursorNote = {
  accent: string;
  fill: string;
  floatX: number;
  floatY: number;
  id: string;
  label: string;
  side: "left" | "right";
  text: string;
  top: string;
};

const FLOATING_CURSOR_NOTES: Record<number, FloatingCursorNote> = {
  0: {
    id: "hook-first",
    label: "Hook first",
    fill: "#ffe55a",
    accent: "#ffe55a",
    text: "#5f4600",
    side: "left",
    top: "clamp(2.4rem, 4.2vw, 3.15rem)",
    floatX: 4,
    floatY: -7,
  },
  1: {
    id: "motion-cue",
    label: "Motion cue",
    fill: "#ff9a76",
    accent: "#ff9a76",
    text: "#ffffff",
    side: "right",
    top: "clamp(1.25rem, 2vw, 1.6rem)",
    floatX: 5,
    floatY: -6,
  },
  2: {
    id: "tone-dialed",
    label: "Tone dialed",
    fill: "#56bef9",
    accent: "#84d4ff",
    text: "#ffffff",
    side: "right",
    top: "clamp(1.35rem, 2.15vw, 1.65rem)",
    floatX: 4,
    floatY: -5,
  },
  3: {
    id: "story-thread",
    label: "Story thread",
    fill: "#fb7185",
    accent: "#fb7185",
    text: "#ffffff",
    side: "left",
    top: "clamp(2.3rem, 3.8vw, 3rem)",
    floatX: 4,
    floatY: 7,
  },
  4: {
    id: "proof-pops",
    label: "Proof pops",
    fill: "#c5a0ff",
    accent: "#b691ff",
    text: "#ffffff",
    side: "right",
    top: "clamp(2.2rem, 3.3vw, 2.9rem)",
    floatX: 4,
    floatY: 7,
  },
};

function FloatingCursorTooltip({ note }: { note: FloatingCursorNote }) {
  const bubblePaddingClassName =
    note.side === "left" ? "pl-4 pr-5" : "pl-5 pr-4";
  const edgeGap = "clamp(0.5rem, 1vw, 1rem)";
  const anchorTransform =
    note.side === "left"
      ? `translateX(calc(-100% - ${edgeGap}))`
      : `translateX(calc(100% + ${edgeGap}))`;
  const iconTransform =
    note.side === "left" ? "rotate(10deg)" : "scaleX(-1) rotate(10deg)";

  return (
    <div
      className="middle-arrow-note pointer-events-none absolute z-30"
      data-float-x={note.floatX}
      data-float-y={note.floatY}
      style={{
        top: note.top,
        [note.side]: 0,
      }}
    >
      <div style={{ transform: anchorTransform }}>
        <div
          className={`flex items-center gap-2.5 ${
            note.side === "right" ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`rounded-full ${bubblePaddingClassName} py-1.5 shadow-[0_10px_20px_rgba(0,0,0,0.14)] ring-1 ring-white/24 sm:py-2`}
            style={{ backgroundColor: note.fill }}
          >
            <div
              className="font-[family:var(--font-geist-mono)] text-[0.52rem] font-semibold uppercase tracking-[0.22em] sm:text-[0.58rem]"
              style={{ color: note.text }}
            >
              {note.label}
            </div>
          </div>

          <BsFillCursorFill
            aria-hidden="true"
            className="relative z-10 h-5 w-5 shrink-0 opacity-95 drop-shadow-[0_5px_8px_rgba(0,0,0,0.2)] sm:h-6 sm:w-6"
            style={{
              color: note.accent,
              transform: iconTransform,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function getFeaturedService(slug: (typeof servicePages)[number]["slug"]) {
  const service = servicePages.find((entry) => entry.slug === slug);

  if (!service) {
    throw new Error(`Missing featured service for slug: ${slug}`);
  }

  return service;
}

const creativeManagementService = getFeaturedService("creative-management");
const webDevelopmentService = getFeaturedService("web-development");
const performanceMarketingService = getFeaturedService("performance-marketing");

export function CreativeMiddleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [viewportWidth, setViewportWidth] = useState(1440);

  const showCursorNotes = viewportWidth >= 1280;

  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);

    return () => {
      window.removeEventListener("resize", updateViewportWidth);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      const arrowNotes = gsap.utils.toArray<HTMLElement>(".middle-arrow-note");

      gsap.set(cards, {
        opacity: 0,
        y: 70,
        rotate: (index) => (index % 2 === 0 ? -2.5 : 2.5),
        transformOrigin: "center center",
      });
      gsap.set(arrowNotes, {
        autoAlpha: 0,
        scale: 0.9,
        y: (index) => (index % 2 === 0 ? -18 : 18),
      });

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
        },
        defaults: { ease: "power3.out" },
      });

      intro
        .from(badgeRef.current, {
          opacity: 0,
          y: -18,
          duration: 0.55,
        })
        .from(
          headingRef.current,
          {
            opacity: 0,
            y: 28,
            duration: 0.8,
          },
          0.08,
        )
        .from(
          subheadingRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.65,
          },
          0.18,
        )
        .to(
          arrowNotes,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.06,
          },
          0.2,
        )
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          0.28,
        );

      arrowNotes.forEach((note, index) => {
        const xOffset = Number(note.dataset.floatX ?? 0);
        const yOffset = Number(note.dataset.floatY ?? 0);

        gsap.to(note, {
          x: xOffset,
          y: yOffset,
          duration: 2.8 + index * 0.24,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, section);

    return () => ctx.revert();
  }, [viewportWidth]);

  const handleCardEnter = (index: number) => {
    const node = cardsRef.current[index];

    if (!node) {
      return;
    }

    gsap.to(node, {
      y: -8,
      rotate: index % 2 === 0 ? -0.8 : 0.8,
      duration: 0.24,
      ease: "power2.out",
    });
  };

  const handleCardLeave = (index: number) => {
    const node = cardsRef.current[index];

    if (!node) {
      return;
    }

    gsap.to(node, {
      y: 0,
      rotate: 0,
      duration: 0.28,
      ease: "power2.out",
    });
  };

  const topRightIconClassName =
    "pointer-events-none h-14 w-14 shrink-0 select-none object-contain sm:h-16 sm:w-16";
  const featureIconClassName =
    "pointer-events-none mb-3 h-9 w-9 select-none object-contain";

  return (
    <section
      ref={sectionRef}
      id="studio"
      className="relative isolate w-full overflow-hidden bg-[#09b7ea]"
    >
      <div className="relative z-10 pt-[clamp(3rem,5vw,5rem)]">
        <TornPaperEdge side="top" />
        <div className="relative overflow-hidden bg-[#f50d30]">
          <div className="absolute inset-0 opacity-60">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 18%, rgba(255,255,255,0.12) 0, rgba(255,255,255,0.12) 0.7px, transparent 1px), radial-gradient(circle at 80% 34%, rgba(255,255,255,0.09) 0, rgba(255,255,255,0.09) 0.7px, transparent 1px), linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.04)), linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0))",
                backgroundSize: "11px 11px, 13px 13px, 100% 100%, 100% 100%",
              }}
            />
          </div>
          <div
            className="relative mx-auto w-full overflow-hidden px-5 pb-[clamp(6rem,9vw,9rem)] pt-[clamp(2.5rem,4vw,4rem)] sm:px-8 lg:px-12"
          >
            <div className="mx-auto w-full max-w-[76rem] 2xl:max-w-[70vw]">
              <div className="flex w-full flex-col items-center">
            <div ref={badgeRef}>
              <SketchFrame
                className="mb-5 px-4 py-2"
                fill="#fff8ef"
                stroke="#171717"
                strokeWidth={1.5}
                roughness={1.12}
                bowing={1.72}
                inset={1.1}
                radius={16}
                overlayFill="rgba(255, 179, 71, 0.13)"
                overlayFillStyle="zigzag-line"
                overlayFillWeight={0.75}
                overlayHachureGap={11}
                overlayHachureAngle={24}
              >
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#9e4a18]">
                  Notebook mode
                </p>
              </SketchFrame>
            </div>

            <div ref={headingRef} className="w-full max-w-[58rem] text-center text-white">
              <h2 className="font-display text-[clamp(2.65rem,4.8vw,5rem)] leading-[0.96] tracking-[-0.055em]">
                Built with intent.
                <br />
                Designed for{" "}
                <span className="inline-block px-1">
                  <SquigglyText
                    stepDuration={72}
                    scale={[4, 6]}
                    className="text-[#ffe55a]"
                  >
                    lasting impact.
                  </SquigglyText>
                </span>
              </h2>
            </div>

            <p
              ref={subheadingRef}
              className="mx-auto mt-6 max-w-[56rem] text-center text-[0.98rem] leading-7 text-[#fff8ef] sm:text-[1.05rem]"
            >
              We build creative websites like a brilliant notebook spread:
              expressive ideas up top, smart structure underneath, and tiny
              details everywhere that make the whole thing feel alive.
            </p>

            <div className="relative mt-16 w-full">
              <div className="grid w-full gap-5 md:grid-cols-12 md:auto-rows-[minmax(10rem,auto)]">
              <div
                ref={(node) => {
                  cardsRef.current[0] = node;
                }}
                onMouseEnter={() => handleCardEnter(0)}
                onMouseLeave={() => handleCardLeave(0)}
                className="relative md:col-span-7 md:row-span-2"
              >
                {showCursorNotes ? (
                  <FloatingCursorTooltip note={FLOATING_CURSOR_NOTES[0]} />
                ) : null}
                <Link
                  href={`/services/${creativeManagementService.slug}`}
                  className="block h-full focus:outline-none focus-visible:rounded-[1.6rem] focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f50d30]"
                  aria-label={`Open ${creativeManagementService.name}`}
                >
                  <SketchFrame
                    className="h-full px-6 py-6 md:px-7 md:py-7"
                    fill="#fff8ef"
                    stroke="#171717"
                    strokeWidth={1.7}
                    roughness={1.15}
                    bowing={1.9}
                    inset={1.5}
                    radius={24}
                    overlayFill="rgba(255, 163, 131, 0.14)"
                    overlayFillStyle="zigzag-line"
                    overlayFillWeight={0.85}
                    overlayHachureGap={12}
                    overlayHachureAngle={26}
                  >
                    <div className="relative flex h-full flex-col gap-6 overflow-hidden rounded-[1.1rem] pl-0 md:pl-8">
                      <div className="notebook-paper absolute inset-0 rounded-[1.1rem]" />
                      <div className="notebook-margin absolute bottom-4 top-4 left-7 hidden w-px md:block" />
                      <PinHoles />

                      <div className="relative flex items-start justify-between gap-4">
                        <div className="space-y-3">
                          <p className="text-[0.76rem] font-semibold uppercase tracking-[0.19em] text-[#9e4a18]">
                            {creativeManagementService.heroEyebrow}
                          </p>
                          <h3 className="max-w-[24rem] text-[1.9rem] font-semibold leading-[1.02] tracking-[-0.05em] text-[#171717]">
                            Direction first.
                            <br />
                            Then content that keeps moving.
                          </h3>
                        </div>
                        <Image
                          src={highfiveIcon}
                          alt=""
                          className={topRightIconClassName}
                        />
                      </div>

                      <p className="relative max-w-[32rem] text-[1rem] leading-7 text-[#41352f]">
                        We build creative direction, review rhythms, and content
                        systems that help campaigns stay sharp as more channels,
                        collaborators, and assets pile on.
                      </p>

                      <div className="relative grid gap-3 sm:grid-cols-3">
                        {[
                          {
                            icon: whatsappIcon,
                            title: creativeManagementService.pillars[0]?.chip ?? "Direction",
                            body: creativeManagementService.pillars[0]?.body ?? "",
                          },
                          {
                            icon: thunderIcon,
                            title: creativeManagementService.pillars[1]?.chip ?? "Production",
                            body: creativeManagementService.pillars[1]?.body ?? "",
                          },
                          {
                            icon: asteriskIcon,
                            title: creativeManagementService.pillars[2]?.chip ?? "Adaptation",
                            body: creativeManagementService.pillars[2]?.body ?? "",
                          },
                        ].map((item) => (
                          <div
                            key={item.title}
                            className="rounded-[1.1rem] border border-black/8 bg-white/55 p-4 backdrop-blur-[2px]"
                          >
                            <Image
                              src={item.icon}
                              alt=""
                              className={featureIconClassName}
                            />
                            <div className="mb-3 text-sm font-semibold tracking-[-0.02em] text-[#151515]">
                              {item.title}
                            </div>
                            <p className="text-sm leading-6 text-[#54453d]">
                              {item.body}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="relative mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#171717]">
                        <span>Explore service page</span>
                        <span aria-hidden="true">/services/{creativeManagementService.slug}</span>
                      </div>
                    </div>
                  </SketchFrame>
                </Link>
              </div>

              <div
                ref={(node) => {
                  cardsRef.current[1] = node;
                }}
                onMouseEnter={() => handleCardEnter(1)}
                onMouseLeave={() => handleCardLeave(1)}
                className="relative md:col-span-5"
              >
                {showCursorNotes ? (
                  <FloatingCursorTooltip note={FLOATING_CURSOR_NOTES[1]} />
                ) : null}
                <Link
                  href={`/services/${webDevelopmentService.slug}`}
                  className="block h-full focus:outline-none focus-visible:rounded-[1.5rem] focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f50d30]"
                  aria-label={`Open ${webDevelopmentService.name}`}
                >
                  <SketchFrame
                    className="h-full px-5 py-5 sm:px-6 sm:py-6"
                    fill="#dff2ff"
                    stroke="#171717"
                    strokeWidth={1.65}
                    roughness={1.12}
                    bowing={1.85}
                    inset={1.45}
                    radius={22}
                    overlayFill="rgba(31, 143, 255, 0.12)"
                    overlayFillStyle="zigzag-line"
                    overlayFillWeight={0.84}
                    overlayHachureGap={12}
                    overlayHachureAngle={30}
                  >
                    <div className="relative h-full overflow-hidden rounded-[1.05rem]">
                      <div className="notebook-paper-blue absolute inset-0 rounded-[1.05rem]" />
                      <div className="relative flex h-full flex-col justify-between gap-5">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[#11639f]">
                              {webDevelopmentService.heroEyebrow}
                            </p>
                            <Image
                              src={smileyLoveIcon}
                              alt=""
                              className={topRightIconClassName}
                            />
                          </div>
                          <h3 className="text-[1.4rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#171717]">
                            Custom builds.
                            <br />
                            Fast, distinct, and ready to convert.
                          </h3>
                        </div>

                        <p className="max-w-[24rem] text-sm leading-6 text-[#36566f]">
                          Custom websites shaped around clarity, performance,
                          technical SEO, and a frontend experience people
                          actually remember.
                        </p>

                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f5487]">
                          <span>Open service page</span>
                          <span aria-hidden="true">/services/{webDevelopmentService.slug}</span>
                        </div>
                      </div>
                    </div>
                  </SketchFrame>
                </Link>
              </div>

              <div
                ref={(node) => {
                  cardsRef.current[2] = node;
                }}
                onMouseEnter={() => handleCardEnter(2)}
                onMouseLeave={() => handleCardLeave(2)}
                className="relative md:col-span-5"
              >
                {showCursorNotes ? (
                  <FloatingCursorTooltip note={FLOATING_CURSOR_NOTES[2]} />
                ) : null}
                <Link
                  href={`/services/${performanceMarketingService.slug}`}
                  className="block h-full focus:outline-none focus-visible:rounded-[1.5rem] focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f50d30]"
                  aria-label={`Open ${performanceMarketingService.name}`}
                >
                  <SketchFrame
                    className="h-full px-5 py-5 sm:px-6 sm:py-6"
                    fill="#fff2b1"
                    stroke="#171717"
                    strokeWidth={1.65}
                    roughness={1.12}
                    bowing={1.85}
                    inset={1.45}
                    radius={22}
                    overlayFill="rgba(255, 179, 71, 0.13)"
                    overlayFillStyle="zigzag-line"
                    overlayFillWeight={0.84}
                    overlayHachureGap={12}
                    overlayHachureAngle={24}
                  >
                    <div className="relative h-full overflow-hidden rounded-[1.05rem]">
                      <div className="notebook-paper-yellow absolute inset-0 rounded-[1.05rem]" />
                      <div className="relative flex h-full flex-col justify-between gap-5">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[#966400]">
                              {performanceMarketingService.heroEyebrow}
                            </p>
                            <Image
                              src={smileyGrindingIcon}
                              alt=""
                              className={topRightIconClassName}
                            />
                          </div>
                          <h3 className="text-[1.4rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#171717]">
                            Sharper clicks.
                            <br />
                            Cleaner conversions.
                          </h3>
                        </div>

                        <p className="max-w-[24rem] text-sm leading-6 text-[#695430]">
                          Paid social, search, landing pages, and measurement
                          planned together so stronger clicks turn into cleaner
                          conversion paths.
                        </p>

                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#7c5700]">
                          <span>Open service page</span>
                          <span aria-hidden="true">
                            /services/{performanceMarketingService.slug}
                          </span>
                        </div>
                      </div>
                    </div>
                  </SketchFrame>
                </Link>
              </div>

              <div
                ref={(node) => {
                  cardsRef.current[3] = node;
                }}
                onMouseEnter={() => handleCardEnter(3)}
                onMouseLeave={() => handleCardLeave(3)}
                className="relative md:col-span-8"
              >
                {showCursorNotes ? (
                  <FloatingCursorTooltip note={FLOATING_CURSOR_NOTES[3]} />
                ) : null}
                <SketchFrame
                  className="h-full px-6 py-6 md:px-7 md:py-7"
                  fill="#131c29"
                  stroke="#84d4ff"
                  strokeWidth={1.7}
                  roughness={1.12}
                  bowing={1.88}
                  inset={1.45}
                  radius={24}
                  overlayFill="rgba(80, 176, 255, 0.12)"
                  overlayFillStyle="cross-hatch"
                  overlayFillWeight={0.88}
                  overlayHachureGap={12}
                  overlayHachureAngle={42}
                  accentStroke="#84d4ff"
                >
                  <div className="relative h-full overflow-hidden rounded-[1.1rem] pl-0 md:pl-8">
                    <div className="notebook-grid-dark absolute inset-0 rounded-[1.1rem]" />
                    <div className="notebook-margin-dark absolute bottom-4 top-4 left-7 hidden w-px md:block" />
                    <PinHoles dark />

                  <div className="relative flex h-full flex-col justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-3">
                          <p className="text-[0.76rem] font-semibold uppercase tracking-[0.19em] text-[#8fd7ff]">
                            Why it hits
                          </p>
                          <h3 className="max-w-[28rem] text-[1.75rem] font-semibold leading-[1.04] tracking-[-0.04em] text-white">
                            Notebook personality.
                            <br />
                            Campaign-level finish.
                          </h3>
                        </div>
                        <Image
                          src={graphMonitorIcon}
                          alt=""
                          className={topRightIconClassName}
                        />
                      </div>

                      <p className="max-w-[33rem] text-[0.98rem] leading-7 text-[#e8f6ff]">
                        The trick is not making things look rough for the sake
                        of it. The trick is letting the roughness suggest energy
                        while the layout, typography, and motion do the serious
                        work underneath.
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        "Catchy lines people quote back",
                        "Sketch icons and cues that add warmth",
                        "GSAP timing that makes sections land better",
                      ].map((line) => (
                        <div
                          key={line}
                          className="rounded-[1rem] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-6 text-[#d8f2ff]"
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                  </div>
                </SketchFrame>
              </div>

              <div
                ref={(node) => {
                  cardsRef.current[4] = node;
                }}
                onMouseEnter={() => handleCardEnter(4)}
                onMouseLeave={() => handleCardLeave(4)}
                className="relative md:col-span-4"
              >
                {showCursorNotes ? (
                  <FloatingCursorTooltip note={FLOATING_CURSOR_NOTES[4]} />
                ) : null}
                <SketchFrame
                  className="h-full px-5 py-5 sm:px-6 sm:py-6"
                  fill="#f6f1e8"
                  stroke="#171717"
                  strokeWidth={1.65}
                  roughness={1.12}
                  bowing={1.82}
                  inset={1.45}
                  radius={22}
                  overlayFill="rgba(18, 18, 18, 0.05)"
                  overlayFillStyle="zigzag-line"
                  overlayFillWeight={0.82}
                  overlayHachureGap={12}
                  overlayHachureAngle={28}
                >
                  <div className="relative h-full overflow-hidden rounded-[1.05rem]">
                    <div className="notebook-paper-soft absolute inset-0 rounded-[1.05rem]" />
                    <div className="relative flex h-full flex-col gap-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-3">
                        <p className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[#8a4a26]">
                          Process
                        </p>
                        <h3 className="text-[1.4rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#171717]">
                          Sketch.
                          <br />
                          Stress-test.
                          <br />
                          Ship.
                        </h3>
                      </div>
                      <Image
                        src={okHandIcon}
                        alt=""
                        className={topRightIconClassName}
                      />
                    </div>

                    <div className="space-y-3 text-sm leading-6 text-[#4e4138]">
                      <div className="flex gap-3">
                        <span className="font-semibold text-[#171717]">01</span>
                        <span>Pull out the sharpest idea and exaggerate it.</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="font-semibold text-[#171717]">02</span>
                        <span>Refine the layout until every block earns its place.</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="font-semibold text-[#171717]">03</span>
                        <span>Add motion and micro-details that people remember.</span>
                      </div>
                    </div>
                  </div>
                  </div>
                </SketchFrame>
              </div>
            </div>
            </div>
              </div>
            </div>
          </div>
        </div>
        <TornPaperEdge side="bottom" />
      </div>
    </section>
  );
}
