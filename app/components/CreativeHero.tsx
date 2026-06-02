"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import illustration from "@/public/illustration.png";
import { useEffect, useRef, useState } from "react";
import { CreativeNavbar } from "@/app/components/CreativeNavbar";
const FIGMA_FRAME_WIDTH = 1436;
const SVG_WIDTH_RATIO = 1396.12 / FIGMA_FRAME_WIDTH;
const ILLUSTRATION_WIDTH_RATIO = 1148 / FIGMA_FRAME_WIDTH;
const HERO_SVG_VIEWBOX = "0 0 1397 526";
const marqueeText = "Too F** Creative";
const marqueeMeasureBase = 200;

gsap.registerPlugin(ScrollTrigger);

type SvgPath = {
  d: string;
  fill: string;
};

export function CreativeHero() {
  const [svgPaths, setSvgPaths] = useState<SvgPath[]>([]);
  const [marqueeFontSize, setMarqueeFontSize] = useState(128);
  const [marqueeViewportWidth, setMarqueeViewportWidth] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const svgLayerRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const marqueeViewportRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const marqueeMeasureRef = useRef<HTMLSpanElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const letterRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    let active = true;

    fetch("/we-are-new.svg")
      .then((response) => response.text())
      .then((svgMarkup) => {
        if (!active) {
          return;
        }

        const doc = new DOMParser().parseFromString(svgMarkup, "image/svg+xml");
        const paths = Array.from(doc.querySelectorAll("path")).map((path) => ({
          d: path.getAttribute("d") ?? "",
          fill: path.getAttribute("fill") ?? "white",
        }));

        setSvgPaths(paths);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const measure = () => {
      const viewport = marqueeViewportRef.current;
      const measureNode = marqueeMeasureRef.current;

      if (!viewport || !measureNode) {
        return;
      }

      const pageWidth = document.documentElement.clientWidth;
      const availableWidth = Math.max(pageWidth - 20, 0);
      const measuredWidth = measureNode.getBoundingClientRect().width;

      if (availableWidth === 0 || measuredWidth === 0) {
        return;
      }

      const fittedSize = marqueeMeasureBase * (availableWidth / measuredWidth);
      const clampedSize = Math.max(78, fittedSize * 0.99);
      setMarqueeViewportWidth(pageWidth);
      setMarqueeFontSize(clampedSize);

      requestAnimationFrame(() => {
        measureNode.getBoundingClientRect();
      });
    };

    measure();

    if ("fonts" in document) {
      void document.fonts.ready.then(measure);
    }

    const resizeObserver = new ResizeObserver(measure);

    if (marqueeViewportRef.current) {
      resizeObserver.observe(marqueeViewportRef.current);
    }

    if (marqueeTrackRef.current) {
      resizeObserver.observe(marqueeTrackRef.current);
    }

    if (paragraphRef.current) {
      resizeObserver.observe(paragraphRef.current);
    }

    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const marqueeTrack = marqueeTrackRef.current;

    if (!marqueeTrack || marqueeViewportWidth === 0) {
      return;
    }

    gsap.set(marqueeTrack, {
      x: -marqueeViewportWidth,
    });

    const marquee = gsap.timeline({
      repeat: -1,
      repeatDelay: 0,
    });

    marquee
      .to({}, { duration: 2 })
      .to(marqueeTrack, {
        x: -(marqueeViewportWidth * 2),
        duration: 1.15,
        ease: "power3.inOut",
      })
      .set(marqueeTrack, {
        x: -marqueeViewportWidth,
      });

    return () => {
      marquee.kill();
    };
  }, [marqueeViewportWidth]);

  useEffect(() => {
    if (!sectionRef.current || svgPaths.length === 0) {
      return;
    }

    const ctx = gsap.context(() => {
      const letters = letterRefs.current.filter(Boolean);
      const svgLayer = svgLayerRef.current;
      const marqueeViewport = marqueeViewportRef.current;
      const illustration = illustrationRef.current;
      const shadow = shadowRef.current;

      gsap.set(headerRef.current, { opacity: 0, y: -20 });
      gsap.set(shadow, { opacity: 0, scaleX: 0.82 });
      gsap.set(illustration, { opacity: 0, y: 28, scale: 1, transformOrigin: "center center" });
      gsap.set(marqueeViewport, { opacity: 0, y: 24 });
      gsap.set(svgLayer, { opacity: 1, y: 0 });

      letters.forEach((letter, index) => {
        gsap.set(letter, {
          opacity: 0,
          y: index % 2 === 0 ? -96 : 96,
        });
      });

      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      intro
        .to(headerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.85,
        })
        .to(
          letters,
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            stagger: 0.11,
            ease: "power4.out",
          },
          0.1,
        )
        .to(
          shadow,
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.85,
          },
          0.28,
        )
        .to(
          illustration,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          0.22,
        )
        .to(
          marqueeViewport,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
          },
          0.45,
        );

      if (svgLayer && illustration) {
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom 30%",
            scrub: true,
          },
        })
          .to(
            svgLayer,
            {
              opacity: 0,
              y: -54,
              ease: "none",
            },
            0,
          )
          .to(
            illustration,
            {
              scale: 0.7,
              y: 20,
              ease: "none",
            },
            0,
          )
          .to(
            shadow,
            {
              scaleX: 0.72,
              opacity: 0.18,
              ease: "none",
            },
            0,
          );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [svgPaths]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate min-h-[100svh] overflow-x-hidden bg-[var(--hero-bg)] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_48%),radial-gradient(circle_at_20%_70%,rgba(0,180,255,0.18),transparent_38%),radial-gradient(circle_at_80%_24%,rgba(255,255,255,0.16),transparent_26%)]" />
      <div className="hero-noise absolute inset-0 opacity-35 mix-blend-soft-light" />

      <div className="relative z-10 flex min-h-[100svh] w-full flex-col px-4 pb-10 pt-4 sm:px-6 sm:pb-12 sm:pt-5 lg:px-8 lg:pt-6 xl:px-12">
        <CreativeNavbar headerRef={headerRef} />

        <div className="relative flex flex-1 flex-col items-center pt-10 sm:pt-12 md:pt-16 lg:pt-6">
          <div
            ref={svgLayerRef}
            className="pointer-events-none absolute left-1/2 top-[15%] z-10 max-w-none -translate-x-1/2 select-none sm:top-[14%] md:top-[15%] lg:top-[12%]"
            style={{ width: `${SVG_WIDTH_RATIO * 100}vw` }}
          >
            <svg
              viewBox={HERO_SVG_VIEWBOX}
              aria-hidden="true"
              className="hero-we-are h-auto w-full overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {svgPaths.map((path, index) => (
                <path
                  key={`${index}-${path.d.slice(0, 24)}`}
                  ref={(node) => {
                    letterRefs.current[index] = node;
                  }}
                  d={path.d}
                  fill={path.fill}
                  className="hero-letter"
                />
              ))}
            </svg>
          </div>

          <div
            ref={illustrationRef}
            className="relative z-20 mt-[8svh] translate-x-[clamp(0.9rem,2.2vw,2.8rem)] sm:mt-[8svh] md:mt-[10svh] lg:mt-[10svh] xl:mt-[8svh]"
          >
            <div
              ref={shadowRef}
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
                sizes="(max-width: 767px) 92vw, 79.944vw"
                className="h-auto w-full drop-shadow-[0_35px_50px_rgba(9,23,43,0.26)]"
              />
            </div>
          </div>

          <div className="relative z-30 mt-[clamp(0.5rem,2vh,1.5rem)] flex w-full flex-col items-center gap-5 sm:gap-6">
            <div
              ref={marqueeViewportRef}
              className="pointer-events-none relative left-[52%] -translate-x-1/2 overflow-hidden"
              style={{ width: marqueeViewportWidth ? `${marqueeViewportWidth}px` : "100vw" }}
            >
              <div
                ref={marqueeTrackRef}
                className="hero-marquee-track flex items-end whitespace-nowrap"
              >
                {[0, 1, 2].map((copy) => (
                  <div
                    key={copy}
                    className="font-display flex h-full shrink-0 items-end justify-center text-center leading-[0.9] tracking-[-0.04em] text-white"
                    style={{
                      width: marqueeViewportWidth ? `${marqueeViewportWidth}px` : "100vw",
                      fontSize: `${marqueeFontSize}px`,
                    }}
                  >
                    <span>{marqueeText}</span>
                  </div>
                ))}
              </div>
            </div>

            <p
              ref={paragraphRef}
              className="mx-auto max-w-[47rem] px-6 text-center text-[0.95rem] leading-7 text-[#bde9ff] sm:text-base"
            >
              We build playful digital experiences for ambitious brands, blending
              motion, storytelling, code, and design into work that feels sharp,
              human, and unforgettable. Every screen is shaped with intention,
              every interaction earns its place, and every detail works harder to
              make the final experience feel alive, bold, and beautifully
              original today.
            </p>
          </div>

          <span
            ref={marqueeMeasureRef}
            aria-hidden="true"
            className="font-display pointer-events-none absolute opacity-0 whitespace-nowrap"
            style={{ fontSize: `${marqueeMeasureBase}px` }}
          >
            {marqueeText}
          </span>
        </div>
      </div>
    </section>
  );
}
