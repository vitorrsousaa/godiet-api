import { TPlanningMeal } from '@/entities/planningMeal';

import { type Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export interface IPlanningMealRepositories {
  create(createDTO: Prisma.PlanningMealCreateArgs): Promise<TPlanningMeal>;
  findAll(
    findAllArgs: Prisma.PlanningMealFindManyArgs
  ): Promise<TPlanningMeal[]>;
  findFirst(
    findFirstArgs: Prisma.PlanningMealFindFirstArgs
  ): Promise<TPlanningMeal | null>;
  delete(deleteArgs: Prisma.PlanningMealDeleteArgs): Promise<TPlanningMeal>;
  update(updateArgs: Prisma.PlanningMealUpdateArgs): Promise<TPlanningMeal>;
}

class PlanningMealRepositories implements IPlanningMealRepositories {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(createArgs: Prisma.PlanningMealCreateArgs) {
    return this.prismaService.planningMeal.create(createArgs);
  }

  findAll(
    findAllArgs: Prisma.PlanningMealFindManyArgs<DefaultArgs>
  ): Promise<TPlanningMeal[]> {
    return this.prismaService.planningMeal.findMany(findAllArgs);
  }

  findFirst(
    findFirstArgs: Prisma.PlanningMealFindFirstArgs
  ): Promise<TPlanningMeal | null> {
    return this.prismaService.planningMeal.findFirst(findFirstArgs);
  }

  async delete(deleteArgs: Prisma.PlanningMealDeleteArgs) {
    return this.prismaService.planningMeal.delete(deleteArgs);
  }

  update(updateArgs: Prisma.PlanningMealUpdateArgs) {
    return this.prismaService.planningMeal.update(updateArgs);
  }
}

export { PlanningMealRepositories };
