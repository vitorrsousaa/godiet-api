import { IAnamnesisRepository } from '@/repositories/anamnesis/repository';

import * as z from 'zod';

import { AnamnesisNotFound } from '../../errors/AnamnesisNotFound';

export const UpdateServiceSchema = z.object({
  userId: z.string().uuid(),
  patientId: z.string().uuid(),
  anamnesis: z.object({
    title: z.string(),
    text: z.string(),
    id: z.string().uuid(),
  }),
});

export type TUpdate = z.infer<typeof UpdateServiceSchema>;

export type IUpdateInput = TUpdate;

export interface IUpdateOutput {
  name: string;
}

export interface IUpdateService {
  execute(updateInput: IUpdateInput): Promise<IUpdateOutput>;
}

export class UpdateService implements IUpdateService {
  constructor(private readonly anamnesisRepository: IAnamnesisRepository) {}

  async execute(updateInput: IUpdateInput): Promise<IUpdateOutput> {
    const { patientId, anamnesis, userId } = updateInput;

    const { text, title, id } = anamnesis;

    try {
      const anamnesis = await this.anamnesisRepository.update({
        where: {
          id: id,
          patientId,
          userId,
        },
        data: {
          title: title,
          text: text,
        },
      });

      return {
        name: anamnesis.title,
      };
    } catch {
      throw new AnamnesisNotFound();
    }
  }
}
