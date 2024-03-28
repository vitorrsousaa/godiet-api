import { TObservationTemplate } from '@/entities/observationTemplate';
import { IObservationTemplateRepository } from '@/repositories/observationTemplate';

import * as z from 'zod';

export const CreateServiceSchema = z.object({
  userId: z.string().uuid(),
  observation: z.object({
    title: z.string().min(1),
    text: z.string().min(1),
  }),
});

export type TCreate = z.infer<typeof CreateServiceSchema>;

export type ICreateInput = TCreate;

export type ICreateOutput = TObservationTemplate;

export interface ICreateService {
  execute(createInput: ICreateInput): Promise<ICreateOutput>;
}

export class CreateService implements ICreateService {
  constructor(
    private readonly observationTemplateRepository: IObservationTemplateRepository
  ) {}

  async execute(createInput: ICreateInput): Promise<ICreateOutput> {
    const { userId, observation } = createInput;
    const { text, title } = observation;

    return this.observationTemplateRepository.create({
      data: {
        userId,
        text,
        title,
      },
    });
  }
}
