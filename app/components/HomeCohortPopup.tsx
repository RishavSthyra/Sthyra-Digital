"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiClock, FiTrendingUp, FiX, FiZap } from "react-icons/fi";
import { CalendlyModal } from "@/app/components/CalendlyModal";
import { SketchFrame } from "@/app/components/SketchFrame";

const CALENDLY_URL = "https://calendly.com/rishav-sthyra/30min";
const STORAGE_KEY = "sthyra-home-cohort-popup-dismissed";
const POPUP_DELAY_MS = 20_000;

function hasScrolledHalfway() {
  const scrollTop = window.scrollY;
  const viewportHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollableHeight = documentHeight - viewportHeight;

  if (scrollableHeight <= 0) {
    return false;
  }

  return scrollTop / scrollableHeight >= 0.5;
}

export function HomeCohortPopup() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.sessionStorage.getItem(STORAGE_KEY) === "true") {
      return;
    }

    const openPopup = () => {
      if (hasTriggeredRef.current) {
        return;
      }

      hasTriggeredRef.current = true;
      setIsPopupOpen(true);
      window.removeEventListener("scroll", onScroll);
    };

    const onScroll = () => {
      if (hasScrolledHalfway()) {
        window.clearTimeout(timerId);
        openPopup();
      }
    };

    const timerId = window.setTimeout(() => {
      openPopup();
    }, POPUP_DELAY_MS);

    window.addEventListener("scroll", onScroll, { passive: true });

    if (hasScrolledHalfway()) {
      window.clearTimeout(timerId);
      openPopup();
    }

    return () => {
      window.clearTimeout(timerId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isPopupOpen) {
      return;
    }

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleDismiss();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isPopupOpen]);

  function handleDismiss() {
    setIsPopupOpen(false);
    setIsCalendlyOpen(false);

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(STORAGE_KEY, "true");
    }
  }

  function handleBookCall() {
    setIsPopupOpen(false);
    setIsCalendlyOpen(true);

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(STORAGE_KEY, "true");
    }
  }

  return (
    <>
      <AnimatePresence>
        {isPopupOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="fixed inset-0 z-[9998] bg-[#08112d]/74 backdrop-blur-md"
            onClick={handleDismiss}
          >
            <div className="flex min-h-dvh items-center justify-center overflow-y-auto px-3 py-4 sm:px-6 sm:py-6">
              <motion.section
                role="dialog"
                aria-modal="true"
                aria-labelledby="home-cohort-popup-title"
                initial={{ opacity: 0, y: 28, scale: 0.975 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.985 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-[64rem]"
                onClick={(event) => event.stopPropagation()}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-6 top-10 h-24 w-24 rounded-full bg-[#22d3ee]/24 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-3 bottom-4 h-28 w-28 rounded-full bg-[#ff5d8f]/18 blur-3xl"
                />

                <SketchFrame
                  className="overflow-hidden px-3 py-3 sm:px-4 sm:py-4"
                  fill="#0b1230"
                  stroke="#171717"
                  strokeWidth={2.2}
                  roughness={1.18}
                  bowing={1.95}
                  inset={2}
                  radius={34}
                  overlayFill="rgba(255,255,255,0.04)"
                  overlayFillStyle="cross-hatch"
                  overlayFillWeight={0.9}
                  overlayHachureGap={12}
                  overlayHachureAngle={32}
                  accentStroke="#ffd23f"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 12% 14%, rgba(34,211,238,0.14), transparent 24%), radial-gradient(circle at 88% 18%, rgba(255,93,143,0.16), transparent 22%), radial-gradient(circle at 72% 84%, rgba(255,210,63,0.09), transparent 26%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                      backgroundSize:
                        "100% 100%, 100% 100%, 100% 100%, 1.3rem 1.3rem, 1.3rem 1.3rem",
                    }}
                  />
                  <div className="hero-noise absolute inset-0 opacity-16 mix-blend-soft-light" />

                  <button
                    type="button"
                    onClick={handleDismiss}
                    aria-label="Dismiss cohort popup"
                    className="absolute right-5 top-5 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/25 bg-[#fff8ef] text-[#171717] shadow-[4px_4px_0_rgba(0,0,0,0.32)] transition hover:-translate-y-0.5 hover:rotate-6"
                  >
                    <FiX className="h-4.5 w-4.5" aria-hidden="true" />
                  </button>

                  <div className="relative z-10 grid gap-4 lg:grid-cols-[minmax(0,1.22fr)_minmax(21rem,0.92fr)]">
                    <div className="px-3 pb-3 pt-12 sm:px-5 sm:pb-5 sm:pt-14 lg:pr-3">
                      <SketchFrame
                        className="inline-block px-4 py-2"
                        fill="#ffd23f"
                        stroke="#171717"
                        strokeWidth={1.8}
                        roughness={1.16}
                        bowing={1.8}
                        inset={1.3}
                        radius={999}
                        overlayFill="rgba(23,23,23,0.06)"
                        overlayFillStyle="zigzag-line"
                        overlayFillWeight={0.76}
                        overlayHachureGap={10}
                        overlayHachureAngle={22}
                      >
                        <span className="font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#3b2b00]">
                          The Elevate Starter Kit
                        </span>
                      </SketchFrame>

                      <h2
                        id="home-cohort-popup-title"
                        className="mt-5 max-w-[13ch] text-[clamp(2.35rem,5.2vw,4.15rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-white"
                      >
                        50 web slots.
                        <br />
                        30 growth slots.
                      </h2>

                      <p className="mt-4 max-w-[34rem] text-[0.96rem] leading-7 text-white/72 sm:text-[0.98rem]">
                        A limited cohort for brands that want a sharper website,
                        a tighter acquisition system, and locked pricing before
                        the next reset lands.
                      </p>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-3.5 py-2 text-[0.8rem] font-medium text-white/88 backdrop-blur-sm">
                          <FiClock
                            className="h-3.5 w-3.5 text-[#ffd23f]"
                            aria-hidden="true"
                          />
                          7-day web sprint
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-3.5 py-2 text-[0.8rem] font-medium text-white/88 backdrop-blur-sm">
                          <FiZap
                            className="h-3.5 w-3.5 text-[#ff5d8f]"
                            aria-hidden="true"
                          />
                          30-day growth loop
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-3.5 py-2 text-[0.8rem] font-medium text-white/88 backdrop-blur-sm">
                          <FiTrendingUp
                            className="h-3.5 w-3.5 text-[#22d3ee]"
                            aria-hidden="true"
                          />
                          cohort pricing still active
                        </div>
                      </div>

                      <div className="mt-7 flex max-w-[34rem] flex-wrap gap-3 text-[0.82rem] leading-6 text-white/60">
                        <span>Custom build with stronger architecture.</span>
                        <span className="text-[#ffd23f]">Slots close when they fill.</span>
                        <span>Not when the month ends.</span>
                      </div>
                    </div>

                    <div className="relative px-2 pb-2 sm:px-4 sm:pb-4 lg:px-1 lg:pb-0">
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-8 top-0 h-16 w-28 rotate-[-7deg] rounded-[1.1rem] bg-[#fff3a8]/88 shadow-[0_14px_32px_rgba(0,0,0,0.12)]"
                      />

                      <SketchFrame
                        className="h-full px-5 py-5 sm:px-6 sm:py-6"
                        fill="#fff8ef"
                        stroke="#171717"
                        strokeWidth={2}
                        roughness={1.14}
                        bowing={1.8}
                        inset={1.6}
                        radius={28}
                        overlayFill="rgba(255,210,63,0.12)"
                        overlayFillStyle="hachure"
                        overlayFillWeight={0.82}
                        overlayHachureGap={12}
                        overlayHachureAngle={24}
                        accentStroke="#171717"
                      >
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 opacity-85"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle at 84% 14%, rgba(255,93,143,0.12), transparent 24%), radial-gradient(circle at 12% 86%, rgba(34,211,238,0.12), transparent 20%), linear-gradient(180deg, rgba(255,255,255,0.38), rgba(255,255,255,0))",
                          }}
                        />

                        <div className="relative z-10">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#6b625b]">
                                current release
                              </p>
                              <h3 className="font-cabin-sketch mt-2 max-w-[12ch] text-[clamp(1.7rem,4vw,2.5rem)] leading-[0.94] text-[#171717]">
                                Pick your lane before the reset.
                              </h3>
                            </div>
                          </div>

                          <div className="mt-5 grid grid-cols-2 gap-3">
                            <div className="rounded-[1.25rem] border border-black/10 bg-white/78 p-3.5 shadow-[0_12px_24px_rgba(0,0,0,0.06)]">
                              <p className="font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#7a6e67]">
                                web build
                              </p>
                              <p className="mt-2 text-[2rem] font-semibold leading-none tracking-[-0.06em] text-[#171717]">
                                50
                              </p>
                              <p className="mt-1 text-[0.82rem] text-[#5f5148]">
                                fast-turn custom slots
                              </p>
                            </div>

                            <div className="rounded-[1.25rem] border border-black/10 bg-white/78 p-3.5 shadow-[0_12px_24px_rgba(0,0,0,0.06)]">
                              <p className="font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#7a6e67]">
                                growth loop
                              </p>
                              <p className="mt-2 text-[2rem] font-semibold leading-none tracking-[-0.06em] text-[#171717]">
                                30
                              </p>
                              <p className="mt-1 text-[0.82rem] text-[#5f5148]">
                                performance-focused seats
                              </p>
                            </div>
                          </div>

                          <div className="mt-5 rounded-[1.35rem] border border-dashed border-black/16 bg-white/62 p-4">
                            <p className="font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#6c6157]">
                              what this gets you
                            </p>
                            <div className="mt-3 space-y-2.5 text-[0.9rem] leading-6 text-[#443831]">
                              <div className="flex items-start gap-2">
                                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#ffd23f]" />
                                Stronger web architecture and cleaner delivery.
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#ff5d8f]" />
                                A sharper growth loop before standard pricing returns.
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 flex flex-col gap-3">
                            <button
                              type="button"
                              onClick={handleBookCall}
                              className="font-cabin-sketch inline-flex items-center justify-center gap-2 rounded-full border-2 border-black/25 bg-[#ffd23f] px-5 py-3 text-[1.05rem] text-[#171717] shadow-[4px_4px_0_rgba(0,0,0,0.24)] transition hover:-translate-y-0.5 hover:rotate-[-1.5deg]"
                            >
                              Book a 30-min call
                            </button>
                            <Link
                              href="/elevate-starter-kit"
                              onClick={handleDismiss}
                              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/12 bg-white px-5 py-3 text-sm font-semibold text-[#171717] shadow-[0_10px_22px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5"
                            >
                              See cohort details
                              <FiArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                          </div>
                        </div>
                      </SketchFrame>
                    </div>
                  </div>
                </SketchFrame>
              </motion.section>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <CalendlyModal
        open={isCalendlyOpen}
        url={CALENDLY_URL}
        onClose={() => setIsCalendlyOpen(false)}
      />
    </>
  );
}
