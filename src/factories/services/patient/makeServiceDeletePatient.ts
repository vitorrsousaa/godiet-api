import { makeRepositoryPatient } from '@/factories/repositories/patient/makeRepositoryPatient';
import { DeleteService } from '@/modules/patient/services/Delete';

export function makeServiceDeletePatient() {
  return new DeleteService(makeRepositoryPatient());
}
