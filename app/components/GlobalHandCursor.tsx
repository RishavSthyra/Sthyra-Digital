"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ContactNotebookPopup } from "@/app/components/ContactNotebookPopup";

const tooltipOffset = { x: 22, y: 18 };
const sparkleOffset = { x: 1, y: -10 };

export function GlobalHandCursor() {
  const paperAudioRef = useRef<HTMLAudioElement | null>(null);
  const sparkleRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const audio = new Audio("/audio/makigai_maimai-paper-245786.mp3");
    audio.preload = "auto";
    paperAudioRef.current = audio;

    return () => {
      audio.pause();
      paperAudioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const sparkleNode = sparkleRef.current;
    const tooltipNode = tooltipRef.current;

    if (!sparkleNode || !tooltipNode || typeof window === "undefined") {
      return;
    }

    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (!finePointerQuery.matches) {
      return;
    }

    const syncTooltipPosition = () => {
      frameRef.current = null;
      tooltipNode.style.transform = `translate3d(${pointerRef.current.x + tooltipOffset.x}px, ${pointerRef.current.y + tooltipOffset.y}px, 0)`;
    };

    const handlePointerMove = (event: MouseEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(syncTooltipPosition);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      sparkleNode.style.left = `${event.clientX + sparkleOffset.x}px`;
      sparkleNode.style.top = `${event.clientY + sparkleOffset.y}px`;
      sparkleNode.classList.remove("cursor-click-sparkle-active");

      // Force a reflow so the same animation can restart on rapid clicks.
      void sparkleNode.offsetWidth;

      sparkleNode.classList.add("cursor-click-sparkle-active");
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, {
      passive: true,
    });

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const playPaperSound = () => {
    const audio = paperAudioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = 0;
    void audio.play().catch(() => {});
  };

  const openNotebook = () => {
    if (isNotebookOpen) {
      return;
    }

    playPaperSound();
    setIsNotebookOpen(true);
  };

  const closeNotebook = () => {
    if (!isNotebookOpen) {
      return;
    }

    playPaperSound();
    setIsNotebookOpen(false);
  };

  return (
    <>
      <ContactNotebookPopup
        isOpen={isNotebookOpen}
        onClose={closeNotebook}
      />

      <div className="pointer-events-none fixed inset-x-0 top-0 z-[140]">
        <button
          type="button"
          aria-label="Open contact notebook"
          className="group pointer-events-auto absolute right-2 top-0 flex h-[7.75rem] w-[4.5rem] -translate-y-[18%] rotate-180 items-start justify-center border-0 bg-transparent p-0 sm:right-3 sm:h-[9rem] sm:w-[5.25rem] md:right-4 md:h-[10.5rem] md:w-[6rem] xl:right-6 xl:h-[11.5rem] xl:w-[6.75rem]"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={openNotebook}
        >
          <span className="relative block h-full w-full">
            <Image
              src="/0001.svg"
              alt=""
              fill
              priority
              sizes="(max-width: 640px) 72px, (max-width: 1024px) 96px, 108px"
              className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          </span>
        </button>
      </div>

      <div
        ref={tooltipRef}
        className={`pointer-events-none fixed left-0 top-0 z-[150] hidden -translate-x-1/2 -translate-y-1/2 transition-[opacity,scale] duration-300 ease-out sm:block ${showTooltip ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        aria-hidden="true"
      >
        <span className="block rounded-full border-2 border-black bg-[#fff5df] px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.24em] text-black shadow-[3px_3px_0_rgba(0,0,0,0.18)]">
          Open note
        </span>
      </div>

      <div
        ref={sparkleRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[160] hidden -translate-x-1/2 -translate-y-1/2 opacity-0 sm:block"
      >
        <svg
          viewBox="0 0 48 48"
          className="h-8 w-8 drop-shadow-[1px_2px_0_rgba(0,0,0,0.16)]"
        >
          <g
            fill="none"
            stroke="#101010"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.8"
          >
            <path d="M23 6.5L23.4 13.5" />
            <path d="M11 11L16 15.6" />
            <path d="M7.5 22.8L14.8 22.2" />
            <path d="M12.8 33.4L18 28.6" />
            <path d="M34.5 11.2L29.4 15.9" />
            <path d="M38.6 21.9L31.8 21.7" />
            <path d="M21.4 18.2C22.6 16.6 24.7 16 26.4 16.8" />
            <path d="M20.8 27.6C22.3 29 24.5 29.4 26.2 28.6" />
          </g>
          <g
            fill="none"
            stroke="#f6b6d6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.35"
            opacity="0.95"
          >
            <path d="M24.5 8.2L24.8 12" />
            <path d="M13.4 12.8L16.2 15.4" />
            <path d="M10 23L14 22.7" />
            <path d="M31.3 15.2L34.1 12.8" />
            <path d="M32 21.7L36.1 21.7" />
          </g>
        </svg>
      </div>
    </>
  );
}
