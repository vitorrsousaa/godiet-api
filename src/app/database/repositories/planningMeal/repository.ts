import { type Prisma, PrismaClient } from '@prisma/client';

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
}

class PlanningMealRepositories implements IPlanningMealRepositories {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(createArgs: Prisma.PlanningMealCreateArgs) {
    return this.prismaService.planningMeal.create(createArgs);
  }
}

export { PlanningMealRepositories };
