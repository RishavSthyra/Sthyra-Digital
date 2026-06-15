"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

type CohortOffer = "alpha-50" | "core-5" | "full-stack";

type AdSpend = "under-15k" | "15-30k" | "30-50k" | "above-50k";

type Bottleneck =
  | "slow-website"
  | "creative-fatigue"
  | "high-spend-low-conversion"
  | "all-of-the-above";

type AssetReadiness = "locked" | "70-percent" | "starting-from-scratch";

type Agreements = {
  caseStudy: boolean;
  assetFreeze: boolean;
  growthTrigger: boolean;
};

type FormState = {
  companyName: string;
  websiteUrl: string;
  founderName: string;
  whatsappNumber: string;
  offer: CohortOffer | null;
  adSpend: AdSpend | null;
  productDescription: string;
  bottleneck: Bottleneck | null;
  assetReadiness: AssetReadiness | null;
  agreements: Agreements;
};

type SubmitState =
  | { kind: "idle"; message: string }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

const STEP_COUNT = 7;

const adSpendOptions: { value: AdSpend; label: string; hint: string }[] = [
  { value: "under-15k", label: "Under ₹15,000", hint: "/ month" },
  { value: "15-30k", label: "₹15,000 — ₹30,000", hint: "/ month" },
  { value: "30-50k", label: "₹30,000 — ₹50,000", hint: "/ month" },
  { value: "above-50k", label: "Above ₹50,000", hint: "/ month" },
];

const bottleneckOptions: { value: Bottleneck; label: string }[] = [
  { value: "slow-website", label: "Slow, poorly coded, or outdated website architecture" },
  { value: "creative-fatigue", label: "Creative fatigue / unable to produce winning video hooks & reels" },
  { value: "high-spend-low-conversion", label: "High ad spend with low lead conversion and poor attribution" },
  { value: "all-of-the-above", label: "All of the above" },
];

const assetReadinessOptions: { value: AssetReadiness; label: string; hint: string }[] = [
  {
    value: "locked",
    label: "100% Locked & Loaded",
    hint: "Everything is in a Google Drive folder ready to be deployed today.",
  },
  {
    value: "70-percent",
    label: "70% Ready",
    hint: "We have the logos and media assets, but we need help polishing our core offer copy.",
  },
  {
    value: "starting-from-scratch",
    label: "Starting from Scratch",
    hint: "We need help establishing our visual layout and content parameters.",
  },
];

const offerOptions: {
  value: CohortOffer;
  label: string;
  meta: string;
  price: string;
}[] = [
  {
    value: "alpha-50",
    label: "The Alpha-50 Architecture Sprint",
    price: "₹30,000 flat",
    meta: "Custom Next.js / Tailwind · 7-Day Web Build",
  },
  {
    value: "core-5",
    label: "The Core-5 Growth Incubator",
    price: "₹25,000 / month",
    meta: "Social Media Management & PPC Optimization · 6-month cohort",
  },
  {
    value: "full-stack",
    label: "The Full-Stack Combined Engine",
    price: "Web + Growth",
    meta: "Both web architecture and ongoing traffic infrastructure",
  },
];

const initialFormState: FormState = {
  companyName: "",
  websiteUrl: "",
  founderName: "",
  whatsappNumber: "",
  offer: null,
  adSpend: null,
  productDescription: "",
  bottleneck: null,
  assetReadiness: null,
  agreements: {
    caseStudy: false,
    assetFreeze: false,
    growthTrigger: false,
  },
};

type AlphaCohortApplicationPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultOffer?: CohortOffer;
};

