import { makeRepositoryPatient } from '@/factories/repositories/patient/makeRepositoryPatient';
import { makeRepositoryPlanningMeal } from '@/factories/repositories/planningMeal/makeRepositoryPlanningMeal';
import { CreateService } from '@/modules/planningMeal/services/Create';

export function makeServiceCreatePlanningMeal() {
  return new CreateService(
    makeRepositoryPlanningMeal(),
    makeRepositoryPatient()
  );
}
