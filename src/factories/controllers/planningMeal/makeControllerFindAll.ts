import { makeServiceFindByPatientId } from '@/factories/services/planningMeal/makeServiceFindByPatientId';
import { makeServiceFindByPlanningId } from '@/factories/services/planningMeal/makeServiceFindByPlanningId';
import { FindPlanningController } from '@/modules/planningMeal/controllers/FindPlanning';

export function makeControllerFindAll() {
  return new FindPlanningController(
    makeServiceFindByPatientId(),
    makeServiceFindByPlanningId()
  );
}
