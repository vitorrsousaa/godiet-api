import { TObservationTemplate } from '@/entities/observationTemplate';
import { IObservationTemplateRepository } from '@/repositories/observationTemplate';

import * as z from 'zod';

export const FindAllServiceSchema = z.object({
  userId: z.string().uuid(),
});

export type TFindAll = z.infer<typeof FindAllServiceSchema>;

export type IFindAllInput = TFindAll;

export type IFindAllOutput = TObservationTemplate[];

export interface IFindAllService {
  execute(findAllInput: IFindAllInput): Promise<IFindAllOutput>;
}

export class FindAllService implements IFindAllService {
  constructor(
    private readonly observationTemplateRepositories: IObservationTemplateRepository
  ) {}

  async execute(findAllInput: IFindAllInput): Promise<IFindAllOutput> {
    const { userId } = findAllInput;
    return this.observationTemplateRepositories.findMany({
      where: {
        userId,
      },
    });
  }
}
