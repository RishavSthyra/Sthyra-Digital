"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CherryBlossomSplash } from "@/app/components/CherryBlossomSplash";

const brandLetters = "STHYRA".split("");
const headlineVariants = {
  hidden: {
    opacity: 0,
    y: "-1.25em",
    rotate: -1.4,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: "0em",
    rotate: 0,
    filter: "blur(0px)",
  },
};

export function GlobalFooter() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const previousHeadlineInViewRef = useRef(false);
  const headlineInView = useInView(headlineRef, {
    once: false,
    amount: 0.54,
  });
  const [splashBurstKey, setSplashBurstKey] = useState(0);

  useEffect(() => {
    const enteredView = headlineInView && !previousHeadlineInViewRef.current;
    previousHeadlineInViewRef.current = headlineInView;

    if (!enteredView) {
      return;
    }

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
      <div className="relative min-h-[34rem] pt-24 sm:min-h-[42rem] sm:pt-28 lg:min-h-[50rem] lg:pt-36 xl:min-h-[58rem] xl:pt-40">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center lg:hidden">
          <Image
            src="/BACK_SMALL.webp"
            alt="Layered paper background illustration"
            width={1351}
            height={2400}
            sizes="100vw"
            className="h-auto w-[152%] max-w-none min-[420px]:w-[142%] sm:w-[124%]"
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden justify-center lg:flex">
          <Image
            src="/BACK.webp"
            alt="Layered paper background illustration"
            width={2172}
            height={724}
            sizes="100vw"
            className="h-auto w-[134%] max-w-none xl:w-[120%]"
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[inherit] w-full max-w-[1800px] flex-col justify-end px-4 pb-10 sm:px-6 sm:pb-14 lg:px-10 lg:pb-20 xl:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
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
              initial="hidden"
              animate={headlineInView ? "visible" : "hidden"}
              variants={headlineVariants}
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

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center lg:hidden">
          <Image
            src="/FRONT_SMALL.webp"
            alt="Foreground paper collage illustration"
            width={941}
            height={1672}
            sizes="100vw"
            className="h-auto w-[152%] max-w-none min-[420px]:w-[138%] sm:w-[122%]"
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden justify-center lg:flex">
          <Image
            src="/BACK2.webp"
            alt="Foreground paper collage illustration"
            width={2400}
            height={800}
            sizes="100vw"
            className="h-auto w-[126%] max-w-none xl:w-[112%]"
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
              <Link
                href="/project-overview"
                className="transition hover:opacity-65"
              >
                Project Overview
              </Link>
              <Link href="/services" className="transition hover:opacity-65">
                Services
              </Link>
              <Link href="/contact" className="transition hover:opacity-65">
                Contact
              </Link>
              <Link
                href="/services/performance-marketing"
                className="transition hover:opacity-65"
              >
                Performance Marketing
              </Link>
              <Link
                href="/services/web-development"
                className="transition hover:opacity-65"
              >
                Web Development
              </Link>
              <Link
                href="/services/creative-management"
                className="transition hover:opacity-65"
              >
                Creative Management
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
