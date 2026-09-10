function requireEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}
export const env = {
    DATABASE_URI: requireEnv('DATABASE_URI'),
    DATABASE_PASSWORD: requireEnv('DATABASE_PASSWORD'),
    JWT_SECRET: requireEnv('JWT_SECRET'),
    JWT_EXPIRES: requireEnv('JWT_EXPIRES'),
    JWT_COOKIE_EXPIRES_IN: Number(requireEnv('JWT_COOKIE_EXPIRES_IN')),
    PORT: process.env.PORT,
};
//# sourceMappingURL=env.js.map