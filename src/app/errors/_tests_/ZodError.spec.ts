import * as z from 'zod';

import { ZodError } from '../zod';

describe('ZodError', () => {
  it('should create an instance of ZodError with Zod error messages', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    });

    try {
      schema.parse({ name: 'John' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (zodError: any) {
      const error = new ZodError(zodError);

      expect(error.message).toHaveLength(1);

      expect(error.message[0]).toEqual({
        field: 'age',
        message: 'Required',
      });
    }
  });

  it('should return statusCode 422 by default', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    });

    try {
      schema.parse({ name: 'John' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (zodError: any) {
      const error = new ZodError(zodError);

      expect(error.statusCode).toEqual(422);
    }
  });
});
