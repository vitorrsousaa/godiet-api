import { IAnamnesisRepository } from '@/repositories/anamnesis/repository';

import * as z from 'zod';

export const FindAllServiceSchema = z.object({
  userId: z.string().uuid(),
  patientId: z.string().uuid(),
});

export type TFindAll = z.infer<typeof FindAllServiceSchema>;

export type IFindAllInput = TFindAll;

type TAnamnesis = {
  id: string;
  userId: string;
  patientId: string;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  title: string;
};

export type IFindAllOutput = TAnamnesis[];

export interface IFindAllService {
  execute(findAllInput: IFindAllInput): Promise<IFindAllOutput>;
}

export class FindAllService implements IFindAllService {
  constructor(private readonly anamnesisRepositor: IAnamnesisRepository) {}

  async execute(findAllInput: IFindAllInput): Promise<IFindAllOutput> {
    const { patientId, userId } = findAllInput;

    return this.anamnesisRepositor.findAll({
      where: {
        patientId,
        userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
