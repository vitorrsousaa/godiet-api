import { TFavoriteMeal } from '@/entities/favoriteMeal';

import { type Prisma, PrismaClient } from '@prisma/client';

export interface IFavoriteMealRepositories {
  findAll(
    findAllArgs: Prisma.FavoriteMealFindManyArgs
  ): Promise<TFavoriteMeal[]>;
  delete(deleteArgs: Prisma.FavoriteMealDeleteArgs): Promise<TFavoriteMeal>;
  create(createArgs: Prisma.FavoriteMealCreateArgs): Promise<TFavoriteMeal>;
}

class FavoriteMealRepositories implements IFavoriteMealRepositories {
  constructor(private readonly prismaService: PrismaClient) {}

  async findAll(findAllArgs: Prisma.FavoriteMealFindManyArgs) {
    return this.prismaService.favoriteMeal.findMany(findAllArgs);
  }

  async delete(deleteArgs: Prisma.FavoriteMealDeleteArgs) {
    return this.prismaService.favoriteMeal.delete(deleteArgs);
  }

  async create(createArgs: Prisma.FavoriteMealCreateArgs) {
    return this.prismaService.favoriteMeal.create(createArgs);
  }
}

export { FavoriteMealRepositories };
