"use client";

import { motion } from "motion/react";
import { useRef, useState, type RefObject } from "react";
import { twMerge } from "tailwind-merge";
import { SketchFrame } from "@/app/components/SketchFrame";
import { SquigglyText } from "@/components/ui/squiggly-text";

type GalleryCard = {
  alt: string;
  caption: string;
  className: string;
  left: string;
  rotate: string;
  src: string;
  sticker: string;
  top: string;
};

const galleryCards: GalleryCard[] = [
  {
    src: "https://images.unsplash.com/photo-1635373670332-43ea883bb081?q=80&w=2781&auto=format&fit=crop",
    alt: "Colorful abstract design materials spread across a desk",
    caption: "Color tests",
    sticker: "#ff8b5e",
    rotate: "-8deg",
    top: "18%",
    left: "6%",
    className: "w-36 sm:w-44 lg:w-56 xl:w-64 2xl:w-72",
  },
  {
    src: "https://images.unsplash.com/photo-1576174464184-fb78fe882bfd?q=80&w=2787&auto=format&fit=crop",
    alt: "Hands arranging pastel product boxes for a campaign shoot",
    caption: "Launch props",
    sticker: "#0ea5e9",
    rotate: "9deg",
    top: "40%",
    left: "75%",
    className: "w-28 sm:w-36 lg:w-44 xl:w-52",
  },
  {
    src: "https://images.unsplash.com/photo-1503751071777-d2918b21bbd9?q=80&w=2670&auto=format&fit=crop",
    alt: "Close-up of a bright lifestyle shoot with soft natural light",
    caption: "Hero still",
    sticker: "#facc15",
    rotate: "5deg",
    top: "56%",
    left: "19%",
    className: "w-44 sm:w-56 lg:w-72 xl:w-80 2xl:w-[22rem]",
  },
  {
    src: "https://images.unsplash.com/photo-1620428268482-cf1851a36764?q=80&w=2609&auto=format&fit=crop",
    alt: "Creative team reviewing packaging and color boards together",
    caption: "Review wall",
    sticker: "#fb7185",
    rotate: "-10deg",
    top: "68%",
    left: "8%",
    className: "w-40 sm:w-52 lg:w-64 xl:w-72",
  },
  {
    src: "https://images.unsplash.com/photo-1602212096437-d0af1ce0553e?q=80&w=2671&auto=format&fit=crop",
    alt: "Studio table with campaign notes and editorial references",
    caption: "Messy table",
    sticker: "#34d399",
    rotate: "11deg",
    top: "64%",
    left: "63%",
    className: "w-32 sm:w-40 lg:w-52 xl:w-60",
  },
  {
    src: "https://images.unsplash.com/photo-1622313762347-3c09fe5f2719?q=80&w=2640&auto=format&fit=crop",
    alt: "Phone mockup and interface sketches during content planning",
    caption: "Mobile draft",
    sticker: "#a78bfa",
    rotate: "-4deg",
    top: "12%",
    left: "44%",
    className: "w-32 sm:w-40 lg:w-48 xl:w-56",
  },
];

type DragCardProps = GalleryCard & {
  containerRef: RefObject<HTMLDivElement | null>;
};

