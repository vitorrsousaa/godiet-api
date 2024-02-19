import { makeRepositoryAnamnesis } from '@/factories/repositories/anamnesis/makeRepositoryAnamnesis';
import { CreateService } from '@/modules/anamnesis/services/Create';

export function makeServiceCreateAnamnesis() {
  return new CreateService(makeRepositoryAnamnesis());
}
