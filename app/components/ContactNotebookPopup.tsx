"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { HTMLInputTypeAttribute } from "react";
import { useEffect } from "react";

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
  { id: "name", label: "Name :", placeholder: "your name here", type: "text" },
  {
    id: "email",
    label: "Email :",
    placeholder: "where I should reply",
    type: "email",
  },
  {
    id: "idea",
    label: "Project :",
    placeholder: "what are we making?",
    type: "text",
  },
  {
    id: "note",
    label: "Note :",
    placeholder: "the messy first draft goes here",
    multiline: true,
  },
] as const;

type ContactNotebookPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ContactNotebookPopup({
  isOpen,
  onClose,
}: ContactNotebookPopupProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="fixed inset-0 z-[220] bg-[rgba(28,18,33,0.34)] backdrop-blur-[6px]"
          onClick={onClose}
        >
          <div className="flex min-h-screen items-start justify-center overflow-y-auto px-2 py-14 sm:px-4 sm:py-16 lg:px-8 lg:py-10">
            <motion.section
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.985 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[1500px]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative overflow-hidden rounded-[1.8rem] border-[3px] border-[#8a4dff] shadow-[0_30px_90px_rgba(59,31,90,0.28)] sm:rounded-[2.2rem]">
                <div className="contact-notebook-grid absolute inset-0" />
                <div className="absolute inset-y-0 left-0 w-[clamp(3.6rem,7vw,5.8rem)] bg-[#030303]" />

                <div className="pointer-events-none absolute left-[clamp(4.6rem,9vw,7.4rem)] top-[1rem] z-20 h-[clamp(3.8rem,7vw,5.8rem)] w-[clamp(4.4rem,11vw,7.6rem)] -rotate-[18deg] sm:top-[1.4rem]">
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
                  onClick={onClose}
                  className="absolute right-3 top-3 z-30 flex h-11 w-11 items-center justify-center rounded-full border-2 border-black/80 bg-[#fff8f4] text-black shadow-[4px_4px_0_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:rotate-6 sm:right-5 sm:top-5"
                >
                  <span className="relative block h-4 w-4">
                    <span className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current" />
                    <span className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
                  </span>
                </button>

                <div className="relative z-20 grid min-h-[min(56rem,calc(100vh-5rem))] gap-8 px-4 pb-5 pt-14 sm:px-6 sm:pb-6 sm:pt-[4.5rem] lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-10 lg:px-10 lg:pb-8 lg:pt-20">
                  <div className="flex flex-col justify-between gap-6 pl-[clamp(4rem,7vw,6rem)]">
                    <div>
                      <span className="inline-flex rotate-[-3deg] rounded-full border-2 border-black/70 bg-[#fff36d] px-4 py-1 font-[family:var(--font-geist-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-black shadow-[3px_3px_0_rgba(0,0,0,0.1)]">
                        floating notebook
                      </span>
                      <h2 className="font-cabin-sketch mt-5 max-w-[8ch] text-[clamp(2.8rem,7vw,5.8rem)] leading-[0.9] text-[#17120f]">
                        Leave a little note.
                      </h2>
                      <p className="mt-4 max-w-[30rem] text-sm leading-relaxed text-[#342923] sm:text-base">
                        This is the playful popup version, not the footer. Drop the
                        basics here and we can wire the real send flow later.
                      </p>
                      <a
                        href="mailto:hello@sthyra.digital"
                        className="font-cabin-sketch mt-4 inline-block text-[clamp(1.25rem,2.4vw,1.75rem)] text-[#382722] transition hover:opacity-65"
                      >
                        hello@sthyra.digital
                      </a>
                    </div>

                    <div className="max-w-[26rem] self-start rounded-[1.5rem] border-2 border-dashed border-[#f09db9] bg-[#fffaf9]/88 p-5 shadow-[0_12px_28px_rgba(0,0,0,0.05)]">
                      <p className="font-[family:var(--font-geist-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-[#6e625c]">
                        quick note
                      </p>
                      <p className="font-cabin-sketch mt-3 text-[clamp(1.45rem,3vw,2.1rem)] leading-tight text-[#1b1411]">
                        no boring boxes, just notebook lines.
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-[#4b3e37]">
                        UI first, backend later. Keep it loose, sketchy, and easy to
                        read.
                      </p>
                    </div>
                  </div>

                  <form
                    className="flex h-full flex-col justify-center gap-6 bg-transparent pl-0 pr-2 sm:gap-7 lg:pr-6"
                    onSubmit={(event) => event.preventDefault()}
                  >
                    {contactFields.map((field) => (
                      <label key={field.id} htmlFor={field.id} className="block">
                        <span className="font-cabin-sketch block text-[clamp(1.7rem,3vw,2.55rem)] leading-none text-[#14100d]">
                          {field.label}
                        </span>
                        {field.multiline ? (
                          <textarea
                            id={field.id}
                            name={field.id}
                            placeholder={field.placeholder}
                            className="contact-note-input contact-note-textarea mt-3"
                          />
                        ) : (
                          <input
                            id={field.id}
                            name={field.id}
                            type={field.type}
                            placeholder={field.placeholder}
                            className="contact-note-input mt-3"
                          />
                        )}
                      </label>
                    ))}

                    <div className="mt-2 flex flex-wrap items-center justify-between gap-4 pt-6 sm:pt-8">
                      <p className="font-[family:var(--font-geist-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#7a6e67]">
                        ui only for now
                      </p>
                      <button
                        type="submit"
                        className="font-cabin-sketch rounded-full border-2 border-black/80 bg-[#fff36d] px-5 py-2 text-[1.15rem] text-black shadow-[4px_4px_0_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:rotate-[-2deg]"
                      >
                        pin this note
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.section>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
