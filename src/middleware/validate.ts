import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';

type Location = 'body' | 'params' | 'query';

export const validate = (schema: ZodSchema<any>, location: Location = 'body') => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const target = location === 'body' ? req.body : location === 'params' ? req.params : req.query;
  const parsed = schema.safeParse(target);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten() });
  }

  if (location === 'body') req.body = parsed.data;
  else if (location === 'params') req.params = parsed.data as any;
  else req.query = parsed.data as any;

  next();
};

