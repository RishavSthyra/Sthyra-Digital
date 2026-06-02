"use client";

import React, { useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";

export interface SquigglyTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  steps?: number;
  stepDuration?: number;
  scale?: number | [number, number];
  baseFrequency?: number;
  numOctaves?: number;
  as?: "span" | "div";
}

export function SquigglyText({
  children,
  steps = 5,
  stepDuration = 80,
  scale = [6, 8],
  baseFrequency = 0.02,
  numOctaves = 3,
  as = "span",
  className,
  style,
}: SquigglyTextProps) {
  const reactId = useId();
  const safeId = reactId.replace(/[:_]/g, "");
  const filterId = (i: number) => `squiggly-${safeId}-${i}`;

  const filters = Array.from({ length: steps }, (_, i) => `url(#${filterId(i)})`);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (filters.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % filters.length);
    }, stepDuration);

    return () => window.clearInterval(interval);
  }, [filters.length, stepDuration]);

  const scaleAt = (i: number) =>
    Array.isArray(scale) ? scale[i % scale.length] : scale;

  const Wrapper = as;

  return (
    <Wrapper
      style={{ filter: filters[activeStep], ...style }}
      className={cn("relative inline-block will-change-[filter]", className)}
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute h-0 w-0 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {Array.from({ length: steps }).map((_, i) => (
            <filter id={filterId(i)} key={i}>
              <feTurbulence
                baseFrequency={baseFrequency}
                numOctaves={numOctaves}
                result="noise"
                seed={i}
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={scaleAt(i)}
              />
            </filter>
          ))}
        </defs>
      </svg>
      {children}
    </Wrapper>
  );
}
