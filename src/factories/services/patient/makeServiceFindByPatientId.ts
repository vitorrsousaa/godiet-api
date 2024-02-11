import { makeRepositoryPatient } from '@/factories/repositories/patient/makeRepositoryPatient';
import { FindByPatientIdService } from '@/modules/patient/services/FindByPatientId';

export function makeServiceFindByPatientId() {
  return new FindByPatientIdService(makeRepositoryPatient());
}
