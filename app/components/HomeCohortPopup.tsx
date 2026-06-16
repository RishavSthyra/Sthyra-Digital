"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiClock, FiX, FiZap } from "react-icons/fi";
import { CalendlyModal } from "@/app/components/CalendlyModal";

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
      {isPopupOpen ? (
        <div className="fixed inset-0 z-[9998] bg-[#08112d]/72 backdrop-blur-md">
          <button
            type="button"
            aria-label="Dismiss cohort popup"
            onClick={handleDismiss}
            className="absolute inset-0 bg-transparent"
          />

          <div className="pointer-events-none fixed inset-0 flex items-center justify-center px-4 py-6 sm:px-6">
            <div className="pointer-events-auto relative w-full max-w-[32rem] overflow-hidden rounded-[2rem] border border-[#171717]/12 bg-[#fff8ef] p-6 text-[#171717] shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:p-7">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-80"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 16% 18%, rgba(255,210,63,0.14), transparent 22%), radial-gradient(circle at 84% 24%, rgba(255,93,143,0.12), transparent 20%), linear-gradient(180deg, rgba(255,255,255,0.45), rgba(255,255,255,0))",
                }}
              />

              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/92 text-[#171717] transition hover:bg-black hover:text-white"
              >
                <FiX className="h-4.5 w-4.5" aria-hidden="true" />
              </button>

              <div className="relative">
                <div className="inline-flex rounded-full bg-[#ffd23f] px-4 py-2 font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#3b2b00]">
                  The Elevate Starter Kit
                </div>

                <h2 className="mt-5 max-w-[13ch] text-[clamp(2rem,5vw,3rem)] font-semibold leading-[0.92] tracking-[-0.06em]">
                  50 web slots. 30 growth slots.
                </h2>

                <p className="mt-4 max-w-[30rem] text-[0.98rem] leading-7 text-[#5b4d45]">
                  A closed cohort for brands that want a custom web build or a
                  tighter growth system before the pricing resets.
                </p>

                <div className="mt-5 flex flex-wrap gap-3 text-[0.78rem] font-medium text-[#5b4d45]">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/76 px-3 py-2">
                    <FiClock className="h-3.5 w-3.5 text-[#0b1230]" aria-hidden="true" />
                    7-day web sprint
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/76 px-3 py-2">
                    <FiZap className="h-3.5 w-3.5 text-[#c2175c]" aria-hidden="true" />
                    30-day growth loop
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleBookCall}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#171717] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                  >
                    Book a 30-min call
                  </button>
                  <Link
                    href="/elevate-starter-kit"
                    onClick={handleDismiss}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/12 bg-white px-5 py-3 text-sm font-semibold text-[#171717] transition hover:-translate-y-0.5"
                  >
                    See cohort details
                    <FiArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <CalendlyModal
        open={isCalendlyOpen}
        url={CALENDLY_URL}
        onClose={() => setIsCalendlyOpen(false)}
      />
    </>
  );
}
