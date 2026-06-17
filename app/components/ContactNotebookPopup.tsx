"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { FormEvent, HTMLInputTypeAttribute } from "react";
import { useEffect, useRef, useState } from "react";

type ContactField =
  | {
      id: string;
      label: string;
      placeholder: string;
      multiline: true;
    }
  | {
      id: string;
      label: string;
      placeholder: string;
      multiline?: false;
      type: HTMLInputTypeAttribute;
    };

const contactFields: readonly ContactField[] = [
  {
    id: "name",
    label: "Contact name :",
    placeholder: "who should we speak with?",
    type: "text",
  },
  {
    id: "email",
    label: "Work email :",
    placeholder: "where should the strategy reply go?",
    type: "email",
  },
  {
    id: "idea",
    label: "Brand / offer :",
    placeholder: "what are you selling or scaling?",
    type: "text",
  },
  {
    id: "note",
    label: "Growth brief :",
    placeholder:
      "tell us about the goal, bottleneck, campaign, or website problem you want fixed",
    multiline: true,
  },
] as const;

type ContactNotebookPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SubmitState =
  | { kind: "idle"; message: string }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export function ContactNotebookPopup({
  isOpen,
  onClose,
}: ContactNotebookPopupProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({
    kind: "idle",
    message: "",
  });

  const resetFormState = () => {
    formRef.current?.reset();
    setIsSubmitting(false);
    setSubmitState({ kind: "idle", message: "" });
  };

  const handleClose = () => {
    resetFormState();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        resetFormState();
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmitState({ kind: "idle", message: "" });

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        throw new Error(
          result?.message ?? "The inquiry could not be sent right now.",
        );
      }

      formRef.current?.reset();
      setSubmitState({
        kind: "success",
        message:
          result?.message ?? "Your growth inquiry has been sent successfully.",
      });
    } catch (error) {
      setSubmitState({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "The inquiry could not be sent right now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitMessageClassName =
    submitState.kind === "error" ? "text-[#b44235]" : "text-[#4d5d20]";

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="fixed inset-0 z-[220] bg-[rgba(28,18,33,0.34)] backdrop-blur-[6px]"
          onClick={handleClose}
        >
          <div className="flex min-h-dvh items-start justify-center overflow-y-auto px-2 py-3 sm:px-4 sm:py-5 lg:px-8 lg:py-4">
            <motion.section
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.985 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[1500px]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative max-h-[calc(100dvh-1.5rem)] overflow-hidden rounded-[1.8rem] border-[3px] border-[#8a4dff] shadow-[0_30px_90px_rgba(59,31,90,0.28)] sm:max-h-[calc(100dvh-2.5rem)] sm:rounded-[2.2rem] lg:max-h-[calc(100dvh-2rem)]">
                <div className="contact-notebook-grid absolute inset-0" />
                <div className="absolute inset-y-0 left-0 hidden w-[clamp(3.6rem,7vw,5.8rem)] bg-[#030303] lg:block" />

                <div className="pointer-events-none absolute left-[1.1rem] top-[1rem] z-20 h-[clamp(3.8rem,7vw,5.8rem)] w-[clamp(4.4rem,11vw,7.6rem)] -rotate-[18deg] sm:left-[1.6rem] sm:top-[1.4rem] lg:left-[clamp(4.6rem,9vw,7.4rem)]">
                  <Image
                    src="/Tape Piece.svg"
                    alt=""
                    fill
                    sizes="(max-width: 640px) 88px, 128px"
                    className="object-contain"
                  />
                </div>

                <div className="pointer-events-none absolute right-[clamp(4.2rem,8vw,7.2rem)] top-[clamp(4rem,9vh,6rem)] z-10 h-[clamp(4rem,9vw,7.2rem)] w-[clamp(4rem,9vw,7.2rem)] rotate-[8deg] opacity-95">
                  <Image
                    src="/Heart 5.svg"
                    alt=""
                    fill
                    sizes="(max-width: 640px) 82px, 120px"
                    className="object-contain"
                  />
                </div>

                <div className="pointer-events-none absolute bottom-[clamp(0.5rem,2vw,1.8rem)] right-[clamp(0.6rem,2vw,1.8rem)] z-10 h-[clamp(8rem,18vw,14rem)] w-[clamp(8rem,18vw,14rem)] opacity-95">
                  <Image
                    src="/Pink twinkles.svg"
                    alt=""
                    fill
                    sizes="(max-width: 640px) 156px, 224px"
                    className="object-contain"
                  />
                </div>

                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 200"
                  className="pointer-events-none absolute right-[0.8rem] top-[0.3rem] z-10 h-[clamp(6.5rem,14vw,10rem)] w-[clamp(6.5rem,14vw,10rem)] text-[#62d95d] sm:right-[1.6rem] sm:top-[0.8rem]"
                >
                  <path
                    d="M132 24c9 29 15 72 7 123M54 83c20-10 47-12 80-5M71 94c22 28 41 42 74 56"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="5"
                  />
                </svg>

                <button
                  type="button"
                  aria-label="Close popup"
                  onClick={handleClose}
                  className="absolute right-3 top-3 z-30 flex h-11 w-11 items-center justify-center rounded-full border-2 border-black/80 bg-[#fff8f4] text-black shadow-[4px_4px_0_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:rotate-6 sm:right-5 sm:top-5"
                >
                  <span className="relative block h-4 w-4">
                    <span className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current" />
                    <span className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
                  </span>
                </button>

                <div className="relative z-20 max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain px-4 pb-5 pt-12 sm:max-h-[calc(100dvh-2.5rem)] sm:px-6 sm:pb-6 sm:pt-14 lg:max-h-[calc(100dvh-2rem)] lg:px-10 lg:pb-6 lg:pt-16">
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-6">
                  <div className="flex flex-col justify-between gap-5 pl-0 lg:gap-4 lg:pl-[clamp(4rem,7vw,6rem)]">
                    <div>
                      <span className="inline-flex rotate-[-3deg] rounded-full border-2 border-black/70 bg-[#fff36d] px-4 py-1 font-[family:var(--font-geist-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-black shadow-[3px_3px_0_rgba(0,0,0,0.1)]">
                        digital growth intake
                      </span>
                      <h2 className="font-cabin-sketch mt-4 max-w-[8ch] text-[clamp(2.15rem,9vw,3.8rem)] leading-[0.92] text-[#17120f] lg:mt-4 lg:text-[clamp(2.55rem,6.3vw,5rem)] lg:leading-[0.88]">
                        Leave us a little note.
                      </h2>
                      <p className="mt-3 max-w-[30rem] text-[0.92rem] leading-relaxed text-[#342923] sm:text-[0.98rem] lg:mt-3 lg:text-[0.96rem]">
                        Share the brand, the bottleneck, and the next move you
                        want to make. We use this form for websites,
                        performance marketing, creative systems, and launch
                        planning.
                      </p>
                      <a
                        href="mailto:hello@sthyra.digital"
                        className="font-cabin-sketch mt-3 inline-block text-[clamp(1.05rem,4vw,1.45rem)] text-[#382722] transition hover:opacity-65 lg:mt-3 lg:text-[clamp(1.15rem,2.2vw,1.55rem)]"
                      >
                        hello@sthyra.digital
                      </a>
                    </div>

                    <div className="hidden max-w-[26rem] self-start rounded-[1.5rem] border-2 border-dashed border-[#f09db9] bg-[#fffaf9]/88 p-4 shadow-[0_12px_28px_rgba(0,0,0,0.05)] lg:block">
                      <p className="font-[family:var(--font-geist-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-[#6e625c]">
                        best fit
                      </p>
                      <p className="font-cabin-sketch mt-2 text-[clamp(1.3rem,2.6vw,1.8rem)] leading-tight text-[#1b1411]">
                        strategy, traffic, creative, or website cleanup.
                      </p>
                      <p className="mt-2 text-[0.85rem] leading-relaxed text-[#4b3e37]">
                        Use this when you need a sharper landing page, cleaner
                        paid performance, stronger creative direction, or a
                        clearer digital growth plan.
                      </p>
                    </div>
                  </div>

                  <form
                    ref={formRef}
                    className="flex h-full flex-col justify-center gap-4 bg-transparent pl-0 pr-1 sm:gap-4 sm:pr-2 lg:gap-4 lg:pr-4"
                    onSubmit={handleSubmit}
                  >
                    {contactFields.map((field) => (
                      <label key={field.id} htmlFor={field.id} className="block">
                        <span className="font-cabin-sketch block text-[clamp(1.35rem,6vw,1.95rem)] leading-none text-[#14100d] lg:text-[clamp(1.5rem,2.5vw,2.15rem)]">
                          {field.label}
                        </span>
                        {field.multiline ? (
                          <textarea
                            id={field.id}
                            name={field.id}
                            placeholder={field.placeholder}
                            required
                            rows={5}
                            disabled={isSubmitting}
                            className="contact-note-input contact-note-textarea mt-2 text-[0.95rem] lg:mt-2"
                          />
                        ) : (
                          <input
                            id={field.id}
                            name={field.id}
                            type={field.type}
                            placeholder={field.placeholder}
                            autoComplete={
                              field.id === "name"
                                ? "name"
                                : field.id === "email"
                                  ? "email"
                                  : "off"
                            }
                            required
                            disabled={isSubmitting}
                            className="contact-note-input mt-2 text-[0.95rem] lg:mt-2"
                          />
                        )}
                      </label>
                    ))}

                    <div className="mt-1 flex flex-wrap items-center justify-between gap-4 pt-3 sm:pt-4 lg:mt-1 lg:pt-4">
                      <p
                        className={`font-[family:var(--font-geist-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.24em] ${submitState.message ? submitMessageClassName : "text-[#7a6e67]"}`}
                        role={submitState.message ? "status" : undefined}
                      >
                        {submitState.message || "all fields are required"}
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="font-cabin-sketch rounded-full border-2 border-black/80 bg-[#fff36d] px-4 py-2 text-[1rem] text-black shadow-[4px_4px_0_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:rotate-[-2deg] lg:px-5 lg:text-[1.15rem]"
                      >
                        {isSubmitting ? "sending..." : "send growth brief"}
                      </button>
                    </div>
                  </form>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
