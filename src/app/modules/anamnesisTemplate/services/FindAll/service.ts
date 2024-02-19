import { IAnamnesisTemplateRepository } from '@/repositories/anamnesisTemplate';

import * as z from 'zod';

export const FindAllServiceSchema = z.object({
  userId: z.string().uuid(),
});

export type TFindAll = z.infer<typeof FindAllServiceSchema>;

export type IFindAllInput = TFindAll;

export type IFindAllOutput = AnamnesisTemplate[];

type AnamnesisTemplate = {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  title: string;
};

export interface IFindAllService {
  execute(findAllInput: IFindAllInput): Promise<IFindAllOutput>;
}

export class FindAllService implements IFindAllService {
  constructor(
    private readonly anamnesisTemplateRepository: IAnamnesisTemplateRepository
  ) {}

  async execute(findAllInput: IFindAllInput): Promise<IFindAllOutput> {
    const { userId } = findAllInput;
    return this.anamnesisTemplateRepository.findMany({
      where: {
        userId,
      },
    });
  }
}
