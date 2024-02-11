import { makeServiceFindByPatientId } from '@/factories/services/patient/makeServiceFindByPatientId';
import { FindByPatientIdController } from '@/modules/patient/controllers/FindByPatientId';

export function makeControllerFindByPatientId() {
  return new FindByPatientIdController(makeServiceFindByPatientId());
}
