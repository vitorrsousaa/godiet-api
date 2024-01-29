import { makeRepositoryPatient } from '@/factories/repositories/patient/makeRepositoryPatient';
import { CreateService } from '@/modules/patient/services/Create';

export function makeServiceCreatePatient() {
  return new CreateService(makeRepositoryPatient());
}
