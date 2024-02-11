import { prisma } from '@/database';
import { PlanningMealRepositories } from '@/repositories/planningMeal';

export function makeRepositoryPlanningMeal() {
  return new PlanningMealRepositories(prisma);
}
