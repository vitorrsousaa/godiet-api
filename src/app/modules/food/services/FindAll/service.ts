import { TFood } from '@/entities/food';
import { IFoodRepositories } from '@/repositories/food';

import * as z from 'zod';

export const FindAllServiceSchema = z.object({
  categoryId: z.string().uuid().or(z.undefined()),
});

export type TFindAll = z.infer<typeof FindAllServiceSchema>;

export type IFindAllInput = TFindAll;
export type IFindAllOutput = TFood[];

export interface IFindAllService {
  execute(findAllInput: IFindAllInput): Promise<IFindAllOutput>;
}

export class FindAllService implements IFindAllService {
  constructor(private readonly foodRepositories: IFoodRepositories) {}

  async execute(findAllInput: IFindAllInput): Promise<IFindAllOutput> {
    const { categoryId } = findAllInput;

    if (categoryId) {
      const tes = await this.foodRepositories.findAll({
        where: {
          categoryNameId: findAllInput.categoryId,
        },
        orderBy: {
          name: 'asc',
        },
      });
      return tes;
    }

    return this.foodRepositories.findAll({
      orderBy: {
        name: 'asc',
      },
    });
  }
}
