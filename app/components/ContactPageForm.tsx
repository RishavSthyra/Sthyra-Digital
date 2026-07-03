"use client";

import { SketchFrame } from "@/app/components/SketchFrame";
import { useContactForm } from "@/app/components/useContactForm";

const fieldBaseClassName =
  "w-full rounded-[1.15rem] border border-black/10 bg-white/78 px-4 py-3 text-[1rem] text-[#171717] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] outline-none transition placeholder:text-[#85786d] focus:border-[#7a53ff] focus:bg-white focus:shadow-[0_0_0_4px_rgba(122,83,255,0.12)]";

export function ContactPageForm() {
  const { formRef, handleSubmit, isSubmitting, submitState } = useContactForm();

  const statusToneClassName =
    submitState.kind === "error" ? "text-[#b44235]" : "text-[#59641f]";

  return (
    <SketchFrame
      className="relative overflow-hidden px-5 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10"
      fill="#fffdf8"
      stroke="#171717"
      strokeWidth={1.75}
      roughness={1.14}
      bowing={1.9}
      inset={1.25}
      radius={30}
      overlayFill="rgba(255, 235, 170, 0.12)"
      overlayFillStyle="zigzag-line"
      overlayFillWeight={0.76}
      overlayHachureGap={12}
      overlayHachureAngle={22}
    >
      <div className="pointer-events-none absolute inset-0 opacity-90">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 14% 14%, rgba(255,218,79,0.12), transparent 18%), radial-gradient(circle at 86% 16%, rgba(9,183,234,0.12), transparent 18%), linear-gradient(rgba(244,181,205,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(244,181,205,0.55) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 100% 100%, 1.55rem 1.55rem, 1.55rem 1.55rem",
          }}
        />
      </div>

      <div className="pointer-events-none absolute left-5 top-5 h-12 w-12 rounded-full bg-[#ffe55a]/55 blur-2xl" />
      <div className="pointer-events-none absolute bottom-4 right-6 h-14 w-14 rounded-full bg-[#7a53ff]/14 blur-2xl" />

      <div className="relative z-10">
        <div className="mx-auto max-w-[42rem] text-center">
          <div className="inline-flex rotate-[-2deg] rounded-full border-2 border-black/75 bg-[#fff36d] px-4 py-1 font-[family:var(--font-geist-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-black shadow-[3px_3px_0_rgba(0,0,0,0.1)]">
            contact us
          </div>
          <h2 className="mt-4 font-cabin-sketch text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.9] text-[#171717]">
            Tell us the brief.
          </h2>
          <p className="mx-auto mt-4 max-w-[34rem] text-[0.98rem] leading-7 text-[#5b4f45] sm:text-[1rem]">
            A cleaner, fuller contact form for the site. Share the brand, the
            goal, and what feels blocked right now.
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mx-auto mt-8 grid max-w-[54rem] gap-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="font-[family:var(--font-geist-mono)] text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#8a4a26]">
                Contact name
              </span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                required
                disabled={isSubmitting}
                placeholder="Who should we speak with?"
                className={fieldBaseClassName}
              />
            </label>

            <label className="grid gap-2">
              <span className="font-[family:var(--font-geist-mono)] text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#8a4a26]">
                Work email
              </span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={isSubmitting}
                placeholder="Where should the reply go?"
                className={fieldBaseClassName}
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span className="font-[family:var(--font-geist-mono)] text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#8a4a26]">
              Brand or offer
            </span>
            <input
              name="idea"
              type="text"
              required
              disabled={isSubmitting}
              placeholder="What are you building, selling, or scaling?"
              className={fieldBaseClassName}
            />
          </label>

          <label className="grid gap-2">
            <span className="font-[family:var(--font-geist-mono)] text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#8a4a26]">
              Growth brief
            </span>
            <textarea
              name="note"
              required
              rows={7}
              disabled={isSubmitting}
              placeholder="Tell us about the goal, bottleneck, campaign, website problem, or the thing that is slowing the next move down."
              className={`${fieldBaseClassName} min-h-[13rem] resize-y leading-7`}
            />
          </label>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-2 sm:flex-row">
            <p
              className={`font-[family:var(--font-geist-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.24em] ${submitState.message ? statusToneClassName : "text-[#7a6e67]"}`}
              role={submitState.message ? "status" : undefined}
            >
              {submitState.message || "All fields are required"}
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="font-cabin-sketch rounded-full border-2 border-black/80 bg-[#fff36d] px-6 py-3 text-[1.15rem] text-black shadow-[4px_4px_0_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:rotate-[-1deg]"
            >
              {isSubmitting ? "sending..." : "send growth brief"}
            </button>
          </div>
        </form>
      </div>
    </SketchFrame>
  );
}
