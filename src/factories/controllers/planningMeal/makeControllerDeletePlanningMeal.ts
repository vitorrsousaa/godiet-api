import { makeServiceDeletePlanningMeal } from '@/factories/services/planningMeal/makeServiceDeletePlanningMeal';
import { DeleteController } from '@/modules/planningMeal/controllers/Delete';

export function makeControllerDeletePlanningMeal() {
  return new DeleteController(makeServiceDeletePlanningMeal());
}
