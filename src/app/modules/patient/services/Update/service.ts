import { TPatient } from '@/entities/patient';
import { IPatientRepositories } from '@/repositories/patient';

import * as z from 'zod';

import { UpdatePatientSchema } from '../../dtos/update-patient-dto';
import { PatientAlreadyExists } from '../../errors/PatientAlreadyExists';

export const UpdateServiceSchema = z.object({
  userId: z.string().uuid(),
  patientId: z.string().uuid(),
  patient: UpdatePatientSchema,
});

export type TUpdate = z.infer<typeof UpdateServiceSchema>;

export type IUpdateInput = TUpdate;

export type IUpdateOutput = TPatient;

export interface IUpdateService {
  execute(updateInput: IUpdateInput): Promise<IUpdateOutput>;
}

interface IValidatePatientServiceParams {
  patientId: string;
  userId: string;
  patientEmail: string;
}

export class UpdateService implements IUpdateService {
  constructor(private readonly patientRepositories: IPatientRepositories) {}

  async execute(updateInput: IUpdateInput): Promise<IUpdateOutput> {
    const { patient, userId, patientId } = updateInput;
    const { email, birthDate, gender, height, weight } = patient;

    await this.validatePatient({
      userId,
      patientId,
      patientEmail: patient.email,
    });

    const updatePatient = await this.patientRepositories.update({
      where: {
        id: patientId,
      },
      data: {
        birthDate,
        gender,
        height,
        weight,
        email,
      },
    });

    return updatePatient;
  }

  private async validatePatient(
    validatePatientParams: IValidatePatientServiceParams
  ) {
    const { patientId, patientEmail } = validatePatientParams;
    return Promise.all([
      this.validateHasPatientWithEmail(patientEmail, patientId),
    ]);
  }

  private async validateHasPatientWithEmail(email: string, id: string) {
    const patient = await this.patientRepositories.findFirst({
      where: {
        email,
      },
    });

    if (patient && patient.id !== id) {
      throw new PatientAlreadyExists();
    }
  }
}
