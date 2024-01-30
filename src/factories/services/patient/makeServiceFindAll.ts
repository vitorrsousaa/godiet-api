import { makeRepositoryPatient } from '@/factories/repositories/patient/makeRepositoryPatient';
import { FindAllService } from '@/modules/patient/services/FindAll';

export function makeServiceFindAll() {
  return new FindAllService(makeRepositoryPatient());
}
