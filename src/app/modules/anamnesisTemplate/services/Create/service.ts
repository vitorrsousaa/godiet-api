import { TAnamnesisTemplate } from '@/entities/anamnesisTemplate';
import { IAnamnesisTemplateRepository } from '@/repositories/anamnesisTemplate';

import * as z from 'zod';

export const CreateServiceSchema = z.object({
  text: z.string(),
  title: z.string(),
  userId: z.string().uuid(),
});

export type TCreate = z.infer<typeof CreateServiceSchema>;

export type ICreateInput = TCreate;

export type ICreateOutput = TAnamnesisTemplate;

export interface ICreateService {
  execute(createInput: ICreateInput): Promise<ICreateOutput>;
}

export class CreateService implements ICreateService {
  constructor(
    private readonly anamnesisTemplateRepository: IAnamnesisTemplateRepository
  ) {}

  async execute(createInput: ICreateInput): Promise<ICreateOutput> {
    const { text, title, userId } = createInput;

    return this.anamnesisTemplateRepository.create({
      data: {
        text,
        title,
        userId,
      },
    });
  }
}
