import { makeRepositoryPatient } from '@/factories/repositories/patient/makeRepositoryPatient';
import { UpdateService } from '@/modules/patient/services/Update';

export function makeServiceUpdatePatient() {
  return new UpdateService(makeRepositoryPatient());
}
