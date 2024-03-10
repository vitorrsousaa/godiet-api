import { prisma } from '@/database';
import { TAttribute, TFood, TMeasure } from '@/entities/food';

import { Prisma, PrismaClient } from '@prisma/client';

interface TFoodDatabase {
  id: string;
  baseUnit: string;
  baseQty: number;
  name: string;
  attributes: Prisma.JsonValue[];
  measures: Prisma.JsonValue[];
  categoryNameId: string;
  categoryName?: {
    id: string;
    baseProtein: number;
    baseCarbo: number;
    baseFat: number;
    baseEnergy: number;
    name: string;
  };
}

export interface IFoodRepositories {
  findAll(findAllArgs: Prisma.FoodFindManyArgs): Promise<TFood[]>;
  findUnique(findUniqueArgs: Prisma.FoodFindUniqueArgs): Promise<TFood | null>;
  findAllByIds(ids: string[]): Promise<string[]>;
}

class FoodRepositories implements IFoodRepositories {
  constructor(private readonly prismaService: PrismaClient) {}

  async findAll(findAllArgs: Prisma.FoodFindManyArgs) {
    const foods = await this.prismaService.food.findMany(findAllArgs);
    return foods.map(this.mapper);
  }

  async findUnique(findUniqueArgs: Prisma.FoodFindUniqueArgs) {
    const food = await this.prismaService.food.findUnique(findUniqueArgs);
    return food ? this.mapper(food) : null;
  }

  async findAllByIds(ids: string[]) {
    //   const query = `
    //   SELECT id FROM "foods"
    //   WHERE id IN (${ids.map((id) => `'${id}'`).join(', ')})
    // `;

    // const formattedIds = ids.map((id) => `UUID('${id}')`).join(', ');
    //   const query2 = `
    //   SELECT id FROM "foods"
    //   WHERE id IN (SELECT UNNEST(ARRAY[${formattedIds}]::UUID[]))
    // `;

    const array = [
      'dba74ed2-1cbe-4773-9809-a7c8f5323254',
      '284d82ba-85a4-43d0-a008-b2142190799e',
    ];

    await prisma.$queryRaw`
    SELECT id FROM "foods"
    WHERE id in (${array.join(',')})
    `;

    return ids;
  }

  private mapper(food: TFoodDatabase): TFood {
    return {
      id: food.id,
      baseQty: food.baseQty,
      baseUnit: food.baseUnit,
      categoryNameId: food.categoryNameId,
      name: food.name,
      attributes: food.attributes as TAttribute[],
      categoryName: food.categoryName,
      measures: food.measures as TMeasure[],
    };
  }
}

export { FoodRepositories };
