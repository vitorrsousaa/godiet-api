import { makeServiceUpdateAnamnesis } from '@/factories/services/anamnesis/makeServiceUpdateAnamnesis';
import { UpdateController } from '@/modules/anamnesis/controllers/Update';

export function makeControllerUpdateAnamnesis() {
  return new UpdateController(makeServiceUpdateAnamnesis());
}
