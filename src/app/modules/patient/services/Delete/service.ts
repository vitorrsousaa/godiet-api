import { IPatientRepositories } from '@/repositories/patient';

import * as z from 'zod';

import { PatientNotFound } from '../../errors/PatientNotFound';

export const DeleteServiceSchema = z.object({
  userId: z.string().uuid(),
  patientId: z.string().uuid(),
});

export type TDelete = z.infer<typeof DeleteServiceSchema>;

export type IDeleteInput = TDelete;

export type IDeleteOutput = null;

export interface IDeleteService {
  execute(deleteInput: IDeleteInput): Promise<IDeleteOutput>;
}

export class DeleteService implements IDeleteService {
  constructor(private readonly patientRepositories: IPatientRepositories) {}

  async execute(deleteInput: IDeleteInput): Promise<IDeleteOutput> {
    try {
      const { patientId, userId } = deleteInput;
      await this.patientRepositories.delete({
        where: {
          id: patientId,
          userId,
        },
      });

      return null;
    } catch (error) {
      throw new PatientNotFound();
    }
  }
}
