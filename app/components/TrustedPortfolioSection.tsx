import Image from "next/image";
import { SquigglyText } from "@/components/ui/squiggly-text";

type TrustedLogo = {
  alt: string;
  fileName: string;
};

const TRUSTED_LOGOS: TrustedLogo[] = [
  { alt: "Always Dry", fileName: "ALWAYS DRY'.svg" },
  { alt: "Aparna Properties", fileName: "aparna properties.svg" },
  { alt: "Creation", fileName: "CREATION.svg" },
  { alt: "Fuel Genie", fileName: "fuel genie.png" },
  { alt: "Mangala", fileName: "mangala.svg" },
  { alt: "Raja Rani", fileName: "raja rani.webp" },
  { alt: "Sawamyavar", fileName: "sawamyavar.png" },
  { alt: "Sthyra", fileName: "STHYRA.webp" },
  { alt: "Trisha Silks", fileName: "trisha silks-Photoroom.png" },
];

const TRUSTED_LOGO_MARQUEE = [
  ...TRUSTED_LOGOS,
  ...TRUSTED_LOGOS,
  ...TRUSTED_LOGOS,
];

function TrustedLogoBand({
  bandClassName,
  cardClassName,
  className,
  reverse = false,
}: {
  bandClassName: string;
  cardClassName?: string;
  className: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`absolute left-1/2 w-[168vw] min-w-[118rem] max-w-none -translate-x-1/2 ${className}`}
      aria-hidden="true"
    >
      <div
        className={`overflow-hidden rounded-[999px] px-3 py-3 shadow-[0_14px_28px_rgba(99,38,7,0.14)] ${bandClassName}`}
      >
        <div
          className={`trusted-marquee-track flex w-max items-center gap-5 ${
            reverse ? "trusted-marquee-track-reverse" : ""
          }`}
        >
          {TRUSTED_LOGO_MARQUEE.map((logo, index) => (
            <div
              key={`${logo.alt}-${index}`}
              className={`flex h-[4.65rem] w-[12.4rem] shrink-0 items-center justify-center rounded-[1.15rem] border border-[#f3e8da] bg-[#fffaf2] px-5 shadow-[0_1px_0_rgba(255,255,255,0.9),inset_0_0_0_1px_rgba(17,17,17,0.045)] ${
                cardClassName ?? ""
              }`}
            >
              <Image
                src={encodeURI(`/logos/${logo.fileName}`)}
                alt={logo.alt}
                width={190}
                height={72}
                className="h-9 w-auto max-w-full object-contain opacity-[0.96]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TrustedPortfolioSection() {
  return (
    <section
      aria-label="Trusted portfolio logos"
      className="relative isolate overflow-hidden bg-[#09b7ea] pt-[clamp(5rem,8vw,7rem)] pb-[clamp(20rem,30vw,28rem)]"
    >
      <div className="absolute inset-0 opacity-30">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 24% 22%, rgba(255,255,255,0.16) 0, rgba(255,255,255,0.16) 1px, transparent 1.2px), radial-gradient(circle at 78% 34%, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 1px, transparent 1.2px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "16px 16px, 18px 18px, 100% 2.15rem",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[44rem] flex-col items-center px-6 text-center">
        <h2 className="text-[clamp(2.2rem,4vw,3.8rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-[#fffaf2]">
          Trusted by{" "}
          <SquigglyText
            stepDuration={74}
            scale={[4, 6]}
            className="text-[#ffe55a]"
          >
            bold
          </SquigglyText>{" "}
          brands
        </h2>
      </div>

      <TrustedLogoBand
        bandClassName="border border-[#de6516] bg-[linear-gradient(90deg,#3b6a9b_0%,#2f5b89_48%,#4a79aa_100%)]"
        className="top-[67%] -translate-y-1/2 -rotate-[7deg]"
      />
      <TrustedLogoBand
        bandClassName="border border-[#1e3b5b] bg-[linear-gradient(90deg,#17314e_0%,#11263d_48%,#1c3959_100%)]"
        cardClassName="border-[#e7edf3] bg-[#fdfefe]"
        className="top-[67%] -translate-y-1/2 rotate-[7deg]"
        reverse
      />
    </section>
  );
}


//bg-[linear-gradient(90deg,#17314e_0%,#11263d_48%,#1c3959_100%)]