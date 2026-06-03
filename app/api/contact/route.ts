import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { z } from "zod";
import { consumeRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const contactPayloadSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(80, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .max(254, "Email is too long.")
    .email("Please enter a valid email address."),
  idea: z
    .string()
    .trim()
    .min(1, "Project is required.")
    .max(120, "Project is too long."),
  note: z
    .string()
    .trim()
    .min(1, "Note is required.")
    .max(5000, "Note is too long."),
});

type ContactPayload = z.infer<typeof contactPayloadSchema>;

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

  return ipAddress ? `ip:${ipAddress}` : `ua:${userAgent}`;
};

const getRateLimitConfig = () => {
  const limit = Number(process.env.CONTACT_RATE_LIMIT_MAX ?? "5");
  const windowMs = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS ?? "600000");

  return {
    limit: Number.isFinite(limit) && limit > 0 ? limit : 5,
    windowMs: Number.isFinite(windowMs) && windowMs > 0 ? windowMs : 600000,
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

const getMailConfig = () => {
  const host = process.env.MAILTRAP_HOST;
  const port = Number(process.env.MAILTRAP_PORT ?? "2525");
  const user = process.env.MAILTRAP_USER;
  const pass = process.env.MAILTRAP_PASS;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!host || !user || !pass || !to || !from || Number.isNaN(port)) {
    return null;
  }

  return {
    from,
    host,
    pass,
    port,
    to,
    user,
  };
};

export async function POST(request: Request) {
  const mailConfig = getMailConfig();
  const rateLimit = consumeRateLimit(
    getClientIdentifier(request),
    getRateLimitConfig(),
  );

  if (!mailConfig) {
    return NextResponse.json(
      { message: "Mail service is not configured yet." },
      { status: 500 },
    );
  }

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
      { message: "Too many contact requests. Please wait a bit and try again." },
      {
        status: 429,
        headers: {
          ...buildRateLimitHeaders(rateLimit),
          ...buildRetryAfterHeader(rateLimit.resetAt),
        },
      },
    );
  }

  const parsedPayload = contactPayloadSchema.safeParse(body);

  if (!parsedPayload.success) {
    return NextResponse.json(
      { message: parsedPayload.error.issues[0]?.message ?? "Invalid form data." },
      {
        status: 400,
        headers: buildRateLimitHeaders(rateLimit),
      },
    );
  }

  const payload: ContactPayload = parsedPayload.data;

  const transporter = nodemailer.createTransport({
    host: mailConfig.host,
    port: mailConfig.port,
    secure: mailConfig.port === 465,
    auth: {
      user: mailConfig.user,
      pass: mailConfig.pass,
    },
  });

  try {
    const safeName = escapeHtml(payload.name);
    const safeEmail = escapeHtml(payload.email);
    const safeIdea = escapeHtml(payload.idea);
    const safeNote = escapeHtml(payload.note).replace(/\n/g, "<br />");

    await transporter.sendMail({
      from: mailConfig.from,
      to: mailConfig.to,
      replyTo: payload.email,
      subject: `New Sthyra contact: ${payload.idea}`,
      text: [
        "New contact form submission",
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Project: ${payload.idea}`,
        "",
        "Note:",
        payload.note,
      ].join("\n"),
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Project:</strong> ${safeIdea}</p>
        <p><strong>Note:</strong></p>
        <p>${safeNote}</p>
      `,
    });

    return NextResponse.json({
      message: "Your note has been pinned and sent successfully.",
    }, {
      headers: buildRateLimitHeaders(rateLimit),
    });
  } catch (error) {
    console.error("Contact form email failed", error);

    return NextResponse.json(
      { message: "The note could not be sent right now. Please try again." },
      {
        status: 500,
        headers: buildRateLimitHeaders(rateLimit),
      },
    );
  }
}
