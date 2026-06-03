"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CherryBlossomSplash } from "@/app/components/CherryBlossomSplash";

const brandLetters = "STHYRA".split("");

export function GlobalFooter() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const splashQueuedRef = useRef(false);
  const headlineInView = useInView(headlineRef, {
    once: true,
    amount: 0.58,
  });
  const [splashBurstKey, setSplashBurstKey] = useState(0);

  useEffect(() => {
    if (!headlineInView || splashQueuedRef.current) {
      return;
    }

    splashQueuedRef.current = true;
    const timer = window.setTimeout(() => {
      setSplashBurstKey((current) => current + 1);
    }, 220);

    return () => window.clearTimeout(timer);
  }, [headlineInView]);

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-[#ffffff] text-[#111111]"
    >
      <div className="relative min-h-[30rem] pt-20 sm:min-h-[36rem] sm:pt-24 lg:min-h-[44rem] lg:pt-28 xl:min-h-[50rem] xl:pt-32">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center">
          <Image
            src="/BACK.png"
            alt=""
            width={2172}
            height={724}
            sizes="100vw"
            className="h-auto w-[205%] max-w-none min-[420px]:w-[190%] sm:w-[165%] lg:w-[145%] xl:w-[128%]"
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[inherit] w-full max-w-[1800px] flex-col justify-end px-4 pb-10 sm:px-6 sm:pb-14 lg:px-10 lg:pb-20 xl:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-4 max-w-[32rem] text-center sm:mb-6 lg:mb-8"
          >
            <p className="font-[family:var(--font-geist-mono)] text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#5f615d] sm:text-[0.8rem]">
              Sthyra Digital
            </p>
            <p className="mt-2 text-sm font-medium leading-relaxed text-[#353734] sm:text-base lg:text-lg">
              Design, code, motion, and story layered into one living brand
              space.
            </p>
          </motion.div>

          <div
            ref={headlineRef}
            className="relative z-10 mx-auto -mt-2 flex w-full max-w-[1700px] justify-center sm:mt-0 lg:mt-2"
          >
            <motion.h2
              aria-label="STHYRA"
              className="flex flex-wrap justify-center gap-x-[0.025em] bg-[linear-gradient(135deg,#ff79b8_10%,#ff8fdf_42%,#bc7cff_72%,#7a53ff_100%)] bg-clip-text text-center font-sans text-[clamp(4.75rem,19vw,18rem)] font-black uppercase leading-[0.8] tracking-[-0.065em] text-transparent drop-shadow-[0_10px_24px_rgba(233,121,204,0.18)] sm:gap-x-[0.035em] sm:text-[clamp(6.5rem,19vw,18rem)]"
              initial={{
                opacity: 0,
                y: "-1.25em",
                rotate: -1.4,
                filter: "blur(12px)",
              }}
              animate={
                headlineInView
                  ? {
                      opacity: 1,
                      y: "0em",
                      rotate: 0,
                      filter: "blur(0px)",
                    }
                  : undefined
              }
              transition={{
                type: "spring",
                stiffness: 112,
                damping: 16,
                mass: 1.02,
              }}
            >
              {brandLetters.map((letter, index) => (
                <span key={`${letter}-${index}`} className="inline-block">
                  {letter}
                </span>
              ))}
            </motion.h2>
          </div>
        </div>

        <CherryBlossomSplash burstKey={splashBurstKey} />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center">
          <Image
            src="/BACK2.png"
            alt=""
            width={4344}
            height={1448}
            sizes="100vw"
            className="h-auto w-[188%] max-w-none min-[420px]:w-[172%] sm:w-[148%] lg:w-[126%] xl:w-[112%]"
          />
        </div>

        <div className="absolute inset-x-0 top-0 z-30 px-4 pb-4 pt-5 sm:px-6 sm:pt-6 lg:inset-x-0 lg:bottom-0 lg:top-auto lg:bg-gradient-to-t lg:from-white/92 lg:via-white/65 lg:to-transparent lg:px-10 lg:pb-3 lg:pt-8">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col items-start gap-3 text-left text-[0.72rem] font-medium text-[#2d302d] sm:text-[0.8rem] lg:flex-row lg:items-end lg:justify-between lg:text-left">
            <div className="space-y-1">
              <p className="font-[family:var(--font-geist-mono)] uppercase tracking-[0.24em] text-[#5e6259]">
                sthyra.digital
              </p>
              <p className="max-w-[34rem] text-pretty text-[#484c47]">
                Brand systems, expressive websites, motion-led stories, and
                service pages that carry the idea all the way through.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[#2c302c] lg:justify-end">
              <Link href="/" className="transition hover:opacity-65">
                Home
              </Link>
              <a
                href="mailto:hello@sthyra.digital"
                className="transition hover:opacity-65"
              >
                hello@sthyra.digital
              </a>
              <span>India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