export function AlphaCohortApplicationPopup({
  isOpen,
  onClose,
  defaultOffer,
}: AlphaCohortApplicationPopupProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    ...initialFormState,
    offer: defaultOffer ?? null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({
    kind: "idle",
    message: "",
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const stepBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setForm({ ...initialFormState, offer: defaultOffer ?? null });
      setSubmitState({ kind: "idle", message: "" });
    }
  }, [isOpen, defaultOffer]);

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

  // Animate the step body in on every step change.
  useEffect(() => {
    const node = stepBodyRef.current;
    if (!node) return;
    node.scrollTop = 0;
  }, [step]);

  const canProceed = useMemo(() => {
    switch (step) {
      case 0:
        return form.companyName.trim().length > 0;
      case 1:
        return form.founderName.trim().length > 0 && form.whatsappNumber.trim().length >= 7;
      case 2:
        return form.offer !== null;
      case 3:
        return form.adSpend !== null;
      case 4:
        return (
          form.productDescription.trim().length >= 20 &&
          form.bottleneck !== null
        );
      case 5:
        return form.assetReadiness !== null;
      case 6:
        return (
          form.agreements.caseStudy &&
          form.agreements.assetFreeze &&
          form.agreements.growthTrigger
        );
      default:
        return false;
    }
  }, [form, step]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canProceed) {
      return;
    }

    setIsSubmitting(true);
    setSubmitState({ kind: "idle", message: "" });

    try {
      const response = await fetch("/api/cohort-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        throw new Error(
          result?.message ?? "We could not send your application right now.",
        );
      }

      setSubmitState({
        kind: "success",
        message:
          result?.message ??
          "Your application has been received. The cohort desk will respond within 24 hours.",
      });
    } catch (error) {
      setSubmitState({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not send your application right now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const goNext = () => {
    if (!canProceed) return;
    setStep((current) => Math.min(STEP_COUNT - 1, current + 1));
  };

  const goBack = () => {
    if (isSubmitting) return;
    if (submitState.kind === "success") {
      onClose();
      return;
    }
    setStep((current) => Math.max(0, current - 1));
  };

  const isLastStep = step === STEP_COUNT - 1;

  const submitMessageClassName =
    submitState.kind === "error" ? "text-[#b44235]" : "text-[#4d5d20]";

  const progressPct = ((step + 1) / STEP_COUNT) * 100;

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
          <div className="flex min-h-dvh items-start justify-center overflow-y-auto px-2 py-3 sm:px-4 sm:py-5 lg:px-8 lg:py-4">
            <motion.section
              ref={containerRef}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.985 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[1500px]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative max-h-[calc(100dvh-1.5rem)] overflow-hidden rounded-[1.8rem] border-[3px] border-[#ffd23f] shadow-[0_30px_90px_rgba(20,10,40,0.5)] sm:max-h-[calc(100dvh-2.5rem)] sm:rounded-[2.2rem] lg:max-h-[calc(100dvh-2rem)]">
                <div className="cohort-application-grid absolute inset-0" />
                <div className="absolute inset-y-0 left-0 hidden w-[clamp(3.6rem,7vw,5.8rem)] bg-black/40 lg:block" />

                {/* Decorative doodles — reduced opacity for clean readability */}
                <div className="pointer-events-none absolute left-[1.1rem] top-[1rem] z-20 h-[clamp(3.8rem,7vw,5.8rem)] w-[clamp(4.4rem,11vw,7.6rem)] -rotate-[18deg] sm:left-[1.6rem] sm:top-[1.4rem] lg:left-[clamp(4.6rem,9vw,7.4rem)]">
                  <Image
                    src="/Tape Piece.svg"
                    alt=""
                    fill
                    sizes="(max-width: 640px) 88px, 128px"
                    className="object-contain opacity-40"
                  />
                </div>

                <div className="pointer-events-none absolute right-[clamp(4.2rem,8vw,7.2rem)] top-[clamp(4rem,9vh,6rem)] z-10 h-[clamp(4rem,9vw,7.2rem)] w-[clamp(4rem,9vw,7.2rem)] rotate-[8deg] opacity-60">
                  <Image
                    src="/Heart 5.svg"
                    alt=""
                    fill
                    sizes="(max-width: 640px) 82px, 120px"
                    className="object-contain"
                  />
                </div>

                <div className="pointer-events-none absolute bottom-[clamp(0.5rem,2vw,1.8rem)] right-[clamp(0.6rem,2vw,1.8rem)] z-10 h-[clamp(8rem,18vw,14rem)] w-[clamp(8rem,18vw,14rem)] opacity-45">
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
                  aria-label="Close application"
                  onClick={onClose}
                  className="absolute right-3 top-3 z-30 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/30 bg-[#ffd23f] text-black shadow-[4px_4px_0_rgba(0,0,0,0.4)] transition hover:-translate-y-0.5 hover:rotate-6 sm:right-5 sm:top-5"
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
                        <span className="inline-flex rotate-[-3deg] rounded-full border-2 border-black/40 bg-[#ffd23f] px-4 py-1 font-[family:var(--font-geist-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-black shadow-[3px_3px_0_rgba(0,0,0,0.35)]">
                          alpha cohort · application
                        </span>
                        <h2 className="font-cabin-sketch mt-4 max-w-[12ch] text-[clamp(2.15rem,9vw,3.8rem)] leading-[0.92] text-white lg:mt-4 lg:text-[clamp(2.55rem,6.3vw,5rem)] lg:leading-[0.88]">
                          Lock in your cohort seat.
                        </h2>
                        <p className="mt-3 max-w-[30rem] text-[0.92rem] leading-relaxed text-white/75 sm:text-[0.98rem] lg:mt-3 lg:text-[0.96rem]">
                          Seven short steps. The cohort desk reviews every submission
                          inside 24 hours. If your brand parameters align with the
                          active case-study blueprint, you'll get the payment gateway
                          and asset upload locker instantly.
                        </p>
                        <a
                          href="mailto:hello@sthyra.digital"
                          className="font-cabin-sketch mt-3 inline-block text-[clamp(1.05rem,4vw,1.45rem)] text-[#ffd23f] transition hover:opacity-75 lg:mt-3 lg:text-[clamp(1.15rem,2.2vw,1.55rem)]"
                        >
                          hello@sthyra.digital
                        </a>
                      </div>

                      <div className="hidden max-w-[26rem] self-start rounded-[1.5rem] border-2 border-dashed border-white/25 bg-white/5 p-4 shadow-[0_12px_28px_rgba(0,0,0,0.35)] backdrop-blur-[2px] lg:block">
                        <p className="font-[family:var(--font-geist-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-white/55">
                          progress
                        </p>
                        <p className="font-cabin-sketch mt-2 text-[clamp(1.3rem,2.6vw,1.8rem)] leading-tight text-white">
                          step {step + 1} of {STEP_COUNT}
                        </p>
                        <div className="mt-3 h-2 w-full overflow-hidden rounded-full border border-white/20 bg-white/10">
                          <motion.div
                            className="h-full rounded-full bg-[#ffd23f]"
                            initial={false}
                            animate={{ width: `${progressPct}%` }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                        <p className="mt-3 text-[0.85rem] leading-relaxed text-white/65">
                          The 7-day sprint clock only starts after asset handoff. The
                          30-day conversion loop only starts after the cohort kicks off.
                        </p>
                      </div>
                    </div>

                    <form
                      className="flex h-full flex-col justify-center gap-4 bg-transparent pl-0 pr-1 sm:gap-4 sm:pr-2 lg:gap-4 lg:pr-4"
                      onSubmit={handleSubmit}
                    >
                      <div
                        ref={stepBodyRef}
                        className="relative max-h-[58dvh] overflow-y-auto overscroll-contain pr-1 sm:max-h-[60dvh]"
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-4"
                          >
                            {step === 0 ? (
                              <StepShell
                                eyebrow="Section 01 · Core business profile"
                                title="What is the legal name of your company?"
                                helper="The name on invoices and contracts."
                              >
                                <TextInput
                                  name="companyName"
                                  value={form.companyName}
                                  onChange={(value) =>
                                    setForm((f) => ({ ...f, companyName: value }))
                                  }
                                  placeholder="e.g. Sthyra Digital Pvt. Ltd."
                                  autoComplete="organization"
                                />
                                <TextInput
                                  name="websiteUrl"
                                  value={form.websiteUrl}
                                  onChange={(value) =>
                                    setForm((f) => ({ ...f, websiteUrl: value }))
                                  }
                                  placeholder="website or current landing page (if any)"
                                />
                              </StepShell>
                            ) : null}

                            {step === 1 ? (
                              <StepShell
                                eyebrow="Section 01 · Core business profile"
                                title="Who is the founder or decision maker we should contact?"
                                helper="WhatsApp-enabled numbers get the fastest reply."
                              >
                                <TextInput
                                  name="founderName"
                                  value={form.founderName}
                                  onChange={(value) =>
                                    setForm((f) => ({ ...f, founderName: value }))
                                  }
                                  placeholder="primary founder / decision maker"
                                  autoComplete="name"
                                />
                                <TextInput
                                  name="whatsappNumber"
                                  value={form.whatsappNumber}
                                  onChange={(value) =>
                                    setForm((f) => ({
                                      ...f,
                                      whatsappNumber: value,
                                    }))
                                  }
                                  placeholder="+91 98765 43210"
                                  inputMode="tel"
                                />
                              </StepShell>
                            ) : null}

                            {step === 2 ? (
                              <StepShell
                                eyebrow="Section 01 · Core business profile"
                                title="Which subsidized Alpha Cohort slot are you applying for?"
                                helper="Pick one. You can switch any time before submitting."
                              >
                                <RadioList name="offer" value={form.offer} onChange={(value) => setForm((f) => ({ ...f, offer: value as CohortOffer }))} options={offerOptions} />
                              </StepShell>
                            ) : null}

                            {step === 3 ? (
                              <StepShell
                                eyebrow="Section 02 · Financial & market validation"
                                title="What is your current or target monthly digital ad spend budget?"
                                helper="Even an honest estimate is fine — it just helps us size the funnel."
                              >
                                <RadioList
                                  name="adSpend"
                                  value={form.adSpend}
                                  onChange={(value) =>
                                    setForm((f) => ({ ...f, adSpend: value as AdSpend }))
                                  }
                                  options={adSpendOptions}
                                />
                              </StepShell>
                            ) : null}

                            {step === 4 ? (
                              <StepShell
                                eyebrow="Section 02 · Financial & market validation"
                                title="Tell us about your offer and the bottleneck holding you back."
                                helper="Two parts — what you sell, and what's blocking the next growth step."
                              >
                                <label className="block">
                                  <span className="font-cabin-sketch block text-[clamp(1.05rem,2.6vw,1.3rem)] leading-none text-white">
                                    Product or service in your own words
                                  </span>
                                  <textarea
                                    value={form.productDescription}
                                    onChange={(event) =>
                                      setForm((f) => ({
                                        ...f,
                                        productDescription: event.target.value,
                                      }))
                                    }
                                    placeholder="what you sell, who it's for, and the problem you solve"
                                    rows={4}
                                    className="cohort-input cohort-textarea mt-2"
                                  />
                                </label>
                                <label className="block">
                                  <span className="font-cabin-sketch block text-[clamp(1.05rem,2.6vw,1.3rem)] leading-none text-white">
                                    The single biggest bottleneck right now
                                  </span>
                                  <select
                                    value={form.bottleneck ?? ""}
                                    onChange={(event) =>
                                      setForm((f) => ({
                                        ...f,
                                        bottleneck: (event.target.value || null) as Bottleneck | null,
                                      }))
                                    }
                                    className="cohort-input cohort-select mt-2"
                                  >
                                    <option value="" disabled>
                                      pick the closest match
                                    </option>
                                    {bottleneckOptions.map((option) => (
                                      <option key={option.value} value={option.value}>
                                        {option.label}
                                      </option>
                                    ))}
                                  </select>
                                </label>
                              </StepShell>
                            ) : null}

                            {step === 5 ? (
                              <StepShell
                                eyebrow="Section 03 · The asset readiness score"
                                title="How ready are your brand assets for handoff?"
                                helper="This primes the Asset Freeze Rule so the 7-day SLA can start on time."
                              >
                                <RadioList
                                  name="assetReadiness"
                                  value={form.assetReadiness}
                                  onChange={(value) =>
                                    setForm((f) => ({
                                      ...f,
                                      assetReadiness: value as AssetReadiness,
                                    }))
                                  }
                                  options={assetReadinessOptions}
                                />
                              </StepShell>
                            ) : null}

                            {step === 6 ? (
                              <StepShell
                                eyebrow="Section 04 · Case study agreement & SLA acknowledgment"
                                title="Three checks before we send this to the cohort desk."
                                helper="Each one is mandatory for the cohort pricing to stay locked."
                              >
                                <AgreementCheckbox
                                  name="caseStudy"
                                  checked={form.agreements.caseStudy}
                                  onChange={(value) =>
                                    setForm((f) => ({
                                      ...f,
                                      agreements: { ...f.agreements, caseStudy: value },
                                    }))
                                  }
                                  label="Case study data release"
                                  body="I understand that because Sthyra Digital is heavily subsidizing these launch pipelines, I grant explicit permission to anonymize and utilize my technical performance metrics (e.g., page-speed acceleration, ad hook conversion percentages, traffic retention graphs) for public case studies and performance portfolios."
                                />
                                <AgreementCheckbox
                                  name="assetFreeze"
                                  checked={form.agreements.assetFreeze}
                                  onChange={(value) =>
                                    setForm((f) => ({
                                      ...f,
                                      agreements: { ...f.agreements, assetFreeze: value },
                                    }))
                                  }
                                  label="Asset freeze policy & 7-day guarantee"
                                  body="I acknowledge that for the Alpha-50 Architecture Sprint, the ironclad 7-day delivery SLA and money-back guarantee does not initiate until Sthyra's onboarding portal registers a 100% complete upload of my required digital brand assets."
                                />
                                <AgreementCheckbox
                                  name="growthTrigger"
                                  checked={form.agreements.growthTrigger}
                                  onChange={(value) =>
                                    setForm((f) => ({
                                      ...f,
                                      agreements: { ...f.agreements, growthTrigger: value },
                                    }))
                                  }
                                  label="Growth trigger clause · Core-5 only"
                                  body="I understand that my subsidized fee of ₹25,000/month is locked for a 6-month period. I agree that the moment my monthly ad spend organically scales past ₹40,000 due to successful customer acquisition, my account will graduate into Sthyra's standard Creative + Performance optimization tier."
                                />
                              </StepShell>
                            ) : null}
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {submitState.kind === "success" ? (
                        <div className="rounded-[1.4rem] border-2 border-[#7ddc62] bg-[#1a2a18]/85 p-5 shadow-[0_12px_28px_rgba(0,0,0,0.45)] backdrop-blur-[2px]">
                          <p className="font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#7ddc62]">
                            application received
                          </p>
                          <p className="font-cabin-sketch mt-2 text-[clamp(1.25rem,2.4vw,1.7rem)] leading-tight text-white">
                            {submitState.message}
                          </p>
                          <button
                            type="button"
                            onClick={onClose}
                            className="font-cabin-sketch mt-4 rounded-full border-2 border-black/40 bg-[#ffd23f] px-4 py-2 text-[1rem] text-black shadow-[3px_3px_0_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5"
                          >
                            close
                          </button>
                        </div>
                      ) : (
                        <div className="mt-1 flex flex-wrap items-center justify-between gap-4 pt-2 sm:pt-3 lg:mt-1 lg:pt-3">
                          <p
                            className={`font-[family:var(--font-geist-mono)] text-[0.66rem] font-semibold uppercase tracking-[0.24em] ${
                              submitState.kind === "error"
                                ? submitMessageClassName
                                : "text-white/55"
                            }`}
                            role={submitState.message ? "status" : undefined}
                          >
                            {submitState.kind === "error"
                              ? submitState.message
                              : isLastStep
                                ? "all three agreements are required"
                                : "one question per step · 7 steps total"}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            {step > 0 ? (
                              <button
                                type="button"
                                onClick={goBack}
                                disabled={isSubmitting}
                                className="font-cabin-sketch rounded-full border-2 border-white/30 bg-white/10 px-4 py-2 text-[0.95rem] text-white shadow-[3px_3px_0_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 disabled:opacity-50"
                              >
                                back
                              </button>
                            ) : null}
                            {isLastStep ? (
                              <button
                                type="submit"
                                disabled={!canProceed || isSubmitting}
                                className="font-cabin-sketch rounded-full border-2 border-black/30 bg-[#ffd23f] px-4 py-2 text-[1rem] text-black shadow-[4px_4px_0_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:rotate-[-2deg] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 lg:px-5 lg:text-[1.15rem]"
                              >
                                {isSubmitting ? "sending..." : "submit application"}
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={goNext}
                                disabled={!canProceed}
                                className="font-cabin-sketch rounded-full border-2 border-black/30 bg-[#ffd23f] px-4 py-2 text-[1rem] text-black shadow-[4px_4px_0_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:rotate-[-2deg] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 lg:px-5 lg:text-[1.15rem]"
                              >
                                next →
                              </button>
                            )}
                          </div>
                        </div>
                      )}
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

function StepShell({
  children,
  eyebrow,
  helper,
  title,
}: {
  children: React.ReactNode;
  eyebrow: string;
  helper: string;
  title: string;
}) {
  return (
    <div className="space-y-4">
      <p className="font-[family:var(--font-geist-mono)] text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/55">
        {eyebrow}
      </p>
      <h3 className="font-cabin-sketch max-w-[24ch] text-[clamp(1.55rem,3.6vw,2.2rem)] leading-[0.98] text-white">
        {title}
      </h3>
      <p className="text-[0.88rem] leading-relaxed text-white/65">{helper}</p>
      <div className="space-y-3 pt-1">{children}</div>
    </div>
  );
}

function TextInput({
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  inputMode,
}: {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "url";
}) {
  return (
    <label className="block">
      <span className="font-cabin-sketch block text-[clamp(1.05rem,2.6vw,1.3rem)] leading-none text-white">
        {labelFor(name)}
      </span>
      <input
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="cohort-input mt-2"
      />
    </label>
  );
}

function labelFor(name: string) {
  switch (name) {
    case "companyName":
      return "company legal name";
    case "websiteUrl":
      return "website or landing page";
    case "founderName":
      return "primary founder / decision maker";
    case "whatsappNumber":
      return "direct contact number (WhatsApp enabled)";
    default:
      return name;
  }
}

function RadioList<T extends string>({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { value: T; label: string; hint?: string; meta?: string; price?: string }[];
  value: T | null;
  onChange: (value: T) => void;
}) {
  return (
    <div role="radiogroup" className="space-y-2.5">
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            type="button"
            key={option.value}
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={`flex w-full items-start gap-3 rounded-[1.2rem] border-2 px-4 py-3 text-left transition shadow-[3px_3px_0_rgba(0,0,0,0.35)] ${
              selected
                ? "border-[#ffd23f] bg-[#ffd23f]/15"
                : "border-white/18 bg-white/5 hover:border-white/40"
            }`}
          >
            <span
              className={`mt-1.5 inline-block h-3.5 w-3.5 flex-shrink-0 rounded-full border-2 ${
                selected ? "border-[#ffd23f] bg-[#ffd23f]" : "border-white/40 bg-transparent"
              }`}
            />
            <span className="block flex-1">
              <span className="font-cabin-sketch block text-[clamp(1.05rem,2.6vw,1.3rem)] leading-tight text-white">
                {option.label}
                {option.hint ? (
                  <span className="ml-1 text-[0.85rem] text-white/55">{option.hint}</span>
                ) : null}
              </span>
              {option.meta ? (
                <span className="mt-0.5 block text-[0.82rem] text-white/60">
                  {option.meta}
                </span>
              ) : null}
              {option.price ? (
                <span className="mt-1 block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#ffd23f]">
                  {option.price}
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
      <input type="hidden" name={name} value={value ?? ""} />
    </div>
  );
}

function AgreementCheckbox({
  body,
  checked,
  label,
  name,
  onChange,
}: {
  body: string;
  checked: boolean;
  label: string;
  name: string;
  onChange: (value: boolean) => void;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-[1.2rem] border-2 px-4 py-3 transition shadow-[3px_3px_0_rgba(0,0,0,0.35)] ${
        checked
          ? "border-[#7ddc62] bg-[#7ddc62]/12"
          : "border-white/15 bg-white/5 hover:border-white/35"
      }`}
    >
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1.5 h-4 w-4 flex-shrink-0 cursor-pointer accent-[#7ddc62]"
      />
      <span className="block">
        <span className="font-cabin-sketch block text-[clamp(1.05rem,2.6vw,1.3rem)] leading-tight text-white">
          {label}
        </span>
        <span className="mt-1 block text-[0.82rem] leading-relaxed text-white/60">
          {body}
        </span>
      </span>
    </label>
  );
}
