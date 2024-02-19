import { makeRepositoryAnamnesis } from '@/factories/repositories/anamnesis/makeRepositoryAnamnesis';
import { UpdateService } from '@/modules/anamnesis/services/Update';

export function makeServiceUpdateAnamnesis() {
  return new UpdateService(makeRepositoryAnamnesis());
}
