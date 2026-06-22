"use client";

import dynamic from "next/dynamic";

const GlobalHandCursor = dynamic(
  () =>
    import("@/app/components/GlobalHandCursor").then(
      (mod) => mod.GlobalHandCursor,
    ),
  {
    ssr: false,
  },
);

export function ClientLayoutEnhancements() {
  return <GlobalHandCursor />;
}
