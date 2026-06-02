"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { baumans, comfortaa } from "@/app/fonts";
import { PaperPlaneProgressOverlay } from "@/app/components/PaperPlaneProgressOverlay";
import { SketchFrame } from "@/app/components/SketchFrame";

gsap.registerPlugin(ScrollTrigger);

type ShowcaseSlide = {
  accent: string;
  background: string;
  body: string;
  bubbleFill: string;
  bubbleText: string;
  bullets: { title: string; body: string }[];
  chip: string;
  imageLabel: string;
  lottieSrc: string;
  stage: string;
  title: string;
};

const slides: ShowcaseSlide[] = [
  {
    stage: "01",
    chip: "Strategy room",
    bubbleFill: "#7cc7ff",
    bubbleText: "#10263d",
    title: "Find the angle",
    body:
      "Before we make anything, we figure out the sharpest message, the right audience, and the fastest route to attention.",
    imageLabel: "Space for strategy / moodboard artwork",
    lottieSrc:
      "https://lottie.host/3d1e40d1-c30c-4d99-adfe-28a08a6f39c4/fnjj3ephXw.lottie",
    background: "#09b7ea",
    accent: "#c4e5ff",
    bullets: [
      {
        title: "Audience signal",
        body: "Who we need to reach and what they already care about.",
      },
      {
        title: "Offer framing",
        body: "How the brand should sound when it wants to win attention.",
      },
      {
        title: "Content direction",
        body: "Hooks, formats, and landing ideas before production starts.",
      },
    ],
  },
  {
    stage: "02",
    chip: "Creative floor",
    bubbleFill: "#ffe27b",
    bubbleText: "#3d2a00",
    title: "Make it hit",
    body:
      "This is where the campaign gets visual. We build the look, write the lines, and shape assets that actually feel worth stopping for.",
    imageLabel: "Space for creative production artwork",
    lottieSrc:
      "https://lottie.host/5a484dcb-b576-4f50-9d3e-7c7be1de9256/TG1ZQus4Y4.lottie",
    background: "#ffd458",
    accent: "#ff9d49",
    bullets: [
      {
        title: "Design system",
        body: "Layouts, typography, color, and motion cues that feel distinct.",
      },
      {
        title: "Ad creative",
        body: "Short-form assets built to grab fast and stay memorable.",
      },
      {
        title: "Landing copy",
        body: "The page and the campaign speak the same language end to end.",
      },
    ],
  },
  {
    stage: "03",
    chip: "Launch desk",
    bubbleFill: "#ffc1a3",
    bubbleText: "#4a1907",
    title: "Launch with intent",
    body:
      "We don't just press publish. We line up the channels, check the details, and make sure every moving part supports the campaign goal.",
    imageLabel: "Space for campaign launch artwork",
    lottieSrc:
      "https://lottie.host/6cd4f41c-5f27-40b5-9512-cb3dc882e333/1ZC8rkFdiw.lottie",
    background: "#ff835f",
    accent: "#ffd0a8",
    bullets: [
      {
        title: "Channel setup",
        body: "Paid, social, web, and email all point in the same direction.",
      },
      {
        title: "Tracking clean",
        body: "We make sure the campaign can actually be measured properly.",
      },
      {
        title: "Go-live review",
        body: "Small fixes happen before the audience ever sees the first click.",
      },
    ],
  },
  {
    stage: "04",
    chip: "Growth loop",
    bubbleFill: "#a6dfff",
    bubbleText: "#0d2740",
    title: "Refine what wins",
    body:
      "After launch, we read the response, spot the patterns, and keep tightening the work so the strongest ideas get even stronger.",
    imageLabel: "Space for reporting / optimization artwork",
    lottieSrc:
      "https://lottie.host/281b9f59-f4a7-46cd-aaa5-de62c8102692/HnyGUEajen.lottie",
    background: "#0f1f34",
    accent: "#86d7ff",
    bullets: [
      {
        title: "Performance read",
        body: "We look for the message, audience, and creative that pull hardest.",
      },
      {
        title: "Creative iteration",
        body: "Winning concepts get reworked into sharper versions, not left alone.",
      },
      {
        title: "Clear reporting",
        body: "Clients see what moved, why it moved, and what happens next.",
      },
    ],
  },
];

