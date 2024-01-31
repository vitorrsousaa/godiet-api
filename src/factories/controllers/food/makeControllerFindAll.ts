import { makeServiceFindAll } from '@/factories/services/food/makeServiceFindAll';
import { FindAllController } from '@/modules/food/controllers/FindAll';

export function makeControllerFindAll() {
  return new FindAllController(makeServiceFindAll());
}
