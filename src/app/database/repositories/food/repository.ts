import { TFood } from '@/entities/food';

import { type Prisma, PrismaClient } from '@prisma/client';

interface TFoodDatabase {
  id: string;
  baseUnit: string;
  baseQty: number;
  name: string;
  attributes: Prisma.JsonValue[];
  categoryNameId: string;
}

export interface IFoodRepositories {
  findAll(findAllArgs: Prisma.FoodFindManyArgs): Promise<TFood[]>;
}

class FoodRepositories implements IFoodRepositories {
  constructor(private readonly prismaService: PrismaClient) {}

  async findAll(findAllArgs: Prisma.FoodFindManyArgs) {
    const foods = await this.prismaService.food.findMany(findAllArgs);
    return foods.map(this.mapper);
  }

  private mapper(food: TFoodDatabase): TFood {
    return {
      id: food.id,
      baseQty: food.baseQty,
      baseUnit: food.baseUnit,
      categoryNameId: food.categoryNameId,
      name: food.name,
      attributes: food.attributes as Record<string, unknown>[],
    };
  }
}

export { FoodRepositories };
