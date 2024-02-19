import { IAnamnesisRepository } from '@/repositories/anamnesis/repository';

import * as z from 'zod';

export const CreateServiceSchema = z.object({
  text: z.string(),
  title: z.string(),
  userId: z.string().uuid(),
  patientId: z.string().uuid(),
});

export type TCreate = z.infer<typeof CreateServiceSchema>;

export type ICreateInput = TCreate;

export interface ICreateOutput {
  id: string;
  userId: string;
  patientId: string;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  title: string;
}

export interface ICreateService {
  execute(createInput: ICreateInput): Promise<ICreateOutput>;
}

export class CreateService implements ICreateService {
  constructor(private readonly anamnesisRepository: IAnamnesisRepository) {}

  async execute(createInput: ICreateInput): Promise<ICreateOutput> {
    const { text, title, patientId, userId } = createInput;

    return this.anamnesisRepository.create({
      data: {
        text,
        title,
        patientId,
        userId,
      },
    });
  }
}
