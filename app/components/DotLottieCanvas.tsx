"use client";

import dynamic from "next/dynamic";

const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  {
    ssr: false,
    loading: () => <div aria-hidden="true" className="h-full w-full" />,
  },
);

type DotLottieCanvasProps = {
  className: string;
  src: string;
};

export function DotLottieCanvas({
  className,
  src,
}: DotLottieCanvasProps) {
  return <DotLottieReact src={src} loop autoplay className={className} />;
}
