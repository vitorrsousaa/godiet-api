import { makeRepositoryPlanningMeal } from '@/factories/repositories/planningMeal/makeRepositoryPlanningMeal';
import { makeFoodUtils } from '@/factories/utils/makeFoodUtils';
import { FindByPlanningIdService } from '@/modules/planningMeal/services/FindByPlanningId';

export function makeServiceFindByPlanningId() {
  return new FindByPlanningIdService(
    makeRepositoryPlanningMeal(),
    makeFoodUtils()
  );
}
