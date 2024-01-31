import { makeServiceFindAll } from '@/factories/services/categoryName/makeServiceFindAll';
import { FindAllController } from '@/modules/categoryName/controllers/FindAll';

export function makeControllerFindAll() {
  return new FindAllController(makeServiceFindAll());
}
