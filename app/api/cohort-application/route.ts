import { NextResponse } from "next/server";
import { z } from "zod";
import { getMailConfig, sendMailWithRetry } from "@/lib/mail";
import { consumeRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const offerSchema = z.enum(["alpha-50", "core-5", "full-stack"]);
const adSpendSchema = z.enum(["under-15k", "15-30k", "30-50k", "above-50k"]);
const bottleneckSchema = z.enum([
  "slow-website",
  "creative-fatigue",
  "high-spend-low-conversion",
  "all-of-the-above",
]);
const assetReadinessSchema = z.enum([
  "locked",
  "70-percent",
  "starting-from-scratch",
]);

const cohortApplicationSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, "Company name is required.")
    .max(120, "Company name is too long."),
  websiteUrl: z
    .string()
    .trim()
    .max(300, "Website URL is too long.")
    .optional()
    .default(""),
  founderName: z
    .string()
    .trim()
    .min(1, "Founder name is required.")
    .max(120, "Founder name is too long."),
  whatsappNumber: z
    .string()
    .trim()
    .min(7, "Please enter a valid contact number.")
    .max(40, "Contact number is too long."),
  offer: offerSchema,
  adSpend: adSpendSchema,
  productDescription: z
    .string()
    .trim()
    .min(20, "Please add at least a short description of your product.")
    .max(4000, "Product description is too long."),
  bottleneck: bottleneckSchema,
  assetReadiness: assetReadinessSchema,
  agreements: z.object({
    caseStudy: z.boolean(),
    assetFreeze: z.boolean(),
    growthTrigger: z.boolean(),
  }),
});

type CohortApplicationPayload = z.infer<typeof cohortApplicationSchema>;

const AGREEMENT_LABELS: Record<keyof CohortApplicationPayload["agreements"], string> = {
  caseStudy: "Case study data release",
  assetFreeze: "Asset freeze policy",
  growthTrigger: "Growth trigger clause",
};

const agreementCheck = (payload: unknown) => {
  const parsed = cohortApplicationSchema.safeParse(payload);
  if (parsed.success) {
    const { agreements } = parsed.data;
    for (const key of ["caseStudy", "assetFreeze", "growthTrigger"] as const) {
      if (!agreements[key]) {
        return {
          success: false as const,
          message: `${AGREEMENT_LABELS[key]} must be acknowledged.`,
        };
      }
    }
    return { success: true as const };
  }
  return {
    success: false as const,
    message: parsed.error.issues[0]?.message ?? "Invalid application data.",
  };
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const getClientIdentifier = (request: Request) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const userAgent = request.headers.get("user-agent") ?? "unknown-agent";

  const ipAddress = forwardedFor?.split(",")[0]?.trim() || realIp?.trim();

  return ipAddress ? `cohort-ip:${ipAddress}` : `cohort-ua:${userAgent}`;
};

const getRateLimitConfig = () => {
  const limit = Number(process.env.COHORT_RATE_LIMIT_MAX ?? "3");
  const windowMs = Number(
    process.env.COHORT_RATE_LIMIT_WINDOW_MS ?? "1800000",
  );

  return {
    limit: Number.isFinite(limit) && limit > 0 ? limit : 3,
    windowMs: Number.isFinite(windowMs) && windowMs > 0 ? windowMs : 1800000,
  };
};

const buildRateLimitHeaders = (rateLimit: {
  limit: number;
  remaining: number;
  resetAt: number;
}) => ({
  "X-RateLimit-Limit": rateLimit.limit.toString(),
  "X-RateLimit-Remaining": rateLimit.remaining.toString(),
  "X-RateLimit-Reset": Math.ceil(rateLimit.resetAt / 1000).toString(),
});

const buildRetryAfterHeader = (resetAt: number) => ({
  "Retry-After": Math.max(Math.ceil((resetAt - Date.now()) / 1000), 0).toString(),
});

const offerLabel = (offer: CohortApplicationPayload["offer"]) => {
  switch (offer) {
    case "alpha-50":
      return "The Alpha-50 Architecture Sprint (₹30,000 flat · 7-Day Web Build)";
    case "core-5":
      return "The Core-5 Growth Incubator (₹25,000/mo · Social + PPC)";
    case "full-stack":
      return "The Full-Stack Combined Engine (Web + Growth)";
  }
};

const adSpendLabel = (spend: CohortApplicationPayload["adSpend"]) => {
  switch (spend) {
    case "under-15k":
      return "Under ₹15,000 / month";
    case "15-30k":
      return "₹15,000 — ₹30,000 / month";
    case "30-50k":
      return "₹30,000 — ₹50,000 / month";
    case "above-50k":
      return "Above ₹50,000 / month";
  }
};

const bottleneckLabel = (bottleneck: CohortApplicationPayload["bottleneck"]) => {
  switch (bottleneck) {
    case "slow-website":
      return "Slow, poorly coded, or outdated website architecture";
    case "creative-fatigue":
      return "Creative fatigue / unable to produce winning video hooks & reels";
    case "high-spend-low-conversion":
      return "High ad spend with low lead conversion and poor attribution";
    case "all-of-the-above":
      return "All of the above";
  }
};

