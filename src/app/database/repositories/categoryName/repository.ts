import { TCategoryName } from '@/entities/categoryName';

import { type Prisma, PrismaClient } from '@prisma/client';

export interface ICategoryNameRepositories {
  findAll(
    findAllArgs: Prisma.CategoryNameFindManyArgs
  ): Promise<TCategoryName[]>;
}

class CategoryNameRepositories implements ICategoryNameRepositories {
  constructor(private readonly prismaService: PrismaClient) {}

  async findAll(findAllArgs: Prisma.CategoryNameFindManyArgs) {
    return this.prismaService.categoryName.findMany(findAllArgs);
  }
}

export { CategoryNameRepositories };
