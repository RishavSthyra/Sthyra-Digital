"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HomeCohortPopup = dynamic(
  () =>
    import("@/app/components/HomeCohortPopup").then(
      (mod) => mod.HomeCohortPopup,
    ),
  {
    ssr: false,
  },
);

type IdleWindow = Window &
  typeof globalThis & {
    cancelIdleCallback?: (handle: number) => void;
    requestIdleCallback?: (
      callback: IdleRequestCallback,
      options?: IdleRequestOptions,
    ) => number;
  };

export function HomeClientOverlays() {
  const [shouldRenderPopup, setShouldRenderPopup] = useState(false);

  useEffect(() => {
    const idleWindow = window as IdleWindow;

    if (typeof idleWindow.requestIdleCallback === "function") {
      const idleId = idleWindow.requestIdleCallback(
        () => {
          setShouldRenderPopup(true);
        },
        { timeout: 2500 },
      );

      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(() => {
      setShouldRenderPopup(true);
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return shouldRenderPopup ? <HomeCohortPopup /> : null;
}