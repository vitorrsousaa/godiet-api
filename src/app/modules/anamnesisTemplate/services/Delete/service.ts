import { IAnamnesisTemplateRepository } from '@/repositories/anamnesisTemplate';

import * as z from 'zod';

import { InvalidAnamnesis } from '../../errors/InvalidAnamnesis';

export const DeleteServiceSchema = z.object({
  anamnesisId: z.string(),
  userId: z.string().uuid(),
});

export type TDelete = z.infer<typeof DeleteServiceSchema>;

export type IDeleteInput = TDelete;

export type IDeleteOutput = null;

export interface IDeleteService {
  execute(deleteInput: IDeleteInput): Promise<IDeleteOutput>;
}

export class DeleteService implements IDeleteService {
  constructor(
    private readonly anamnesisTemplateRepository: IAnamnesisTemplateRepository
  ) {}

  async execute(deleteInput: IDeleteInput): Promise<IDeleteOutput> {
    try {
      await this.anamnesisTemplateRepository.delete({
        where: {
          id: deleteInput.anamnesisId,
          userId: deleteInput.userId,
        },
      });

      return null;
    } catch {
      throw new InvalidAnamnesis();
    }
  }
}
