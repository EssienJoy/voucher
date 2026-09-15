import crypto from 'crypto';

export function hashApiKey(rawKey: string): string {
  return crypto.createHash('sha256').update(rawKey).digest('hex');
}

export function generateApiKey(): {
  rawKey: string;
  hash: string;
  prefix: string;
} {
  const rawKey = crypto.randomBytes(32).toString('hex');

  return {
    rawKey,
    hash: hashApiKey(rawKey),
    prefix: rawKey.slice(0, 8),
  };
}