const assetReadinessLabel = (
  readiness: CohortApplicationPayload["assetReadiness"],
) => {
  switch (readiness) {
    case "locked":
      return "100% Locked & Loaded — ready to deploy today";
    case "70-percent":
      return "70% Ready — needs offer copy polishing";
    case "starting-from-scratch":
      return "Starting from Scratch — needs visual & content help";
  }
};

export async function POST(request: Request) {
  const rateLimit = consumeRateLimit(
    getClientIdentifier(request),
    getRateLimitConfig(),
  );

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  if (!rateLimit.success) {
    return NextResponse.json(
      {
        message:
          "Too many cohort applications from this device. Please wait and try again.",
      },
      {
        status: 429,
        headers: {
          ...buildRateLimitHeaders(rateLimit),
          ...buildRetryAfterHeader(rateLimit.resetAt),
        },
      },
    );
  }

  const validation = agreementCheck(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        message: validation.message,
      },
      {
        status: 400,
        headers: buildRateLimitHeaders(rateLimit),
      },
    );
  }

  const payload = (cohortApplicationSchema.parse(body)) as CohortApplicationPayload;

  const mailConfig = getMailConfig();

  // If mail is not configured, we still accept the application (success path)
  // so the cohort desk can be wired into another pipeline later.
  if (!mailConfig) {
    return NextResponse.json(
      {
        message:
          "Your application has been received. The cohort desk will respond within 24 hours.",
      },
      { headers: buildRateLimitHeaders(rateLimit) },
    );
  }

  try {
    const safeCompany = escapeHtml(payload.companyName);
    const safeWebsite = escapeHtml(payload.websiteUrl || "—");
    const safeFounder = escapeHtml(payload.founderName);
    const safeWhatsapp = escapeHtml(payload.whatsappNumber);
    const safeProduct = escapeHtml(payload.productDescription).replace(
      /\n/g,
      "<br />",
    );
    const safeOffer = escapeHtml(offerLabel(payload.offer));
    const safeAdSpend = escapeHtml(adSpendLabel(payload.adSpend));
    const safeBottleneck = escapeHtml(bottleneckLabel(payload.bottleneck));
    const safeReadiness = escapeHtml(assetReadinessLabel(payload.assetReadiness));

    await sendMailWithRetry(mailConfig, {
      from: mailConfig.from,
      to: mailConfig.to,
      replyTo: undefined,
      subject: `Alpha Cohort application — ${payload.companyName} (${payload.offer})`,
      text: [
        "New Alpha Cohort application",
        "",
        `Company: ${payload.companyName}`,
        `Website: ${payload.websiteUrl || "—"}`,
        `Founder: ${payload.founderName}`,
        `WhatsApp: ${payload.whatsappNumber}`,
        "",
        `Offer: ${offerLabel(payload.offer)}`,
        `Ad spend: ${adSpendLabel(payload.adSpend)}`,
        `Bottleneck: ${bottleneckLabel(payload.bottleneck)}`,
        `Asset readiness: ${assetReadinessLabel(payload.assetReadiness)}`,
        "",
        "Product / service description:",
        payload.productDescription,
        "",
        "Agreements:",
        `- Case study data release: ${payload.agreements.caseStudy ? "yes" : "no"}`,
        `- Asset freeze policy: ${payload.agreements.assetFreeze ? "yes" : "no"}`,
        `- Growth trigger clause: ${payload.agreements.growthTrigger ? "yes" : "no"}`,
      ].join("\n"),
      html: `
        <h2>New Alpha Cohort application</h2>
        <p><strong>Company:</strong> ${safeCompany}</p>
        <p><strong>Website:</strong> ${safeWebsite}</p>
        <p><strong>Founder:</strong> ${safeFounder}</p>
        <p><strong>WhatsApp:</strong> ${safeWhatsapp}</p>
        <hr />
        <p><strong>Offer:</strong> ${safeOffer}</p>
        <p><strong>Ad spend:</strong> ${safeAdSpend}</p>
        <p><strong>Bottleneck:</strong> ${safeBottleneck}</p>
        <p><strong>Asset readiness:</strong> ${safeReadiness}</p>
        <hr />
        <p><strong>Product / service description:</strong></p>
        <p>${safeProduct}</p>
        <hr />
        <p><strong>Agreements:</strong></p>
        <ul>
          <li>Case study data release: ${payload.agreements.caseStudy ? "yes" : "no"}</li>
          <li>Asset freeze policy: ${payload.agreements.assetFreeze ? "yes" : "no"}</li>
          <li>Growth trigger clause: ${payload.agreements.growthTrigger ? "yes" : "no"}</li>
        </ul>
      `,
    });

    return NextResponse.json(
      {
        message:
          "Your application has been received. The cohort desk will respond within 24 hours.",
      },
      { headers: buildRateLimitHeaders(rateLimit) },
    );
  } catch (error) {
    console.error("Cohort application email failed", error);

    return NextResponse.json(
      {
        message:
          "We could not send your application right now. Please try again in a moment.",
      },
      {
        status: 500,
        headers: buildRateLimitHeaders(rateLimit),
      },
    );
  }
}
