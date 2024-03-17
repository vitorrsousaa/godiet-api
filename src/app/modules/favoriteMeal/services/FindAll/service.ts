import { TFavoriteMeal } from '@/entities/favoriteMeal';
import { IFavoriteMealRepositories } from '@/repositories/favoritesMeal';

import * as z from 'zod';

export const FindAllServiceSchema = z.object({
  userId: z.string().uuid(),
});

export type TFindAll = z.infer<typeof FindAllServiceSchema>;

export type IFindAllInput = TFindAll;

export type IFindAllOutput = TFavoriteMeal[];

export interface IFindAllService {
  execute(findAllInput: IFindAllInput): Promise<IFindAllOutput>;
}

export class FindAllService implements IFindAllService {
  constructor(
    private readonly favoriteMealRepositories: IFavoriteMealRepositories
  ) {}

  async execute(findAllInput: IFindAllInput): Promise<IFindAllOutput> {
    const { userId } = findAllInput;

    return this.favoriteMealRepositories.findAll({
      where: {
        userId,
      },
    });
  }
}
