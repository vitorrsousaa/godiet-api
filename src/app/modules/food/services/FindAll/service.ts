import { TFood } from '@/entities/food';
import { IFoodRepositories } from '@/repositories/food';

import * as z from 'zod';

export const FindAllServiceSchema = z.object({
  categoryId: z.string().uuid().or(z.undefined()),
});

export type TFindAll = z.infer<typeof FindAllServiceSchema>;

export type IFindAllInput = null;
export type IFindAllOutput = TFood[];

export interface IFindAllService {
  execute(): Promise<IFindAllOutput>;
}

export class FindAllService implements IFindAllService {
  constructor(private readonly foodRepositories: IFoodRepositories) {}

  async execute(): Promise<IFindAllOutput> {
    return this.foodRepositories.findAll({
      orderBy: {
        name: 'asc',
      },
    });
  }
}
