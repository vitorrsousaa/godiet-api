import { makeRepositoryAnamnesis } from '@/factories/repositories/anamnesis/makeRepositoryAnamnesis';
import { DeleteService } from '@/modules/anamnesis/services/Delete';

export function makeServiceDeleteAnamnesis() {
  return new DeleteService(makeRepositoryAnamnesis());
}
