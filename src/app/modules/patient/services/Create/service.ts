import { GenderEnum } from '@/entities/gender';
import { InvalidCredentials } from '@/errors';
import { IPatientRepositories } from '@/repositories/patient';

import * as z from 'zod';

export const CreatePatientServiceSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail format' }),
  name: z.string(),
  height: z.number().positive().optional(),
  weight: z.number().positive().optional(),
  birthDate: z
    .string()
    .pipe(z.coerce.date())
    .refine((date) => date <= new Date(), {
      message: 'Birth date cannot be in the future',
    })
    .optional(),
  gender: GenderEnum.optional(),
});

export type TCreatePatientDTO = z.infer<typeof CreatePatientServiceSchema>;

export interface ICreateInput {
  patient: TCreatePatientDTO;
  userId: string;
}

export interface ICreateOutput {
  patient: {
    name: string;
  };
}

export interface ICreateService {
  execute(createInput: ICreateInput): Promise<ICreateOutput>;
}

export class CreateService implements ICreateService {
  constructor(private readonly patientRepositories: IPatientRepositories) {}

  async execute(createInput: ICreateInput): Promise<ICreateOutput> {
    const { patient, userId } = createInput;
    const { birthDate, email, gender, height, name, weight } = patient;

    const findPatient = await this.patientRepositories.findUnique({
      where: {
        email,
      },
    });

    if (findPatient) {
      throw new InvalidCredentials('Email already in use', 409);
    }

    const newPatient = await this.patientRepositories.create({
      data: {
        birthDate,
        email,
        height,
        name,
        weight,
        gender,
        userId,
      },
    });

    return {
      patient: newPatient,
    };
  }
}
