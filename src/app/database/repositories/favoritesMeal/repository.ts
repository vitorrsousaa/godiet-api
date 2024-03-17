import { TFavoriteMeal } from '@/entities/favoriteMeal';

import { type Prisma, PrismaClient } from '@prisma/client';

export interface IFavoriteMealRepositories {
  findAll(
    findAllArgs: Prisma.FavoriteMealFindManyArgs
  ): Promise<TFavoriteMeal[]>;
}

class FavoriteMealRepositories implements IFavoriteMealRepositories {
  constructor(private readonly prismaService: PrismaClient) {}

  async findAll(findAllArgs: Prisma.FavoriteMealFindManyArgs) {
    return this.prismaService.favoriteMeal.findMany(findAllArgs);
  }
}

export { FavoriteMealRepositories };
