import { makeRepositoryPlanningMeal } from '@/factories/repositories/planningMeal/makeRepositoryPlanningMeal';
import { FindByPlanningIdService } from '@/modules/planningMeal/services/FindByPlanningId';

export function makeServiceFindByPlanningId() {
  return new FindByPlanningIdService(makeRepositoryPlanningMeal());
}
