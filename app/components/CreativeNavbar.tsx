"use client";

import Image from "next/image";
import Link from "next/link";
import type { RefObject } from "react";
import { SketchFrame } from "@/app/components/SketchFrame";

const navItems = [
  { href: "#top", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/elevate-starter-kit", label: "Cohort", highlight: true },
  { href: "#notes", label: "Work" },
  { href: "#contact", label: "Studio" },
];

const sketchBursts = [
  { color: "#ff6ea9", size: "h-4 w-4", twist: "-rotate-[14deg]" },
  { color: "#7fd54c", size: "h-[1.05rem] w-[1.05rem]", twist: "rotate-[12deg]" },
  { color: "#1f8fff", size: "h-4 w-4", twist: "-rotate-[8deg]" },
  { color: "#ffb347", size: "h-3.5 w-3.5", twist: "rotate-[18deg]" },
];

type CreativeNavbarProps = {
  headerRef: RefObject<HTMLElement | null>;
};

type TalkButtonProps = {
  className: string;
  textClassName: string;
};

function TalkButton({ className, textClassName }: TalkButtonProps) {
  return (
    <SketchFrame
      className={className}
      fill="#e0314b"
      stroke="#e0314b"
      strokeWidth={1.55}
      roughness={1.65}
      bowing={2.45}
      inset={1.2}
      radius={18}
      overlayFill="rgba(138, 10, 30, 0.38)"
      overlayFillStyle="zigzag-line"
      overlayFillWeight={1.15}
      overlayHachureGap={9}
      overlayHachureAngle={28}
      accentStroke="#e0314b"
    >
      <a
        href="mailto:hello@sthyra.digital"
        className={`block transition duration-300 hover:-translate-y-0.5 ${textClassName}`}
      >
        Let&apos;s talk
      </a>
    </SketchFrame>
  );
}

export function CreativeNavbar({ headerRef }: CreativeNavbarProps) {
  return (
    <header
      ref={headerRef}
      className="z-40 flex items-center justify-between gap-4"
    >
      <Link
        href="#top"
        className="transition hover:opacity-85"
        aria-label="Sthyra Digital home"
      >
        <Image
          src="/Sthyra_Logo_Png.png"
          alt="Sthyra Digital"
          width={3508}
          height={1168}
          priority
          className="h-auto w-[8rem] sm:w-[9.25rem] lg:w-[10rem]"
        />
      </Link>

      <SketchFrame
        className="hidden px-5 py-3.5 lg:block xl:px-6"
        fill="#fff8ef"
        stroke="#171717"
        strokeWidth={1.8}
        roughness={1.22}
        bowing={2.1}
        inset={1.5}
        radius={30}
        overlayFill="rgba(255, 154, 131, 0.18)"
        overlayFillStyle="zigzag-line"
        overlayFillWeight={0.95}
        overlayHachureGap={18}
        overlayHachureAngle={24}
      >
        <div className="flex items-center gap-6 text-[0.95rem] text-black xl:gap-7">
          <div className="relative flex items-center gap-2 pr-2">
            {sketchBursts.map((burst) => (
              <span
                key={`${burst.color}-${burst.twist}`}
                aria-hidden="true"
                className={`hero-burst block ${burst.size} ${burst.twist} shadow-[1px_2px_0_rgba(0,0,0,0.18)]`}
                style={{ backgroundColor: burst.color }}
              />
            ))}
          </div>

          {navItems.map((item) => (
            <div key={item.label} className="flex items-center">
              <Link
                href={item.href}
                className={
                  item.highlight
                    ? "relative inline-flex items-center gap-1.5 rounded-full border-2 border-black/80 bg-[#ffe55a] px-3 py-1 text-[0.85rem] font-semibold uppercase tracking-[0.08em] text-[#171717] shadow-[2px_2px_0_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-0.5 hover:rotate-[-2deg]"
                    : "transition duration-300 hover:-translate-y-0.5 hover:text-black/70"
                }
              >
                {item.highlight ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e0314b]" aria-hidden="true" />
                ) : null}
                {item.label}
              </Link>
            </div>
          ))}

          <TalkButton
            className="ml-5 px-4 py-2.5"
            textClassName="font-semibold text-white"
          />
        </div>
      </SketchFrame>

      <div className="flex items-center gap-3">
        <span className="hidden font-[family:var(--font-geist-mono)] text-sm tracking-[0.08em] text-white/88 md:block">
          &nbsp;
        </span>
        <TalkButton
          className="px-4 py-2 lg:hidden"
          textClassName="text-sm font-semibold text-white"
        />
      </div>
    </header>
  );
}
