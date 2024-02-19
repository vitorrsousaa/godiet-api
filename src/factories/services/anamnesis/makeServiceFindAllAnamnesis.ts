import { makeRepositoryAnamnesis } from '@/factories/repositories/anamnesis/makeRepositoryAnamnesis';
import { FindAllService } from '@/modules/anamnesis/services/FindAll';

export function makeServiceFindAllAnamnesis() {
  return new FindAllService(makeRepositoryAnamnesis());
}
