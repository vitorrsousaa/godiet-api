import { makeServiceDeleteAnamnesis } from '@/factories/services/anamnesis/makeServiceDeleteAnamnesis';
import { DeleteController } from '@/modules/anamnesis/controllers/Delete';

export function makeControllerDeleteAnamnesis() {
  return new DeleteController(makeServiceDeleteAnamnesis());
}
