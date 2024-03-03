import { makeServiceDeletePatient } from '@/factories/services/patient/makeServiceDeletePatient';
import { DeleteController } from '@/modules/patient/controllers/Delete';

export function makeControllerDeletePatient() {
  return new DeleteController(makeServiceDeletePatient());
}
