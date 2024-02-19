import { makeServiceFindAllAnamnesis } from '@/factories/services/anamnesis/makeServiceFindAllAnamnesis';
import { FindAllController } from '@/modules/anamnesis/controllers/FindAll';

export function makeControllerFindAllAnamnesis() {
  return new FindAllController(makeServiceFindAllAnamnesis());
}
