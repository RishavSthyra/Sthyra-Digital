"use client";

import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

type CalendlyModalProps = {
  open: boolean;
  url: string;
  onClose: () => void;
  title?: string;
};

type CalendlyWindow = Window & {
  Calendly?: {
    initInlineWidget: (options: {
      parentElement: HTMLElement;
      url: string;
    }) => void;
  };
};

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

let calendlyScriptPromise: Promise<void> | null = null;

function loadCalendlyScript() {
  if (typeof document === "undefined") {
    return Promise.resolve();
  }

  if ((window as CalendlyWindow).Calendly) {
    return Promise.resolve();
  }

  if (calendlyScriptPromise) {
    return calendlyScriptPromise;
  }

  calendlyScriptPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Failed to load Calendly script.")),
        { once: true },
      );

      if ((window as CalendlyWindow).Calendly) {
        resolve();
      }

      return;
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Calendly script."));
    document.body.appendChild(script);
  });

  return calendlyScriptPromise;
}

function buildEmbedUrl(url: string) {
  const embedUrl = new URL(url);

  embedUrl.searchParams.set("embed_domain", "sthyra.digital");
  embedUrl.searchParams.set("embed_type", "Inline");
  embedUrl.searchParams.set("hide_event_type_details", "1");
  embedUrl.searchParams.set("hide_gdpr_banner", "1");
  embedUrl.searchParams.set("background_color", "fff8ef");
  embedUrl.searchParams.set("text_color", "171717");
  embedUrl.searchParams.set("primary_color", "0b1230");

  return embedUrl.toString();
}

export function CalendlyModal({
  open,
  url,
  onClose,
  title = "Book a 30-min call",
}: CalendlyModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const embedUrl = useMemo(() => buildEmbedUrl(url), [url]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    const containerElement = containerRef.current;

    if (!open || !containerElement) {
      return;
    }

    let cancelled = false;

    loadCalendlyScript()
      .then(() => {
        if (cancelled) {
          return;
        }

        containerElement.innerHTML = "";
        (window as CalendlyWindow).Calendly?.initInlineWidget({
          parentElement: containerElement,
          url: embedUrl,
        });
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        containerElement.innerHTML = "";
      });

    return () => {
      cancelled = true;

      containerElement.innerHTML = "";
    };
  }, [embedUrl, open]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[9999] bg-[#05091a]/78 backdrop-blur-md"
    >
      <button
        type="button"
        aria-label="Close booking dialog"
        onClick={onClose}
        className="absolute inset-0 bg-transparent"
      />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="fixed right-4 top-4 z-[10001] inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/18 bg-white/92 text-[#171717] shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition hover:bg-black hover:text-white sm:right-6 sm:top-6"
      >
        <FiX className="h-5 w-5" aria-hidden="true" />
      </button>

      <div
        ref={containerRef}
        className="fixed left-1/2 top-1/2 z-[10000] h-[min(88dvh,52rem)] w-[min(96vw,68rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-transparent"
      />
    </div>,
    document.body,
  );
}
