"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { RoughSVG } from "roughjs/bin/svg";

type RoughFillStyle =
  | "hachure"
  | "solid"
  | "zigzag"
  | "cross-hatch"
  | "dots"
  | "dashed"
  | "zigzag-line";

type SketchFrameProps = {
  children: ReactNode;
  className?: string;
  fill: string;
  stroke: string;
  strokeWidth?: number;
  roughness?: number;
  bowing?: number;
  inset?: number;
  radius?: number;
  fillStyle?: RoughFillStyle;
  fillWeight?: number;
  hachureGap?: number;
  hachureAngle?: number;
  overlayFill?: string;
  overlayFillStyle?: RoughFillStyle;
  overlayFillWeight?: number;
  overlayHachureGap?: number;
  overlayHachureAngle?: number;
  accentStroke?: string;
};

export function SketchFrame({
  children,
  className,
  fill,
  stroke,
  strokeWidth = 2,
  roughness = 1.4,
  bowing = 2.2,
  inset = 2,
  radius = 28,
  fillStyle = "solid",
  fillWeight,
  hachureGap,
  hachureAngle,
  overlayFill,
  overlayFillStyle = "cross-hatch",
  overlayFillWeight = 1.15,
  overlayHachureGap = 10,
  overlayHachureAngle = 55,
  accentStroke,
}: SketchFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;

    if (!container || !svg) {
      return;
    }

    const draw = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) {
        return;
      }

      svg.replaceChildren();
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

      const rc = new RoughSVG(svg);
      const x = inset;
      const y = inset;
      const w = Math.max(width - inset * 2, 2);
      const h = Math.max(height - inset * 2, 2);
      const r = Math.min(radius, w / 2, h / 2);
      const roundedRectPath = [
        `M ${x + r} ${y}`,
        `H ${x + w - r}`,
        `Q ${x + w} ${y} ${x + w} ${y + r}`,
        `V ${y + h - r}`,
        `Q ${x + w} ${y + h} ${x + w - r} ${y + h}`,
        `H ${x + r}`,
        `Q ${x} ${y + h} ${x} ${y + h - r}`,
        `V ${y + r}`,
        `Q ${x} ${y} ${x + r} ${y}`,
        "Z",
      ].join(" ");

      const base = rc.path(roundedRectPath, {
        fill,
        fillStyle,
        fillWeight,
        hachureGap,
        hachureAngle,
        stroke,
        strokeWidth,
        roughness,
        bowing,
      });

      const overlay = overlayFill
        ? rc.path(roundedRectPath, {
            fill: overlayFill,
            fillStyle: overlayFillStyle,
            fillWeight: overlayFillWeight,
            hachureGap: overlayHachureGap,
            hachureAngle: overlayHachureAngle,
            stroke: "transparent",
            strokeWidth: 0,
            roughness: roughness + 0.35,
            bowing: bowing + 0.35,
          })
        : null;

      const accent = rc.path(roundedRectPath, {
        stroke: accentStroke ?? stroke,
        strokeWidth: Math.max(1, strokeWidth - 0.35),
        roughness: roughness + 0.55,
        bowing: bowing + 0.7,
      });

      svg.append(base);

      if (overlay) {
        svg.append(overlay);
      }

      svg.append(accent);
    };

    draw();

    const resizeObserver = new ResizeObserver(draw);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [
    accentStroke,
    bowing,
    fill,
    fillStyle,
    fillWeight,
    hachureAngle,
    hachureGap,
    inset,
    overlayFill,
    overlayFillStyle,
    overlayFillWeight,
    overlayHachureAngle,
    overlayHachureGap,
    radius,
    roughness,
    stroke,
    strokeWidth,
  ]);

  return (
    <div ref={containerRef} className={`relative ${className ?? ""}`}>
      <svg
        ref={svgRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        preserveAspectRatio="none"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