function CalendarBindings() {
  return (
    <>
      <div className="pointer-events-none absolute left-7 right-7 top-0 z-20 flex -translate-y-[58%] justify-between sm:left-8 sm:right-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <span
            key={index}
            className="h-9 w-5 rounded-full border-[3px] border-[#d5d0c7] bg-transparent shadow-[0_2px_0_rgba(255,255,255,0.9)] sm:h-10 sm:w-6"
          />
        ))}
      </div>

      <div className="pointer-events-none absolute left-8 right-8 top-5 z-10 flex justify-between sm:left-9 sm:right-9">
        {Array.from({ length: 6 }).map((_, index) => (
          <span
            key={`hole-${index}`}
            className="h-2.5 w-2.5 rounded-full bg-black/12"
          />
        ))}
      </div>
    </>
  );
}

function RoughBubble({ slide }: { slide: ShowcaseSlide }) {
  return (
    <SketchFrame
      className="inline-block"
      fill={slide.bubbleFill}
      stroke="#171717"
      strokeWidth={1.4}
      roughness={1.2}
      bowing={2}
      inset={1.5}
      radius={999}
      overlayFill="rgba(255,255,255,0.12)"
      overlayFillStyle="zigzag-line"
      overlayFillWeight={0.7}
      overlayHachureGap={10}
      overlayHachureAngle={24}
    >
      <div
        className={`${comfortaa.className} px-5 py-2.5 text-[0.66rem] font-bold uppercase tracking-[0.22em] sm:px-6 sm:text-[0.72rem]`}
        style={{ color: slide.bubbleText }}
      >
        {slide.chip}
      </div>
    </SketchFrame>
  );
}

