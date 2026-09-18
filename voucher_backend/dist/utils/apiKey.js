import crypto from 'crypto';
export function hashApiKey(rawKey) {
    return crypto.createHash('sha256').update(rawKey).digest('hex');
}
export function generateApiKey() {
    const rawKey = crypto.randomBytes(32).toString('hex');
    return {
        rawKey,
        hash: hashApiKey(rawKey),
        prefix: rawKey.slice(0, 8),
    };
}
//# sourceMappingURL=apiKey.js.map