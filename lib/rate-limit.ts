type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

type RateLimitResult = {
  limit: number;
  remaining: number;
  resetAt: number;
  success: boolean;
};

type RateLimitStoreEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitStoreEntry>();
let lastSweepAt = 0;

function sweepExpiredEntries(now: number) {
  if (now - lastSweepAt < 60000) {
    return;
  }

  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }

  lastSweepAt = now;
}

export function consumeRateLimit(
  key: string,
  { limit, windowMs }: RateLimitOptions,
): RateLimitResult {
  const now = Date.now();
  sweepExpiredEntries(now);
  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetAt <= now) {
    const resetAt = now + windowMs;
    rateLimitStore.set(key, { count: 1, resetAt });

    return {
      limit,
      remaining: Math.max(limit - 1, 0),
      resetAt,
      success: true,
    };
  }

  entry.count += 1;
  rateLimitStore.set(key, entry);

  return {
    limit,
    remaining: Math.max(limit - entry.count, 0),
    resetAt: entry.resetAt,
    success: entry.count <= limit,
  };
}