function WorkflowCalendarCard({
  slide,
  mobile = false,
}: {
  slide: ShowcaseSlide;
  mobile?: boolean;
}) {
  return (
    <div
      data-showcase-card
      className={`relative w-full pt-6 ${
        mobile ? "max-w-[40rem]" : "max-w-none"
      }`}
    >
      <div className="overflow-hidden rounded-[1.75rem] border border-black/10 bg-[#fffaf3] shadow-[0_18px_48px_rgba(0,0,0,0.14)] xl:rounded-[2.1rem] xl:shadow-[0_24px_70px_rgba(0,0,0,0.16)]">
        <CalendarBindings />

        <div className="relative flex items-center justify-between border-b border-black/10 bg-[#f5eee4] px-4 py-3.5 sm:px-5 xl:px-6 xl:py-4">
          <div className="absolute inset-x-0 top-0 h-2 bg-[linear-gradient(180deg,rgba(255,255,255,0.6),rgba(255,255,255,0))]" />
          <div className="flex items-end gap-3">
            <span
              data-showcase-stage
              className={`${baumans.className} text-[clamp(1.95rem,2.5vw,3rem)] leading-none tracking-[-0.04em] text-[#171717] xl:text-[clamp(2.1rem,3vw,3.55rem)]`}
            >
              {slide.stage}
            </span>
            <span className={`${comfortaa.className} pb-1 text-[0.58rem] font-bold uppercase tracking-[0.24em] text-black/34 sm:text-[0.66rem] xl:text-xs`}>
              phase
            </span>
          </div>

          <div
            data-showcase-workflow
            className={`${comfortaa.className} rounded-full border border-black/10 bg-[#171717] px-3 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-white sm:px-4 sm:text-[0.62rem] xl:py-2 xl:text-[0.68rem]`}
          >
            Workflow
          </div>
        </div>

        <div className="px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5 xl:px-6 xl:pb-6 xl:pt-6">
          <div
            data-showcase-chip
            className={`${comfortaa.className} mb-3 inline-flex -rotate-[1.5deg] rounded-full border border-black/10 bg-white/82 px-4 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#3d3734] sm:text-[0.66rem] xl:mb-4 xl:py-2 xl:text-[0.72rem]`}
          >
            How we work
          </div>

          <h2
            data-showcase-title
            className={`${baumans.className} max-w-[8.5ch] text-[clamp(2.45rem,4.6vw,4.2rem)] leading-[0.88] tracking-[-0.045em] text-[#171717] sm:text-[clamp(2.8rem,4.8vw,4.65rem)] xl:text-[clamp(3.3rem,5.1vw,5.55rem)]`}
          >
            {slide.title}
          </h2>

          <p
            data-showcase-body
            className={`${comfortaa.className} mt-3 max-w-[32rem] text-[clamp(0.88rem,0.98vw,1rem)] leading-[1.72] text-[#2f2a28] sm:text-[clamp(0.94rem,1.04vw,1.06rem)] xl:mt-4 xl:text-[clamp(1rem,1.08vw,1.12rem)] xl:leading-[1.82]`}
          >
            {slide.body}
          </p>

          <div className="mt-4 space-y-2.5 sm:space-y-3 xl:mt-6 xl:space-y-3.5">
            {slide.bullets.map((bullet, index) => (
              <div
                key={bullet.title}
                data-showcase-bullet
                className="rounded-[1.25rem] border border-black/10 bg-white/80 px-4 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.04)] sm:px-4.5 sm:py-3.5 xl:rounded-[1.45rem] xl:px-5 xl:py-4"
              >
                <div className="flex items-start gap-4">
                  <div className={`${baumans.className} flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.95rem] bg-[#171717] text-[0.92rem] text-white xl:h-11 xl:w-11 xl:rounded-[1rem] xl:text-[1rem]`}>
                    0{index + 1}
                  </div>

                  <div className="min-w-0">
                    <div className={`${comfortaa.className} text-[clamp(0.92rem,1vw,1.06rem)] font-bold leading-5 text-[#171717] xl:text-[clamp(1rem,1.08vw,1.16rem)] xl:leading-6`}>
                      {bullet.title}
                    </div>
                    <p className={`${comfortaa.className} mt-1 text-[clamp(0.82rem,0.94vw,0.92rem)] leading-5 text-[#746b67] xl:text-[clamp(0.9rem,1vw,1rem)] xl:leading-6`}>
                      {bullet.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ShowcasePanel({
  slide,
  panelWidth,
  contentRef,
  panelRef,
}: {
  slide: ShowcaseSlide;
  panelWidth: string;
  contentRef?: (node: HTMLDivElement | null) => void;
  panelRef?: (node: HTMLElement | null) => void;
}) {
  return (
    <article
      ref={panelRef}
      className="relative flex h-full min-h-screen shrink-0 items-start overflow-hidden py-10 xl:items-center xl:py-0"
      style={{ backgroundColor: slide.background, width: panelWidth }}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(circle at 16% 20%, rgba(255,255,255,0.22), transparent 18%), radial-gradient(circle at 82% 26%, rgba(255,255,255,0.14), transparent 16%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.1), transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.05))",
        }}
      />

      <div
        ref={contentRef}
        className="relative mx-auto grid w-full max-w-[min(40rem,86vw)] grid-cols-1 items-start gap-5 px-6 py-2 lg:max-w-[min(44rem,88vw)] lg:px-7 xl:max-w-[86vw] xl:grid-cols-[1.16fr_0.84fr] xl:items-center xl:gap-8 xl:px-14 xl:py-8"
      >
        <div className="relative w-full max-w-[34rem] justify-self-center xl:max-w-none xl:justify-self-auto">
          <div className="mb-5 -rotate-[2deg]">
            <RoughBubble slide={slide} />
          </div>

          <DotLottieReact
            src={slide.lottieSrc}
            loop
            autoplay
            className="aspect-[4/3] w-full max-h-[17rem] lg:max-h-[21rem] xl:max-h-[46rem]"
          />
        </div>

        <div className="relative flex w-full justify-center">
          <WorkflowCalendarCard slide={slide} />
        </div>
      </div>
    </article>
  );
}

function ShowcaseMobileCard({
  slide,
}: {
  slide: ShowcaseSlide;
}) {
  return (
    <article
      className="relative overflow-hidden px-5 py-16 sm:px-8"
      style={{ backgroundColor: slide.background }}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 20%, rgba(255,255,255,0.2), transparent 18%), radial-gradient(circle at 80% 24%, rgba(255,255,255,0.14), transparent 14%), linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.05))",
        }}
      />

      <div className="relative mx-auto flex max-w-[38rem] flex-col gap-8">
        <div className="-rotate-[2deg]">
          <RoughBubble slide={slide} />
        </div>

        <DotLottieReact
          src={slide.lottieSrc}
          loop
          autoplay
          className="h-[19rem] w-full sm:h-[24rem]"
        />

        <WorkflowCalendarCard slide={slide} mobile />
      </div>
    </article>
  );
}

