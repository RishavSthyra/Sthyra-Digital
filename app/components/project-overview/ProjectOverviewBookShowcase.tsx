"use client";

import { Float, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { AnimatedBook } from "@/app/components/project-overview/AnimatedBook";
import { bookSpreads } from "@/app/components/project-overview/book-data";
import { SketchFrame } from "@/app/components/SketchFrame";
import { SquigglyText } from "@/components/ui/squiggly-text";

function BookScene({
  page,
  setPage,
  cameraDistance,
}: {
  cameraDistance: number;
  page: number;
  setPage: (nextPage: number) => void;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [-0.4, 0.9, cameraDistance], fov: 42 }}
    >
      <color attach="background" args={["#09b7ea"]} />
      <ambientLight intensity={1.15} />
      <hemisphereLight
        args={["#ffffff", "#7fd2ff", 1.2]}
        position={[0, 1, 0]}
      />
      <directionalLight
        castShadow
        intensity={2.8}
        position={[2.5, 5, 2.8]}
        shadow-bias={-0.0001}
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
      />
      <Suspense fallback={null}>
        <Float
          rotation-x={-Math.PI / 4}
          floatIntensity={1}
          speed={2}
          rotationIntensity={1.4}
        >
          <AnimatedBook page={page} setPage={setPage} />
        </Float>
      </Suspense>
      <mesh position-y={-1.7} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial opacity={0.16} transparent />
      </mesh>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxAzimuthAngle={Math.PI / 2.25}
        maxPolarAngle={Math.PI / 1.75}
        minAzimuthAngle={-Math.PI / 2.25}
        minPolarAngle={Math.PI / 3.2}
      />
    </Canvas>
  );
}

function pageLabel(index: number) {
  if (index === 0) {
    return "Cover";
  }

  if (index === bookSpreads.length) {
    return "Back";
  }

  return `Page ${index}`;
}

export function ProjectOverviewBookShowcase() {
  const [page, setPage] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1440);
  const hasMountedRef = useRef(false);

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
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const audio = new Audio("/project-overview/audios/page-flip-01a.mp3");
    audio.volume = 0.42;
    void audio.play().catch(() => {});
  }, [page]);

  const cameraDistance = useMemo(() => {
    if (viewportWidth < 640) {
      return 7.4;
    }

    if (viewportWidth < 1024) {
      return 5.9;
    }

    return 4.5;
  }, [viewportWidth]);

  return (
    <section className="relative overflow-hidden bg-[#09b7ea]">
      <div className="absolute inset-0 opacity-30">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 18%, rgba(255,255,255,0.16) 0, rgba(255,255,255,0.16) 1px, transparent 1.2px), radial-gradient(circle at 80% 32%, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 1px, transparent 1.2px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "16px 16px, 20px 20px, 100% 2rem",
          }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-[92rem] flex-col gap-8 px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="mx-auto max-w-[48rem] text-center text-white">
          <div className="inline-flex rounded-full border border-black/10 bg-[#fff8ef] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#9e4a18] shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
            Project overview
          </div>
          <h1 className="mt-5 font-display text-[clamp(2.9rem,7vw,5.8rem)] leading-[0.92] tracking-[-0.055em] text-[#fffaf2]">
            A book that flips through the{" "}
            <SquigglyText
              className="text-[#ffe55a]"
              scale={[4, 6]}
              stepDuration={76}
            >
              work
            </SquigglyText>
            .
          </h1>
          <p className="mx-auto mt-5 max-w-[38rem] text-[0.98rem] leading-7 text-[#eaf8ff] sm:text-[1.05rem]">
            Tap the pages, use the controls, and walk through a more tactile
            overview of the project. The book interaction is ported from the
            referenced repo and adapted to this site’s notebook-heavy world.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_minmax(0,18rem)] xl:items-start">
          <SketchFrame
            className="h-full px-5 py-5"
            fill="#fff8ef"
            stroke="#171717"
            strokeWidth={1.7}
            roughness={1.14}
            bowing={1.9}
            inset={1.4}
            radius={22}
            overlayFill="rgba(255, 171, 97, 0.08)"
            overlayFillStyle="zigzag-line"
            overlayFillWeight={0.82}
            overlayHachureGap={12}
            overlayHachureAngle={24}
          >
            <div className="space-y-5">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#9e4a18]">
                  Flip notes
                </p>
                <h3 className="mt-2 text-[1.45rem] font-semibold leading-[1.02] tracking-[-0.04em] text-[#171717]">
                  A more hands-on project intro.
                </h3>
              </div>
              <div className="space-y-3 text-sm leading-6 text-[#51443c]">
                <p>Click the book itself to keep turning forward.</p>
                <p>Use the page pills to jump straight to a spread.</p>
                <p>Drag gently to inspect the book from different angles.</p>
              </div>
            </div>
          </SketchFrame>

          <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.06))] shadow-[0_24px_60px_rgba(11,67,99,0.18)]">
            <div className="pointer-events-none absolute inset-x-6 top-5 h-px bg-white/24" />
            <div className="h-[26rem] sm:h-[32rem] lg:h-[38rem] xl:h-[42rem]">
              <BookScene
                cameraDistance={cameraDistance}
                page={page}
                setPage={setPage}
              />
            </div>
          </div>

          <SketchFrame
            className="h-full px-5 py-5"
            fill="#131c29"
            stroke="#84d4ff"
            strokeWidth={1.7}
            roughness={1.12}
            bowing={1.88}
            inset={1.4}
            radius={22}
            overlayFill="rgba(80, 176, 255, 0.12)"
            overlayFillStyle="cross-hatch"
            overlayFillWeight={0.88}
            overlayHachureGap={12}
            overlayHachureAngle={42}
            accentStroke="#84d4ff"
          >
            <div className="space-y-5 text-white">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#8fd7ff]">
                  Page control
                </p>
                <h3 className="mt-2 text-[1.45rem] font-semibold leading-[1.02] tracking-[-0.04em]">
                  Jump anywhere.
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {Array.from({ length: bookSpreads.length + 1 }).map((_, index) => {
                  const isActive = index === page;

                  return (
                    <button
                      key={pageLabel(index)}
                      type="button"
                      onClick={() => setPage(index)}
                      className={`rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                        isActive
                          ? "border-[#ffe55a] bg-[#ffe55a] text-[#171717]"
                          : "border-white/16 bg-white/8 text-[#e8f6ff] hover:border-white/32 hover:bg-white/12"
                      }`}
                    >
                      {pageLabel(index)}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 0))}
                  className="rounded-[1rem] border border-white/14 bg-white/8 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setPage((currentPage) =>
                      Math.min(currentPage + 1, bookSpreads.length),
                    )
                  }
                  className="rounded-[1rem] border border-white/14 bg-white/8 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
                >
                  Next
                </button>
              </div>

              <p className="text-sm leading-6 text-[#d8f2ff]">
                Current stop:{" "}
                <span className="font-semibold text-white">
                  {pageLabel(page)}
                </span>
              </p>
            </div>
          </SketchFrame>
        </div>
      </div>
    </section>
  );
}
