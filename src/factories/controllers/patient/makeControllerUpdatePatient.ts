import { makeServiceUpdatePatient } from '@/factories/services/patient/makeServiceUpdatePatient';
import { UpdateController } from '@/modules/patient/controllers/Update';

export function makeControllerUpdatePatient() {
  return new UpdateController(makeServiceUpdatePatient());
}
