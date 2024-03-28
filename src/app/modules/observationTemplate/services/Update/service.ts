import { TObservationTemplate } from '@/entities/observationTemplate';
import { IObservationTemplateRepository } from '@/repositories/observationTemplate';

import * as z from 'zod';

import { ObservationTemplateNotFound } from '../../errors/notFound';

export const UpdateServiceSchema = z.object({
  userId: z.string().uuid(),
  observation: z.object({
    title: z.string().min(1),
    text: z.string().min(1),
    id: z.string().uuid(),
  }),
});

export type TUpdate = z.infer<typeof UpdateServiceSchema>;

export type IUpdateInput = TUpdate;

export type IUpdateOutput = TObservationTemplate;

export interface IUpdateService {
  execute(updateInput: IUpdateInput): Promise<IUpdateOutput>;
}

export class UpdateService implements IUpdateService {
  constructor(
    private readonly observationTemplateRepository: IObservationTemplateRepository
  ) {}

  async execute(updateInput: IUpdateInput): Promise<IUpdateOutput> {
    const { userId, observation } = updateInput;

    const { text, title, id } = observation;
    try {
      const observationTemplate =
        await this.observationTemplateRepository.update({
          where: {
            id,
            userId,
          },
          data: {
            text,
            title,
          },
        });

      return observationTemplate;
    } catch {
      throw new ObservationTemplateNotFound();
    }
  }
}
