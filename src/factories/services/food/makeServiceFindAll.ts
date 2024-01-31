import { makeRepositoryFood } from '@/factories/repositories/food/makeRepositoryFood';
import { FindAllService } from '@/modules/food/services/FindAll';

export function makeServiceFindAll() {
  return new FindAllService(makeRepositoryFood());
}
