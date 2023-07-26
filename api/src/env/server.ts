import { z, ZodFormattedError } from 'zod';

const envSchema = z.object({
  FRONTEND_URL: z.string(),

  DATABASE_URL: z.string(),

  APP_SECRET: z.string(),

  PORT: z.string().regex(/^\d+$/).transform(Number).optional(),

  JWT_SECRET: z.string(),
  JWT_TOKEN_AUDIENCE: z.string(),
  JWT_TOKEN_ISSUER: z.string(),
  JWT_ACCESS_TOKEN_TTL: z.string().regex(/^\d+$/).transform(Number),
  JWT_REFRESH_TOKEN_TTL: z.string().regex(/^\d+$/).transform(Number),

  TFA_APP_NAME: z.string(),

  REDISHOST: z.string(),
  REDISPASSWORD: z.string(),
  REDISPORT: z.string().regex(/^\d+$/).transform(Number),
  REDISUSER: z.string(),
});

const _env = envSchema.safeParse(process.env);

const formatErrors = (errors: ZodFormattedError<Map<string, string>, string>) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && '_errors' in value)
        return `${name}: ${value._errors.join(', ')}\n`;
    })
    .filter(Boolean);

if (!_env.success) {
  console.error(
    '❌ Invalid environment variables:\n',
    ...formatErrors(_env.error.format()),
  );
  throw new Error('Invalid environment variables');
}

export const env = _env.data;
