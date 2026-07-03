"use client";

import type { FormEvent } from "react";
import { useRef, useState } from "react";

export type ContactSubmitState =
  | { kind: "idle"; message: string }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export function useContactForm({ onSuccess }: { onSuccess?: () => void } = {}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<ContactSubmitState>({
    kind: "idle",
    message: "",
  });

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
      onSuccess?.();
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

  return {
    formRef,
    handleSubmit,
    isSubmitting,
    submitState,
  };
}