function DragCard({
  containerRef,
  src,
  alt,
  top,
  left,
  rotate,
  className,
  caption,
  sticker,
}: DragCardProps) {
  const [zIndex, setZIndex] = useState(1);

  const updateZIndex = () => {
    const dragRoot = containerRef.current;

    if (!dragRoot) {
      return;
    }

    const elements = dragRoot.querySelectorAll(".gallery-drag-card");
    let maxZIndex = 0;

    elements.forEach((element) => {
      const nextZIndex = Number.parseInt(
        window.getComputedStyle(element).getPropertyValue("z-index"),
        10,
      );

      if (!Number.isNaN(nextZIndex) && nextZIndex > maxZIndex) {
        maxZIndex = nextZIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.figure
      drag
      dragConstraints={containerRef}
      dragElastic={0.16}
      dragMomentum={false}
      whileTap={{ scale: 1.03, cursor: "grabbing" }}
      onMouseDown={updateZIndex}
      onTouchStart={updateZIndex}
      style={{ top, left, rotate, zIndex }}
      className={twMerge(
        "gallery-drag-card absolute cursor-grab rounded-[1.45rem] border border-black/10 bg-[#fffaf3] p-2 pb-4 shadow-[0_18px_35px_rgba(0,0,0,0.16)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute left-4 top-3 h-3 w-14 rounded-full opacity-85 blur-[0.2px]"
        style={{ backgroundColor: sticker }}
      />
      <div
        role="img"
        aria-label={alt}
        className="pointer-events-none aspect-[4/5] w-full rounded-[1rem] bg-cover bg-center select-none"
        style={{ backgroundImage: `url(${src})` }}
      />
      <figcaption className="px-3 pt-3 font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#473f39] sm:text-[0.68rem]">
        {caption}
      </figcaption>
    </motion.figure>
  );
}

export function CreativeGallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="notes"
      ref={sectionRef}
      className="relative min-h-[72svh] overflow-hidden bg-[#fff8ef] px-5 py-[clamp(4rem,6vw,6rem)] sm:min-h-[76svh] sm:px-8 lg:min-h-[80svh] lg:px-12"
    >
      <div className="absolute inset-0 opacity-90">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(255, 205, 98, 0.28), transparent 18%), radial-gradient(circle at 84% 24%, rgba(9, 183, 234, 0.12), transparent 18%), linear-gradient(to bottom, rgba(197, 143, 113, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.28), rgba(255,255,255,0.06))",
            backgroundSize: "100% 100%, 100% 100%, 100% 2.35rem, 100% 100%",
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-5 top-1/2 z-20 -translate-y-1/2 sm:inset-x-8 lg:inset-x-12">
        <div className="mx-auto flex max-w-[46rem] flex-col items-center text-center">
          {/* <SketchFrame
            className="mb-5 inline-block px-4 py-2"
            fill="#fff8ef"
            stroke="#171717"
            strokeWidth={1.45}
            roughness={1.18}
            bowing={1.9}
            inset={1.15}
            radius={16}
            overlayFill="rgba(255,179,71,0.12)"
            overlayFillStyle="zigzag-line"
            overlayFillWeight={0.75}
            overlayHachureGap={11}
            overlayHachureAngle={24}
          >
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#9e4a18]">
              Work wall
            </p>
          </SketchFrame> */}

          <SquigglyText
            as="div"
            stepDuration={72}
            scale={[4, 6]}
            className="text-[clamp(3rem,6vw,6.2rem)] font-black leading-[0.9] tracking-[-0.07em] text-[#171717]"
          >
            <h2>
              Build{" "}
              <span className="text-[#09b7ea]">bold</span>.
              <br />
              Launch{" "}
              <span className="text-[#ff835f]">stories</span>.
            </h2>
          </SquigglyText>
        </div>

        {/* <p className="mt-6 max-w-[42rem] text-[0.98rem] leading-7 text-[#5d5149] sm:text-[1.04rem]">
          A loose little collage of the kind of references, textures, and
          campaign scraps that usually sit around our process. Move the cards
          around and let the section feel a bit alive.
        </p> */}
      </div>

      {/* <div className="pointer-events-none absolute inset-x-5 top-[clamp(18rem,30vw,22rem)] z-20 flex justify-between sm:inset-x-8 lg:inset-x-12">
        {["Campaign scraps", "Drag to explore"].map((label, index) => (
          <div
            key={label}
            className={twMerge(
              "rounded-full border border-black/10 bg-white/72 px-4 py-2 font-[family:var(--font-geist-mono)] text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#5e534b] shadow-[0_8px_16px_rgba(0,0,0,0.05)]",
              index === 1 ? "hidden sm:block" : "",
            )}
          >
            {label}
          </div>
        ))}
      </div> */}

      {galleryCards.map((card) => (
        <DragCard key={card.caption} containerRef={sectionRef} {...card} />
      ))}
    </section>
  );
}
