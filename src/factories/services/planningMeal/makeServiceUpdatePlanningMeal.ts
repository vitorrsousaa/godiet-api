import { UpdateService } from '@/modules/planningMeal/services/Update';

import { makeServiceCreatePlanningMeal } from './makeServiceCreatePlanningMeal';
import { makeServiceDeletePlanningMeal } from './makeServiceDeletePlanningMeal';

export function makeServiceUpdatePlanningMeal() {
  return new UpdateService(
    makeServiceDeletePlanningMeal(),
    makeServiceCreatePlanningMeal()
  );
}
