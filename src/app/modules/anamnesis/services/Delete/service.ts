import { IAnamnesisRepository } from '@/repositories/anamnesis/repository';

import * as z from 'zod';

import { InvalidAnamnesis } from '../../errors/InvalidAnamnesis';

export const DeleteServiceSchema = z.object({
  userId: z.string().uuid(),
  patientId: z.string().uuid(),
  anamnesisId: z.string().uuid(),
});

export type TDelete = z.infer<typeof DeleteServiceSchema>;

export type IDeleteInput = TDelete;

export type IDeleteOutput = null;

export interface IDeleteService {
  execute(deleteInput: IDeleteInput): Promise<IDeleteOutput>;
}

export class DeleteService implements IDeleteService {
  constructor(private readonly anamnesisRepository: IAnamnesisRepository) {}

  async execute(deleteInput: IDeleteInput): Promise<IDeleteOutput> {
    const { anamnesisId, patientId, userId } = deleteInput;

    try {
      await this.anamnesisRepository.delete({
        where: {
          id: anamnesisId,
          patientId,
          userId,
        },
      });

      return null;
    } catch {
      throw new InvalidAnamnesis();
    }
  }
}
