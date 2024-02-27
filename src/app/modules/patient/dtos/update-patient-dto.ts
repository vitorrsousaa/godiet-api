import { GenderEnum } from '@/entities/gender';

import * as z from 'zod';

export const UpdatePatientSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail format' }),
  name: z.string(),
  height: z.number().positive().optional(),
  weight: z.number().positive().optional(),
  birthDate: z.string().pipe(z.coerce.date()).optional(),
  gender: GenderEnum.optional(),
});

export type IUpdatePatientDTO = z.infer<typeof UpdatePatientSchema>;
