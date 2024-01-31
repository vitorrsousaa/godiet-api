import { IFoodRepositories } from '@/repositories/food';

import * as z from 'zod';

export const FindAllServiceSchema = z.object({
  name: z.string(),
});

export type TFindAll = z.infer<typeof FindAllServiceSchema>;

export interface IFindAllInput {
  name: string;
}

export interface IFindAllOutput {
  name: string;
}

export interface IFindAllService {
  execute(findAllInput: IFindAllInput): Promise<IFindAllOutput>;
}

export class FindAllService implements IFindAllService {
  constructor(private readonly foodRepositories: IFoodRepositories) {}

  async execute(findAllInput: IFindAllInput): Promise<IFindAllOutput> {
    return {
      name: findAllInput.name,
    };
  }
}
