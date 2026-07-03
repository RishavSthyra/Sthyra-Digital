"use client";

import type { HTMLInputTypeAttribute } from "react";
import { useContactForm } from "@/app/components/useContactForm";

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

type ContactNotebookFormProps = {
  formClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  textareaClassName?: string;
  submitRowClassName?: string;
  submitButtonClassName?: string;
  statusClassName?: string;
  submitLabel?: string;
  submittingLabel?: string;
  idleMessage?: string;
  onSuccess?: () => void;
};

export function ContactNotebookForm({
  formClassName,
  labelClassName,
  inputClassName,
  textareaClassName,
  submitRowClassName,
  submitButtonClassName,
  statusClassName,
  submitLabel = "send growth brief",
  submittingLabel = "sending...",
  idleMessage = "all fields are required",
  onSuccess,
}: ContactNotebookFormProps) {
  const { formRef, handleSubmit, isSubmitting, submitState } = useContactForm({
    onSuccess,
  });

  const submitMessageClassName =
    submitState.kind === "error" ? "text-[#b44235]" : "text-[#4d5d20]";

  return (
    <form
      ref={formRef}
      className={
        formClassName ??
        "flex h-full flex-col justify-center gap-4 bg-transparent pl-0 pr-1 sm:gap-4 sm:pr-2 lg:gap-4 lg:pr-4"
      }
      onSubmit={handleSubmit}
    >
      {contactFields.map((field) => (
        <label key={field.id} htmlFor={field.id} className="block">
          <span
            className={
              labelClassName ??
              "font-cabin-sketch block text-[clamp(1.35rem,6vw,1.95rem)] leading-none text-[#14100d] lg:text-[clamp(1.5rem,2.5vw,2.15rem)]"
            }
          >
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
              className={
                textareaClassName ??
                "contact-note-input contact-note-textarea mt-2 text-[0.95rem] lg:mt-2"
              }
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
              className={
                inputClassName ??
                "contact-note-input mt-2 text-[0.95rem] lg:mt-2"
              }
            />
          )}
        </label>
      ))}

      <div
        className={
          submitRowClassName ??
          "mt-1 flex flex-wrap items-center justify-between gap-4 pt-3 sm:pt-4 lg:mt-1 lg:pt-4"
        }
      >
        <p
          className={
            statusClassName ??
            `font-[family:var(--font-geist-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.24em] ${submitState.message ? submitMessageClassName : "text-[#7a6e67]"}`
          }
          role={submitState.message ? "status" : undefined}
        >
          {submitState.message || idleMessage}
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className={
            submitButtonClassName ??
            "font-cabin-sketch rounded-full border-2 border-black/80 bg-[#fff36d] px-4 py-2 text-[1rem] text-black shadow-[4px_4px_0_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:rotate-[-2deg] lg:px-5 lg:text-[1.15rem]"
          }
        >
          {isSubmitting ? submittingLabel : submitLabel}
        </button>
      </div>
    </form>
  );
}
