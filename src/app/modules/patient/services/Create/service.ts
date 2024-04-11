import { GenderEnum } from '@/entities/gender';
import { InvalidCredentials } from '@/errors';
import { IPatientRepositories } from '@/repositories/patient';

import * as z from 'zod';

export const CreatePatientServiceSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail format' }),
  name: z.string(),
  birthDate: z.string().optional(),
  gender: GenderEnum.optional(),
  phone: z.string().min(8),
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
    const { birthDate, email, gender, name, phone } = patient;

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
        name,
        gender,
        userId,
        phone,
      },
    });

    return {
      patient: newPatient,
    };
  }
}
