import { TPatient } from '@/entities/patient';
import { IPatientRepositories } from '@/repositories/patient';

import * as z from 'zod';

export const FindByPatientIdServiceSchema = z.object({
  userId: z.string().uuid(),
  patientId: z.string().uuid(),
});

export type TFindByPatientId = z.infer<typeof FindByPatientIdServiceSchema>;

export type IFindByPatientIdInput = TFindByPatientId;

export type IFindByPatientIdOutput = TPatient | null;

export interface IFindByPatientIdService {
  execute(
    findByPatientIdInput: IFindByPatientIdInput
  ): Promise<IFindByPatientIdOutput>;
}

export class FindByPatientIdService implements IFindByPatientIdService {
  constructor(private readonly patientRepositories: IPatientRepositories) {}

  async execute(
    findByPatientIdInput: IFindByPatientIdInput
  ): Promise<IFindByPatientIdOutput> {
    const { userId, patientId } = findByPatientIdInput;

    return this.patientRepositories.findUnique({
      where: {
        id: patientId,
        userId: userId,
      },
    });
  }
}
