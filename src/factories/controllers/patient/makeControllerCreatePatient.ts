import { makeServiceCreatePatient } from '@/factories/services/patient/makeServiceCreatePatient';
import { CreateController } from '@/modules/patient/controllers/Create';

export function makeControllerCreatePatient() {
  return new CreateController(makeServiceCreatePatient());
}
