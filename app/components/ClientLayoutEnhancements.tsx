"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const GlobalHandCursor = dynamic(
  () =>
    import("@/app/components/GlobalHandCursor").then(
      (mod) => mod.GlobalHandCursor,
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

export function ClientLayoutEnhancements() {
  const [shouldRenderCursor, setShouldRenderCursor] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const finePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    if (!finePointerQuery.matches) {
      return;
    }

    const idleWindow = window as IdleWindow;

    if (typeof idleWindow.requestIdleCallback === "function") {
      const idleId = idleWindow.requestIdleCallback(
        () => {
          setShouldRenderCursor(true);
        },
        { timeout: 3000 },
      );

      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(() => {
      setShouldRenderCursor(true);
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return shouldRenderCursor ? <GlobalHandCursor /> : null;
}
