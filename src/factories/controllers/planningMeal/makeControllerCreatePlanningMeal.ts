import { makeServiceCreatePlanningMeal } from '@/factories/services/planningMeal/makeServiceCreatePlanningMeal';
import { CreateController } from '@/modules/planningMeal/controllers/Create';

export function makeControllerCreatePlanningMeal() {
  return new CreateController(makeServiceCreatePlanningMeal());
}
