import { makeServiceUpdatePlanningMeal } from '@/factories/services/planningMeal/makeServiceUpdatePlanningMeal';
import { UpdateController } from '@/modules/planningMeal/controllers/Update';

export function makeControllerUpdatePlanningMeal() {
  return new UpdateController(makeServiceUpdatePlanningMeal());
}
