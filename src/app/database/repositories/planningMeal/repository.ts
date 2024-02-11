import { type Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export interface TPlanningMeal {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  userId: string;
  patientId: string;
}

export interface IPlanningMealRepositories {
  create(createDTO: Prisma.PlanningMealCreateArgs): Promise<TPlanningMeal>;
  findAll(
    findAllArgs: Prisma.PlanningMealFindManyArgs
  ): Promise<TPlanningMeal[]>;
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
}

export { PlanningMealRepositories };
