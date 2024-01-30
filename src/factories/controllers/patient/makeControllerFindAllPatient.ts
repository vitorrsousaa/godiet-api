import { makeServiceFindAll } from '@/factories/services/patient/makeServiceFindAll';
import { FindAllController } from '@/modules/patient/controllers/FindAll';

export function makeControllerFindAllPatient() {
  return new FindAllController(makeServiceFindAll());
}
