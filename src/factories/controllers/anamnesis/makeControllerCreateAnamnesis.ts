import { makeServiceCreateAnamnesis } from '@/factories/services/anamnesis/makeServiceCreateAnamnesis';
import { CreateController } from '@/modules/anamnesis/controllers/Create';

export function makeControllerCreateAnamnesis() {
  return new CreateController(makeServiceCreateAnamnesis());
}
