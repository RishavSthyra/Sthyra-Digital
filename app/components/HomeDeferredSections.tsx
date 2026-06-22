"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const CreativeShowcaseSection = dynamic(
  () =>
    import("@/app/components/CreativeShowcaseSection").then(
      (mod) => mod.CreativeShowcaseSection,
    ),
  {
    ssr: false,
    loading: () => <div className="min-h-[72svh] bg-[#fff8ef]" />,
  },
);

const CreativeGallerySection = dynamic(
  () =>
    import("@/app/components/CreativeGallerySection").then(
      (mod) => mod.CreativeGallerySection,
    ),
  {
    ssr: false,
    loading: () => <div className="min-h-[72svh] bg-white" />,
  },
);

function DeferredSection({
  children,
  minHeightClassName,
  rootMargin = "320px 0px",
}: {
  children: React.ReactNode;
  minHeightClassName: string;
  rootMargin?: string;
}) {
  const [shouldRender, setShouldRender] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldRender || typeof window === "undefined") {
      return;
    }

    const node = mountRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={mountRef} className={shouldRender ? undefined : minHeightClassName}>
      {shouldRender ? children : null}
    </div>
  );
}

export function HomeDeferredSections() {
  return (
    <>
      <DeferredSection minHeightClassName="min-h-[76svh] bg-[#fff8ef]">
        <CreativeShowcaseSection />
      </DeferredSection>
      <DeferredSection minHeightClassName="min-h-[72svh] bg-white">
        <CreativeGallerySection />
      </DeferredSection>
    </>
  );
}
