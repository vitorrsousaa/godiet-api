import { IFavoriteMealRepositories } from '@/repositories/favoritesMeal';

import * as z from 'zod';

import { InvalidFavoriteMeal } from '../../errors/InvalidFavoriteMeal';

export const DeleteServiceSchema = z.object({
  userId: z.string().uuid(),
  favoriteMealId: z.string().uuid(),
});

export type TDelete = z.infer<typeof DeleteServiceSchema>;

export type IDeleteInput = TDelete;

export type IDeleteOutput = null;

export interface IDeleteService {
  execute(deleteInput: IDeleteInput): Promise<IDeleteOutput>;
}

export class DeleteService implements IDeleteService {
  constructor(
    private readonly favoriteMealRepositories: IFavoriteMealRepositories
  ) {}

  async execute(deleteInput: IDeleteInput): Promise<IDeleteOutput> {
    const { favoriteMealId, userId } = deleteInput;

    try {
      await this.favoriteMealRepositories.delete({
        where: {
          id: favoriteMealId,
          userId,
        },
      });

      return null;
    } catch {
      throw new InvalidFavoriteMeal();
    }
  }
}
