import { IObservationTemplateRepository } from '@/repositories/observationTemplate';

import * as z from 'zod';

import { ObservationTemplateNotFound } from '../../errors/notFound';

export const DeleteServiceSchema = z.object({
  userId: z.string().uuid(),
  observationTemplateId: z.string().uuid(),
});

export type TDelete = z.infer<typeof DeleteServiceSchema>;

export type IDeleteInput = TDelete;

export type IDeleteOutput = null;

export interface IDeleteService {
  execute(deleteInput: IDeleteInput): Promise<IDeleteOutput>;
}

export class DeleteService implements IDeleteService {
  constructor(
    private readonly observationTemplateRepositories: IObservationTemplateRepository
  ) {}

  async execute(deleteInput: IDeleteInput): Promise<IDeleteOutput> {
    const { observationTemplateId, userId } = deleteInput;

    try {
      await this.observationTemplateRepositories.delete({
        where: {
          id: observationTemplateId,
          userId,
        },
      });

      return null;
    } catch {
      throw new ObservationTemplateNotFound();
    }
  }
}
