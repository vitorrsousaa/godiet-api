import { z } from 'zod';

import { GenderEnum } from './gender';

export const PatientSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail format' }),
  name: z.string(),
  birthDate: z
    .string()
    .pipe(z.coerce.date())
    .refine((date) => date <= new Date(), {
      message: 'Birth date cannot be in the future',
    })
    .nullable(),
  gender: GenderEnum.nullable(),
  id: z.string().uuid(),
  userId: z.string().uuid(),
});

export type TPatient = z.infer<typeof PatientSchema>;
