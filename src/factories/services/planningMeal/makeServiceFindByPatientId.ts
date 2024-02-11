import { makeRepositoryPlanningMeal } from '@/factories/repositories/planningMeal/makeRepositoryPlanningMeal';
import { FindByPatientIdService } from '@/modules/planningMeal/services/FindByPatientId';

export function makeServiceFindByPatientId() {
  return new FindByPatientIdService(makeRepositoryPlanningMeal());
}