export function CreativeShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopViewportRef = useRef<HTMLDivElement>(null);
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const panelContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const desktopPanelRefs = useRef<(HTMLElement | null)[]>([]);
  const desktopScrollProgressRef = useRef(0);
  const [desktopViewportHeight, setDesktopViewportHeight] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const updateDesktopViewportHeight = () => {
      if (window.innerWidth < 768) {
        setDesktopViewportHeight(null);
        return;
      }

      const tallestPanel = panelContentRefs.current.reduce((maxHeight, node) => {
        if (!node) {
          return maxHeight;
        }

        return Math.max(maxHeight, node.getBoundingClientRect().height);
      }, 0);

      if (!tallestPanel) {
        return;
      }

      const compactStackedLayout = window.innerWidth < 1280;

      if (compactStackedLayout) {
        setDesktopViewportHeight(window.innerHeight);
        return;
      }

      const nextHeight = Math.max(window.innerHeight, Math.ceil(tallestPanel));

      setDesktopViewportHeight((currentHeight) =>
        currentHeight === nextHeight ? currentHeight : nextHeight,
      );
    };

    updateDesktopViewportHeight();

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            updateDesktopViewportHeight();
          });

    panelContentRefs.current.forEach((node) => {
      if (node) {
        resizeObserver?.observe(node);
      }
    });

    window.addEventListener("resize", updateDesktopViewportHeight);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateDesktopViewportHeight);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = desktopViewportRef.current;
    const track = desktopTrackRef.current;

    if (!section || !viewport || !track) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const getDistance = () =>
        Math.max(track.scrollWidth - viewport.clientWidth, 0);

      gsap.set(track, { x: 0 });
      desktopScrollProgressRef.current = 0;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: viewport,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: viewport,
          scrub: 1,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            desktopScrollProgressRef.current = self.progress;
          },
        },
      });

      const animationContext = gsap.context(() => {
        desktopPanelRefs.current.forEach((panel) => {
          if (!panel) {
            return;
          }

          const calendarCard = panel.querySelector<HTMLElement>(
            "[data-showcase-card]",
          );
          const chip = panel.querySelector<HTMLElement>("[data-showcase-chip]");
          const stage = panel.querySelector<HTMLElement>("[data-showcase-stage]");
          const workflow = panel.querySelector<HTMLElement>(
            "[data-showcase-workflow]",
          );
          const title = panel.querySelector<HTMLElement>("[data-showcase-title]");
          const body = panel.querySelector<HTMLElement>("[data-showcase-body]");
          const bullets = panel.querySelectorAll<HTMLElement>(
            "[data-showcase-bullet]",
          );

          if (
            !calendarCard ||
            !chip ||
            !stage ||
            !workflow ||
            !title ||
            !body ||
            bullets.length === 0
          ) {
            return;
          }

          gsap.set(chip, {
            autoAlpha: 0,
            rotate: -5,
            y: 20,
          });
          gsap.set([stage, workflow], {
            autoAlpha: 0,
            y: 14,
          });
          gsap.set(title, {
            autoAlpha: 0,
            filter: "blur(14px)",
            scale: 0.94,
            transformOrigin: "left top",
            y: 42,
          });
          gsap.set(body, {
            autoAlpha: 0,
            filter: "blur(8px)",
            y: 24,
          });
          gsap.set(bullets, {
            autoAlpha: 0,
            scale: 0.96,
            transformOrigin: "center top",
            y: 26,
          });

          const timeline = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: calendarCard,
              containerAnimation: tween,
              start: "left 78%",
              end: "left 46%",
              scrub: 0.85,
            },
          });

          timeline
            .to(
              chip,
              {
                autoAlpha: 1,
                rotate: -1.5,
                y: 0,
                duration: 0.18,
              },
              0,
            )
            .to(
              [stage, workflow],
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.18,
                stagger: 0.05,
              },
              0.04,
            )
            .to(
              title,
              {
                autoAlpha: 1,
                filter: "blur(0px)",
                scale: 1,
                y: 0,
                duration: 0.24,
              },
              0.1,
            )
            .to(
              body,
              {
                autoAlpha: 1,
                filter: "blur(0px)",
                y: 0,
                duration: 0.18,
              },
              0.18,
            )
            .to(
              bullets,
              {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                duration: 0.16,
                stagger: 0.06,
              },
              0.24,
            );
        });
      }, viewport);

      return () => {
        desktopScrollProgressRef.current = 0;
        animationContext.revert();
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [desktopViewportHeight]);

  return (
      <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden bg-[#09b7ea] py-8 md:py-0"
    >
      <div className="md:hidden">
        {slides.map((slide) => (
          <ShowcaseMobileCard
            key={slide.title}
            slide={slide}
          />
        ))}
      </div>

      <div
        ref={desktopViewportRef}
        className="relative hidden min-h-screen overflow-hidden md:block"
        style={
          desktopViewportHeight
            ? { height: `${desktopViewportHeight}px` }
            : undefined
        }
      >
        {desktopViewportHeight ? (
          <PaperPlaneProgressOverlay progressRef={desktopScrollProgressRef} />
        ) : null}

        <div
          ref={desktopTrackRef}
          className="flex h-full"
          style={{ width: `${slides.length * 100}%` }}
        >
          {slides.map((slide, index) => (
            <ShowcasePanel
              key={slide.title}
              slide={slide}
              panelWidth={`${100 / slides.length}%`}
              panelRef={(node) => {
                desktopPanelRefs.current[index] = node;
              }}
              contentRef={(node) => {
                panelContentRefs.current[index] = node;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
