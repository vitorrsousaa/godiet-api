import { makeRepositoryPlanningMeal } from '@/factories/repositories/planningMeal/makeRepositoryPlanningMeal';
import { DeleteService } from '@/modules/planningMeal/services/Delete';

export function makeServiceDeletePlanningMeal() {
  return new DeleteService(makeRepositoryPlanningMeal());
}
