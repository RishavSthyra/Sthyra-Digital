import nodemailer from "nodemailer";

type MailConfig = {
  from: string;
  host: string;
  pass: string;
  port: number;
  to: string;
  user: string;
};

type SendMailOptions = Parameters<
  ReturnType<typeof nodemailer.createTransport>["sendMail"]
>[0];

const DEFAULT_MIN_MAIL_SPACING_MS = 1200;
const DEFAULT_RETRY_DELAYS_MS = [0, 1500, 3000];

let mailQueue: Promise<void> = Promise.resolve();
let lastMailSentAt = 0;

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getRetryDelaysMs() {
  const configuredDelays = process.env.MAIL_RETRY_DELAYS_MS
    ?.split(",")
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isFinite(value) && value >= 0);

  return configuredDelays?.length ? configuredDelays : DEFAULT_RETRY_DELAYS_MS;
}

function getMinMailSpacingMs() {
  const value = Number(
    process.env.MAIL_MIN_SPACING_MS ?? DEFAULT_MIN_MAIL_SPACING_MS.toString(),
  );

  return Number.isFinite(value) && value >= 0
    ? value
    : DEFAULT_MIN_MAIL_SPACING_MS;
}

function isTransientMailError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();
  const responseCode = "responseCode" in error ? error.responseCode : undefined;

  return (
    message.includes("too many emails per second") ||
    message.includes("rate limit") ||
    message.includes("try again later") ||
    responseCode === 421 ||
    responseCode === 450 ||
    responseCode === 451 ||
    responseCode === 452
  );
}

function queueMailTask<T>(task: () => Promise<T>) {
  const runTask = async () => {
    const spacingMs = getMinMailSpacingMs();
    const waitMs = Math.max(lastMailSentAt + spacingMs - Date.now(), 0);

    if (waitMs > 0) {
      await delay(waitMs);
    }

    return task();
  };

  const queuedTask = mailQueue.then(runTask, runTask);
  mailQueue = queuedTask.then(
    () => undefined,
    () => undefined,
  );

  return queuedTask;
}

export function getMailConfig() {
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
  } satisfies MailConfig;
}

export function createMailTransporter(config: MailConfig) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

export async function sendMailWithRetry(
  config: MailConfig,
  message: SendMailOptions,
) {
  return queueMailTask(async () => {
    const transporter = createMailTransporter(config);
    const retryDelaysMs = getRetryDelaysMs();
    let lastError: unknown;

    for (let attempt = 0; attempt < retryDelaysMs.length; attempt += 1) {
      const delayMs = retryDelaysMs[attempt];

      if (delayMs > 0) {
        await delay(delayMs);
      }

      try {
        const result = await transporter.sendMail(message);
        lastMailSentAt = Date.now();
        return result;
      } catch (error) {
        lastError = error;

        if (
          attempt === retryDelaysMs.length - 1 ||
          !isTransientMailError(error)
        ) {
          throw error;
        }
      }
    }

    throw lastError instanceof Error
      ? lastError
      : new Error("Mail delivery failed.");
  });
}
