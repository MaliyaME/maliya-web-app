import { z } from 'zod';
import { insertWaitlistSchema, waitlistSignups } from './schema';

export { insertWaitlistSchema } from './schema';
export type { InsertWaitlist } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  conflict: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  waitlist: {
    signup: {
      method: 'POST' as const,
      path: '/api/waitlist',
      input: insertWaitlistSchema,
      responses: {
        201: z.custom<typeof waitlistSignups.$inferSelect>(),
        400: errorSchemas.validation,
        409: errorSchemas.conflict,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
