import { makeServiceFindByPatientId } from '@/factories/services/planningMeal/makeServiceFindByPatientId';
import { FindByPatientIdController } from '@/modules/planningMeal/controllers/FindByPatientId';

export function makeControllerFindByPatientId() {
  return new FindByPatientIdController(makeServiceFindByPatientId());
}
