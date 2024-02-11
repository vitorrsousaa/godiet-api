import * as z from 'zod';

export const DataBaseIdSchema = z.object({
  id: z.string().uuid(),
});

export type TDatabaseIdSchema = z.infer<typeof DataBaseIdSchema>;
